import React, { useEffect, useState, useCallback } from 'react';
import { FiClock, FiExternalLink, FiShare2, FiBookmark, FiTrendingUp } from 'react-icons/fi';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  isVerified: boolean;
  readTime: number;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: '📰' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economy', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'security', name: 'Seguridad', icon: '🛡️' },
    { id: 'environment', name: 'Ambiente', icon: '🌱' }
  ];

  // Mock news data with Colombian context
  const generateNews = (page: number): NewsItem[] => {
    const baseNews = [
      {
        title: "Reforma pensional avanza en el Congreso con cambios significativos",
        summary: "La propuesta del gobierno incluye nuevos pilares para garantizar pensiones dignas a todos los colombianos. El debate continúa en comisiones.",
        source: "El Tiempo",
        category: "politics",
        isVerified: true,
        readTime: 4,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        title: "Colombia registra crecimiento económico del 3.2% en el último trimestre",
        summary: "El PIB muestra señales de recuperación sostenida, impulsado por el sector servicios y la industria manufacturera.",
        source: "Portafolio",
        category: "economy",
        isVerified: true,
        readTime: 3,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        title: "Nuevo plan de seguridad ciudadana implementado en Bogotá",
        summary: "La Alcaldía presenta estrategia integral que incluye más tecnología y presencia policial en zonas críticas.",
        source: "Caracol Radio",
        category: "security",
        isVerified: true,
        readTime: 5,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        title: "Programa de reforestación alcanza meta de 50,000 árboles plantados",
        summary: "Iniciativa conjunta entre gobierno y comunidades locales contribuye a la conservación del medio ambiente.",
        source: "Semana Sostenible",
        category: "environment",
        isVerified: true,
        readTime: 3,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        title: "Subsidios de vivienda: nueva convocatoria abierta para familias vulnerables",
        summary: "El Ministerio de Vivienda anuncia programa que beneficiará a 15,000 familias colombianas.",
        source: "RCN Radio",
        category: "social",
        isVerified: true,
        readTime: 4,
        imageUrl: "/api/placeholder/300/200"
      }
    ];

    return baseNews.map((item, index) => ({
      ...item,
      id: (page - 1) * 5 + index + 1,
      publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  const loadNews = useCallback(async (pageNum: number, reset = false) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newNews = generateNews(pageNum);
    
    if (reset) {
      setNews(newNews);
    } else {
      setNews(prev => [...prev, ...newNews]);
    }
    
    setHasMore(pageNum < 5); // Simulate 5 pages max
    setLoading(false);
  }, []);

  useEffect(() => {
    loadNews(1, true);
  }, [loadNews, selectedCategory]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadNews(nextPage);
    }
  };

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours === 1) return 'Hace 1 hora';
    return `Hace ${diffInHours} horas`;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiTrendingUp className="w-8 h-8 text-colombia-yellow" />
            <h2 className="text-3xl font-black text-white">Noticias en Vivo</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">Actualizaciones en tiempo real</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-colombia-blue text-white'
                  : 'glass text-white hover:bg-white/20'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured news banner */}
        <div className="glass-card p-6 rounded-2xl mb-8 border-l-4 border-l-colombia-red">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-colombia-red text-white text-xs px-2 py-1 rounded-full font-bold">
              DESTACADO
            </span>
            <span className="text-sm text-gray-600">hace 2 horas</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Pacto Histórico presenta nueva propuesta de paz territorial
          </h3>
          <p className="text-gray-600 mb-4">
            La iniciativa busca consolidar la paz en territorios afectados por el conflicto armado, 
            con inversión social y desarrollo económico sostenible.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">El Espectador</span>
              <span className="flex items-center space-x-1 text-sm text-gray-500">
                <FiClock className="w-4 h-4" />
                <span>6 min de lectura</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiShare2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiBookmark className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="glass-card rounded-2xl overflow-hidden hover-lift">
              <div className="h-48 bg-gradient-to-br from-colombia-blue to-colombia-yellow"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-colombia-blue bg-colombia-blue/10 px-2 py-1 rounded-full">
                    {categories.find(c => c.id === item.category)?.name}
                  </span>
                  {item.isVerified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      ✓ Verificado
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiClock className="w-3 h-3" />
                    <span>{item.readTime} min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <button className="text-colombia-blue font-medium text-sm hover:underline flex items-center space-x-1">
                    <span>Leer más</span>
                    <FiExternalLink className="w-3 h-3" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <FiShare2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <FiBookmark className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="glass px-8 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Cargar más noticias'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;