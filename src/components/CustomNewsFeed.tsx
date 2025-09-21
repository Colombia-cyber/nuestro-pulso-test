import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaFire, FaClock, FaEye, FaComment, FaShare, FaBookmark, FaFilter, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdTimeline } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import EnhancedNewsCard from './EnhancedNewsCard';
import TimelineView from './TimelineView';
import { NewsItem, NewsFilter, CategoryCard } from '../types/news';
import { newsService } from '../services/newsService';

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

interface LiveStats {
  totalArticles: number;
  readingTime: number;
  activeReaders: number;
  lastUpdate: Date;
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'feed' | 'timeline' | 'categories'>('feed');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [timelineData, setTimelineData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalArticles: 124,
    readingTime: 8,
    activeReaders: 1247,
    lastUpdate: new Date()
  });
  
  const [filter, setFilter] = useState<NewsFilter>({
    timeRange: 'all',
    perspective: 'both'
  });

  const observerRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver>();

  const categories: CategoryCard[] = [
    {
      id: 'politica',
      title: 'Política Nacional',
      description: 'Análisis político, decisiones gubernamentales y análisis de políticas públicas',
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      icon: '🏛️',
      count: 47
    },
    {
      id: 'economia',
      title: 'Economía',
      description: 'Mercados, inversión, empleo y desarrollo económico nacional',
      color: 'bg-gradient-to-br from-green-600 to-green-800',
      icon: '📈',
      count: 32
    },
    {
      id: 'seguridad',
      title: 'Seguridad Ciudadana',
      description: 'Narcotráfico, criminalidad, fuerzas armadas y orden público',
      color: 'bg-gradient-to-br from-red-600 to-red-800',
      icon: '🚨',
      count: 28
    },
    {
      id: 'ambiente',
      title: 'Medio Ambiente',
      description: 'Cambio climático, energías renovables y conservación',
      color: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
      icon: '🌱',
      count: 19
    },
    {
      id: 'educacion',
      title: 'Educación',
      description: 'Sistema educativo, universidades y formación profesional',
      color: 'bg-gradient-to-br from-purple-600 to-purple-800',
      icon: '📚',
      count: 24
    },
    {
      id: 'salud',
      title: 'Salud Pública',
      description: 'Sistema de salud, políticas sanitarias y bienestar ciudadano',
      color: 'bg-gradient-to-br from-pink-600 to-pink-800',
      icon: '🏥',
      count: 16
    },
    {
      id: 'tecnologia',
      title: 'Tecnología',
      description: 'Innovación, digitalización y transformación tecnológica',
      color: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
      icon: '💻',
      count: 21
    },
    {
      id: 'internacional',
      title: 'Relaciones Internacionales',
      description: 'Diplomacia, comercio exterior y política internacional',
      color: 'bg-gradient-to-br from-orange-600 to-orange-800',
      icon: '🌍',
      count: 15
    }
  ];

  // Infinite scroll logic
  const loadMoreNews = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      // For demo purposes, simulate loading more data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const allNews = newsService.getFilteredNews(filter);
      const currentLength = newsData.length;
      const newData = allNews.slice(currentLength, currentLength + 10);
      
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

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const news = newsService.getFilteredNews(filter);
        const timeline = newsService.generateTimelineData();
        
        setNewsData(news.slice(0, 10)); // Start with first 10 items
        setTimelineData(timeline);
        setPage(1);
        setHasMore(news.length > 10);
        
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading data:', error);
        // Use fallback data
        const fallbackNews = newsService.getFilteredNews(filter);
        setNewsData(fallbackNews.slice(0, 10));
        setTimelineData(newsService.generateTimelineData());
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Set up live updates
    newsService.startLiveUpdates();
    
    const updateListener = () => {
      setLiveStats(prev => ({
        totalArticles: prev.totalArticles + Math.floor(Math.random() * 3),
        readingTime: prev.readingTime + Math.floor(Math.random() * 2) - 1,
        activeReaders: prev.activeReaders + Math.floor(Math.random() * 20) - 10,
        lastUpdate: new Date()
      }));
      loadData();
    };
    
    newsService.addUpdateListener(updateListener);

    return () => {
      newsService.removeUpdateListener(updateListener);
      newsService.stopLiveUpdates();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-25 via-white to-colombia-blue-25">
      {/* Premium Sticky Header */}
      <div className="sticky top-18 lg:top-22 z-40 nav-premium backdrop-blur-4xl border-b border-white/30 shadow-premium">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Premium Main Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-gradient-colombia-premium flex items-center gap-4 animate-gradient-aurora">
                  <BiNews className="w-10 h-10" />
                  Noticias & Feeds
                </h1>
                <p className="text-gray-600 mt-2 text-lg lg:text-xl">
                  Información actualizada con perspectivas balanceadas
                </p>
              </div>

              {/* Premium Live Stats */}
              <div className="hidden lg:flex items-center gap-6">
                <div className="glass-premium rounded-2xl px-6 py-3 border border-white/30">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="relative">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-premium-glow opacity-50"></div>
                    </div>
                    <span className="font-bold text-red-600">EN VIVO</span>
                  </div>
                </div>
                <div className="text-base text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaEye className="w-4 h-4" />
                    <span className="font-semibold">{liveStats.activeReaders.toLocaleString()} lectores</span>
                  </div>
                </div>
                <div className="text-base text-gray-600">
                  <div className="flex items-center gap-2">
                    <IoMdTime className="w-4 h-4" />
                    <span>Actualizado {formatTime(lastUpdated)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Premium Search Bar */}
              <div className="flex-1 relative">
                <div className="relative">
                  <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar noticias, temas, fuentes..."
                    className="input-premium w-full pl-16 pr-6 py-4 text-lg border-0 focus:outline-none focus:ring-0 placeholder-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Premium View Mode Toggle */}
              <div className="flex glass-premium rounded-2xl border border-white/30 p-2">
                <button
                  onClick={() => setViewMode('feed')}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-400 flex items-center gap-3 ${
                    viewMode === 'feed'
                      ? 'bg-gradient-colombia-premium text-white shadow-colombia-strong transform scale-105'
                      : 'text-gray-700 hover:glass-subtle hover:scale-102'
                  }`}
                >
                  <FaFire className="w-4 h-4" />
                  Feed
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-400 flex items-center gap-3 ${
                    viewMode === 'timeline'
                      ? 'bg-gradient-to-r from-accent-primary to-accent-tertiary text-white shadow-premium transform scale-105'
                      : 'text-gray-700 hover:glass-subtle hover:scale-102'
                  }`}
                >
                  <MdTimeline className="w-4 h-4" />
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('categories')}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-400 flex items-center gap-3 ${
                    viewMode === 'categories'
                      ? 'bg-gradient-to-r from-accent-secondary to-accent-warning text-white shadow-premium transform scale-105'
                      : 'text-gray-700 hover:glass-subtle hover:scale-102'
                  }`}
                >
                  <BiCategory className="w-4 h-4" />
                  Categorías
                </button>
              </div>

              {/* Premium Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-2xl border transition-all duration-400 flex items-center gap-3 font-bold ${
                  showFilters
                    ? 'bg-gradient-to-r from-accent-primary to-accent-tertiary text-white border-accent-primary shadow-premium'
                    : 'glass-premium text-gray-700 border-white/30 hover:glass-elegant'
                }`}
              >
                <FaFilter className="w-4 h-4" />
                Filtros
                <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Premium Expandable Filters */}
            {showFilters && (
              <div className="mt-6 card-premium p-8 border border-white/30 rounded-3xl shadow-premium animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-3">Período</label>
                    <select
                      value={filter.timeRange}
                      onChange={(e) => handleFilterChange({ timeRange: e.target.value as any })}
                      className="input-premium w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="all">Todos los períodos</option>
                      <option value="today">Hoy</option>
                      <option value="week">Esta semana</option>
                      <option value="month">Este mes</option>
                      <option value="year">Este año</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-3">Perspectiva</label>
                    <select
                      value={filter.perspective}
                      onChange={(e) => handleFilterChange({ perspective: e.target.value as any })}
                      className="input-premium w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="both">Todas las perspectivas</option>
                      <option value="progressive">Solo progresistas</option>
                      <option value="conservative">Solo conservadoras</option>
                      <option value="balanced">Solo balanceadas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-3">Fuente</label>
                    <select
                      value={filter.source || ''}
                      onChange={(e) => handleFilterChange({ source: e.target.value || undefined })}
                      className="input-premium w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      <option value="">Todas las fuentes</option>
                      <option value="el-tiempo">El Tiempo</option>
                      <option value="semana">Semana</option>
                      <option value="el-espectador">El Espectador</option>
                      <option value="portafolio">Portafolio</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 text-base text-gray-600 hover:text-gray-800 transition-colors font-semibold"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Premium Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Premium Loading skeletons
            <div className="space-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="news-card-premium p-8 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 bg-gray-300 rounded-2xl loading-shimmer"></div>
                    <div className="flex-1 space-y-4">
                      <div className="h-6 bg-gray-300 rounded-xl w-3/4 loading-shimmer"></div>
                      <div className="h-4 bg-gray-300 rounded-lg w-full loading-shimmer"></div>
                      <div className="h-4 bg-gray-300 rounded-lg w-2/3 loading-shimmer"></div>
                      <div className="flex gap-6">
                        <div className="h-4 bg-gray-300 rounded-lg w-24 loading-shimmer"></div>
                        <div className="h-4 bg-gray-300 rounded-lg w-20 loading-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {viewMode === 'feed' && (
                <div className="space-y-10">
                  {/* Premium Trending Section */}
                  {getTrendingNews().length > 0 && (
                    <div className="mb-12">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full shadow-premium">
                          <FaFire className="w-5 h-5" />
                          <span className="font-black text-lg">Trending Ahora</span>
                        </div>
                        <div className="text-base text-gray-600 font-semibold">
                          {getTrendingNews().length} artículos
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {getTrendingNews().map((item, index) => (
                          <div key={item.id} className="animate-premium-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                            <EnhancedNewsCard
                              article={item}
                              onArticleClick={() => handleNewsClick(item)}
                              showPerspectiveBadge={true}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Premium Latest News */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <h2 className="text-3xl lg:text-4xl font-black text-gradient-premium flex items-center gap-3">
                          <MdUpdate className="w-8 h-8 text-colombia-blue-600" />
                          Últimas Noticias
                        </h2>
                        <div className="text-base text-gray-600 font-semibold">
                          {filteredNews.length} artículos
                        </div>
                      </div>
                      
                      {selectedCategory && (
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            handleFilterChange({ category: undefined });
                          }}
                          className="text-base text-colombia-blue hover:text-colombia-blue-600 transition-colors flex items-center gap-2 font-semibold"
                        >
                          <FaTimes className="w-4 h-4" />
                          Limpiar categoría
                        </button>
                      )}
                    </div>

                    {/* Premium News Grid */}
                    <div className="space-y-6">
                      {filteredNews.map((item, index) => (
                        <div key={item.id} className="animate-premium-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                          <EnhancedNewsCard
                            article={item}
                            onArticleClick={() => handleNewsClick(item)}
                            showPerspectiveBadge={true}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Premium Infinite Scroll Trigger */}
                    <div ref={observerRef} className="py-12">
                      {isLoadingMore && (
                        <div className="flex justify-center">
                          <div className="glass-premium rounded-2xl px-8 py-4 border border-white/30 shadow-premium">
                            <div className="flex items-center gap-4">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-colombia-blue"></div>
                              <span className="text-gray-600 font-semibold text-lg">Cargando más noticias...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!hasMore && filteredNews.length > 0 && (
                        <div className="text-center text-gray-500">
                          <div className="glass-premium rounded-2xl px-8 py-4 border border-white/30 inline-block shadow-soft">
                            <span className="font-semibold text-lg">Has visto todas las noticias disponibles</span>
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
                <div className="space-y-10">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-black text-gradient-premium mb-6">
                      📂 Explora por Categorías
                    </h2>
                    <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                      Descubre noticias organizadas por temas específicos. 
                      Cada categoría incluye análisis profundo y perspectivas balanceadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group cursor-pointer animate-premium-scale-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className={`${category.color} rounded-4xl p-8 text-white h-full transform hover:scale-105 transition-all duration-600 hover:shadow-premium-lg relative overflow-hidden perspective-3d`}>
                          {/* Premium Background Pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/30 blur-2xl"></div>
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/20 blur-xl"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
                          </div>
                          
                          {/* Premium Shimmer Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-5xl animate-bounce-gentle group-hover:animate-premium-bounce">{category.icon}</span>
                              <div className="glass-subtle rounded-full px-4 py-2 border border-white/30">
                                <span className="text-lg font-black">{category.count}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl lg:text-3xl font-black mb-4 group-hover:text-colombia-yellow-200 transition-colors leading-tight">
                              {category.title}
                            </h3>
                            
                            <p className="text-white/95 text-base lg:text-lg leading-relaxed mb-6">
                              {category.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-base">
                              <span className="opacity-90 font-semibold">Explorar categoría</span>
                              <BiTrendingUp className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card-premium rounded-4xl p-10 border border-white/30 text-center shadow-premium">
                    <div className="flex items-center justify-center gap-3 text-colombia-blue-600 mb-4">
                      <MdVerified className="w-6 h-6" />
                      <span className="font-black text-xl">Contenido Verificado</span>
                    </div>
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
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