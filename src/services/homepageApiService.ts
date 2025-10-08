/**
 * Google-Style Homepage API Service
 * 
 * This service provides endpoints for fetching news and data for the homepage.
 * All functions return mock data by default but are structured to easily integrate
 * with real APIs by replacing the mock implementations.
 */

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
  image?: string;
  category: string;
  description?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  source: string;
  type: 'article' | 'video' | 'social';
}

/**
 * Fetch Colombia local news
 * TODO: Integrate with real APIs (El Tiempo, Semana, RCN, etc.)
 * API Keys needed: VITE_NEWSAPI_KEY, VITE_ELTIEMPO_API_KEY, etc.
 */
export async function fetchColombiaNews(): Promise<NewsItem[]> {
  // Mock implementation - replace with real API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Congreso aprueba reforma de salud en segundo debate',
          source: 'El Tiempo',
          time: 'hace 2 horas',
          url: 'https://www.eltiempo.com',
          category: 'Política',
          description: 'La reforma de salud avanza en el Congreso después de intensos debates.'
        },
        {
          id: '2',
          title: 'Presidente Petro anuncia nuevas medidas económicas',
          source: 'Semana',
          time: 'hace 3 horas',
          url: 'https://www.semana.com',
          category: 'Economía',
        },
        {
          id: '3',
          title: 'Operativo contra narcotráfico deja 12 capturas en Antioquia',
          source: 'RCN',
          time: 'hace 1 hora',
          url: 'https://www.rcnradio.com',
          category: 'Seguridad',
        },
      ]);
    }, 500);
  });
  
  /* Real API integration example:
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`
  );
  const data = await response.json();
  return data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    source: article.source.name,
    time: formatTime(article.publishedAt),
    url: article.url,
    image: article.urlToImage,
    category: article.category || 'General',
    description: article.description
  }));
  */
}

/**
 * Fetch World/Global news
 * TODO: Integrate with real APIs (Google News, Reuters, BBC, etc.)
 * API Keys needed: VITE_NEWSAPI_KEY, VITE_GOOGLE_NEWS_API, etc.
 */
export async function fetchWorldNews(): Promise<NewsItem[]> {
  // Mock implementation - replace with real API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'w1',
          title: 'Trump announces new policy on international trade',
          source: 'CNN',
          time: '2 hours ago',
          url: 'https://www.cnn.com',
          category: 'Politics',
        },
        {
          id: 'w2',
          title: 'European Union reaches climate agreement',
          source: 'BBC',
          time: '3 hours ago',
          url: 'https://www.bbc.com',
          category: 'Environment',
        },
        {
          id: 'w3',
          title: 'Global markets react to Federal Reserve decision',
          source: 'Reuters',
          time: '1 hour ago',
          url: 'https://www.reuters.com',
          category: 'Economy',
        },
      ]);
    }, 500);
  });

  /* Real API integration example:
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${apiKey}`
  );
  const data = await response.json();
  return data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    source: article.source.name,
    time: formatTime(article.publishedAt),
    url: article.url,
    image: article.urlToImage,
    category: article.category || 'General',
    description: article.description
  }));
  */
}

/**
 * Universal search function
 * TODO: Integrate with Google Custom Search, Bing API, or internal search
 * API Keys needed: VITE_GOOGLE_API_KEY, VITE_GOOGLE_CX
 */
export async function universalSearch(
  query: string,
  scope: 'colombia' | 'world' = 'colombia'
): Promise<SearchResult[]> {
  // Mock implementation - replace with real API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: `Results for "${query}" in ${scope}`,
          snippet: 'This is a mock search result. Integrate with real search APIs.',
          url: '#',
          source: 'Mock Source',
          type: 'article',
        },
      ]);
    }, 500);
  });

  /* Real API integration example:
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_GOOGLE_CX;
  const searchQuery = scope === 'colombia' 
    ? `${query} site:colombia OR site:.co` 
    : query;
  
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(searchQuery)}`
  );
  const data = await response.json();
  return data.items?.map((item: any) => ({
    id: item.link,
    title: item.title,
    snippet: item.snippet,
    url: item.link,
    source: new URL(item.link).hostname,
    type: 'article' as const
  })) || [];
  */
}

/**
 * Fetch trending topics
 * TODO: Integrate with Google Trends, Twitter API, etc.
 */
export async function fetchTrendingTopics(scope: 'colombia' | 'world' = 'colombia'): Promise<string[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const colombiaTrends = ['Reforma de salud', 'Elecciones 2026', 'Petro', 'Copa América'];
      const worldTrends = ['Trump', 'Climate Summit', 'AI Technology', 'Olympics'];
      resolve(scope === 'colombia' ? colombiaTrends : worldTrends);
    }, 500);
  });

  /* Real API integration example:
  const apiKey = import.meta.env.VITE_GOOGLE_TRENDS_API_KEY;
  const geo = scope === 'colombia' ? 'CO' : '';
  const response = await fetch(
    `https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-300&geo=${geo}`
  );
  const data = await response.json();
  return data.default.trendingSearchesDays[0].trendingSearches
    .map((trend: any) => trend.title.query);
  */
}

/**
 * Helper function to format timestamps
 */
function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `hace ${diffMins} minutos`;
  if (diffHours < 24) return `hace ${diffHours} horas`;
  return `hace ${diffDays} días`;
}

export default {
  fetchColombiaNews,
  fetchWorldNews,
  universalSearch,
  fetchTrendingTopics,
};
