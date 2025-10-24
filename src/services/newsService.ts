/**
 * newsService.ts - Service for fetching and managing news articles
 *
 * Backend-first news loader with NewsAPI fallback and demo data.
 * Provides filtering, timeline, and live update functionality.
 */

import { NewsItem, NewsFilter } from '../types/news';

export type Article = {
  id: string;
  title: string;
  summary?: string;
  source?: string;
  publishedAt?: string;
  url?: string;
  image?: string | null;
  category?: string;
};

const DEMO_ARTICLES: Article[] = [
  {
    id: 'demo-1',
    title: 'Senado aprueba reforma tributaria con modificaciones importantes',
    summary: 'El Senado de Colombia aprobó en primer debate la reforma tributaria propuesta por el gobierno con varias modificaciones clave.',
    source: 'El Tiempo',
    publishedAt: new Date().toISOString(),
    url: '#',
    category: 'política',
  },
  {
    id: 'demo-2',
    title: 'Bogotá implementa nuevas medidas para mejorar la movilidad',
    summary: 'La alcaldía de Bogotá anunció un plan integral de movilidad para reducir los tiempos de desplazamiento en la ciudad.',
    source: 'El Espectador',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: '#',
    category: 'local',
  },
  {
    id: 'demo-3',
    title: 'Economía colombiana muestra signos de recuperación en el tercer trimestre',
    summary: 'Los indicadores económicos más recientes muestran una recuperación gradual en varios sectores productivos.',
    source: 'Portafolio',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: '#',
    category: 'economía',
  },
  {
    id: 'demo-4',
    title: 'Nuevas medidas de seguridad en las principales ciudades del país',
    summary: 'El Ministerio del Interior anuncia un plan de seguridad ciudadana para reducir los índices de criminalidad.',
    source: 'El Tiempo',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    url: '#',
    category: 'seguridad',
  },
  {
    id: 'demo-5',
    title: 'Colombia avanza en energías renovables con nuevos proyectos solares',
    summary: 'El gobierno presenta una estrategia para aumentar la generación de energía solar en las regiones del país.',
    source: 'El Espectador',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    url: '#',
    category: 'ambiente',
  },
];

// Convert Article to NewsItem format
function articleToNewsItem(article: Article): NewsItem {
  const sourceName = typeof article.source === 'string' ? article.source : 'Desconocido';
  return {
    id: article.id,
    title: article.title,
    summary: article.summary || '',
    source: sourceName,
    publishedAt: article.publishedAt || new Date().toISOString(),
    category: article.category || 'general',
    hasBalancedCoverage: false,
    trending: false,
    perspective: 'both',
    imageUrl: article.image || undefined,
    readTime: '5 min',
    author: sourceName,
    tags: article.category ? [article.category] : [],
  };
}

function viteEnv(): Record<string, any> {
  return import.meta.env as Record<string, any>;
}

async function safeFetchJson(url: string, opts?: Record<string, any>, timeoutMs = 7000): Promise<any> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const res = await fetch(url, { ...opts, signal: controller?.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get?.('content-type') || '';
    if (ct.includes('application/json')) return await res.json();
    return await res.text();
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * getNews tries:
 *  1) backend proxy: {VITE_API_URL}/news?region=local|world
 *  2) NewsAPI direct (if VITE_NEWSAPI_KEY)
 *  3) demo fallback (DEMO_ARTICLES)
 */
export async function getNews(region: 'local' | 'world'): Promise<Article[]> {
  const env = viteEnv();
  const apiUrl = (env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : '')).replace(/\/$/, '');

  // 1) backend proxy
  try {
    const payload = await safeFetchJson(`${apiUrl}/news?region=${region}`);
    // backend payload may be { articles: [...] } or raw array
    const arr = Array.isArray(payload) ? payload : payload?.articles;
    if (Array.isArray(arr) && arr.length) {
      return arr.map((a: any, i: number) => ({
        id: a.id || `b-${i}-${a.publishedAt || ''}`,
        title: a.title || a.headline || 'Untitled',
        summary: a.summary || a.description || '',
        source: a.source || a.source?.name || '',
        publishedAt: a.publishedAt || a.published_at || '',
        url: a.url || a.link || '#',
        image: a.image || a.urlToImage || null,
        category: a.category || 'general',
      }));
    }
  } catch (e) {
    console.warn('[newsService] backend fetch failed:', String(e));
  }

  // 2) NewsAPI client-side fallback (only if key present)
  try {
    const newsKey = env.VITE_NEWSAPI_KEY;
    if (newsKey && typeof window !== 'undefined') {
      const q = region === 'local' ? 'Colombia' : 'World';
      const url = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(q)}&apiKey=${newsKey}&pageSize=8`;
      const res = await safeFetchJson(url);
      const arr = res?.articles;
      if (Array.isArray(arr) && arr.length) {
        return arr.map((a: any, i: number) => ({
          id: `na-${i}-${a.publishedAt || ''}`,
          title: a.title,
          summary: a.description,
          source: a.source?.name,
          publishedAt: a.publishedAt,
          url: a.url,
          image: a.urlToImage || null,
          category: 'general',
        }));
      }
    }
  } catch (e) {
    console.warn('[newsService] NewsAPI fallback failed:', String(e));
  }

  // 3) demo fallback
  return DEMO_ARTICLES;
}

// NewsService class with filtering and live updates
class NewsService {
  private listeners: Array<() => void> = [];
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private cache: Map<string, NewsItem[]> = new Map();

  getFilteredNews(filter: NewsFilter): NewsItem[] {
    const cacheKey = JSON.stringify(filter);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let items = DEMO_ARTICLES.map(articleToNewsItem);

    // Apply filters
    if (filter.category && filter.category !== 'all') {
      items = items.filter(item => item.category === filter.category);
    }

    if (filter.source) {
      items = items.filter(item => {
        const sourceName = typeof item.source === 'string' ? item.source : item.source.name;
        return sourceName.toLowerCase().includes(filter.source!.toLowerCase());
      });
    }

    if (filter.timeRange && filter.timeRange !== 'all') {
      const now = Date.now();
      const ranges: Record<string, number> = {
        '1h': 3600000,
        '24h': 86400000,
        '7d': 604800000,
        '30d': 2592000000,
      };
      const range = ranges[filter.timeRange];
      if (range) {
        items = items.filter(item => {
          const itemTime = new Date(item.publishedAt).getTime();
          return now - itemTime <= range;
        });
      }
    }

    this.cache.set(cacheKey, items);
    return items;
  }

  generateTimelineData(): Record<string, NewsItem[]> {
    const items = DEMO_ARTICLES.map(articleToNewsItem);
    const timeline: Record<string, NewsItem[]> = {};

    items.forEach(item => {
      const date = new Date(item.publishedAt).toLocaleDateString('es-CO');
      if (!timeline[date]) {
        timeline[date] = [];
      }
      timeline[date].push(item);
    });

    return timeline;
  }

  startLiveUpdates(): void {
    if (this.updateInterval) return;
    
    this.updateInterval = setInterval(() => {
      this.notifyListeners();
    }, 30000); // Update every 30 seconds
  }

  stopLiveUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  addUpdateListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  removeUpdateListener(listener: () => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const newsService = new NewsService();
