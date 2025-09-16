import { SearchResult, getSearchResults } from '../data/searchFallbackData';

// Configuration for search services
interface SearchConfig {
  googleApiKey?: string;
  googleCx?: string;
  maxResults: number;
  enableFallback: boolean;
  debounceMs: number;
}

// Default configuration
const defaultConfig: SearchConfig = {
  googleApiKey: import.meta.env.REACT_APP_GOOGLE_SEARCH_API_KEY,
  googleCx: import.meta.env.REACT_APP_GOOGLE_SEARCH_CX,
  maxResults: 50,
  enableFallback: true,
  debounceMs: 300
};

// Search service class
export class UniversalSearchService {
  private config: SearchConfig;
  private searchCache: Map<string, { results: SearchResult[], timestamp: number }> = new Map();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  constructor(config: Partial<SearchConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  // Main search method with multiple data sources
  async search(query: string, page: number = 1, resultsPerPage: number = 10): Promise<{
    results: SearchResult[];
    totalResults: number;
    hasMorePages: boolean;
    currentPage: number;
    totalPages: number;
  }> {
    if (!query.trim()) {
      return {
        results: [],
        totalResults: 0,
        hasMorePages: false,
        currentPage: 1,
        totalPages: 0
      };
    }

    // Check cache first
    const cacheKey = `${query}-${page}-${resultsPerPage}`;
    const cached = this.searchCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
      return this.paginateResults(cached.results, page, resultsPerPage);
    }

    try {
      // Combine results from multiple sources
      const allResults = await this.aggregateSearchResults(query);
      
      // Cache the results
      this.searchCache.set(cacheKey, {
        results: allResults,
        timestamp: Date.now()
      });

      return this.paginateResults(allResults, page, resultsPerPage);
    } catch (error) {
      console.error('Search error:', error);
      
      // Return fallback data on error
      if (this.config.enableFallback) {
        const fallbackResults = getSearchResults(query);
        return this.paginateResults(fallbackResults, page, resultsPerPage);
      }
      
      throw error;
    }
  }

  // Aggregate results from multiple sources
  private async aggregateSearchResults(query: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    // Always include fallback data for reliability
    const fallbackResults = getSearchResults(query);
    results.push(...fallbackResults);

    // Try to get Google search results if API key is configured
    if (this.config.googleApiKey && this.config.googleCx) {
      try {
        const googleResults = await this.searchGoogle(query);
        results.push(...googleResults);
      } catch (error) {
        console.warn('Google search failed, using fallback only:', error);
      }
    }

    // Remove duplicates and sort by relevance
    const uniqueResults = this.deduplicateResults(results);
    return uniqueResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, this.config.maxResults);
  }

  // Google Custom Search implementation
  private async searchGoogle(query: string): Promise<SearchResult[]> {
    const url = `https://www.googleapis.com/customsearch/v1?key=${this.config.googleApiKey}&cx=${this.config.googleCx}&q=${encodeURIComponent(query)}&num=10`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    const results: SearchResult[] = [];

    if (data.items) {
      data.items.forEach((item: any, index: number) => {
        results.push({
          id: `google-${Date.now()}-${index}`,
          title: item.title,
          summary: item.snippet || 'Sin descripción disponible',
          source: this.extractDomain(item.link),
          category: 'Web',
          timestamp: new Date().toISOString(),
          relevanceScore: 100 - (index * 5), // Google results are pre-sorted by relevance
          link: item.link,
          image: '🌐'
        });
      });
    }

    return results;
  }

  // Paginate search results
  private paginateResults(
    allResults: SearchResult[], 
    page: number, 
    resultsPerPage: number
  ): {
    results: SearchResult[];
    totalResults: number;
    hasMorePages: boolean;
    currentPage: number;
    totalPages: number;
  } {
    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const results = allResults.slice(startIndex, endIndex);

    return {
      results,
      totalResults,
      hasMorePages: page < totalPages,
      currentPage: page,
      totalPages
    };
  }

  // Remove duplicate results based on title similarity
  private deduplicateResults(results: SearchResult[]): SearchResult[] {
    const seen = new Set<string>();
    return results.filter(result => {
      const key = this.normalizeTitle(result.title);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Normalize title for deduplication
  private normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50); // Use first 50 characters for comparison
  }

  // Extract domain from URL
  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Fuente externa';
    }
  }

  // Clear cache
  clearCache(): void {
    this.searchCache.clear();
  }

  // Update configuration
  updateConfig(newConfig: Partial<SearchConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Singleton instance
export const searchService = new UniversalSearchService();

// Debounced search function
export const createDebouncedSearch = (
  searchFn: (query: string) => void,
  delay: number = 300
) => {
  let timeoutId: number;
  
  return (query: string) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      if (query.trim()) {
        searchFn(query);
      }
    }, delay);
  };
};

export default searchService;