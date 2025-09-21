import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes, FaHistory } from 'react-icons/fa';
import { FastSearchProps } from './types';
import { useFastCallback, useFastState } from './hooks/useFastCallback';

/**
 * FastSearchBar (fast-r7aqkx-222-d)
 * Ultra-fast search component optimized for local search
 * Features: instant suggestions, zero-delay input, smart caching
 */
export const FastSearchBar: React.FC<FastSearchProps> = ({
  query = '',
  onSearch,
  onQueryChange,
  placeholder = 'Buscar en Colombia...',
  autoFocus = false,
  debounceMs = 150,
  suggestions = [],
  isLoading = false,
  maxSuggestions = 8,
  category = 'local',
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [inputValue, setInputValue] = useFastState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('fastSearchHistory');
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.warn('Failed to parse search history:', e);
      }
    }
  }, []);

  // Auto-focus if needed
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Sync external query changes
  useEffect(() => {
    setInputValue(query);
  }, [query, setInputValue]);

  // Debounced search callback
  const debouncedSearch = useFastCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (onQueryChange) {
        onQueryChange(searchQuery);
      }
    }, debounceMs);
  }, [onQueryChange, debounceMs]);

  // Handle input changes with instant UI updates
  const handleInputChange = useFastCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    setShowSuggestions(value.length > 0);
    
    // Instant callback for UI responsiveness
    debouncedSearch(value);
  }, [setInputValue, debouncedSearch]);

  // Handle search execution
  const executeSearch = useFastCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Update search history
    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('fastSearchHistory', JSON.stringify(newHistory));
    
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onSearch) {
      onSearch(searchQuery, { category });
    }
  }, [searchHistory, onSearch, category]);

  // Handle form submission
  const handleSubmit = useFastCallback((e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(inputValue);
  }, [executeSearch, inputValue]);

  // Handle suggestion selection
  const handleSuggestionClick = useFastCallback((suggestion: string) => {
    setInputValue(suggestion);
    executeSearch(suggestion);
  }, [setInputValue, executeSearch]);

  // Handle keyboard navigation
  const handleKeyDown = useFastCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    
    const allSuggestions = [...suggestions, ...searchHistory.slice(0, 3)];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allSuggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? allSuggestions.length - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
          handleSuggestionClick(allSuggestions[selectedIndex]);
        } else {
          executeSearch(inputValue);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showSuggestions, suggestions, searchHistory, selectedIndex, handleSuggestionClick, executeSearch, inputValue]);

  // Clear input
  const clearInput = useFastCallback(() => {
    setInputValue('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    if (onQueryChange) {
      onQueryChange('');
    }
    inputRef.current?.focus();
  }, [setInputValue, onQueryChange]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSuggestions = [...suggestions.slice(0, maxSuggestions), ...searchHistory.slice(0, 3)];
  const categoryIcon = category === 'local' ? '🇨🇴' : category === 'world' ? '🌍' : '🔍';

  return (
    <div className={`relative w-full ${className}`} data-testid={testId} {...props}>
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-lg mr-2" role="img" aria-label={`${category} search`}>
              {categoryIcon}
            </span>
            <FaSearch className={`w-4 h-4 transition-colors ${
              isLoading 
                ? 'text-blue-500 animate-pulse' 
                : 'text-gray-400 group-focus-within:text-blue-500'
            }`} />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0 || searchHistory.length > 0)}
            placeholder={placeholder}
            className="w-full pl-16 pr-12 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl 
                     focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                     transition-all duration-200 shadow-sm hover:shadow-md
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            aria-label={`Buscar en ${category === 'local' ? 'Colombia' : category === 'world' ? 'el mundo' : 'todas partes'}`}
            aria-describedby="search-help"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            role="combobox"
          />
          
          {/* Clear Button */}
          {inputValue && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10
                       text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center z-10">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Hidden submit button for form submission */}
        <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
          Buscar
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (allSuggestions.length > 0 || searchHistory.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-200 
                   rounded-2xl shadow-2xl max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Sugerencias de búsqueda"
        >
          {/* Current Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 mb-1">
                Sugerencias
              </div>
              {suggestions.slice(0, maxSuggestions).map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3
                           ${selectedIndex === index 
                             ? 'bg-blue-50 text-blue-700' 
                             : 'hover:bg-gray-50 text-gray-700'}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <FaSearch className="w-3 h-3 text-gray-400" />
                  <span className="flex-1">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 mb-1 flex items-center gap-2">
                <FaHistory className="w-3 h-3" />
                Búsquedas recientes
              </div>
              {searchHistory.slice(0, 3).map((historyItem, index) => {
                const actualIndex = suggestions.length + index;
                return (
                  <button
                    key={`history-${index}`}
                    type="button"
                    onClick={() => handleSuggestionClick(historyItem)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3
                             ${selectedIndex === actualIndex 
                               ? 'bg-blue-50 text-blue-700' 
                               : 'hover:bg-gray-50 text-gray-600'}`}
                    role="option"
                    aria-selected={selectedIndex === actualIndex}
                  >
                    <FaHistory className="w-3 h-3 text-gray-400" />
                    <span className="flex-1">{historyItem}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Screen Reader Help */}
      <div id="search-help" className="sr-only">
        Usa las flechas para navegar por las sugerencias, Enter para seleccionar, Escape para cerrar
      </div>
    </div>
  );
};