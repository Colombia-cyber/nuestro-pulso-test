import React, { useEffect, useState } from 'react';
import { Article } from './types/news';
import { getNewsByCategory } from './data/mockNewsData';

// Simulate API delay for realistic loading experience
const fetchNewsWithDelay = async (category: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  return getNewsByCategory(category);
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
      try {
        const [co, auPmTrump, congress, rightWing] = await Promise.all([
          fetchNewsWithDelay('colombia'),
          fetchNewsWithDelay('trump'),
          fetchNewsWithDelay('congress'),
          fetchNewsWithDelay('rightWing'),
        ]);
        setColombianNews(co);
        setAustralianPmTrumpNews(auPmTrump);
        setPoliticsNews(congress);
        setRightWingNews(rightWing);
      } catch (error) {
        console.error('Error loading news:', error);
        // Fallback to empty arrays or show error message
        setColombianNews([]);
        setAustralianPmTrumpNews([]);
        setPoliticsNews([]);
        setRightWingNews([]);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Noticias sobre Gustavo Petro (Colombia)</h2>
        {loading ? (
          <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ) : colombianNews.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">No hay noticias disponibles en este momento.</p>
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Donald Trump & Colombia Relations</h2>
        {loading ? (
          <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ) : australianPmTrumpNews.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">No hay noticias disponibles en este momento.</p>
          </div>
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Conservative Politics & Elections</h2>
        {loading ? (
          <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ) : rightWingNews.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">No hay noticias disponibles en este momento.</p>
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Colombian Congress & Politics</h2>
        {loading ? (
          <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        ) : politicsNews.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">No hay noticias disponibles en este momento.</p>
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