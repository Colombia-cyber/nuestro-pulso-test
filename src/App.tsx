import React, { useState, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import ArticleDetail from "./pages/ArticleDetail";
import PulseReels from "./components/PulseReels";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import LiveChat from "./components/LiveChat";
import Debate from "./components/Debate";
import Survey from "./components/Survey";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current view from URL
  const getCurrentView = () => {
    const path = location.pathname;
    if (path.startsWith('/articles/')) return 'article';
    if (path === '/news' || path === '/feeds') return 'feeds';
    if (path === '/reels') return 'reels';
    if (path === '/congress') return 'congress';
    if (path === '/elections') return 'elections';
    if (path === '/chat') return 'chat';
    if (path === '/debates') return 'debates';
    if (path === '/surveys' || path === '/encuestas') return 'surveys';
    if (path === '/comments') return 'comments';
    if (path === '/community-hub') return 'community-hub';
    if (path === '/search') return 'search';
    return 'home';
  };

  const handleNavigate = (view: string, articleId?: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      if (view === 'article' && articleId) {
        navigate(`/articles/${articleId}`);
      } else if (view === 'feeds' || view === 'news') {
        navigate('/news');
      } else if (view === 'home') {
        navigate('/');
      } else {
        navigate(`/${view}`);
      }
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
      'article': 'Cargando artículo...',
    };
    return messages[view] || 'Cargando contenido...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{getLoadingMessage(getCurrentView())}</h3>
          <p className="text-gray-500">Por favor espera un momento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Error al cargar el contenido</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onNavigate={handleNavigate} currentView={getCurrentView()} />
      <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HeroSection onNavigate={handleNavigate} />} />
            <Route path="/news" element={<CustomNewsFeed onNavigate={handleNavigate} />} />
            <Route path="/feeds" element={<CustomNewsFeed onNavigate={handleNavigate} />} />
            <Route path="/articles/:id" element={<ArticleDetail onNavigate={handleNavigate} />} />
            <Route path="/reels" element={<PulseReels />} />
            <Route path="/congress" element={<CongressTracker />} />
            <Route path="/elections" element={<ElectionHub />} />
            <Route path="/chat" element={<LiveChat />} />
            <Route path="/debates" element={<Debate />} />
            <Route path="/surveys" element={<Survey />} />
            <Route path="/encuestas" element={<Survey />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/community-hub" element={<CommunityHub />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;