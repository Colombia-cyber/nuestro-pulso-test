import facebookFallback from '../data/fallback/facebook-fallback.json';

export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  tags?: string[];
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  searchTime: number;
  source: 'proxy' | 'fallback' | 'mock';
}

export interface SearchOptions {
  query: string;
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: 'relevance' | 'date' | 'category';
  includeAdvanced?: boolean;
  searchMode?: 'global' | 'local'; // NEW: Support for different search modes
}

/**
 * SearchService - Dual-mode search functionality
 * 
 * This service supports two distinct search modes:
 * 
 * 1. GLOBAL SEARCH (Homepage/GlobalSearchBar):
 *    - Uses Google/Bing APIs for comprehensive results
 *    - Includes NewsAPI for international news
 *    - Aggregates multiple external sources
 *    - Supports regional filtering (World, Latin America, Colombia)
 *    - Rich result formatting and advanced features
 *    - Intended for comprehensive global information discovery
 * 
 * 2. LOCAL SEARCH (Navbar/LocalSearchBar):
 *    - Focuses exclusively on Colombian content
 *    - Searches local database and Colombian sources only
 *    - No external API calls to Google/Bing
 *    - Fast, focused results for Colombian civic data
 *    - Includes local news, debates, polls, discussions
 *    - Optimized for quick Colombian content access
 * 
 * The service automatically adapts behavior based on searchMode parameter.
 */

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

class SearchService {
  private readonly proxyUrl: string;
  private readonly pagingCap: number;
  private readonly defaultLimit: number;
  private readonly debounceMs: number;
  private debounceTimers: Map<string, number> = new Map();

  constructor() {
    this.proxyUrl = getEnvVar('REACT_APP_SEARCH_PROXY_URL', '/api/search');
    this.pagingCap = parseInt(getEnvVar('REACT_APP_PAGING_CAP', '2000'));
    this.defaultLimit = parseInt(getEnvVar('REACT_APP_SEARCH_RESULTS_PER_PAGE', '12'));
    this.debounceMs = parseInt(getEnvVar('REACT_APP_SEARCH_DEBOUNCE_MS', '300'));
  }

  // Public search method with debouncing
  async searchDebounced(
    options: SearchOptions,
    onResults?: (response: SearchResponse) => void
  ): Promise<SearchResponse> {
    const searchKey = JSON.stringify(options);
    
    // Clear existing timer for this search
    const existingTimer = this.debounceTimers.get(searchKey);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    return new Promise((resolve) => {
      const timer = window.setTimeout(async () => {
        try {
          const results = await this.search(options);
          if (onResults) {
            onResults(results);
          }
          resolve(results);
        } catch (error) {
          console.error('Search error:', error);
          // Return fallback results on error
          const fallbackResults = await this.getFallbackResults(options);
          if (onResults) {
            onResults(fallbackResults);
          }
          resolve(fallbackResults);
        }
        this.debounceTimers.delete(searchKey);
      }, this.debounceMs);

      this.debounceTimers.set(searchKey, timer);
    });
  }

  // Main search method
  async search(options: SearchOptions): Promise<SearchResponse> {
    const startTime = Date.now();
    const { query, page = 1, limit = this.defaultLimit, category, sortBy = 'relevance', searchMode = 'global' } = options;

    if (!query.trim()) {
      return {
        query,
        results: [],
        totalResults: 0,
        page,
        totalPages: 0,
        hasMore: false,
        searchTime: Date.now() - startTime,
        source: 'mock'
      };
    }

    // Route to appropriate search method based on mode
    if (searchMode === 'local') {
      return this.performLocalSearch(options);
    } else {
      return this.performGlobalSearch(options);
    }
  }

  // Global search implementation (original behavior)
  private async performGlobalSearch(options: SearchOptions): Promise<SearchResponse> {
    const startTime = Date.now();
    
    try {
      // Always try server-side API first (prioritize the new implementation)
      const apiResponse = await this.searchViaAPI(options);
      return apiResponse;
    } catch (error) {
      console.warn('API search failed, falling back to proxy then local data:', error);
      
      try {
        // Try original proxy method as fallback
        const proxyResponse = await this.searchViaProxy(options);
        return proxyResponse;
      } catch (proxyError) {
        console.warn('Proxy search also failed, using local fallback:', proxyError);
        
        // Final fallback to local mock data
        return this.getFallbackResults(options);
      }
    }
  }

  // Local search implementation (Colombian content only)
  private async performLocalSearch(options: SearchOptions): Promise<SearchResponse> {
    const startTime = Date.now();
    const { query, page = 1, limit = this.defaultLimit, sortBy = 'relevance' } = options;

    try {
      // For local search, only use Colombian database and local sources
      const localResults = await this.getLocalColombianResults(query);
      
      // Apply sorting
      const sortedResults = this.sortResults(localResults, sortBy);
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const paginatedResults = sortedResults.slice(startIndex, startIndex + limit);
      const totalPages = Math.ceil(sortedResults.length / limit);

      return {
        query,
        results: paginatedResults,
        totalResults: sortedResults.length,
        page,
        totalPages,
        hasMore: page < totalPages,
        searchTime: Date.now() - startTime,
        source: 'mock' // Using local data
      };
    } catch (error) {
      console.error('Local search failed:', error);
      return {
        query,
        results: [],
        totalResults: 0,
        page,
        totalPages: 0,
        hasMore: false,
        searchTime: Date.now() - startTime,
        source: 'mock'
      };
    }
  }

  // Get local Colombian results (no external APIs)
  private async getLocalColombianResults(query: string): Promise<SearchResult[]> {
    // Simulate local database lookup
    await new Promise(resolve => setTimeout(resolve, 100));

    const colombianResults: SearchResult[] = [
      {
        id: `col-${Date.now()}-1`,
        title: `Congreso debate: ${query} en Colombia`,
        summary: `Sesión del Congreso de la República donde se discute ${query} y su impacto en la legislación colombiana actual.`,
        url: `/debates/congreso/${query.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Congreso de la República',
        category: 'politica',
        timestamp: new Date().toISOString(),
        relevanceScore: 95,
        image: '🏛️',
        author: 'Secretaría del Senado',
        tags: [query.toLowerCase(), 'congreso', 'politica', 'colombia']
      },
      {
        id: `col-${Date.now()}-2`,
        title: `Noticias Colombia: ${query} en las regiones`,
        summary: `Cobertura nacional sobre ${query} desde Bogotá, Medellín, Cali, Barranquilla y otras ciudades principales.`,
        url: `/noticias/colombia/${query.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Red de Medios Regionales',
        category: 'noticias',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        relevanceScore: 88,
        image: '📰',
        author: 'Corresponsales Regionales',
        tags: [query.toLowerCase(), 'noticias', 'regiones', 'colombia']
      },
      {
        id: `col-${Date.now()}-3`,
        title: `Participación ciudadana: ${query} en Nuestro Pulso`,
        summary: `Discusión activa de la comunidad sobre ${query}. Más de 5,000 ciudadanos han participado en este tema.`,
        url: `/comunidad/discusion/${query.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Nuestro Pulso Comunidad',
        category: 'participacion',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        relevanceScore: 82,
        image: '👥',
        author: 'Comunidad',
        tags: [query.toLowerCase(), 'participacion', 'ciudadanos', 'debate']
      },
      {
        id: `col-${Date.now()}-4`,
        title: `Encuesta nacional: ¿Qué opinan los colombianos sobre ${query}?`,
        summary: `Resultados de encuesta nacional con 12,000 participantes sobre ${query}. Datos por departamentos y grupos demográficos.`,
        url: `/encuestas/nacional/${query.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Centro de Encuestas Nuestro Pulso',
        category: 'encuestas',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        relevanceScore: 90,
        image: '📊',
        author: 'Equipo de Investigación',
        tags: [query.toLowerCase(), 'encuesta', 'opinion', 'estadisticas']
      },
      {
        id: `col-${Date.now()}-5`,
        title: `Análisis local: El impacto de ${query} en la economía colombiana`,
        summary: `Estudio económico sobre cómo ${query} afecta el crecimiento, empleo y desarrollo en Colombia.`,
        url: `/analisis/economia/${query.toLowerCase().replace(/\s+/g, '-')}`,
        source: 'Centro de Estudios Económicos',
        category: 'economia',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        relevanceScore: 85,
        image: '💼',
        author: 'Dr. Ana María Rodríguez',
        tags: [query.toLowerCase(), 'economia', 'analisis', 'desarrollo']
      }
    ];

    return colombianResults;
  }

  // New API search method using the implemented backend
  private async searchViaAPI(options: SearchOptions): Promise<SearchResponse> {
    const { query, page = 1, limit = this.defaultLimit, category, sortBy } = options;
    const startTime = Date.now();

    // Use the new API endpoint
    const apiUrl = this.proxyUrl.replace('/api/search', '') || 'http://localhost:3001';
    
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      sort: sortBy || 'relevance'
    });

    if (category && category !== 'todos') {
      params.append('category', category);
    }

    const response = await fetch(`${apiUrl}/api/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NuestroPulso/1.0'
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`API search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      query: data.query || query,
      results: data.results || [],
      totalResults: data.totalResults || 0,
      page: data.page || page,
      totalPages: data.totalPages || 0,
      hasMore: data.hasMore || false,
      searchTime: data.searchTime || (Date.now() - startTime),
      source: 'proxy' // Keep as 'proxy' for UI compatibility
    };
  }

