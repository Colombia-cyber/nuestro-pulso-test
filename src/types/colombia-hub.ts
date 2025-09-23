// Colombia News Hub specific types
export interface ColombiaNewsSource {
  id: string;
  name: string;
  icon: string;
  category: 'local' | 'international' | 'aggregated';
  url?: string;
  active: boolean;
}

export interface ColombiaNewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  publishedAt: string;
  source: ColombiaNewsSource;
  author?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  language: string;
  trendingScore?: number;
}

export interface ColombiaVideo {
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
  url: string;
  embedUrl: string;
  tags: string[];
  category: 'news' | 'culture' | 'travel' | 'food';
  language: string;
}

export interface NewsHubResponse {
  articles: ColombiaNewsArticle[];
  totalCount: number;
  sourceStats: Record<string, {
    count: number;
    status: 'success' | 'error';
    error?: string;
    lastFetch?: string;
  }>;
  lastUpdate: string;
  categories: string[];
  cached: boolean;
  cacheAge?: number;
}

export interface VideoHubResponse {
  videos: ColombiaVideo[];
  totalCount: number;
  categoryStats: Record<string, {
    count: number;
    status: 'success' | 'error' | 'mock';
    error?: string;
  }>;
  lastUpdate: string;
  categories: string[];
  cached: boolean;
  mock?: boolean;
}

export interface CombinedHubResponse {
  news: NewsHubResponse;
  videos: VideoHubResponse;
  trending?: {
    news: ColombiaNewsArticle[];
    videos: ColombiaVideo[];
  };
}

export interface NewsHubFilter {
  category?: string;
  sources?: string[];
  search?: string;
  trending?: boolean;
  limit?: number;
}

export interface VideoHubFilter {
  categories?: string[];
  search?: string;
  trending?: boolean;
  limit?: number;
}

export interface ContentCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface HubStats {
  news: {
    cache: {
      size: number;
      keys: string[];
      totalMemory: number;
    };
    sources: number;
  };
  videos: {
    cache: {
      size: number;
      keys: string[];
      hasApiKey: boolean;
    };
    apiKey: 'configured' | 'missing';
  };
  lastUpdate: string;
}