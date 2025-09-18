import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaFire, FaClock, FaEye, FaComment, FaShare, FaBookmark, FaFilter, FaSearch, FaTimes, FaChevronDown, FaBolt, FaNewspaper } from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdTimeline, MdRefresh } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import EnhancedNewsCard from './EnhancedNewsCard';
import TimelineView from './TimelineView';
import { NewsItem, NewsFilter, CategoryCard } from '../types/news';
import { realTimeNewsService } from '../services/realTimeNewsService';

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

interface LiveStats {
  totalArticles: number;
  readingTime: number;
  activeReaders: number;
  lastUpdate: Date;
  articlesPerHour: number;
  freshness: 'real-time' | 'recent' | 'outdated';
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'feed' | 'timeline' | 'categories'>('feed');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [timelineData, setTimelineData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalArticles: 1247,
    readingTime: 8,
    activeReaders: 1580,
    lastUpdate: new Date(),
    articlesPerHour: 23,
    freshness: 'real-time'
  });
  
  const [filter, setFilter] = useState<NewsFilter>({
    timeRange: 'all',
    perspective: 'both'
  });

  const observerRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver>();

  const categories: CategoryCard[] = [
    {
      id: 'el-pulso',
      title: 'El Pulso',
      description: 'Análisis exclusivo y perspectivas únicas sobre la actualidad política colombiana',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      icon: '💫',
      count: 12
    },
    {
      id: 'breaking',
      title: 'Última Hora',
      description: 'Noticias de último momento y acontecimientos en desarrollo',
      color: 'bg-gradient-to-br from-red-600 to-red-800',
      icon: '🚨',
      count: 8
    },
    {
      id: 'congress',
      title: 'Congreso de Colombia',
      description: 'Actividad legislativa, debates parlamentarios y decisiones del Congreso',
      color: 'bg-gradient-to-br from-indigo-600 to-purple-800',
      icon: '🏛️',
      count: 34
    },
    {
      id: 'legislation',
      title: 'Legislación',
      description: 'Nuevas leyes, decretos y normativas que afectan al país',
      color: 'bg-gradient-to-br from-violet-600 to-purple-800',
      icon: '⚖️',
      count: 28
    },
    {
      id: 'politics-left',
      title: 'Perspectiva Progresista',
      description: 'Análisis desde perspectivas de izquierda y movimientos progresistas',
      color: 'bg-gradient-to-br from-red-500 to-pink-700',
      icon: '🔴',
      count: 42
    },
    {
      id: 'politics-right',
      title: 'Perspectiva Conservadora',
      description: 'Análisis desde perspectivas de derecha y sectores conservadores',
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      icon: '🔵',
      count: 38
    },
    {
      id: 'terror-crime',
      title: 'Terror/Crimen/Drogas',
      description: 'Seguridad nacional, narcotráfico, criminalidad y operativos policiales',
      color: 'bg-gradient-to-br from-red-700 to-gray-900',
      icon: '🚔',
      count: 45
    },
    {
      id: 'local',
      title: 'Noticias Locales',
      description: 'Actualidad regional, gobiernos locales y comunidades',
      color: 'bg-gradient-to-br from-green-600 to-emerald-800',
      icon: '🏘️',
      count: 67
    },
    {
      id: 'world',
      title: 'Noticias Mundiales',
      description: 'Política internacional, diplomacia y relaciones exteriores',
      color: 'bg-gradient-to-br from-blue-500 to-indigo-700',
      icon: '🌍',
      count: 23
    },
    {
      id: 'economy',
      title: 'Economía',
      description: 'Mercados, inversión, empleo y desarrollo económico nacional',
      color: 'bg-gradient-to-br from-green-600 to-green-800',
      icon: '📈',
      count: 32
    }
  ];

  // Infinite scroll logic with real-time service
  const loadMoreNews = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
      const allNews = await realTimeNewsService.getFilteredNews(filter);
      const currentLength = newsData.length;
      const newData = allNews.slice(currentLength, currentLength + 12);
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setNewsData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [filter, newsData.length, isLoadingMore, hasMore]);

  // Manual refresh function
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const freshNews = await realTimeNewsService.getFilteredNews(filter);
      const freshBreaking = await realTimeNewsService.getBreakingNews();
      
      setNewsData(freshNews.slice(0, 20));
      setBreakingNews(freshBreaking);
      setLastUpdated(new Date());
      setPage(1);
      setHasMore(freshNews.length > 20);
      
      // Update live stats
      setLiveStats(realTimeNewsService.getRealTimeStats());
      
    } catch (error) {
      console.error('Error refreshing news:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [filter]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreNews();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      intersectionObserverRef.current.observe(observerRef.current);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [loadMoreNews, hasMore, isLoadingMore]);

  // Load initial data with real-time service
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Better UX
        
        const news = await realTimeNewsService.getFilteredNews(filter);
        const breaking = await realTimeNewsService.getBreakingNews();
        const timeline = {}; // Will implement timeline generation later
        
        setNewsData(news.slice(0, 20));
        setBreakingNews(breaking);
        setTimelineData(timeline);
        setPage(1);
        setHasMore(news.length > 20);
        
        setLastUpdated(new Date());
        setLiveStats(realTimeNewsService.getRealTimeStats());
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to empty data
        setNewsData([]);
        setBreakingNews([]);
        setTimelineData({});
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Set up real-time updates
    realTimeNewsService.startRealTimeUpdates();
    
    const updateListener = (freshData: NewsItem[]) => {
      setNewsData(freshData.slice(0, 20));
      setLiveStats(realTimeNewsService.getRealTimeStats());
      setLastUpdated(new Date());
    };
    
    realTimeNewsService.addUpdateListener(updateListener);

    return () => {
      realTimeNewsService.removeUpdateListener(updateListener);
      realTimeNewsService.stopRealTimeUpdates();
    };
  }, [filter.timeRange, filter.perspective, filter.category]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilter(prev => ({ ...prev, category: categoryId }));
    setViewMode('feed');
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNavigate) {
      onNavigate('article', newsItem.id);
    }
  };

  const handleFilterChange = (newFilter: Partial<NewsFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    setPage(1);
    setHasMore(true);
  };

  const clearFilters = () => {
    setFilter({ timeRange: 'all', perspective: 'both' });
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTrendingNews = () => {
    return newsData.filter(item => item.trending).slice(0, 4);
  };

  const getLatestNews = () => {
    return newsData.slice(0, 12);
  };

  const filteredNews = newsData.filter(item => 
    searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 item.summary.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-colombia flex items-center gap-3">
                  <BiNews className="w-8 h-8" />
                  Noticias & Feeds
                </h1>
                <p className="text-gray-600 mt-1">
                  Información actualizada con perspectivas balanceadas
                </p>
              </div>

              {/* Live Stats */}
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
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <IoMdTime className="w-3 h-3" />
                    <span>Actualizado {formatTime(lastUpdated)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Enhanced Search and Filters with refresh button */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar noticias, temas, fuentes..."
                      className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:border-transparent placeholder-gray-500 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                    isRefreshing
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-white hover:text-colombia-blue'
                  }`}
                  title="Actualizar noticias"
                >
                  <MdRefresh className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Actualizando...' : 'Actualizar'}
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('feed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'feed'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <FaFire className="w-3 h-3" />
                  Feed
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'timeline'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <MdTimeline className="w-3 h-3" />
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('categories')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'categories'
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <BiCategory className="w-3 h-3" />
                  Categorías
                </button>
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
                      <option value="today">Hoy</option>
                      <option value="week">Esta semana</option>
                      <option value="month">Este mes</option>
                      <option value="year">Este año</option>
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
                      <option value="balanced">Solo balanceadas</option>
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
                      <option value="el-tiempo">El Tiempo</option>
                      <option value="semana">Semana</option>
                      <option value="el-espectador">El Espectador</option>
                      <option value="portafolio">Portafolio</option>
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
            // Enhanced loading skeletons
            <div className="space-y-8">
              {/* Breaking news skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="glass-morphism rounded-2xl p-6 animate-pulse border border-white/20">
                      <div className="flex gap-4">
                        <div className="w-20 h-16 bg-gray-300 rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-full"></div>
                          <div className="flex gap-2">
                            <div className="h-5 bg-red-200 rounded-full w-20"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main news skeleton */}
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glass-morphism rounded-2xl overflow-hidden animate-pulse border border-white/20">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="h-6 bg-gray-300 rounded w-4/5"></div>
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-blue-200 rounded-full w-24"></div>
                        <div className="h-6 bg-green-200 rounded-full w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {viewMode === 'feed' && (
                <div className="space-y-8">
                  {/* Breaking News Section */}
                  {breakingNews.length > 0 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-red-200/50 p-8 shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                            <FaBolt className="w-5 h-5 animate-pulse" />
                            <span className="font-bold text-lg">ÚLTIMA HORA</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {breakingNews.length} noticia{breakingNews.length > 1 ? 's' : ''} de último momento
                          </div>
                          <div className="flex-1"></div>
                          <div className="text-xs text-gray-500 bg-white/60 px-3 py-1 rounded-full">
                            🔴 En vivo • Actualizado hace {Math.floor(Math.random() * 5) + 1} min
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {breakingNews.map((item) => (
                            <EnhancedNewsCard
                              key={item.id}
                              article={item}
                              onArticleClick={() => handleNewsClick(item)}
                              showPerspectiveBadge={true}
                              compact={true}
                              showFreshnessIndicator={true}
                              priority="breaking"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* El Pulso Featured Section */}
                  {newsData.filter(item => typeof item.category === 'string' && item.category.includes('Pulso')).length > 0 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-600/10 rounded-3xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-yellow-200/50 p-8 shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                            <span className="text-2xl">💫</span>
                            <span className="font-bold text-lg">EL PULSO</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Análisis exclusivo de la actualidad política
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {newsData.filter(item => typeof item.category === 'string' && item.category.includes('Pulso')).slice(0, 2).map((item) => (
                            <EnhancedNewsCard
                              key={item.id}
                              article={item}
                              onArticleClick={() => handleNewsClick(item)}
                              showPerspectiveBadge={true}
                              showFreshnessIndicator={true}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                      
                      {selectedCategory && (
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            handleFilterChange({ category: undefined });
                          }}
                          className="text-sm text-colombia-blue hover:text-colombia-blue-dark transition-colors flex items-center gap-1"
                        >
                          <FaTimes className="w-3 h-3" />
                          Limpiar categoría
                        </button>
                      )}
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

                    {/* Infinite Scroll Trigger */}
                    <div ref={observerRef} className="py-8">
                      {isLoadingMore && (
                        <div className="flex justify-center">
                          <div className="glass rounded-lg px-6 py-3 border border-white/20">
                            <div className="flex items-center gap-3">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-colombia-blue"></div>
                              <span className="text-gray-600">Cargando más noticias...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!hasMore && filteredNews.length > 0 && (
                        <div className="text-center text-gray-500">
                          <div className="glass rounded-lg px-6 py-3 border border-white/20 inline-block">
                            Has visto todas las noticias disponibles
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'timeline' && (
                <TimelineView 
                  timelineData={timelineData}
                  onArticleClick={handleNewsClick}
                />
              )}

              {viewMode === 'categories' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      📂 Explora por Categorías
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Descubre noticias organizadas por temas específicos. 
                      Cada categoría incluye análisis profundo y perspectivas balanceadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group cursor-pointer"
                      >
                        <div className={`${category.color} rounded-2xl p-6 text-white h-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-4xl">{category.icon}</span>
                              <div className="bg-white/20 rounded-full px-3 py-1">
                                <span className="text-sm font-medium">{category.count}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 group-hover:text-colombia-yellow transition-colors">
                              {category.title}
                            </h3>
                            
                            <p className="text-white/90 text-sm leading-relaxed mb-4">
                              {category.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="opacity-80">Explorar categoría</span>
                              <BiTrendingUp className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-2xl p-6 border border-white/20 text-center">
                    <div className="flex items-center justify-center gap-2 text-colombia-blue mb-3">
                      <MdVerified className="w-5 h-5" />
                      <span className="font-semibold">Contenido Verificado</span>
                    </div>
                    <p className="text-gray-600">
                      Todas nuestras categorías incluyen contenido verificado por nuestro equipo editorial 
                      y perspectivas balanceadas de múltiples fuentes confiables.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNewsFeed;