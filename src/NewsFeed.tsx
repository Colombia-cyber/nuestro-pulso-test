import React, { useEffect, useState } from 'react';
import { fetchColombianNews, fetchAustralianPmTrumpNews, fetchPoliticsNews, Article } from './utils/news.ts';
import { saveFavorite } from './firebase.js';

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [savingFavorites, setSavingFavorites] = useState<Set<string>>(new Set());

  const handleSaveFavorite = async (article: Article) => {
    setSavingFavorites(prev => new Set([...prev, article.url]));
    
    try {
      const result = await saveFavorite({
        type: 'news',
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source?.name,
        publishedAt: article.publishedAt
      });
      
      if (result.success) {
        alert('Artículo guardado en favoritos!');
      } else {
        alert(result.message || 'Error al guardar en favoritos');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Error al guardar en favoritos');
    } finally {
      setSavingFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(article.url);
        return newSet;
      });
    }
  };

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      setError(null);
      
      try {
        const [co, auPmTrump, politics] = await Promise.all([
          fetchColombianNews(),
          fetchAustralianPmTrumpNews(),
          fetchPoliticsNews(),
        ]);
        setColombianNews(co);
        setAustralianPmTrumpNews(auPmTrump);
        setPoliticsNews(politics);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError(err instanceof Error ? err.message : 'Failed to load news');
        // Set fallback content
        setColombianNews([]);
        setAustralianPmTrumpNews([]);
        setPoliticsNews([]);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      {error && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <div>
              <strong>Error loading news:</strong> {error}
            </div>
            <button 
              onClick={handleRetry}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Noticias sobre Gustavo Petro (Colombia)</h2>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]"></div>
            <span className="ml-2">Cargando...</span>
          </div>
        ) : colombianNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No hay noticias disponibles en este momento.</p>
            <button 
              onClick={handleRetry}
              className="mt-2 bg-[#0033A0] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          colombianNews.map((article, idx) => (
            <div key={idx} className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="font-semibold text-[#EF3340]">{article.title}</div>
                <div className="text-gray-700 text-sm mt-1">{article.description}</div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  <span>{article.source?.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleString()}</span>
                </div>
              </a>
              <button
                onClick={() => handleSaveFavorite(article)}
                disabled={savingFavorites.has(article.url)}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-yellow-900 px-3 py-1 rounded text-xs font-medium transition"
              >
                {savingFavorites.has(article.url) ? 'Guardando...' : '⭐ Favorito'}
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Australian PM & Donald Trump</h2>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]"></div>
            <span className="ml-2">Loading...</span>
          </div>
        ) : australianPmTrumpNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No news available at the moment.</p>
            <button 
              onClick={handleRetry}
              className="mt-2 bg-[#0033A0] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Try again
            </button>
          </div>
        ) : (
          australianPmTrumpNews.map((article, idx) => (
            <div key={idx} className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="font-semibold text-[#EF3340]">{article.title}</div>
                <div className="text-gray-700 text-sm mt-1">{article.description}</div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  <span>{article.source?.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleString()}</span>
                </div>
              </a>
              <button
                onClick={() => handleSaveFavorite(article)}
                disabled={savingFavorites.has(article.url)}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-yellow-900 px-3 py-1 rounded text-xs font-medium transition"
              >
                {savingFavorites.has(article.url) ? 'Saving...' : '⭐ Favorite'}
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Major Politics Events</h2>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]"></div>
            <span className="ml-2">Loading...</span>
          </div>
        ) : politicsNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No news available at the moment.</p>
            <button 
              onClick={handleRetry}
              className="mt-2 bg-[#0033A0] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Try again
            </button>
          </div>
        ) : (
          politicsNews.map((article, idx) => (
            <div key={idx} className="block bg-white hover:bg-blue-50 rounded-lg p-2 mb-2 shadow transition">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="font-semibold text-[#EF3340]">{article.title}</div>
                <div className="text-gray-700 text-sm mt-1">{article.description}</div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  <span>{article.source?.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleString()}</span>
                </div>
              </a>
              <button
                onClick={() => handleSaveFavorite(article)}
                disabled={savingFavorites.has(article.url)}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-yellow-900 px-3 py-1 rounded text-xs font-medium transition"
              >
                {savingFavorites.has(article.url) ? 'Saving...' : '⭐ Favorite'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}