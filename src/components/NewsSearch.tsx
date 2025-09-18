import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaGlobe, FaNewspaper, FaCalendarAlt, FaUser, FaClock, FaHeart, FaShare, FaComment } from 'react-icons/fa';

interface NewsSearchProps {
  searchType: 'news' | 'reels';
  initialQuery?: string;
  onNavigate?: (view: string, data?: any) => void;
}

interface NewsResult {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  publishDate: Date;
  category: string;
  tags: string[];
  imageUrl?: string;
  url: string;
  location: 'local' | 'world';
  relevanceScore: number;
  views: number;
  likes: number;
  comments: number;
  wing?: 'left' | 'right' | 'neutral';
}

interface ArchiveFilter {
  timeRange: 'all' | '1month' | '6months' | '1year' | '5years' | '10years' | '30years';
  location: 'all' | 'local' | 'world';
  category: string;
  source: string;
  wing: 'all' | 'left' | 'right' | 'neutral';
  sortBy: 'relevance' | 'date' | 'popularity';
}

const NewsSearch: React.FC<NewsSearchProps> = ({ searchType, initialQuery = '', onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<NewsResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selectedResult, setSelectedResult] = useState<NewsResult | null>(null);
  
  // Advanced filters
  const [filters, setFilters] = useState<ArchiveFilter>({
    timeRange: 'all',
    location: 'all',
    category: 'all',
    source: 'all',
    wing: 'all',
    sortBy: 'relevance'
  });

  // Sample news data with 30-year archive simulation
  const sampleResults: NewsResult[] = [
    {
      id: '1',
      title: 'Reforma Tributaria 2024: Impacto en la Clase Media',
      summary: 'Análisis detallado de cómo la nueva reforma tributaria afectará a los colombianos de clase media.',
      content: 'La reforma tributaria presentada por el gobierno...',
      source: 'El Espectador',
      author: 'María González',
      publishDate: new Date(2024, 0, 15),
      category: 'Política',
      tags: ['reforma', 'tributaria', 'economia', 'clase media'],
      url: 'https://example.com/reforma-tributaria',
      location: 'local',
      relevanceScore: 95,
      views: 15420,
      likes: 892,
      comments: 156,
      wing: 'neutral'
    },
    {
      id: '2',
      title: 'Operativo Antinarcóticos en Antioquia Deja 50 Capturas',
      summary: 'Las autoridades desmantelaron una red de narcotráfico que operaba en varios municipios.',
      content: 'En un operativo conjunto entre Policía y Ejército...',
      source: 'Caracol Noticias',
      author: 'Carlos Rodríguez',
      publishDate: new Date(2024, 0, 14),
      category: 'Seguridad',
      tags: ['narcotrafico', 'antioquia', 'operativo', 'capturas'],
      url: 'https://example.com/operativo-antioquia',
      location: 'local',
      relevanceScore: 88,
      views: 8920,
      likes: 445,
      comments: 89,
      wing: 'neutral'
    },
    {
      id: '3',
      title: 'Trump Anuncia Nuevas Políticas Comerciales que Afectan a Colombia',
      summary: 'Las medidas comerciales estadounidenses tendrán impacto directo en las exportaciones colombianas.',
      content: 'El presidente electo Donald Trump anunció...',
      source: 'CNN Español',
      author: 'Ana Martínez',
      publishDate: new Date(2024, 0, 13),
      category: 'Internacional',
      tags: ['trump', 'comercio', 'exportaciones', 'eeuu'],
      url: 'https://example.com/trump-comercio',
      location: 'world',
      relevanceScore: 82,
      views: 12300,
      likes: 567,
      comments: 234,
      wing: 'neutral'
    },
    {
      id: '4',
      title: 'Petro Defiende Política de Paz Total ante Críticas',
      summary: 'El presidente colombiano respondió a los cuestionamientos sobre el proceso de negociación.',
      content: 'En rueda de prensa, el presidente Gustavo Petro...',
      source: 'Semana',
      author: 'Roberto Silva',
      publishDate: new Date(2024, 0, 12),
      category: 'Política',
      tags: ['petro', 'paz total', 'negociacion', 'criticas'],
      url: 'https://example.com/petro-paz',
      location: 'local',
      relevanceScore: 90,
      views: 18760,
      likes: 1023,
      comments: 445,
      wing: 'left'
    },
    // Historical archive samples
    {
      id: '5',
      title: 'Constitución de 1991: 30 Años de Democracia',
      summary: 'Retrospectiva sobre los cambios que trajo la nueva Constitución Política de Colombia.',
      content: 'A tres décadas de su promulgación...',
      source: 'El Tiempo',
      author: 'Luis García',
      publishDate: new Date(1991, 6, 4),
      category: 'Historia',
      tags: ['constitucion', '1991', 'democracia', 'colombia'],
      url: 'https://example.com/constitucion-1991',
      location: 'local',
      relevanceScore: 78,
      views: 5420,
      likes: 234,
      comments: 67,
      wing: 'neutral'
    },
    {
      id: '6',
      title: 'Caída del Muro de Berlín: Impacto Global',
      summary: 'Cómo el fin de la Guerra Fría cambió las relaciones internacionales.',
      content: 'El 9 de noviembre de 1989...',
      source: 'BBC Mundo',
      author: 'Peter Johnson',
      publishDate: new Date(1989, 10, 9),
      category: 'Historia',
      tags: ['muro berlin', 'guerra fria', 'internacional'],
      url: 'https://example.com/muro-berlin',
      location: 'world',
      relevanceScore: 71,
      views: 3210,
      likes: 145,
      comments: 34,
      wing: 'neutral'
    }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'Todo el archivo (30 años)', description: '1994 - 2024' },
    { value: '1month', label: 'Último mes', description: 'Noticias recientes' },
    { value: '6months', label: 'Últimos 6 meses', description: 'Año en curso' },
    { value: '1year', label: 'Último año', description: '2023 - 2024' },
    { value: '5years', label: 'Últimos 5 años', description: '2019 - 2024' },
    { value: '10years', label: 'Últimos 10 años', description: '2014 - 2024' },
    { value: '30years', label: 'Archivo completo', description: 'Desde 1994' }
  ];

  const categories = [
    'all', 'Política', 'Economía', 'Seguridad', 'Internacional', 'Social', 
    'Ambiente', 'Tecnología', 'Deportes', 'Cultura', 'Historia'
  ];

  const sources = [
    'all', 'El Tiempo', 'El Espectador', 'Semana', 'Caracol Noticias', 'RCN Noticias',
    'La República', 'Portafolio', 'BBC Mundo', 'CNN Español', 'Reuters'
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter results based on search query and filters
      let filteredResults = sampleResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                            result.summary.toLowerCase().includes(query.toLowerCase()) ||
                            result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        const matchesLocation = filters.location === 'all' || result.location === filters.location;
        const matchesCategory = filters.category === 'all' || result.category === filters.category;
        const matchesSource = filters.source === 'all' || result.source === filters.source;
        const matchesWing = filters.wing === 'all' || result.wing === filters.wing;
        
        // Time range filtering
        let matchesTime = true;
        if (filters.timeRange !== 'all') {
          const now = new Date();
          const resultDate = result.publishDate;
          const monthsMap = {
            '1month': 1,
            '6months': 6,
            '1year': 12,
            '5years': 60,
            '10years': 120,
            '30years': 360
          };
          const months = monthsMap[filters.timeRange as keyof typeof monthsMap] || 360;
          const cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
          matchesTime = resultDate >= cutoffDate;
        }
        
        return matchesQuery && matchesLocation && matchesCategory && matchesSource && matchesWing && matchesTime;
      });
      
      // Sort results
      if (filters.sortBy === 'date') {
        filteredResults.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
      } else if (filters.sortBy === 'popularity') {
        filteredResults.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
      } else {
        filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      }
      
      setResults(filteredResults);
      setTotalResults(filteredResults.length);
      setHasMore(filteredResults.length > 20);
      setCurrentPage(1);
      
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: NewsResult) => {
    setSelectedResult(result);
    if (onNavigate) {
      onNavigate('article-detail', { articleId: result.id });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWingColor = (wing?: string) => {
    switch (wing) {
      case 'left': return 'bg-red-100 text-red-800';
      case 'right': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWingLabel = (wing?: string) => {
    switch (wing) {
      case 'left': return '🌹 Izquierda';
      case 'right': return '🗳️ Derecha';
      default: return '⚖️ Neutral';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {searchType === 'news' ? '🌍 Búsqueda de Noticias' : '🎬 Búsqueda de Reels'}
          </h1>
          <p className="text-white/90 mb-6">
            Archivo completo de 30 años • Noticias locales y mundiales • Perspectivas balanceadas
          </p>
          
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Buscar ${searchType === 'news' ? 'noticias, políticos, eventos' : 'videos, streams, debates'}...`}
                className="w-full px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 text-gray-800 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-yellow-500 text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition-colors font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaFilter className="mr-2" />
            Filtros de Archivo (30 años de historia)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" />
                Período
              </label>
              <select
                value={filters.timeRange}
                onChange={(e) => setFilters({...filters, timeRange: e.target.value as any})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {timeRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaGlobe className="inline mr-1" />
                Ubicación
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value as any})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                <option value="local">🇨🇴 Colombia</option>
                <option value="world">🌍 Internacional</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaNewspaper className="inline mr-1" />
                Fuente
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({...filters, source: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'Todas las fuentes' : source}
                  </option>
                ))}
              </select>
            </div>

            {/* Political Wing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perspectiva
              </label>
              <select
                value={filters.wing}
                onChange={(e) => setFilters({...filters, wing: e.target.value as any})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                <option value="left">🌹 Izquierda</option>
                <option value="right">🗳️ Derecha</option>
                <option value="neutral">⚖️ Neutral</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevancia</option>
                <option value="date">Fecha</option>
                <option value="popularity">Popularidad</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {totalResults > 0 && (
                <span>
                  {totalResults.toLocaleString()} resultados encontrados
                  {filters.timeRange !== 'all' && (
                    <span className="ml-2 text-blue-600">
                      • {timeRangeOptions.find(opt => opt.value === filters.timeRange)?.description}
                    </span>
                  )}
                </span>
              )}
            </div>
            
            <button
              onClick={() => setFilters({
                timeRange: 'all',
                location: 'all',
                category: 'all',
                source: 'all',
                wing: 'all',
                sortBy: 'relevance'
              })}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              🔄 Limpiar filtros
            </button>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.slice(0, currentPage * 20).map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.location === 'local' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {result.location === 'local' ? '🇨🇴 Local' : '🌍 Mundial'}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {result.category}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {result.relevanceScore}% relevancia
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {result.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {result.summary}
                    </p>

                    {/* Political Wing */}
                    {result.wing && result.wing !== 'neutral' && (
                      <div className="mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWingColor(result.wing)}`}>
                          {getWingLabel(result.wing)}
                        </span>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {result.author}
                          </span>
                          <span className="flex items-center">
                            <FaNewspaper className="mr-1" />
                            {result.source}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {formatDate(result.publishDate)}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            👁️ {result.views.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <FaHeart className="mr-1 text-red-400" />
                            {result.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <FaComment className="mr-1 text-blue-400" />
                            {result.comments}
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Leer más →
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {result.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && results.length > currentPage * 20 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cargar más resultados
                </button>
              </div>
            )}
          </div>
        ) : query ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
            <p className="text-gray-600 mb-6">
              No encontramos noticias que coincidan con tu búsqueda "{query}" en el archivo seleccionado.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Prueba con términos más generales</p>
              <p>• Verifica la ortografía</p>
              <p>• Ajusta los filtros de tiempo o categoría</p>
              <p>• Busca en todo el archivo de 30 años</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Archivo de 30 Años Disponible</h3>
            <p className="text-gray-600 mb-6">
              Busca en nuestro archivo completo desde 1994 hasta hoy. Más de 1 millón de artículos indexados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🇨🇴</div>
                <div className="font-semibold">Noticias Locales</div>
                <div className="text-sm text-gray-600">Toda Colombia</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-semibold">Noticias Mundiales</div>
                <div className="text-sm text-gray-600">Contexto global</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="font-semibold">Perspectivas</div>
                <div className="text-sm text-gray-600">Balanceadas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSearch;