import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import News from "./components/News";
import Comments from "./components/Comments";
import PulseReels from "./components/PulseReels";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";

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

  const handleNavigate = (view: string) => {
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'comments':
        return <Comments />;
      case 'community-hub':
        return <CommunityHub />;
      case 'pulse-reels':
        return <PulseReels />;
      case 'search':
        return <SearchPage initialQuery={searchQuery} />;
      case 'home':
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <div className="pt-24 lg:pt-20">
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;