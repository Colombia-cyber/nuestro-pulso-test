import React, { useState, useEffect, useCallback } from 'react';
import { FiPlay, FiClock, FiEye, FiRefreshCw, FiSearch, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import newsVideosService, { NewsVideo, NewsVideosResponse } from '../services/newsVideosService';

interface LiveNewsVideosProps {
  onNavigate?: (view: string) => void;
  className?: string;
  showSearch?: boolean;
  maxVideos?: number;
  autoRefresh?: boolean;
}

const LiveNewsVideos: React.FC<LiveNewsVideosProps> = ({
  onNavigate,
  className = '',
  showSearch = true,
  maxVideos = 12,
  autoRefresh = false
}) => {
  const [videos, setVideos] = useState<NewsVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'search' | 'trending'>('trending');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load videos
  const loadVideos = useCallback(async (query: string = '', mode: 'search' | 'trending' = 'trending') => {
    setLoading(videos.length === 0); // Only show loading for initial load
    setError(null);
    
    try {
      let response: NewsVideosResponse;
      
      if (mode === 'trending') {
        response = await newsVideosService.getTrendingNewsVideos(maxVideos);
      } else {
        response = await newsVideosService.searchNewsVideos(query, maxVideos);
      }
      
      setVideos(response.videos);
      setLastUpdated(response.timestamp);
      
    } catch (err) {
      console.error('Error loading videos:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los videos');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [maxVideos]);

  // Initial load
  useEffect(() => {
    loadVideos('', viewMode);
  }, [loadVideos, viewMode]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      loadVideos(searchQuery, viewMode);
    }, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [autoRefresh, loadVideos, searchQuery, viewMode]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setViewMode('search');
    loadVideos(searchQuery, 'search');
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadVideos(searchQuery, viewMode);
  };

  // Handle video click
  const handleVideoClick = (video: NewsVideo) => {
    newsVideosService.openVideo(video);
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Video card component
  const VideoCard: React.FC<{ video: NewsVideo }> = ({ video }) => (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
      onClick={() => handleVideoClick(video)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={newsVideosService.getVideoThumbnail(video)}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <FiPlay className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        {video.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            🔴 EN VIVO
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 font-medium">
          {video.channelTitle}
        </p>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <FiEye className="mr-1" />
              {newsVideosService.formatViewCount(video.viewCount)}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-1" />
              {newsVideosService.formatPublishedDate(video.publishedAt)}
            </span>
          </div>
          <FiExternalLink className="text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            📺 Videos de Noticias en Vivo
          </h2>
          <p className="text-gray-600">
            Las últimas noticias de Colombia en video
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Última actualización: {new Date(lastUpdated).toLocaleTimeString('es-CO')}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* View mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('trending')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'trending'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTrendingUp className="inline mr-2" />
              Tendencias
            </button>
            <button
              onClick={() => setViewMode('search')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'search'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiSearch className="inline mr-2" />
              Buscar
            </button>
          </div>
          
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Search form */}
      {showSearch && viewMode === 'search' && (
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar noticias colombianas (ej: 'elecciones', 'congreso', 'economía')..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <FiSearch className="mr-2" />
              Buscar
            </button>
          </div>
        </form>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Error al cargar videos</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && <LoadingSkeleton />}

      {/* Videos grid */}
      {!loading && !error && (
        <>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron videos
              </h3>
              <p className="text-gray-600 mb-6">
                {viewMode === 'search' 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'No hay videos disponibles en este momento'
                }
              </p>
              <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
          )}
        </>
      )}

      {/* Footer info */}
      {!loading && videos.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Mostrando {videos.length} videos de noticias colombianas
            {viewMode === 'search' && searchQuery && (
              <span> para "{searchQuery}"</span>
            )}
          </p>
          <p className="mt-1">
            Los videos se actualizan automáticamente cada 5 minutos
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveNewsVideos;