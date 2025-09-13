import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import PulseSearchBar from './components/PulseSearchBar';
import NewsTopicsWidget from './components/NewsTopicsWidget';
import PulseFeed from './components/PulseFeed';
import CivicReel from './components/CivicReel';

// Import all module components
import LiveChat from './components/LiveChat';
import Debate from './components/Debate';
import Survey from './components/Survey';
import News from './components/News';
import Care from './components/Care';
import CongressTracker from './components/CongressTracker';
import PulseReels from './components/PulseReels';
import Marketplace from './components/Marketplace';
import Search from './components/Search';
import Alerts from './components/Alerts';
import ElectionHub from './components/ElectionHub';
import CopilotAssistant from './components/CopilotAssistant';

function App() {
  const [activeModule, setActiveModule] = useState('home');
  const [user, setUser] = useState(null);

  // Mock user for development
  useEffect(() => {
    // This would be replaced with actual Firebase auth
    const mockUser = {
      id: '1',
      username: 'ciudadano_colombia',
      displayName: 'Ciudadano Ejemplo',
      avatar: '/colombia-flag.png',
      verified: true,
    };
    // setUser(mockUser);
  }, []);

  const handleLogin = () => {
    // Implement Firebase login
    console.log('Login clicked');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return (
          <div className="space-y-8">
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PulseFeed />
              </div>
              <div className="space-y-6">
                <NewsTopicsWidget />
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    🎬 Pulse Reels Destacados
                  </h3>
                  <CivicReel />
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return <LiveChat />;
      case 'debate':
        return <Debate />;
      case 'polls':
        return <Survey />;
      case 'news':
        return <News />;
      case 'care':
        return <Care />;
      case 'congress':
        return <CongressTracker />;
      case 'reels':
        return <PulseReels />;
      case 'marketplace':
        return <Marketplace />;
      case 'search':
        return <Search />;
      case 'alerts':
        return <Alerts />;
      case 'elections':
        return <ElectionHub />;
      case 'assistant':
        return <CopilotAssistant />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Módulo en Desarrollo
              </h2>
              <p className="text-gray-600">
                El módulo "{activeModule}" estará disponible próximamente.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <NavBar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="pt-16">
        {/* Universal Search Bar - Always visible */}
        {activeModule !== 'search' && (
          <div className="bg-white shadow-sm border-b sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <PulseSearchBar onSearch={(query) => {
                setActiveModule('search');
                // Pass query to search component
              }} />
            </div>
          </div>
        )}
        
        {/* Module Content */}
        <main className={activeModule === 'home' ? '' : 'max-w-7xl mx-auto px-4 py-8'}>
          {renderActiveModule()}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🇨🇴</span>
                <div>
                  <h3 className="text-xl font-bold">Nuestro Pulso</h3>
                  <p className="text-gray-400">Plataforma Cívica de Colombia</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Conectando ciudadanos, promoviendo la participación cívica y 
                construyendo un futuro mejor para Colombia a través de la tecnología.
              </p>
              <div className="flex space-x-4">
                <span className="text-2xl">🤝</span>
                <span className="text-2xl">🗳️</span>
                <span className="text-2xl">📢</span>
                <span className="text-2xl">🌟</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Participar</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Chat Cívico</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Debates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Encuestas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Elecciones</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Informarse</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Noticias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Congreso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alertas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pulse Reels</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Nuestro Pulso. Todos los derechos reservados. 
              <span className="ml-4">🇨🇴 Hecho con ❤️ en Colombia</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;