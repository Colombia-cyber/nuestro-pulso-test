import React, { useState } from 'react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  // Enhanced navigation with loading states and error handling
  const handleNavigation = async (view: string, buttonId: string) => {
    setLoadingButton(buttonId);
    
    try {
      // Simulate brief loading for better UX
      await new Promise(resolve => setTimeout(resolve, 150));
      onNavigate(view);
    } catch (error) {
      console.error('Navigation error:', error);
      // Still attempt navigation even if there's an error
      onNavigate(view);
    } finally {
      setLoadingButton(null);
    }
  };

  // Navigation button component with enhanced reliability
  const NavigationButton: React.FC<{
    view: string;
    buttonId: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ view, buttonId, children, className = '' }) => (
    <button 
      onClick={() => handleNavigation(view, buttonId)}
      disabled={loadingButton === buttonId}
      className={`px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:transform-none focus:outline-none focus:ring-4 focus:ring-white/30 ${className}`}
      aria-label={`Navegar a ${view}`}
    >
      {loadingButton === buttonId ? '⏳' : children}
    </button>
  );

  // Feature card component with enhanced interaction
  const FeatureCard: React.FC<{
    view: string;
    icon: string;
    title: string;
    description: string;
  }> = ({ view, icon, title, description }) => (
    <div 
      onClick={() => handleNavigation(view, `feature-${view}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigation(view, `feature-${view}`);
        }
      }}
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 cursor-pointer hover:bg-opacity-30 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 focus:bg-opacity-30"
      tabIndex={0}
      role="button"
      aria-label={`Ir a ${title}`}
    >
      <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
      {loadingButton === `feature-${view}` && (
        <div className="mt-2 text-sm text-gray-600">Cargando...</div>
      )}
    </div>
  );

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
            <NavigationButton 
              view="chat" 
              buttonId="main-chat"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              💬 Chat en Vivo
            </NavigationButton>
            
            <NavigationButton 
              view="debates" 
              buttonId="main-debates"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              🗣️ Debates
            </NavigationButton>
            
            <NavigationButton 
              view="surveys" 
              buttonId="main-surveys"
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              📊 Encuestas
            </NavigationButton>
          </div>
        </div>
        
        {/* Feature highlights with enhanced navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            view="congress"
            icon="🏛️"
            title="Congreso"
            description="Sigue la actividad legislativa en tiempo real"
          />
          
          <FeatureCard
            view="elections"
            icon="📈"
            title="Elecciones"
            description="Centro de información electoral actualizada"
          />
          
          <FeatureCard
            view="feeds"
            icon="📰"
            title="Noticias"
            description="Análisis y cobertura de eventos cívicos"
          />
        </div>

        {/* Additional navigation options */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard
            view="reels"
            icon="🎬"
            title="Reels"
            description="Videos cortos cívicos"
          />
          
          <FeatureCard
            view="community-hub"
            icon="💭"
            title="Community Hub"
            description="Actividad de la comunidad"
          />
          
          <FeatureCard
            view="search"
            icon="🔍"
            title="Búsqueda"
            description="Busca contenido relevante"
          />
          
          <FeatureCard
            view="comments"
            icon="💬"
            title="Comentarios"
            description="Participa en discusiones"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;