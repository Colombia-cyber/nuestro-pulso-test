import React, { useState, useEffect } from 'react';
import { fetchColombianNews, fetchAustralianPmTrumpNews, fetchPoliticsNews, Article } from '../utils/news.ts';
import { searchGoogleAPI, SearchResult } from '../utils/search.ts';
import { saveFavorite } from '../firebase.js';

type CombinedResult = {
  type: 'news' | 'search';
  title: string;
  description?: string;
  snippet?: string;
  url: string;
  source?: string;
  publishedAt?: string;
  timestamp: Date;
};

const CombinedResults: React.FC = () => {
  const [combinedResults, setCombinedResults] = useState<CombinedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('política Colombia');
  const [savingFavorites, setSavingFavorites] = useState<Set<string>>(new Set());

  const loadCombinedResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch news and search results in parallel
      const [newsResults, searchResults] = await Promise.all([
        Promise.all([
          fetchColombianNews(),
          fetchAustralianPmTrumpNews(),
          fetchPoliticsNews()
        ]).then(results => results.flat()),
        searchGoogleAPI(searchQuery)
      ]);

      // Convert to combined format and sort by recency
      const newsItems: CombinedResult[] = newsResults.map(article => ({
        type: 'news' as const,
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source?.name,
        publishedAt: article.publishedAt,
        timestamp: new Date(article.publishedAt)
      }));

      const searchItems: CombinedResult[] = searchResults.map(result => ({
        type: 'search' as const,
        title: result.title,
        snippet: result.snippet,
        url: result.link,
        timestamp: new Date() // Search results don't have timestamps, use current time
      }));

      const combined = [...newsItems, ...searchItems]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20); // Limit to 20 most recent results

      setCombinedResults(combined);
    } catch (err) {
      console.error('Failed to load combined results:', err);
      setError(err instanceof Error ? err.message : 'Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCombinedResults();
  }, [searchQuery]);

  const handleSaveFavorite = async (result: CombinedResult) => {
    setSavingFavorites(prev => new Set([...prev, result.url]));
    
    try {
      const saveResult = await saveFavorite({
        type: result.type,
        title: result.title,
        description: result.description,
        url: result.url,
        source: result.source,
        publishedAt: result.publishedAt,
        snippet: result.snippet
      });
      
      if (saveResult.success) {
        alert('Resultado guardado en favoritos!');
      } else {
        alert(saveResult.message || 'Error al guardar en favoritos');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Error al guardar en favoritos');
    } finally {
      setSavingFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(result.url);
        return newSet;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0033A0] mb-4">Resultados Combinados</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cambiar término de búsqueda..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent"
          />
          <button
            onClick={loadCombinedResults}
            disabled={loading}
            className="bg-[#0033A0] hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={loadCombinedResults}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]"></div>
          <span className="ml-3 text-[#0033A0] font-medium">Cargando resultados combinados...</span>
        </div>
      )}

      <div className="space-y-4">
        {combinedResults.map((result, idx) => (
          <div key={`${result.type}-${idx}`} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-[#0033A0]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  result.type === 'news' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {result.type === 'news' ? '📰 Noticia' : '🔍 Búsqueda'}
                </span>
                {result.source && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {result.source}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {result.publishedAt 
                  ? new Date(result.publishedAt).toLocaleString()
                  : 'Reciente'
                }
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-[#EF3340] mb-2">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {result.title}
              </a>
            </h3>
            
            <p className="text-gray-700 mb-4">
              {result.description || result.snippet}
            </p>
            
            <div className="flex gap-2">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0033A0] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
              >
                Ver completo
              </a>
              <button
                onClick={() => handleSaveFavorite(result)}
                disabled={savingFavorites.has(result.url)}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-yellow-900 px-4 py-2 rounded text-sm font-medium transition"
              >
                {savingFavorites.has(result.url) ? 'Guardando...' : '⭐ Favorito'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && combinedResults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-medium mb-2">No hay resultados disponibles</h3>
          <p>Intenta cambiar el término de búsqueda o vuelve a intentar más tarde.</p>
        </div>
      )}
    </div>
  );
};

export default CombinedResults;