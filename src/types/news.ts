export enum NewsCategory {
  POLITICS = 'Política',
  ENVIRONMENT = 'Ambiente', 
  ECONOMY = 'Economía',
  SECURITY = 'Seguridad',
  EDUCATION = 'Educación',
  HEALTH = 'Salud',
  INFRASTRUCTURE = 'Infraestructura',
  AGRICULTURE = 'Agricultura',
  BREAKING = 'Última Hora',
  LOCAL = 'Local',
  WORLD = 'Internacional',
  CONGRESS = 'Congreso',
  LEGISLATION = 'Legislación',
  OPINION = 'Opinión',
  SPORTS = 'Deportes',
  CULTURE = 'Cultura',
  TECHNOLOGY = 'Tecnología'
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
  url?: string; // External URL to full article
  freshnessIndicator?: string; // "Updated X seconds ago"
  isBreaking?: boolean; // For breaking news alerts
  priority?: 'high' | 'medium' | 'low'; // News priority
  viewCount?: number; // Article view count
  likeCount?: number; // Article likes
  commentCount?: number; // Number of comments
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