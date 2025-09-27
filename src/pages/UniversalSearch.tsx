import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaFilter, 
  FaSort, 
  FaList, 
  FaTh, 
  FaChartLine,
  FaGlobe,
  FaMapMarkerAlt,
  FaLanguage,
  FaCalendarAlt,
  FaTimes
} from 'react-icons/fa';
import EnhancedSearchBar from '../components/EnhancedSearchBar';
import UnifiedContentCard from '../components/UnifiedContentCard';
import APIStatusDashboard from '../components/APIStatusDashboard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { SearchResults, ContentItem, TrendingTopic, ShareOptions, FactCheckResult } from '../types/api';
import apiManager from '../services/apiManager';

interface UniversalSearchProps {
  onNavigate?: (view: string, params?: any) => void;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ onNavigate }) => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'popularity'>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['es']);
  const [dateRange, setDateRange] = useState<'any' | 'today' | 'week' | 'month' | 'year'>('any');
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const contentTypes = [
    { id: 'video', name: 'Videos', icon: '🎥' },
    { id: 'article', name: 'Artículos', icon: '📰' },
    { id: 'post', name: 'Posts', icon: '📝' },
    { id: 'reel', name: 'Reels', icon: '🎬' },
    { id: 'story', name: 'Historias', icon: '📖' }
  ];

  const languages = [
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'en', name: 'English', flag: '🇺🇸' }
  ];

  // Load trending topics on mount
  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    try {
      const topics = await apiManager.getTrendingTopics('Colombia');
      setTrendingTopics(topics);
    } catch (error) {
      console.error('Failed to load trending topics:', error);
    }
  };

  const handleSearchResults = useCallback((results: SearchResults) => {
    setSearchResults(results);
    setCurrentQuery(results.items.length > 0 ? 'búsqueda actual' : '');
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleShare = (options: ShareOptions) => {
    // Implementation for sharing content
    console.log('Sharing content:', options);
  };

  const handleBookmark = (content: ContentItem) => {
    // Implementation for bookmarking
    console.log('Bookmarked:', content.title);
  };

  const handleFactCheck = async (content: ContentItem): Promise<FactCheckResult> => {
    // Mock fact-checking - in real implementation, this would call a fact-checking API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isVerified: Math.random() > 0.3,
          source: 'FactCheck.org',
          confidence: 0.8 + Math.random() * 0.2,
          explanation: 'Esta información ha sido verificada por nuestros sistemas de fact-checking.',
          lastChecked: new Date()
        });
      }, 2000);
    });
  };

  const applyFilters = (items: ContentItem[]): ContentItem[] => {
    let filtered = [...items];

    // Filter by content type
    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter(item => selectedContentTypes.includes(item.contentType));
    }

    // Filter by language
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(item => selectedLanguages.includes(item.language));
    }

    // Filter by date range
    if (dateRange !== 'any') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (dateRange) {
        case 'today':
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.publishedAt) >= cutoffDate);
    }

    return filtered;
  };

  const sortResults = (items: ContentItem[]): ContentItem[] => {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      case 'popularity':
        return sorted.sort((a, b) => {
          const aScore = (a.stats.views || 0) + (a.stats.likes || 0) * 2 + (a.stats.shares || 0) * 3;
          const bScore = (b.stats.views || 0) + (b.stats.likes || 0) * 2 + (b.stats.shares || 0) * 3;
          return bScore - aScore;
        });
      case 'relevance':
      default:
        return sorted; // Already sorted by relevance from API
    }
  };

  const toggleContentType = (typeId: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages(prev => 
      prev.includes(langId) 
        ? prev.filter(id => id !== langId)
        : [...prev, langId]
    );
  };

  const clearFilters = () => {
    setSelectedContentTypes([]);
    setSelectedLanguages(['es']);
    setDateRange('any');
  };

  const getFilteredAndSortedResults = (): ContentItem[] => {
    if (!searchResults) return [];
    const filtered = applyFilters(searchResults.items);
    return sortResults(filtered);
  };

  const filteredResults = getFilteredAndSortedResults();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <EnhancedSearchBar
            onResults={handleSearchResults}
            onLoadingChange={handleLoadingChange}
            autoFocus={true}
            className="mb-6"
          />

          {/* Trending Topics */}
          {trendingTopics.length > 0 && !searchResults && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">🔥 Tendencias en Colombia</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.slice(0, 8).map((topic, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                    onClick={() => {
                      // Trigger search for trending topic
                      // This would need to be implemented to trigger the search bar
                    }}
                  >
                    {topic.topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* API Status */}
            <APIStatusDashboard compact={true} />

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <FaFilter />
                  <span>Filtros</span>
                </h3>
                {(selectedContentTypes.length > 0 || selectedLanguages.length > 1 || dateRange !== 'any') && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4">
                {/* Content Type */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tipo de contenido</h4>
                  <div className="space-y-2">
                    {contentTypes.map((type) => (
                      <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedContentTypes.includes(type.id)}
                          onChange={() => toggleContentType(type.id)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{type.icon} {type.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Idioma</h4>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <label key={lang.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(lang.id)}
                          onChange={() => toggleLanguage(lang.id)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{lang.flag} {lang.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Fecha</h4>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="any">Cualquier momento</option>
                    <option value="today">Último día</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="year">Último año</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Analytics */}
            {searchResults && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaChartLine />
                    <span>Análisis</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total resultados:</span>
                    <span className="font-semibold">{searchResults.totalCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tiempo de búsqueda:</span>
                    <span className="font-semibold">{searchResults.executionTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fuentes activas:</span>
                    <span className="font-semibold">{searchResults.sources.length}</span>
                  </div>
                  
                  {/* Sources */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">Fuentes utilizadas:</div>
                    <div className="flex flex-wrap gap-1">
                      {searchResults.sources.map((source) => (
                        <span 
                          key={source.id}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {source.icon} {source.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="flex-1">
            {searchResults && (
              <div className="mb-6">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {filteredResults.length.toLocaleString()} resultados
                      {currentQuery && <span className="text-gray-500"> para "{currentQuery}"</span>}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="relevance">Más relevante</option>
                      <option value="date">Más reciente</option>
                      <option value="popularity">Más popular</option>
                    </select>

                    {/* View Mode */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      >
                        <FaTh />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      >
                        <FaList />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Grid/List */}
                {isLoading ? (
                  <LoadingSkeleton />
                ) : filteredResults.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredResults.map((item) => (
                      <UnifiedContentCard
                        key={item.id}
                        content={item}
                        onShare={handleShare}
                        onBookmark={handleBookmark}
                        onFactCheck={handleFactCheck}
                        size={viewMode === 'list' ? 'large' : 'medium'}
                        showFullDescription={viewMode === 'list'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-600">
                      Intenta con diferentes términos de búsqueda o ajusta los filtros
                    </p>
                  </div>
                )}

                {/* Load More */}
                {searchResults.hasMore && !isLoading && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        // Implementation for loading more results
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Cargar más resultados
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!searchResults && !isLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌐</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Búsqueda Universal
                </h2>
                <p className="text-gray-600 mb-6">
                  Busca contenido de todas las plataformas y fuentes en un solo lugar
                </p>
                <div className="max-w-md mx-auto">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl mb-2">📺</div>
                      <div className="text-sm text-gray-600">Videos</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">📰</div>
                      <div className="text-sm text-gray-600">Noticias</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-sm text-gray-600">Redes Sociales</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🏛️</div>
                      <div className="text-sm text-gray-600">Cívico</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalSearch;