import React, { useState, useRef, useEffect } from 'react';
import { NewsItem, NewsSource } from '../types/news';
import FreshnessIndicator from './FreshnessIndicator';

interface EnhancedNewsCardProps {
  article: NewsItem;
  onArticleClick?: (article: NewsItem) => void;
  showPerspectiveBadge?: boolean;
  compact?: boolean;
  onLike?: (articleId: string) => void;
  isLiked?: boolean;
}

const EnhancedNewsCard: React.FC<EnhancedNewsCardProps> = ({ 
  article, 
  onArticleClick,
  showPerspectiveBadge = true,
  compact = false,
  onLike,
  isLiked = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getSourceIcon = (source: string | NewsSource) => {
    const sourceName = typeof source === 'string' ? source : source.name;
    const sourceIcons: Record<string, string> = {
      'El Tiempo': '📰',
      'El Espectador': '📊',
      'Portafolio': '💼',
      'Semana': '📌',
      'La República': '🏛️',
      'RCN Radio': '📻',
      'Caracol Radio': '📡',
      'El Pulso': '🇨🇴',
      'Contexto Ganadero': '🐄',
      'DANE': '📈',
      'Ministerio de Salud': '🏥',
      'Redacción': '⚡',
      'Google Search': '🔍'
    };
    
    return sourceIcons[sourceName] || '📰';
  };

  const getSourceName = (source: string | NewsSource): string => {
    return typeof source === 'string' ? source : source.name;
  };

  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return 'from-blue-500 to-cyan-500';
      case 'conservative':
        return 'from-red-500 to-orange-500';
      case 'both':
        return 'from-yellow-400 via-blue-500 to-red-500'; // Colombian flag colors
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getPerspectiveLabel = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return '🔵 Perspectiva Progresista';
      case 'conservative':
        return '🔴 Perspectiva Conservadora';
      case 'both':
        return '🇨🇴 Análisis Balanceado';
      default:
        return '📰 Neutral';
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: article.shareUrl || window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink(e);
    }
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(article.shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(article.id);
  };

  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  const cardClasses = `
    relative group cursor-pointer transform transition-all duration-500 ease-out
    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    ${isHovered ? 'scale-105 shadow-2xl shadow-colombian-flag' : 'scale-100 shadow-lg'}
    ${compact ? 'h-auto' : 'h-auto'}
    bg-white rounded-2xl overflow-hidden border border-gray-200
    hover:border-transparent hover:shadow-xl
  `;

  const gradientOverlayClasses = `
    absolute inset-0 bg-gradient-to-br ${getPerspectiveColor(article.perspective)}
    opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none
  `;

  if (compact) {
    return (
      <div 
        ref={cardRef}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cardClasses + " p-4"}
      >
        {/* Colombian Flag Gradient Overlay */}
        <div className={gradientOverlayClasses}></div>

        {/* Breaking News Badge */}
        {article.isBreaking && (
          <div className="absolute top-2 left-2 z-20">
            <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              🚨 ÚLTIMA HORA
            </div>
          </div>
        )}

        <div className="flex items-start space-x-3 relative z-10">
          {!imageError && article.imageUrl && (
            <div className="flex-shrink-0">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-16 h-16 rounded-lg object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{getSourceIcon(article.source)}</span>
              <span className="text-xs font-medium text-gray-600">{getSourceName(article.source)}</span>
              <span className="text-xs text-gray-400">•</span>
              <FreshnessIndicator publishedAt={article.publishedAt} isLive={article.isBreaking} />
              {article.trending && !article.isBreaking && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    🔥 Trending
                  </span>
                </>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            
            <div className="flex items-center justify-between">
              {showPerspectiveBadge && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPerspectiveColor(article.perspective)} text-white`}>
                  {getPerspectiveLabel(article.perspective)}
                </span>
              )}
              
              <div className="flex items-center space-x-2">
                {article.readTime && (
                  <span className="text-xs text-gray-500">📖 {article.readTime}</span>
                )}
                
                <button
                  onClick={handleLike}
                  className={`transition-all ${isLiked ? 'text-red-600 scale-110' : 'text-gray-400 hover:text-red-600'}`}
                  title="Me gusta"
                >
                  {isLiked ? '❤️' : '🤍'}
                </button>
                
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Compartir"
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cardClasses}
    >
      {/* Colombian Flag Gradient Overlay */}
      <div className={gradientOverlayClasses}></div>

      {/* Breaking News Badge */}
      {article.isBreaking && (
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            🚨 ÚLTIMA HORA
          </div>
        </div>
      )}

      {/* Trending Badge */}
      {article.trending && !article.isBreaking && (
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            🔥 TRENDING
          </div>
        </div>
      )}

      {/* Freshness Indicator */}
      <div className="absolute top-3 right-3 z-20">
        <FreshnessIndicator 
          publishedAt={article.publishedAt}
          isLive={article.isBreaking}
        />
      </div>

      {/* Image Header */}
      {!imageError && article.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
          
          {/* Perspective Badge on Image */}
          {showPerspectiveBadge && (
            <div className="absolute bottom-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPerspectiveColor(article.perspective)} text-white backdrop-blur-sm`}>
                {getPerspectiveLabel(article.perspective)}
              </span>
            </div>
          )}
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Header info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {imageError && (
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
                <span>📖 {article.readTime}</span>
              </>
            )}
          </div>
          
          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            {article.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Stats */}
        {(article.viewCount || article.likeCount || article.commentCount) && (
          <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
            {article.viewCount && (
              <span className="flex items-center space-x-1">
                <span>👁️</span>
                <span>{article.viewCount.toLocaleString()}</span>
              </span>
            )}
            {article.likeCount && (
              <span className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{article.likeCount}</span>
              </span>
            )}
            {article.commentCount && (
              <span className="flex items-center space-x-1">
                <span>💬</span>
                <span>{article.commentCount}</span>
              </span>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {article.author && (
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span>{article.author}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-all transform ${
                isLiked
                  ? 'bg-red-100 text-red-600 scale-105'
                  : 'text-gray-500 hover:bg-red-50 hover:text-red-600 hover:scale-105'
              }`}
              title="Me gusta"
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{article.likeCount || 0}</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-full text-sm transition-all transform hover:scale-105 ${
                copied ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'
              }`}
              title="Copiar enlace"
            >
              {copied ? '✅' : '🔗'}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-sm text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-all transform hover:scale-105"
              title="Compartir"
            >
              📤
            </button>

            <button
              onClick={handleCardClick}
              className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all transform hover:scale-105"
            >
              Leer más
            </button>
          </div>
        </div>
        
        {/* Related articles indicator */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 flex items-center space-x-1">
              <span>📝</span>
              <span>{article.relatedArticles.length} artículo{article.relatedArticles.length > 1 ? 's' : ''} relacionado{article.relatedArticles.length > 1 ? 's' : ''}</span>
            </span>
          </div>
        )}
      </div>

      {/* Hover Animation Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-yellow-400 group-hover:via-blue-500 group-hover:to-red-500 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default EnhancedNewsCard;