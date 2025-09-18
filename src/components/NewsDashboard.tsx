import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types/news';
import enhancedNewsService from '../services/enhancedNewsService';
import EnhancedNewsCard from './EnhancedNewsCard';
import FreshnessIndicator from './FreshnessIndicator';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

interface NewsDashboardProps {
  onArticleClick?: (article: NewsItem) => void;
  showBreakingNews?: boolean;
  enableLiveUpdates?: boolean;
}

const NewsDashboard: React.FC<NewsDashboardProps> = ({
  onArticleClick,
  showBreakingNews = true,
  enableLiveUpdates = true
}) => {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedPerspective, setSelectedPerspective] = useState<string>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load more news for infinite scroll
  const loadMoreNews = useCallback(async () => {
    if (loadingMore || !hasMoreNews) return;
    
    setLoadingMore(true);
    try {
      // Simulate loading more news (in real app, this would fetch next page)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const moreNews = await enhancedNewsService.getAllNews();
      
      // In a real implementation, you'd append new results
      // For demo, we'll just show current results
      if (moreNews.length === 0) {
        setHasMoreNews(false);
      } else {
        setPage(prev => prev + 1);
        // In real app: setFilteredNews(prev => [...prev, ...newResults]);
      }
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMoreNews]);

  // Infinite scroll hook
  const { isFetching } = useInfiniteScroll({
    hasMore: hasMoreNews,
    loading: loading || loadingMore,
    onLoadMore: loadMoreNews,
    threshold: 0.8
  });

  // Categories with Colombian flag styling
  const categories = [
    { id: 'todos', name: 'Todos', icon: '🇨🇴', color: 'from-yellow-400 via-blue-500 to-red-500' },
    { id: 'local', name: 'Local', icon: '🏛️', color: 'from-blue-500 to-blue-600' },
    { id: 'internacional', name: 'Mundial', icon: '🌍', color: 'from-green-500 to-green-600' },
    { id: 'política', name: 'Política', icon: '🏛️', color: 'from-purple-500 to-purple-600' },
    { id: 'congreso', name: 'Congreso', icon: '🏛️', color: 'from-indigo-500 to-indigo-600' },
    { id: 'economía', name: 'Economía', icon: '💰', color: 'from-emerald-500 to-emerald-600' },
    { id: 'seguridad', name: 'Seguridad', icon: '🚨', color: 'from-red-500 to-red-600' },
    { id: 'legislación', name: 'Legislación', icon: '⚖️', color: 'from-gray-500 to-gray-600' },
    { id: 'opinión', name: 'El Pulso', icon: '🇨🇴', color: 'from-yellow-400 via-blue-500 to-red-500' }
  ];

  const perspectives = [
    { id: 'both', name: 'Balanceado', icon: '⚖️', color: 'from-yellow-400 via-blue-500 to-red-500' },
    { id: 'progressive', name: 'Progresista', icon: '🔵', color: 'from-blue-500 to-cyan-500' },
    { id: 'conservative', name: 'Conservadora', icon: '🔴', color: 'from-red-500 to-orange-500' }
  ];

  // Load news data
  const loadNews = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(!forceRefresh); // Don't show loading spinner for refresh
      setError(null);

      const [allNewsData, breakingNewsData, trendingNewsData] = await Promise.all([
        enhancedNewsService.getAllNews(forceRefresh),
        enhancedNewsService.getBreakingNews(),
        enhancedNewsService.getTrendingNews()
      ]);

      setAllNews(allNewsData);
      setBreakingNews(breakingNewsData);
      setTrendingNews(trendingNewsData);
      setLastUpdateTime(new Date());

      // Apply current filters
      applyFilters(allNewsData);
    } catch (err) {
      console.error('Error loading news:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar noticias');
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters to news
  const applyFilters = useCallback((newsData: NewsItem[] = allNews) => {
    let filtered = [...newsData];

    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(item => {
        const itemCategory = typeof item.category === 'string' ? item.category : item.category;
        return itemCategory.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    // Filter by perspective
    if (selectedPerspective !== 'both') {
      filtered = filtered.filter(item => 
        item.perspective === selectedPerspective || item.perspective === 'both'
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const searchText = `${item.title} ${item.summary} ${item.tags?.join(' ') || ''}`.toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredNews(filtered);
  }, [allNews, selectedCategory, selectedPerspective, searchQuery]);

  // Handle like toggle
  const handleLike = useCallback((articleId: string) => {
    setLikedArticles(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId);
      } else {
        newLiked.add(articleId);
      }
      return newLiked;
    });
  }, []);

  // Live updates
  useEffect(() => {
    if (enableLiveUpdates) {
      enhancedNewsService.startLiveUpdates();
      
      const updateListener = (articles: NewsItem[]) => {
        setAllNews(articles);
        setLastUpdateTime(new Date());
        applyFilters(articles);
        setIsLiveUpdating(false);
      };

      const errorListener = (error: string) => {
        setError(error);
        setIsLiveUpdating(false);
      };

      enhancedNewsService.addUpdateListener(updateListener);
      enhancedNewsService.addErrorListener(errorListener);

      // Periodic refresh indicator
      const refreshInterval = setInterval(() => {
        setIsLiveUpdating(true);
      }, 30000);

      return () => {
        enhancedNewsService.stopLiveUpdates();
        enhancedNewsService.removeUpdateListener(updateListener);
        enhancedNewsService.removeErrorListener(errorListener);
        clearInterval(refreshInterval);
      };
    }
  }, [enableLiveUpdates, applyFilters]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Initial load
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleRefresh = () => {
    setIsLiveUpdating(true);
    loadNews(true);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePerspectiveChange = (perspectiveId: string) => {
    setSelectedPerspective(perspectiveId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading && allNews.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-blue-500 border-r-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando Noticias</h3>
          <p className="text-gray-500">Conectando con fuentes de noticias en tiempo real...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 bg-clip-text text-transparent">
                🇨🇴 Noticias en Tiempo Real
              </h1>
              <p className="text-gray-600 mt-1">
                Información actualizada desde múltiples fuentes colombianas
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <FreshnessIndicator 
                publishedAt={lastUpdateTime.toISOString()} 
                isLive={isLiveUpdating}
                className="text-sm"
              />
              <button
                onClick={handleRefresh}
                className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                disabled={loading}
              >
                {loading ? '🔄' : '↻'} Actualizar
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Perspective Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Perspectiva</h3>
            <div className="flex flex-wrap gap-2">
              {perspectives.map((perspective) => (
                <button
                  key={perspective.id}
                  onClick={() => handlePerspectiveChange(perspective.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedPerspective === perspective.id
                      ? `bg-gradient-to-r ${perspective.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {perspective.icon} {perspective.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Banner */}
      {showBreakingNews && breakingNews.length > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-red-600 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                🚨 ÚLTIMA HORA
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {breakingNews.map((news, index) => (
                    <span key={news.id} className="mr-8">
                      {news.title}
                      {index < breakingNews.length - 1 && ' • '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 mt-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                📰
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{allNews.length}</div>
                <div className="text-sm text-gray-600">Total Noticias</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                🚨
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{breakingNews.length}</div>
                <div className="text-sm text-gray-600">Última Hora</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                🔥
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{trendingNews.length}</div>
                <div className="text-sm text-gray-600">Trending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                🇨🇴
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{filteredNews.length}</div>
                <div className="text-sm text-gray-600">Filtradas</div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <EnhancedNewsCard
                  key={article.id}
                  article={article}
                  onArticleClick={onArticleClick}
                  onLike={handleLike}
                  isLiked={likedArticles.has(article.id)}
                  showPerspectiveBadge={true}
                  compact={false}
                />
              ))}
            </div>

            {/* Infinite Scroll Loading Indicator */}
            {(loadingMore || isFetching) && hasMoreNews && (
              <div className="flex justify-center py-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-4 border-yellow-400 border-t-blue-500 border-r-red-500 rounded-full animate-spin"></div>
                    <span className="text-gray-600 font-medium">Cargando más noticias...</span>
                  </div>
                </div>
              </div>
            )}

            {/* End of Content Indicator */}
            {!hasMoreNews && filteredNews.length > 0 && (
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="text-2xl mb-2">🇨🇴</div>
                  <div className="font-semibold mb-1">¡Has visto todas las noticias!</div>
                  <div className="text-sm opacity-90">Regresa pronto para más actualizaciones</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron noticias</h3>
            <p className="text-gray-600 mb-4">
              Intenta cambiar los filtros o el término de búsqueda
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedPerspective('both');
                setSearchQuery('');
              }}
              className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDashboard;