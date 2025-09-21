import React, { useState, useEffect } from 'react';
import { FaHome, FaGlobe, FaMapMarkerAlt, FaEnvelope, FaRocket, FaSearch, FaVideo, FaNewspaper } from 'react-icons/fa';
import { BiTrendingUp, BiNews } from 'react-icons/bi';
import UniversalSearchBar from '../components/UniversalSearchBar';

// Import animations
import '../styles/404-animations.css';

interface TrendingItem {
  id: string;
  title: string;
  type: 'news' | 'video';
  source: string;
  url: string;
  timestamp: string;
  category: 'world' | 'local';
  trending: boolean;
}

interface NotFound404Props {
  onNavigate?: (view: string) => void;
}

const NotFound404: React.FC<NotFound404Props> = ({ onNavigate }) => {
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching trending content
    const fetchTrendingContent = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrendingItems: TrendingItem[] = [
        {
          id: '1',
          title: 'Breaking: Major Climate Summit Reaches Historic Agreement',
          type: 'news',
          source: 'BBC World',
          url: 'https://bbc.com/news/climate',
          timestamp: '2 horas',
          category: 'world',
          trending: true
        },
        {
          id: '2',
          title: 'Colombia Election Results: Analysis and Implications',
          type: 'news',
          source: 'El Tiempo',
          url: 'https://eltiempo.com',
          timestamp: '1 hora',
          category: 'local',
          trending: true
        },
        {
          id: '3',
          title: 'Global Economic Outlook: What to Expect in 2024',
          type: 'video',
          source: 'Reuters',
          url: 'https://reuters.com',
          timestamp: '3 horas',
          category: 'world',
          trending: true
        },
        {
          id: '4',
          title: 'Technology Innovation: AI Revolution Continues',
          type: 'news',
          source: 'TechCrunch',
          url: 'https://techcrunch.com',
          timestamp: '45 min',
          category: 'world',
          trending: true
        },
        {
          id: '5',
          title: 'Latin America Trade Relations: New Partnerships',
          type: 'video',
          source: 'CNN Español',
          url: 'https://cnn.com',
          timestamp: '2 horas',
          category: 'world',
          trending: true
        },
        {
          id: '6',
          title: 'Colombia Healthcare System: Progress Report',
          type: 'news',
          source: 'Semana',
          url: 'https://semana.com',
          timestamp: '4 horas',
          category: 'local',
          trending: true
        }
      ];
      
      setTrendingItems(mockTrendingItems);
      setIsLoading(false);
    };

    fetchTrendingContent();
  }, []);

  const handleSearch = (query: string, category: 'local' | 'world') => {
    // Navigate to search with the query
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('tab', category);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    if (onNavigate) {
      onNavigate('search');
    }
  };

  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const quickLinks = [
    { 
      id: 'home', 
      label: 'Inicio', 
      icon: FaHome, 
      description: 'Volver a la página principal',
      color: 'from-blue-500 to-blue-600',
      view: 'home'
    },
    { 
      id: 'global-news', 
      label: 'Noticias Mundiales', 
      icon: FaGlobe, 
      description: 'Últimas noticias internacionales',
      color: 'from-purple-500 to-purple-600',
      view: 'search',
      searchParams: 'q=&tab=world'
    },
    { 
      id: 'colombia-news', 
      label: 'Noticias Colombia', 
      icon: FaMapMarkerAlt, 
      description: 'Noticias locales y nacionales',
      color: 'from-yellow-400 via-blue-500 to-red-500',
      view: 'feeds'
    },
    { 
      id: 'contact', 
      label: 'Contacto', 
      icon: FaEnvelope, 
      description: 'Ponte en contacto con nosotros',
      color: 'from-green-500 to-green-600',
      view: 'community-hub'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-2xl">🇨🇴</span>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Nuestro Pulso
              </h1>
              <p className="text-gray-600 font-medium">Red Cívica de Colombia</p>
            </div>
          </div>
        </div>

        {/* Main 404 Content */}
        <div className="text-center mb-12">
          {/* 404 Illustration */}
          <div className="mb-8">
            <svg 
              className="w-64 h-64 md:w-80 md:h-80 mx-auto" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated 404 */}
              <g className="animate-bounce">
                <circle cx="100" cy="200" r="80" fill="#3B82F6" opacity="0.1"/>
                <text x="100" y="220" textAnchor="middle" className="text-6xl font-bold fill-current text-blue-600">4</text>
              </g>
              <g className="animate-pulse">
                <circle cx="200" cy="200" r="80" fill="#8B5CF6" opacity="0.1"/>
                <circle cx="200" cy="200" r="40" fill="#8B5CF6" opacity="0.2"/>
                <circle cx="200" cy="200" r="20" fill="#8B5CF6" opacity="0.4"/>
                <text x="200" y="220" textAnchor="middle" className="text-6xl font-bold fill-current text-purple-600">0</text>
              </g>
              <g className="animate-bounce animation-delay-1000">
                <circle cx="300" cy="200" r="80" fill="#EF4444" opacity="0.1"/>
                <text x="300" y="220" textAnchor="middle" className="text-6xl font-bold fill-current text-red-600">4</text>
              </g>
              
              {/* Floating elements */}
              <g className="animate-float">
                <circle cx="150" cy="100" r="8" fill="#F59E0B"/>
                <circle cx="250" cy="80" r="6" fill="#10B981"/>
                <circle cx="320" cy="120" r="10" fill="#3B82F6"/>
              </g>
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ¡Oops! This page doesn't exist.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No te preocupes, esto pasa. Pero estamos aquí para ayudarte a encontrar lo que buscas.
          </p>

          {/* Universal Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <FaSearch className="w-6 h-6" />
              Busca en todo el mundo
            </h3>
            <UniversalSearchBar
              onSearch={handleSearch}
              onTopicSelect={() => {}}
              placeholder="Buscar noticias, videos y contenido mundial..."
              autoFocus={false}
            />
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
            <FaRocket className="w-6 h-6" />
            Enlaces rápidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.searchParams) {
                      window.history.pushState(null, '', `/search?${link.searchParams}`);
                    }
                    handleNavigation(link.view);
                  }}
                  className={`group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-opacity-20`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{link.label}</h4>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Trending Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BiTrendingUp className="w-6 h-6 text-red-500" />
            Tendencias en vivo
          </h3>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-24 mb-3"></div>
                  <div className="bg-gray-200 rounded h-4 mb-2"></div>
                  <div className="bg-gray-200 rounded h-3 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                  onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.type === 'video' ? <FaVideo className="w-5 h-5" /> : <FaNewspaper className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.category === 'world' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.category === 'world' ? '🌍 Mundial' : '🇨🇴 Colombia'}
                        </span>
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                    {item.trending && (
                      <div className="flex-shrink-0">
                        <BiTrendingUp className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <button
              onClick={() => handleNavigation('search')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Ver más noticias trending
            </button>
          </div>
        </div>

        {/* Helpful Footer Message */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            ¿No encontraste lo que buscabas?
          </h4>
          <p className="text-gray-600 mb-4">
            Nuestro equipo está siempre trabajando para mejorar tu experiencia. 
            Contáctanos si necesitas ayuda específica.
          </p>
          <button
            onClick={() => handleNavigation('community-hub')}
            className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            Contactar soporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;