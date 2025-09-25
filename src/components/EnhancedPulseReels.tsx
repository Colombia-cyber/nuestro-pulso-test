import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaPlay, 
  FaPause, 
  FaYoutube, 
  FaTiktok,
  FaInstagram,
  FaExternalLinkAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaChevronUp,
  FaChevronDown,
  FaRedo,
  FaExclamationTriangle
} from 'react-icons/fa';
import { MdVerified, MdLiveTv } from 'react-icons/md';
import { BiTrendingUp } from 'react-icons/bi';
import { videoSourcesService } from '../services/VideoSourcesService';
import { VideoContent, VideoSourceType, VideoFetchOptions } from '../types/videoSources';

interface VideoReel extends VideoContent {
  platformName: string;
}

const EnhancedPulseReels: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const platforms = [
    { id: 'all', name: 'Todas', icon: '🎬', color: 'bg-gray-500' },
    { id: VideoSourceType.YOUTUBE, name: 'YouTube', icon: <FaYoutube />, color: 'bg-red-600' },
    { id: VideoSourceType.GOOGLE_NEWS, name: 'Google News', icon: '📰', color: 'bg-blue-600' },
    { id: VideoSourceType.NEWS_FEED, name: 'News Feed', icon: '📡', color: 'bg-green-600' },
    { id: VideoSourceType.LOCAL, name: 'Local', icon: '🏠', color: 'bg-purple-600' },
    { id: VideoSourceType.MOCK, name: 'Nuestro Pulso', icon: '🇨🇴', color: 'bg-yellow-500' }
  ];

  const filteredReels = selectedPlatform === 'all' 
    ? reels 
    : reels.filter(reel => reel.source.type === selectedPlatform);

  const currentReel = filteredReels[currentReelIndex];

  // Load videos from VideoSourcesService
  const loadVideos = async (forceRefresh = false, options: VideoFetchOptions = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchOptions: VideoFetchOptions = {
        maxResults: 20,
        trending: undefined,
        category: 'política',
        language: 'es',
        region: 'CO',
        ...options
      };

      console.log('🎬 Loading videos with options:', fetchOptions);
      const videoContent = await videoSourcesService.fetchVideos(fetchOptions, forceRefresh);
      
      // Transform VideoContent to VideoReel format
      const transformedReels: VideoReel[] = videoContent.map(video => ({
        ...video,
        platformName: getPlatformName(video.source.type)
      }));

      setReels(transformedReels);
      setCurrentReelIndex(0);
      
      if (transformedReels.length === 0) {
        setError('No se encontraron videos disponibles. Verifica tu conexión o intenta más tarde.');
      }
      
      console.log(`✅ Loaded ${transformedReels.length} videos successfully`);
    } catch (err) {
      console.error('❌ Error loading videos:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar videos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const getPlatformName = (sourceType: VideoSourceType): string => {
    const platform = platforms.find(p => p.id === sourceType);
    return platform?.name || 'Desconocido';
  };

  const refreshVideos = async () => {
    setIsRefreshing(true);
    await loadVideos(true);
  };

  // Initial load
  useEffect(() => {
    loadVideos();
  }, []);

  // Handle platform filter changes
  useEffect(() => {
    setCurrentReelIndex(0);
  }, [selectedPlatform]);

  const nextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % filteredReels.length);
  };

  const prevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleInteraction = (action: 'like' | 'comment' | 'share') => {
    console.log(`${action} on reel ${currentReel?.id}`);
    // Here you would typically make an API call to handle the interaction
  };

  const getPlatformIcon = (sourceType: VideoSourceType) => {
    const platformObj = platforms.find(p => p.id === sourceType);
    return platformObj ? platformObj.icon : '🎬';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1h';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays}d`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        prevReel();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        nextReel();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentReelIndex, filteredReels.length]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-colombia-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Cargando Reels...</h2>
          <p className="text-gray-300">Obteniendo contenido de múltiples fuentes</p>
          <div className="mt-4 text-sm text-gray-400">
            Fuentes: YouTube, Google News, API Local...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && reels.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">Error al cargar contenido</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => loadVideos(true)}
            className="bg-colombia-yellow text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            <FaRedo className="w-4 h-4 inline mr-2" />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // No content state
  if (filteredReels.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-xl font-semibold mb-4">Sin contenido disponible</h2>
          <p className="text-gray-300 mb-6">
            {selectedPlatform === 'all' 
              ? 'No hay videos disponibles en este momento'
              : `No hay videos disponibles de ${getPlatformName(selectedPlatform as VideoSourceType)}`
            }
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setSelectedPlatform('all')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Ver todas las fuentes
            </button>
            <button
              onClick={refreshVideos}
              className="bg-colombia-yellow text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <FaRedo className="w-4 h-4 inline mr-2" />
              Actualizar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Platform Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedPlatform === platform.id
                  ? `${platform.color} text-white shadow-lg transform scale-105`
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <span className="text-lg">{platform.icon}</span>
              <span>{platform.name}</span>
            </button>
          ))}
          
          {/* Refresh Button */}
          <button
            onClick={refreshVideos}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              isRefreshing 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <FaRedo className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>
      </div>

      {/* Main Reel Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md h-full bg-gradient-to-br from-gray-900 to-black rounded-none md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Thumbnail/Placeholder */}
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${currentReel?.thumbnailUrl})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              
              {/* Platform Badge */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  platforms.find(p => p.id === currentReel?.source.type)?.color || 'bg-gray-600'
                } text-white`}>
                  <span className="text-base">{getPlatformIcon(currentReel?.source.type)}</span>
                  <span>{currentReel?.platformName}</span>
                </div>
              </div>

              {/* Live Badge */}
              {currentReel?.isLive && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <MdLiveTv className="w-4 h-4" />
                    <span>EN VIVO</span>
                  </div>
                </div>
              )}

              {/* Trending Badge */}
              {currentReel?.trending && !currentReel?.isLive && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <BiTrendingUp className="w-4 h-4" />
                    <span>TRENDING</span>
                  </div>
                </div>
              )}

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-white/30 backdrop-blur-sm rounded-full p-6 hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  {isPlaying ? (
                    <FaPause className="w-8 h-8 text-white" />
                  ) : (
                    <FaPlay className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{currentReel?.author.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{currentReel?.author.name}</span>
                      {currentReel?.author.verified && (
                        <MdVerified className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{formatNumber(currentReel?.author.followers || 0)} seguidores</p>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 leading-tight">{currentReel?.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                    {currentReel?.description}
                  </p>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentReel?.tags.map((tag, index) => (
                    <span key={index} className="text-blue-400 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <span>{formatNumber(currentReel?.views || 0)} views</span>
                  <span>{formatDuration(currentReel?.duration || 0)}</span>
                  <span>{getTimeAgo(currentReel?.publishedAt || '')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6">
          {/* Like */}
          <button 
            onClick={() => handleInteraction('like')}
            className="flex flex-col items-center gap-2 text-white hover:text-red-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-red-500/30 transition-all duration-300">
              <FaHeart className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel?.likes || 0)}</span>
          </button>

          {/* Comment */}
          <button 
            onClick={() => handleInteraction('comment')}
            className="flex flex-col items-center gap-2 text-white hover:text-blue-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-blue-500/30 transition-all duration-300">
              <FaComment className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel?.comments || 0)}</span>
          </button>

          {/* Share */}
          <button 
            onClick={() => handleInteraction('share')}
            className="flex flex-col items-center gap-2 text-white hover:text-green-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-green-500/30 transition-all duration-300">
              <FaShare className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel?.shares || 0)}</span>
          </button>

          {/* External Link */}
          {currentReel?.embedUrl && (
            <button 
              onClick={() => window.open(currentReel.embedUrl, '_blank')}
              className="flex flex-col items-center gap-2 text-white hover:text-purple-500 transition-colors group"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-purple-500/30 transition-all duration-300">
                <FaExternalLinkAlt className="w-6 h-6" />
              </div>
              <span className="text-xs">Ver original</span>
            </button>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={prevReel}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronUp className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextReel}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 flex gap-4">
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? (
              <FaVolumeMute className="w-5 h-5 text-white" />
            ) : (
              <FaVolumeUp className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaExpand className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 right-4">
          <div className="text-white text-sm bg-black/50 rounded-full px-3 py-1">
            {currentReelIndex + 1} / {filteredReels.length}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-sm">
        <div className="space-y-2">
          <p>↑↓ Navegar</p>
          <p>Espacio: Play/Pause</p>
          <p className="text-xs">Múltiples fuentes activas</p>
        </div>
      </div>

      {/* Error Toast */}
      {error && reels.length > 0 && (
        <div className="absolute top-20 left-4 right-4 z-40">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPulseReels;