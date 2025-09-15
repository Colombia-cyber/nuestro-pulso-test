import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import News from "./components/News";
import PulseReels from "./components/PulseReels";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import PollsPage from "./components/polls/PollsPage";
import Debate from "./components/Debate";

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'reels':
        return <PulseReels />;
      case 'comments':
        return <Comments />;
      case 'community-hub':
        return <CommunityHub />;
      case 'polls':
      case 'encuestas':
        return <PollsPage />;
      case 'debates':
        return <Debate />;
      case 'home':
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <div className="pt-20">
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;