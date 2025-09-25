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
  platforms: string[];
  categories: string[];
  languages: string[];
  showLiveOnly: boolean;
  showTrendingOnly: boolean;
  showVerifiedOnly: boolean;
  dateRange: 'today' | 'week' | 'month' | 'all';
}

const WorldClassVideoHub: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'feed' | 'grid' | 'theater'>('feed');
  const [showFilters, setShowFilters] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasApiConfig, setHasApiConfig] = useState(false);

  // Real-time service
  const { isConnected, metrics, updates, service } = useRealtimeVideoService();

  // Accessibility
  const { FocusManager, KeyboardNavigator } = useAccessibility();

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    categories: [],
    languages: [],
    showLiveOnly: false,
    showTrendingOnly: false,
    showVerifiedOnly: false,
    dateRange: 'all'
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
    
    const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(video.platform);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(video.category);
    const matchesLanguage = filters.languages.length === 0 || filters.languages.includes(video.language);
    const matchesLive = !filters.showLiveOnly || video.isLive;
    const matchesTrending = !filters.showTrendingOnly || video.trending;
    const matchesVerified = !filters.showVerifiedOnly || video.author.verified;

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

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    screenReader.announceFilterChanged(filterType, value.toString());
  };

  const handleLanguageChange = (language: Language) => {
    i18nService.setLanguage(language);
    screenReader.announce(`Language changed to ${language}`, 'polite');
  };

  const availablePlatforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'x-twitter'];
  const availableCategories = ['Política', 'Educación Cívica', 'Actualidad', 'Elecciones', 'Debates'];
  const availableLanguages = ['es', 'en', 'pt'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" ref={containerRef}>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50 rounded"
      >
        {i18nService.t('Skip to main content', 'Skip to main content')}
      </a>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🎬 {i18nService.t('video.hub.title', 'World-Class Video Hub')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {i18nService.t('video.hub.subtitle', 'Advanced video aggregation with AI verification and real-time updates')}
            </p>
            
            {/* Language Selector */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {i18nService.getLanguageOptions().map(lang => (
                  <button
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      currentLanguage === lang.value
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    aria-pressed={currentLanguage === lang.value}
                  >
                    <MdLanguage className="inline mr-1" />
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* API Status Indicator */}
            <div className="flex justify-center gap-4 mt-6">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                hasApiConfig 
                  ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                  : 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {hasApiConfig ? '🌐 API Configurada' : '🎭 Modo Demo'}
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isConnected 
                  ? 'bg-green-600/20 text-green-300 border border-green-500/30 animate-pulse' 
                  : 'bg-red-600/20 text-red-300 border border-red-500/30'
              }`}>
                {isConnected ? i18nService.t('realtime.connected', 'Connected - Real-time updates') : i18nService.t('realtime.disconnected', 'Disconnected - Retrying connection')}
              </div>
            </div>

            {/* Real-Time Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-red-400">{formatNumber(metrics.totalVideos)}</div>
                <div className="text-sm text-white/80">{i18nService.t('Total Videos', 'Total Videos')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-green-500/30">
                <div className="text-2xl font-bold text-green-400 animate-pulse">{metrics.liveVideos}</div>
                <div className="text-sm text-white/80">{i18nService.t('video.live', 'Live')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400">{formatNumber(metrics.totalViews)}</div>
                <div className="text-sm text-white/80">{i18nService.t('video.views', 'Views')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400">{metrics.platformsActive}</div>
                <div className="text-sm text-white/80">{i18nService.t('Platforms', 'Platforms')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-yellow-500/30">
                <div className="text-2xl font-bold text-yellow-400">{metrics.languagesDetected}</div>
                <div className="text-sm text-white/80">{i18nService.t('video.language', 'Languages')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-cyan-500/30">
                <div className="text-2xl font-bold text-cyan-400">{metrics.factChecksPerformed}</div>
                <div className="text-sm text-white/80">{i18nService.t('Fact Checks', 'Fact Checks')}</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
                  <input
                    type="text"
                    placeholder={i18nService.t('search.placeholder', 'Search videos, hashtags, creators...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    aria-label={i18nService.t('search.placeholder', 'Search videos, hashtags, creators...')}
                  />
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                aria-expanded={showFilters}
                aria-controls="filter-panel"
              >
                <FaFilter />
                {i18nService.t('Filters', 'Filters')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div
          id="filter-panel"
          className="bg-slate-800 border-b border-slate-700 p-6"
          role="region"
          aria-label={i18nService.t('Advanced filters', 'Advanced filters')}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Platform Filter */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  {i18nService.t('filter.by_platform', 'Filter by platform')}
                </label>
                <div className="space-y-2">
                  {availablePlatforms.map(platform => (
                    <label key={platform} className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={filters.platforms.includes(platform)}
                        onChange={(e) => {
                          const newPlatforms = e.target.checked
                            ? [...filters.platforms, platform]
                            : filters.platforms.filter(p => p !== platform);
                          handleFilterChange('platforms', newPlatforms);
                        }}
                        className="mr-2"
                      />
                      <span className="flex items-center gap-2">
                        {getPlatformIcon(platform)}
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  {i18nService.t('filter.by_category', 'Filter by category')}
                </label>
                <div className="space-y-2">
                  {availableCategories.map(category => (
                    <label key={category} className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...filters.categories, category]
                            : filters.categories.filter(c => c !== category);
                          handleFilterChange('categories', newCategories);
                        }}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <label className="block text-white font-semibold mb-2">Filtros Especiales</label>
                <div className="space-y-2">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={filters.showLiveOnly}
                      onChange={(e) => handleFilterChange('showLiveOnly', e.target.checked)}
                      className="mr-2"
                    />
                    {i18nService.t('filter.only_live', 'Live only')}
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={filters.showTrendingOnly}
                      onChange={(e) => handleFilterChange('showTrendingOnly', e.target.checked)}
                      className="mr-2"
                    />
                    {i18nService.t('filter.only_trending', 'Trending only')}
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={filters.showVerifiedOnly}
                      onChange={(e) => handleFilterChange('showVerifiedOnly', e.target.checked)}
                      className="mr-2"
                    />
                    {i18nService.t('filter.only_verified', 'Verified only')}
                  </label>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  {i18nService.t('filter.by_date', 'Filter by date')}
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full p-2 bg-slate-700 text-white rounded-lg border border-slate-600"
                >
                  <option value="all">{i18nService.t('All time', 'All time')}</option>
                  <option value="today">{i18nService.t('Today', 'Today')}</option>
                  <option value="week">{i18nService.t('This week', 'This week')}</option>
                  <option value="month">{i18nService.t('This month', 'This month')}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-white">
                {i18nService.t('Mostrando', 'Showing')} {filteredVideos.length} {i18nService.t('videos', 'videos')}
              </span>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white hover:text-gray-300"
                aria-label={i18nService.t('Close filters', 'Close filters')}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

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