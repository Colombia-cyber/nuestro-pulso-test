import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaClock, FaExternalLinkAlt, FaBookmark, FaFire } from 'react-icons/fa';
import { BiTrendingUp, BiNews } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { ColombianLoader, SectionLoader } from './ColombianLoader';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  author?: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  category: string;
  trending?: boolean;
}

const newsCategories = [
  { id: 'general', label: 'General', icon: '🇨🇴', gradient: 'from-colombia-yellow to-colombia-blue' },
  { id: 'politics', label: 'Política', icon: '🗳️', gradient: 'from-blue-500 to-blue-700' },
  { id: 'economy', label: 'Economía', icon: '💰', gradient: 'from-green-500 to-green-700' },
  { id: 'security', label: 'Seguridad', icon: '🛡️', gradient: 'from-red-500 to-red-700' },
  { id: 'culture', label: 'Cultura', icon: '🎭', gradient: 'from-purple-500 to-purple-700' },
  { id: 'sports', label: 'Deportes', icon: '⚽', gradient: 'from-orange-500 to-orange-700' },
  { id: 'technology', label: 'Tecnología', icon: '💻', gradient: 'from-cyan-500 to-cyan-700' },
  { id: 'environment', label: 'Ambiente', icon: '🌍', gradient: 'from-teal-500 to-teal-700' },
];

const newsSources = [
  'El Tiempo', 'El Espectador', 'Semana', 'Portafolio', 
  'Caracol Radio', 'W Radio', 'Blu Radio', 'RCN'
];

// Generate sample news data
const generateSampleNews = (category: string): NewsArticle[] => {
  // Use data URI for placeholder images
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23003087"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="sans-serif" font-size="24"%3ENoticia%3C/text%3E%3C/svg%3E';
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `news-${category}-${i}`,
    title: `Noticia ${category === 'general' ? 'Colombia' : category} #${i + 1}: Desarrollo importante en el país`,
    description: `Análisis detallado sobre ${category} en Colombia. Esta noticia proporciona información crucial para entender el contexto actual del país y su impacto en la sociedad.`,
    source: newsSources[i % newsSources.length],
    author: `Redacción ${newsSources[i % newsSources.length]}`,
    publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: placeholderImage,
    category: category,
    trending: Math.random() > 0.7,
  }));
};

export const EnhancedNewsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNews(selectedCategory);
  }, [selectedCategory]);

  const loadNews = async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate instant loading with cached data
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Load news data
      const data = generateSampleNews(category);
      setNews(data);
    } catch (err) {
      setError('No se pudieron cargar las noticias. Mostrando contenido alternativo.');
      // Provide fallback content
      setNews(generateSampleNews(category).slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    return `Hace ${Math.floor(diffHours / 24)} días`;
  };

  const handleCategoryChange = (categoryId: string) => {
    // Instant category switching - no delay
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-colombia-red to-red-600 shadow-colombia">
              <FaNewspaper className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-colombia-gradient">
                Noticias Colombia
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MdVerified className="text-colombia-blue" />
                Información verificada y actualizada
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs - Instant Switching */}
        <div className="mb-8 animate-fade-in">
          <div className="glass-card p-2 inline-flex flex-wrap gap-2 rounded-2xl">
            {newsCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap
                  transition-all duration-200 transform
                  ${selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg scale-105`
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 glass-card p-4 border-l-4 border-colombia-red animate-fade-in">
            <p className="text-colombia-red font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <SectionLoader title="Cargando Noticias..." count={6} />
        ) : (
          /* News Grid */
          <div className="space-y-6 animate-fade-in">
            {/* Featured News (First Item) */}
            {news.length > 0 && (
              <div className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300 lg:col-span-2">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={news[0].imageUrl}
                      alt={news[0].title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {news[0].trending && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                        <FaFire />
                        Trending
                      </div>
                    )}
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span className="font-semibold text-colombia-blue">{news[0].source}</span>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          <span>{getTimeAgo(news[0].publishedAt)}</span>
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-colombia-blue transition-colors">
                        {news[0].title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {news[0].description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-colombia-blue to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                        Leer Más
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </button>
                      <button className="p-3 glass-card hover:bg-gray-100 rounded-xl transition-colors">
                        <FaBookmark className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(1).map((article, index) => (
                <div
                  key={article.id}
                  className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {article.trending && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FaFire />
                        Hot
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <span className="font-semibold text-colombia-blue">{article.source}</span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        <span>{getTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-colombia-blue transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {article.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-colombia-blue to-blue-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Leer
                      </button>
                      <button className="p-2 glass-card hover:bg-gray-100 rounded-lg transition-colors">
                        <FaBookmark className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && (
          <div className="text-center py-16 glass-card">
            <FaNewspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay noticias disponibles
            </h3>
            <p className="text-gray-600">
              No se encontraron noticias para esta categoría. Intenta con otra categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
