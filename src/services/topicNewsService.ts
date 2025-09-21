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
   * Fetch local news (Colombia + South America focus)
   */
  private async fetchLocalNews(topic: NewsTopic, limit: number): Promise<TopicNewsResponse> {
    // Simulate API call to local sources + Google News with regional focus
    const searchTerms = this.buildLocalSearchTerms(topic);
    
    // Mock implementation - in real app this would call actual APIs
    const articles = this.generateMockLocalNews(topic, searchTerms, limit);
    
    return {
      articles,
      totalCount: articles.length,
      sources: ['El Tiempo', 'Semana', 'El Espectador', 'Google News Colombia', 'Portafolio'],
      lastUpdated: new Date()
    };
  }

  /**
   * Fetch world news (global Google News only)
   */
  private async fetchWorldNews(topic: NewsTopic, limit: number): Promise<TopicNewsResponse> {
    // Simulate API call to Google News with global scope
    const searchTerms = this.buildWorldSearchTerms(topic);
    
    // Mock implementation - in real app this would call Google News API
    const articles = this.generateMockWorldNews(topic, searchTerms, limit);
    
    return {
      articles,
      totalCount: articles.length,
      sources: ['Google News Global', 'Reuters', 'BBC', 'CNN', 'Associated Press'],
      lastUpdated: new Date()
    };
  }

  /**
   * Build search terms for local news with Colombia/South America focus
   */
  private buildLocalSearchTerms(topic: NewsTopic): string[] {
    const baseTerms = [...topic.keywords];
    
    // Add Colombia/South America context for relevant topics
    if (topic.id === 'donald-trump-local') {
      baseTerms.push('Colombia', 'Sudamérica', 'Venezuela', 'Brasil', 'Argentina', 'comercio', 'migración');
    } else if (topic.id === 'drugs-crime') {
      baseTerms.push('Colombia', 'carteles', 'FARC', 'ELN', 'Medellín', 'Cali');
    } else if (topic.id === 'terror-news') {
      baseTerms.push('Colombia', 'ELN', 'FARC', 'seguridad nacional');
    }
    
    return baseTerms;
  }

  /**
   * Build search terms for world news (global perspective)
   */
  private buildWorldSearchTerms(topic: NewsTopic): string[] {
    const baseTerms = [...topic.keywords];
    
    // Add global context
    if (topic.id === 'donald-trump-world') {
      baseTerms.push('USA', 'America', 'global', 'international', 'foreign policy');
    } else if (topic.id === 'world-travel') {
      baseTerms.push('destinations', 'tourism', 'vacation', 'travel guide', 'best places');
    }
    
    return baseTerms;
  }

  /**
   * Generate mock local news data
   */
  private generateMockLocalNews(topic: NewsTopic, searchTerms: string[], limit: number): NewsItem[] {
    const articles: NewsItem[] = [];
    const localSources = ['El Tiempo', 'Semana', 'El Espectador', 'Portafolio', 'Google News Colombia'];
    
    for (let i = 0; i < limit; i++) {
      articles.push({
        id: `local-${topic.id}-${i}`,
        title: this.generateLocalTitle(topic, i),
        summary: this.generateLocalSummary(topic, i),
        source: { 
          id: `src-${i}`, 
          name: localSources[i % localSources.length] 
        },
        category: 'Politics',
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(), // Hours ago
        hasBalancedCoverage: true,
        trending: i < 3,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: `${3 + (i % 5)} min`,
        author: `Corresponsal ${i + 1}`,
        tags: searchTerms.slice(0, 3),
        shareUrl: '#',
        relatedArticles: []
      });
    }
    
    return articles;
  }

  /**
   * Generate mock world news data
   */
  private generateMockWorldNews(topic: NewsTopic, searchTerms: string[], limit: number): NewsItem[] {
    const articles: NewsItem[] = [];
    const worldSources = ['Reuters', 'BBC', 'CNN', 'Associated Press', 'Google News Global'];
    
    for (let i = 0; i < limit; i++) {
      articles.push({
        id: `world-${topic.id}-${i}`,
        title: this.generateWorldTitle(topic, i),
        summary: this.generateWorldSummary(topic, i),
        source: { 
          id: `world-src-${i}`, 
          name: worldSources[i % worldSources.length] 
        },
        category: 'International',
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(), // Hours ago
        hasBalancedCoverage: true,
        trending: i < 2,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: `${4 + (i % 6)} min`,
        author: `International Correspondent ${i + 1}`,
        tags: searchTerms.slice(0, 3),
        shareUrl: '#',
        relatedArticles: []
      });
    }
    
    return articles;
  }

  /**
   * Generate titles for local news
   */
  private generateLocalTitle(topic: NewsTopic, index: number): string {
    const titles: Record<string, string[]> = {
      'drugs-crime': [
        'Operativo antinarcóticos en Medellín incauta 2 toneladas de cocaína',
        'Autoridades desmantelan red de microtráfico en Bogotá',
        'Capturan a presunto líder de cartel en operación conjunta',
        'Nuevo plan de seguridad para zonas rojas de Cali',
        'Incautan laboratorio de procesamiento de coca en Putumayo'
      ],
      'terror-news': [
        'Alerta por posibles amenazas terroristas en fronteras',
        'Refuerzan seguridad en aeropuertos ante alertas de inteligencia',
        'Operativo de desminado en zona rural del Chocó',
        'Capturan célula de extorsionistas en Antioquia',
        'Aumentan controles en vías principales del país'
      ],
      'donald-trump-local': [
        'Trump anuncia nuevas políticas hacia Colombia en materia migratoria',
        'Impacto de políticas estadounidenses en el comercio bilateral',
        'Expertos analizan relación Trump-Petro y efectos regionales',
        'Venezuela en la agenda de política exterior de Trump para Sudamérica',
        'Colombia evalúa efectos de aranceles estadounidenses'
      ]
    };
    
    const topicTitles = titles[topic.id] || [`Noticia sobre ${topic.name} ${index + 1}`];
    return topicTitles[index % topicTitles.length];
  }

  /**
   * Generate titles for world news
   */
  private generateWorldTitle(topic: NewsTopic, index: number): string {
    const titles: Record<string, string[]> = {
      'donald-trump-world': [
        'Trump announces major foreign policy shift in latest address',
        'International leaders react to Trump\'s economic policies',
        'Global markets respond to Trump administration decisions',
        'Trump\'s diplomatic strategy reshapes international relations',
        'World watches as Trump outlines new global agenda'
      ],
      'world-travel': [
        'Top 10 destinations to visit in 2024 according to travel experts',
        'New sustainable tourism initiatives gain global momentum',
        'Best cultural experiences around the world this year',
        'Hidden gems: Undiscovered destinations worth exploring',
        'Travel industry rebounds with innovative safety measures'
      ],
      'world-politics': [
        'European Union announces new international cooperation framework',
        'Global democratic institutions face modern challenges',
        'International election monitoring efforts expand worldwide',
        'Cross-border political cooperation reaches new heights',
        'World leaders gather for democracy summit next month'
      ]
    };
    
    const topicTitles = titles[topic.id] || [`Global news about ${topic.name} ${index + 1}`];
    return topicTitles[index % topicTitles.length];
  }

  /**
   * Generate summaries for local news
   */
  private generateLocalSummary(topic: NewsTopic, index: number): string {
    return `Desarrollo importante relacionado con ${topic.name} en el contexto colombiano. Esta noticia analiza los impactos locales y regionales de los eventos recientes, con perspectivas desde diferentes sectores de la sociedad.`;
  }

  /**
   * Generate summaries for world news
   */
  private generateWorldSummary(topic: NewsTopic, index: number): string {
    return `International development regarding ${topic.name} with global implications. This story examines worldwide impacts and provides analysis from international perspectives and expert sources.`;
  }

  /**
   * Provide fallback news when API calls fail
   */
  private getFallbackNews(request: TopicNewsRequest): TopicNewsResponse {
    const articles: NewsItem[] = [{
      id: `fallback-${request.topic.id}`,
      title: `Noticias sobre ${request.topic.name} - Cargando contenido...`,
      summary: 'Estamos actualizando el contenido. Por favor intenta de nuevo en unos momentos.',
      source: { id: 'fallback', name: 'Nuestro Pulso' },
      category: 'General',
      publishedAt: new Date().toISOString(),
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '1 min',
      author: 'Redacción',
      tags: ['cargando'],
      shareUrl: '#',
      relatedArticles: []
    }];

    return {
      articles,
      totalCount: 1,
      sources: ['Nuestro Pulso'],
      lastUpdated: new Date()
    };
  }

  /**
   * Clear cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats for debugging
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const topicNewsService = new TopicNewsService();
export default topicNewsService;