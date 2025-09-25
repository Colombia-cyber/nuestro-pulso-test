import { youtubeService } from './youtubeService';

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
  };
  platform: 'youtube' | 'local' | 'fallback';
  platformName: string;
  category: string;
  tags: string[];
  embedUrl: string;
  videoUrl: string;
  isLive?: boolean;
  factChecked: boolean;
  trending?: boolean;
}

export interface VideoLoadResult {
  videos: VideoContent[];
  totalCount: number;
  sources: {
    youtube: { status: 'success' | 'error' | 'loading'; count: number; error?: string };
    local: { status: 'success' | 'error' | 'loading'; count: number; error?: string };
    fallback: { status: 'success' | 'error' | 'loading'; count: number; error?: string };
  };
  lastUpdate: string;
}

class VideoService {
  private cache = new Map<string, { data: VideoLoadResult; timestamp: number }>();
  private cacheTimeout = 10 * 60 * 1000; // 10 minutes

  /**
   * Load videos from multiple sources with fallback chain
   */
  async loadColombiaVideos(maxResults = 20): Promise<VideoLoadResult> {
    const cacheKey = `colombia_videos_${maxResults}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    const result: VideoLoadResult = {
      videos: [],
      totalCount: 0,
      sources: {
        youtube: { status: 'loading', count: 0 },
        local: { status: 'loading', count: 0 },
        fallback: { status: 'loading', count: 0 }
      },
      lastUpdate: new Date().toISOString()
    };

    // Try YouTube API first
    try {
      const youtubeVideos = await youtubeService.searchColombiaNews(Math.ceil(maxResults * 0.7));
      const convertedVideos = youtubeVideos.map(this.convertYouTubeToVideoContent);
      result.videos.push(...convertedVideos);
      result.sources.youtube = { 
        status: 'success', 
        count: convertedVideos.length 
      };
    } catch (error) {
      console.error('YouTube API failed:', error);
      result.sources.youtube = { 
        status: 'error', 
        count: 0, 
        error: error instanceof Error ? error.message : 'YouTube API error' 
      };
    }

    // Try local API as secondary source
    try {
      const localVideos = await this.loadLocalVideos(Math.ceil(maxResults * 0.2));
      result.videos.push(...localVideos);
      result.sources.local = { 
        status: 'success', 
        count: localVideos.length 
      };
    } catch (error) {
      console.error('Local API failed:', error);
      result.sources.local = { 
        status: 'error', 
        count: 0, 
        error: error instanceof Error ? error.message : 'Local API error' 
      };
    }

    // If we don't have enough content, use fallback
    if (result.videos.length < maxResults * 0.5) {
      try {
        const fallbackCount = maxResults - result.videos.length;
        const fallbackVideos = this.getFallbackVideos(fallbackCount);
        result.videos.push(...fallbackVideos);
        result.sources.fallback = { 
          status: 'success', 
          count: fallbackVideos.length 
        };
      } catch (error) {
        result.sources.fallback = { 
          status: 'error', 
          count: 0, 
          error: 'Fallback failed' 
        };
      }
    } else {
      result.sources.fallback = { status: 'success', count: 0 };
    }

    // Sort by trending status and views
    result.videos = this.sortVideosByRelevance(result.videos);
    result.totalCount = result.videos.length;

    this.setCachedData(cacheKey, result);
    return result;
  }

  /**
   * Load trending reels specifically
   */
  async loadTrendingReels(maxResults = 12): Promise<VideoLoadResult> {
    const cacheKey = `trending_reels_${maxResults}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    const result: VideoLoadResult = {
      videos: [],
      totalCount: 0,
      sources: {
        youtube: { status: 'loading', count: 0 },
        local: { status: 'loading', count: 0 },
        fallback: { status: 'loading', count: 0 }
      },
      lastUpdate: new Date().toISOString()
    };

    try {
      // Get trending from YouTube
      const youtubeVideos = await youtubeService.getTrendingColombiaVideos(maxResults);
      const convertedVideos = youtubeVideos.map(video => {
        const converted = this.convertYouTubeToVideoContent(video);
        converted.trending = true;
        return converted;
      });
      
      result.videos = convertedVideos;
      result.sources.youtube = { status: 'success', count: convertedVideos.length };
      
      // Fill remaining with fallback if needed
      if (result.videos.length < maxResults) {
        const fallbackCount = maxResults - result.videos.length;
        const fallbackVideos = this.getFallbackTrendingReels(fallbackCount);
        result.videos.push(...fallbackVideos);
        result.sources.fallback = { status: 'success', count: fallbackVideos.length };
      } else {
        result.sources.fallback = { status: 'success', count: 0 };
      }

      result.sources.local = { status: 'success', count: 0 }; // Not using local for reels
      
    } catch (error) {
      console.error('Failed to load trending reels:', error);
      
      // Fallback to generated content
      result.videos = this.getFallbackTrendingReels(maxResults);
      result.sources.youtube = { status: 'error', count: 0, error: 'YouTube API failed' };
      result.sources.local = { status: 'success', count: 0 };
      result.sources.fallback = { status: 'success', count: result.videos.length };
    }

    result.totalCount = result.videos.length;
    this.setCachedData(cacheKey, result);
    return result;
  }

