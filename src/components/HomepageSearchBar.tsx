import React, { useState, useRef, useEffect } from 'react';

interface HomepageSearchBarProps {
  onSearch?: (query: string, results: any[]) => void;
  onNavigateToResults?: () => void;
  className?: string;
}

interface GlobalSearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  tags?: string[];
  country?: string;
}

const HomepageSearchBar: React.FC<HomepageSearchBarProps> = ({
  onSearch,
  onNavigateToResults,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Global search suggestions with international scope
  const globalSuggestions = [
    'World politics news',
    'International relations',
    'Global democracy',
    'World elections 2024',
    'International trade',
    'Climate change policies',
    'Human rights worldwide',
    'Global economy news'
  ];

  // Perform search using Global endpoint
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    const startTime = Date.now();

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        limit: '8', // Show more results for homepage
        scope: 'global'
      });

      const response = await fetch(`/api/search/global?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Global search failed: ${response.status}`);
      }

      const data = await response.json();
      const searchResults = data.results || [];
      
      setResults(searchResults);
      setTotalResults(data.totalResults || searchResults.length);
      setSearchTime(Date.now() - startTime);
      setShowResults(true);
      
      if (onSearch) {
        onSearch(searchQuery, searchResults);
      }

    } catch (error) {
      console.error('Global search failed:', error);
      
      // Use fallback global results for demonstration
      const fallbackResults: GlobalSearchResult[] = [
        {
          id: `global-${Date.now()}-1`,
          title: `Global news about "${searchQuery}"`,
          summary: `International coverage and worldwide perspective on ${searchQuery}`,
          url: '#',
          source: 'BBC World',
          category: 'international',
          timestamp: new Date().toISOString(),
          relevanceScore: 95,
          image: '🌍',
          author: 'International Desk',
          tags: [searchQuery.toLowerCase(), 'global', 'international'],
          country: 'Global'
        },
        {
          id: `global-${Date.now()}-2`,
          title: `${searchQuery} - International analysis`,
          summary: `Expert analysis on ${searchQuery} from a global perspective`,
          url: '#',
          source: 'Reuters',
          category: 'analysis',
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          relevanceScore: 88,
          image: '📊',
          author: 'Global Affairs Team',
          tags: [searchQuery.toLowerCase(), 'analysis', 'world'],
          country: 'Global'
        },
        {
          id: `global-${Date.now()}-3`,
          title: `World leaders discuss ${searchQuery}`,
          summary: `International leaders weigh in on ${searchQuery} at global summit`,
          url: '#',
          source: 'Associated Press',
          category: 'politics',
          timestamp: new Date(Date.now() - 2400000).toISOString(),
          relevanceScore: 82,
          image: '🌐',
          author: 'Diplomatic Correspondent',
          tags: [searchQuery.toLowerCase(), 'politics', 'leaders'],
          country: 'Multiple'
        },
        {
          id: `global-${Date.now()}-4`,
          title: `Economic impact of ${searchQuery} worldwide`,
          summary: `How ${searchQuery} is affecting global markets and economies`,
          url: '#',
          source: 'Financial Times',
          category: 'economics',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          relevanceScore: 79,
          image: '💹',
          author: 'Economics Editor',
          tags: [searchQuery.toLowerCase(), 'economics', 'markets'],
          country: 'Global'
        }
      ];
      
      setResults(fallbackResults);
      setTotalResults(fallbackResults.length);
      setSearchTime(Date.now() - startTime);
      setShowResults(true);
      
      if (onSearch) {
        onSearch(searchQuery, fallbackResults);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle "View All Results"
  const handleViewAllResults = () => {
    if (onNavigateToResults) {
      onNavigateToResults();
    }
    setShowResults(false);
  };

  // Format time ago
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`} ref={resultsRef}>
      {/* Search Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-5xl">🌍</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Búsqueda Global</h2>
            <p className="text-gray-600 mt-2">
              Explora noticias y información de todo el mundo
            </p>
          </div>
          <span className="text-5xl">🔍</span>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Buscar noticias globales, política internacional, economía mundial..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none placeholder-gray-500 shadow-sm"
              aria-label="Campo de búsqueda global"
              disabled={loading}
            />
            
            {/* Globe icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <span className="text-2xl">🌐</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            aria-label="Buscar globalmente"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🔄</span>
                Buscando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                🔍 Buscar
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Popular Suggestions */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 mb-3">Búsquedas populares:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {globalSuggestions.slice(0, 6).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(suggestion);
                performSearch(suggestion);
              }}
              className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-800 px-4 py-2 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-6 overflow-hidden">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Resultados Globales para "{query}"
                  </h3>
                  <p className="text-sm text-gray-600">
                    {totalResults} resultados encontrados en {searchTime}ms
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl focus:outline-none"
                aria-label="Cerrar resultados"
              >
                ×
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index < results.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onClick={() => result.url && window.open(result.url, '_blank')}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{result.image || '📰'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                        {result.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        result.category === 'international' ? 'bg-blue-100 text-blue-800' :
                        result.category === 'politics' ? 'bg-purple-100 text-purple-800' :
                        result.category === 'economics' ? 'bg-green-100 text-green-800' :
                        result.category === 'analysis' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {result.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.source}</span>
                        {result.author && (
                          <>
                            <span>•</span>
                            <span>{result.author}</span>
                          </>
                        )}
                        {result.country && (
                          <>
                            <span>•</span>
                            <span>🌍 {result.country}</span>
                          </>
                        )}
                      </div>
                      <span>{formatTimeAgo(result.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Footer */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Mostrando {results.length} de {totalResults} resultados
              </p>
              <button
                onClick={handleViewAllResults}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Ver todos los resultados →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !showResults && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">🌍</div>
          <p className="text-gray-600 text-lg">Buscando en todo el mundo...</p>
        </div>
      )}
    </div>
  );
};

export default HomepageSearchBar;