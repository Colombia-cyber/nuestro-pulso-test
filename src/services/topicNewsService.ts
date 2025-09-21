import { NewsTopic } from '../config/newsTopics';
import { NewsItem } from '../types/news';

export interface TopicNewsRequest {
  topic: NewsTopic;
  mode: 'local' | 'world';
  limit?: number;
}

export interface TopicNewsResponse {
  articles: NewsItem[];
  totalCount: number;
  sources: string[];
  lastUpdated: Date;
}

class TopicNewsService {
  private cache: Map<string, { data: TopicNewsResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  /**
   * Fetch news for a specific topic based on mode (local or world)
   * Local: Only Colombian/South American sources + Google News Colombia.
   * World: Only global/international sources + Google News Global.
   */
  async fetchTopicNews(request: TopicNewsRequest): Promise<TopicNewsResponse> {
    const cacheKey = `${request.topic.id}-${request.mode}-${request.limit || 20}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await this.performTopicSearch(request);

      // Cache the response
      this.cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      console.error('Error fetching topic news:', error);
      return this.getFallbackNews(request);
    }
  }

  /**
   * Perform the actual topic search based on mode
   */
  private async performTopicSearch(request: TopicNewsRequest): Promise<TopicNewsResponse> {
    const { topic, mode, limit = 20 } = request;

    if (mode === 'local') {
      return await this.fetchLocalNews(topic, limit);
    } else {
      return await this.fetchWorldNews(topic, limit);
    }
  }

  /**
   * Fetch local news (Colombia + South America focus ONLY)
   * Only use Colombian/South American news sources and Google News Colombia.
   */
  private async fetchLocalNews(topic: NewsTopic, limit: number): Promise<TopicNewsResponse> {
    // Simulate API call to local sources + Google News with regional focus
    const searchTerms = this.buildLocalSearchTerms(topic);

    // Mock implementation - in real app this would call actual APIs
    const articles = this.generateMockLocalNews(topic, searchTerms, limit);

    return {
      articles,
      totalCount: articles.length,
      sources: [
        'El Tiempo',
        'Semana',
        'El Espectador',
        'Google News Colombia',
        'Portafolio'
      ],
      lastUpdated: new Date()
    };
  }

  /**
   * Fetch world news (global Google News ONLY + international sources)
   * Only use global/international news sources and Google News Global.
   */
  private async fetchWorldNews(topic: NewsTopic, limit: number): Promise<TopicNewsResponse> {
    // Simulate API call to Google News with global scope
    const searchTerms = this.buildWorldSearchTerms(topic);

    // Mock implementation - in real app this would call Google News API
    const articles = this.generateMockWorldNews(topic, searchTerms, limit);

    return {
      articles,
      totalCount: articles.length,
      sources: [
        'Google News Global',
        'Reuters',
        'BBC',
        'CNN',
        'Associated Press'
      ],
      lastUpdated: new Date()
    };
  }

  /**
   * Build search terms for local news with Colombia/South America focus
   */
  private buildLocalSearchTerms(topic: NewsTopic): string[] {
    // Add Colombia/South America context for relevant topics
    return [
      ...topic.keywords,
      'Colombia',
      'Bogotá',
      'Sudamérica',
      'Latinoamérica'
    ];
  }

  /**
   * Build search terms for world news (no regional context)
   */
  private buildWorldSearchTerms(topic: NewsTopic): string[] {
    // Only use global context keywords
    return [
      ...topic.keywords,
      'Global',
      'Mundial',
      'Internacional'
    ];
  }

  /**
   * Generate mock local news (for development/testing only)
   * Always uses unique articles for Local context.
   */
  private generateMockLocalNews(topic: NewsTopic, searchTerms: string[], limit: number): NewsItem[] {
    // Ensure these are never reused for World context!
    return Array.from({ length: limit }, (_, i) => ({
      id: `local-${topic.id}-${i}`,
      title: `[LOCAL] ${topic.name} en Colombia/Sudamérica #${i + 1}`,
      summary: `Noticia local sobre ${topic.name} (fuentes colombianas/sudamericanas).`,
      source: i % 2 === 0 ? 'El Tiempo' : 'Semana',
      category: topic.category,
      publishedAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
      hasBalancedCoverage: false,
      trending: i < 2,
      perspective: i % 2 === 0 ? 'progressive' : 'conservative',
      imageUrl: undefined
    }));
  }

  /**
   * Generate mock world news (for development/testing only)
   * Always uses unique articles for World context.
   */
  private generateMockWorldNews(topic: NewsTopic, searchTerms: string[], limit: number): NewsItem[] {
    // Ensure these are never reused for Local context!
    return Array.from({ length: limit }, (_, i) => ({
      id: `world-${topic.id}-${i}`,
      title: `[WORLD] ${topic.name} (Internacional) #${i + 1}`,
      summary: `Noticia internacional sobre ${topic.name} (fuentes globales).`,
      source: i % 2 === 0 ? 'BBC' : 'Reuters',
      category: topic.category,
      publishedAt: new Date(Date.now() - i * 7200 * 1000).toISOString(),
      hasBalancedCoverage: true,
      trending: i < 3,
      perspective: i % 2 === 0 ? 'conservative' : 'progressive',
      imageUrl: undefined
    }));
  }

  /**
   * Fallback unique news for error handling, never identical between modes.
   */
  private getFallbackNews(request: TopicNewsRequest): TopicNewsResponse {
    if (request.mode === 'local') {
      return {
        articles: [
          {
            id: `fallback-local-${request.topic.id}`,
            title: '[LOCAL-FALLBACK] Sin conexión: Noticias locales de emergencia',
            summary: 'No se pudo cargar la noticia local, pero aquí tienes un titular colombiano único.',
            source: 'El Tiempo',
            category: request.topic.category,
            publishedAt: new Date().toISOString(),
            hasBalancedCoverage: false,
            trending: false,
            perspective: 'progressive',
            imageUrl: undefined
          }
        ],
        totalCount: 1,
        sources: ['El Tiempo'],
        lastUpdated: new Date()
      };
    } else {
      return {
        articles: [
          {
            id: `fallback-world-${request.topic.id}`,
            title: '[WORLD-FALLBACK] Sin conexión: Noticias globales de emergencia',
            summary: 'No se pudo cargar la noticia global, pero aquí tienes un titular internacional único.',
            source: 'BBC',
            category: request.topic.category,
            publishedAt: new Date().toISOString(),
            hasBalancedCoverage: true,
            trending: false,
            perspective: 'conservative',
            imageUrl: undefined
          }
        ],
        totalCount: 1,
        sources: ['BBC'],
        lastUpdated: new Date()
      };
    }
  }
}

export const topicNewsService = new TopicNewsService();
