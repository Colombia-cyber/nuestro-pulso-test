import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsItem, NewsArticle } from '../types/news';
import { newsService } from '../services/newsService';
import EnhancedNewsCard from '../components/EnhancedNewsCard';

interface ArticleDetailProps {
  onNavigate?: (view: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ onNavigate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [perspectives, setPerspectives] = useState<NewsArticle[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerspective, setSelectedPerspective] = useState<'progressive' | 'conservative' | 'both'>('both');

  useEffect(() => {
    if (!id) {
      setError('Article ID not provided');
      setIsLoading(false);
      return;
    }

    const loadArticleData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate fetching additional data (like Google Search API call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get base article
        const allNews = newsService.getFilteredNews();
        const baseArticle = allNews.find(item => item.id === id);
        
        if (!baseArticle) {
          setError('Article not found');
          setIsLoading(false);
          return;
        }

        setArticle(baseArticle);

        // Get perspectives
        const articlePerspectives = newsService.getArticleWithPerspectives(id);
        setPerspectives(articlePerspectives);

        // Get related articles
        const related = newsService.getRelatedArticles(id);
        setRelatedArticles(related);

        setIsLoading(false);
      } catch (err) {
        setError('Failed to load article details');
        setIsLoading(false);
      }
    };

    loadArticleData();
  }, [id]);

  const handleBackToNews = () => {
    if (onNavigate) {
      onNavigate('feeds');
    } else {
      navigate('/');
    }
  };

  const handleRelatedArticleClick = (relatedArticle: NewsItem) => {
    navigate(`/articles/${relatedArticle.id}`);
  };

  const getSourceIcon = (source: any) => {
    const sourceName = typeof source === 'string' ? source : source.name;
    const sourceIcons: Record<string, string> = {
      'El Tiempo': '📰',
      'El Espectador': '📊',
      'Portafolio': '💼',
      'Semana': '📌',
      'La República': '🏛️',
      'RCN Radio': '📻',
      'Contexto Ganadero': '🐄',
      'DANE': '📈',
      'Ministerio de Salud': '🏥',
      'Redacción': '⚡'
    };
    return sourceIcons[sourceName] || '📰';
  };

  const getSourceName = (source: any): string => {
    return typeof source === 'string' ? source : source.name;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPerspectiveContent = () => {
    if (selectedPerspective === 'both') {
      return perspectives;
    }
    return perspectives.filter(p => p.perspective === selectedPerspective);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando artículo...</h3>
          <p className="text-gray-500">Obteniendo información adicional...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Error al cargar el artículo</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleBackToNews}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a Noticias
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={handleBackToNews}
              className="hover:text-blue-600 transition-colors"
            >
              📰 Noticias
            </button>
            <span>›</span>
            <span className="text-gray-900 font-medium">{article.category}</span>
            <span>›</span>
            <span className="text-gray-900 font-medium line-clamp-1">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {article.imageUrl && (
            <div className="relative h-64 md:h-96">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {getSourceIcon(article.source)} {getSourceName(article.source)}
                  </span>
                  {article.trending && (
                    <span className="bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      🔥 Trending
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {!article.imageUrl && (
                  <>
                    <span className="text-lg">{getSourceIcon(article.source)}</span>
                    <span className="font-medium">{getSourceName(article.source)}</span>
                    <span>•</span>
                  </>
                )}
                <span>{formatDate(article.publishedAt)}</span>
                {article.readTime && (
                  <>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </>
                )}
                {article.author && (
                  <>
                    <span>•</span>
                    <span>Por {article.author}</span>
                  </>
                )}
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {article.summary}
            </p>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Perspective Selector */}
        {perspectives.length > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Perspectivas del Artículo</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPerspective('both')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPerspective === 'both'
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔀 Todas las Perspectivas
              </button>
              <button
                onClick={() => setSelectedPerspective('progressive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPerspective === 'progressive'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔵 Perspectiva Progresista
              </button>
              <button
                onClick={() => setSelectedPerspective('conservative')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPerspective === 'conservative'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔴 Perspectiva Conservadora
              </button>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="space-y-6">
          {getPerspectiveContent().map((perspective) => (
            <div key={perspective.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-l-4 border-blue-500 pl-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {perspective.title}
                </h2>
                <p className="text-sm text-gray-600">
                  Análisis desde una perspectiva {perspective.perspective === 'progressive' ? 'progresista' : 'conservadora'}
                </p>
              </div>
              
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {perspective.fullContent}
              </div>
            </div>
          ))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📝 Artículos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <EnhancedNewsCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  onArticleClick={handleRelatedArticleClick}
                  showPerspectiveBadge={true}
                  compact={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to News Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={handleBackToNews}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Volver a Noticias
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;