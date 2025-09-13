import React, { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import UnifiedNavigation from "./components/UnifiedNavigation";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";
import HomePage from "./HomePage";
import EnhancedNewsFeed from "./components/EnhancedNewsFeed";
import EnhancedLiveChat from "./components/EnhancedLiveChat";
import Debate from "./components/Debate";
import EnhancedSurvey from "./components/EnhancedSurvey";
import PulseReels from "./components/PulseReels";
import Marketplace from "./components/Marketplace";
import ElectionHub from "./components/ElectionHub";
import CongressTracker from "./components/CongressTracker";
import Comments from "./components/Comments";
import Care from "./components/Care";
import Alerts from "./components/Alerts";
import CopilotAssistant from "./components/CopilotAssistant";

// Error Boundary Component
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              🚨 Error en la Aplicación
            </h2>
            <p className="text-gray-600 mb-4">
              Lo sentimos, algo salió mal. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [activeModule, setActiveModule] = useState('home');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return <HomePage />;
      case 'news':
        return <EnhancedNewsFeed />;
      case 'chat':
        return <EnhancedLiveChat />;
      case 'debate':
        return <Debate />;
      case 'survey':
        return <EnhancedSurvey />;
      case 'reels':
        return <PulseReels />;
      case 'marketplace':
        return <Marketplace />;
      case 'search':
        return (
          <div className="pt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
                  <h1 className="text-3xl font-bold text-white mb-2">🔍 Buscar</h1>
                  <p className="text-white/90">Busca información y únete a discusiones</p>
                </div>
                <GoogleWebSearchBar />
              </div>
            </div>
          </div>
        );
      case 'elections':
        return <ElectionHub />;
      case 'congress':
        return <CongressTracker />;
      case 'comments':
        return <Comments />;
      case 'care':
        return <Care />;
      case 'alerts':
        return <Alerts />;
      case 'copilot':
        return <CopilotAssistant />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <UnifiedNavigation 
            activeModule={activeModule} 
            setActiveModule={setActiveModule} 
          />
          
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
          >
            Saltar al contenido principal
          </a>
          
          {/* Main Content */}
          <main 
            id="main-content"
            className="pt-16"
            role="main"
            aria-label="Contenido principal"
          >
            {renderActiveModule()}
          </main>
        </div>
      </AuthProvider>
    </AppErrorBoundary>
  );
}

export default App;