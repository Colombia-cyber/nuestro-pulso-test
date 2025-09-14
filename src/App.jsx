import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import Debate from './components/Debate.tsx';
import LiveChat from './components/LiveChat.tsx';
import Survey from './components/Survey.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch(currentView) {
      case 'news':
        return <News />;
      case 'debates':
        return <Debate />;
      case 'chat':
        return <LiveChat />;
      case 'surveys':
        return <Survey />;
      case 'home':
      default:
        return (
          <>
            <HeroSection onNavigate={setCurrentView} />
            <main className="container mx-auto px-4 py-8">
              <HomePage />
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      {/* Main Content */}
      {renderCurrentView()}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🇨🇴 Nuestro Pulso</p>
          <p className="text-gray-400">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white">Términos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;