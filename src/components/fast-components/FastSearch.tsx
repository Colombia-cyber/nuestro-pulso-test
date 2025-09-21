import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FaSearch, FaVideo, FaGlobe, FaMapMarkerAlt, FaFilter, FaHistory, FaTimes, FaMicrophone, FaCamera } from 'react-icons/fa';
import { MdTrendingUp, MdKeyboardVoice } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import { usePerformanceMonitor, useFastInteraction } from './FastBase';
import FastButton from './FastButton';

/**
 * Fast-r7aqkx-223-d: Ultra-Fast Search Component with Bing Videos Integration
 * World-class search experience with instant response and modern styling
 */

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'trending' | 'completion' | 'entity';
  source?: string;
  popularity?: number;
  icon?: React.ReactNode;
}

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  source: string;
  url: string;
  publishedAt: string;
  description?: string;
}

interface SearchCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export interface FastSearchProps {
  placeholder?: string;
  autoFocus?: boolean;
  showCategories?: boolean;
  showVideoResults?: boolean;
  enableVoiceSearch?: boolean;
  enableVisualSearch?: boolean;
  onSearch?: (query: string, category?: string, filters?: Record<string, any>) => void;
  onVideoSelect?: (video: VideoResult) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  className?: string;
  maxSuggestions?: number;
  debounceDelay?: number;
  enableAnalytics?: boolean;
}

