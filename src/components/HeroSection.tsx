import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

interface HomePageContent {
  title: string;
  subtitle: string;
  description: string;
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    action: string;
  }>;
  mainActions: Array<{
    id: string;
    title: string;
    action: string;
    color: string;
  }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Default fallback content for reliability
  const fallbackContent: HomePageContent = {
    title: "🇨🇴 Nuestro Pulso",
    subtitle: "Red Cívica de Colombia - Tu Voz Cuenta",
    description: "Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo para construir el futuro de Colombia juntos.",
    features: [
      {
        id: 'congress',
        title: 'Congreso',
        description: 'Sigue la actividad legislativa en tiempo real',
        icon: '🏛️',
        action: 'congress'
      },
      {
        id: 'elections',
        title: 'Elecciones',
        description: 'Centro de información electoral actualizada',
        icon: '📈',
        action: 'elections'
      },
      {
        id: 'news',
        title: 'Noticias',
        description: 'Análisis y cobertura de eventos cívicos',
        icon: '📰',
        action: 'feeds'
      }
    ],
    mainActions: [
      {
        id: 'chat',
        title: '💬 Chat en Vivo',
        action: 'chat',
        color: 'bg-blue-600 hover:bg-blue-700'
      },
      {
        id: 'debates',
        title: '🗣️ Debates',
        action: 'debates',
        color: 'bg-green-600 hover:bg-green-700'
      },
      {
        id: 'surveys',
        title: '📊 Encuestas',
        action: 'surveys',
        color: 'bg-purple-600 hover:bg-purple-700'
      }
    ]
  };

  // Load content with error handling and retries
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate content loading - in real app this would be an API call
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
        
        // Simulate occasional failures for testing (5% chance)
        if (Math.random() < 0.05 && retryCount < 3) {
          throw new Error('Error al cargar el contenido principal');
        }
        
        // Load content (could come from CMS, API, etc.)
        setContent(fallbackContent);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error loading homepage content:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        
        // Use fallback content on error to ensure reliability
        setContent(fallbackContent);
        setIsLoading(false);
      }
    };

    loadContent();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleNavigation = (action: string) => {
    try {
      onNavigate(action);
    } catch (err) {
      console.error('Navigation error:', err);
      // Show a user-friendly error but don't break the UI
      alert('Error de navegación. Inténtalo de nuevo.');
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30 animate-pulse">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-white bg-opacity-40 rounded-full"></div>
              <div className="w-4 h-4 bg-white bg-opacity-40 rounded-full"></div>
              <div className="w-4 h-4 bg-white bg-opacity-40 rounded-full"></div>
            </div>
          </div>
          
          <div className="w-3/4 h-16 bg-white bg-opacity-40 rounded mb-6 mx-auto"></div>
          <div className="w-2/3 h-8 bg-white bg-opacity-40 rounded mb-8 mx-auto"></div>
          <div className="w-full h-6 bg-white bg-opacity-40 rounded mb-8 mx-auto"></div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <div className="w-48 h-14 bg-white bg-opacity-40 rounded-xl"></div>
            <div className="w-48 h-14 bg-white bg-opacity-40 rounded-xl"></div>
            <div className="w-48 h-14 bg-white bg-opacity-40 rounded-xl"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-xl p-6">
                <div className="w-12 h-12 bg-white bg-opacity-40 rounded-full mb-4 mx-auto"></div>
                <div className="w-3/4 h-6 bg-white bg-opacity-40 rounded mb-2 mx-auto"></div>
                <div className="w-full h-4 bg-white bg-opacity-40 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Error state
  const ErrorState = () => (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error de Carga</h1>
          <p className="text-gray-800 mb-6">{error}</p>
          <p className="text-gray-700 mb-8">
            No te preocupes, hemos cargado el contenido esencial para que puedas continuar navegando.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleRetry}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              🔄 Reintentar
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              ✅ Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading skeleton
  if (isLoading && !content) {
    return <LoadingSkeleton />;
  }

  // Show error state if error and no content
  if (error && !content) {
    return <ErrorState />;
  }

  // Main content
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 min-h-screen flex items-center justify-center">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Error banner if there was an error but content loaded */}
        {error && content && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6 backdrop-blur-lg">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>Hubo un problema menor al cargar, pero todo funciona correctamente.</span>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-yellow-700 hover:text-yellow-900"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
          {/* Colombian Flag Colors Accent */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {content?.title || fallbackContent.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 mb-8 font-medium">
            {content?.subtitle || fallbackContent.subtitle}
          </p>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {content?.description || fallbackContent.description}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {(content?.mainActions || fallbackContent.mainActions).map((action) => (
              <button 
                key={action.id}
                onClick={() => handleNavigation(action.action)}
                className={`px-8 py-4 ${action.color} text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50`}
                aria-label={`Ir a ${action.title}`}
              >
                {action.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content?.features || fallbackContent.features).map((feature) => (
            <div 
              key={feature.id}
              onClick={() => handleNavigation(feature.action)}
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30 cursor-pointer hover:bg-opacity-30 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation(feature.action);
                }
              }}
              aria-label={`Ir a ${feature.title}`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;