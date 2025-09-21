import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart, FaComment, FaShare, FaBookmark, FaExpand, FaCompress } from 'react-icons/fa';
import { MdSkipNext, MdSkipPrevious, MdMoreVert } from 'react-icons/md';
import { usePerformanceMonitor, useFastInteraction } from './FastBase';
import FastButton from './FastButton';

/**
 * Fast-r7aqkx-240-d: Ultra-Fast Reels Component
 * Optimized video/content reels with instant response and smooth interactions
 */

export interface ReelItem {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: {
    type: 'video' | 'image' | 'text' | 'poll';
    url?: string;
    thumbnail?: string;
    duration?: number;
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
  };
  metadata: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    timestamp: Date;
    category: string;
    tags: string[];
    location?: string;
  };
  engagement: {
    liked?: boolean;
    bookmarked?: boolean;
    shared?: boolean;
  };
}

export interface FastReelsProps {
  items: ReelItem[];
  autoPlay?: boolean;
  showControls?: boolean;
  showEngagement?: boolean;
  showComments?: boolean;
  orientation?: 'vertical' | 'horizontal';
  layout?: 'fullscreen' | 'card' | 'grid';
  onItemChange?: (item: ReelItem, index: number) => void;
  onEngagement?: (action: 'like' | 'comment' | 'share' | 'bookmark', item: ReelItem) => void;
  onItemClick?: (item: ReelItem, index: number) => void;
  className?: string;
  enableKeyboard?: boolean;
  enableSwipe?: boolean;
  enableInfiniteScroll?: boolean;
  onEndReached?: () => void;
  renderCustomContent?: (item: ReelItem) => React.ReactNode;
  enableAnalytics?: boolean;
}

const FastReels = memo<FastReelsProps>(({
  items,
  autoPlay = true,
  showControls = true,
  showEngagement = true,
  showComments = true,
  orientation = 'vertical',
  layout = 'fullscreen',
  onItemChange,
  onEngagement,
  onItemClick,
  className = '',
  enableKeyboard = true,
  enableSwipe = true,
  enableInfiniteScroll = true,
  onEndReached,
  renderCustomContent,
  enableAnalytics = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [watchTime, setWatchTime] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const watchTimeRef = useRef<Record<string, number>>({});

  const { renderTime } = usePerformanceMonitor('FastReels-r7aqkx-240-d');

  // Current item
  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);

  // Navigation handlers
  const navigateToNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onItemChange?.(items[newIndex], newIndex);

      // Analytics
      if (enableAnalytics) {
        console.log('🎬 Reel Navigation:', {
          action: 'next',
          fromIndex: currentIndex,
          toIndex: newIndex,
          itemId: items[newIndex].id,
          timestamp: Date.now()
        });
      }

      // Check if near end for infinite scroll
      if (enableInfiniteScroll && newIndex >= items.length - 2) {
        onEndReached?.();
      }
    }
  }, [currentIndex, items, onItemChange, enableAnalytics, enableInfiniteScroll, onEndReached]);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onItemChange?.(items[newIndex], newIndex);

      // Analytics
      if (enableAnalytics) {
        console.log('🎬 Reel Navigation:', {
          action: 'previous',
          fromIndex: currentIndex,
          toIndex: newIndex,
          itemId: items[newIndex].id,
          timestamp: Date.now()
        });
      }
    }
  }, [currentIndex, items, onItemChange, enableAnalytics]);

  // Engagement handlers
  const handleEngagement = useCallback((action: 'like' | 'comment' | 'share' | 'bookmark') => {
    onEngagement?.(action, currentItem);

    // Analytics
    if (enableAnalytics) {
      console.log('🎬 Reel Engagement:', {
        action,
        itemId: currentItem.id,
        author: currentItem.author.username,
        timestamp: Date.now(),
        watchTime: watchTimeRef.current[currentItem.id] || 0
      });
    }
  }, [currentItem, onEngagement, enableAnalytics]);

  // Media controls
  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    
    // Control video playback
    const video = videoRefs.current.get(currentItem.id);
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }

    // Analytics
    if (enableAnalytics) {
      console.log('🎬 Media Control:', {
        action: isPlaying ? 'pause' : 'play',
        itemId: currentItem.id,
        timestamp: Date.now()
      });
    }
  }, [isPlaying, currentItem, enableAnalytics]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    
    // Control video audio
    const video = videoRefs.current.get(currentItem.id);
    if (video) {
      video.muted = !isMuted;
    }
  }, [isMuted, currentItem]);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          navigateToPrevious();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          navigateToNext();
          break;
        case ' ':
          event.preventDefault();
          togglePlayPause();
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          toggleFullscreen();
          break;
        case 'l':
        case 'L':
          event.preventDefault();
          handleEngagement('like');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, navigateToNext, navigateToPrevious, togglePlayPause, toggleMute, toggleFullscreen, handleEngagement]);

  // Swipe/touch navigation
  useEffect(() => {
    if (!enableSwipe || !containerRef.current) return;

    const container = containerRef.current;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const threshold = 50;

      if (orientation === 'vertical') {
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0) {
            navigateToPrevious();
          } else {
            navigateToNext();
          }
        }
      } else {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            navigateToPrevious();
          } else {
            navigateToNext();
          }
        }
      }

      touchStartRef.current = null;
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enableSwipe, orientation, navigateToNext, navigateToPrevious]);

  // Watch time tracking
  useEffect(() => {
    if (!currentItem) return;

    const startTime = Date.now();
    watchTimeRef.current[currentItem.id] = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      watchTimeRef.current[currentItem.id] = elapsed;
      setWatchTime(prev => ({ ...prev, [currentItem.id]: elapsed }));
    }, 1000);

    return () => {
      clearInterval(interval);
      
      // Analytics for watch time
      if (enableAnalytics) {
        const finalWatchTime = Date.now() - startTime;
        console.log('🎬 Watch Time:', {
          itemId: currentItem.id,
          watchTime: finalWatchTime,
          completion: currentItem.content.duration ? (finalWatchTime / (currentItem.content.duration * 1000)) : 0,
          timestamp: Date.now()
        });
      }
    };
  }, [currentItem, enableAnalytics]);

  // Format numbers
  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }, []);

  // Render content based on type
  const renderContent = useCallback((item: ReelItem) => {
    if (renderCustomContent) {
      return renderCustomContent(item);
    }

    switch (item.content.type) {
      case 'video':
        return (
          <video
            ref={(el) => {
              if (el) videoRefs.current.set(item.id, el);
            }}
            src={item.content.url}
            poster={item.content.thumbnail}
            className="w-full h-full object-cover"
            autoPlay={autoPlay && items.indexOf(item) === currentIndex}
            muted={isMuted}
            loop
            playsInline
          />
        );
      case 'image':
        return (
          <img
            src={item.content.url}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        );
      case 'text':
        return (
          <div className="flex items-center justify-center h-full p-8 bg-gradient-colombia text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [renderCustomContent, autoPlay, currentIndex, items, isMuted]);

  // Layout classes
  const containerClasses = useMemo(() => {
    const baseClasses = [
      'fast-reels-r7aqkx-240-d',
      'relative',
      'overflow-hidden',
      'bg-black'
    ];

    const layoutClasses = {
      fullscreen: ['w-full', 'h-screen'],
      card: ['rounded-lg', 'shadow-lg', 'max-w-md', 'mx-auto'],
      grid: ['aspect-[9/16]', 'rounded-lg', 'shadow-md']
    };

    const orientationClasses = {
      vertical: ['flex', 'flex-col'],
      horizontal: ['flex', 'flex-row']
    };

    return [
      ...baseClasses,
      ...layoutClasses[layout],
      ...orientationClasses[orientation],
      className
    ].filter(Boolean).join(' ');
  }, [layout, orientation, className]);

  if (!currentItem) return null;

  return (
    <div ref={containerRef} className={containerClasses} role="region" aria-label="Reels viewer">
      {/* Main content */}
      <div className="relative flex-1">
        {renderContent(currentItem)}

        {/* Overlay controls */}
        {showControls && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <FastButton
              variant="ghost"
              size="lg"
              onClick={togglePlayPause}
              className="text-white bg-black/20 backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </FastButton>
          </div>
        )}

        {/* Navigation arrows */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <FastButton
            variant="ghost"
            size="md"
            onClick={navigateToPrevious}
            disabled={currentIndex === 0}
            className="text-white bg-black/20 backdrop-blur-sm"
            aria-label="Previous reel"
          >
            <MdSkipPrevious />
          </FastButton>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <FastButton
            variant="ghost"
            size="md"
            onClick={navigateToNext}
            disabled={currentIndex === items.length - 1}
            className="text-white bg-black/20 backdrop-blur-sm"
            aria-label="Next reel"
          >
            <MdSkipNext />
          </FastButton>
        </div>

        {/* Content info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              {/* Author info */}
              <div className="flex items-center mb-2">
                {currentItem.author.avatar && (
                  <img
                    src={currentItem.author.avatar}
                    alt={currentItem.author.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">{currentItem.author.name}</span>
                    {currentItem.author.verified && (
                      <span className="ml-1 text-blue-400">✓</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">@{currentItem.author.username}</span>
                </div>
              </div>

              {/* Content info */}
              <h3 className="font-bold mb-1">{currentItem.title}</h3>
              <p className="text-sm text-gray-200 mb-2">{currentItem.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {currentItem.metadata.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <span>{formatNumber(currentItem.metadata.views)} views</span>
                <span>{new Date(currentItem.metadata.timestamp).toLocaleDateString()}</span>
                {currentItem.metadata.location && (
                  <span>📍 {currentItem.metadata.location}</span>
                )}
              </div>
            </div>

            {/* Engagement actions */}
            {showEngagement && (
              <div className="flex flex-col gap-3">
                <FastButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEngagement('like')}
                  className={`text-white p-2 ${currentItem.engagement.liked ? 'text-red-500' : ''}`}
                  aria-label="Like"
                >
                  <FaHeart className="mb-1" />
                  <span className="text-xs block">{formatNumber(currentItem.metadata.likes)}</span>
                </FastButton>

                {showComments && (
                  <FastButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEngagement('comment')}
                    className="text-white p-2"
                    aria-label="Comment"
                  >
                    <FaComment className="mb-1" />
                    <span className="text-xs block">{formatNumber(currentItem.metadata.comments)}</span>
                  </FastButton>
                )}

                <FastButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEngagement('share')}
                  className="text-white p-2"
                  aria-label="Share"
                >
                  <FaShare className="mb-1" />
                  <span className="text-xs block">{formatNumber(currentItem.metadata.shares)}</span>
                </FastButton>

                <FastButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEngagement('bookmark')}
                  className={`text-white p-2 ${currentItem.engagement.bookmarked ? 'text-yellow-500' : ''}`}
                  aria-label="Bookmark"
                >
                  <FaBookmark />
                </FastButton>
              </div>
            )}
          </div>
        </div>

        {/* Top controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <FastButton
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-white bg-black/20 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </FastButton>

          <FastButton
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-white bg-black/20 backdrop-blur-sm"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </FastButton>

          <FastButton
            variant="ghost"
            size="sm"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="text-white bg-black/20 backdrop-blur-sm"
            aria-label="More options"
          >
            <MdMoreVert />
          </FastButton>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: `${((currentIndex + 1) / items.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Performance indicator (development only) */}
      {import.meta.env.DEV && (
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {renderTime}ms | {currentIndex + 1}/{items.length}
        </div>
      )}

      {/* Accessibility helpers */}
      <div className="sr-only">
        <p>
          Viewing reel {currentIndex + 1} of {items.length}: {currentItem.title} by {currentItem.author.name}
        </p>
        <p>Use arrow keys to navigate, space to play/pause, M to mute, F for fullscreen, L to like</p>
      </div>
    </div>
  );
});

FastReels.displayName = 'FastReels';

export default FastReels;