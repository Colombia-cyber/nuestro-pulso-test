// Trending Content Service for 404 Page and Search
export interface TrendingItem {
  id: string;
  title: string;
  type: 'news' | 'video';
  source: string;
  url: string;
  timestamp: string;
  category: 'world' | 'local';
  trending: boolean;
  views?: number;
  description?: string;
}

// Mock API service for trending content
export class TrendingService {
  private static instance: TrendingService;
  private cache: { [key: string]: TrendingItem[] } = {};
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): TrendingService {
    if (!TrendingService.instance) {
      TrendingService.instance = new TrendingService();
    }
    return TrendingService.instance;
  }

  async getTrendingContent(category: 'world' | 'local' | 'all' = 'all'): Promise<TrendingItem[]> {
    const cacheKey = `trending_${category}`;
    
    // Check cache first
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const trendingItems = this.generateTrendingContent(category);
    
    // Cache results
    this.cache[cacheKey] = trendingItems;
    
    // Clear cache after timeout
    setTimeout(() => {
      delete this.cache[cacheKey];
    }, this.cacheTimeout);

    return trendingItems;
  }

  private generateTrendingContent(category: 'world' | 'local' | 'all'): TrendingItem[] {
    const worldItems: TrendingItem[] = [
      {
        id: 'w1',
        title: 'Climate Summit 2024: Historic Global Agreement Reached',
        type: 'news',
        source: 'BBC World',
        url: 'https://bbc.com/news/climate-2024',
        timestamp: this.getRelativeTime(2),
        category: 'world',
        trending: true,
        views: 2547893,
        description: 'World leaders unite on unprecedented climate action plan'
      },
      {
        id: 'w2',
        title: 'Tech Innovation: AI Breakthrough Changes Medical Diagnosis',
        type: 'video',
        source: 'Reuters',
        url: 'https://reuters.com/tech/ai-medical',
        timestamp: this.getRelativeTime(1),
        category: 'world',
        trending: true,
        views: 1893472,
        description: 'Revolutionary AI system detects diseases with 99.7% accuracy'
      },
      {
        id: 'w3',
        title: 'Global Economy: Markets React to Fed Interest Rate Decision',
        type: 'news',
        source: 'Financial Times',
        url: 'https://ft.com/markets/fed-rates',
        timestamp: this.getRelativeTime(3),
        category: 'world',
        trending: true,
        views: 1654329,
        description: 'Central bank policy shifts impact worldwide financial markets'
      },
      {
        id: 'w4',
        title: 'Space Exploration: Mars Mission Discovers Water Evidence',
        type: 'video',
        source: 'CNN International',
        url: 'https://cnn.com/space/mars-water',
        timestamp: this.getRelativeTime(4),
        category: 'world',
        trending: true,
        views: 3264817,
        description: 'NASA rover finds subsurface water on Red Planet'
      },
      {
        id: 'w5',
        title: 'International Trade: New Pacific Economic Partnership',
        type: 'news',
        source: 'Associated Press',
        url: 'https://apnews.com/trade/pacific-partnership',
        timestamp: this.getRelativeTime(5),
        category: 'world',
        trending: true,
        views: 987563,
        description: '12 nations sign landmark trade agreement'
      },
      {
        id: 'w6',
        title: 'Global Health: WHO Announces Pandemic Preparedness Plan',
        type: 'news',
        source: 'Al Jazeera English',
        url: 'https://aljazeera.com/health/pandemic-plan',
        timestamp: this.getRelativeTime(6),
        category: 'world',
        trending: true,
        views: 1543876,
        description: 'Comprehensive strategy for future health emergencies'
      }
    ];

    const localItems: TrendingItem[] = [
      {
        id: 'l1',
        title: 'Colombia Economic Growth: Q4 Results Exceed Expectations',
        type: 'news',
        source: 'El Tiempo',
        url: 'https://eltiempo.com/economia/crecimiento-q4',
        timestamp: this.getRelativeTime(1),
        category: 'local',
        trending: true,
        views: 324567,
        description: 'National economy shows resilient growth amid global challenges'
      },
      {
        id: 'l2',
        title: 'Presidente Petro: Nueva Política de Seguridad Nacional',
        type: 'video',
        source: 'Caracol Radio',
        url: 'https://caracol.com.co/politica/seguridad-nacional',
        timestamp: this.getRelativeTime(2),
        category: 'local',
        trending: true,
        views: 567834,
        description: 'Comprehensive security strategy announcement'
      },
      {
        id: 'l3',
        title: 'Elecciones Regionales 2024: Preparativos en Marcha',
        type: 'news',
        source: 'Semana',
        url: 'https://semana.com/politica/elecciones-2024',
        timestamp: this.getRelativeTime(3),
        category: 'local',
        trending: true,
        views: 432189,
        description: 'Electoral authorities finalize regional election procedures'
      },
      {
        id: 'l4',
        title: 'Congreso Colombia: Debate sobre Reforma Pensional',
        type: 'video',
        source: 'RCN',
        url: 'https://rcn.com.co/congreso/reforma-pensional',
        timestamp: this.getRelativeTime(4),
        category: 'local',
        trending: true,
        views: 298765,
        description: 'Parliamentary discussion on pension system reform'
      },
      {
        id: 'l5',
        title: 'Medellín Innovation: Ciudad Líder en Tecnología',
        type: 'news',
        source: 'Portafolio',
        url: 'https://portafolio.co/tecnologia/medellin-innovation',
        timestamp: this.getRelativeTime(5),
        category: 'local',
        trending: true,
        views: 187429,
        description: 'Technology hub recognition for innovative city projects'
      },
      {
        id: 'l6',
        title: 'Participación Ciudadana: Nueva Plataforma Digital',
        type: 'news',
        source: 'Nuestro Pulso',
        url: '#/community-hub',
        timestamp: this.getRelativeTime(6),
        category: 'local',
        trending: true,
        views: 123456,
        description: 'Enhanced civic engagement through digital democracy'
      }
    ];

    switch (category) {
      case 'world':
        return worldItems;
      case 'local':
        return localItems;
      case 'all':
      default:
        return [...worldItems, ...localItems].sort((a, b) => (b.views || 0) - (a.views || 0));
    }
  }

  private getRelativeTime(hoursAgo: number): string {
    if (hoursAgo < 1) {
      const minutes = Math.floor(hoursAgo * 60);
      return `${minutes} min`;
    } else if (hoursAgo < 24) {
      return `${Math.floor(hoursAgo)} horas`;
    } else {
      const days = Math.floor(hoursAgo / 24);
      return `${days} días`;
    }
  }

  // Method to get trending topics for search suggestions
  async getTrendingTopics(): Promise<string[]> {
    const trending = await this.getTrendingContent('all');
    
    // Extract keywords from trending titles
    const keywords = new Set<string>();
    
    trending.forEach(item => {
      const words = item.title.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3 && !this.isCommonWord(word)) {
          keywords.add(word);
        }
      });
    });

    return Array.from(keywords).slice(0, 10);
  }

  private isCommonWord(word: string): boolean {
    const commonWords = [
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'from', 'about', 'into', 'through', 'during', 'before', 'after',
      'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again',
      'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
      'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
      'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
      'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now',
      // Spanish common words
      'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no',
      'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al',
      'del', 'los', 'las', 'una', 'como', 'pero', 'más', 'muy', 'ya',
      'está', 'han', 'fue', 'ser', 'hace', 'ese', 'esta', 'esta'
    ];
    
    return commonWords.includes(word.toLowerCase());
  }

  // Real-time trending simulation
  startTrendingUpdates(callback: (items: TrendingItem[]) => void, intervalMs: number = 30000) {
    const updateTrending = async () => {
      try {
        // Clear cache to force fresh data
        this.cache = {};
        const fresh = await this.getTrendingContent('all');
        callback(fresh);
      } catch (error) {
        console.error('Failed to update trending content:', error);
      }
    };

    // Initial update
    updateTrending();

    // Set up interval
    return setInterval(updateTrending, intervalMs);
  }
}

export default TrendingService;