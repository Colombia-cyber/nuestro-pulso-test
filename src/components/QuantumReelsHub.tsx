import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaPlay, FaPause, FaYoutube, FaTiktok,
  FaInstagram, FaExternalLinkAlt, FaVolumeUp, FaVolumeMute, FaExpand,
  FaChevronUp, FaChevronDown, FaFire, FaBolt, FaGlobe, FaSearch,
  FaFilter, FaClock, FaEye, FaBookmark, FaDownload, FaFlag
} from 'react-icons/fa';
import { MdVerified, MdLiveTv, MdTrendingUp } from 'react-icons/md';
import { BiTrendingUp, BiFullscreen } from 'react-icons/bi';
import VideoThumbnail from './VideoThumbnail';
import ModernFilterSystem from './ModernFilterSystem';
import RelatedContent from './RelatedContent';
import { ReelSkeleton } from './SkeletonLoader';

interface QuantumReel {
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

interface ReelsMetrics {
  totalReels: number;
  liveReels: number;
  totalViews: number;
  platformsConnected: number;
  languagesDetected: number;
  factChecksPerformed: number;
}

const QuantumReelsHub: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'moderno' | 'feed' | 'timeline' | 'categorias'>('moderno');
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated filters structure
  const [filters, setFilters] = useState({
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

  const [reelsMetrics, setReelsMetrics] = useState<ReelsMetrics>({
    totalReels: 2847,
    liveReels: 23,
    totalViews: 8934567,
    platformsConnected: 6,
    languagesDetected: 4,
    factChecksPerformed: 156
  });

  const quantumReels: QuantumReel[] = [
    {
      id: '1',
      title: '🔴 LIVE: Debate Presidencial en Tiempo Real',
      description: 'Transmisión en vivo del debate presidencial con análisis instantáneo de propuestas y verificación de hechos en tiempo real.',
      platform: 'youtube',
      platformName: 'YouTube',
      category: 'Política',
      duration: 'EN VIVO',
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
      title: 'Explicación Rápida: Nueva Reforma Laboral',
      description: 'Todo sobre la reforma laboral explicado en 3 minutos: cambios clave, beneficios, controversias y impacto real para trabajadores colombianos.',
      platform: 'tiktok',
      platformName: 'TikTok',
      category: 'Educación Cívica',
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
      title: 'Manifestación Pacífica Medellín - EN DIRECTO',
      description: 'Cobertura en vivo de la manifestación ciudadana por la transparencia gubernamental. Transmisión desde el centro de Medellín.',
      platform: 'instagram',
      platformName: 'Instagram',
      category: 'Actualidad',
      duration: 'EN VIVO',
      views: 34500,
      likes: 1800,
      comments: 156,
      shares: 289,
      thumbnail: 'https://img.youtube.com/vi/7u1nYs6kSgQ/maxresdefault.jpg',
      author: {
        name: 'Periodista Ciudadano MDE',
        avatar: '📷',
        verified: false,
        followers: '45K',
        engagement: 87
      },
      hashtags: ['#ManifestacionPacifica', '#Medellin', '#Transparencia'],
      isLive: true,
      timestamp: 'Iniciado hace 32 min',
      factChecked: true,
      location: 'Medellín, Antioquia',
      language: 'es',
      sentiment: 'positive',
      topics: ['Manifestaciones', 'Transparencia', 'Participación Ciudadana'],
      realTimeStats: {
        currentViewers: 2340,
        peakViewers: 3600,
        liveDuration: '32 min'
      }
    },
    {
      id: '4',
      title: 'Terror Reels: Crisis Migratoria 2023',
      description: 'Archivo especial: Momentos más impactantes de la crisis migratoria venezolana. Datos verificados y testimonios reales.',
      platform: 'youtube',
      platformName: 'YouTube',
      category: 'Terror Reels',
      duration: '4:12',
      views: 67800,
      likes: 2100,
      comments: 445,
      shares: 123,
      thumbnail: 'https://img.youtube.com/vi/f4EwKrTgtLg/maxresdefault.jpg',
      author: {
        name: 'Archivo Histórico CO',
        avatar: '📚',
        verified: true,
        followers: '89K',
        engagement: 92
      },
      hashtags: ['#TerrorReels', '#CrisisMigratoria', '#Historia'],
      timestamp: 'Hace 2 días',
      factChecked: true,
      language: 'es',
      aiSummary: 'Documentación de crisis migratoria: 2.3M venezolanos en Colombia, desafíos de integración, respuesta gubernamental y ONG.',
      sentiment: 'negative',
      topics: ['Migración', 'Crisis Humanitaria', 'Política Internacional']
    },
    {
      id: '5',
      title: 'Tutorial: Cómo Votar en 2024 📊',
      description: 'Guía completa paso a paso para votar en las próximas elecciones. Documentos necesarios, lugares de votación y derechos ciudadanos.',
      platform: 'tiktok',
      platformName: 'TikTok',
      category: 'Educación Cívica',
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
    },
    {
      id: '6',
      title: 'Breaking: Acuerdo de Paz - Avances',
      description: 'Últimos desarrollos en la implementación del acuerdo de paz. Análisis de avances, desafíos y testimonios desde territorios.',
      platform: 'facebook',
      platformName: 'Facebook',
      category: 'Actualidad',
      duration: '3:33',
      views: 45600,
      likes: 1500,
      comments: 234,
      shares: 167,
      thumbnail: 'https://img.youtube.com/vi/wJnBTPUQS5A/maxresdefault.jpg',
      author: {
        name: 'Colombia Reconcilia',
        avatar: '🤝',
        verified: true,
        followers: '156K',
        engagement: 89
      },
      hashtags: ['#AcuerdoDePaz', '#Reconciliacion', '#Colombia'],
      timestamp: 'Hace 6 horas',
      factChecked: true,
      language: 'es',
      aiSummary: 'Implementación acuerdo de paz 68% completada. Avances en sustitución cultivos, retos en seguridad territorial.',
      sentiment: 'positive',
      topics: ['Paz', 'Reconciliación', 'Desarrollo Rural']
    }
  ];

  // Real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setReelsMetrics(prev => ({
        totalReels: prev.totalReels + Math.floor(Math.random() * 3),
        liveReels: prev.liveReels + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0),
        totalViews: prev.totalViews + Math.floor(Math.random() * 100) + 50,
        platformsConnected: prev.platformsConnected,
        languagesDetected: prev.languagesDetected,
        factChecksPerformed: prev.factChecksPerformed + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredReels = quantumReels.filter(reel => {
    const matchesSearch = reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reel.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlatform = filters.platform === 'all' || reel.platform === filters.platform;
    const matchesCategory = filters.category === 'all' || reel.category === filters.category;
    const matchesLanguage = !filters.language || reel.language === filters.language;
    const matchesLive = !filters.isLive || reel.isLive;
    const matchesTrending = !filters.isTrending || reel.trending;
    const matchesVerified = !filters.isVerified || reel.factChecked;

    return matchesSearch && matchesPlatform && matchesCategory && matchesLanguage && 
           matchesLive && matchesTrending && matchesVerified;
  });

  const currentReel = filteredReels[currentReelIndex] || quantumReels[0];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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

  const categories = ['all', 'Política', 'Educación Cívica', 'Actualidad', 'Terror Reels', 'Elecciones'];
  const platforms = ['all', 'youtube', 'tiktok', 'instagram', 'facebook', 'x-twitter'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
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
        type="reel"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'feed' || viewMode === 'moderno' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Reel Player */}
            <div className="lg:col-span-2">
              {/* Destacadas Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full">
                    <FaFire className="w-4 h-4" />
                    <span className="font-bold">Destacadas</span>
                  </div>
                  <div className="text-sm text-white">
                    Reel principal
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  {/* Video Container */}
                  <div className="relative aspect-video bg-black">
                    <VideoThumbnail 
                      src={currentReel.thumbnail} 
                      alt={currentReel.title}
                      videoUrl={currentReel.embedUrl}
                      title={currentReel.title}
                      description={currentReel.description}
                      className="w-full h-full"
                      onVideoPlay={() => {
                        if (currentReel.embedUrl) {
                          window.open(currentReel.embedUrl, '_blank');
                        }
                        setIsPlaying(true);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {!isPlaying ? (
                              <button
                                onClick={() => setIsPlaying(true)}
                                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                              >
                                <FaPlay className="text-white ml-1" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setIsPlaying(false)}
                                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                              >
                                <FaPause className="text-white" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                            >
                              {isMuted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {currentReel.isLive && (
                              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold animate-pulse">
                                🔴 EN VIVO
                              </span>
                            )}
                            <button className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-colors">
                              <BiFullscreen className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentReel.title}</h2>
                        <p className="text-slate-300 leading-relaxed">{currentReel.description}</p>
                      </div>
                      <div className="ml-4">
                        {getPlatformIcon(currentReel.platform)}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{currentReel.author.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{currentReel.author.name}</h3>
                          {currentReel.author.verified && <MdVerified className="text-blue-400" />}
                          {currentReel.factChecked && (
                            <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">✅ Verificado</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{currentReel.author.followers} seguidores</span>
                          <span>{currentReel.author.engagement}% engagement</span>
                          <span>{currentReel.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    {currentReel.aiSummary && (
                      <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">🤖 Resumen IA</h4>
                        <p className="text-slate-300 text-sm">{currentReel.aiSummary}</p>
                      </div>
                    )}

                    {/* Stats and Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-400">{formatNumber(currentReel.views)}</div>
                        <div className="text-xs text-slate-400">Visualizaciones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-pink-400">{formatNumber(currentReel.likes)}</div>
                        <div className="text-xs text-slate-400">Me gusta</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">{formatNumber(currentReel.comments)}</div>
                        <div className="text-xs text-slate-400">Comentarios</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-400">{formatNumber(currentReel.shares)}</div>
                        <div className="text-xs text-slate-400">Compartidos</div>
                      </div>
                    </div>

                    {/* Live Stats */}
                    {currentReel.isLive && currentReel.realTimeStats && (
                      <div className="bg-red-600/20 rounded-xl p-4 mb-4 border border-red-500/30">
                        <h4 className="font-semibold text-red-400 mb-2">📊 Estadísticas en Vivo</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-red-300">Viendo ahora</div>
                            <div className="text-white font-semibold">{formatNumber(currentReel.realTimeStats.currentViewers || 0)}</div>
                          </div>
                          <div>
                            <div className="text-red-300">Pico de audiencia</div>
                            <div className="text-white font-semibold">{formatNumber(currentReel.realTimeStats.peakViewers || 0)}</div>
                          </div>
                          <div>
                            <div className="text-red-300">Duración</div>
                            <div className="text-white font-semibold">{currentReel.realTimeStats.liveDuration}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Topics and Hashtags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentReel.topics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Related Content */}
                    <RelatedContent
                      itemId={currentReel.id}
                      itemType="reel"
                      count={2}
                      className="mb-4"
                    />

                    <div className="flex flex-wrap gap-2">
                      {currentReel.hashtags.map((hashtag, index) => (
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
                  {filteredReels.filter(r => r.trending).slice(1, 3).map((reel) => (
                    <div key={reel.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="aspect-video bg-black">
                        <VideoThumbnail
                          src={reel.thumbnail}
                          alt={reel.title}
                          videoUrl={reel.embedUrl}
                          title={reel.title}
                          className="w-full h-full"
                          onVideoPlay={() => {
                            if (reel.embedUrl) {
                              window.open(reel.embedUrl, '_blank');
                            }
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{reel.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          {getPlatformIcon(reel.platform)}
                          <span>{reel.author.name}</span>
                          {reel.author.verified && <MdVerified className="text-blue-400" />}
                          <span>•</span>
                          <span>{formatNumber(reel.views)} vistas</span>
                        </div>
                        <RelatedContent
                          itemId={reel.id}
                          itemType="reel"
                          count={1}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Reels List */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">📱 Reels Relacionados</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredReels.map((reel, index) => (
                    <div
                      key={reel.id}
                      onClick={() => setCurrentReelIndex(index)}
                      className={`cursor-pointer rounded-xl p-4 transition-all ${
                        index === currentReelIndex 
                          ? 'bg-blue-600/30 border border-blue-500' 
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                          <VideoThumbnail
                            src={reel.thumbnail}
                            alt={reel.title}
                            videoUrl={reel.embedUrl}
                            title={reel.title}
                            className="w-full h-full"
                            showPlayButton={false}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">{reel.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            {getPlatformIcon(reel.platform)}
                            <span>{reel.author.name}</span>
                            {reel.author.verified && <MdVerified className="text-blue-400" />}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                            <span>{formatNumber(reel.views)} vistas</span>
                            <span>{reel.timestamp}</span>
                            {reel.isLive && <span className="text-red-400">🔴 EN VIVO</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReels.map((reel, index) => (
              <div
                key={reel.id}
                onClick={() => {
                  setCurrentReelIndex(index);
                  setViewMode('feed');
                }}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:transform hover:scale-105 transition-all border border-slate-700"
              >
                <div className="relative aspect-video bg-black">
                  <img 
                    src={reel.thumbnail} 
                    alt={reel.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/320/180';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {reel.isLive && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold animate-pulse">
                        🔴 EN VIVO
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs">
                    {reel.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-white text-sm line-clamp-2 mb-2">{reel.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    {getPlatformIcon(reel.platform)}
                    <span>{reel.author.name}</span>
                    {reel.author.verified && <MdVerified className="text-blue-400" />}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{formatNumber(reel.views)} vistas</span>
                    <span className={getSentimentColor(reel.sentiment)}>
                      {reel.sentiment === 'positive' ? '😊' : reel.sentiment === 'negative' ? '😟' : '😐'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Toggle */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setViewMode(viewMode === 'feed' ? 'categorias' : 'feed')}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            {viewMode === 'feed' ? (
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-white rounded"></div>
                <div className="w-2 h-2 bg-white rounded"></div>
                <div className="w-2 h-2 bg-white rounded"></div>
                <div className="w-2 h-2 bg-white rounded"></div>
              </div>
            ) : (
              <div className="w-6 h-4 bg-white rounded"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantumReelsHub;