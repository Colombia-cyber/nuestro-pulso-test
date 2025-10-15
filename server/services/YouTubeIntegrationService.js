import axios from 'axios';

/**
 * YouTube Integration Service for Backend
 * 
 * IMPORTANT: This is backend/server code, so it uses process.env.* (NO VITE_ prefix)
 * 
 * Environment Variables Used:
 * - YOUTUBE_API_KEY: YouTube API key for server-side operations
 * 
 * Note: For frontend YouTube operations, see /src/services/youtubeService.ts
 * which uses import.meta.env.VITE_YOUTUBE_API_KEY
 */

class YouTubeIntegrationService {
  constructor() {
    // Backend code uses process.env without VITE_ prefix
    this.apiKey = process.env.YOUTUBE_API_KEY || null;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutes
    
    if (!this.apiKey) {
      console.warn('⚠️ Backend YouTube API key not configured. Using mock data.');
      console.info('💡 Set YOUTUBE_API_KEY (no VITE_ prefix) in your .env file for server-side YouTube access.');
    }
    
    // Search categories for Colombia content
    this.searchCategories = {
      news: {
        query: 'Colombia noticias OR Colombia news OR noticias Colombia',
        maxResults: 25,
        order: 'date',
        type: 'video',
        videoDuration: 'any',
        relevanceLanguage: 'es'
      },
      culture: {
        query: 'Colombia cultura OR Colombian culture OR tradiciones Colombia',
        maxResults: 20,
        order: 'viewCount',
        type: 'video',
        videoDuration: 'medium'
      },
      travel: {
        query: 'Colombia travel OR viajes Colombia OR turismo Colombia',
        maxResults: 20,
        order: 'viewCount',
        type: 'video',
        videoDuration: 'medium'
      },
      food: {
        query: 'Colombia comida OR Colombian food OR gastronomía Colombia',
        maxResults: 15,
        order: 'viewCount',
        type: 'video',
        videoDuration: 'medium'
      }
    };
  }

  /**
   * Get Colombia-focused videos from YouTube
   */
  async getColombiaVideos(options = {}) {
    const { 
      categories = ['news', 'culture', 'travel', 'food'], 
      maxAge = this.cacheTimeout,
      forceRefresh = false 
    } = options;

    if (!this.apiKey) {
      return this.getMockVideoData();
    }

    try {
      const cacheKey = `youtube_${categories.join('_')}`;
      
      // Check cache first
      if (!forceRefresh) {
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < maxAge) {
          return {
            ...cached.data,
            cached: true,
            cacheAge: Date.now() - cached.timestamp
          };
        }
      }

      // Fetch videos for each category
      const categoryPromises = categories.map(category => 
        this.searchVideosByCategory(category)
      );

      const results = await Promise.allSettled(categoryPromises);
      
      // Combine results
      let allVideos = [];
      let categoryStats = {};

      results.forEach((result, index) => {
        const category = categories[index];
        
        if (result.status === 'fulfilled' && result.value.videos) {
          allVideos = allVideos.concat(
            result.value.videos.map(video => ({ ...video, category }))
          );
          categoryStats[category] = {
            count: result.value.videos.length,
            status: 'success'
          };
        } else {
          console.warn(`YouTube category ${category} failed:`, result.reason?.message);
          categoryStats[category] = {
            count: 0,
            status: 'error',
            error: result.reason?.message || 'Unknown error'
          };
        }
      });

      // Sort by relevance and recency
      allVideos = this.sortVideosByRelevance(allVideos);

      const response = {
        videos: allVideos,
        totalCount: allVideos.length,
        categoryStats,
        lastUpdate: new Date().toISOString(),
        categories: categories,
        cached: false
      };

      // Cache the results
      this.cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });

      return response;

    } catch (error) {
      console.error('YouTube API error:', error);
      return this.getMockVideoData();
    }
  }

  /**
   * Search videos by category
   */
  async searchVideosByCategory(category) {
    const searchConfig = this.searchCategories[category];
    if (!searchConfig) {
      throw new Error(`Unknown category: ${category}`);
    }

    try {
      const searchResponse = await axios.get(`${this.baseUrl}/search`, {
        params: {
          key: this.apiKey,
          q: searchConfig.query,
          part: 'snippet',
          type: 'video',
          maxResults: searchConfig.maxResults,
          order: searchConfig.order,
          relevanceLanguage: searchConfig.relevanceLanguage || 'es',
          safeSearch: 'moderate',
          videoDefinition: 'any',
          videoDuration: searchConfig.videoDuration
        },
        timeout: 10000
      });

      const videoIds = searchResponse.data.items.map(item => item.id.videoId);
      
      // Get detailed video information
      const detailsResponse = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          key: this.apiKey,
          id: videoIds.join(','),
          part: 'snippet,statistics,contentDetails',
        },
        timeout: 10000
      });

      const videos = detailsResponse.data.items.map(video => 
        this.formatVideoData(video)
      );

      return { videos };

    } catch (error) {
      console.error(`Error fetching ${category} videos:`, error.message);
      return { videos: [], error: error.message };
    }
  }

  /**
   * Format YouTube video data
   */
  formatVideoData(video) {
    return {
      id: video.id,
      title: video.snippet.title,
      description: this.truncateDescription(video.snippet.description),
      thumbnail: this.selectBestThumbnail(video.snippet.thumbnails),
      duration: this.formatDuration(video.contentDetails.duration),
      viewCount: parseInt(video.statistics.viewCount || 0),
      likeCount: parseInt(video.statistics.likeCount || 0),
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      tags: video.snippet.tags || [],
      categoryId: video.snippet.categoryId,
      language: video.snippet.defaultLanguage || 'es'
    };
  }

  /**
   * Select best thumbnail from available options
   */
  selectBestThumbnail(thumbnails) {
    // Prefer higher resolution thumbnails
    if (thumbnails.maxres) return thumbnails.maxres.url;
    if (thumbnails.high) return thumbnails.high.url;
    if (thumbnails.medium) return thumbnails.medium.url;
    if (thumbnails.standard) return thumbnails.standard.url;
    return thumbnails.default?.url || '';
  }

  /**
   * Format ISO 8601 duration to readable format
   */
  formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Truncate video description
   */
  truncateDescription(description, maxLength = 150) {
    if (!description) return '';
    
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...'
      : description;
  }

  /**
   * Sort videos by relevance (Colombia content + engagement)
   */
  sortVideosByRelevance(videos) {
    return videos.sort((a, b) => {
      // Score based on Colombia relevance
      const aColombiaScore = this.calculateColombiaRelevance(a);
      const bColombiaScore = this.calculateColombiaRelevance(b);
      
      // Score based on engagement (views, likes)
      const aEngagementScore = this.calculateEngagementScore(a);
      const bEngagementScore = this.calculateEngagementScore(b);
      
      // Score based on recency
      const aRecencyScore = this.calculateRecencyScore(a.publishedAt);
      const bRecencyScore = this.calculateRecencyScore(b.publishedAt);
      
      // Combined score
      const aScore = (aColombiaScore * 0.4) + (aEngagementScore * 0.4) + (aRecencyScore * 0.2);
      const bScore = (bColombiaScore * 0.4) + (bEngagementScore * 0.4) + (bRecencyScore * 0.2);
      
      return bScore - aScore;
    });
  }

  /**
   * Calculate Colombia relevance score
   */
  calculateColombiaRelevance(video) {
    const text = `${video.title} ${video.description} ${video.channelTitle}`.toLowerCase();
    let score = 0;
    
    // Direct Colombia mentions
    if (text.includes('colombia')) score += 3;
    if (text.includes('colombian')) score += 3;
    if (text.includes('bogotá') || text.includes('bogota')) score += 2;
    if (text.includes('medellín') || text.includes('medellin')) score += 2;
    if (text.includes('cartagena')) score += 2;
    if (text.includes('cali')) score += 2;
    
    // Colombian culture/politics terms
    if (text.includes('petro') || text.includes('uribe')) score += 1;
    if (text.includes('café') || text.includes('coffee')) score += 1;
    if (text.includes('vallenato') || text.includes('cumbia')) score += 1;
    if (text.includes('arepa') || text.includes('empanada')) score += 1;
    
    return Math.min(score, 10); // Cap at 10
  }

  /**
   * Calculate engagement score
   */
  calculateEngagementScore(video) {
    const views = video.viewCount || 0;
    const likes = video.likeCount || 0;
    
    // Normalize scores (logarithmic scale)
    const viewScore = Math.min(Math.log10(views + 1), 7); // Max score 7 for 10M+ views
    const likeScore = Math.min(Math.log10(likes + 1), 5); // Max score 5 for 100K+ likes
    
    return viewScore + likeScore;
  }

  /**
   * Calculate recency score
   */
  calculateRecencyScore(publishedAt) {
    const now = Date.now();
    const publishTime = new Date(publishedAt).getTime();
    const daysSincePublish = (now - publishTime) / (1000 * 60 * 60 * 24);
    
    // Higher score for newer videos, max score 5 for videos < 1 day old
    return Math.max(0, Math.min(5, 5 - (daysSincePublish / 30)));
  }

  /**
   * Get trending Colombia videos (most recent + high engagement)
   */
  async getTrendingVideos(limit = 10) {
    try {
      const allVideos = await this.getColombiaVideos();
      
      return allVideos.videos
        .filter(video => {
          // Must be recent (last 30 days) and have good engagement
          const daysSincePublish = (Date.now() - new Date(video.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
          return daysSincePublish <= 30 && video.viewCount > 1000;
        })
        .slice(0, limit);
        
    } catch (error) {
      console.error('Error getting trending videos:', error);
      return [];
    }
  }

  /**
   * Search videos by query
   */
  async searchVideos(query, options = {}) {
    const { maxResults = 20 } = options;
    
    if (!this.apiKey) {
      return this.searchMockVideos(query);
    }

    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          key: this.apiKey,
          q: `${query} Colombia`,
          part: 'snippet',
          type: 'video',
          maxResults,
          order: 'relevance',
          relevanceLanguage: 'es',
          safeSearch: 'moderate'
        },
        timeout: 10000
      });

      const videoIds = response.data.items.map(item => item.id.videoId);
      
      // Get detailed information
      const detailsResponse = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          key: this.apiKey,
          id: videoIds.join(','),
          part: 'snippet,statistics,contentDetails',
        }
      });

      const videos = detailsResponse.data.items.map(video => 
        this.formatVideoData(video)
      );

      return {
        videos,
        query,
        totalResults: response.data.pageInfo.totalResults,
        cached: false
      };

    } catch (error) {
      console.error('YouTube search error:', error);
      return this.searchMockVideos(query);
    }
  }

  /**
   * Mock video data for when API is not available
   */
  getMockVideoData() {
    return {
      videos: [
        {
          id: 'mock_1',
          title: 'Colombia News Today - Latest Updates from Bogotá',
          description: 'Stay updated with the latest news from Colombia including politics, economy, and social developments.',
          thumbnail: '/api/placeholder/480/360',
          duration: '8:45',
          viewCount: 15420,
          likeCount: 342,
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          channelTitle: 'Colombia News Network',
          channelId: 'mock_channel_1',
          url: 'https://www.youtube.com/watch?v=mock_1',
          embedUrl: 'https://www.youtube.com/embed/mock_1',
          tags: ['colombia', 'news', 'politics'],
          category: 'news'
        },
        {
          id: 'mock_2',
          title: 'Colombian Coffee Culture - From Farm to Cup',
          description: 'Explore the rich coffee culture of Colombia and meet the farmers who grow the world\'s finest beans.',
          thumbnail: '/api/placeholder/480/360',
          duration: '12:30',
          viewCount: 89650,
          likeCount: 2150,
          publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: 'Cultural Colombia',
          channelId: 'mock_channel_2',
          url: 'https://www.youtube.com/watch?v=mock_2',
          embedUrl: 'https://www.youtube.com/embed/mock_2',
          tags: ['colombia', 'coffee', 'culture'],
          category: 'culture'
        },
        {
          id: 'mock_3',
          title: 'Best Places to Visit in Colombia 2024',
          description: 'Discover the most beautiful destinations in Colombia from Cartagena to the Amazon rainforest.',
          thumbnail: '/api/placeholder/480/360',
          duration: '15:22',
          viewCount: 156780,
          likeCount: 4890,
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: 'Travel Colombia',
          channelId: 'mock_channel_3',
          url: 'https://www.youtube.com/watch?v=mock_3',
          embedUrl: 'https://www.youtube.com/embed/mock_3',
          tags: ['colombia', 'travel', 'tourism'],
          category: 'travel'
        },
        {
          id: 'mock_4',
          title: 'Traditional Colombian Food - Arepa Making Tutorial',
          description: 'Learn how to make authentic Colombian arepas with this step-by-step guide.',
          thumbnail: '/api/placeholder/480/360',
          duration: '9:15',
          viewCount: 45230,
          likeCount: 1820,
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          channelTitle: 'Colombian Kitchen',
          channelId: 'mock_channel_4',
          url: 'https://www.youtube.com/watch?v=mock_4',
          embedUrl: 'https://www.youtube.com/embed/mock_4',
          tags: ['colombia', 'food', 'cooking'],
          category: 'food'
        }
      ],
      totalCount: 4,
      categoryStats: {
        news: { count: 1, status: 'mock' },
        culture: { count: 1, status: 'mock' },
        travel: { count: 1, status: 'mock' },
        food: { count: 1, status: 'mock' }
      },
      lastUpdate: new Date().toISOString(),
      categories: ['news', 'culture', 'travel', 'food'],
      cached: false,
      mock: true
    };
  }

  /**
   * Mock video search
   */
  searchMockVideos(query) {
    const mockData = this.getMockVideoData();
    const filteredVideos = mockData.videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    );

    return {
      videos: filteredVideos,
      query,
      totalResults: filteredVideos.length,
      cached: false,
      mock: true
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      hasApiKey: !!this.apiKey
    };
  }
}

export default YouTubeIntegrationService;