import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaPlay, FaPause, FaYoutube, FaTiktok,
  FaInstagram, FaExternalLinkAlt, FaVolumeUp, FaVolumeMute, FaExpand,
  FaChevronUp, FaChevronDown, FaFire, FaBolt, FaGlobe, FaSearch,
  FaFilter, FaClock, FaEye, FaBookmark, FaDownload, FaFlag, FaTimes
} from 'react-icons/fa';
import { MdVerified, MdLiveTv, MdTrendingUp, MdLanguage } from 'react-icons/md';
import { BiTrendingUp, BiFullscreen } from 'react-icons/bi';
import VideoThumbnail from './VideoThumbnail';
import ModernFilterSystem from './ModernFilterSystem';
import RelatedContent from './RelatedContent';
import { VideoSkeleton } from './SkeletonLoader';
import { i18nService, Language } from '../services/i18nService';
import { useAccessibility, screenReader, aria } from '../utils/accessibility';
import { useRealtimeVideoService } from '../services/realtimeVideoService';

interface WorldClassVideo {
  id: string;
  title: string;
  description: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'x-twitter' | 'local';
  platformName: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: string;
  videoUrl?: string;
  embedUrl?: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
    engagement: number;
  };
  hashtags: string[];
  isLive?: boolean;
  timestamp: string;
  trending?: boolean;
  factChecked: boolean;
  location?: string;
  language: string;
  transcription?: string;
  aiSummary?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  realTimeStats?: {
    currentViewers?: number;
    peakViewers?: number;
    liveDuration?: string;
  };
}

interface FilterState {
  timeRange: string;
  perspective: string;
  category?: string;
  source?: string;
  platform?: string;
  language?: string;
  isLive?: boolean;
  isTrending?: boolean;
  isVerified?: boolean;
}

