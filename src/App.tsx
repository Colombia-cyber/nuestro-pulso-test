import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import LiveChat from './components/LiveChat.tsx';
import Debate from './components/Debate.tsx';
import News from './components/News.tsx';
import Survey from './components/Survey.tsx';

type CurrentView = 'home' | 'chat' | 'debates' | 'news' | 'surveys';

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'chat':
        return <LiveChat />;
      case 'debates':
        return <Debate />;
      case 'news':
        return <News />;
      case 'surveys':
        return <Survey />;
      default:
        return (
          <>
            {/* Home Page Content */}
            <HomePage />
            
            {/* News Feed */}
            <section className="mt-12">
              <NewsFeed />
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection currentView={currentView} setCurrentView={setCurrentView} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
      
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