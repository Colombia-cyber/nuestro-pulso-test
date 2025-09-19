import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers, FaChartLine, FaArrowRight, FaHistory } from 'react-icons/fa';
import { BiPoll, BiTrendingUp } from 'react-icons/bi';
import { MdLiveTv, MdTopic } from 'react-icons/md';
import { IoMdStats } from 'react-icons/io';
import GoogleClassSearchBar from '../components/GoogleClassSearchBar';

interface ModernHomepageProps {
  onNavigate: (view: string) => void;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  action: string;
  count?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  engagement: number;
  trend: 'rising' | 'hot' | 'stable';
}

const ModernHomepage: React.FC<ModernHomepageProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    onlineUsers: 2847,
    activePolls: 12,
    newsUpdates: 47,
    discussions: 156
  });
  const [isVisible, setIsVisible] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Update stats
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
        activePolls: prev.activePolls + Math.floor(Math.random() * 3) - 1,
        newsUpdates: prev.newsUpdates + Math.floor(Math.random() * 5),
        discussions: prev.discussions + Math.floor(Math.random() * 8) - 2
      }));
    }, 15000);

    // Load trending topics
    loadTrendingTopics();

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const loadTrendingTopics = () => {
    const topics: TrendingTopic[] = [
      { id: '1', title: 'Reforma Pensional 2024', category: 'Política', engagement: 15420, trend: 'hot' },
      { id: '2', title: 'Gustavo Petro Pronunciamientos', category: 'Gobierno', engagement: 12380, trend: 'rising' },
      { id: '3', title: 'Elecciones Regionales', category: 'Electoral', engagement: 9850, trend: 'rising' },
      { id: '4', title: 'Seguridad Nacional', category: 'Seguridad', engagement: 8920, trend: 'stable' },
      { id: '5', title: 'Economía Colombiana', category: 'Economía', engagement: 7640, trend: 'stable' },
      { id: '6', title: 'Paz Total', category: 'Social', engagement: 6890, trend: 'rising' }
    ];
    setTrendingTopics(topics);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'search',
      title: 'Búsqueda Universal',
      description: 'Explora mundo y Colombia',
      icon: '🔍',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      action: 'search',
      count: 'Mundial + Local'
    },
    {
      id: 'news',
      title: 'Noticias',
      description: 'Información balanceada',
      icon: '📰',
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      action: 'feeds',
      count: '+47 hoy',
      trend: 'up'
    },
    {
      id: 'polls',
      title: 'Encuestas',
      description: 'Voz ciudadana',
      icon: '📊',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      action: 'surveys',
      count: '12 activas',
      trend: 'up'
    },
    {
      id: 'debates',
      title: 'Debates',
      description: 'Conversación cívica',
      icon: '🗣️',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      action: 'debates',
      count: '156 activos',
      trend: 'up'
    },
    {
      id: 'congress',
      title: 'Congreso',
      description: 'Seguimiento legislativo',
      icon: '🏛️',
      gradient: 'from-indigo-500 via-blue-500 to-teal-500',
      action: 'congress',
      count: 'En sesión'
    },
    {
      id: 'reels',
      title: 'Reels',
      description: 'Videos informativos',
      icon: '🎬',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      action: 'reels',
      count: '156 videos'
    }
  ];

  const handleQuickAction = (action: string) => {
    onNavigate(action);
  };

  const handleSearch = (query: string, tab: 'world' | 'local') => {
    // Navigate to search with query parameters
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('tab', tab);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    onNavigate('search');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Bogota'
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot': return '🔥';
      case 'rising': return '📈';
      default: return '📊';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Live Status */}
            <div className="flex justify-center mb-8">
              <div className="glass-modern px-6 py-3 rounded-full border border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">EN VIVO</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">Bogotá {formatTime(currentTime)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-medium text-blue-600">{liveStats.onlineUsers.toLocaleString()} en línea</span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-none">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nuestro Pulso
                </span>
              </h1>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                La plataforma cívica líder de 
                <span className="font-semibold bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 bg-clip-text text-transparent"> Colombia</span>
              </p>
              
              <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                Únete a <span className="font-bold text-blue-600">{liveStats.onlineUsers.toLocaleString()}</span> ciudadanos 
                construyendo el futuro del país a través de participación democrática, debates informados y noticias balanceadas.
              </p>
            </div>

            {/* Universal Search */}
            <div className="max-w-4xl mx-auto mb-16">
              <GoogleClassSearchBar
                onSearch={handleSearch}
                placeholder="Buscar en Colombia y el mundo..."
                autoFocus={false}
                className="shadow-2xl"
              />
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              {[
                { icon: '👥', value: liveStats.onlineUsers.toLocaleString(), label: 'Usuarios activos', color: 'blue' },
                { icon: '📊', value: liveStats.activePolls, label: 'Encuestas vivas', color: 'purple' },
                { icon: '📰', value: liveStats.newsUpdates, label: 'Noticias hoy', color: 'green' },
                { icon: '💬', value: liveStats.discussions, label: 'Debates abiertos', color: 'orange' }
              ].map((stat, index) => (
                <div key={index} className="glass-modern rounded-2xl p-6 text-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className={`relative py-16 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Acceso Directo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navega rápidamente a cualquier sección de la plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quickActions.map((action, index) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className={`group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${action.gradient} text-white`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{action.icon}</div>
                    {action.trend && (
                      <div className="text-sm font-bold px-2 py-1 bg-white/20 rounded-full">
                        {action.trend === 'up' ? '📈' : '📊'}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                  <p className="text-white/90 mb-4 text-lg">{action.description}</p>
                  
                  {action.count && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                        {action.count}
                      </span>
                      <FaArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className={`relative py-16 bg-white/50 backdrop-blur-sm transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Trending Topics Section */}
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BiTrendingUp className="w-8 h-8 text-red-500" />
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Tendencias Nacionales
                </span>
              </h2>
              
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => handleSearch(topic.title, 'local')}
                    className="w-full group glass-modern rounded-2xl p-6 text-left border border-white/20 backdrop-blur-xl hover:shadow-lg transition-all duration-300 hover:scale-102"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                        <span className="text-lg">{getTrendIcon(topic.trend)}</span>
                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          {topic.category}
                        </span>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaUsers className="w-3 h-3" />
                        {topic.engagement.toLocaleString()} interacciones
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tu Voz Construye Colombia
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Participa en la conversación nacional. Vota, debate, opina y ayuda a construir 
                un futuro mejor para todos los colombianos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => handleQuickAction('surveys')}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <BiPoll className="w-6 h-6" />
                    Participar en Encuestas
                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('community-hub')}
                  className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <FaUsers className="w-6 h-6" />
                    Únete a la Comunidad
                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHomepage;