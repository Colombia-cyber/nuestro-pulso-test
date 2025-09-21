import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaSearch, FaFilter, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaSort, FaInfinity } from 'react-icons/fa';
import { MdClear, MdImage, MdVideoLibrary, MdShoppingCart, MdWeb } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { SearchFilters } from '../types/search';
import { getFiltersForMode, LOCAL_FILTERS, MUNDO_FILTERS } from '../data/searchSources';
import { getProminentTopics, NewsTopic } from '../config/newsTopics';



interface SearchTab {
  id: 'world' | 'local';
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface GoogleClassSearchBarProps {
  onSearch?: (query: string, tab: 'world' | 'local', filters: SearchFilters) => void;
  onResultsChange?: (results: any[]) => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  activeTab?: 'world' | 'local';
  onTabChange?: (tab: 'world' | 'local') => void;
}

const GoogleClassSearchBar: React.FC<GoogleClassSearchBarProps> = ({
  onSearch,
  onResultsChange,
  className = '',
  placeholder = 'Buscar en mundo y Colombia...',
  autoFocus = false,
  activeTab: parentActiveTab = 'local',
  onTabChange
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'world' | 'local'>(parentActiveTab);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [searchTime, setSearchTime] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: 'all',
    sources: [],
    location: 'colombia',
    contentType: 'all',
    sortBy: 'relevance'
  });

  const searchTabs: SearchTab[] = [
    {
      id: 'local',
      name: 'Local Colombia 🇨🇴',
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      description: 'Red Cívica de Colombia - Fuentes nacionales y locales'
    },
    {
      id: 'world',
      name: 'Mundo 🌍',
      icon: <FaGlobe className="w-4 h-4" />,
      description: 'Búsqueda global con Copilot AI y fuentes internacionales'
    }
  ];

  const contentTypes = [
    { id: 'all', name: 'Todo', icon: <FaSearch className="w-4 h-4" /> },
    { id: 'news', name: 'Noticias', icon: <BiNews className="w-4 h-4" /> },
    { id: 'web', name: 'Web', icon: <MdWeb className="w-4 h-4" /> },
    { id: 'images', name: 'Imágenes', icon: <MdImage className="w-4 h-4" /> },
    { id: 'videos', name: 'Videos', icon: <MdVideoLibrary className="w-4 h-4" /> },
    { id: 'shopping', name: 'Compras', icon: <MdShoppingCart className="w-4 h-4" /> },
    { id: 'articles', name: 'Artículos', icon: <BiNews className="w-4 h-4" /> }
  ];

  const dateRanges = [
    { id: 'all', name: 'Cualquier momento' },
    { id: 'hour', name: 'Última hora' },
    { id: 'day', name: 'Último día' },
    { id: 'week', name: 'Última semana' },
    { id: 'month', name: 'Último mes' },
    { id: 'year', name: 'Último año' }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'Relevancia' },
    { id: 'date', name: 'Más reciente' },
    { id: 'popularity', name: 'Popularidad' }
  ];

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Load search history
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Get search suggestions
  const getSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    // Mock suggestions based on active tab
    const baseSuggestions = activeTab === 'world' 
      ? [
          `${searchQuery} mundial`,
          `${searchQuery} internacional`,
          `${searchQuery} news`,
          `${searchQuery} global`,
          `${searchQuery} world`
        ]
      : [
          `${searchQuery} Colombia`,
          `${searchQuery} Bogotá`,
          `${searchQuery} gobierno`,
          `${searchQuery} política colombiana`,
          `${searchQuery} noticias nacionales`
        ];

    // Add search history matches
    const historyMatches = searchHistory
      .filter(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3);

    const allSuggestions = [...new Set([...historyMatches, ...baseSuggestions])].slice(0, 8);
    setSuggestions(allSuggestions);
  }, [activeTab, searchHistory]);

  // Debounced suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, getSuggestions]);

  // Perform search
  const performSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);
    const startTime = Date.now();

    try {
      // Add to search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      // Call parent's search handler - parent will handle all result generation
      if (onSearch) {
        onSearch(query, activeTab, filters);
      }

      // Set basic timing info for UI feedback
      setSearchTime(Date.now() - startTime);

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, [query, activeTab, filters, searchHistory, onSearch]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setTimeout(() => performSearch(), 100);
  };

  // Sync activeTab with parent
  useEffect(() => {
    setActiveTab(parentActiveTab);
  }, [parentActiveTab]);

  // Handle tab change - INSTANT SWITCHING
  const handleTabChange = (tab: 'world' | 'local') => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
    if (query) {
      // INSTANT RE-SEARCH: Immediately search with new tab context
      performSearch();
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    if (query) {
      // Re-search with new filters
      setTimeout(() => performSearch(), 100);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setResultCount(null);
    setSearchTime(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle topic click for instant navigation
  const handleTopicClick = (topic: NewsTopic) => {
    // DEDICATED PAGE NAVIGATION: Right Wing opens in-app page
    if (topic.id === 'right-wing' || topic.id === 'world-right-wing') {
      // Navigate to dedicated Right Wing page
      window.history.pushState(null, '', '/right-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'right-wing' }));
      return;
    }
    
    // INSTANT TOPIC SEARCH: For other topics, search with instant results
    const topicQuery = topic.name;
    setQuery(topicQuery);
    
    // Add to search history
    const newHistory = [topicQuery, ...searchHistory.filter(h => h !== topicQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    // Perform search immediately
    if (onSearch) {
      onSearch(topicQuery, activeTab, filters);
    }
  };

  return (
    <div className={`google-search-container ${className}`}>
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Tab Selector */}
        <div className="flex border-b border-gray-100">
          {searchTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              title={tab.description}
            >
              {tab.icon}
              <span>{tab.name}</span>
              {activeTab === tab.id && (
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Prominent Topics Tabs - Bold, Clear Text */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto">
            <span className="text-sm font-medium text-gray-600 mr-2 flex-shrink-0">Temas destacados:</span>
            {getProminentTopics(activeTab).map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg font-bold text-sm transition-all border-2 bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder={placeholder}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <MdClear className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  showFilters || Object.values(filters).some(v => v !== 'all' && v !== 'relevance' && v !== 'colombia' && (!Array.isArray(v) || v.length > 0))
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
                title="Filtros de búsqueda"
              >
                <FaFilter className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Buscando...</span>
                  </div>
                ) : (
                  'Buscar'
                )}
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <FaSearch className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                    {searchHistory.includes(suggestion) && (
                      <span className="ml-auto text-xs text-gray-500">Historial</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Result Info */}
          {(resultCount !== null || searchTime !== null) && (
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
              {resultCount !== null && (
                <span>
                  <strong>{resultCount.toLocaleString()}</strong> resultados
                </span>
              )}
              {searchTime !== null && (
                <span>
                  en <strong>{searchTime}ms</strong>
                </span>
              )}
              <span className="flex items-center gap-1">
                {activeTab === 'world' ? <FaGlobe className="w-3 h-3" /> : <FaMapMarkerAlt className="w-3 h-3" />}
                {activeTab === 'world' ? 'Búsqueda global' : 'Búsqueda local'}
              </span>
            </div>
          )}
        </form>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Content Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de contenido</label>
                <div className="flex flex-wrap gap-1">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleFilterChange('contentType', type.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors ${
                        filters.contentType === type.id
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type.icon}
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {dateRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter (for local search) */}
              {activeTab === 'local' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="colombia">Toda Colombia</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="barranquilla">Barranquilla</option>
                    <option value="cartagena">Cartagena</option>
                  </select>
                </div>
              )}
            </div>

            {/* Filter Actions */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setFilters({
                    dateRange: 'all',
                    sources: [],
                    location: 'colombia',
                    contentType: 'all',
                    sortBy: 'relevance'
                  });
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ocultar filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleClassSearchBar;