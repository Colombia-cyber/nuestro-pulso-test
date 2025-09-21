import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers, FaChartLine, FaArrowRight, FaHistory } from 'react-icons/fa';
import { BiPoll, BiTrendingUp } from 'react-icons/bi';
import { MdLiveTv, MdTopic } from 'react-icons/md';
import { IoMdStats } from 'react-icons/io';
import UniversalSearchBar from '../components/UniversalSearchBar';
import FeaturedTopics from '../components/FeaturedTopics';
import { NewsTopic } from '../config/newsTopics';

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



const ModernHomepage: React.FC<ModernHomepageProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    onlineUsers: 2847,
    activePolls: 12,
    newsUpdates: 47,
    discussions: 156
  });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<'local' | 'world'>('local');

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

    // Load initial data
    setIsVisible(true);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);



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

  const handleSearch = (query: string, category: 'local' | 'world', topic?: NewsTopic) => {
    // Navigate to search with query parameters
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('category', category);
    if (topic) {
      params.set('topic', topic.id);
    }
    window.history.pushState(null, '', `/search?${params.toString()}`);
    onNavigate('search');
  };

  const handleTopicSelect = (topic: NewsTopic) => {
    // Can be used for analytics or other actions when a topic is selected
    console.log('Topic selected:', topic);
  };

  const handlePriorityTopicSelect = (topic: NewsTopic, category: 'local' | 'world') => {
    // Navigate to search with the specific topic and category
    const params = new URLSearchParams();
    params.set('q', topic.name);
    params.set('category', category);
    params.set('topic', topic.id);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    onNavigate('feeds'); // Navigate to the feeds view to show news
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Bogota'
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-25 via-white to-colombia-blue-50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Premium Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-colombia-blue-300/30 to-accent-tertiary/30 rounded-full blur-4xl animate-premium-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-colombia-yellow-300/30 to-colombia-red-300/30 rounded-full blur-4xl animate-premium-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-accent-secondary/20 to-colombia-blue-300/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-aurora opacity-20 rounded-full blur-5xl animate-gradient-aurora"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-colombia-premium opacity-5 rounded-full blur-5xl animate-rotate-slow"></div>
        </div>

        <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Premium Live Status */}
            <div className="flex justify-center mb-8">
              <div className="glass-premium px-8 py-4 rounded-full border border-white/40 backdrop-blur-4xl shadow-premium animate-premium-scale-in">
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-premium-glow opacity-50"></div>
                  </div>
                  <span className="font-semibold text-lg">EN VIVO</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-base font-medium">Bogotá {formatTime(currentTime)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-base font-bold text-gradient-premium">{liveStats.onlineUsers.toLocaleString()} en línea</span>
                </div>
              </div>
            </div>

            {/* Premium Main Title */}
            <div className="text-center mb-20">
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-8 leading-none perspective-3d">
                <span className="text-gradient-colombia-premium animate-gradient-aurora inline-block">
                  Nuestro Pulso
                </span>
              </h1>
              
              <p className="text-2xl sm:text-3xl lg:text-5xl font-light text-gray-700 mb-10 max-w-5xl mx-auto leading-relaxed">
                La plataforma cívica líder de 
                <span className="font-bold text-gradient-colombia-premium animate-gradient-aurora"> Colombia</span>
              </p>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Únete a <span className="font-bold text-gradient-premium animate-premium-glow">{liveStats.onlineUsers.toLocaleString()}</span> ciudadanos 
                construyendo el futuro del país a través de participación democrática, debates informados y noticias balanceadas.
              </p>
            </div>

            {/* Premium Universal Search */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="perspective-3d">
                <UniversalSearchBar
                  onSearch={handleSearch}
                  onTopicSelect={handleTopicSelect}
                  placeholder="Buscar en Colombia y el mundo..."
                  autoFocus={false}
                  className="shadow-premium-lg transform transition-all duration-500 hover:scale-102"
                />
              </div>
            </div>

            {/* Premium Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
              {[
                { icon: '👥', value: liveStats.onlineUsers.toLocaleString(), label: 'Usuarios activos', color: 'from-accent-primary to-accent-tertiary', delay: '0s' },
                { icon: '📊', value: liveStats.activePolls, label: 'Encuestas vivas', color: 'from-accent-tertiary to-accent-warning', delay: '0.1s' },
                { icon: '📰', value: liveStats.newsUpdates, label: 'Noticias hoy', color: 'from-accent-secondary to-accent-primary', delay: '0.2s' },
                { icon: '💬', value: liveStats.discussions, label: 'Debates abiertos', color: 'from-accent-warning to-accent-error', delay: '0.3s' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="card-premium rounded-2xl p-8 text-center border border-white/30 backdrop-blur-xl hover:scale-105 transition-all duration-500 animate-premium-scale-in"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="text-4xl mb-4 animate-bounce-gentle">{stat.icon}</div>
                  <div className={`text-3xl font-black mb-2 text-gradient-premium bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Quick Actions Grid */}
      <div className={`relative py-20 transition-all duration-1200 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gradient-premium animate-gradient-aurora">
                Acceso Directo
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Navega rápidamente a cualquier sección de la plataforma con un diseño premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {quickActions.map((action, index) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className={`group relative overflow-hidden rounded-3xl p-10 text-left transition-all duration-600 transform hover:scale-105 hover:shadow-premium-lg bg-gradient-to-br ${action.gradient} text-white card-premium animate-premium-scale-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Premium Background Patterns */}
                <div className="absolute inset-0 bg-gradient-glass opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl animate-bounce-gentle group-hover:animate-premium-bounce">{action.icon}</div>
                    {action.trend && (
                      <div className="text-sm font-bold px-3 py-2 bg-white/30 rounded-full backdrop-blur-sm border border-white/20">
                        {action.trend === 'up' ? '📈' : '📊'}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-black mb-3 group-hover:text-colombia-yellow-200 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-white/95 mb-6 text-lg leading-relaxed">{action.description}</p>
                  
                  {action.count && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                        {action.count}
                      </span>
                      <FaArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-400" />
                    </div>
                  )}
                </div>

                {/* Premium Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Featured Priority Topics */}
      <div className={`relative py-20 bg-gradient-to-br from-white/80 via-colombia-blue-25/50 to-colombia-yellow-25/30 backdrop-blur-sm transition-all duration-1200 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Category Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center glass-premium rounded-3xl p-3 shadow-premium-lg border border-white/40">
              <button
                onClick={() => setSelectedNewsCategory('local')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-400 ${
                  selectedNewsCategory === 'local'
                    ? 'bg-gradient-colombia-premium text-white shadow-colombia-strong transform scale-105'
                    : 'text-gray-700 hover:bg-white/50 hover:scale-102'
                }`}
              >
                🇨🇴 Colombia
              </button>
              <button
                onClick={() => setSelectedNewsCategory('world')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-400 ${
                  selectedNewsCategory === 'world'
                    ? 'bg-gradient-to-r from-accent-primary to-accent-tertiary text-white shadow-premium transform scale-105'
                    : 'text-gray-700 hover:bg-white/50 hover:scale-102'
                }`}
              >
                🌍 Mundo
              </button>
            </div>
          </div>

          <FeaturedTopics
            onTopicSelect={handlePriorityTopicSelect}
            selectedCategory={selectedNewsCategory}
            className="mb-16"
          />

          {/* Premium Call to Action */}
          <div className="glass-premium rounded-4xl p-12 md:p-16 text-center shadow-premium-lg border border-white/30 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-colombia-premium opacity-90"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/15 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-premium-shimmer"></div>
            
            <div className="relative z-10 text-white">
              <h2 className="text-4xl md:text-6xl font-black mb-8 animate-premium-scale-in">
                Tu Voz Construye Colombia
              </h2>
              
              <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto opacity-95">
                Participa en la conversación nacional. Vota, debate, opina y ayuda a construir 
                un futuro mejor para todos los colombianos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => handleQuickAction('surveys')}
                  className="btn-premium btn-secondary-premium group transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-4">
                    <BiPoll className="w-7 h-7" />
                    Participar en Encuestas
                    <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('community-hub')}
                  className="btn-premium border-2 border-white/40 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:border-white/60 group transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-4">
                    <FaUsers className="w-7 h-7" />
                    Únete a la Comunidad
                    <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
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