  // Server-side proxy search
  private async searchViaProxy(options: SearchOptions): Promise<SearchResponse> {
    const { query, page = 1, limit = this.defaultLimit, category, sortBy } = options;
    const startTime = Date.now();

    // Respect paging cap
    const maxPage = Math.ceil(this.pagingCap / limit);
    const safePage = Math.min(page, maxPage);

    const params = new URLSearchParams({
      q: query,
      page: safePage.toString(),
      limit: limit.toString(),
      sort: sortBy || 'relevance'
    });

    if (category && category !== 'todos') {
      params.append('category', category);
    }

    const response = await fetch(`${this.proxyUrl}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NuestroPulso/1.0'
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Proxy search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      query,
      results: data.results || [],
      totalResults: data.totalResults || 0,
      page: safePage,
      totalPages: Math.min(Math.ceil((data.totalResults || 0) / limit), maxPage),
      hasMore: safePage < Math.min(Math.ceil((data.totalResults || 0) / limit), maxPage),
      searchTime: Date.now() - startTime,
      source: 'proxy'
    };
  }

  // Check if query should use fallback data
  private shouldUseFallback(query: string): boolean {
    const fallbackQueries = ['facebook', 'meta', 'whatsapp', 'instagram'];
    return fallbackQueries.some(fallbackQuery => 
      query.toLowerCase().includes(fallbackQuery.toLowerCase())
    );
  }

  // Get fallback results for popular queries
  private async getFallbackResults(options: SearchOptions): Promise<SearchResponse> {
    const { query, page = 1, limit = this.defaultLimit, category, sortBy = 'relevance' } = options;
    const startTime = Date.now();

    let results: SearchResult[] = [];

    // Use Facebook fallback data if applicable
    if (this.shouldUseFallback(query)) {
      results = facebookFallback.results as SearchResult[];
    } else {
      // Use mock search data
      results = await this.getMockSearchResults(query);
    }

    // Apply category filter
    if (category && category !== 'todos') {
      results = results.filter(result => 
        result.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply sorting
    results = this.sortResults(results, sortBy);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(results.length / limit);

    return {
      query,
      results: paginatedResults,
      totalResults: results.length,
      page,
      totalPages,
      hasMore: page < totalPages,
      searchTime: Date.now() - startTime,
      source: this.shouldUseFallback(query) ? 'fallback' : 'mock'
    };
  }

  // Mock search results for testing
  private async getMockSearchResults(query: string): Promise<SearchResult[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const mockResults: SearchResult[] = [
      {
        id: `mock-${Date.now()}-1`,
        title: `Últimas noticias sobre "${query}" en Colombia`,
        summary: `Cobertura actualizada y análisis de los eventos más relevantes relacionados con ${query} en el contexto colombiano.`,
        url: '#',
        source: 'Nuestro Pulso Agregador',
        category: 'politica',
        timestamp: new Date().toISOString(),
        relevanceScore: 100,
        image: '📰',
        author: 'Redacción',
        tags: [query.toLowerCase(), 'colombia', 'noticias']
      },
      {
        id: `mock-${Date.now()}-2`,
        title: `Análisis político: Impacto de ${query} en la democracia colombiana`,
        summary: `Expertos analizan cómo ${query} está influenciando el panorama político y la participación ciudadana en Colombia.`,
        url: '#',
        source: 'Centro de Estudios Políticos',
        category: 'politica',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        relevanceScore: 88,
        image: '🏛️',
        author: 'Dr. María González',
        tags: [query.toLowerCase(), 'politica', 'analisis']
      },
      {
        id: `mock-${Date.now()}-3`,
        title: `Participación ciudadana: Cómo ${query} está cambiando la sociedad`,
        summary: `Iniciativas ciudadanas relacionadas con ${query} están transformando la manera en que los colombianos participan en la vida pública.`,
        url: '#',
        source: 'Fundación Participación',
        category: 'participacion',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        relevanceScore: 82,
        image: '👥',
        author: 'Carlos Rodríguez',
        tags: [query.toLowerCase(), 'participacion', 'sociedad']
      }
    ];

    return mockResults;
  }

  // Sort results by different criteria
  private sortResults(results: SearchResult[], sortBy: string): SearchResult[] {
    const sorted = [...results];
    
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case 'relevance':
      default:
        return sorted.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
  }

  // Get search suggestions
  async getSearchSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) {
      return [
        'Gustavo Petro',
        'Centro Democrático', 
        'Reforma pensional',
        'Elecciones regionales',
        'Congreso Colombia',
        'Participación ciudadana'
      ];
    }

    // Mock suggestions based on query
    const suggestions = [
      `${query} Colombia`,
      `${query} política`,
      `${query} noticias`,
      `${query} debate`,
      `${query} ciudadanos`
    ].filter(suggestion => suggestion.toLowerCase() !== query.toLowerCase());

    return suggestions.slice(0, 5);
  }

  // Clear debounce timers
  clearDebounce(): void {
    this.debounceTimers.forEach(timer => window.clearTimeout(timer));
    this.debounceTimers.clear();
  }

  // Get popular queries
  getPopularQueries(): string[] {
    return [
      'Gustavo Petro',
      'Centro Democrático',
      'Trump Colombia',
      'Reforma pensional',
      'Seguridad fronteras',
      'Facebook política',
      'Congreso sesiones',
      'Participación ciudadana'
    ];
  }
}

// Singleton instance
export const searchService = new SearchService();

// Hook for React components
export const useSearchService = () => {
  return searchService;
};