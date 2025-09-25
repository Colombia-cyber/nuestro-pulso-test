import React, { useState, useEffect } from 'react';
import { FaSearch, FaExternalLinkAlt, FaNewspaper, FaGlobe, FaRss, FaSpinner } from 'react-icons/fa';

interface Source {
  id: string;
  name: string;
  icon: string;
  category: string;
  rss: boolean;
  active: boolean;
  url?: string;
  description?: string;
}

interface SourcesPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

const SourcesPage: React.FC<SourcesPageProps> = ({ onNavigate }) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [filteredSources, setFilteredSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: '📰' },
    { id: 'local', name: 'Locales', icon: '🇨🇴' },
    { id: 'international', name: 'Internacionales', icon: '🌍' },
    { id: 'aggregated', name: 'Agregadores', icon: '🔄' }
  ];

  useEffect(() => {
    fetchSources();
  }, []);

  useEffect(() => {
    filterSources();
  }, [sources, searchQuery, selectedCategory]);

  const fetchSources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demonstration purposes, always use mock data since API proxy is not configured
      // In production, this would try the API first and fallback to mock data
      console.log('Using mock data for sources demonstration');
      
      const mockSources: Source[] = [
        {
          id: 'el-tiempo',
          name: 'El Tiempo',
          icon: '📰',
          category: 'local',
          rss: true,
          active: true,
          description: 'El periódico líder de Colombia con noticias nacionales e internacionales'
        },
        {
          id: 'semana',
          name: 'Semana',
          icon: '📊',
          category: 'local',
          rss: true,
          active: true,
          description: 'Revista semanal con análisis político y social de Colombia'
        },
        {
          id: 'portafolio',
          name: 'Portafolio',
          icon: '💼',
          category: 'local',
          rss: true,
          active: true,
          description: 'Noticias económicas y financieras de Colombia'
        },
        {
          id: 'colombia-reports',
          name: 'Colombia Reports',
          icon: '🇨🇴',
          category: 'local',
          rss: true,
          active: true,
          description: 'Independent news website covering Colombia in English'
        },
        {
          id: 'bbc-mundo',
          name: 'BBC Mundo',
          icon: '🇬🇧',
          category: 'international',
          rss: true,
          active: true,
          description: 'Noticias internacionales en español de la BBC'
        },
        {
          id: 'ap-news',
          name: 'AP News',
          icon: '🔴',
          category: 'international',
          rss: true,
          active: true,
          description: 'Associated Press international news coverage'
        },
        {
          id: 'google-news',
          name: 'Google News',
          icon: '🔍',
          category: 'aggregated',
          rss: true,
          active: true,
          description: 'Agregador de noticias de múltiples fuentes'
        },
        {
          id: 'al-jazeera',
          name: 'Al Jazeera',
          icon: '📺',
          category: 'international',
          rss: true,
          active: true,
          description: 'International news network with global coverage'
        }
      ];
      
      setSources(mockSources);
      setLoading(false);
      return;

      /* Real API integration code (commented out for demo):
      let response;
      try {
        response = await fetch('/api/colombia-hub/sources');
        if (!response.ok) {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Fallback to mock data if API is not available
        console.warn('API not available, using mock data:', apiError);
        // ... use mock data
        return;
      }

      const data = await response.json();
      if (data.success && data.data.sources) {
        // Enhance sources with descriptions if not provided
        const enhancedSources = data.data.sources.map((source: Source) => ({
          ...source,
          description: source.description || `Fuente de noticias: ${source.name}`
        }));
        setSources(enhancedSources);
      } else {
        throw new Error('Invalid response format');
      }
      */
    } catch (err) {
      setError('Error al cargar las fuentes. Por favor, intenta nuevamente.');
      console.error('Error fetching sources:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterSources = () => {
    let filtered = [...sources];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(source => source.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(source =>
        source.name.toLowerCase().includes(query) ||
        source.description?.toLowerCase().includes(query) ||
        source.category.toLowerCase().includes(query)
      );
    }

    setFilteredSources(filtered);
  };

  const handleSourceClick = (source: Source) => {
    if (onNavigate) {
      // Navigate to source detail page
      onNavigate('source-detail', { sourceId: source.id, source });
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'local': return '🇨🇴';
      case 'international': return '🌍';
      case 'aggregated': return '🔄';
      default: return '📰';
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'local': return 'Local';
      case 'international': return 'Internacional';
      case 'aggregated': return 'Agregador';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando fuentes...</h3>
          <p className="text-gray-500">Obteniendo información de las fuentes de noticias</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <FaNewspaper className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Fuentes de Noticias</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora todas las fuentes de noticias disponibles. Haz clic en cualquier fuente para ver su contenido específico.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar fuentes por nombre, descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={fetchSources}
                  className="mt-2 text-red-600 hover:text-red-800 font-semibold underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sources Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredSources.length} de {sources.length} fuentes
            {selectedCategory !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </p>
        </div>

        {/* Sources Grid */}
        {filteredSources.length === 0 ? (
          <div className="text-center py-12">
            <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron fuentes</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay fuentes disponibles en esta categoría'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSources.map((source) => (
              <div
                key={source.id}
                onClick={() => handleSourceClick(source)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
              >
                <div className="p-6">
                  {/* Source Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{source.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 line-clamp-1">
                          {source.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {getCategoryIcon(source.category)} {getCategoryName(source.category)}
                          </span>
                          {source.rss && (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              <FaRss className="w-3 h-3" />
                              RSS
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>

                  {/* Source Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {source.description}
                  </p>

                  {/* Source Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${source.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-sm font-medium ${source.active ? 'text-green-600' : 'text-red-600'}`}>
                        {source.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <FaGlobe className="inline w-3 h-3 mr-1" />
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 ¿Necesitas más fuentes?
            </h3>
            <p className="text-blue-700 mb-4">
              Estamos constantemente agregando nuevas fuentes de noticias para mantenerte informado con las mejores perspectivas.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">RSS Compatible</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tiempo Real</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Multi-idioma</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Verificadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesPage;