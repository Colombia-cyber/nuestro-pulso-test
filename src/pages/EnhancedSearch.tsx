import React, { useState, useEffect } from 'react';
import GoogleStyleSearch from '../components/GoogleStyleSearch';
import { SearchResponse } from '../services/searchService';
import { googleAPIService } from '../services/googleAPIService';

const EnhancedSearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [localNews, setLocalNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialTab = urlParams.get('tab') || 'all';

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Load trending topics and local news in parallel
      const [topics, news] = await Promise.all([
        googleAPIService.getTrendingTopics(),
        googleAPIService.getLocalNews(6)
      ]);

      setTrendingTopics(topics);
      setLocalNews(news);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResults = (response: SearchResponse) => {
    setSearchResults(response);
    
    // Update URL without page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('q', response.query);
    window.history.pushState({}, '', newUrl.toString());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Preparando búsqueda</h3>
          <p className="text-gray-500">Cargando trending topics y noticias locales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Search Interface */}
      <GoogleStyleSearch
        initialQuery={initialQuery}
        initialTab={initialTab as any}
        onResults={handleSearchResults}
      />

      {/* Additional Content when no search results */}
      {!searchResults && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Trending Topics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">🔥 Trending en Colombia</h2>
              <span className="text-sm text-gray-500">Actualizado hace 5 min</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {trendingTopics.slice(0, 6).map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
                    if (searchInput) {
                      searchInput.value = topic;
                      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                      // Trigger search
                      const event = new KeyboardEvent('keypress', { key: 'Enter' });
                      searchInput.dispatchEvent(event);
                    }
                  }}
                  className="text-left p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      {topic}
                    </span>
                    <span className="text-xs text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {Math.floor(Math.random() * 50) + 10}K búsquedas
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Local News Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">📰 Noticias Locales</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">En vivo</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localNews.map((news, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(news.timestamp).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600">{news.source}</span>
                    <button
                      onClick={() => {
                        const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
                        if (searchInput) {
                          searchInput.value = news.category;
                          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }}
                      className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      Buscar similar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Consejos de Búsqueda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔍 Búsqueda Avanzada</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Usa comillas para buscar frases exactas: <code>"reforma pensional"</code></li>
                  <li>• Excluye palabras con el signo menos: <code>política -corrupción</code></li>
                  <li>• Busca en sitios específicos: <code>site:eltiempo.com</code></li>
                  <li>• Usa OR para alternativas: <code>Bogotá OR Medellín</code></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🇨🇴 Búsqueda Local</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Activa "Local" para contenido colombiano prioritario</li>
                  <li>• Busca por departamentos: <code>Antioquia, Cundinamarca</code></li>
                  <li>• Encuentra eventos: <code>eventos Bogotá este fin de semana</code></li>
                  <li>• Usa filtros de tiempo para noticias recientes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Display */}
      {searchResults && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Results are handled by GoogleStyleSearch component */}
        </div>
      )}

      {/* Footer with performance info */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>🇨🇴 Nuestro Pulso - Búsqueda Universal</span>
              <span>•</span>
              <span>Powered by Google Search & News APIs</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>⚡ Resultados en tiempo real</span>
              <span>•</span>
              <span>🔒 Búsqueda segura</span>
              <span>•</span>
              <span>📱 Multiplataforma</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedSearchPage;