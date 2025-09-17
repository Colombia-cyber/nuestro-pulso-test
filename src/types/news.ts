// News and Content Types for Colombian News Platform

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author?: string;
  category: NewsCategory;
  tags?: string[];
  readTime?: number;
  verified?: boolean;
}

export interface NewsReel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  publishedAt: string;
  source: ReelSource;
  author: string;
  category: NewsCategory;
  tags?: string[];
  verified?: boolean;
}

export interface ReelSource {
  platform: 'youtube' | 'facebook' | 'twitter' | 'whatsapp' | 'local';
  name: string;
  icon: string;
  url?: string;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  content: string;
  author: string;
  authorId?: string;
  timestamp: string;
  political_lean: 'left' | 'right';
  likes: number;
  replies?: ArticleComment[];
  parentId?: string;
}

export interface ReelComment {
  id: string;
  reelId: string;
  content: string;
  author: string;
  authorId?: string;
  timestamp: string;
  political_lean: 'left' | 'right';
  likes: number;
  replies?: ReelComment[];
  parentId?: string;
}

export type NewsCategory = 
  | 'congress_legislation'
  | 'terror_crime_drugs'
  | 'employment_health'
  | 'gustavo_petro'
  | 'donald_trump'
  | 'right_wing'
  | 'left_wing'
  | 'world_news'
  | 'local_news';

export interface CategoryConfig {
  id: NewsCategory;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface SearchFilters {
  category?: NewsCategory;
  dateRange?: {
    from: Date;
    to: Date;
  };
  source?: string;
  language?: string;
  country?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Legacy types for backward compatibility
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string; // Keep as string for backward compatibility
  category: string;
  publishedAt: string;
  hasBalancedCoverage: boolean;
  trending: boolean;
  perspective: 'progressive' | 'conservative' | 'both';
  imageUrl?: string;
  readTime?: string; // Keep as string for backward compatibility
  author?: string;
  tags?: string[];
  shareUrl?: string;
  relatedArticles?: string[];
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