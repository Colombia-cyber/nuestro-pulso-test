import React, { useState } from 'react';
import { AuthProvider } from './components/AuthContext.tsx';
import Navigation from './components/Navigation.tsx';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import LiveChat from './components/LiveChat.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import CongressTracker from './components/CongressTracker.tsx';
import ElectionHub from './components/ElectionHub.tsx';
import News from './components/News.tsx';
import Comments from './components/Comments.tsx';
import Care from './components/Care.tsx';
import PulseReels from './components/PulseReels.tsx';
import Marketplace from './components/Marketplace.tsx';
import Search from './components/Search.tsx';
import Alerts from './components/Alerts.tsx';
import CopilotAssistant from './components/CopilotAssistant.tsx';

function App() {
  const [activeModule, setActiveModule] = useState('home');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return (
          <div>
            <HeroSection onButtonClick={setActiveModule} />
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
      case 'reels':
        return <PulseReels />;
      case 'marketplace':
        return <Marketplace />;
      case 'search':
        return <Search />;
      case 'alerts':
        return <Alerts />;
      case 'elections':
        return <ElectionHub />;
      case 'copilot':
        return <CopilotAssistant />;
      default:
        return (
          <div>
            <HeroSection onButtonClick={setActiveModule} />
            <main className="container mx-auto px-4 py-8">
              <HomePage />
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Skip Link for Accessibility */}
        <a 
          href="#main-content" 
          className="skip-link focus-ring"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const main = document.getElementById('main-content');
              main?.focus();
            }
          }}
        >
          Saltar al contenido principal
        </a>

        <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
        
        {/* Main Content with top padding for fixed navigation */}
        <div id="main-content" tabIndex={-1} className="pt-16">
          {renderActiveModule()}
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-16" role="contentinfo">
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