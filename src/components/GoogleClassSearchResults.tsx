import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaClock, FaGlobe, FaMapMarkerAlt, FaShare, FaBookmark, FaThumbsUp } from 'react-icons/fa';
import { MdImage, MdVideoLibrary, MdWeb } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import KnowledgePanel from './KnowledgePanel';
import { detectTopicFromQuery } from '../data/knowledgeTopics';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  timestamp: string;
  type: 'news' | 'web' | 'images' | 'videos' | 'shopping' | 'articles';
  location: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

interface GoogleClassSearchResultsProps {
  results: SearchResult[];
  query: string;
  totalResults: number;
  searchTime: number;
  activeTab: 'world' | 'local';
  onResultClick?: (result: SearchResult) => void;
  onLoadMore?: () => void;
  onSearchRelated?: (query: string) => void;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}

const GoogleClassSearchResults: React.FC<GoogleClassSearchResultsProps> = ({
  results,
  query,
  totalResults,
  searchTime,
  activeTab,
  onResultClick,
  onLoadMore,
  onSearchRelated,
  hasMore = false,
  loading = false,
  className = ''
}) => {
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

  // Detect knowledge panel topic
  const knowledgeTopic = detectTopicFromQuery(query);

  // Load bookmarks from localStorage
  useEffect(() => {
    const bookmarks = localStorage.getItem('searchBookmarks');
    if (bookmarks) {
      setBookmarkedResults(new Set(JSON.parse(bookmarks)));
    }
  }, []);

  // Save bookmarks to localStorage
  const toggleBookmark = (resultId: string) => {
    const newBookmarks = new Set(bookmarkedResults);
    if (newBookmarks.has(resultId)) {
      newBookmarks.delete(resultId);
    } else {
      newBookmarks.add(resultId);
    }
    setBookmarkedResults(newBookmarks);
    localStorage.setItem('searchBookmarks', JSON.stringify([...newBookmarks]));
  };

  // Toggle expanded view for result
  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    }
    
    // Track click in localStorage for analytics
    const clickHistory = JSON.parse(localStorage.getItem('searchClickHistory') || '[]');
    clickHistory.push({
      resultId: result.id,
      query,
      timestamp: new Date().toISOString(),
      source: result.source,
      type: result.type
    });
    localStorage.setItem('searchClickHistory', JSON.stringify(clickHistory.slice(-100))); // Keep last 100 clicks
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return <BiNews className="w-4 h-4" />;
      case 'images': return <MdImage className="w-4 h-4" />;
      case 'videos': return <MdVideoLibrary className="w-4 h-4" />;
      case 'web': return <MdWeb className="w-4 h-4" />;
      default: return <BiNews className="w-4 h-4" />;
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Hace menos de 1 minuto';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `Hace ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`;
  };

  // Share result
  const shareResult = async (result: SearchResult) => {
    const shareData = {
      title: result.title,
      text: result.description,
      url: result.url
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${result.title}\n${result.url}`);
        // Show toast notification (you might want to implement a toast system)
        console.log('Enlace copiado al portapapeles');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (results.length === 0 && !loading) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No se encontraron resultados para "{query}"
        </h3>
        <p className="text-gray-600 mb-6">
          Intenta con otros términos o ajusta los filtros de búsqueda
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• Verifica la ortografía de las palabras</p>
          <p>• Usa palabras clave más generales</p>
          <p>• Prueba con sinónimos</p>
          {activeTab === 'local' && <p>• Cambia a búsqueda mundial para más resultados</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`google-search-results ${className}`}>
      {/* Knowledge Panel - Show at top for major topics */}
      {knowledgeTopic && (
        <div className="mb-8">
          <KnowledgePanel 
            topic={knowledgeTopic} 
            onSearchRelated={onSearchRelated}
            className="shadow-lg"
          />
        </div>
      )}

      {/* Results Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Aproximadamente <strong>{totalResults.toLocaleString()}</strong> resultados 
              <span className="ml-2">({searchTime}ms)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              {activeTab === 'world' ? (
                <>
                  <FaGlobe className="w-3 h-3" />
                  <span>Búsqueda global</span>
                </>
              ) : (
                <>
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <span>Búsqueda local Colombia</span>
                </>
              )}
            </div>
            {knowledgeTopic && (
              <div className="flex items-center gap-1 text-sm text-blue-600 font-medium">
                🧠 <span>Panel de conocimiento activado</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'compact' ? 'detailed' : 'compact')}
              className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {viewMode === 'compact' ? 'Vista detallada' : 'Vista compacta'}
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {results.map((result, index) => {
          const isExpanded = expandedResults.has(result.id);
          const isBookmarked = bookmarkedResults.has(result.id);
          
          return (
            <article 
              key={result.id}
              className={`group ${viewMode === 'detailed' ? 'bg-white rounded-lg shadow-sm border border-gray-200 p-6' : 'pb-4 border-b border-gray-100 last:border-b-0'}`}
            >
              {/* Result Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {getTypeIcon(result.type)}
                  <span className="font-medium">{result.source}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {formatTimeAgo(result.timestamp)}
                  </span>
                  {result.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        {result.location}
                      </span>
                    </>
                  )}
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-xs text-blue-600 font-medium">
                      {result.relevanceScore}% relevancia
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Title */}
              <h3 className="mb-2">
                <button
                  onClick={() => handleResultClick(result)}
                  className="text-xl text-blue-700 hover:text-blue-800 hover:underline font-normal leading-relaxed text-left"
                >
                  {result.title}
                </button>
              </h3>

              {/* URL Display */}
              <div className="mb-3 text-sm text-green-800">
                <span className="flex items-center gap-1">
                  <span>{result.url.startsWith('http') ? new URL(result.url).hostname : 'nuestro-pulso.vercel.app'}</span>
                  <FaExternalLinkAlt className="w-3 h-3 opacity-50" />
                </span>
              </div>

              {/* Result Description */}
              <p className={`text-gray-700 mb-3 leading-relaxed ${
                isExpanded ? '' : 'line-clamp-2'
              }`}>
                {result.description}
              </p>

              {/* Author and Category */}
              {(result.author || result.category) && (
                <div className="mb-3 text-sm text-gray-600">
                  {result.author && <span>Por {result.author}</span>}
                  {result.author && result.category && <span> • </span>}
                  {result.category && <span>Categoría: {result.category}</span>}
                </div>
              )}

              {/* Tags (if expanded) */}
              {isExpanded && result.tags && result.tags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {result.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Result Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleExpanded(result.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                  </button>
                  
                  <button
                    onClick={() => shareResult(result)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                    title="Compartir"
                  >
                    <FaShare className="w-3 h-3" />
                    <span className="hidden sm:inline">Compartir</span>
                  </button>
                  
                  <button
                    onClick={() => toggleBookmark(result.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isBookmarked 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title={isBookmarked ? 'Quitar de guardados' : 'Guardar'}
                  >
                    <FaBookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">
                      {isBookmarked ? 'Guardado' : 'Guardar'}
                    </span>
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleResultClick(result)}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    Abrir
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Load More / Pagination */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando más resultados...</span>
              </div>
            ) : (
              'Cargar más resultados'
            )}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && results.length === 0 && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Buscando resultados...</p>
        </div>
      )}
    </div>
  );
};

export default GoogleClassSearchResults;