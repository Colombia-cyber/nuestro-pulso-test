import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import LiveChat from './components/LiveChat.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import News from './components/News.tsx';
import ElectionHub from './components/ElectionHub.tsx';
import PulseReels from './components/PulseReels.tsx';
import CongressTracker from './components/CongressTracker.tsx';
import Navbar from './components/Navbar.tsx';
import NewsFeed from './NewsFeed.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <HeroSection />
            
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
        } />
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/debates" element={<Debate />} />
        <Route path="/encuestas" element={<Survey />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/elecciones" element={<ElectionHub />} />
        <Route path="/reels" element={<PulseReels />} />
        <Route path="/congreso" element={<CongressTracker />} />
      </Routes>
      
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