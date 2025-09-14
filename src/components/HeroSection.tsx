import React from 'react';

type CurrentView = 'home' | 'chat' | 'debates' | 'news' | 'surveys';

interface HeroSectionProps {
  currentView?: CurrentView;
  setCurrentView?: (view: CurrentView) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentView = 'home', setCurrentView }) => {
  const handleNavigate = (view: CurrentView) => {
    if (setCurrentView) {
      setCurrentView(view);
      // Smooth scroll to main content
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
              onClick={() => handleNavigate('chat')}
              className={`px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold ${
                currentView === 'chat' ? 'ring-4 ring-blue-300' : ''
              }`}
              disabled={!setCurrentView}
            >
              💬 Chat en Vivo
            </button>
            <button 
              onClick={() => handleNavigate('debates')}
              className={`px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold ${
                currentView === 'debates' ? 'ring-4 ring-green-300' : ''
              }`}
              disabled={!setCurrentView}
            >
              🗣️ Debates
            </button>
            <button 
              onClick={() => handleNavigate('surveys')}
              className={`px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold ${
                currentView === 'surveys' ? 'ring-4 ring-purple-300' : ''
              }`}
              disabled={!setCurrentView}
            >
              📊 Encuestas
            </button>
          </div>
          
          {/* Navigation Pills */}
          {setCurrentView && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => handleNavigate('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentView === 'home' 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'bg-white bg-opacity-20 text-gray-700 hover:bg-white hover:bg-opacity-30'
                }`}
              >
                🏠 Inicio
              </button>
              <button
                onClick={() => handleNavigate('news')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentView === 'news' 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'bg-white bg-opacity-20 text-gray-700 hover:bg-white hover:bg-opacity-30'
                }`}
              >
                📰 Noticias
              </button>
            </div>
          )}
        </div>
        
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 transition-all ${
              setCurrentView ? 'cursor-pointer hover:bg-opacity-30' : ''
            }`}
            onClick={() => setCurrentView && handleNavigate('news')}
          >
            <div className="text-3xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Congreso</h3>
            <p className="text-gray-700">Sigue la actividad legislativa en tiempo real</p>
          </div>
          
          <div 
            className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 transition-all ${
              setCurrentView ? 'cursor-pointer hover:bg-opacity-30' : ''
            }`}
            onClick={() => setCurrentView && handleNavigate('surveys')}
          >
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Elecciones</h3>
            <p className="text-gray-700">Centro de información electoral actualizada</p>
          </div>
          
          <div 
            className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 transition-all ${
              setCurrentView ? 'cursor-pointer hover:bg-opacity-30' : ''
            }`}
            onClick={() => setCurrentView && handleNavigate('news')}
          >
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Noticias</h3>
            <p className="text-gray-700">Análisis y cobertura de eventos cívicos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;