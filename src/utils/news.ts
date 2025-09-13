export type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

export const fetchNews = async (params: string, retries = 3): Promise<Article[]> => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API returned error status');
      }
      
      return data.articles || [];
    } catch (error) {
      console.warn(`News API fetch attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  return [];
};

export const fetchColombianNews = () => 
  fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt');

export const fetchAustralianPmTrumpNews = () => 
  fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt');

export const fetchPoliticsNews = () => 
  fetchNews('q=politics&language=en&sortBy=publishedAt');