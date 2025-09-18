import React, { useState, useEffect } from 'react';
import { searchService } from '../services/searchService';
import EnhancedNewsCard from './EnhancedNewsCard';
import Comments from './Comments';

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  url?: string;
  image?: string;
  source: string;
  timestamp: string;
  category: string;
  tags?: string[];
  type: 'article' | 'video' | 'reel' | 'attachment';
  relevanceScore: number;
  location?: 'worldwide' | 'colombia';
}

interface AdvancedSearchHomepageProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

const AdvancedSearchHomepage: React.FC<AdvancedSearchHomepageProps> = ({ onNavigate }) => {
  const [worldwideQuery, setWorldwideQuery] = useState('');
  const [colombiaQuery, setColombiaQuery] = useState('');
  const [worldwideResults, setWorldwideResults] = useState<SearchResult[]>([]);
  const [colombiaResults, setColombiaResults] = useState<SearchResult[]>([]);
  const [loadingWorldwide, setLoadingWorldwide] = useState(false);
  const [loadingColombia, setLoadingColombia] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [liveUpdateEnabled, setLiveUpdateEnabled] = useState(true);

  // Mock Google search API simulation
  const searchGoogleAPI = async (query: string, location: 'worldwide' | 'colombia'): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const locationPrefix = location === 'colombia' ? 'Colombia: ' : 'Global: ';
    const timeRange = Math.floor(Math.random() * 15) + 1; // 1-15 years ago
    
    const mockResults: SearchResult[] = [
      {
        id: `${location}-${Date.now()}-1`,
        title: `${locationPrefix}${query} - Últimas Noticias y Análisis`,
        summary: `Cobertura completa sobre ${query} con análisis en profundidad, perspectivas múltiples y datos actualizados. Incluye videos, documentos y artículos relacionados.`,
        url: `https://example.com/${location}/${encodeURIComponent(query)}`,
        image: '📰',
        source: location === 'colombia' ? 'El Tiempo Colombia' : 'Reuters Internacional',
        timestamp: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * timeRange).toISOString(),
        category: 'politica',
        tags: [query.toLowerCase(), 'análisis', 'noticias'],
        type: 'article',
        relevanceScore: Math.floor(85 + Math.random() * 15),
        location
      },
      {
        id: `${location}-${Date.now()}-2`,
        title: `Video: ${locationPrefix}Conferencia sobre ${query}`,
        summary: `Video completo de la conferencia más reciente sobre ${query}, incluyendo declaraciones oficiales, análisis de expertos y sesión de preguntas.`,
        url: `https://youtube.com/watch?v=${Math.random().toString(36).substr(2, 11)}`,
        image: '🎥',
        source: location === 'colombia' ? 'Caracol TV' : 'CNN Internacional',
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'multimedia',
        tags: [query.toLowerCase(), 'video', 'conferencia'],
        type: 'video',
        relevanceScore: Math.floor(80 + Math.random() * 20),
        location
      },
      {
        id: `${location}-${Date.now()}-3`,
        title: `Documentos: ${locationPrefix}Archivos sobre ${query}`,
        summary: `Colección de documentos oficiales, reportes y archivos relacionados con ${query}. Incluye PDFs, imágenes y documentación histórica.`,
        url: `https://docs.example.com/${location}/${encodeURIComponent(query)}`,
        image: '📄',
        source: location === 'colombia' ? 'Archivo Nacional' : 'Archive.org',
        timestamp: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'documentos',
        tags: [query.toLowerCase(), 'documentos', 'archivos'],
        type: 'attachment',
        relevanceScore: Math.floor(75 + Math.random() * 25),
        location
      },
      {
        id: `${location}-${Date.now()}-4`,
        title: `Reel: ${locationPrefix}${query} en 60 segundos`,
        summary: `Resumen rápido y visual de los puntos clave sobre ${query}. Perfecto para una comprensión rápida de los temas más importantes.`,
        url: `https://instagram.com/reel/${Math.random().toString(36).substr(2, 11)}`,
        image: '📱',
        source: location === 'colombia' ? 'NuestroPulso Reels' : 'Global News Reels',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'social',
        tags: [query.toLowerCase(), 'reel', 'resumen'],
        type: 'reel',
        relevanceScore: Math.floor(70 + Math.random() * 30),
        location
      }
    ];

    return mockResults;
  };

  // Handle worldwide search
  const handleWorldwideSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!worldwideQuery.trim()) return;

    setLoadingWorldwide(true);
    try {
      const results = await searchGoogleAPI(worldwideQuery, 'worldwide');
      setWorldwideResults(results);
    } catch (error) {
      console.error('Worldwide search failed:', error);
    } finally {
      setLoadingWorldwide(false);
    }
  };

  // Handle Colombia search
  const handleColombiaSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colombiaQuery.trim()) return;

    setLoadingColombia(true);
    try {
      const results = await searchGoogleAPI(colombiaQuery, 'colombia');
      setColombiaResults(results);
    } catch (error) {
      console.error('Colombia search failed:', error);
    } finally {
      setLoadingColombia(false);
    }
  };

  // Handle article click to open detail page
  const handleArticleClick = (article: SearchResult) => {
    setSelectedArticle(article);
    setShowComments(true);
    
    // Auto-send to Community Hub
    const communityComments = JSON.parse(localStorage.getItem('communityComments') || '[]');
    const interactionEvent = {
      type: 'article_view',
      articleId: article.id,
      articleTitle: article.title,
      articleUrl: article.url,
      location: article.location,
      timestamp: new Date().toISOString(),
      category: article.category
    };
    
    // Track interaction
    localStorage.setItem('lastViewedArticle', JSON.stringify(interactionEvent));
  };

  // Live update simulation
  useEffect(() => {
    if (!liveUpdateEnabled) return;

    const interval = setInterval(async () => {
      // Refresh results every 30 seconds if there are active searches
      if (worldwideQuery.trim() && worldwideResults.length > 0) {
        try {
          const updatedResults = await searchGoogleAPI(worldwideQuery, 'worldwide');
          setWorldwideResults(prev => {
            // Merge with existing, keeping unique results
            const existingIds = prev.map(r => r.id);
            const newResults = updatedResults.filter(r => !existingIds.includes(r.id));
            return [...newResults, ...prev].slice(0, 10); // Keep latest 10
          });
        } catch (error) {
          console.error('Failed to update worldwide results:', error);
        }
      }

      if (colombiaQuery.trim() && colombiaResults.length > 0) {
        try {
          const updatedResults = await searchGoogleAPI(colombiaQuery, 'colombia');
          setColombiaResults(prev => {
            const existingIds = prev.map(r => r.id);
            const newResults = updatedResults.filter(r => !existingIds.includes(r.id));
            return [...newResults, ...prev].slice(0, 10);
          });
        } catch (error) {
          console.error('Failed to update Colombia results:', error);
        }
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [worldwideQuery, colombiaQuery, worldwideResults.length, colombiaResults.length, liveUpdateEnabled]);

  // Format time ago
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 365) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''}`;
  };

  // Get result type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'reel': return '📱';
      case 'attachment': return '📄';
      default: return '📰';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🌍 Sistema de Búsqueda Avanzado 🇨🇴
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Busca información en tiempo real desde cualquier parte del mundo y específicamente desde Colombia
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <span>⚡ Resultados en vivo</span>
              <span>💬 Comentarios instantáneos</span>
              <span>🌐 Alcance global y local</span>
              <span>📊 Datos de 15 años</span>
            </div>
          </div>

          {/* Live Update Toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setLiveUpdateEnabled(!liveUpdateEnabled)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                liveUpdateEnabled 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {liveUpdateEnabled ? '🔴 Actualizaciones ACTIVAS' : '⏸️ Actualizaciones pausadas'}
            </button>
          </div>

          {/* Dual Search Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Worldwide Search */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                🌍 Búsqueda Mundial
                <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">15 años de datos</span>
              </h2>
              <form onSubmit={handleWorldwideSearch} className="space-y-3">
                <input
                  value={worldwideQuery}
                  onChange={(e) => setWorldwideQuery(e.target.value)}
                  placeholder="Buscar noticias globales, artículos, videos..."
                  className="w-full p-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loadingWorldwide}
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  {loadingWorldwide ? '🔄 Buscando...' : '🔍 Buscar Globalmente'}
                </button>
              </form>
            </div>

            {/* Colombia Search */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                🇨🇴 Búsqueda Colombia
                <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">Contenido local</span>
              </h2>
              <form onSubmit={handleColombiaSearch} className="space-y-3">
                <input
                  value={colombiaQuery}
                  onChange={(e) => setColombiaQuery(e.target.value)}
                  placeholder="Buscar noticias colombianas, política, economía..."
                  className="w-full p-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loadingColombia}
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  {loadingColombia ? '🔄 Buscando...' : '🔍 Buscar en Colombia'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Worldwide Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                🌍 Resultados Mundiales
                {worldwideResults.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {worldwideResults.length} resultados
                  </span>
                )}
              </h3>
              {liveUpdateEnabled && worldwideResults.length > 0 && (
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  En vivo
                </div>
              )}
            </div>

            {loadingWorldwide && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4 animate-spin">🔄</div>
                <p className="text-gray-600">Buscando en todo el mundo...</p>
              </div>
            )}

            <div className="space-y-4">
              {worldwideResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleArticleClick(result)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-blue-500 p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {result.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(result.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
                        {result.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {result.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{result.source}</span>
                        <div className="flex items-center space-x-2">
                          <span>Relevancia: {result.relevanceScore}%</span>
                          <span>💬 Comentar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!loadingWorldwide && worldwideQuery && worldwideResults.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌍</div>
                <p className="text-gray-600">No se encontraron resultados mundiales para "{worldwideQuery}"</p>
              </div>
            )}
          </div>

          {/* Colombia Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                🇨🇴 Resultados Colombia
                {colombiaResults.length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    {colombiaResults.length} resultados
                  </span>
                )}
              </h3>
              {liveUpdateEnabled && colombiaResults.length > 0 && (
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  En vivo
                </div>
              )}
            </div>

            {loadingColombia && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4 animate-spin">🔄</div>
                <p className="text-gray-600">Buscando en Colombia...</p>
              </div>
            )}

            <div className="space-y-4">
              {colombiaResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleArticleClick(result)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-red-500 p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {result.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(result.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 hover:text-red-600 line-clamp-2">
                        {result.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {result.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{result.source}</span>
                        <div className="flex items-center space-x-2">
                          <span>Relevancia: {result.relevanceScore}%</span>
                          <span>💬 Comentar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!loadingColombia && colombiaQuery && colombiaResults.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🇨🇴</div>
                <p className="text-gray-600">No se encontraron resultados colombianos para "{colombiaQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Detail Modal with Comments */}
      {showComments && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">📖 Detalle del Artículo</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Los comentarios se envían automáticamente al Community Hub
                </p>
              </div>
              <button 
                onClick={() => setShowComments(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {/* Article Details */}
              <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{getTypeIcon(selectedArticle.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedArticle.location === 'colombia' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedArticle.location === 'colombia' ? '🇨🇴 Colombia' : '🌍 Mundial'}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {selectedArticle.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(selectedArticle.timestamp)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedArticle.title}</h3>
                    <p className="text-gray-700 mb-3">{selectedArticle.summary}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📰 Fuente: {selectedArticle.source}</span>
                  <span>⭐ Relevancia: {selectedArticle.relevanceScore}%</span>
                  {selectedArticle.url && (
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      🔗 Ver artículo completo
                    </a>
                  )}
                </div>

                {/* Tags */}
                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Comments Section */}
              <Comments 
                articleId={parseInt(selectedArticle.id.split('-')[2] || '0')} 
                articleTitle={selectedArticle.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchHomepage;