import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import UniversalSearchBar from './components/UniversalSearchBar.tsx';
import CommunityHub from './pages/CommunityHub.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'debates':
        return <Debate />;
      case 'polls':
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
        return (
          <>
            {/* Hero Section */}
            <HeroSection onNavigate={setCurrentView} />
            
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
    <div className="min-h-screen colombia-pattern-bg">
      {/* Enhanced Colombian Navigation */}
      <nav className="navbar-colombia py-4 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        {/* Enhanced Logo with Colombian flag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-8 bg-colombia-yellow rounded-sm"></div>
            <div className="w-3 h-8 bg-colombia-blue rounded-sm"></div>
            <div className="w-3 h-8 bg-colombia-red rounded-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-colombia-gradient bg-clip-text text-transparent">
              🇨🇴 Nuestro Pulso
            </span>
            <span className="text-xs text-colombia-blue font-medium -mt-1">
              Red Cívica de Colombia
            </span>
          </div>
        </div>

        {/* Enhanced Navigation with Colombian colors */}
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentView('home')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'home' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setCurrentView('news')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'news' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            📰 Noticias
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'search' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            🔍 Buscar
          </button>
          <button 
            onClick={() => setCurrentView('community-hub')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'community-hub' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            💭 Comunidad
          </button>
          <button 
            onClick={() => setCurrentView('polls')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'polls' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            📊 Encuestas
          </button>
          <button 
            onClick={() => setCurrentView('debates')}
            className={`font-semibold transition-colors duration-300 ${
              currentView === 'debates' 
                ? 'text-colombia-red' 
                : 'text-colombia-blue hover:text-colombia-red'
            }`}
          >
            🗣️ Debates
          </button>
        </div>

        {/* Enhanced Login Button */}
        <div>
          <button className="btn-colombia">
            🔑 Ingresar
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        {renderCurrentView()}
      </div>
      
      {/* Enhanced Colombian Footer */}
      <footer className="bg-gradient-to-r from-colombia-blue to-colombia-red text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-6 bg-colombia-yellow rounded-sm"></div>
              <div className="w-2 h-6 bg-white rounded-sm"></div>
              <div className="w-2 h-6 bg-colombia-red rounded-sm"></div>
            </div>
            <p className="text-lg font-semibold">🇨🇴 Nuestro Pulso</p>
          </div>
          <p className="text-white/90 mb-2">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-4 text-sm text-white/70">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
            <p className="mt-1">🇨🇴 Orgullosamente colombiano 🇨🇴</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;