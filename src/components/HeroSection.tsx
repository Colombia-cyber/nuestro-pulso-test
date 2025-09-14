import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sunlight background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-300/40 via-transparent to-transparent"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      
      {/* Colombian Eagle */}
      <div className="absolute top-10 right-10 text-8xl opacity-20 animate-float">
        🦅
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
          {/* Colombian Flag Colors Accent */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            🇨🇴 Nuestro Pulso
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 mb-8 font-medium">
            Red Cívica de Colombia - Tu Voz Cuenta
          </p>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
            para construir el futuro de Colombia juntos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/chat"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              💬 Chat en Vivo
            </Link>
            <Link 
              to="/debate"
              className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              🗣️ Debates
            </Link>
            <Link 
              to="/survey"
              className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              📊 Encuestas
            </Link>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/congress" className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105">
            <div className="text-3xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Congreso</h3>
            <p className="text-gray-700">Sigue la actividad legislativa en tiempo real</p>
          </Link>
          
          <Link to="/analytics" className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Elecciones</h3>
            <p className="text-gray-700">Centro de información electoral actualizada</p>
          </Link>
          
          <Link to="/news" className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105">
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Noticias</h3>
            <p className="text-gray-700">Análisis y cobertura de eventos cívicos</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;