import { 
  APIProvider, 
  ContentItem, 
  SearchQuery, 
  SearchResults, 
  APIConfig,
  TrendingTopic,
  VoiceSearchResult 
} from '../types/api';

class APIManager {
  private providers: Map<string, APIProvider> = new Map();
  private config: APIConfig;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private rateLimits: Map<string, { count: number; resetTime: number }> = new Map();

  constructor() {
    this.config = this.loadConfig();
    this.initializeProviders();
    this.startStatusMonitoring();
  }

  private loadConfig(): APIConfig {
    return {
      youtube: {
        apiKey: import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.YOUTUBE_API_KEY || '',
        quotaUsed: 0,
        quotaLimit: 10000
      },
      google: {
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
        cseId: import.meta.env.VITE_GOOGLE_CSE_ID || ''
      },
      tiktok: {
        clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
        clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || ''
      },
      instagram: {
        accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
        appId: import.meta.env.VITE_INSTAGRAM_APP_ID || ''
      },
      facebook: {
        accessToken: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN || '',
        appId: import.meta.env.VITE_FACEBOOK_APP_ID || ''
      },
      twitter: {
        bearerToken: import.meta.env.VITE_TWITTER_BEARER_TOKEN || '',
        apiKey: import.meta.env.VITE_TWITTER_API_KEY || '',
        apiSecret: import.meta.env.VITE_TWITTER_API_SECRET || ''
      },
      newsapi: {
        apiKey: import.meta.env.VITE_NEWSAPI_KEY || import.meta.env.NEWSAPI_KEY || ''
      }
    };
  }

  private initializeProviders(): void {
    const providers: APIProvider[] = [
      {
        id: 'youtube',
        name: 'YouTube',
        status: this.config.youtube.apiKey ? 'active' : 'inactive',
        icon: '📺',
        lastUpdate: new Date()
      },
      {
        id: 'google-news',
        name: 'Google News',
        status: this.config.google.apiKey ? 'active' : 'inactive',
        icon: '📰',
        lastUpdate: new Date()
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        status: this.config.tiktok.clientKey ? 'active' : 'inactive',
        icon: '🎵',
        lastUpdate: new Date()
      },
      {
        id: 'instagram',
        name: 'Instagram',
        status: this.config.instagram.accessToken ? 'active' : 'inactive',
        icon: '📸',
        lastUpdate: new Date()
      },
      {
        id: 'facebook',
        name: 'Facebook',
        status: this.config.facebook.accessToken ? 'active' : 'inactive',
        icon: '👥',
        lastUpdate: new Date()
      },
      {
        id: 'twitter',
        name: 'X (Twitter)',
        status: this.config.twitter.bearerToken ? 'active' : 'inactive',
        icon: '🐦',
        lastUpdate: new Date()
      },
      {
        id: 'wikipedia',
        name: 'Wikipedia',
        status: 'active', // No API key needed
        icon: '📖',
        lastUpdate: new Date()
      },
      {
        id: 'civic-news',
        name: 'Civic News',
        status: 'active', // RSS feeds
        icon: '🏛️',
        lastUpdate: new Date()
      }
    ];

    providers.forEach(provider => {
      this.providers.set(provider.id, provider);
    });
  }

  private startStatusMonitoring(): void {
    setInterval(() => {
      this.checkProvidersStatus();
    }, 60000); // Check every minute
  }

  private async checkProvidersStatus(): Promise<void> {
    for (const [id, provider] of this.providers) {
      try {
        const isHealthy = await this.checkProviderHealth(id);
        provider.status = isHealthy ? 'active' : 'error';
        provider.lastUpdate = new Date();
      } catch (error) {
        provider.status = 'error';
        console.error(`Provider ${id} health check failed:`, error);
      }
    }
  }

  private async checkProviderHealth(providerId: string): Promise<boolean> {
    switch (providerId) {
      case 'youtube':
        return this.checkYouTubeHealth();
      case 'google-news':
        return this.checkGoogleNewsHealth();
      case 'wikipedia':
        return this.checkWikipediaHealth();
      case 'civic-news':
        return this.checkCivicNewsHealth();
      default:
        return true; // For now, assume others are healthy if configured
    }
  }

  private async checkYouTubeHealth(): Promise<boolean> {
    if (!this.config.youtube.apiKey) return false;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${this.config.youtube.apiKey}`
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkGoogleNewsHealth(): Promise<boolean> {
    if (!this.config.google.apiKey) return false;
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${this.config.google.apiKey}&cx=${this.config.google.cseId}&q=test&num=1`
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkWikipediaHealth(): Promise<boolean> {
    try {
      const response = await fetch(
        'https://es.wikipedia.org/api/rest_v1/page/summary/Colombia'
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkCivicNewsHealth(): Promise<boolean> {
    // Check if we can access RSS feeds
    return true; // For now, assume RSS feeds are always available
  }

  public getProviders(): APIProvider[] {
    return Array.from(this.providers.values());
  }

  public getActiveProviders(): APIProvider[] {
    return this.getProviders().filter(p => p.status === 'active');
  }

  public getProviderStatus(providerId: string): APIProvider | undefined {
    return this.providers.get(providerId);
  }

  private getCacheKey(query: SearchQuery): string {
    return JSON.stringify({
      query: query.query,
      type: query.type,
      platforms: query.platforms.sort(),
      language: query.language,
      location: query.location
    });
  }

  private isCacheValid(cacheItem: { data: any; timestamp: number; ttl: number }): boolean {
    return Date.now() - cacheItem.timestamp < cacheItem.ttl;
  }

  private setCache(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private getCache(key: string): any | null {
    const cacheItem = this.cache.get(key);
    if (cacheItem && this.isCacheValid(cacheItem)) {
      return cacheItem.data;
    }
    if (cacheItem) {
      this.cache.delete(key);
    }
    return null;
  }

  private checkRateLimit(providerId: string): boolean {
    const limit = this.rateLimits.get(providerId);
    if (!limit) return true;
    
    if (Date.now() > limit.resetTime) {
      this.rateLimits.delete(providerId);
      return true;
    }
    
    return limit.count > 0;
  }

  private updateRateLimit(providerId: string, remaining: number, resetTime: number): void {
    this.rateLimits.set(providerId, {
      count: remaining,
      resetTime
    });
  }

  public async search(query: SearchQuery): Promise<SearchResults> {
    const cacheKey = this.getCacheKey(query);
    const cachedResult = this.getCache(cacheKey);
    
    if (cachedResult) {
      return cachedResult;
    }

    const startTime = Date.now();
    const results: ContentItem[] = [];
    const usedSources: APIProvider[] = [];
    const errors: string[] = [];

    // Get active providers that match the requested platforms
    const activeProviders = this.getActiveProviders().filter(provider => 
      query.platforms.length === 0 || query.platforms.includes(provider.id)
    );

    // Execute searches in parallel with rate limiting
    const searchPromises = activeProviders.map(async (provider) => {
      if (!this.checkRateLimit(provider.id)) {
        console.warn(`Rate limit exceeded for ${provider.id}`);
        return [];
      }

      try {
        const providerResults = await this.searchProvider(provider.id, query);
        usedSources.push(provider);
        return providerResults;
      } catch (error) {
        errors.push(`${provider.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        provider.status = 'error';
        return [];
      }
    });

    const allResults = await Promise.allSettled(searchPromises);
    
    // Combine results
    allResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        results.push(...result.value);
      }
    });

    // Sort by relevance and date
    results.sort((a, b) => {
      // Prioritize trending content
      if (a.stats.trending && !b.stats.trending) return -1;
      if (!a.stats.trending && b.stats.trending) return 1;
      
      // Then by date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    const searchResults: SearchResults = {
      items: results.slice(0, 50), // Limit to 50 results
      totalCount: results.length,
      hasMore: results.length > 50,
      executionTime: Date.now() - startTime,
      sources: usedSources
    };

    // Cache results
    this.setCache(cacheKey, searchResults);

    if (errors.length > 0) {
      console.warn('Search completed with errors:', errors);
    }

    return searchResults;
  }

  private async searchProvider(providerId: string, query: SearchQuery): Promise<ContentItem[]> {
    switch (providerId) {
      case 'youtube':
        return this.searchYouTube(query);
      case 'google-news':
        return this.searchGoogleNews(query);
      case 'wikipedia':
        return this.searchWikipedia(query);
      case 'civic-news':
        return this.searchCivicNews(query);
      case 'tiktok':
        return this.searchTikTok(query);
      case 'instagram':
        return this.searchInstagram(query);
      case 'facebook':
        return this.searchFacebook(query);
      case 'twitter':
        return this.searchTwitter(query);
      default:
        return [];
    }
  }

  private async searchYouTube(query: SearchQuery): Promise<ContentItem[]> {
    if (!this.config.youtube.apiKey) return [];

    const searchQuery = query.type === 'local' ? `${query.query} Colombia` : query.query;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(searchQuery)}&` +
      `maxResults=10&type=video&order=relevance&` +
      `key=${this.config.youtube.apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.items?.map((item: any): ContentItem => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: this.providers.get('youtube')!,
      publishedAt: new Date(item.snippet.publishedAt),
      stats: {
        views: 0, // Would need additional API call
        trending: false
      },
      contentType: 'video' as const,
      platform: 'youtube' as const,
      tags: item.snippet.tags || [],
      language: query.language
    })) || [];
  }

  private async searchGoogleNews(query: SearchQuery): Promise<ContentItem[]> {
    if (!this.config.google.apiKey || !this.config.google.cseId) return [];

    const searchQuery = query.type === 'local' ? `${query.query} Colombia` : query.query;
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?` +
      `key=${this.config.google.apiKey}&cx=${this.config.google.cseId}&` +
      `q=${encodeURIComponent(searchQuery)}&num=10&tbm=nws`
    );

    if (!response.ok) {
      throw new Error(`Google News API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.items?.map((item: any): ContentItem => ({
      id: item.cacheId || item.link,
      title: item.title,
      description: item.snippet,
      thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src,
      url: item.link,
      source: this.providers.get('google-news')!,
      publishedAt: new Date(), // Google CSE doesn't provide publish date
      stats: {},
      contentType: 'article' as const,
      platform: 'news' as const,
      tags: [],
      language: query.language
    })) || [];
  }

  private async searchWikipedia(query: SearchQuery): Promise<ContentItem[]> {
    const lang = query.language === 'en' ? 'en' : 'es';
    const response = await fetch(
      `https://${lang}.wikipedia.org/api/rest_v1/page/search?` +
      `q=${encodeURIComponent(query.query)}&limit=5`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.pages?.map((item: any): ContentItem => ({
      id: item.key,
      title: item.title,
      description: item.description || item.excerpt,
      thumbnail: item.thumbnail?.url,
      url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(item.key)}`,
      source: this.providers.get('wikipedia')!,
      publishedAt: new Date(item.timestamp || Date.now()),
      stats: {},
      contentType: 'article' as const,
      platform: 'wikipedia' as const,
      tags: [],
      language: query.language
    })) || [];
  }

  private async searchCivicNews(query: SearchQuery): Promise<ContentItem[]> {
    // For now, return mock civic news data
    // In a real implementation, this would fetch from Colombian government RSS feeds
    const mockCivicNews: ContentItem[] = [
      {
        id: 'civic-1',
        title: `Congreso de Colombia: ${query.query}`,
        description: 'Últimas noticias del Congreso de la República de Colombia',
        url: 'https://congreso.gov.co',
        source: this.providers.get('civic-news')!,
        publishedAt: new Date(),
        stats: {},
        contentType: 'article' as const,
        platform: 'civic' as const,
        tags: ['congreso', 'politica'],
        language: query.language,
        location: {
          country: 'Colombia'
        }
      }
    ];

    return query.type === 'local' ? mockCivicNews : [];
  }

  // Placeholder methods for social media APIs
  private async searchTikTok(query: SearchQuery): Promise<ContentItem[]> {
    // TikTok API implementation would go here
    return [];
  }

  private async searchInstagram(query: SearchQuery): Promise<ContentItem[]> {
    // Instagram API implementation would go here
    return [];
  }

  private async searchFacebook(query: SearchQuery): Promise<ContentItem[]> {
    // Facebook API implementation would go here
    return [];
  }

  private async searchTwitter(query: SearchQuery): Promise<ContentItem[]> {
    // Twitter API implementation would go here
    return [];
  }

  public async getTrendingTopics(location?: string): Promise<TrendingTopic[]> {
    // Implementation for trending topics across platforms
    return [];
  }

  public async processVoiceSearch(audioData: Blob): Promise<VoiceSearchResult> {
    // Implementation for voice search processing
    throw new Error('Voice search not implemented yet');
  }
}

// Singleton instance
export const apiManager = new APIManager();
export default apiManager;