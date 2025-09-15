/**
 * Data service for handling API calls, pagination, and data management
 * Provides comprehensive data fetching with fallback mechanisms
 */

import { 
  generateMockReels, 
  generateMockNews, 
  generateSearchResults, 
  getFallbackData,
  ReelData,
  NewsData,
  SearchResult
} from '../data/mockDataGenerator';

export interface PaginationOptions {
  page: number;
  limit: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    totalPages: number;
  };
  metadata: {
    loadTime: number;
    source: 'api' | 'fallback' | 'cache';
    lastUpdated: Date;
  };
}

export interface SearchOptions extends PaginationOptions {
  query: string;
  filters?: {
    type?: string[];
    country?: string[];
    language?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
}

class DataService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetches reels data with comprehensive pagination and fallback
   */
  async fetchReels(options: PaginationOptions): Promise<ApiResponse<ReelData>> {
    const cacheKey = `reels-${JSON.stringify(options)}`;
    const startTime = Date.now();

    try {
      // Check cache first
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          ...cached,
          metadata: {
            loadTime: Date.now() - startTime,
            source: 'cache',
            lastUpdated: new Date(cached.metadata.lastUpdated)
          }
        };
      }

      // Simulate API call delay
      await this.simulateNetworkDelay();

      // Generate comprehensive mock data
      const category = options.category === 'todos' ? undefined : options.category;
      const allReels = this.generateCategoryReels(category);
      
      // Apply pagination
      const startIndex = (options.page - 1) * options.limit;
      const endIndex = startIndex + options.limit;
      const paginatedReels = allReels.slice(startIndex, endIndex);

      const response: ApiResponse<ReelData> = {
        data: paginatedReels,
        pagination: {
          page: options.page,
          limit: options.limit,
          total: allReels.length,
          hasMore: endIndex < allReels.length,
          totalPages: Math.ceil(allReels.length / options.limit)
        },
        metadata: {
          loadTime: Date.now() - startTime,
          source: 'api',
          lastUpdated: new Date()
        }
      };

