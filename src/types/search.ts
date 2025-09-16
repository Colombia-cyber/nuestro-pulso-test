/**
 * TypeScript types for search functionality
 */

// Base search result interface
export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  tags?: string[];
}

// Colombia-specific search result
export interface ColombiaSearchResult extends SearchResult {
  location?: string;
}

// Global search result with additional international fields
export interface GlobalSearchResult extends SearchResult {
  country?: string;
}

// Generic search response interface
export interface BaseSearchResponse {
  query: string;
  totalResults: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  searchTime: number;
  requestId?: string;
  timestamp?: string;
}

// Colombia search response
export interface ColombiaSearchResponse extends BaseSearchResponse {
  results: ColombiaSearchResult[];
  source: 'colombia-local' | 'mock-colombia';
  metadata: {
    location: string;
    sources: string[];
    categories: string[];
  };
}

// Global search response
export interface GlobalSearchResponse extends BaseSearchResponse {
  results: GlobalSearchResult[];
  source: 'google-api' | 'mock-global';
  metadata: {
    scope: string;
    apiSearchTime?: number;
    sources: string[];
    categories: string[];
  };
}

// Search options interfaces
export interface ColombiaSearchOptions {
  query: string;
  page?: number;
  limit?: number;
  location?: string;
}

export interface GlobalSearchOptions {
  query: string;
  page?: number;
  limit?: number;
  scope?: string;
}

// Component prop interfaces
export interface ColombiaNavSearchProps {
  compact?: boolean;
  onSearch?: (query: string, results: ColombiaSearchResult[]) => void;
  className?: string;
  autoFocus?: boolean;
}

export interface HomepageSearchBarProps {
  onSearch?: (query: string, results: GlobalSearchResult[]) => void;
  onNavigateToResults?: () => void;
  className?: string;
}

// API error response interface
export interface SearchErrorResponse {
  error: string;
  message: string;
  timestamp: string;
  example?: string;
}

// Search suggestion response type
export type SearchSuggestions = string[];

// Search category types
export type SearchCategory = 
  | 'politica' 
  | 'economia' 
  | 'internacional' 
  | 'tecnologia' 
  | 'salud' 
  | 'educacion' 
  | 'cultura' 
  | 'deportes' 
  | 'seguridad'
  | 'local'
  | 'nacional'
  | 'general';

// Sort options for search
export type SearchSortBy = 'relevance' | 'date' | 'category';

// Search source types
export type SearchSource = 
  | 'colombia-local' 
  | 'mock-colombia' 
  | 'google-api' 
  | 'mock-global' 
  | 'aggregator' 
  | 'proxy' 
  | 'fallback';

// Extended search result with additional metadata for display
export interface EnhancedSearchResult extends SearchResult {
  isExpanded?: boolean;
  displayMode?: 'card' | 'list';
  countryFlag?: string;
  sourceIcon?: string;
  categoryColor?: string;
}

// Search state interface for components
export interface SearchState {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  searchTime: number;
  source: SearchSource;
}

// Search filters interface
export interface SearchFilters {
  category?: SearchCategory;
  sortBy?: SearchSortBy;
  dateRange?: {
    start?: string;
    end?: string;
  };
  source?: string;
  location?: string;
  country?: string;
}

// Advanced search options
export interface AdvancedSearchOptions extends ColombiaSearchOptions, GlobalSearchOptions {
  filters?: SearchFilters;
  includeArchived?: boolean;
  exactMatch?: boolean;
  language?: string;
}