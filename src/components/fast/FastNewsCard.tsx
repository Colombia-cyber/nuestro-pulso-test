import React, { memo } from 'react';
import { FaEye, FaComment, FaShare, FaBookmark, FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { FastNewsProps, NewsArticle } from './types';
import { useFastCallback } from './hooks/useFastCallback';

/**
 * FastNewsCard (fast-r7aqkx-223-d)
 * Ultra-fast news card component optimized for local news
 * Features: instant hover effects, lazy loading, accessibility
 */
export const FastNewsCard: React.FC<{
  article: NewsArticle;
  onArticleClick?: (article: NewsArticle) => void;
  showPerspectiveBadge?: boolean;
  compact?: boolean;
  priority?: 'low' | 'normal' | 'high';
  className?: string;
  'data-testid'?: string;
}> = memo(({
  article,
  onArticleClick,
  showPerspectiveBadge = false,
  compact = false,
  priority = 'normal',
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const handleClick = useFastCallback(() => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  }, [onArticleClick, article]);

  const handleKeyDown = useFastCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('es-CO');
  };

  const getPerspectiveColor = (perspective?: string) => {
    switch (perspective) {
      case 'progressive': return 'bg-blue-500';
      case 'conservative': return 'bg-red-500';
      case 'balanced': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerspectiveLabel = (perspective?: string) => {
    switch (perspective) {
      case 'progressive': return 'Progresista';
      case 'conservative': return 'Conservadora';
      case 'balanced': return 'Balanceada';
      default: return 'Neutral';
    }
  };

  const cardClasses = `
    ${compact ? 'p-4' : 'p-6'} 
    bg-white rounded-2xl border border-gray-200 
    hover:shadow-lg hover:border-gray-300 
    transition-all duration-200 cursor-pointer 
    focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
    ${priority === 'high' ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''}
    ${article.trending ? 'bg-gradient-to-r from-orange-50 to-red-50' : ''}
    ${className}
  `.trim();

  return (
    <article
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Leer artículo: ${article.title}`}
      data-testid={testId}
      {...props}
    >
      <div className={`flex gap-4 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
        {/* Article Image */}
        {article.imageUrl && (
          <div className={`${compact ? 'w-24 h-16' : 'w-full sm:w-32 h-24'} flex-shrink-0`}>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover rounded-xl"
              loading={priority === 'high' ? 'eager' : 'lazy'}
              onError={(e) => {
                // Fallback to placeholder on image error
                (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#f3f4f6"/>
                    <text x="50" y="50" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">
                      📰
                    </text>
                  </svg>`
                )}`;
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="flex-1 min-w-0">
          {/* Header with badges */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Badge */}
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {article.category}
              </span>
              
              {/* Local Badge */}
              {article.isLocal && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1">
                  <FaMapMarkerAlt className="w-2 h-2" />
                  Colombia
                </span>
              )}
              
              {/* Trending Badge */}
              {article.trending && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium flex items-center gap-1">
                  <BiTrendingUp className="w-2 h-2" />
                  Trending
                </span>
              )}
              
              {/* Verified Badge */}
              {article.verified && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                  <MdVerified className="w-2 h-2" />
                  Verificado
                </span>
              )}
              
              {/* Perspective Badge */}
              {showPerspectiveBadge && article.perspective && (
                <span className={`px-2 py-1 text-white rounded-full text-xs font-medium flex items-center gap-1 ${getPerspectiveColor(article.perspective)}`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {getPerspectiveLabel(article.perspective)}
                </span>
              )}
            </div>
            
            {/* Timestamp */}
            <span className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
              <FaClock className="w-2 h-2" />
              {formatTimeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors ${
            compact ? 'text-base' : 'text-lg'
          }`}>
            {article.title}
          </h3>

          {/* Summary */}
          {!compact && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Source and Author */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs text-gray-500 truncate">
                {article.author ? `${article.author} • ` : ''}
                {article.source}
              </span>
              {article.location && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="w-2 h-2" />
                    {article.location}
                  </span>
                </>
              )}
            </div>

            {/* Interaction Stats */}
            <div className="flex items-center gap-3 text-xs text-gray-500 flex-shrink-0">
              {article.views && (
                <span className="flex items-center gap-1">
                  <FaEye className="w-3 h-3" />
                  {article.views > 1000 ? `${Math.floor(article.views / 1000)}k` : article.views}
                </span>
              )}
              {article.comments && (
                <span className="flex items-center gap-1">
                  <FaComment className="w-3 h-3" />
                  {article.comments}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1">
                  <FaClock className="w-3 h-3" />
                  {article.readTime}min
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons for non-compact mode */}
          {!compact && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <button
                className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle share
                }}
                aria-label="Compartir artículo"
              >
                <FaShare className="w-3 h-3" />
                Compartir
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle bookmark
                }}
                aria-label="Guardar artículo"
              >
                <FaBookmark className="w-3 h-3" />
                Guardar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

FastNewsCard.displayName = 'FastNewsCard';