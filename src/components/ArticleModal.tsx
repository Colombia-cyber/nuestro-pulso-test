import React, { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaExternalLinkAlt, 
  FaShare, 
  FaBookmark, 
  FaThumbsUp,
  FaClock,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner
} from 'react-icons/fa';
import { BiFullscreen } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { realNewsService, RealNewsArticle } from '../services/realNewsService';

interface ArticleModalProps {
  article: RealNewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

interface ArticleContent {
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  images: string[];
  source: { name: string; url: string };
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}) => {
  const [fullContent, setFullContent] = useState<ArticleContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    if (article && isOpen) {
      loadFullContent();
    }
  }, [article, isOpen]);

  const loadFullContent = async () => {
    if (!article) return;

    setIsLoadingContent(true);
    setError(null);

    try {
      const content = await realNewsService.getArticleContent(article.id, article.url);
      if (content) {
        setFullContent(content);
      } else {
        // Fallback to article data if full content not available
        setFullContent({
          title: article.title,
          content: article.content || article.description,
          author: article.author,
          publishedAt: article.publishedAt,
          images: article.urlToImage ? [article.urlToImage] : [],
          source: {
            name: article.source.name,
            url: article.url
          }
        });
      }
    } catch (err) {
      setError('Error al cargar el artículo completo');
      console.error('Failed to load article content:', err);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleShare = async () => {
    if (!article) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(article.url);
        alert('Enlace copiado al portapapeles');
      } catch (err) {
        console.error('Failed to copy to clipboard');
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to user's bookmarks
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && hasNext && onNext) {
      onNext();
    }
  };

  if (!isOpen || !article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className={`relative h-full w-full ${showFullscreen ? 'p-0' : 'p-4'} flex items-center justify-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`
          bg-white dark:bg-gray-900 
          ${showFullscreen ? 'w-full h-full' : 'max-w-4xl max-h-[90vh] rounded-lg shadow-2xl'}
          overflow-hidden flex flex-col
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              {/* Navigation arrows */}
              {hasPrevious && onPrevious && (
                <button
                  onClick={onPrevious}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Artículo anterior"
                >
                  <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
                </button>
              )}
              
              {hasNext && onNext && (
                <button
                  onClick={onNext}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Siguiente artículo"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-300" />
                </button>
              )}

              {/* Source info */}
              <div className="flex items-center space-x-2">
                <MdVerified className="text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {article.source.name}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Action buttons */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-300'
                }`}
                title="Guardar artículo"
              >
                <FaBookmark />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                title="Compartir artículo"
              >
                <FaShare />
              </button>

              <button
                onClick={() => setShowFullscreen(!showFullscreen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                title="Pantalla completa"
              >
                <BiFullscreen />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                title="Cerrar"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingContent ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mx-auto" />
                  <p className="text-gray-600 dark:text-gray-300">Cargando artículo completo...</p>
                </div>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Error al cargar el artículo
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                <button
                  onClick={loadFullContent}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            ) : fullContent ? (
              <div className="p-6">
                {/* Article header */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {fullContent.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <FaUser />
                      <span>{fullContent.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>{formatDate(fullContent.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{article.readTime} lectura</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured image */}
                {fullContent.images && fullContent.images.length > 0 && (
                  <div className="mb-6">
                    <img
                      src={fullContent.images[0]}
                      alt={fullContent.title}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/800/400';
                      }}
                    />
                  </div>
                )}

                {/* Article content */}
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: fullContent.content }}
                />

                {/* Additional images */}
                {fullContent.images && fullContent.images.length > 1 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fullContent.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Imagen ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/placeholder/400/300';
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Footer with source link */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Fuente: {fullContent.source.name}
                    </div>
                    <a
                      href={fullContent.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Ver artículo original</span>
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;