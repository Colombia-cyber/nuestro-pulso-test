import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteReels } from '../hooks/useInfiniteScroll';
import { dataService } from '../services/dataService';
import { ReelData } from '../data/mockDataGenerator';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [liveContent, setLiveContent] = useState<ReelData[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'terror', name: 'Terror', icon: '🚨' },
    { id: 'tecnologia', name: 'Technology', icon: '💻' }
  ];

  // Use infinite scroll hook for reels
  const {
    data: reels,
    loading,
    error,
    hasMore,
    totalItems,
    metadata,
    refresh,
    retry,
    observeElement
  } = useInfiniteReels({
    category: selectedCategory,
    enabled: true
  });

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (sentinelRef.current) {
      observeElement(sentinelRef.current);
    }
  }, [observeElement]);

  // Load trending topics and live content
  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const [trending, live] = await Promise.all([
          dataService.getTrendingTopics(selectedCategory),
          dataService.getLiveContent()
        ]);
        setTrendingTopics(trending);
        setLiveContent(live.reels);
      } catch (err) {
        console.warn('Failed to load additional data:', err);
      }
    };

    loadAdditionalData();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleReelClick = (reel: ReelData) => {
    // Simulate reel click with responsive feedback
    console.log('Playing reel:', reel.title);
    // Here you would typically open a video player or navigate to reel details
  };

  // Loading skeleton for reels
  const LoadingSkeletonReels = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

  // Error state for reels with retry functionality
  const ErrorStateReels = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📱</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar Reels</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={retry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
        <button 
          onClick={refresh}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Recargar todo
        </button>
      </div>
    </div>
  );

  // Loading more indicator
  const LoadingMore = () => (
    <div className="text-center py-8">
      <div className="inline-flex items-center space-x-2 text-gray-600">
        <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <span>Cargando más reels...</span>
      </div>
    </div>
  );

  // No more content indicator
  const NoMoreContent = () => (
    <div className="text-center py-8">
      <div className="text-4xl mb-2">🎉</div>
      <p className="text-gray-600">¡Has visto todos los reels disponibles!</p>
      <button 
        onClick={refresh}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Actualizar contenido
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
          <p className="text-white/90">Videos cortos sobre temas cívicos y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🎥 {totalItems.toLocaleString()}+ videos disponibles</span>
            <span>👁️ Contenido actualizado 24/7</span>
            <span>📱 Optimizado para móvil</span>
            {metadata && (
              <span className="text-xs">
                {metadata.source === 'cache' ? '⚡ Desde cache' : 
                 metadata.source === 'fallback' ? '🔧 Modo offline' : '🌐 En vivo'}
              </span>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
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
        </div>

        {/* Live Content Section */}
        {liveContent.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-900 flex items-center">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm mr-2 animate-pulse">
                  🔴 EN VIVO
                </span>
                Contenido en Directo
              </h3>
              <span className="text-sm text-red-700">{liveContent.length} streams activos</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveContent.slice(0, 3).map((liveReel) => (
                <div 
                  key={liveReel.id} 
                  onClick={() => handleReelClick(liveReel)}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{liveReel.thumbnail}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {liveReel.title}
                      </h4>
                      <p className="text-xs text-gray-600">{liveReel.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span>👁️ {liveReel.views.toLocaleString()}</span>
                        <span>•</span>
                        <span className="text-red-600 font-medium">EN VIVO</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reels Grid */}
        <div className="mb-8">
          {loading && reels.length === 0 ? (
            <LoadingSkeletonReels />
          ) : error ? (
            <ErrorStateReels />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reels.map((reel) => (
                  <div 
                    key={reel.id} 
                    onClick={() => handleReelClick(reel)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Thumbnail */}
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <div className="text-6xl">{reel.thumbnail}</div>
                      {reel.isLive && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          🔴 LIVE
                        </div>
                      )}
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
                          reel.category === 'terror' ? 'bg-red-100 text-red-800' :
                          reel.category === 'trump' ? 'bg-orange-100 text-orange-800' :
                          reel.category === 'tecnologia' ? 'bg-indigo-100 text-indigo-800' :
                          reel.category === 'congreso' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.id === reel.category)?.name || reel.category}
                        </span>
                        <span className="text-xs text-gray-500">{reel.author}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          Ver ahora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Infinite scroll loading states */}
              {loading && reels.length > 0 && <LoadingMore />}
              
              {/* Sentinel element for infinite scroll */}
              <div ref={sentinelRef} className="h-4"></div>
              
              {!hasMore && reels.length > 0 && <NoMoreContent />}
            </>
          )}
        </div>

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
                <span>👥 {(5847 + Math.floor(Math.random() * 1000)).toLocaleString()} espectadores</span>
                <span>⏰ Comenzó hace 1h 23m</span>
              </div>
            </div>
            <button 
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors"
              onClick={() => console.log('Joining live stream')}
            >
              Unirse
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Trending en Reels</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.length > 0 ? (
              trendingTopics.map((hashtag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => console.log('Searching for:', hashtag)}
                >
                  {hashtag}
                </span>
              ))
            ) : (
              ['#ParticipacionCiudadana', '#TransparenciaGobierno', '#VotoJoven', '#CambioClimatico'].map((hashtag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => console.log('Searching for:', hashtag)}
                >
                  {hashtag}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;