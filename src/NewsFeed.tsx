import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

// Validate required News API key
const NEWS_API_KEY = import.meta.env.VITE_NEWSAPI_KEY;

if (!NEWS_API_KEY) {
  throw new Error(
    'Missing required environment variable: VITE_NEWSAPI_KEY. ' +
    'Please add your News API key to the .env file.'
  );
}

const fetchNews = async (params: string) => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
  );
  const data = await res.json();
  return data.articles || [];
};

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [rightWingNews, setRightWingNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [co, auPmTrump, politics, rightWing] = await Promise.all([
        fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt'),
        fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt'),
        fetchNews('q=politics&language=en&sortBy=publishedAt'),
        fetchNews('q=(conservative OR "right wing" OR republican OR "Centro Democratico" OR "election polls" OR "conservative candidate")&language=en&sortBy=publishedAt'),
      ]);
      setColombianNews(co);
      setAustralianPmTrumpNews(auPmTrump);
      setPoliticsNews(politics);
      setRightWingNews(rightWing);
      setLoading(false);
    }
    loadAll();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
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
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
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
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Right Wing & Election Coverage</h2>
        {loading && rightWingNews.length === 0 ? (
          <div>Loading...</div>
        ) : (
          rightWingNews.map((article, idx) => (
            <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
              className="block bg-white hover:bg-orange-50 rounded-lg p-2 mb-2 shadow transition">
              <div className="font-semibold text-[#E65100]">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1">{article.description}</div>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
              </div>
            </a>
          ))
        )}
      </div>
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
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