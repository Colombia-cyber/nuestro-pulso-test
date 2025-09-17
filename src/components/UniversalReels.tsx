import React, { useState, useEffect } from 'react';
import { getVisibleCategories } from '../config/categories';

interface UniversalReel {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  author: string;
  videoUrl: string;
  isLive?: boolean;
  source: 'civic' | 'news' | 'education' | 'politics';
}

interface UniversalReelsProps {
  category?: string;
  maxReels?: number;
  showHeader?: boolean;
}

const UniversalReels: React.FC<UniversalReelsProps> = ({ 
  category = 'todos', 
  maxReels = 12, 
  showHeader = true 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isLoading, setIsLoading] = useState(true);
  const [reels, setReels] = useState<UniversalReel[]>([]);

  const visibleCategories = getVisibleCategories();
  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    ...visibleCategories
  ];

  // Enhanced mock reels with working video URLs
  const allMockReels: UniversalReel[] = [
    {
      id: 1,
      title: 'Cómo funciona el Congreso Colombiano',
      description: 'Explicación detallada sobre el funcionamiento del poder legislativo',
      category: 'politica',
      duration: '3:45',
      views: 25400,
      likes: 1890,
      thumbnail: '🏛️',
      author: 'Congreso TV',
      videoUrl: 'https://www.youtube.com/embed/SRWiqjgOyX0',
      source: 'education'
    },
    {
      id: 2,
      title: 'Proceso Electoral Colombiano 2024',
      description: 'Todo lo que necesitas saber sobre las próximas elecciones',
      category: 'politica',
      duration: '5:12',
      views: 18300,
      likes: 1234,
      thumbnail: '🗳️',
      author: 'Registraduría Nacional',
      videoUrl: 'https://www.youtube.com/embed/NUsoVlDFqZg',
      source: 'civic'
    },
    {
      id: 3,
      title: 'Impacto de Trump en Colombia',
      description: 'Análisis sobre las relaciones Colombia-Estados Unidos',
      category: 'internacional',
      duration: '7:30',
      views: 45200,
      likes: 3120,
      thumbnail: '🇺🇸',
      author: 'Internacional News',
      videoUrl: 'https://www.youtube.com/embed/BpO_YzYAoOo',
      source: 'news'
    },
    {
      id: 4,
      title: 'Seguridad Ciudadana en Bogotá',
      description: 'Estrategias para combatir el crimen en la capital',
      category: 'seguridad',
      duration: '4:25',
      views: 31800,
      likes: 2156,
      thumbnail: '🚨',
      author: 'Seguridad Colombia',
      videoUrl: 'https://www.youtube.com/embed/JIGn1_HdXpo',
      source: 'politics'
    },
    {
      id: 5,
      title: 'Oportunidades de Empleo Juvenil',
      description: 'Programas gubernamentales para generar empleo',
      category: 'economia',
      duration: '6:15',
      views: 22100,
      likes: 1567,
      thumbnail: '💼',
      author: 'MinTrabajo',
      videoUrl: 'https://www.youtube.com/embed/SRWiqjgOyX0',
      source: 'education'
    },
    {
      id: 6,
      title: 'Amenazas Terroristas: Prevención',
      description: 'Cómo identificar y reportar actividades sospechosas',
      category: 'seguridad',
      duration: '5:45',
      views: 19400,
      likes: 1123,
      thumbnail: '⚠️',
      author: 'Defensa Nacional',
      videoUrl: 'https://www.youtube.com/embed/NUsoVlDFqZg',
      source: 'politics'
    },
    {
      id: 7,
      title: 'Políticas de Derecha vs Izquierda',
      description: 'Comparación objetiva de propuestas políticas',
      category: 'politica',
      duration: '8:30',
      views: 67800,
      likes: 4234,
      thumbnail: '⚖️',
      author: 'Análisis Político',
      videoUrl: 'https://www.youtube.com/embed/BpO_YzYAoOo',
      source: 'education',
      isLive: true
    },
    {
      id: 8,
      title: 'Nueva Legislación Ambiental',
      description: 'Cambios en las leyes de protección ambiental',
      category: 'ambiente',
      duration: '4:50',
      views: 15600,
      likes: 892,
      thumbnail: '🌱',
      author: 'MinAmbiente',
      videoUrl: 'https://www.youtube.com/embed/JIGn1_HdXpo',
      source: 'politics'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredReels = selectedCategory === 'todos' 
        ? allMockReels 
        : allMockReels.filter(reel => reel.category === selectedCategory);
      
      setReels(filteredReels.slice(0, maxReels));
      setIsLoading(false);
    }, 800);
  }, [selectedCategory, maxReels]);

  const handleReelClick = (reel: UniversalReel) => {
    console.log(`Playing reel: ${reel.title}`);
    // In a real app, this would open the video in a modal or navigate to a detail page
  };

  const getSourceIcon = (source: UniversalReel['source']) => {
    const icons = {
      civic: '🏛️',
      news: '📰',
      education: '📚',
      politics: '🗳️'
    };
    return icons[source];
  };

  const getSourceColor = (source: UniversalReel['source']) => {
    const colors = {
      civic: 'from-blue-500 to-blue-600',
      news: 'from-red-500 to-red-600',
      education: 'from-green-500 to-green-600',
      politics: 'from-purple-500 to-purple-600'
    };
    return colors[source];
  };

  if (!showHeader && isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: maxReels }, (_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-48"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {showHeader && (
          <>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">🌟 Universal Reels</h1>
              <p className="text-white/90">Contenido diverso de múltiples fuentes confiables</p>
              <div className="mt-4 flex items-center space-x-6 text-white/80">
                <span>🎥 {reels.length} videos disponibles</span>
                <span>👁️ 250K+ visualizaciones</span>
                <span>📱 Multiplataforma</span>
                <span>🔴 {reels.filter(r => r.isLive).length} en vivo</span>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Reels Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: maxReels }, (_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reels.map((reel) => (
              <div 
                key={reel.id} 
                onClick={() => handleReelClick(reel)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <iframe
                    src={reel.videoUrl}
                    title={reel.title}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Live indicator */}
                  {reel.isLive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      🔴 EN VIVO
                    </div>
                  )}
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {reel.duration}
                  </div>
                  
                  {/* Source indicator */}
                  <div className={`absolute top-3 right-3 bg-gradient-to-r ${getSourceColor(reel.source)} text-white px-2 py-1 rounded text-xs`}>
                    {getSourceIcon(reel.source)}
                  </div>
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶️
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                      reel.category === 'internacional' ? 'bg-yellow-100 text-yellow-800' :
                      reel.category === 'seguridad' ? 'bg-red-100 text-red-800' :
                      reel.category === 'economia' ? 'bg-green-100 text-green-800' :
                      reel.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {categories.find(c => c.id === reel.category)?.name || reel.category}
                    </span>
                    <span className="text-xs text-gray-500">{reel.author}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600">
                    {reel.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{reel.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
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
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && reels.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay contenido disponible</h3>
            <p className="text-gray-600">Intenta con otra categoría o vuelve más tarde</p>
          </div>
        )}

        {showHeader && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Trending en Universal Reels</h3>
            <div className="flex flex-wrap gap-2">
              {[
                '#CongresoColombiano',
                '#TrumpColombia',
                '#SeguridadCiudadana',
                '#EmpleoJuvenil',
                '#AmenazasTerror',
                '#PoliticaDerecha',
                '#PoliticaIzquierda',
                '#LegislacionAmbiental'
              ].map((hashtag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-200 transition-colors"
                  onClick={() => console.log(`Searching for ${hashtag}`)}
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalReels;