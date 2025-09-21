import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaHistory } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { useOptimizedState } from '../hooks/useOptimizedState';
import { useDebounce, useThrottle } from '../hooks/usePerformanceHooks';
import { FastButton, FastInput } from './FastComponents';

/**
 * Ultra-fast search component with instant results
 * Part of fast-r7aqkx-228-d component series
 */
export interface FastSearchProps {
  onSearch?: (query: string, filters?: SearchFilters) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  enableHistory?: boolean;
  enableSuggestions?: boolean;
  maxSuggestions?: number;
  debounceMs?: number;
}

export interface SearchFilters {
  category?: string;
  dateRange?: 'today' | 'week' | 'month' | 'year';
  sortBy?: 'relevance' | 'date' | 'popularity';
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'trending' | 'suggestion';
  count?: number;
  category?: string;
}

const MOCK_SUGGESTIONS: SearchSuggestion[] = [
  { id: '1', text: 'Reforma Pensional 2024', type: 'trending', count: 15420, category: 'Política' },
  { id: '2', text: 'Gustavo Petro', type: 'trending', count: 12380, category: 'Gobierno' },
  { id: '3', text: 'Elecciones Regionales', type: 'trending', count: 9850, category: 'Electoral' },
  { id: '4', text: 'Seguridad Nacional', type: 'suggestion', count: 8920, category: 'Seguridad' },
  { id: '5', text: 'Economía Colombiana', type: 'suggestion', count: 7640, category: 'Economía' },
];

const MOCK_HISTORY: SearchSuggestion[] = [
  { id: 'h1', text: 'congreso colombia', type: 'history' },
  { id: 'h2', text: 'elecciones 2024', type: 'history' },
  { id: 'h3', text: 'paz total', type: 'history' },
];

const FastSearchComponent: React.FC<FastSearchProps> = ({
  onSearch,
  onSuggestionClick,
  placeholder = 'Buscar en Colombia y el mundo...',
  autoFocus = false,
  className = '',
  enableHistory = true,
  enableSuggestions = true,
  maxSuggestions = 5,
  debounceMs = 150
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { value: query, setValue: setQuery } = useOptimizedState({
    defaultValue: '',
    enablePerformanceTracking: true
  });

  const { value: isOpen, setValue: setIsOpen } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  const { value: suggestions, setValue: setSuggestions } = useOptimizedState({
    defaultValue: [] as SearchSuggestion[],
    enablePerformanceTracking: true
  });

  const { value: selectedIndex, setValue: setSelectedIndex } = useOptimizedState({
    defaultValue: -1,
    enablePerformanceTracking: true
  });

  // Filter suggestions based on query
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) {
      return enableHistory ? MOCK_HISTORY.slice(0, maxSuggestions) : [];
    }

    const queryLower = query.toLowerCase();
    const filtered = MOCK_SUGGESTIONS.filter(suggestion =>
      suggestion.text.toLowerCase().includes(queryLower)
    ).slice(0, maxSuggestions);

    return filtered;
  }, [query, enableHistory, maxSuggestions]);

  // Debounced search function for performance
  const debouncedSearch = useDebounce(
    useCallback((searchQuery: string) => {
      if (searchQuery.trim() && onSearch) {
        onSearch(searchQuery);
      }
      setSuggestions(filteredSuggestions);
    }, [onSearch, filteredSuggestions, setSuggestions]),
    { delay: debounceMs }
  );

  // Throttled keyboard navigation for smooth UX
  const throttledKeyNavigation = useThrottle(
    useCallback((direction: 'up' | 'down') => {
      const maxIndex = filteredSuggestions.length - 1;
      setSelectedIndex(current => {
        if (direction === 'down') {
          return current < maxIndex ? current + 1 : 0;
        } else {
          return current > 0 ? current - 1 : maxIndex;
        }
      });
    }, [filteredSuggestions.length, setSelectedIndex]),
    { delay: 50 }
  );

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(value.length > 0 || enableHistory);
    debouncedSearch(value);
  }, [setQuery, setSelectedIndex, setIsOpen, enableHistory, debouncedSearch]);

  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    
    if (onSearch) {
      onSearch(suggestion.text);
    }
  }, [setQuery, setIsOpen, setSelectedIndex, onSuggestionClick, onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        throttledKeyNavigation('down');
        break;
      case 'ArrowUp':
        e.preventDefault();
        throttledKeyNavigation('up');
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        } else if (query.trim()) {
          setIsOpen(false);
          if (onSearch) onSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  }, [isOpen, filteredSuggestions, selectedIndex, throttledKeyNavigation, handleSuggestionClick, query, setIsOpen, setSelectedIndex, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    setSuggestions([]);
  }, [setQuery, setIsOpen, setSelectedIndex, setSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen, setSelectedIndex]);

  const containerClasses = useMemo(() => {
    return [
      'relative w-full max-w-2xl mx-auto',
      className
    ].filter(Boolean).join(' ');
  }, [className]);

  return (
    <div ref={searchRef} className={containerClasses}>
      {/* Search Input Container */}
      <div className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-3 z-10">
            <FaSearch className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* Input Field */}
          <FastInput
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-10 py-3 text-base rounded-xl border-gray-300 focus:border-colombia-blue focus:ring-colombia-blue shadow-lg"
            autoFocus={autoFocus}
            size="lg"
            debounceMs={0} // We handle debouncing ourselves
          />
          
          {/* Clear Button */}
          {query && (
            <div className="absolute right-3 z-10">
              <FastButton
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="p-1 hover:bg-gray-100 rounded-full"
                ripple={false}
              >
                <FaTimes className="w-3 h-3 text-gray-400" />
              </FastButton>
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && (enableSuggestions || enableHistory) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto z-50 animate-fadeIn">
            {filteredSuggestions.length > 0 ? (
              <div className="py-2">
                {/* Section Header */}
                {!query.trim() && enableHistory && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <FaHistory className="w-3 h-3" />
                    Búsquedas Recientes
                  </div>
                )}
                
                {query.trim() && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <BiTrendingUp className="w-3 h-3" />
                    Sugerencias
                  </div>
                )}

                {/* Suggestions List */}
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                      selectedIndex === index ? 'bg-colombia-blue/10 border-r-4 border-colombia-blue' : ''
                    }`}
                    onKeyDown={handleKeyDown}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {suggestion.type === 'history' ? (
                            <FaHistory className="w-4 h-4 text-gray-400" />
                          ) : suggestion.type === 'trending' ? (
                            <BiTrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <FaSearch className="w-4 h-4 text-colombia-blue" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">
                            {suggestion.text}
                          </div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {suggestion.category}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {suggestion.count && (
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span>{suggestion.count.toLocaleString()}</span>
                          <span>resultados</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <FaSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No se encontraron sugerencias para "{query}"</p>
                <p className="text-sm mt-1">Presiona Enter para buscar</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Search Stats (Performance Indicator) */}
      <div className="mt-2 text-xs text-gray-400 text-center">
        Búsqueda optimizada • Rendimiento ultra-rápido activado
      </div>
    </div>
  );
};

export const FastSearch = memo(FastSearchComponent);