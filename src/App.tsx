import React, { useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import PulseReels from "./components/PulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";

// Enhanced Loading component with Colombian theme
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Cargando..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
    <div className="text-center animate-fade-in">
      <div className="relative mb-8">
        {/* Spinning rings with Colombian colors */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-secondary-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 border-4 border-primary-300 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
          <div className="absolute inset-4 border-4 border-accent-300 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-secondary-400 via-primary-500 to-accent-500 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-white text-lg font-bold">🇨🇴</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-700 mb-3 animate-slide-up">{message}</h3>
      <p className="text-neutral-500 animate-slide-up animation-delay-150">
        Por favor espera un momento...
      </p>
      
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce animation-delay-75"></div>
        <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce animation-delay-150"></div>
      </div>
    </div>
  </div>
);

// Enhanced Error boundary component
const ErrorFallback: React.FC<{ error?: string; onRetry?: () => void }> = ({ 
  error = "Algo salió mal", 
  onRetry 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
    <div className="text-center p-8 max-w-lg mx-4 animate-scale-in">
      <div className="card p-8">
        <div className="text-6xl mb-6 animate-bounce">⚠️</div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Error al cargar el contenido</h3>
        <p className="text-neutral-600 mb-8 leading-relaxed">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn-primary btn-lg hover:scale-105 transform transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span>🔄</span>
              <span>Reintentar</span>
            </span>
          </button>
        )}
      </div>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading delay for better UX with staggered transitions
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 300);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const renderCurrentView = () => {
    if (isLoading) {
      return <LoadingSpinner message={getLoadingMessage(currentView)} />;
    }

    if (error) {
      return <ErrorFallback error={error} onRetry={handleRetry} />;
    }

    try {
      switch (currentView) {
        case 'reels':
          return <PulseReels />;
        case 'feeds':
        case 'news':
          return <CustomNewsFeed />;
        case 'congress':
          return <CongressTracker />;
        case 'elections':
          return <ElectionHub />;
        case 'chat':
          return <LiveChat />;
        case 'debates':
          return <Debate />;
        case 'surveys':
        case 'encuestas':
          return <Survey />;
        case 'comments':
          return <Comments />;
        case 'community-hub':
          return <CommunityHub />;
        case 'search':
          return <SearchPage />;
        case 'home':
        default:
          return <HeroSection onNavigate={handleNavigate} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return <ErrorFallback error={error || undefined} onRetry={handleRetry} />;
    }
  };

  const getLoadingMessage = (view: string): string => {
    const messages: Record<string, string> = {
      'reels': 'Cargando Pulse Reels...',
      'feeds': 'Cargando noticias equilibradas...',
      'news': 'Cargando noticias...',
      'congress': 'Conectando con el Congreso...',
      'elections': 'Cargando centro electoral...',
      'chat': 'Conectando al chat en vivo...',
      'debates': 'Preparando debates...',
      'surveys': 'Cargando encuestas populares...',
      'encuestas': 'Cargando encuestas...',
      'comments': 'Cargando comentarios...',
      'community-hub': 'Accediendo al Community Hub...',
      'search': 'Iniciando búsqueda universal...',
    };
    return messages[view] || 'Cargando contenido...';
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="animate-fade-in">
            {renderCurrentView()}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;