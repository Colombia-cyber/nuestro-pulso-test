import React, { useState, useEffect } from 'react';

interface FeedItem {
  id: string;
  type: 'news' | 'politics' | 'election' | 'conservative' | 'community';
  title: string;
  content: string;
  source: string;
  timestamp: Date;
  category: string;
  urgent?: boolean;
}

const Feeds: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [feeds, setFeeds] = useState<FeedItem[]>([]);

  const categories = [
    { id: 'all', name: 'Todos', icon: '📢' },
    { id: 'conservative', name: 'Conservador', icon: '🟠' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'election', name: 'Elecciones', icon: '🗳️' },
    { id: 'community', name: 'Comunidad', icon: '👥' },
    { id: 'news', name: 'Noticias', icon: '📰' }
  ];

  // Mock feed data
  useEffect(() => {
    const mockFeeds: FeedItem[] = [
      {
        id: '1',
        type: 'conservative',
        title: 'Candidatos conservadores lideran intención de voto',
        content: 'Última encuesta muestra crecimiento de partidos de derecha en principales ciudades del país',
        source: 'Análisis Electoral',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        category: 'Elecciones',
        urgent: true
      },
      {
        id: '2',
        type: 'politics',
        title: 'Debate sobre reforma tributaria en el Senado',
        content: 'Senadores conservadores proponen reducción de impuestos a empresas como medida de reactivación económica',
        source: 'Congreso Nacional',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        category: 'Congreso'
      },
      {
        id: '3',
        type: 'community',
        title: 'Nueva comunidad: Empresarios por Colombia',
        content: 'Más de 500 empresarios se unen en plataforma para promover políticas de libre mercado',
        source: 'Comunidades',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        category: 'Comunidad'
      },
      {
        id: '4',
        type: 'election',
        title: 'Análisis: Estrategias de campaña conservadora',
        content: 'Expertos analizan las propuestas de candidatos de derecha para las próximas elecciones regionales',
        source: 'Análisis Político',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        category: 'Análisis'
      },
      {
        id: '5',
        type: 'news',
        title: 'Encuesta revela preferencias políticas por regiones',
        content: 'Estudio muestra mayor apoyo a candidatos conservadores en zonas rurales y departamentos del interior',
        source: 'Investigación',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        category: 'Investigación'
      }
    ];
    setFeeds(mockFeeds);
  }, []);

  const filteredFeeds = activeCategory === 'all' 
    ? feeds 
    : feeds.filter(feed => feed.type === activeCategory);

  const getTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getTypeIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'conservative': return '🟠';
      case 'politics': return '🏛️';
      case 'election': return '🗳️';
      case 'community': return '👥';
      case 'news': return '📰';
      default: return '📢';
    }
  };

  const getTypeColor = (type: FeedItem['type']) => {
    switch (type) {
      case 'conservative': return 'border-orange-500 bg-orange-50';
      case 'politics': return 'border-blue-500 bg-blue-50';
      case 'election': return 'border-purple-500 bg-purple-50';
      case 'community': return 'border-green-500 bg-green-50';
      case 'news': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📢 Feeds en Tiempo Real</h1>
          <p className="text-white/90">Actualizaciones instantáneas sobre política, elecciones y comunidad</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔴 En vivo</span>
            <span>⚡ {feeds.length} actualizaciones</span>
            <span>👥 15,423 siguiendo</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Items */}
        <div className="space-y-4">
          {filteredFeeds.map((feed) => (
            <div
              key={feed.id}
              className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getTypeColor(feed.type)} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getTypeIcon(feed.type)}</span>
                    <span className="text-sm font-medium text-gray-600">{feed.source}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{getTimestamp(feed.timestamp)}</span>
                    {feed.urgent && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        URGENTE
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feed.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {feed.content}
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <button className="hover:text-blue-600 transition-colors">
                      👍 Me gusta
                    </button>
                    <button className="hover:text-blue-600 transition-colors">
                      💬 Comentar
                    </button>
                    <button className="hover:text-blue-600 transition-colors">
                      📤 Compartir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            ⬇️ Cargar más actualizaciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feeds;