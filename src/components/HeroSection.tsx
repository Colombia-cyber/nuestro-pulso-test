import React, { useState } from 'react';
import Button from './Button';

const HeroSection: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-yellow-400 via-blue-600 via-blue-500 to-red-500 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Enhanced glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      
      {/* Navigation overlay button */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-6 right-6 z-50 bg-white bg-opacity-20 backdrop-blur-lg p-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`w-full h-0.5 bg-white transition-transform duration-300 ${isNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-full h-0.5 bg-white transition-transform duration-300 ${isNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>

      {/* Navigation overlay */}
      {isNavOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-80 bg-white bg-opacity-95 backdrop-blur-lg p-8 shadow-2xl">
            <div className="mt-16 space-y-6">
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Inicio</a>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Debates</a>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Encuestas</a>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Noticias</a>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Congreso</a>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Elecciones</a>
              <div className="pt-6 border-t border-gray-200">
                <Button variant="primary" fullWidth className="mb-3">Crear Cuenta Gratis</Button>
                <Button variant="secondary" fullWidth>Iniciar Sesión</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white border-opacity-30 hover:bg-opacity-35 transition-all duration-500">
          {/* Enhanced Colombian Flag Colors Accent */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full shadow-lg animate-pulse delay-300"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg animate-pulse delay-600"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            🇨🇴 Nuestro Pulso
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-800 mb-10 font-medium">
            Red Cívica de Colombia - Tu Voz Cuenta
          </p>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
            para construir el futuro de Colombia juntos.
          </p>
          
          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button variant="primary" size="lg" className="flex items-center justify-center gap-2">
              💬 Get into Chat en Vivo
            </Button>
            <Button variant="success" size="lg" className="flex items-center justify-center gap-2">
              🗣️ Start Tour de Debates
            </Button>
            <Button variant="warning" size="lg" className="flex items-center justify-center gap-2">
              📊 Explorar Encuestas
            </Button>
          </div>

          {/* New prominent CTA */}
          <div className="mt-8">
            <Button variant="danger" size="lg" className="text-xl px-12 py-5 animate-pulse">
              🚀 Create a Free Account
            </Button>
          </div>
        </div>
        
        {/* Enhanced feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-30 hover:bg-opacity-35 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-6 animate-bounce">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Congreso</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Sigue la actividad legislativa en tiempo real y mantente informado de las decisiones importantes</p>
          </div>
          
          <div className="bg-white bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-30 hover:bg-opacity-35 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-6 animate-bounce delay-200">📈</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Elecciones</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Centro de información electoral actualizada con datos en tiempo real y análisis</p>
          </div>
          
          <div className="bg-white bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-30 hover:bg-opacity-35 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-6 animate-bounce delay-400">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Noticias</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Análisis y cobertura de eventos cívicos con perspectiva ciudadana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;