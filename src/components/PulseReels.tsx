import React, { useState, useEffect } from 'react';
import { ReelItem } from '../types/news';
import { getReelsByCategory, getAllReels } from '../data/mockReelsData';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<ReelItem[]>([]);

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

  // Simulate loading reels
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (2% chance)
        if (Math.random() < 0.02) {
          throw new Error('Error al cargar los reels. Verifica tu conexión.');
        }
        
        const categoryReels = selectedCategory === 'todos' 
          ? getAllReels() 
          : getReelsByCategory(selectedCategory);
        
        setReels(categoryReels);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 500 + Math.random() * 500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredReels = reels;

  // Loading skeleton for reels
  const LoadingSkeletonReels = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
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
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reintentar
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
            <span>🎥 24 videos esta semana</span>
            <span>👁️ 150K+ visualizaciones</span>
            <span>📱 Contenido móvil</span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Reels Grid */}
        <div className="mb-8">
          {isLoading ? (
            <LoadingSkeletonReels />
          ) : error ? (
            <ErrorStateReels />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReels.map((reel) => (
            <div key={reel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-6xl">{reel.thumbnail}</div>
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
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === reel.category)?.name}
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
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Ver ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
            </div>
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
                <span>👥 5,847 espectadores</span>
                <span>⏰ Comenzó hace 1h 23m</span>
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold">
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
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200"
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