import React, { useState, useEffect } from 'react';

interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  formattedUrl: string;
}

interface GoogleSearchProps {
  initialQuery?: string;
  autoSearch?: boolean;
}

const GoogleSearch: React.FC<GoogleSearchProps> = ({ initialQuery = '', autoSearch = false }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<GoogleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock Google search function for demonstration
  const performGoogleSearch = async (searchQuery: string): Promise<GoogleSearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock search results with Colombian political and civic content
    const mockResults: GoogleSearchResult[] = [
      {
        title: `${searchQuery} - Noticias Colombia | El Tiempo`,
        link: `https://www.eltiempo.com/search?q=${encodeURIComponent(searchQuery)}`,
        snippet: `Últimas noticias sobre ${searchQuery} en Colombia. Cobertura completa, análisis y reportes actualizados sobre los eventos más importantes del país.`,
        displayLink: 'www.eltiempo.com',
        formattedUrl: 'https://www.eltiempo.com › search'
      },
      {
        title: `${searchQuery} | Wikipedia, la enciclopedia libre`,
        link: `https://es.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`,
        snippet: `${searchQuery} puede referirse a varios artículos relacionados con política, gobierno y participación ciudadana en Colombia. Información verificada y actualizada.`,
        displayLink: 'es.wikipedia.org',
        formattedUrl: 'https://es.wikipedia.org › wiki'
      },
      {
        title: `Análisis: ${searchQuery} en el contexto político colombiano | Semana`,
        link: `https://www.semana.com/buscar?q=${encodeURIComponent(searchQuery)}`,
        snippet: `Análisis profundo sobre ${searchQuery} y su impacto en la política colombiana. Perspectivas de expertos, datos actualizados y opiniones especializadas.`,
        displayLink: 'www.semana.com',
        formattedUrl: 'https://www.semana.com › buscar'
      },
      {
        title: `${searchQuery} - Portal oficial del Gobierno de Colombia`,
        link: `https://www.gov.co/buscar?query=${encodeURIComponent(searchQuery)}`,
        snippet: `Información oficial del gobierno colombiano sobre ${searchQuery}. Documentos, políticas públicas y programas gubernamentales relacionados.`,
        displayLink: 'www.gov.co',
        formattedUrl: 'https://www.gov.co › buscar'
      },
      {
        title: `Participación ciudadana: ${searchQuery} | Transparencia Colombia`,
        link: `https://www.transparenciacolombia.org.co/search?q=${encodeURIComponent(searchQuery)}`,
        snippet: `Cómo los ciudadanos pueden participar en temas relacionados con ${searchQuery}. Herramientas, mecanismos y oportunidades de participación democrática.`,
        displayLink: 'www.transparenciacolombia.org.co',
        formattedUrl: 'https://www.transparenciacolombia.org.co › search'
      },
      {
        title: `${searchQuery} - Congreso de la República de Colombia`,
        link: `https://www.congreso.gov.co/buscar?termino=${encodeURIComponent(searchQuery)}`,
        snippet: `Actividad legislativa relacionada con ${searchQuery}. Proyectos de ley, debates parlamentarios y documentos oficiales del Congreso de Colombia.`,
        displayLink: 'www.congreso.gov.co',
        formattedUrl: 'https://www.congreso.gov.co › buscar'
      }
    ];

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Error temporal del servicio de búsqueda. Intenta nuevamente.');
    }

    return mockResults;
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchResults = await performGoogleSearch(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de búsqueda desconocido');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search on mount if specified
  useEffect(() => {
    if (autoSearch && initialQuery) {
      handleSearch();
    }
  }, [autoSearch, initialQuery]);

  const handleResultClick = (result: GoogleSearchResult) => {
    // Open in new tab for better UX
    window.open(result.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🔍</span>
          <div>
            <h1 className="text-3xl font-bold text-white">Google Search Colombia</h1>
            <p className="text-white/90">Búsqueda web especializada en contenido cívico y político</p>
          </div>
          <span className="text-4xl ml-auto">🇨🇴</span>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en la web sobre temas políticos y cívicos..."
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            disabled={loading}
            aria-label="Campo de búsqueda web"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Buscando...</span>
              </div>
            ) : (
              <>🔍 Buscar en Google</>
            )}
          </button>
        </div>
      </form>

      {/* Search Info */}
      {hasSearched && !loading && (
        <div className="mb-6 text-sm text-gray-600">
          {results.length > 0 ? (
            <p>Aproximadamente {results.length} resultados para "{query}"</p>
          ) : error ? (
            <p className="text-red-600">Error en la búsqueda</p>
          ) : (
            <p>No se encontraron resultados para "{query}"</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Buscando en Google...</h3>
          <p className="text-gray-600">Obteniendo los mejores resultados para tu consulta</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <span className="text-3xl mr-4">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-900 text-lg">Error de búsqueda</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={() => handleSearch()}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reintentar búsqueda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && !loading && (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleResultClick(result)}
            >
              <div className="p-6">
                {/* Result URL */}
                <div className="flex items-center mb-2">
                  <span className="text-green-700 text-sm font-medium">{result.displayLink}</span>
                  <span className="text-gray-400 text-sm ml-2">› {result.formattedUrl}</span>
                </div>

                {/* Result Title */}
                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-3 hover:underline">
                  {result.title}
                </h3>

                {/* Result Snippet */}
                <p className="text-gray-700 leading-relaxed mb-4">{result.snippet}</p>

                {/* Result Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      🔗 Enlace externo
                    </span>
                    <span className="text-gray-500 text-sm">
                      🌐 Fuente: {result.displayLink}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Resultado #{index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <div className="flex items-start">
              <span className="text-blue-600 text-xl mr-3">ℹ️</span>
              <div>
                <h4 className="font-semibold text-blue-900">Sobre estos resultados</h4>
                <p className="text-blue-800 text-sm mt-1">
                  Los resultados mostrados son enlaces a sitios web externos. Nuestro Pulso no controla 
                  el contenido de estos sitios. Verifica siempre la veracidad de la información con fuentes oficiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results State */}
      {hasSearched && !loading && results.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6">
            Tu búsqueda "{query}" no produjo resultados. Intenta con otros términos de búsqueda.
          </p>
          <div className="space-y-2 text-gray-600">
            <p className="font-medium">Sugerencias:</p>
            <ul className="text-sm space-y-1">
              <li>• Verifica la ortografía de tu búsqueda</li>
              <li>• Usa términos más generales</li>
              <li>• Prueba con palabras clave diferentes</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSearch;