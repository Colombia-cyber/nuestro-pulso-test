import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlay, FaUsers, FaChartLine, FaNewspaper, FaComments } from 'react-icons/fa';
import { IoMdStats, IoMdTrendingUp } from 'react-icons/io';
import { BiPoll } from 'react-icons/bi';
import { MdLiveTv } from 'react-icons/md';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

interface LiveStats {
  onlineUsers: number;
  activePolls: number;
  newsUpdates: number;
  discussions: number;
}

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: string;
  badge?: string;
  stats?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState<LiveStats>({
    onlineUsers: 2847,
    activePolls: 12,
    newsUpdates: 47,
    discussions: 156
  });
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate live stats updates
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
        activePolls: prev.activePolls + Math.floor(Math.random() * 3) - 1,
        newsUpdates: prev.newsUpdates + Math.floor(Math.random() * 5),
        discussions: prev.discussions + Math.floor(Math.random() * 8) - 2
      }));
    }, 15000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const categories: CategoryItem[] = [
    {
      id: 'news',
      title: 'Noticias & Feeds',
      description: 'Últimas noticias con perspectivas balanceadas',
      icon: <FaNewspaper className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-700',
      action: 'feeds',
      badge: 'ACTUALIZADO',
      stats: '+47 hoy'
    },
    {
      id: 'polls',
      title: 'Encuestas Ciudadanas',
      description: 'Participa en encuestas sobre temas nacionales',
      icon: <BiPoll className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-700',
      action: 'surveys',
      badge: 'TRENDING',
      stats: '12 activas'
    },
    {
      id: 'reels',
      title: 'Reels de Noticias',
      description: 'Videos cortos de análisis y noticias',
      icon: <FaPlay className="w-8 h-8" />,
      color: 'from-pink-500 to-red-600',
      action: 'reels',
      badge: 'NUEVO',
      stats: '156 videos'
    },
    {
      id: 'congress',
      title: 'Seguimiento del Congreso',
      description: 'Actividad legislativa en tiempo real',
      icon: <IoMdStats className="w-8 h-8" />,
      color: 'from-green-500 to-green-700',
      action: 'congress',
      stats: 'En sesión'
    },
    {
      id: 'debates',
      title: 'Debates Ciudadanos',
      description: 'Debates estructurados sobre políticas',
      icon: <FaComments className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-700',
      action: 'debates',
      badge: 'POPULAR',
      stats: '23 debates'
    },
    {
      id: 'elections',
      title: 'Centro Electoral',
      description: 'Información electoral y candidatos',
      icon: <FaChartLine className="w-8 h-8" />,
      color: 'from-indigo-500 to-indigo-700',
      action: 'elections',
      stats: 'Próximas'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Bogota'
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-colombia bg-size-200 animate-gradient"></div>
      <div className="absolute inset-0 bg-gradient-colombia-soft opacity-60"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-colombia-yellow/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-16 w-32 h-32 bg-colombia-blue/20 rounded-full blur-xl animate-float animation-delay-200"></div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-colombia-red/20 rounded-full blur-xl animate-float animation-delay-500"></div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Live Indicator */}
            <div className="flex justify-center mb-6">
              <div className="glass px-4 py-2 rounded-full border border-white/30">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">EN VIVO</span>
                  <span className="text-xs opacity-80">•</span>
                  <span className="text-xs">Bogotá {formatTime(currentTime)}</span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
              <span className="text-gradient-colombia">
                Nuestro Pulso
              </span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 text-white text-shadow">
              La Plataforma Cívica Líder de Colombia
            </h2>
            
            <p className="text-lg sm:text-xl max-w-4xl mx-auto text-white/90 text-shadow leading-relaxed mb-12">
              Únete a más de <span className="font-bold text-colombia-yellow">{liveStats.onlineUsers.toLocaleString()}</span> ciudadanos 
              construyendo el futuro de Colombia a través de debates, encuestas, noticias balanceadas y participación democrática.
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="glass rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <FaUsers className="w-5 h-5 text-colombia-yellow" />
                  <div>
                    <div className="font-bold text-lg">{liveStats.onlineUsers.toLocaleString()}</div>
                    <div className="text-xs opacity-80">Usuarios en línea</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <BiPoll className="w-5 h-5 text-colombia-blue" />
                  <div>
                    <div className="font-bold text-lg">{liveStats.activePolls}</div>
                    <div className="text-xs opacity-80">Encuestas activas</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <MdLiveTv className="w-5 h-5 text-colombia-red" />
                  <div>
                    <div className="font-bold text-lg">{liveStats.newsUpdates}</div>
                    <div className="text-xs opacity-80">Noticias hoy</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 text-white">
                  <FaComments className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-bold text-lg">{liveStats.discussions}</div>
                    <div className="text-xs opacity-80">Debates activos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="glass rounded-2xl border border-white/30 overflow-hidden">
                  <div className="flex items-center">
                    <FaSearch className="w-6 h-6 text-white/70 ml-6" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar noticias, debates, encuestas..."
                      className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/70 outline-none text-lg"
                    />
                    <button
                      type="submit"
                      className="bg-colombia-blue hover:bg-colombia-blue-dark text-white px-8 py-4 font-semibold transition-colors"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={() => onNavigate('feeds')}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                <FaNewspaper className="w-5 h-5" />
                Explorar Noticias
              </button>
              <button
                onClick={() => onNavigate('surveys')}
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-3"
              >
                <BiPoll className="w-5 h-5" />
                Participar en Encuestas
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className="btn-ghost text-lg px-8 py-4 flex items-center gap-3 text-white border-white hover:bg-white hover:text-colombia-blue"
              >
                <FaComments className="w-5 h-5" />
                Chat en Vivo
              </button>
            </div>
          </div>

          {/* Category Grid */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white text-shadow mb-4">
                Explora Todas las Secciones
              </h3>
              <p className="text-white/90 text-lg">
                Accede a información completa sobre la vida política y cívica del país
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => onNavigate(category.action)}
                  className={`group cursor-pointer transition-all duration-500 delay-${index * 100}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="news-card h-full p-6 hover:scale-105 transform transition-all duration-300 interactive-glow">
                    {/* Badge */}
                    {category.badge && (
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${category.color}`}>
                          {category.badge}
                        </span>
                        {category.stats && (
                          <span className="text-sm text-gray-600 font-medium">
                            {category.stats}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-colombia-blue transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center text-colombia-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-2">Explorar</span>
                      <IoMdTrendingUp className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Footer */}
          <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="glass rounded-2xl p-8 border border-white/30 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">
                🇨🇴 Tu Voz Construye Colombia
              </h4>
              <p className="text-white/90 text-lg mb-6">
                Participa en la conversación nacional y ayuda a construir un futuro mejor para todos los colombianos.
              </p>
              <button
                onClick={() => onNavigate('community-hub')}
                className="btn-primary text-lg px-8 py-4"
              >
                Únete a la Comunidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;