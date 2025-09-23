import { NewsItem, NewsCategory } from '../types/news';

// Enhanced Colombian news sources for the 100x upgrade
export interface ColombianNewsSource {
  id: string;
  name: string;
  type: 'rss' | 'api' | 'scraping';
  url: string;
  category: 'local' | 'international';
  reliability: 'high' | 'medium';
  language: 'es' | 'en' | 'both';
  region?: string;
  specialization?: string[];
}

// Comprehensive Colombian and international sources
export const COLOMBIA_HUB_SOURCES: ColombianNewsSource[] = [
  // Major Colombian Sources
  {
    id: 'el-tiempo',
    name: 'El Tiempo',
    type: 'rss',
    url: 'https://www.eltiempo.com/rss.xml',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['politics', 'news', 'economy']
  },
  {
    id: 'semana',
    name: 'Semana',
    type: 'rss',
    url: 'https://www.semana.com/rss',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['politics', 'analysis', 'culture']
  },
  {
    id: 'el-espectador',
    name: 'El Espectador',
    type: 'rss',
    url: 'https://www.elespectador.com/rss',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['politics', 'society', 'culture']
  },
  {
    id: 'portafolio',
    name: 'Portafolio',
    type: 'rss',
    url: 'https://www.portafolio.co/rss',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['economy', 'business', 'finance']
  },
  {
    id: 'caracol-radio',
    name: 'Caracol Radio',
    type: 'rss',
    url: 'https://caracol.com.co/rss.xml',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['news', 'politics', 'society']
  },
  {
    id: 'rcn-radio',
    name: 'RCN Radio',
    type: 'rss',
    url: 'https://www.rcnradio.com/rss.xml',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['news', 'politics', 'sports']
  },
  {
    id: 'blu-radio',
    name: 'Blu Radio',
    type: 'rss',
    url: 'https://www.bluradio.com/rss',
    category: 'local',
    reliability: 'high',
    language: 'es',
    region: 'Nacional',
    specialization: ['news', 'politics', 'opinion']
  },
  
  // Regional Colombian Sources
  {
    id: 'city-paper-bogota',
    name: 'The City Paper Bogotá',
    type: 'rss',
    url: 'https://thecitypaperbogota.com/feed/',
    category: 'local',
    reliability: 'high',
    language: 'en',
    region: 'Bogotá',
    specialization: ['expat', 'culture', 'lifestyle', 'local']
  },
  {
    id: 'colombia-one',
    name: 'ColombiaOne',
    type: 'scraping',
    url: 'https://colombiaone.com',
    category: 'local',
    reliability: 'medium',
    language: 'en',
    region: 'Nacional',
    specialization: ['business', 'investment', 'economy']
  },
  {
    id: 'colombia-reports',
    name: 'Colombia Reports',
    type: 'rss',
    url: 'https://colombiareports.com/feed/',
    category: 'local',
    reliability: 'high',
    language: 'en',
    region: 'Nacional',
    specialization: ['politics', 'human rights', 'peace process']
  },
  
  // International Sources with Colombia Focus
  {
    id: 'latin-times',
    name: 'Latin Times',
    type: 'api',
    url: 'https://www.latintimes.com/colombia',
    category: 'international',
    reliability: 'medium',
    language: 'en',
    region: 'Latin America',
    specialization: ['colombia', 'latin america', 'politics']
  },
  {
    id: 'ap-news-colombia',
    name: 'AP News Colombia',
    type: 'api',
    url: 'https://apnews.com/hub/colombia',
    category: 'international',
    reliability: 'high',
    language: 'both',
    region: 'Global',
    specialization: ['breaking news', 'politics', 'international']
  },
  {
    id: 'bbc-colombia',
    name: 'BBC News Colombia',
    type: 'api',
    url: 'https://www.bbc.com/mundo/topics/cwlw3xz047jt',
    category: 'international',
    reliability: 'high',
    language: 'both',
    region: 'Global',
    specialization: ['international', 'analysis', 'world news']
  },
  {
    id: 'al-jazeera-colombia',
    name: 'Al Jazeera Colombia',
    type: 'api',
    url: 'https://www.aljazeera.com/where/colombia/',
    category: 'international',
    reliability: 'high',
    language: 'both',
    region: 'Global',
    specialization: ['international', 'analysis', 'middle east perspective']
  },
  {
    id: 'google-news-colombia',
    name: 'Google News Colombia',
    type: 'api',
    url: 'https://news.google.com/rss/search?q=Colombia&hl=es&gl=CO&ceid=CO:es-419',
    category: 'local',
    reliability: 'high',
    language: 'both',
    region: 'Nacional',
    specialization: ['aggregated', 'comprehensive', 'real-time']
  },
  {
    id: '9news-colombia',
    name: '9News Colombia Coverage',
    type: 'api',
    url: 'https://www.9news.com/search/colombia',
    category: 'international',
    reliability: 'medium',
    language: 'en',
    region: 'US',
    specialization: ['us perspective', 'international']
  }
];

