import React, { useState, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ModernHomepage from "./components/ModernHomepage";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import ArticleComments from "./components/ArticleComments";
import CommunityHub from "./pages/CommunityHub";
import CrossPlatformCommunityHub from "./components/CrossPlatformCommunityHub";
import SearchPage from "./pages/Search";
import EnhancedSearchPage from "./pages/EnhancedSearch";
import LeftWingPage from "./pages/LeftWing";
import RightWingPage from "./pages/RightWing";
import ModernSearchEngine from "./components/ModernSearchEngine";
import PulseReels from "./components/PulseReels";
import EnhancedPulseReels from "./components/EnhancedPulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import TopicTabs from "./components/TopicTabs";
import EnhancedTopicTabs from "./components/EnhancedTopicTabs";
import { ToastNotifications } from "./components/NotificationCenter";
import { QueryProvider } from "./providers/QueryProvider";
import useAppStore from "./stores/appStore";

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
  // Use global state instead of local state
  const { 
    currentView,
    currentTopic,
    isLoading,
    error,
    darkMode,
    setCurrentView,
    setCurrentTopic,
    setLoading,
    setError,
    updateLiveStats,
    addNotification
  } = useAppStore();

  // Initialize live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateLiveStats({
        onlineUsers: Math.max(2800, Math.floor(Math.random() * 3200) + 2800),
        activePolls: Math.max(10, Math.floor(Math.random() * 20) + 10),
        newsUpdates: Math.floor(Math.random() * 100) + 50,
        discussions: Math.max(150, Math.floor(Math.random() * 300) + 150)
      });
    }, 30000); // Update every 30 seconds

    // Welcome notification
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: '¡Bienvenido a Nuestro Pulso!',
        message: 'Plataforma cívica líder con características avanzadas de IA y tiempo real',
        read: false
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [updateLiveStats, addNotification]);

  // Listen for custom navigation events
  useEffect(() => {
    const handleCustomNavigation = (event: CustomEvent) => {
      handleNavigate(event.detail);
    };

    window.addEventListener('navigate' as any, handleCustomNavigation);
    
    return () => {
      window.removeEventListener('navigate' as any, handleCustomNavigation);
    };
  }, []);

  const handleNavigate = (view: string) => {
    setLoading(true);
    setError(null);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCurrentView(view);
      setLoading(false);
      
      // Add navigation notification
      addNotification({
        type: 'info',
        title: 'Navegación',
        message: `Navegando a ${getViewName(view)}`,
        read: false
      });
    }, 300);
  };

  const handleTopicChange = (topicId: string) => {
    setCurrentTopic(topicId);
    // If we're not in feeds/news view, navigate there
    if (!['feeds', 'news'].includes(currentView)) {
      handleNavigate('feeds');
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const getViewName = (view: string): string => {
    const viewNames: Record<string, string> = {
      'home': 'Inicio',
      'reels': 'Reels',
      'feeds': 'Noticias',
      'news': 'Noticias',
      'congress': 'Congreso',
      'elections': 'Elecciones',
      'chat': 'Chat en Vivo',
      'debates': 'Debates',
      'surveys': 'Encuestas',
      'comments': 'Comentarios',
      'community-hub': 'Hub Comunitario',
      'search': 'Búsqueda'
    };
    return viewNames[view] || 'Contenido';
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
          return <EnhancedPulseReels />;
        case 'feeds':
        case 'news':
          return (
            <div>
              <EnhancedTopicTabs 
                onTopicChange={handleTopicChange} 
                currentTopic={currentTopic}
                multiSelect={false}
                aiRecommendations={true}
                showAnalytics={true}
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
          return <CrossPlatformCommunityHub />;
        case 'search':
          return <ModernSearchEngine />;
        case 'left-wing':
          return <LeftWingPage onNavigate={handleNavigate} />;
        case 'right-wing':
          return <RightWingPage onNavigate={handleNavigate} />;
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
    <QueryProvider>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar onNavigate={handleNavigate} currentView={currentView} />
          <div className="pt-20">
            <Suspense fallback={<LoadingSpinner />}>
              {renderCurrentView()}
            </Suspense>
          </div>
          
          {/* Toast Notifications */}
          <ToastNotifications />
        </div>
      </div>
    </QueryProvider>
  );
}

export default App;