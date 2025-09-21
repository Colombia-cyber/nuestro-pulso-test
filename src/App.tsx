import React, { useState, Suspense } from "react";
import { FastNavbar } from "./components/FastNavbar";
import { FastErrorBoundary } from "./components/FastAdvancedComponents";
import { FastPerformanceDashboard, FastNotificationSystem } from "./components/FastPerformanceComponents";
import HeroSection from "./components/HeroSection";
import ModernHomepage from "./components/ModernHomepage";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import EnhancedSearchPage from "./pages/EnhancedSearch";
import PulseReels from "./components/PulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";

// Import modern styles and ultra-fast components
import "./styles/modern.css";
import "./styles/ultra-fast.css";

// Ultra-fast loading component with optimized animations
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Cargando..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center animate-fadeIn">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4 spinner-ultra-fast"></div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-gray-500">Ultra-fast loading...</p>
      <div className="mt-4 flex justify-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

// Ultra-fast error boundary component
const ErrorFallback: React.FC<{ error?: string; onRetry?: () => void }> = ({ 
  error = "Algo salió mal", 
  onRetry 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 animate-fadeIn">
      <div className="text-6xl mb-4 animate-bounce-subtle">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Error al cargar el contenido</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-ultra-fast btn-ultra-responsive shadow-fast hover:shadow-xl"
        >
          Reintentar
        </button>
      )}
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
    
    // Simulate loading delay for better UX
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
          return <EnhancedSearchPage />;
        case 'home':
        default:
          return <ModernHomepage onNavigate={handleNavigate} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return <ErrorFallback error={error || undefined} onRetry={handleRetry} />;
    }
  };

  const getLoadingMessage = (view: string): string => {
    const messages: Record<string, string> = {
      'reels': 'Cargando Reels...',
      'feeds': 'Cargando noticias...',
      'news': 'Cargando noticias...',
      'congress': 'Cargando actividad del Congreso...',
      'elections': 'Cargando información electoral...',
      'chat': 'Conectando al chat en vivo...',
      'debates': 'Cargando debates...',
      'surveys': 'Cargando encuestas...',
      'encuestas': 'Cargando encuestas...',
      'comments': 'Cargando comentarios...',
      'community-hub': 'Cargando Community Hub...',
      'search': 'Preparando búsqueda...',
    };
    return messages[view] || 'Cargando contenido...';
  };

  return (
    <FastErrorBoundary
      maxRetries={3}
      onError={(error, errorInfo) => {
        console.error('Ultra-fast component error:', error, errorInfo);
        // Show notification
        if ((window as any).showNotification) {
          (window as any).showNotification({
            type: 'error',
            title: 'Error en la aplicación',
            message: 'Se ha detectado un error. Reintentando automáticamente...',
            duration: 5000
          });
        }
      }}
    >
      <div>
        <FastNavbar onNavigate={handleNavigate} currentView={currentView} />
        <div className="pt-20">
          <Suspense fallback={<LoadingSpinner />}>
            {renderCurrentView()}
          </Suspense>
        </div>
        
        {/* Ultra-fast performance monitoring */}
        <FastPerformanceDashboard 
          showDetailed={false}
          autoRefresh={true}
          refreshInterval={1000}
        />
        
        {/* Global notification system */}
        <FastNotificationSystem 
          position="top-right"
          maxNotifications={5}
        />
      </div>
    </FastErrorBoundary>
  );
}

export default App;