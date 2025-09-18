import { NewsItem, NewsCategory } from '../types/news';

export interface GoogleNewsResponse {
  articles: GoogleNewsArticle[];
  totalResults: number;
  status: string;
}

export interface GoogleNewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsServiceError {
  error: string;
  details?: string;
  timestamp: Date;
}

class GoogleNewsService {
  private readonly baseUrl = 'https://newsapi.org/v2';
  private readonly apiKey: string;
  private readonly googleSearchApiKey: string;
  private readonly searchEngineId: string;
  private readonly colombianSources: string[];
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private updateListeners: ((articles: NewsItem[]) => void)[] = [];
  private lastUpdateTime: Date = new Date();

  constructor() {
    this.apiKey = this.getEnvVar('REACT_APP_NEWS_API_KEY');
    this.googleSearchApiKey = this.getEnvVar('REACT_APP_GOOGLE_SEARCH_API_KEY');
    this.searchEngineId = this.getEnvVar('REACT_APP_GOOGLE_SEARCH_ENGINE_ID');
    this.colombianSources = this.getEnvVar('REACT_APP_COLOMBIA_NEWS_SOURCES', 'el-tiempo,semana,caracol-radio').split(',');
  }

  private getEnvVar(key: string, fallback = ''): string {
    if (typeof window !== 'undefined') {
      return (import.meta.env as any)[key] || fallback;
    }
    return fallback;
  }

  private isConfigured(): boolean {
    return !!(this.apiKey || this.googleSearchApiKey);
  }

  // Get real-time news for all categories
  async getAllNews(): Promise<NewsItem[]> {
    if (!this.isConfigured()) {
      throw new Error('Google News API not configured. Please add API keys to .env file.');
    }

    try {
      const [
        localNews,
        worldNews,
        congressNews,
        legislationNews,
        securityNews,
        rightNews,
        leftNews,
        pulsoNews
      ] = await Promise.allSettled([
        this.getLocalColombianNews(),
        this.getWorldNews(),
        this.getCongressNews(),
        this.getLegislationNews(),
        this.getSecurityNews(),
        this.getRightPerspectiveNews(),
        this.getLeftPerspectiveNews(),
        this.getElPulsoNews()
      ]);

      const allNews: NewsItem[] = [];

      // Process all settled promises and extract successful results
      [localNews, worldNews, congressNews, legislationNews, securityNews, rightNews, leftNews, pulsoNews]
        .forEach((result, index) => {
          if (result.status === 'fulfilled') {
            allNews.push(...result.value);
          } else {
            console.warn(`Failed to fetch news for category ${index}:`, result.reason);
          }
        });

      // Sort by publication date (most recent first)
      const sortedNews = allNews.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      this.lastUpdateTime = new Date();
      this.notifyUpdateListeners(sortedNews);

      return sortedNews;
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw error;
    }
  }

  // Get local Colombian news
  async getLocalColombianNews(): Promise<NewsItem[]> {
    const queries = [
      'Colombia noticias',
      'Bogotá actualidad',
      'Medellín noticias',
      'Cali información',
      'gobierno Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 10);
        allArticles.push(...articles.slice(0, 5)); // Limit per query
      } catch (error) {
        console.warn(`Failed to fetch news for query "${query}":`, error);
      }
    }

