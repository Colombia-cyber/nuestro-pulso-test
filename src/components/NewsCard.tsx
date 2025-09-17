import React, { useState } from 'react';
import { NewsArticle } from '../types/news';
import { getCategoryConfig } from '../config/categories';
import NewsModal from './NewsModal';

interface NewsCardProps {
  article: NewsArticle;
  onCommentClick?: (articleId: string, politicalLean: 'left' | 'right') => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onCommentClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const categoryConfig = getCategoryConfig(article.category);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCommentButtonClick = (e: React.MouseEvent, politicalLean: 'left' | 'right') => {
    e.stopPropagation();
    if (onCommentClick) {
      onCommentClick(article.id, politicalLean);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden group"
        onClick={handleCardClick}
      >
        {/* Image Section */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {article.urlToImage && !imageError ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-6xl opacity-30">{categoryConfig.icon}</div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 ${categoryConfig.color} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            <span className="mr-1">{categoryConfig.icon}</span>
            {categoryConfig.name}
          </div>

          {/* Verified Badge */}
          {article.verified && (
            <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
              <span className="text-sm">✓</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {truncateText(article.description, 150)}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Source and Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">{article.source.name}</span>
              {article.author && (
                <span className="ml-2">por {article.author}</span>
              )}
            </div>
            {article.readTime && (
              <span className="flex items-center">
                <span className="mr-1">📖</span>
                {article.readTime} min
              </span>
            )}
          </div>

          {/* Date */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="mr-1">📅</span>
            {formatDate(article.publishedAt)}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={(e) => handleCommentButtonClick(e, 'left')}
              className="flex items-center justify-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <span className="mr-1">⬅️</span>
              Izquierda
            </button>
            <button
              onClick={(e) => handleCommentButtonClick(e, 'right')}
              className="flex items-center justify-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <span className="mr-1">➡️</span>
              Derecha
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Modal */}
      {showModal && (
        <NewsModal
          article={article}
          onClose={() => setShowModal(false)}
          onCommentClick={onCommentClick}
        />
      )}
    </>
  );
};

export default NewsCard;