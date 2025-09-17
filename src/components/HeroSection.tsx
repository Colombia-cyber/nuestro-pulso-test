import React from 'react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-300"></div>
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 transform hover:scale-105 transition-transform duration-500">
          {/* Colombian Flag Colors Accent - Enhanced */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse delay-100"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          
          {/* Enhanced Colombian Flag Icon */}
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">🇨🇴</div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 drop-shadow-lg">
            Nuestro Pulso
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-800 mb-6 font-bold drop-shadow-md">
            Red Cívica de Colombia - Tu Voz Cuenta
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium drop-shadow-sm">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
            para construir el futuro de Colombia juntos.
          </p>
          
          {/* Enhanced CTA Buttons - Larger and More Prominent */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <button 
              onClick={() => onNavigate('live-chat')}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-2xl hover:from-blue-700 hover:to-blue-900 transform hover:scale-110 transition-all duration-300 font-bold text-lg border-2 border-white/30"
            >
              <span className="mr-3 text-2xl">💬</span>
              Chat en Vivo
            </button>
            <button 
              onClick={() => onNavigate('debates')}
              className="px-10 py-5 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl shadow-2xl hover:from-green-700 hover:to-green-900 transform hover:scale-110 transition-all duration-300 font-bold text-lg border-2 border-white/30"
            >
              <span className="mr-3 text-2xl">🗣️</span>
              Debates
            </button>
            <button 
              onClick={() => onNavigate('encuestas')}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl shadow-2xl hover:from-purple-700 hover:to-purple-900 transform hover:scale-110 transition-all duration-300 font-bold text-lg border-2 border-white/30 ring-4 ring-yellow-400/50"
            >
              <span className="mr-3 text-2xl">📊</span>
              Encuestas
              <span className="ml-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-black">POPULAR</span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/25 backdrop-blur-lg rounded-2xl p-8 border border-white/40 hover:bg-white/35 transition-all duration-300 transform hover:scale-105 cursor-pointer"
               onClick={() => onNavigate('congress')}>
            <div className="text-5xl mb-6 animate-bounce">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Congreso</h3>
            <p className="text-gray-700 font-medium">Sigue la actividad legislativa en tiempo real</p>
          </div>
          
          <div className="bg-white/25 backdrop-blur-lg rounded-2xl p-8 border border-white/40 hover:bg-white/35 transition-all duration-300 transform hover:scale-105 cursor-pointer"
               onClick={() => onNavigate('elections')}>
            <div className="text-5xl mb-6 animate-pulse">📈</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Elecciones</h3>
            <p className="text-gray-700 font-medium">Centro de información electoral actualizada</p>
          </div>
          
          <div className="bg-white/25 backdrop-blur-lg rounded-2xl p-8 border border-white/40 hover:bg-white/35 transition-all duration-300 transform hover:scale-105 cursor-pointer"
               onClick={() => onNavigate('news')}>
            <div className="text-5xl mb-6 animate-bounce delay-100">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Noticias</h3>
            <p className="text-gray-700 font-medium">Análisis y cobertura de eventos cívicos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;