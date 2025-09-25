import axios, { AxiosResponse } from 'axios';

// Types for video content
export interface VideoSource {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  embedUrl?: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
  };
  platform: 'youtube' | 'google-news' | 'news-feed' | 'local' | 'primary' | 'mock';
  category: string;
  hashtags: string[];
  isLive?: boolean;
  timestamp: string;
  trending?: boolean;
  factChecked?: boolean;
  location?: string;
  language: string;
  aiSummary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  topics: string[];
}

export interface VideoSourceConfig {
  name: string;
  enabled: boolean;
  apiUrl?: string;
  apiKey?: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface VideoSourceResponse {
  success: boolean;
  data: VideoSource[];
  error?: string;
  source: string;
}

class VideoSourcesService {
  private readonly configs: Record<string, VideoSourceConfig>;
  private readonly sourcePriority: string[];

  constructor() {
    // Initialize configurations from environment variables
    this.configs = {
      primary: {
        name: 'Primary API',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_PRIMARY_SOURCE', true),
        apiUrl: this.getEnvString('REACT_APP_VIDEO_PRIMARY_API_URL'),
        apiKey: this.getEnvString('REACT_APP_VIDEO_PRIMARY_API_KEY'),
        timeout: this.getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT', 10000),
        retryAttempts: this.getEnvNumber('REACT_APP_VIDEO_RETRY_ATTEMPTS', 3),
        retryDelay: this.getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY', 2000)
      },
      youtube: {
        name: 'YouTube API',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_YOUTUBE_SOURCE', true),
        apiUrl: 'https://www.googleapis.com/youtube/v3',
        apiKey: this.getEnvString('REACT_APP_YOUTUBE_API_KEY'),
        timeout: this.getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT', 10000),
        retryAttempts: this.getEnvNumber('REACT_APP_VIDEO_RETRY_ATTEMPTS', 3),
        retryDelay: this.getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY', 2000)
      },
      'google-news': {
        name: 'Google News API',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_GOOGLE_NEWS_SOURCE', true),
        apiUrl: this.getEnvString('REACT_APP_GOOGLE_NEWS_API_URL'),
        apiKey: this.getEnvString('REACT_APP_GOOGLE_NEWS_API_KEY'),
        timeout: this.getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT', 10000),
        retryAttempts: this.getEnvNumber('REACT_APP_VIDEO_RETRY_ATTEMPTS', 3),
        retryDelay: this.getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY', 2000)
      },
      'news-feed': {
        name: 'News Feed API',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_NEWS_FEED_SOURCE', true),
        apiUrl: this.getEnvString('REACT_APP_NEWS_FEED_API_URL'),
        apiKey: this.getEnvString('REACT_APP_NEWS_FEED_API_KEY'),
        timeout: this.getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT', 10000),
        retryAttempts: this.getEnvNumber('REACT_APP_VIDEO_RETRY_ATTEMPTS', 3),
        retryDelay: this.getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY', 2000)
      },
      local: {
        name: 'Local API',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_LOCAL_SOURCE', true),
        apiUrl: this.getEnvString('REACT_APP_LOCAL_VIDEO_API_URL', 'http://localhost:3001/api/videos'),
        apiKey: this.getEnvString('REACT_APP_LOCAL_VIDEO_API_KEY'),
        timeout: this.getEnvNumber('REACT_APP_VIDEO_REQUEST_TIMEOUT', 10000),
        retryAttempts: this.getEnvNumber('REACT_APP_VIDEO_RETRY_ATTEMPTS', 3),
        retryDelay: this.getEnvNumber('REACT_APP_VIDEO_RETRY_DELAY', 2000)
      },
      mock: {
        name: 'Mock Data',
        enabled: this.getEnvBoolean('REACT_APP_ENABLE_MOCK_SOURCE', true),
        timeout: 1000,
        retryAttempts: 1,
        retryDelay: 0
      }
    };

    // Set source priority from environment or use default
    const priorityString = this.getEnvString('REACT_APP_VIDEO_SOURCE_PRIORITY', 'primary,youtube,google-news,news-feed,local,mock');
    this.sourcePriority = priorityString.split(',').map(s => s.trim());
  }

