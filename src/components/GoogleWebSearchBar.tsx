import React, { useState } from 'react';

/**
 * Google Web Search Bar Component
 * 
 * IMPORTANT: This is frontend code, uses import.meta.env.VITE_*
 * 
 * Environment Variables Required:
 * - VITE_GOOGLE_API_KEY: Google API key for Custom Search
 * - VITE_GOOGLE_CX: Google Custom Search Engine ID
 * 
 * If API keys are not configured, falls back to mock search results.
 */

// Get environment variables with proper error handling
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

// Warn if API keys are missing
if (!GOOGLE_API_KEY || !GOOGLE_CX) {
  console.warn('⚠️ Google Custom Search not configured. Set VITE_GOOGLE_API_KEY and VITE_GOOGLE_CX in .env file.');
}

async function searchGoogleAPI(query: string) {
  // Check if API keys are configured
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    console.warn('Google API keys not configured, using mock data');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    return [
      {
        title: `Resultados sobre "${query}" - Noticias Colombia`,
        link: 'https://example.com/colombia-news',
        snippet: `Últimas noticias sobre ${query} en Colombia. Análisis, reportes y cobertura actualizada de los eventos más importantes del país.`
      },
      {
        title: `${query} - Wikipedia`,
        link: 'https://es.wikipedia.org/wiki/' + encodeURIComponent(query),
        snippet: `Información enciclopédica sobre ${query}. Historia, contexto y datos relevantes de fuentes confiables.`
      },
      {
        title: `Análisis: ${query} en el contexto colombiano`,
        link: 'https://example.com/analysis',
        snippet: `Análisis profundo sobre ${query} y su impacto en la sociedad colombiana. Perspectivas de expertos y datos actualizados.`
      }
    ];
  }

  try {
    // Use real Google Custom Search API
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}&num=10&lr=lang_es`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
    })) || [];
  } catch (error) {
    console.error('Google API search failed:', error);
    // Fallback to mock data on API failure
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        title: `Resultados sobre "${query}" - Noticias Colombia (Mock)`,
        link: 'https://example.com/colombia-news',
        snippet: `Búsqueda falló, mostrando datos de ejemplo para ${query} en Colombia.`
      }
    ];
  }
}

const GoogleWebSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discussId, setDiscussId] = useState<string | null>(null);
  const [threads, setThreads] = useState<{[key: string]: { user: string, text: string }[] }>({});
  const [comment, setComment] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setDiscussId(null);
    
    try {
      const googleResults = await searchGoogleAPI(query);
      setResults(googleResults);
    } catch (err: any) {
      setError("Error al buscar en Google. Intenta nuevamente.");
    }
    setLoading(false);
  }

  function handleDiscuss(link: string) {
    setDiscussId(discussId === link ? null : link);
  }

  function postComment(link: string, text: string) {
    setThreads(prev => ({
      ...prev,
      [link]: [...(prev[link] || []), { user: "Usuario Actual", text }]
    }));
    setComment('');
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar noticias, temas cívicos, políticos..."
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '🔄' : '🔍'} Buscar
          </button>
        </div>
      </form>

      {/* Search Tips */}
      {!query && !results.length && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Sugerencias de búsqueda:</h3>
          <div className="flex flex-wrap gap-2">
            {['Donald Trump Colombia', 'Terror fronteras', 'Congreso reformas', 'Tecnología digital'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-gray-600">Buscando resultados relevantes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-900">Error de búsqueda</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && !error && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o palabras clave diferentes.</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              📊 {results.length} resultados para "{query}"
            </h3>
            <button
              onClick={() => {setResults([]); setQuery('');}}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Limpiar resultados
            </button>
          </div>

          {results.map((item, index) => (
            <div key={item.link} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.title}
                    </a>
                  </h4>
                  <span className="text-sm text-gray-500 ml-4">#{index + 1}</span>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{item.snippet}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      🔗 Visitar sitio
                    </a>
                    <button
                      onClick={() => handleDiscuss(item.link)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                    >
                      💬 {discussId === item.link ? 'Cerrar' : 'Discutir'}
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {threads[item.link]?.length || 0} comentarios
                  </div>
                </div>

                {/* Discussion Thread */}
                {discussId === item.link && (
                  <div className="mt-6 bg-gray-50 rounded-lg p-4 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-4">💭 Discusión sobre este resultado</h5>
                    
                    {/* Existing Comments */}
                    <div className="space-y-3 mb-4">
                      {(threads[item.link] || []).map((c, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-start space-x-3">
                            <div className="text-lg">👤</div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">{c.user}</div>
                              <p className="text-gray-700 mt-1">{c.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {(!threads[item.link] || threads[item.link].length === 0) && (
                        <p className="text-gray-500 text-center py-4">
                          🌟 Sé el primero en comentar sobre este resultado
                        </p>
                      )}
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={e => {
                      e.preventDefault();
                      if (comment.trim()) {
                        postComment(item.link, comment);
                      }
                    }}>
                      <div className="flex gap-3">
                        <input
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          placeholder="Comparte tu opinión sobre este resultado..."
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!comment.trim()}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          Comentar
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleWebSearchBar;