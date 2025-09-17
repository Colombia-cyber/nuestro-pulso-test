import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EnhancedHomepage from "./components/EnhancedHomepage";
import News from "./components/News";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";

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
        return <SearchPage />;
      case 'gustavo-petro':
      case 'donald-trump':
      case 'crime-drugs':
      case 'employment':
      case 'terror':
      case 'right-wing':
      case 'left-wing':
      case 'legislation':
      case 'congress':
      case 'chat':
      case 'debates':
      case 'polls':
        return (
          <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                  {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
                </h1>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="text-6xl mb-4">🚧</div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página en Construcción</h2>
                  <p className="text-gray-600 mb-6">
                    Esta sección está siendo desarrollada. Pronto tendrás acceso a contenido exclusivo sobre este tema.
                  </p>
                  <button 
                    onClick={() => handleNavigate('home')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ← Volver al Inicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'home':
      default:
        return <EnhancedHomepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <div className="pt-16">
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;