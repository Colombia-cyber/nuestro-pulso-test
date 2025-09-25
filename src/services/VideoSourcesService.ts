import {
  VideoSource,
  VideoSourceType,
  VideoContent,
  VideoFetchOptions,
  VideoFetchResult,
  VideoSourceServiceConfig,
  VideoCache,
  VideoSourceError,
  VideoSourceMetrics,
  VideoSourceInfo,
  VideoAuthor,
  VideoQuality
} from '../types/videoSources';

class VideoSourcesService {
  private config: VideoSourceServiceConfig;
  private cache: Map<string, VideoCache> = new Map();
  private metrics: Map<VideoSourceType, VideoSourceMetrics> = new Map();
  private errors: VideoSourceError[] = [];
  private isInitialized = false;

  constructor() {
    this.config = this.loadConfiguration();
    this.initializeMetrics();
  }

  private loadConfiguration(): VideoSourceServiceConfig {
    const getEnvVar = (key: string, defaultValue: string = ''): string => {
      if (typeof window !== 'undefined' && import.meta.env) {
        return import.meta.env[key] || defaultValue;
      }
      return defaultValue;
    };

    const getEnvBoolean = (key: string, defaultValue: boolean = false): boolean => {
      const value = getEnvVar(key);
      return value.toLowerCase() === 'true' || defaultValue;
    };

    const getEnvNumber = (key: string, defaultValue: number = 0): number => {
      const value = getEnvVar(key);
      return value ? parseInt(value, 10) : defaultValue;
    };

    const sources: VideoSource[] = [
      {
        id: 'primary-api',
        name: 'Primary API',
        type: VideoSourceType.PRIMARY_API,
        enabled: getEnvBoolean('REACT_APP_VIDEO_PRIMARY_API_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_PRIMARY_API_PRIORITY', 1),
        endpoint: getEnvVar('REACT_APP_VIDEO_PRIMARY_API_URL', 'https://api.nuestropulso.com/videos'),
        timeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
        maxRetries: getEnvNumber('REACT_APP_VIDEO_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY_MS', 2000)
      },
      {
        id: 'youtube',
        name: 'YouTube',
        type: VideoSourceType.YOUTUBE,
        enabled: getEnvBoolean('REACT_APP_VIDEO_YOUTUBE_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_YOUTUBE_PRIORITY', 2),
        endpoint: getEnvVar('REACT_APP_VIDEO_YOUTUBE_API_URL', 'https://www.googleapis.com/youtube/v3'),
        apiKey: getEnvVar('YOUTUBE_API_KEY'),
        timeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
        maxRetries: getEnvNumber('REACT_APP_VIDEO_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY_MS', 2000)
      },
      {
        id: 'google-news',
        name: 'Google News',
        type: VideoSourceType.GOOGLE_NEWS,
        enabled: getEnvBoolean('REACT_APP_VIDEO_GOOGLE_NEWS_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_GOOGLE_NEWS_PRIORITY', 3),
        endpoint: getEnvVar('REACT_APP_VIDEO_GOOGLE_NEWS_API_URL', 'https://news.google.com/api'),
        timeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
        maxRetries: getEnvNumber('REACT_APP_VIDEO_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY_MS', 2000)
      },
      {
        id: 'news-feed',
        name: 'News Feed',
        type: VideoSourceType.NEWS_FEED,
        enabled: getEnvBoolean('REACT_APP_VIDEO_NEWS_FEED_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_NEWS_FEED_PRIORITY', 4),
        endpoint: getEnvVar('REACT_APP_VIDEO_NEWS_FEED_API_URL', 'https://api.newsapi.org/v2'),
        apiKey: getEnvVar('NEWSAPI_KEY'),
        timeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
        maxRetries: getEnvNumber('REACT_APP_VIDEO_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY_MS', 2000)
      },
      {
        id: 'local',
        name: 'Local API',
        type: VideoSourceType.LOCAL,
        enabled: getEnvBoolean('REACT_APP_VIDEO_LOCAL_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_LOCAL_PRIORITY', 5),
        endpoint: getEnvVar('REACT_APP_VIDEO_LOCAL_API_URL', 'http://localhost:3001/api/videos'),
        timeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
        maxRetries: getEnvNumber('REACT_APP_VIDEO_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY_MS', 2000)
      },
      {
        id: 'mock',
        name: 'Mock Data',
        type: VideoSourceType.MOCK,
        enabled: getEnvBoolean('REACT_APP_VIDEO_MOCK_ENABLED', true),
        priority: getEnvNumber('REACT_APP_VIDEO_MOCK_PRIORITY', 6),
        timeout: 1000,
        maxRetries: 1,
        retryDelay: 500
      }
    ].sort((a, b) => a.priority - b.priority);

    return {
      sources,
      cacheDuration: getEnvNumber('REACT_APP_VIDEO_CACHE_DURATION_MS', 300000), // 5 minutes
      globalTimeout: getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT_MS', 10000),
      maxResultsPerSource: getEnvNumber('REACT_APP_VIDEO_MAX_RESULTS_PER_SOURCE', 20),
      enableFallback: true,
      enableRetry: true
    };
  }

  private initializeMetrics(): void {
    Object.values(VideoSourceType).forEach(sourceType => {
      this.metrics.set(sourceType, {
        source: sourceType,
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        lastSuccessful: null,
        lastFailed: null
      });
    });
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('🎬 Initializing VideoSourcesService...');
    console.log(`📊 Configured ${this.config.sources.length} video sources`);
    
    // Test connectivity to enabled sources
    const testPromises = this.config.sources
      .filter(source => source.enabled)
      .map(source => this.testSourceConnectivity(source));

    await Promise.allSettled(testPromises);
    this.isInitialized = true;
    console.log('✅ VideoSourcesService initialized successfully');
  }

  private async testSourceConnectivity(source: VideoSource): Promise<boolean> {
    try {
      if (source.type === VideoSourceType.MOCK) {
        return true; // Mock source is always available
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Simple connectivity test
      const response = await fetch(source.endpoint + '/health', {
        method: 'HEAD',
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);
      return response?.ok || false;
    } catch (error) {
      console.warn(`⚠️ Source ${source.name} connectivity test failed:`, error);
      return false;
    }
  }

  public async fetchVideos(
    options: VideoFetchOptions = {},
    forceRefresh = false
  ): Promise<VideoContent[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const cacheKey = this.generateCacheKey(options);
    
    // Check cache first
    if (!forceRefresh) {
      const cachedResult = this.getFromCache(cacheKey);
      if (cachedResult) {
        console.log('📦 Returning cached video results');
        return cachedResult;
      }
    }

    console.log('🔄 Fetching fresh video content from sources...');
    
    const enabledSources = this.config.sources.filter(source => source.enabled);
    const allVideos: VideoContent[] = [];
    const fetchPromises: Promise<VideoFetchResult>[] = [];

    // Create fetch promises for all enabled sources
    enabledSources.forEach(source => {
      fetchPromises.push(this.fetchFromSource(source, options));
    });

    // Wait for all sources with Promise.allSettled to handle failures gracefully
    const results = await Promise.allSettled(fetchPromises);
    
    results.forEach((result, index) => {
      const source = enabledSources[index];
      
      if (result.status === 'fulfilled' && result.value.success) {
        allVideos.push(...result.value.videos);
        this.updateMetrics(source.type, true, Date.now());
      } else {
        const error = result.status === 'rejected' 
          ? result.reason.message 
          : result.value.error || 'Unknown error';
        
        this.logError(source.type, error, 0, false);
        this.updateMetrics(source.type, false, Date.now());
      }
    });

    // Remove duplicates and sort by relevance/quality
    const uniqueVideos = this.deduplicateAndSort(allVideos);
    
    // Apply additional filtering
    const filteredVideos = this.applyFilters(uniqueVideos, options);
    
    // Cache the results
    this.saveToCache(cacheKey, filteredVideos);
    
    console.log(`✅ Successfully fetched ${filteredVideos.length} videos from ${enabledSources.length} sources`);
    return filteredVideos;
  }

  private async fetchFromSource(
    source: VideoSource,
    options: VideoFetchOptions
  ): Promise<VideoFetchResult> {
    const startTime = Date.now();
    
    try {
      console.log(`🔗 Fetching from ${source.name}...`);
      
      let videos: VideoContent[];
      
      switch (source.type) {
        case VideoSourceType.MOCK:
          videos = await this.fetchMockData(options);
          break;
        case VideoSourceType.YOUTUBE:
          videos = await this.fetchFromYoutube(source, options);
          break;
        case VideoSourceType.GOOGLE_NEWS:
          videos = await this.fetchFromGoogleNews(source, options);
          break;
        case VideoSourceType.NEWS_FEED:
          videos = await this.fetchFromNewsFeed(source, options);
          break;
        case VideoSourceType.LOCAL:
          videos = await this.fetchFromLocal(source, options);
          break;
        case VideoSourceType.PRIMARY_API:
        default:
          videos = await this.fetchFromPrimaryAPI(source, options);
          break;
      }

      return {
        success: true,
        videos,
        source: source.type,
        fetchedAt: new Date().toISOString()
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error fetching from ${source.name}:`, errorMessage);
      
      return {
        success: false,
        videos: [],
        source: source.type,
        fetchedAt: new Date().toISOString(),
        error: errorMessage
      };
    }
  }

  private async fetchMockData(options: VideoFetchOptions): Promise<VideoContent[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    const mockVideos: VideoContent[] = [
      {
        id: 'mock-1',
        title: 'Debate Presidencial: Análisis de Propuestas Económicas',
        description: 'Análisis detallado de las propuestas económicas presentadas en el último debate presidencial colombiano.',
        thumbnailUrl: '/api/placeholder/400/600?text=Debate+Económico',
        videoUrl: 'https://example.com/video1.mp4',
        embedUrl: 'https://www.youtube.com/embed/mock1',
        duration: 180,
        views: 45600,
        likes: 1200,
        comments: 89,
        shares: 156,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: {
          id: 'mock',
          name: 'Mock Data',
          type: VideoSourceType.MOCK,
          platform: 'Nuestro Pulso',
          verified: true
        },
        category: 'Política',
        tags: ['#DebatePresidencial', '#Economía', '#Colombia'],
        author: {
          id: 'author-1',
          name: 'Análisis Político CO',
          avatar: '🗳️',
          verified: true,
          followers: 125000,
          channelUrl: 'https://example.com/channel1'
        },
        quality: {
          resolution: '1080p',
          bitrate: 5000,
          format: 'mp4'
        },
        trending: true,
        perspective: 'balanced'
      },
      {
        id: 'mock-2',
        title: 'Reforma Educativa: Impacto en Universidades Públicas',
        description: 'Análisis del impacto de la nueva reforma educativa en las universidades públicas colombianas.',
        thumbnailUrl: '/api/placeholder/400/600?text=Reforma+Educativa',
        videoUrl: 'https://example.com/video2.mp4',
        embedUrl: 'https://www.youtube.com/embed/mock2',
        duration: 240,
        views: 23400,
        likes: 890,
        comments: 45,
        shares: 67,
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source: {
          id: 'mock',
          name: 'Mock Data',
          type: VideoSourceType.MOCK,
          platform: 'Nuestro Pulso',
          verified: true
        },
        category: 'Educación',
        tags: ['#ReformaEducativa', '#UniversidadPública', '#Colombia'],
        author: {
          id: 'author-2',
          name: 'EduCívica CO',
          avatar: '👩‍🏫',
          verified: true,
          followers: 78000,
          channelUrl: 'https://example.com/channel2'
        },
        quality: {
          resolution: '720p',
          bitrate: 3000,
          format: 'mp4'
        },
        perspective: 'progressive'
      },
      {
        id: 'mock-3',
        title: 'Crisis Energética: Soluciones Sostenibles',
        description: 'Exploración de soluciones sostenibles para la crisis energética colombiana.',
        thumbnailUrl: '/api/placeholder/400/600?text=Energía+Sostenible',
        videoUrl: 'https://example.com/video3.mp4',
        duration: 300,
        views: 34500,
        likes: 1100,
        comments: 67,
        shares: 145,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        source: {
          id: 'mock',
          name: 'Mock Data',
          type: VideoSourceType.MOCK,
          platform: 'Nuestro Pulso',
          verified: true
        },
        category: 'Ambiente',
        tags: ['#EnergíaSostenible', '#CrisisEnergética', '#Colombia'],
        author: {
          id: 'author-3',
          name: 'Energía Verde CO',
          avatar: '⚡',
          verified: false,
          followers: 45000,
          channelUrl: 'https://example.com/channel3'
        },
        quality: {
          resolution: '1080p',
          bitrate: 4500,
          format: 'mp4'
        },
        isLive: false,
        perspective: 'balanced'
      }
    ];

    return mockVideos.slice(0, options.maxResults || 10);
  }

  private async fetchFromYoutube(source: VideoSource, options: VideoFetchOptions): Promise<VideoContent[]> {
    // In a real implementation, this would use the YouTube Data API
    // For now, return mock data to avoid API key requirements
    console.log('🔴 YouTube API fetch (mock implementation)');
    return [];
  }

  private async fetchFromGoogleNews(source: VideoSource, options: VideoFetchOptions): Promise<VideoContent[]> {
    // Mock implementation for Google News video content
    console.log('📰 Google News API fetch (mock implementation)');
    return [];
  }

  private async fetchFromNewsFeed(source: VideoSource, options: VideoFetchOptions): Promise<VideoContent[]> {
    // Mock implementation for News Feed API
    console.log('📡 News Feed API fetch (mock implementation)');
    return [];
  }

  private async fetchFromLocal(source: VideoSource, options: VideoFetchOptions): Promise<VideoContent[]> {
    // Mock implementation for local API
    console.log('🏠 Local API fetch (mock implementation)');
    return [];
  }

  private async fetchFromPrimaryAPI(source: VideoSource, options: VideoFetchOptions): Promise<VideoContent[]> {
    // Mock implementation for primary API
    console.log('🚀 Primary API fetch (mock implementation)');
    return [];
  }

  private deduplicateAndSort(videos: VideoContent[]): VideoContent[] {
    // Remove duplicates based on title and normalize
    const seen = new Set<string>();
    const unique = videos.filter(video => {
      const key = `${video.title.toLowerCase()}-${video.source.type}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });

    // Sort by trending, views, and recency
    return unique.sort((a, b) => {
      // Trending videos first
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      // Then by views
      if (a.views !== b.views) return b.views - a.views;
      
      // Finally by publish date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

  private applyFilters(videos: VideoContent[], options: VideoFetchOptions): VideoContent[] {
    let filtered = [...videos];

    if (options.category) {
      filtered = filtered.filter(video => 
        video.category.toLowerCase().includes(options.category!.toLowerCase())
      );
    }

    if (options.minDuration) {
      filtered = filtered.filter(video => video.duration >= options.minDuration!);
    }

    if (options.maxDuration) {
      filtered = filtered.filter(video => video.duration <= options.maxDuration!);
    }

    if (options.trending !== undefined) {
      filtered = filtered.filter(video => !!video.trending === options.trending);
    }

    if (options.maxResults) {
      filtered = filtered.slice(0, options.maxResults);
    }

    return filtered;
  }

  private generateCacheKey(options: VideoFetchOptions): string {
    return `videos_${JSON.stringify(options)}`;
  }

  private getFromCache(key: string): VideoContent[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private saveToCache(key: string, data: VideoContent[]): void {
    const cache: VideoCache = {
      key,
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.config.cacheDuration,
      source: VideoSourceType.MOCK // This would be determined by the actual source mix
    };

    this.cache.set(key, cache);
  }

  private updateMetrics(source: VideoSourceType, success: boolean, responseTime: number): void {
    const metrics = this.metrics.get(source);
    if (!metrics) return;

    metrics.totalRequests++;
    if (success) {
      metrics.successfulRequests++;
      metrics.lastSuccessful = new Date().toISOString();
    } else {
      metrics.failedRequests++;
      metrics.lastFailed = new Date().toISOString();
    }

    // Update average response time
    const totalTime = metrics.averageResponseTime * (metrics.totalRequests - 1) + responseTime;
    metrics.averageResponseTime = totalTime / metrics.totalRequests;
  }

  private logError(source: VideoSourceType, error: string, retryAttempt: number, fatal: boolean): void {
    const errorLog: VideoSourceError = {
      source,
      error,
      timestamp: new Date().toISOString(),
      retryAttempt,
      fatal
    };

    this.errors.push(errorLog);
    
    // Keep only the last 100 errors
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }
  }

  public getMetrics(): Map<VideoSourceType, VideoSourceMetrics> {
    return new Map(this.metrics);
  }

  public getErrors(): VideoSourceError[] {
    return [...this.errors];
  }

  public getAvailableSources(): VideoSource[] {
    return this.config.sources.filter(source => source.enabled);
  }

  public clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Video cache cleared');
  }

  public getHealthStatus(): { healthy: boolean; issues: string[] } {
    const issues: string[] = [];
    const enabledSources = this.config.sources.filter(s => s.enabled);
    
    if (enabledSources.length === 0) {
      issues.push('No video sources are enabled');
    }

    const recentErrors = this.errors.filter(e => 
      Date.now() - new Date(e.timestamp).getTime() < 300000 // Last 5 minutes
    );

    if (recentErrors.length > 10) {
      issues.push(`High error rate: ${recentErrors.length} errors in last 5 minutes`);
    }

    return {
      healthy: issues.length === 0,
      issues
    };
  }
}

// Export singleton instance
export const videoSourcesService = new VideoSourcesService();
export default videoSourcesService;