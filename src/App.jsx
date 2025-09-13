import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';

// Import all civic modules
import LiveChat from './components/LiveChat.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import News from './components/News.tsx';
import Marketplace from './components/Marketplace.tsx';
import Care from './components/Care.tsx';
import CongressTracker from './components/CongressTracker.tsx';
import ElectionHub from './components/ElectionHub.tsx';
import CopilotAssistant from './components/CopilotAssistant.tsx';
import Alerts from './components/Alerts.tsx';
import Search from './components/Search.tsx';
import PulseReels from './components/PulseReels.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - always visible */}
      <Navbar />
      
      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <>
            <HeroSection />
            <main className="container mx-auto px-4 py-8">
              <HomePage />
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        } />
        
        {/* Civic Module Routes */}
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/debate" element={<Debate />} />
        <Route path="/debates" element={<Debate />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/polls" element={<Survey />} />
        <Route path="/encuestas" element={<Survey />} />
        <Route path="/news" element={<News />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/care" element={<Care />} />
        <Route path="/congress" element={<CongressTracker />} />
        <Route path="/congress-tracker" element={<CongressTracker />} />
        <Route path="/elections" element={<ElectionHub />} />
        <Route path="/election-hub" element={<ElectionHub />} />
        <Route path="/civic-assistant" element={<CopilotAssistant />} />
        <Route path="/assistant" element={<CopilotAssistant />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-engine" element={<Search />} />
        <Route path="/pulse-feed" element={<PulseReels />} />
        <Route path="/reels" element={<PulseReels />} />
        
        {/* Legacy hash routes for compatibility */}
        <Route path="/#chat" element={<LiveChat />} />
        <Route path="/#debate" element={<Debate />} />
        <Route path="/#survey" element={<Survey />} />
        <Route path="/#news" element={<News />} />
        <Route path="/#comments" element={<Debate />} />
        <Route path="/#care" element={<Care />} />
      </Routes>
      
      {/* Footer - shown on all pages */}
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