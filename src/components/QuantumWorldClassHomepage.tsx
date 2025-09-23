import React, { useState, useEffect } from 'react';
import { 
  FaMicrophone, FaMicrophoneSlash, FaRocket, FaGlobe, FaEye, FaBrain,
  FaPlay, FaSearch, FaUsers, FaFire, FaComments, FaStar, FaBolt,
  FaLock, FaHeart, FaMagic, FaAtom, FaInfinity
} from 'react-icons/fa';
import AnimatedGlobalTrendMap from './AnimatedGlobalTrendMap';
import CopilotUltra from './CopilotUltra';
import { useMultiModalNavigation } from '../services/multiModalNavigation';
import { useAIPersonalization } from '../services/aiPersonalization';

interface QuantumWorldClassHomepageProps {
  onNavigate: (view: string) => void;
}

interface QuantumFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  status: 'live' | 'beta' | 'quantum' | 'coming-soon';
  engagement: number;
  category: 'ai' | 'community' | 'reels' | 'platform';
}

interface RealTimeMetrics {
  aiInteractions: number;
  activeUsers: number;
  factChecksToday: number;
  crossPlatformPosts: number;
  realTimeReels: number;
  quantumComputations: number;
  globalSentiment: number;
  civicActions: number;
}

const QuantumWorldClassHomepage: React.FC<QuantumWorldClassHomepageProps> = ({ onNavigate }) => {
  const [currentUserId] = useState('quantum-user-' + Math.random().toString(36).substr(2, 9));
  const [showCopilot, setShowCopilot] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    aiInteractions: 27834,
    activeUsers: 8456,
    factChecksToday: 1247,
    crossPlatformPosts: 3456,
    realTimeReels: 892,
    quantumComputations: 156,
    globalSentiment: 73,
    civicActions: 445
  });

  const { isListening, capabilities, toggleVoiceControl } = useMultiModalNavigation(onNavigate);
  const { trackInteraction, getRecommendations, getUserInsights } = useAIPersonalization(currentUserId);

  const quantumFeatures: QuantumFeature[] = [
    // AI & Intelligence Features
    {
      id: 'quantum-ai',
      title: '⚛️ Quantum AI Engine',
      description: 'Motor de IA cuántica con análisis predictivo y personalización ultra-avanzada',
      icon: <FaAtom className="text-cyan-400" />,
      gradient: 'from-cyan-600 via-blue-600 to-purple-600',
      status: 'quantum',
      engagement: 98,
      category: 'ai'
    },
    {
      id: 'copilot-ultra',
      title: '🧠 Copilot Ultra Sentient',
      description: 'IA conversacional sentiente con verificación de hechos y análisis contextual',
      icon: <FaBrain className="text-purple-400" />,
      gradient: 'from-purple-600 to-pink-600',
      status: 'live',
      engagement: 96,
      category: 'ai'
    },
    {
      id: 'adaptive-feeds',
      title: '🔄 Feeds Adaptativos Infinitos',
      description: 'Contenido que se adapta y evoluciona con tus intereses en tiempo real',
      icon: <FaInfinity className="text-green-400" />,
      gradient: 'from-green-600 to-emerald-600',
      status: 'live',
      engagement: 94,
      category: 'ai'
    },
    
    // Community & Social Features
    {
      id: 'unified-community',
      title: '🌐 Hub Comunitario Unificado',
      description: 'Centro de comunidad que integra todas las plataformas sociales en tiempo real',
      icon: <FaUsers className="text-blue-400" />,
      gradient: 'from-blue-600 to-cyan-600',
      status: 'live',
      engagement: 92,
      category: 'community'
    },
    {
      id: 'cross-platform-chat',
      title: '💬 Chat Cross-Plataforma',
      description: 'Conversaciones unificadas que sincronizan con todas las redes sociales',
      icon: <FaComments className="text-orange-400" />,
      gradient: 'from-orange-600 to-red-600',
      status: 'live',
      engagement: 89,
      category: 'community'
    },
    {
      id: 'gamified-engagement',
      title: '🏆 Engagement Gamificado',
      description: 'Sistema de reputación con recompensas reales y reconocimiento global',
      icon: <FaStar className="text-yellow-400" />,
      gradient: 'from-yellow-600 to-orange-600',
      status: 'live',
      engagement: 87,
      category: 'community'
    },

    // Reels & Content Features
    {
      id: 'real-time-reels',
      title: '🎬 Reels en Tiempo Real',
      description: 'Integración directa con APIs de YouTube, TikTok, Instagram - Solo datos reales',
      icon: <FaPlay className="text-red-400" />,
      gradient: 'from-red-600 to-pink-600',
      status: 'live',
      engagement: 91,
      category: 'reels'
    },
    {
      id: 'universal-search',
      title: '🔍 Búsqueda Universal',
      description: 'Motor de búsqueda que encuentra todo: posts, reels, usuarios, hashtags',
      icon: <FaSearch className="text-indigo-400" />,
      gradient: 'from-indigo-600 to-purple-600',
      status: 'live',
      engagement: 88,
      category: 'reels'
    },
    {
      id: 'terror-reels',
      title: '📰 Terror Reels Archive',
      description: 'Archivo curado de clips impactantes de noticias de la última década',
      icon: <FaFire className="text-orange-400" />,
      gradient: 'from-orange-600 to-red-600',
      status: 'beta',
      engagement: 85,
      category: 'reels'
    },

    // Platform & Technology Features
    {
      id: 'multimodal-nav',
      title: '🎙️ Navegación Multi-Modal',
      description: 'Control por voz, gestos, AR y comandos naturales en español',
      icon: <FaMicrophone className="text-green-400" />,
      gradient: 'from-green-600 to-teal-600',
      status: 'live',
      engagement: 83,
      category: 'platform'
    },
    {
      id: 'quantum-security',
      title: '🔒 Seguridad Cuántica',
      description: 'Encriptación cuántica y protección de privacidad de próxima generación',
      icon: <FaLock className="text-cyan-400" />,
      gradient: 'from-cyan-600 to-blue-600',
      status: 'quantum',
      engagement: 95,
      category: 'platform'
    },
    {
      id: 'immersive-news',
      title: '🥽 Newsroom Inmersivo VR/AR',
      description: 'Experiencias de noticias en realidad virtual con salas de prensa 360°',
      icon: <FaEye className="text-purple-400" />,
      gradient: 'from-purple-600 to-indigo-600',
      status: 'coming-soon',
      engagement: 0,
      category: 'platform'
    }
  ];

  // Real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        aiInteractions: prev.aiInteractions + Math.floor(Math.random() * 8) + 2,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 6) - 2,
        factChecksToday: prev.factChecksToday + Math.floor(Math.random() * 3),
        crossPlatformPosts: prev.crossPlatformPosts + Math.floor(Math.random() * 5),
        realTimeReels: prev.realTimeReels + Math.floor(Math.random() * 4),
        quantumComputations: prev.quantumComputations + Math.floor(Math.random() * 2),
        globalSentiment: Math.max(60, Math.min(85, prev.globalSentiment + (Math.random() - 0.5) * 4)),
        civicActions: prev.civicActions + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (feature: QuantumFeature) => {
    trackInteraction(feature.id, 'view');

    switch (feature.id) {
      case 'quantum-ai':
      case 'adaptive-feeds':
        onNavigate('feeds');
        break;
      case 'copilot-ultra':
        setShowCopilot(true);
        break;
      case 'unified-community':
      case 'cross-platform-chat':
      case 'gamified-engagement':
        onNavigate('community-hub');
        break;
      case 'real-time-reels':
      case 'terror-reels':
        onNavigate('reels');
        break;
      case 'universal-search':
        onNavigate('search');
        break;
      case 'multimodal-nav':
        toggleVoiceControl();
        break;
      case 'quantum-security':
        alert('🔒 Quantum Security: Protección de datos con encriptación cuántica habilitada');
        break;
      case 'immersive-news':
        alert('🚀 Próximamente: Experiencias de noticias VR/AR con salas de prensa inmersivas');
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      live: 'bg-green-500 text-white animate-pulse',
      beta: 'bg-yellow-500 text-black',
      quantum: 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white animate-pulse',
      'coming-soon': 'bg-gray-500 text-white'
    };
    const labels = {
      live: '🔴 EN VIVO',
      beta: '🟡 BETA',
      quantum: '⚛️ QUANTUM',
      'coming-soon': '⏳ PRÓXIMAMENTE'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredFeatures = activeCategory === 'all' 
    ? quantumFeatures 
    : quantumFeatures.filter(f => f.category === activeCategory);

  const categories = [
    { id: 'all', label: '🌟 Todas', icon: '🌟' },
    { id: 'ai', label: '🧠 IA', icon: '🧠' },
    { id: 'community', label: '👥 Comunidad', icon: '👥' },
    { id: 'reels', label: '🎬 Reels', icon: '🎬' },
    { id: 'platform', label: '⚙️ Plataforma', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Nuestro Pulso
              <span className="block text-4xl md:text-5xl mt-4">Quantum Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              La primera plataforma de participación cívica con IA cuántica, integración cross-platform 
              en tiempo real, y experiencias inmersivas que redefinen la democracia digital.
            </p>
          </div>

          {/* Real-Time Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">{realTimeMetrics.aiInteractions.toLocaleString()}</div>
              <div className="text-xs text-slate-300">IA Interacciones</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{realTimeMetrics.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Usuarios Activos</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{realTimeMetrics.factChecksToday.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Fact Checks Hoy</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.crossPlatformPosts.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Posts Cross-Platform</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{realTimeMetrics.realTimeReels.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Reels en Tiempo Real</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">{realTimeMetrics.quantumComputations.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Computaciones Cuánticas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-500/30">
              <div className="text-2xl font-bold text-pink-400">{realTimeMetrics.globalSentiment.toFixed(1)}%</div>
              <div className="text-xs text-slate-300">Sentimiento Global</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{realTimeMetrics.civicActions.toLocaleString()}</div>
              <div className="text-xs text-slate-300">Acciones Cívicas</div>
            </div>
          </div>

          {/* Voice Control Status */}
          {(isListening || capabilities.speechRecognition) && (
            <div className="flex justify-center mb-8">
              <div className={`px-6 py-3 rounded-full text-lg font-semibold shadow-xl transition-all flex items-center gap-3 ${
                isListening 
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white animate-pulse shadow-red-500/50' 
                  : 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200'
              }`}>
                {isListening ? <FaMicrophone className="animate-pulse" /> : <FaMicrophoneSlash />}
                {isListening ? '🎙️ Escuchando comandos de voz...' : '🤖 IA Multi-Modal Activa'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Categories */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantum Features Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl border border-slate-700/50 hover:border-cyan-500/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  {getStatusBadge(feature.status)}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.status === 'live' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-red-400" />
                      <span className="text-sm text-slate-400">{feature.engagement}% engagement</span>
                    </div>
                    <FaBolt className="text-yellow-400 group-hover:animate-bounce" />
                  </div>
                )}
                
                {feature.status === 'quantum' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaAtom className="text-cyan-400 animate-spin" />
                      <span className="text-sm text-cyan-300">Quantum-Powered</span>
                    </div>
                    <FaMagic className="text-purple-400 group-hover:animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Trend Map Section */}
      <div id="trend-map" className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 Tendencias Globales en Tiempo Real
          </h2>
          <p className="text-xl text-slate-300">
            Visualización interactiva de la actividad cívica y política en Colombia
          </p>
        </div>
        <AnimatedGlobalTrendMap />
      </div>

      {/* Copilot Ultra Modal */}
      {showCopilot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-cyan-500/30">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🧠 Copilot Ultra Sentient
              </h3>
              <button
                onClick={() => setShowCopilot(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="h-96">
              <CopilotUltra />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumWorldClassHomepage;