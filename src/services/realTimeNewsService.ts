import { NewsItem, NewsCategory, NewsSource, NewsFilter } from '../types/news';

// Enhanced news categories for Colombian politics
export const COLOMBIAN_NEWS_CATEGORIES = {
  BREAKING: { id: 'breaking', name: 'Última Hora', color: 'red' },
  EL_PULSO: { id: 'el-pulso', name: 'El Pulso', color: 'yellow' },
  POLITICS_LEFT: { id: 'politics-left', name: 'Perspectiva Progresista', color: 'red' },
  POLITICS_RIGHT: { id: 'politics-right', name: 'Perspectiva Conservadora', color: 'blue' },
  CONGRESS: { id: 'congress', name: 'Congreso de Colombia', color: 'purple' },
  LEGISLATION: { id: 'legislation', name: 'Legislación', color: 'indigo' },
  TERROR_CRIME: { id: 'terror-crime', name: 'Terror/Crimen/Drogas', color: 'red' },
  LOCAL_NEWS: { id: 'local', name: 'Noticias Locales', color: 'green' },
  WORLD_NEWS: { id: 'world', name: 'Noticias Mundiales', color: 'blue' },
  ECONOMY: { id: 'economy', name: 'Economía', color: 'green' },
  SECURITY: { id: 'security', name: 'Seguridad', color: 'orange' },
  ENVIRONMENT: { id: 'environment', name: 'Medio Ambiente', color: 'emerald' }
};

interface NewsAPIOptions {
  category?: string;
  country?: string;
  language?: string;
  pageSize?: number;
  page?: number;
  apiKey?: string;
}

interface RealTimeNewsStats {
  totalArticles: number;
  lastUpdate: Date;
  activeReaders: number;
  articlesPerHour: number;
  topSources: string[];
  freshness: 'real-time' | 'recent' | 'outdated';
  readingTime: number; // Add this missing property
}

