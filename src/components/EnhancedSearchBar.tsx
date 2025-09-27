import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaMicrophone, FaGlobe, FaMapMarkerAlt, FaFilter, FaTimes, FaLanguage } from 'react-icons/fa';
import { SearchQuery, SearchResults, VoiceSearchResult } from '../types/api';
import apiManager from '../services/apiManager';
import LoadingSkeleton from './LoadingSkeleton';

interface EnhancedSearchBarProps {
  onResults?: (results: SearchResults) => void;
  onLoadingChange?: (loading: boolean) => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
  
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  }
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  onResults,
  onLoadingChange,
  className = '',
  placeholder = 'Busca noticias, videos, debates, candidatos...',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'world' | 'local'>('local');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const debounceRef = useRef<number>();

  // Available platforms for filtering
  const availablePlatforms = [
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-500' },
    { id: 'google-news', name: 'Google News', icon: '📰', color: 'bg-blue-500' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'bg-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: 'bg-blue-600' },
    { id: 'twitter', name: 'X (Twitter)', icon: '🐦', color: 'bg-gray-800' },
    { id: 'wikipedia', name: 'Wikipedia', icon: '📖', color: 'bg-gray-600' },
    { id: 'civic-news', name: 'Noticias Cívicas', icon: '🏛️', color: 'bg-green-600' }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = language === 'es' ? 'es-CO' : 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
          
          // Automatically search after voice input
          handleSearch(transcript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [language]);

  // Update speech recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'es' ? 'es-CO' : 'en-US';
    }
  }, [language]);

  // Auto-focus input
  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  // Debounced search suggestions
  const debouncedGetSuggestions = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      if (searchQuery.length > 2) {
        getSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  const getSuggestions = async (searchQuery: string) => {
    // In a real implementation, this would call an autocomplete API
    const mockSuggestions = [
      `${searchQuery} Colombia`,
      `${searchQuery} noticias`,
      `${searchQuery} videos`,
      `${searchQuery} debates`,
      `${searchQuery} política`
    ].filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
    
    setSuggestions(mockSuggestions.slice(0, 5));
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    onLoadingChange?.(true);
    setShowSuggestions(false);

    // Save to recent searches
    const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 10);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches));

    const searchParams: SearchQuery = {
      query: searchQuery,
      type: searchType,
      platforms: selectedPlatforms,
      language: language,
      location: searchType === 'local' ? { country: 'Colombia' } : undefined
    };

    try {
      const results = await apiManager.search(searchParams);
      onResults?.(results);
    } catch (error) {
      console.error('Search error:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setShowFilters(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      setShowSuggestions(true);
      debouncedGetSuggestions(value);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const voiceSearchSupported = typeof window !== 'undefined' && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Search Type Toggle */}
          <div className="flex bg-gray-50 rounded-l-2xl">
            <button
              onClick={() => setSearchType('local')}
              className={`px-4 py-3 flex items-center space-x-2 rounded-l-2xl transition-all ${
                searchType === 'local'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaMapMarkerAlt className="text-sm" />
              <span className="font-medium">Local</span>
            </button>
            <button
              onClick={() => setSearchType('world')}
              className={`px-4 py-3 flex items-center space-x-2 transition-all ${
                searchType === 'world'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaGlobe className="text-sm" />
              <span className="font-medium">Mundial</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setShowSuggestions(query.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder={placeholder}
              className="w-full px-4 py-3 text-gray-800 bg-transparent focus:outline-none"
            />

            {/* Search Suggestions */}
            {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {suggestions.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-2 py-1">Sugerencias</div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center space-x-2"
                      >
                        <FaSearch className="text-gray-400 text-xs" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {recentSearches.length > 0 && suggestions.length === 0 && (
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-2 py-1">Búsquedas recientes</div>
                    {recentSearches.slice(0, 5).map((search, index) => (
                      <button
                        key={index}
                        onMouseDown={() => handleSuggestionClick(search)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center space-x-2"
                      >
                        <span className="text-gray-400">🕒</span>
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Voice Search Button */}
          {voiceSearchSupported && (
            <button
              onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              className={`px-4 py-3 transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-gray-500 hover:text-red-500'
              }`}
              title={isListening ? 'Detener búsqueda por voz' : 'Búsqueda por voz'}
            >
              <FaMicrophone />
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(prev => prev === 'es' ? 'en' : 'es')}
            className="px-4 py-3 text-gray-500 hover:text-blue-500 transition-colors"
            title="Cambiar idioma"
          >
            <FaLanguage />
            <span className="ml-1 text-xs font-bold uppercase">{language}</span>
          </button>

          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 transition-all ${
              showFilters || selectedPlatforms.length > 0
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
            title="Filtros de búsqueda"
          >
            <FaFilter />
            {selectedPlatforms.length > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-1">
                {selectedPlatforms.length}
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 rounded-r-2xl"
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <FaSearch />
            )}
          </button>
        </div>

        {/* Voice Search Status */}
        {isListening && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
            🎙️ Escuchando... Habla ahora
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Filtrar por plataforma</h3>
            <div className="flex space-x-2">
              {selectedPlatforms.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-red-500 flex items-center space-x-1"
                >
                  <FaTimes />
                  <span>Limpiar</span>
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availablePlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? `${platform.color} text-white border-transparent`
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span>{platform.icon}</span>
                <span className="text-sm font-medium">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;