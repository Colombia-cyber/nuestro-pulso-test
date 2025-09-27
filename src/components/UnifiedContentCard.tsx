import React, { useState, useEffect } from 'react';
import { 
  FaPlay, 
  FaEye, 
  FaHeart, 
  FaShare, 
  FaBookmark, 
  FaExternalLinkAlt,
  FaClock,
  FaMapMarkerAlt,
  FaLanguage,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { ContentItem, ShareOptions, FactCheckResult } from '../types/api';

interface UnifiedContentCardProps {
  content: ContentItem;
  onShare?: (options: ShareOptions) => void;
  onBookmark?: (content: ContentItem) => void;
  onFactCheck?: (content: ContentItem) => Promise<FactCheckResult>;
  showFullDescription?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const UnifiedContentCard: React.FC<UnifiedContentCardProps> = ({
  content,
  onShare,
  onBookmark,
  onFactCheck,
  showFullDescription = false,
  className = '',
  size = 'medium'
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const [isFactChecking, setIsFactChecking] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if content is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((b: ContentItem) => b.id === content.id));
  }, [content.id]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((b: ContentItem) => b.id !== content.id);
    } else {
      newBookmarks = [...bookmarks, content];
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
    onBookmark?.(content);
  };

  const handleShare = (platform: ShareOptions['platform']) => {
    if (onShare) {
      onShare({ platform, content });
    } else {
      // Default sharing logic
      const shareUrl = content.url;
      const shareText = `${content.title} - ${content.description.substring(0, 100)}...`;
      
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
          break;
        case 'telegram':
          window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
          break;
        case 'copy':
          navigator.clipboard.writeText(shareUrl);
          break;
        case 'email':
          window.open(`mailto:?subject=${encodeURIComponent(content.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`);
          break;
      }
    }
    setShowShareMenu(false);
  };

  const handleFactCheck = async () => {
    if (!onFactCheck || isFactChecking) return;
    
    setIsFactChecking(true);
    try {
      const result = await onFactCheck(content);
      setFactCheckResult(result);
    } catch (error) {
      console.error('Fact check failed:', error);
    } finally {
      setIsFactChecking(false);
    }
  };

  const formatNumber = (num?: number): string => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days}d`;
    if (hours > 0) return `hace ${hours}h`;
    if (minutes > 0) return `hace ${minutes}m`;
    return 'ahora';
  };

  const getPlatformColor = (platform: string): string => {
    const colors: Record<string, string> = {
      youtube: 'bg-red-500',
      tiktok: 'bg-black',
      instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
      facebook: 'bg-blue-600',
      twitter: 'bg-gray-800',
      news: 'bg-blue-500',
      wikipedia: 'bg-gray-600',
      civic: 'bg-green-600'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getContentTypeIcon = (contentType: string): string => {
    const icons: Record<string, string> = {
      video: '🎥',
      article: '📰',
      post: '📝',
      reel: '🎬',
      story: '📖'
    };
    return icons[contentType] || '📄';
  };

  const cardSizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg'
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${cardSizeClasses[size]} ${className}`}>
      {/* Thumbnail/Image */}
      <div className="relative aspect-video bg-gray-100">
        {content.thumbnail && !imageError ? (
          <>
            <img
              src={content.thumbnail}
              alt={content.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl">{getContentTypeIcon(content.contentType)}</span>
          </div>
        )}

        {/* Content Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPlatformColor(content.platform)}`}>
            {content.source.icon} {content.source.name}
          </span>
        </div>

        {/* Trending Badge */}
        {content.stats.trending && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold animate-pulse">
              🔥 Trending
            </span>
          </div>
        )}

        {/* Play Button for Videos */}
        {(content.contentType === 'video' || content.contentType === 'reel') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => window.open(content.url, '_blank')}
              className="bg-black bg-opacity-70 text-white rounded-full p-4 hover:bg-opacity-90 transition-all transform hover:scale-110"
            >
              <FaPlay className="text-xl ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer" 
            onClick={() => window.open(content.url, '_blank')}>
          {content.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 text-sm mb-3 ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {content.description}
        </p>

        {/* AI Summary */}
        {content.aiSummary && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3 rounded-r-lg">
            <div className="flex items-center mb-1">
              <span className="text-blue-600 text-xs font-semibold">🤖 RESUMEN IA</span>
            </div>
            <p className="text-sm text-blue-800">{content.aiSummary}</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            {content.stats.views && (
              <div className="flex items-center space-x-1">
                <FaEye />
                <span>{formatNumber(content.stats.views)}</span>
              </div>
            )}
            {content.stats.likes && (
              <div className="flex items-center space-x-1">
                <FaHeart className="text-red-500" />
                <span>{formatNumber(content.stats.likes)}</span>
              </div>
            )}
            {content.stats.comments && (
              <div className="flex items-center space-x-1">
                <span>💬</span>
                <span>{formatNumber(content.stats.comments)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>{formatTimeAgo(content.publishedAt)}</span>
          </div>
        </div>

        {/* Location & Language */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <div className="flex items-center space-x-2">
            {content.location && (
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <span>{content.location.city || content.location.region || content.location.country}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <FaLanguage />
              <span className="uppercase">{content.language}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {content.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag}
              </span>
            ))}
            {content.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{content.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Fact Check Result */}
        {factCheckResult && (
          <div className={`border-l-4 p-3 mb-3 rounded-r-lg ${
            factCheckResult.isVerified
              ? 'border-green-400 bg-green-50'
              : 'border-yellow-400 bg-yellow-50'
          }`}>
            <div className="flex items-center mb-1">
              {factCheckResult.isVerified ? (
                <FaCheckCircle className="text-green-600 mr-2" />
              ) : (
                <FaExclamationTriangle className="text-yellow-600 mr-2" />
              )}
              <span className="text-xs font-semibold">
                {factCheckResult.isVerified ? 'VERIFICADO' : 'VERIFICACIÓN PENDIENTE'}
              </span>
            </div>
            <p className="text-sm">{factCheckResult.explanation}</p>
            <p className="text-xs text-gray-500 mt-1">
              Fuente: {factCheckResult.source} • Confianza: {Math.round(factCheckResult.confidence * 100)}%
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                  : 'text-gray-500 hover:text-yellow-500 hover:bg-gray-50'
              }`}
              title={isBookmarked ? 'Quitar de guardados' : 'Guardar'}
            >
              <FaBookmark />
            </button>

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-50 transition-colors"
                title="Compartir"
              >
                <FaShare />
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20">
                  <div className="grid grid-cols-4 gap-1">
                    <button onClick={() => handleShare('facebook')} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Facebook">📘</button>
                    <button onClick={() => handleShare('twitter')} className="p-2 text-gray-800 hover:bg-gray-50 rounded" title="X">🐦</button>
                    <button onClick={() => handleShare('whatsapp')} className="p-2 text-green-600 hover:bg-green-50 rounded" title="WhatsApp">💬</button>
                    <button onClick={() => handleShare('copy')} className="p-2 text-gray-600 hover:bg-gray-50 rounded" title="Copiar">📋</button>
                  </div>
                </div>
              )}
            </div>

            {/* Fact Check */}
            {onFactCheck && (
              <button
                onClick={handleFactCheck}
                disabled={isFactChecking}
                className="p-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
                title="Verificar información"
              >
                {isFactChecking ? (
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaCheckCircle />
                )}
              </button>
            )}
          </div>

          {/* External Link */}
          <button
            onClick={() => window.open(content.url, '_blank')}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <span>Ver más</span>
            <FaExternalLinkAlt />
          </button>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default UnifiedContentCard;