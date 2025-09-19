import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaGlobe, FaMapMarkerAlt, FaTimes, FaFilter } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
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

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Mock trending queries
    setTrendingQueries([
      'Gustavo Petro reforma pensional',
      'Elecciones regionales 2023',
      'Seguridad Bogotá',
      'Congreso nueva ley',
      'Economía Colombia 2024',
      'Paz total FARC'
    ]);

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

  const performSearch = (searchQuery: string, topic?: NewsTopic) => {
    const finalTopic = topic || selectedTopic;
    onSearch(searchQuery, selectedCategory, finalTopic || undefined);
    
    // Save to recent searches
    const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    setShowSuggestions(false);
    setShowTopics(false);
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
            onClick={() => setSelectedCategory('local')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all ${
              selectedCategory === 'local'
                ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaMapMarkerAlt className="w-4 h-4" />
            Colombia
          </button>
          <button
            onClick={() => setSelectedCategory('world')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all ${
              selectedCategory === 'world'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaGlobe className="w-4 h-4" />
            Mundo
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Buscar
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
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-2xl shadow-2xl z-50">
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Búsquedas recientes</h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(search);
                          performSearch(search);
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <FaSearch className="w-4 h-4 text-gray-400" />
                        <span>{search}</span>
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
                </h3>
                <div className="space-y-2">
                  {trendingQueries.map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(trending);
                        performSearch(trending);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-left"
                    >
                      <BiTrendingUp className="w-4 h-4 text-red-500" />
                      <span>{trending}</span>
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