    return this.convertToNewsItems(allArticles, NewsCategory.LOCAL);
  }

  // Get world news relevant to Colombia
  async getWorldNews(): Promise<NewsItem[]> {
    const queries = [
      'Latin America news',
      'International politics',
      'Global economy',
      'Venezuela Colombia',
      'United States Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, undefined, 8);
        allArticles.push(...articles.slice(0, 4));
      } catch (error) {
        console.warn(`Failed to fetch world news for query "${query}":`, error);
      }
    }

    return this.convertToNewsItems(allArticles, NewsCategory.WORLD);
  }

  // Get Congress-related news
  async getCongressNews(): Promise<NewsItem[]> {
    const queries = [
      'Congreso Colombia senado',
      'Cámara Representantes Colombia',
      'legislación Colombia',
      'proyectos ley Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 6);
        allArticles.push(...articles.slice(0, 3));
      } catch (error) {
        console.warn(`Failed to fetch congress news for query "${query}":`, error);
      }
    }

    return this.convertToNewsItems(allArticles, NewsCategory.CONGRESS);
  }

  // Get legislation tracking news
  async getLegislationNews(): Promise<NewsItem[]> {
    const queries = [
      'reforma tributaria Colombia',
      'nueva ley Colombia',
      'decreto Colombia',
      'constitución Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 5);
        allArticles.push(...articles.slice(0, 2));
      } catch (error) {
        console.warn(`Failed to fetch legislation news for query "${query}":`, error);
      }
    }

    return this.convertToNewsItems(allArticles, NewsCategory.LEGISLATION);
  }

  // Get security and crime news
  async getSecurityNews(): Promise<NewsItem[]> {
    const queries = [
      'seguridad Colombia',
      'narcotráfico Colombia',
      'criminalidad Colombia',
      'policía Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 5);
        allArticles.push(...articles.slice(0, 2));
      } catch (error) {
        console.warn(`Failed to fetch security news for query "${query}":`, error);
      }
    }

    return this.convertToNewsItems(allArticles, NewsCategory.SECURITY);
  }

  // Get right-wing perspective news
  async getRightPerspectiveNews(): Promise<NewsItem[]> {
    const queries = [
      'economía libre mercado Colombia',
      'empresa privada Colombia',
      'inversión extranjera Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 4);
        allArticles.push(...articles.slice(0, 2));
      } catch (error) {
        console.warn(`Failed to fetch right perspective news for query "${query}":`, error);
      }
    }

    const newsItems = this.convertToNewsItems(allArticles, NewsCategory.POLITICS);
    return newsItems.map(item => ({ ...item, perspective: 'conservative' as const }));
  }

  // Get left-wing perspective news
  async getLeftPerspectiveNews(): Promise<NewsItem[]> {
    const queries = [
      'justicia social Colombia',
      'políticas públicas Colombia',
      'derechos humanos Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 4);
        allArticles.push(...articles.slice(0, 2));
      } catch (error) {
        console.warn(`Failed to fetch left perspective news for query "${query}":`, error);
      }
    }

    const newsItems = this.convertToNewsItems(allArticles, NewsCategory.POLITICS);
    return newsItems.map(item => ({ ...item, perspective: 'progressive' as const }));
  }

  // Get El Pulso exclusive content (simulated with curated Colombian news)
  async getElPulsoNews(): Promise<NewsItem[]> {
    const queries = [
      'análisis político Colombia',
      'editorial Colombia',
      'opinión pública Colombia'
    ];

    const allArticles: GoogleNewsArticle[] = [];

    for (const query of queries) {
      try {
        const articles = await this.searchNews(query, 'co', 3);
        allArticles.push(...articles.slice(0, 1));
      } catch (error) {
        console.warn(`Failed to fetch El Pulso news for query "${query}":`, error);
      }
    }

    const newsItems = this.convertToNewsItems(allArticles, NewsCategory.OPINION);
    return newsItems.map(item => ({
      ...item,
      source: { id: 'el-pulso', name: 'El Pulso' },
      perspective: 'both' as const
    }));
  }

  // Search news using News API
  private async searchNews(query: string, country?: string, pageSize = 20): Promise<GoogleNewsArticle[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        apiKey: this.apiKey,
        language: 'es',
        sortBy: 'publishedAt',
        pageSize: pageSize.toString(),
        ...(country && { country })
      });

      const response = await fetch(`${this.baseUrl}/everything?${params}`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status} ${response.statusText}`);
      }

      const data: GoogleNewsResponse = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(`News API returned status: ${data.status}`);
      }

      return data.articles || [];
    } catch (error) {
      console.error('Error searching news:', error);
      // Fallback to Google Custom Search if News API fails
      return this.searchWithGoogleCustomSearch(query);
    }
  }

  // Fallback: Use Google Custom Search API
  private async searchWithGoogleCustomSearch(query: string): Promise<GoogleNewsArticle[]> {
    if (!this.googleSearchApiKey || !this.searchEngineId) {
      return [];
    }

    try {
      const params = new URLSearchParams({
        key: this.googleSearchApiKey,
        cx: this.searchEngineId,
        q: `${query} noticias Colombia`,
        num: '10',
        lr: 'lang_es',
        dateRestrict: 'd1' // Last day
      });

      const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
      
      if (!response.ok) {
        throw new Error(`Google Search API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert Google Search results to NewsAPI format
      return (data.items || []).map((item: any) => ({
        source: { id: null, name: 'Google Search' },
        author: null,
        title: item.title,
        description: item.snippet,
        url: item.link,
        urlToImage: item.pagemap?.cse_image?.[0]?.src || null,
        publishedAt: new Date().toISOString(), // Google doesn't provide publish date in basic search
        content: item.snippet
      }));
    } catch (error) {
      console.error('Error with Google Custom Search:', error);
      return [];
    }
  }

  // Convert Google News articles to internal NewsItem format
  private convertToNewsItems(articles: GoogleNewsArticle[], category: NewsCategory): NewsItem[] {
    return articles.map((article, index) => ({
      id: `google-${category}-${Date.now()}-${index}`,
      title: article.title,
      summary: article.description || article.content?.substring(0, 200) + '...' || '',
      source: article.source,
      category,
      publishedAt: article.publishedAt,
      hasBalancedCoverage: false,
      trending: this.isRecent(article.publishedAt),
      perspective: 'both' as const,
      imageUrl: article.urlToImage || '/api/placeholder/400/250',
      readTime: this.calculateReadTime(article.content || article.description || ''),
      author: article.author || 'Redacción',
      tags: this.extractTags(article.title + ' ' + (article.description || '')),
      shareUrl: article.url,
      relatedArticles: [],
      url: article.url,
      freshnessIndicator: this.getFreshnessIndicator(article.publishedAt)
    }));
  }

  // Calculate estimated read time
  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${readTime} min`;
  }

  // Extract relevant tags from title and description
  private extractTags(text: string): string[] {
    const commonTags = [
      'Colombia', 'Bogotá', 'política', 'economía', 'gobierno', 'congreso',
      'senado', 'presidente', 'ministerio', 'ley', 'reforma', 'seguridad',
      'narcotráfico', 'paz', 'FARC', 'ELN', 'justicia', 'educación',
      'salud', 'ambiente', 'energía', 'infraestructura'
    ];

    const foundTags = commonTags.filter(tag => 
      text.toLowerCase().includes(tag.toLowerCase())
    );

    return foundTags.slice(0, 5); // Limit to 5 tags
  }

  // Check if article is recent (published within last 6 hours)
  private isRecent(publishedAt: string): boolean {
    const publishDate = new Date(publishedAt);
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    return publishDate > sixHoursAgo;
  }

  // Get freshness indicator text
  private getFreshnessIndicator(publishedAt: string): string {
    const publishDate = new Date(publishedAt);
    const now = new Date();
    const diffMs = now.getTime() - publishDate.getTime();
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `Actualizado hace ${seconds} segundos`;
    if (minutes < 60) return `Actualizado hace ${minutes} minutos`;
    if (hours < 24) return `Actualizado hace ${hours} horas`;
    if (days < 7) return `Actualizado hace ${days} días`;
    
    return publishDate.toLocaleDateString('es-CO');
  }

  // Start live updates
  startLiveUpdates(): void {
    if (this.updateInterval) return;

    const intervalMs = parseInt(this.getEnvVar('REACT_APP_NEWS_UPDATE_INTERVAL', '30000'));
    
    this.updateInterval = setInterval(async () => {
      try {
        await this.getAllNews();
      } catch (error) {
        console.error('Error in live news update:', error);
      }
    }, intervalMs);
  }

  // Stop live updates
  stopLiveUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  // Add update listener
  addUpdateListener(callback: (articles: NewsItem[]) => void): void {
    this.updateListeners.push(callback);
  }

  // Remove update listener
  removeUpdateListener(callback: (articles: NewsItem[]) => void): void {
    this.updateListeners = this.updateListeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of updates
  private notifyUpdateListeners(articles: NewsItem[]): void {
    this.updateListeners.forEach(callback => callback(articles));
  }

  // Get last update time
  getLastUpdateTime(): Date {
    return this.lastUpdateTime;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isConfigured()) {
        return false;
      }

      // Try a simple search to verify API connectivity
      const testArticles = await this.searchNews('Colombia test', 'co', 1);
      return true;
    } catch (error) {
      console.error('Google News Service health check failed:', error);
      return false;
    }
  }
}

export const googleNewsService = new GoogleNewsService();
export default googleNewsService;