import {
  NewsHubResponse,
  VideoHubResponse,
  CombinedHubResponse,
  NewsHubFilter,
  VideoHubFilter,
  ColombiaNewsSource,
  ContentCategory,
  HubStats
} from '../types/colombia-hub';

/**
 * Colombia Hub Service - News & Video Aggregation
 * 
 * IMPORTANT: This is frontend code connecting to backend API
 * 
 * This service fetches aggregated Colombia-focused content from the backend:
 * - News articles from multiple Colombian sources
 * - YouTube videos about Colombia
 * - Combined feeds for comprehensive coverage
 * 
 * Backend API Endpoints:
 * - GET /api/colombia-hub/news - Get latest news
 * - GET /api/colombia-hub/videos - Get Colombia videos
 * - GET /api/colombia-hub/combined - Get both news and videos
 * - GET /api/colombia-hub/sources - Get available news sources
 * - GET /api/colombia-hub/categories - Get content categories
 * - POST /api/colombia-hub/refresh - Force refresh cache
 * - GET /api/colombia-hub/stats - Get hub statistics
 * 
 * Note: This service communicates with backend at localhost:3001
 * The backend handles all API keys and aggregation logic
 */

class ColombiaHubService {
  private baseUrl = 'http://localhost:3001/api/colombia-hub';
  private cache = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  /**
   * Get latest Colombia news
   */
  async getNews(filter: NewsHubFilter = {}): Promise<NewsHubResponse> {
    const params = new URLSearchParams();
    
    if (filter.limit) params.append('limit', filter.limit.toString());
    if (filter.category) params.append('category', filter.category);
    if (filter.sources) params.append('sources', filter.sources.join(','));
    if (filter.search) params.append('search', filter.search);
    if (filter.trending) params.append('trending', filter.trending.toString());

    const url = `${this.baseUrl}/news?${params.toString()}`;
    
    try {
      // Check cache first
      const cacheKey = `news_${params.toString()}`;
      const cached = this.getCachedData(cacheKey);
      if (cached) return cached;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch news');
      }

      // Cache the result
      this.setCachedData(cacheKey, data.data);
      return data.data;

    } catch (error) {
      console.error('Failed to fetch news:', error);
      
      // Return fallback data
      return this.getFallbackNewsData(filter);
    }
  }

  /**
   * Get Colombia-focused videos
   */
  async getVideos(filter: VideoHubFilter = {}): Promise<VideoHubResponse> {
    const params = new URLSearchParams();
    
    if (filter.limit) params.append('limit', filter.limit.toString());
    if (filter.categories) params.append('categories', filter.categories.join(','));
    if (filter.search) params.append('search', filter.search);
    if (filter.trending) params.append('trending', filter.trending.toString());

    const url = `${this.baseUrl}/videos?${params.toString()}`;
    
    try {
      // Check cache first
      const cacheKey = `videos_${params.toString()}`;
      const cached = this.getCachedData(cacheKey);
      if (cached) return cached;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch videos');
      }

      // Cache the result
      this.setCachedData(cacheKey, data.data);
      return data.data;

    } catch (error) {
      console.error('Failed to fetch videos:', error);
      
      // Return fallback data
      return this.getFallbackVideoData(filter);
    }
  }

  /**
   * Get combined news and videos
   */
  async getCombinedContent(
    newsFilter: NewsHubFilter = {},
    videoFilter: VideoHubFilter = {}
  ): Promise<CombinedHubResponse> {
    const params = new URLSearchParams();
    
    if (newsFilter.limit) params.append('newsLimit', newsFilter.limit.toString());
    if (videoFilter.limit) params.append('videoLimit', videoFilter.limit.toString());
    if (newsFilter.category) params.append('category', newsFilter.category);
    if (newsFilter.search) params.append('search', newsFilter.search);

    const url = `${this.baseUrl}/combined?${params.toString()}`;
    
    try {
      // Check cache first
      const cacheKey = `combined_${params.toString()}`;
      const cached = this.getCachedData(cacheKey);
      if (cached) return cached;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch content');
      }

      // Cache the result
      this.setCachedData(cacheKey, data.data);
      return data.data;

    } catch (error) {
      console.error('Failed to fetch combined content:', error);
      
      // Return fallback data
      return {
        news: this.getFallbackNewsData(newsFilter),
        videos: this.getFallbackVideoData(videoFilter)
      };
    }
  }

  /**
   * Get available news sources
   */
  async getSources(): Promise<ColombiaNewsSource[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sources`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch sources');
      }

      return data.data.sources;

    } catch (error) {
      console.error('Failed to fetch sources:', error);
      return this.getFallbackSources();
    }
  }

  /**
   * Get available categories
   */
  async getCategories(): Promise<ContentCategory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch categories');
      }

      return data.data.categories;

    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return this.getFallbackCategories();
    }
  }

  /**
   * Refresh all content (force cache clear)
   */
  async refreshContent(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to refresh content');
      }

      // Clear local cache
      this.cache.clear();
      return true;

    } catch (error) {
      console.error('Failed to refresh content:', error);
      return false;
    }
  }

  /**
   * Get hub statistics
   */
  async getStats(): Promise<HubStats | null> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch stats');
      }

      return data.data;

    } catch (error) {
      console.error('Failed to fetch stats:', error);
      return null;
    }
  }

  // Cache management
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

  // Fallback data methods
  private getFallbackNewsData(filter: NewsHubFilter): NewsHubResponse {
    return {
      articles: [
        {
          id: 'fallback_1',
          title: 'Colombia News Hub - Serving Latest Updates',
          summary: 'Stay informed with the latest news from Colombia, including politics, economy, culture, and international relations.',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: {
            id: 'colombia-reports',
            name: 'Colombia Reports',
            icon: '📊',
            category: 'local',
            active: true
          },
          category: 'general',
          tags: ['colombia', 'news', 'updates'],
          language: 'es'
        }
      ],
      totalCount: 1,
      sourceStats: {},
      lastUpdate: new Date().toISOString(),
      categories: ['general'],
      cached: false
    };
  }

  private getFallbackVideoData(filter: VideoHubFilter): VideoHubResponse {
    return {
      videos: [
        {
          id: 'fallback_video_1',
          title: 'Welcome to Colombia News Hub',
          description: 'Discover the best of Colombia through news, culture, travel, and food content.',
          thumbnail: '/api/placeholder/480/360',
          duration: '5:00',
          viewCount: 1000,
          likeCount: 50,
          publishedAt: new Date().toISOString(),
          channelTitle: 'Colombia Hub',
          channelId: 'colombia_hub',
          url: '#',
          embedUrl: '#',
          tags: ['colombia', 'introduction'],
          category: 'news',
          language: 'es'
        }
      ],
      totalCount: 1,
      categoryStats: {
        news: { count: 1, status: 'mock' }
      },
      lastUpdate: new Date().toISOString(),
      categories: ['news'],
      cached: false,
      mock: true
    };
  }

  private getFallbackSources(): ColombiaNewsSource[] {
    return [
      {
        id: 'colombia-reports',
        name: 'Colombia Reports',
        icon: '📊',
        category: 'local',
        active: true
      },
      {
        id: 'city-paper-bogota',
        name: 'The City Paper Bogotá',
        icon: '📰',
        category: 'local',
        active: true
      },
      {
        id: 'ap-news',
        name: 'AP News',
        icon: '🔴',
        category: 'international',
        active: true
      }
    ];
  }

  private getFallbackCategories(): ContentCategory[] {
    return [
      { id: 'all', name: 'Todas las categorías', icon: '📰', count: 0 },
      { id: 'news', name: 'Noticias', icon: '📺', count: 0 },
      { id: 'politics', name: 'Política', icon: '🏛️', count: 0 },
      { id: 'economy', name: 'Economía', icon: '💰', count: 0 },
      { id: 'culture', name: 'Cultura', icon: '🎭', count: 0 },
      { id: 'travel', name: 'Viajes', icon: '✈️', count: 0 },
      { id: 'food', name: 'Gastronomía', icon: '🍽️', count: 0 }
    ];
  }

  /**
   * Clear local cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const colombiaHubService = new ColombiaHubService();
export default colombiaHubService;