export class RealTimeNewsService {
  private updateListeners: ((data: NewsItem[]) => void)[] = [];
  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private lastFetchTime: Date = new Date(0);
  private cache: Map<string, { data: NewsItem[], timestamp: Date }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  // Mock real-time Colombian news data - in production this would come from Google News API
  private generateRealTimeNews(): NewsItem[] {
    const now = new Date();
    const recentNews: NewsItem[] = [
      {
        id: `breaking-${now.getTime()}`,
        title: 'ÚLTIMA HORA: Senado Debate Reforma Constitucional',
        summary: 'El Senado de la República inicia debate sobre importante reforma que podría cambiar el panorama político del país.',
        source: { id: 'et-001', name: 'El Tiempo' },
        category: NewsCategory.POLITICS,
        publishedAt: new Date(now.getTime() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        hasBalancedCoverage: true,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: '3 min',
        author: 'Redacción Política',
        tags: ['congreso', 'reforma', 'política'],
        shareUrl: '#'
      },
      {
        id: `el-pulso-${now.getTime()}-1`,
        title: 'El Pulso: Análisis de la Jornada Política',
        summary: 'Nuestro análisis especializado sobre los acontecimientos más importantes del día en la política colombiana.',
        source: { id: 'np-001', name: 'Nuestro Pulso' },
        category: 'El Pulso',
        publishedAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        hasBalancedCoverage: true,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: '5 min',
        author: 'Equipo Editorial',
        tags: ['análisis', 'política', 'el-pulso'],
        shareUrl: '#'
      },
      {
        id: `congress-${now.getTime()}`,
        title: 'Congreso Aprueba Proyecto de Ley sobre Transparencia',
        summary: 'La Cámara de Representantes aprobó en segundo debate el proyecto que fortalece la transparencia en entidades públicas.',
        source: { id: 'cr-001', name: 'Congreso República' },
        category: 'Congreso',
        publishedAt: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        hasBalancedCoverage: false,
        trending: true,
        perspective: 'progressive',
        imageUrl: '/api/placeholder/400/250',
        readTime: '4 min',
        author: 'Mesa Directiva',
        tags: ['congreso', 'transparencia', 'ley'],
        shareUrl: '#'
      },
      {
        id: `crime-${now.getTime()}`,
        title: 'Operativo contra Narcotráfico en Costa Pacífica',
        summary: 'Fuerzas militares desarticulan importante red de narcotráfico en operación conjunta en el Pacífico colombiano.',
        source: { id: 'fn-001', name: 'Fuerzas Militares' },
        category: 'Terror/Crimen/Drogas',
        publishedAt: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        hasBalancedCoverage: false,
        trending: true,
        perspective: 'conservative',
        imageUrl: '/api/placeholder/400/250',
        readTime: '6 min',
        author: 'Comando General',
        tags: ['seguridad', 'narcotráfico', 'operativo'],
        shareUrl: '#'
      },
      {
        id: `local-${now.getTime()}`,
        title: 'Bogotá Inaugura Nueva Línea del TransMilenio',
        summary: 'La capital del país estrena nueva línea de transporte público que beneficiará a más de 200,000 ciudadanos.',
        source: { id: 'tm-001', name: 'TransMilenio' },
        category: 'Local',
        publishedAt: new Date(now.getTime() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
        hasBalancedCoverage: true,
        trending: false,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: '4 min',
        author: 'Redacción Bogotá',
        tags: ['transmilenio', 'bogotá', 'transporte'],
        shareUrl: '#'
      },
      {
        id: `world-${now.getTime()}`,
        title: 'Colombia Participa en Cumbre Regional sobre Migración',
        summary: 'El país presenta propuestas innovadoras en la cumbre que reúne a líderes latinoamericanos para abordar la migración.',
        source: { id: 'can-001', name: 'Cancillería' },
        category: 'Mundial',
        publishedAt: new Date(now.getTime() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        hasBalancedCoverage: true,
        trending: false,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: '5 min',
        author: 'Relaciones Exteriores',
        tags: ['migración', 'diplomacia', 'latinoamérica'],
        shareUrl: '#'
      }
    ];

    return recentNews;
  }

  // Simulate Google News API integration
  async fetchFromGoogleNewsAPI(options: NewsAPIOptions = {}): Promise<NewsItem[]> {
    try {
      // In production, this would make actual API calls to Google News
      // For now, we simulate with realistic Colombian news data
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000)); // Simulate API delay

      const {
        category = 'general',
        country = 'co',
        language = 'es',
        pageSize = 20
      } = options;

      // Generate realistic news based on category
      const mockNews = this.generateCategorySpecificNews(category, pageSize);
      
      return mockNews;
    } catch (error) {
      console.error('Google News API error:', error);
      // Fallback to mock data
      return this.generateRealTimeNews();
    }
  }

  private generateCategorySpecificNews(category: string, count: number): NewsItem[] {
    const now = new Date();
    const news: NewsItem[] = [];

    const categoryTemplates: Record<string, string[]> = {
      'congress': [
        'Congreso Debate Proyecto de Ley sobre {topic}',
        'Senado Aprueba en Primer Debate {topic}',
        'Cámara de Representantes Discute {topic}',
      ],
      'legislation': [
        'Nueva Legislación sobre {topic} Entra en Vigor',
        'Gobierno Promulga Decreto sobre {topic}',
        'Corte Constitucional Revisa {topic}',
      ],
      'terror-crime': [
        'Operativo contra {topic} en {region}',
        'Capturan Red de {topic} en Colombia',
        'Gobierno Refuerza Seguridad ante {topic}',
      ],
      'politics-left': [
        'Movimientos Progresistas Proponen {topic}',
        'Izquierda Colombiana Defiende {topic}',
        'Sectores Progresistas Critican {topic}',
      ],
      'politics-right': [
        'Centro Democrático Propone {topic}',
        'Sectores Conservadores Apoyan {topic}',
        'Derecha Política Cuestiona {topic}',
      ]
    };

    const topics = [
      'reforma pensional', 'reforma tributaria', 'paz total', 'seguridad ciudadana',
      'educación pública', 'salud universal', 'justicia social', 'economía naranja',
      'cambio climático', 'derechos humanos', 'corrupción', 'participación ciudadana'
    ];

    const regions = [
      'Antioquia', 'Valle del Cauca', 'Cundinamarca', 'Santander',
      'Costa Caribe', 'Eje Cafetero', 'Pacífico', 'Llanos Orientales'
    ];

    const templates = categoryTemplates[category] || categoryTemplates['congress'];

    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      
      const title = template.replace('{topic}', topic).replace('{region}', region);
      const minutesAgo = Math.floor(Math.random() * 360); // Up to 6 hours ago

      news.push({
        id: `${category}-${now.getTime()}-${i}`,
        title,
        summary: `Análisis detallado sobre ${topic} y su impacto en la política colombiana. Expertos analizan las implicaciones para el país.`,
        source: { id: `src-${i}`, name: this.getRandomSource() },
        category: this.mapCategoryToNewsCategory(category),
        publishedAt: new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString(),
        hasBalancedCoverage: Math.random() > 0.3,
        trending: Math.random() > 0.7,
        perspective: this.getCategoryPerspective(category),
        imageUrl: '/api/placeholder/400/250',
        readTime: `${Math.floor(Math.random() * 5) + 3} min`,
        author: this.getRandomAuthor(),
        tags: [topic.split(' ')[0], 'política', 'colombia'],
        shareUrl: '#'
      });
    }

    return news;
  }

