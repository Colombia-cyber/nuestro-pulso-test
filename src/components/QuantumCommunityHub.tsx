import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, FaTwitter, FaWhatsapp, FaYoutube, FaInstagram, FaTiktok,
  FaUsers, FaComments, FaShare, FaEye, FaPlay, FaExternalLinkAlt,
  FaFire, FaBolt, FaGlobe, FaHeart, FaSearch, FaFilter, FaPlus,
  FaChevronRight, FaChevronDown, FaStar, FaTrophy
} from 'react-icons/fa';
import { BiLike, BiComment, BiShare } from 'react-icons/bi';
import { MdLiveTv, MdVerified, MdTrendingUp } from 'react-icons/md';

interface RealTimePlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  followers: number;
  isConnected: boolean;
  lastActivity: string;
  realTimeUsers: number;
  postsToday: number;
  engagement: number;
  trending: boolean;
}

interface UnifiedPost {
  id: string;
  platform: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  verified?: boolean;
  avatar?: string;
  image?: string;
  videoUrl?: string;
  isLive?: boolean;
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  factChecked: boolean;
}

interface CommunityMetrics {
  totalMembers: number;
  onlineNow: number;
  postsToday: number;
  crossPlatformShares: number;
  trendsTracked: number;
  factChecksPerformed: number;
}

const QuantumCommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [communityMetrics, setCommunityMetrics] = useState<CommunityMetrics>({
    totalMembers: 89470,
    onlineNow: 4523,
    postsToday: 1247,
    crossPlatformShares: 892,
    trendsTracked: 156,
    factChecksPerformed: 234
  });

  const [realTimePlatforms, setRealTimePlatforms] = useState<RealTimePlatform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      followers: 45273,
      isConnected: true,
      lastActivity: 'Hace 2 min',
      realTimeUsers: 1234,
      postsToday: 456,
      engagement: 87,
      trending: true
    },
    {
      id: 'twitter',
      name: 'X/Twitter',
      icon: <FaTwitter className="w-5 h-5" />,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      followers: 32847,
      isConnected: true,
      lastActivity: 'Hace 1 min',
      realTimeUsers: 892,
      postsToday: 234,
      engagement: 92,
      trending: true
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      followers: 28934,
      isConnected: true,
      lastActivity: 'Hace 5 min',
      realTimeUsers: 567,
      postsToday: 23,
      engagement: 94,
      trending: false
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      followers: 18765,
      isConnected: true,
      lastActivity: 'Hace 8 min',
      realTimeUsers: 445,
      postsToday: 89,
      engagement: 89,
      trending: false
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <FaTiktok className="w-5 h-5" />,
      color: 'text-slate-800',
      bgColor: 'bg-slate-50',
      followers: 15623,
      isConnected: true,
      lastActivity: 'Hace 3 min',
      realTimeUsers: 678,
      postsToday: 156,
      engagement: 96,
      trending: true
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      followers: 12456,
      isConnected: true,
      lastActivity: 'Hace 1 min',
      realTimeUsers: 234,
      postsToday: 67,
      engagement: 85,
      trending: false
    }
  ]);

  const [unifiedPosts, setUnifiedPosts] = useState<UnifiedPost[]>([
    {
      id: '1',
      platform: 'twitter',
      author: 'María González',
      content: '🔴 BREAKING: Nueva propuesta de reforma tributaria genera debate intenso en el Congreso. ¿Qué opinan ciudadanos colombianos? #ReformaTributaria #Colombia',
      timestamp: 'Hace 2 minutos',
      likes: 234,
      comments: 67,
      shares: 89,
      views: 1247,
      verified: true,
      avatar: '👩‍💼',
      topic: 'Reforma Tributaria',
      sentiment: 'neutral',
      factChecked: true,
      isLive: true
    },
    {
      id: '2',
      platform: 'youtube',
      author: 'Análisis Político Colombia',
      content: '📺 LIVE: Debate en vivo sobre las nuevas políticas de seguridad ciudadana. Participa con tus comentarios.',
      timestamp: 'Hace 5 minutos',
      likes: 456,
      comments: 123,
      shares: 67,
      views: 3456,
      verified: true,
      avatar: '📺',
      videoUrl: '#',
      topic: 'Seguridad Ciudadana',
      sentiment: 'positive',
      factChecked: true,
      isLive: true
    },
    {
      id: '3',
      platform: 'facebook',
      author: 'Comunidad Cívica Bogotá',
      content: '🏛️ Resultados de la consulta ciudadana sobre movilidad sostenible: 78% a favor del transporte público eléctrico. ¡Tu voz cuenta!',
      timestamp: 'Hace 8 minutos',
      likes: 189,
      comments: 45,
      shares: 23,
      verified: false,
      avatar: '🚌',
      topic: 'Movilidad Sostenible',
      sentiment: 'positive',
      factChecked: true
    },
    {
      id: '4',
      platform: 'tiktok',
      author: 'Joven Político',
      content: '🎬 Explicación rápida: ¿Cómo funciona realmente el sistema electoral colombiano? 📊 #EducaciónCívica #Colombia',
      timestamp: 'Hace 12 minutos',
      likes: 892,
      comments: 156,
      shares: 234,
      views: 5678,
      avatar: '🗳️',
      videoUrl: '#',
      topic: 'Educación Cívica',
      sentiment: 'positive',
      factChecked: true
    },
    {
      id: '5',
      platform: 'instagram',
      author: 'Periodista Independiente',
      content: '📸 Galería: Manifestación pacífica por la transparencia gubernamental reúne a miles de ciudadanos en Medellín.',
      timestamp: 'Hace 15 minutos',
      likes: 567,
      comments: 89,
      shares: 123,
      verified: true,
      avatar: '📷',
      image: '🏛️',
      topic: 'Transparencia',
      sentiment: 'positive',
      factChecked: true
    }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update community metrics
      setCommunityMetrics(prev => ({
        totalMembers: prev.totalMembers + Math.floor(Math.random() * 5),
        onlineNow: prev.onlineNow + Math.floor(Math.random() * 10) - 5,
        postsToday: prev.postsToday + Math.floor(Math.random() * 3),
        crossPlatformShares: prev.crossPlatformShares + Math.floor(Math.random() * 2),
        trendsTracked: prev.trendsTracked + (Math.random() > 0.9 ? 1 : 0),
        factChecksPerformed: prev.factChecksPerformed + (Math.random() > 0.8 ? 1 : 0)
      }));

      // Update platform real-time users
      setRealTimePlatforms(prev => prev.map(platform => ({
        ...platform,
        realTimeUsers: platform.realTimeUsers + Math.floor(Math.random() * 20) - 10,
        postsToday: platform.postsToday + (Math.random() > 0.8 ? 1 : 0)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredPosts = unifiedPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(post.platform);
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'live' && post.isLive) ||
                      (activeTab === 'verified' && post.verified) ||
                      (activeTab === 'trending' && post.likes > 300);

    return matchesSearch && matchesPlatform && matchesTab;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = realTimePlatforms.find(p => p.id === platformId);
    return platform ? platform.icon : <FaGlobe className="w-4 h-4" />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🌐 Hub Comunitario Cuántico
          </h1>
          <p className="text-xl text-gray-600">
            Centro unificado de participación cívica con integración cross-platform en tiempo real
          </p>
        </div>

        {/* Real-Time Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-blue-500" />
              <span className="text-xs text-gray-500">Total Miembros</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{formatNumber(communityMetrics.totalMembers)}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <FaBolt className="text-green-500" />
              <span className="text-xs text-gray-500">Online Ahora</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{formatNumber(communityMetrics.onlineNow)}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <FaComments className="text-purple-500" />
              <span className="text-xs text-gray-500">Posts Hoy</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{formatNumber(communityMetrics.postsToday)}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <FaShare className="text-orange-500" />
              <span className="text-xs text-gray-500">Cross-Platform</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">{formatNumber(communityMetrics.crossPlatformShares)}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
            <div className="flex items-center gap-2 mb-2">
              <MdTrendingUp className="text-cyan-500" />
              <span className="text-xs text-gray-500">Trends Tracked</span>
            </div>
            <div className="text-2xl font-bold text-cyan-600">{formatNumber(communityMetrics.trendsTracked)}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <MdVerified className="text-red-500" />
              <span className="text-xs text-gray-500">Fact Checks</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{formatNumber(communityMetrics.factChecksPerformed)}</div>
          </div>
        </div>

        {/* Platform Status Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🔗 Plataformas Conectadas</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {realTimePlatforms.filter(p => p.isConnected).length} Activas
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realTimePlatforms.map((platform) => (
              <div key={platform.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <span className={platform.color}>{platform.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{platform.name}</h3>
                      <p className="text-xs text-gray-500">{platform.lastActivity}</p>
                    </div>
                  </div>
                  {platform.trending && <FaFire className="text-orange-500" />}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Seguidores</div>
                    <div className="font-semibold">{formatNumber(platform.followers)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">En línea</div>
                    <div className="font-semibold text-green-600">{formatNumber(platform.realTimeUsers)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Posts hoy</div>
                    <div className="font-semibold">{platform.postsToday}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Engagement</div>
                    <div className="font-semibold text-blue-600">{platform.engagement}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar posts, usuarios, hashtags, temas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaFilter />
              Filtros
              {showFilters ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {realTimePlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      setSelectedPlatforms(prev => 
                        prev.includes(platform.id)
                          ? prev.filter(id => id !== platform.id)
                          : [...prev, platform.id]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {platform.icon}
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'all', label: '🌟 Todos', count: unifiedPosts.length },
              { id: 'live', label: '🔴 En Vivo', count: unifiedPosts.filter(p => p.isLive).length },
              { id: 'verified', label: '✅ Verificados', count: unifiedPosts.filter(p => p.verified).length },
              { id: 'trending', label: '🔥 Trending', count: unifiedPosts.filter(p => p.likes > 300).length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Unified Posts Feed */}
          <div className="p-6">
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{post.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800">{post.author}</h3>
                          {post.verified && <MdVerified className="text-blue-500" />}
                          {post.factChecked && <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">✅ Verificado</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{getPlatformIcon(post.platform)}</span>
                          <span>{post.timestamp}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{post.topic}</span>
                          {post.isLive && <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs animate-pulse">🔴 EN VIVO</span>}
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg ${getSentimentColor(post.sentiment)}`}>
                      {post.sentiment === 'positive' ? '😊' : post.sentiment === 'negative' ? '😟' : '😐'}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 text-4xl">{post.image}</div>
                    )}
                    {post.videoUrl && (
                      <div className="mt-3 flex items-center gap-2 text-blue-600">
                        <FaPlay />
                        <span>Ver video</span>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BiLike className="text-blue-500" />
                        <span>{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiComment className="text-green-500" />
                        <span>{formatNumber(post.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiShare className="text-purple-500" />
                        <span>{formatNumber(post.shares)}</span>
                      </div>
                      {post.views && (
                        <div className="flex items-center gap-1">
                          <FaEye className="text-gray-400" />
                          <span>{formatNumber(post.views)}</span>
                        </div>
                      )}
                    </div>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Interactuar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCommunityHub;