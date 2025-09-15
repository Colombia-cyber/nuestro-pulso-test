import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiTrendingUp, FiClock, FiX } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'web' | 'news' | 'video' | 'discussion';
  source?: string;
  timestamp?: string;
  thumbnail?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface SearchSuggestion {
  query: string;
  type: 'trending' | 'history' | 'suggestion';
  count?: number;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'videos' | 'discussions'>('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sample trending topics
  const trendingTopics: SearchSuggestion[] = [
    { query: 'Reforma tributaria 2024', type: 'trending', count: 15420 },
    { query: 'Elecciones regionales', type: 'trending', count: 12380 },
    { query: 'Gustavo Petro últimas noticias', type: 'trending', count: 9856 },
    { query: 'Seguridad ciudadana Bogotá', type: 'trending', count: 8745 },
    { query: 'Paro transportadores', type: 'trending', count: 7234 },
    { query: 'Cambio climático Colombia', type: 'trending', count: 6891 },
    { query: 'Corrupción funcionarios públicos', type: 'trending', count: 5432 },
    { query: 'Educación pública reforma', type: 'trending', count: 4987 },
  ];

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Update suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = trendingTopics.filter(topic => 
        topic.query.toLowerCase().includes(query.toLowerCase())
      );
      const historyFiltered = searchHistory
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(item => ({ query: item, type: 'history' as const }));
      
      setSuggestions([...historyFiltered, ...filtered.slice(0, 5)]);
      setShowSuggestions(true);
    } else {
      setSuggestions(trendingTopics.slice(0, 8));
      setShowSuggestions(query === '' && document.activeElement === searchRef.current);
    }
  }, [query, searchHistory]);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowSuggestions(false);
    
    // Add to history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    try {
      // Simulate API calls to different sources
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: `Noticias sobre "${searchQuery}" - Últimas actualizaciones`,
          description: 'Encuentra las últimas noticias y análisis sobre este tema desde fuentes verificadas en Colombia.',
          url: '#',
          type: 'news',
          source: 'El Tiempo',
          timestamp: 'hace 2 horas',
          engagement: { likes: 234, comments: 45, shares: 67 }
        },
        {
          id: '2',
          title: `Debate ciudadano: ${searchQuery}`,
          description: 'Únete a la discusión comunitaria sobre este tema. Ve argumentos de diferentes perspectivas.',
          url: '#',
          type: 'discussion',
          source: 'Comunidad Nuestro Pulso',
          timestamp: 'hace 1 hora',
          engagement: { likes: 156, comments: 89, shares: 23 }
        },
        {
          id: '3',
          title: `Video análisis: ${searchQuery} explicado`,
          description: 'Video educativo que explica los aspectos más importantes de este tema.',
          url: '#',
          type: 'video',
          source: 'YouTube',
          timestamp: 'hace 3 horas',
          thumbnail: '🎥',
          engagement: { likes: 445, comments: 78, shares: 234 }
        },
        {
          id: '4',
          title: `Información oficial sobre ${searchQuery}`,
          description: 'Fuentes gubernamentales y documentos oficiales relacionados con este tema.',
          url: '#',
          type: 'web',
          source: 'Gov.co',
          timestamp: 'hace 1 día',
          engagement: { likes: 89, comments: 12, shares: 45 }
        }
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type === activeTab || (activeTab === 'discussions' && result.type === 'discussion'));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return '📰';
      case 'video': return '🎥';
      case 'discussion': return '💬';
      default: return '🌐';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'discussion': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">🔍 Búsqueda Universal</h1>
            <p className="text-white/90 mb-8">
              Encuentra noticias, debates, videos y discusiones sobre temas de interés cívico
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Buscar noticias, debates, políticas, candidatos..."
                  className="w-full px-6 py-4 pl-14 pr-14 text-lg rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <FiX className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => handleSearch()}
                className="mt-4 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                Buscar ahora
              </button>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-10 max-h-96 overflow-y-auto">
                  {query === '' && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <FiTrendingUp className="w-5 h-5 text-orange-500" />
                          Temas trending
                        </h3>
                        {searchHistory.length > 0 && (
                          <button
                            onClick={clearHistory}
                            className="text-sm text-gray-500 hover:text-red-500"
                          >
                            Limpiar historial
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(suggestion.query);
                        handleSearch(suggestion.query);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        {suggestion.type === 'history' ? (
                          <FiClock className="w-4 h-4 text-gray-400" />
                        ) : (
                          <FiTrendingUp className="w-4 h-4 text-orange-500" />
                        )}
                        <span className="text-gray-900">{suggestion.query}</span>
                      </div>
                      {suggestion.count && (
                        <span className="text-sm text-gray-500">
                          {suggestion.count.toLocaleString()} búsquedas
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {loading && <LoadingSpinner message="Buscando en múltiples fuentes..." />}
        
        {!loading && results.length > 0 && (
          <>
            {/* Result Tabs */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Todos', count: results.length },
                  { key: 'news', label: 'Noticias', count: results.filter(r => r.type === 'news').length },
                  { key: 'videos', label: 'Videos', count: results.filter(r => r.type === 'video').length },
                  { key: 'discussions', label: 'Debates', count: results.filter(r => r.type === 'discussion').length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <div key={result.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    {result.thumbnail && (
                      <div className="text-4xl">{result.thumbnail}</div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)} {result.type === 'discussion' ? 'Debate' : 
                            result.type === 'news' ? 'Noticia' : 
                            result.type === 'video' ? 'Video' : 'Web'}
                        </span>
                        {result.source && (
                          <span className="text-sm text-gray-600">{result.source}</span>
                        )}
                        {result.timestamp && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{result.timestamp}</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">{result.description}</p>
                      
                      {result.engagement && (
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            👍 {result.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            💬 {result.engagement.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            📤 {result.engagement.shares}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta con términos diferentes o revisa los temas trending
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {trendingTopics.slice(0, 4).map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(topic.query);
                    handleSearch(topic.query);
                  }}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
                >
                  {topic.query}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;