// YouTube API Service
import { YouTubeVideo } from '../types/dashboard';

/**
 * YouTube Service for Frontend
 * 
 * IMPORTANT: This is frontend code, so it uses import.meta.env.VITE_*
 * 
 * Environment Variables Used:
 * - VITE_YOUTUBE_API_KEY: Primary YouTube API key for frontend
 * - YOUTUBE_API_KEY: Fallback for backward compatibility (deprecated)
 * 
 * Note: For server-side YouTube operations, see /server/services/YouTubeIntegrationService.js
 * which uses process.env.YOUTUBE_API_KEY (without VITE_ prefix)
 */

class YouTubeService {
  private apiKey: string | null = null;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    // Frontend uses VITE_ prefix for environment variables
    // Support both VITE_YOUTUBE_API_KEY and YOUTUBE_API_KEY for flexibility
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 
                  import.meta.env.YOUTUBE_API_KEY || 
                  null;
    
    if (!this.apiKey) {
      console.warn('⚠️ YouTube API key not configured. Using demo data.');
      console.info('💡 Set VITE_YOUTUBE_API_KEY in your .env file to enable real YouTube data.');
    }
  }

  /**
   * Search for videos by topic/keywords
   */
  async searchVideos(query: string, maxResults: number = 12): Promise<YouTubeVideo[]> {
    // If no API key, return demo data
    if (!this.apiKey) {
      return this.getDemoVideos(query);
    }

    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
        key: this.apiKey,
        regionCode: 'CO', // Colombia region
        relevanceLanguage: 'es', // Spanish language
        order: 'relevance'
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseVideos(data.items || []);
    } catch (error) {
      console.error('YouTube API error:', error);
      // Fallback to demo data on error
      return this.getDemoVideos(query);
    }
  }

  /**
   * Get video details including statistics
   */
  async getVideoDetails(videoIds: string[]): Promise<Map<string, any>> {
    if (!this.apiKey || videoIds.length === 0) {
      return new Map();
    }

    try {
      const params = new URLSearchParams({
        part: 'statistics,contentDetails',
        id: videoIds.join(','),
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      const data = await response.json();
      
      const detailsMap = new Map();
      (data.items || []).forEach((item: any) => {
        detailsMap.set(item.id, {
          viewCount: item.statistics?.viewCount,
          duration: item.contentDetails?.duration
        });
      });

      return detailsMap;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return new Map();
    }
  }

  /**
   * Parse YouTube API response to our format
   */
  private parseVideos(items: any[]): YouTubeVideo[] {
    return items.map((item) => ({
      id: item.id.videoId || item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url || 
                item.snippet.thumbnails?.medium?.url ||
                item.snippet.thumbnails?.default?.url || '',
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId || item.id}`,
      viewCount: undefined,
      duration: undefined
    }));
  }

  /**
   * Get demo/placeholder videos when API key is not available
   */
  private getDemoVideos(query: string): YouTubeVideo[] {
    const demoVideos: YouTubeVideo[] = [
      {
        id: 'demo-1',
        title: `Últimas noticias sobre ${query} en Colombia`,
        description: 'Análisis detallado de la situación actual. Configura tu YouTube API key para ver resultados reales.',
        thumbnail: 'https://via.placeholder.com/320x180/1a73e8/ffffff?text=Video+Demo+1',
        channelTitle: 'Canal Demo Noticias',
        channelId: 'demo-channel-1',
        publishedAt: new Date().toISOString(),
        videoUrl: '#',
        viewCount: '1.2M',
        duration: '12:34'
      },
      {
        id: 'demo-2',
        title: `${query}: Perspectivas y análisis expertos`,
        description: 'Entrevistas con expertos sobre el tema. Agrega tu API key de YouTube para contenido actualizado.',
        thumbnail: 'https://via.placeholder.com/320x180/ea4335/ffffff?text=Video+Demo+2',
        channelTitle: 'Canal Demo Análisis',
        channelId: 'demo-channel-2',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        videoUrl: '#',
        viewCount: '856K',
        duration: '8:45'
      },
      {
        id: 'demo-3',
        title: `Debate en vivo: ${query}`,
        description: 'Múltiples perspectivas sobre el tema. Modo demo - configura VITE_YOUTUBE_API_KEY en .env',
        thumbnail: 'https://via.placeholder.com/320x180/34a853/ffffff?text=Video+Demo+3',
        channelTitle: 'Canal Demo Debates',
        channelId: 'demo-channel-3',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        videoUrl: '#',
        viewCount: '542K',
        duration: '15:20'
      },
      {
        id: 'demo-4',
        title: `${query}: Qué significa para Colombia`,
        description: 'Impacto en la sociedad colombiana. Datos de demostración - usa tu propia API key.',
        thumbnail: 'https://via.placeholder.com/320x180/fbbc04/ffffff?text=Video+Demo+4',
        channelTitle: 'Canal Demo Sociedad',
        channelId: 'demo-channel-4',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        videoUrl: '#',
        viewCount: '423K',
        duration: '10:15'
      }
    ];

    return demoVideos;
  }

  /**
   * Check if YouTube API is configured
   */
  isConfigured(): boolean {
    return this.apiKey !== null;
  }
}

export const youtubeService = new YouTubeService();
export default youtubeService;
