import React, { useState, useEffect, useCallback, useRef } from 'react';
import { activityTracker } from '../services/ActivityTracker';
import { searchService, SearchResult, SearchResponse } from '../services/searchService';
import { getSearchCategories, getCategoryById } from '../config/categories';

interface DualSearchBarProps {
  onResults?: (response: SearchResponse) => void;
  onArticleClick?: (article: any) => void;
}

// Enhanced search result interface
interface EnhancedSearchResult extends SearchResult {
  type?: 'article' | 'video' | 'reel' | 'document' | 'social';
  attachments?: string[];
  platform?: 'web' | 'twitter' | 'facebook' | 'youtube' | 'whatsapp';
  engagement?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  content?: string; // Add content field
}

const DualSearchBar: React.FC<DualSearchBarProps> = ({ onResults, onArticleClick }) => {
  const [globalQuery, setGlobalQuery] = useState('');
  const [localQuery, setLocalQuery] = useState('');
  const [globalResults, setGlobalResults] = useState<EnhancedSearchResult[]>([]);
  const [localResults, setLocalResults] = useState<EnhancedSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState<'global' | 'local' | 'both'>('both');
  const [currentPage, setCurrentPage] = useState(1);
  const [globalSuggestions, setGlobalSuggestions] = useState<string[]>([]);
  const [localSuggestions, setLocalSuggestions] = useState<string[]>([]);
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false);
  const [showLocalSuggestions, setShowLocalSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [filter, setFilter] = useState('todos');
  const [liveUpdates, setLiveUpdates] = useState(true);

  const globalInputRef = useRef<HTMLInputElement>(null);
  const localInputRef = useRef<HTMLInputElement>(null);
  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const categories = getSearchCategories();
  const allCategories = [{ id: 'todos', name: 'Todas las categorías', icon: '🌐' }, ...categories];

  // Global search suggestions (worldwide)
  const globalSearchSuggestions = [
    'Global politics news',
    'International trade agreements',
    'Climate change policies',
    'Economic trends worldwide',
    'Technology innovation',
    'Social justice movements'
  ];

  // Colombia-specific search suggestions
  const localSearchSuggestions = [
    'Gustavo Petro políticas',
    'Reforma tributaria Colombia',
    'Congreso de la República',
    'Elecciones regionales 2024',
    'Acuerdo de paz implementación',
    'Seguridad fronteriza Venezuela',
    'Corrupción investigaciones',
    'Economía colombiana 2024'
  ];

  // Mock enhanced search function
  const performEnhancedSearch = useCallback(async (
    query: string, 
    scope: 'global' | 'local',
    page: number = 1
  ): Promise<EnhancedSearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockResults: EnhancedSearchResult[] = scope === 'global' ? [
      {
        id: 'g1',
        title: 'Global Economic Outlook 2024: Impact on Latin America',
        summary: 'International Monetary Fund releases comprehensive analysis of global economic trends affecting emerging markets including Colombia.',
        content: 'The latest IMF report highlights significant economic shifts that will impact Latin American countries...',
        url: 'https://example.com/global-economy',
        source: 'International Monetary Fund',
        author: 'IMF Economic Team',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: 'economia',
        relevanceScore: 95,
        image: '🌍',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 45200,
          likes: 1890,
          shares: 567,
          comments: 234
        },
        tags: ['global-economy', 'latin-america', 'imf', 'forecast']
      },
      {
        id: 'g2',
        title: 'Climate Summit 2024: Latin American Countries Lead Initiative',
        summary: 'Colombia among key nations pushing for stronger climate action commitments at international level.',
        content: 'At the global climate summit, Latin American nations are taking a leadership role...',
        url: 'https://example.com/climate-summit',
        source: 'UN Climate Change',
        author: 'Environmental Correspondent',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: 'ambiente',
        relevanceScore: 88,
        image: '🌱',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 32100,
          likes: 2340,
          shares: 890,
          comments: 156
        },
        tags: ['climate-change', 'summit', 'colombia', 'environment']
      },
      {
        id: 'g3',
        title: 'International Trade: New Opportunities for Colombia',
        summary: 'Global trade agreements create new export opportunities for Colombian agricultural products and services.',
        content: 'Recent international trade developments open new markets for Colombian exports...',
        url: 'https://example.com/trade-opportunities',
        source: 'World Trade Organization',
        author: 'Trade Analysis Team',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        category: 'economia',
        relevanceScore: 82,
        image: '📈',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 28700,
          likes: 1567,
          shares: 432,
          comments: 89
        },
        tags: ['trade', 'exports', 'agriculture', 'international']
      }
    ] : [
      {
        id: 'l1',
        title: 'Congreso aprueba modificaciones a la Reforma Tributaria',
        summary: 'El Senado colombiano aprueba cambios importantes que afectarán a las clases medias y empresas del país.',
        content: 'En una sesión extraordinaria, el Congreso de la República aprobó las modificaciones...',
        url: 'https://example.com/reforma-tributaria',
        source: 'El Tiempo',
        author: 'Redacción Política',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        category: 'politica',
        relevanceScore: 98,
        image: '🏛️',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 89400,
          likes: 3456,
          shares: 1234,
          comments: 567
        },
        tags: ['reforma-tributaria', 'congreso', 'impuestos', 'petro']
      },
      {
        id: 'l2',
        title: 'Nuevo Plan de Seguridad para Zonas Rurales de Colombia',
        summary: 'Gobierno nacional anuncia inversión de $2 billones para mejorar seguridad en áreas rurales afectadas por violencia.',
        content: 'El Ministerio de Defensa presentó un plan integral para fortalecer la seguridad...',
        url: 'https://example.com/seguridad-rural',
        source: 'RCN Radio',
        author: 'Corresponsal de Seguridad',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: 'seguridad',
        relevanceScore: 91,
        image: '🚨',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 62300,
          likes: 2890,
          shares: 890,
          comments: 345
        },
        tags: ['seguridad', 'rural', 'inversion', 'violencia']
      },
      {
        id: 'l3',
        title: 'Colombia lidera proyectos de energía renovable en la región',
        summary: 'Nuevos parques solares y eólicos posicionan al país como líder en transición energética en América Latina.',
        content: 'Los proyectos de energía renovable en Colombia han mostrado un crecimiento...',
        url: 'https://example.com/energia-renovable',
        source: 'Portafolio',
        author: 'Equipo de Energía',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        category: 'ambiente',
        relevanceScore: 85,
        image: '⚡',
        type: 'article',
        platform: 'web',
        engagement: {
          views: 34500,
          likes: 1890,
          shares: 567,
          comments: 123
        },
        tags: ['energia-renovable', 'solar', 'eolica', 'transicion']
      }
    ];

    // Filter by category if needed
    if (filter !== 'todos') {
      return mockResults.filter(result => result.category === filter);
    }

    return mockResults;
  }, [filter]);

  // Perform dual search
  const performDualSearch = useCallback(async () => {
    if (!globalQuery.trim() && !localQuery.trim()) return;

    setLoading(true);
    try {
      const [globalResults, localResults] = await Promise.all([
        globalQuery.trim() ? performEnhancedSearch(globalQuery, 'global', currentPage) : Promise.resolve([]),
        localQuery.trim() ? performEnhancedSearch(localQuery, 'local', currentPage) : Promise.resolve([])
      ]);

      setGlobalResults(globalResults);
      setLocalResults(localResults);

      // Track searches
      if (globalQuery.trim()) {
        activityTracker.trackSearch(globalQuery, globalResults.length, 'global');
      }
      if (localQuery.trim()) {
        activityTracker.trackSearch(localQuery, localResults.length, 'local-colombia');
      }

      // Combine results for callback
      const combinedResponse: SearchResponse = {
        query: globalQuery || localQuery || '',
        results: [...globalResults, ...localResults],
        totalResults: globalResults.length + localResults.length,
        page: 1,
        totalPages: 1,
        hasMore: false,
        searchTime: 800,
        source: 'mock' as 'proxy' | 'fallback' | 'mock'
      };

      if (onResults) {
        onResults(combinedResponse);
      }

    } catch (error) {
      console.error('Dual search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [globalQuery, localQuery, currentPage, performEnhancedSearch, onResults]);

  // Handle search form submissions
  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch('global');
    performDualSearch();
  };

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch('local');
    performDualSearch();
  };

  const handleDualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch('both');
    performDualSearch();
  };

  // Live updates
  useEffect(() => {
    if (liveUpdates && (globalQuery.trim() || localQuery.trim())) {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      
      updateIntervalRef.current = setInterval(() => {
        performDualSearch();
      }, 30000); // Update every 30 seconds

      return () => {
        if (updateIntervalRef.current) {
          clearInterval(updateIntervalRef.current);
        }
      };
    }
  }, [liveUpdates, globalQuery, localQuery, performDualSearch]);

  // Search suggestions
  useEffect(() => {
    if (globalQuery.length > 1) {
      const suggestions = globalSearchSuggestions.filter(s => 
        s.toLowerCase().includes(globalQuery.toLowerCase())
      );
      setGlobalSuggestions(suggestions);
    } else {
      setGlobalSuggestions([]);
    }
  }, [globalQuery]);

  useEffect(() => {
    if (localQuery.length > 1) {
      const suggestions = localSearchSuggestions.filter(s => 
        s.toLowerCase().includes(localQuery.toLowerCase())
      );
      setLocalSuggestions(suggestions);
    } else {
      setLocalSuggestions([]);
    }
  }, [localQuery]);

  // Handle article click
  const handleArticleClick = (article: EnhancedSearchResult) => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      // Default behavior - open in new tab
      if (article.url) {
        window.open(article.url, '_blank');
      }
    }
  };

  // Render search result card
  const renderResultCard = (result: EnhancedSearchResult, source: 'global' | 'local') => (
    <div 
      key={result.id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-blue-500 hover:border-blue-600 transform hover:scale-[1.02]"
      onClick={() => handleArticleClick(result)}
    >
      <div className="p-6">
        {/* Header with source and type badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              source === 'global' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {source === 'global' ? '🌍 Global' : '🇨🇴 Colombia'}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {getCategoryById(result.category)?.name || result.category}
            </span>
            {result.type && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                {result.type === 'article' ? '📰' : 
                 result.type === 'video' ? '🎥' : 
                 result.type === 'reel' ? '📱' : 
                 result.type === 'document' ? '📄' : '💬'} {result.type}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg">{result.image}</div>
            <div className="text-xs text-gray-500">
              {new Date(result.timestamp).toLocaleDateString('es-CO', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
          {result.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {result.summary}
        </p>

        {/* Engagement metrics */}
        {result.engagement && (
          <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <span>👁️</span>
              <span>{result.engagement.views.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>❤️</span>
              <span>{result.engagement.likes.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>📤</span>
              <span>{result.engagement.shares.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>💬</span>
              <span>{result.engagement.comments.toLocaleString()}</span>
            </span>
          </div>
        )}

        {/* Tags */}
        {result.tags && result.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {result.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
            {result.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{result.tags.length - 3} más</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{result.source}</span>
            {result.author && (
              <>
                <span>•</span>
                <span>{result.author}</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-blue-600 font-medium">
              ⭐ {result.relevanceScore}%
            </span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              💬 Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔍 Búsqueda Dual Avanzada</h1>
            <p className="text-white/90 text-lg">
              Búsqueda global y local simultánea con resultados en tiempo real
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{globalResults.length}</div>
                <div className="text-sm text-white/80">Global</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{localResults.length}</div>
                <div className="text-sm text-white/80">Colombia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Search Form */}
        <form onSubmit={handleDualSearch} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Global Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                🌍 Búsqueda Global (15 años de historial)
              </label>
              <div className="relative">
                <input
                  ref={globalInputRef}
                  value={globalQuery}
                  onChange={e => setGlobalQuery(e.target.value)}
                  onFocus={() => setShowGlobalSuggestions(globalQuery.length > 1)}
                  onBlur={() => setTimeout(() => setShowGlobalSuggestions(false), 150)}
                  placeholder="Politics, climate, economy, technology..."
                  className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
                
                {showGlobalSuggestions && globalSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                    {globalSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setGlobalQuery(suggestion);
                          setShowGlobalSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm text-gray-700"
                      >
                        <span className="text-gray-400 mr-2">🌍</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Local Colombia Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                🇨🇴 Búsqueda Local Colombia
              </label>
              <div className="relative">
                <input
                  ref={localInputRef}
                  value={localQuery}
                  onChange={e => setLocalQuery(e.target.value)}
                  onFocus={() => setShowLocalSuggestions(localQuery.length > 1)}
                  onBlur={() => setTimeout(() => setShowLocalSuggestions(false), 150)}
                  placeholder="Petro, reforma, congreso, elecciones..."
                  className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
                
                {showLocalSuggestions && localSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                    {localSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setLocalQuery(suggestion);
                          setShowLocalSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm text-gray-700"
                      >
                        <span className="text-gray-400 mr-2">🇨🇴</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg"
              >
                {loading ? '🔄 Buscando...' : '🔍 Buscar Ambos'}
              </button>
              
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="text-gray-900 border border-white/30 rounded-lg px-3 py-2 text-sm bg-white/20 text-white"
              >
                {allCategories.map(category => (
                  <option key={category.id} value={category.id} className="text-gray-900">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={liveUpdates}
                  onChange={e => setLiveUpdates(e.target.checked)}
                  className="rounded"
                />
                <span>🔴 Actualizaciones en vivo</span>
              </label>
              
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('unified')}
                  className={`px-3 py-1 rounded text-sm transition ${
                    viewMode === 'unified' ? 'bg-white text-blue-600' : 'text-white/80'
                  }`}
                >
                  🔗 Unificado
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded text-sm transition ${
                    viewMode === 'split' ? 'bg-white text-blue-600' : 'text-white/80'
                  }`}
                >
                  📋 Dividido
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Live indicator */}
      {liveUpdates && (globalResults.length > 0 || localResults.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              🔴 EN VIVO
            </div>
            <span className="text-sm text-red-700">
              Resultados actualizándose automáticamente cada 30 segundos
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-pulse">🔄</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Búsqueda dual en progreso</h3>
          <p className="text-gray-600">Consultando fuentes globales y locales...</p>
        </div>
      )}

      {/* Results */}
      {!loading && (globalResults.length > 0 || localResults.length > 0) && (
        <div className="space-y-8">
          {viewMode === 'unified' ? (
            /* Unified View */
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📊 Resultados Unificados ({globalResults.length + localResults.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...globalResults.map(r => ({ ...r, source_type: 'global' as const })), 
                  ...localResults.map(r => ({ ...r, source_type: 'local' as const }))]
                  .sort((a, b) => b.relevanceScore - a.relevanceScore)
                  .map(result => renderResultCard(result, result.source_type))}
              </div>
            </div>
          ) : (
            /* Split View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Global Results */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🌍</span>
                  Resultados Globales ({globalResults.length})
                </h2>
                <div className="space-y-4">
                  {globalResults.map(result => renderResultCard(result, 'global'))}
                </div>
              </div>

              {/* Local Results */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🇨🇴</span>
                  Resultados Colombia ({localResults.length})
                </h2>
                <div className="space-y-4">
                  {localResults.map(result => renderResultCard(result, 'local'))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && globalResults.length === 0 && localResults.length === 0 && (globalQuery || localQuery) && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6">
            Intenta con términos diferentes o usa las sugerencias de búsqueda
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setGlobalQuery('');
                setLocalQuery('');
                globalInputRef.current?.focus();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nueva búsqueda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualSearchBar;