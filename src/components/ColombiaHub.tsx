import React, { useState, useEffect, useRef } from 'react';
import { FiFilter, FiRefreshCw, FiTrendingUp, FiMap, FiPlay, FiShare2, FiBookmark, FiEye } from 'react-icons/fi';
import { colombiaHubService, EnhancedNewsItem, VideoContent, TrendingTag, SmartFilter, SMART_FILTERS } from '../services/colombiaHubService';

interface ColombiaHubProps {
  onNavigate?: (view: string) => void;
}

interface FilterState {
  content_type: string;
  region: string;
  language: string;
  topic: string;
}

const ColombiaHub: React.FC<ColombiaHubProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<EnhancedNewsItem[]>([]);
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [trendingTags, setTrendingTags] = useState<TrendingTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    content_type: 'all',
    region: 'nacional',
    language: 'both',
    topic: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('all');
  const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      refreshInterval.current = setInterval(() => {
        refreshContent();
      }, 60000); // Refresh every minute

      return () => {
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
        }
      };
    }
  }, [autoRefresh, activeFilters]);

  // Initial load and filter changes
  useEffect(() => {
    loadContent();
  }, [activeFilters]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const [newsData, videosData, tagsData] = await Promise.all([
        colombiaHubService.fetchColombiaNews(activeFilters),
        colombiaHubService.fetchTrendingVideos(selectedVideoCategory === 'all' ? undefined : selectedVideoCategory),
        Promise.resolve(colombiaHubService.getTrendingTags())
      ]);

      setNews(newsData);
      setVideos(videosData);
      setTrendingTags(tagsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading Colombia Hub content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshContent = async () => {
    await loadContent();
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getFilterOptions = (filterId: string) => {
    return SMART_FILTERS.find(f => f.id === filterId)?.options || [];
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    return `Hace ${Math.floor(diffInHours / 24)} días`;
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-yellow-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                🇨🇴 Colombia Hub
              </h1>
              <p className="text-xl opacity-90">
                Tu ventana completa a Colombia: Noticias, videos y cultura en tiempo real
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="text-sm opacity-80">
                  Última actualización: {lastUpdated.toLocaleTimeString('es-CO')}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm opacity-80">
                    {autoRefresh ? 'En vivo' : 'Pausado'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRefresh ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                }`}
              >
                {autoRefresh ? '⏸️ Pausar' : '▶️ Reanudar'}
              </button>
              
              <button
                onClick={refreshContent}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <FiFilter />
                <span>Filtros</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Filters */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h3 className="text-lg font-semibold mb-4">Filtros Inteligentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SMART_FILTERS.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {filter.name}
                  </label>
                  <select
                    value={activeFilters[filter.id as keyof FilterState]}
                    onChange={(e) => handleFilterChange(filter.id as keyof FilterState, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {getFilterOptions(filter.id).map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trending Tags */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 mb-3">
            <FiTrendingUp className="text-orange-500" />
            <h3 className="font-semibold text-gray-800">Tendencias en Tiempo Real</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag.tag}
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${tag.color} text-white`}
              >
                <span>{getTrendIcon(tag.trend_direction)}</span>
                <span>{tag.tag}</span>
                <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">
                  {tag.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Noticias Principales</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiMap className="text-blue-500" />
                <span>Cobertura Nacional e Internacional</span>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {news.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {typeof article.source === 'object' ? article.source.name : article.source}
                        </span>
                        {article.trending && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded flex items-center">
                            🔥 Trending
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                          <FiBookmark size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-500 transition-colors">
                          <FiShare2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.summary}
                    </p>

                    {article.aiSummary && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-purple-800">🤖 Resumen IA</span>
                        </div>
                        <p className="text-sm text-purple-700">{article.aiSummary}</p>
                      </div>
                    )}

                    {article.location && (
                      <div className="flex items-center space-x-2 mb-4">
                        <FiMap className="text-gray-400" size={14} />
                        <span className="text-sm text-gray-600">{article.location.region}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <FiEye size={14} />
                          <span>{article.engagement.views.toLocaleString()}</span>
                        </span>
                        <span>💬 {article.engagement.comments}</span>
                        <span>🔄 {article.engagement.shares}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {article.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Videos */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Videos Trending</h3>
                <select
                  value={selectedVideoCategory}
                  onChange={(e) => setSelectedVideoCategory(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">Todos</option>
                  <option value="news">Noticias</option>
                  <option value="travel">Turismo</option>
                  <option value="food">Gastronomía</option>
                  <option value="culture">Cultura</option>
                </select>
              </div>

              <div className="space-y-4">
                {videos.slice(0, 5).map((video) => (
                  <div
                    key={video.id}
                    className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded group-hover:bg-black/50 transition-colors">
                        <FiPlay className="text-white" size={16} />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{formatTimeAgo(video.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Map */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Actividad por Región</h3>
              <div className="space-y-3">
                {[
                  { region: 'Bogotá', activity: 85, color: 'bg-blue-500' },
                  { region: 'Medellín', activity: 72, color: 'bg-green-500' },
                  { region: 'Cali', activity: 68, color: 'bg-yellow-500' },
                  { region: 'Cartagena', activity: 45, color: 'bg-purple-500' },
                  { region: 'Barranquilla', activity: 38, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.region} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.region}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.activity}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{item.activity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Spotlight */}
            <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl border border-yellow-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Spotlight Cultural</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Festival de Barranquilla</h4>
                    <p className="text-sm text-gray-600">Celebración del Carnaval</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Bandeja Paisa</h4>
                    <p className="text-sm text-gray-600">Plato tradicional antioqueño</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎵</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Vallenato</h4>
                    <p className="text-sm text-gray-600">Música tradicional del Caribe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColombiaHub;