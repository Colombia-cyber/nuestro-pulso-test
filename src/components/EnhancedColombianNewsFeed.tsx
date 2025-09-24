import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaFire, FaClock, FaEye, FaComment, FaShare, FaBookmark, FaFilter, FaSearch, FaTimes, FaChevronDown, FaSync } from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdTimeline } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import EnhancedNewsCard from './EnhancedNewsCard';
import ColombianNewsTabs from './ColombianNewsTabs';
import { COLOMBIAN_NEWS_SOURCES, ColombianNewsSource } from '../config/colombianNewsSources';
import { NewsItem, NewsFilter, CategoryCard } from '../types/news';
import { newsService } from '../services/newsService';

interface EnhancedColombianNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
  className?: string;
}

interface LiveStats {
  totalArticles: number;
  readingTime: number;
  activeReaders: number;
  lastUpdate: Date;
}

const EnhancedColombianNewsFeed: React.FC<EnhancedColombianNewsFeedProps> = ({ 
  onNavigate, 
  className = '' 
}) => {
  const [activeSourceId, setActiveSourceId] = useState<string>('colombia-nacional');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [filter, setFilter] = useState<NewsFilter>({
    timeRange: 'all',
    perspective: 'both'
  });

  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalArticles: 124,
    readingTime: 8,
    activeReaders: 1247,
    lastUpdate: new Date()
  });

  // Get active source configuration
  const activeSource = useMemo(() => 
    COLOMBIAN_NEWS_SOURCES.find(source => source.id === activeSourceId) || COLOMBIAN_NEWS_SOURCES[0],
    [activeSourceId]
  );

  // Debounced search handler
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearchQuery(query);
        }, 300);
      };
    })(),
    []
  );

  // Load news data based on active source
  const loadNewsData = useCallback(async (sourceId: string, reset: boolean = true) => {
    if (reset) {
      setIsLoading(true);
      setPage(1);
      setHasMore(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const activeSourceConfig = COLOMBIAN_NEWS_SOURCES.find(s => s.id === sourceId);
      if (!activeSourceConfig) return;

      // Create filter for this specific source
      const sourceFilter: NewsFilter = {
        ...filter,
        source: activeSourceConfig.sources[0] // Use the first source as primary
      };

      // Get filtered news from the service
      let filteredNews = newsService.getFilteredNews(sourceFilter);

      // Further filter by category based on source
      if (activeSourceConfig.category === 'security') {
        filteredNews = filteredNews.filter(item => 
          typeof item.category === 'string' 
            ? item.category.toLowerCase().includes('seguridad')
            : item.category === 'Seguridad'
        );
      } else if (activeSourceConfig.category === 'trending') {
        filteredNews = filteredNews.filter(item => item.trending);
      } else if (activeSourceConfig.category === 'breaking') {
        filteredNews = filteredNews.filter(item => 
          typeof item.category === 'string'
            ? item.category.toLowerCase().includes('última hora')
            : item.category === 'Última Hora'
        );
      }

      // Handle pagination
      const startIndex = reset ? 0 : newsData.length;
      const endIndex = startIndex + 10;
      const newArticles = filteredNews.slice(startIndex, endIndex);

      if (reset) {
        setNewsData(newArticles);
      } else {
        setNewsData(prev => [...prev, ...newArticles]);
      }

      setHasMore(endIndex < filteredNews.length);
      setLastUpdated(new Date());

      // Update article count for the source
      const sourceIndex = COLOMBIAN_NEWS_SOURCES.findIndex(s => s.id === sourceId);
      if (sourceIndex !== -1) {
        COLOMBIAN_NEWS_SOURCES[sourceIndex].articleCount = filteredNews.length;
      }

    } catch (error) {
      console.error('Error loading news data:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [filter, newsData.length]);

  // Handle source change
  const handleSourceChange = useCallback((sourceId: string) => {
    if (sourceId !== activeSourceId) {
      setActiveSourceId(sourceId);
      loadNewsData(sourceId, true);
    }
  }, [activeSourceId, loadNewsData]);

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await newsService.startLiveUpdates();
      await loadNewsData(activeSourceId, true);
      
      // Update live stats
      setLiveStats(prev => ({
        totalArticles: prev.totalArticles + Math.floor(Math.random() * 5),
        readingTime: prev.readingTime + Math.floor(Math.random() * 2) - 1,
        activeReaders: prev.activeReaders + Math.floor(Math.random() * 20) - 10,
        lastUpdate: new Date()
      }));
    } catch (error) {
      console.error('Error refreshing news:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load more articles
  const loadMoreNews = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setPage(prev => prev + 1);
    await loadNewsData(activeSourceId, false);
  }, [activeSourceId, loadNewsData, isLoadingMore, hasMore]);

  // Handle news item click
  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNavigate) {
      onNavigate('article', newsItem.id);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: Partial<NewsFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    loadNewsData(activeSourceId, true);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter({ timeRange: 'all', perspective: 'both' });
    setSearchQuery('');
    setShowFilters(false);
    loadNewsData(activeSourceId, true);
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get trending news
  const getTrendingNews = () => {
    return newsData.filter(item => item.trending).slice(0, 4);
  };

  // Filter news by search query
  const filteredNews = useMemo(() => {
    if (!searchQuery) return newsData;
    
    return newsData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [newsData, searchQuery]);

  // Initial load
  useEffect(() => {
    loadNewsData(activeSourceId, true);
    
    // Set up live updates
    newsService.startLiveUpdates();
    
    const updateListener = () => {
      setLiveStats(prev => ({
        totalArticles: prev.totalArticles + Math.floor(Math.random() * 3),
        readingTime: prev.readingTime + Math.floor(Math.random() * 2) - 1,
        activeReaders: prev.activeReaders + Math.floor(Math.random() * 20) - 10,
        lastUpdate: new Date()
      }));
    };
    
    newsService.addUpdateListener(updateListener);

    return () => {
      newsService.removeUpdateListener(updateListener);
      newsService.stopLiveUpdates();
    };
  }, [activeSourceId, loadNewsData]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
      {/* Colombian News Tabs */}
      <ColombianNewsTabs
        activeSourceId={activeSourceId}
        onSourceChange={handleSourceChange}
      />

      {/* Enhanced News Feed Header */}
      <div className="sticky top-36 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-colombia flex items-center gap-3">
                  <BiNews className="w-8 h-8" />
                  {activeSource.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeSource.description}
                </p>
              </div>

              {/* Live Stats and Refresh */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="glass rounded-lg px-4 py-2 border border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-red-600">EN VIVO</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaEye className="w-3 h-3" />
                    <span>{liveStats.activeReaders.toLocaleString()} lectores</span>
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
                  <FaSync className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    onChange={(e) => debouncedSearch(e.target.value)}
                    placeholder="Buscar noticias, temas, fuentes..."
                    className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:border-transparent placeholder-gray-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        debouncedSearch('');
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Button */}
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
                <FaChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                    <select
                      value={filter.timeRange}
                      onChange={(e) => handleFilterChange({ timeRange: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="all">Todos los períodos</option>
                      <option value="1year">Este año</option>
                      <option value="2years">Últimos 2 años</option>
                      <option value="5years">Últimos 5 años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Perspectiva</label>
                    <select
                      value={filter.perspective}
                      onChange={(e) => handleFilterChange({ perspective: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="both">Todas las perspectivas</option>
                      <option value="progressive">Solo progresistas</option>
                      <option value="conservative">Solo conservadoras</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuente</label>
                    <select
                      value={filter.source || ''}
                      onChange={(e) => handleFilterChange({ source: e.target.value || undefined })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="">Todas las fuentes</option>
                      {activeSource.sources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Loading skeletons
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="news-card p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      <div className="flex gap-4">
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Trending Section */}
              {getTrendingNews().length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full">
                      <FaFire className="w-4 h-4" />
                      <span className="font-bold">Trending Ahora</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTrendingNews().length} artículos
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {getTrendingNews().map((item) => (
                      <EnhancedNewsCard
                        key={item.id}
                        article={item}
                        onArticleClick={() => handleNewsClick(item)}
                        showPerspectiveBadge={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Latest News */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <MdUpdate className="w-6 h-6 text-colombia-blue" />
                      Últimas Noticias
                    </h2>
                    <div className="text-sm text-gray-600">
                      {filteredNews.length} artículos
                    </div>
                  </div>
                </div>

                {/* News Grid */}
                <div className="space-y-4">
                  {filteredNews.map((item) => (
                    <EnhancedNewsCard
                      key={item.id}
                      article={item}
                      onArticleClick={() => handleNewsClick(item)}
                      showPerspectiveBadge={true}
                    />
                  ))}
                </div>

                {/* Load More / Infinite Scroll */}
                {hasMore && (
                  <div className="py-8 text-center">
                    <button
                      onClick={loadMoreNews}
                      disabled={isLoadingMore}
                      className="bg-colombia-blue text-white px-8 py-3 rounded-lg hover:bg-colombia-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingMore ? 'Cargando...' : 'Cargar más noticias'}
                    </button>
                  </div>
                )}

                {!hasMore && filteredNews.length > 0 && (
                  <div className="text-center pt-8 border-t border-gray-200">
                    <div className="glass rounded-lg px-6 py-3 inline-flex items-center gap-2 border border-white/20">
                      <MdUpdate className="w-4 h-4 text-colombia-blue" />
                      <span className="text-sm text-gray-600">
                        Has visto todas las noticias disponibles
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedColombianNewsFeed;