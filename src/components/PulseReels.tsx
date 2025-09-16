import React, { useState, useEffect, useCallback, useRef } from 'react';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedReels, setDisplayedReels] = useState<typeof reels>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const reelsPerPage = 6;

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'terror', name: 'Terror News', icon: '🚨' },
    // Technology category removed as per requirements
  ];

  const reels = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
      title: 'Operativo antiterrorista en el Cauca: Resultados',
      description: 'Fuerzas militares desmantelan red de financiación terrorista en zona rural',
      category: 'terror',
      duration: '5:45',
      views: 34200,
      likes: 2340,
      thumbnail: '🚁',
      author: 'Ministerio de Defensa'
    },
    {
      id: 11,
      title: 'Amenazas cibernéticas: Protección nacional',
      description: 'Cómo Colombia se protege contra ataques terroristas digitales',
      category: 'terror',
      duration: '7:15',
      views: 18900,
      likes: 1456,
      thumbnail: '🔒',
      author: 'CyberDefensa Colombia'
    },
    {
      id: 12,
      title: 'Prevención del terrorismo en comunidades locales',
      description: 'Programas comunitarios para identificar y prevenir actividades terroristas',
      category: 'terror',
      duration: '4:30',
      views: 12800,
      likes: 987,
      thumbnail: '🛡️',
      author: 'Policía Nacional'
    },
    {
      id: 13,
      title: 'Impacto del terrorismo en la economía rural',
      description: 'Análisis sobre cómo las amenazas terroristas afectan la agricultura',
      category: 'terror',
      duration: '6:00',
      views: 9650,
      likes: 734,
      thumbnail: '🌾',
      author: 'Agrodefensa'
    },
    {
      id: 14,
      title: 'Trump anuncia nuevas políticas migratorias',
      description: 'Impacto de las políticas migratorias estadounidenses en Colombia',
      category: 'trump',
      duration: '5:20',
      views: 38900,
      likes: 2567,
      thumbnail: '🛂',
      author: 'Cancillería Colombia'
    },
    {
      id: 15,
      title: 'Reforma constitucional: Debate en el Congreso',
      description: 'Análisis de las propuestas de reforma constitucional en el Senado',
      category: 'congreso',
      duration: '9:30',
      views: 56700,
      likes: 3890,
      thumbnail: '📜',
      author: 'Canal Congreso'
    },
    {
      id: 16,
      title: 'Educación rural: Retos y oportunidades',
      description: 'Iniciativas para mejorar la educación en zonas rurales de Colombia',
      category: 'educacion',
      duration: '7:45',
      views: 18500,
      likes: 1234,
      thumbnail: '🏫',
      author: 'Fundación Compartir'
    },
    {
      id: 17,
      title: 'Protección de ecosistemas críticos',
      description: 'Estrategias para conservar la biodiversidad colombiana',
      category: 'ambiente',
      duration: '8:10',
      views: 25600,
      likes: 1789,
      thumbnail: '🦜',
      author: 'Instituto Humboldt'
    },
    {
      id: 18,
      title: 'Veeduría ciudadana en obras públicas',
      description: 'Cómo ejercer control ciudadano sobre proyectos de infraestructura',
      category: 'participacion',
      duration: '6:25',
      views: 14800,
      likes: 1098,
      thumbnail: '🏗️',
      author: 'Participación Ciudadana'
    }
  ];

  // Get filtered reels
  const getFilteredReels = useCallback(() => {
    return selectedCategory === 'todos' 
      ? reels 
      : reels.filter(reel => reel.category === selectedCategory);
  }, [selectedCategory]);

  // Load more reels
  const loadMoreReels = useCallback(() => {
    const filteredReels = getFilteredReels();
    const startIndex = (page - 1) * reelsPerPage;
    const endIndex = startIndex + reelsPerPage;
    const newReels = filteredReels.slice(startIndex, endIndex);
    
    if (newReels.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedReels(prev => page === 1 ? newReels : [...prev, ...newReels]);
    setHasMore(endIndex < filteredReels.length);
  }, [page, getFilteredReels]);

  // Intersection Observer for infinite scroll
  const lastReelElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore]);

  // Reset when category changes
  useEffect(() => {
    setPage(1);
    setDisplayedReels([]);
    setHasMore(true);
    setIsLoading(true);
    setError(null);
  }, [selectedCategory]);

  // Load reels when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (3% chance)
        if (Math.random() < 0.03) {
          throw new Error('Error al cargar los reels. Verifica tu conexión.');
        }
        loadMoreReels();
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [page, loadMoreReels]);

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
          {isLoading && displayedReels.length === 0 ? (
            <LoadingSkeletonReels />
          ) : error ? (
            <ErrorStateReels />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedReels.map((reel, index) => (
                  <div 
                    key={reel.id} 
                    ref={index === displayedReels.length - 1 ? lastReelElementRef : undefined}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                    onClick={() => {
                      // Track reel view
                      console.log(`Playing reel: ${reel.title}`);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        console.log(`Playing reel: ${reel.title}`);
                      }
                    }}
                    aria-label={`Play reel: ${reel.title}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <div className="text-6xl" role="img" aria-label="Video thumbnail">{reel.thumbnail}</div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {reel.duration}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity" role="img" aria-label="Play button">
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
                          reel.category === 'congreso' ? 'bg-indigo-100 text-indigo-800' :
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
                            <span role="img" aria-label="Views">👁️</span>
                            <span>{reel.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span role="img" aria-label="Likes">❤️</span>
                            <span>{reel.likes.toLocaleString()}</span>
                          </span>
                        </div>
                        <button 
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Playing reel: ${reel.title}`);
                          }}
                          aria-label={`Play ${reel.title}`}
                        >
                          Ver ahora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Loading more indicator */}
              {isLoading && displayedReels.length > 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 animate-pulse">🎬</div>
                  <p className="text-gray-600">Cargando más reels...</p>
                </div>
              )}
              
              {/* End of results */}
              {!hasMore && displayedReels.length > 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-gray-600 font-medium">¡Has visto todos los reels disponibles!</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Total: {displayedReels.length} videos en esta categoría
                  </p>
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