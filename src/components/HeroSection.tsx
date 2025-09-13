import React from 'react';

interface HeroSectionProps {
  onButtonClick?: (module: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onButtonClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center">
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
            <button 
              onClick={() => onButtonClick?.('chat')}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Ir a Chat en Vivo"
            >
              💬 Chat en Vivo
            </button>
            <button 
              onClick={() => onButtonClick?.('debate')}
              className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Ir a Debates"
            >
              🗣️ Debates
            </button>
            <button 
              onClick={() => onButtonClick?.('survey')}
              className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Ir a Encuestas"
            >
              📊 Encuestas
            </button>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => onButtonClick?.('congress')}
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Ir a Seguimiento del Congreso"
          >
            <div className="text-3xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Congreso</h3>
            <p className="text-gray-700">Sigue la actividad legislativa en tiempo real</p>
          </button>
          
          <button 
            onClick={() => onButtonClick?.('elections')}
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Ir a Centro Electoral"
          >
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Elecciones</h3>
            <p className="text-gray-700">Centro de información electoral actualizada</p>
          </button>
          
          <button 
            onClick={() => onButtonClick?.('news')}
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 hover:bg-opacity-30 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Ir a Noticias"
          >
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Noticias</h3>
            <p className="text-gray-700">Análisis y cobertura de eventos cívicos</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;