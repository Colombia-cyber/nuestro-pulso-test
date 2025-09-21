// Shared type definitions for search functionality

export interface SearchFilters {
  dateRange: 'all' | 'hour' | 'day' | 'week' | 'month' | 'year';
  sources: string[];
  location: string;
  contentType: 'all' | 'news' | 'web' | 'images' | 'videos' | 'shopping' | 'articles';
  sortBy: 'relevance' | 'date' | 'popularity';
  sentiment?: 'all' | 'positive' | 'neutral' | 'negative';
  language?: 'all' | 'es' | 'en' | 'pt';
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  timestamp: string;
  type: 'news' | 'web' | 'images' | 'videos' | 'shopping' | 'articles';
  location: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'topic' | 'entity' | 'location';
  confidence: number;
  icon: string;
  category?: string;
}

export interface EntityHighlight {
  text: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'topic';
  position: [number, number];
  relevance: number;
}

export interface SentimentData {
  score: number; // -1 to 1
  label: 'positive' | 'neutral' | 'negative';
  confidence: number;
  aspects: {
    topic: string;
    sentiment: number;
  }[];
}

export interface SavedSearch {
  id: string;
  query: string;
  filters: SearchFilters;
  timestamp: Date;
  resultCount: number;
  isFollowing: boolean;
  notifications: boolean;
}

export interface ThankYouFeedback {
  rating: number;
  helpful: boolean;
  category: string;
  comment?: string;
}