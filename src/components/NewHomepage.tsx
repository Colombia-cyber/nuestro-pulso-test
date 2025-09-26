import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaMapMarkerAlt, FaGlobe, FaNewspaper, FaComments, 
  FaPoll, FaFire, FaPlay, FaGraduationCap, FaShieldAlt, FaUser,
  FaBalanceScale, FaYoutube, FaGoogle, FaChevronRight
} from 'react-icons/fa';

interface NewHomepageProps {
  onNavigate: (view: string, params?: any) => void;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  image?: string;
  type: 'article' | 'video' | 'reel';
}

interface InfoCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  gradient: string;
  stats: { label: string; value: string }[];
}

const NewHomepage: React.FC<NewHomepageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localNews, setLocalNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock data for local news (in real app, this would come from APIs)
  useEffect(() => {
    const mockLocalNews: NewsItem[] = [
      {
        id: '1',
        title: 'Congreso aprueba reforma de salud en segundo debate',
        source: 'El Tiempo',
        time: 'hace 2 horas',
        type: 'article'
      },
      {
        id: '2', 
        title: 'Presidente Petro anuncia nuevas medidas económicas',
        source: 'Semana',
        time: 'hace 3 horas',
        type: 'video'
      },
      {
        id: '3',
        title: 'Operativo contra el narcotráfico en Antioquia',
        source: 'RCN',
        time: 'hace 1 hora',
        type: 'reel'
      }
    ];

    setTimeout(() => {
      setLocalNews(mockLocalNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  const globalCards = [
    {
      id: 'trump-global',
      title: 'DONALD TRUMP GLOBAL',
      icon: '🇺🇸',
      description: 'Últimas noticias y análisis sobre Trump',
      gradient: 'from-red-600 to-blue-600'
    },
    {
      id: 'terrorism',
      title: 'TERRORISMO MUNDIAL',
      icon: '⚠️',
      description: 'Seguimiento de eventos de seguridad global',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      id: 'right-wing',
      title: 'DERECHA MUNDIAL',
      icon: '👤',
      description: 'Movimientos de derecha a nivel global',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'left-wing',
      title: 'IZQUIERDA MUNDIAL',
      icon: '✊',
      description: 'Movimientos de izquierda internacional',
      gradient: 'from-red-600 to-pink-600'
    },
    {
      id: 'destinations',
      title: 'MEJORES DESTINOS',
      icon: '✈️',
      description: 'Turismo y destinos recomendados',
      gradient: 'from-green-600 to-teal-600'
    }
  ];

  const quickAccessCards = [
    {
      id: 'reels',
      title: '🎬 Reels en Vivo',
      description: 'Videos cortos y contenido viral',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'news',
      title: '📰 Noticias',
      description: 'Últimas noticias verificadas',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'debates',
      title: '💬 Debates',
      description: 'Discusiones y opiniones',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      id: 'polls',
      title: '📊 Encuestas',
      description: 'Participa en encuestas cívicas',
      gradient: 'from-orange-600 to-yellow-600'
    },
    {
      id: 'trends',
      title: '🔥 Tendencias',
      description: 'Lo más popular del momento',
      gradient: 'from-red-600 to-orange-600'
    }
  ];

  const infoCards: InfoCard[] = [
    {
      id: 'congress',
      title: '🏢 Congreso de Colombia',
      icon: <FaGraduationCap className="text-blue-400" />,
      description: 'Actividad legislativa, sesiones en vivo y información del Congreso',
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600',
      stats: [
        { label: 'Proyectos activos', value: '47' },
        { label: 'Sesiones hoy', value: '3' }
      ]
    },
    {
      id: 'security',
      title: '🚔 Seguridad Nacional',
      icon: <FaShieldAlt className="text-red-400" />,
      description: 'Noticias de seguridad, crimen y narcotráfico en Colombia',
      color: 'red',
      gradient: 'from-red-600 to-rose-600',
      stats: [
        { label: 'Operativos hoy', value: '12' },
        { label: 'Alertas activas', value: '5' }
      ]
    },
    {
      id: 'petro',
      title: '🇨🇴 Gustavo Petro',
      icon: <FaUser className="text-green-400" />,
      description: 'Noticias del presidente desde Google, Wikipedia y fuentes locales',
      color: 'green',
      gradient: 'from-green-600 to-emerald-600',
      stats: [
        { label: 'Noticias hoy', value: '8' },
        { label: 'Decretos', value: '2' }
      ]
    },
    {
      id: 'politics',
      title: '🗳️ Perspectivas Políticas',
      icon: <FaBalanceScale className="text-purple-400" />,
      description: 'Análisis de izquierda y derecha en el contexto colombiano',
      color: 'purple',
      gradient: 'from-purple-600 to-violet-600',
      stats: [
        { label: 'Análisis', value: '15' },
        { label: 'Opiniones', value: '34' }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', { query: searchQuery });
    }
  };

  const handleCardClick = (cardId: string) => {
    // Map card IDs to the correct routes
    const routeMap: { [key: string]: string } = {
      'congress': 'congress',
      'security': 'security',
      'petro': 'petro',
      'politics': 'politics',
      'reels': 'reels',
      'news': 'feeds',
      'debates': 'debates',
      'polls': 'surveys',
      'trends': 'tendencias'
    };
    
    const route = routeMap[cardId] || cardId;
    onNavigate(route);
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
              <span className="text-2xl">🇨🇴</span>
              <span className="font-bold text-lg">Red Cívica de Colombia</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Bienvenido a<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Nuestro Pulso Colombia
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            La red cívica más avanzada de Colombia para búsquedas locales, 
            noticias en tiempo real y participación ciudadana
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar noticias, temas, debates, candidatos..."
                className="w-full px-6 py-4 text-lg rounded-2xl border-0 bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-2xl"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {quickAccessCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="text-2xl mb-2">{card.title.split(' ')[0]}</div>
                <div className="text-sm opacity-90">{card.title.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Local Colombia Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-400 rounded-2xl flex items-center justify-center text-2xl">
              🇨🇴
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Red Cívica de Colombia
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
                LOCAL COLOMBIA 🇨🇴 - Noticias y feeds en tiempo real
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                  <SkeletonLoader />
                </div>
              ))
            ) : (
              localNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => onNavigate('article', { id: item.id })}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      item.type === 'article' ? 'bg-blue-500' : 
                      item.type === 'video' ? 'bg-red-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('feeds')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
            >
              Ver todas las noticias
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Global/Mundo Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center text-2xl">
              🌍
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                GLOBAL/MUNDO
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
                Tendencias y noticias internacionales
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`p-8 rounded-2xl bg-gradient-to-br ${card.gradient} text-white text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-black mb-2 group-hover:text-yellow-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                  <FaGoogle className="w-4 h-4" />
                  <FaYoutube className="w-4 h-4" />
                  <span>APIs integradas</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Información Clave de Colombia
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Acceso directo a la información más importante del país
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {infoCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`p-8 rounded-3xl bg-gradient-to-br ${card.gradient} text-white text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                      {card.title.split(' ')[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-1 group-hover:text-yellow-200 transition-colors">
                        {card.title.split(' ').slice(1).join(' ')}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {card.stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl z-50"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default NewHomepage;