const WorldClassVideoHub: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'moderno' | 'feed' | 'timeline' | 'categorias'>('moderno');
  const [showFilters, setShowFilters] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasApiConfig, setHasApiConfig] = useState(false);

  // Real-time service
  const { isConnected, metrics, updates, service } = useRealtimeVideoService();

  // Accessibility
  const { FocusManager, KeyboardNavigator } = useAccessibility();

  // Filters state - Updated to use new structure
  const [filters, setFilters] = useState<FilterState>({
    timeRange: 'all',
    perspective: 'both',
    category: 'all',
    source: '',
    platform: 'all',
    language: '',
    isLive: false,
    isTrending: false,
    isVerified: false
  });

  // Mock video data (fallback when no API configured)
  const mockVideos: WorldClassVideo[] = [
    {
      id: '1',
      title: i18nService.t('🔴 LIVE: Debate Presidencial en Tiempo Real', '🔴 LIVE: Presidential Debate Real Time'),
      description: 'Transmisión en vivo del debate presidencial con análisis instantáneo de propuestas y verificación de hechos en tiempo real.',
      platform: 'youtube',
      platformName: 'YouTube',
      category: i18nService.t('category.politics', 'Politics'),
      duration: i18nService.t('video.live', 'LIVE'),
      views: 125600,
      likes: 3400,
      comments: 892,
      shares: 567,
      thumbnail: 'https://img.youtube.com/vi/KYz2wyBy3kc/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/live-debate',
      author: {
        name: 'Canal Congreso Colombia',
        avatar: '🏛️',
        verified: true,
        followers: '245K',
        engagement: 94
      },
      hashtags: ['#DebatePresidencial', '#EnVivo', '#Colombia2024'],
      isLive: true,
      timestamp: 'Iniciado hace 1h 23m',
      trending: true,
      factChecked: true,
      location: 'Bogotá, Colombia',
      language: 'es',
      aiSummary: 'Debate intenso sobre reforma tributaria, educación y seguridad. Petro lidera propuestas sociales, oposición enfoca economía.',
      sentiment: 'neutral',
      topics: ['Reforma Tributaria', 'Educación', 'Seguridad', 'Economía'],
      realTimeStats: {
        currentViewers: 12560,
        peakViewers: 18900,
        liveDuration: '1h 23m'
      }
    },
    {
      id: '2',
      title: i18nService.t('Explicación Rápida: Nueva Reforma Laboral', 'Quick Explanation: New Labor Reform'),
      description: 'Todo sobre la reforma laboral explicado en 3 minutos: cambios clave, beneficios, controversias y impacto real para trabajadores colombianos.',
      platform: 'tiktok',
      platformName: 'TikTok',
      category: i18nService.t('category.civic_education', 'Civic Education'),
      duration: '2:58',
      views: 89400,
      likes: 5600,
      comments: 234,
      shares: 1200,
      thumbnail: 'https://img.youtube.com/vi/Eg0jObgVDgI/maxresdefault.jpg',
      author: {
        name: 'Profesor Cívico',
        avatar: '👨‍🏫',
        verified: true,
        followers: '156K',
        engagement: 96
      },
      hashtags: ['#ReformaLaboral', '#Educación', '#TrabajadoresColombia'],
      timestamp: 'Hace 45 minutos',
      trending: true,
      factChecked: true,
      language: 'es',
      transcription: 'La nueva reforma laboral propone... [transcripción completa disponible]',
      aiSummary: 'Reforma laboral busca flexibilizar horarios y mejorar protección social. Controversia en costos empresariales vs derechos trabajadores.',
      sentiment: 'neutral',
      topics: ['Reforma Laboral', 'Derechos Laborales', 'Economía']
    },
    {
      id: '3',
      title: i18nService.t('Tutorial: Cómo Votar en 2024 📊', 'Tutorial: How to Vote in 2024 📊'),
      description: 'Guía completa paso a paso para votar en las próximas elecciones. Documentos necesarios, lugares de votación y derechos ciudadanos.',
      platform: 'instagram',
      platformName: 'Instagram',
      category: i18nService.t('category.elections', 'Elections'),
      duration: '1:45',
      views: 156700,
      likes: 8900,
      comments: 567,
      shares: 2300,
      thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
      author: {
        name: 'Registraduría Nacional',
        avatar: '🏛️',
        verified: true,
        followers: '234K',
        engagement: 98
      },
      hashtags: ['#ComoVotar', '#Elecciones2024', '#Democracia'],
      timestamp: 'Hace 1 día',
      trending: true,
      factChecked: true,
      language: 'es',
      aiSummary: 'Proceso electoral simplificado: cédula válida, lugar de votación por código, horarios 8am-4pm, voto libre y secreto.',
      sentiment: 'positive',
      topics: ['Elecciones', 'Educación Cívica', 'Participación Democrática']
    }
  ];

  // Check for API configuration
  useEffect(() => {
    const apiKey = (import.meta.env?.VITE_FIREBASE_API_KEY as string) || 
                   (import.meta.env?.VITE_VIDEO_API_KEY as string);
    setHasApiConfig(!!apiKey);
  }, []);

  // Initialize language
  useEffect(() => {
    setCurrentLanguage(i18nService.getCurrentLanguage());
    const unsubscribe = i18nService.onLanguageChange(setCurrentLanguage);
    return unsubscribe;
  }, []);

  // Real-time updates announcements
  useEffect(() => {
    updates.forEach(update => {
      if (update.type === 'new') {
        screenReader.announceNewVideos(1);
      }
    });
  }, [updates]);

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlatform = filters.platform === 'all' || video.platform === filters.platform;
    const matchesCategory = filters.category === 'all' || video.category === filters.category;
    const matchesLanguage = !filters.language || video.language === filters.language;
    const matchesLive = !filters.isLive || video.isLive;
    const matchesTrending = !filters.isTrending || video.trending;
    const matchesVerified = !filters.isVerified || video.author.verified;

    return matchesSearch && matchesPlatform && matchesCategory && matchesLanguage && 
           matchesLive && matchesTrending && matchesVerified;
  });

  const currentVideo = filteredVideos[currentVideoIndex] || mockVideos[0];

  const formatNumber = (num: number) => {
    return i18nService.formatNumber(num);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <FaYoutube className="text-red-500" />;
      case 'tiktok': return <FaTiktok className="text-black" />;
      case 'instagram': return <FaInstagram className="text-pink-500" />;
      case 'facebook': return <div className="text-blue-600">📘</div>;
      case 'x-twitter': return <div className="text-slate-600">𝕏</div>;
      default: return <FaGlobe className="text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    screenReader.announceFilterChanged(filterType, value.toString());
  };

  const handleClearFilters = () => {
    setFilters({
      timeRange: 'all',
      perspective: 'both',
      category: 'all',
      source: '',
      platform: 'all',
      language: '',
      isLive: false,
      isTrending: false,
      isVerified: false
    });
  };

  const handleLanguageChange = (language: Language) => {
    i18nService.setLanguage(language);
    screenReader.announce(`Language changed to ${language}`, 'polite');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" ref={containerRef}>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50 rounded"
      >
        {i18nService.t('Skip to main content', 'Skip to main content')}
      </a>

      {/* Modern Filter System */}
      <ModernFilterSystem
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onShowFiltersChange={setShowFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        type="video"
      />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center text-white py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">{i18nService.t('search.no_results', 'No results found')}</h3>
            <p className="text-gray-400">{i18nService.t('Try adjusting your filters or search terms', 'Try adjusting your filters or search terms')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              {/* Featured Video Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full">
                    <FaFire className="w-4 h-4" />
                    <span className="font-bold">Destacadas</span>
                  </div>
                  <div className="text-sm text-white">
                    Video principal
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  <div className="relative aspect-video bg-black">
                    <VideoThumbnail 
                      src={currentVideo.thumbnail} 
                      alt={currentVideo.title}
                      videoUrl={currentVideo.embedUrl}
                      title={currentVideo.title}
                      description={currentVideo.description}
                      className="w-full h-full"
                      onVideoPlay={() => {
                        screenReader.announceVideoStarted(currentVideo.title);
                        if (currentVideo.embedUrl) {
                          window.open(currentVideo.embedUrl, '_blank');
                        }
                        setIsPlaying(true);
                      }}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                              aria-label={isPlaying ? i18nService.t('Pause video', 'Pause video') : i18nService.t('Play video', 'Play video')}
                            >
                              {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white ml-1" />}
                            </button>
                            
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                              aria-label={isMuted ? i18nService.t('Unmute', 'Unmute') : i18nService.t('Mute', 'Mute')}
                            >
                              {isMuted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {currentVideo.isLive && (
                              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold animate-pulse">
                                🔴 {i18nService.t('video.live', 'LIVE')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
                        <p className="text-slate-300 leading-relaxed">{currentVideo.description}</p>
                      </div>
                      <div className="ml-4">
                        {getPlatformIcon(currentVideo.platform)}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{currentVideo.author.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{currentVideo.author.name}</h3>
                          {currentVideo.author.verified && <MdVerified className="text-blue-400" />}
                          {currentVideo.factChecked && (
                            <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">
                              ✅ {i18nService.t('video.verified', 'Verified')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{currentVideo.author.followers} {i18nService.t('followers', 'followers')}</span>
                          <span>{currentVideo.author.engagement}% engagement</span>
                          <span>{currentVideo.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    {currentVideo.aiSummary && (
                      <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">🤖 {i18nService.t('AI Summary', 'AI Summary')}</h4>
                        <p className="text-slate-300 text-sm">{currentVideo.aiSummary}</p>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-400">{formatNumber(currentVideo.views)}</div>
                        <div className="text-xs text-slate-400">{i18nService.t('video.views', 'Views')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-pink-400">{formatNumber(currentVideo.likes)}</div>
                        <div className="text-xs text-slate-400">{i18nService.t('video.likes', 'Likes')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">{formatNumber(currentVideo.comments)}</div>
                        <div className="text-xs text-slate-400">{i18nService.t('video.comments', 'Comments')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-400">{formatNumber(currentVideo.shares)}</div>
                        <div className="text-xs text-slate-400">{i18nService.t('video.shares', 'Shares')}</div>
                      </div>
                    </div>

                    {/* Related Content */}
                    <RelatedContent
                      itemId={currentVideo.id}
                      itemType="video"
                      count={2}
                      className="mb-4"
                    />

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2">
                      {currentVideo.hashtags.map((hashtag, index) => (
                        <span key={index} className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full">
                    <BiTrendingUp className="w-4 h-4" />
                    <span className="font-bold">Trending</span>
                  </div>
                  <div className="text-sm text-white">
                    Lo más popular ahora
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredVideos.filter(v => v.trending).slice(1, 3).map((video) => (
                    <div key={video.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="aspect-video bg-black">
                        <VideoThumbnail
                          src={video.thumbnail}
                          alt={video.title}
                          videoUrl={video.embedUrl}
                          title={video.title}
                          className="w-full h-full"
                          onVideoPlay={() => {
                            if (video.embedUrl) {
                              window.open(video.embedUrl, '_blank');
                            }
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{video.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          {getPlatformIcon(video.platform)}
                          <span>{video.author.name}</span>
                          {video.author.verified && <MdVerified className="text-blue-400" />}
                          <span>•</span>
                          <span>{formatNumber(video.views)} vistas</span>
                        </div>
                        <RelatedContent
                          itemId={video.id}
                          itemType="video"
                          count={1}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Video List */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">📱 {i18nService.t('Related Videos', 'Related Videos')}</h3>
                <div 
                  className="space-y-4 max-h-96 overflow-y-auto"
                  role="list"
                  aria-label={i18nService.t('Video list', 'Video list')}
                >
                  {filteredVideos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`cursor-pointer rounded-xl p-4 transition-all ${
                        index === currentVideoIndex 
                          ? 'bg-blue-600/30 border border-blue-500' 
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setCurrentVideoIndex(index);
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                          <VideoThumbnail
                            src={video.thumbnail}
                            alt={video.title}
                            videoUrl={video.embedUrl}
                            title={video.title}
                            className="w-full h-full"
                            showPlayButton={false}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">{video.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            {getPlatformIcon(video.platform)}
                            <span>{video.author.name}</span>
                            {video.author.verified && <MdVerified className="text-blue-400" />}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                            <span>{formatNumber(video.views)} {i18nService.t('video.views', 'views')}</span>
                            <span>{video.timestamp}</span>
                            {video.isLive && <span className="text-red-400">🔴 {i18nService.t('video.live', 'LIVE')}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EN VIVO Section */}
              {filteredVideos.filter(v => v.isLive).length > 0 && (
                <div className="mt-6 bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    🔴 {i18nService.t('Live Now', 'EN VIVO')}
                    <span className="text-sm font-normal text-red-400 animate-pulse">
                      ({filteredVideos.filter(v => v.isLive).length} activos)
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {filteredVideos.filter(v => v.isLive).slice(0, 3).map((video) => (
                      <div key={video.id} className="flex items-center gap-3 p-3 bg-red-600/10 rounded-lg border border-red-500/20">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{video.title}</h4>
                          <div className="text-xs text-slate-400">
                            {video.author.name} • {video.realTimeStats?.currentViewers && formatNumber(video.realTimeStats.currentViewers)} viendo
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Real-time Updates Panel */}
              {updates.length > 0 && (
                <div className="mt-6 bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4">⚡ {i18nService.t('Live Updates', 'Live Updates')}</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {updates.slice(0, 10).map((update, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-400">
                            {update.type === 'new' ? '🆕' : 
                             update.type === 'live_start' ? '🔴' : 
                             update.type === 'live_end' ? '⭐' : '📊'}
                          </span>
                          <span className="text-white font-medium">
                            {update.type === 'new' ? i18nService.t('New video', 'New video') :
                             update.type === 'live_start' ? i18nService.t('Live started', 'Live started') :
                             update.type === 'live_end' ? i18nService.t('Live ended', 'Live ended') :
                             i18nService.t('Metrics update', 'Metrics update')}
                          </span>
                          <span className="text-slate-400 text-xs ml-auto">
                            {update.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        {update.data.title && (
                          <div className="text-sm text-slate-300 mt-1 truncate">
                            {update.data.title}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorldClassVideoHub;