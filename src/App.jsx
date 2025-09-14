import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import HomePage from './HomePage';
import NewsFeed from './NewsFeed';
import LiveChat from './components/LiveChat';
import Debate from './components/Debate';
import Survey from './components/Survey';
import News from './components/News';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigation handler with loading state and error handling
  const navigateTo = async (view) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate smooth transition delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setCurrentView(view);
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(`Error navegando a ${view}: ${err.message}`);
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error handler
  const clearError = () => {
    setError(null);
  };

  // Render current view with error handling
  const renderCurrentView = () => {
    try {
      switch (currentView) {
        case 'home':
          return (
            <div>
              <HeroSection onNavigate={navigateTo} />
              <main className="container mx-auto px-4 py-8">
                <HomePage />
                <section className="mt-12">
                  <NewsFeed />
                </section>
              </main>
            </div>
          );
        case 'chat':
          return <LiveChat />;
        case 'debates':
          return <Debate />;
        case 'surveys':
          return <Survey />;
        case 'news':
          return <News />;
        default:
          return (
            <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Página no encontrada</h1>
              <p className="text-gray-600 mt-2">La sección que busca no existe.</p>
              <button 
                onClick={() => navigateTo('home')}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Volver al inicio
              </button>
            </div>
          );
      }
    } catch (err) {
      setError(`Error cargando vista: ${err.message}`);
      console.error('View rendering error:', err);
      return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navigation currentView={currentView} onNavigate={navigateTo} />
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button 
                  onClick={clearError}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}
        
        {/* Main Content */}
        <div className={isLoading ? 'opacity-50 pointer-events-none' : 'transition-opacity duration-200'}>
          {renderCurrentView()}
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
    </ErrorBoundary>
  );
}

export default App;