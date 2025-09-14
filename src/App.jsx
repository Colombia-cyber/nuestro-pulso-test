import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { AuthProvider } from './components/AuthContext';

// Import page components
import HeroSection from './components/HeroSection';
import HomePage from './HomePage';
import NewsFeed from './NewsFeed';
import News from './components/News';
import LiveChat from './components/LiveChat';
import Debate from './components/Debate';
import Survey from './components/Survey';
import Search from './components/Search';
import CongressTracker from './components/CongressTracker';
import Marketplace from './components/Marketplace';
import PulseReels from './components/PulseReels';
import Alerts from './components/Alerts';
import ElectionHub from './components/ElectionHub';
import CopilotAssistant from './components/CopilotAssistant';
import Care from './components/Care';
import Comments from './components/Comments';

function App() {
  const [activeModule, setActiveModule] = useState('home');

  // Module components mapping
  const moduleComponents = {
    home: () => (
      <div>
        <HeroSection />
        <main className="container mx-auto px-4 py-8">
          <HomePage />
          <section className="mt-12">
            <NewsFeed />
          </section>
        </main>
      </div>
    ),
    news: News,
    chat: LiveChat,
    debate: Debate,
    survey: Survey,
    search: Search,
    congress: CongressTracker,
    marketplace: Marketplace,
    reels: PulseReels,
    alerts: Alerts,
    elections: ElectionHub,
    copilot: CopilotAssistant,
    care: Care,
    comments: Comments,
  };

  const ActiveComponent = moduleComponents[activeModule] || moduleComponents.home;

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
          
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<ActiveComponent />} />
              <Route path="/home" element={<ActiveComponent />} />
              <Route path="/news" element={<News />} />
              <Route path="/chat" element={<LiveChat />} />
              <Route path="/debate" element={<Debate />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/search" element={<Search />} />
              <Route path="/congress" element={<CongressTracker />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/reels" element={<PulseReels />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/elections" element={<ElectionHub />} />
              <Route path="/copilot" element={<CopilotAssistant />} />
              <Route path="/care" element={<Care />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="*" element={<ActiveComponent />} />
            </Routes>
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
      </Router>
    </AuthProvider>
  );
}

export default App;