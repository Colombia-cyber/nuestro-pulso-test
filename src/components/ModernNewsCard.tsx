import React, { useState, useRef } from 'react';
import { FaPlay, FaEye, FaClock, FaShare, FaBookmark, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdHd, MdLiveTv } from 'react-icons/md';
import { NewsItem } from '../types/news';

interface ModernNewsCardProps {
  article: NewsItem;
  onArticleClick?: (article: NewsItem) => void;
  onVideoPlay?: (article: NewsItem) => void;
  compact?: boolean;
  showRelatedContent?: boolean;
}

const ModernNewsCard: React.FC<ModernNewsCardProps> = ({ 
  article, 
  onArticleClick, 
  onVideoPlay,
  compact = false,
  showRelatedContent = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatViewCount = (count?: number) => {
    if (!count) return '';
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)}h`;
    const days = Math.floor(diffInMinutes / 1440);
    if (days < 7) return `hace ${days}d`;
    if (days < 30) return `hace ${Math.floor(days / 7)}sem`;
    if (days < 365) return `hace ${Math.floor(days / 30)}mes`;
    return `hace ${Math.floor(days / 365)}a`;
  };

  const getSourceIcon = (source: string | any) => {
    const sourceName = typeof source === 'string' ? source : source.name;
    if (article.contentType === 'video') return '📹';
    if (article.isLive) return '🔴';
    return '📰';
  };

  const getSourceName = (source: string | any): string => {
    return typeof source === 'string' ? source : source.name;
  };

  const handleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onVideoPlay) {
      onVideoPlay(article);
    }
  };

  const handleCardClick = () => {
    if (onArticleClick && article.contentType !== 'video') {
      onArticleClick(article);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (compact) {
    return (
      <div className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
        <div className="flex gap-3 p-4">
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden">
              {!imageError && (article.thumbnailUrl || article.imageUrl) ? (
                <img
                  src={article.thumbnailUrl || article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">{getSourceIcon(article.source)}</span>
                </div>
              )}
              
              {/* Video overlay */}
              {article.contentType === 'video' && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <button
                    onClick={handleVideoPlay}
                    className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
                  >
                    <FaPlay className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              )}
              
              {/* Duration badge */}
              {article.videoDuration && (
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                  {article.videoDuration}
                </div>
              )}
              
              {/* Live badge */}
              {article.isLive && (
                <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <MdLiveTv className="w-3 h-3" />
                  VIVO
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 
              onClick={handleCardClick}
              className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {article.title}
            </h3>
            
            {/* Source and metadata */}
            <div className="flex items-center text-xs text-gray-600 mb-2">
              <span className="font-medium">{getSourceName(article.source)}</span>
              {article.viewCount && (
                <>
                  <span className="mx-1">•</span>
                  <div className="flex items-center gap-1">
                    <FaEye className="w-3 h-3" />
                    <span>{formatViewCount(article.viewCount)} vistas</span>
                  </div>
                </>
              )}
              <span className="mx-1">•</span>
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>

            {/* Quick actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {article.trending && (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    <BiTrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
                {article.region === 'colombia' && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    🇨🇴 Colombia
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={handleBookmark}
                  className={`p-1.5 rounded-full transition-colors ${
                    isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FaBookmark className="w-3 h-3" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaShare className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        {!imageError && (article.thumbnailUrl || article.imageUrl) ? (
          <img
            src={article.thumbnailUrl || article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-600 text-4xl">{getSourceIcon(article.source)}</span>
          </div>
        )}
        
        {/* Video overlay */}
        {article.contentType === 'video' && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
            <button
              onClick={handleVideoPlay}
              className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700 transform hover:scale-110 transition-all"
            >
              <FaPlay className="w-6 h-6 ml-1" />
            </button>
          </div>
        )}
        
        {/* Duration badge */}
        {article.videoDuration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded font-medium">
            {article.videoDuration}
          </div>
        )}
        
        {/* Live badge */}
        {article.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            <MdLiveTv className="w-4 h-4" />
            EN VIVO
          </div>
        )}
        
        {/* Quality badge */}
        {article.contentType === 'video' && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <MdHd className="w-3 h-3" />
            HD
          </div>
        )}

        {/* Trending badge */}
        {article.trending && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            <BiTrendingUp className="w-4 h-4" />
            Trending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600"
        >
          {article.title}
        </h3>

        {/* Source and metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-red-600">{getSourceName(article.source)}</span>
            {article.channelName && article.channelName !== getSourceName(article.source) && (
              <>
                <span className="mx-1">•</span>
                <span className="font-medium">{article.channelName}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {article.region === 'colombia' && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                🇨🇴 Colombia
              </span>
            )}
            {article.region === 'global' && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                🌍 Global
              </span>
            )}
          </div>
        </div>

        {/* View count and time */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          {article.viewCount && (
            <div className="flex items-center gap-1">
              <FaEye className="w-4 h-4" />
              <span className="font-medium">{formatViewCount(article.viewCount)} vistas</span>
            </div>
          )}
          {article.viewCount && <span className="mx-2">•</span>}
          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
          {article.readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{article.readTime} lectura</span>
            </>
          )}
        </div>

        {/* Summary */}
        <p className={`text-gray-600 text-sm leading-relaxed mb-4 ${
          isExpanded ? '' : 'line-clamp-2'
        }`}>
          {isExpanded ? (article.expandedSummary || article.summary) : article.summary}
        </p>

        {/* Expand/Collapse button */}
        {(article.expandedSummary || article.summary.length > 150) && (
          <button
            onClick={toggleExpand}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mb-4 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Ver menos</span>
                <FaChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>Ver más</span>
                <FaChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}

        {/* Tags and related searches */}
        {showRelatedContent && (article.tags || article.relatedSearches) && (
          <div className="mb-4">
            {article.tags && article.tags.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {article.relatedSearches && article.relatedSearches.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">También buscaron:</p>
                <div className="flex flex-wrap gap-2">
                  {article.relatedSearches.slice(0, 3).map((search, index) => (
                    <button 
                      key={index}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {article.contentType === 'video' ? (
              <button
                onClick={handleVideoPlay}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <FaPlay className="w-3 h-3" />
                {article.isLive ? 'Ver en vivo' : 'Reproducir'}
              </button>
            ) : (
              <button
                onClick={handleCardClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                Leer artículo
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={isBookmarked ? 'Guardado' : 'Guardar'}
            >
              <FaBookmark className="w-4 h-4" />
            </button>
            
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                title="Compartir"
              >
                <FaShare className="w-4 h-4" />
              </button>
              
              {/* Share menu */}
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[160px]">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Copiar enlace
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Compartir en WhatsApp
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Compartir en Twitter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related content */}
        {showRelatedContent && (article.relatedVideos || article.relatedArticles) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Contenido relacionado:</p>
            <div className="text-xs text-blue-600">
              {article.relatedVideos && `${article.relatedVideos.length} videos relacionados`}
              {article.relatedVideos && article.relatedArticles && ' • '}
              {article.relatedArticles && `${article.relatedArticles.length} artículos relacionados`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernNewsCard;