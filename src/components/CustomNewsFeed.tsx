import React, { useState } from 'react';

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  publishedAt: string;
  hasBalancedCoverage: boolean;
  trending: boolean;
}

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'categories' | 'feed'>('feed');

  const categories: CategoryCard[] = [
    {
      id: 'gustavo-petro',
      title: 'Gustavo Petro',
      description: 'Últimas noticias y declaraciones del Presidente de Colombia',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      icon: '👤'
    },
    {
      id: 'donald-trump',
      title: 'Donald Trump',
      description: 'Noticias internacionales y política estadounidense',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
      icon: '🇺🇸'
    },
    {
      id: 'crime-drugs',
      title: 'Crime and Drugs',
      description: 'Seguridad ciudadana y lucha contra el narcotráfico',
      color: 'bg-gradient-to-br from-gray-600 to-gray-800',
      icon: '🚨'
    },
    {
      id: 'employment',
      title: 'Employment',
      description: 'Mercado laboral y oportunidades de empleo en Colombia',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      icon: '💼'
    },
    {
      id: 'terror',
      title: 'Terror',
      description: 'Noticias sobre terrorismo y seguridad nacional',
      color: 'bg-gradient-to-br from-orange-600 to-red-600',
      icon: '⚠️'
    },
    {
      id: 'rightwing',
      title: 'Right-wing',
      description: 'Perspectivas y noticias del sector político conservador',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      icon: '🗳️'
    },
    {
      id: 'leftwing',
      title: 'Left-wing',
      description: 'Perspectivas y noticias del sector político progresista',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      icon: '🌹'
    },
    {
      id: 'legislation',
      title: 'Legislation',
      description: 'Nuevas leyes y proyectos legislativos en trámite',
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      icon: '📜'
    },
    {
      id: 'congress-colombia',
      title: 'Congress of Colombia',
      description: 'Actividades y decisiones del Congreso de la República',
      color: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      icon: '🏛️'
    }
  ];

  // Mock news feed data
  const newsFeed: NewsItem[] = [
    {
      id: '1',
      title: 'Senado Aprueba Reforma Tributaria con Modificaciones Clave',
      summary: 'El Senado de la República aprobó en primer debate la reforma tributaria tras intensas negociaciones, introduciendo cambios significativos al proyecto original.',
      source: 'El Tiempo',
      category: 'Política',
      publishedAt: '2024-01-15T14:30:00Z',
      hasBalancedCoverage: true,
      trending: true
    },
    {
      id: '2',
      title: 'Colombia Anuncia Nueva Estrategia de Transición Energética',
      summary: 'El gobierno presenta un plan ambicioso para reducir la dependencia de combustibles fósiles y promover energías renovables en los próximos 10 años.',
      source: 'Portafolio',
      category: 'Ambiente',
      publishedAt: '2024-01-15T12:15:00Z',
      hasBalancedCoverage: true,
      trending: false
    },
    {
      id: '3',
      title: 'Aumenta Inversión Extranjera en Sector Tecnológico Colombiano',
      summary: 'Empresas multinacionales tecnológicas muestran creciente interés en establecer operaciones en Colombia, impulsando el empleo calificado.',
      source: 'Semana',
      category: 'Economía',
      publishedAt: '2024-01-15T10:45:00Z',
      hasBalancedCoverage: false,
      trending: true
    },
    {
      id: '4',
      title: 'Nuevo Plan de Seguridad para Zonas Rurales',
      summary: 'Las autoridades presentan estrategias focalizadas para mejorar la seguridad en zonas rurales afectadas por la violencia.',
      source: 'RCN Radio',
      category: 'Seguridad',
      publishedAt: '2024-01-15T09:20:00Z',
      hasBalancedCoverage: true,
      trending: false
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // This could be extended to navigate to a specific news feed for this category
    console.log(`Category clicked: ${categoryId}`);
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    console.log('Article clicked:', newsItem.title, 'onNavigate:', typeof onNavigate);
    if (newsItem.hasBalancedCoverage) {
      // Navigate to the dedicated article page instead of balanced view
      if (onNavigate) {
        console.log('Navigating to article page with ID:', newsItem.id);
        onNavigate('article', newsItem.id);
      } else {
        console.log('onNavigate is not available');
      }
    } else {
      // For news without balanced coverage, still open article page
      if (onNavigate) {
        console.log('Navigating to article page with ID:', newsItem.id);
        onNavigate('article', newsItem.id);
      } else {
        console.log('onNavigate is not available');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">📰 Feeds & Noticias</h1>
            <p className="text-white/90">
              Mantente informado con perspectivas balanceadas y análisis en profundidad
            </p>
            <div className="mt-4 flex items-center space-x-6 text-white/80">
              <span>🔴 Actualización en tiempo real</span>
              <span>⚖️ Perspectivas balanceadas</span>
              <span>📊 Análisis de tendencias</span>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Vista</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('feed')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'feed'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🔥 Feed Principal
                  </button>
                  <button
                    onClick={() => setViewMode('categories')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'categories'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📂 Categorías
                  </button>
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'feed' ? (
            /* Main News Feed */
            <div className="space-y-6">
              {/* Trending Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">🔥</span>
                  <h2 className="text-xl font-bold text-gray-900">Trending Ahora</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsFeed.filter(item => item.trending).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleNewsClick(item)}
                      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          🔥 TRENDING
                        </span>
                        {item.hasBalancedCoverage && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            ⚖️ Perspectivas Balanceadas
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.summary}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.source}</span>
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest News */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Últimas Noticias</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver todas →
                  </button>
                </div>
                <div className="space-y-4">
                  {newsFeed.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleNewsClick(item)}
                      className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500">{item.source}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{formatDate(item.publishedAt)}</span>
                            {item.trending && (
                              <>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                  🔥 Trending
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.summary}</p>
                        </div>
                        <div className="ml-4">
                          {item.hasBalancedCoverage ? (
                            <div className="text-center">
                              <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-xs font-medium mb-1">
                                ⚖️ Balance
                              </div>
                              <span className="text-xs text-gray-500">Ver perspectivas</span>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-xs">
                                📰 Artículo
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Feed Integration */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">📱</span>
                  <h2 className="text-xl font-bold text-gray-900">Redes Sociales</h2>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-blue-600">ℹ️</span>
                    <span className="font-medium text-blue-800">Próximamente</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Integración con feeds de redes sociales para mantener actualizaciones en tiempo real 
                    de fuentes confiables y verificadas.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Categories View */
            <div>
              <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 mb-6">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">📂 Categorías de Noticias</h2>
                  <p className="text-gray-600">
                    Explora diferentes categorías para encontrar noticias específicas que te interesan
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`${category.color} rounded-lg p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{category.icon}</span>
                        <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      
                      <p className="text-white/90 text-sm leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-sm opacity-80">
                        <span>Click to explore</span>
                        <span className="ml-2">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2 text-blue-800">
                  <span className="text-lg">ℹ️</span>
                  <span className="font-medium">Funcionalidad Mejorada</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Las categorías ahora incluyen perspectivas balanceadas automáticamente. 
                  Cada artículo muestra múltiples puntos de vista cuando están disponibles.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNewsFeed;