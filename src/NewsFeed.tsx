import React, { useEffect, useState } from 'react';
import { useRealtimeNews } from './hooks/useRealtimeNews';
import { useRealtime } from './contexts/RealtimeContext.tsx';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

export default function NewsFeed() {
  const { isOnline, newsUpdates } = useRealtime();
  
  // Use real-time news hooks for different categories
  const {
    articles: colombianNews,
    loading: loadingColombian,
    lastUpdated: lastUpdatedColombian,
    refresh: refreshColombian
  } = useRealtimeNews('q=Gustavo Petro&language=es&sortBy=publishedAt', {
    refreshInterval: 45000, // 45 seconds for Colombian news
    syncToFirestore: true
  });

  const {
    articles: australianPmTrumpNews,
    loading: loadingAuPmTrump,
    lastUpdated: lastUpdatedAuPmTrump,
    refresh: refreshAuPmTrump
  } = useRealtimeNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt', {
    refreshInterval: 60000, // 1 minute for international news
    syncToFirestore: true
  });

  const {
    articles: politicsNews,
    loading: loadingPolitics,
    lastUpdated: lastUpdatedPolitics,
    refresh: refreshPolitics
  } = useRealtimeNews('q=politics&language=en&sortBy=publishedAt', {
    refreshInterval: 90000, // 1.5 minutes for general politics
    syncToFirestore: true
  });

  const isAnyLoading = loadingColombian || loadingAuPmTrump || loadingPolitics;

  const handleRefresh = () => {
    refreshColombian();
    refreshAuPmTrump();
    refreshPolitics();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Real-time Status Header */}
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h1 className="text-xl font-bold text-[#0033A0]">
              📰 Noticias en Tiempo Real
            </h1>
            <span className="text-sm text-gray-600">
              {isOnline ? 'Conectado' : 'Sin conexión'}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isAnyLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isAnyLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAnyLoading ? '🔄 Actualizando...' : '🔄 Actualizar'}
          </button>
        </div>
        
        {/* Breaking news from Firebase real-time updates */}
        {newsUpdates.filter(update => update.isBreaking).length > 0 && (
          <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-center">
              <span className="text-red-600 font-bold mr-2">🚨 NOTICIA DE ÚLTIMO MOMENTO:</span>
              <span className="text-red-800">
                {newsUpdates.filter(update => update.isBreaking)[0]?.title}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
        <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-[#0033A0]">Noticias sobre Gustavo Petro (Colombia)</h2>
          {lastUpdatedColombian && (
            <span className="text-xs text-gray-500">
              {new Date(lastUpdatedColombian).toLocaleTimeString()}
            </span>
          )}
        </div>
        {loadingColombian && colombianNews.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Cargando...
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
      
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-[#0033A0]">Australian PM & Donald Trump</h2>
          {lastUpdatedAuPmTrump && (
            <span className="text-xs text-gray-500">
              {new Date(lastUpdatedAuPmTrump).toLocaleTimeString()}
            </span>
          )}
        </div>
        {loadingAuPmTrump && australianPmTrumpNews.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Loading...
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
      
      <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-[#0033A0]">Major Politics Events</h2>
          {lastUpdatedPolitics && (
            <span className="text-xs text-gray-500">
              {new Date(lastUpdatedPolitics).toLocaleTimeString()}
            </span>
          )}
        </div>
        {loadingPolitics && politicsNews.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Loading...
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
    </div>
  );
}