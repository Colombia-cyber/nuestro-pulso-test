import React, { useState, Suspense } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import AdvancedSearchHomepage from './components/AdvancedSearchHomepage.tsx';

import CustomNewsFeed from './components/CustomNewsFeed.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import UniversalSearchBar from './components/UniversalSearchBar.tsx';
import CommunityHub from './pages/CommunityHub.tsx';
import PulseReels from './components/PulseReels.tsx';
import CongressTracker from './components/CongressTracker.tsx';
import ElectionHub from './components/ElectionHub.tsx';
import LiveChat from './components/LiveChat.tsx';

// Loading component for better UX
const LoadingSpinner = ({ message = "Cargando..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-gray-500">Por favor espera un momento...</p>
    </div>
  </div>
);

// Error boundary component
const ErrorFallback = ({ error = "Algo salió mal", onRetry }) => (
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
  const [error, setError] = useState(null);

  const handleNavigate = (view) => {
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

  const getLoadingMessage = (view) => {
    const messages = {
      'reels': 'Cargando Reels...',
      'feeds': 'Cargando noticias...',
      'news': 'Cargando noticias...',
      'congress': 'Cargando actividad del Congreso...',
      'elections': 'Cargando información electoral...',
      'chat': 'Conectando al chat en vivo...',
      'debates': 'Cargando debates...',
      'polls': 'Cargando encuestas...',
      'surveys': 'Cargando encuestas...',
      'search': 'Preparando búsqueda...',
      'community-hub': 'Cargando Community Hub...',
    };
    return messages[view] || 'Cargando contenido...';
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
        case 'polls':
        case 'surveys':
          return <Survey />;
        case 'search':
          return (
            <div className="container mx-auto px-4 py-8">
              <UniversalSearchBar />
            </div>
          );
        case 'community-hub':
          return <CommunityHub />;
        case 'home':
        default:
          return <AdvancedSearchHomepage onNavigate={handleNavigate} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return <ErrorFallback error={error} onRetry={handleRetry} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 xl:gap-4 items-center">
          <button 
            onClick={() => handleNavigate('home')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'home' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🏠</span>
            <span className="hidden xl:inline">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavigate('reels')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'reels' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🎬</span>
            <span className="hidden xl:inline">Reels</span>
          </button>
          <button 
            onClick={() => handleNavigate('feeds')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'feeds' || currentView === 'news' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>📰</span>
            <span className="hidden xl:inline">Feeds</span>
          </button>
          <button 
            onClick={() => handleNavigate('congress')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'congress' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🏛️</span>
            <span className="hidden xl:inline">Congreso</span>
          </button>
          <button 
            onClick={() => handleNavigate('elections')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'elections' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🗳️</span>
            <span className="hidden xl:inline">Elecciones</span>
          </button>
          <button 
            onClick={() => handleNavigate('chat')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'chat' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>💬</span>
            <span className="hidden xl:inline">Chat</span>
          </button>
          <button 
            onClick={() => handleNavigate('debates')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'debates' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🗣️</span>
            <span className="hidden xl:inline">Debates</span>
          </button>
          <button 
            onClick={() => handleNavigate('surveys')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'surveys' || currentView === 'polls' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>📊</span>
            <span className="hidden xl:inline">Encuestas</span>
          </button>
          <button 
            onClick={() => handleNavigate('search')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'search' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🔍</span>
            <span className="hidden xl:inline">Buscar</span>
          </button>
          <button 
            onClick={() => handleNavigate('community-hub')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'community-hub' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>💭</span>
            <span className="hidden xl:inline">Hub</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <select 
            value={currentView} 
            onChange={(e) => handleNavigate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="home">🏠 Inicio</option>
            <option value="reels">🎬 Reels</option>
            <option value="feeds">📰 Feeds</option>
            <option value="congress">🏛️ Congreso</option>
            <option value="elections">🗳️ Elecciones</option>
            <option value="chat">💬 Chat</option>
            <option value="debates">🗣️ Debates</option>
            <option value="surveys">📊 Encuestas</option>
            <option value="search">🔍 Buscar</option>
            <option value="community-hub">💭 Hub</option>
          </select>
        </div>
        
        <div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          {renderCurrentView()}
        </Suspense>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🇨🇴 Nuestro Pulso</p>
          <p className="text-gray-400">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;