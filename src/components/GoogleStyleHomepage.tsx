import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaMapMarkerAlt, FaGlobe, FaNewspaper, FaComments, 
  FaPoll, FaFire, FaPlay, FaGraduationCap, FaShieldAlt, FaUser,
  FaBalanceScale, FaYoutube, FaChevronRight, FaClock, FaExternalLinkAlt
} from 'react-icons/fa';

interface GoogleStyleHomepageProps {
  onNavigate: (view: string, params?: any) => void;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
  image?: string;
  category: string;
}

const GoogleStyleHomepage: React.FC<GoogleStyleHomepageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'colombia' | 'world'>('colombia');
  const [colombiaNews, setColombiaNews] = useState<NewsItem[]>([]);
  const [worldNews, setWorldNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock news data - Ready for API integration
  useEffect(() => {
    const mockColombiaNews: NewsItem[] = [
      {
        id: '1',
        title: 'Congreso aprueba reforma de salud en segundo debate',
        source: 'El Tiempo',
        time: 'hace 2 horas',
        url: '#',
        category: 'Política',
      },
      {
        id: '2', 
        title: 'Presidente Petro anuncia nuevas medidas económicas para 2025',
        source: 'Semana',
        time: 'hace 3 horas',
        url: '#',
        category: 'Economía',
      },
      {
        id: '3',
        title: 'Operativo contra el narcotráfico en Antioquia deja 12 capturas',
        source: 'RCN',
        time: 'hace 1 hora',
        url: '#',
        category: 'Seguridad',
      },
      {
        id: '4',
        title: 'Alcalde de Bogotá presenta plan de movilidad sostenible',
        source: 'El Espectador',
        time: 'hace 4 horas',
        url: '#',
        category: 'Local',
      },
      {
        id: '5',
        title: 'Selección Colombia convocatoria para eliminatorias',
        source: 'Caracol',
        time: 'hace 5 horas',
        url: '#',
        category: 'Deportes',
      },
      {
        id: '6',
        title: 'Ministro de Educación anuncia inversión en infraestructura escolar',
        source: 'Portafolio',
        time: 'hace 6 horas',
        url: '#',
        category: 'Educación',
      },
    ];

    const mockWorldNews: NewsItem[] = [
      {
        id: 'w1',
        title: 'Trump announces new policy on international trade',
        source: 'CNN',
        time: '2 hours ago',
        url: '#',
        category: 'Politics',
      },
      {
        id: 'w2',
        title: 'European Union reaches climate agreement',
        source: 'BBC',
        time: '3 hours ago',
        url: '#',
        category: 'Environment',
      },
      {
        id: 'w3',
        title: 'Global markets react to Federal Reserve decision',
        source: 'Reuters',
        time: '1 hour ago',
        url: '#',
        category: 'Economy',
      },
      {
        id: 'w4',
        title: 'UN Security Council convenes emergency session',
        source: 'Al Jazeera',
        time: '4 hours ago',
        url: '#',
        category: 'International',
      },
      {
        id: 'w5',
        title: 'Breakthrough in renewable energy technology',
        source: 'The Guardian',
        time: '5 hours ago',
        url: '#',
        category: 'Technology',
      },
      {
        id: 'w6',
        title: 'World Health Organization issues new guidelines',
        source: 'AP News',
        time: '6 hours ago',
        url: '#',
        category: 'Health',
      },
    ];

    setTimeout(() => {
      setColombiaNews(mockColombiaNews);
      setWorldNews(mockWorldNews);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', { query: searchQuery, scope: viewMode });
    }
  };

  const quickAccessButtons = [
    { id: 'reels', icon: <FaPlay />, label: 'Reels', color: 'from-purple-500 to-pink-500' },
    { id: 'feeds', icon: <FaNewspaper />, label: 'Noticias', color: 'from-blue-500 to-cyan-500' },
    { id: 'debates', icon: <FaComments />, label: 'Debates', color: 'from-green-500 to-emerald-500' },
    { id: 'surveys', icon: <FaPoll />, label: 'Encuestas', color: 'from-orange-500 to-yellow-500' },
    { id: 'tendencias', icon: <FaFire />, label: 'Tendencias', color: 'from-red-500 to-rose-500' },
  ];

  const colombiaSpecialSections = [
    {
      id: 'congress',
      title: 'Congreso',
      icon: '🏛️',
      description: 'Actividad legislativa y sesiones en vivo',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: '🚔',
      description: 'Noticias de seguridad nacional y crimen',
      gradient: 'from-red-600 to-rose-600',
    },
    {
      id: 'petro',
      title: 'Presidente',
      icon: '🇨🇴',
      description: 'Noticias del presidente Gustavo Petro',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      id: 'left-wing',
      title: 'Izquierda',
      icon: '✊',
      description: 'Perspectivas de izquierda',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      id: 'right-wing',
      title: 'Derecha',
      icon: '👤',
      description: 'Perspectivas de derecha',
      gradient: 'from-blue-500 to-purple-500',
    },
  ];

  const currentNews = viewMode === 'colombia' ? colombiaNews : worldNews;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Google-style Header with Search */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇨🇴</span>
              <h1 className="text-2xl font-bold text-gray-900">
                Nuestro <span className="text-blue-600">Pulso</span>
              </h1>
            </div>

            {/* Colombia/World Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode('colombia')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  viewMode === 'colombia'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaMapMarkerAlt />
                Colombia
              </button>
              <button
                onClick={() => setViewMode('world')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  viewMode === 'world'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaGlobe />
                Mundo
              </button>
            </div>
          </div>

          {/* Universal Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar en ${viewMode === 'colombia' ? 'Colombia' : 'el Mundo'}...`}
                className="w-full pl-12 pr-4 py-3 text-base rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </form>

          {/* Quick Access Buttons */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {quickAccessButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => onNavigate(btn.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${btn.color} text-white font-semibold hover:scale-105 transition-transform shadow-md`}
              >
                {btn.icon}
                <span className="text-sm">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Always Visible Local News Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              {viewMode === 'colombia' ? '🇨🇴 Noticias de Colombia' : '🌍 Noticias del Mundo'}
            </h2>
            <button
              onClick={() => onNavigate('feeds')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Ver todas <FaChevronRight />
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group border border-gray-200"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium">{item.source}</span>
                    <div className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Leer más <FaExternalLinkAlt className="w-3 h-3 ml-1" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Colombia-specific Special Sections (only shown when in Colombia mode) */}
        {viewMode === 'colombia' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Temas Especiales de Colombia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colombiaSpecialSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className={`p-6 rounded-xl bg-gradient-to-br ${section.gradient} text-white text-left transition-all hover:scale-105 hover:shadow-2xl group`}
                >
                  <div className="text-4xl mb-3">{section.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {section.description}
                  </p>
                  <div className="flex items-center text-sm text-white/60">
                    <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* API Integration Info Box */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaYoutube className="text-red-600" />
            APIs Integradas
          </h3>
          <p className="text-gray-700 mb-4">
            Esta plataforma está lista para integrarse con múltiples fuentes de datos:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">🇨🇴 Colombia APIs</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• El Tiempo, Semana, RCN, Caracol</li>
                <li>• Datos del Congreso de la República</li>
                <li>• Noticias de seguridad nacional</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">🌍 Global APIs</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google News, YouTube, NewsAPI</li>
                <li>• BBC, CNN, Reuters, The Guardian</li>
                <li>• Social Media: Twitter, TikTok, Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <strong>📌 Nota:</strong> Los datos mostrados son ejemplos. Configure las API keys en el archivo .env para habilitar datos en tiempo real.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Nuestro Pulso. Plataforma cívica de Colombia.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Red cívica moderna, modular y lista para expansión
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GoogleStyleHomepage;
