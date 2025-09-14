import React, { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface NewsCardProps {
  article: Article;
  isExpanded?: boolean;
  onToggleExpand: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isExpanded, onToggleExpand }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02] mb-4">
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
            {article.source?.name || 'Fuente'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString('es-CO', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className={`text-gray-700 leading-relaxed mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {article.description}
        </p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleExpand}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? 'Ver menos' : 'Leer más'}
          </button>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver artículo completo
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

interface EnhancedNewsFeedProps {
  onClose?: () => void;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

const EnhancedNewsFeed: React.FC<EnhancedNewsFeedProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('colombia');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'colombia', name: 'Colombia', query: 'Colombia OR "Gustavo Petro" OR Bogotá', color: 'bg-yellow-500' },
    { id: 'politics', name: 'Política', query: 'política OR congreso OR senado', color: 'bg-blue-500' },
    { id: 'economy', name: 'Economía', query: 'economía OR PIB OR inflación', color: 'bg-green-500' },
    { id: 'security', name: 'Seguridad', query: 'seguridad OR violencia OR paz', color: 'bg-red-500' },
    { id: 'international', name: 'Internacional', query: 'internacional OR "Estados Unidos" OR Venezuela', color: 'bg-purple-500' }
  ];

  const fetchNews = async (categoryQuery: string, pageNum: number = 1) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(categoryQuery)}&language=es&sortBy=publishedAt&page=${pageNum}&pageSize=10&apiKey=${NEWS_API_KEY}`
      );
      const data = await res.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  };

  const loadNews = async (category: string, pageNum: number = 1, append: boolean = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);

    const selectedCat = categories.find(cat => cat.id === category);
    const newArticles = await fetchNews(selectedCat?.query || 'Colombia', pageNum);
    
    if (append) {
      setArticles(prev => [...prev, ...newArticles]);
    } else {
      setArticles(newArticles);
    }
    
    setHasMore(newArticles.length === 10);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    loadNews(selectedCategory, 1, false);
    setPage(1);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedArticles(new Set());
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNews(selectedCategory, nextPage, true);
  };

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedArticles(newExpanded);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">📰 Noticias en Vivo</h2>
              <p className="opacity-90">Mantente informado con las últimas noticias de Colombia</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300 transform
                  ${selectedCategory === category.id 
                    ? `${category.color} text-white shadow-lg scale-105` 
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-lg text-gray-600">Cargando noticias...</span>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {articles.map((article, index) => (
                  <NewsCard
                    key={`${article.url}-${index}`}
                    article={article}
                    isExpanded={expandedArticles.has(index)}
                    onToggleExpand={() => toggleExpand(index)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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
        </div>
      </div>
    </div>
  );
};

export default EnhancedNewsFeed;