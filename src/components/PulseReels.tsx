import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getVisibleCategories } from '../config/categories';

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

export interface PulseReel {
  duration: string;
  topic: string;
  organization: string;
  title: string;
  summary: string;
  views: number;
  likes: number;
  videoUrl?: string;
  live?: boolean;
  liveViewers?: number;
  liveSince?: string;
}

export const pulseReels: PulseReel[] = [
  {
    duration: "2:30",
    topic: "Política",
    organization: "Registraduría Nacional",
    title: "Cómo participar en el proceso electoral colombiano",
    summary: "Guía rápida sobre tu derecho al voto y los requisitos para participar",
    views: 15420,
    likes: 892,
    videoUrl: "https://example.com/video1"
  },
  {
    duration: "3:15",
    topic: "Participación",
    organization: "Fundación Corona",
    title: "El poder de la participación ciudadana en tu municipio",
    summary: "Conoce cómo puedes influir en las decisiones locales de tu comunidad",
    views: 23100,
    likes: 1547,
    videoUrl: "https://example.com/video2"
  },
  {
    duration: "4:20",
    topic: "Participación",
    organization: "Transparencia Colombia",
    title: "Presupuestos participativos: Tu voz en las finanzas públicas",
    summary: "Aprende cómo los ciudadanos pueden decidir en qué se invierte el presupuesto",
    views: 8950,
    likes: 673,
    videoUrl: "https://example.com/video3"
  },
  {
    duration: "5:10",
    topic: "Ambiente",
    organization: "WWF Colombia",
    title: "Cambio climático y acción ciudadana en Colombia",
    summary: "Iniciativas locales que están marcando la diferencia ambiental",
    views: 31200,
    likes: 2156,
    videoUrl: "https://example.com/video4"
  },
  {
    duration: "3:45",
    topic: "Educación",
    organization: "MinEducación",
    title: "Educación digital: Cerrando la brecha tecnológica",
    summary: "Programas gubernamentales para mejorar el acceso a la educación digital",
    views: 12340,
    likes: 789,
    videoUrl: "https://example.com/video5"
  },
  {
    duration: "4:00",
    topic: "Política",
    organization: "Veeduría Ciudadana",
    title: "Control ciudadano a la corrupción",
    summary: "Herramientas y mecanismos para denunciar actos de corrupción",
    views: 19800,
    likes: 1342,
    videoUrl: "https://example.com/video6"
  },
  {
    duration: "EN VIVO",
    topic: "🔴 EN VIVO",
    organization: "Congreso de Colombia",
    title: "Sesión del Congreso: Debate sobre Reforma Tributaria",
    summary: "Transmisión en vivo del debate en el Senado sobre las modificaciones a la reforma tributaria 2024",
    views: 0,
    likes: 0,
    videoUrl: "https://example.com/live",
    live: true,
    liveViewers: 5847,
    liveSince: "hace 1h 23m"
  }
];

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<PulseReel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allReelsLoaded, setAllReelsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // Configuration
  const infiniteScrollEnabled = getEnvVar('REACT_APP_REELS_INFINITE_SCROLL', 'true') === 'true';
  const batchSize = parseInt(getEnvVar('REACT_APP_REELS_LOAD_BATCH_SIZE', '6'));

  // Get categories with technology hidden by default
  const visibleCategories = getVisibleCategories();
  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'live', name: 'En Vivo', icon: '🔴' },
    ...visibleCategories
  ];

  // Load reels with pagination and enhanced error handling
  const loadReels = useCallback(async (pageNum: number, category: string, reset = false) => {
    if (allReelsLoaded && !reset) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate network conditions and API delay
      const delay = Math.random() * 1000 + 300; // 300ms to 1.3s
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate network errors (reduced chance for better UX)
      if (Math.random() < 0.02 && retryCount < 2) {
        throw new Error('Error de conexión. Verificando conectividad...');
      }

      // Filter reels by category (map topics to categories for compatibility)
      let filteredReels = category === 'todos' 
        ? pulseReels 
        : pulseReels.filter(reel => {
            const topicLower = reel.topic.toLowerCase().replace('🔴 ', '');
            return topicLower === category || 
                   (category === 'politica' && topicLower === 'política') ||
                   (category === 'participacion' && topicLower === 'participación') ||
                   (category === 'ambiente' && topicLower === 'ambiente') ||
                   (category === 'educacion' && topicLower === 'educación') ||
                   (category === 'live' && reel.live === true);
          });

      // Paginate reels
      const startIndex = (pageNum - 1) * batchSize;
      const endIndex = startIndex + batchSize;
      const pageReels = filteredReels.slice(startIndex, endIndex);

      if (reset) {
        setReels(pageReels);
      } else {
        setReels(prev => [...prev, ...pageReels]);
      }

      // Check if there are more reels to load
      const hasMoreReels = endIndex < filteredReels.length;
      setHasMore(hasMoreReels);
      setAllReelsLoaded(!hasMoreReels);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión desconocido';
      setError(errorMessage);
      
      // Progressive fallback strategy
      if (reels.length === 0) {
        // If no reels loaded, show some basic fallback content
        const fallbackReels = pulseReels.slice(0, Math.min(batchSize, 3));
        setReels(fallbackReels);
        console.warn('Using fallback reels due to loading error:', errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [batchSize, allReelsLoaded, reels.length, retryCount]);

  // Initialize reels on mount and category change
  useEffect(() => {
    setPage(1);
    setAllReelsLoaded(false);
    loadReels(1, selectedCategory, true);
  }, [selectedCategory, loadReels]);

  // Intersection Observer for infinite scroll
  const lastReelElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && infiniteScrollEnabled) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          loadReels(nextPage, selectedCategory);
          return nextPage;
        });
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, infiniteScrollEnabled, selectedCategory, loadReels]);

  // Manual load more function
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        loadReels(nextPage, selectedCategory);
        return nextPage;
      });
    }
  };

  // Retry function for error state
  const handleRetry = () => {
    setError(null);
    setPage(1);
    setRetryCount(prev => prev + 1);
    setAllReelsLoaded(false);
    loadReels(1, selectedCategory, true);
  };

  // Video embed fallback function
  const getVideoEmbedContent = (reel: PulseReel) => {
    if (reel.videoUrl && !reel.live) {
      return (
        <iframe
          src={reel.videoUrl}
          title={reel.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => {
            console.warn(`Failed to load video embed for reel: ${reel.title}`);
          }}
        />
      );
    }
    
    // Fallback display based on topic
    const getTopicEmoji = (topic: string) => {
      if (topic.includes('EN VIVO')) return '🔴';
      if (topic.toLowerCase().includes('política')) return '🗳️';
      if (topic.toLowerCase().includes('participación')) return '🤝';
      if (topic.toLowerCase().includes('ambiente')) return '🌍';
      if (topic.toLowerCase().includes('educación')) return '💻';
      return '🎬';
    };
    
    return (
      <div className={`w-full h-full flex items-center justify-center ${
        reel.live ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-blue-500 to-purple-600'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-2">{getTopicEmoji(reel.topic)}</div>
          <p className="text-white text-sm">
            {reel.live ? 'Transmisión en vivo' : 'Video no disponible'}
          </p>
          {reel.live && reel.liveViewers && (
            <p className="text-white text-xs opacity-90 mt-1">
              {reel.liveViewers.toLocaleString()} espectadores
            </p>
          )}
        </div>
      </div>
    );
  };

  // Loading skeleton for reels
  const LoadingSkeletonReels = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="bg-gray-300 h-64"></div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-3 bg-gray-300 rounded"></div>
            </div>
            <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-3"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-3 bg-gray-300 rounded"></div>
                <div className="w-12 h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-16 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state for reels
  const ErrorStateReels = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📱</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar Reels</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={handleRetry}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Reintentar
      </button>
    </div>
  );

  const filteredReels = reels;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
          <p className="text-white/90">Videos cortos sobre temas cívicos y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🎥 {filteredReels.length} videos cargados</span>
            <span>👁️ 150K+ visualizaciones</span>
            <span>📱 Contenido móvil</span>
            {infiniteScrollEnabled && <span>🔄 Scroll infinito activado</span>}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && reels.length === 0 && <ErrorStateReels />}

        {/* Reels Grid */}
        {!error || reels.length > 0 ? (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReels.map((reel, index) => (
                <div 
                  key={`${reel.title}-${index}`} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer ${
                    reel.live ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                  }`}
                  ref={infiniteScrollEnabled && index === filteredReels.length - 1 ? lastReelElementRef : null}
                >
                  {/* Video/Thumbnail */}
                  <div className="relative h-64 group-hover:scale-105 transition-transform overflow-hidden">
                    {getVideoEmbedContent(reel)}
                    <div className={`absolute bottom-4 right-4 ${
                      reel.live ? 'bg-red-600' : 'bg-black bg-opacity-70'
                    } text-white px-2 py-1 rounded text-sm ${
                      reel.live ? 'animate-pulse' : ''
                    }`}>
                      {reel.duration}
                    </div>
                    {reel.live && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        🔴 EN VIVO
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                        {reel.live ? '📺' : '▶️'}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reel.topic.toLowerCase().includes('política') ? 'bg-blue-100 text-blue-800' :
                        reel.topic.toLowerCase().includes('participación') ? 'bg-green-100 text-green-800' :
                        reel.topic.toLowerCase().includes('ambiente') ? 'bg-emerald-100 text-emerald-800' :
                        reel.topic.toLowerCase().includes('educación') ? 'bg-purple-100 text-purple-800' :
                        reel.topic.toLowerCase().includes('en vivo') ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reel.topic}
                      </span>
                      <span className="text-xs text-gray-500">{reel.organization}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                      {reel.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reel.summary}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        {reel.live && reel.liveViewers ? (
                          <span className="flex items-center space-x-1 text-red-600">
                            <span>👥</span>
                            <span>{reel.liveViewers.toLocaleString()}</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1">
                            <span>👁️</span>
                            <span>{reel.views.toLocaleString()}</span>
                          </span>
                        )}
                        {!reel.live && (
                          <span className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>{reel.likes.toLocaleString()}</span>
                          </span>
                        )}
                        {reel.live && reel.liveSince && (
                          <span className="flex items-center space-x-1 text-red-600">
                            <span>⏰</span>
                            <span>{reel.liveSince}</span>
                          </span>
                        )}
                      </div>
                      <button className={`${
                        reel.live ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'
                      } font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}>
                        {reel.live ? 'Unirse' : 'Ver ahora'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading more indicator */}
            {isLoading && reels.length > 0 && (
              <div className="mt-6">
                <LoadingSkeletonReels count={3} />
              </div>
            )}

            {/* Manual Load More Button (shown when infinite scroll is disabled or on error) */}
            {!infiniteScrollEnabled && hasMore && !isLoading && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cargar más reels
                </button>
              </div>
            )}

            {/* End of content indicator */}
            {!hasMore && reels.length > 0 && (
              <div className="text-center mt-8 text-gray-500">
                <p>✨ Has visto todos los reels disponibles</p>
              </div>
            )}
          </div>
        ) : null}

        {/* Initial Loading State */}
        {isLoading && reels.length === 0 && !error && (
          <LoadingSkeletonReels />
        )}

        {/* Featured Live Stream */}
        {pulseReels.some(reel => reel.live) && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            {pulseReels.filter(reel => reel.live).map((liveReel, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  🔴 EN VIVO
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {liveReel.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {liveReel.summary}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {liveReel.liveViewers && (
                      <span>👥 {liveReel.liveViewers.toLocaleString()} espectadores</span>
                    )}
                    {liveReel.liveSince && (
                      <span>⏰ Comenzó {liveReel.liveSince}</span>
                    )}
                  </div>
                </div>
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Unirse
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Trending en Reels</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ParticipacionCiudadana',
              '#TransparenciaGobierno',
              '#VotoJoven',
              '#CambioClimatico',
              '#EducacionDigital',
              '#ControlCorrupcion',
              '#ReformaTributaria'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                tabIndex={0}
                role="button"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;