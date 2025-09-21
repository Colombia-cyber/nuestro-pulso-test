import React, { useState, useEffect } from 'react';
import GoogleClassSearchBar from '../components/GoogleClassSearchBar';
import GoogleClassSearchResults from '../components/GoogleClassSearchResults';
import { FaHistory, FaChartLine } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { detectSearchMode, shouldShowKnowledgePanel } from '../data/knowledgeTopics';

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
      
      // Auto-detect search mode if no tab specified or if tab doesn't match detected mode
      const detectedMode = detectSearchMode(query);
      const actualTab = tab && ['world', 'local'].includes(tab) ? tab : detectedMode;
      
      setActiveTab(actualTab);
      
      // Trigger search
      setTimeout(() => {
        performSearch(query, actualTab, getDefaultFilters());
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
    setCurrentPage(1);

    // Auto-detect search mode if not explicitly specified
    const detectedMode = detectSearchMode(query);
    const actualTab = tab || detectedMode;
    setActiveTab(actualTab);

    try {
      // Update URL
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('tab', actualTab);
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);

      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, actualTab === 'world' ? 800 : 500));

      let results: SearchResult[] = [];
      let total = 0;
      let searchDuration = 0;

      if (actualTab === 'world') {
        // Generate world search results with global sources
        results = generateWorldSearchResults(query, filters);
        total = Math.floor(Math.random() * 50000000) + 1000000; // Large result count for world search
        searchDuration = Math.floor(Math.random() * 300) + 200; // 200-500ms
      } else {
        // Generate local Colombian search with regional sources
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
    // Generate proper world search results with global sources
    const globalSources = [
      { name: 'Wikipedia', domain: 'en.wikipedia.org', type: 'encyclopedia' },
      { name: 'BBC News', domain: 'bbc.com', type: 'news' },
      { name: 'CNN', domain: 'cnn.com', type: 'news' },
      { name: 'Reuters', domain: 'reuters.com', type: 'news' },
      { name: 'The Guardian', domain: 'theguardian.com', type: 'news' },
      { name: 'Associated Press', domain: 'apnews.com', type: 'news' },
      { name: 'The New York Times', domain: 'nytimes.com', type: 'news' },
      { name: 'Forbes', domain: 'forbes.com', type: 'business' },
      { name: 'Bloomberg', domain: 'bloomberg.com', type: 'business' },
      { name: 'Washington Post', domain: 'washingtonpost.com', type: 'news' }
    ];

    const results: SearchResult[] = [];
    
    // Create world-appropriate results
    globalSources.forEach((source, index) => {
      if (index >= 5) return; // Limit to top 5 sources
      
      results.push({
        id: `world-${Date.now()}-${index}`,
        title: `${query} - ${getWorldTitle(query, source)}`,
        description: getWorldDescription(query, source),
        url: `https://${source.domain}/search?q=${encodeURIComponent(query)}`,
        source: source.name,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Random within last 24h
        type: source.type === 'encyclopedia' ? 'web' : 'news',
        location: 'Global',
        relevanceScore: Math.floor(98 - index * 2), // High relevance for world topics
        category: getWorldCategory(source.type),
        tags: getWorldTags(query, source.type)
      });
    });

    // Apply content type filter
    if (filters.contentType !== 'all') {
      return results.filter(result => result.type === filters.contentType);
    }

    return results;
  };

  // Helper functions for world search content
  const getWorldTitle = (query: string, source: { name: string; type: string }) => {
    switch (source.type) {
      case 'encyclopedia':
        return `Complete Information & Biography`;
      case 'news':
        return `Latest News & Updates`;
      case 'business':
        return `Business & Financial News`;
      default:
        return `Global Coverage`;
    }
  };

  const getWorldDescription = (query: string, source: { name: string; type: string }) => {
    switch (source.type) {
      case 'encyclopedia':
        return `Comprehensive information about ${query}, including biography, career, achievements, and detailed background from the world's leading encyclopedia.`;
      case 'news':
        return `Breaking news, latest updates, and in-depth analysis about ${query} from trusted international news sources.`;
      case 'business':
        return `Financial news, market analysis, and business coverage related to ${query} from leading business publications.`;
      default:
        return `Global perspective and coverage of ${query} from international sources.`;
    }
  };

  const getWorldCategory = (type: string) => {
    switch (type) {
      case 'encyclopedia': return 'Reference';
      case 'news': return 'International News';
      case 'business': return 'Business & Finance';
      default: return 'Global';
    }
  };

  const getWorldTags = (query: string, type: string) => {
    const baseTags = [query.toLowerCase(), 'global', 'international'];
    switch (type) {
      case 'encyclopedia': return [...baseTags, 'reference', 'biography'];
      case 'news': return [...baseTags, 'news', 'breaking'];
      case 'business': return [...baseTags, 'business', 'finance'];
      default: return baseTags;
    }
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
        {/* Search Header */}
        <div className="mb-8">
          <GoogleClassSearchBar
            onSearch={performSearch}
            onResultsChange={setSearchResults}
            autoFocus={!currentQuery}
            placeholder="Buscar en el mundo y Colombia..."
            className="mb-6"
          />
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
                onSearchRelated={(query: string) => performSearch(query, activeTab, getDefaultFilters())}
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
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Búsqueda Universal Avanzada
                </h3>
                <p className="text-gray-600 mb-8">
                  Busca información en Colombia y el mundo con filtros avanzados
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      🇨🇴 Búsqueda Local
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Encuentra noticias, negocios y fuentes exclusivamente colombianas
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      🌍 Búsqueda Mundial
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Accede a información global usando la potencia de Google
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BiTrendingUp className="w-5 h-5 text-red-500" />
                Temas Populares
              </h3>
              <div className="space-y-2">
                {trendingTopics.slice(0, 6).map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => performSearch(topic, 'local', getDefaultFilters())}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                  >
                    {index + 1}. {topic}
                  </button>
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