  private getEnvString(key: string, defaultValue: string = ''): string {
    // Try import.meta.env first (Vite environment)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return (import.meta.env as any)[key] || defaultValue;
    }
    
    // Fallback to process.env (Node.js environment) with proper undefined check
    // eslint-disable-next-line no-undef
    if (typeof process !== 'undefined' && process.env) {
      // eslint-disable-next-line no-undef
      return process.env[key] || defaultValue;
    }
    
    return defaultValue;
  }

  private getEnvNumber(key: string, defaultValue: number): number {
    const value = this.getEnvString(key);
    return value ? parseInt(value, 10) || defaultValue : defaultValue;
  }

  private getEnvBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.getEnvString(key);
    if (!value) return defaultValue;
    return value.toLowerCase() === 'true';
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeApiRequest(
    url: string, 
    config: VideoSourceConfig, 
    params: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.apiKey) {
      // Add API key based on the service type
      if (url.includes('googleapis.com')) {
        params.key = config.apiKey;
      } else if (url.includes('newsapi.org')) {
        headers['X-API-Key'] = config.apiKey;
      } else {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
      }
    }

    return axios.get(url, {
      params,
      headers,
      timeout: config.timeout,
    });
  }

  private async fetchFromPrimaryApi(): Promise<VideoSourceResponse> {
    const config = this.configs.primary;
    if (!config.enabled || !config.apiUrl) {
      return { success: false, data: [], error: 'Primary API not configured', source: 'primary' };
    }

    try {
      const response = await this.makeApiRequest(`${config.apiUrl}/reels`, config);
      const videos = response.data.videos || response.data || [];
      
      return {
        success: true,
        data: videos.map((video: any) => this.normalizeVideoData(video, 'primary')),
        source: 'primary'
      };
    } catch (error) {
      console.error('Primary API error:', error);
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'Primary API failed',
        source: 'primary' 
      };
    }
  }

  private async fetchFromYouTubeApi(): Promise<VideoSourceResponse> {
    const config = this.configs.youtube;
    if (!config.enabled || !config.apiKey) {
      return { success: false, data: [], error: 'YouTube API not configured', source: 'youtube' };
    }

    try {
      const channelId = this.getEnvString('REACT_APP_YOUTUBE_CHANNEL_ID');
      const searchQuery = channelId ? '' : 'colombia política noticias';
      
      let url = `${config.apiUrl}/search`;
      let params: Record<string, any> = {
        part: 'snippet',
        type: 'video',
        maxResults: 20,
        order: 'date',
        regionCode: 'CO',
        relevanceLanguage: 'es'
      };

      if (channelId) {
        params.channelId = channelId;
      } else {
        params.q = searchQuery;
      }

      const response = await this.makeApiRequest(url, config, params);
      const videos = response.data.items || [];
      
      return {
        success: true,
        data: videos.map((video: any) => this.normalizeVideoData(video, 'youtube')),
        source: 'youtube'
      };
    } catch (error) {
      console.error('YouTube API error:', error);
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'YouTube API failed',
        source: 'youtube' 
      };
    }
  }

  private async fetchFromGoogleNewsApi(): Promise<VideoSourceResponse> {
    const config = this.configs['google-news'];
    if (!config.enabled || !config.apiUrl || !config.apiKey) {
      return { success: false, data: [], error: 'Google News API not configured', source: 'google-news' };
    }

    try {
      const response = await this.makeApiRequest(`${config.apiUrl}/everything`, config, {
        q: 'colombia política',
        language: 'es',
        sortBy: 'publishedAt',
        pageSize: 20
      });
      
      const articles = response.data.articles || [];
      
      return {
        success: true,
        data: articles.map((article: any) => this.normalizeVideoData(article, 'google-news')),
        source: 'google-news'
      };
    } catch (error) {
      console.error('Google News API error:', error);
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'Google News API failed',
        source: 'google-news' 
      };
    }
  }

  private async fetchFromNewsFeedApi(): Promise<VideoSourceResponse> {
    const config = this.configs['news-feed'];
    if (!config.enabled || !config.apiUrl || !config.apiKey) {
      return { success: false, data: [], error: 'News Feed API not configured', source: 'news-feed' };
    }

    try {
      const response = await this.makeApiRequest(`${config.apiUrl}/articles`, config, {
        country: 'co',
        category: 'politics',
        limit: 20
      });
      
      const articles = response.data.articles || response.data || [];
      
      return {
        success: true,
        data: articles.map((article: any) => this.normalizeVideoData(article, 'news-feed')),
        source: 'news-feed'
      };
    } catch (error) {
      console.error('News Feed API error:', error);
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'News Feed API failed',
        source: 'news-feed' 
      };
    }
  }

  private async fetchFromLocalApi(): Promise<VideoSourceResponse> {
    const config = this.configs.local;
    if (!config.enabled || !config.apiUrl) {
      return { success: false, data: [], error: 'Local API not configured', source: 'local' };
    }

    try {
      const response = await this.makeApiRequest(config.apiUrl, config);
      const videos = response.data.videos || response.data || [];
      
      return {
        success: true,
        data: videos.map((video: any) => this.normalizeVideoData(video, 'local')),
        source: 'local'
      };
    } catch (error) {
      console.error('Local API error:', error);
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'Local API failed',
        source: 'local' 
      };
    }
  }

  private async fetchFromMockData(): Promise<VideoSourceResponse> {
    const config = this.configs.mock;
    if (!config.enabled) {
      return { success: false, data: [], error: 'Mock data disabled', source: 'mock' };
    }

    // Simulate API delay
    await this.delay(500);

    const mockVideos: VideoSource[] = [
      {
        id: 'mock-1',
        title: '🔴 EN VIVO: Sesión del Congreso - Reforma Tributaria',
        description: 'Transmisión en vivo desde el Congreso de Colombia donde se debate la nueva reforma tributaria. Análisis en tiempo real de propuestas y votaciones.',
        thumbnailUrl: 'https://via.placeholder.com/400x600/0066CC/FFFFFF?text=Congreso+En+Vivo',
        embedUrl: 'https://www.youtube.com/embed/mock-congress-live',
        duration: 'EN VIVO',
        views: 125600,
        likes: 3400,
        comments: 892,
        shares: 567,
        author: {
          name: 'Canal Congreso Colombia',
          avatar: '🏛️',
          verified: true,
          followers: '245K'
        },
        platform: 'mock',
        category: 'Política',
        hashtags: ['#CongresoEnVivo', '#ReformaTributaria', '#Colombia'],
        isLive: true,
        timestamp: 'Iniciado hace 1h 23m',
        trending: true,
        factChecked: true,
        location: 'Bogotá, Colombia',
        language: 'es',
        aiSummary: 'Debate intenso sobre reforma tributaria. Gobierno propone nuevos impuestos, oposición plantea alternativas.',
        sentiment: 'neutral',
        topics: ['Reforma Tributaria', 'Congreso', 'Política Fiscal']
      },
      {
        id: 'mock-2',
        title: 'Tutorial: Cómo Participar en Consultas Ciudadanas',
        description: 'Guía paso a paso para participar en consultas ciudadanas y hacer valer tu voz en decisiones importantes del país.',
        thumbnailUrl: 'https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Participación+Ciudadana',
        duration: '3:45',
        views: 89400,
        likes: 5600,
        comments: 234,
        shares: 1200,
        author: {
          name: 'Participación Ciudadana CO',
          avatar: '🗳️',
          verified: true,
          followers: '156K'
        },
        platform: 'mock',
        category: 'Educación Cívica',
        hashtags: ['#ParticipacionCiudadana', '#Consultas', '#Democracia'],
        timestamp: 'Hace 2 horas',
        trending: true,
        factChecked: true,
        language: 'es',
        aiSummary: 'Proceso detallado para participar en consultas: registro, votación online, verificación de identidad.',
        sentiment: 'positive',
        topics: ['Participación Ciudadana', 'Consultas', 'Educación Cívica']
      },
      {
        id: 'mock-3',
        title: 'Breaking: Acuerdos de Paz - Nuevos Avances',
        description: 'Últimas noticias sobre los avances en la implementación de los acuerdos de paz en Colombia. Testimonios desde las regiones.',
        thumbnailUrl: 'https://via.placeholder.com/400x600/4CAF50/FFFFFF?text=Acuerdos+de+Paz',
        duration: '4:12',
        views: 67800,
        likes: 2100,
        comments: 445,
        shares: 123,
        author: {
          name: 'Colombia Reconcilia',
          avatar: '🕊️',
          verified: true,
          followers: '89K'
        },
        platform: 'mock',
        category: 'Actualidad',
        hashtags: ['#AcuerdosDePaz', '#Reconciliacion', '#Colombia'],
        timestamp: 'Hace 4 horas',
        factChecked: true,
        language: 'es',
        aiSummary: 'Implementación acuerdo de paz 72% completada. Avances en sustitución de cultivos y programas sociales.',
        sentiment: 'positive',
        topics: ['Paz', 'Reconciliación', 'Desarrollo Rural']
      }
    ];

    return {
      success: true,
      data: mockVideos,
      source: 'mock'
    };
  }

  private normalizeVideoData(rawData: any, source: string): VideoSource {
    // Normalize data from different API formats to our standard format
    switch (source) {
      case 'youtube':
        return {
          id: rawData.id?.videoId || rawData.id,
          title: rawData.snippet?.title || 'Video sin título',
          description: rawData.snippet?.description || '',
          thumbnailUrl: rawData.snippet?.thumbnails?.high?.url || rawData.snippet?.thumbnails?.default?.url || '',
          embedUrl: `https://www.youtube.com/embed/${rawData.id?.videoId || rawData.id}`,
          duration: this.formatYouTubeDuration(rawData.contentDetails?.duration) || '0:00',
          views: parseInt(rawData.statistics?.viewCount) || 0,
          likes: parseInt(rawData.statistics?.likeCount) || 0,
          comments: parseInt(rawData.statistics?.commentCount) || 0,
          shares: Math.floor((parseInt(rawData.statistics?.likeCount) || 0) * 0.1),
          author: {
            name: rawData.snippet?.channelTitle || 'Canal de YouTube',
            avatar: '📺',
            verified: Math.random() > 0.5,
            followers: this.formatNumber(Math.floor(Math.random() * 100000) + 10000)
          },
          platform: 'youtube',
          category: this.categorizeContent(rawData.snippet?.title || ''),
          hashtags: this.extractHashtags(rawData.snippet?.description || ''),
          timestamp: this.formatTimestamp(rawData.snippet?.publishedAt),
          language: 'es',
          topics: this.extractTopics(rawData.snippet?.title + ' ' + rawData.snippet?.description),
          factChecked: false
        };

      case 'google-news':
        return {
          id: rawData.url?.split('/').pop() || `news-${Date.now()}`,
          title: rawData.title || 'Noticia sin título',
          description: rawData.description || rawData.content || '',
          thumbnailUrl: rawData.urlToImage || 'https://via.placeholder.com/400x600/607D8B/FFFFFF?text=Noticia',
          duration: '2:30',
          views: Math.floor(Math.random() * 50000) + 1000,
          likes: Math.floor(Math.random() * 1000) + 50,
          comments: Math.floor(Math.random() * 100) + 5,
          shares: Math.floor(Math.random() * 200) + 10,
          author: {
            name: rawData.source?.name || rawData.author || 'Fuente de Noticias',
            avatar: '📰',
            verified: true,
            followers: this.formatNumber(Math.floor(Math.random() * 200000) + 50000)
          },
          platform: 'google-news',
          category: this.categorizeContent(rawData.title || ''),
          hashtags: this.extractHashtags(rawData.description || ''),
          timestamp: this.formatTimestamp(rawData.publishedAt),
          language: 'es',
          topics: this.extractTopics(rawData.title + ' ' + rawData.description),
          factChecked: true
        };

      case 'primary':
      case 'local':
      case 'news-feed':
      default:
        return {
          id: rawData.id || `${source}-${Date.now()}`,
          title: rawData.title || 'Contenido sin título',
          description: rawData.description || rawData.summary || '',
          thumbnailUrl: rawData.thumbnail || rawData.image || 'https://via.placeholder.com/400x600/9C27B0/FFFFFF?text=Video',
          videoUrl: rawData.videoUrl,
          embedUrl: rawData.embedUrl,
          duration: rawData.duration || '3:00',
          views: rawData.views || Math.floor(Math.random() * 100000) + 1000,
          likes: rawData.likes || Math.floor(Math.random() * 5000) + 100,
          comments: rawData.comments || Math.floor(Math.random() * 500) + 10,
          shares: rawData.shares || Math.floor(Math.random() * 300) + 5,
          author: {
            name: rawData.author?.name || rawData.channel || 'Creador',
            avatar: rawData.author?.avatar || '👤',
            verified: rawData.author?.verified || false,
            followers: rawData.author?.followers || this.formatNumber(Math.floor(Math.random() * 100000) + 10000)
          },
          platform: source as any,
          category: rawData.category || this.categorizeContent(rawData.title || ''),
          hashtags: rawData.hashtags || this.extractHashtags(rawData.description || ''),
          isLive: rawData.isLive || false,
          timestamp: this.formatTimestamp(rawData.publishedAt || rawData.createdAt),
          trending: rawData.trending || false,
          factChecked: rawData.factChecked || false,
          location: rawData.location,
          language: rawData.language || 'es',
          aiSummary: rawData.aiSummary,
          sentiment: rawData.sentiment || 'neutral',
          topics: rawData.topics || this.extractTopics(rawData.title + ' ' + rawData.description)
        };
    }
  }

  private formatYouTubeDuration(duration: string): string {
    if (!duration) return '0:00';
    // Convert ISO 8601 duration (PT4M13S) to MM:SS format
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }

  private formatTimestamp(timestamp: string): string {
    if (!timestamp) return 'Hace un momento';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'Hace un momento';
  }

  private categorizeContent(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('congreso') || lowerText.includes('política') || lowerText.includes('elecciones')) {
      return 'Política';
    }
    if (lowerText.includes('educación') || lowerText.includes('cívica') || lowerText.includes('tutorial')) {
      return 'Educación Cívica';
    }
    if (lowerText.includes('live') || lowerText.includes('vivo') || lowerText.includes('breaking')) {
      return 'Actualidad';
    }
    if (lowerText.includes('paz') || lowerText.includes('reconciliación')) {
      return 'Paz';
    }
    
    return 'General';
  }

  private extractHashtags(text: string): string[] {
    const hashtags = (text.match(/#\w+/g) || []).slice(0, 5);
    if (hashtags.length === 0) {
      return ['#Colombia', '#Noticias'];
    }
    return hashtags;
  }

  private extractTopics(text: string): string[] {
    const topics: string[] = [];
    const lowerText = text.toLowerCase();
    
    const topicMap = {
      'política': 'Política',
      'congreso': 'Congreso',
      'elecciones': 'Elecciones',
      'educación': 'Educación',
      'paz': 'Paz',
      'economía': 'Economía',
      'reforma': 'Reformas',
      'tributaria': 'Reforma Tributaria',
      'participación': 'Participación Ciudadana'
    };
    
    Object.keys(topicMap).forEach(key => {
      if (lowerText.includes(key)) {
        topics.push(topicMap[key]);
      }
    });
    
    return topics.length > 0 ? topics : ['General'];
  }

  private async fetchWithRetry(
    fetchFunction: () => Promise<VideoSourceResponse>,
    sourceName: string
  ): Promise<VideoSourceResponse> {
    const config = this.configs[sourceName];
    let lastError: string = '';

    for (let attempt = 1; attempt <= config.retryAttempts; attempt++) {
      try {
        const result = await fetchFunction();
        if (result.success) {
          return result;
        }
        lastError = result.error || 'Unknown error';
        
        if (attempt < config.retryAttempts) {
          console.log(`${config.name} attempt ${attempt} failed, retrying in ${config.retryDelay}ms...`);
          await this.delay(config.retryDelay);
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Request failed';
        
        if (attempt < config.retryAttempts) {
          console.log(`${config.name} attempt ${attempt} failed, retrying in ${config.retryDelay}ms...`);
          await this.delay(config.retryDelay);
        }
      }
    }

    return { 
      success: false, 
      data: [], 
      error: `${config.name} failed after ${config.retryAttempts} attempts: ${lastError}`,
      source: sourceName 
    };
  }

  public async fetchVideos(): Promise<{
    videos: VideoSource[];
    sources: { name: string; success: boolean; error?: string; count: number }[];
    totalSources: number;
    successfulSources: number;
  }> {
    const sourceMap: Record<string, () => Promise<VideoSourceResponse>> = {
      primary: () => this.fetchWithRetry(() => this.fetchFromPrimaryApi(), 'primary'),
      youtube: () => this.fetchWithRetry(() => this.fetchFromYouTubeApi(), 'youtube'),
      'google-news': () => this.fetchWithRetry(() => this.fetchFromGoogleNewsApi(), 'google-news'),
      'news-feed': () => this.fetchWithRetry(() => this.fetchFromNewsFeedApi(), 'news-feed'),
      local: () => this.fetchWithRetry(() => this.fetchFromLocalApi(), 'local'),
      mock: () => this.fetchWithRetry(() => this.fetchFromMockData(), 'mock')
    };

    const allVideos: VideoSource[] = [];
    const sourceResults: { name: string; success: boolean; error?: string; count: number }[] = [];
    let successfulSources = 0;

    console.log('🎬 Starting video fetch from sources:', this.sourcePriority);

    for (const sourceName of this.sourcePriority) {
      if (!sourceMap[sourceName] || !this.configs[sourceName]?.enabled) {
        console.log(`⏭️ Skipping disabled source: ${sourceName}`);
        continue;
      }

      console.log(`🔄 Fetching from ${this.configs[sourceName].name}...`);
      
      try {
        const result = await sourceMap[sourceName]();
        
        sourceResults.push({
          name: this.configs[sourceName].name,
          success: result.success,
          error: result.error,
          count: result.data.length
        });

        if (result.success && result.data.length > 0) {
          allVideos.push(...result.data);
          successfulSources++;
          console.log(`✅ ${this.configs[sourceName].name}: ${result.data.length} videos loaded`);
        } else {
          console.log(`❌ ${this.configs[sourceName].name}: ${result.error || 'No data'}`);
        }
      } catch (error) {
        console.error(`❌ ${this.configs[sourceName].name} failed:`, error);
        sourceResults.push({
          name: this.configs[sourceName].name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          count: 0
        });
      }
    }

    // Shuffle and limit results for better variety
    const shuffledVideos = this.shuffleArray([...allVideos]).slice(0, 50);

    console.log(`🎯 Total videos loaded: ${shuffledVideos.length} from ${successfulSources}/${this.sourcePriority.length} sources`);

    return {
      videos: shuffledVideos,
      sources: sourceResults,
      totalSources: this.sourcePriority.length,
      successfulSources
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public getSourceConfigurations(): Record<string, VideoSourceConfig> {
    return { ...this.configs };
  }

  public getSourcePriority(): string[] {
    return [...this.sourcePriority];
  }

  public isSourceEnabled(sourceName: string): boolean {
    return this.configs[sourceName]?.enabled || false;
  }
}

export default new VideoSourcesService();