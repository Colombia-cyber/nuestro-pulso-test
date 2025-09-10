import { useState } from 'react';
import HeroSection from '../HeroSection';
import Navigation from '../src/components/Navigation';
import { AuthProvider } from '../src/components/AuthContext';
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
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Enhanced background texture */}
        <div className="fixed inset-0 bg-gradient-to-br from-yellow-400/5 via-blue-500/5 to-red-500/5 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        
        <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
        
        <main className="relative pt-20">
          {/* Content Container with Premium Glassmorphism */}
          <div className={activeModule === 'home' ? '' : 'container mx-auto px-4 py-8'}>
            {activeModule !== 'home' && (
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-6 lg:p-8">
                  {renderActiveModule()}
                </div>
              </div>
            )}
            {activeModule === 'home' && renderActiveModule()}
          </div>
        </main>
        
        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400/30 rounded-full animate-ping"></div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Home;