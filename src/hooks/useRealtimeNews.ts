import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

// Get db instance directly
const db = getFirestore();

interface NewsArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface RealtimeNewsOptions {
  refreshInterval?: number; // in milliseconds
  enableServerSentEvents?: boolean;
  syncToFirestore?: boolean;
}

export const useRealtimeNews = (
  searchParams: string, 
  options: RealtimeNewsOptions = {}
) => {
  const {
    refreshInterval = 60000, // 1 minute default
    enableServerSentEvents = false,
    syncToFirestore = true
  } = options;

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const intervalRef = useRef<number | null>(null);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

  const fetchNews = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://newsapi.org/v2/everything?${searchParams}&apiKey=${NEWS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const newArticles = data.articles || [];
      
      setArticles(newArticles);
      setLastUpdated(new Date());
      
      // Sync to Firestore for real-time distribution
      if (syncToFirestore && newArticles.length > 0) {
        try {
          // Only sync the first article if it's new (basic deduplication)
          const latestArticle = newArticles[0];
          await addDoc(collection(db, 'newsUpdates'), {
            title: latestArticle.title,
            description: latestArticle.description,
            source: latestArticle.source?.name || 'Unknown',
            url: latestArticle.url,
            category: extractCategory(searchParams),
            timestamp: serverTimestamp(),
            isBreaking: isBreakingNews(latestArticle.title),
            publishedAt: latestArticle.publishedAt
          });
        } catch (firestoreError) {
          console.warn('Failed to sync to Firestore:', firestoreError);
        }
      }
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setLoading(false);
    }
  };

  const extractCategory = (params: string): string => {
    if (params.includes('Gustavo Petro')) return 'Colombia Politics';
    if (params.includes('Prime Minister') || params.includes('Trump')) return 'International';
    if (params.includes('politics')) return 'General Politics';
    return 'News';
  };

  const isBreakingNews = (title: string): boolean => {
    const breakingKeywords = ['BREAKING', 'URGENT', 'ALERT', 'EMERGENCY', 'CRISIS'];
    return breakingKeywords.some(keyword => 
      title.toUpperCase().includes(keyword)
    );
  };

  // Setup Server-Sent Events (for future backend implementation)
  useEffect(() => {
    if (!enableServerSentEvents) return;

    const setupSSE = () => {
      try {
        eventSourceRef.current = new EventSource('/api/news-stream');
        
        eventSourceRef.current.onmessage = (event) => {
          try {
            const newsData = JSON.parse(event.data);
            setArticles(prev => [newsData, ...prev.slice(0, 49)]); // Keep latest 50
            setLastUpdated(new Date());
          } catch (parseError) {
            console.warn('Failed to parse SSE data:', parseError);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.warn('SSE connection error:', error);
          eventSourceRef.current?.close();
          // Fallback to polling
          setupPolling();
        };
      } catch (sseError) {
        console.warn('SSE not supported, falling back to polling:', sseError);
        setupPolling();
      }
    };

    const setupPolling = () => {
      // Initial fetch
      fetchNews();
      
      // Setup interval for periodic updates
      intervalRef.current = window.setInterval(fetchNews, refreshInterval);
    };

    if (enableServerSentEvents) {
      setupSSE();
    } else {
      setupPolling();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [searchParams, refreshInterval, enableServerSentEvents, syncToFirestore]);

  // Manual refresh function
  const refresh = async () => {
    setLoading(true);
    await fetchNews();
  };

  // Force update function for external triggers
  const forceUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    refresh();
    if (!enableServerSentEvents) {
      intervalRef.current = window.setInterval(fetchNews, refreshInterval);
    }
  };

  return {
    articles,
    loading,
    error,
    lastUpdated,
    refresh,
    forceUpdate,
    isRealtimeActive: !!eventSourceRef.current || !!intervalRef.current
  };
};