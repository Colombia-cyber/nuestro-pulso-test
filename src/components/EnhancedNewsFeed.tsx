import React, { useEffect, useState, useCallback } from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: string;
  urgent: boolean;
  imageUrl?: string;
}

interface LiveDataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const EnhancedNewsFeed: React.FC = () => {
  const [newsState, setNewsState] = useState<LiveDataState<NewsItem>>({
    data: [],
    loading: true,
    error: null,
    lastUpdated: null
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLive, setIsLive] = useState(true);

  const categories = [
    { id: 'all', name: 'Todas', icon: '📰' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economy', name: 'Economía', icon: '💰' },
    { id: 'health', name: 'Salud', icon: '🏥' },
    { id: 'education', name: 'Educación', icon: '🎓' },
    { id: 'environment', name: 'Medio Ambiente', icon: '🌱' },
  ];

  // Simulate real-time data fetching with fallback polling
  const fetchNews = useCallback(async () => {
    try {
      setNewsState(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API call - in real implementation, this would be WebSocket or API polling
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNews: NewsItem[] = [
        {
          id: Date.now() + 1,
          title: 'Nueva Reforma Tributaria Aprobada en Primer Debate',
          summary: 'El Congreso avanza en la discusión de la reforma tributaria que busca aumentar la recaudación en 25 billones de pesos.',
          source: 'El Tiempo',
          publishedAt: new Date().toISOString(),
          category: 'politics',
          urgent: true,
          imageUrl: '/api/placeholder/300/200'
        },
        {
          id: Date.now() + 2,
          title: 'Inflación Disminuye al 7.8% en Noviembre',
          summary: 'El DANE reporta una reducción en la inflación mensual, principalmente por menores precios en alimentos.',
          source: 'Portafolio',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          category: 'economy',
          urgent: false
        },
        {
          id: Date.now() + 3,
          title: 'Campaña de Vacunación Contra COVID-19 se Intensifica',
          summary: 'El Ministerio de Salud anuncia nuevas jornadas de vacunación para refuerzos en todo el territorio nacional.',
          source: 'MinSalud',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          category: 'health',
          urgent: false
        },
        {
          id: Date.now() + 4,
          title: 'Nuevo Plan de Reforestación en la Amazonía',
          summary: 'Se lanza programa piloto para plantar 500,000 árboles nativos en zonas afectadas por deforestación.',
          source: 'Ministerio de Ambiente',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          category: 'environment',
          urgent: false
        }
      ];

      setNewsState({
        data: mockNews,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error) {
      setNewsState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al cargar las noticias. Intentando reconectar...'
      }));
    }
  }, []);

  // Initial load and polling setup
  useEffect(() => {
    fetchNews();

    let intervalId: NodeJS.Timeout;
    if (isLive) {
      // Poll every 30 seconds for live updates
      intervalId = setInterval(fetchNews, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchNews, isLive]);

  const filteredNews = selectedCategory === 'all' 
    ? newsState.data 
    : newsState.data.filter(item => item.category === selectedCategory);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Ahora';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias en Vivo</h1>
              <p className="text-white/90">Mantente informado con las últimas noticias de Colombia</p>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm">{isLive ? 'En vivo' : 'Pausado'}</span>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className="bg-white/20 px-3 py-1 rounded text-sm hover:bg-white/30 transition-colors"
                aria-label={isLive ? 'Pausar actualizaciones en vivo' : 'Activar actualizaciones en vivo'}
              >
                {isLive ? 'Pausar' : 'Activar'}
              </button>
            </div>
          </div>
          
          {newsState.lastUpdated && (
            <div className="mt-2 text-white/70 text-sm">
              Última actualización: {newsState.lastUpdated.toLocaleTimeString('es-CO')}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <nav 
            className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm"
            role="tablist"
            aria-label="Categorías de noticias"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-label={`Ver noticias de ${category.name}`}
              >
                <span role="img" aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Loading State */}
        {newsState.loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando noticias en vivo...</p>
          </div>
        )}

        {/* Error State */}
        {newsState.error && (
          <div 
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <p className="text-red-700">{newsState.error}</p>
              <button
                onClick={fetchNews}
                className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                aria-label="Reintentar carga de noticias"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!newsState.loading && !newsState.error && (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="region"
            aria-label="Lista de noticias"
            aria-live="polite"
          >
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  article.urgent ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                }`}
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt=""
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {categories.find(c => c.id === article.category)?.name || 'General'}
                    </span>
                    <div className="flex items-center space-x-2">
                      {article.urgent && (
                        <span 
                          className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
                          aria-label="Noticia urgente"
                        >
                          🚨 Urgente
                        </span>
                      )}
                      <time 
                        dateTime={article.publishedAt}
                        className="text-xs text-gray-500"
                      >
                        {formatTimeAgo(article.publishedAt)}
                      </time>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.source}</span>
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Leer más sobre: ${article.title}`}
                    >
                      Leer más
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!newsState.loading && !newsState.error && filteredNews.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay noticias disponibles
            </h3>
            <p className="text-gray-600">
              No se encontraron noticias para la categoría seleccionada.
            </p>
          </div>
        )}

        {/* Live Update Indicator */}
        {isLive && !newsState.loading && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Actualizaciones en vivo activas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNewsFeed;