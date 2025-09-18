import { NewsItem, NewsCategory, NewsFilter } from '../types/news';
import googleNewsService from './googleNewsService';
import newsService from './newsService'; // Original fallback service

export interface EnhancedNewsServiceConfig {
  enableLiveUpdates: boolean;
  enableFallback: boolean;
  updateInterval: number;
  fallbackTimeout: number;
}

class EnhancedNewsService {
  private config: EnhancedNewsServiceConfig;
  private updateListeners: ((articles: NewsItem[]) => void)[] = [];
  private errorListeners: ((error: string) => void)[] = [];
  private isUsingFallback: boolean = false;
  private lastSuccessfulUpdate: Date = new Date();
  private cachedNews: Map<string, NewsItem[]> = new Map();

  constructor() {
    this.config = {
      enableLiveUpdates: this.getEnvVar('REACT_APP_ENABLE_LIVE_UPDATES') === 'true',
      enableFallback: this.getEnvVar('REACT_APP_ENABLE_FALLBACK_DATA') === 'true',
      updateInterval: parseInt(this.getEnvVar('REACT_APP_NEWS_UPDATE_INTERVAL', '30000')),
      fallbackTimeout: parseInt(this.getEnvVar('REACT_APP_FALLBACK_TIMEOUT_MS', '5000'))
    };
  }

  private getEnvVar(key: string, fallback = ''): string {
    if (typeof window !== 'undefined') {
      return (import.meta.env as any)[key] || fallback;
    }
    return fallback;
  }

  // Get all news with intelligent fallback
  async getAllNews(forceRefresh = false): Promise<NewsItem[]> {
    const cacheKey = 'all-news';
    
    // Return cached data if available and not forcing refresh
    if (!forceRefresh && this.cachedNews.has(cacheKey)) {
      const cached = this.cachedNews.get(cacheKey)!;
      // Only use cache if it's less than 5 minutes old
      const cacheAge = Date.now() - this.lastSuccessfulUpdate.getTime();
      if (cacheAge < 5 * 60 * 1000) {
        return cached;
      }
    }

    try {
      // Try Google News first
      const news = await this.tryWithTimeout(
        () => googleNewsService.getAllNews(),
        this.config.fallbackTimeout
      );

      if (news && news.length > 0) {
        this.isUsingFallback = false;
        this.lastSuccessfulUpdate = new Date();
        this.cachedNews.set(cacheKey, news);
        this.notifyUpdateListeners(news);
        return news;
      }
    } catch (error) {
      console.warn('Google News Service failed, falling back to local data:', error);
      this.notifyErrorListeners(`API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Fallback to local service
    if (this.config.enableFallback) {
      this.isUsingFallback = true;
      const fallbackNews = newsService.getFilteredNews();
      
      // Enhance fallback news with fresh timestamps and indicators
      const enhancedFallbackNews = fallbackNews.map(item => ({
        ...item,
        freshnessIndicator: 'Datos de respaldo',
        isBreaking: false
      }));

      this.cachedNews.set(cacheKey, enhancedFallbackNews);
      return enhancedFallbackNews;
    }

    throw new Error('No news sources available');
  }

  // Get news by category with fallback
  async getNewsByCategory(category: string, limit = 20): Promise<NewsItem[]> {
    const cacheKey = `category-${category}`;

    try {
      const allNews = await this.getAllNews();
      const categoryNews = allNews
        .filter(item => {
          const itemCategory = typeof item.category === 'string' ? item.category : item.category;
          return itemCategory.toLowerCase().includes(category.toLowerCase());
        })
        .slice(0, limit);

      this.cachedNews.set(cacheKey, categoryNews);
      return categoryNews;
    } catch (error) {
      console.error(`Error fetching news for category ${category}:`, error);
      
      // Return cached data if available
      if (this.cachedNews.has(cacheKey)) {
        return this.cachedNews.get(cacheKey)!;
      }

      return [];
    }
  }

  // Get breaking news
  async getBreakingNews(): Promise<NewsItem[]> {
    try {
      const allNews = await this.getAllNews();
      
      // Filter for breaking news or very recent trending news
      const breakingNews = allNews.filter(item => {
        if (item.isBreaking) return true;
        
        // Consider trending news from last 2 hours as "breaking"
        if (item.trending) {
          const publishDate = new Date(item.publishedAt);
          const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
          return publishDate > twoHoursAgo;
        }
        
        return false;
      }).slice(0, 5); // Limit to 5 breaking news items

      return breakingNews;
    } catch (error) {
      console.error('Error fetching breaking news:', error);
      return [];
    }
  }

  // Get trending news
  async getTrendingNews(): Promise<NewsItem[]> {
    try {
      const allNews = await this.getAllNews();
      return allNews
        .filter(item => item.trending)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching trending news:', error);
      return [];
    }
  }

  // Get news with balanced perspectives
  async getBalancedNews(category?: string): Promise<{ progressive: NewsItem[], conservative: NewsItem[], balanced: NewsItem[] }> {
    try {
      let news = await this.getAllNews();
      
      if (category) {
        news = news.filter(item => {
          const itemCategory = typeof item.category === 'string' ? item.category : item.category;
          return itemCategory.toLowerCase().includes(category.toLowerCase());
        });
      }

      return {
        progressive: news.filter(item => item.perspective === 'progressive').slice(0, 10),
        conservative: news.filter(item => item.perspective === 'conservative').slice(0, 10),
        balanced: news.filter(item => item.perspective === 'both' && item.hasBalancedCoverage).slice(0, 10)
      };
    } catch (error) {
      console.error('Error fetching balanced news:', error);
      return { progressive: [], conservative: [], balanced: [] };
    }
  }

  // Search news
  async searchNews(query: string, filters?: NewsFilter): Promise<NewsItem[]> {
    try {
      const allNews = await this.getAllNews();
      
      let filteredNews = allNews.filter(item => {
        const searchText = `${item.title} ${item.summary} ${item.tags?.join(' ') || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });

      // Apply additional filters
      if (filters) {
        if (filters.category) {
          filteredNews = filteredNews.filter(item => {
            const itemCategory = typeof item.category === 'string' ? item.category : item.category;
            return itemCategory.toLowerCase().includes(filters.category!.toLowerCase());
          });
        }

        if (filters.perspective && filters.perspective !== 'both') {
          filteredNews = filteredNews.filter(item => 
            item.perspective === filters.perspective || item.perspective === 'both'
          );
        }

        if (filters.source) {
          filteredNews = filteredNews.filter(item => {
            const sourceName = typeof item.source === 'string' ? item.source : item.source.name;
            return sourceName.toLowerCase().includes(filters.source!.toLowerCase());
          });
        }

        if (filters.timeRange && filters.timeRange !== 'all') {
          const now = new Date();
          const yearsBack = filters.timeRange === '1year' ? 1 : 
                           filters.timeRange === '2years' ? 2 : 5;
          const cutoffDate = new Date(now.getFullYear() - yearsBack, now.getMonth(), now.getDate());
          
          filteredNews = filteredNews.filter(item => 
            new Date(item.publishedAt) >= cutoffDate
          );
        }
      }

      return filteredNews.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }

  // Helper method to run promises with timeout
  private async tryWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      operation()
        .then(result => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  // Start live updates
  startLiveUpdates(): void {
    if (!this.config.enableLiveUpdates) return;

    // Start Google News live updates
    googleNewsService.startLiveUpdates();
    
    // Add listener to Google News updates
    googleNewsService.addUpdateListener((articles) => {
      this.lastSuccessfulUpdate = new Date();
      this.isUsingFallback = false;
      this.cachedNews.set('all-news', articles);
      this.notifyUpdateListeners(articles);
    });
  }

  // Stop live updates
  stopLiveUpdates(): void {
    googleNewsService.stopLiveUpdates();
  }

  // Add update listener
  addUpdateListener(callback: (articles: NewsItem[]) => void): void {
    this.updateListeners.push(callback);
  }

  // Remove update listener
  removeUpdateListener(callback: (articles: NewsItem[]) => void): void {
    this.updateListeners = this.updateListeners.filter(listener => listener !== callback);
  }

  // Add error listener
  addErrorListener(callback: (error: string) => void): void {
    this.errorListeners.push(callback);
  }

  // Remove error listener
  removeErrorListener(callback: (error: string) => void): void {
    this.errorListeners = this.errorListeners.filter(listener => listener !== callback);
  }

  // Notify update listeners
  private notifyUpdateListeners(articles: NewsItem[]): void {
    this.updateListeners.forEach(callback => callback(articles));
  }

  // Notify error listeners
  private notifyErrorListeners(error: string): void {
    this.errorListeners.forEach(callback => callback(error));
  }

  // Get service status
  getStatus(): {
    isUsingFallback: boolean;
    lastUpdate: Date;
    isHealthy: boolean;
  } {
    const isHealthy = Date.now() - this.lastSuccessfulUpdate.getTime() < 10 * 60 * 1000; // Healthy if updated within 10 minutes
    
    return {
      isUsingFallback: this.isUsingFallback,
      lastUpdate: this.lastSuccessfulUpdate,
      isHealthy
    };
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const news = await this.tryWithTimeout(
        () => googleNewsService.healthCheck(),
        5000
      );
      return news;
    } catch (error) {
      return this.config.enableFallback; // Healthy if fallback is available
    }
  }

  // Clear cache
  clearCache(): void {
    this.cachedNews.clear();
  }

  // Get cache info
  getCacheInfo(): { keys: string[], totalItems: number } {
    const keys = Array.from(this.cachedNews.keys());
    const totalItems = Array.from(this.cachedNews.values()).reduce((sum, items) => sum + items.length, 0);
    
    return { keys, totalItems };
  }
}

export const enhancedNewsService = new EnhancedNewsService();
export default enhancedNewsService;