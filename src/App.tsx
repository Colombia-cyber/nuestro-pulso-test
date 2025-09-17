import React, { useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import ColombianHomepage from "./components/ColombianHomepage";
import ColombianNewsFeed from "./components/ColombianNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import PulseReels from "./components/PulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import { NewsCategory } from "./types/news";

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
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setIsLoading(true);
    setError(null);
    
    // Reset category selection when navigating away from news
    if (view !== 'feeds' && view !== 'news') {
      setSelectedCategory(null);
    }
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 300);
  };

  const handleCategorySelect = (category: NewsCategory) => {
    setSelectedCategory(category);
  };

  const handleCommentClick = (articleId: string, politicalLean: 'left' | 'right') => {
    // Store the comment context and navigate to comments
    localStorage.setItem('commentContext', JSON.stringify({
      articleId,
      politicalLean,
      timestamp: Date.now()
    }));
    handleNavigate('comments');
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
          return (
            <ColombianNewsFeed 
              selectedCategory={selectedCategory || undefined}
              onCommentClick={handleCommentClick}
            />
          );
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
          return (
            <ColombianHomepage 
              onNavigate={handleNavigate}
              onCategorySelect={handleCategorySelect}
            />
          );
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
    <div>
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          {renderCurrentView()}
        </Suspense>
      </div>
    </div>
  );
}

export default App;