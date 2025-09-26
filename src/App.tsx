import React, { useState, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import CentralSearchBar from "./components/CentralSearchBar";
import HeroSection from "./components/HeroSection";
import ModernHomepage from "./components/ModernHomepage";
import WorldClassHomepage from "./components/WorldClassHomepage";
import QuantumWorldClassHomepage from "./components/QuantumWorldClassHomepage";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import ArticleComments from "./components/ArticleComments";
import CommunityHub from "./pages/CommunityHub";
import CrossPlatformCommunityHub from "./components/CrossPlatformCommunityHub";
import QuantumCommunityHub from "./components/QuantumCommunityHub";
import ColombiaNewsHub from "./components/ColombiaNewsHub";
import SearchPage from "./pages/Search";
import EnhancedSearchPage from "./pages/EnhancedSearch";
import LeftWingPage from "./pages/LeftWing";
import RightWingPage from "./pages/RightWing";
import ModernSearchEngine from "./components/ModernSearchEngine";
import PulseReels from "./components/PulseReels";
import EnhancedPulseReels from "./components/EnhancedPulseReels";
import QuantumReelsHub from "./components/QuantumReelsHub";
import WorldClassVideoHub from "./components/WorldClassVideoHub";
import WorldClassVideoAdminDashboard from "./components/WorldClassVideoAdminDashboard";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import TopicTabs from "./components/TopicTabs";
import ElTiempoOpinionFeed from "./components/ElTiempoOpinionFeed";
import GlobalTendenciasRealtime from "./components/GlobalTendenciasRealtime.jsx";
import TerrorNewsHub from "./components/TerrorNewsHub";
import SourcesPage from "./pages/Sources";
import SourceDetail from "./pages/SourceDetail";
import { useMultiModalNavigation } from "./services/multiModalNavigation";

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
  const [viewParams, setViewParams] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize multi-modal navigation
  const { isListening, capabilities } = useMultiModalNavigation(handleNavigate);

  // Listen for custom navigation events
  useEffect(() => {
    const handleCustomNavigation = (event: CustomEvent) => {
      handleNavigate(event.detail.view, event.detail.params);
    };

    window.addEventListener('navigate' as any, handleCustomNavigation);
    
    return () => {
      window.removeEventListener('navigate' as any, handleCustomNavigation);
    };
  }, []);

  function handleNavigate(view: string, params?: any) {
    setIsLoading(true);
    setError(null);
    setViewParams(params);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
    }, 300);
  }

  const handleTopicChange = (topicId: string) => {
    setCurrentTopic(topicId);
    // If we're not in feeds/news view, navigate there
    if (!['feeds', 'news'].includes(currentView)) {
      handleNavigate('feeds');
    }
  };

  const shouldShowCentralSearch = () => {
    return ['home', 'feeds', 'news', 'reels', 'video-hub', 'search', 'debates', 'surveys', 'encuestas', 'tendencias', 'global-tendencias', 'sources'].includes(currentView);
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
        case 'sources':
          return <SourcesPage onNavigate={handleNavigate} />;
        case 'source-detail':
          return (
            <SourceDetail 
              sourceId={viewParams?.sourceId}
              source={viewParams?.source}
              onNavigate={handleNavigate} 
            />
          );
        case 'video-hub':
          return <WorldClassVideoHub />;
        case 'video-admin':
          return <WorldClassVideoAdminDashboard />;
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
        case 'tendencias':
        case 'global-tendencias':
          return <GlobalTendenciasRealtime />;
        case 'terror-news':
          return <TerrorNewsHub onNavigate={handleNavigate} />;
        case 'home':
        default:
          return <QuantumWorldClassHomepage onNavigate={handleNavigate} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return <ErrorFallback error={error || undefined} onRetry={handleRetry} />;
    }
  };

  const getLoadingMessage = (view: string): string => {
    const messages: Record<string, string> = {
      'reels': 'Cargando Reels...',
      'video-hub': 'Cargando Video Hub...',
      'video-admin': 'Cargando Panel de Administración...',
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
      'sources': 'Cargando fuentes de noticias...',
      'source-detail': 'Cargando información de la fuente...',
      'tendencias': 'Cargando tendencias globales...',
      'global-tendencias': 'Cargando tendencias globales...',
    };
    return messages[view] || 'Cargando contenido...';
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      {/* Central Search Bar - shown on main pages */}
      {shouldShowCentralSearch() && !isLoading && !error && (
        <CentralSearchBar onNavigate={handleNavigate} />
      )}
      
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
      <div className={shouldShowCentralSearch() ? 'pt-20' : 'pt-20'}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderCurrentView()}
        </Suspense>
      </div>
    </div>
  );
}

export default App;