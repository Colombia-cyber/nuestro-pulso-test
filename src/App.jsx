import React, { useState, useEffect } from 'react';
import { AuthProvider } from './components/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import HomePage from './HomePage';

// Import all module components
import LiveChat from './components/LiveChat';
import Debate from './components/Debate';
import Survey from './components/Survey';
import News from './components/News';
import Comments from './components/Comments';
import Care from './components/Care';
import CongressTracker from './components/CongressTracker';
import ElectionHub from './components/ElectionHub';
import CopilotAssistant from './components/CopilotAssistant';
import Alerts from './components/Alerts';
import Search from './components/Search';
import PulseReels from './components/PulseReels';
import Marketplace from './components/Marketplace';
import NewsFeed from './NewsFeed';

function App() {
  const [activeModule, setActiveModule] = useState('home');

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # character
      if (hash) {
        setActiveModule(hash);
      }
    };

    // Set initial module from hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash when module changes
  useEffect(() => {
    if (activeModule !== 'home') {
      window.location.hash = activeModule;
    } else {
      window.location.hash = '';
    }
  }, [activeModule]);

  const renderModule = () => {
    switch (activeModule) {
      case 'chat':
        return <LiveChat />;
      case 'debate':
        return <Debate />;
      case 'survey':
        return <Survey />;
      case 'news':
        return <News />;
      case 'comments':
        return <Comments />;
      case 'care':
        return <Care />;
      case 'congress':
        return <CongressTracker />;
      case 'elections':
        return <ElectionHub />;
      case 'copilot':
        return <CopilotAssistant />;
      case 'alerts':
        return <Alerts />;
      case 'search':
        return <Search />;
      case 'reels':
        return <PulseReels />;
      case 'marketplace':
        return <Marketplace />;
      case 'newsfeed':
        return <NewsFeed />;
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <main className="container mx-auto px-4 py-8">
              <HomePage />
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
        
        {/* Main Content - Add padding-top to account for fixed navigation */}
        <div className="pt-16">
          {renderModule()}
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
    </AuthProvider>
  );
}

export default App;