import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaNewspaper, 
  FaVideo, 
  FaFire, 
  FaSearch, 
  FaTimes, 
  FaFilter, 
  FaSyncAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaClock,
  FaEye,
  FaThumbsUp,
  FaExternalLinkAlt,
  FaPlay
} from 'react-icons/fa';
import { BiTrendingUp, BiCategory, BiNews } from 'react-icons/bi';
import { MdOutlineVerified, MdUpdate } from 'react-icons/md';
import { HiOutlinePlay } from 'react-icons/hi';
import { colombiaHubService } from '../services/colombiaHubService';
import { realNewsService, RealNewsArticle } from '../services/realNewsService';
import ArticleModal from './ArticleModal';
import LoadingSkeleton, { NewsGridSkeleton } from './LoadingSkeleton';
import RealNewsCard from './RealNewsCard';
import {
  ColombiaNewsArticle,
  ColombiaVideo,
  CombinedHubResponse,
  NewsHubFilter,
  VideoHubFilter,
  ColombiaNewsSource,
  ContentCategory
} from '../types/colombia-hub';

interface ColombiaNewsHubProps {
  onNavigate?: (view: string) => void;
}

const ColombiaNewsHub: React.FC<ColombiaNewsHubProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'combined' | 'news' | 'videos'>('combined');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data state
  const [combinedData, setCombinedData] = useState<CombinedHubResponse | null>(null);
  const [realNews, setRealNews] = useState<RealNewsArticle[]>([]);
  const [sources, setSources] = useState<ColombiaNewsSource[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Article modal state
  const [selectedArticle, setSelectedArticle] = useState<RealNewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // Load initial data
  useEffect(() => {
    loadInitialData();
    loadSources();
    loadCategories();
  }, []);

  // Load data when filters change
  useEffect(() => {
    if (searchQuery || selectedCategory !== 'all' || selectedSources.length > 0) {
      handleSearch();
    }
  }, [selectedCategory, selectedSources]);

  const loadInitialData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load real Colombian news
      const realNewsData = await realNewsService.getColombianNews({
        category: 'general',
        query: 'Colombia',
        limit: 20
      });
      setRealNews(realNewsData);

      // Load existing service data
      const newsFilter: NewsHubFilter = { limit: 20 };
      const videoFilter: VideoHubFilter = { limit: 12 };
      
      const data = await colombiaHubService.getCombinedContent(newsFilter, videoFilter);
      setCombinedData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSources = async () => {
    try {
      const sourcesData = await colombiaHubService.getSources();
      setSources(sourcesData);
    } catch (err) {
      console.error('Failed to load sources:', err);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await colombiaHubService.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleSearch = useCallback(async () => {
    if (!searchQuery && selectedCategory === 'all' && selectedSources.length === 0) {
      return loadInitialData();
    }

    setIsLoading(true);
    setError(null);

    try {
      // Load real news with filters
      const realNewsData = await realNewsService.getColombianNews({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        query: searchQuery || 'Colombia',
        limit: 20
      });
      setRealNews(realNewsData);

      // Load existing service data
      const newsFilter: NewsHubFilter = {
        limit: 20,
        search: searchQuery || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sources: selectedSources.length > 0 ? selectedSources : undefined
      };

      const videoFilter: VideoHubFilter = {
        limit: 12,
        search: searchQuery || undefined
      };

      const data = await colombiaHubService.getCombinedContent(newsFilter, videoFilter);
      setCombinedData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedSources]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await colombiaHubService.refreshContent();
      await loadInitialData();
      // Also refresh real news
      const realNewsData = await realNewsService.getColombianNews({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        query: searchQuery || 'Colombia',
        limit: 20
      });
      setRealNews(realNewsData);
    } catch (err) {
      setError('Failed to refresh content');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Article modal handlers
  const handleArticleClick = (article: RealNewsArticle, index: number) => {
    setSelectedArticle(article);
    setCurrentArticleIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleNextArticle = () => {
    if (currentArticleIndex < realNews.length - 1) {
      const nextIndex = currentArticleIndex + 1;
      setCurrentArticleIndex(nextIndex);
      setSelectedArticle(realNews[nextIndex]);
    }
  };

  const handlePreviousArticle = () => {
    if (currentArticleIndex > 0) {
      const prevIndex = currentArticleIndex - 1;
      setCurrentArticleIndex(prevIndex);
      setSelectedArticle(realNews[prevIndex]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSources([]);
    setShowFilters(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Hace menos de 1h';
    if (diffInHours < 24) return `Hace ${Math.floor(diffInHours)}h`;
    return `Hace ${Math.floor(diffInHours / 24)}d`;
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const NewsCard: React.FC<{ article: ColombiaNewsArticle }> = ({ article }) => (
    <div className="news-card group hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-colombia-blue/30">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {article.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-24 h-18 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/96/72';
                }}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{article.source.icon}</span>
              <span className="text-sm font-medium text-colombia-blue">
                {article.source.name}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(article.publishedAt)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-colombia-blue transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-colombia-blue hover:text-colombia-blue-dark text-sm font-medium transition-colors"
              >
                Leer más
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VideoCard: React.FC<{ video: ColombiaVideo }> = ({ video }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="video-card group hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-colombia-blue/30 overflow-hidden">
        <div className="relative">
          {!imageError ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
            />
          ) : (
            // Error state with fallback
            <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-sm">Video no disponible</p>
                <button 
                  onClick={() => {
                    setImageError(false);
                    setIsLoading(true);
                  }}
                  className="mt-2 text-xs bg-colombia-blue text-white px-3 py-1 rounded hover:bg-colombia-blue-dark transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}
          
          {/* Loading state */}
          {isLoading && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Cargando...</div>
            </div>
          )}
          
          {/* Play button overlay */}
          {!imageError && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                <FaPlay className="w-6 h-6 ml-1" />
              </div>
            </div>
          )}
          
          {/* Duration badge */}
          {!imageError && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-colombia-blue transition-colors">
            {video.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {video.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="font-medium">{video.channelTitle}</span>
            <span>{formatTimeAgo(video.publishedAt)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FaEye className="w-3 h-3" />
                {formatViewCount(video.viewCount)}
              </div>
              <div className="flex items-center gap-1">
                <FaThumbsUp className="w-3 h-3" />
                {formatViewCount(video.likeCount)}
              </div>
            </div>
            
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Ver video
              <HiOutlinePlay className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Title and stats */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gradient-colombia flex items-center gap-3">
                  <FaGlobe className="w-8 h-8 text-colombia-blue" />
                  Colombia News Hub
                </h1>
                <p className="text-gray-600 mt-2">
                  Últimas noticias y videos sobre Colombia desde fuentes locales e internacionales
                </p>
              </div>
              
              {/* Live indicator and refresh */}
              <div className="flex items-center gap-4">
                <div className="glass rounded-lg px-4 py-2 border border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-green-600">EN VIVO</span>
                  </div>
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`p-2 rounded-lg transition-colors ${
                    isRefreshing
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-colombia-blue text-white hover:bg-colombia-blue-dark'
                  }`}
                >
                  <FaSyncAlt className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search bar */}
              <div className="flex-1 relative">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Buscar noticias, videos, temas..."
                    className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:border-transparent placeholder-gray-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        loadInitialData();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Tab navigation */}
              <div className="flex bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setActiveTab('combined')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === 'combined'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <BiNews className="w-4 h-4" />
                  Todo
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === 'news'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <FaNewspaper className="w-4 h-4" />
                  Noticias
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === 'videos'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <FaVideo className="w-4 h-4" />
                  Videos
                </button>
              </div>

              {/* Filters button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  showFilters
                    ? 'bg-colombia-blue text-white border-colombia-blue'
                    : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-white'
                }`}
              >
                <FaFilter className="w-3 h-3" />
                Filtros
              </button>
            </div>

            {/* Expandable filters */}
            {showFilters && (
              <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sources filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuentes
                    </label>
                    <select
                      multiple
                      value={selectedSources}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedSources(values);
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                      size={3}
                    >
                      {sources.map((source) => (
                        <option key={source.id} value={source.id}>
                          {source.icon} {source.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-colombia-blue text-white rounded-lg hover:bg-colombia-blue-dark transition-colors"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="news-card p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-18 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Error al cargar el contenido
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={loadInitialData}
                className="bg-colombia-blue text-white px-6 py-3 rounded-lg hover:bg-colombia-blue-dark transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : (
            // Content
            <div className="space-y-8">
              {/* Trending section */}
              {combinedData?.trending && (activeTab === 'combined') && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full">
                      <FaFire className="w-4 h-4" />
                      <span className="font-bold">Trending Ahora</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">📰 Noticias Populares</h3>
                      <div className="space-y-4">
                        {combinedData.trending.news.slice(0, 3).map((article) => (
                          <NewsCard key={article.id} article={article} />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">🎥 Videos Populares</h3>
                      <div className="space-y-4">
                        {combinedData.trending.videos.slice(0, 2).map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Real Colombian News Section */}
              {realNews.length > 0 && (activeTab === 'combined' || activeTab === 'news') && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <MdOutlineVerified className="w-6 h-6 text-green-600" />
                      Noticias Verificadas de Colombia
                    </h2>
                    <div className="text-sm text-gray-600">
                      {realNews.length} artículos en tiempo real
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {realNews.map((article, index) => (
                      <RealNewsCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => handleArticleClick(article, index)}
                        variant="default"
                        showActions={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Main content based on active tab */}
              {(activeTab === 'combined' || activeTab === 'news') && combinedData?.news && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FaNewspaper className="w-6 h-6 text-colombia-blue" />
                      Últimas Noticias
                    </h2>
                    <div className="text-sm text-gray-600">
                      {combinedData.news.totalCount} artículos
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {combinedData.news.articles.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'combined' || activeTab === 'videos') && combinedData?.videos && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FaVideo className="w-6 h-6 text-red-600" />
                      Videos de Colombia
                    </h2>
                    <div className="text-sm text-gray-600">
                      {combinedData.videos.totalCount} videos
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {combinedData.videos.videos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}

              {/* Last update info */}
              <div className="text-center pt-8 border-t border-gray-200">
                <div className="glass rounded-lg px-6 py-3 inline-flex items-center gap-2 border border-white/20">
                  <MdUpdate className="w-4 h-4 text-colombia-blue" />
                  <span className="text-sm text-gray-600">
                    Última actualización: {lastUpdate.toLocaleTimeString('es-CO')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNext={handleNextArticle}
        onPrevious={handlePreviousArticle}
        hasNext={currentArticleIndex < realNews.length - 1}
        hasPrevious={currentArticleIndex > 0}
      />
    </div>
  );
};

export default ColombiaNewsHub;