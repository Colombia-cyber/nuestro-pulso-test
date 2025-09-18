import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getVisibleCategories } from '../config/categories';
import { PulseReel } from '../types/pulseReel';
import { pulseReels as samplePulseReels } from '../data/pulseReels';

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

// Legacy interface for backward compatibility with existing UI
interface Reel {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  author: string;
  videoUrl?: string;
  embedUrl?: string;
}

// Function to convert PulseReel to legacy Reel format for UI compatibility
const convertPulseReelToReel = (pulseReel: PulseReel, index: number): Reel => {
  // Map topics to categories used by the UI
  const topicToCategoryMap: Record<string, string> = {
    'Politics': 'politica',
    'Participation': 'participacion',
    'Environment': 'ambiente',
    'Education': 'educacion',
    'Technology': 'tecnologia',
    'Social': 'social'
  };

  // Map topics to emojis for thumbnails
  const topicToEmojiMap: Record<string, string> = {
    'Politics': '🗳️',
    'Participation': '🤝',
    'Environment': '🌍',
    'Education': '💻',
    'Technology': '📱',
    'Social': '⚖️'
  };

  return {
    id: index + 1,
    title: pulseReel.title,
    description: pulseReel.summary,
    category: topicToCategoryMap[pulseReel.topic] || 'general',
    duration: pulseReel.duration,
    views: pulseReel.views,
    likes: pulseReel.likes,
    thumbnail: topicToEmojiMap[pulseReel.topic] || '📺',
    author: pulseReel.organization,
    videoUrl: pulseReel.videoUrl,
    embedUrl: pulseReel.videoUrl ? `https://www.youtube.com/embed/dQw4w9WgXcQ` : undefined
  };
};

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<Reel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allReelsLoaded, setAllReelsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // Configuration
  const infiniteScrollEnabled = getEnvVar('VITE_REELS_INFINITE_SCROLL', 'true') === 'true';
  const batchSize = parseInt(getEnvVar('VITE_REELS_LOAD_BATCH_SIZE', '6'));

  // Get categories from configuration
  const visibleCategories = getVisibleCategories();
  const categories = visibleCategories;

  // Convert sample pulse reels to legacy format for UI compatibility
  const convertedSampleReels = samplePulseReels.map((pulseReel, index) => 
    convertPulseReelToReel(pulseReel, index)
  );

  // Additional mock reels data for infinite scroll testing (keeping original mock data)
  const additionalMockReels: Reel[] = [
    {
      id: 7,
      title: 'Trump: Impacto en las relaciones Colombia-Estados Unidos',
      description: 'Análisis sobre las políticas comerciales de Trump y su efecto en Colombia',
      category: 'internacional',
      duration: '6:30',
      views: 45200,
      likes: 2890,
      thumbnail: '🇺🇸',
      author: 'CNN Colombia',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 8,
      title: 'Sesión extraordinaria del Congreso sobre reforma tributaria',
      description: 'Cobertura en vivo del debate parlamentario más importante del año',
      category: 'politica',
      duration: '12:45',
      views: 78900,
      likes: 4560,
      thumbnail: '🏛️',
      author: 'Canal Congreso',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 9,
      title: 'Alerta de seguridad: Amenazas terroristas en fronteras',
      description: 'Informe especial sobre medidas de seguridad en zonas fronterizas',
      category: 'seguridad',
      duration: '8:20',
      views: 23400,
      likes: 1890,
      thumbnail: '🚨',
      author: 'Caracol Noticias',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 10,
      title: 'Revolución digital: Colombia 5G para todos',
      description: 'Cómo la tecnología 5G transformará la conectividad en Colombia',
      category: 'tecnologia',
      duration: '4:15',
      views: 34500,
      likes: 2340,
      thumbnail: '💻',
      author: 'TechColombia',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 11,
      title: 'Justicia restaurativa: Nueva esperanza para las víctimas',
      description: 'Cómo la justicia restaurativa está sanando heridas en Colombia',
      category: 'social',
      duration: '7:15',
      views: 18300,
      likes: 1205,
      thumbnail: '⚖️',
      author: 'Centro de Memoria',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 12,
      title: 'Economía circular: El futuro sostenible de Colombia',
      description: 'Empresas colombianas lideran la transición hacia la economía circular',
      category: 'ambiente',
      duration: '5:45',
      views: 26800,
      likes: 1687,
      thumbnail: '♻️',
      author: 'EcoInnovación',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  // Combine converted sample reels with additional mock reels
  const allMockReels: Reel[] = [...convertedSampleReels, ...additionalMockReels];

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

      // Filter reels by category
      let filteredReels = category === 'todos' 
        ? allMockReels 
        : allMockReels.filter(reel => reel.category === category);

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
        const fallbackReels = allMockReels.slice(0, Math.min(batchSize, 3));
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
  const getVideoEmbedContent = (reel: Reel) => {
    if (reel.embedUrl) {
      return (
        <iframe
          src={reel.embedUrl}
          title={reel.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => {
            console.warn(`Failed to load video embed for reel ${reel.id}`);
          }}
        />
      );
    }
    
    // Fallback to thumbnail
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center">
          <div className="text-6xl mb-2">{reel.thumbnail}</div>
          <p className="text-white text-sm">Video no disponible</p>
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
                  key={reel.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  ref={infiniteScrollEnabled && index === filteredReels.length - 1 ? lastReelElementRef : null}
                >
                  {/* Video/Thumbnail */}
                  <div className="relative h-64 group-hover:scale-105 transition-transform overflow-hidden">
                    {getVideoEmbedContent(reel)}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {reel.duration}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                        ▶️
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                        reel.category === 'participacion' ? 'bg-green-100 text-green-800' :
                        reel.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                        reel.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                        reel.category === 'social' ? 'bg-pink-100 text-pink-800' :
                        reel.category === 'internacional' ? 'bg-yellow-100 text-yellow-800' :
                        reel.category === 'seguridad' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === reel.category)?.name || reel.category}
                      </span>
                      <span className="text-xs text-gray-500">{reel.author}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                      {reel.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reel.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <span>👁️</span>
                          <span>{reel.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>❤️</span>
                          <span>{reel.likes.toLocaleString()}</span>
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                        Ver ahora
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
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🔴 EN VIVO
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sesión del Congreso: Debate sobre Reforma Tributaria
              </h3>
              <p className="text-gray-600 mb-3">
                Transmisión en vivo del debate en el Senado sobre las modificaciones a la reforma tributaria 2024
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>👥 5,847 espectadores</span>
                <span>⏰ Comenzó hace 1h 23m</span>
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Unirse
            </button>
          </div>
        </div>

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