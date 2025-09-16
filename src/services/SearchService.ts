import { SearchResult, searchContent } from '../data/searchDatabase';
import { googleSearchService } from './GoogleSearchService';

export interface SearchParams {
  query: string;
  page: number;
  resultsPerPage: number;
  category: string;
  sortBy: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  query: string;
}

export interface PaginationConfig {
  maxResults: number; // Deep pagination limit (e.g., 2000)
  defaultResultsPerPage: number;
  maxResultsPerPage: number;
}

export class SearchService {
  private config: PaginationConfig;

  constructor() {
    const getEnvVar = (key: string, defaultValue: string = '') => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
      }
      return (import.meta.env && import.meta.env[key]) || defaultValue;
    };

    this.config = {
      maxResults: parseInt(getEnvVar('REACT_APP_SEARCH_MAX_RESULTS', '2000'), 10),
      defaultResultsPerPage: parseInt(getEnvVar('REACT_APP_SEARCH_RESULTS_PER_PAGE', '6'), 10),
      maxResultsPerPage: 50
    };
  }

  /**
   * Perform search with pagination and filtering
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 300));

    const { query, page, resultsPerPage, category, sortBy } = params;
    
    // Get results from both local database and Google Search
    let allResults = await this.getAggregatedResults(query);

    // Apply category filter
    if (category && category !== 'all') {
      allResults = allResults.filter(result => 
        result.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply sorting
    allResults = this.sortResults(allResults, sortBy);

    // Apply deep pagination limit
    if (allResults.length > this.config.maxResults) {
      allResults = allResults.slice(0, this.config.maxResults);
    }

    // Calculate pagination
    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = allResults.slice(startIndex, endIndex);

    return {
      results: paginatedResults,
      totalResults,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      query
    };
  }

  /**
   * Get aggregated results from both local database and Google Search
   */
  private async getAggregatedResults(query: string): Promise<SearchResult[]> {
    try {
      // Get local database results
      const localResults = searchContent(query);
      
      // Get Google Search results (with rate limiting and fallbacks)
      let googleResults: SearchResult[] = [];
      
      try {
        // Request more results for popular queries
        const numGoogleResults = this.shouldFetchMoreResults(query) ? 20 : 10;
        googleResults = await googleSearchService.search(query, 1, numGoogleResults);
      } catch (error) {
        console.warn('Google Search unavailable, using local results only:', error);
      }

      // Combine and deduplicate results
      const combinedResults = this.combineAndDeduplicateResults(localResults, googleResults);
      
      // Boost relevance for local content
      combinedResults.forEach(result => {
        if (result.id.startsWith('fb-') || result.id.startsWith('petro-') || 
            result.id.startsWith('cd-') || result.id.startsWith('pen-')) {
          result.relevanceScore += 10; // Boost local content
        }
      });

      return combinedResults;
    } catch (error) {
      console.error('Error in aggregated search:', error);
      // Fallback to local results only
      return searchContent(query);
    }
  }

  /**
   * Determine if we should fetch more results for popular queries
   */
  private shouldFetchMoreResults(query: string): boolean {
    const popularTerms = [
      'facebook', 'colombia', 'gustavo petro', 'trump', 'elecciones',
      'reforma pensional', 'seguridad', 'centro democrático', 'política'
    ];
    
    return popularTerms.some(term => 
      query.toLowerCase().includes(term.toLowerCase())
    );
  }

  /**
   * Combine and deduplicate results from multiple sources
   */
  private combineAndDeduplicateResults(
    localResults: SearchResult[], 
    googleResults: SearchResult[]
  ): SearchResult[] {
    const seen = new Set<string>();
    const combined: SearchResult[] = [];

    // Add local results first (higher priority)
    localResults.forEach(result => {
      const key = this.getDeduplicationKey(result);
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(result);
      }
    });

    // Add Google results, avoiding duplicates
    googleResults.forEach(result => {
      const key = this.getDeduplicationKey(result);
      if (!seen.has(key)) {
        seen.add(key);
        // Mark as external source
        result.source = `${result.source} (Google)`;
        combined.push(result);
      }
    });

    return combined;
  }

  /**
   * Generate deduplication key for a result
   */
  private getDeduplicationKey(result: SearchResult): string {
    // Use normalized title for deduplication
    return result.title.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Sort search results based on criteria
   */
  private sortResults(results: SearchResult[], sortBy: string): SearchResult[] {
    switch (sortBy) {
      case 'relevance':
        return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
      case 'date':
        return results.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      case 'category':
        return results.sort((a, b) => a.category.localeCompare(b.category));
      case 'source':
        return results.sort((a, b) => a.source.localeCompare(b.source));
      default:
        return results;
    }
  }

  /**
   * Get configuration for pagination limits
   */
  getConfig(): PaginationConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PaginationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

/**
 * URL management for search state persistence
 */
export class SearchURLManager {
  /**
   * Update URL with search parameters
   */
  updateURL(params: Partial<SearchParams>): void {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // Update or remove parameters
    if (params.query !== undefined) {
      if (params.query) {
        searchParams.set('q', params.query);
      } else {
        searchParams.delete('q');
      }
    }

    if (params.page !== undefined && params.page > 1) {
      searchParams.set('page', params.page.toString());
    } else {
      searchParams.delete('page');
    }

    if (params.category !== undefined && params.category !== 'all') {
      searchParams.set('category', params.category);
    } else {
      searchParams.delete('category');
    }

    if (params.sortBy !== undefined && params.sortBy !== 'relevance') {
      searchParams.set('sort', params.sortBy);
    } else {
      searchParams.delete('sort');
    }

    // Update URL without page reload
    window.history.pushState({}, '', url.toString());
  }

  /**
   * Read search parameters from URL
   */
  getParamsFromURL(): Partial<SearchParams> {
    if (typeof window === 'undefined') return {};

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    return {
      query: searchParams.get('q') || '',
      page: parseInt(searchParams.get('page') || '1', 10),
      category: searchParams.get('category') || 'all',
      sortBy: searchParams.get('sort') || 'relevance'
    };
  }

  /**
   * Clear all search parameters from URL
   */
  clearURL(): void {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    searchParams.delete('q');
    searchParams.delete('page');
    searchParams.delete('category');
    searchParams.delete('sort');

    window.history.pushState({}, '', url.toString());
  }
}

/**
 * Debounced search hook for real-time search
 */
export class DebouncedSearch {
  private timeoutId: number | null = null;
  private delay: number;

  constructor(delay: number = 300) {
    this.delay = delay;
  }

  /**
   * Execute search with debounce
   */
  execute(callback: () => void): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      callback();
      this.timeoutId = null;
    }, this.delay);
  }

  /**
   * Cancel pending search
   */
  cancel(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Update debounce delay
   */
  setDelay(delay: number): void {
    this.delay = delay;
  }
}

// Singleton instances
export const searchService = new SearchService();
export const searchURLManager = new SearchURLManager();

// Rate limiting for API calls (future use)
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number; // in milliseconds

  constructor(maxRequests: number = 100, timeWindowMinutes: number = 1) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMinutes * 60 * 1000;
  }

  /**
   * Check if request is allowed
   */
  isAllowed(): boolean {
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // Check if under limit
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }

  /**
   * Get time until next request is allowed
   */
  getRetryAfter(): number {
    if (this.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    const timeUntilExpiry = this.timeWindow - (Date.now() - oldestRequest);
    
    return Math.max(0, timeUntilExpiry);
  }

  /**
   * Reset rate limit counters
   */
  reset(): void {
    this.requests = [];
  }
}

export const rateLimiter = new RateLimiter();