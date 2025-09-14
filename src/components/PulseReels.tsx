import React, { useState } from 'react';

interface Reel {
  id: string;
  title: string;
  creator: string;
  views: number;
  likes: number;
  category: 'politics' | 'education' | 'conservative' | 'election' | 'community';
  thumbnail: string;
  duration: string;
  isLive?: boolean;
  description: string;
}

const PulseReels: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: '🎥' },
    { id: 'conservative', name: 'Conservador', icon: '🟠' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'election', name: 'Elecciones', icon: '🗳️' },
    { id: 'education', name: 'Educación', icon: '📚' },
    { id: 'community', name: 'Comunidad', icon: '👥' }
  ];

  const reels: Reel[] = [
    {
      id: '1',
      title: 'Análisis electoral: Candidatos conservadores en Antioquia',
      creator: 'Análisis Político CO',
      views: 15420,
      likes: 892,
      category: 'conservative',
      thumbnail: '🟠',
      duration: '2:45',
      description: 'Revisión de propuestas y encuestas de candidatos de derecha en Antioquia'
    },
    {
      id: '2',
      title: 'Cómo votar de manera informada',
      creator: 'Educación Cívica',
      views: 8750,
      likes: 654,
      category: 'education',
      thumbnail: '📚',
      duration: '1:30',
      description: 'Guía práctica para investigar candidatos y propuestas antes de votar'
    },
    {
      id: '3',
      title: 'En vivo: Debate sobre reforma fiscal',
      creator: 'Congreso Abierto',
      views: 3250,
      likes: 287,
      category: 'politics',
      thumbnail: '🔴',
      duration: 'En vivo',
      isLive: true,
      description: 'Transmisión en directo del debate en el Senado sobre la reforma tributaria'
    },
    {
      id: '4',
      title: 'Propuestas conservadoras para la economía',
      creator: 'Economía y Política',
      views: 12100,
      likes: 743,
      category: 'conservative',
      thumbnail: '💰',
      duration: '3:20',
      description: 'Análisis de políticas económicas conservadoras: libre mercado y reducción fiscal'
    },
    {
      id: '5',
      title: 'Encuentro ciudadano en Bogotá',
      creator: 'Ciudadanos Activos',
      views: 5670,
      likes: 432,
      category: 'community',
      thumbnail: '👥',
      duration: '4:15',
      description: 'Resumen del encuentro ciudadano sobre participación política local'
    },
    {
      id: '6',
      title: 'Elecciones 2024: Calendario y fechas clave',
      creator: 'Registraduría Nacional',
      views: 9830,
      likes: 567,
      category: 'election',
      thumbnail: '🗳️',
      duration: '2:10',
      description: 'Fechas importantes del calendario electoral 2024 y cómo prepararse'
    }
  ];

  const filteredReels = activeCategory === 'all' 
    ? reels 
    : reels.filter(reel => reel.category === activeCategory);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getCategoryColor = (category: Reel['category']) => {
    switch (category) {
      case 'conservative': return 'bg-orange-100 text-orange-800';
      case 'politics': return 'bg-blue-100 text-blue-800';
      case 'election': return 'bg-purple-100 text-purple-800';
      case 'education': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎥 Pulse Reels</h1>
          <p className="text-white/90">Contenido en video sobre política, elecciones y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🎬 {reels.length} videos</span>
            <span>👀 +50K visualizaciones hoy</span>
            <span>🔴 {reels.filter(r => r.isLive).length} en vivo</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl">{reel.thumbnail}</span>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {reel.duration}
                </div>
                {reel.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                    🔴 EN VIVO
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(reel.category)}`}>
                    {categories.find(c => c.id === reel.category)?.name}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {reel.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {reel.description}
                </p>
                
                <div className="text-sm text-gray-500 mb-3">
                  Por {reel.creator}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👀 {formatViews(reel.views)} vistas</span>
                  <span>👍 {reel.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">¿Tienes contenido cívico que compartir?</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Comparte videos educativos, análisis políticos, cobertura electoral o contenido de participación ciudadana.
              </p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  🎥 Subir Video
                </button>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  🔴 Transmitir en Vivo
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Requisitos:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contenido educativo o informativo</li>
                <li>• Relacionado con temas cívicos</li>
                <li>• Máximo 5 minutos de duración</li>
                <li>• Respetar normas de comunidad</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform font-bold">
            ⬇️ Cargar más videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;