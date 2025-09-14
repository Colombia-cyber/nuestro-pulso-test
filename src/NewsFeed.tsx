import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

const fetchNews = async (params: string) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.warn('Failed to fetch news:', error);
    return []; // Return empty array on error
  }
};

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        const [co, auPmTrump, politics] = await Promise.all([
          fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt'),
          fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt'),
          fetchNews('q=politics&language=en&sortBy=publishedAt'),
        ]);
        setColombianNews(co);
        setAustralianPmTrumpNews(auPmTrump);
        setPoliticsNews(politics);
      } catch (error) {
        console.error('Error loading news:', error);
        // Optionally set some fallback content here
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Noticias sobre Gustavo Petro (Colombia)</h2>
        {loading && colombianNews.length === 0 ? (
          <div>Cargando...</div>
        ) : (
          colombianNews.map((article, idx) => (
            <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
              className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <div className="font-semibold text-[#EF3340]">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1">{article.description}</div>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
              </div>
            </a>
          ))
        )}
      </div>
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Australian PM & Donald Trump</h2>
        {loading && australianPmTrumpNews.length === 0 ? (
          <div>Loading...</div>
        ) : (
          australianPmTrumpNews.map((article, idx) => (
            <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
              className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <div className="font-semibold text-[#EF3340]">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1">{article.description}</div>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
              </div>
            </a>
          ))
        )}
      </div>
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Major Politics Events</h2>
        {loading && politicsNews.length === 0 ? (
          <div>Loading...</div>
        ) : (
          politicsNews.map((article, idx) => (
            <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
              className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <div className="font-semibold text-[#EF3340]">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1">{article.description}</div>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}