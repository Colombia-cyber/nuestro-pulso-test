import { useState } from 'react';
import HeroSection from '../HeroSection';
import Navigation from '../src/components/Navigation';
import LiveChat from '../src/components/LiveChat';
import Debate from '../src/components/Debate';
import Survey from '../src/components/Survey';
import News from '../src/components/News';
import Comments from '../src/components/Comments';
import Care from '../src/components/Care';
import CongressTracker from '../src/components/CongressTracker';
import PulseReels from '../src/components/PulseReels';
import Marketplace from '../src/components/Marketplace';
import Search from '../src/components/Search';
import Alerts from '../src/components/Alerts';
import ElectionHub from '../src/components/ElectionHub';
import CopilotAssistant from '../src/components/CopilotAssistant';

const Home = () => {
  const [activeModule, setActiveModule] = useState('home');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'chat': return <LiveChat />;
      case 'debate': return <Debate />;
      case 'survey': return <Survey />;
      case 'news': return <News />;
      case 'comments': return <Comments />;
      case 'care': return <Care />;
      case 'congress': return <CongressTracker />;
      case 'reels': return <PulseReels />;
      case 'marketplace': return <Marketplace />;
      case 'search': return <Search />;
      case 'alerts': return <Alerts />;
      case 'elections': return <ElectionHub />;
      case 'copilot': return <CopilotAssistant />;
      default: return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="pt-16">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default Home;