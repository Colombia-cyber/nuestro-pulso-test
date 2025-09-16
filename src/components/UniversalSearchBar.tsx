import React, { useState, useEffect, useCallback } from 'react';
import { activityTracker } from '../services/ActivityTracker';
import { searchService, createDebouncedSearch } from '../services/UniversalSearchService';
import { SearchResult } from '../data/searchFallbackData';

const UniversalSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);

  const resultsPerPage = 6; // Reduced for better pagination demo

  // URL persistence for search state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    const urlPage = urlParams.get('page');
    const urlFilter = urlParams.get('filter');
    
    if (urlQuery) {
      setQuery(urlQuery);
      if (urlQuery.trim()) {
        performSearch(urlQuery, parseInt(urlPage || '1'));
      }
    }
    if (urlPage) {
      setCurrentPage(parseInt(urlPage));
    }
    if (urlFilter) {
      setFilter(urlFilter);
    }
  }, []);

  // Update URL when search state changes
  const updateURL = useCallback((newQuery: string, newPage: number, newFilter: string = 'all') => {
    const url = new URL(window.location.href);
    if (newQuery.trim()) {
      url.searchParams.set('q', newQuery);
      url.searchParams.set('page', newPage.toString());
      if (newFilter !== 'all') {
        url.searchParams.set('filter', newFilter);
      } else {
        url.searchParams.delete('filter');
      }
    } else {
      url.searchParams.delete('q');
      url.searchParams.delete('page');
      url.searchParams.delete('filter');
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Enhanced search function with error handling and pagination
  const performSearch = async (searchQuery: string, page: number = 1): Promise<void> => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
      setHasMorePages(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const searchResult = await searchService.search(searchQuery, page, resultsPerPage);
      
      setResults(searchResult.results);
      setTotalResults(searchResult.totalResults);
      setTotalPages(searchResult.totalPages);
      setHasMorePages(searchResult.hasMorePages);
      setCurrentPage(searchResult.currentPage);
      
      // Update URL with current search state
      updateURL(searchQuery, page, filter);
      
      // Track search activity
      activityTracker.trackSearch(searchQuery, searchResult.totalResults, filter !== 'all' ? filter : undefined);
      
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Error al realizar la búsqueda. Por favor intenta nuevamente.');
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
      setHasMorePages(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search for real-time input
  const debouncedSearch = useCallback(
    createDebouncedSearch((searchQuery: string) => {
      if (searchQuery.trim()) {
        performSearch(searchQuery, 1);
      }
    }, 300),
    [filter]
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(query, 1);
  };

  // Handle input changes with debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Trigger debounced search for real-time results
    if (newQuery.trim()) {
      debouncedSearch(newQuery);
    } else {
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
      setHasMorePages(false);
      updateURL('', 1);
    }
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    performSearch(query, newPage);
  };

  // Handle filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    updateURL(query, 1, newFilter);
    // Re-search with new filter would require server-side filtering
    // For now, we'll filter on frontend
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

  // All results are now paginated on the server side
  const displayResults = sortedResults;

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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Colombian-inspired header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🔍</span>
          <div>
            <h1 className="text-3xl font-bold">Búsqueda Universal</h1>
            <p className="text-white/90">Explora toda la información cívica y política de Colombia</p>
          </div>
          <span className="text-4xl ml-auto">🇨🇴</span>
        </div>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={handleInputChange}
              placeholder="Buscar noticias, políticas, candidatos, reformas..."
              className="flex-1 p-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? '🔄' : '🔍'} Buscar
            </button>
          </div>
        </form>

        {/* Quick search suggestions */}
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-2">Búsquedas populares:</p>
          <div className="flex flex-wrap gap-2">
            {['Facebook', 'Gustavo Petro', 'Trump', 'Reforma pensional', 'Tecnología'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  performSearch(suggestion, 1);
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors backdrop-blur"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">
                  📊 {totalResults} resultados para "{query}"
                  {currentPage > 1 && ` (página ${currentPage} de ${totalPages})`}
                </span>
                
                {/* Category filter */}
                <select
                  value={filter}
                  onChange={e => handleFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="política">Política</option>
                  <option value="internacional">Internacional</option>
                  <option value="social">Social</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="tecnología">Tecnología</option>
                  <option value="economía">Economía</option>
                  <option value="web">Resultados Web</option>
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
                  🔲 Tarjetas
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    displayMode === 'list' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📄 Lista
                </button>
              </div>
            </div>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-spin">⏳</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
              <p className="text-gray-500 text-sm mt-2">Agregando datos de múltiples fuentes</p>
              
              {/* Loading skeletons */}
              <div className="mt-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
                    <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error de búsqueda</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => performSearch(query, currentPage)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reintentar búsqueda
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && !error && (
            <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {displayResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer ${
                    displayMode === 'list' ? 'p-4' : 'p-6'
                  }`}
                  onClick={() => {
                    // Handle result click - open in new tab if external link, otherwise navigate
                    if (result.link.startsWith('http')) {
                      window.open(result.link, '_blank', 'noopener,noreferrer');
                    } else {
                      // Handle internal navigation if needed
                      console.log('Navigate to:', result.link);
                    }
                  }}
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
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.category}
                        </span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(result.timestamp)}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer ${
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
                          {result.link.startsWith('http') && (
                            <>
                              <span className="text-gray-300">•</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(result.link, '_blank', 'noopener,noreferrer');
                                }}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                🔗 Abrir enlace
                              </button>
                            </>
                          )}
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
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && !loading && !error && (
            <div className="space-y-4">
              {/* Results summary */}
              <div className="text-center text-gray-600">
                Mostrando resultados {((currentPage - 1) * resultsPerPage) + 1} - {Math.min(currentPage * resultsPerPage, totalResults)} de {totalResults}
              </div>
              
              {/* Main pagination controls */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  ← Anterior
                </button>
                
                {/* Page numbers */}
                <div className="flex gap-1">
                  {(() => {
                    const maxVisible = 5;
                    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                    const end = Math.min(totalPages, start + maxVisible - 1);
                    const pages = [];
                    
                    if (start > 1) {
                      pages.push(
                        <button key={1} onClick={() => handlePageChange(1)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">1</button>
                      );
                      if (start > 2) {
                        pages.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
                      }
                    }
                    
                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === i
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    
                    if (end < totalPages) {
                      if (end < totalPages - 1) {
                        pages.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
                      }
                      pages.push(
                        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">{totalPages}</button>
                      );
                    }
                    
                    return pages;
                  })()}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  Siguiente →
                </button>
              </div>
              
              {/* Quick page jump */}
              {totalPages > 10 && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-gray-600">Ir a página:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">de {totalPages}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Enhanced empty state */}
      {!loading && !error && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            No encontramos resultados para "<strong>{query}</strong>". 
            Intenta con otros términos de búsqueda o explora las sugerencias populares.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                updateURL('', 1);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              Nueva búsqueda
            </button>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Prueba con estas búsquedas populares:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Facebook', 'Petro', 'Trump', 'Tecnología', 'Economía'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      performSearch(suggestion, 1);
                    }}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalSearchBar;