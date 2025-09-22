import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaGlobe, FaMapMarkerAlt, FaTimes, FaFilter } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { NewsTopic, getAllTopics, searchTopicsByKeyword } from '../config/newsTopics';

interface UniversalSearchBarProps {
  onSearch: (query: string, category: 'local' | 'world', topic?: NewsTopic) => void;
  onTopicSelect: (topic: NewsTopic) => void;
  onInstantSearch?: (query: string, category: 'local' | 'world', topic?: NewsTopic) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({
  onSearch,
  onTopicSelect,
  onInstantSearch,
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
    
    // INSTANT SEARCH: If instant search callback is provided, use it for immediate results
    if (onInstantSearch) {
      onInstantSearch(searchQuery, selectedCategory, finalTopic || undefined);
    } else {
      onSearch(searchQuery, selectedCategory, finalTopic || undefined);
    }
    
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
    
    // DEDICATED PAGE NAVIGATION: Left Wing and Right Wing open in-app pages
    if (topic.id === 'left-wing' || topic.id === 'world-left-wing') {
      // Navigate to dedicated Left Wing page
      window.history.pushState(null, '', '/left-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'left-wing' }));
      return;
    }
    
    if (topic.id === 'right-wing' || topic.id === 'world-right-wing') {
      // Navigate to dedicated Right Wing page
      window.history.pushState(null, '', '/right-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'right-wing' }));
      return;
    }
    
    // INSTANT TOPIC SEARCH: For other topics, search with instant results
    if (query.trim()) {
      performSearch(query, topic);
    } else {
      // If no query, search for the topic name itself
      const topicQuery = topic.name;
      setQuery(topicQuery);
      performSearch(topicQuery, topic);
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
        
        {/* Category Tabs - BOLD TEXT-ONLY */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSelectedCategory('local')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-bold transition-all duration-300 ${
              selectedCategory === 'local'
                ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FaMapMarkerAlt className="w-5 h-5" />
            <span className="text-lg font-extrabold tracking-wide">COLOMBIA</span>
          </button>
          <button
            onClick={() => setSelectedCategory('world')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-bold transition-all duration-300 ${
              selectedCategory === 'world'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FaGlobe className="w-5 h-5" />
            <span className="text-lg font-extrabold tracking-wide">MUNDO</span>
          </button>
        </div>

        {/* Search Input Row */}
        <div className="flex items-center p-4">
          {/* Topic Filter Button - PROFESSIONAL TEXT-ONLY */}
          <button
            onClick={toggleTopics}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-extrabold transition-all duration-300 mr-4 border-2 shadow-sm hover:shadow-lg ${
              selectedTopic
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg'
                : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <FaFilter className="w-4 h-4" />
            {selectedTopic ? (
              <>
                <span className="hidden sm:inline text-sm tracking-wide uppercase">{selectedTopic.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTopic();
                  }}
                  className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </>
            ) : (
              <span className="hidden sm:inline text-sm tracking-wide uppercase">TEMA</span>
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 tracking-wide"
            >
              BUSCAR
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
                      className={`p-4 rounded-lg transition-all text-left border-2 font-bold ${
                        selectedTopic?.id === topic.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-bold text-lg">{topic.name}</div>
                      <div className={`text-sm mt-1 ${
                        selectedTopic?.id === topic.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {topic.description}
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

      {/* Quick Topic Pills - CLEAN, BOLD, TEXT-ONLY */}
      <div className="mt-4 flex flex-wrap gap-3">
        {getAllTopics()
          .filter(topic => topic.category === selectedCategory)
          .slice(0, 6)
          .map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 shadow-sm hover:shadow-lg transform hover:scale-105 ${
                selectedTopic?.id === topic.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg scale-105'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className="font-extrabold tracking-wide uppercase text-xs">
                {topic.name}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default UniversalSearchBar;