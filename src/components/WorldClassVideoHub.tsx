import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, 
  FaExpand, FaSearch, FaFilter, FaFire, FaBolt, FaEye, FaBookmark, 
  FaDownload, FaFlag, FaClock, FaGlobe, FaClosedCaptioning, FaRobot,
  FaChevronUp, FaChevronDown, FaTimes, FaChevronLeft, FaChevronRight,
  FaThumbsUp, FaThumbsDown, FaLaughBeam, FaSadTear, FaAngry, FaSurprise
} from 'react-icons/fa';
import { MdVerified, MdLiveTv, MdTrendingUp, MdTranslate, MdAccessibility } from 'react-icons/md';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { WorldClassVideo, VideoSearchQuery, VideoFilter, VideoReaction } from '../types/worldClassVideo';
import { worldClassVideoService } from '../services/worldClassVideoService';
import { aiVideoSearchService } from '../services/aiVideoSearch';
import { useAIPersonalization } from '../services/aiPersonalization';

interface Props {
  initialQuery?: string;
  userId?: string;
  language?: 'es' | 'en' | 'pt';
  viewMode?: 'grid' | 'list' | 'theater';
  showPersonalized?: boolean;
}

const WorldClassVideoHub: React.FC<Props> = ({
  initialQuery = '',
  userId = 'anonymous',
  language = 'es',
  viewMode = 'grid',
  showPersonalized = true
}) => {
  // State management
  const [videos, setVideos] = useState<WorldClassVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<WorldClassVideo | null>(null);
  const [currentFilters, setCurrentFilters] = useState<VideoFilter>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isPlaying, setIsPlaying] = useState<{ [videoId: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState<{ [videoId: string]: boolean }>({});
  const [currentTab, setCurrentTab] = useState<'for-you' | 'trending' | 'live' | 'search'>('for-you');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedVideoReactions, setSelectedVideoReactions] = useState<{ [videoId: string]: VideoReaction['type'][] }>({});
  const [showComments, setShowComments] = useState<{ [videoId: string]: boolean }>({});
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const videoRefs = useRef<{ [videoId: string]: HTMLVideoElement }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { trackInteraction, getRecommendations } = useAIPersonalization(userId);

  // Memoized translations
  const t = useMemo(() => getTranslations(language), [language]);

  // Effects
  useEffect(() => {
    if (showPersonalized && currentTab === 'for-you') {
      loadPersonalizedFeed();
    } else {
      handleSearch();
    }
  }, [currentTab, showPersonalized]);

  useEffect(() => {
    setupIntersectionObserver();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      const debounceTimer = setTimeout(() => {
        loadSearchSuggestions(searchQuery);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullscreenVideo(null);
        setSelectedVideo(null);
        setShowFilters(false);
        setShowSuggestions(false);
      }
      
      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main search function
  const handleSearch = useCallback(async (newQuery?: string, newFilters?: VideoFilter) => {
    const query = newQuery !== undefined ? newQuery : searchQuery;
    const filters = newFilters || currentFilters;
    
    if (!query && currentTab === 'search') return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      let searchQuery: VideoSearchQuery;
      
      switch (currentTab) {
        case 'trending':
          searchQuery = {
            query: '',
            filters: { ...filters, sortBy: 'trending' },
            limit: 20,
            offset: 0
          };
          break;
        case 'live':
          searchQuery = {
            query: '',
            filters: { ...filters, isLive: true, sortBy: 'views' },
            limit: 20,
            offset: 0
          };
          break;
        default:
          searchQuery = {
            query,
            filters,
            limit: 20,
            offset: 0
          };
      }

      const result = await worldClassVideoService.searchVideos(searchQuery);
      
      setVideos(result.videos);
      setHasMore(result.hasMore);
      setOffset(result.nextOffset);
      
      // Track search interaction
      if (query) {
        trackInteraction('search', 'view');
      }
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage(t.searchError);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentFilters, currentTab, trackInteraction, t]);

  // Load personalized feed
  const loadPersonalizedFeed = useCallback(async () => {
    if (!showPersonalized) return;
    
    setIsLoading(true);
    try {
      const personalizedVideos = await worldClassVideoService.getPersonalizedFeed(userId, 20);
      setVideos(personalizedVideos);
      setHasMore(personalizedVideos.length === 20);
      setOffset(20);
    } catch (error) {
      console.error('Personalized feed error:', error);
      setErrorMessage(t.personalizedError);
    } finally {
      setIsLoading(false);
    }
  }, [userId, showPersonalized, t]);

  // Load more videos (infinite scroll)
  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const query = currentTab === 'search' ? searchQuery : '';
      const searchQueryObj: VideoSearchQuery = {
        query,
        filters: currentFilters,
        limit: 20,
        offset
      };

      const result = await worldClassVideoService.searchVideos(searchQueryObj);
      
      setVideos(prev => [...prev, ...result.videos]);
      setHasMore(result.hasMore);
      setOffset(result.nextOffset);
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, offset, searchQuery, currentFilters, currentTab]);

  // Setup intersection observer for infinite scroll
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [hasMore, isLoading, loadMoreVideos]);

  // Load search suggestions
  const loadSearchSuggestions = useCallback(async (query: string) => {
    try {
      const suggestions = await aiVideoSearchService.getAutoCompleteSuggestions(query);
      setSearchSuggestions(suggestions.map(s => s.text));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  }, []);

  // Video interaction handlers
  const handleVideoPlay = useCallback((videoId: string) => {
    setIsPlaying(prev => ({ ...prev, [videoId]: true }));
    trackInteraction(videoId, 'view');
  }, [trackInteraction]);

  const handleVideoPause = useCallback((videoId: string) => {
    setIsPlaying(prev => ({ ...prev, [videoId]: false }));
  }, []);

  const handleVideoMute = useCallback((videoId: string) => {
    setIsMuted(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  }, []);

  const handleVideoLike = useCallback(async (video: WorldClassVideo) => {
    try {
      await worldClassVideoService.addReaction(video.id, userId, '👍');
      trackInteraction(video.category, 'like');
      
      // Update local state
      setVideos(prev => prev.map(v => 
        v.id === video.id ? { ...v, likes: v.likes + 1 } : v
      ));
    } catch (error) {
      console.error('Like error:', error);
    }
  }, [userId, trackInteraction]);

  const handleVideoReaction = useCallback(async (videoId: string, reactionType: VideoReaction['type']) => {
    try {
      await worldClassVideoService.addReaction(videoId, userId, reactionType);
      setSelectedVideoReactions(prev => ({
        ...prev,
        [videoId]: [...(prev[videoId] || []), reactionType]
      }));
    } catch (error) {
      console.error('Reaction error:', error);
    }
  }, [userId]);

  const handleVideoShare = useCallback((video: WorldClassVideo) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.aiSummary || video.description,
        url: video.videoUrl || window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(video.videoUrl || window.location.href);
    }
    trackInteraction(video.category, 'share');
  }, [trackInteraction]);

  const handleFullscreen = useCallback((videoId: string) => {
    setFullscreenVideo(fullscreenVideo === videoId ? null : videoId);
  }, [fullscreenVideo]);

  // Filter handlers
  const handleFilterChange = useCallback((newFilters: VideoFilter) => {
    setCurrentFilters(newFilters);
    setOffset(0);
    handleSearch(searchQuery, newFilters);
  }, [searchQuery, handleSearch]);

  const clearFilters = useCallback(() => {
    setCurrentFilters({});
    setOffset(0);
    handleSearch(searchQuery, {});
  }, [searchQuery, handleSearch]);

  // Tab switching
  const handleTabChange = useCallback((tab: typeof currentTab) => {
    setCurrentTab(tab);
    setSearchQuery('');
    setCurrentFilters({});
    setOffset(0);
    setVideos([]);
  }, []);

  // Render components
  const renderSearchBar = () => (
    <div className="relative mb-6">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                setShowSuggestions(false);
              }
            }}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
            aria-label={t.searchPlaceholder}
          />
          
          {/* Search suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 mt-1">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowSuggestions(false);
                    handleSearch(suggestion);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <FaSearch className="inline mr-3 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={t.filters}
        >
          <FaFilter className="text-xl" />
        </button>
        
        <button
          onClick={() => handleSearch()}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-2xl transition-colors font-semibold"
          aria-label={t.search}
        >
          {t.search}
        </button>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
      {[
        { id: 'for-you', label: t.forYou, icon: HiOutlineSparkles },
        { id: 'trending', label: t.trending, icon: FaFire },
        { id: 'live', label: t.live, icon: MdLiveTv },
        { id: 'search', label: t.search, icon: FaSearch }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => handleTabChange(id as typeof currentTab)}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentTab === id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Icon className="mr-2" />
          {label}
        </button>
      ))}
    </div>
  );

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.filters}</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Platform filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.platform}
            </label>
            <select
              value={currentFilters.platforms?.[0] || ''}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                platforms: e.target.value ? [e.target.value] : undefined
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">{t.allPlatforms}</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="live">{t.liveStreams}</option>
            </select>
          </div>

          {/* Duration filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.duration}
            </label>
            <select
              value={currentFilters.duration ? `${currentFilters.duration.min}-${currentFilters.duration.max}` : ''}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handleFilterChange({
                  ...currentFilters,
                  duration: e.target.value ? { min, max } : undefined
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">{t.anyDuration}</option>
              <option value="0-60">{t.short} (&lt; 1 min)</option>
              <option value="60-300">{t.medium} (1-5 min)</option>
              <option value="300-1800">{t.long} (5-30 min)</option>
              <option value="1800-7200">{t.veryLong} (&gt; 30 min)</option>
            </select>
          </div>

          {/* Sort by */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.sortBy}
            </label>
            <select
              value={currentFilters.sortBy || 'relevance'}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                sortBy: e.target.value as any
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="relevance">{t.relevance}</option>
              <option value="date">{t.newest}</option>
              <option value="views">{t.mostViewed}</option>
              <option value="engagement">{t.mostEngaging}</option>
              <option value="trending">{t.trending}</option>
            </select>
          </div>

          {/* Additional filters */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.hasSubtitles || false}
                onChange={(e) => handleFilterChange({
                  ...currentFilters,
                  hasSubtitles: e.target.checked ? true : undefined
                })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t.hasSubtitles}</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.isLive || false}
                onChange={(e) => handleFilterChange({
                  ...currentFilters,
                  isLive: e.target.checked ? true : undefined
                })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t.liveOnly}</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {t.clearFilters}
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            {t.applyFilters}
          </button>
        </div>
      </div>
    );
  };

  const renderVideoCard = (video: WorldClassVideo) => (
    <div
      key={video.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Video thumbnail */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
          <button
            onClick={() => handleVideoPlay(video.id)}
            className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all"
          >
            <FaPlay className="text-2xl text-gray-900 ml-1" />
          </button>
        </div>

        {/* Video duration */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>

        {/* Live indicator */}
        {video.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <MdLiveTv className="mr-1" />
            LIVE
          </div>
        )}

        {/* Platform badge */}
        <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {video.platformName}
        </div>
      </div>

      {/* Video info */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Author avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {video.author.avatar || video.author.name[0]}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {video.title}
            </h3>

            {/* Author info */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{video.author.name}</span>
              {video.author.verified && (
                <MdVerified className="ml-1 text-blue-500" />
              )}
              <span className="mx-2">•</span>
              <span>{formatNumber(video.views)} {t.views}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(video.uploadDate, language)}</span>
            </div>

            {/* AI Summary */}
            {video.aiSummary && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
                  <FaRobot className="mr-1" />
                  {t.aiSummary}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {video.aiSummary}
                </p>
              </div>
            )}

            {/* Video stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <button
                  onClick={() => handleVideoLike(video)}
                  className="flex items-center hover:text-red-500 transition-colors"
                >
                  <FaHeart className="mr-1" />
                  {formatNumber(video.likes)}
                </button>
                <button
                  onClick={() => setShowComments(prev => ({ ...prev, [video.id]: !prev[video.id] }))}
                  className="flex items-center hover:text-blue-500 transition-colors"
                >
                  <FaComment className="mr-1" />
                  {formatNumber(video.comments)}
                </button>
                <button
                  onClick={() => handleVideoShare(video)}
                  className="flex items-center hover:text-green-500 transition-colors"
                >
                  <FaShare className="mr-1" />
                  {formatNumber(video.shares)}
                </button>
              </div>

              <button
                onClick={() => handleFullscreen(video.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={t.fullscreen}
              >
                <FaExpand />
              </button>
            </div>

            {/* Accessibility indicators */}
            <div className="flex items-center mt-2 space-x-2">
              {video.hasSubtitles && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                  <FaClosedCaptioning className="mr-1" />
                  {t.subtitles}
                </span>
              )}
              {video.factChecked && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                  ✅ {t.verified}
                </span>
              )}
              {video.aiConfidence > 0.8 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
                  <FaRobot className="mr-1" />
                  {t.aiVerified}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comments section */}
      {showComments[video.id] && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t.comments} • {video.comments}
          </div>
          <div className="space-y-2">
            {/* Comment input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder={t.addComment}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                {t.post}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reaction bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {['👍', '❤️', '😂', '😢', '😡', '😮'].map((reaction) => (
              <button
                key={reaction}
                onClick={() => handleVideoReaction(video.id, reaction as VideoReaction['type'])}
                className="text-xl hover:scale-110 transition-transform"
                aria-label={`React with ${reaction}`}
              >
                {reaction}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FaEye className="mr-1" />
            {formatNumber(video.views)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map(renderVideoCard)}
    </div>
  );

  const renderLoadingState = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">{t.loading}</p>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.errorTitle}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
      <button
        onClick={() => {
          setErrorMessage(null);
          handleSearch();
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        {t.retry}
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.noResults}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{t.noResultsDescription}</p>
      <button
        onClick={clearFilters}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        {t.clearFilters}
      </button>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Search bar */}
        {renderSearchBar()}

        {/* Navigation tabs */}
        {renderTabs()}

        {/* Filters */}
        {renderFilters()}

        {/* Main content */}
        {errorMessage ? (
          renderErrorState()
        ) : isLoading && videos.length === 0 ? (
          renderLoadingState()
        ) : videos.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {renderVideoGrid()}
            
            {/* Load more trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="py-8 text-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                ) : (
                  <button
                    onClick={loadMoreVideos}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    {t.loadMore}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper functions
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatDate = (date: Date, language: string): string => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) return language === 'es' ? 'Hace poco' : 'Just now';
  if (diffInHours < 24) return language === 'es' ? `Hace ${Math.floor(diffInHours)} horas` : `${Math.floor(diffInHours)} hours ago`;
  if (diffInHours < 48) return language === 'es' ? 'Ayer' : 'Yesterday';
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return language === 'es' ? `Hace ${diffInDays} días` : `${diffInDays} days ago`;
  
  return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US');
};

const getTranslations = (language: string) => {
  const translations: { [key: string]: { [key: string]: string } } = {
    es: {
      title: '🎬 Hub de Videos Inteligente',
      subtitle: 'Descubre contenido personalizado con IA de múltiples plataformas',
      searchPlaceholder: 'Buscar videos, canales, temas...',
      search: 'Buscar',
      filters: 'Filtros',
      forYou: 'Para Ti',
      trending: 'Tendencias',
      live: 'En Vivo',
      platform: 'Plataforma',
      duration: 'Duración',
      sortBy: 'Ordenar por',
      allPlatforms: 'Todas las plataformas',
      liveStreams: 'Transmisiones en vivo',
      anyDuration: 'Cualquier duración',
      short: 'Corto',
      medium: 'Medio',
      long: 'Largo',
      veryLong: 'Muy largo',
      relevance: 'Relevancia',
      newest: 'Más reciente',
      mostViewed: 'Más visto',
      mostEngaging: 'Más interesante',
      hasSubtitles: 'Con subtítulos',
      liveOnly: 'Solo en vivo',
      clearFilters: 'Limpiar filtros',
      applyFilters: 'Aplicar filtros',
      views: 'visualizaciones',
      aiSummary: 'Resumen IA',
      subtitles: 'Subtítulos',
      verified: 'Verificado',
      aiVerified: 'IA Verificado',
      comments: 'Comentarios',
      addComment: 'Añadir comentario...',
      post: 'Publicar',
      fullscreen: 'Pantalla completa',
      loading: 'Cargando videos...',
      errorTitle: 'Error al cargar videos',
      retry: 'Reintentar',
      noResults: 'No se encontraron videos',
      noResultsDescription: 'Intenta con otros términos de búsqueda o ajusta los filtros',
      loadMore: 'Cargar más videos',
      searchError: 'Error al buscar videos',
      personalizedError: 'Error al cargar feed personalizado'
    },
    en: {
      title: '🎬 Intelligent Video Hub',
      subtitle: 'Discover AI-powered personalized content from multiple platforms',
      searchPlaceholder: 'Search videos, channels, topics...',
      search: 'Search',
      filters: 'Filters',
      forYou: 'For You',
      trending: 'Trending',
      live: 'Live',
      platform: 'Platform',
      duration: 'Duration',
      sortBy: 'Sort by',
      allPlatforms: 'All platforms',
      liveStreams: 'Live streams',
      anyDuration: 'Any duration',
      short: 'Short',
      medium: 'Medium',
      long: 'Long',
      veryLong: 'Very long',
      relevance: 'Relevance',
      newest: 'Newest',
      mostViewed: 'Most viewed',
      mostEngaging: 'Most engaging',
      hasSubtitles: 'Has subtitles',
      liveOnly: 'Live only',
      clearFilters: 'Clear filters',
      applyFilters: 'Apply filters',
      views: 'views',
      aiSummary: 'AI Summary',
      subtitles: 'Subtitles',
      verified: 'Verified',
      aiVerified: 'AI Verified',
      comments: 'Comments',
      addComment: 'Add comment...',
      post: 'Post',
      fullscreen: 'Fullscreen',
      loading: 'Loading videos...',
      errorTitle: 'Error loading videos',
      retry: 'Retry',
      noResults: 'No videos found',
      noResultsDescription: 'Try different search terms or adjust filters',
      loadMore: 'Load more videos',
      searchError: 'Error searching videos',
      personalizedError: 'Error loading personalized feed'
    }
  };

  return translations[language] || translations['es'];
};

export default WorldClassVideoHub;