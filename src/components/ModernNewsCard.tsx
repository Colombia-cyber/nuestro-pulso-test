import React, { useState } from 'react';
import { 
  FaPlay, 
  FaEye, 
  FaClock, 
  FaShare, 
  FaBookmark, 
  FaComment,
  FaThumbsUp,
  FaExternalLinkAlt,
  FaVideo,
  FaFire
} from 'react-icons/fa';
import { MdVerified, MdHd } from 'react-icons/md';
import { BiTrendingUp } from 'react-icons/bi';
import { NewsItem } from '../types/news';
import VideoThumbnail from './VideoThumbnail';

interface ModernNewsCardProps {
  article: NewsItem;
  size?: 'small' | 'medium' | 'large' | 'hero';
  showVideo?: boolean;
  onArticleClick?: (article: NewsItem) => void;
  onVideoPlay?: (article: NewsItem) => void;
  className?: string;
}

const ModernNewsCard: React.FC<ModernNewsCardProps> = ({
  article,
  size = 'medium',
  showVideo = false,
  onArticleClick,
  onVideoPlay,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getCardSizeClasses = () => {
    switch (size) {
      case 'hero':
        return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2';
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-1';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 md:col-span-1 row-span-1';
    }
  };

  const getImageHeight = () => {
    switch (size) {
      case 'hero':
        return 'h-64 md:h-80 lg:h-96';
      case 'large':
        return 'h-48 md:h-64';
      case 'small':
        return 'h-32 md:h-40';
      default:
        return 'h-40 md:h-48';
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'hero':
        return 'text-xl md:text-2xl lg:text-3xl';
      case 'large':
        return 'text-lg md:text-xl';
      case 'small':
        return 'text-sm md:text-base';
      default:
        return 'text-base md:text-lg';
    }
  };

  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  const handleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onVideoPlay) {
      onVideoPlay(article);
    }
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'hace unos minutos';
    if (diffInHours < 24) return `hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `hace ${diffInDays}d`;
    return date.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' });
  };

  const getSourceIcon = (sourceName: string) => {
    const sourceIcons: Record<string, string> = {
      'El Tiempo': '📰',
      'Semana': '📌',
      'Portafolio': '💼',
      'El Espectador': '📊',
      'La República': '🏛️',
      'RCN Radio': '📻',
      'Contexto Ganadero': '🐄',
      'a andpi': '🌟'
    };
    
    const sourceName2 = typeof article.source === 'string' ? article.source : article.source.name;
    return sourceIcons[sourceName2] || '📰';
  };

  const getSourceName = () => {
    return typeof article.source === 'string' ? article.source : article.source.name;
  };

  const getPerspectiveBadge = () => {
    switch (article.perspective) {
      case 'progressive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            🔵 Progresista
          </span>
        );
      case 'conservative':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            🔴 Conservador
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ⚖️ Balanceado
          </span>
        );
    }
  };

  const mockViewCount = Math.floor(Math.random() * 50000) + 1000;
  const mockVideoLength = showVideo ? `${Math.floor(Math.random() * 10) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : null;

  return (
    <div 
      className={`
        ${getCardSizeClasses()}
        bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 
        cursor-pointer group overflow-hidden border border-gray-100 hover:border-gray-200
        ${className}
      `}
      onClick={handleCardClick}
    >
      {/* Image/Video Thumbnail */}
      <div className={`relative ${getImageHeight()} overflow-hidden bg-gray-100`}>
        {article.imageUrl && !imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <VideoThumbnail
            src=""
            alt={article.title}
            title={article.title}
            description={article.summary || ''}
            className="w-full h-full"
            showPlayButton={false}
          />
        )}

        {/* Video Play Button */}
        {showVideo && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleVideoPlay}
          >
            <div className="bg-white bg-opacity-90 rounded-full p-4 transform hover:scale-110 transition-transform duration-200">
              <FaPlay className="w-6 h-6 text-gray-800 ml-1" />
            </div>
          </div>
        )}

        {/* Video Duration & HD Badge */}
        {showVideo && mockVideoLength && (
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <span className="bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {mockVideoLength}
            </span>
            <span className="bg-black bg-opacity-80 text-white text-xs px-1 py-1 rounded flex items-center">
              <MdHd className="w-3 h-3" />
            </span>
          </div>
        )}

        {/* Trending Badge */}
        {article.trending && (
          <div className="absolute top-2 left-2">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
              <FaFire className="w-3 h-3" />
              Trending
            </span>
          </div>
        )}

        {/* Live Badge for recent articles */}
        {new Date(article.publishedAt).getTime() > Date.now() - 2 * 60 * 60 * 1000 && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              EN VIVO
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Source & Metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">{getSourceIcon(getSourceName())}</span>
            <span className="font-medium">{getSourceName()}</span>
            {getSourceName() === 'a andpi' && (
              <MdVerified className="w-4 h-4 text-blue-500" />
            )}
            <span>•</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
            {article.readTime && (
              <>
                <span>•</span>
                <span>{article.readTime}</span>
              </>
            )}
          </div>
          {getPerspectiveBadge()}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-2 line-clamp-3 leading-tight group-hover:text-blue-600 transition-colors ${getTitleSize()}`}>
          {article.title}
        </h3>

        {/* Summary */}
        {size !== 'small' && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {article.summary}
          </p>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && size !== 'small' && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaEye className="w-3 h-3" />
              <span>{formatViewCount(mockViewCount)}</span>
            </div>
            {showVideo && (
              <div className="flex items-center gap-1">
                <FaVideo className="w-3 h-3" />
                <span>Video</span>
              </div>
            )}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <div className="flex items-center gap-1">
                <span>📝 {article.relatedArticles.length} relacionados</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle share
              }}
            >
              <FaShare className="w-3 h-3" />
            </button>
            <button 
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle bookmark
              }}
            >
              <FaBookmark className="w-3 h-3" />
            </button>
            <button 
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle external link
              }}
            >
              <FaExternalLinkAlt className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernNewsCard;