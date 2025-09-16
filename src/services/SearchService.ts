import { SearchResult, searchContent } from '../data/searchDatabase';

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
  private config: PaginationConfig = {
    maxResults: 2000,
    defaultResultsPerPage: 6,
    maxResultsPerPage: 50
  };

  /**
   * Perform search with pagination and filtering
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 300));

    const { query, page, resultsPerPage, category, sortBy } = params;
    
    // Get all matching results
    let allResults = searchContent(query);

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