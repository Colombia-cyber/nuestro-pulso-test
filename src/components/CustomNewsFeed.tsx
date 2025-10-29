import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaFire, FaClock, FaEye, FaComment, FaShare, FaBookmark, FaFilter, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdTimeline } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import EnhancedNewsCard from './EnhancedNewsCard';
import ModernNewsGrid from './ModernNewsGrid';
import ModernNewsSidebar from './ModernNewsSidebar';
import TimelineView from './TimelineView';
import ModernFilterSystem from './ModernFilterSystem';
import RelatedContent from './RelatedContent';
import { NewsSkeleton } from './SkeletonLoader';
import { NewsItem, NewsFilter, CategoryCard } from '../types/news';
import newsService from '../services/newsService';

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
  topic?: string;
}

interface LiveStats {
  totalArticles: number;
  readingTime: number;
  activeReaders: number;
  lastUpdate: Date;
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate, topic = 'colombia-news' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'moderno' | 'feed' | 'timeline' | 'categorias'>('moderno');
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
  
  // Updated filters structure to match ModernFilterSystem
  const [filters, setFilters] = useState({
    timeRange: 'all',
    perspective: 'both',
    category: 'all',
    source: '',
    platform: 'all',
    language: '',
    isLive: false,
    isTrending: false,
    isVerified: false
  });

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      timeRange: 'all',
      perspective: 'both',
      category: 'all',
      source: '',
      platform: 'all',
      language: '',
      isLive: false,
      isTrending: false,
      isVerified: false
    });
  };

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
      const allNews = newsService.getFilteredNews({
        timeRange: filters.timeRange as any,
        perspective: filters.perspective as any,
        category: filters.category,
        source: filters.source
      });
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
  }, [filters, newsData.length, isLoadingMore, hasMore]);

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
        
        const news = newsService.getFilteredNews({
          timeRange: filters.timeRange as any,
          perspective: filters.perspective as any,
          category: filters.category,
          source: filters.source
        });
        const timeline = newsService.generateTimelineData();
        
        setNewsData(news.slice(0, 10)); // Start with first 10 items
        setTimelineData(timeline);
        setPage(1);
        setHasMore(news.length > 10);
        
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading data:', error);
        // Use fallback data
        const fallbackNews = newsService.getFilteredNews({
          timeRange: filters.timeRange as any,
          perspective: filters.perspective as any,
          category: filters.category,
          source: filters.source
        });
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
  }, [filters.timeRange, filters.perspective, filters.category]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilters(prev => ({ ...prev, category: categoryId }));
    setViewMode('feed');
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNavigate) {
      onNavigate('article', newsItem.id);
    }
  };

  const handleVideoPlay = (newsItem: NewsItem) => {
    console.log('Playing video for:', newsItem.title);
    // Handle video play logic here
  };

  const handleVideoClick = (videoId: string) => {
    console.log('Playing video with ID:', videoId);
    // Handle video click logic here
  };

  const handleFilterChange_old = (newFilter: Partial<NewsFilter>) => {
    // Legacy function for compatibility
    console.log('Legacy filter change:', newFilter);
  };

  const clearFilters_old = () => {
    // Legacy function for compatibility  
    setFilters({
      timeRange: 'all',
      perspective: 'both',
      category: 'all',
      source: '',
      platform: 'all',
      language: '',
      isLive: false,
      isTrending: false,
      isVerified: false
    });
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
      {/* Modern Filter System */}
      <ModernFilterSystem
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        type="news"
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Modern Loading skeletons
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <NewsSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {viewMode === 'moderno' && (
                <div className="flex gap-6">
                  <div className="flex-1">
                    <ModernNewsGrid
                      newsData={filteredNews}
                      isLoading={false}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onArticleClick={handleNewsClick}
                      onVideoPlay={handleVideoPlay}
                    />
                  </div>
                  <div className="hidden lg:block w-80 flex-shrink-0">
                    <ModernNewsSidebar
                      recentNews={filteredNews}
                      onArticleClick={handleNewsClick}
                      onTopicClick={(topic) => setSearchQuery(topic)}
                      onVideoClick={handleVideoClick}
                    />
                  </div>
                </div>
              )}

              {viewMode === 'feed' && (
                <div className="space-y-6">
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
                            handleClearFilters();
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
                        <div key={item.id} className="space-y-4">
                          <EnhancedNewsCard
                            article={item}
                            onArticleClick={() => handleNewsClick(item)}
                            showPerspectiveBadge={true}
                          />
                          <RelatedContent
                            itemId={item.id}
                            itemType="article"
                            count={2}
                            className="ml-4"
                          />
                        </div>
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

              {viewMode === 'categorias' && (
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