import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaRss, FaExternalLinkAlt, FaSpinner, FaNewspaper, FaClock, FaGlobe, FaSearch } from 'react-icons/fa';

interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  author?: string;
  imageUrl?: string;
  tags?: string[];
}

interface Source {
  id: string;
  name: string;
  icon: string;
  category: string;
  rss: boolean;
  active: boolean;
  description?: string;
}

interface SourceDetailProps {
  sourceId?: string;
  source?: Source;
  onNavigate?: (view: string, params?: any) => void;
}

const SourceDetail: React.FC<SourceDetailProps> = ({ sourceId, source, onNavigate }) => {
  const [sourceData, setSourceData] = useState<Source | null>(source || null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (sourceId && !source) {
      fetchSourceData();
    } else if (source) {
      setSourceData(source);
      setLoading(false);
    }
    fetchSourceArticles();
  }, [sourceId, source]);

  useEffect(() => {
    filterArticles();
  }, [articles, searchQuery]);

  const fetchSourceData = async () => {
    try {
      setLoading(true);
      // Mock source data - in real implementation this would fetch from API
      const mockSource: Source = {
        id: sourceId || 'unknown',
        name: sourceId ? sourceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Fuente Desconocida',
        icon: '📰',
        category: 'local',
        rss: true,
        active: true,
        description: `Fuente de noticias: ${sourceId}`
      };
      setSourceData(mockSource);
    } catch (err) {
      setError('Error al cargar información de la fuente');
    } finally {
      setLoading(false);
    }
  };

  const fetchSourceArticles = async () => {
    try {
      setArticlesLoading(true);
      setError(null);

      // Try to fetch from actual API first
      let response;
      try {
        const apiUrl = sourceId 
          ? `/api/colombia-hub/news?sources=${sourceId}&limit=20`
          : '/api/colombia-hub/news?limit=20';
        response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Fallback to mock data
        console.warn('API not available, using mock data for source articles');
        const mockArticles: Article[] = generateMockArticles(sourceData?.name || 'Fuente');
        setArticles(mockArticles);
        setArticlesLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success && data.data.articles) {
        setArticles(data.data.articles);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Error al cargar artículos de la fuente');
      // Still show mock data on error
      const mockArticles: Article[] = generateMockArticles(sourceData?.name || 'Fuente');
      setArticles(mockArticles);
    } finally {
      setArticlesLoading(false);
    }
  };

  const generateMockArticles = (sourceName: string): Article[] => {
    const mockTitles = [
      'Últimas noticias de Colombia: Actualizaciones políticas importantes',
      'Economía colombiana muestra signos de recuperación según nuevo informe',
      'Desarrollo de infraestructura en regiones rurales acelera el crecimiento',
      'Política ambiental: Nuevas medidas para proteger la biodiversidad',
      'Análisis: El impacto de las reformas sociales en las comunidades',
      'Educación pública recibe inversión histórica para mejorar la calidad',
      'Seguridad ciudadana: Nuevas estrategias para reducir la criminalidad',
      'Salud pública: Avances en la cobertura universal de servicios médicos',
      'Comercio internacional: Colombia fortalece lazos comerciales',
      'Cultura y sociedad: Celebrando la diversidad colombiana'
    ];

    return mockTitles.map((title, index) => ({
      id: `mock-${index}`,
      title,
      summary: `Artículo detallado de ${sourceName} sobre temas relevantes para Colombia. Esta noticia proporciona información actualizada y análisis profundo sobre la situación actual.`,
      url: `#article-${index}`,
      publishedAt: new Date(Date.now() - (index * 2 * 60 * 60 * 1000)).toISOString(),
      author: `Redacción ${sourceName}`,
      imageUrl: '/api/placeholder/400/200',
      tags: ['colombia', 'noticias', 'actualidad']
    }));
  };

  const filterArticles = () => {
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.author?.toLowerCase().includes(query) ||
      article.tags?.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredArticles(filtered);
  };

  const handleGoBack = () => {
    if (onNavigate) {
      onNavigate('sources');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace menos de 1 hora';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
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
      case 'local': return 'Fuente Local';
      case 'international': return 'Fuente Internacional';
      case 'aggregated': return 'Agregador de Noticias';
      default: return 'Fuente de Noticias';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando fuente...</h3>
          <p className="text-gray-500">Obteniendo información de la fuente</p>
        </div>
      </div>
    );
  }

  if (!sourceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Fuente no encontrada</h3>
          <p className="text-gray-500 mb-4">La fuente solicitada no está disponible</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a Fuentes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
          >
            <FaArrowLeft />
            Volver a Fuentes
          </button>

          {/* Source Header */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{sourceData.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{sourceData.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {getCategoryIcon(sourceData.category)}
                      {getCategoryName(sourceData.category)}
                    </span>
                    {sourceData.rss && (
                      <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <FaRss />
                        RSS Disponible
                      </span>
                    )}
                    <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                      sourceData.active 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-red-600 bg-red-50'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${sourceData.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      {sourceData.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:ml-auto flex items-center gap-3">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaExternalLinkAlt />
                  Visitar Sitio
                </button>
                <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <FaRss />
                  RSS
                </button>
              </div>
            </div>
            
            {sourceData.description && (
              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                {sourceData.description}
              </p>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artículos de esta fuente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Articles Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FaNewspaper className="text-blue-600" />
              Artículos Recientes
            </h2>
            <div className="text-sm text-gray-500">
              {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''}
              {searchQuery && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Filtrado
                </span>
              )}
            </div>
          </div>

          {/* Loading State */}
          {articlesLoading && (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Cargando artículos...</p>
            </div>
          )}

          {/* Error State */}
          {error && !articlesLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-red-600 mr-3">⚠️</div>
                <div>
                  <h3 className="text-red-800 font-semibold">Error</h3>
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={fetchSourceArticles}
                    className="mt-2 text-red-600 hover:text-red-800 font-semibold underline"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Articles List */}
          {!articlesLoading && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? 'No se encontraron artículos' : 'No hay artículos disponibles'}
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Esta fuente no tiene artículos recientes'}
              </p>
            </div>
          )}

          {!articlesLoading && filteredArticles.length > 0 && (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {article.imageUrl && (
                      <div className="md:w-48 md:flex-shrink-0">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-32 md:h-24 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        {article.author && (
                          <span className="flex items-center gap-1">
                            <FaNewspaper className="w-3 h-3" />
                            {article.author}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaExternalLinkAlt className="w-3 h-3" />
                          Ver artículo completo
                        </span>
                      </div>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Source Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{filteredArticles.length}</div>
            <div className="text-gray-600">Artículos Disponibles</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {sourceData.active ? '100%' : '0%'}
            </div>
            <div className="text-gray-600">Disponibilidad</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {sourceData.category === 'local' ? 'Local' : sourceData.category === 'international' ? 'Global' : 'Mixed'}
            </div>
            <div className="text-gray-600">Cobertura</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceDetail;