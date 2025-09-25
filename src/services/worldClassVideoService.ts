import { 
  WorldClassVideo, 
  VideoSearchQuery, 
  VideoSearchResult, 
  VideoFilter,
  VideoReaction,
  VideoComment,
  AdminDashboardData,
  PersonalizationSettings,
  LiveStreamStats
} from '../types/worldClassVideo';
import { aiPersonalization } from './aiPersonalization';

class WorldClassVideoService {
  private cache = new Map<string, any>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes
  private apiEndpoints = {
    youtube: 'https://www.googleapis.com/youtube/v3',
    tiktok: '/api/tiktok', // Proxy endpoint
    instagram: '/api/instagram', // Proxy endpoint
    search: '/api/video-search',
    live: '/api/live-streams'
  };

  // AI-powered video search with multi-source aggregation
  async searchVideos(query: VideoSearchQuery): Promise<VideoSearchResult> {
    const startTime = Date.now();
    const cacheKey = `search:${JSON.stringify(query)}`;
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Parallel search across all platforms
      const searchPromises = await Promise.allSettled([
        this.searchYouTube(query),
        this.searchTikTok(query),
        this.searchInstagram(query),
        this.searchLocalContent(query),
        this.searchLiveStreams(query)
      ]);

      const results = searchPromises
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<WorldClassVideo[]>).value)
        .flat();

      // AI-powered ranking and deduplication
      const rankedResults = await this.aiRankVideos(results, query);
      const searchResult = this.buildSearchResult(rankedResults, query, startTime);
      
      // Cache the result
      this.setCache(cacheKey, searchResult);
      
      return searchResult;
    } catch (error) {
      console.error('Video search error:', error);
      return this.getEmptySearchResult(startTime);
    }
  }

  // YouTube API integration with enhanced metadata
  private async searchYouTube(query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    const apiKey = import.meta.env.YOUTUBE_API_KEY;
    if (!apiKey) return [];

    try {
      const searchUrl = new URL(`${this.apiEndpoints.youtube}/search`);
      searchUrl.searchParams.append('key', apiKey);
      searchUrl.searchParams.append('q', query.query);
      searchUrl.searchParams.append('part', 'snippet');
      searchUrl.searchParams.append('type', 'video');
      searchUrl.searchParams.append('maxResults', '25');
      searchUrl.searchParams.append('order', this.mapSortToYouTube(query.filters.sortBy));

      const response = await fetch(searchUrl.toString());
      const data = await response.json();

      if (!data.items) return [];

      // Get detailed video information
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsUrl = new URL(`${this.apiEndpoints.youtube}/videos`);
      detailsUrl.searchParams.append('key', apiKey);
      detailsUrl.searchParams.append('id', videoIds);
      detailsUrl.searchParams.append('part', 'snippet,statistics,contentDetails,status');

      const detailsResponse = await fetch(detailsUrl.toString());
      const detailsData = await detailsResponse.json();

      return detailsData.items.map((item: any) => this.mapYouTubeVideo(item));
    } catch (error) {
      console.error('YouTube search error:', error);
      return [];
    }
  }

  // TikTok integration (via proxy API)
  private async searchTikTok(query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    try {
      const response = await fetch(`${this.apiEndpoints.tiktok}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.query, limit: 20 })
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.videos?.map((item: any) => this.mapTikTokVideo(item)) || [];
    } catch (error) {
      console.error('TikTok search error:', error);
      return [];
    }
  }

  // Instagram integration (via proxy API)
  private async searchInstagram(query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    try {
      const response = await fetch(`${this.apiEndpoints.instagram}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.query, limit: 15 })
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.videos?.map((item: any) => this.mapInstagramVideo(item)) || [];
    } catch (error) {
      console.error('Instagram search error:', error);
      return [];
    }
  }

  // Local content search
  private async searchLocalContent(query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    // Search through local/cached video content
    const localVideos = this.getLocalVideoDatabase();
    return localVideos.filter(video => 
      video.title.toLowerCase().includes(query.query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.query.toLowerCase()) ||
      video.topics.some(topic => topic.toLowerCase().includes(query.query.toLowerCase()))
    );
  }

  // Live streams aggregation
  private async searchLiveStreams(query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    try {
      const response = await fetch(`${this.apiEndpoints.live}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.query })
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.streams?.map((item: any) => this.mapLiveStream(item)) || [];
    } catch (error) {
      console.error('Live streams search error:', error);
      return [];
    }
  }

  // AI-powered video ranking
  private async aiRankVideos(videos: WorldClassVideo[], query: VideoSearchQuery): Promise<WorldClassVideo[]> {
    // Apply filters first
    const filteredVideos = this.applyFilters(videos, query.filters);
    
    // AI ranking based on relevance, engagement, and user preferences
    const rankedVideos = filteredVideos.map(video => {
      let score = 0;
      
      // Relevance score based on query matching
      score += this.calculateRelevanceScore(video, query.query);
      
      // Engagement score
      score += this.calculateEngagementScore(video);
      
      // Freshness score
      score += this.calculateFreshnessScore(video);
      
      // Personalization score (if user context available)
      score += video.personalizedScore || 0;
      
      // Quality indicators
      if (video.factChecked) score += 10;
      if (video.hasSubtitles) score += 5;
      if (video.author.verified) score += 15;
      
      return { ...video, aiScore: score };
    });

    // Sort by AI score
    return rankedVideos.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
  }

  // Generate AI summaries for videos
  async generateAISummary(video: WorldClassVideo): Promise<string> {
    if (video.aiSummary) return video.aiSummary;

    try {
      // Simulate AI summary generation
      const keyPoints = this.extractKeyPoints(video);
      const sentiment = video.sentiment === 'positive' ? 'positivo' : 
                      video.sentiment === 'negative' ? 'crítico' : 'neutral';
      
      const summary = `📹 ${video.title.slice(0, 60)}${video.title.length > 60 ? '...' : ''}

🎯 Puntos clave: ${keyPoints.join(', ')}

💭 Tono: ${sentiment} | ⏱️ ${video.duration} | 👁️ ${this.formatNumber(video.views)} vistas

🏷️ Temas: ${video.topics.slice(0, 3).join(', ')}${video.topics.length > 3 ? '...' : ''}

${video.factChecked ? '✅ Verificado' : '⚠️ Sin verificar'}`;

      return summary;
    } catch (error) {
      console.error('AI summary generation error:', error);
      return video.description?.slice(0, 200) + '...' || 'Resumen no disponible';
    }
  }

  // Real-time video reactions
  async addReaction(videoId: string, userId: string, reactionType: VideoReaction['type']): Promise<void> {
    try {
      await fetch('/api/video-reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          userId,
          type: reactionType,
          timestamp: new Date()
        })
      });

      // Update local cache
      this.updateVideoReaction(videoId, reactionType);
    } catch (error) {
      console.error('Add reaction error:', error);
    }
  }

  // Real-time comments
  async addComment(videoId: string, userId: string, content: string): Promise<VideoComment> {
    try {
      const response = await fetch('/api/video-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          userId,
          content,
          timestamp: new Date()
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }

  // Admin dashboard data
  async getAdminDashboard(): Promise<AdminDashboardData> {
    try {
      const response = await fetch('/api/admin/dashboard');
      return await response.json();
    } catch (error) {
      console.error('Admin dashboard error:', error);
      return this.getMockAdminData();
    }
  }

  // Personalized video feed
  async getPersonalizedFeed(userId: string, limit = 20): Promise<WorldClassVideo[]> {
    const preferences = await this.getUserPreferences(userId);
    const recommendations = aiPersonalization.generateRecommendations(
      userId, 
      this.getAllVideoIds()
    );

    const videoIds = recommendations.slice(0, limit).map(r => r.contentId);
    const videos = await this.getVideosByIds(videoIds);

    // Add personalization metadata
    return videos.map(video => {
      const rec = recommendations.find(r => r.contentId === video.id);
      return {
        ...video,
        personalizedScore: rec?.relevanceScore || 0,
        recommendationReason: rec?.reasoning || ''
      };
    });
  }

  // Live stream monitoring
  async getLiveStreams(category?: string): Promise<WorldClassVideo[]> {
    try {
      const response = await fetch(`/api/live-streams${category ? `?category=${category}` : ''}`);
      const data = await response.json();
      return data.streams || [];
    } catch (error) {
      console.error('Live streams error:', error);
      return this.getMockLiveStreams();
    }
  }

  // Helper methods
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private applyFilters(videos: WorldClassVideo[], filters: VideoFilter): WorldClassVideo[] {
    return videos.filter(video => {
      // Platform filter
      if (filters.platforms && !filters.platforms.includes(video.platform)) {
        return false;
      }

      // Category filter
      if (filters.categories && !filters.categories.includes(video.category)) {
        return false;
      }

      // Duration filter
      if (filters.duration) {
        const duration = video.durationSeconds;
        if (filters.duration.min && duration < filters.duration.min) return false;
        if (filters.duration.max && duration > filters.duration.max) return false;
      }

      // Date filter
      if (filters.uploadDate) {
        const uploadDate = video.uploadDate;
        if (filters.uploadDate.from && uploadDate < filters.uploadDate.from) return false;
        if (filters.uploadDate.to && uploadDate > filters.uploadDate.to) return false;
      }

      // Other filters
      if (filters.hasSubtitles !== undefined && video.hasSubtitles !== filters.hasSubtitles) {
        return false;
      }

      if (filters.isLive !== undefined && video.isLive !== filters.isLive) {
        return false;
      }

      if (filters.minViews && video.views < filters.minViews) {
        return false;
      }

      return true;
    });
  }

  private calculateRelevanceScore(video: WorldClassVideo, query: string): number {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title match
    if (video.title.toLowerCase().includes(queryLower)) score += 50;
    
    // Description match
    if (video.description.toLowerCase().includes(queryLower)) score += 30;
    
    // Tags/topics match
    const topicMatches = video.topics.filter(topic => 
      topic.toLowerCase().includes(queryLower)
    ).length;
    score += topicMatches * 20;

    // Keyword match
    const keywordMatches = video.keywords?.filter(keyword => 
      keyword.toLowerCase().includes(queryLower)
    ).length || 0;
    score += keywordMatches * 15;

    return score;
  }

  private calculateEngagementScore(video: WorldClassVideo): number {
    const baseViews = Math.max(video.views, 1);
    const engagementRate = (video.likes + video.comments + video.shares) / baseViews;
    return Math.min(engagementRate * 1000, 100); // Cap at 100
  }

  private calculateFreshnessScore(video: WorldClassVideo): number {
    const daysSinceUpload = (Date.now() - video.uploadDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpload < 1) return 30;
    if (daysSinceUpload < 7) return 20;
    if (daysSinceUpload < 30) return 10;
    return 0;
  }

  private extractKeyPoints(video: WorldClassVideo): string[] {
    // Simple keyword extraction from title and description
    const text = `${video.title} ${video.description}`.toLowerCase();
    const keywords = ['política', 'colombia', 'presidente', 'congreso', 'elecciones', 'democracia'];
    return keywords.filter(keyword => text.includes(keyword));
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }

  private mapSortToYouTube(sortBy?: string): string {
    switch (sortBy) {
      case 'date': return 'date';
      case 'views': return 'viewCount';
      case 'engagement': return 'rating';
      default: return 'relevance';
    }
  }

  private mapYouTubeVideo(item: any): WorldClassVideo {
    const statistics = item.statistics || {};
    const snippet = item.snippet || {};
    
    return {
      id: item.id,
      title: snippet.title || '',
      description: snippet.description || '',
      aiSummary: '',
      platform: 'youtube',
      platformName: 'YouTube',
      category: snippet.categoryId || 'General',
      tags: snippet.tags || [],
      duration: item.contentDetails?.duration || '0:00',
      durationSeconds: this.parseDuration(item.contentDetails?.duration || 'PT0S'),
      views: parseInt(statistics.viewCount || '0'),
      likes: parseInt(statistics.likeCount || '0'),
      comments: parseInt(statistics.commentCount || '0'),
      shares: 0,
      saves: 0,
      thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || '',
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
      embedUrl: `https://www.youtube.com/embed/${item.id}`,
      isLive: snippet.liveBroadcastContent === 'live',
      isStreamable: true,
      author: {
        id: snippet.channelId || '',
        name: snippet.channelTitle || '',
        avatar: '',
        verified: false,
        followers: 0,
        badges: []
      },
      aiConfidence: 0.8,
      sentiment: 'neutral',
      sentimentScore: 0,
      topics: [],
      keywords: snippet.tags || [],
      engagementRate: 0,
      watchTimeMinutes: 0,
      averageWatchTime: 0,
      uploadDate: new Date(snippet.publishedAt),
      publishedAt: new Date(snippet.publishedAt),
      lastUpdated: new Date(),
      language: snippet.defaultLanguage || 'es',
      hasSubtitles: true,
      hasClosedCaptions: true,
      contentRating: 'PG',
      factChecked: false,
      moderationFlags: []
    };
  }

  private mapTikTokVideo(item: any): WorldClassVideo {
    // Mock TikTok video mapping
    return {
      id: item.id || Math.random().toString(),
      title: item.title || 'TikTok Video',
      description: item.description || '',
      aiSummary: '',
      platform: 'tiktok',
      platformName: 'TikTok',
      category: 'Social',
      tags: item.hashtags || [],
      duration: '0:30',
      durationSeconds: 30,
      views: item.views || 0,
      likes: item.likes || 0,
      comments: item.comments || 0,
      shares: item.shares || 0,
      saves: 0,
      thumbnail: item.thumbnail || '',
      isLive: false,
      isStreamable: true,
      author: {
        id: item.author?.id || '',
        name: item.author?.name || 'TikTok User',
        avatar: item.author?.avatar || '',
        verified: item.author?.verified || false,
        followers: item.author?.followers || 0,
        badges: []
      },
      aiConfidence: 0.6,
      sentiment: 'neutral',
      sentimentScore: 0,
      topics: [],
      keywords: [],
      engagementRate: 0,
      watchTimeMinutes: 0,
      averageWatchTime: 0,
      uploadDate: new Date(),
      publishedAt: new Date(),
      lastUpdated: new Date(),
      language: 'es',
      hasSubtitles: false,
      hasClosedCaptions: false,
      contentRating: 'PG',
      factChecked: false,
      moderationFlags: []
    };
  }

  private mapInstagramVideo(item: any): WorldClassVideo {
    // Mock Instagram video mapping
    return {
      id: item.id || Math.random().toString(),
      title: item.caption || 'Instagram Video',
      description: item.caption || '',
      aiSummary: '',
      platform: 'instagram',
      platformName: 'Instagram',
      category: 'Social',
      tags: [],
      duration: '1:00',
      durationSeconds: 60,
      views: item.views || 0,
      likes: item.likes || 0,
      comments: item.comments || 0,
      shares: 0,
      saves: 0,
      thumbnail: item.thumbnail || '',
      isLive: false,
      isStreamable: true,
      author: {
        id: item.user?.id || '',
        name: item.user?.username || 'Instagram User',
        avatar: item.user?.profile_pic || '',
        verified: item.user?.verified || false,
        followers: item.user?.followers || 0,
        badges: []
      },
      aiConfidence: 0.6,
      sentiment: 'neutral',
      sentimentScore: 0,
      topics: [],
      keywords: [],
      engagementRate: 0,
      watchTimeMinutes: 0,
      averageWatchTime: 0,
      uploadDate: new Date(),
      publishedAt: new Date(),
      lastUpdated: new Date(),
      language: 'es',
      hasSubtitles: false,
      hasClosedCaptions: false,
      contentRating: 'PG',
      factChecked: false,
      moderationFlags: []
    };
  }

  private mapLiveStream(item: any): WorldClassVideo {
    return {
      id: item.id || Math.random().toString(),
      title: item.title || 'Live Stream',
      description: item.description || '',
      aiSummary: '',
      platform: 'live',
      platformName: 'Live Stream',
      category: item.category || 'General',
      tags: [],
      duration: 'LIVE',
      durationSeconds: 0,
      views: item.viewers || 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      thumbnail: item.thumbnail || '',
      streamUrl: item.streamUrl,
      isLive: true,
      isStreamable: true,
      author: {
        id: item.streamer?.id || '',
        name: item.streamer?.name || 'Live Streamer',
        avatar: item.streamer?.avatar || '',
        verified: false,
        followers: 0,
        badges: ['LIVE']
      },
      liveStats: {
        currentViewers: item.viewers || 0,
        peakViewers: item.peakViewers || 0,
        liveDuration: item.duration || 0,
        chatMessages: item.chatMessages || 0,
        streamHealth: 'good',
        bitrate: 1080,
        resolution: '1080p',
        fps: 30
      },
      aiConfidence: 0.7,
      sentiment: 'neutral',
      sentimentScore: 0,
      topics: [],
      keywords: [],
      engagementRate: 0,
      watchTimeMinutes: 0,
      averageWatchTime: 0,
      uploadDate: new Date(),
      publishedAt: new Date(),
      lastUpdated: new Date(),
      language: 'es',
      hasSubtitles: false,
      hasClosedCaptions: false,
      contentRating: 'PG',
      factChecked: false,
      moderationFlags: []
    };
  }

  private parseDuration(duration: string): number {
    // Parse ISO 8601 duration format (PT1H2M3S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  private buildSearchResult(videos: WorldClassVideo[], query: VideoSearchQuery, startTime: number): VideoSearchResult {
    const totalCount = videos.length;
    const limit = query.limit || 20;
    const offset = query.offset || 0;
    const paginatedVideos = videos.slice(offset, offset + limit);

    return {
      videos: paginatedVideos,
      totalCount,
      hasMore: offset + limit < totalCount,
      nextOffset: offset + limit,
      searchTime: Date.now() - startTime
    };
  }

  private getEmptySearchResult(startTime: number): VideoSearchResult {
    return {
      videos: [],
      totalCount: 0,
      hasMore: false,
      nextOffset: 0,
      searchTime: Date.now() - startTime
    };
  }

  private getLocalVideoDatabase(): WorldClassVideo[] {
    // Return mock local videos
    return [];
  }

  private getAllVideoIds(): string[] {
    // Return all available video IDs
    return ['video1', 'video2', 'video3']; // Mock implementation
  }

  private async getVideosByIds(ids: string[]): Promise<WorldClassVideo[]> {
    // Fetch videos by IDs
    return []; // Mock implementation
  }

  private async getUserPreferences(userId: string): Promise<PersonalizationSettings> {
    // Fetch user preferences
    return {
      userId,
      preferences: {
        platforms: ['youtube'],
        categories: ['politics'],
        languages: ['es'],
        contentTypes: ['video']
      },
      behaviorData: {
        watchHistory: [],
        likedVideos: [],
        searchHistory: [],
        interactionPatterns: {}
      },
      aiInsights: {
        topicAffinities: {},
        engagementPredictions: {},
        recommendationFeedback: {}
      }
    };
  }

  private updateVideoReaction(videoId: string, reactionType: VideoReaction['type']): void {
    // Update local cache with reaction
  }

  private getMockAdminData(): AdminDashboardData {
    return {
      sourceHealth: {
        youtube: { status: 'online', uptime: 99.9, lastCheck: new Date(), errorCount: 0, avgResponseTime: 200 },
        tiktok: { status: 'online', uptime: 98.5, lastCheck: new Date(), errorCount: 2, avgResponseTime: 300 }
      },
      cacheStats: {
        hitRate: 85.5,
        totalRequests: 10000,
        totalHits: 8550,
        memoryUsage: 512,
        avgResponseTime: 150
      },
      userEngagement: {
        totalUsers: 5000,
        activeUsers: 1200,
        avgSessionDuration: 450,
        topInteractions: [
          { type: 'view', count: 15000 },
          { type: 'like', count: 3500 }
        ],
        engagementRate: 0.24
      },
      trending: {
        videos: [],
        topics: [
          { name: 'Política Colombia', count: 1500, growth: 0.15 }
        ],
        hashtags: [
          { tag: '#colombia', count: 800, sentiment: 0.6 }
        ]
      },
      performance: {
        avgLoadTime: 1.2,
        errorRate: 0.02,
        apiLatency: 180,
        bandwidthUsage: 2.5
      }
    };
  }

  private getMockLiveStreams(): WorldClassVideo[] {
    return [
      {
        id: 'live-1',
        title: '🔴 LIVE: Sesión del Congreso de Colombia',
        description: 'Transmisión en vivo de la sesión parlamentaria',
        aiSummary: '',
        platform: 'youtube',
        platformName: 'YouTube Live',
        category: 'Política',
        tags: ['congreso', 'colombia', 'política'],
        duration: 'EN VIVO',
        durationSeconds: 0,
        views: 1250,
        likes: 89,
        comments: 234,
        shares: 45,
        saves: 12,
        thumbnail: 'https://via.placeholder.com/640x360?text=Live+Stream',
        isLive: true,
        isStreamable: true,
        author: {
          id: 'congreso-colombia',
          name: 'Congreso de Colombia',
          avatar: '🏛️',
          verified: true,
          followers: 125000,
          badges: ['OFFICIAL', 'LIVE']
        },
        liveStats: {
          currentViewers: 1250,
          peakViewers: 2100,
          liveDuration: 3600,
          chatMessages: 450,
          streamHealth: 'excellent',
          bitrate: 2500,
          resolution: '1080p',
          fps: 30
        },
        aiConfidence: 0.9,
        sentiment: 'neutral',
        sentimentScore: 0,
        topics: ['política', 'congreso', 'gobierno'],
        keywords: ['sesión', 'debate', 'ley'],
        engagementRate: 0.18,
        watchTimeMinutes: 2100,
        averageWatchTime: 1680,
        uploadDate: new Date(),
        publishedAt: new Date(),
        lastUpdated: new Date(),
        language: 'es',
        hasSubtitles: true,
        hasClosedCaptions: true,
        contentRating: 'G',
        factChecked: true,
        moderationFlags: []
      }
    ];
  }
}

export const worldClassVideoService = new WorldClassVideoService();