import React, { useState } from 'react';
import { FaExternalLinkAlt, FaShare, FaBookmark, FaClock, FaFire, FaEye } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { RealNewsArticle } from '../services/realNewsService';

interface RealNewsCardProps {
  article: RealNewsArticle;
  onClick?: (article: RealNewsArticle) => void;
  onShare?: (article: RealNewsArticle) => void;
  onBookmark?: (article: RealNewsArticle) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
}

const RealNewsCard: React.FC<RealNewsCardProps> = ({
  article,
  onClick,
  onShare,
  onBookmark,
  className = '',
  variant = 'default',
  showActions = true
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Hace unos minutos';
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffHours < 48) return 'Ayer';
    return date.toLocaleDateString('es-CO', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onShare) {
      onShare(article);
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url
        });
      } else {
        await navigator.clipboard.writeText(article.url);
        // Could show a toast notification here
      }
    } catch (error) {
      console.log('Share failed or was cancelled');
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(article);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true);
  };

  const getImageSrc = () => {
    if (imageError) return '/api/placeholder/400/250';
    return article.urlToImage || '/api/placeholder/400/250';
  };

  // Compact variant for lists
  if (variant === 'compact') {
    return (
      <div 
        className={`
          group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md 
          transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700
          hover:border-blue-200 dark:hover:border-blue-700
          ${className}
        `}
        onClick={() => onClick?.(article)}
      >
        <div className="p-4 flex space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
              )}
              <img
                src={getImageSrc()}
                alt={article.title}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <MdVerified className="text-blue-500 text-sm flex-shrink-0" />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {article.source.name}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(article.publishedAt)}
              </span>
              {article.trending && (
                <FaFire className="text-red-500 text-xs" />
              )}
            </div>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {article.readTime}
              </span>
              
              {showActions && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handleBookmark}
                    className={`p-1 rounded transition-colors ${
                      isBookmarked 
                        ? 'text-yellow-500' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    title="Guardar"
                  >
                    <FaBookmark className="text-xs" />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Compartir"
                  >
                    <FaShare className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Featured variant for hero sections
  if (variant === 'featured') {
    return (
      <div 
        className={`
          group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl 
          transition-all duration-300 cursor-pointer overflow-hidden
          transform hover:-translate-y-2 hover:scale-[1.02]
          ${className}
        `}
        onClick={() => onClick?.(article)}
      >
        {/* Large Image */}
        <div className="relative h-64 overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
          )}
          <img
            src={getImageSrc()}
            alt={article.title}
            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Trending badge */}
          {article.trending && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
              <FaFire className="mr-1" />
              TRENDING
            </div>
          )}

          {/* Quick actions overlay */}
          {showActions && (
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isBookmarked 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title="Guardar"
              >
                <FaBookmark className="text-sm" />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                title="Compartir"
              >
                <FaShare className="text-sm" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MdVerified className="text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {article.source.name}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaClock className="mr-1" />
              {formatDate(article.publishedAt)}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {article.description}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {article.readTime} • Lectura
            </div>
            
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Ver original
              <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className={`
        group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl 
        transition-all duration-300 cursor-pointer overflow-hidden
        transform hover:-translate-y-1 hover:scale-[1.02]
        border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700
        ${className}
      `}
      onClick={() => onClick?.(article)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
        )}
        <img
          src={getImageSrc()}
          alt={article.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {article.trending && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <FaFire className="mr-1" />
            TRENDING
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2 text-sm">
          <div className="flex items-center space-x-2">
            <MdVerified className="text-blue-500" />
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {article.source.name}
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FaClock className="mr-1" />
            {formatDate(article.publishedAt)}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {article.readTime}
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded transition-colors ${
                  isBookmarked 
                    ? 'text-yellow-500' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
                title="Guardar"
              >
                <FaBookmark className="text-sm" />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="Compartir"
              >
                <FaShare className="text-sm" />
              </button>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                title="Ver original"
              >
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealNewsCard;