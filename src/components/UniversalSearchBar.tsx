import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaGlobe, FaMapMarkerAlt, FaTimes, FaFilter, FaClock, FaHistory } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdLightbulb } from 'react-icons/md';
import { NewsTopic, getAllTopics, searchTopicsByKeyword } from '../config/newsTopics';

interface UniversalSearchBarProps {
  onSearch: (query: string, category: 'local' | 'world', topic?: NewsTopic) => void;
  onTopicSelect: (topic: NewsTopic) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({
  onSearch,
  onTopicSelect,
  placeholder = "Buscar noticias en Colombia y el mundo...",
  autoFocus = false,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'local' | 'world'>('local');
  const [selectedTopic, setSelectedTopic] = useState<NewsTopic | null>(null);
  const [showTopics, setShowTopics] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState<NewsTopic[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingQueries, setTrendingQueries] = useState<string[]>([]);
  const [instantSuggestions, setInstantSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate instant search suggestions based on query
  const generateInstantSuggestions = useCallback((searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setInstantSuggestions([]);
      return;
    }

    const baseSuggestions = selectedCategory === 'world' 
      ? [
          `${searchQuery} latest news`,
          `${searchQuery} worldwide`,
          `${searchQuery} global perspective`,
          `${searchQuery} international coverage`,
          `${searchQuery} breaking news`
        ]
      : [
          `${searchQuery} Colombia`,
          `${searchQuery} noticias Colombia`,
          `${searchQuery} gobierno Colombia`,
          `${searchQuery} Bogotá`,
          `${searchQuery} política colombiana`
        ];

    // Add topic-specific suggestions
    const topicSuggestions = getAllTopics()
      .filter(topic => 
        topic.category === selectedCategory && 
        (topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         topic.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())))
      )
      .slice(0, 3)
      .map(topic => `${searchQuery} ${topic.name}`);

    // Combine and filter unique suggestions
    const allSuggestions = [...baseSuggestions, ...topicSuggestions]
      .filter((suggestion, index, arr) => arr.indexOf(suggestion) === index)
      .slice(0, 8);

    setInstantSuggestions(allSuggestions);
  }, [selectedCategory]);

  // Debounced suggestions
  const debouncedSuggestions = useCallback((query: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(() => {
      generateInstantSuggestions(query);
    }, 150); // 150ms debounce for instant feel
  }, [generateInstantSuggestions]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowTopics(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [autoFocus]);

  useEffect(() => {
    debouncedSuggestions(query);
    
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, debouncedSuggestions]);

  // Auto-refresh trending topics
  useEffect(() => {
    const updateTrendingTopics = () => {
      const baseTrending = selectedCategory === 'world'
        ? [
            'Artificial Intelligence news',
            'Climate Change updates',
            'Global Economy 2024',
            'Technology breakthroughs',
            'World Politics latest',
            'International conflicts'
          ]
        : [
            'Gustavo Petro reforma pensional',
            'Elecciones regionales 2024',
            'Seguridad Bogotá',
            'Congreso nueva ley',
            'Economía Colombia 2024',
            'Paz total proceso'
          ];
      
      setTrendingQueries(baseTrending);
      setLastUpdated(new Date());
    };

    updateTrendingTopics();
    
    // Update trending topics every 5 minutes
    const interval = setInterval(updateTrendingTopics, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedCategory]);

  useEffect(() => {
    if (query.trim()) {
      const topics = searchTopicsByKeyword(query);
      setFilteredTopics(topics);
    } else {
      setFilteredTopics(getAllTopics());
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const performSearch = async (searchQuery: string, topic?: NewsTopic) => {
    setIsSearching(true);
    
    const finalTopic = topic || selectedTopic;
    
    try {
      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 200));
      
      onSearch(searchQuery, selectedCategory, finalTopic || undefined);
      
      // Save to recent searches
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 8);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      
      setShowSuggestions(false);
      setShowTopics(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTopicClick = (topic: NewsTopic) => {
    setSelectedTopic(topic);
    setSelectedCategory(topic.category);
    onTopicSelect(topic);
    setShowTopics(false);
    
    if (query.trim()) {
      performSearch(query, topic);
    }
  };

  const clearTopic = () => {
    setSelectedTopic(null);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const toggleTopics = () => {
    setShowTopics(!showTopics);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* Category Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setSelectedCategory('local');
              setSelectedTopic(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all relative ${
              selectedCategory === 'local'
                ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaMapMarkerAlt className="w-4 h-4" />
            Colombia
            {selectedCategory === 'local' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => {
              setSelectedCategory('world');
              setSelectedTopic(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all relative ${
              selectedCategory === 'world'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaGlobe className="w-4 h-4" />
            Mundo
            {selectedCategory === 'world' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
            )}
          </button>
        </div>

        {/* Search Input Row */}
        <div className="flex items-center p-4">
          {/* Topic Filter Button */}
          <button
            onClick={toggleTopics}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all mr-3 ${
              selectedTopic
                ? `bg-gradient-to-r ${selectedTopic.color} text-white`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaFilter className="w-4 h-4" />
            {selectedTopic ? (
              <>
                <span>{selectedTopic.emoji}</span>
                <span className="hidden sm:inline">{selectedTopic.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTopic();
                  }}
                  className="ml-1 hover:bg-white/20 rounded-full p-1"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </>
            ) : (
              <span className="hidden sm:inline">Filtrar por tema</span>
            )}
          </button>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          </form>
        </div>

        {/* Topic Filter Dropdown */}
        {showTopics && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaFilter className="w-5 h-5" />
                Filtrar por tema
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTopics
                  .filter(topic => topic.category === selectedCategory)
                  .map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left hover:shadow-md ${
                        selectedTopic?.id === topic.id
                          ? `bg-gradient-to-r ${topic.color} text-white`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{topic.emoji}</span>
                      <div>
                        <div className="font-semibold">{topic.name}</div>
                        <div className={`text-xs ${
                          selectedTopic?.id === topic.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {topic.description}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Suggestions Dropdown */}
        {showSuggestions && !showTopics && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-2xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
            <div className="p-4">
              {/* Instant Suggestions */}
              {query.trim() && instantSuggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MdLightbulb className="w-4 h-4 text-yellow-500" />
                    Sugerencias instantáneas
                  </h3>
                  <div className="space-y-1">
                    {instantSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(suggestion);
                          performSearch(suggestion);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-left group transition-all"
                      >
                        <FaSearch className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        <div>
                          <div className="text-gray-900">{suggestion}</div>
                          <div className="text-xs text-gray-500">
                            {selectedCategory === 'world' ? '🌍 Búsqueda mundial' : '🇨🇴 Búsqueda local'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FaHistory className="w-4 h-4 text-gray-500" />
                    Búsquedas recientes
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(search);
                          performSearch(search);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left group"
                      >
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{search}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newRecent = recentSearches.filter((_, i) => i !== index);
                            setRecentSearches(newRecent);
                            localStorage.setItem('recentSearches', JSON.stringify(newRecent));
                          }}
                          className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                        >
                          <FaTimes className="w-3 h-3 text-gray-400" />
                        </button>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <BiTrendingUp className="w-4 h-4 text-red-500" />
                  Tendencias
                  <span className="text-xs text-gray-500 ml-auto">
                    Actualizado {lastUpdated.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </h3>
                <div className="space-y-1">
                  {trendingQueries.map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(trending);
                        performSearch(trending);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-left group transition-all"
                    >
                      <BiTrendingUp className="w-4 h-4 text-red-500" />
                      <div>
                        <div className="text-gray-900">{trending}</div>
                        <div className="text-xs text-red-600">
                          #{index + 1} • Trending ahora
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Topic Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {getAllTopics()
          .filter(topic => topic.category === selectedCategory)
          .slice(0, 6)
          .map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedTopic?.id === topic.id
                  ? `bg-gradient-to-r ${topic.color} text-white`
                  : 'bg-white text-gray-700 border border-gray-300 hover:shadow-md'
              }`}
            >
              <span>{topic.emoji}</span>
              <span>{topic.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default UniversalSearchBar;