import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Nuestro Pulso
        </h1>
        <p className="text-center text-gray-600 mb-12">
          La plataforma líder de participación cívica en Colombia
        </p>

        {/* Quick Access to Live Reels - Prominent Featured Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg p-8 mb-12 shadow-lg text-white">
          <div className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-3xl font-bold mb-4">Pulse Reels & Feeds en Vivo</h2>
            <p className="text-xl mb-6 opacity-90">
              Videos cortos, debates en vivo y contenido cívico al instante
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button 
                onClick={() => navigate('/reels')}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 font-bold"
              >
                🎥 Ver Reels Ahora
              </button>
              <button 
                onClick={() => navigate('/debates')}
                className="px-8 py-4 bg-white bg-opacity-20 text-white rounded-xl shadow-lg hover:bg-opacity-30 transform hover:scale-105 transition-all duration-200 font-bold"
              >
                🔴 Debates en Vivo
              </button>
            </div>
            <div className="flex justify-center space-x-6 text-sm opacity-90">
              <span>🔴 3 transmisiones en vivo</span>
              <span>🎬 127 videos nuevos hoy</span>
              <span>👥 2.1M vistas esta semana</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/chat')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Chat en Vivo</h3>
            <p className="text-gray-600">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
          </div>
          
          <div 
            onClick={() => navigate('/debates')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-600">Debates</h3>
            <p className="text-gray-600">
              Participa en debates estructurados sobre políticas públicas.
            </p>
          </div>
          
          <div 
            onClick={() => navigate('/encuestas')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Encuestas</h3>
            <p className="text-gray-600">
              Comparte tu opinión en encuestas sobre temas de actualidad.
            </p>
          </div>
        </div>

        {/* Enhanced Service Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => navigate('/elecciones')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2">Elecciones 2024</h3>
            <p className="text-blue-100 text-sm">
              Información electoral actualizada en tiempo real
            </p>
            <div className="mt-4 text-xs bg-white bg-opacity-20 rounded-full px-2 py-1 inline-block">
              🔴 Live Updates
            </div>
          </div>

          <div 
            onClick={() => navigate('/noticias')}
            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">📰</div>
            <h3 className="text-lg font-semibold mb-2">Noticias & Videos</h3>
            <p className="text-orange-100 text-sm">
              Análisis, noticias y videos sobre eventos cívicos
            </p>
            <div className="mt-4 text-xs bg-white bg-opacity-20 rounded-full px-2 py-1 inline-block">
              📹 Con Videos
            </div>
          </div>

          <div 
            onClick={() => navigate('/congreso')}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="text-lg font-semibold mb-2">Congreso</h3>
            <p className="text-green-100 text-sm">
              Seguimiento de actividad legislativa en tiempo real
            </p>
            <div className="mt-4 text-xs bg-white bg-opacity-20 rounded-full px-2 py-1 inline-block">
              📊 Live Tracking
            </div>
          </div>

          <div 
            onClick={() => navigate('/reels')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="text-lg font-semibold mb-2">Pulse Reels</h3>
            <p className="text-purple-100 text-sm">
              Videos cortos educativos y contenido viral cívico
            </p>
            <div className="mt-4 text-xs bg-white bg-opacity-20 rounded-full px-2 py-1 inline-block">
              🔥 Trending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;