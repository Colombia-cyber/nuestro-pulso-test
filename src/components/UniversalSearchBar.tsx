import React, { useState, useEffect } from 'react';

// Enhanced search API configuration
const GOOGLE_API_KEY = "AIzaSyB1wdNIgV2qUdJ8lUzjhKoRnYHpwi_QAWQ";
const GOOGLE_CX = "b1da68d0c729b40ae";
const NEWS_API_KEY = "your-news-api-key"; // Replace with actual News API key

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  link: string;
  source: string;
  type: 'web' | 'news' | 'video' | 'user' | 'topic';
  thumbnail?: string;
  publishedAt?: string;
  relevanceScore?: number;
}

interface SearchSuggestion {
  text: string;
  type: 'recent' | 'trending' | 'suggestion';
  icon: string;
}

const UniversalSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Mock trending topics and suggestions
  const trendingSuggestions: SearchSuggestion[] = [
    { text: 'Donald Trump', type: 'trending', icon: '🔥' },
    { text: 'Reforma Tributaria Colombia', type: 'trending', icon: '🔥' },
    { text: 'Elecciones 2026', type: 'trending', icon: '🔥' },
    { text: 'Paz Total', type: 'trending', icon: '🔥' },
    { text: 'Cambio Climático', type: 'trending', icon: '🔥' },
    { text: 'Corrupción Colombia', type: 'trending', icon: '🔥' },
    { text: 'Educación Pública', type: 'trending', icon: '🔥' },
    { text: 'Sistema de Salud', type: 'trending', icon: '🔥' },
  ];

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      // Show suggestions based on query
      const filtered = trendingSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      );
      const recent = searchHistory
        .filter(h => h.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(h => ({ text: h, type: 'recent' as const, icon: '🕒' }));
      
      setSuggestions([...recent, ...filtered.slice(0, 5)]);
    } else {
      setSuggestions(trendingSuggestions.slice(0, 8));
    }
  }, [query, searchHistory]);

  const searchGoogleAPI = async (searchQuery: string): Promise<SearchResult[]> => {
    const params = new URLSearchParams({
      key: GOOGLE_API_KEY,
      cx: GOOGLE_CX,
      q: `${searchQuery} Colombia site:gov.co OR site:edu.co OR site:org.co`,
      num: '10'
    });
    
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`);
    if (!response.ok) throw new Error('Google Search API error');
    
    const data = await response.json();
    return (data.items || []).map((item: any) => ({
      id: item.cacheId || item.link,
      title: item.title,
      snippet: item.snippet,
      link: item.link,
      source: new URL(item.link).hostname,
      type: 'web' as const,
      thumbnail: item.pagemap?.cse_image?.[0]?.src,
      relevanceScore: Math.random() * 100 // Mock relevance
    }));
  };

  const searchNewsAPI = async (searchQuery: string): Promise<SearchResult[]> => {
    // Mock news results - in production, use actual News API
    const mockNews: SearchResult[] = [
      {
        id: '1',
        title: `${searchQuery}: Últimas noticias y análisis en Colombia`,
        snippet: `Cobertura completa sobre ${searchQuery} con análisis político y social desde Colombia.`,
        link: `https://news.example.com/colombia/${searchQuery.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'El Tiempo',
        type: 'news',
        publishedAt: '2024-01-15T10:30:00Z',
        thumbnail: '📰',
        relevanceScore: 95
      },
      {
        id: '2',
        title: `Debate sobre ${searchQuery} en el Congreso colombiano`,
        snippet: `Senadores y representantes discuten las implicaciones de ${searchQuery} para el país.`,
        link: `https://congreso.gov.co/debates/${searchQuery.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Congreso de Colombia',
        type: 'news',
        publishedAt: '2024-01-14T15:45:00Z',
        thumbnail: '🏛️',
        relevanceScore: 88
      }
    ];
    
    return mockNews;
  };

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setShowResults(true);
    
    try {
      // Perform parallel searches
      const [googleResults, newsResults] = await Promise.all([
        searchGoogleAPI(searchQuery),
        searchNewsAPI(searchQuery)
      ]);
      
      // Combine and sort by relevance
      const combinedResults = [...googleResults, ...newsResults]
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      
      setResults(combinedResults);
      
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
    } catch (err) {
      setError('Error al realizar la búsqueda. Intenta de nuevo.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const openFullPageCard = (result: SearchResult) => {
    setSelectedResult(result);
  };

  if (selectedResult) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* Full-page topic card */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {/* Header */}
          <div className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
              <button 
                onClick={() => setSelectedResult(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
              >
                ← Volver a resultados
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedResult.thumbnail || '📄'}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedResult.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <span className={`px-3 py-1 rounded-full text-white ${
                      selectedResult.type === 'news' ? 'bg-red-500' :
                      selectedResult.type === 'video' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}>
                      {selectedResult.type === 'news' ? '📰 Noticia' :
                       selectedResult.type === 'video' ? '🎥 Video' : '🌐 Web'}
                    </span>
                    <span>{selectedResult.source}</span>
                    {selectedResult.publishedAt && (
                      <span>• {new Date(selectedResult.publishedAt).toLocaleDateString('es-CO')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      {selectedResult.snippet}
                    </p>
                    
                    {/* Rich content based on topic */}
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">📊 Información Clave</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Relevancia nacional: {selectedResult.relevanceScore?.toFixed(0)}%</li>
                          <li>• Impacto ciudadano: Alto</li>
                          <li>• Fuente verificada: ✅</li>
                          <li>• Última actualización: Hoy</li>
                        </ul>
                      </div>

                      {selectedResult.type === 'news' && (
                        <div className="bg-yellow-50 rounded-lg p-6">
                          <h3 className="text-xl font-semibold mb-3">🎬 Videos Relacionados</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="bg-gradient-to-r from-red-500 to-pink-500 h-32 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-white text-3xl">📺</span>
                              </div>
                              <h4 className="font-semibold mb-2">Análisis en profundidad</h4>
                              <p className="text-sm text-gray-600">Expertos analizan las implicaciones</p>
                              <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">
                                ▶️ Ver ahora
                              </button>
                            </div>
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-white text-3xl">🎙️</span>
                              </div>
                              <h4 className="font-semibold mb-2">Debate ciudadano</h4>
                              <p className="text-sm text-gray-600">Opiniones de la comunidad</p>
                              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                                🗣️ Participar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Hub */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">💬 Discusión Comunitaria</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">Este tema es fundamental para el futuro del país.</p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                          <span>María G.</span>
                          <span>•</span>
                          <span>hace 5 min</span>
                          <button className="text-blue-600">👍 12</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">C</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">Necesitamos más transparencia en este proceso.</p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                          <span>Carlos R.</span>
                          <span>•</span>
                          <span>hace 8 min</span>
                          <button className="text-blue-600">👍 8</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <textarea 
                      placeholder="Comparte tu opinión..."
                      className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-yellow-500">😊</button>
                        <button className="text-gray-400 hover:text-blue-500">📎</button>
                        <button className="text-gray-400 hover:text-purple-500">🎥</button>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">⚡ Acciones Rápidas</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600">
                      📤 Compartir en redes
                    </button>
                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600">
                      🗣️ Crear debate
                    </button>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600">
                      📊 Hacer encuesta
                    </button>
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600">
                      📺 Ver videos
                    </button>
                  </div>
                </div>

                {/* Related topics */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">🔗 Temas Relacionados</h3>
                  <div className="space-y-2">
                    {['Reforma Política', 'Transparencia', 'Participación Ciudadana', 'Democracia'].map((topic, index) => (
                      <button 
                        key={index}
                        className="block w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mx-4 mb-6">
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              placeholder="Busca cualquier cosa... más poderoso que Google"
              className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {/* Suggestions dropdown */}
        {showResults && (
          <div className="absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-xl z-50 mt-2">
            {query.length === 0 ? (
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">🔥 Trending ahora</h4>
                <div className="space-y-2">
                  {suggestions.slice(0, 8).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <span className="mr-2">{suggestion.icon}</span>
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {loading && (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Buscando en tiempo real...</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 text-red-600 text-center">
                    {error}
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        {results.length} resultados para "{query}"
                      </h4>
                      <button 
                        onClick={() => setShowResults(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {results.slice(0, 6).map((result) => (
                        <div
                          key={result.id}
                          onClick={() => openFullPageCard(result)}
                          className="p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-blue-200 cursor-pointer transition-all"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{result.thumbnail || '📄'}</div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {result.title}
                              </h5>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                {result.snippet}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span className={`px-2 py-1 rounded ${
                                  result.type === 'news' ? 'bg-red-100 text-red-700' :
                                  result.type === 'video' ? 'bg-purple-100 text-purple-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {result.type}
                                </span>
                                <span>{result.source}</span>
                                <span>•</span>
                                <span>Relevancia: {result.relevanceScore?.toFixed(0)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {results.length > 6 && (
                      <button className="w-full mt-4 py-3 text-blue-600 hover:text-blue-800 font-medium">
                        Ver todos los {results.length} resultados →
                      </button>
                    )}
                  </div>
                )}

                {!loading && results.length === 0 && query.length > 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <div className="text-4xl mb-2">🔍</div>
                    <p>No se encontraron resultados para "{query}"</p>
                    <p className="text-sm mt-1">Intenta con otros términos</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default UniversalSearchBar;