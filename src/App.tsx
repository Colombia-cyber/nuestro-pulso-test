import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import News from "./components/News";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import PulseReels from "./components/PulseReels";

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'comments':
        return <Comments />;
      case 'community-hub':
        return <CommunityHub />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} />;
      case 'reels':
        return <PulseReels />;
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