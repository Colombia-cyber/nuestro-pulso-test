import axios, { AxiosResponse } from 'axios';

export interface NewsVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  playUrl: string;
  embedUrl: string;
  isLive: boolean;
  language: string;
  relevanceScore: number;
}

export interface NewsVideosResponse {
  videos: NewsVideo[];
  totalResults: number;
  query: string;
  timestamp: string;
  cached: boolean;
  requestTime: string;
  requestType: string;
  limit: number;
}

export interface NewsVideosError {
  error: string;
  message: string;
  timestamp: string;
  retryAfter?: number;
}

class NewsVideosService {
  private baseUrl: string;
  private cache: Map<string, { data: NewsVideosResponse; timestamp: number }>;
  private cacheTimeout: number;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.cache = new Map();
    this.cacheTimeout = 300000; // 5 minutes cache
  }

  /**
   * Search for Colombian news videos
   * @param query Search query (optional)
   * @param limit Maximum results (default 12)
   * @returns Promise<NewsVideosResponse>
   */
  async searchNewsVideos(query: string = '', limit: number = 12): Promise<NewsVideosResponse> {
    const cacheKey = `search_${query}_${limit}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log(`📺 Serving cached news videos for: ${query || 'general search'}`);
      return { ...cached.data, cached: true };
    }

    try {
      console.log(`🔍 Fetching news videos: query="${query}", limit=${limit}`);
      
      const response: AxiosResponse<NewsVideosResponse> = await axios.get(
        `${this.baseUrl}/api/news-videos`,
        {
          params: {
            q: query,
            limit: Math.min(limit, 24),
            type: 'search'
          },
          timeout: 15000
        }
      );

      const data = response.data;
      
      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      console.log(`✅ Fetched ${data.videos.length} news videos`);
      return data;

    } catch (error) {
      console.error('❌ Error fetching news videos:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('API limit exceeded. Please try again later.');
        } else if (error.response?.status === 401) {
          throw new Error('API not configured properly. Please check YouTube API key.');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
      }
      
      throw new Error('Failed to load news videos. Please check your connection.');
    }
  }

  /**
   * Get trending Colombian news videos
   * @param limit Maximum results (default 12)
   * @returns Promise<NewsVideosResponse>
   */
  async getTrendingNewsVideos(limit: number = 12): Promise<NewsVideosResponse> {
    const cacheKey = `trending_${limit}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📺 Serving cached trending videos');
      return { ...cached.data, cached: true };
    }

    try {
      console.log(`📈 Fetching trending news videos: limit=${limit}`);
      
      const response: AxiosResponse<NewsVideosResponse> = await axios.get(
        `${this.baseUrl}/api/news-videos/trending`,
        {
          params: {
            limit: Math.min(limit, 24)
          },
          timeout: 15000
        }
      );

      const data = response.data;
      
      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      console.log(`✅ Fetched ${data.videos.length} trending videos`);
      return data;

    } catch (error) {
      console.error('❌ Error fetching trending videos:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('API limit exceeded. Please try again later.');
        } else if (error.response?.status === 401) {
          throw new Error('API not configured properly. Please check YouTube API key.');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
      }
      
      throw new Error('Failed to load trending videos. Please check your connection.');
    }
  }

  /**
   * Check service health
   * @returns Promise<any>
   */
  async checkHealth(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/news-videos/health`, {
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw new Error('Service health check failed');
    }
  }

  /**
   * Clear local cache
   */
  clearCache(): void {
    this.cache.clear();
    console.log('🧹 News videos cache cleared');
  }

  /**
   * Get cache statistics
   * @returns Object with cache stats
   */
  getCacheStats(): any {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      timeout: this.cacheTimeout
    };
  }

  /**
   * Format view count for display
   * @param count View count number
   * @returns Formatted string
   */
  formatViewCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  /**
   * Format published date for display
   * @param publishedAt ISO date string
   * @returns Formatted relative time
   */
  formatPublishedDate(publishedAt: string): string {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffMs = now.getTime() - published.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `hace ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffHours < 24) {
      return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffDays < 7) {
      return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    } else {
      return published.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }

  /**
   * Get video thumbnail with fallback
   * @param video News video object
   * @returns Thumbnail URL
   */
  getVideoThumbnail(video: NewsVideo): string {
    return video.thumbnail?.url || '/placeholder-video.jpg';
  }

  /**
   * Open video in new tab
   * @param video News video object
   */
  openVideo(video: NewsVideo): void {
    window.open(video.playUrl, '_blank', 'noopener,noreferrer');
  }
}

export default new NewsVideosService();