import React, { useState, useEffect, useCallback, useRef } from 'react';
import { activityTracker } from '../services/ActivityTracker';
import { searchDataService, SearchResult } from '../services/SearchDataService';

interface UniversalSearchBarProps {
  compact?: boolean;
  onNavigate?: (view: string) => void;
  onClose?: () => void;
}

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({ 
  compact = false, 
  onNavigate,
  onClose 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resultsPerPage = compact ? 3 : 6;

  // Mock search function with pagination
  const performSearch = async (searchQuery: string, page: number = 1): Promise<void> => {
    setLoading(true);
    
    try {
      const searchData = await searchDataService.searchWithPagination(
        searchQuery, 
        page, 
        resultsPerPage,
        filter !== 'all' ? filter : undefined
      );
      
      if (page === 1) {
        setResults(searchData.results);
      } else {
        setResults(prev => [...prev, ...searchData.results]);
      }
      
      setTotalResults(searchData.totalResults);
      setTotalPages(searchData.totalPages);
      setHasMore(searchData.hasMore);
      setCurrentPage(searchData.currentPage);
      
    } catch (error) {
      console.error('Search error:', error);
      
      // Fallback to basic search if service fails
      if (searchQuery.toLowerCase().includes('terror')) {
        const fallbackData = searchDataService.addFallbackData('terror', resultsPerPage);
        setResults(fallbackData);
        setTotalResults(fallbackData.length);
        setTotalPages(1);
        setHasMore(false);
      } else {
        setResults([]);
        setTotalResults(0);
        setTotalPages(1);
        setHasMore(false);
      }
    }
    
    setLoading(false);
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      searchTimeoutRef.current = window.setTimeout(async () => {
        if (searchQuery.trim()) {
          await performSearch(searchQuery, 1);
          
          // Track search activity
          activityTracker.trackSearch(searchQuery, totalResults, filter !== 'all' ? filter : undefined);
        } else {
          setResults([]);
          setTotalResults(0);
          setTotalPages(1);
          setHasMore(false);
        }
      }, 300);
    },
    [filter, totalResults]
  );

  // Effect for auto-search while typing
  useEffect(() => {
    debouncedSearch(query);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, debouncedSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    await performSearch(query, 1);
    
    // Track search activity
    activityTracker.trackSearch(query, totalResults, filter !== 'all' ? filter : undefined);
  };

  const handleLoadMore = async () => {
    if (!hasMore || loading) return;
    await performSearch(query, currentPage + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(newQuery.length > 0);
  };

  const handleResultClick = (result: SearchResult) => {
    if (onNavigate) {
      // Navigate to appropriate detail view based on category
      switch (result.category.toLowerCase()) {
        case 'política':
        case 'politica':
          onNavigate('news');
          break;
        case 'social':
          onNavigate('community-hub');
          break;
        default:
          onNavigate('news');
      }
    }
    
    if (onClose && compact) {
      onClose();
    }
    
    // Track activity
    activityTracker.trackView(result.title, result.category);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
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

  const getPopularSuggestions = () => {
    return searchDataService.getPopularSearchTerms();
  };

  return (
    <div className={`max-w-6xl mx-auto ${compact ? 'max-w-md' : ''}`}>
      {/* Compact Search Bar for Navbar */}
      {compact ? (
        <div className="relative">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(query.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Buscar..."
              className="w-full p-2 pl-8 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              aria-label="Search input"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            {loading && (
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin">
                🔄
              </span>
            )}
          </form>

          {/* Quick Suggestions Dropdown */}
          {showSuggestions && !loading && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
              {query.length > 0 && (
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2">Sugerencias:</div>
                  {getPopularSuggestions()
                    .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 5)
                    .map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm"
                      >
                        🔍 {suggestion}
                      </button>
                    ))}
                </div>
              )}
              
              {results.length > 0 && (
                <div className="border-t border-gray-200 p-2">
                  <div className="text-xs text-gray-500 mb-2">Resultados rápidos:</div>
                  {results.slice(0, 3).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm border-l-2 border-blue-500"
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-gray-500 truncate">{result.summary}</div>
                    </button>
                  ))}
                  {results.length > 3 && (
                    <div className="text-xs text-gray-500 p-2">
                      +{results.length - 3} más resultados...
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Full Search Interface
        <>
          {/* Colombian-inspired header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-8 mb-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl" role="img" aria-label="Search">🔍</span>
              <div>
                <h1 className="text-3xl font-bold">Búsqueda Universal</h1>
                <p className="text-white/90">Explora toda la información cívica y política de Colombia</p>
              </div>
              <span className="text-4xl ml-auto" role="img" aria-label="Colombia flag">🇨🇴</span>
            </div>
            
            {/* Search form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  placeholder="Buscar noticias, políticas, candidatos, reformas..."
                  className="flex-1 p-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                  aria-label="Search for news, politics, candidates, reforms"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg"
                  aria-label="Search button"
                >
                  {loading ? '🔄' : '🔍'} Buscar
                </button>
              </div>
            </form>

            {/* Quick search suggestions */}
            <div className="mt-4">
              <p className="text-sm text-white/80 mb-2">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {getPopularSuggestions().slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
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
                </span>
                
                {/* Category filter */}
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="política">Política</option>
                  <option value="internacional">Internacional</option>
                  <option value="social">Social</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="tecnología">Tecnología</option>
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

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
            </div>
          )}

          {/* Results */}
          {!loading && (
            <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedResults.map((result: SearchResult) => (
                <div 
                  key={result.id} 
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 ${
                    displayMode === 'list' ? 'p-4' : 'p-6'
                  }`}
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
                      <h3 
                        className={`font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer ${
                          displayMode === 'list' ? 'text-lg' : 'text-xl'
                        }`}
                        onClick={() => handleResultClick(result)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleResultClick(result);
                          }
                        }}
                        aria-label={`Open article: ${result.title}`}
                      >
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
                            onClick={() => toggleExpanded(result.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            aria-label={expandedResults.has(result.id) ? 'Show less' : 'Show more'}
                          >
                            {expandedResults.has(result.id) ? '▲ Menos' : '▼ Más'}
                          </button>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{result.source}</span>
                          <button
                            onClick={() => handleResultClick(result)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium ml-2"
                            aria-label={`View details for ${result.title}`}
                          >
                            📖 Ver detalles
                          </button>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                ← Anterior
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
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
        </>
      )}
    </div>
  );
};

export default UniversalSearchBar;