// Video content sources for enhanced media experience
export interface VideoSource {
  platform: 'youtube' | 'tiktok' | 'instagram';
  category: 'news' | 'travel' | 'food' | 'culture';
  channels: string[];
  searchTerms: string[];
}

export const COLOMBIA_VIDEO_SOURCES: VideoSource[] = [
  {
    platform: 'youtube',
    category: 'news',
    channels: ['NoticiasCaracol', 'CanalRCN', 'NoticiasUnoColombia'],
    searchTerms: ['noticias colombia', 'política colombia', 'actualidad colombia']
  },
  {
    platform: 'youtube',
    category: 'travel',
    channels: ['ColombiaTravelOfficial', 'ProcolombiaOfficial'],
    searchTerms: ['travel colombia', 'tourism colombia', 'lugares colombia', 'destinos colombia']
  },
  {
    platform: 'youtube',
    category: 'food',
    channels: ['ComidasColombianas', 'GastronomyeColombia'],
    searchTerms: ['comida colombiana', 'gastronomía colombia', 'cocina colombiana']
  },
  {
    platform: 'youtube',
    category: 'culture',
    channels: ['CulturaColombiana', 'FolclorColombia'],
    searchTerms: ['cultura colombia', 'tradiciones colombia', 'folclor colombia']
  },
  {
    platform: 'tiktok',
    category: 'news',
    channels: [],
    searchTerms: ['#colombia', '#noticiascolombia', '#actualidadcolombia']
  },
  {
    platform: 'tiktok',
    category: 'travel',
    channels: [],
    searchTerms: ['#colombiatravel', '#visitcolombia', '#colombiaturismo']
  },
  {
    platform: 'tiktok',
    category: 'food',
    channels: [],
    searchTerms: ['#comidacolombiana', '#foodcolombia', '#gastronomiacolombia']
  },
  {
    platform: 'tiktok',
    category: 'culture',
    channels: [],
    searchTerms: ['#culturacolombiana', '#colombiafolclor', '#tradicionescolombia']
  }
];

// Enhanced news aggregation with AI summaries
export interface EnhancedNewsItem extends NewsItem {
  aiSummary?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  playLink?: string;
  trending_score: number;
  engagement: {
    views: number;
    shares: number;
    comments: number;
  };
  location?: {
    region: string;
    coordinates?: [number, number];
  };
  relatedVideos?: VideoContent[];
}