  private getRandomSource(): string {
    const sources = [
      'El Tiempo', 'El Espectador', 'Semana', 'Portafolio', 'La República',
      'RCN Radio', 'Caracol Radio', 'Blu Radio', 'W Radio', 'Noticias Caracol',
      'Noticias RCN', 'City TV', 'Canal Capital', 'El Heraldo', 'El Universal',
      'La Patria', 'El Colombiano', 'El País', 'Vanguardia', 'El Pilón'
    ];
    return sources[Math.floor(Math.random() * sources.length)];
  }

  private getRandomAuthor(): string {
    const authors = [
      'María González', 'Carlos Ramírez', 'Ana Díaz', 'Roberto Silva',
      'Laura Méndez', 'Pedro Martínez', 'Diana Torres', 'Luis García',
      'Carmen Ruiz', 'José López', 'Sofía Hernández', 'David Morales'
    ];
    return authors[Math.floor(Math.random() * authors.length)];
  }

  private mapCategoryToNewsCategory(category: string): string {
    const mapping: Record<string, string> = {
      'congress': 'Congreso',
      'legislation': 'Legislación',
      'terror-crime': 'Terror/Crimen/Drogas',
      'politics-left': 'Política Progresista',
      'politics-right': 'Política Conservadora',
      'local': 'Local',
      'world': 'Mundial',
      'el-pulso': 'El Pulso'
    };
    return mapping[category] || NewsCategory.POLITICS;
  }

  private getCategoryPerspective(category: string): 'progressive' | 'conservative' | 'both' {
    if (category === 'politics-left') return 'progressive';
    if (category === 'politics-right') return 'conservative';
    return 'both';
  }

  // Get real-time stats
  getRealTimeStats(): RealTimeNewsStats {
    const now = new Date();
    return {
      totalArticles: 1247 + Math.floor(Math.random() * 50),
      lastUpdate: now,
      activeReaders: 1580 + Math.floor(Math.random() * 200),
      articlesPerHour: 23 + Math.floor(Math.random() * 10),
      topSources: ['El Tiempo', 'Semana', 'El Espectador', 'Portafolio'],
      freshness: 'real-time',
      readingTime: 8 + Math.floor(Math.random() * 5) // Add reading time
    };
  }

  // Enhanced filter method with real-time data
  async getFilteredNews(filter: NewsFilter = {}): Promise<NewsItem[]> {
    try {
      const cacheKey = JSON.stringify(filter);
      const cached = this.cache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp.getTime()) < this.cacheTimeout) {
        return cached.data;
      }

      let allNews: NewsItem[] = [];

      // Fetch from different sources based on category
      if (filter.category) {
        allNews = await this.fetchFromGoogleNewsAPI({ 
          category: filter.category,
          pageSize: 50
        });
      } else {
        // Fetch from all major categories
        const categories = ['congress', 'legislation', 'terror-crime', 'politics-left', 'politics-right'];
        const promises = categories.map(cat => 
          this.fetchFromGoogleNewsAPI({ category: cat, pageSize: 10 })
        );
        
        const results = await Promise.all(promises);
        allNews = results.flat();
      }

      // Add our real-time generated news
      allNews = [...this.generateRealTimeNews(), ...allNews];

