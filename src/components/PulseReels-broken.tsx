import React, { useState } from 'react';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
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
    }
  ];

  const filteredReels = selectedCategory === 'todos' 
    ? reels 
    : reels.filter(reel => reel.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="vibrant-card rounded-2xl p-8 mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
              🎬 Pulse Reels Colombia
            </h1>
            <p className="text-xl text-gray-700 mb-6">Videos cortos sobre temas cívicos y participación ciudadana</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2 bg-purple-100 p-3 rounded-lg">
                <span className="text-xl">🎥</span>
                <span className="font-semibold text-purple-800">24 videos esta semana</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-blue-100 p-3 rounded-lg">
                <span className="text-xl">👁️</span>
                <span className="font-semibold text-blue-800">150K+ visualizaciones</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-green-100 p-3 rounded-lg">
                <span className="text-xl">📱</span>
                <span className="font-semibold text-green-800">Contenido móvil</span>
              </div>
            </div>
          </div>

        {/* Categories */}
        <div className="vibrant-card rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Explorar por categoría</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReels.map((reel) => (
            <div key={reel.id} className="vibrant-card rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:scale-105">
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-6xl">{reel.thumbnail}</div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {reel.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ▶️
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                    reel.category === 'participacion' ? 'bg-green-100 text-green-800' :
                    reel.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                    reel.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === reel.category)?.name}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">{reel.author}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {reel.title}
                </h3>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{reel.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span className="text-lg">👁️</span>
                      <span className="font-medium">{reel.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-lg">❤️</span>
                      <span className="font-medium">{reel.likes.toLocaleString()}</span>
                    </span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-xs transition-all">
                    Ver ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Live Stream */}
        <div className="mt-12 vibrant-card rounded-xl p-8 bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
          <div className="flex items-start space-x-6">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              🔴 EN VIVO
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Sesión del Congreso: Debate sobre Reforma Tributaria
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                Transmisión en vivo del debate en el Senado sobre las modificaciones a la reforma tributaria 2024
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center space-x-2">
                  <span className="text-lg">👥</span>
                  <span className="font-medium">5,847 espectadores</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="text-lg">⏰</span>
                  <span className="font-medium">Comenzó hace 1h 23m</span>
                </span>
              </div>
            </div>
            <button className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 font-bold transition-all shadow-lg">
              Unirse al Debate
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mt-12 vibrant-card rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <span>Trending en Reels</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
                className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-3 rounded-full text-sm font-bold cursor-pointer hover:from-purple-200 hover:to-purple-300 transition-all transform hover:scale-105 text-center"
              >
                {hashtag}
              </span>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">🎬 Descubre más contenido cívico en video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;