const FastSearch = memo<FastSearchProps>(({
  placeholder = "Buscar en Colombia y el mundo...",
  autoFocus = false,
  showCategories = true,
  showVideoResults = true,
  enableVoiceSearch = true,
  enableVisualSearch = true,
  onSearch,
  onVideoSelect,
  onSuggestionClick,
  className = '',
  maxSuggestions = 8,
  debounceDelay = 150,
  enableAnalytics = true,
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'local' | 'world'>('local');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    source: 'all',
    contentType: 'all',
    region: 'colombia'
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const { renderTime } = usePerformanceMonitor('FastSearch-r7aqkx-223-d');

  // Search categories
  const categories: SearchCategory[] = useMemo(() => [
    {
      id: 'local',
      name: 'Colombia',
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      color: 'from-yellow-400 via-blue-500 to-red-500',
      description: 'Noticias, negocios y fuentes colombianas'
    },
    {
      id: 'world',
      name: 'Mundo',
      icon: <FaGlobe className="w-4 h-4" />,
      color: 'from-blue-500 to-purple-600',
      description: 'Búsqueda global con integración Bing'
    }
  ], []);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Debounced search suggestions
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < 2) {
      setSuggestions([]);
      setVideoResults([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
      if (showVideoResults) {
        fetchVideoResults(query);
      }
    }, debounceDelay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceDelay, showVideoResults]);

  // Fetch search suggestions with ultra-fast response
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    
    try {
      // Simulate ultra-fast API response
      await new Promise(resolve => setTimeout(resolve, 50));

      const mockSuggestions: SearchSuggestion[] = [
        // History suggestions (from localStorage)
        {
          id: 'h1',
          text: `${searchQuery} Colombia`,
          type: 'history',
          icon: <FaHistory className="w-4 h-4 text-gray-400" />
        },
        // Trending suggestions
        {
          id: 't1',
          text: `${searchQuery} noticias`,
          type: 'trending',
          popularity: 95,
          icon: <MdTrendingUp className="w-4 h-4 text-red-500" />
        },
        {
          id: 't2',
          text: `${searchQuery} Gustavo Petro`,
          type: 'trending',
          popularity: 88,
          icon: <MdTrendingUp className="w-4 h-4 text-red-500" />
        },
        // Entity suggestions
        {
          id: 'e1',
          text: `${searchQuery} gobierno`,
          type: 'entity',
          source: 'Wikipedia',
          icon: <BiWorld className="w-4 h-4 text-blue-500" />
        },
        // Completion suggestions
        {
          id: 'c1',
          text: `${searchQuery} últimas noticias`,
          type: 'completion'
        },
        {
          id: 'c2',
          text: `${searchQuery} análisis político`,
          type: 'completion'
        }
      ];

      setSuggestions(mockSuggestions.slice(0, maxSuggestions));
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [maxSuggestions]);

  // Fetch Bing Video results with modern styling
  const fetchVideoResults = useCallback(async (searchQuery: string) => {
    try {
      // Simulate Bing Video API integration
      await new Promise(resolve => setTimeout(resolve, 100));

      const mockVideoResults: VideoResult[] = [
        {
          id: 'v1',
          title: `${searchQuery} - Análisis Completo 2024`,
          thumbnail: '🎬',
          duration: '12:34',
          views: '1.2M',
          source: 'Noticias RCN',
          url: '#',
          publishedAt: 'Hace 2 horas',
          description: `Análisis detallado sobre ${searchQuery} con expertos`
        },
        {
          id: 'v2',
          title: `Breaking: ${searchQuery} - Última Hora`,
          thumbnail: '📺',
          duration: '8:45',
          views: '800K',
          source: 'Caracol Noticias',
          url: '#',
          publishedAt: 'Hace 4 horas',
          description: `Cobertura en vivo de ${searchQuery}`
        },
        {
          id: 'v3',
          title: `${searchQuery} - Perspectiva Internacional`,
          thumbnail: '🌍',
          duration: '15:20',
          views: '650K',
          source: 'BBC Mundo',
          url: '#',
          publishedAt: 'Hace 6 horas',
          description: `Análisis internacional de ${searchQuery}`
        }
      ];

      setVideoResults(mockVideoResults);
    } catch (error) {
      console.error('Failed to fetch video results:', error);
      setVideoResults([]);
    }
  }, []);

  // Ultra-fast search execution
  const handleSearch = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      // If called from a click event, prevent default and get query from state
      if (event) {
        event.preventDefault();
      }
      
      const finalQuery = query;
      if (!finalQuery.trim()) return;

      // Analytics tracking
      if (enableAnalytics) {
        console.log('🔍 Search Analytics:', {
          query: finalQuery,
          category: activeCategory,
          filters,
          timestamp: Date.now(),
          renderTime
        });
      }

      // Execute search
      onSearch?.(finalQuery, activeCategory, filters);
      setShowSuggestions(false);

      // Save to search history
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newHistory = [finalQuery, ...history.filter((h: string) => h !== finalQuery)].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }, [query, activeCategory, filters, onSearch, enableAnalytics, renderTime]),
    0 // Instant response
  );
  
  // Overloaded version for programmatic search
  const performSearch = useCallback((searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    // Analytics tracking
    if (enableAnalytics) {
      console.log('🔍 Search Analytics:', {
        query: finalQuery,
        category: activeCategory,
        filters,
        timestamp: Date.now(),
        renderTime
      });
    }

    // Execute search
    onSearch?.(finalQuery, activeCategory, filters);
    setShowSuggestions(false);

    // Save to search history
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [finalQuery, ...history.filter((h: string) => h !== finalQuery)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }, [query, activeCategory, filters, onSearch, enableAnalytics, renderTime]);

  // Voice search functionality
  const handleVoiceSearch = useCallback(async () => {
    if (!enableVoiceSearch || !('webkitSpeechRecognition' in window)) {
      alert('Búsqueda por voz no disponible en este navegador');
      return;
    }

    setIsVoiceRecording(true);
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsVoiceRecording(false);
      setTimeout(() => performSearch(transcript), 100);
    };

    recognition.onerror = () => {
      setIsVoiceRecording(false);
    };

    recognition.onend = () => {
      setIsVoiceRecording(false);
    };

    recognition.start();
  }, [enableVoiceSearch, performSearch]);

  // Visual search functionality
  const handleVisualSearch = useCallback(() => {
    if (!enableVisualSearch) return;
    
    // Simulate visual search trigger
    console.log('📷 Visual Search triggered');
    alert('Búsqueda visual próximamente disponible');
  }, [enableVisualSearch]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onSuggestionClick?.(suggestion);
    setTimeout(() => performSearch(suggestion.text), 50);
  }, [onSuggestionClick, performSearch]);

  // Handle video click
  const handleVideoClick = useCallback((video: VideoResult) => {
    onVideoSelect?.(video);
    
    // Analytics for video clicks
    if (enableAnalytics) {
      console.log('📺 Video Click Analytics:', {
        videoId: video.id,
        title: video.title,
        source: video.source,
        query,
        timestamp: Date.now()
      });
    }
  }, [onVideoSelect, enableAnalytics, query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`fast-search-r7aqkx-223-d relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Container */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Category Tabs */}
        {showCategories && (
          <div className="flex border-b border-gray-100">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                title={category.description}
              >
                {category.icon}
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Search Input Row */}
        <div className="flex items-center p-4 gap-3">
          {/* Search Icon */}
          <FaSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              className="w-full text-lg border-0 focus:outline-none focus:ring-0 bg-transparent placeholder-gray-500"
              autoComplete="off"
              spellCheck={false}
            />
            
            {/* Clear Button */}
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  setVideoResults([]);
                  inputRef.current?.focus();
                }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <FaTimes className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Voice Search */}
          {enableVoiceSearch && (
            <FastButton
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              className="flex-shrink-0"
              disabled={isVoiceRecording}
              tooltip="Búsqueda por voz"
              aria-label="Búsqueda por voz"
            >
              {isVoiceRecording ? (
                <MdKeyboardVoice className="w-5 h-5 text-red-500 animate-pulse" />
              ) : (
                <FaMicrophone className="w-5 h-5" />
              )}
            </FastButton>
          )}

          {/* Visual Search */}
          {enableVisualSearch && (
            <FastButton
              variant="ghost"
              size="sm"
              onClick={handleVisualSearch}
              className="flex-shrink-0"
              tooltip="Búsqueda visual"
              aria-label="Búsqueda visual"
            >
              <FaCamera className="w-5 h-5" />
            </FastButton>
          )}

          {/* Filters */}
          <FastButton
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0"
            tooltip="Filtros de búsqueda"
            aria-label="Filtros"
          >
            <FaFilter className="w-5 h-5" />
          </FastButton>

          {/* Search Button */}
          <FastButton
            variant="primary"
            size="md"
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            loading={isLoading}
            className="flex-shrink-0"
            gradient
          >
            Buscar
          </FastButton>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Cualquier momento</option>
                <option value="hour">Última hora</option>
                <option value="day">Último día</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
              </select>

              <select
                value={filters.source}
                onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las fuentes</option>
                <option value="news">Noticias</option>
                <option value="government">Gobierno</option>
                <option value="academic">Académicas</option>
              </select>

              <select
                value={filters.contentType}
                onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todo contenido</option>
                <option value="articles">Artículos</option>
                <option value="videos">Videos</option>
                <option value="images">Imágenes</option>
              </select>

              <select
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="colombia">Colombia</option>
                <option value="bogota">Bogotá</option>
                <option value="medellin">Medellín</option>
                <option value="cali">Cali</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions and Results Dropdown */}
      {(showSuggestions && (suggestions.length > 0 || videoResults.length > 0)) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden"
        >
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Sugerencias</h3>
              <div className="space-y-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-left transition-colors group"
                  >
                    {suggestion.icon}
                    <span className="flex-1 truncate">{suggestion.text}</span>
                    {suggestion.popularity && (
                      <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {suggestion.popularity}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bing Video Results */}
          {videoResults.length > 0 && showVideoResults && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaVideo className="w-4 h-4 text-blue-500" />
                Videos Relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {videoResults.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="flex flex-col p-3 rounded-lg hover:bg-gray-50 text-left transition-colors group border border-gray-100 hover:border-gray-200"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative mb-2">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                        {video.thumbnail}
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <h4 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-blue-600">
                      {video.title}
                    </h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>{video.source}</span>
                        <span>{video.views}</span>
                      </div>
                      <div>{video.publishedAt}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-40">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Buscando...</span>
          </div>
        </div>
      )}
    </div>
  );
});

FastSearch.displayName = 'FastSearch';

export default FastSearch;