      // Cache the response
      this.setCache(cacheKey, response);
      return response;

    } catch (error) {
      console.warn('API failed, using fallback data:', error);
      return this.getFallbackReelsResponse(options, startTime);
    }
  }

  /**
   * Fetches news data with comprehensive pagination and fallback
   */
  async fetchNews(options: PaginationOptions): Promise<ApiResponse<NewsData>> {
    const cacheKey = `news-${JSON.stringify(options)}`;
    const startTime = Date.now();

    try {
      // Check cache first
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          ...cached,
          metadata: {
            loadTime: Date.now() - startTime,
            source: 'cache',
            lastUpdated: new Date(cached.metadata.lastUpdated)
          }
        };
      }

      // Simulate API call delay
      await this.simulateNetworkDelay();

      // Generate comprehensive mock data
      const category = options.category === 'todas' ? undefined : options.category;
      const allNews = this.generateCategoryNews(category);
      
      // Apply pagination
      const startIndex = (options.page - 1) * options.limit;
      const endIndex = startIndex + options.limit;
      const paginatedNews = allNews.slice(startIndex, endIndex);

      const response: ApiResponse<NewsData> = {
        data: paginatedNews,
        pagination: {
          page: options.page,
          limit: options.limit,
          total: allNews.length,
          hasMore: endIndex < allNews.length,
          totalPages: Math.ceil(allNews.length / options.limit)
        },
        metadata: {
          loadTime: Date.now() - startTime,
          source: 'api',
          lastUpdated: new Date()
        }
      };

      // Cache the response
      this.setCache(cacheKey, response);
      return response;

    } catch (error) {
      console.warn('API failed, using fallback data:', error);
      return this.getFallbackNewsResponse(options, startTime);
    }
  }

  /**
   * Performs comprehensive global search with pagination and filtering
   */
  async searchGlobal(options: SearchOptions): Promise<ApiResponse<SearchResult>> {
    const cacheKey = `search-${JSON.stringify(options)}`;
    const startTime = Date.now();

    try {
      // Check cache first
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          ...cached,
          metadata: {
            loadTime: Date.now() - startTime,
            source: 'cache',
            lastUpdated: new Date(cached.metadata.lastUpdated)
          }
        };
      }

      // Simulate global search API call
      await this.simulateNetworkDelay();

      // Generate comprehensive search results
      const totalResults = Math.floor(Math.random() * 10000) + 1000; // Simulate large result set
      const resultsToGenerate = Math.min(options.limit, 50); // Generate reasonable batch
      const searchResults = generateSearchResults(options.query, options.page, resultsToGenerate);

      // Apply filters if provided
      const filteredResults = this.applySearchFilters(searchResults, options.filters);

      const response: ApiResponse<SearchResult> = {
        data: filteredResults,
        pagination: {
          page: options.page,
          limit: options.limit,
          total: totalResults,
          hasMore: options.page * options.limit < totalResults,
          totalPages: Math.ceil(totalResults / options.limit)
        },
        metadata: {
          loadTime: Date.now() - startTime,
          source: 'api',
          lastUpdated: new Date()
        }
      };

      // Cache the response
      this.setCache(cacheKey, response);
      return response;

    } catch (error) {
      console.warn('Search API failed, using fallback data:', error);
      return this.getFallbackSearchResponse(options, startTime);
    }
  }

  /**
   * Gets trending topics for a specific category
   */
  async getTrendingTopics(category?: string): Promise<string[]> {
    const trendingMap: { [key: string]: string[] } = {
      terror: ['#SeguridadFronteriza', '#DefensaNacional', '#InteligenciaMilitar', '#CooperacionInternacional'],
      trump: ['#ComercioEEUU', '#RelacionesBilaterales', '#ArancelesComerciales', '#DiplomaciaEconomica'],
      tecnologia: ['#Innovacion5G', '#InteligenciaArtificial', '#TransformacionDigital', '#CiberseguridadNacional'],
      congreso: ['#ReformaLegislativa', '#DebateCongreso', '#ProyectoLey', '#ParticipacionCiudadana'],
      ambiente: ['#CambioClimatico', '#EnergiaRenovable', '#ConservacionAmbiental', '#SostenibilidadColombia'],
      default: ['#NoticiasColombia', '#ActualidadNacional', '#ParticipacionCivica', '#DemocraciaDigital']
    };

    return trendingMap[category || 'default'] || trendingMap.default;
  }

  /**
   * Gets live content (streams, breaking news, etc.)
   */
  async getLiveContent(): Promise<{ reels: ReelData[]; news: NewsData[] }> {
    await this.simulateNetworkDelay(200); // Faster for live content

    const liveReels = generateMockReels('todos', 5).map(reel => ({
      ...reel,
      isLive: true,
      views: reel.views * 2 // Live content typically has more viewers
    }));

    const breakingNews = generateMockNews('todas', 3).map(news => ({
      ...news,
      time: 'En vivo',
      title: '🔴 ÚLTIMO MOMENTO: ' + news.title
    }));

    return {
      reels: liveReels,
      news: breakingNews
    };
  }

  // Private helper methods

  private generateCategoryReels(category?: string): ReelData[] {
    if (!category) {
      // Generate content for all categories
      const categories = ['terror', 'trump', 'tecnologia', 'congreso', 'ambiente', 'politica', 'educacion'];
      return categories.flatMap(cat => generateMockReels(cat, 100)); // 700 total reels
    }
    return generateMockReels(category, 200); // 200 reels per category
  }

  private generateCategoryNews(category?: string): NewsData[] {
    if (!category) {
      // Generate content for all categories
      const categories = ['terror', 'trump', 'tecnologia', 'congreso', 'ambiente', 'politica', 'educacion'];
      return categories.flatMap(cat => generateMockNews(cat, 50)); // 350 total news
    }
    return generateMockNews(category, 100); // 100 news per category
  }

  private applySearchFilters(results: SearchResult[], filters?: SearchOptions['filters']): SearchResult[] {
    if (!filters) return results;

    return results.filter(result => {
      if (filters.type && !filters.type.includes(result.type)) return false;
      if (filters.country && !filters.country.includes(result.country)) return false;
      if (filters.language && !filters.language.includes(result.language)) return false;
      if (filters.dateRange) {
        const resultDate = result.publishedDate;
        if (resultDate < filters.dateRange.start || resultDate > filters.dateRange.end) return false;
      }
      return true;
    });
  }

  private async simulateNetworkDelay(ms: number = 800): Promise<void> {
    // Simulate realistic network delay
    const delay = ms + Math.random() * 400; // Add some randomness
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate occasional network errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Network timeout');
    }
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private getFallbackReelsResponse(options: PaginationOptions, startTime: number): ApiResponse<ReelData> {
    const fallbackData = getFallbackData('reels', options.category) as ReelData[];
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const paginatedData = fallbackData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: fallbackData.length,
        hasMore: endIndex < fallbackData.length,
        totalPages: Math.ceil(fallbackData.length / options.limit)
      },
      metadata: {
        loadTime: Date.now() - startTime,
        source: 'fallback',
        lastUpdated: new Date()
      }
    };
  }

  private getFallbackNewsResponse(options: PaginationOptions, startTime: number): ApiResponse<NewsData> {
    const fallbackData = getFallbackData('news', options.category) as NewsData[];
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const paginatedData = fallbackData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: fallbackData.length,
        hasMore: endIndex < fallbackData.length,
        totalPages: Math.ceil(fallbackData.length / options.limit)
      },
      metadata: {
        loadTime: Date.now() - startTime,
        source: 'fallback',
        lastUpdated: new Date()
      }
    };
  }

  private getFallbackSearchResponse(options: SearchOptions, startTime: number): ApiResponse<SearchResult> {
    const fallbackData = getFallbackData('search') as SearchResult[];
    const filteredData = this.applySearchFilters(fallbackData, options.filters);

    return {
      data: filteredData.slice(0, options.limit),
      pagination: {
        page: options.page,
        limit: options.limit,
        total: filteredData.length,
        hasMore: options.limit < filteredData.length,
        totalPages: Math.ceil(filteredData.length / options.limit)
      },
      metadata: {
        loadTime: Date.now() - startTime,
        source: 'fallback',
        lastUpdated: new Date()
      }
    };
  }
}

// Export singleton instance
export const dataService = new DataService();