import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaExternalLinkAlt, FaEye, FaStar, FaClock } from 'react-icons/fa';

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  tags: string[];
}

const NewsTopicsWidget: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'featured' | 'latest' | 'trending'>('featured');

  useEffect(() => {
    loadNewsItems();
  }, [activeTab]);

  const loadNewsItems = async () => {
    setLoading(true);
    try {
      // Mock data for development - replace with actual API call
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Reforma Electoral: Nuevas Propuestas para el 2024',
          description: 'El Congreso debate importantes cambios en el sistema electoral colombiano que podrían transformar las próximas elecciones.',
          imageUrl: '/api/placeholder/300/200',
          sourceUrl: 'https://example.com',
          category: 'Política',
          author: 'Reporter Ejemplo',
          publishedAt: '2024-01-15T10:00:00Z',
          isFeatured: true,
          viewsCount: 1250,
          createdAt: '2024-01-15T10:00:00Z',
          tags: ['reforma', 'electoral', 'congreso']
        },
        {
          id: '2',
          title: 'Nuevas Inversiones en Infraestructura Verde',
          description: 'Colombia anuncia millonarias inversiones en proyectos de energía renovable y sostenibilidad ambiental.',
          imageUrl: '/api/placeholder/300/200',
          category: 'Medio Ambiente',
          author: 'Eco Reporter',
          publishedAt: '2024-01-14T15:30:00Z',
          isFeatured: true,
          viewsCount: 890,
          createdAt: '2024-01-14T15:30:00Z',
          tags: ['medio ambiente', 'energía', 'sostenibilidad']
        },
        {
          id: '3',
          title: 'Programa Nacional de Salud Digital Avanza',
          description: 'La digitalización del sistema de salud colombiano muestra importantes progresos en telemedicina.',
          category: 'Salud',
          author: 'Health News',
          publishedAt: '2024-01-13T09:15:00Z',
          isFeatured: false,
          viewsCount: 567,
          createdAt: '2024-01-13T09:15:00Z',
          tags: ['salud', 'digital', 'telemedicina']
        }
      ];

      // Filter based on active tab
      let filteredNews = mockNews;
      if (activeTab === 'featured') {
        filteredNews = mockNews.filter(item => item.isFeatured);
      } else if (activeTab === 'trending') {
        filteredNews = mockNews.sort((a, b) => b.viewsCount - a.viewsCount);
      } else {
        filteredNews = mockNews.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      setNewsItems(filteredNews);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
      return `hace ${diffHours}h`;
    } else if (diffDays < 7) {
      return `hace ${diffDays}d`;
    } else {
      return date.toLocaleDateString('es-CO');
    }
  };

  const tabs = [
    { id: 'featured' as const, label: 'Destacadas', icon: <FaStar /> },
    { id: 'latest' as const, label: 'Recientes', icon: <FaClock /> },
    { id: 'trending' as const, label: 'Tendencia', icon: <FaEye /> },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaNewspaper className="mr-2 text-blue-600" />
            Noticias Cívicas
          </h3>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Items */}
      <div className="divide-y divide-gray-200">
        {newsItems.map((item) => (
          <article key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex space-x-3">
              {item.imageUrl && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/64/64';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </a>
                  )}
                </div>
                
                {item.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {item.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    )}
                    {item.isFeatured && (
                      <span className="text-yellow-600">
                        <FaStar className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <FaEye className="w-3 h-3 mr-1" />
                      {item.viewsCount}
                    </span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
                
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          Ver todas las noticias →
        </button>
      </div>
    </div>
  );
};

export default NewsTopicsWidget;