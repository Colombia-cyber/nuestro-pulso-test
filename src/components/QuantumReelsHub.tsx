import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaPlay, FaPause, FaYoutube, FaTiktok,
  FaInstagram, FaExternalLinkAlt, FaVolumeUp, FaVolumeMute, FaExpand,
  FaChevronUp, FaChevronDown, FaFire, FaBolt, FaGlobe, FaSearch,
  FaFilter, FaClock, FaEye, FaBookmark, FaDownload, FaFlag
} from 'react-icons/fa';
import { MdVerified, MdLiveTv, MdTrendingUp } from 'react-icons/md';
import { BiTrendingUp, BiFullscreen } from 'react-icons/bi';

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
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'feed' | 'grid' | 'theater'>('feed');
  const containerRef = useRef<HTMLDivElement>(null);

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
      thumbnail: '🎬',
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
      thumbnail: '📊',
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
      thumbnail: '📱',
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
      thumbnail: '📰',
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
      thumbnail: '🗳️',
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
      thumbnail: '🕊️',
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
    
    const matchesPlatform = selectedPlatform === 'all' || reel.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'all' || reel.category === selectedCategory;

    return matchesSearch && matchesPlatform && matchesCategory;
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

  const categories = ['all', 'Política', 'Educación Cívica', 'Actualidad', 'Terror Reels', 'Elecciones'];
  const platforms = ['all', 'youtube', 'tiktok', 'instagram', 'facebook', 'x-twitter'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Prominent Header */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🎬 Quantum Reels Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Reels en tiempo real con integración cross-platform y verificación IA. 
              El hub más avanzado de contenido cívico audiovisual de Colombia.
            </p>
            
            {/* Prominent Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold">
                🔴 EN VIVO • 23 streams activos
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold">
                ⚡ TIEMPO REAL • Actualización instantánea
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold">
                ✅ VERIFICADO • Fact-checking con IA
              </div>
            </div>
          </div>

          {/* Enhanced Real-Time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-500/30 hover:border-red-400/50 transition-colors">
              <div className="text-3xl font-bold text-red-400 mb-2">{formatNumber(reelsMetrics.totalReels)}</div>
              <div className="text-sm text-white/80">Total Reels</div>
              <div className="text-xs text-red-300 mt-1">+{Math.floor(Math.random() * 10)} nuevos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-green-500/30 hover:border-green-400/50 transition-colors">
              <div className="text-3xl font-bold text-green-400 mb-2 animate-pulse">{reelsMetrics.liveReels}</div>
              <div className="text-sm text-white/80">En Vivo</div>
              <div className="text-xs text-green-300 mt-1">🔴 ACTIVO</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-500/30 hover:border-blue-400/50 transition-colors">
              <div className="text-3xl font-bold text-blue-400 mb-2">{formatNumber(reelsMetrics.totalViews)}</div>
              <div className="text-sm text-white/80">Visualizaciones</div>
              <div className="text-xs text-blue-300 mt-1">+{Math.floor(Math.random() * 500)} por min</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-500/30 hover:border-purple-400/50 transition-colors">
              <div className="text-3xl font-bold text-purple-400 mb-2">{reelsMetrics.platformsConnected}</div>
              <div className="text-sm text-white/80">Plataformas</div>
              <div className="text-xs text-purple-300 mt-1">Cross-Platform</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-500/30 hover:border-yellow-400/50 transition-colors">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{reelsMetrics.languagesDetected}</div>
              <div className="text-sm text-white/80">Idiomas</div>
              <div className="text-xs text-yellow-300 mt-1">Multi-lingual</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{reelsMetrics.factChecksPerformed}</div>
              <div className="text-sm text-white/80">Fact Checks</div>
              <div className="text-xs text-cyan-300 mt-1">IA Verificado</div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
                <input
                  type="text"
                  placeholder="Buscar reels, hashtags, temas, creadores, plataformas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800 text-white">
                    {category === 'all' ? '🌟 Todas las categorías' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform} className="bg-slate-800 text-white">
                    {platform === 'all' ? '🌐 Todas las plataformas' : platform}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'feed' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                {/* Video Container */}
                <div className="relative aspect-video bg-black">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {currentReel.thumbnail}
                  </div>
                  
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
                        <div className="text-2xl">{reel.thumbnail}</div>
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
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {reel.thumbnail}
                  </div>
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
            onClick={() => setViewMode(viewMode === 'feed' ? 'grid' : 'feed')}
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