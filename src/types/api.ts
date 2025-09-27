// Comprehensive API types for social media and news aggregation
export interface APIProvider {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error' | 'rate_limited';
  icon: string;
  lastUpdate: Date;
  rateLimitRemaining?: number;
  rateLimitReset?: Date;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  source: APIProvider;
  publishedAt: Date;
  stats: ContentStats;
  contentType: 'video' | 'article' | 'post' | 'reel' | 'story';
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter' | 'news' | 'wikipedia' | 'civic';
  aiSummary?: string;
  tags: string[];
  language: string;
  location?: {
    country: string;
    region?: string;
    city?: string;
  };
}

export interface ContentStats {
  views?: number;
  likes?: number;
  shares?: number;
  comments?: number;
  engagement?: number;
  trending?: boolean;
}

export interface SearchQuery {
  query: string;
  type: 'world' | 'local';
  platforms: string[];
  language: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  location?: {
    country: string;
    region?: string;
  };
}

export interface SearchResults {
  items: ContentItem[];
  totalCount: number;
  hasMore: boolean;
  nextPageToken?: string;
  executionTime: number;
  sources: APIProvider[];
}

export interface APIConfig {
  youtube: {
    apiKey: string;
    quotaUsed: number;
    quotaLimit: number;
  };
  google: {
    apiKey: string;
    cseId: string;
  };
  tiktok: {
    clientKey: string;
    clientSecret: string;
  };
  instagram: {
    accessToken: string;
    appId: string;
  };
  facebook: {
    accessToken: string;
    appId: string;
  };
  twitter: {
    bearerToken: string;
    apiKey: string;
    apiSecret: string;
  };
  newsapi: {
    apiKey: string;
  };
}

export interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  language: string;
}

export interface TrendingTopic {
  topic: string;
  count: number;
  platforms: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  location?: string;
}

export interface UserPreferences {
  language: string;
  country: string;
  preferredPlatforms: string[];
  topics: string[];
  contentTypes: string[];
  notifications: boolean;
}

export interface ShareOptions {
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'telegram' | 'email' | 'copy';
  content: ContentItem;
  customMessage?: string;
}

export interface EmbedOptions {
  width: number;
  height: number;
  responsive: boolean;
  showMetadata: boolean;
  autoplay: boolean;
}

export interface FactCheckResult {
  isVerified: boolean;
  source: string;
  confidence: number;
  explanation: string;
  lastChecked: Date;
}