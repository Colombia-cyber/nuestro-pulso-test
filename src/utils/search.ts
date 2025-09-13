export type SearchResult = {
  title: string;
  link: string;
  snippet: string;
  displayLink?: string;
};

const GOOGLE_API_KEY = "AIzaSyB1wdNIgV2qUdJ8lUzjhKoRnYHpwi_QAWQ";
const GOOGLE_CX = "b1da68d0c729b40ae";

export const searchGoogleAPI = async (query: string, retries = 2): Promise<SearchResult[]> => {
  for (let i = 0; i < retries; i++) {
    try {
      const params = new URLSearchParams({
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: query,
      });
      const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Google API error');
      }
      
      return data.items || [];
    } catch (error) {
      console.warn(`Google search attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return [];
};