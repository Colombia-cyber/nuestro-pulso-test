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
    summary: 'El Senado de Colombia aprobó en primer debate la reforma tributaria...',
    source: 'El Tiempo',
    publishedAt: new Date().toISOString(),
    url: '#',
  },
  {
    id: 'demo-2',
    title: 'Bogotá implementa nuevas medidas para mejorar la movilidad',
    summary: 'La alcaldía de Bogotá anunció un plan integral de movilidad...',
    source: 'El Espectador',
    publishedAt: new Date().toISOString(),
    url: '#',
  },
];

function viteEnv(): Record<string, any> {
  return import.meta.env as Record<string, any>;
}

async function safeFetchJson(url: string, opts?: any, timeoutMs = 7000): Promise<any> {
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
          summary: a.description,
          source: a.source?.name,
          publishedAt: a.publishedAt,
          url: a.url,
          image: a.urlToImage || null,
        }));
      }
    }
  } catch (e) {
    console.warn('[newsService] NewsAPI fallback failed:', String(e));
  }

  // 3) demo fallback
  return DEMO_ARTICLES;
}

// Stub implementations for methods used by CustomNewsFeed
const updateListeners: Array<() => void> = [];
let updateInterval: any = null;

function getFilteredNews(filters: any): any[] {
  // Return empty array as stub - CustomNewsFeed has its own mock data
  return [];
}

function generateTimelineData(): any {
  // Return empty object as stub
  return {};
}

function startLiveUpdates(): void {
  // Stub implementation
  if (!updateInterval) {
    updateInterval = setInterval(() => {
      updateListeners.forEach(listener => listener());
    }, 30000); // Every 30 seconds
  }
}

function stopLiveUpdates(): void {
  // Stub implementation
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

function addUpdateListener(listener: () => void): void {
  updateListeners.push(listener);
}

function removeUpdateListener(listener: () => void): void {
  const index = updateListeners.indexOf(listener);
  if (index > -1) {
    updateListeners.splice(index, 1);
  }
}

// Default export for components that expect newsService object
const newsService = {
  getNews: (options?: { limit?: number }) => {
    // Default to 'local' region, respect limit if provided
    return getNews('local').then(articles => {
      if (options?.limit) {
        return articles.slice(0, options.limit);
      }
      return articles;
    });
  },
  getFilteredNews,
  generateTimelineData,
  startLiveUpdates,
  stopLiveUpdates,
  addUpdateListener,
  removeUpdateListener
};

export default newsService;
