import React, { useState } from 'react';

// Enhanced search function with comprehensive mock data for extensive results
async function searchGoogleAPI(query: string, page: number = 1): Promise<{results: any[], totalResults: number, hasMore: boolean}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Simulate potential error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Error de conexión con el servicio de búsqueda. Intenta nuevamente.');
  }

  const resultsPerPage = 10;
  const baseResults = [
    {
      title: `${query} - Últimas Noticias Colombia | El Tiempo`,
      link: `https://www.eltiempo.com/buscar/${encodeURIComponent(query)}`,
      snippet: `Últimas noticias sobre ${query} en Colombia. Reportajes, análisis y cobertura en tiempo real de los eventos más importantes del país. Información verificada y actualizada.`
    },
    {
      title: `${query} - Noticias RCN Colombia`,
      link: `https://www.rcnradio.com/buscar/${encodeURIComponent(query)}`,
      snippet: `Cobertura completa sobre ${query} en RCN Radio. Entrevistas exclusivas, reportes especiales y análisis de expertos sobre el tema en Colombia.`
    },
    {
      title: `${query} - Caracol Noticias`,
      link: `https://noticias.caracoltv.com/buscar/${encodeURIComponent(query)}`,
      snippet: `Caracol Noticias presenta información detallada sobre ${query}. Videos, artículos y reportajes que explican el contexto y las implicaciones para Colombia.`
    },
    {
      title: `${query} - Wikipedia en Español`,
      link: `https://es.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      snippet: `Artículo enciclopédico sobre ${query}. Historia, contexto, datos relevantes y referencias verificadas. Información neutral y bien documentada.`
    },
    {
      title: `${query} - BBC News Mundo`,
      link: `https://www.bbc.com/mundo/buscar/${encodeURIComponent(query)}`,
      snippet: `BBC Mundo reporta sobre ${query} con perspectiva internacional. Análisis profundo, contexto global y cobertura de eventos relacionados con América Latina.`
    },
    {
      title: `${query} - CNN en Español`,
      link: `https://cnnespanol.cnn.com/buscar/${encodeURIComponent(query)}`,
      snippet: `CNN en Español cubre ${query} con reportes exclusivos. Entrevistas a expertos, análisis político y social, y seguimiento de desarrollos importantes.`
    },
    {
      title: `${query} - Semana Magazine`,
      link: `https://www.semana.com/buscar/${encodeURIComponent(query)}`,
      snippet: `Revista Semana analiza ${query} desde múltiples perspectivas. Investigación periodística, opiniones de expertos y análisis de impacto en Colombia.`
    },
    {
      title: `${query} - El Espectador`,
      link: `https://www.elespectador.com/buscar/${encodeURIComponent(query)}`,
      snippet: `El Espectador presenta reportes investigativos sobre ${query}. Periodismo de calidad, análisis profundo y cobertura integral de eventos nacionales.`
    },
    {
      title: `${query} - Gobierno de Colombia`,
      link: `https://www.gov.co/buscar/${encodeURIComponent(query)}`,
      snippet: `Información oficial del gobierno colombiano sobre ${query}. Comunicados, políticas públicas, normativas y posición oficial del Estado.`
    },
    {
      title: `${query} - YouTube Videos`,
      link: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      snippet: `Videos relacionados con ${query} en YouTube. Documentales, entrevistas, conferencias y contenido audiovisual sobre el tema.`
    },
    {
      title: `${query} - Twitter Tendencias`,
      link: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
      snippet: `Conversaciones en tiempo real sobre ${query} en Twitter. Opiniones públicas, tendencias y discusiones actuales sobre el tema.`
    },
    {
      title: `${query} - Facebook Posts`,
      link: `https://www.facebook.com/search/top/?q=${encodeURIComponent(query)}`,
      snippet: `Publicaciones y discusiones sobre ${query} en Facebook. Comunidades, páginas oficiales y contenido compartido por usuarios.`
    },
    {
      title: `${query} - Reddit Discussions`,
      link: `https://www.reddit.com/search/?q=${encodeURIComponent(query)}`,
      snippet: `Discusiones detalladas sobre ${query} en Reddit. Opiniones diversas, análisis de usuarios y debates sobre diferentes aspectos del tema.`
    },
    {
      title: `${query} - Academic Papers`,
      link: `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`,
      snippet: `Investigaciones académicas sobre ${query}. Papers, estudios científicos, tesis y publicaciones revisadas por pares sobre el tema.`
    },
    {
      title: `${query} - News Google`,
      link: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
      snippet: `Compilación de noticias sobre ${query} de múltiples fuentes. Agregador de medios internacionales y locales con cobertura completa.`
    }
  ];

  // Create variations of results for different pages
  const startIndex = (page - 1) * resultsPerPage;
  const totalResults = 150; // Simulate large number of results
  
  const results = baseResults.map((result, index) => ({
    ...result,
    title: `${result.title} - Página ${page} Resultado ${startIndex + index + 1}`,
    snippet: `${result.snippet} [Resultado ${startIndex + index + 1} de ${totalResults}]`,
    id: `${page}-${index}`
  }));

  return {
    results: results.slice(0, resultsPerPage),
    totalResults,
    hasMore: startIndex + resultsPerPage < totalResults
  };
}

const GoogleWebSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discussId, setDiscussId] = useState<string | null>(null);
  const [threads, setThreads] = useState<{[key: string]: { user: string, text: string }[] }>({});
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  async function handleSearch(e: React.FormEvent, newSearch: boolean = true) {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (newSearch) {
      setResults([]);
      setCurrentPage(1);
      setSearchQuery(query);
    }
    
    setLoading(newSearch);
    setLoadingMore(!newSearch);
    setError(null);
    setDiscussId(null);
    
    try {
      const page = newSearch ? 1 : currentPage + 1;
      const searchResults = await searchGoogleAPI(query, page);
      
      if (newSearch) {
        setResults(searchResults.results);
      } else {
        setResults(prev => [...prev, ...searchResults.results]);
        setCurrentPage(page);
      }
      
      setTotalResults(searchResults.totalResults);
      setHasMore(searchResults.hasMore);
    } catch (err: any) {
      setError(err.message || "Error al buscar en Google. Intenta nuevamente.");
    }
    
    setLoading(false);
    setLoadingMore(false);
  }

  async function loadMoreResults() {
    if (!hasMore || loadingMore) return;
    
    const dummyEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSearch(dummyEvent, false);
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
          <div className="flex space-x-3">
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const LoadingMoreSkeleton = () => (
    <div className="space-y-4 mt-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
          <div className="flex space-x-3">
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
            <div className="w-20 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <form onSubmit={(e) => handleSearch(e, true)} className="mb-6">
        <div className="flex gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar noticias, temas cívicos, políticos... (ej: terror news, Donald Trump, congreso)"
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
        
        {/* Search Stats */}
        {results.length > 0 && !loading && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">
              📊 Mostrando {results.length} de {totalResults.toLocaleString()} resultados para "{searchQuery}"
            </span>
            {hasMore && (
              <span className="ml-4 text-blue-600">
                • Continúa desplazándote para ver más resultados
              </span>
            )}
          </div>
        )}
      </form>

      {/* Search Tips */}
      {!query && !results.length && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Búsquedas populares y sugeridas:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'terror news', 
              'noticias terror colombia', 
              'Donald Trump Colombia', 
              'Trump aranceles colombia',
              'congreso reformas 2024', 
              'seguridad fronteras',
              'amenazas terroristas venezuela',
              'tecnología digital colombia',
              'política exterior trump',
              'violencia fronteriza'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <p className="text-blue-700 text-sm mt-3">
            💫 Estas búsquedas mostrarán páginas y páginas de resultados relevantes de toda la web
          </p>
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
              📊 {results.length} de {totalResults.toLocaleString()} resultados para "{searchQuery}"
            </h3>
            <button
              onClick={() => {setResults([]); setQuery(''); setSearchQuery(''); setCurrentPage(1);}}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Limpiar resultados
            </button>
          </div>

          {results.map((item, index) => (
            <div key={item.id || item.link} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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

          {/* Load More Section */}
          {loadingMore && <LoadingMoreSkeleton />}
          
          {hasMore && !loadingMore && (
            <div className="text-center py-6">
              <button
                onClick={loadMoreResults}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                📄 Cargar más resultados (página {currentPage + 1})
              </button>
              <p className="text-gray-600 mt-3">
                Mostrando {results.length} de {totalResults.toLocaleString()} resultados totales
              </p>
            </div>
          )}

          {!hasMore && results.length >= 10 && (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Has visto todos los resultados disponibles
              </h3>
              <p className="text-gray-600">
                Se mostraron {results.length} de {totalResults.toLocaleString()} resultados para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleWebSearchBar;