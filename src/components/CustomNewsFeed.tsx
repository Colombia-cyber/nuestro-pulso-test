import React, { useState, useEffect } from 'react';
import EnhancedNewsCard from './EnhancedNewsCard';
import TimelineView from './TimelineView';
import { NewsItem, NewsFilter, CategoryCard } from '../types/news';
import { newsService } from '../services/newsService';

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'feed' | 'timeline' | 'categories'>('feed');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [timelineData, setTimelineData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filter, setFilter] = useState<NewsFilter>({
    timeRange: 'all',
    perspective: 'both'
  });

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

  // Load data and set up live updates
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      
      // Load filtered news
      const filteredNews = newsService.getFilteredNews(filter);
      setNewsData(filteredNews);
      
      // Load timeline data
      const timeline = newsService.generateTimelineData();
      setTimelineData(timeline);
      
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    loadData();

    // Set up live updates
    newsService.startLiveUpdates();
    
    const updateListener = () => {
      loadData();
    };
    
    newsService.addUpdateListener(updateListener);

    return () => {
      newsService.removeUpdateListener(updateListener);
      newsService.stopLiveUpdates();
    };
  }, [filter.timeRange, filter.perspective, filter.category]); // Only depend on primitive values

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilter(prev => ({ ...prev, category: categoryId }));
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNavigate) {
      onNavigate('article', newsItem.id);
    }
  };

  const handleFilterChange = (newFilter: Partial<NewsFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTrendingNews = () => {
    return newsData.filter(item => item.trending);
  };

  const getLatestNews = () => {
    return newsData.slice(0, 10); // Show latest 10 articles
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
            <div className="mt-4 flex items-center space-x-6 text-white/80 text-sm">
              <span>🔴 Actualización en tiempo real</span>
              <span>⚖️ Perspectivas balanceadas</span>
              <span>📊 Análisis de tendencias</span>
              <span>🕒 Última actualización: {formatTime(lastUpdated)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 space-y-4">
            {/* View Mode Toggle */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
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
                    onClick={() => setViewMode('timeline')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'timeline'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📅 Línea de Tiempo
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

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Período de tiempo
                  </label>
                  <select 
                    value={filter.timeRange}
                    onChange={(e) => handleFilterChange({ timeRange: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos los años</option>
                    <option value="1year">Último año</option>
                    <option value="2years">Últimos 2 años</option>
                    <option value="5years">Últimos 5 años</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Perspectiva
                  </label>
                  <select 
                    value={filter.perspective}
                    onChange={(e) => handleFilterChange({ perspective: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="both">Todas las perspectivas</option>
                    <option value="progressive">Solo progresistas</option>
                    <option value="conservative">Solo conservadoras</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select 
                    value={filter.category || ''}
                    onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las categorías</option>
                    <option value="Política">Política</option>
                    <option value="Economía">Economía</option>
                    <option value="Ambiente">Ambiente</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Educación">Educación</option>
                    <option value="Salud">Salud</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setFilter({ timeRange: 'all', perspective: 'both' })}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    🔄 Resetear filtros
                  </button>
                </div>
              </div>
            </div>

            {/* Live Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  🔴 En vivo - Las noticias se actualizan automáticamente cada 30 segundos
                </span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando noticias...</h3>
              <p className="text-gray-500">Obteniendo las últimas actualizaciones</p>
            </div>
          )}

          {/* Content Views */}
          {!isLoading && (
            <>
              {viewMode === 'timeline' && (
                <TimelineView 
                  timelineData={timelineData}
                  onArticleClick={handleNewsClick}
                />
              )}

              {viewMode === 'feed' && (
                <div className="space-y-6">
                  {/* Trending Section */}
                  {getTrendingNews().length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-2">🔥</span>
                        <h2 className="text-xl font-bold text-gray-900">Trending Ahora</h2>
                        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {getTrendingNews().length} artículos
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getTrendingNews().map((item) => (
                          <EnhancedNewsCard
                            key={item.id}
                            article={item}
                            onArticleClick={handleNewsClick}
                            showPerspectiveBadge={true}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Latest News */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-gray-900">Últimas Noticias</h2>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {newsData.length} artículos
                        </span>
                      </div>
                      <button 
                        onClick={() => setViewMode('timeline')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver línea de tiempo →
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getLatestNews().map((item) => (
                        <EnhancedNewsCard
                          key={item.id}
                          article={item}
                          onArticleClick={handleNewsClick}
                          showPerspectiveBadge={true}
                        />
                      ))}
                    </div>

                    {newsData.length > 10 && (
                      <div className="mt-6 text-center">
                        <button 
                          onClick={() => setViewMode('timeline')}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Ver todos los artículos en línea de tiempo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Estadísticas del Feed</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {newsData.filter(n => n.perspective === 'progressive' || n.perspective === 'both').length}
                        </div>
                        <div className="text-sm text-blue-800">Perspectivas Progresistas</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {newsData.filter(n => n.perspective === 'conservative' || n.perspective === 'both').length}
                        </div>
                        <div className="text-sm text-red-800">Perspectivas Conservadoras</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {newsData.filter(n => n.perspective === 'both').length}
                        </div>
                        <div className="text-sm text-purple-800">Artículos Balanceados</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-600">
                          {newsData.filter(n => n.trending).length}
                        </div>
                        <div className="text-sm text-gray-800">Artículos Trending</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'categories' && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNewsFeed;