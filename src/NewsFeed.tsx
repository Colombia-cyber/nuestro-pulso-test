import React, { useEffect, useState } from 'react';
import Card from './components/Card';

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
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded mb-1"></div>
    <div className="h-3 bg-gray-200 rounded mb-1"></div>
    <div className="flex justify-between mt-2">
      <div className="h-2 bg-gray-200 rounded w-1/3"></div>
      <div className="h-2 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const NewsCard = ({ article }: { article: Article }) => (
  <Card hoverable className="mb-4 h-auto group" onClick={() => window.open(article.url, '_blank')}>
    <div className="font-bold text-red-600 mb-3 text-lg leading-tight group-hover:text-red-700 transition-colors">
      {article.title}
    </div>
    <div className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-3">
      {article.description}
    </div>
    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
      <span className="font-medium text-blue-600">{article.source?.name}</span>
      <span>{new Date(article.publishedAt).toLocaleDateString('es-CO')}</span>
    </div>
  </Card>
);

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [co, auPmTrump, politics] = await Promise.all([
        fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt'),
        fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt'),
        fetchNews('q=politics&language=en&sortBy=publishedAt'),
      ]);
      setColombianNews(co.slice(0, 5)); // Limit to 5 articles
      setAustralianPmTrumpNews(auPmTrump.slice(0, 5));
      setPoliticsNews(politics.slice(0, 5));
      setLoading(false);
    }
    loadAll();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📰 Centro de Noticias</h2>
        <p className="text-gray-600">Mantente informado con las últimas noticias políticas</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colombian News */}
        <div className="space-y-4">
          <div className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold">🇨🇴 Noticias Colombia</h3>
          </div>
          <div className="h-[60vh] overflow-y-auto pr-2 space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, idx) => (
                <Card key={idx} padding="md">
                  <LoadingSkeleton />
                </Card>
              ))
            ) : (
              colombianNews.map((article, idx) => (
                <NewsCard key={idx} article={article} />
              ))
            )}
          </div>
        </div>

        {/* Australian PM & Trump News */}
        <div className="space-y-4">
          <div className="flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold">🇦🇺🇺🇸 PM & Trump</h3>
          </div>
          <div className="h-[60vh] overflow-y-auto pr-2 space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, idx) => (
                <Card key={idx} padding="md">
                  <LoadingSkeleton />
                </Card>
              ))
            ) : (
              australianPmTrumpNews.map((article, idx) => (
                <NewsCard key={idx} article={article} />
              ))
            )}
          </div>
        </div>

        {/* Politics News */}
        <div className="space-y-4">
          <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold">🌍 Política Global</h3>
          </div>
          <div className="h-[60vh] overflow-y-auto pr-2 space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, idx) => (
                <Card key={idx} padding="md">
                  <LoadingSkeleton />
                </Card>
              ))
            ) : (
              politicsNews.map((article, idx) => (
                <NewsCard key={idx} article={article} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}