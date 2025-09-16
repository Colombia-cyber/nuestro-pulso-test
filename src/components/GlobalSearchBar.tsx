import React, { useState, useEffect, useRef } from 'react';
import { searchService, SearchResult, SearchResponse } from '../services/searchService';
import { getSearchCategories, getCategoryById } from '../config/categories';

interface GlobalSearchBarProps {
  initialQuery?: string;
  onResults?: (response: SearchResponse) => void;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  showResults?: boolean;
}

/**
 * GlobalSearchBar - Enhanced universal search component for homepage
 * 
 * This component provides comprehensive global search functionality:
 * - Google and Bing search results
 * - NewsAPI integration
 * - International news sources
 * - Local Colombian database
 * - Rich result formatting (Google-style layout)
 * - Advanced filtering (Colombia, Latin America, World)
 * 
 * Key Features:
 * - Global-first approach with regional filtering
 * - Rich result types (news, articles, analysis)
 * - Multiple source aggregation
 * - Google-style result presentation
 * 
 * Used in: Homepage/HeroSection for comprehensive search experience
 */
const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  initialQuery = '',
  onResults,
  onSearch,
  autoFocus = false,
  showResults = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [regionalFilter, setRegionalFilter] = useState<'world' | 'latin-america' | 'colombia'>('world');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Get global search suggestions
  useEffect(() => {
    if (query.length > 1) {
      const globalSuggestions = getGlobalSearchSuggestions(query);
      setSuggestions(globalSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Get global search suggestions with regional context
  const getGlobalSearchSuggestions = (searchQuery: string): string[] => {
    const globalSuggestions = [
      'Trump Colombia relations',
      'Latin America politics',
      'Colombia international news',
      'World economic impact',
      'Global democracy trends',
      'International human rights',
      'Climate change Latin America',
      'Trade agreements Colombia',
      'Regional security issues',
      'Global migration patterns'
    ];

    if (!searchQuery.trim()) {
      return globalSuggestions.slice(0, 6);
    }

    // Add dynamic suggestions based on regional filter
    const regionalContext = regionalFilter === 'colombia' ? 'Colombia' : 
                           regionalFilter === 'latin-america' ? 'Latin America' : 
                           'global';
    
    const dynamicSuggestions = [
      `${searchQuery} ${regionalContext}`,
      `${searchQuery} international`,
      `${searchQuery} news analysis`,
      `${searchQuery} global impact`,
      `${searchQuery} latest developments`
    ].filter(suggestion => suggestion.toLowerCase() !== searchQuery.toLowerCase());

    const filtered = globalSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered, ...dynamicSuggestions].slice(0, 5);
  };

  // Perform global search with regional filtering
  const performGlobalSearch = async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    
    try {
      // Enhance query based on regional filter
      const enhancedQuery = enhanceQueryWithRegionalContext(searchQuery, regionalFilter);
      
      const response = await searchService.search({
        query: enhancedQuery,
        page,
        category: undefined, // Global search doesn't use category filtering
        sortBy: 'relevance',
        includeAdvanced: true, // Enable advanced features for global search
        searchMode: 'global' // Use global search mode
      });

      // Filter results based on regional preference if needed
      const filteredResults = filterResultsByRegion(response.results, regionalFilter);
      
      setResults(filteredResults);
      setTotalResults(response.totalResults);
      setSearchTime(response.searchTime);
      setCurrentPage(page);
      
      if (onResults) {
        onResults({
          ...response,
          results: filteredResults
        });
      }
      
      if (onSearch) {
        onSearch(searchQuery);
      }
    } catch (error) {
      console.error('Global search failed:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Enhance query with regional context
  const enhanceQueryWithRegionalContext = (searchQuery: string, filter: string): string => {
    switch (filter) {
      case 'colombia':
        return `${searchQuery} Colombia OR Colombian`;
      case 'latin-america':
        return `${searchQuery} "Latin America" OR "South America" OR Colombia OR Brazil OR Argentina OR Mexico`;
      case 'world':
      default:
        return searchQuery; // Keep original query for global search
    }
  };

  // Filter results based on regional preference
  const filterResultsByRegion = (results: SearchResult[], filter: string): SearchResult[] => {
    if (filter === 'world') {
      return results; // No filtering for global results
    }

    return results.filter(result => {
      const content = `${result.title} ${result.summary} ${result.source}`.toLowerCase();
      
      switch (filter) {
        case 'colombia':
          return content.includes('colombia') || content.includes('colombian') || 
                 content.includes('bogotá') || content.includes('medellín');
        case 'latin-america':
          return content.includes('latin america') || content.includes('south america') ||
                 content.includes('colombia') || content.includes('brazil') ||
                 content.includes('argentina') || content.includes('mexico') ||
                 content.includes('chile') || content.includes('peru');
        default:
          return true;
      }
    });
  };

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    await performGlobalSearch(query, 1);
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
    performGlobalSearch(suggestion, 1);
  };

  // Handle regional filter change
  const handleRegionalFilterChange = (filter: 'world' | 'latin-america' | 'colombia') => {
    setRegionalFilter(filter);
    if (query) {
      performGlobalSearch(query, 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as any);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Get regional filter icon and name
  const getRegionalFilterInfo = (filter: string) => {
    switch (filter) {
      case 'colombia':
        return { icon: '🇨🇴', name: 'Colombia' };
      case 'latin-america':
        return { icon: '🌎', name: 'América Latina' };
      case 'world':
      default:
        return { icon: '🌍', name: 'Mundial' };
    }
  };

  const currentFilterInfo = getRegionalFilterInfo(regionalFilter);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Global Search Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <span className="text-3xl">🌍</span>
          Búsqueda Global
          <span className="text-3xl">🔍</span>
        </h2>
        <p className="text-white/90 text-sm md:text-base">
          Busca información mundial, noticias internacionales y análisis global
        </p>
      </div>

      {/* Search Form */}
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
                placeholder="Buscar noticias mundiales, políticas globales, análisis internacional..."
                className="w-full p-4 pr-12 rounded-lg text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none bg-white"
                aria-label="Campo de búsqueda global"
                aria-describedby="global-search-help"
              />
              
              {/* Global search icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl pointer-events-none">
                🌍
              </div>
              
              {/* Search suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="px-3 py-2 bg-blue-50 border-b border-blue-200 text-xs text-blue-800 font-medium">
                    🌍 Búsqueda Global ({currentFilterInfo.icon} {currentFilterInfo.name})
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 text-sm text-gray-700 focus:bg-blue-50 focus:outline-none"
                    >
                      <span className="text-blue-600 mr-2">🔍</span>
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
              aria-label="Ejecutar búsqueda global"
            >
              {loading ? '🔄' : '🔍'} Buscar
            </button>
          </div>
        </div>

        {/* Regional Filter Options */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-white/80 text-sm mr-2 py-2">Filtrar por región:</span>
          
          <button
            type="button"
            onClick={() => handleRegionalFilterChange('world')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              regionalFilter === 'world' 
                ? 'bg-white text-blue-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🌍 Mundial
          </button>
          
          <button
            type="button"
            onClick={() => handleRegionalFilterChange('latin-america')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              regionalFilter === 'latin-america' 
                ? 'bg-white text-blue-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🌎 América Latina
          </button>
          
          <button
            type="button"
            onClick={() => handleRegionalFilterChange('colombia')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              regionalFilter === 'colombia' 
                ? 'bg-white text-blue-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🇨🇴 Colombia
          </button>
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="mt-4">
        <p className="text-sm text-white/80 mb-2">Búsquedas populares globales:</p>
        <div className="flex flex-wrap gap-2">
          {['Trump', 'International politics', 'Global economy', 'Climate change', 'World news'].map((suggestion) => (
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

      {/* Results Summary (if showResults is true) */}
      {showResults && totalResults > 0 && (
        <div className="mt-6 p-4 bg-white/10 backdrop-blur rounded-lg text-white">
          <p className="text-sm">
            📊 {totalResults} resultados globales para "{query}" 
            {searchTime > 0 && (
              <span className="text-white/80 ml-2">
                ({searchTime}ms)
              </span>
            )}
            <span className="ml-2">({currentFilterInfo.icon} {currentFilterInfo.name})</span>
          </p>
        </div>
      )}

      {/* Help text */}
      <p id="global-search-help" className="sr-only">
        Búsqueda global que incluye resultados de Google, Bing, NewsAPI, fuentes internacionales,
        y base de datos local. Puede filtrar por región: Mundial, América Latina, o Colombia.
      </p>
    </div>
  );
};

export default GlobalSearchBar;