  private convertYouTubeToVideoContent(youtubeVideo: any): VideoContent {
    return {
      id: youtubeVideo.id,
      title: youtubeVideo.title,
      description: youtubeVideo.description,
      thumbnail: youtubeVideo.thumbnail,
      duration: youtubeVideo.duration,
      views: youtubeVideo.viewCount,
      likes: youtubeVideo.likeCount,
      publishedAt: youtubeVideo.publishedAt,
      author: {
        name: youtubeVideo.channelTitle,
        avatar: this.generateChannelAvatar(youtubeVideo.channelTitle),
        verified: Math.random() > 0.6, // Simulate verification
        followers: this.formatFollowers(youtubeVideo.viewCount)
      },
      platform: 'youtube',
      platformName: 'YouTube',
      category: this.mapCategoryId(youtubeVideo.categoryId),
      tags: youtubeVideo.tags.slice(0, 5),
      embedUrl: `https://www.youtube.com/embed/${youtubeVideo.id}`,
      videoUrl: `https://www.youtube.com/watch?v=${youtubeVideo.id}`,
      factChecked: Math.random() > 0.3, // Simulate fact-checking
      trending: false
    };
  }

  private async loadLocalVideos(maxResults: number): Promise<VideoContent[]> {
    // This would integrate with a local API or database
    // For now, return empty array to simulate local API not available
    return [];
  }

  private getFallbackVideos(count: number): VideoContent[] {
    const templates = [
      {
        title: 'Análisis Político Colombia - Últimas Decisiones del Congreso',
        description: 'Revisión detallada de las decisiones más recientes del Congreso de Colombia y su impacto en la sociedad.',
        category: 'Política',
        tags: ['politica', 'congreso', 'colombia', 'análisis'],
        thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=480&h=360&fit=crop',
        channel: 'Canal Congreso Colombia'
      },
      {
        title: 'Economía Colombiana: Indicadores de Crecimiento 2024',
        description: 'Análisis de los principales indicadores económicos de Colombia y perspectivas para el próximo año.',
        category: 'Economía',
        tags: ['economia', 'crecimiento', 'indicadores', 'colombia'],
        thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=480&h=360&fit=crop',
        channel: 'Economía Colombia Hoy'
      },
      {
        title: 'Educación en Colombia: Reformas y Nuevos Programas',
        description: 'Revisión de las reformas educativas y los nuevos programas implementados en el sistema educativo colombiano.',
        category: 'Educación',
        tags: ['educacion', 'reformas', 'programas', 'colombia'],
        thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&h=360&fit=crop',
        channel: 'Educación Colombia'
      },
      {
        title: 'Medio Ambiente: Proyectos de Sostenibilidad en Colombia',
        description: 'Iniciativas ambientales y proyectos de sostenibilidad que se están desarrollando en diferentes regiones de Colombia.',
        category: 'Ambiente',
        tags: ['ambiente', 'sostenibilidad', 'proyectos', 'colombia'],
        thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=480&h=360&fit=crop',
        channel: 'Ambiente Colombia'
      },
      {
        title: 'Tecnología e Innovación: Startups Colombianas Destacadas',
        description: 'Conoce las startups colombianas más innovadoras y su impacto en el desarrollo tecnológico del país.',
        category: 'Tecnología',
        tags: ['tecnologia', 'startups', 'innovacion', 'colombia'],
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=480&h=360&fit=crop',
        channel: 'Tech Colombia'
      }
    ];

    return Array.from({ length: count }, (_, index) => {
      const template = templates[index % templates.length];
      const baseTime = Date.now() - (index * 3600000); // Stagger by hours
      
      return {
        id: `fallback_${Date.now()}_${index}`,
        title: template.title,
        description: template.description,
        thumbnail: template.thumbnail,
        duration: `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        views: Math.floor(Math.random() * 100000) + 10000,
        likes: Math.floor(Math.random() * 5000) + 500,
        publishedAt: new Date(baseTime).toISOString(),
        author: {
          name: template.channel,
          avatar: this.generateChannelAvatar(template.channel),
          verified: Math.random() > 0.5,
          followers: this.formatFollowers(Math.floor(Math.random() * 500000) + 50000)
        },
        platform: 'fallback',
        platformName: 'Fallback',
        category: template.category,
        tags: template.tags,
        embedUrl: '#',
        videoUrl: '#',
        factChecked: true,
        trending: Math.random() > 0.7
      };
    });
  }

  private getFallbackTrendingReels(count: number): VideoContent[] {
    const fallback = this.getFallbackVideos(count);
    return fallback.map(video => ({
      ...video,
      trending: true,
      isLive: Math.random() > 0.8
    }));
  }

  private generateChannelAvatar(channelName: string): string {
    const avatars = ['🏛️', '📊', '📰', '🎬', '💻', '🌍', '📺', '🎯', '⚡', '🔥'];
    const hash = channelName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  }

  private formatFollowers(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  private mapCategoryId(categoryId: string): string {
    const categories: Record<string, string> = {
      '25': 'Política',
      '24': 'Entretenimiento',
      '22': 'Personas y Blogs',
      '23': 'Comedia',
      '17': 'Deportes',
      '19': 'Viajes y Eventos',
      '28': 'Ciencia y Tecnología'
    };
    return categories[categoryId] || 'General';
  }

  private sortVideosByRelevance(videos: VideoContent[]): VideoContent[] {
    return videos.sort((a, b) => {
      // Prioritize: trending > live > views > recent
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      
      if (a.views !== b.views) return b.views - a.views;
      
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

  private getCachedData(key: string): VideoLoadResult | null {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: VideoLoadResult): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}

export const videoService = new VideoService();
export default videoService;