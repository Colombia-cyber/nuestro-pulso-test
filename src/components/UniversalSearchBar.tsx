import React, { useState, useEffect, useCallback, useRef } from 'react';
import { activityTracker } from '../services/ActivityTracker';
import { searchService, SearchResult, SearchResponse } from '../services/searchService';
import { getSearchCategories, getCategoryById } from '../config/categories';
import Pagination from './Pagination';
import SearchResultsPage from './SearchResultsPage';

interface UniversalSearchBarProps {
  initialQuery?: string;
  initialCategory?: string;
  onResults?: (response: SearchResponse) => void;
  compact?: boolean;
  autoFocus?: boolean;
}

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({
  initialQuery = '',
  initialCategory = 'todos',
  onResults,
  compact = false,
  autoFocus = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [searchTime, setSearchTime] = useState(0);
  const [searchSource, setSearchSource] = useState<'proxy' | 'fallback' | 'mock'>('mock');
  const [showUniversalResults, setShowUniversalResults] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const categories = getSearchCategories();
  const allCategories = [{ id: 'todos', name: 'Todas las categorías', icon: '📊' }, ...categories];

  // Auto focus input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Load URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    const urlPage = urlParams.get('page');
    const urlCategory = urlParams.get('category');

    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
    if (urlPage && parseInt(urlPage) !== currentPage) {
      setCurrentPage(parseInt(urlPage));
    }
    if (urlCategory && urlCategory !== filter) {
      setFilter(urlCategory);
    }
  }, []);

  // Update URL when search parameters change
  const updateURL = useCallback((searchQuery: string, page: number, category: string) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (page > 1) params.set('page', page.toString());
    if (category && category !== 'todos') params.set('category', category);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (query.length > 1) {
      const getSuggestions = async () => {
        const suggestions = await searchService.getSearchSuggestions(query);
        setSuggestions(suggestions);
      };
      getSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Perform search
  const performSearch = useCallback(async (searchQuery: string, page = 1, category = filter, appendResults = false) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setAllResults([]);
      setTotalResults(0);
      setTotalPages(0);
      setHasMore(false);
      return;
    }

    if (!appendResults) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    
    try {
      const response = await searchService.search({
        query: searchQuery,
        page,
        category: category !== 'todos' ? category : undefined,
        sortBy: sortBy as 'relevance' | 'date' | 'category'
      });

      if (appendResults && infiniteScrollEnabled) {
        // Append new results for infinite scroll
        const combinedResults = [...allResults, ...response.results];
        setAllResults(combinedResults);
        setResults(combinedResults);
      } else {
        // Replace results for normal pagination
        setResults(response.results);
        setAllResults(response.results);
      }
      
      setTotalResults(response.totalResults);
      setTotalPages(response.totalPages);
      setHasMore(response.hasMore);
      setSearchTime(response.searchTime);
      setSearchSource(response.source);
      setCurrentPage(page);

      // Set search response for universal results page
      setSearchResponse(response);
      setShowUniversalResults(true);

      // Update URL
      updateURL(searchQuery, page, category);

      // Track search activity
      activityTracker.trackSearch(searchQuery, response.totalResults, category !== 'todos' ? category : undefined);

      // Call callback if provided
      if (onResults) {
        onResults(response);
      }

      // Scroll to results if not on first page and not infinite scroll
      if (page > 1 && !infiniteScrollEnabled && searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }

    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setAllResults([]);
      setTotalResults(0);
      setTotalPages(0);
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [filter, sortBy, updateURL, onResults, infiniteScrollEnabled, allResults]);

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    await performSearch(query, 1, filter);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 1);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion, 1, filter);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (infiniteScrollEnabled) {
      // For infinite scroll, load more results
      performSearch(query, page, filter, true);
    } else {
      // For traditional pagination, replace results
      performSearch(query, page, filter, false);
    }
  };

  // Handle load more for infinite scroll
  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      handlePageChange(currentPage + 1);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setAllResults([]);
    if (query) {
      performSearch(query, 1, newFilter, false);
    }
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    setAllResults([]);
    if (query) {
      performSearch(query, 1, filter, false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as any);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setShowSuggestions(true);
      // Focus first suggestion (implement if needed)
    }
  };

  // Toggle expanded result
  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  // Format time ago
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  // Handle search from the universal results page
  const handleUniversalSearch = (newQuery: string, filters?: any) => {
    setQuery(newQuery);
    setShowSuggestions(false);
    performSearch(newQuery, 1, filter);
  };

  // Handle back to search form
  const handleBackToSearch = () => {
    setShowUniversalResults(false);
    setSearchResponse(null);
    setResults([]);
    setAllResults([]);
  };

  // Get popular suggestions
  const popularSuggestions = searchService.getPopularQueries();

  // Show universal search results page when we have results
  if (showUniversalResults && searchResponse) {
    return (
      <SearchResultsPage
        searchResponse={searchResponse}
        query={query}
        onSearch={handleUniversalSearch}
      />
    );
  }

  if (compact) {
    return (
      <div className="relative">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(query.length > 1)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Buscar noticias, políticas, candidatos..."
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              aria-label="Campo de búsqueda"
              aria-describedby="search-suggestions"
            />
            
            {/* Search suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                  >
                    <span className="text-gray-400 mr-2">🔍</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Buscar"
          >
            {loading ? '🔄' : '🔍'}
          </button>
        </form>
      </div>
    );
  }

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
          <div className="relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(query.length > 1)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="Buscar noticias, políticas, candidatos, reformas..."
                  className="w-full p-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                  aria-label="Campo de búsqueda principal"
                  aria-describedby="search-help"
                />
                
                {/* Search suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm text-gray-700 focus:bg-gray-50 focus:outline-none"
                        role="option"
                        aria-selected={false}
                      >
                        <span className="text-gray-400 mr-2">🔍</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
                aria-label="Ejecutar búsqueda"
              >
                {loading ? '🔄' : '🔍'} Buscar
              </button>
            </div>
          </div>
        </form>

        {/* Quick search suggestions */}
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-2" id="search-help">Búsquedas populares:</p>
          <div className="flex flex-wrap gap-2">
            {popularSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors backdrop-blur focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section */}
      {(results.length > 0 || loading) && (
        <div className="space-y-6" ref={searchResultsRef}>
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">
                  📊 {totalResults} resultados para "{query}"
                  {searchTime > 0 && (
                    <span className="text-gray-500 ml-2">
                      ({searchTime}ms - {searchSource === 'proxy' ? 'servidor' : searchSource === 'fallback' ? 'datos populares' : 'datos locales'})
                    </span>
                  )}
                </span>
                
                {/* Category filter */}
                <select
                  value={filter}
                  onChange={e => handleFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Filtrar por categoría"
                >
                  {allCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort options */}
                <select
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Ordenar resultados"
                >
                  <option value="relevance">Por relevancia</option>
                  <option value="date">Por fecha</option>
                  <option value="category">Por categoría</option>
                </select>
              </div>

              {/* Display mode toggle */}
              <div className="flex items-center gap-2" role="group" aria-label="Modo de visualización">
                <button
                  onClick={() => setDisplayMode('cards')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    displayMode === 'cards' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-pressed={displayMode === 'cards'}
                >
                  🔲 Tarjetas
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    displayMode === 'list' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-pressed={displayMode === 'list'}
                >
                  📄 Lista
                </button>
                
                {/* Infinite scroll toggle */}
                <button
                  onClick={() => {
                    setInfiniteScrollEnabled(!infiniteScrollEnabled);
                    setCurrentPage(1);
                    setAllResults([]);
                    if (query) {
                      performSearch(query, 1, filter, false);
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    infiniteScrollEnabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-pressed={infiniteScrollEnabled}
                  title={infiniteScrollEnabled ? 'Desactivar scroll infinito' : 'Activar scroll infinito'}
                >
                  {infiniteScrollEnabled ? '∞ Infinito' : '📄 Páginas'}
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {results.map((result) => (
                <article 
                  key={result.id} 
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 ${
                    displayMode === 'list' ? 'p-4' : 'p-6'
                  }`}
                >
                  <div className={displayMode === 'list' ? 'flex items-start gap-4' : ''}>
                    {/* Image/Icon */}
                    <div className={`${displayMode === 'list' ? 'text-3xl' : 'text-4xl text-center mb-4'}`} aria-hidden="true">
                      {result.image}
                    </div>

                    <div className="flex-1">
                      {/* Category and timestamp */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                          result.category === 'internacional' ? 'bg-green-100 text-green-800' :
                          result.category === 'social' ? 'bg-purple-100 text-purple-800' :
                          result.category === 'seguridad' ? 'bg-red-100 text-red-800' :
                          result.category === 'tecnologia' ? 'bg-gray-100 text-gray-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getCategoryById(result.category)?.name || result.category}
                        </span>
                        <time className="text-xs text-gray-500" dateTime={result.timestamp}>
                          {formatTimeAgo(result.timestamp)}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer focus:outline-none focus:text-blue-600 ${
                        displayMode === 'list' ? 'text-lg' : 'text-xl'
                      }`}
                      tabIndex={0}
                      role="button"
                      onClick={() => result.url && window.open(result.url, '_blank')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          result.url && window.open(result.url, '_blank');
                        }
                      }}
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
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          >
                            {expandedResults.has(result.id) ? '▲ Menos' : '▼ Más'}
                          </button>
                          <span className="text-gray-300" aria-hidden="true">•</span>
                          <span className="text-sm text-gray-500">{result.source}</span>
                          {result.author && (
                            <>
                              <span className="text-gray-300" aria-hidden="true">•</span>
                              <span className="text-sm text-gray-500">{result.author}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Relevancia:</span>
                          <span className="text-xs font-medium text-blue-600">{result.relevanceScore}%</span>
                        </div>
                      </div>

                      {/* Tags if expanded */}
                      {expandedResults.has(result.id) && result.tags && result.tags.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap gap-1">
                            {result.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && results.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasMore={hasMore}
              onPageChange={handlePageChange}
              onLoadMore={handleLoadMore}
              showLoadMore={infiniteScrollEnabled}
              loading={isLoadingMore}
              className="mt-8"
            />
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
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Nueva búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default UniversalSearchBar;