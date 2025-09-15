import React, { useEffect, useState } from 'react';
import { newsArticles, getNewsByTopic, getNewsByCategory, getTrendingNews, type NewsArticle } from './data/newsData';

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<NewsArticle[]>([]);
  const [trumpNews, setTrumpNews] = useState<NewsArticle[]>([]);
  const [politicsNews, setPoliticsNews] = useState<NewsArticle[]>([]);
  const [rightWingNews, setRightWingNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    setTimeout(() => {
      // Get comprehensive news by topics and categories
      const colombian = getNewsByCategory('politics').concat(getNewsByCategory('social'));
      const trump = getNewsByTopic('Donald Trump');
      const politics = getNewsByCategory('international').concat(getNewsByTopic('Congress'));
      const rightWing = getNewsByCategory('economics').concat(getNewsByCategory('politics'));
      
      setColombianNews(colombian.slice(0, 6));
      setTrumpNews(trump);
      setPoliticsNews(politics.slice(0, 6));
      setRightWingNews(rightWing.slice(0, 6));
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Noticias Colombia (Política & Social)</h2>
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Cargando noticias...</span>
          </div>
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Donald Trump Noticias</h2>
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Cargando noticias...</span>
          </div>
        ) : (
          trumpNews.map((article, idx) => (
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
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
            <span>Cargando noticias...</span>
          </div>
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Major Politics & Congress</h2>
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Cargando noticias...</span>
          </div>
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