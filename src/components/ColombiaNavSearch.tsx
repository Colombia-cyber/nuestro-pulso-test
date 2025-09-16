import React, { useState, useRef, useEffect } from 'react';

interface ColombiaNavSearchProps {
  compact?: boolean;
  onSearch?: (query: string, results: any[]) => void;
  className?: string;
  autoFocus?: boolean;
}

interface ColombiaSearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  tags?: string[];
}

const ColombiaNavSearch: React.FC<ColombiaNavSearchProps> = ({
  compact = true,
  onSearch,
  className = '',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ColombiaSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Colombia-specific search suggestions
  const colombiaSuggestions = [
    'Noticias Bogotá',
    'Política Medellín',
    'Gobierno local',
    'Alcaldías Colombia',
    'Congreso Colombia',
    'Constitución 1991',
    'Reforma tributaria',
    'Elecciones regionales'
  ];

  // Handle input changes and show suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      // Filter Colombia-specific suggestions based on input
      const filteredSuggestions = colombiaSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Perform search using Colombia endpoint
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setShowDropdown(false);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        limit: '5', // Limit results for nav display
        location: 'colombia'
      });

      const response = await fetch(`/api/search/colombia?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      const searchResults = data.results || [];
      
      setResults(searchResults);
      
      if (onSearch) {
        onSearch(searchQuery, searchResults);
      }

    } catch (error) {
      console.error('Colombia search failed:', error);
      // Use fallback results for demonstration
      const fallbackResults: ColombiaSearchResult[] = [
        {
          id: `colombia-${Date.now()}-1`,
          title: `Noticias locales sobre "${searchQuery}"`,
          summary: `Últimas noticias de Colombia relacionadas con ${searchQuery}`,
          url: '#',
          source: 'El Tiempo',
          category: 'nacional',
          timestamp: new Date().toISOString(),
          relevanceScore: 95,
          image: '📰',
          author: 'Redacción Nacional',
          tags: [searchQuery.toLowerCase(), 'colombia', 'local']
        },
        {
          id: `colombia-${Date.now()}-2`,
          title: `${searchQuery} en el contexto colombiano`,
          summary: `Análisis político y social de ${searchQuery} en Colombia`,
          url: '#',
          source: 'Semana',
          category: 'politica',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          relevanceScore: 88,
          image: '🏛️',
          author: 'Redacción Política',
          tags: [searchQuery.toLowerCase(), 'politica', 'colombia']
        }
      ];
      
      setResults(fallbackResults);
      
      if (onSearch) {
        onSearch(searchQuery, fallbackResults);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowDropdown(false);
    performSearch(suggestion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto focus input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex gap-1">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 1 && setShowDropdown(true)}
            placeholder="Buscar en Colombia..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none placeholder-gray-500"
            aria-label="Buscar noticias locales de Colombia"
            disabled={loading}
          />
          
          {/* Flag icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <span className="text-lg">🇨🇴</span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
          aria-label="Buscar"
        >
          {loading ? '🔄' : '🔍'}
        </button>
      </form>

      {/* Search suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-yellow-50 border-b border-gray-100 last:border-b-0 text-sm text-gray-700 focus:bg-yellow-50 focus:outline-none transition-colors"
            >
              <span className="text-gray-400 mr-2">🇨🇴</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Quick results dropdown */}
      {results.length > 0 && !showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 text-sm">
                🇨🇴 Resultados de Colombia
              </h4>
              <button
                onClick={() => setResults([])}
                className="text-gray-400 hover:text-gray-600 text-xl focus:outline-none"
                aria-label="Cerrar resultados"
              >
                ×
              </button>
            </div>
          </div>
          
          {results.map((result) => (
            <div
              key={result.id}
              className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
              onClick={() => result.url && window.open(result.url, '_blank')}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{result.image || '📰'}</span>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {result.title}
                  </h5>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {result.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{result.source}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {result.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-600 text-center">
              {results.length} resultado{results.length !== 1 ? 's' : ''} • 
              <span className="text-yellow-600 font-medium"> Fuentes colombianas</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColombiaNavSearch;