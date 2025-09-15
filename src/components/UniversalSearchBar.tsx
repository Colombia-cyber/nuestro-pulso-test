import React, { useState, useEffect, useCallback } from 'react';
import { activityTracker } from '../services/ActivityTracker';

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  link: string;
  image?: string;
}

interface UniversalSearchBarProps {
  initialQuery?: string;
}

// Mock search data with Colombian-relevant content (excluding technology)
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Gustavo Petro anuncia nueva política económica para 2024',
    summary: 'El presidente colombiano presenta un plan integral de reformas económicas que incluye medidas fiscales y sociales para impulsar el crecimiento.',
    source: 'El Tiempo',
    category: 'Política',
    timestamp: '2024-01-15T10:30:00Z',
    relevanceScore: 95,
    link: '#',
    image: '🏛️'
  },
  {
    id: '2', 
    title: 'Centro Democrático critica políticas del gobierno actual',
    summary: 'La oposición presenta observaciones detalladas sobre las políticas económicas y sociales implementadas por la administración Petro.',
    source: 'Semana',
    category: 'Política',
    timestamp: '2024-01-15T08:45:00Z',
    relevanceScore: 88,
    link: '#',
    image: '🗳️'
  },
  {
    id: '3',
    title: 'Trump propone nuevos aranceles que afectarían a Colombia',
    summary: 'El expresidente estadounidense anuncia medidas comerciales que podrían impactar las exportaciones colombianas de café y flores.',
    source: 'CNN Colombia',
    category: 'Internacional',
    timestamp: '2024-01-14T16:20:00Z',
    relevanceScore: 82,
    link: '#',
    image: '🇺🇸'
  },
  {
    id: '4',
    title: 'Congreso debate reforma pensional con participación ciudadana',
    summary: 'Las comisiones del Senado y Cámara abren espacios de diálogo para escuchar las propuestas de la sociedad civil sobre el sistema pensional.',
    source: 'El Espectador',
    category: 'Social',
    timestamp: '2024-01-14T14:15:00Z',
    relevanceScore: 75,
    link: '#',
    image: '🏛️'
  },
  {
    id: '5',
    title: 'Alerta de seguridad por actividad terrorista en fronteras',
    summary: 'Las fuerzas militares reportan incremento en amenazas de grupos armados ilegales en las zonas fronterizas con Venezuela.',
    source: 'Caracol Radio',
    category: 'Seguridad',
    timestamp: '2024-01-14T12:00:00Z',
    relevanceScore: 90,
    link: '#',
    image: '🚨'
  },
  {
    id: '6',
    title: 'Reforma tributaria genera debate en el sector empresarial',
    summary: 'Los gremios económicos presentan sus observaciones sobre las modificaciones propuestas al sistema tributario colombiano.',
    source: 'Portafolio',
    category: 'Economía',
    timestamp: '2024-01-13T11:30:00Z',
    relevanceScore: 78,
    link: '#',
    image: '💰'
  }
];

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [totalResults, setTotalResults] = useState(0);

  const resultsPerPage = 6;
  const maxPages = 10; // Google-like pagination

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setTotalResults(0);
    }
  }, [debouncedQuery]);

  // Handle initial query
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Mock search function with pagination simulation
  const performSearch = async (searchQuery: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (!searchQuery.trim()) {
      setLoading(false);
      setResults([]);
      setTotalResults(0);
      return;
    }

    try {
      // Filter mock data based on query (excluding technology)
      const filtered = mockSearchData.filter(item => 
        item.category.toLowerCase() !== 'tecnología' && // Hide technology content
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Add some dynamic results based on query for more realistic pagination
      const dynamicResults: SearchResult[] = [];
      
      // Generate additional mock results for pagination demo
      for (let i = 0; i < 15; i++) {
        dynamicResults.push({
          id: `dynamic-${Date.now()}-${i}`,
          title: `Análisis sobre "${searchQuery}" - Parte ${i + 1}`,
          summary: `Cobertura detallada y análisis especializado sobre ${searchQuery} en el contexto político y social colombiano. Esta información incluye múltiples perspectivas y fuentes verificadas.`,
          source: 'Nuestro Pulso Agregador',
          category: 'Agregado',
          timestamp: new Date(Date.now() - i * 3600000).toISOString(), // Spread over hours
          relevanceScore: Math.max(60, 100 - i * 3),
          link: '#',
          image: '📰'
        });
      }

      const allResults = [...filtered, ...dynamicResults];
      setResults(allResults);
      setTotalResults(allResults.length);
      setCurrentPage(1);
      
      // Track search activity
      activityTracker.trackSearch(searchQuery, allResults.length, filter !== 'all' ? filter : undefined);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
    }

    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
      
      // Update URL with search query
      const newUrl = `/search?q=${encodeURIComponent(query)}`;
      window.history.pushState({ view: 'search', query }, '', newUrl);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as any);
    }
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.category.toLowerCase() === filter.toLowerCase();
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return b.relevanceScore - a.relevanceScore;
      case 'date':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const totalPages = Math.min(Math.ceil(sortedResults.length / resultsPerPage), maxPages);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + resultsPerPage);

  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const handleResultClick = (result: SearchResult) => {
    // Track view activity
    activityTracker.trackView(result.title, result.category);
    
    // Add visual feedback
    console.log('Opening result:', result.title);
    // In a real app, this would navigate to the article detail page
  };

  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Google-like pagination logic
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Colombian-inspired header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-6 lg:p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl lg:text-4xl">🔍</span>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Búsqueda Universal</h1>
            <p className="text-white/90 text-sm lg:text-base">Explora toda la información cívica y política de Colombia</p>
          </div>
          <span className="text-3xl lg:text-4xl ml-auto">🇨🇴</span>
        </div>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar noticias, políticas, candidatos, reformas..."
              className="flex-1 p-3 lg:p-4 rounded-lg text-gray-900 placeholder-gray-500 text-base lg:text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-600 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg whitespace-nowrap"
            >
              {loading ? '🔄' : '🔍'} <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>

        {/* Quick search suggestions */}
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-2">Búsquedas populares:</p>
          <div className="flex flex-wrap gap-2">
            {['Gustavo Petro', 'Centro Democrático', 'Trump Colombia', 'Reforma pensional', 'Seguridad fronteras'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors backdrop-blur"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section */}
      {(results.length > 0 || loading) && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700 text-sm lg:text-base">
                  📊 {loading ? 'Buscando...' : `${filteredResults.length} resultados para "${query}"`}
                </span>
                
                {/* Category filter - excluding technology */}
                <select
                  value={filter}
                  onChange={e => {setFilter(e.target.value); setCurrentPage(1);}}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="política">Política</option>
                  <option value="internacional">Internacional</option>
                  <option value="social">Social</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="economía">Economía</option>
                  {/* Technology option deliberately excluded */}
                </select>

                {/* Sort options */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Por relevancia</option>
                  <option value="date">Por fecha</option>
                  <option value="category">Por categoría</option>
                </select>
              </div>

              {/* Display mode toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDisplayMode('cards')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    displayMode === 'cards' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🔲 <span className="hidden sm:inline">Tarjetas</span>
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    displayMode === 'list' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📄 <span className="hidden sm:inline">Lista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
            </div>
          )}

          {/* Results */}
          {!loading && paginatedResults.length > 0 && (
            <>
              <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {paginatedResults.map((result) => (
                  <div 
                    key={result.id} 
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 cursor-pointer ${
                      displayMode === 'list' ? 'p-4' : 'p-6'
                    } hover:scale-[1.02]`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className={displayMode === 'list' ? 'flex items-start gap-4' : ''}>
                      {/* Image/Icon */}
                      <div className={`${displayMode === 'list' ? 'text-3xl' : 'text-4xl text-center mb-4'}`}>
                        {result.image}
                      </div>

                      <div className="flex-1">
                        {/* Category and timestamp */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.category === 'Política' ? 'bg-blue-100 text-blue-800' :
                            result.category === 'Internacional' ? 'bg-green-100 text-green-800' :
                            result.category === 'Social' ? 'bg-purple-100 text-purple-800' :
                            result.category === 'Seguridad' ? 'bg-red-100 text-red-800' :
                            result.category === 'Economía' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {result.category}
                          </span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(result.timestamp)}</span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-bold text-gray-900 mb-2 hover:text-blue-600 ${
                          displayMode === 'list' ? 'text-lg' : 'text-xl'
                        }`}>
                          {result.title}
                        </h3>

                        {/* Summary */}
                        <p className={`text-gray-600 mb-4 ${
                          displayMode === 'list' ? 'text-sm' : ''
                        } ${
                          expandedResults.has(result.id) ? '' : 'line-clamp-2'
                        }`}>
                          {result.summary}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpanded(result.id);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              {expandedResults.has(result.id) ? '▲ Menos' : '▼ Más'}
                            </button>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{result.source}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">Relevancia:</span>
                            <span className="text-xs font-medium text-blue-600">{result.relevanceScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google-like Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    ← Anterior
                  </button>
                  
                  <div className="flex gap-1 flex-wrap">
                    {generatePageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-500">...</span>
                        ) : (
                          <button
                            onClick={() => setCurrentPage(page as number)}
                            className={`px-3 py-2 rounded-lg transition-colors min-w-[2.5rem] ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              )}

              {/* Results info */}
              <div className="text-center text-sm text-gray-500">
                Mostrando {startIndex + 1}-{Math.min(startIndex + resultsPerPage, sortedResults.length)} de {sortedResults.length} resultados
                {sortedResults.length >= resultsPerPage * maxPages && (
                  <span className="block mt-1">
                    💡 Refina tu búsqueda para ver resultados más específicos
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o explora las sugerencias populares
          </p>
          <button
            onClick={() => setQuery('')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nueva búsqueda
          </button>
        </div>
      )}

      {/* Initial state */}
      {!query && !results.length && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Busca información cívica y política</h3>
          <p className="text-gray-600 mb-6">
            Utiliza la barra de búsqueda para encontrar noticias, debates, políticas y más contenido relevante para Colombia
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversalSearchBar;