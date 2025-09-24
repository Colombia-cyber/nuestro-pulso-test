export enum NewsCategory {
  POLITICS = 'Política',
  ENVIRONMENT = 'Ambiente', 
  ECONOMY = 'Economía',
  SECURITY = 'Seguridad',
  EDUCATION = 'Educación',
  HEALTH = 'Salud',
  INFRASTRUCTURE = 'Infraestructura',
  AGRICULTURE = 'Agricultura',
  BREAKING = 'Última Hora'
}

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: NewsSource | string; // Allow both for backward compatibility
  category: NewsCategory | string; // Allow both for backward compatibility  
  publishedAt: string;
  hasBalancedCoverage: boolean;
  trending: boolean;
  perspective: 'progressive' | 'conservative' | 'both';
  imageUrl?: string;
  readTime?: string;
  author?: string;
  tags?: string[];
  shareUrl?: string;
  relatedArticles?: string[];
  // New video and enhanced UI properties
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  viewCount?: number;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  isVideoContent?: boolean;
  isBreaking?: boolean;
  importance?: 'high' | 'medium' | 'low';
  location?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  source: NewsSource | string; // Allow both for backward compatibility
  publishedAt: string;
  imageUrl?: string;
  readTime: string;
  category: NewsCategory | string; // Allow both for backward compatibility
  perspective: 'progressive' | 'conservative';
  url?: string;
}

export interface NewsTimelineData {
  [year: number]: {
    [month: string]: NewsItem[];
  };
}

export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  count?: number;
}

export interface NewsFilter {
  topic?: string;
  category?: string;
  perspective?: 'progressive' | 'conservative' | 'both';
  timeRange?: 'all' | '1year' | '2years' | '5years';
  source?: string;
}

export interface NewsStats {
  totalArticles: number;
  progressiveCount: number;
  conservativeCount: number;
  balancedCount: number;
  lastUpdated: Date;
}

// New types for enhanced UI features
export interface TrendingSearch {
  id: string;
  query: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  category?: string;
}

export interface RelatedSearch {
  id: string;
  query: string;
  relevance: number;
}

export interface NewsLocation {
  id: string;
  name: string;
  type: 'city' | 'region' | 'country';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ModernNewsLayout {
  mainStories: NewsItem[];
  sidebarStories: NewsItem[];
  trendingSearches: TrendingSearch[];
  relatedSearches: RelatedSearch[];
  peopleAlsoSearched: string[];
  topicCategories: CategoryCard[];
}