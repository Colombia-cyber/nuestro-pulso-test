export interface VideoSource {
  id: string;
  name: string;
  type: VideoSourceType;
  enabled: boolean;
  priority: number;
  endpoint?: string;
  apiKey?: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

export enum VideoSourceType {
  PRIMARY_API = 'PRIMARY_API',
  YOUTUBE = 'YOUTUBE',
  GOOGLE_NEWS = 'GOOGLE_NEWS',
  NEWS_FEED = 'NEWS_FEED',
  LOCAL = 'LOCAL',
  MOCK = 'MOCK'
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  embedUrl?: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
  source: VideoSourceInfo;
  category: string;
  tags: string[];
  author: VideoAuthor;
  quality: VideoQuality;
  isLive?: boolean;
  trending?: boolean;
  perspective?: 'progressive' | 'conservative' | 'balanced';
}

export interface VideoSourceInfo {
  id: string;
  name: string;
  type: VideoSourceType;
  platform: string;
  verified: boolean;
}

export interface VideoAuthor {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  followers: number;
  channelUrl?: string;
}

export interface VideoQuality {
  resolution: '480p' | '720p' | '1080p' | '4k';
  bitrate: number;
  format: string;
}

export interface VideoFetchOptions {
  category?: string;
  maxResults?: number;
  minDuration?: number;
  maxDuration?: number;
  quality?: string;
  trending?: boolean;
  publishedAfter?: string;
  publishedBefore?: string;
  language?: string;
  region?: string;
}

export interface VideoFetchResult {
  success: boolean;
  videos: VideoContent[];
  source: VideoSourceType;
  fetchedAt: string;
  error?: string;
  hasMore?: boolean;
  nextPageToken?: string;
}

export interface VideoSourceServiceConfig {
  sources: VideoSource[];
  cacheDuration: number;
  globalTimeout: number;
  maxResultsPerSource: number;
  enableFallback: boolean;
  enableRetry: boolean;
}

export interface VideoCache {
  key: string;
  data: VideoContent[];
  timestamp: number;
  expiry: number;
  source: VideoSourceType;
}

export interface VideoSourceError {
  source: VideoSourceType;
  error: string;
  timestamp: string;
  retryAttempt: number;
  fatal: boolean;
}

export interface VideoSourceMetrics {
  source: VideoSourceType;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastSuccessful: string | null;
  lastFailed: string | null;
}