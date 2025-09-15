import React, { useEffect, useState } from 'react';
import { Article, getMockNews } from './data/mockNewsData';

// Mock fetch function that simulates API delay and returns mock data
const fetchNews = async (category: 'colombian' | 'trump' | 'rightWing' | 'politics'): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  return getMockNews(category);
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
        const [co, trump, politics, rightWing] = await Promise.all([
          fetchNews('colombian'),
          fetchNews('trump'),
          fetchNews('politics'),
          fetchNews('rightWing'),
        ]);
        setColombianNews(co);
        setAustralianPmTrumpNews(trump);
        setPoliticsNews(politics);
        setRightWingNews(rightWing);
      } catch (error) {
        console.error('Error loading news:', error);
        // Even on error, we have mock data, so we can still show content
        setColombianNews(getMockNews('colombian'));
        setAustralianPmTrumpNews(getMockNews('trump'));
        setPoliticsNews(getMockNews('politics'));
        setRightWingNews(getMockNews('rightWing'));
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
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Donald Trump & US Politics</h2>
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