// News API Service
import { NewsArticle } from '../types/dashboard';

/**
 * News API Service for Frontend
 * 
 * IMPORTANT: This is frontend code, so it uses import.meta.env.VITE_*
 * 
 * Environment Variables Used:
 * - VITE_NEWSAPI_KEY: News API key for fetching news articles
 * 
 * Note: For server-side news operations, backend code uses process.env.NEWSAPI_KEY
 */

class NewsAPIService {
  private apiKey: string | null = null;
  private baseUrl = 'https://newsapi.org/v2';

  constructor() {
    // Frontend code uses VITE_ prefix for environment variables
    this.apiKey = import.meta.env.VITE_NEWSAPI_KEY || null;
    
    if (!this.apiKey) {
      console.warn('⚠️ News API key not configured. Using demo data.');
      console.info('💡 Set VITE_NEWSAPI_KEY in your .env file to enable real news data.');
    }
  }

  /**
   * Search for news articles by topic
   */
  async searchNews(query: string, pageSize: number = 10): Promise<NewsArticle[]> {
    // If no API key, return demo data
    if (!this.apiKey) {
      return this.getDemoNews(query);
    }

    try {
      const params = new URLSearchParams({
        q: query,
        language: 'es',
        sortBy: 'publishedAt',
        pageSize: pageSize.toString(),
        apiKey: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/everything?${params}`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseArticles(data.articles || []);
    } catch (error) {
      console.error('News API error:', error);
      // Fallback to demo data on error
      return this.getDemoNews(query);
    }
  }

  /**
   * Get top headlines for Colombia
   */
  async getTopHeadlines(category?: string): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      return this.getDemoNews('Colombia');
    }

    try {
      const params = new URLSearchParams({
        country: 'co',
        pageSize: '10',
        apiKey: this.apiKey
      });

      if (category) {
        params.append('category', category);
      }

      const response = await fetch(`${this.baseUrl}/top-headlines?${params}`);
      const data = await response.json();
      
      return this.parseArticles(data.articles || []);
    } catch (error) {
      console.error('News API error:', error);
      return this.getDemoNews('Colombia');
    }
  }

  /**
   * Parse News API response to our format
   */
  private parseArticles(articles: any[]): NewsArticle[] {
    return articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map((article, index) => ({
        id: article.url || `article-${index}`,
        title: article.title,
        description: article.description || article.content || '',
        url: article.url || '#',
        source: article.source?.name || 'Unknown',
        imageUrl: article.urlToImage || undefined,
        publishedAt: article.publishedAt,
        author: article.author || undefined
      }));
  }

  /**
   * Get demo/placeholder news when API key is not available
   */
  private getDemoNews(query: string): NewsArticle[] {
    const demoArticles: NewsArticle[] = [
      {
        id: 'demo-news-1',
        title: `Últimas actualizaciones sobre ${query} en Colombia`,
        description: 'Análisis completo de la situación actual y sus implicaciones para el país. Configura tu News API key (VITE_NEWSAPI_KEY) para ver noticias reales.',
        url: '#',
        source: 'Demo News Colombia',
        imageUrl: 'https://via.placeholder.com/400x250/1a73e8/ffffff?text=Noticia+Demo+1',
        publishedAt: new Date().toISOString(),
        author: 'Redacción Demo'
      },
      {
        id: 'demo-news-2',
        title: `${query}: Expertos analizan el impacto en la sociedad`,
        description: 'Múltiples perspectivas sobre cómo este tema afecta a diferentes sectores del país. Modo demostración - agrega tu API key de News API.',
        url: '#',
        source: 'Demo Análisis',
        imageUrl: 'https://via.placeholder.com/400x250/ea4335/ffffff?text=Noticia+Demo+2',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        author: 'Analista Demo'
      },
      {
        id: 'demo-news-3',
        title: `Gobierno anuncia nuevas medidas relacionadas con ${query}`,
        description: 'Detalles de las políticas implementadas y su proyección a futuro. Contenido de demostración - usa tu propia News API key.',
        url: '#',
        source: 'Demo Gobierno',
        imageUrl: 'https://via.placeholder.com/400x250/34a853/ffffff?text=Noticia+Demo+3',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        author: 'Corresponsal Demo'
      },
      {
        id: 'demo-news-4',
        title: `Ciudadanos se pronuncian sobre ${query}`,
        description: 'Voces de la comunidad expresan sus opiniones y preocupaciones. Datos de ejemplo - configura VITE_NEWSAPI_KEY en tu archivo .env',
        url: '#',
        source: 'Demo Comunidad',
        imageUrl: 'https://via.placeholder.com/400x250/fbbc04/ffffff?text=Noticia+Demo+4',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        author: 'Reportero Demo'
      },
      {
        id: 'demo-news-5',
        title: `${query}: Perspectiva internacional`,
        description: 'Cómo ve el mundo este tema colombiano y sus repercusiones globales. Ejemplo de noticia - requiere configuración de API.',
        url: '#',
        source: 'Demo Internacional',
        imageUrl: 'https://via.placeholder.com/400x250/9333ea/ffffff?text=Noticia+Demo+5',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        author: 'Editor Demo'
      }
    ];

    return demoArticles;
  }

  /**
   * Check if News API is configured
   */
  isConfigured(): boolean {
    return this.apiKey !== null;
  }
}

export const newsAPIService = new NewsAPIService();
export default newsAPIService;
