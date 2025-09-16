import React, { useState, useEffect, useCallback } from 'react';
import { activityTracker } from '../services/ActivityTracker';
import { SearchResult } from '../data/searchDatabase';
import { 
  searchService, 
  searchURLManager, 
  DebouncedSearch,
  SearchParams,
  SearchResponse 
} from '../services/SearchService';
import { getSearchSuggestions } from '../data/searchDatabase';

const UniversalSearchBar: React.FC = () => {
  // Core search state
  const [query, setQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [showLoadMore, setShowLoadMore] = useState(false);
  
  // Search configuration
  const [resultsPerPage, setResultsPerPage] = useState(6);
  const [debouncedSearch] = useState(() => new DebouncedSearch(500));
  const [suggestions] = useState(() => getSearchSuggestions());

  // Initialize search from URL parameters
  useEffect(() => {
    const urlParams = searchURLManager.getParamsFromURL();
    if (urlParams.query) {
      setQuery(urlParams.query);
      setCurrentPage(urlParams.page || 1);
      setFilter(urlParams.category || 'all');
      setSortBy(urlParams.sortBy || 'relevance');
      
      // Perform initial search
      performSearch({
        query: urlParams.query,
        page: urlParams.page || 1,
        resultsPerPage,
        category: urlParams.category || 'all',
        sortBy: urlParams.sortBy || 'relevance'
      });
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = searchURLManager.getParamsFromURL();
      setQuery(urlParams.query || '');
      setCurrentPage(urlParams.page || 1);
      setFilter(urlParams.category || 'all');
      setSortBy(urlParams.sortBy || 'relevance');
      
      if (urlParams.query) {
        performSearch({
          query: urlParams.query,
          page: urlParams.page || 1,
          resultsPerPage,
          category: urlParams.category || 'all',
          sortBy: urlParams.sortBy || 'relevance'
        });
      } else {
        setSearchResponse(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [resultsPerPage]);

  // Enhanced search function with error handling
  const performSearch = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await searchService.search(params);
      setSearchResponse(response);
      
      // Track search activity
      activityTracker.trackSearch(
        params.query, 
        response.totalResults, 
        params.category !== 'all' ? params.category : undefined
      );
      
      // Update URL
      searchURLManager.updateURL(params);
      
    } catch (err) {
      setError('Error al realizar la búsqueda. Por favor, intenta nuevamente.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search for real-time updates
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    
    if (newQuery.trim()) {
      debouncedSearch.execute(() => {
        const params: SearchParams = {
          query: newQuery,
          page: 1,
          resultsPerPage,
          category: filter,
          sortBy
        };
        performSearch(params);
        setCurrentPage(1);
      });
    } else {
      debouncedSearch.cancel();
      setSearchResponse(null);
      searchURLManager.clearURL();
    }
  }, [filter, sortBy, resultsPerPage, performSearch, debouncedSearch]);

  // Handle form submission (Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      debouncedSearch.cancel();
      const params: SearchParams = {
        query,
        page: 1,
        resultsPerPage,
        category: filter,
        sortBy
      };
      performSearch(params);
      setCurrentPage(1);
    }
  };

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    if (!searchResponse || newPage < 1 || newPage > searchResponse.totalPages) return;
    
    setCurrentPage(newPage);
    const params: SearchParams = {
      query,
      page: newPage,
      resultsPerPage,
      category: filter,
      sortBy
    };
    performSearch(params);
    
    // Scroll to top of results
    const resultsElement = document.getElementById('search-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [query, resultsPerPage, filter, sortBy, searchResponse, performSearch]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
    
    if (query.trim()) {
      const params: SearchParams = {
        query,
        page: 1,
        resultsPerPage,
        category: newFilter,
        sortBy
      };
      performSearch(params);
    }
  }, [query, resultsPerPage, sortBy, performSearch]);

  // Handle sort changes
  const handleSortChange = useCallback((newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    
    if (query.trim()) {
      const params: SearchParams = {
        query,
        page: 1,
        resultsPerPage,
        category: filter,
        sortBy: newSort
      };
      performSearch(params);
    }
  }, [query, resultsPerPage, filter, performSearch]);

  // Load more results (infinite scroll mode)
  const handleLoadMore = useCallback(() => {
    if (!searchResponse || !searchResponse.hasNextPage || loading) return;
    
    const nextPage = searchResponse.currentPage + 1;
    setShowLoadMore(true);
    
    const params: SearchParams = {
      query,
      page: nextPage,
      resultsPerPage,
      category: filter,
      sortBy
    };
    
    // For load more, we append results instead of replacing
    performSearch(params).then(() => {
      setShowLoadMore(false);
    });
  }, [query, resultsPerPage, filter, sortBy, searchResponse, loading, performSearch]);

  // Helper functions
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

  // Get current results for display
  const results = searchResponse?.results || [];
  const totalResults = searchResponse?.totalResults || 0;
  const totalPages = searchResponse?.totalPages || 0;
  const hasNextPage = searchResponse?.hasNextPage || false;
  const hasPreviousPage = searchResponse?.hasPreviousPage || false;

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={e => handleQueryChange(e.target.value)}
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
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleQueryChange(suggestion)}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors backdrop-blur"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section */}
      {(results.length > 0 || error) && (
        <div className="space-y-6" id="search-results">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <span>⚠️</span>
                <span className="font-medium">Error de búsqueda</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  if (query.trim()) {
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }
                }}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Controls */}
          {!error && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">
                    📊 {totalResults.toLocaleString()} resultados para "{query}"
                    {totalResults >= searchService.getConfig().maxResults && (
                      <span className="text-sm text-amber-600 ml-2">
                        (limitado a {searchService.getConfig().maxResults.toLocaleString()})
                      </span>
                    )}
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
                  </select>

                  {/* Sort options */}
                  <select
                    value={sortBy}
                    onChange={e => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Por relevancia</option>
                    <option value="date">Por fecha</option>
                    <option value="category">Por categoría</option>
                    <option value="source">Por fuente</option>
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
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && !error && results.length > 0 && (
            <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {results.map((result) => (
                <div 
                  key={result.id} 
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer ${
                    displayMode === 'list' ? 'p-4' : 'p-6'
                  }`}
                  onClick={() => {
                    // Track view activity
                    activityTracker.trackView(result.title, result.category);
                    // In a real app, navigate to the article detail
                    console.log('Opening article:', result.title);
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
                          result.category === 'Tecnología' ? 'bg-indigo-100 text-indigo-800' :
                          result.category === 'Economía' ? 'bg-yellow-100 text-yellow-800' :
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
          {!loading && !error && totalPages > 1 && (
            <div className="space-y-4">
              {/* Main pagination controls */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  ⏮️ Primera
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPreviousPage}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  ← Anterior
                </button>
                
                {/* Page numbers */}
                <div className="flex gap-1">
                  {(() => {
                    const pages = [];
                    const maxVisible = 5;
                    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                    
                    // Adjust start if we're near the end
                    if (endPage - startPage + 1 < maxVisible) {
                      startPage = Math.max(1, endPage - maxVisible + 1);
                    }
                    
                    // Add first page and ellipsis if needed
                    if (startPage > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => handlePageChange(1)}
                          className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          1
                        </button>
                      );
                      if (startPage > 2) {
                        pages.push(<span key="start-ellipsis" className="px-2 py-2 text-gray-500">...</span>);
                      }
                    }
                    
                    // Add visible page numbers
                    for (let i = startPage; i <= endPage; i++) {
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
                    
                    // Add last page and ellipsis if needed
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(<span key="end-ellipsis" className="px-2 py-2 text-gray-500">...</span>);
                      }
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {totalPages}
                        </button>
                      );
                    }
                    
                    return pages;
                  })()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  Siguiente →
                </button>
                
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  Última ⏭️
                </button>
              </div>
              
              {/* Page info and jump to page */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>
                  Página {currentPage} de {totalPages} 
                  ({totalResults.toLocaleString()} resultados total)
                </span>
                
                {/* Quick page jump */}
                <div className="flex items-center gap-2">
                  <span>Ir a página:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const page = parseInt(e.currentTarget.value);
                        if (page >= 1 && page <= totalPages) {
                          handlePageChange(page);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Load more option */}
              {hasNextPage && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={showLoadMore}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {showLoadMore ? '⏳ Cargando...' : '📄 Cargar más resultados'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6">
            No hay resultados para "{query}". Intenta con otros términos de búsqueda o explora las sugerencias populares.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setQuery('');
                setSearchResponse(null);
                searchURLManager.clearURL();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nueva búsqueda
            </button>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Prueba con estos términos populares:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleQueryChange(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
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