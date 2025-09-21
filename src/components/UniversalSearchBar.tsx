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
      {/* Premium Main Search Container */}
      <div className="relative search-premium rounded-4xl shadow-premium-lg border border-white/30 overflow-hidden animate-premium-scale-in">
        
        {/* Premium Category Tabs */}
        <div className="flex border-b border-white/20">
          <button
            onClick={() => setSelectedCategory('local')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-bold text-lg transition-all duration-400 ${
              selectedCategory === 'local'
                ? 'bg-gradient-colombia-premium text-white shadow-colombia-strong'
                : 'text-gray-700 hover:bg-white/30 hover:scale-102'
            }`}
          >
            <FaMapMarkerAlt className="w-5 h-5" />
            Colombia
          </button>
          <button
            onClick={() => setSelectedCategory('world')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-bold text-lg transition-all duration-400 ${
              selectedCategory === 'world'
                ? 'bg-gradient-to-r from-accent-primary via-accent-tertiary to-accent-secondary text-white shadow-premium'
                : 'text-gray-700 hover:bg-white/30 hover:scale-102'
            }`}
          >
            <FaGlobe className="w-5 h-5" />
            Mundo
          </button>
        </div>

        {/* Premium Search Input Row */}
        <div className="flex items-center p-6">
          {/* Premium Topic Filter Button */}
          <button
            onClick={toggleTopics}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-base transition-all duration-400 mr-4 ${
              selectedTopic
                ? `bg-gradient-to-r ${selectedTopic.color} text-white shadow-premium transform scale-105`
                : 'glass-elegant text-gray-700 hover:glass-premium hover:scale-102'
            }`}
          >
            <FaFilter className="w-4 h-4" />
            {selectedTopic ? (
              <>
                <span className="text-xl">{selectedTopic.emoji}</span>
                <span className="hidden sm:inline">{selectedTopic.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTopic();
                  }}
                  className="ml-2 hover:bg-white/30 rounded-full p-1 transition-colors duration-200"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </>
            ) : (
              <span className="hidden sm:inline">Filtrar por tema</span>
            )}
          </button>

          {/* Premium Search Input */}
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="input-premium w-full pl-16 pr-6 py-4 text-lg font-medium border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="btn-premium btn-primary-premium ml-4 px-10 py-4 text-lg font-bold"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Premium Topic Filter Dropdown */}
        {showTopics && (
          <div className="absolute top-full left-0 right-0 glass-premium border border-white/30 rounded-b-4xl shadow-premium-lg z-50 max-h-96 overflow-y-auto scrollbar-modern animate-slide-up">
            <div className="p-6">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-gradient-premium">
                <FaFilter className="w-6 h-6" />
                Filtrar por tema
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics
                  .filter(topic => topic.category === selectedCategory)
                  .map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-400 text-left hover:shadow-premium transform hover:scale-102 ${
                        selectedTopic?.id === topic.id
                          ? `bg-gradient-to-r ${topic.color} text-white shadow-premium`
                          : 'glass-subtle hover:glass-elegant'
                      }`}
                    >
                      <span className="text-2xl">{topic.emoji}</span>
                      <div>
                        <div className="font-bold text-base">{topic.name}</div>
                        <div className={`text-sm ${
                          selectedTopic?.id === topic.id ? 'text-white/90' : 'text-gray-500'
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

        {/* Premium Search Suggestions Dropdown */}
        {showSuggestions && !showTopics && (
          <div className="absolute top-full left-0 right-0 glass-premium border border-white/30 rounded-b-4xl shadow-premium-lg z-50 animate-slide-up">
            <div className="p-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-base font-bold text-gray-700 mb-4">Búsquedas recientes</h3>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(search);
                          performSearch(search);
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:glass-subtle text-left transition-all duration-300 hover:scale-102"
                      >
                        <FaSearch className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h3 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-3">
                  <BiTrendingUp className="w-5 h-5 text-red-500" />
                  Tendencias
                </h3>
                <div className="space-y-3">
                  {trendingQueries.map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(trending);
                        performSearch(trending);
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:glass-subtle text-left transition-all duration-300 hover:scale-102"
                    >
                      <BiTrendingUp className="w-4 h-4 text-red-500" />
                      <span className="font-medium">{trending}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Quick Topic Pills */}
      <div className="mt-6 flex flex-wrap gap-3">
        {getAllTopics()
          .filter(topic => topic.category === selectedCategory)
          .slice(0, 6)
          .map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-bold transition-all duration-400 transform hover:scale-105 ${
                selectedTopic?.id === topic.id
                  ? `bg-gradient-to-r ${topic.color} text-white shadow-premium`
                  : 'glass-elegant text-gray-700 border border-white/30 hover:shadow-medium'
              }`}
            >
              <span className="text-base">{topic.emoji}</span>
              <span>{topic.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default UniversalSearchBar;