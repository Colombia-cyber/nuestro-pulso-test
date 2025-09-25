import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaBookmark, FaChevronUp, FaChevronDown,
  FaFire, FaClock, FaGlobe, FaSearch, FaFilter, FaExclamationTriangle,
  FaCheckCircle, FaSpinner, FaRedo, FaTimes, FaInfo
} from 'react-icons/fa';
import { MdVerified, MdLiveTv } from 'react-icons/md';
import { BiTrendingUp } from 'react-icons/bi';

import videoSourcesService, { VideoSource } from '../services/videoSourcesService';
import RobustVideoPlayer from './RobustVideoPlayer';

interface ReelsHubState {
  videos: VideoSource[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  sources: Array<{ name: string; success: boolean; error?: string; count: number }>;
  totalSources: number;
  successfulSources: number;
  selectedPlatform: string;
  selectedCategory: string;
  searchQuery: string;
  showSourcesInfo: boolean;
  likedVideos: Set<string>;
  bookmarkedVideos: Set<string>;
  followedAuthors: Set<string>;
}

const RobustReelsHub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ReelsHubState>({
    videos: [],
    currentIndex: 0,
    isLoading: true,
    error: null,
    sources: [],
    totalSources: 0,
    successfulSources: 0,
    selectedPlatform: 'all',
    selectedCategory: 'all',
    searchQuery: '',
    showSourcesInfo: false,
    likedVideos: new Set(),
    bookmarkedVideos: new Set(),
    followedAuthors: new Set()
  });

  const [filteredVideos, setFilteredVideos] = useState<VideoSource[]>([]);

  // Load videos on component mount and when filters change
  useEffect(() => {
    loadVideos();
  }, []);

  // Update filtered videos when videos or filters change
  useEffect(() => {
    filterVideos();
  }, [state.videos, state.selectedPlatform, state.selectedCategory, state.searchQuery]);

  const loadVideos = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await videoSourcesService.fetchVideos();
      
      setState(prev => ({
        ...prev,
        videos: result.videos,
        sources: result.sources,
        totalSources: result.totalSources,
        successfulSources: result.successfulSources,
        isLoading: false,
        currentIndex: 0
      }));

