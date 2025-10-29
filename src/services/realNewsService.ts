/**
 * Real News Service - Robust TypeScript Implementation
 * 
 * Provides real-time news fetching with fallback mechanisms and error handling.
 * Supports multiple news sources and graceful degradation.
 */

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  };
  author?: string;
  content?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  trending?: boolean;
}

// Type alias for backward compatibility
export type RealNewsArticle = NewsArticle;

export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults?: number;
  articles: NewsArticle[];
  error?: string;
}

// Demo/fallback articles for when API is unavailable
const DEMO_ARTICLES: NewsArticle[] = [
  {
    id: 'demo-1',
    title: 'Colombia Economic Growth Continues',
    description: 'Latest economic indicators show positive trends...',
    url: '#',
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    source: { name: 'Demo News' },
    author: 'Demo Author',
    category: 'business',
    tags: ['economy', 'colombia'],
    readTime: '5 min',
    trending: false,
  },
  {
    id: 'demo-2',
    title: 'Technology Advances in Latin America',
    description: 'Regional tech sector sees significant investment...',
    url: '#',
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    source: { name: 'Demo Tech' },
    author: 'Demo Author',
    category: 'technology',
    tags: ['tech', 'latinamerica'],
    readTime: '3 min',
    trending: true,
  },
];

/**
 * Get API configuration from environment variables
 */
function getApiConfig(): { apiKey: string; baseUrl: string } {
  const env = import.meta.env as Record<string, string>;
  return {
    apiKey: env.VITE_NEWSAPI_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
  };
}

/**
 * Fetch news articles from NewsAPI
 * @param category - News category (business, technology, etc.)
 * @param country - Country code (us, co, etc.)
 * @param pageSize - Number of articles to fetch
 * @returns Promise with news articles
 */
export async function fetchNews(
  category: string = 'general',
  country: string = 'us',
  pageSize: number = 10
): Promise<NewsResponse> {
  const { apiKey, baseUrl } = getApiConfig();

  // If no API key, return demo data
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    console.warn('[RealNewsService] No valid API key found, using demo data');
    return {
      status: 'ok',
      totalResults: DEMO_ARTICLES.length,
      articles: DEMO_ARTICLES,
    };
  }

  try {
    const url = `${baseUrl}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle NewsAPI error responses
    if (data.status === 'error') {
      console.error('[RealNewsService] API returned error:', data.message);
      return {
        status: 'error',
        articles: DEMO_ARTICLES,
        error: data.message,
      };
    }

    // Transform and validate articles
    const articles: NewsArticle[] = (data.articles || []).map((article: any, index: number) => ({
      id: article.url || `article-${index}`,
      title: article.title || 'Untitled',
      description: article.description || '',
      url: article.url || '#',
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        id: article.source?.id,
        name: article.source?.name || 'Unknown Source',
      },
      author: article.author || '',
      content: article.content || '',
      category: category,
      tags: [],
      readTime: '5 min',
      trending: false,
    }));

    return {
      status: 'ok',
      totalResults: data.totalResults || articles.length,
      articles,
    };
  } catch (error) {
    console.error('[RealNewsService] Failed to fetch news:', error);
    return {
      status: 'error',
      articles: DEMO_ARTICLES,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search news articles by query
 * @param query - Search query
 * @param pageSize - Number of articles to fetch
 * @returns Promise with news articles
 */
export async function searchNews(
  query: string,
  pageSize: number = 10
): Promise<NewsResponse> {
  const { apiKey, baseUrl } = getApiConfig();

  // If no API key, return demo data
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    console.warn('[RealNewsService] No valid API key found, using demo data');
    return {
      status: 'ok',
      totalResults: DEMO_ARTICLES.length,
      articles: DEMO_ARTICLES,
    };
  }

  try {
    const url = `${baseUrl}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&apiKey=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      console.error('[RealNewsService] API returned error:', data.message);
      return {
        status: 'error',
        articles: DEMO_ARTICLES,
        error: data.message,
      };
    }

    const articles: NewsArticle[] = (data.articles || []).map((article: any, index: number) => ({
      id: article.url || `article-${index}`,
      title: article.title || 'Untitled',
      description: article.description || '',
      url: article.url || '#',
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        id: article.source?.id,
        name: article.source?.name || 'Unknown Source',
      },
      author: article.author || '',
      content: article.content || '',
      category: 'general',
      tags: [],
      readTime: '5 min',
      trending: false,
    }));

    return {
      status: 'ok',
      totalResults: data.totalResults || articles.length,
      articles,
    };
  } catch (error) {
    console.error('[RealNewsService] Failed to search news:', error);
    return {
      status: 'error',
      articles: DEMO_ARTICLES,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get Colombian news
 * @param options - Fetch options
 * @returns Promise with Colombian news articles
 */
export async function getColombianNews(options: {
  category?: string;
  pageSize?: number;
  limit?: number;
  query?: string;
} = {}): Promise<NewsArticle[]> {
  const { category = 'general', pageSize, limit, query } = options;
  const size = limit || pageSize || 10;
  
  if (query) {
    const response = await searchNews(query, size);
    return response.articles;
  }
  
  const response = await fetchNews(category, 'co', size);
  return response.articles;
}

/**
 * Get world news
 * @param options - Fetch options
 * @returns Promise with world news articles
 */
export async function getWorldNews(options: {
  category?: string;
  pageSize?: number;
  limit?: number;
  query?: string;
} = {}): Promise<NewsArticle[]> {
  const { category = 'general', pageSize, limit, query } = options;
  const size = limit || pageSize || 10;
  
  if (query) {
    const response = await searchNews(query, size);
    return response.articles;
  }
  
  const response = await fetchNews(category, 'us', size);
  return response.articles;
}

/**
 * Get article content (for backward compatibility)
 * @param id - Article ID
 * @param url - Article URL
 * @returns Promise with article content string
 */
export async function getArticleContent(id: string, url: string): Promise<string> {
  // This is a placeholder implementation
  // In a real implementation, you might fetch the full article content
  // Return a simple string for compatibility with the component
  return `Full content for article ${id} at ${url}`;
}

/**
 * Get demo/fallback articles
 * @returns Demo articles
 */
export function getDemoArticles(): NewsArticle[] {
  return DEMO_ARTICLES;
}

// Service object for backward compatibility
export const realNewsService = {
  fetchNews,
  searchNews,
  getDemoArticles,
  getArticleContent,
  getColombianNews,
  getWorldNews,
};

// Default export for backward compatibility
export default realNewsService;
