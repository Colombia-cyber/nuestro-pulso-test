import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import PulseReels from './components/PulseReels.tsx';
import Navbar from './components/Navbar.tsx';

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
      case 'reels':
        return <PulseReels />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroSection onNavigate={setCurrentView} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {/* Home Page Content */}
              <HomePage onNavigate={setCurrentView} />
              
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
      {/* Navigation */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Content */}
      <div className="pt-20">
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