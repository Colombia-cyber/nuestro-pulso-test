import React, { useState, useEffect } from 'react';
import { FaPlay, FaSearch, FaFilter, FaGlobe, FaFlag, FaArrowUp } from 'react-icons/fa';

interface ColombianHomepageProps {
  onNavigate: (view: string, data?: any) => void;
}

interface NewsSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  articles: number;
  trending: boolean;
}

interface TrendingReel {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  source: 'youtube' | 'facebook' | 'twitter' | 'whatsapp' | 'local';
  category: string;
}

const ColombianHomepage: React.FC<ColombianHomepageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reelsSearchQuery, setReelsSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);

  // Colombian-themed news sections
  const newsSections: NewsSection[] = [
    {
      id: 'legislation-congress',
      title: 'Legislación y Congreso',
      icon: '🏛️',
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      description: 'Leyes, proyectos y actividades del Congreso de la República',
      articles: 156,
      trending: true
    },
    {
      id: 'terror-crime-drugs',
      title: 'Terror, Crimen y Drogas',
      icon: '🚨',
      color: 'bg-gradient-to-br from-red-600 to-red-800',
      description: 'Seguridad, narcotráfico y criminalidad en Colombia',
      articles: 89,
      trending: true
    },
    {
      id: 'employment-health',
      title: 'Empleo y Salud',
      icon: '💼',
      color: 'bg-gradient-to-br from-green-600 to-green-800',
      description: 'Mercado laboral, políticas de salud y bienestar social',
      articles: 234,
      trending: false
    },
    {
      id: 'gustavo-petro',
      title: 'Gustavo Petro',
      icon: '👤',
      color: 'bg-gradient-to-br from-yellow-600 to-orange-600',
      description: 'Noticias y declaraciones del Presidente de Colombia',
      articles: 178,
      trending: true
    },
    {
      id: 'donald-trump',
      title: 'Donald Trump',
      icon: '🇺🇸',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
      description: 'Impacto en relaciones Colombia-Estados Unidos',
      articles: 67,
      trending: false
    },
    {
      id: 'right-wing',
      title: 'Derecha',
      icon: '🗳️',
      color: 'bg-gradient-to-br from-indigo-600 to-purple-700',
      description: 'Perspectivas y análisis del sector conservador',
      articles: 145,
      trending: false
    },
    {
      id: 'left-wing',
      title: 'Izquierda',
      icon: '🌹',
      color: 'bg-gradient-to-br from-pink-600 to-rose-700',
      description: 'Perspectivas y análisis del sector progresista',
      articles: 132,
      trending: false
    },
    {
      id: 'world-news',
      title: 'Noticias Mundiales',
      icon: '🌍',
      color: 'bg-gradient-to-br from-cyan-600 to-teal-700',
      description: 'Actualidad internacional y su impacto en Colombia',
      articles: 298,
      trending: true
    },
    {
      id: 'local-news',
      title: 'Noticias Locales',
      icon: '🏘️',
      color: 'bg-gradient-to-br from-emerald-600 to-green-700',
      description: 'Noticias regionales y municipales de Colombia',
      articles: 567,
      trending: false
    }
  ];

  // Sample trending reels with various sources
  const trendingReels: TrendingReel[] = [
    {
      id: '1',
      title: 'Sesión Congreso: Reforma Tributaria EN VIVO',
      thumbnail: '🏛️',
      duration: '2:15:30',
      views: '85K',
      source: 'youtube',
      category: 'Política'
    },
    {
      id: '2',
      title: 'Operativo anti-narcóticos en Medellín',
      thumbnail: '🚁',
      duration: '3:45',
      views: '12K',
      source: 'local',
      category: 'Seguridad'
    },
    {
      id: '3',
      title: 'Declaraciones de Petro sobre economía',
      thumbnail: '📢',
      duration: '1:23',
      views: '45K',
      source: 'twitter',
      category: 'Política'
    },
    {
      id: '4',
      title: 'Protesta estudiantil Universidad Nacional',
      thumbnail: '📚',
      duration: '2:10',
      views: '8.5K',
      source: 'facebook',
      category: 'Educación'
    },
    {
      id: '5',
      title: 'Análisis: Impacto Trump en Colombia',
      thumbnail: '🔍',
      duration: '5:30',
      views: '23K',
      source: 'youtube',
      category: 'Internacional'
    },
    {
      id: '6',
      title: 'Reportaje: Crisis en La Guajira',
      thumbnail: '🌵',
      duration: '8:45',
      views: '31K',
      source: 'local',
      category: 'Social'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📺' },
    { id: 'politica', name: 'Política', icon: '🗳️' },
    { id: 'seguridad', name: 'Seguridad', icon: '🚨' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'internacional', name: 'Internacional', icon: '🌍' },
    { id: 'educacion', name: 'Educación', icon: '📚' }
  ];

  const getSourceIcon = (source: string) => {
    const icons = {
      youtube: '📺',
      facebook: '📘',
      twitter: '🐦',
      whatsapp: '📱',
      local: '📍'
    };
    return icons[source as keyof typeof icons] || '📺';
  };

  const getSourceColor = (source: string) => {
    const colors = {
      youtube: 'bg-red-100 text-red-800',
      facebook: 'bg-blue-100 text-blue-800',
      twitter: 'bg-cyan-100 text-cyan-800',
      whatsapp: 'bg-green-100 text-green-800',
      local: 'bg-purple-100 text-purple-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    onNavigate('news-section', { section: sectionId });
  };

  const handleReelClick = (reelId: string) => {
    onNavigate('reel-detail', { reelId });
  };

  const handleSearch = (type: 'news' | 'reels') => {
    const query = type === 'news' ? searchQuery : reelsSearchQuery;
    onNavigate('news-search', { type, query });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500">
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-pulse">🇨🇴</div>
            <div className="text-white text-2xl font-bold mb-4">Cargando Nuestro Pulso...</div>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500">
      {/* Colombian Flag Pattern Background */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Hero Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <FaFlag className="text-6xl text-yellow-300 mr-4" />
              <h1 className="text-6xl font-bold text-white">Nuestro Pulso</h1>
              <FaFlag className="text-6xl text-red-300 ml-4" />
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
              El corazón informativo de Colombia - Noticias, análisis y perspectivas que laten al ritmo de nuestro país
            </p>
            
            {/* Colombian Flag Colors Animation */}
            <div className="flex justify-center space-x-3 mb-8">
              <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>

          {/* Search Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* News Search */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <FaGlobe className="mr-2" />
                Buscar Noticias (Local y Mundial)
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar noticias, políticos, eventos..."
                  className="flex-1 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch('news')}
                />
                <button
                  onClick={() => handleSearch('news')}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors flex items-center"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Reels Search */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <FaPlay className="mr-2" />
                Buscar Reels y Videos
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={reelsSearchQuery}
                  onChange={(e) => setReelsSearchQuery(e.target.value)}
                  placeholder="Buscar videos, streams, debates..."
                  className="flex-1 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-red-400 text-gray-800"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch('reels')}
                />
                <button
                  onClick={() => handleSearch('reels')}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          {/* News Sections Grid */}
          <div className="mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30">
              <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <span className="mr-3">📰</span>
                Secciones de Noticias
                <span className="ml-3">📰</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsSections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`${section.color} rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group`}
                  >
                    {/* Trending Badge */}
                    {section.trending && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <FaArrowUp className="mr-1" />
                        TRENDING
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4">{section.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                      <p className="text-white/90 text-sm mb-4 leading-relaxed">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">
                          {section.articles} artículos
                        </span>
                        <span className="text-white text-sm font-medium group-hover:text-yellow-300 transition-colors">
                          Ver más →
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reels Section - YouTube Shorts/TikTok Style */}
          <div className="mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <FaPlay className="mr-3 text-red-400" />
                  Reels & Videos Trending
                </h2>
                <button 
                  onClick={() => onNavigate('enhanced-reels')}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center"
                >
                  Ver todos los reels
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-white text-gray-800'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Trending Reels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingReels.map((reel) => (
                  <div
                    key={reel.id}
                    onClick={() => handleReelClick(reel.id)}
                    className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group border border-white/20"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl mb-2">{reel.thumbnail}</div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {reel.duration}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSourceColor(reel.source)}`}>
                          {getSourceIcon(reel.source)} {reel.source}
                        </span>
                      </div>
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 rounded-full p-4">
                          <FaPlay className="text-white text-2xl" />
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                        {reel.title}
                      </h4>
                      <div className="flex items-center justify-between text-white/70 text-sm">
                        <span className="bg-white/20 px-2 py-1 rounded">
                          {reel.category}
                        </span>
                        <span className="flex items-center">
                          👁️ {reel.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-8">
                <button 
                  onClick={() => onNavigate('enhanced-reels')}
                  className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-yellow-600 hover:to-red-600 transition-all font-semibold text-lg"
                >
                  🎬 Explorar todos los Reels
                </button>
              </div>
            </div>
          </div>

          {/* Stats and Community */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Stats */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center">
              <div className="text-green-400 text-3xl mb-2">🔴</div>
              <div className="text-white text-2xl font-bold">EN VIVO</div>
              <div className="text-white/80 text-sm">45K usuarios conectados</div>
            </div>

            {/* Total Articles */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center">
              <div className="text-blue-400 text-3xl mb-2">📊</div>
              <div className="text-white text-2xl font-bold">2,150+</div>
              <div className="text-white/80 text-sm">Artículos y análisis</div>
            </div>

            {/* Community Hub */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 text-center cursor-pointer hover:bg-white/30 transition-all"
                 onClick={() => onNavigate('community-hub')}>
              <div className="text-purple-400 text-3xl mb-2">👥</div>
              <div className="text-white text-2xl font-bold">Community</div>
              <div className="text-white/80 text-sm">Hub de comentarios</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColombianHomepage;