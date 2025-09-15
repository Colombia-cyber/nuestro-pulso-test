import React, { useState, useEffect, useCallback } from 'react';

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
}

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<Reel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalLoaded, setTotalLoaded] = useState(0);

  // Categories excluding technology as requested
  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'terror', name: 'Terror News', icon: '🚨' },
    { id: 'economia', name: 'Economía', icon: '💰' }
    // Technology category deliberately excluded
  ];

  // Enhanced mock data with more reels and better terror news content
  const generateMockReels = (page: number, category: string): Reel[] => {
    const baseReels: Omit<Reel, 'id'>[] = [
      {
        title: 'Cómo participar en el proceso electoral colombiano',
        description: 'Guía rápida sobre tu derecho al voto y los requisitos para participar',
        category: 'politica',
        duration: '2:30',
        views: 15420,
        likes: 892,
        thumbnail: '🗳️',
        author: 'Registraduría Nacional'
      },
      {
        title: 'El poder de la participación ciudadana en tu municipio',
        description: 'Conoce cómo puedes influir en las decisiones locales de tu comunidad',
        category: 'participacion',
        duration: '3:15',
        views: 23100,
        likes: 1547,
        thumbnail: '🤝',
        author: 'Fundación Corona'
      },
      {
        title: 'Presupuestos participativos: Tu voz en las finanzas públicas',
        description: 'Aprende cómo los ciudadanos pueden decidir en qué se invierte el presupuesto',
        category: 'participacion',
        duration: '4:20',
        views: 8950,
        likes: 673,
        thumbnail: '💰',
        author: 'Transparencia Colombia'
      },
      {
        title: 'Cambio climático y acción ciudadana en Colombia',
        description: 'Iniciativas locales que están marcando la diferencia ambiental',
        category: 'ambiente',
        duration: '5:10',
        views: 31200,
        likes: 2156,
        thumbnail: '🌍',
        author: 'WWF Colombia'
      },
      {
        title: 'Educación digital: Cerrando la brecha tecnológica',
        description: 'Programas gubernamentales para mejorar el acceso a la educación digital',
        category: 'educacion',
        duration: '3:45',
        views: 12340,
        likes: 789,
        thumbnail: '💻',
        author: 'MinEducación'
      },
      {
        title: 'Control ciudadano a la corrupción',
        description: 'Herramientas y mecanismos para denunciar actos de corrupción',
        category: 'politica',
        duration: '4:00',
        views: 19800,
        likes: 1342,
        thumbnail: '⚖️',
        author: 'Veeduría Ciudadana'
      },
      {
        title: 'Trump: Impacto en las relaciones Colombia-Estados Unidos',
        description: 'Análisis sobre las políticas comerciales de Trump y su efecto en Colombia',
        category: 'trump',
        duration: '6:30',
        views: 45200,
        likes: 2890,
        thumbnail: '🇺🇸',
        author: 'CNN Colombia'
      },
      {
        title: 'Sesión extraordinaria del Congreso sobre reforma tributaria',
        description: 'Cobertura en vivo del debate parlamentario más importante del año',
        category: 'congreso',
        duration: '12:45',
        views: 78900,
        likes: 4560,
        thumbnail: '🏛️',
        author: 'Canal Congreso'
      },
      {
        title: 'Alerta de seguridad: Amenazas terroristas en fronteras',
        description: 'Informe especial sobre medidas de seguridad en zonas fronterizas',
        category: 'terror',
        duration: '8:20',
        views: 23400,
        likes: 1890,
        thumbnail: '🚨',
        author: 'Caracol Noticias'
      },
      {
        title: 'Análisis de riesgo: Terrorismo en Colombia',
        description: 'Expertos evalúan las amenazas terroristas actuales y medidas preventivas',
        category: 'terror',
        duration: '15:30',
        views: 56700,
        likes: 3240,
        thumbnail: '⚠️',
        author: 'Defensa Nacional'
      },
      {
        title: 'Impacto económico de las políticas de Trump en Colombia',
        description: 'Cómo las decisiones comerciales de Estados Unidos afectan nuestra economía',
        category: 'economia',
        duration: '7:45',
        views: 34500,
        likes: 2340,
        thumbnail: '📈',
        author: 'Portafolio'
      },
      {
        title: 'Reformas económicas 2024: Lo que debes saber',
        description: 'Análisis detallado de las nuevas medidas fiscales y su impacto en los ciudadanos',
        category: 'economia',
        duration: '9:15',
        views: 41200,
        likes: 2875,
        thumbnail: '💼',
        author: 'Banco de la República'
      }
    ];

    // Generate additional reels for pagination
    const additionalReels: Omit<Reel, 'id'>[] = [];
    const categoriesForGeneration = category === 'todos' ? categories.slice(1) : [categories.find(c => c.id === category)!];
    
    for (let i = 0; i < 8; i++) {
      const cat = categoriesForGeneration[i % categoriesForGeneration.length];
      additionalReels.push({
        title: `${cat.name}: Contenido Especial ${page * 10 + i}`,
        description: `Análisis profundo sobre temas de ${cat.name.toLowerCase()} relevantes para la ciudadanía colombiana. Información verificada y actualizada.`,
        category: cat.id,
        duration: `${Math.floor(Math.random() * 10) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        views: Math.floor(Math.random() * 50000) + 1000,
        likes: Math.floor(Math.random() * 3000) + 100,
        thumbnail: cat.icon,
        author: `Fuente ${cat.name}`
      });
    }

    const allReels = page === 1 ? [...baseReels, ...additionalReels] : additionalReels;
    
    return allReels
      .filter(reel => category === 'todos' || reel.category === category)
      .map((reel, index) => ({
        ...reel,
        id: (page - 1) * 20 + index + 1
      }));
  };

  // Load reels for current category and page
  const loadReels = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setError(null);
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, isLoadMore ? 500 : 800));
      
      // Simulate potential error (3% chance)
      if (Math.random() < 0.03) {
        throw new Error('Error al cargar los reels. Verifica tu conexión.');
      }

      const newReels = generateMockReels(isLoadMore ? page : 1, selectedCategory);
      
      if (isLoadMore) {
        setReels(prev => [...prev, ...newReels]);
        setTotalLoaded(prev => prev + newReels.length);
      } else {
        setReels(newReels);
        setTotalLoaded(newReels.length);
        setPage(1);
      }

      // Simulate end of data after 5 pages
      setHasMore(page < 5);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [page, selectedCategory]);

  // Load reels when category changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadReels(false);
  }, [selectedCategory]);

  // Infinite scroll handler
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      setPage(prev => prev + 1);
      loadReels(true);
    }
  };

  // Scroll detection for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, hasMore]);

  const handleReelClick = (reel: Reel) => {
    console.log('Playing reel:', reel.title);
    // In a real app, this would open a video player or navigate to detail view
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
        onClick={() => loadReels(false)}
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
          <div className="mt-4 flex items-center space-x-6 text-white/80 flex-wrap gap-2">
            <span>🎥 {totalLoaded}+ videos cargados</span>
            <span>👁️ 150K+ visualizaciones</span>
            <span>📱 Contenido móvil</span>
            <span>📄 Página {page} de 5</span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reels.map((reel) => (
                  <div 
                    key={reel.id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all group cursor-pointer hover:scale-[1.02]"
                    onClick={() => handleReelClick(reel)}
                  >
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
                          reel.category === 'trump' ? 'bg-red-100 text-red-800' :
                          reel.category === 'congreso' ? 'bg-indigo-100 text-indigo-800' :
                          reel.category === 'terror' ? 'bg-orange-100 text-orange-800' :
                          reel.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.id === reel.category)?.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">{reel.author}</span>
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
                        <button 
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReelClick(reel);
                          }}
                        >
                          Ver ahora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More / Infinite Scroll Indicator */}
              {hasMore && (
                <div className="mt-8 text-center">
                  {isLoadingMore ? (
                    <div>
                      <LoadingSkeletonReels count={3} />
                      <div className="mt-4 text-gray-600">
                        <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                        Cargando más reels...
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleLoadMore}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                    >
                      📥 Cargar más reels
                    </button>
                  )}
                </div>
              )}

              {!hasMore && reels.length > 0 && (
                <div className="mt-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">🎬</div>
                  <p>¡Has visto todos los reels disponibles!</p>
                  <p className="text-sm">Total: {totalLoaded} videos cargados</p>
                </div>
              )}
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
                <span>👥 5,847 espectadores</span>
                <span>⏰ Comenzó hace 1h 23m</span>
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition-colors">
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
              '#ReformaTributaria',
              '#SeguridadNacional',
              '#TrumpColombia'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
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