      if (result.videos.length === 0) {
        setState(prev => ({
          ...prev,
          error: 'No se pudieron cargar videos de ninguna fuente. Revisa la configuración de las APIs.'
        }));
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido al cargar videos',
        isLoading: false
      }));
    }
  };

  const filterVideos = () => {
    let filtered = [...state.videos];

    // Platform filter
    if (state.selectedPlatform !== 'all') {
      filtered = filtered.filter(video => video.platform === state.selectedPlatform);
    }

    // Category filter
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === state.selectedCategory);
    }

    // Search filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.author.name.toLowerCase().includes(query) ||
        video.hashtags.some(tag => tag.toLowerCase().includes(query)) ||
        video.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    setFilteredVideos(filtered);
    
    // Reset current index if filtered results change
    if (filtered.length > 0 && state.currentIndex >= filtered.length) {
      setState(prev => ({ ...prev, currentIndex: 0 }));
    }
  };

  const nextVideo = () => {
    if (filteredVideos.length > 0) {
      setState(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % filteredVideos.length
      }));
    }
  };

  const prevVideo = () => {
    if (filteredVideos.length > 0) {
      setState(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex - 1 + filteredVideos.length) % filteredVideos.length
      }));
    }
  };

  const handleVideoInteraction = (action: 'like' | 'bookmark' | 'follow', videoId: string, authorName?: string) => {
    setState(prev => {
      const newState = { ...prev };
      
      switch (action) {
        case 'like':
          newState.likedVideos = new Set(prev.likedVideos);
          if (newState.likedVideos.has(videoId)) {
            newState.likedVideos.delete(videoId);
          } else {
            newState.likedVideos.add(videoId);
          }
          break;
          
        case 'bookmark':
          newState.bookmarkedVideos = new Set(prev.bookmarkedVideos);
          if (newState.bookmarkedVideos.has(videoId)) {
            newState.bookmarkedVideos.delete(videoId);
          } else {
            newState.bookmarkedVideos.add(videoId);
          }
          break;
          
        case 'follow':
          if (authorName) {
            newState.followedAuthors = new Set(prev.followedAuthors);
            if (newState.followedAuthors.has(authorName)) {
              newState.followedAuthors.delete(authorName);
            } else {
              newState.followedAuthors.add(authorName);
            }
          }
          break;
      }
      
      return newState;
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformEmoji = (platform: string): string => {
    switch (platform) {
      case 'youtube': return '📺';
      case 'google-news': return '📰';
      case 'news-feed': return '📡';
      case 'local': return '🏠';
      case 'primary': return '🎯';
      case 'mock': return '🎬';
      default: return '📱';
    }
  };

  const getUniqueValues = (videos: VideoSource[], key: keyof VideoSource): string[] => {
    const values = new Set(videos.map(video => String(video[key])));
    return Array.from(values).filter(Boolean).sort();
  };

  const currentVideo = filteredVideos[state.currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return; // Don't interfere with input fields
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          prevVideo();
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextVideo();
          break;
        case ' ':
          e.preventDefault();
          // Video player handles play/pause
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filteredVideos.length]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <FaSpinner className="w-16 h-16 mx-auto mb-6 animate-spin text-red-500" />
          <h2 className="text-2xl font-bold mb-4">Cargando Reels...</h2>
          <p className="text-slate-300 mb-4">Conectando con múltiples fuentes de video</p>
          
          {/* Loading progress indicators */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm">
              <span>Fuentes principales</span>
              <FaSpinner className="animate-spin" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>APIs de video</span>
              <FaSpinner className="animate-spin" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Contenido de respaldo</span>
              <FaSpinner className="animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.error && filteredVideos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto p-8">
          <FaExclamationTriangle className="w-16 h-16 mx-auto mb-6 text-red-500" />
          <h2 className="text-2xl font-bold mb-4">Error al Cargar Reels</h2>
          <p className="text-slate-300 mb-6">{state.error}</p>
          
          <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Estado de las Fuentes:</h3>
            <div className="space-y-2 text-sm">
              {state.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{source.name}</span>
                  <div className="flex items-center gap-2">
                    {source.success ? (
                      <><FaCheckCircle className="text-green-500" /> {source.count} videos</>
                    ) : (
                      <><FaTimes className="text-red-500" /> Error</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={loadVideos}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <FaRedo className="w-4 h-4" />
              Reintentar Carga
            </button>
            
            <div className="text-xs text-slate-400">
              <p>Asegúrate de que las variables de entorno estén configuradas correctamente.</p>
              <p>Consulta la documentación para más información sobre la configuración de APIs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" ref={containerRef}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🎬 Reels Hub Robusto
              </h1>
              <p className="text-white/90">
                Video integrado desde múltiples fuentes con fallback automático
              </p>
            </div>
            
            <button
              onClick={() => setState(prev => ({ ...prev, showSourcesInfo: !prev.showSourcesInfo }))}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <FaInfo className="w-4 h-4" />
              Fuentes ({state.successfulSources}/{state.totalSources})
            </button>
          </div>

          {/* Sources Info Panel */}
          {state.showSourcesInfo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Estado de las Fuentes de Video</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.sources.map((source, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      source.success
                        ? 'bg-green-600/20 border-green-500/30'
                        : 'bg-red-600/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{source.name}</span>
                      {source.success ? (
                        <FaCheckCircle className="text-green-400" />
                      ) : (
                        <FaTimes className="text-red-400" />
                      )}
                    </div>
                    <div className="text-sm text-white/80">
                      {source.success ? (
                        <span>✅ {source.count} videos cargados</span>
                      ) : (
                        <span>❌ {source.error || 'Error de conexión'}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Buscar por título, autor, hashtags..."
                  value={state.searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={state.selectedPlatform}
                onChange={(e) => setState(prev => ({ ...prev, selectedPlatform: e.target.value, currentIndex: 0 }))}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-slate-800 text-white">🌐 Todas las plataformas</option>
                {getUniqueValues(state.videos, 'platform').map(platform => (
                  <option key={platform} value={platform} className="bg-slate-800 text-white">
                    {getPlatformEmoji(platform)} {platform}
                  </option>
                ))}
              </select>
              
              <select
                value={state.selectedCategory}
                onChange={(e) => setState(prev => ({ ...prev, selectedCategory: e.target.value, currentIndex: 0 }))}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="bg-slate-800 text-white">📂 Todas las categorías</option>
                {getUniqueValues(state.videos, 'category').map(category => (
                  <option key={category} value={category} className="bg-slate-800 text-white">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-4 text-white/80">
            <span>
              Mostrando {filteredVideos.length} de {state.videos.length} videos
              {state.selectedPlatform !== 'all' && ` • Plataforma: ${state.selectedPlatform}`}
              {state.selectedCategory !== 'all' && ` • Categoría: ${state.selectedCategory}`}
            </span>
            {filteredVideos.length > 0 && (
              <span>
                Video {state.currentIndex + 1} de {filteredVideos.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {filteredVideos.length > 0 && currentVideo ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="relative aspect-video">
                  <RobustVideoPlayer
                    video={currentVideo}
                    autoPlay={false}
                    muted={true}
                    onError={(error) => console.error('Video player error:', error)}
                  />
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
                      <p className="text-slate-300 leading-relaxed line-clamp-3">{currentVideo.description}</p>
                    </div>
                    <div className="ml-4 text-2xl">
                      {getPlatformEmoji(currentVideo.platform)}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{currentVideo.author.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{currentVideo.author.name}</h3>
                        {currentVideo.author.verified && <MdVerified className="text-blue-400" />}
                        {currentVideo.factChecked && (
                          <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">✅ Verificado</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{currentVideo.author.followers} seguidores</span>
                        <span>{currentVideo.timestamp}</span>
                        {currentVideo.location && <span>📍 {currentVideo.location}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleVideoInteraction('follow', currentVideo.id, currentVideo.author.name)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        state.followedAuthors.has(currentVideo.author.name)
                          ? 'bg-gray-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {state.followedAuthors.has(currentVideo.author.name) ? 'Siguiendo' : 'Seguir'}
                    </button>
                  </div>

                  {/* AI Summary */}
                  {currentVideo.aiSummary && (
                    <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">🤖 Resumen IA</h4>
                      <p className="text-slate-300 text-sm">{currentVideo.aiSummary}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-400">{formatNumber(currentVideo.views)}</div>
                      <div className="text-xs text-slate-400">Vistas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-pink-400">{formatNumber(currentVideo.likes)}</div>
                      <div className="text-xs text-slate-400">Me gusta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">{formatNumber(currentVideo.comments)}</div>
                      <div className="text-xs text-slate-400">Comentarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{formatNumber(currentVideo.shares)}</div>
                      <div className="text-xs text-slate-400">Compartidos</div>
                    </div>
                  </div>

                  {/* Topics and Hashtags */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {currentVideo.topics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentVideo.hashtags.map((hashtag, index) => (
                        <span key={index} className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Action Buttons */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Acciones</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleVideoInteraction('like', currentVideo.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      state.likedVideos.has(currentVideo.id)
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <FaHeart className="w-5 h-5" />
                    <span>{state.likedVideos.has(currentVideo.id) ? 'Te gusta' : 'Me gusta'}</span>
                  </button>
                  
                  <button
                    onClick={() => handleVideoInteraction('bookmark', currentVideo.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      state.bookmarkedVideos.has(currentVideo.id)
                        ? 'bg-yellow-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <FaBookmark className="w-5 h-5" />
                    <span>{state.bookmarkedVideos.has(currentVideo.id) ? 'Guardado' : 'Guardar'}</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    <FaComment className="w-5 h-5" />
                    <span>Comentar</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    <FaShare className="w-5 h-5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Navegación</h3>
                <div className="space-y-3">
                  <button
                    onClick={prevVideo}
                    disabled={filteredVideos.length <= 1}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <FaChevronUp className="w-5 h-5" />
                    <span>Video anterior</span>
                  </button>
                  
                  <button
                    onClick={nextVideo}
                    disabled={filteredVideos.length <= 1}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <FaChevronDown className="w-5 h-5" />
                    <span>Siguiente video</span>
                  </button>
                </div>
                
                <div className="mt-4 text-center text-slate-400 text-sm">
                  <p>Usa ↑↓ para navegar</p>
                  <p>Espacio para play/pause</p>
                </div>
              </div>

              {/* Related Videos */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Videos Relacionados</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredVideos.slice(0, 10).map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => setState(prev => ({ ...prev, currentIndex: index }))}
                      className={`cursor-pointer rounded-lg p-3 transition-all ${
                        index === state.currentIndex
                          ? 'bg-blue-600/30 border border-blue-500'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="text-2xl">{getPlatformEmoji(video.platform)}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm line-clamp-2">{video.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <span>{video.author.name}</span>
                            {video.author.verified && <MdVerified className="text-blue-400" />}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                            <span>{formatNumber(video.views)} vistas</span>
                            <span>{video.duration}</span>
                            {video.isLive && <span className="text-red-400">🔴 LIVE</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No se encontraron videos</h3>
            <p className="text-slate-400 mb-4">
              {state.searchQuery || state.selectedPlatform !== 'all' || state.selectedCategory !== 'all'
                ? 'Prueba ajustando los filtros de búsqueda'
                : 'No hay videos disponibles en este momento'}
            </p>
            {(state.searchQuery || state.selectedPlatform !== 'all' || state.selectedCategory !== 'all') && (
              <button
                onClick={() => setState(prev => ({
                  ...prev,
                  searchQuery: '',
                  selectedPlatform: 'all',
                  selectedCategory: 'all',
                  currentIndex: 0
                }))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RobustReelsHub;