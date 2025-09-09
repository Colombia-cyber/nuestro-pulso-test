import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

const NEWS_API_KEY = '27aa99ad66064f04b9ef515c312a78eb'; // <-- Your NewsAPI key

const fetchNews = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=Gustavo%20Petro&sortBy=publishedAt&language=es&apiKey=${NEWS_API_KEY}`
  );
  const data = await res.json();
  return data.articles || [];
};

export default function NewsFeed() {
  const [petroNews, setPetroNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPetroNews() {
      setLoading(true);
      const news = await fetchNews();
      setPetroNews(news);
      setLoading(false);
    }
    loadPetroNews();
  }, []);

  return (
    <aside className="w-full h-[70vh] overflow-y-auto p-4 bg-white/80 shadow-lg rounded-xl font-['Inter']">
      <h2 className="text-xl font-bold mb-4 text-[#0033A0]">Noticias sobre Gustavo Petro</h2>
      {loading ? (
        <div>Cargando noticias...</div>
      ) : (
        petroNews.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white hover:bg-blue-50 rounded-lg p-4 mb-4 shadow transition"
          >
            <div className="font-semibold text-[#EF3340]">{article.title}</div>
            <div className="text-gray-700 text-sm mt-1">{article.description}</div>
            <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
              <span>{article.source?.name}</span>
              <span>{new Date(article.publishedAt).toLocaleString()}</span>
            </div>
          </a>
        ))
      )}
    </aside>
  );
}