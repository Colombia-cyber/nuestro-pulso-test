import React, { useState, useEffect } from 'react';
import GoogleClassSearchBar from '../components/GoogleClassSearchBar';
import GoogleClassSearchResults from '../components/GoogleClassSearchResults';
import { FaHistory, FaChartLine, FaRocket } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { FastSearchBar, FastLocalNews, FastButton } from '../components/fast';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  timestamp: string;
  type: 'news' | 'web' | 'images' | 'videos' | 'shopping' | 'articles';
  location: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

interface SearchFilters {
  dateRange: 'all' | 'hour' | 'day' | 'week' | 'month' | 'year';
  sources: string[];
  location: string;
  contentType: 'all' | 'news' | 'web' | 'images' | 'videos' | 'shopping' | 'articles';
  sortBy: 'relevance' | 'date' | 'popularity';
}

const EnhancedSearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'world' | 'local'>('local');
  const [useFastComponents, setUseFastComponents] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchStats, setSearchStats] = useState<{
    totalSearches: number;
    popularQueries: string[];
    recentActivity: number;
  } | null>(null);

  // Load initial data
  useEffect(() => {
    loadTrendingTopics();
    loadSearchHistory();
    loadSearchStats();
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const tab = urlParams.get('tab') as 'world' | 'local';
    
    if (query) {
      setCurrentQuery(query);
      if (tab && ['world', 'local'].includes(tab)) {
        setActiveTab(tab);
      }
      // Trigger search
      setTimeout(() => {
        performSearch(query, tab || 'local', getDefaultFilters());
      }, 100);
    }
  }, []);

  const getDefaultFilters = (): SearchFilters => ({
    dateRange: 'all',
    sources: [],
    location: 'colombia',
    contentType: 'all',
    sortBy: 'relevance'
  });

  const loadTrendingTopics = () => {
    // Mock trending topics based on Colombian context
    const topics = [
      'Reforma pensional Colombia',
      'Gustavo Petro noticias',
      'Elecciones regionales 2024',
      'Congreso Colombia sesiones',
      'Seguridad nacional',
      'Economía colombiana',
      'Paz total proceso',
      'Educación pública',
      'Medio ambiente',
      'Participación ciudadana'
    ];
    setTrendingTopics(topics);
  };

  const loadSearchHistory = () => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  };

  const loadSearchStats = () => {
    const clickHistory = JSON.parse(localStorage.getItem('searchClickHistory') || '[]');
    const searches = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    setSearchStats({
      totalSearches: searches.length,
      popularQueries: searches.slice(0, 5),
      recentActivity: clickHistory.filter((click: any) => {
        const clickDate = new Date(click.timestamp);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return clickDate > dayAgo;
      }).length
    });
  };

  const performSearch = async (query: string, tab: 'world' | 'local', filters: SearchFilters) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setCurrentQuery(query);
    setActiveTab(tab);
    setCurrentPage(1);

    try {
      // Update URL
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('tab', tab);
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);

      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, tab === 'world' ? 800 : 500));

      let results: SearchResult[] = [];
      let total = 0;
      let searchDuration = 0;

      if (tab === 'world') {
        // Simulate Google Search API results
        results = generateWorldSearchResults(query, filters);
        total = Math.floor(Math.random() * 50000000) + 1000000; // Large result count for world search
        searchDuration = Math.floor(Math.random() * 300) + 200; // 200-500ms
      } else {
        // Simulate local Colombian search
        results = generateLocalSearchResults(query, filters);
        total = Math.floor(Math.random() * 500000) + 1000; // Smaller result count for local
        searchDuration = Math.floor(Math.random() * 200) + 100; // 100-300ms
      }

      setSearchResults(results);
      setTotalResults(total);
      setSearchTime(searchDuration);
      setHasMore(results.length >= 10); // Show load more if we have 10+ results

    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const generateWorldSearchResults = (query: string, filters: SearchFilters): SearchResult[] => {
    const baseResults: SearchResult[] = [
      {
        id: `world-${Date.now()}-1`,
        title: `${query} - Latest News & Updates | Global Coverage`,
        description: `Stay informed with the latest breaking news, analysis, and comprehensive coverage about ${query} from trusted international sources worldwide.`,
        url: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
        source: 'Google News',
        timestamp: new Date().toISOString(),
        type: 'news',
        location: 'Global',
        relevanceScore: 98,
        category: 'International News',
        tags: [query.toLowerCase(), 'global', 'news', 'international']
      },
      {
        id: `world-${Date.now()}-2`,
        title: `${query} | Wikipedia`,
        description: `Learn about ${query} with detailed information, references, and comprehensive coverage from Wikipedia, the free encyclopedia.`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        source: 'Wikipedia',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'web',
        location: 'Global',
        relevanceScore: 95,
        tags: [query.toLowerCase(), 'encyclopedia', 'reference']
      },
      {
        id: `world-${Date.now()}-3`,
        title: `${query} - BBC News Coverage`,
        description: `Comprehensive reporting on ${query} from BBC News, featuring analysis, expert opinions, and breaking news updates.`,
        url: `https://bbc.com/search?q=${encodeURIComponent(query)}`,
        source: 'BBC News',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'news',
        location: 'United Kingdom',
        relevanceScore: 92,
        author: 'BBC Editorial Team',
        category: 'World News',
        tags: [query.toLowerCase(), 'bbc', 'international', 'analysis']
      },
      {
        id: `world-${Date.now()}-4`,
        title: `${query} - Reuters International Coverage`,
        description: `Breaking news and analysis about ${query} from Reuters, providing accurate and unbiased reporting from around the world.`,
        url: `https://reuters.com/search/news?blob=${encodeURIComponent(query)}`,
        source: 'Reuters',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        type: 'news',
        location: 'Global',
        relevanceScore: 90,
        category: 'Business & Politics',
        tags: [query.toLowerCase(), 'reuters', 'business', 'politics']
      }
    ];

    // Apply content type filter
    if (filters.contentType !== 'all') {
      return baseResults.filter(result => result.type === filters.contentType);
    }

    return baseResults;
  };

  const generateLocalSearchResults = (query: string, filters: SearchFilters): SearchResult[] => {
    const baseResults: SearchResult[] = [
      {
        id: `local-${Date.now()}-1`,
        title: `${query} en Colombia - Últimas Noticias Nacionales`,
        description: `Cobertura completa sobre ${query} en Colombia, incluyendo análisis político, social y económico del contexto nacional.`,
        url: `https://eltiempo.com/buscar/${encodeURIComponent(query)}`,
        source: 'El Tiempo',
        timestamp: new Date().toISOString(),
        type: 'news',
        location: 'Colombia',
        relevanceScore: 97,
        author: 'Redacción El Tiempo',
        category: 'Política Nacional',
        tags: [query.toLowerCase(), 'colombia', 'nacional', 'política']
      },
      {
        id: `local-${Date.now()}-2`,
        title: `Gobierno de Colombia - Información Oficial sobre ${query}`,
        description: `Información oficial del Gobierno Nacional de Colombia relacionada con ${query}, incluyendo políticas públicas y declaraciones oficiales.`,
        url: `https://gov.co/buscar?q=${encodeURIComponent(query)}`,
        source: 'Gov.co',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'web',
        location: 'Bogotá',
        relevanceScore: 94,
        category: 'Gobierno',
        tags: [query.toLowerCase(), 'gobierno', 'oficial', 'políticas']
      },
      {
        id: `local-${Date.now()}-3`,
        title: `${query} - Análisis desde Colombia | Semana`,
        description: `Análisis profundo y reportajes especiales sobre ${query} desde la perspectiva colombiana, con enfoque en el impacto nacional.`,
        url: `https://semana.com/buscar/${encodeURIComponent(query)}`,
        source: 'Revista Semana',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'articles',
        location: 'Colombia',
        relevanceScore: 89,
        author: 'Equipo Semana',
        category: 'Análisis Político',
        tags: [query.toLowerCase(), 'análisis', 'colombia', 'política']
      },
      {
        id: `local-${Date.now()}-4`,
        title: `Caracol Radio - ${query} en Colombia`,
        description: `Cobertura radial y análisis sobre ${query} en Colombia, con reportes en vivo y entrevistas a expertos nacionales.`,
        url: `https://caracol.com.co/buscar/${encodeURIComponent(query)}`,
        source: 'Caracol Radio',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        type: 'news',
        location: 'Colombia',
        relevanceScore: 86,
        category: 'Medios de Comunicación',
        tags: [query.toLowerCase(), 'radio', 'colombia', 'entrevistas']
      },
      {
        id: `local-${Date.now()}-5`,
        title: `${query} - Participación Ciudadana | Nuestro Pulso`,
        description: `Debates ciudadanos, encuestas y análisis sobre ${query} en la plataforma cívica líder de Colombia. Únete a la conversación.`,
        url: `#/debates?topic=${encodeURIComponent(query)}`,
        source: 'Nuestro Pulso',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'web',
        location: 'Colombia',
        relevanceScore: 84,
        category: 'Participación Ciudadana',
        tags: [query.toLowerCase(), 'participación', 'debates', 'ciudadanos']
      }
    ];

    // Apply location filter if not 'colombia'
    if (filters.location !== 'colombia') {
      return baseResults.filter(result => 
        result.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply content type filter
    if (filters.contentType !== 'all') {
      return baseResults.filter(result => result.type === filters.contentType);
    }

    return baseResults;
  };

  const handleLoadMore = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      // Simulate loading more results
      await new Promise(resolve => setTimeout(resolve, 500));

      const moreResults = activeTab === 'world' 
        ? generateWorldSearchResults(currentQuery, getDefaultFilters())
        : generateLocalSearchResults(currentQuery, getDefaultFilters());

      // Modify IDs to avoid duplicates
      const modifiedResults = moreResults.map(result => ({
        ...result,
        id: `${result.id}-page${nextPage}`
      }));

      setSearchResults(prev => [...prev, ...modifiedResults]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < 3); // Show up to 3 pages

    } catch (error) {
      console.error('Failed to load more results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Open external links in new tab
    if (result.url.startsWith('http')) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal navigation
      window.location.href = result.url;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header with Fast Components Toggle */}
        <div className="mb-8">
          {/* Fast Components Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Búsqueda Universal</h1>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                <FaRocket className="w-3 h-3" />
                <span>Ultra-Fast</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Modo ultra-rápido:</span>
              <button
                onClick={() => setUseFastComponents(!useFastComponents)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  useFastComponents ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label="Toggle fast components"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    useFastComponents ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {useFastComponents ? (
            <FastSearchBar
              query={currentQuery}
              onSearch={(query, options) => performSearch(query, activeTab, getDefaultFilters())}
              onQueryChange={setCurrentQuery}
              category={activeTab}
              placeholder={activeTab === 'local' ? 'Buscar en Colombia...' : 'Buscar en el mundo...'}
              autoFocus={!currentQuery}
              className="mb-6"
              suggestions={[
                'Reforma pensional Colombia',
                'Gustavo Petro noticias',
                'Elecciones regionales 2024',
                'Congreso Colombia',
                'Economía colombiana'
              ]}
            />
          ) : (
            <GoogleClassSearchBar
              onSearch={performSearch}
              onResultsChange={setSearchResults}
              autoFocus={!currentQuery}
              placeholder="Buscar en el mundo y Colombia..."
              className="mb-6"
            />
          )}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Search Results */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 || isLoading ? (
              <GoogleClassSearchResults
                results={searchResults}
                query={currentQuery}
                totalResults={totalResults}
                searchTime={searchTime}
                activeTab={activeTab}
                onResultClick={handleResultClick}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loading={isLoading}
              />
            ) : currentQuery ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o ajusta los filtros
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Welcome State */}
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Búsqueda Universal Avanzada
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Busca información en Colombia y el mundo con componentes ultra-rápidos
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        🇨🇴 Búsqueda Local Ultra-Rápida
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Encuentra noticias, negocios y fuentes exclusivamente colombianas con velocidad instantánea
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        🌍 Búsqueda Mundial Optimizada
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Accede a información global usando componentes optimizados y la potencia de Google
                      </p>
                    </div>
                  </div>
                </div>

                {/* Featured Local News - Only show when using fast components and no search */}
                {useFastComponents && activeTab === 'local' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">📺 Noticias Destacadas de Colombia</h3>
                      <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Componentes Ultra-Rápidos
                      </div>
                    </div>
                    <FastLocalNews
                      region="colombia"
                      showTrending={true}
                      autoRefresh={true}
                      maxArticles={8}
                      onArticleClick={(article) => {
                        console.log('Article clicked:', article);
                        // Could navigate to article or open modal
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BiTrendingUp className="w-5 h-5 text-red-500" />
                Temas Populares Colombia
              </h3>
              <div className="space-y-2">
                {trendingTopics.slice(0, 6).map((topic, index) => (
                  <FastButton
                    key={index}
                    onClick={() => performSearch(topic, 'local', getDefaultFilters())}
                    variant="secondary"
                    size="sm"
                    fullWidth
                    className="justify-start text-left hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span className="text-sm">{index + 1}. {topic}</span>
                  </FastButton>
                ))}
              </div>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FaHistory className="w-5 h-5 text-gray-500" />
                  Búsquedas Recientes
                </h3>
                <div className="space-y-2">
                  {searchHistory.slice(0, 5).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => performSearch(query, activeTab, getDefaultFilters())}
                      className="block w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Stats */}
            {searchStats && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FaChartLine className="w-5 h-5 text-green-500" />
                  Estadísticas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Búsquedas totales:</span>
                    <span className="font-medium">{searchStats.totalSearches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Actividad (24h):</span>
                    <span className="font-medium">{searchStats.recentActivity}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchPage;