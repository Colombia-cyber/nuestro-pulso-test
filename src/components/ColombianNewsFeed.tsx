import React, { useState, useEffect } from 'react';
import { NewsArticle, NewsCategory, SearchFilters } from '../types/news';
import { NEWS_CATEGORIES } from '../config/categories';
import { googleNewsService } from '../services/googleNewsService';
import NewsCard from './NewsCard';

interface ColombianNewsFeedProps {
  selectedCategory?: NewsCategory;
  onCommentClick?: (articleId: string, politicalLean: 'left' | 'right') => void;
}

const ColombianNewsFeed: React.FC<ColombianNewsFeedProps> = ({ 
  selectedCategory, 
  onCommentClick 
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<NewsCategory | null>(selectedCategory || null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadNews(true);
  }, [activeCategory]);

  const loadNews = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = reset ? 1 : page;
      const filters: SearchFilters = {
        category: activeCategory || undefined,
        page: currentPage,
        pageSize: 12,
        sortBy: 'publishedAt',
        language: 'es',
        country: 'co'
      };

      const response = await googleNewsService.searchNews(filters);
      
      if (response.status === 'ok') {
        if (reset) {
          setArticles(response.articles);
          setPage(2);
        } else {
          setArticles(prev => [...prev, ...response.articles]);
          setPage(prev => prev + 1);
        }
        
        // Check if there are more articles
        setHasMore(response.articles.length === filters.pageSize);
      } else {
        throw new Error('Error al cargar las noticias');
      }
    } catch (err) {
      console.error('Error loading news:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: NewsCategory | null) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadNews(false);
    }
  };

  const getCategoryName = (categoryId: NewsCategory | null): string => {
    if (!categoryId) return 'Todas las Noticias';
    return NEWS_CATEGORIES.find(cat => cat.id === categoryId)?.name || 'Categoría';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📰 Noticias de Colombia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado con las últimas noticias de Colombia desde múltiples perspectivas políticas
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 min-w-max pb-4">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center whitespace-nowrap ${
                activeCategory === null
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2">📰</span>
              Todas
            </button>
            
            {NEWS_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center whitespace-nowrap ${
                  activeCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Category */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {activeCategory && (
              <span className="mr-3 text-3xl">
                {NEWS_CATEGORIES.find(cat => cat.id === activeCategory)?.icon}
              </span>
            )}
            {getCategoryName(activeCategory)}
          </h2>
          {activeCategory && (
            <p className="text-gray-600 mt-2">
              {NEWS_CATEGORIES.find(cat => cat.id === activeCategory)?.description}
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error al cargar noticias</h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => loadNews(true)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && articles.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Cargando noticias...</h3>
              <p className="text-gray-500">Por favor espera un momento</p>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onCommentClick={onCommentClick}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Cargando...
                    </div>
                  ) : (
                    'Cargar más noticias'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📰</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No se encontraron noticias
            </h3>
            <p className="text-gray-600 mb-6">
              No hay noticias disponibles para la categoría seleccionada en este momento.
            </p>
            <button
              onClick={() => handleCategoryChange(null)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Ver todas las categorías
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColombianNewsFeed;