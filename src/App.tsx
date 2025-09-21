import React, { useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ModernHomepage from "./components/ModernHomepage";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import EnhancedSearchPage from "./pages/EnhancedSearch";
import NotFound404 from "./pages/NotFound404";
import PulseReels from "./components/PulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";

// Import modern styles
import "./styles/modern.css";

// Loading component for better UX
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Cargando..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-gray-500">Por favor espera un momento...</p>
    </div>
  </div>
);

// Error boundary component
const ErrorFallback: React.FC<{ error?: string; onRetry?: () => void }> = ({ 
  error = "Algo salió mal", 
  onRetry 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Error al cargar el contenido</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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

  // Handle URL-based routing and 404 detection
  React.useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      // Define valid routes
      const validRoutes = [
        '/',
        '/home',
        '/reels',
        '/feeds',
        '/news',
        '/congress',
        '/elections',
        '/chat',
        '/debates',
        '/surveys',
        '/encuestas',
        '/comments',
        '/community-hub',
        '/search'
      ];
      
      // Check if current path is valid
      const isValidRoute = validRoutes.includes(path) || 
                          path.startsWith('/search') || 
                          path === '' || 
                          path === '/' ||
                          path.startsWith('/#');
      
      if (!isValidRoute) {
        setCurrentView('404');
        return;
      }
      
      // Route to appropriate view
      if (path === '/' || path === '/home' || path === '') {
        setCurrentView('home');
      } else if (path === '/search' || searchParams.has('q')) {
        setCurrentView('search');
      } else if (path.startsWith('/')) {
        const view = path.substring(1);
        if (validRoutes.includes('/' + view)) {
          setCurrentView(view);
        } else {
          setCurrentView('404');
        }
      }
    };

    // Handle initial load
    handleRouteChange();
    
    // Listen for popstate events (back/forward button)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleNavigate = (view: string) => {
    setIsLoading(true);
    setError(null);
    
    // Update URL
    const newPath = view === 'home' ? '/' : `/${view}`;
    window.history.pushState(null, '', newPath);
    
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
        case '404':
          return <NotFound404 onNavigate={handleNavigate} />;
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
      '404': 'Cargando página...',
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
    <div>
      {currentView !== '404' && (
        <Navbar onNavigate={handleNavigate} currentView={currentView} />
      )}
      <div className={currentView !== '404' ? 'pt-20' : ''}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderCurrentView()}
        </Suspense>
      </div>
    </div>
  );
}

export default App;