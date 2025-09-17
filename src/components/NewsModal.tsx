import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types/news';
import { getCategoryConfig } from '../config/categories';

interface NewsModalProps {
  article: NewsArticle;
  onClose: () => void;
  onCommentClick?: (articleId: string, politicalLean: 'left' | 'right') => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ article, onClose, onCommentClick }) => {
  const [imageError, setImageError] = useState(false);
  const categoryConfig = getCategoryConfig(article.category);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCommentClick = (politicalLean: 'left' | 'right') => {
    if (onCommentClick) {
      onCommentClick(article.id, politicalLean);
    }
    onClose();
  };

  const handleExternalLink = () => {
    if (article.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center space-x-4">
            <div className={`${categoryConfig.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
              <span className="mr-1">{categoryConfig.icon}</span>
              {categoryConfig.name}
            </div>
            {article.verified && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <span className="mr-1">✓</span>
                Verificado
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        {article.urlToImage && !imageError && (
          <div className="relative h-64 md:h-80 bg-gray-200 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <span className="mr-1">📰</span>
              <span className="font-semibold">{article.source.name}</span>
            </div>
            {article.author && (
              <div className="flex items-center">
                <span className="mr-1">✍️</span>
                <span>Por {article.author}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="mr-1">📅</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center">
                <span className="mr-1">📖</span>
                <span>{article.readTime} min de lectura</span>
              </div>
            )}
          </div>

          {/* Description/Lead */}
          <div className="text-lg text-gray-700 mb-6 leading-relaxed">
            {article.description}
          </div>

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-6">
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Temas relacionados:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              💭 Únete a la Conversación
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Comparte tu perspectiva política sobre esta noticia
            </p>
            
            {/* Comment Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleCommentClick('left')}
                className="flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="mr-2 text-xl">⬅️</span>
                Perspectiva de Izquierda
              </button>
              <button
                onClick={() => handleCommentClick('right')}
                className="flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="mr-2 text-xl">➡️</span>
                Perspectiva de Derecha
              </button>
            </div>

            {/* External Link */}
            {article.url && (
              <div className="text-center">
                <button
                  onClick={handleExternalLink}
                  className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors duration-200"
                >
                  <span className="mr-2">🔗</span>
                  Leer artículo completo
                  <span className="ml-2">↗️</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;