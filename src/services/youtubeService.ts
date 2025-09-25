interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  tags: string[];
  categoryId: string;
}

interface YouTubeSearchParams {
  query?: string;
  maxResults?: number;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: 'moderate' | 'strict' | 'none';
  type?: 'video' | 'channel' | 'playlist';
  videoDefinition?: 'any' | 'high' | 'standard';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoEmbeddable?: 'any' | 'true';
}

class YouTubeService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.apiKey = import.meta.env.YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('YouTube API key not found. YouTube features will use fallback data.');
    }
  }

  /**
   * Search for videos related to Colombia news and politics
   */
  async searchColombiaNews(maxResults = 20): Promise<YouTubeVideo[]> {
    const queries = [
      'Colombia noticias política actual',
      'Colombia news politics today',
      'Petro Colombia gobierno',
      'Colombia congreso senado',
      'Colombia economía noticias'
    ];

    try {
      const allVideos: YouTubeVideo[] = [];
      
      for (const query of queries.slice(0, 2)) { // Limit to avoid API quota issues
        const videos = await this.searchVideos({
          query,
          maxResults: Math.ceil(maxResults / 2),
          regionCode: 'CO',
          relevanceLanguage: 'es',
          videoEmbeddable: 'true',
          videoDuration: 'medium'
        });
        allVideos.push(...videos);
      }

      // Remove duplicates and sort by relevance
      const uniqueVideos = this.removeDuplicateVideos(allVideos);
      return uniqueVideos.slice(0, maxResults);

    } catch (error) {
      console.error('YouTube search failed:', error);
      return this.getFallbackColombiaVideos(maxResults);
    }
  }

  /**
   * Get trending videos from Colombia
   */
  async getTrendingColombiaVideos(maxResults = 12): Promise<YouTubeVideo[]> {
    const cacheKey = `trending_colombia_${maxResults}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      if (!this.apiKey) {
        return this.getFallbackColombiaVideos(maxResults);
      }

      const response = await fetch(
        `${this.baseUrl}/videos?` + 
        new URLSearchParams({
          part: 'snippet,statistics,contentDetails',
          chart: 'mostPopular',
          regionCode: 'CO',
          maxResults: maxResults.toString(),
          key: this.apiKey,
          categoryId: '25' // News & Politics
        })
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      const videos = this.parseYouTubeVideos(data.items || []);
      
      this.setCachedData(cacheKey, videos);
      return videos;

    } catch (error) {
      console.error('Failed to fetch trending videos:', error);
      return this.getFallbackColombiaVideos(maxResults);
    }
  }

  /**
   * Search for videos with custom parameters
   */
  async searchVideos(params: YouTubeSearchParams): Promise<YouTubeVideo[]> {
    const cacheKey = `search_${JSON.stringify(params)}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      if (!this.apiKey) {
        return this.getFallbackColombiaVideos(params.maxResults || 10);
      }

      // First, search for videos
      const searchParams = new URLSearchParams({
        part: 'snippet',
        type: params.type || 'video',
        maxResults: (params.maxResults || 10).toString(),
        q: params.query || 'Colombia noticias',
        key: this.apiKey,
        safeSearch: params.safeSearch || 'moderate',
        videoEmbeddable: params.videoEmbeddable || 'true',
        order: 'relevance'
      });

      if (params.regionCode) searchParams.append('regionCode', params.regionCode);
      if (params.relevanceLanguage) searchParams.append('relevanceLanguage', params.relevanceLanguage);
      if (params.videoDuration) searchParams.append('videoDuration', params.videoDuration);

      const searchResponse = await fetch(`${this.baseUrl}/search?${searchParams.toString()}`);
      
      if (!searchResponse.ok) {
        throw new Error(`YouTube search error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      const videoIds = searchData.items?.map((item: any) => item.id.videoId).filter(Boolean) || [];

      if (videoIds.length === 0) {
        return this.getFallbackColombiaVideos(params.maxResults || 10);
      }

      // Get detailed video information
      const videosResponse = await fetch(
        `${this.baseUrl}/videos?` +
        new URLSearchParams({
          part: 'snippet,statistics,contentDetails',
          id: videoIds.join(','),
          key: this.apiKey
        })
      );

      if (!videosResponse.ok) {
        throw new Error(`YouTube videos API error: ${videosResponse.status}`);
      }

      const videosData = await videosResponse.json();
      const videos = this.parseYouTubeVideos(videosData.items || []);
      
      this.setCachedData(cacheKey, videos);
      return videos;

    } catch (error) {
      console.error('YouTube search failed:', error);
      return this.getFallbackColombiaVideos(params.maxResults || 10);
    }
  }

  /**
   * Get video by ID
   */
  async getVideoById(videoId: string): Promise<YouTubeVideo | null> {
    const cacheKey = `video_${videoId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      if (!this.apiKey) {
        return null;
      }

      const response = await fetch(
        `${this.baseUrl}/videos?` +
        new URLSearchParams({
          part: 'snippet,statistics,contentDetails',
          id: videoId,
          key: this.apiKey
        })
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      const videos = this.parseYouTubeVideos(data.items || []);
      const video = videos[0] || null;
      
      if (video) {
        this.setCachedData(cacheKey, video);
      }
      
      return video;

    } catch (error) {
      console.error('Failed to fetch video:', error);
      return null;
    }
  }

  private parseYouTubeVideos(items: any[]): YouTubeVideo[] {
    return items.map(item => {
      const snippet = item.snippet;
      const statistics = item.statistics || {};
      const contentDetails = item.contentDetails || {};

      return {
        id: item.id,
        title: snippet.title || 'Sin título',
        description: snippet.description || '',
        thumbnail: this.getBestThumbnail(snippet.thumbnails),
        duration: this.formatDuration(contentDetails.duration || 'PT0S'),
        viewCount: parseInt(statistics.viewCount || '0'),
        likeCount: parseInt(statistics.likeCount || '0'),
        publishedAt: snippet.publishedAt || new Date().toISOString(),
        channelTitle: snippet.channelTitle || 'Canal desconocido',
        channelId: snippet.channelId || '',
        tags: snippet.tags || [],
        categoryId: snippet.categoryId || '25'
      };
    });
  }

  private getBestThumbnail(thumbnails: any): string {
    if (!thumbnails) return '/api/placeholder/480/360';
    
    // Prefer higher quality thumbnails
    if (thumbnails.maxres) return thumbnails.maxres.url;
    if (thumbnails.high) return thumbnails.high.url;
    if (thumbnails.medium) return thumbnails.medium.url;
    if (thumbnails.default) return thumbnails.default.url;
    
    return '/api/placeholder/480/360';
  }

  private formatDuration(isoDuration: string): string {
    try {
      // Parse ISO 8601 duration (PT4M13S)
      const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return '0:00';

      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0');
      const seconds = parseInt(match[3] || '0');

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    } catch (error) {
      return '0:00';
    }
  }

  private removeDuplicateVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
    const seen = new Set();
    return videos.filter(video => {
      const key = video.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private getCachedData(key: string): any {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private getFallbackColombiaVideos(count: number): YouTubeVideo[] {
    const fallbackVideos: YouTubeVideo[] = [
      {
        id: 'fallback_1',
        title: 'Noticias Colombia - Actualidad Política Nacional',
        description: 'Resumen de las noticias más importantes de la política colombiana. Análisis de las decisiones gubernamentales y su impacto en el país.',
        thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=480&h=360&fit=crop',
        duration: '8:45',
        viewCount: 125600,
        likeCount: 3400,
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        channelTitle: 'Canal Congreso Colombia',
        channelId: 'UCColombiaNews',
        tags: ['colombia', 'politica', 'noticias', 'gobierno'],
        categoryId: '25'
      },
      {
        id: 'fallback_2',
        title: 'Economía Colombiana: Análisis de Inversión Extranjera',
        description: 'Empresas multinacionales muestran creciente interés en Colombia. Análisis del impacto económico y las oportunidades de crecimiento.',
        thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=480&h=360&fit=crop',
        duration: '12:30',
        viewCount: 89400,
        likeCount: 2100,
        publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        channelTitle: 'Economía Colombia',
        channelId: 'UCEconomiaCol',
        tags: ['economia', 'inversion', 'colombia', 'empresas'],
        categoryId: '25'
      },
      {
        id: 'fallback_3',
        title: 'Seguridad Ciudadana: Nuevas Estrategias Gubernamentales',
        description: 'Análisis de las nuevas políticas de seguridad implementadas por el gobierno colombiano para combatir la criminalidad.',
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=480&h=360&fit=crop',
        duration: '15:22',
        viewCount: 67800,
        likeCount: 1800,
        publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        channelTitle: 'Seguridad Nacional Colombia',
        channelId: 'UCSeguridadCO',
        tags: ['seguridad', 'colombia', 'politicas', 'gobierno'],
        categoryId: '25'
      },
      {
        id: 'fallback_4',
        title: 'Reforma Educativa: Impacto en Colegios Públicos',
        description: 'El Ministerio de Educación presenta nueva estrategia para fortalecer la educación pública en Colombia.',
        thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&h=360&fit=crop',
        duration: '9:15',
        viewCount: 45600,
        likeCount: 1200,
        publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        channelTitle: 'Educación Colombia',
        channelId: 'UCEducacionCO',
        tags: ['educacion', 'reforma', 'colombia', 'colegios'],
        categoryId: '25'
      }
    ];

    return fallbackVideos.slice(0, count);
  }
}

export const youtubeService = new YouTubeService();
export default youtubeService;