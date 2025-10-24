/**
 * Replacement: src/services/newsService.ts
 *
 * Backend-first news loader with NewsAPI fallback and demo data.
 * Consumers: call getNews('local'|'world') and render returned Article[].
 *
 * This file keeps only public VITE_* usage (safe for frontend).
 */
export type Article = {
  id: string;
  title: string;
  summary: string; // Made required for NewsItem compatibility
  source: string; // Made required for NewsItem compatibility
  publishedAt: string; // Made required for NewsItem compatibility
  url?: string;
  image?: string | null;
  category: string; // Made required for NewsItem compatibility
  // NewsItem compatibility properties - made required
  hasBalancedCoverage: boolean;
  trending: boolean;
  perspective: 'progressive' | 'conservative' | 'both';
};

const DEMO_ARTICLES: Article[] = [
  {
    id: 'demo-1',
    title: 'Senado aprueba reforma tributaria con modificaciones importantes',
    summary: 'El Senado de Colombia aprobó en primer debate la reforma tributaria...',
    source: 'El Tiempo',
    publishedAt: new Date().toISOString(),
    url: '#',
    category: 'política',
    hasBalancedCoverage: true,
    trending: false,
    perspective: 'both',
  },
  {
    id: 'demo-2',
    title: 'Bogotá implementa nuevas medidas para mejorar la movilidad',
    summary: 'La alcaldía de Bogotá anunció un plan integral de movilidad...',
    source: 'El Espectador',
    publishedAt: new Date().toISOString(),
    url: '#',
    category: 'local',
    hasBalancedCoverage: true,
    trending: false,
    perspective: 'both',
  },
];

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
        publishedAt: a.publishedAt || a.published_at || new Date().toISOString(),
        url: a.url || a.link || '#',
        image: a.image || a.urlToImage || null,
        category: a.category || 'general',
        hasBalancedCoverage: a.hasBalancedCoverage || false,
        trending: a.trending || false,
        perspective: a.perspective || 'both' as const,
      }));
    }
  } catch (e) {
    // fallback to next option
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
          summary: a.description || '',
          source: a.source?.name || '',
          publishedAt: a.publishedAt || new Date().toISOString(),
          url: a.url,
          image: a.urlToImage || null,
          category: 'general',
          hasBalancedCoverage: false,
          trending: false,
          perspective: 'both' as const,
        }));
      }
    }
  } catch (e) {
    console.warn('[newsService] NewsAPI fallback failed:', String(e));
  }

  // 3) demo fallback
  return DEMO_ARTICLES;
}

/**
 * Service object for backward compatibility
 * Provides methods expected by existing components
 */
export const newsService = {
  getNews,
  
  // Placeholder methods for components that need them
  // These can be enhanced later as needed
  getFilteredNews: (options?: any) => DEMO_ARTICLES,
  generateTimelineData: () => ({}),
  startLiveUpdates: () => {},
  stopLiveUpdates: () => {},
  addUpdateListener: (listener: any) => {},
  removeUpdateListener: (listener: any) => {},
};
