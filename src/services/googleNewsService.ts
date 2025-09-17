import { NewsArticle, NewsApiResponse, SearchFilters, NewsCategory } from '../types/news';

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

const API_KEY = getEnvVar('REACT_APP_GOOGLE_NEWS_API_KEY');
const API_BASE_URL = getEnvVar('REACT_APP_GOOGLE_NEWS_API_URL', 'https://newsapi.org/v2');
const DEFAULT_LANGUAGE = getEnvVar('REACT_APP_DEFAULT_NEWS_LANGUAGE', 'es');
const DEFAULT_COUNTRY = getEnvVar('REACT_APP_DEFAULT_NEWS_COUNTRY', 'co');

export class GoogleNewsService {
  private static instance: GoogleNewsService;
  private cache: Map<string, { data: NewsApiResponse; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): GoogleNewsService {
    if (!GoogleNewsService.instance) {
      GoogleNewsService.instance = new GoogleNewsService();
    }
    return GoogleNewsService.instance;
  }

  private getCacheKey(filters: SearchFilters): string {
    return JSON.stringify(filters);
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  private buildSearchQuery(category: NewsCategory, customQuery?: string): string {
    const queries: Record<NewsCategory, string> = {
      'congress_legislation': 'congreso colombia legislacion senado camara',
      'terror_crime_drugs': 'colombia seguridad drogas narcotrafico crimen',
      'employment_health': 'colombia empleo salud trabajo pension',
      'gustavo_petro': 'gustavo petro presidente colombia',
      'donald_trump': 'donald trump colombia estados unidos',
      'right_wing': 'colombia derecha conservador uribismo',
      'left_wing': 'colombia izquierda progresista petro',
      'world_news': 'internacional mundo noticias',
      'local_news': 'colombia bogota medellin cali barranquilla'
    };

    const baseQuery = queries[category] || 'colombia';
    return customQuery ? `${baseQuery} ${customQuery}` : baseQuery;
  }

  private buildSearchParams(filters: SearchFilters): URLSearchParams {
    const params = new URLSearchParams();

    // Required API key
    if (API_KEY) {
      params.set('apiKey', API_KEY);
    }

    // Language and country
    params.set('language', filters.language || DEFAULT_LANGUAGE);
    params.set('country', filters.country || DEFAULT_COUNTRY);

    // Pagination
    params.set('pageSize', String(filters.pageSize || 20));
    params.set('page', String(filters.page || 1));

    // Sort order
    params.set('sortBy', filters.sortBy || 'publishedAt');

    // Date range
    if (filters.dateRange) {
      params.set('from', filters.dateRange.from.toISOString());
      params.set('to', filters.dateRange.to.toISOString());
    }

    return params;
  }

  public async searchNews(filters: SearchFilters): Promise<NewsApiResponse> {
    const cacheKey = this.getCacheKey(filters);
    const cached = this.cache.get(cacheKey);

    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }

    if (!API_KEY) {
      console.warn('Google News API key not configured');
      return this.getMockNews(filters);
    }

    try {
      const params = this.buildSearchParams(filters);
      
      // Build query string
      if (filters.category) {
        const query = this.buildSearchQuery(filters.category);
        params.set('q', query);
      }

      const response = await fetch(`${API_BASE_URL}/everything?${params}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: NewsApiResponse = await response.json();
      
      // Cache the response
      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return mock data on error
      return this.getMockNews(filters);
    }
  }

  public async getTopHeadlines(category?: NewsCategory): Promise<NewsApiResponse> {
    const cacheKey = `headlines-${category || 'general'}`;
    const cached = this.cache.get(cacheKey);

    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }

    if (!API_KEY) {
      console.warn('Google News API key not configured');
      return this.getMockNews({ category });
    }

    try {
      const params = new URLSearchParams();
      params.set('apiKey', API_KEY);
      params.set('country', DEFAULT_COUNTRY);
      params.set('pageSize', '20');

      if (category) {
        const query = this.buildSearchQuery(category);
        params.set('q', query);
      }

      const response = await fetch(`${API_BASE_URL}/top-headlines?${params}`);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: NewsApiResponse = await response.json();
      
      // Cache the response
      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return this.getMockNews({ category });
    }
  }

  private getMockNews(filters: SearchFilters): NewsApiResponse {
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Congreso de Colombia aprueba reforma tributaria',
        description: 'El Senado y la Cámara de Representantes aprueban nueva reforma fiscal.',
        content: 'El Congreso de Colombia ha aprobado una nueva reforma tributaria...',
        url: 'https://example.com/article1',
        urlToImage: 'https://via.placeholder.com/400x300',
        publishedAt: new Date().toISOString(),
        source: {
          id: 'el-tiempo',
          name: 'El Tiempo'
        },
        author: 'Redacción El Tiempo',
        category: filters.category || 'congress_legislation',
        tags: ['congreso', 'tributos', 'economia'],
        readTime: 5,
        verified: true
      },
      {
        id: '2',
        title: 'Presidente Petro anuncia nuevas políticas sociales',
        description: 'El mandatario presenta plan de gobierno para el próximo año.',
        content: 'El presidente Gustavo Petro anunció nuevas medidas...',
        url: 'https://example.com/article2',
        urlToImage: 'https://via.placeholder.com/400x300',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: {
          id: 'caracol',
          name: 'Caracol Noticias'
        },
        author: 'Redacción Caracol',
        category: filters.category || 'gustavo_petro',
        tags: ['petro', 'politicas', 'social'],
        readTime: 3,
        verified: true
      }
    ];

    return {
      status: 'ok',
      totalResults: mockArticles.length,
      articles: mockArticles
    };
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const googleNewsService = GoogleNewsService.getInstance();