import React, { useState, useEffect } from 'react';
import { NewsItem, NewsArticle } from '../types/news';
import { newsService } from '../services/newsService';
import Comments from './Comments';

interface NewsArticleDetailProps {
  articleId: string;
  onClose: () => void;
  isModal?: boolean;
}

interface NewsDetailComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: NewsDetailComment[];
}

const NewsArticleDetail: React.FC<NewsArticleDetailProps> = ({ 
  articleId, 
  onClose,
  isModal = true 
}) => {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [perspectives, setPerspectives] = useState<NewsArticle[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [selectedPerspective, setSelectedPerspective] = useState<'progressive' | 'conservative' | 'both'>('both');
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comments] = useState<NewsDetailComment[]>([
    {
      id: '1',
      author: 'María López',
      content: 'Muy interesante este análisis. Es importante considerar todas las perspectivas.',
      timestamp: '2024-01-15T10:30:00Z',
      likes: 12,
      replies: [
        {
          id: '1-1',
          author: 'Carlos Ruiz',
          content: 'Estoy de acuerdo, la información está muy completa.',
          timestamp: '2024-01-15T11:00:00Z',
          likes: 5
        }
      ]
    },
    {
      id: '2',
      author: 'Ana García',
      content: 'Gracias por presentar múltiples puntos de vista sobre este tema.',
      timestamp: '2024-01-15T09:45:00Z',
      likes: 8
    }
  ]);

  useEffect(() => {
    const loadArticleData = async () => {
      setIsLoading(true);
      
      try {
        // Get the main article
        const filteredNews = newsService.getFilteredNews();
        const foundArticle = filteredNews.find(item => item.id === articleId);
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Get perspectives
          const articlePerspectives = newsService.getArticleWithPerspectives(articleId);
          setPerspectives(articlePerspectives);
          
          // Get related articles
          const related = newsService.getRelatedArticles(articleId);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticleData();
  }, [articleId]);

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

  const getSourceIcon = (source: string | any) => {
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

  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'conservative':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'both':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPerspectiveLabel = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return '🔵 Progresista';
      case 'conservative':
        return '🔴 Conservadora';
      case 'both':
        return '⚖️ Balanceada';
      default:
        return '📰 Neutral';
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: article.shareUrl || window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else if (article) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(article.shareUrl || window.location.href);
        alert('Enlace copiado al portapapeles');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  const handleRelatedArticleClick = (relatedArticleId: string) => {
    // For now, just close current and open the new one
    // In a real app, this would navigate properly
    onClose();
    // This would be handled by the parent component to open new article
    console.log('Navigate to related article:', relatedArticleId);
  };

  if (isLoading) {
    return (
      <div className={`${isModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' : ''}`}>
        <div className={`${isModal ? 'bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden' : 'w-full'}`}>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando artículo...</h3>
            <p className="text-gray-500">Obteniendo contenido detallado</p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={`${isModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' : ''}`}>
        <div className={`${isModal ? 'bg-white rounded-lg shadow-xl max-w-2xl w-full p-8' : 'w-full p-8'}`}>
          <div className="text-center">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Artículo no encontrado</h3>
            <p className="text-gray-500 mb-6">El artículo que buscas no existe o ha sido removido.</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getSourceIcon(article.source)}</span>
            <div>
              <div className="font-semibold">
                {typeof article.source === 'string' ? article.source : article.source.name}
              </div>
              <div className="text-white/80 text-sm">{formatDate(article.publishedAt)}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {article.readTime && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {article.readTime}
              </span>
            )}
            {article.trending && (
              <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Trending
              </span>
            )}
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h1>
        <p className="text-white/90 text-lg leading-relaxed">{article.summary}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className={`px-4 py-2 rounded-full text-sm font-medium border bg-white/20 text-white border-white/30`}>
            {getPerspectiveLabel(article.perspective)}
          </span>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              📤 Compartir
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              💬 Comentarios ({comments.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Image */}
          {article.imageUrl && (
            <div className="mb-6">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Perspectives */}
          {perspectives.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Perspectivas del Artículo</h2>
              
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setSelectedPerspective('both')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPerspective === 'both'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⚖️ Todas
                </button>
                {perspectives.some(p => p.perspective === 'progressive') && (
                  <button
                    onClick={() => setSelectedPerspective('progressive')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPerspective === 'progressive'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🔵 Progresista
                  </button>
                )}
                {perspectives.some(p => p.perspective === 'conservative') && (
                  <button
                    onClick={() => setSelectedPerspective('conservative')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPerspective === 'conservative'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🔴 Conservadora
                  </button>
                )}
              </div>

              {perspectives
                .filter(p => selectedPerspective === 'both' || p.perspective === selectedPerspective)
                .map((perspective, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{perspective.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPerspectiveColor(perspective.perspective)}`}>
                        {getPerspectiveLabel(perspective.perspective)}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {perspective.fullContent.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Author */}
          {article.author && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Por {article.author}</div>
                  <div className="text-gray-600 text-sm">
                    {typeof article.source === 'string' ? article.source : article.source.name}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Artículos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => handleRelatedArticleClick(related.id)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <span>{getSourceIcon(related.source)}</span>
                      <span>{typeof related.source === 'string' ? related.source : related.source.name}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {related.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {showComments && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">💬 Comentarios ({comments.length})</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">{comment.author}</span>
                        <span className="text-gray-500 text-xs">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 text-sm">
                        ❤️ {comment.likes}
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-white rounded p-3">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                  {reply.author.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-900 text-xs">{reply.author}</span>
                                <span className="text-gray-400 text-xs">
                                  {formatDate(reply.timestamp)}
                                </span>
                              </div>
                              <button className="text-gray-400 hover:text-red-500 text-xs">
                                ❤️ {reply.likes}
                              </button>
                            </div>
                            <p className="text-gray-600 text-xs">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        {content}
      </div>
    </div>
  );
};

export default NewsArticleDetail;