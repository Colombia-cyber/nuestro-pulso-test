import { VideoContent } from './colombiaHubService';

// Video content categories for Colombia Hub
export enum VideoCategory {
  NEWS = 'news',
  TRAVEL = 'travel',
  FOOD = 'food',
  CULTURE = 'culture',
  POLITICS = 'politics',
  LIFESTYLE = 'lifestyle'
}

export interface VideoSearchParams {
  category?: VideoCategory;
  platform?: 'youtube' | 'tiktok' | 'instagram' | 'all';
  language?: 'es' | 'en' | 'both';
  duration?: 'short' | 'medium' | 'long' | 'all'; // short: <60s, medium: 1-10min, long: >10min
  region?: string;
  trending?: boolean;
  limit?: number;
}

export interface VideoAnalytics {
  totalViews: number;
  avgEngagement: number;
  topPerformers: VideoContent[];
  trendingHashtags: string[];
  platformDistribution: {
    youtube: number;
    tiktok: number;
    instagram: number;
  };
}

class VideoContentService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  /**
   * Fetch trending Colombia videos from multiple platforms
   */
  async fetchTrendingVideos(params: VideoSearchParams = {}): Promise<VideoContent[]> {
    const cacheKey = `trending-videos-${JSON.stringify(params)}`;
    
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const videos = await this.aggregateVideoContent(params);
      
      this.cache.set(cacheKey, {
        data: videos,
        timestamp: Date.now()
      });

      return videos;
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      return this.getFallbackVideos(params.category);
    }
  }

  /**
   * Get videos by specific category
   */
  async getVideosByCategory(category: VideoCategory, limit: number = 20): Promise<VideoContent[]> {
    return this.fetchTrendingVideos({ category, limit });
  }

  /**
   * Search videos with AI-powered recommendations
   */
  async searchVideos(query: string, params: VideoSearchParams = {}): Promise<VideoContent[]> {
    const cacheKey = `search-videos-${query}-${JSON.stringify(params)}`;
    
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // In production, this would search across YouTube, TikTok, and Instagram APIs
      const results = await this.performVideoSearch(query, params);
      
      this.cache.set(cacheKey, {
        data: results,
        timestamp: Date.now()
      });

      return results;
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  /**
   * Get video analytics for Colombia content
   */
  async getVideoAnalytics(): Promise<VideoAnalytics> {
    const allVideos = await this.fetchTrendingVideos({ limit: 100 });
    
    const totalViews = allVideos.reduce((sum, video) => sum + video.views, 0);
    const avgEngagement = allVideos.reduce((sum, video) => {
      return sum + (video.engagement.likes + video.engagement.comments + video.engagement.shares) / 3;
    }, 0) / allVideos.length;

    const topPerformers = allVideos
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const platformDistribution = {
      youtube: allVideos.filter(v => v.platform === 'youtube').length,
      tiktok: allVideos.filter(v => v.platform === 'tiktok').length,
      instagram: allVideos.filter(v => v.platform === 'instagram').length
    };

    return {
      totalViews,
      avgEngagement,
      topPerformers,
      trendingHashtags: this.extractTrendingHashtags(allVideos),
      platformDistribution
    };
  }

  /**
   * Generate AI-powered video summary
   */
  async generateVideoSummary(videoId: string, transcript?: string): Promise<string> {
    // Mock AI summary - in production would use actual AI service
    const summaries = [
      'Este video explora los aspectos más destacados de Colombia, ofreciendo una perspectiva única sobre nuestra cultura y sociedad.',
      'Contenido informativo que presenta los últimos desarrollos en Colombia con análisis profundo y contextualizado.',
      'Una mirada integral a los eventos actuales en Colombia, destacando las voces y perspectivas más relevantes del momento.',
      'Exploración detallada de la riqueza cultural y natural de Colombia, presentada de manera accesible y entretenida.'
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  }

  /**
   * Get recommended videos based on user preferences
   */
  async getRecommendedVideos(userId: string, watchHistory: string[]): Promise<VideoContent[]> {
    // Mock recommendation engine - in production would use ML algorithms
    const allVideos = await this.fetchTrendingVideos({ limit: 50 });
    
    // Simple recommendation based on category preferences
    return allVideos
      .filter(video => !watchHistory.includes(video.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }

  // Private methods
  private async aggregateVideoContent(params: VideoSearchParams): Promise<VideoContent[]> {
    // Mock implementation - in production would integrate with actual APIs
    const mockVideos: VideoContent[] = [
      // YouTube News Videos
      {
        id: 'yt-news-001',
        title: 'Colombia Hoy: Resumen de Noticias - Análisis Completo',
        platform: 'youtube',
        category: VideoCategory.NEWS,
        thumbnail: '/api/placeholder/480/360',
        duration: '15:32',
        summary: 'Resumen completo de las noticias más importantes de Colombia con análisis experto y contexto histórico.',
        playLink: 'https://youtube.com/watch?v=colombia-news-001',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        channel: 'Noticias Colombia HD',
        views: 125000,
        engagement: { likes: 8900, comments: 456, shares: 234 }
      },
      {
        id: 'yt-travel-001',
        title: 'Los 10 Destinos Más Hermosos de Colombia que DEBES Visitar',
        platform: 'youtube',
        category: VideoCategory.TRAVEL,
        thumbnail: '/api/placeholder/480/360',
        duration: '12:45',
        summary: 'Descubre los lugares más espectaculares de Colombia, desde las playas del Caribe hasta los picos andinos.',
        playLink: 'https://youtube.com/watch?v=colombia-travel-001',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        channel: 'Colombia Travel Official',
        views: 289000,
        engagement: { likes: 15600, comments: 892, shares: 456 }
      },
      {
        id: 'yt-food-001',
        title: 'Recetas Tradicionales Colombianas: Sancocho Completo',
        platform: 'youtube',
        category: VideoCategory.FOOD,
        thumbnail: '/api/placeholder/480/360',
        duration: '18:20',
        summary: 'Aprende a preparar el sancocho tradicional colombiano con todos los secretos de la abuela.',
        playLink: 'https://youtube.com/watch?v=colombia-food-001',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        channel: 'Cocina Colombiana Auténtica',
        views: 167000,
        engagement: { likes: 12300, comments: 678, shares: 345 }
      },
      
      // TikTok Short Videos
      {
        id: 'tik-culture-001',
        title: 'Danza Tradicional Colombiana en 60 Segundos',
        platform: 'tiktok',
        category: VideoCategory.CULTURE,
        thumbnail: '/api/placeholder/360/640',
        duration: '0:58',
        summary: 'Una increíble demostración de danza folclórica colombiana que te dejará sin aliento.',
        playLink: 'https://tiktok.com/@colombia_culture/video/001',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        channel: '@colombia_culture',
        views: 456000,
        engagement: { likes: 34500, comments: 1234, shares: 2890 }
      },
      {
        id: 'tik-food-001',
        title: 'Arepa Perfecta en 30 Segundos - Técnica Secreta',
        platform: 'tiktok',
        category: VideoCategory.FOOD,
        thumbnail: '/api/placeholder/360/640',
        duration: '0:32',
        summary: 'El secreto para hacer la arepa perfecta revelado en este video viral.',
        playLink: 'https://tiktok.com/@chef_colombia/video/001',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        channel: '@chef_colombia',
        views: 789000,
        engagement: { likes: 67800, comments: 2345, shares: 4567 }
      },
      {
        id: 'tik-travel-001',
        title: 'Cartagena en 60 Segundos - Ciudad Mágica',
        platform: 'tiktok',
        category: VideoCategory.TRAVEL,
        thumbnail: '/api/placeholder/360/640',
        duration: '1:00',
        summary: 'Un recorrido rápido por los lugares más hermosos de Cartagena de Indias.',
        playLink: 'https://tiktok.com/@travel_colombia/video/001',
        publishedAt: new Date(Date.now() - 21600000).toISOString(),
        channel: '@travel_colombia',
        views: 345000,
        engagement: { likes: 23400, comments: 890, shares: 1567 }
      },

      // News and Politics
      {
        id: 'yt-politics-001',
        title: 'Análisis Político: Reforma Tributaria en Colombia',
        platform: 'youtube',
        category: this.mapCategoryToVideoCategory(VideoCategory.POLITICS),
        thumbnail: '/api/placeholder/480/360',
        duration: '22:15',
        summary: 'Análisis profundo de la reforma tributaria propuesta y sus implicaciones para los colombianos.',
        playLink: 'https://youtube.com/watch?v=colombia-politics-001',
        publishedAt: new Date(Date.now() - 28800000).toISOString(),
        channel: 'Política Colombia Análisis',
        views: 198000,
        engagement: { likes: 11200, comments: 1456, shares: 567 }
      },
      {
        id: 'tik-lifestyle-001',
        title: 'Un Día en Bogotá - Lifestyle Colombiano',
        platform: 'tiktok',
        category: this.mapCategoryToVideoCategory(VideoCategory.LIFESTYLE),
        thumbnail: '/api/placeholder/360/640',
        duration: '0:45',
        summary: 'Cómo es vivir en Bogotá: desde el desayuno hasta la noche en la capital.',
        playLink: 'https://tiktok.com/@bogota_life/video/001',
        publishedAt: new Date(Date.now() - 36000000).toISOString(),
        channel: '@bogota_life',
        views: 234000,
        engagement: { likes: 18900, comments: 567, shares: 890 }
      }
    ];

    // Apply filters
    let filtered = mockVideos;

    if (params.category) {
      filtered = filtered.filter(video => video.category === params.category);
    }

    if (params.platform && params.platform !== 'all') {
      filtered = filtered.filter(video => video.platform === params.platform);
    }

    if (params.duration && params.duration !== 'all') {
      filtered = filtered.filter(video => {
        const duration = this.parseDuration(video.duration);
        switch (params.duration) {
          case 'short': return duration < 60;
          case 'medium': return duration >= 60 && duration <= 600;
          case 'long': return duration > 600;
          default: return true;
        }
      });
    }

    if (params.trending) {
      filtered = filtered.filter(video => video.views > 100000);
    }

    // Sort by views (trending)
    filtered.sort((a, b) => b.views - a.views);

    // Apply limit
    if (params.limit) {
      filtered = filtered.slice(0, params.limit);
    }

    return filtered;
  }

  private async performVideoSearch(query: string, params: VideoSearchParams): Promise<VideoContent[]> {
    // Mock search implementation
    const allVideos = await this.aggregateVideoContent({ limit: 100 });
    
    return allVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.summary.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getFallbackVideos(category?: VideoCategory): VideoContent[] {
    return [
      {
        id: 'fallback-001',
        title: 'Colombia Hub: Videos en Mantenimiento',
        platform: 'youtube',
        category: category ? this.mapCategoryToVideoCategory(category) : 'news',
        thumbnail: '/api/placeholder/480/360',
        duration: '0:30',
        summary: 'Estamos trabajando para traerte los mejores videos de Colombia. Vuelve pronto.',
        playLink: '#',
        publishedAt: new Date().toISOString(),
        channel: 'Colombia Hub',
        views: 0,
        engagement: { likes: 0, comments: 0, shares: 0 }
      }
    ];
  }

  private parseDuration(duration: string): number {
    // Parse duration string like "15:32" or "0:58" to seconds
    const parts = duration.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 0;
  }

  private extractTrendingHashtags(videos: VideoContent[]): string[] {
    // Mock hashtag extraction
    return [
      '#colombia', '#bogota', '#medellin', '#cartagena', '#cali',
      '#comidacolombiana', '#turismocolombia', '#culturacolombia',
      '#noticiascolombia', '#viajacolombia', '#gastronomiaco'
    ];
  }

  private mapCategoryToVideoCategory(category: VideoCategory): 'news' | 'travel' | 'food' | 'culture' | 'politics' | 'lifestyle' {
    switch (category) {
      case VideoCategory.NEWS: return 'news';
      case VideoCategory.TRAVEL: return 'travel';
      case VideoCategory.FOOD: return 'food';
      case VideoCategory.CULTURE: return 'culture';
      case VideoCategory.POLITICS: return 'politics';
      case VideoCategory.LIFESTYLE: return 'lifestyle';
      default: return 'news';
    }
  }
}

export const videoContentService = new VideoContentService();
export default videoContentService;