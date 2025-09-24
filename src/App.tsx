import React, { useState, Suspense, useEffect, useMemo, useCallback, lazy } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ModernHomepage from "./components/ModernHomepage";
import WorldClassHomepage from "./components/WorldClassHomepage";
import QuantumWorldClassHomepage from "./components/QuantumWorldClassHomepage";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import ArticleComments from "./components/ArticleComments";
import TopicTabs from "./components/TopicTabs";
import ElTiempoOpinionFeed from "./components/ElTiempoOpinionFeed";
import { useMultiModalNavigation } from "./services/multiModalNavigation";

// Lazy load heavy components for better performance
const CommunityHub = lazy(() => import("./pages/CommunityHub"));
const CrossPlatformCommunityHub = lazy(() => import("./components/CrossPlatformCommunityHub"));
const QuantumCommunityHub = lazy(() => import("./components/QuantumCommunityHub"));
const ColombiaNewsHub = lazy(() => import("./components/ColombiaNewsHub"));
const SearchPage = lazy(() => import("./pages/Search"));
const EnhancedSearchPage = lazy(() => import("./pages/EnhancedSearch"));
const LeftWingPage = lazy(() => import("./pages/LeftWing"));
const RightWingPage = lazy(() => import("./pages/RightWing"));
const ModernSearchEngine = lazy(() => import("./components/ModernSearchEngine"));
const PulseReels = lazy(() => import("./components/PulseReels"));
const EnhancedPulseReels = lazy(() => import("./components/EnhancedPulseReels"));
const QuantumReelsHub = lazy(() => import("./components/QuantumReelsHub"));
const CongressTracker = lazy(() => import("./components/CongressTracker"));
const ElectionHub = lazy(() => import("./components/ElectionHub"));
const LiveChat = lazy(() => import("./components/LiveChat"));
const Debate = lazy(() => import("./components/Debate"));
const Survey = lazy(() => import("./components/Survey"));

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
  const [currentTopic, setCurrentTopic] = useState('colombia-news');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = useCallback((view: string) => {
    // Prevent redundant navigation
    if (currentView === view) return;
    
    setError(null);
    setCurrentView(view);
    
    // Only show loading for heavy components
    const heavyComponents = ['feeds', 'news', 'search', 'community-hub', 'reels'];
    if (heavyComponents.includes(view)) {
      setIsLoading(true);
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    }
  }, [currentView]);

  // Initialize multi-modal navigation
  const { isListening, capabilities } = useMultiModalNavigation(handleNavigate);

  // Listen for custom navigation events
  useEffect(() => {
    const handleCustomNavigation = (event: CustomEvent) => {
      handleNavigate(event.detail);
    };

    window.addEventListener('navigate' as any, handleCustomNavigation);
    
    return () => {
      window.removeEventListener('navigate' as any, handleCustomNavigation);
    };
  }, [handleNavigate]);

  const handleTopicChange = useCallback((topicId: string) => {
    // Prevent redundant topic changes
    if (currentTopic === topicId) return;
    
    setCurrentTopic(topicId);
    // Only navigate if we're not already in a news/feeds view
    if (!['feeds', 'news'].includes(currentView)) {
      handleNavigate('feeds');
    }
  }, [currentTopic, currentView, handleNavigate]);

  const handleRetry = useCallback(() => {
    if (error) {
      setError(null);
    }
  }, [error]);

  const renderCurrentView = useMemo(() => {
    if (isLoading) {
      return <LoadingSpinner message={getLoadingMessage(currentView)} />;
    }

    if (error) {
      return <ErrorFallback error={error} onRetry={handleRetry} />;
    }

    try {
      switch (currentView) {
        case 'reels':
          return <QuantumReelsHub />;
        case 'feeds':
        case 'news':
          return (
            <div>
              <TopicTabs 
                onTopicChange={handleTopicChange} 
                currentTopic={currentTopic} 
              />
              <CustomNewsFeed topic={currentTopic} />
            </div>
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
        case 'article-comments':
          return <ArticleComments onNavigate={handleNavigate} />;
        case 'community-hub':
          return <QuantumCommunityHub />;
        case 'colombia-hub':
        case 'colombia-news':
          return <ColombiaNewsHub onNavigate={handleNavigate} />;
        case 'search':
          return <ModernSearchEngine />;
        case 'left-wing':
          return <LeftWingPage onNavigate={handleNavigate} />;
        case 'right-wing':
          return <RightWingPage onNavigate={handleNavigate} />;
        case 'eltiempo-opinion':
          return <ElTiempoOpinionFeed />;
        case 'home':
        default:
          return <QuantumWorldClassHomepage onNavigate={handleNavigate} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return <ErrorFallback error={error || undefined} onRetry={handleRetry} />;
    }
  }, [currentView, currentTopic, isLoading, error, handleNavigate, handleTopicChange, handleRetry]);

  const getLoadingMessage = useCallback((view: string): string => {
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
      'colombia-hub': 'Cargando Colombia News Hub...',
      'colombia-news': 'Cargando Colombia News Hub...',
      'search': 'Preparando búsqueda...',
    };
    return messages[view] || 'Cargando contenido...';
  }, []);

  return (
    <div>
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      {/* Multi-modal Status Indicator */}
      {(isListening || capabilities.speechRecognition) && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all ${
            isListening 
              ? 'bg-red-600 text-white animate-pulse' 
              : 'bg-slate-800 text-slate-300'
          }`}>
            {isListening ? '🎙️ Escuchando...' : '🤖 IA Activa'}
          </div>
        </div>
      )}
      <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          {renderCurrentView}
        </Suspense>
      </div>
    </div>
  );
}

export default App;