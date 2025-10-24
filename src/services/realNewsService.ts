/**
 * realNewsService.ts - Service for fetching news articles and reels data
 *
 * Backend-first news loader with fallback to demo data.
 * Supports Colombian and world news, article content fetching, and reels.
 */

export interface RealNewsArticle {
  id: string;
  title: string;
  description?: string;
  content?: string;
  author?: string;
  source: {
    name: string;
    url?: string;
  };
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  trending?: boolean;
}

export interface NewsQueryOptions {
  category?: string;
  query?: string;
  limit?: number;
  sources?: string[];
}

export interface ArticleContent {
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  images: string[];
  source: { name: string; url: string };
}

export type Reel = {
  id: string;
  title: string;
  thumbnail?: string | null;
  author?: string;
  url?: string;
};

const DEMO_ARTICLES: RealNewsArticle[] = [
  {
    id: 'demo-1',
    title: 'Senado aprueba reforma tributaria con modificaciones importantes',
    description: 'El Senado de Colombia aprobó en primer debate la reforma tributaria propuesta por el gobierno.',
    content: 'El Senado de Colombia aprobó en primer debate la reforma tributaria con varias modificaciones importantes...',
    author: 'Redacción',
    source: { name: 'El Tiempo', url: 'https://www.eltiempo.com' },
    url: '#',
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    category: 'política',
  },
  {
    id: 'demo-2',
    title: 'Bogotá implementa nuevas medidas para mejorar la movilidad',
    description: 'La alcaldía de Bogotá anunció un plan integral de movilidad para reducir los tiempos de desplazamiento.',
    content: 'La alcaldía de Bogotá anunció un plan integral de movilidad que incluye nuevos carriles exclusivos...',
    author: 'Redacción',
    source: { name: 'El Espectador', url: 'https://www.elespectador.com' },
    url: '#',
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    category: 'local',
  },
  {
    id: 'demo-3',
    title: 'Economía colombiana muestra signos de recuperación',
    description: 'Los indicadores económicos muestran una recuperación gradual en varios sectores.',
    content: 'Los indicadores económicos más recientes muestran una recuperación gradual...',
    author: 'Redacción',
    source: { name: 'Portafolio', url: 'https://www.portafolio.co' },
    url: '#',
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    category: 'economía',
  },
];

const DEMO_REELS: Reel[] = [
  { id: 'r1', title: 'Reel: Cultura local - Feria', thumbnail: null, author: 'Usuario1', url: '#' },
  { id: 'r2', title: 'Reel: Paisaje colombiano', thumbnail: null, author: 'Usuario2', url: '#' },
  { id: 'r3', title: 'Reel: Gastronomía colombiana', thumbnail: null, author: 'Usuario3', url: '#' },
];

function viteApiUrl(): string {
  const env = import.meta.env as Record<string, any>;
  return env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api');
}

class RealNewsService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getColombianNews(options: NewsQueryOptions = {}): Promise<RealNewsArticle[]> {
    const cacheKey = `colombian-${JSON.stringify(options)}`;
    const cached = this.getCached<RealNewsArticle[]>(cacheKey);
    if (cached) return cached;

    const api = viteApiUrl().replace(/\/$/, '');
    try {
      const params = new URLSearchParams();
      params.set('region', 'colombia');
      if (options.category) params.set('category', options.category);
      if (options.query) params.set('q', options.query);
      if (options.limit) params.set('limit', options.limit.toString());

      const res = await fetch(`${api}/news?${params.toString()}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const json = await res.json();
        const arr = Array.isArray(json) ? json : json?.articles || [];
        if (arr.length > 0) {
          const articles = arr.map((a: any, i: number) => this.normalizeArticle(a, i));
          this.setCache(cacheKey, articles);
          return articles;
        }
      }
    } catch (e) {
      console.warn('[RealNewsService] Colombian news fetch failed:', String(e));
    }
    return DEMO_ARTICLES;
  }

  async getWorldNews(options: NewsQueryOptions = {}): Promise<RealNewsArticle[]> {
    const cacheKey = `world-${JSON.stringify(options)}`;
    const cached = this.getCached<RealNewsArticle[]>(cacheKey);
    if (cached) return cached;

    const api = viteApiUrl().replace(/\/$/, '');
    try {
      const params = new URLSearchParams();
      params.set('region', 'world');
      if (options.category) params.set('category', options.category);
      if (options.query) params.set('q', options.query);
      if (options.limit) params.set('limit', options.limit.toString());

      const res = await fetch(`${api}/news?${params.toString()}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const json = await res.json();
        const arr = Array.isArray(json) ? json : json?.articles || [];
        if (arr.length > 0) {
          const articles = arr.map((a: any, i: number) => this.normalizeArticle(a, i));
          this.setCache(cacheKey, articles);
          return articles;
        }
      }
    } catch (e) {
      console.warn('[RealNewsService] World news fetch failed:', String(e));
    }
    return DEMO_ARTICLES;
  }

  async getArticleContent(articleId: string, articleUrl: string): Promise<ArticleContent | null> {
    const cacheKey = `article-${articleId}`;
    const cached = this.getCached<ArticleContent>(cacheKey);
    if (cached) return cached;

    const api = viteApiUrl().replace(/\/$/, '');
    try {
      const res = await fetch(`${api}/article?id=${encodeURIComponent(articleId)}&url=${encodeURIComponent(articleUrl)}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const content = await res.json();
        this.setCache(cacheKey, content);
        return content;
      }
    } catch (e) {
      console.warn('[RealNewsService] Article content fetch failed:', String(e));
    }
    return null;
  }

  private normalizeArticle(a: any, index: number): RealNewsArticle {
    return {
      id: a.id || `article-${index}`,
      title: a.title || a.name || 'Sin título',
      description: a.description || a.summary || a.content?.substring(0, 200),
      content: a.content || a.description,
      author: a.author || a.source?.name || 'Desconocido',
      source: {
        name: a.source?.name || a.sourceName || 'Fuente desconocida',
        url: a.source?.url || a.sourceUrl,
      },
      url: a.url || '#',
      urlToImage: a.urlToImage || a.image || a.imageUrl || null,
      publishedAt: a.publishedAt || a.published_at || new Date().toISOString(),
      category: a.category || 'general',
    };
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Reels functionality
export async function fetchReels(region: 'local' | 'world'): Promise<Reel[]> {
  const api = viteApiUrl().replace(/\/$/, '');
  try {
    const res = await fetch(`${api}/reels?region=${region}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const arr = Array.isArray(json) ? json : json?.reels;
      if (Array.isArray(arr) && arr.length) {
        return arr.map((r: any, i: number) => ({
          id: r.id || `s-${i}`,
          title: r.title || r.name || 'Untitled reel',
          thumbnail: r.thumbnail || r.image || null,
          author: r.author || r.user || '',
          url: r.url || '#',
        }));
      }
    }
  } catch (e) {
    console.warn('[ReelsService] backend reels fetch failed:', String(e));
  }
  return DEMO_REELS;
}

export function getDemoReels(): Reel[] {
  return DEMO_REELS;
}

export const realNewsService = new RealNewsService();
