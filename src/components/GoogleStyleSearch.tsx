import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSettings, FiUser, FiFilter, FiGrid, FiList, FiPlay } from 'react-icons/fi';
import { searchService, SearchResult, SearchResponse } from '../services/searchService';

interface GoogleStyleSearchProps {
  onResults?: (response: SearchResponse) => void;
  initialQuery?: string;
  initialTab?: SearchTab;
}

export type SearchTab = 'all' | 'news' | 'images' | 'videos' | 'shopping' | 'articles' | 'local';

interface SearchSettings {
  region: 'colombia' | 'global';
  language: 'es' | 'en';
  safeSearch: 'strict' | 'moderate' | 'off';
  timeRange: 'any' | 'day' | 'week' | 'month' | 'year';
}

const GoogleStyleSearch: React.FC<GoogleStyleSearchProps> = ({
  onResults,
  initialQuery = '',
  initialTab = 'all'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SearchSettings>({
    region: 'colombia',
    language: 'es',
    safeSearch: 'moderate',
    timeRange: 'any'
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchTabs: { id: SearchTab; label: string; icon: string }[] = [
    { id: 'all', label: 'Todo', icon: '🌐' },
    { id: 'news', label: 'Noticias', icon: '📰' },
    { id: 'images', label: 'Imágenes', icon: '🖼️' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'shopping', label: 'Marketplace', icon: '🛒' },
    { id: 'articles', label: 'Artículos', icon: '📄' },
    { id: 'local', label: 'Local', icon: '📍' }
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const categoryMap: Record<SearchTab, string> = {
        all: 'todos',
        news: 'politica',
        images: 'multimedia',
        videos: 'multimedia',
        shopping: 'participacion',
        articles: 'analisis',
        local: 'local'
      };

      const response = await searchService.search({
        query: searchQuery,
        category: categoryMap[activeTab],
        sortBy: activeTab === 'news' ? 'date' : 'relevance',
        page: 1,
        limit: 20
      });

      setSearchResults(response);
      onResults?.(response);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (value: string) => {
    setQuery(value);
    
    if (value.length > 2) {
      try {
        const suggestions = await searchService.getSearchSuggestions(value);
        setSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Suggestions error:', error);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const formatResultCount = (total: number, time: number): string => {
    return `Aproximadamente ${total.toLocaleString('es-CO')} resultados (${(time / 1000).toFixed(2)} segundos)`;
  };

  const renderResultCard = (result: SearchResult, index: number) => {
    return (
      <div key={result.id} className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
        viewMode === 'grid' ? 'p-4' : 'p-6 border-l-4 border-blue-500'
      }`}>
        {/* Result Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              {result.category}
            </span>
            <span className="text-xs text-gray-500">
              {result.relevanceScore}% relevancia
            </span>
            {activeTab === 'videos' && (
              <FiPlay className="text-red-500 w-4 h-4" />
            )}
          </div>
          <span className="text-xs text-gray-400">
            {new Date(result.timestamp).toLocaleDateString('es-CO')}
          </span>
        </div>

        {/* Title and Source */}
        <div className="mb-3">
          <a 
            href={result.url} 
            className="text-lg font-semibold text-blue-700 hover:underline line-clamp-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.title}
          </a>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-green-600 font-medium">{result.source}</span>
            {result.author && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">{result.author}</span>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">
          {result.summary}
        </p>

        {/* Tags */}
        {result.tags && result.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Rich media preview for videos/images */}
        {(activeTab === 'videos' || activeTab === 'images') && result.image && (
          <div className="mt-3 relative">
            <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
              <span className="text-4xl">{result.image}</span>
              {activeTab === 'videos' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <FiPlay className="text-white w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <div className="flex items-center space-x-4 mr-8">
              <img src="/favicon.ico" alt="Nuestro Pulso" className="w-8 h-8" />
              <span className="font-bold text-xl text-gray-900">Nuestro Pulso</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative" ref={suggestionsRef}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Buscar noticias, debates, encuestas..."
                  className="w-full px-4 py-3 pl-12 pr-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? '...' : 'Buscar'}
                </button>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <FiSearch className="text-gray-400 w-4 h-4" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              title="Configuración de búsqueda"
            >
              <FiSettings className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              title="Perfil de usuario"
            >
              <FiUser className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Tabs */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (query) handleSearch();
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* View Controls */}
          {searchResults && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Vista de lista"
              >
                <FiList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Vista de cuadrícula"
              >
                <FiGrid className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Search Settings Panel */}
        {showSettings && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
                <select
                  value={settings.region}
                  onChange={(e) => setSettings({...settings, region: e.target.value as 'colombia' | 'global'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="colombia">🇨🇴 Colombia</option>
                  <option value="global">🌐 Global</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value as 'es' | 'en'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                <select
                  value={settings.timeRange}
                  onChange={(e) => setSettings({...settings, timeRange: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="any">Cualquier momento</option>
                  <option value="day">Último día</option>
                  <option value="week">Última semana</option>
                  <option value="month">Último mes</option>
                  <option value="year">Último año</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Búsqueda segura</label>
                <select
                  value={settings.safeSearch}
                  onChange={(e) => setSettings({...settings, safeSearch: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="strict">Estricta</option>
                  <option value="moderate">Moderada</option>
                  <option value="off">Desactivada</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="p-4">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Buscando...</span>
          </div>
        )}

        {searchResults && !isLoading && (
          <>
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {formatResultCount(searchResults.totalResults, searchResults.searchTime)}
              </p>
              {settings.region === 'colombia' && (
                <p className="text-xs text-blue-600 mt-1">
                  🇨🇴 Priorizando fuentes locales y contenido colombiano
                </p>
              )}
            </div>

            {/* Results Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {searchResults.results.map((result, index) => renderResultCard(result, index))}
            </div>

            {/* Pagination */}
            {searchResults.hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    // TODO: Implement pagination
                    console.log('Load more results');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cargar más resultados
                </button>
              </div>
            )}
          </>
        )}

        {searchResults && !isLoading && searchResults.results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-600 mb-6">
              Intenta con palabras diferentes o revisa la ortografía
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Búsquedas populares:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {searchService.getPopularQueries().map((popularQuery, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(popularQuery);
                      handleSearch(popularQuery);
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {popularQuery}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleStyleSearch;