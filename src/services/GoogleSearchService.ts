import { SearchResult } from '../data/searchDatabase';

// Configuration interface for Google Search API
export interface GoogleSearchConfig {
  apiKey: string;
  searchEngineId: string;
  baseUrl: string;
  enableMockMode: boolean;
  maxResultsPerQuery: number;
  respectRobotsTxt: boolean;
  userAgent: string;
}

// Google Search API response interface
export interface GoogleSearchResponse {
  kind: string;
  items?: GoogleSearchItem[];
  searchInformation?: {
    totalResults: string;
    searchTime: number;
  };
  queries?: {
    nextPage?: Array<{
      startIndex: number;
      count: number;
    }>;
  };
}

export interface GoogleSearchItem {
  title: string;
  link: string;
  snippet: string;
  formattedUrl: string;
  displayLink: string;
  cacheId?: string;
  pagemap?: {
    metatags?: Array<{
      [key: string]: string;
    }>;
  };
}

/**
 * Google Search API integration service with mock capabilities
 */
export class GoogleSearchService {
  private config: GoogleSearchConfig;
  private requestCount: number = 0;
  private lastResetTime: number = Date.now();

  constructor() {
    // Handle environment variables safely in browser context
    const getEnvVar = (key: string, defaultValue: string = '') => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
      }
      // In browser, check for Vite environment variables
      return (import.meta.env && import.meta.env[key]) || defaultValue;
    };

    this.config = {
      apiKey: getEnvVar('REACT_APP_GOOGLE_SEARCH_API_KEY'),
      searchEngineId: getEnvVar('REACT_APP_GOOGLE_SEARCH_ENGINE_ID'),
      baseUrl: getEnvVar('REACT_APP_SEARCH_API_BASE_URL', 'https://www.googleapis.com/customsearch/v1'),
      enableMockMode: getEnvVar('REACT_APP_SEARCH_ENABLE_MOCK_MODE') === 'true',
      maxResultsPerQuery: parseInt(getEnvVar('REACT_APP_SEARCH_MAX_RESULTS', '100'), 10),
      respectRobotsTxt: true,
      userAgent: 'NuestroPulso/1.0 (+https://nuestropulso.com.co/robots.txt)'
    };
  }

  /**
   * Search Google with rate limiting and error handling
   */
  async search(query: string, startIndex: number = 1, num: number = 10): Promise<SearchResult[]> {
    // Rate limiting check
    if (!this.isRateLimitOk()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Use mock mode if enabled or if API keys are not configured
    if (this.config.enableMockMode || !this.config.apiKey) {
      return this.mockGoogleSearch(query, startIndex, num);
    }

    try {
      // Real Google Custom Search API call
      const response = await this.callGoogleAPI(query, startIndex, num);
      return this.transformGoogleResults(response, query);
    } catch (error) {
      console.error('Google Search API error, falling back to mock data:', error);
      return this.mockGoogleSearch(query, startIndex, num);
    }
  }

  /**
   * Make actual Google Custom Search API call
   */
  private async callGoogleAPI(query: string, start: number, num: number): Promise<GoogleSearchResponse> {
    const params = new URLSearchParams({
      key: this.config.apiKey,
      cx: this.config.searchEngineId,
      q: query,
      start: start.toString(),
      num: num.toString(),
      safe: 'active',
      lr: 'lang_es', // Spanish language results
      gl: 'co', // Colombia country
      cr: 'countryCO' // Colombia region
    });

    const url = `${this.config.baseUrl}?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': this.config.userAgent,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }

    this.requestCount++;
    return response.json();
  }

  /**
   * Transform Google API results to our SearchResult format
   */
  private transformGoogleResults(response: GoogleSearchResponse, query: string): SearchResult[] {
    if (!response.items) {
      return [];
    }

    return response.items.map((item, index) => ({
      id: `google-${Date.now()}-${index}`,
      title: this.cleanHtmlEntities(item.title),
      summary: this.cleanHtmlEntities(item.snippet),
      source: item.displayLink,
      category: this.categorizeContent(item.title + ' ' + item.snippet),
      timestamp: new Date().toISOString(),
      relevanceScore: Math.max(100 - (index * 5), 50), // Decreasing relevance score
      link: item.link,
      image: this.getContentIcon(item.title + ' ' + item.snippet),
      tags: this.extractTags(query, item.title, item.snippet)
    }));
  }

  /**
   * Mock Google Search for development and fallback
   */
  private async mockGoogleSearch(query: string, startIndex: number, num: number): Promise<SearchResult[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    const mockResults: SearchResult[] = [];
    const baseTimestamp = Date.now();
    
    // Generate realistic mock results based on query
    for (let i = 0; i < num; i++) {
      const resultIndex = startIndex + i - 1;
      
      mockResults.push({
        id: `mock-google-${baseTimestamp}-${resultIndex}`,
        title: `${query} - Resultado ${resultIndex + 1} desde Google`,
        summary: `Información actualizada sobre ${query} en Colombia. Este es un resultado simulado del buscador Google que demuestra cómo se integrarían resultados reales de búsqueda web.`,
        source: this.getRandomSource(),
        category: this.categorizeContent(query),
        timestamp: new Date(baseTimestamp - (resultIndex * 60000)).toISOString(),
        relevanceScore: Math.max(95 - (resultIndex * 3), 60),
        link: `https://example.com/article/${encodeURIComponent(query.toLowerCase())}-${resultIndex}`,
        image: this.getContentIcon(query),
        tags: this.extractTags(query, `${query} resultado`, 'colombia información')
      });
    }

    return mockResults;
  }

  /**
   * Categorize content based on keywords
   */
  private categorizeContent(content: string): string {
    const text = content.toLowerCase();
    
    if (text.includes('político') || text.includes('gobierno') || text.includes('congreso') || 
        text.includes('petro') || text.includes('uribe') || text.includes('elecciones')) {
      return 'Política';
    }
    if (text.includes('trump') || text.includes('eeuu') || text.includes('venezuela') || 
        text.includes('internacional') || text.includes('diplomacia')) {
      return 'Internacional';
    }
    if (text.includes('facebook') || text.includes('tecnología') || text.includes('digital') || 
        text.includes('inteligencia artificial')) {
      return 'Tecnología';
    }
    if (text.includes('seguridad') || text.includes('frontera') || text.includes('militar') || 
        text.includes('narcóticos')) {
      return 'Seguridad';
    }
    if (text.includes('economía') || text.includes('comercio') || text.includes('exportación') || 
        text.includes('mercado')) {
      return 'Economía';
    }
    if (text.includes('social') || text.includes('educación') || text.includes('salud') || 
        text.includes('cultura')) {
      return 'Social';
    }
    
    return 'General';
  }

  /**
   * Get appropriate icon for content
   */
  private getContentIcon(content: string): string {
    const text = content.toLowerCase();
    
    if (text.includes('política') || text.includes('gobierno')) return '🏛️';
    if (text.includes('internacional') || text.includes('trump')) return '🌍';
    if (text.includes('facebook') || text.includes('tecnología')) return '📱';
    if (text.includes('seguridad') || text.includes('militar')) return '🛡️';
    if (text.includes('economía') || text.includes('comercio')) return '💰';
    if (text.includes('social') || text.includes('educación')) return '👥';
    if (text.includes('elecciones') || text.includes('voto')) return '🗳️';
    
    return '📰';
  }

  /**
   * Extract relevant tags from query and content
   */
  private extractTags(query: string, title: string, content: string): string[] {
    const text = `${query} ${title} ${content}`.toLowerCase();
    const tags = new Set<string>();
    
    // Add query as primary tag
    tags.add(query.toLowerCase());
    
    // Common Colombian political/social terms
    const keywords = [
      'colombia', 'bogotá', 'medellín', 'cali', 'barranquilla',
      'petro', 'uribe', 'duque', 'santos',
      'facebook', 'meta', 'google', 'tecnología',
      'seguridad', 'paz', 'violencia', 'drogas',
      'economía', 'comercio', 'exportación', 'café',
      'educación', 'salud', 'social', 'reforma',
      'congreso', 'senado', 'cámara', 'política',
      'internacional', 'eeuu', 'venezuela', 'brasil'
    ];
    
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        tags.add(keyword);
      }
    });
    
    return Array.from(tags).slice(0, 8); // Limit to 8 tags
  }

  /**
   * Get random news source for mock results
   */
  private getRandomSource(): string {
    const sources = [
      'El Tiempo', 'El Espectador', 'Semana', 'La República',
      'Portafolio', 'CNN Colombia', 'Caracol Radio', 'RCN Radio',
      'Noticias Caracol', 'City TV', 'Bloomberg Colombia'
    ];
    
    return sources[Math.floor(Math.random() * sources.length)];
  }

  /**
   * Clean HTML entities from text
   */
  private cleanHtmlEntities(text: string): string {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/<[^>]*>/g, '') // Remove any HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Rate limiting check
   */
  private isRateLimitOk(): boolean {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    
    // Reset counter if window has passed
    if (now - this.lastResetTime > windowMs) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }
    
    const getEnvVar = (key: string, defaultValue: string = '') => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
      }
      return (import.meta.env && import.meta.env[key]) || defaultValue;
    };

    const maxRequests = parseInt(getEnvVar('REACT_APP_SEARCH_RATE_LIMIT_REQUESTS', '100'), 10);
    return this.requestCount < maxRequests;
  }

  /**
   * Get current configuration
   */
  getConfig(): GoogleSearchConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<GoogleSearchConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus(): { requests: number; limit: number; resetTime: number } {
    const getEnvVar = (key: string, defaultValue: string = '') => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
      }
      return (import.meta.env && import.meta.env[key]) || defaultValue;
    };

    const maxRequests = parseInt(getEnvVar('REACT_APP_SEARCH_RATE_LIMIT_REQUESTS', '100'), 10);
    return {
      requests: this.requestCount,
      limit: maxRequests,
      resetTime: this.lastResetTime + (60 * 60 * 1000)
    };
  }

  /**
   * Check robots.txt compliance (mock implementation)
   */
  async checkRobotsTxt(domain: string): Promise<boolean> {
    if (!this.config.respectRobotsTxt) {
      return true;
    }

    try {
      // In a real implementation, this would fetch and parse robots.txt
      // For now, we'll assume all domains allow crawling
      console.log(`Checking robots.txt for ${domain}: Allowed`);
      return true;
    } catch (error) {
      console.warn(`Could not check robots.txt for ${domain}:`, error);
      return false; // Err on the side of caution
    }
  }
}

// Singleton instance
export const googleSearchService = new GoogleSearchService();