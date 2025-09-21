import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaEye, FaClock, FaExternalLinkAlt, FaPlay, FaImage } from 'react-icons/fa';
import { MdVerified, MdTrendingUp, MdLiveTv } from 'react-icons/md';
import { BiLike, BiDislike } from 'react-icons/bi';
import { usePerformanceMonitor, useFastInteraction } from './FastBase';
import FastButton from './FastButton';

/**
 * Fast-r7aqkx-224-d: Ultra-Fast News Card Component
 * Optimized for instant interactions and world-class visual design
 */

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
    organization?: string;
  };
  source: {
    name: string;
    logo?: string;
    verified?: boolean;
    bias?: 'left' | 'center' | 'right';
  };
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  tags: string[];
  location?: string;
  language: string;
  readTime: number; // in minutes
  metrics: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  engagement: {
    trending: boolean;
    breaking: boolean;
    featured: boolean;
    live: boolean;
    verified: boolean;
  };
  accessibility: {
    hasAltText: boolean;
    hasTranscript: boolean;
    hasSubtitles: boolean;
  };
  url: string;
  perspective?: 'progressive' | 'conservative' | 'balanced';
  priority: 'high' | 'normal' | 'low';
}

export interface FastNewsCardProps {
  article: NewsArticle;
  variant?: 'compact' | 'standard' | 'featured' | 'hero';
  showMetrics?: boolean;
  showActions?: boolean;
  showSource?: boolean;
  showImage?: boolean;
  showVideo?: boolean;
  enableHover?: boolean;
  enableAnimations?: boolean;
  lazyLoad?: boolean;
  onClick?: (article: NewsArticle) => void;
  onLike?: (article: NewsArticle) => void;
  onDislike?: (article: NewsArticle) => void;
  onComment?: (article: NewsArticle) => void;
  onShare?: (article: NewsArticle) => void;
  onBookmark?: (article: NewsArticle) => void;
  onAuthorClick?: (author: NewsArticle['author']) => void;
  onSourceClick?: (source: NewsArticle['source']) => void;
  className?: string;
  priority?: 'high' | 'normal' | 'low';
}