export interface VideoContent {
  id: string;
  title: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  category: 'news' | 'travel' | 'food' | 'culture' | 'politics' | 'lifestyle';
  thumbnail: string;
  duration: string;
  summary: string;
  playLink: string;
  publishedAt: string;
  channel: string;
  views: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// Smart filters for the enhanced Colombia Hub
export interface SmartFilter {
  id: string;
  name: string;
  type: 'topic' | 'source' | 'language' | 'region' | 'content_type';
  options: FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
  icon?: string;
}

export const SMART_FILTERS: SmartFilter[] = [
  {
    id: 'content_type',
    name: 'Tipo de Contenido',
    type: 'content_type',
    options: [
      { id: 'all', label: 'Todo', value: 'all', icon: '📰' },
      { id: 'news', label: 'Noticias', value: 'news', icon: '📊' },
      { id: 'video', label: 'Videos', value: 'video', icon: '🎥' },
      { id: 'analysis', label: 'Análisis', value: 'analysis', icon: '📈' }
    ]
  },
  {
    id: 'region',
    name: 'Región',
    type: 'region',
    options: [
      { id: 'nacional', label: 'Nacional', value: 'nacional', icon: '🇨🇴' },
      { id: 'bogota', label: 'Bogotá', value: 'bogota', icon: '🏛️' },
      { id: 'medellin', label: 'Medellín', value: 'medellin', icon: '🏔️' },
      { id: 'cali', label: 'Cali', value: 'cali', icon: '🌴' },
      { id: 'cartagena', label: 'Cartagena', value: 'cartagena', icon: '🏰' },
      { id: 'international', label: 'Internacional', value: 'international', icon: '🌍' }
    ]
  },
  {
    id: 'language',
    name: 'Idioma',
    type: 'language',
    options: [
      { id: 'both', label: 'Todos', value: 'both', icon: '🌐' },
      { id: 'es', label: 'Español', value: 'es', icon: '🇪🇸' },
      { id: 'en', label: 'English', value: 'en', icon: '🇺🇸' }
    ]
  },
  {
    id: 'topic',
    name: 'Tema',
    type: 'topic',
    options: [
      { id: 'politics', label: 'Política', value: 'politics', icon: '🏛️' },
      { id: 'economy', label: 'Economía', value: 'economy', icon: '💰' },
      { id: 'culture', label: 'Cultura', value: 'culture', icon: '🎭' },
      { id: 'travel', label: 'Turismo', value: 'travel', icon: '✈️' },
      { id: 'food', label: 'Gastronomía', value: 'food', icon: '🍽️' },
      { id: 'security', label: 'Seguridad', value: 'security', icon: '🛡️' },
      { id: 'environment', label: 'Ambiente', value: 'environment', icon: '🌱' }
    ]
  }
];

// Trending tags generation
export interface TrendingTag {
  tag: string;
  count: number;
  trend_direction: 'up' | 'down' | 'stable';
  category: string;
  color: string;
}

// Colombia Hub Service Class
class ColombiaHubService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  /**
   * Fetch comprehensive Colombia news from all sources
   */
  async fetchColombiaNews(filters: any = {}): Promise<EnhancedNewsItem[]> {
    const cacheKey = `colombia-news-${JSON.stringify(filters)}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // In production, this would aggregate from all sources
      const news = await this.aggregateFromSources(filters);
      
      // Cache the results
      this.cache.set(cacheKey, {
        data: news,
        timestamp: Date.now()
      });

      return news;
    } catch (error) {
      console.error('Error fetching Colombia news:', error);
      return this.getFallbackNews();
    }
  }

  /**
   * Fetch trending videos from YouTube and TikTok
   */
  async fetchTrendingVideos(category?: string): Promise<VideoContent[]> {
    const cacheKey = `trending-videos-${category || 'all'}`;
    
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Mock implementation - in production would use actual APIs
      const videos = this.generateMockVideos(category);
      
      this.cache.set(cacheKey, {
        data: videos,
        timestamp: Date.now()
      });

      return videos;
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      return [];
    }
  }

  /**
   * Generate AI-powered summary for content
   */
  async generateAISummary(content: string): Promise<string> {
    // Mock AI summary - in production would use actual AI service
    const summaries = [
      'Resumen generado por IA: Este contenido aborda los principales desarrollos en Colombia con un enfoque equilibrado y contextualizado.',
      'Análisis automático: La información presenta múltiples perspectivas sobre los eventos actuales en el panorama colombiano.',
      'Síntesis inteligente: El artículo explora las implicaciones y el contexto de los acontecimientos más relevantes del país.'
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  }

  /**
   * Get trending tags
   */
  getTrendingTags(): TrendingTag[] {
    return [
      { tag: 'Reforma Tributaria', count: 245, trend_direction: 'up', category: 'politics', color: 'bg-blue-500' },
      { tag: 'Paz Total', count: 189, trend_direction: 'up', category: 'politics', color: 'bg-green-500' },
      { tag: 'Transición Energética', count: 156, trend_direction: 'up', category: 'environment', color: 'bg-emerald-500' },
      { tag: 'Turismo Colombia', count: 134, trend_direction: 'up', category: 'travel', color: 'bg-yellow-500' },
      { tag: 'Gastronomía', count: 112, trend_direction: 'stable', category: 'food', color: 'bg-orange-500' },
      { tag: 'Cultura Urbana', count: 98, trend_direction: 'up', category: 'culture', color: 'bg-purple-500' },
      { tag: 'Inversión Extranjera', count: 87, trend_direction: 'down', category: 'economy', color: 'bg-red-500' },
      { tag: 'Seguridad Rural', count: 76, trend_direction: 'stable', category: 'security', color: 'bg-gray-500' }
    ];
  }

  /**
   * Get personalized user digest
   */
  async getPersonalizedDigest(userId: string, preferences: any): Promise<any> {
    // Mock personalized content based on user preferences
    return {
      topStories: await this.fetchColombiaNews({ limit: 5 }),
      trendingVideos: await this.fetchTrendingVideos(),
      personalizedTopics: this.getTrendingTags().slice(0, 4),
      regionalHighlights: this.getRegionalHighlights(),
      culturalSpotlight: this.getCulturalSpotlight()
    };
  }

  // Private helper methods
  private async aggregateFromSources(filters: any): Promise<EnhancedNewsItem[]> {
    // Mock implementation - would integrate with actual RSS feeds, APIs, and scraping
    const mockNews: EnhancedNewsItem[] = [
      {
        id: 'enhanced-001',
        title: 'Colombia Lidera Innovación en Energías Renovables en Latinoamérica',
        summary: 'El país se posiciona como referente regional en transición energética con nuevos proyectos solares y eólicos.',
        source: { id: 'el-tiempo', name: 'El Tiempo' },
        category: NewsCategory.ENVIRONMENT,
        publishedAt: new Date().toISOString(),
        hasBalancedCoverage: true,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/600/400',
        readTime: '5 min',
        author: 'María González',
        tags: ['energía renovable', 'sostenibilidad', 'innovación'],
        shareUrl: '#',
        aiSummary: 'Colombia avanza significativamente en su estrategia de transición energética, posicionándose como líder regional en energías limpias.',
        trending_score: 95,
        engagement: { views: 15420, shares: 342, comments: 89 },
        location: { region: 'Nacional', coordinates: [4.5709, -74.2973] },
        relatedVideos: []
      },
      {
        id: 'enhanced-002',
        title: 'Bogotá Inaugura Nueva Línea del Metro: Transformación del Transporte Urbano',
        summary: 'La capital colombiana da un paso histórico hacia la movilidad sostenible con la apertura de su sistema de metro.',
        source: { id: 'caracol-radio', name: 'Caracol Radio' },
        category: NewsCategory.INFRASTRUCTURE,
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        hasBalancedCoverage: true,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/600/400',
        readTime: '7 min',
        author: 'Carlos Ramírez',
        tags: ['metro', 'transporte', 'bogotá', 'infraestructura'],
        shareUrl: '#',
        aiSummary: 'La inauguración del metro de Bogotá marca un hito en el desarrollo urbano y la modernización del transporte público en Colombia.',
        trending_score: 92,
        engagement: { views: 23150, shares: 567, comments: 156 },
        location: { region: 'Bogotá', coordinates: [4.7110, -74.0721] },
        relatedVideos: []
      },
      {
        id: 'enhanced-003',
        title: 'Festival Gastronómico de Colombia Atrae Chefs Internacionales',
        summary: 'La diversidad culinaria colombiana se exhibe en un evento que celebra los sabores tradicionales y la innovación gastronómica.',
        source: { id: 'city-paper-bogota', name: 'The City Paper Bogotá' },
        category: NewsCategory.CULTURE,
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        hasBalancedCoverage: false,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/600/400',
        readTime: '4 min',
        author: 'Sofia Martinez',
        tags: ['gastronomía', 'cultura', 'festival', 'turismo'],
        shareUrl: '#',
        aiSummary: 'El festival gastronómico posiciona a Colombia como destino culinario internacional, destacando la riqueza y diversidad de su cocina.',
        trending_score: 88,
        engagement: { views: 12890, shares: 298, comments: 73 },
        location: { region: 'Nacional', coordinates: [4.5709, -74.2973] },
        relatedVideos: []
      }
    ];

    // Apply filters if provided
    let filtered = mockNews;
    
    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(item => 
        item.location?.region.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    if (filters.language && filters.language !== 'both') {
      // Filter by language based on source
      filtered = filtered.filter(item => {
        const source = COLOMBIA_HUB_SOURCES.find(s => s.id === (typeof item.source === 'object' ? item.source.id : item.source));
        return !source || source.language === filters.language || source.language === 'both';
      });
    }

    if (filters.topic && filters.topic !== 'all') {
      filtered = filtered.filter(item => 
        item.tags?.some(tag => tag.toLowerCase().includes(filters.topic.toLowerCase()))
      );
    }

    return filtered;
  }

  private generateMockVideos(category?: string): VideoContent[] {
    const videos: VideoContent[] = [
      {
        id: 'video-001',
        title: 'Lo Mejor de Colombia: Destinos Imperdibles 2024',
        platform: 'youtube',
        category: 'travel',
        thumbnail: '/api/placeholder/320/180',
        duration: '8:45',
        summary: 'Descubre los lugares más espectaculares de Colombia que debes visitar este año.',
        playLink: 'https://youtube.com/watch?v=mock1',
        publishedAt: new Date().toISOString(),
        channel: 'Colombia Travel Official',
        views: 145000,
        engagement: { likes: 8900, comments: 456, shares: 234 }
      },
      {
        id: 'video-002',
        title: 'Noticias Colombia Hoy: Resumen Semanal',
        platform: 'youtube',
        category: 'news',
        thumbnail: '/api/placeholder/320/180',
        duration: '12:30',
        summary: 'Las noticias más importantes de Colombia en una semana resumidas.',
        playLink: 'https://youtube.com/watch?v=mock2',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        channel: 'Noticias Caracol',
        views: 89000,
        engagement: { likes: 5400, comments: 289, shares: 167 }
      },
      {
        id: 'video-003',
        title: 'Receta Tradicional: Arepas Colombianas Perfectas',
        platform: 'tiktok',
        category: 'food',
        thumbnail: '/api/placeholder/320/180',
        duration: '1:45',
        summary: 'Aprende a hacer las arepas más deliciosas con esta receta tradicional.',
        playLink: 'https://tiktok.com/@chef_colombia/video/mock3',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        channel: '@chef_colombia',
        views: 234000,
        engagement: { likes: 18900, comments: 567, shares: 890 }
      }
    ];

    if (category) {
      return videos.filter(v => v.category === category);
    }

    return videos;
  }

  private getFallbackNews(): EnhancedNewsItem[] {
    return [
      {
        id: 'fallback-001',
        title: 'Colombia Hub: Contenido en Mantenimiento',
        summary: 'Estamos trabajando para traerte las mejores noticias de Colombia. Vuelve pronto.',
        source: { id: 'nuestro-pulso', name: 'Nuestro Pulso' },
        category: NewsCategory.BREAKING,
        publishedAt: new Date().toISOString(),
        hasBalancedCoverage: false,
        trending: false,
        perspective: 'both',
        aiSummary: 'Servicio temporalmente no disponible.',
        trending_score: 0,
        engagement: { views: 0, shares: 0, comments: 0 }
      }
    ];
  }

  private getRegionalHighlights(): any[] {
    return [
      { region: 'Bogotá', highlight: 'Nueva estación de metro inaugurada', icon: '🚇' },
      { region: 'Medellín', highlight: 'Festival de Innovación Urbana', icon: '🏙️' },
      { region: 'Cali', highlight: 'Festival de Salsa Internacional', icon: '💃' },
      { region: 'Cartagena', highlight: 'Turismo alcanza récord histórico', icon: '🏰' }
    ];
  }

  private getCulturalSpotlight(): any {
    return {
      event: 'Semana Cultural Colombiana',
      description: 'Celebrando la diversidad cultural de nuestro país',
      image: '/api/placeholder/400/300',
      date: '15-22 de Febrero',
      highlights: ['Música folclórica', 'Gastronomía regional', 'Artesanías', 'Danza tradicional']
    };
  }
}

export const colombiaHubService = new ColombiaHubService();
export default colombiaHubService;