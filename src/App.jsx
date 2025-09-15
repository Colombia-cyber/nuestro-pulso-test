import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import UniversalSearchBar from './components/UniversalSearchBar.tsx';
import PulseReels from './components/PulseReels.tsx';
import CommunityHub from './pages/CommunityHub.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Parse URL and handle navigation with query parameters
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q') || '';
      
      if (path.includes('search') || query) {
        setCurrentView('search');
        setSearchQuery(query);
      } else {
        setCurrentView('home');
        setSearchQuery('');
      }
    };

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState);
    
    // Handle initial load
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view) => {
    // Handle search with query parameter
    if (view.startsWith('search?q=')) {
      const query = decodeURIComponent(view.split('q=')[1] || '');
      setCurrentView('search');
      setSearchQuery(query);
      
      // Update URL without full page reload
      const newUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
      window.history.pushState({ view: 'search', query }, '', newUrl);
      return;
    }

    setCurrentView(view);
    setSearchQuery('');
    
    // Update URL for other views
    const newUrl = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({ view }, '', newUrl);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleNavigate(`search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'debates':
        return <Debate />;
      case 'polls':
        return <Survey />;
      case 'pulse-reels':
        return <PulseReels />;
      case 'search':
        return (
          <div className="container mx-auto px-4 py-8">
            <UniversalSearchBar initialQuery={searchQuery} />
          </div>
        );
      case 'community-hub':
        return <CommunityHub />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroSection onNavigate={handleNavigate} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {/* Home Page Content */}
              <HomePage />
              
              {/* News Feed */}
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation with embedded search */}
      <nav className="w-full bg-white shadow-sm py-3 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between fixed top-0 left-0 z-50 gap-3 lg:gap-0">
        {/* Top row on mobile, left side on desktop */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <img src="/colombia-flag.png" alt="Colombia Flag" className="w-8 h-6 lg:w-10 lg:h-7" />
            <span className="font-bold text-lg lg:text-xl text-yellow-700">Nuestro Pulso</span>
          </div>
        </div>
        
        {/* Search bar - always visible, responsive */}
        <div className="w-full lg:flex-1 lg:max-w-md lg:mx-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar noticias, debates, políticos..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm lg:text-base"
            >
              <span>🔍</span>
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </form>
        </div>

        {/* Navigation and right side */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          {/* Navigation links */}
          <div className="flex gap-2 lg:gap-4 items-center overflow-x-auto">
            <button 
              onClick={() => handleNavigate('home')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'home' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>🏠</span>
              <span className="hidden sm:inline">Inicio</span>
            </button>
            <button 
              onClick={() => handleNavigate('news')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'news' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>📰</span>
              <span className="hidden sm:inline">Noticias</span>
            </button>
            <button 
              onClick={() => handleNavigate('community-hub')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'community-hub' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>💭</span>
              <span className="hidden sm:inline">Hub</span>
            </button>
            <button 
              onClick={() => handleNavigate('polls')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'polls' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>📊</span>
              <span className="hidden sm:inline">Encuestas</span>
            </button>
            <button 
              onClick={() => handleNavigate('pulse-reels')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'pulse-reels' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>🎬</span>
              <span className="hidden sm:inline">Reels</span>
            </button>
            <button 
              onClick={() => handleNavigate('debates')}
              className={`font-medium transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm ${currentView === 'debates' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
            >
              <span>🗣️</span>
              <span className="hidden sm:inline">Debates</span>
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Social Icons - hidden on small screens */}
            <div className="hidden md:flex items-center gap-2">
              <a 
                href="https://www.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
                title="Google"
              >
                🌐
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
                title="YouTube"
              >
                📺
              </a>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-bold shadow hover:scale-105 transition text-xs lg:text-sm">
              Ingresar
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 lg:pt-20">
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
  );
}

export default App;