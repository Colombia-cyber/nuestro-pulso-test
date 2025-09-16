import React, { useState, useEffect, useRef } from 'react';
import { searchService, SearchResult } from '../services/searchService';

interface LocalSearchBarProps {
  initialQuery?: string;
  onResults?: (results: SearchResult[]) => void;
  compact?: boolean;
  autoFocus?: boolean;
}

/**
 * LocalSearchBar - Colombian-focused search component
 * 
 * This component provides search functionality focused exclusively on Colombian content:
 * - Local Colombian news sources
 * - Internal articles and discussions
 * - Colombian civic data
 * - Local polls and debates
 * 
 * Does NOT include:
 * - Google/Bing API results
 * - International news sources
 * - Global search results
 * 
 * Used in: Navbar for quick Colombian content access
 */
const LocalSearchBar: React.FC<LocalSearchBarProps> = ({
  initialQuery = '',
  onResults,
  compact = false,
  autoFocus = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Get local search suggestions
  useEffect(() => {
    if (query.length > 1) {
      const localSuggestions = getLocalSearchSuggestions(query);
      setSuggestions(localSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Get Colombian-focused search suggestions
  const getLocalSearchSuggestions = (searchQuery: string): string[] => {
    const colombianSuggestions = [
      'Gustavo Petro',
      'Congreso Colombia',
      'Alcaldías Colombia',
      'Elecciones regionales',
      'Reforma pensional',
      'Seguridad Colombia',
      'Participación ciudadana',
      'Centro Democrático',
      'Cambio Radical',
      'Partidos políticos Colombia',
      'Consejo Nacional Electoral',
      'Registraduría Nacional'
    ];

    if (!searchQuery.trim()) {
      return colombianSuggestions.slice(0, 6);
    }

    // Filter suggestions based on query and add dynamic ones
    const filtered = colombianSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const dynamicSuggestions = [
      `${searchQuery} Colombia`,
      `${searchQuery} política colombiana`,
      `${searchQuery} noticias Colombia`,
      `${searchQuery} debate Colombia`
    ].filter(suggestion => suggestion.toLowerCase() !== searchQuery.toLowerCase());

    return [...filtered, ...dynamicSuggestions].slice(0, 5);
  };

  // Perform local search
  const performLocalSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    try {
      // Use search service with local mode
      const response = await searchService.search({
        query: searchQuery,
        searchMode: 'local'
      });
      
      setResults(response.results);
      
      if (onResults) {
        onResults(response.results);
      }
    } catch (error) {
      console.error('Local search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Mock local search results - focused on Colombian content
  const getLocalSearchResults = async (searchQuery: string): Promise<SearchResult[]> => {
    // This is now handled by the search service
    return [];
  };

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    await performLocalSearch(query);
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
    performLocalSearch(suggestion);
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

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(query.length > 1)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Buscar en Colombia 🇨🇴"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none bg-yellow-50"
              aria-label="Búsqueda local en Colombia"
              aria-describedby="local-search-help"
            />
            {/* Colombia flag icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600">
              🇨🇴
            </div>
          </div>
          
          {/* Search suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-yellow-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              <div className="px-3 py-2 bg-yellow-50 border-b border-yellow-200 text-xs text-yellow-800 font-medium">
                🇨🇴 Contenido Colombiano
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-yellow-50 border-b border-gray-100 last:border-b-0 text-sm focus:bg-yellow-50 focus:outline-none"
                >
                  <span className="text-yellow-600 mr-2">🔍</span>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {compact && (
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label="Buscar contenido colombiano"
            title="Buscar solo contenido colombiano"
          >
            {loading ? '🔄' : '🔍'}
          </button>
        )}
      </form>
      
      {/* Help text for local search */}
      <p id="local-search-help" className="sr-only">
        Búsqueda enfocada en contenido colombiano: noticias locales, debates del Congreso, 
        encuestas ciudadanas, y discusiones cívicas nacionales.
      </p>
    </div>
  );
};

export default LocalSearchBar;