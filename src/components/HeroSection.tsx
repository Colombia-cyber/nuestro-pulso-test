import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="colombia-hero-bg min-h-screen flex items-center justify-center relative">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
          {/* Colombian Flag Colors Accent */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'var(--colombia-yellow)'}}></div>
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'var(--colombia-blue)'}}></div>
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'var(--colombia-red)'}}></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold colombia-text-primary mb-6">
            🇨🇴 Nuestro Pulso
          </h1>
          
          <p className="text-xl md:text-2xl colombia-text-accent mb-8 font-medium">
            Red Cívica de Colombia - Tu Voz Cuenta
          </p>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
            para construir el futuro de Colombia juntos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 text-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200 font-semibold" 
                    style={{backgroundColor: 'var(--colombia-blue)'}}>
              💬 Chat en Vivo
            </button>
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold">
              🗣️ Debates
            </button>
            <button className="px-8 py-4 text-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200 font-semibold"
                    style={{backgroundColor: 'var(--colombia-red)'}}>
              📊 Encuestas
            </button>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30">
            <div className="text-3xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold colombia-text-primary mb-2">Congreso</h3>
            <p className="text-gray-700">Sigue la actividad legislativa en tiempo real</p>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold colombia-text-primary mb-2">Elecciones</h3>
            <p className="text-gray-700">Centro de información electoral actualizada</p>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30">
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-xl font-semibold colombia-text-primary mb-2">Noticias</h3>
            <p className="text-gray-700">Análisis y cobertura de eventos cívicos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;