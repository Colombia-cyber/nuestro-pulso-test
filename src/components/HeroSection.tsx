import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonType: string, href: string) => {
    setActiveButton(buttonType);
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  };

  return (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center justify-center m-4 md:m-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Nuestro Pulso
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            El Pulso Cívico de Colombia
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Únete a conversaciones cívicas, debates y encuestas para dar forma al futuro de Colombia. 
            Tu voz importa en nuestra democracia.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => handleButtonClick('chat', '/chat')}
              className={`px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold text-lg ${
                activeButton === 'chat' ? 'scale-95' : ''
              }`}
            >
              💬 Únete al Chat
            </button>
            <button 
              onClick={() => handleButtonClick('debate', '/debate')}
              className={`px-8 py-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold text-lg ${
                activeButton === 'debate' ? 'scale-95' : ''
              }`}
            >
              🗣️ Debates
            </button>
            <button 
              onClick={() => handleButtonClick('survey', '/survey')}
              className={`px-8 py-4 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transform hover:scale-105 transition-all duration-200 font-semibold text-lg ${
                activeButton === 'survey' ? 'scale-95' : ''
              }`}
            >
              📊 Encuestas
            </button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleButtonClick('app', '/app')}
              className={`px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold ${
                activeButton === 'app' ? 'scale-95' : ''
              }`}
            >
              🚀 Explorar Plataforma
            </button>
            <button 
              onClick={() => handleButtonClick('news', '/news')}
              className={`px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 font-semibold ${
                activeButton === 'news' ? 'scale-95' : ''
              }`}
            >
              📰 Noticias
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Construyamos juntos una Colombia más participativa y democrática
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
