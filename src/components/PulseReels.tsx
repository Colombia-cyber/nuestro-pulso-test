import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PulseReels: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación Cívica', icon: '📚' },
    { id: 'noticias', name: 'Noticias', icon: '📰' },
    { id: 'debates', name: 'Debates', icon: '🗣️' },
    { id: 'testimonios', name: 'Testimonios', icon: '👥' }
  ];

  const reels = [
    {
      id: 1,
      title: 'Cómo funciona el Congreso Colombiano',
      description: 'Explicación rápida sobre el proceso legislativo',
      creator: 'EducaCívica',
      duration: '2:30',
      views: '15.2K',
      likes: '1.8K',
      category: 'educacion',
      thumbnail: '🏛️',
      isLive: false
    },
    {
      id: 2,
      title: 'EN VIVO: Debate sobre Reforma Tributaria',
      description: 'Transmisión en directo del debate ciudadano',
      creator: 'Nuestro Pulso',
      duration: 'EN VIVO',
      views: '3.4K',
      likes: '892',
      category: 'debates',
      thumbnail: '🔴',
      isLive: true
    },
    {
      id: 3,
      title: 'Últimas noticias: Acuerdo de Paz',
      description: 'Resumen de avances en implementación',
      creator: 'NoticiasExpress',
      duration: '1:45',
      views: '8.9K',
      likes: '657',
      category: 'noticias',
      thumbnail: '🕊️',
      isLive: false
    },
    {
      id: 4,
      title: 'Testimonio: Joven líder social',
      description: 'Historia de participación ciudadana',
      creator: 'VocesCívicas',
      duration: '3:15',
      views: '12.1K',
      likes: '2.3K',
      category: 'testimonios',
      thumbnail: '👤',
      isLive: false
    },
    {
      id: 5,
      title: 'Elecciones 2024: Todo lo que debes saber',
      description: 'Guía completa para votar informadamente',
      creator: 'EleccionesCol',
      duration: '4:20',
      views: '25.6K',
      likes: '3.1K',
      category: 'politica',
      thumbnail: '🗳️',
      isLive: false
    },
    {
      id: 6,
      title: 'EN VIVO: Sesión del Senado',
      description: 'Transmisión oficial del Congreso',
      creator: 'Congreso de Colombia',
      duration: 'EN VIVO',
      views: '1.2K',
      likes: '234',
      category: 'politica',
      thumbnail: '🏛️',
      isLive: true
    }
  ];

  const featuredLiveStreams = [
    {
      id: 'live-1',
      title: 'Debate Presidencial Virtual',
      viewers: '45.2K',
      startTime: '2:00 PM',
      duration: '2 horas',
      host: 'Nuestro Pulso'
    },
    {
      id: 'live-2',
      title: 'Sesión Congreso en Vivo',
      viewers: '12.8K',
      startTime: '10:00 AM',
      duration: '4 horas',
      host: 'Canal Congreso'
    }
  ];

  const filteredReels = selectedCategory === 'todos' 
    ? reels 
    : reels.filter(reel => reel.category === selectedCategory);

  const handleReelClick = (reel: any) => {
    // In a real app, this would open a video player modal
    console.log('Playing reel:', reel.title);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels & Feeds en Vivo</h1>
          <p className="text-white/90">Videos cortos y transmisiones en vivo sobre temas cívicos y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              3 transmisiones en vivo
            </span>
            <span>🎥 127 videos nuevos hoy</span>
            <span>👁️ 2.1M visualizaciones esta semana</span>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={() => navigate('/debates')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            🔴 Ver Debates en Vivo
          </button>
          <button 
            onClick={() => navigate('/noticias')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            📺 Noticias en Video
          </button>
          <button 
            onClick={() => navigate('/congreso')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            🏛️ Congreso en Vivo
          </button>
        </div>

        {/* Live Streams Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-3">🔴 Transmisiones en Vivo Ahora</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredLiveStreams.map(stream => (
              <div key={stream.id} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{stream.title}</h4>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔴 EN VIVO
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>👥 {stream.viewers} viendo</span>
                  <span>{stream.host}</span>
                </div>
                <button 
                  onClick={() => handleReelClick({ title: stream.title, isLive: true })}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                >
                  🔴 Unirse ahora
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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

        {/* Video Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReels.map(reel => (
            <div 
              key={reel.id} 
              onClick={() => handleReelClick(reel)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {/* Video Thumbnail */}
              <div className="relative bg-gray-900 h-48 flex items-center justify-center">
                <div className="text-6xl">{reel.thumbnail}</div>
                {reel.isLive && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔴 EN VIVO
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {reel.duration}
                </div>
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{reel.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reel.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">{reel.creator}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <span className="mr-1">👁️</span>
                      {reel.views}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">👍</span>
                      {reel.likes}
                    </span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                    reel.category === 'educacion' ? 'bg-green-100 text-green-800' :
                    reel.category === 'noticias' ? 'bg-orange-100 text-orange-800' :
                    reel.category === 'debates' ? 'bg-red-100 text-red-800' :
                    reel.category === 'testimonios' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === reel.category)?.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
            Cargar más videos
          </button>
        </div>

        {/* Quick Navigation to Other Modules */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Acceso Rápido a Módulos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/chat')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium">Chat en Vivo</div>
            </button>
            <button 
              onClick={() => navigate('/debates')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🗣️</div>
              <div className="text-sm font-medium">Debates</div>
            </button>
            <button 
              onClick={() => navigate('/encuestas')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Encuestas</div>
            </button>
            <button 
              onClick={() => navigate('/elecciones')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🗳️</div>
              <div className="text-sm font-medium">Elecciones</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;