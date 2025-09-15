import React, { useState, useEffect } from 'react';
import { activityTracker } from '../services/ActivityTracker';

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  link: string;
  image?: string;
}

// Mock search data with Colombian-relevant content
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Gustavo Petro anuncia nueva política económica para 2024',
    summary: 'El presidente colombiano presenta un plan integral de reformas económicas que incluye medidas fiscales y sociales para impulsar el crecimiento.',
    source: 'El Tiempo',
    category: 'Política',
    timestamp: '2024-01-15T10:30:00Z',
    relevanceScore: 95,
    link: '#',
    image: '🏛️'
  },
  {
    id: '2', 
    title: 'Centro Democrático critica políticas del gobierno actual',
    summary: 'La oposición presenta observaciones detalladas sobre las políticas económicas y sociales implementadas por la administración Petro.',
    source: 'Semana',
    category: 'Política',
    timestamp: '2024-01-15T08:45:00Z',
    relevanceScore: 88,
    link: '#',
    image: '🗳️'
  },
  {
    id: '3',
    title: 'Trump propone nuevos aranceles que afectarían a Colombia',
    summary: 'El expresidente estadounidense anuncia medidas comerciales que podrían impactar las exportaciones colombianas de café y flores.',
    source: 'CNN Colombia',
    category: 'Internacional',
    timestamp: '2024-01-14T16:20:00Z',
    relevanceScore: 82,
    link: '#',
    image: '🇺🇸'
  },
  {
    id: '4',
    title: 'Congreso debate reforma pensional con participación ciudadana',
    summary: 'Las comisiones del Senado y Cámara abren espacios de diálogo para escuchar las propuestas de la sociedad civil sobre el sistema pensional.',
    source: 'El Espectador',
    category: 'Social',
    timestamp: '2024-01-14T14:15:00Z',
    relevanceScore: 75,
    link: '#',
    image: '🏛️'
  },
  {
    id: '5',
    title: 'Alerta de seguridad por actividad terrorista en fronteras',
    summary: 'Las fuerzas militares reportan incremento en amenazas de grupos armados ilegales en las zonas fronterizas con Venezuela.',
    source: 'Caracol Radio',
    category: 'Seguridad',
    timestamp: '2024-01-14T12:00:00Z',
    relevanceScore: 90,
    link: '#',
    image: '🚨'
  },
  {
    id: '6',
    title: 'Colombia avanza en transformación digital para 2030',
    summary: 'El MinTIC presenta el plan nacional de digitalización que conectará el 95% del territorio con internet de alta velocidad.',
    source: 'Portafolio',
    category: 'Tecnología',
    timestamp: '2024-01-13T11:30:00Z',
    relevanceScore: 70,
    link: '#',
    image: '💻'
  }
];

const UniversalSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const resultsPerPage = 6;

  // Mock search function
  const performSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!searchQuery.trim()) {
      setLoading(false);
      return [];
    }

    // Filter mock data based on query
    const filtered = mockSearchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Add some dynamic results based on query
    const dynamicResults: SearchResult[] = [
      {
        id: `dynamic-${Date.now()}`,
        title: `Últimas noticias sobre "${searchQuery}" en Colombia`,
        summary: `Cobertura actualizada y análisis de los eventos más relevantes relacionados con ${searchQuery} en el contexto colombiano.`,
        source: 'Nuestro Pulso Agregador',
        category: 'Agregado',
        timestamp: new Date().toISOString(),
        relevanceScore: 100,
        link: '#',
        image: '📰'
      }
    ];

    setLoading(false);
    return [...dynamicResults, ...filtered];
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchResults = await performSearch(query);
    setResults(searchResults);
    setCurrentPage(1);
    
    // Track search activity
    activityTracker.trackSearch(query, searchResults.length, filter !== 'all' ? filter : undefined);
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.category.toLowerCase() === filter.toLowerCase();
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return b.relevanceScore - a.relevanceScore;
      case 'date':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + resultsPerPage);

  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Colombian-inspired header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🔍</span>
          <div>
            <h1 className="text-3xl font-bold">Búsqueda Universal</h1>
            <p className="text-white/90">Explora toda la información cívica y política de Colombia</p>
          </div>
          <span className="text-4xl ml-auto">🇨🇴</span>
        </div>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar noticias, políticas, candidatos, reformas..."
              className="flex-1 p-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? '🔄' : '🔍'} Buscar
            </button>
          </div>
        </form>

        {/* Quick search suggestions */}
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-2">Búsquedas populares:</p>
          <div className="flex flex-wrap gap-2">
            {['Gustavo Petro', 'Centro Democrático', 'Trump Colombia', 'Reforma pensional', 'Seguridad fronteras'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors backdrop-blur"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">
                  📊 {filteredResults.length} resultados para "{query}"
                </span>
                
                {/* Category filter */}
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="política">Política</option>
                  <option value="internacional">Internacional</option>
                  <option value="social">Social</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="tecnología">Tecnología</option>
                </select>

                {/* Sort options */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Por relevancia</option>
                  <option value="date">Por fecha</option>
                  <option value="category">Por categoría</option>
                </select>
              </div>

              {/* Display mode toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDisplayMode('cards')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    displayMode === 'cards' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🔲 Tarjetas
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    displayMode === 'list' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📄 Lista
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-gray-600 text-lg">Buscando resultados relevantes...</p>
            </div>
          )}

          {/* Results */}
          {!loading && (
            <div className={displayMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {paginatedResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 ${
                    displayMode === 'list' ? 'p-4' : 'p-6'
                  }`}
                >
                  <div className={displayMode === 'list' ? 'flex items-start gap-4' : ''}>
                    {/* Image/Icon */}
                    <div className={`${displayMode === 'list' ? 'text-3xl' : 'text-4xl text-center mb-4'}`}>
                      {result.image}
                    </div>

                    <div className="flex-1">
                      {/* Category and timestamp */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.category === 'Política' ? 'bg-blue-100 text-blue-800' :
                          result.category === 'Internacional' ? 'bg-green-100 text-green-800' :
                          result.category === 'Social' ? 'bg-purple-100 text-purple-800' :
                          result.category === 'Seguridad' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.category}
                        </span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(result.timestamp)}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer ${
                        displayMode === 'list' ? 'text-lg' : 'text-xl'
                      }`}>
                        {result.title}
                      </h3>

                      {/* Summary */}
                      <p className={`text-gray-600 mb-4 ${
                        displayMode === 'list' ? 'text-sm' : ''
                      } ${
                        expandedResults.has(result.id) ? '' : 'line-clamp-2'
                      }`}>
                        {result.summary}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExpanded(result.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {expandedResults.has(result.id) ? '▲ Menos' : '▼ Más'}
                          </button>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{result.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Relevancia:</span>
                          <span className="text-xs font-medium text-blue-600">{result.relevanceScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                ← Anterior
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron resultados</h3>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o explora las sugerencias populares
          </p>
          <button
            onClick={() => setQuery('')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nueva búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default UniversalSearchBar;