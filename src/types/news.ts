export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
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
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  readTime: string;
  category: string;
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