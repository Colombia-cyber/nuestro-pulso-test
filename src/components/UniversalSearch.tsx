import React, { useState, useEffect, useRef } from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'news' | 'people' | 'topic' | 'community' | 'video';
  source?: string;
  thumbnail?: string;
  category?: string;
  engagement?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
}

interface UniversalSearchProps {
  className?: string;
  onResultSelect?: (result: SearchResult) => void;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ className = '', onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestedSearches] = useState([
    'Gustavo Petro últimas noticias',
    'Donald Trump Colombia',
    'Elecciones 2024 candidatos',
    'Reforma tributaria debate',
    'Corrupción investigaciones',
    'Empleo jóvenes Colombia'
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search function - in real implementation, integrate with Google APIs
  const performSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: `${searchQuery} - Últimas noticias y análisis`,
        description: `Encuentra las últimas noticias, análisis y opiniones sobre ${searchQuery} en Colombia`,
        url: '#',
        type: 'news',
        source: 'El Tiempo',
        category: 'política',
        engagement: { views: 15420, likes: 234, comments: 67 }
      },
      {
        id: '2',
        title: `Perfil completo: ${searchQuery}`,
        description: `Biografía, trayectoria política y posiciones sobre temas clave de ${searchQuery}`,
        url: '#',
        type: 'people',
        source: 'Wikipedia',
        category: 'personalidades',
        engagement: { views: 45230, likes: 892, comments: 156 }
      },
      {
        id: '3',
        title: `Videos sobre ${searchQuery}`,
        description: `Discursos, entrevistas y análisis en video sobre ${searchQuery}`,
        url: '#',
        type: 'video',
        source: 'YouTube',
        category: 'multimedia',
        engagement: { views: 23100, likes: 1547, comments: 234 }
      },
      {
        id: '4',
        title: `Discusión comunitaria: ${searchQuery}`,
        description: `Únete a la conversación sobre ${searchQuery} en nuestra Community Hub`,
        url: '#',
        type: 'community',
        source: 'Nuestro Pulso',
        category: 'comunidad',
        engagement: { likes: 456, comments: 123 }
      },
      {
        id: '5',
        title: `Tema trending: ${searchQuery}`,
        description: `Explora todo el contenido relacionado con ${searchQuery} en nuestra plataforma`,
        url: '#',
        type: 'topic',
        source: 'Nuestro Pulso',
        category: 'temas',
        engagement: { views: 67890, likes: 2134, comments: 456 }
      }
    ];

    return mockResults;
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setShowResults(true);
    
    try {
      const searchResults = await performSearch(searchQuery);
      setResults(searchResults);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const newRecent = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
        return newRecent;
      });
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (value.trim()) {
        handleSearch(value);
      } else {
        setShowResults(false);
        setResults([]);
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query.trim()) {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setShowResults(false);
    setSelectedIndex(-1);
    onResultSelect?.(result);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return '📰';
      case 'people': return '👤';
      case 'video': return '🎥';
      case 'community': return '💬';
      case 'topic': return '🏷️';
      default: return '🔍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'people': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      case 'topic': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`} ref={resultsRef}>
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-400 text-xl">🔍</span>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowResults(true)}
          placeholder="Buscar noticias, personas, temas, comunidad..."
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   transition-all duration-200 shadow-lg"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin text-blue-500 text-xl">⟳</div>
          </div>
        )}
        {query && !loading && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
              setResults([]);
              searchInputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>

      {/* Search suggestions */}
      {!query && !showResults && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Búsquedas sugeridas</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSearches.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm 
                           hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          {recentSearches.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Búsquedas recientes</h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="flex items-center space-x-2 w-full p-2 text-left rounded 
                             hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-400">🕒</span>
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search results */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl 
                       border border-gray-200 max-h-96 overflow-y-auto z-50">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin text-blue-500 text-2xl mb-2">⟳</div>
              <p className="text-gray-600">Buscando...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 
                           transition-colors ${selectedIndex === index ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl mt-1">{getTypeIcon(result.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                          {result.type.toUpperCase()}
                        </span>
                        {result.source && (
                          <span className="text-sm text-gray-500">{result.source}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {result.description}
                      </p>
                      {result.engagement && (
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {result.engagement.views && (
                            <span className="flex items-center space-x-1">
                              <span>👁️</span>
                              <span>{result.engagement.views.toLocaleString()}</span>
                            </span>
                          )}
                          {result.engagement.likes && (
                            <span className="flex items-center space-x-1">
                              <span>👍</span>
                              <span>{result.engagement.likes.toLocaleString()}</span>
                            </span>
                          )}
                          {result.engagement.comments && (
                            <span className="flex items-center space-x-1">
                              <span>💬</span>
                              <span>{result.engagement.comments.toLocaleString()}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query && (
            <div className="p-6 text-center">
              <p className="text-gray-600">No se encontraron resultados para "{query}"</p>
              <button
                onClick={() => handleSearch(query)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Buscar en Google
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick actions */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>⚡</span>
          <span>Resultados instantáneos</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🎯</span>
          <span>IA integrada</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🔒</span>
          <span>Búsqueda privada</span>
        </div>
      </div>
    </div>
  );
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    searchTimeout: NodeJS.Timeout;
  }
}

export default UniversalSearch;