import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, FaFilter, FaTimes, FaSort, FaFireAlt, 
  FaClock, FaHeart, FaStar, FaEye, FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import { NewsTopic, searchTopicsByKeyword, getAllTopics } from '../config/newsTopics';
import { useUserPreferences } from '../hooks/useUserPreferences';

interface TopicSearchFilterProps {
  onTopicsFiltered: (topics: NewsTopic[]) => void;
  selectedCategory: 'local' | 'world';
  className?: string;
}

interface FilterOptions {
  searchQuery: string;
  sortBy: 'relevance' | 'popularity' | 'recent' | 'favorites' | 'alphabetical';
  filterBy: 'all' | 'favorites' | 'recent' | 'trending';
  urgencyLevel: 'all' | 'high' | 'medium' | 'normal';
  category: 'all' | 'breaking' | 'politics' | 'security' | 'analysis';
}

const TopicSearchFilter: React.FC<TopicSearchFilterProps> = ({
  onTopicsFiltered,
  selectedCategory,
  className = ""
}) => {
  const { preferences, engagementStats, isFavorite, isRecentlyViewed } = useUserPreferences();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<NewsTopic[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    sortBy: 'relevance',
    filterBy: 'all',
    urgencyLevel: 'all',
    category: 'all'
  });

  // Topic labels mapping (same as in FeaturedTopics)
  const topicLabels: Record<string, { urgencyLevel: 'high' | 'medium' | 'normal'; category: 'breaking' | 'politics' | 'security' | 'analysis' }> = {
    "drugs-crime": { urgencyLevel: 'high', category: 'security' },
    "terror-news": { urgencyLevel: 'high', category: 'breaking' },
    "gustavo-petro": { urgencyLevel: 'medium', category: 'politics' },
    "congress": { urgencyLevel: 'medium', category: 'politics' },
    "left-wing": { urgencyLevel: 'normal', category: 'analysis' },
    "right-wing": { urgencyLevel: 'normal', category: 'analysis' },
    "donald-trump-local": { urgencyLevel: 'medium', category: 'politics' },
    "donald-trump-world": { urgencyLevel: 'high', category: 'politics' },
    "world-terror": { urgencyLevel: 'high', category: 'security' },
    "world-right-wing": { urgencyLevel: 'normal', category: 'analysis' },
    "world-left-wing": { urgencyLevel: 'normal', category: 'analysis' },
    "world-travel": { urgencyLevel: 'normal', category: 'analysis' }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, selectedCategory, preferences, engagementStats]);

  useEffect(() => {
    if (filters.searchQuery.length > 0) {
      const searchResults = searchTopicsByKeyword(filters.searchQuery)
        .filter(topic => topic.category === selectedCategory)
        .slice(0, 5);
      setSuggestions(searchResults);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [filters.searchQuery, selectedCategory]);

  const applyFilters = () => {
    let filteredTopics = getAllTopics().filter(topic => topic.category === selectedCategory);

    // Apply search query
    if (filters.searchQuery) {
      filteredTopics = searchTopicsByKeyword(filters.searchQuery)
        .filter(topic => topic.category === selectedCategory);
    }

    // Apply filter by type
    switch (filters.filterBy) {
      case 'favorites':
        filteredTopics = filteredTopics.filter(topic => isFavorite(topic.id));
        break;
      case 'recent':
        filteredTopics = filteredTopics.filter(topic => isRecentlyViewed(topic.id));
        break;
      case 'trending':
        // Mock trending logic based on engagement
        filteredTopics = filteredTopics.filter(topic => {
          const stats = engagementStats[topic.id];
          return stats && stats.viewCount > 10;
        });
        break;
    }

    // Apply urgency filter
    if (filters.urgencyLevel !== 'all') {
      filteredTopics = filteredTopics.filter(topic => {
        const label = topicLabels[topic.id];
        return label && label.urgencyLevel === filters.urgencyLevel;
      });
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filteredTopics = filteredTopics.filter(topic => {
        const label = topicLabels[topic.id];
        return label && label.category === filters.category;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        filteredTopics.sort((a, b) => {
          const statsA = engagementStats[a.id] || { viewCount: 0 };
          const statsB = engagementStats[b.id] || { viewCount: 0 };
          return statsB.viewCount - statsA.viewCount;
        });
        break;
      case 'recent':
        filteredTopics.sort((a, b) => {
          const statsA = engagementStats[a.id] || { lastViewed: new Date(0) };
          const statsB = engagementStats[b.id] || { lastViewed: new Date(0) };
          return new Date(statsB.lastViewed).getTime() - new Date(statsA.lastViewed).getTime();
        });
        break;
      case 'favorites':
        filteredTopics.sort((a, b) => {
          const aIsFav = isFavorite(a.id) ? 1 : 0;
          const bIsFav = isFavorite(b.id) ? 1 : 0;
          return bIsFav - aIsFav;
        });
        break;
      case 'alphabetical':
        filteredTopics.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // 'relevance' is default order
    }

    onTopicsFiltered(filteredTopics);
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }));
  };

  const handleSuggestionClick = (topic: NewsTopic) => {
    setFilters(prev => ({ ...prev, searchQuery: topic.name }));
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
    searchInputRef.current?.focus();
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      sortBy: 'relevance',
      filterBy: 'all',
      urgencyLevel: 'all',
      category: 'all'
    });
  };

  const hasActiveFilters = filters.searchQuery || 
    filters.sortBy !== 'relevance' || 
    filters.filterBy !== 'all' || 
    filters.urgencyLevel !== 'all' || 
    filters.category !== 'all';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar temas..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 dark:placeholder-gray-400"
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
            {suggestions.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSuggestionClick(topic)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 
                         flex items-center space-x-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              >
                <span className="text-lg">{topic.emoji}</span>
                <span className="text-sm text-gray-900 dark:text-white">{topic.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FaFilter />
          <span>Filtros avanzados</span>
          {isExpanded ? <FaArrowUp /> : <FaArrowDown />}
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaSort className="inline mr-1" />
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="relevance">Relevancia</option>
              <option value="popularity">Popularidad</option>
              <option value="recent">Recientes</option>
              <option value="favorites">Favoritos</option>
              <option value="alphabetical">Alfabético</option>
            </select>
          </div>

          {/* Filter By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaEye className="inline mr-1" />
              Filtrar por
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'all', label: 'Todos', icon: <FaStar /> },
                { value: 'favorites', label: 'Favoritos', icon: <FaHeart /> },
                { value: 'recent', label: 'Recientes', icon: <FaClock /> },
                { value: 'trending', label: 'Trending', icon: <FaFireAlt /> }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, filterBy: option.value as any }))}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition-colors ${
                    filters.filterBy === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nivel de urgencia
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'high', label: 'Alta' },
                { value: 'medium', label: 'Media' },
                { value: 'normal', label: 'Normal' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, urgencyLevel: option.value as any }))}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.urgencyLevel === option.value
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { value: 'all', label: 'Todas' },
                { value: 'breaking', label: 'Última Hora' },
                { value: 'politics', label: 'Política' },
                { value: 'security', label: 'Seguridad' },
                { value: 'analysis', label: 'Análisis' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, category: option.value as any }))}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.category === option.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Filtros activos:</strong>{' '}
            {filters.searchQuery && `Búsqueda: "${filters.searchQuery}" `}
            {filters.sortBy !== 'relevance' && `Orden: ${filters.sortBy} `}
            {filters.filterBy !== 'all' && `Tipo: ${filters.filterBy} `}
            {filters.urgencyLevel !== 'all' && `Urgencia: ${filters.urgencyLevel} `}
            {filters.category !== 'all' && `Categoría: ${filters.category}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicSearchFilter;