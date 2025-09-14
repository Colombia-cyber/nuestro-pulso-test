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