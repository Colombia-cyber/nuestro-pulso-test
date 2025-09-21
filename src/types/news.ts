export enum NewsCategory {
  POLITICS = 'Politics',
  SECURITY = 'Security', 
  ECONOMY = 'Economy',
  HEALTH = 'Health',
  LEGISLATION = 'Legislation',
  EMPLOYMENT = 'Employment',
  CRIME = 'Crime',
  BREAKING = 'Breaking News',
  ENVIRONMENT = 'Environment',
  EDUCATION = 'Education',
  INFRASTRUCTURE = 'Infrastructure',
  AGRICULTURE = 'Agriculture'
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