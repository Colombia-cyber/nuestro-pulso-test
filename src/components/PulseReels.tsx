import React, { useState, useEffect } from 'react';
import VideoModal from './VideoModal';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());

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
      author: 'Registraduría Nacional',
      youtubeId: 'M7lc1UVf-VE'
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
      author: 'Fundación Corona',
      youtubeId: 'LXb3EKWsInQ'
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
      author: 'Transparencia Colombia',
      youtubeId: 'fJ9rUzIMcZQ'
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
      author: 'WWF Colombia',
      youtubeId: 'QH2-TGUlwu4'
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
      author: 'MinEducación',
      youtubeId: 'M7lc1UVf-VE'
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
      author: 'Veeduría Ciudadana',
      youtubeId: 'fJ9rUzIMcZQ'
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
      author: 'CNN Colombia',
      youtubeId: 'LXb3EKWsInQ'
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
      author: 'Canal Congreso',
      youtubeId: 'QH2-TGUlwu4'
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
      author: 'Caracol Noticias',
      youtubeId: 'M7lc1UVf-VE'
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
      youtubeId: 'LXb3EKWsInQ'
    }
  ];

  // Simulate loading reels
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (5% chance)
        if (Math.random() < 0.05) {
          throw new Error('Error al cargar los reels. Verifica tu conexión.');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Filter and search reels
  const filteredReels = reels.filter(reel => {
    const matchesCategory = selectedCategory === 'todos' || reel.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reel.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle video click
  const handleVideoClick = (reel: any) => {
    setSelectedVideo(reel);
    setIsVideoModalOpen(true);
  };

  // Handle like toggle
  const handleLikeToggle = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent video modal from opening
    const newLikedVideos = new Set(likedVideos);
    if (newLikedVideos.has(videoId)) {
      newLikedVideos.delete(videoId);
    } else {
      newLikedVideos.add(videoId);
    }
    setLikedVideos(newLikedVideos);
  };

  // Handle share
  const handleShare = (reel: any, platform: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent video modal from opening
    const url = window.location.href;
    const text = `¡Mira este video en Nuestro Pulso! ${reel.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

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
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
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
          
          {/* Results Info */}
          {searchTerm && (
            <div className="mt-3 text-sm text-gray-600">
              {filteredReels.length} resultado{filteredReels.length !== 1 ? 's' : ''} encontrado{filteredReels.length !== 1 ? 's' : ''} para "{searchTerm}"
            </div>
          )}
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
            <div 
              key={reel.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              onClick={() => handleVideoClick(reel)}
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
                
                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleLikeToggle(reel.id, e)}
                    className={`p-2 rounded-full transition-colors ${
                      likedVideos.has(reel.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white bg-opacity-80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                    title="Me gusta"
                  >
                    ❤️
                  </button>
                  <button
                    onClick={(e) => handleShare(reel, 'whatsapp', e)}
                    className="p-2 rounded-full bg-white bg-opacity-80 text-gray-700 hover:bg-green-500 hover:text-white transition-colors"
                    title="Compartir en WhatsApp"
                  >
                    📱
                  </button>
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
                    reel.category === 'tecnologia' ? 'bg-indigo-100 text-indigo-800' :
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
                      <span className={likedVideos.has(reel.id) ? 'text-red-500' : ''}>❤️</span>
                      <span className={likedVideos.has(reel.id) ? 'text-red-500' : ''}>
                        {(reel.likes + (likedVideos.has(reel.id) ? 1 : 0)).toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={(e) => handleShare(reel, 'twitter', e)}
                      className="text-blue-400 hover:text-blue-600 p-1 rounded transition-colors"
                      title="Compartir en Twitter"
                    >
                      🐦
                    </button>
                    <button 
                      onClick={(e) => handleShare(reel, 'facebook', e)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                      title="Compartir en Facebook"
                    >
                      📘
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Ver ahora
                    </button>
                  </div>
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

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default PulseReels;