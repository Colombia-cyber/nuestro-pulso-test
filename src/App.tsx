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
      case 'surveys':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Surveys</h1>
              <p className="text-gray-600 mb-6">Participate in national surveys and polls to share your opinion on important issues.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">🚧 Coming Soon - Survey features are under development</p>
              </div>
            </div>
          </div>
        );
      case 'debates':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🗣️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Debates</h1>
              <p className="text-gray-600 mb-6">Join structured debates on public policy and civic issues.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">🚧 Coming Soon - Debate platform is under development</p>
              </div>
            </div>
          </div>
        );
      case 'congress':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Congress Tracker</h1>
              <p className="text-gray-600 mb-6">Track congressional activities, bills, and legislative updates in real-time.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">🚧 Coming Soon - Congress tracking features are under development</p>
              </div>
            </div>
          </div>
        );
      case 'live-chat':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Chat</h1>
              <p className="text-gray-600 mb-6">Join real-time conversations with fellow citizens about current events and civic issues.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">🚧 Coming Soon - Live chat platform is under development</p>
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
      <div className="pt-20">
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;