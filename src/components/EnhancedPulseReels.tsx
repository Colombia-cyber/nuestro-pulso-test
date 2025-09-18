import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getVisibleCategories } from '../config/categories';
import { PulseReel } from '../types/pulseReel';
import { pulseReels as samplePulseReels } from '../data/pulseReels';

// Enhanced video player component with better error handling
const VideoPlayer: React.FC<{ 
  reel: PulseReel; 
  isActive: boolean; 
  onLoadError: () => void;
}> = ({ reel, isActive, onLoadError }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setHasError(true);
          onLoadError();
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
    onLoadError();
  };

  // Create thumbnail with fallback
  const getThumbnailContent = () => {
    if (hasError) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-red-500 flex flex-col items-center justify-center text-white">
          <div className="text-6xl mb-4">
            {reel.topic === 'Politics' ? '🗳️' :
             reel.topic === 'Participation' ? '🤝' :
             reel.topic === 'Environment' ? '🌱' :
             reel.topic === 'Education' ? '💻' :
             reel.topic === 'Technology' ? '📱' :
             reel.topic === 'Social' ? '⚖️' : '📺'}
          </div>
          <h3 className="text-lg font-bold text-center px-4 mb-2">{reel.title}</h3>
          <p className="text-sm text-white/80 text-center px-4">{reel.summary}</p>
        </div>
      );
    }

    // Use YouTube thumbnail if available
    const embedId = getYouTubeEmbedId(reel.videoUrl || '');
    if (embedId) {
      return (
        <img 
          src={`https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasError(true)}
          onLoad={handleVideoLoad}
        />
      );
    }

    // Fallback to custom thumbnail
    return (
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-red-500 flex items-center justify-center"
        style={{
          backgroundImage: reel.thumbnailUrl ? `url(${reel.thumbnailUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-white text-center p-4">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-lg font-bold mb-2">{reel.title}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden group">
      {getThumbnailContent()}
      
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Play button and controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handlePlay}
          className="bg-black/70 hover:bg-black/80 text-white rounded-full p-4 transform scale-100 hover:scale-110 transition-all duration-200 shadow-2xl"
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 4a1 1 0 011 1v10a1 1 0 01-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 01-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 5l6 5-6 5V5z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
        {reel.duration}
      </div>

      {/* Live indicator */}
      {reel.isLive && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          🔴 EN VIVO
        </div>
      )}

      {/* Hover overlay with additional info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="text-white">
          <p className="text-sm font-medium mb-1">{reel.organization}</p>
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{reel.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2 mb-3">{reel.summary}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <span>👁️</span>
                <span>{reel.views.toLocaleString()}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{reel.likes.toLocaleString()}</span>
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedPulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<PulseReel[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'vertical'>('grid');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const batchSize = 6;

  // Get categories from configuration
  const visibleCategories = getVisibleCategories();

  // Load reels with enhanced error handling
  const loadReels = useCallback(async (pageNum: number, category: string, reset = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter reels by category
      let filteredReels = category === 'todos' 
        ? samplePulseReels 
        : samplePulseReels.filter(reel => {
            const categoryMap: Record<string, string> = {
              'Politics': 'politica',
              'Participation': 'participacion', 
              'Environment': 'ambiente',
              'Education': 'educacion',
              'Technology': 'tecnologia',
              'Social': 'social'
            };
            return categoryMap[reel.topic] === category;
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

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los reels';
      setError(errorMessage);
      
      // Use fallback content on error
      if (reels.length === 0) {
        setReels(samplePulseReels.slice(0, batchSize));
      }
    } finally {
      setIsLoading(false);
    }
  }, [batchSize, reels.length]);

  // Initialize reels on mount and category change
  useEffect(() => {
    setPage(1);
    loadReels(1, selectedCategory, true);
  }, [selectedCategory, loadReels]);

  // Intersection Observer for infinite scroll
  const lastReelElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          loadReels(nextPage, selectedCategory);
          return nextPage;
        });
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, selectedCategory, loadReels]);

  const handleVideoError = () => {
    // Handle individual video errors gracefully
    console.warn('Video failed to load, showing fallback content');
  };

  const getGridClass = () => {
    if (viewMode === 'vertical') {
      return 'flex flex-col space-y-4';
    }
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  };

  const getReelClass = () => {
    if (viewMode === 'vertical') {
      return 'h-[70vh] max-w-sm mx-auto';
    }
    return 'h-80';
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className={getGridClass()}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`${getReelClass()} bg-gray-300 rounded-lg animate-pulse`}>
          <div className="h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-xl mb-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
              <p className="text-white/90 text-lg">Videos cortos sobre temas cívicos y participación ciudadana</p>
            </div>
            <div className="mt-4 md:mt-0 text-white/80">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span>🎥</span>
                  <span>{reels.length} videos</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>👁️</span>
                  <span>150K+ vistas</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>📱</span>
                  <span>HD Quality</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🔳 Grid
              </button>
              <button
                onClick={() => setViewMode('vertical')}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'vertical'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📱 Vertical
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <span className="text-red-500 text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-red-800 font-semibold">Error al cargar los reels</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reels Grid/Vertical */}
        {!isLoading || reels.length > 0 ? (
          <div className="mb-8">
            <div className={getGridClass()}>
              {reels.map((reel, index) => (
                <div 
                  key={`${reel.title}-${index}`}
                  className={`${getReelClass()} bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]`}
                  ref={index === reels.length - 1 ? lastReelElementRef : null}
                >
                  {/* Video Player */}
                  <div className="h-full relative">
                    <VideoPlayer 
                      reel={reel} 
                      isActive={true} 
                      onLoadError={handleVideoError}
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        reel.topic === 'Politics' ? 'bg-blue-600' :
                        reel.topic === 'Participation' ? 'bg-green-600' :
                        reel.topic === 'Environment' ? 'bg-emerald-600' :
                        reel.topic === 'Education' ? 'bg-purple-600' :
                        reel.topic === 'Technology' ? 'bg-indigo-600' :
                        reel.topic === 'Social' ? 'bg-pink-600' : 'bg-gray-600'
                      }`}>
                        {visibleCategories.find(c => {
                          const categoryMap: Record<string, string> = {
                            'Politics': 'politica',
                            'Participation': 'participacion',
                            'Environment': 'ambiente', 
                            'Education': 'educacion',
                            'Technology': 'tecnologia',
                            'Social': 'social'
                          };
                          return c.id === categoryMap[reel.topic];
                        })?.name || reel.topic}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading more indicator */}
            {isLoading && reels.length > 0 && (
              <div className="mt-6">
                <LoadingSkeleton />
              </div>
            )}

            {/* End of content indicator */}
            {!hasMore && reels.length > 0 && (
              <div className="text-center mt-8 text-gray-500">
                <div className="text-2xl mb-2">✨</div>
                <p>Has visto todos los reels disponibles</p>
              </div>
            )}
          </div>
        ) : (
          <LoadingSkeleton />
        )}

        {/* Live Stream Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 mb-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse mr-3">
                  🔴 EN VIVO
                </div>
                <span className="text-white/80">5,847 espectadores</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Sesión del Congreso: Debate sobre Reforma Tributaria
              </h3>
              <p className="text-white/90">
                Transmisión en vivo del debate en el Senado sobre las modificaciones a la reforma tributaria 2024
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Unirse al Live
              </button>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔥</span>
            Trending en Reels
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              '#ParticipacionCiudadana',
              '#TransparenciaGobierno', 
              '#VotoJoven',
              '#CambioClimatico',
              '#EducacionDigital',
              '#ControlCorrupcion',
              '#ReformaTributaria',
              '#5GColombia',
              '#JusticiaRestaurativa'
            ].map((hashtag, index) => (
              <button
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md"
              >
                {hashtag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPulseReels;