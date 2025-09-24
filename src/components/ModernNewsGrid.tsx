import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch, FaTimes, FaChevronDown, FaPlay, FaVideo } from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdUpdate, MdLocationOn } from 'react-icons/md';
import ModernNewsCard from './ModernNewsCard';
import { NewsItem } from '../types/news';

interface ModernNewsGridProps {
  newsData: NewsItem[];
  isLoading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onArticleClick?: (article: NewsItem) => void;
  onVideoPlay?: (article: NewsItem) => void;
  className?: string;
}

interface FilterOptions {
  location: 'all' | 'colombia' | 'global' | 'city';
  topic: 'all' | 'politics' | 'economy' | 'security' | 'environment';
  contentType: 'all' | 'articles' | 'videos' | 'trending';
  timeRange: 'all' | 'today' | 'week' | 'month';
}

const ModernNewsGrid: React.FC<ModernNewsGridProps> = ({
  newsData,
  isLoading = false,
  searchQuery = '',
  onSearchChange,
  onArticleClick,
  onVideoPlay,
  className = ''
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    location: 'all',
    topic: 'all',
    contentType: 'all',
    timeRange: 'all'
  });

  // Add a andpi news to the data
  const enhancedNewsData = [
    ...newsData,
    // Add sample a andpi news items
    {
      id: 'andpi-001',
      title: 'Análisis Profundo: Impacto de las Políticas Públicas en la Juventud Colombiana',
      summary: 'Un estudio exhaustivo revela cómo las nuevas políticas gubernamentales están transformando las oportunidades para los jóvenes en Colombia.',
      source: { id: 'andpi', name: 'a andpi' },
      category: 'Política',
      publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both' as const,
      imageUrl: '/api/placeholder/600/400',
      readTime: '8 min',
      author: 'Equipo a andpi',
      tags: ['juventud', 'políticas públicas', 'análisis'],
      shareUrl: '#',
      relatedArticles: ['andpi-002']
    },
    {
      id: 'andpi-002',
      title: 'Video: Entrevista Exclusiva con Líderes Comunitarios de Medellín',
      summary: 'Conversamos con representantes de las comunas sobre los retos y oportunidades en sus territorios.',
      source: { id: 'andpi', name: 'a andpi' },
      category: 'Sociedad',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both' as const,
      imageUrl: '/api/placeholder/600/400',
      readTime: '12 min',
      author: 'Reportero a andpi',
      tags: ['medellín', 'comunidad', 'liderazgo'],
      shareUrl: '#',
      relatedArticles: ['andpi-001']
    }
  ];

  const filteredNews = enhancedNewsData.filter(article => {
    // Search filter
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !article.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Location filter
    if (filters.location === 'colombia' && !article.title.toLowerCase().includes('colombia')) {
      return false;
    }

    // Topic filter
    if (filters.topic !== 'all') {
      const category = typeof article.category === 'string' ? article.category.toLowerCase() : String(article.category).toLowerCase();
      if (!category.includes(filters.topic)) {
        return false;
      }
    }

    // Content type filter
    if (filters.contentType === 'videos' && !article.title.toLowerCase().includes('video')) {
      return false;
    }
    if (filters.contentType === 'trending' && !article.trending) {
      return false;
    }

    return true;
  });

  const getFeaturedArticles = () => {
    return filteredNews.filter(article => article.trending).slice(0, 3);
  };

  const getRegularArticles = () => {
    return filteredNews.filter(article => !article.trending || getFeaturedArticles().length >= 3);
  };

  const getVideoArticles = () => {
    return filteredNews.filter(article => 
      article.title.toLowerCase().includes('video') || 
      Math.random() > 0.7 // Simulate some articles having videos
    );
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: 'all',
      topic: 'all',
      contentType: 'all',
      timeRange: 'all'
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== 'all');
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Buscar noticias, videos, temas..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap lg:flex-nowrap">
            {/* Location Filter */}
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="all">🌍 Todas las ubicaciones</option>
              <option value="colombia">🇨🇴 Colombia</option>
              <option value="global">🌎 Global</option>
              <option value="city">🏙️ Por ciudad</option>
            </select>

            {/* Topic Filter */}
            <select
              value={filters.topic}
              onChange={(e) => handleFilterChange('topic', e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="all">📂 Todos los temas</option>
              <option value="politics">🏛️ Política</option>
              <option value="economy">💼 Economía</option>
              <option value="security">🚨 Seguridad</option>
              <option value="environment">🌱 Ambiente</option>
            </select>

            {/* Content Type Filter */}
            <select
              value={filters.contentType}
              onChange={(e) => handleFilterChange('contentType', e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="all">📱 Todo el contenido</option>
              <option value="articles">📰 Artículos</option>
              <option value="videos">🎬 Videos</option>
              <option value="trending">🔥 Tendencia</option>
            </select>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 text-sm font-medium ${
                showFilters
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <FaFilter className="w-3 h-3" />
              Filtros
              <FaChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período de tiempo</label>
                <select
                  value={filters.timeRange}
                  onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos los períodos</option>
                  <option value="today">Hoy</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mes</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {filteredNews.length} resultados encontrados
              </div>
              {hasActiveFilters() && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured News Section */}
      {getFeaturedArticles().length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BiTrendingUp className="w-6 h-6 text-orange-500" />
              Destacadas
            </h2>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm px-3 py-1 rounded-full font-medium">
              {getFeaturedArticles().length} noticias
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedArticles().map((article, index) => (
              <ModernNewsCard
                key={article.id}
                article={article}
                size={index === 0 ? 'large' : 'medium'}
                showVideo={getVideoArticles().some(v => v.id === article.id)}
                onArticleClick={onArticleClick}
                onVideoPlay={onVideoPlay}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main News Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BiNews className="w-6 h-6 text-blue-600" />
              Últimas Noticias
            </h2>
            <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              {getRegularArticles().length} artículos
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
            <button className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-900">
              Tarjetas
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Lista
            </button>
          </div>
        </div>

        {/* Responsive News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {getRegularArticles().map((article) => (
            <ModernNewsCard
              key={article.id}
              article={article}
              size="medium"
              showVideo={getVideoArticles().some(v => v.id === article.id)}
              onArticleClick={onArticleClick}
              onVideoPlay={onVideoPlay}
            />
          ))}
        </div>
      </div>

      {/* No Results State */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros o cambiar los términos de búsqueda
          </p>
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Limpiar todos los filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernNewsGrid;