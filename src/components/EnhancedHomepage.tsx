import React from 'react';
import CategoryCard from '../components/CategoryCard';

interface EnhancedHomepageProps {
  onNavigate: (view: string) => void;
}

const EnhancedHomepage: React.FC<EnhancedHomepageProps> = ({ onNavigate }) => {
  const categoryCards = [
    {
      title: "Gustavo Petro",
      description: "Noticias, análisis y cobertura sobre el presidente de Colombia y sus políticas.",
      icon: "🇨🇴",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      onClick: () => onNavigate('gustavo-petro')
    },
    {
      title: "Donald Trump",
      description: "Cobertura internacional sobre política estadounidense y su impacto global.",
      icon: "🇺🇸",
      bgColor: "bg-gradient-to-br from-red-500 to-red-700",
      onClick: () => onNavigate('donald-trump')
    },
    {
      title: "Crime and Drugs",
      description: "Análisis sobre seguridad, criminalidad y políticas antidrogas en Colombia.",
      icon: "🚨",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      onClick: () => onNavigate('crime-drugs')
    },
    {
      title: "Employment",
      description: "Mercado laboral, empleo y oportunidades económicas en Colombia.",
      icon: "💼",
      bgColor: "bg-gradient-to-br from-green-500 to-green-700",
      onClick: () => onNavigate('employment')
    },
    {
      title: "Terror",
      description: "Seguridad nacional, terrorismo y temas de defensa en la región.",
      icon: "⚠️",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      onClick: () => onNavigate('terror')
    },
    {
      title: "Right-wing",
      description: "Perspectivas conservadoras y análisis político de derecha.",
      icon: "🏛️",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
      onClick: () => onNavigate('right-wing')
    },
    {
      title: "Left-wing",
      description: "Movimientos progresistas y políticas de izquierda en Colombia.",
      icon: "✊",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
      onClick: () => onNavigate('left-wing')
    },
    {
      title: "Legislation",
      description: "Seguimiento de leyes, reformas y procesos legislativos.",
      icon: "📜",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      onClick: () => onNavigate('legislation')
    },
    {
      title: "Congress of Colombia",
      description: "Actividad del Congreso, debates y decisiones parlamentarias.",
      icon: "🏛️",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
      onClick: () => onNavigate('congress')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-20">
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
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                💬 Chat en Vivo
              </button>
              <button 
                onClick={() => onNavigate('debates')}
                className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                🗣️ Debates
              </button>
              <button 
                onClick={() => onNavigate('polls')}
                className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                📊 Encuestas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((card, index) => (
            <CategoryCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              bgColor={card.bgColor}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>

      {/* Coming Soon Information Box */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">ℹ️</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Coming Soon</h3>
              <p className="text-blue-800 leading-relaxed">
                Estamos trabajando en nuevas funcionalidades para mejorar tu experiencia. 
                Pronto podrás acceder a más herramientas de participación cívica, 
                análisis en tiempo real y contenido personalizado. 
                ¡Mantente atento a las actualizaciones!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHomepage;