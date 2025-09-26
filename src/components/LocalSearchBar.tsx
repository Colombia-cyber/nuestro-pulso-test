import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'location' | 'news' | 'person' | 'topic';
  icon: string;
}

interface LocalSearchBarProps {
  onSearch: (query: string, filters?: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  enableSuggestions?: boolean;
}

const LocalSearchBar: React.FC<LocalSearchBarProps> = ({
  onSearch,
  placeholder = "Buscar noticias locales, temas, políticos...",
  autoFocus = false,
  enableSuggestions = true
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Mock suggestions data - in real app, this would come from API
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'Gustavo Petro', type: 'person', icon: '👤' },
    { id: '2', text: 'Congreso de Colombia', type: 'topic', icon: '🏛️' },
    { id: '3', text: 'Bogotá', type: 'location', icon: '📍' },
    { id: '4', text: 'Seguridad Nacional', type: 'topic', icon: '🛡️' },
    { id: '5', text: 'Medellín', type: 'location', icon: '📍' },
    { id: '6', text: 'Reforma de salud', type: 'news', icon: '📰' },
    { id: '7', text: 'Narcotráfico', type: 'topic', icon: '⚠️' },
    { id: '8', text: 'Cali', type: 'location', icon: '📍' }
  ];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      // Filter suggestions based on input
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onSearch(suggestion.text, { type: suggestion.type });
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (query.length === 0 && recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        
        {query && (
          <button
            onClick={clearQuery}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
        >
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <FaHistory className="w-4 h-4" />
                <span className="font-semibold">Búsquedas recientes</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    onSearch(search);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    index === selectedIndex
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-xl">{suggestion.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{suggestion.text}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {suggestion.type === 'location' ? 'Ubicación' :
                       suggestion.type === 'person' ? 'Persona' :
                       suggestion.type === 'news' ? 'Noticia' : 'Tema'}
                    </div>
                  </div>
                  {suggestion.type === 'location' && (
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && suggestions.length === 0 && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <FaSearch className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No se encontraron sugerencias para "{query}"</p>
              <button
                onClick={handleSearch}
                className="mt-3 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Buscar de todas formas →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocalSearchBar;