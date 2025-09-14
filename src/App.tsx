import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ModuleGrid from "./components/ModuleGrid";
import LiveChat from "./components/LiveChat";
import News from "./components/News";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import CongressTracker from "./components/CongressTracker";
import ElectionHub from "./components/ElectionHub";
import CopilotAssistant from "./components/CopilotAssistant";
import PulseReels from "./components/PulseReels";
import Alerts from "./components/Alerts";
import Marketplace from "./components/Marketplace";
import Care from "./components/Care";
import LoginModal from "./components/LoginModal";
import { AuthProvider } from "./components/AuthContext";

type ModuleType = 'home' | 'chat' | 'news' | 'debate' | 'polls' | 'congress' | 'elections' | 'assistant' | 'reels' | 'alerts' | 'marketplace' | 'care';

function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('home');
  const [showLogin, setShowLogin] = useState(false);

  // Handle URL module parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const module = urlParams.get('module') as ModuleType;
    if (module && ['home', 'chat', 'news', 'debate', 'polls', 'congress', 'elections', 'assistant', 'reels', 'alerts', 'marketplace', 'care'].includes(module)) {
      setCurrentModule(module);
    }
  }, []);

  const handleModuleChange = (module: ModuleType) => {
    setCurrentModule(module);
    // Update URL without page reload
    const newUrl = module === 'home' ? '/' : `/?module=${module}`;
    window.history.pushState({}, '', newUrl);
  };

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'chat':
        return <LiveChat />;
      case 'news':
        return <News />;
      case 'debate':
        return <Debate />;
      case 'polls':
        return <Survey />;
      case 'congress':
        return <CongressTracker />;
      case 'elections':
        return <ElectionHub />;
      case 'assistant':
        return <CopilotAssistant />;
      case 'reels':
        return <PulseReels />;
      case 'alerts':
        return <Alerts />;
      case 'marketplace':
        return <Marketplace />;
      case 'care':
        return <Care />;
      default:
        return (
          <>
            <HeroSection onGetStarted={() => setShowLogin(true)} />
            <ModuleGrid onModuleSelect={handleModuleChange} />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar 
          currentModule={currentModule} 
          onModuleChange={handleModuleChange}
          onLoginClick={() => setShowLogin(true)}
        />
        
        <main className="relative">
          {renderCurrentModule()}
        </main>

        {/* Floating Assistant Button */}
        {currentModule !== 'assistant' && (
          <button
            onClick={() => handleModuleChange('assistant')}
            className="fixed bottom-6 right-6 w-16 h-16 bg-colombian-gradient rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
            aria-label="Asistente Cívico"
          >
            <span className="text-2xl">🤖</span>
          </button>
        )}

        {/* Login Modal */}
        {showLogin && (
          <LoginModal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)} 
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;