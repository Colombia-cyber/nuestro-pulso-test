import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'news' | 'debate' | 'survey' | 'chat' | 'congress' | 'election';
  category?: string;
  url: string;
  relevanceScore: number;
  source?: string;
  date?: string;
  engagement?: {
    likes?: number;
    comments?: number;
    participants?: number;
  };
};

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Mock search data - in real app this would come from API
  const searchData: SearchResult[] = [
    {
      id: 'news-1',
      title: 'Reforma tributaria: impacto en la clase media colombiana',
      description: 'Análisis detallado de cómo la nueva reforma tributaria afectará a los contribuyentes de clase media en Colombia.',
      type: 'news',
      category: 'economía',
      url: '/news',
      relevanceScore: 95,
      source: 'Ministerio de Hacienda',
      date: '2024-01-15',
      engagement: { likes: 234, comments: 67 }
    },
    {
      id: 'debate-1',
      title: '¿Debe Colombia legalizar completamente el cannabis?',
      description: 'Debate público sobre la legalización completa del cannabis medicinal y recreativo en Colombia.',
      type: 'debate',
      category: 'salud',
      url: '/debate',
      relevanceScore: 88,
      date: '2024-01-14',
      engagement: { participants: 1247, comments: 892 }
    },
    {
      id: 'news-2',
      title: 'Blockchain en elecciones: tecnología para la transparencia',
      description: 'Colombia implementará tecnología blockchain para garantizar transparencia en futuros procesos electorales.',
      type: 'news',
      category: 'tecnología',
      url: '/news',
      relevanceScore: 92,
      source: 'Registraduría Nacional',
      date: '2024-01-13',
      engagement: { likes: 389, comments: 87 }
    },
    {
      id: 'survey-1',
      title: 'Encuesta: Prioridades nacionales para 2024',
      description: 'Participa en la encuesta nacional sobre las prioridades más importantes para Colombia en 2024.',
      type: 'survey',
      category: 'política',
      url: '/survey',
      relevanceScore: 85,
      date: '2024-01-12',
      engagement: { participants: 15847, comments: 234 }
    },
    {
      id: 'congress-1',
      title: 'Proyecto de Ley: Reforma al sistema de salud',
      description: 'Seguimiento al proyecto de ley que busca reformar integralmente el sistema de salud colombiano.',
      type: 'congress',
      category: 'salud',
      url: '/congress',
      relevanceScore: 90,
      source: 'Congreso de la República',
      date: '2024-01-11',
      engagement: { likes: 156, comments: 78 }
    },
    {
      id: 'chat-1',
      title: 'Chat en vivo: Medio ambiente y cambio climático',
      description: 'Únete a la conversación sobre políticas ambientales y acciones contra el cambio climático.',
      type: 'chat',
      category: 'ambiente',
      url: '/chat',
      relevanceScore: 78,
      date: '2024-01-10',
      engagement: { participants: 432, comments: 156 }
    },
    {
      id: 'election-1',
      title: 'Elecciones regionales 2024: Candidatos y propuestas',
      description: 'Información completa sobre candidatos y propuestas para las elecciones regionales de 2024.',
      type: 'election',
      category: 'política',
      url: '/elections',
      relevanceScore: 87,
      source: 'CNE',
      date: '2024-01-09',
      engagement: { likes: 267, comments: 98 }
    }
  ];

  const searchTypes = [
    { id: 'all', name: 'Todo', icon: '🔍', color: 'blue' },
    { id: 'news', name: 'Noticias', icon: '📰', color: 'red' },
    { id: 'debate', name: 'Debates', icon: '🗣️', color: 'green' },
    { id: 'survey', name: 'Encuestas', icon: '📊', color: 'purple' },
    { id: 'congress', name: 'Congreso', icon: '🏛️', color: 'yellow' },
    { id: 'chat', name: 'Chat', icon: '💬', color: 'pink' },
    { id: 'election', name: 'Elecciones', icon: '🗳️', color: 'indigo' }
  ];

  const performSearch = (searchQuery: string, filter: string = 'all') => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const matchesQuery = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = filter === 'all' || item.type === filter;
        
        return matchesQuery && matchesFilter;
      });

      // Sort by relevance score
      const sorted = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
      setResults(sorted);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    performSearch(query, selectedFilter);
  }, [query, selectedFilter]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
  };

  const handleKeyPress = (event: React.KeyboardEvent, result: SearchResult) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleResultClick(result);
    }
  };

  const getTypeColor = (type: string) => {
    const typeConfig = searchTypes.find(t => t.id === type);
    return typeConfig?.color || 'gray';
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = searchTypes.find(t => t.id === type);
    return typeConfig?.icon || '📄';
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">{part}</mark> : 
        part
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Búsqueda Cívica Universal</h1>
          <p className="text-white/90">Encuentra información, debates, noticias y recursos en toda la plataforma</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80 text-sm">
            <span>📊 {searchData.length} recursos indexados</span>
            <span>🚀 Búsqueda en tiempo real</span>
            <span>🎯 Resultados personalizados</span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-input" className="sr-only">
                Buscar en toda la plataforma cívica
              </label>
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar debates, noticias, encuestas, proyectos de ley, candidatos..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-describedby="search-help"
              />
              <div id="search-help" className="sr-only">
                Escribe para buscar en todos los módulos de la plataforma cívica
              </div>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={showFilters}
              aria-controls="search-filters"
            >
              <span className="mr-2" aria-hidden="true">⚙️</span>
              Filtros
            </button>
          </div>

          {/* Search Filters */}
          {showFilters && (
            <div id="search-filters" className="mt-4 pt-4 border-t" role="region" aria-label="Filtros de búsqueda">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por tipo de contenido:</h3>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Tipos de contenido">
                {searchTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedFilter(type.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedFilter === type.id
                        ? `bg-blue-600 text-white`
                        : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                    }`}
                    aria-pressed={selectedFilter === type.id}
                  >
                    <span className="mr-1" aria-hidden="true">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Stats */}
          {query && (
            <div className="mt-4 text-sm text-gray-600" role="status" aria-live="polite">
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2" aria-hidden="true"></div>
                  Buscando...
                </div>
              ) : (
                <span>
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} para "{query}"
                  {selectedFilter !== 'all' && ` en ${searchTypes.find(t => t.id === selectedFilter)?.name}`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && (
          <div className="space-y-4" role="region" aria-label="Resultados de búsqueda">
            {loading ? (
              <div className="flex items-center justify-center py-12" role="status" aria-label="Cargando resultados">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" aria-hidden="true"></div>
                <span className="ml-3 text-gray-600">Buscando en todos los módulos...</span>
              </div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  onKeyDown={(e) => handleKeyPress(e, result)}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderLeftColor: '#3B82F6' }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver ${result.title} en ${searchTypes.find(t => t.id === result.type)?.name}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg" aria-hidden="true">{getTypeIcon(result.type)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800`}>
                          {searchTypes.find(t => t.id === result.type)?.name}
                        </span>
                        {result.category && (
                          <>
                            <span className="text-gray-400" aria-hidden="true">•</span>
                            <span className="text-sm text-gray-600 capitalize">{result.category}</span>
                          </>
                        )}
                        {result.source && (
                          <>
                            <span className="text-gray-400" aria-hidden="true">•</span>
                            <span className="text-sm text-gray-600">{result.source}</span>
                          </>
                        )}
                        {result.date && (
                          <>
                            <span className="text-gray-400" aria-hidden="true">•</span>
                            <span className="text-sm text-gray-600">
                              {new Date(result.date).toLocaleDateString('es-CO')}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {highlightText(result.title, query)}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {highlightText(result.description, query)}
                      </p>
                      
                      {result.engagement && (
                        <div className="flex items-center space-x-4 text-sm text-gray-500" aria-label="Estadísticas de participación">
                          {result.engagement.likes && (
                            <span className="flex items-center space-x-1">
                              <span aria-hidden="true">👍</span>
                              <span>{result.engagement.likes} me gusta</span>
                            </span>
                          )}
                          {result.engagement.comments && (
                            <span className="flex items-center space-x-1">
                              <span aria-hidden="true">💬</span>
                              <span>{result.engagement.comments} comentarios</span>
                            </span>
                          )}
                          {result.engagement.participants && (
                            <span className="flex items-center space-x-1">
                              <span aria-hidden="true">👥</span>
                              <span>{result.engagement.participants} participantes</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4" aria-hidden="true">
                      <div className="text-sm text-gray-500">
                        Relevancia: {result.relevanceScore}%
                      </div>
                      <div className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Ver detalles →
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12" role="status">
                <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600 mb-4">
                  No encontramos contenido que coincida con "{query}"
                </p>
                <div className="text-sm text-gray-500">
                  <p>Sugerencias:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Verifica la ortografía de las palabras</li>
                    <li>Intenta con términos más generales</li>
                    <li>Usa palabras clave diferentes</li>
                    <li>Cambia el filtro de búsqueda</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Search Shortcuts */}
        {!query && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Búsquedas rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {searchTypes.slice(1).map((type) => (
                <div
                  key={type.id}
                  onClick={() => {
                    setSelectedFilter(type.id);
                    setQuery(type.name.toLowerCase());
                  }}
                  className={`bg-white p-6 rounded-lg shadow-lg border-l-4 border-${type.color}-500 cursor-pointer hover:shadow-xl transition-all group`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{type.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Buscar en {type.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {type.id === 'news' && 'Artículos verificados por categoría'}
                        {type.id === 'debate' && 'Debates públicos y discusiones'}
                        {type.id === 'survey' && 'Encuestas y consultas ciudadanas'}
                        {type.id === 'congress' && 'Proyectos de ley y votaciones'}
                        {type.id === 'chat' && 'Conversaciones en tiempo real'}
                        {type.id === 'election' && 'Candidatos y procesos electorales'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Searches */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Búsquedas populares</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'reforma tributaria',
                  'salud pública',
                  'elecciones 2024',
                  'cambio climático',
                  'educación',
                  'blockchain',
                  'paz total',
                  'corrupción',
                  'transporte público',
                  'vivienda social'
                ].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(term)}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {term}
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

export default Search;