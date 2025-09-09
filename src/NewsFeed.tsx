import React, { useEffect, useState, useRef } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

const NEWS_API_KEY = '27aa99ad66064f04b9ef515c312a78eb';

const fetchNews = async (params: string): Promise<Article[]> => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
  );
  const data = await res.json();
  return data.articles || [];
};

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadAll = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const [co, auPmTrump, politics] = await Promise.all([
        fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt'),
        fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt'),
        fetchNews('q=politics&language=en&sortBy=publishedAt'),
      ]);
      setColombianNews(co);
      setAustralianPmTrumpNews(auPmTrump);
      setPoliticsNews(politics);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Unable to load news right now. Please try again later.");
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadAll();
    intervalRef.current = setInterval(loadAll, REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const sectionHeader = (icon: string, text: string) => (
    <div className="flex items-center mb-2 gap-2">
      <span aria-label={text} className="text-2xl">{icon}</span>
      <h2 className="text-lg font-bold text-[#0033A0]">{text}</h2>
    </div>
  );

  const card = (article: Article, idx: number) => (
    <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
      className="block bg-white hover:bg-blue-100 rounded-lg p-4 mb-3 shadow transition-all"
      aria-label={`Read more: ${article.title}`}> 
      <div className="font-semibold text-[#EF3340] mb-1">{article.title}</div>
      <div className="text-gray-700 text-sm mb-2">{article.description}</div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{article.source?.name}</span>
        <span>{new Date(article.publishedAt).toLocaleString()}</span>
      </div>
    </a>
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 sticky top-20 z-40 bg-white/90 p-4 rounded-xl shadow-lg font-['Inter'] w-full max-w-[1600px] mx-auto"
      style={{ minHeight: 400 }}>
      <div className="absolute right-8 top-4 text-xs text-gray-600">
        {refreshing ? "Refreshing..." : lastUpdated && <>Last updated: {lastUpdated.toLocaleTimeString()}</>}
      </div>
      {error && <div className="w-full text-center text-red-600 font-bold">{error}</div>}
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        {sectionHeader("🇨🇴", "Noticias sobre Gustavo Petro (Colombia)")}
        {loading && colombianNews.length === 0 ? (
          <div className="flex items-center justify-center h-40" aria-busy="true">
            <span className="animate-spin text-3xl mr-2">⏳</span> Cargando...
          </div>
        ) : (
          colombianNews.map(card)
        )}
      </div>
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        {sectionHeader("🇦🇺", "Australian PM & Donald Trump")}
        {loading && australianPmTrumpNews.length === 0 ? (
          <div className="flex items-center justify-center h-40" aria-busy="true">
            <span className="animate-spin text-3xl mr-2">⏳</span> Loading...
          </div>
        ) : (
          australianPmTrumpNews.map(card)
        )}
      </div>
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        {sectionHeader("🌎", "Major Politics Events")}
        {loading && politicsNews.length === 0 ? (
          <div className="flex items-center justify-center h-40" aria-busy="true">
            <span className="animate-spin text-3xl mr-2">⏳</span> Loading...
          </div>
        ) : (
          politicsNews.map(card)
        )}
      </div>
    </div>
  );
}