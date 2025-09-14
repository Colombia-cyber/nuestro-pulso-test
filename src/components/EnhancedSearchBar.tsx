import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  link: string;
  source: string;
  type: 'web' | 'news' | 'video';
  thumbnail?: string;
  publishedAt?: string;
}

interface EnhancedSearchBarProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const GOOGLE_API_KEY = "AIzaSyB1wdNIgV2qUdJ8lUzjhKoRnYHpwi_QAWQ";
const GOOGLE_CX = "b1da68d0c729b40ae";
const NEWS_API_KEY = "8f7e4b3c2a1d9e6f5c4b3a2d1e0f9e8d"; // Placeholder - replace with real API key

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ visible, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<'all' | 'web' | 'news' | 'videos'>('all');
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const navigate = useNavigate();

  const searchSuggestions = [
    "🇨🇴 Elecciones Colombia 2024",
    "💰 Reforma tributaria",
    "🏛️ Congreso de la República",
    "📊 Encuestas políticas",
    "🌱 Política ambiental",
    "👥 Derechos humanos",
    "💼 Economía colombiana",
    "🎓 Educación pública"
  ];

  async function searchGoogle(searchQuery: string): Promise<SearchResult[]> {
    try {
      const params = new URLSearchParams({
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: searchQuery,
        num: '10'
      });
      
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
      const data = await response.json();
      
      return (data.items || []).map((item: any) => ({
        id: item.cacheId || item.link,
        title: item.title,
        snippet: item.snippet,
        link: item.link,
        source: item.displayLink,
        type: 'web' as const,
        thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src
      }));
    } catch (error) {
      console.error('Error searching Google:', error);
      return [];
    }
  }

  async function searchNews(searchQuery: string): Promise<SearchResult[]> {
    // Simulated news results - in production, integrate with News API
    const mockNews: SearchResult[] = [
      {
        id: 'news-1',
        title: `Últimas noticias sobre "${searchQuery}" en Colombia`,
        snippet: `Cobertura completa sobre ${searchQuery} con análisis político y social. Manténgase informado sobre los desarrollos más recientes.`,
        link: '#',
        source: 'El Tiempo',
        type: 'news',
        publishedAt: '2024-01-15T10:30:00Z',
        thumbnail: '📰'
      },
      {
        id: 'news-2',
        title: `${searchQuery}: Perspectiva conservadora`,
        snippet: `Análisis desde una perspectiva conservadora sobre ${searchQuery} y su impacto en las políticas públicas colombianas.`,
        link: '#',
        source: 'El Colombiano',
        type: 'news',
        publishedAt: '2024-01-15T08:15:00Z',
        thumbnail: '🗳️'
      }
    ];
    
    return searchQuery ? mockNews : [];
  }

  async function searchVideos(searchQuery: string): Promise<SearchResult[]> {
    // Simulated video results - in production, integrate with YouTube API
    const mockVideos: SearchResult[] = [
      {
        id: 'video-1',
        title: `Debate sobre ${searchQuery} - Análisis Completo`,
        snippet: `Video análisis detallado sobre ${searchQuery} con expertos en política colombiana. Duración: 15:30`,
        link: '#',
        source: 'YouTube',
        type: 'video',
        thumbnail: '📺'
      }
    ];
    
    return searchQuery ? mockVideos : [];
  }

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setResults([]);
    
    try {
      let allResults: SearchResult[] = [];
      
      if (searchType === 'all' || searchType === 'web') {
        const webResults = await searchGoogle(searchQuery);
        allResults = [...allResults, ...webResults];
      }
      
      if (searchType === 'all' || searchType === 'news') {
        const newsResults = await searchNews(searchQuery);
        allResults = [...allResults, ...newsResults];
      }
      
      if (searchType === 'all' || searchType === 'videos') {
        const videoResults = await searchVideos(searchQuery);
        allResults = [...allResults, ...videoResults];
      }
      
      setResults(allResults);
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openResultDetail = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const closeResultDetail = () => {
    setSelectedResult(null);
  };

  const goToCommunityDiscussion = (result: SearchResult) => {
    // Navigate to community hub with the topic
    onNavigate('community');
    closeResultDetail();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">🔍 Búsqueda Universal</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Search Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="mb-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar cualquier tema... mejor que Google"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {loading ? '⏳' : '🔍'} Buscar
              </button>
            </div>
          </form>
          
          {/* Search Type Filters */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: '🌐 Todo', },
              { key: 'web', label: '🔗 Web' },
              { key: 'news', label: '📰 Noticias' },
              { key: 'videos', label: '📺 Videos' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSearchType(key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === key
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!query && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">🔥 Búsquedas populares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion.replace(/^[🇨🇴💰🏛️📊🌱👥💼🎓]\s/, ''));
                      handleSearch(suggestion.replace(/^[🇨🇴💰🏛️📊🌱👥💼🎓]\s/, ''));
                    }}
                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Buscando en todas las fuentes...</p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                📊 {results.length} resultados para "{query}"
              </h3>
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => openResultDetail(result)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl flex-shrink-0">
                        {result.type === 'web' ? '🔗' : result.type === 'news' ? '📰' : '📺'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">
                          {result.title}
                        </h4>
                        <p className="text-gray-700 text-sm mb-2">{result.snippet}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>📍 {result.source}</span>
                          {result.publishedAt && (
                            <span>⏰ {new Date(result.publishedAt).toLocaleDateString()}</span>
                          )}
                          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedResult.title}</h2>
                <button
                  onClick={closeResultDetail}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>📍 {selectedResult.source}</span>
                {selectedResult.publishedAt && (
                  <span>⏰ {new Date(selectedResult.publishedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">{selectedResult.snippet}</p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">💬 Discutir en Comunidad</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    ¿Quieres compartir tu opinión sobre este tema con otros colombianos?
                  </p>
                  <button
                    onClick={() => goToCommunityDiscussion(selectedResult)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Ir al Hub Comunitario
                  </button>
                </div>
                
                <div className="flex gap-4 flex-wrap">
                  <a
                    href={selectedResult.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    🔗 Ver fuente original
                  </a>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    📤 Compartir
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    💾 Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;