      // Apply filters
      let filtered = allNews;

      if (filter.perspective && filter.perspective !== 'both') {
        filtered = filtered.filter(item => 
          item.perspective === filter.perspective || item.perspective === 'both'
        );
      }

      if (filter.source) {
        filtered = filtered.filter(item => {
          const sourceName = typeof item.source === 'string' ? item.source : item.source.name;
          return sourceName.toLowerCase().includes(filter.source!.toLowerCase());
        });
      }

      if (filter.timeRange && filter.timeRange !== 'all') {
        const now = new Date();
        let cutoffDate: Date;
        
        switch (filter.timeRange) {
          case '1year':
            cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            break;
          case '2years':
            cutoffDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
            break;
          case '5years':
            cutoffDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
            break;
          default:
            cutoffDate = new Date(0);
        }
        
        filtered = filtered.filter(item => 
          new Date(item.publishedAt) >= cutoffDate
        );
      }

      // Sort by publish date (most recent first)
      filtered.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      // Remove duplicates based on title similarity
      const unique = this.removeDuplicates(filtered);

      // Cache the results
      this.cache.set(cacheKey, {
        data: unique,
        timestamp: new Date()
      });

      return unique;
    } catch (error) {
      console.error('Error fetching filtered news:', error);
      // Return fallback data
      return this.generateRealTimeNews();
    }
  }

  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set<string>();
    return news.filter(item => {
      const key = item.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Start real-time updates
  startRealTimeUpdates(): void {
    if (this.refreshInterval) return;

    this.refreshInterval = setInterval(async () => {
      try {
        const freshNews = await this.getFilteredNews({});
        this.notifyListeners(freshNews);
        this.clearOldCache();
      } catch (error) {
        console.error('Real-time update failed:', error);
      }
    }, 30000); // Update every 30 seconds
  }

  stopRealTimeUpdates(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private clearOldCache(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp.getTime() > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }

  // Listener management
  addUpdateListener(callback: (data: NewsItem[]) => void): void {
    this.updateListeners.push(callback);
  }

  removeUpdateListener(callback: (data: NewsItem[]) => void): void {
    this.updateListeners = this.updateListeners.filter(listener => listener !== callback);
  }

  private notifyListeners(data: NewsItem[]): void {
    this.updateListeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error notifying listener:', error);
      }
    });
  }

  // Get trending news
  async getTrendingNews(): Promise<NewsItem[]> {
    const allNews = await this.getFilteredNews({});
    return allNews.filter(item => item.trending).slice(0, 8);
  }

  // Get breaking news
  async getBreakingNews(): Promise<NewsItem[]> {
    const allNews = await this.getFilteredNews({});
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    return allNews.filter(item => 
      new Date(item.publishedAt) > oneHourAgo && 
      (item.trending || item.title.toLowerCase().includes('última hora'))
    ).slice(0, 5);
  }

  // Get category-specific news
  async getNewsByCategory(category: string): Promise<NewsItem[]> {
    return this.getFilteredNews({ category });
  }

  // Get freshness indicator
  getFreshnessIndicator(publishedAt: string): {
    text: string;
    color: string;
    icon: string;
  } {
    const now = Date.now();
    const publishTime = new Date(publishedAt).getTime();
    const diffMinutes = Math.floor((now - publishTime) / (1000 * 60));

    if (diffMinutes < 5) {
      return {
        text: 'Hace menos de 5 minutos',
        color: 'text-red-600 bg-red-50',
        icon: '🔴'
      };
    } else if (diffMinutes < 30) {
      return {
        text: `Hace ${diffMinutes} minutos`,
        color: 'text-orange-600 bg-orange-50',
        icon: '🟠'
      };
    } else if (diffMinutes < 120) {
      return {
        text: `Hace ${Math.floor(diffMinutes / 60)} hora(s)`,
        color: 'text-yellow-600 bg-yellow-50',
        icon: '🟡'
      };
    } else {
      return {
        text: new Date(publishedAt).toLocaleDateString('es-CO'),
        color: 'text-gray-600 bg-gray-50',
        icon: '⚪'
      };
    }
  }
}

// Export singleton instance
export const realTimeNewsService = new RealTimeNewsService();
export default realTimeNewsService;