const FastNewsCard = memo<FastNewsCardProps>(({
  article,
  variant = 'standard',
  showMetrics = true,
  showActions = true,
  showSource = true,
  showImage = true,
  showVideo = true,
  enableHover = true,
  enableAnimations = true,
  lazyLoad = true,
  onClick,
  onLike,
  onDislike,
  onComment,
  onShare,
  onBookmark,
  onAuthorClick,
  onSourceClick,
  className = '',
  priority = 'normal'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { renderTime } = usePerformanceMonitor('FastNewsCard-r7aqkx-224-d');

  // Intersection Observer for lazy loading and view tracking
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Track view after 1 second of visibility
            if (!hasBeenViewed) {
              setTimeout(() => {
                if (entry.isIntersecting) {
                  setHasBeenViewed(true);
                  // Analytics: Article viewed
                  console.log('📊 Article View Analytics:', {
                    articleId: article.id,
                    title: article.title,
                    source: article.source.name,
                    category: article.category,
                    renderTime,
                    timestamp: Date.now()
                  });
                }
              }, 1000);
            }
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '50px'
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [article, hasBeenViewed, renderTime]);

  // Ultra-fast interaction handlers
  const handleCardClick = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      // Prevent click if clicking on interactive elements
      const target = event.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        return;
      }
      
      onClick?.(article);
    }, [onClick, article]),
    0
  );

  const handleLike = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      setIsLiked(!isLiked);
      if (isDisliked) setIsDisliked(false);
      onLike?.(article);
    }, [isLiked, isDisliked, onLike, article]),
    0
  );

  const handleDislike = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      setIsDisliked(!isDisliked);
      if (isLiked) setIsLiked(false);
      onDislike?.(article);
    }, [isDisliked, isLiked, onDislike, article]),
    0
  );

  const handleBookmark = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      setIsBookmarked(!isBookmarked);
      onBookmark?.(article);
    }, [isBookmarked, onBookmark, article]),
    0
  );

  const handleShare = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      
      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: article.description,
          url: article.url
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${article.title} - ${article.url}`);
      }
      
      onShare?.(article);
    }, [onShare, article]),
    0
  );

  // Memoized computed styles and classes
  const computedClassName = useMemo(() => {
    const baseClasses = [
      'fast-news-card-r7aqkx-224-d',
      'relative',
      'bg-white',
      'border',
      'border-gray-200',
      'overflow-hidden',
      'transition-all',
      'duration-300',
      'focus-within:ring-2',
      'focus-within:ring-blue-500',
      'focus-within:ring-offset-2'
    ];

    // Variant-specific classes
    const variantClasses = {
      compact: ['rounded-lg', 'p-4'],
      standard: ['rounded-xl', 'p-6'],
      featured: ['rounded-2xl', 'p-8', 'shadow-lg'],
      hero: ['rounded-3xl', 'p-10', 'shadow-2xl']
    };

    // Hover and animation classes
    const interactionClasses = [];
    if (enableHover) {
      interactionClasses.push('hover:shadow-lg', 'hover:border-gray-300');
    }
    if (enableAnimations) {
      interactionClasses.push('hover:scale-[1.02]', 'transform-gpu');
    }

    // Priority-based styling
    const priorityClasses = {
      high: ['border-red-200', 'bg-red-50/30'],
      normal: [],
      low: ['opacity-90']
    };

    // Engagement indicators
    const engagementClasses = [];
    if (article.engagement.breaking) {
      engagementClasses.push('ring-2', 'ring-red-500', 'ring-offset-2');
    }
    if (article.engagement.trending) {
      engagementClasses.push('bg-gradient-to-br', 'from-blue-50', 'to-purple-50');
    }

    return [
      ...baseClasses,
      ...variantClasses[variant],
      ...interactionClasses,
      ...priorityClasses[priority],
      ...engagementClasses,
      className
    ].filter(Boolean).join(' ');
  }, [variant, enableHover, enableAnimations, priority, article.engagement, className]);

  // Formatted time display
  const timeAgo = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - article.publishedAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Hace ${days}d`;
    if (hours > 0) return `Hace ${hours}h`;
    return 'Ahora';
  }, [article.publishedAt]);

  // Format large numbers
  const formatCount = useCallback((count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }, []);

  // Perspective indicator color
  const perspectiveColor = useMemo(() => {
    switch (article.perspective) {
      case 'progressive': return 'bg-blue-500';
      case 'conservative': return 'bg-red-500';
      case 'balanced': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }, [article.perspective]);

  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className={`${computedClassName} animate-pulse`}
        style={{ height: variant === 'hero' ? '400px' : variant === 'featured' ? '300px' : '200px' }}
      >
        <div className="bg-gray-200 h-full rounded" />
      </div>
    );
  }

  return (
    <article
      ref={cardRef}
      className={computedClassName}
      onClick={handleCardClick}
      role="article"
      aria-labelledby={`title-${article.id}`}
      aria-describedby={`description-${article.id}`}
      tabIndex={0}
    >
      {/* Priority and Status Indicators */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        {article.engagement.live && (
          <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <MdLiveTv className="w-3 h-3" />
            <span>EN VIVO</span>
          </div>
        )}
        {article.engagement.breaking && (
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            ÚLTIMO MOMENTO
          </div>
        )}
        {article.engagement.trending && (
          <div className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <MdTrendingUp className="w-3 h-3" />
            <span>TENDENCIA</span>
          </div>
        )}
      </div>

      {/* Media Section */}
      {(showImage || showVideo) && (article.imageUrl || article.videoUrl) && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          {article.videoUrl && showVideo ? (
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <FaPlay className="w-12 h-12 text-white opacity-80" />
              <div className="absolute inset-0 bg-black/20" />
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={lazyLoad ? 'lazy' : 'eager'}
                />
              )}
            </div>
          ) : article.imageUrl && showImage ? (
            <div className="relative aspect-video bg-gray-100">
              <img
                ref={imageRef}
                src={article.imageUrl}
                alt={article.accessibility.hasAltText ? article.title : ''}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={lazyLoad ? 'lazy' : 'eager'}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <FaImage className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ) : null}

          {/* Perspective Indicator */}
          {article.perspective && (
            <div className={`absolute bottom-2 right-2 w-3 h-3 ${perspectiveColor} rounded-full`} />
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="space-y-4">
        
        {/* Header with Source and Author */}
        {showSource && (
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSourceClick?.(article.source);
              }}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {article.source.logo || article.source.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">{article.source.name}</span>
              {article.source.verified && (
                <MdVerified className="w-4 h-4 text-blue-500" />
              )}
            </button>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaClock className="w-3 h-3" />
              <span>{timeAgo}</span>
              <span>•</span>
              <span>{article.readTime} min</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h2
          id={`title-${article.id}`}
          className={`font-bold leading-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer ${
            variant === 'hero' ? 'text-3xl' : 
            variant === 'featured' ? 'text-xl' : 
            variant === 'standard' ? 'text-lg' : 'text-base'
          }`}
        >
          {article.title}
        </h2>

        {/* Description */}
        <p
          id={`description-${article.id}`}
          className={`text-gray-600 leading-relaxed ${
            variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'
          }`}
        >
          {article.description}
        </p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{article.tags.length - 3} más</span>
            )}
          </div>
        )}

        {/* Metrics and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          
          {/* Metrics */}
          {showMetrics && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaEye className="w-4 h-4" />
                {formatCount(article.metrics.views)}
              </span>
              <span className="flex items-center gap-1">
                <FaComment className="w-4 h-4" />
                {formatCount(article.metrics.comments)}
              </span>
              <span className="flex items-center gap-1">
                <FaShare className="w-4 h-4" />
                {formatCount(article.metrics.shares)}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="flex items-center gap-2">
              <FastButton
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={isLiked ? 'text-blue-600' : 'text-gray-500'}
                aria-label="Me gusta"
              >
                <BiLike className="w-4 h-4" />
                <span className="text-xs ml-1">{formatCount(article.metrics.likes)}</span>
              </FastButton>

              <FastButton
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                className={isDisliked ? 'text-red-600' : 'text-gray-500'}
                aria-label="No me gusta"
              >
                <BiDislike className="w-4 h-4" />
              </FastButton>

              <FastButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onComment?.(article);
                }}
                className="text-gray-500"
                aria-label="Comentar"
              >
                <FaComment className="w-4 h-4" />
              </FastButton>

              <FastButton
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-500"
                aria-label="Compartir"
              >
                <FaShare className="w-4 h-4" />
              </FastButton>

              <FastButton
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? 'text-yellow-600' : 'text-gray-500'}
                aria-label="Guardar"
              >
                <FaBookmark className="w-4 h-4" />
              </FastButton>

              <FastButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(article.url, '_blank', 'noopener,noreferrer');
                }}
                className="text-gray-500"
                aria-label="Abrir artículo completo"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </FastButton>
            </div>
          )}
        </div>
      </div>

      {/* Accessibility Indicators */}
      {(article.accessibility.hasAltText || article.accessibility.hasSubtitles || article.accessibility.hasTranscript) && (
        <div className="absolute top-4 right-4 flex items-center gap-1">
          {article.accessibility.hasSubtitles && (
            <div className="w-2 h-2 bg-green-500 rounded-full" title="Subtítulos disponibles" />
          )}
          {article.accessibility.hasTranscript && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" title="Transcripción disponible" />
          )}
          {article.accessibility.hasAltText && (
            <div className="w-2 h-2 bg-purple-500 rounded-full" title="Texto alternativo disponible" />
          )}
        </div>
      )}
    </article>
  );
});

FastNewsCard.displayName = 'FastNewsCard';

export default FastNewsCard;