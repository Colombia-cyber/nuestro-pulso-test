import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import Debate from './components/Debate.tsx';
import Survey from './components/Survey.tsx';
import PulseReels from './components/PulseReels.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'debates':
        return <Debate />;
      case 'polls':
        return <Survey />;
      case 'reels':
        return <PulseReels />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroSection onNavigate={setCurrentView} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {/* Home Page Content */}
              <HomePage />
              
              {/* News Feed */}
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="content-overlay py-4 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">Nuestro Pulso</span>
        </div>
        <div className="flex gap-8">
          <button 
            onClick={() => setCurrentView('home')}
            className={`font-semibold transition ${currentView === 'home' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setCurrentView('news')}
            className={`font-semibold transition ${currentView === 'news' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            📰 Noticias
          </button>
          <button 
            onClick={() => setCurrentView('polls')}
            className={`font-semibold transition ${currentView === 'polls' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            📊 Encuestas
          </button>
          <button 
            onClick={() => setCurrentView('debates')}
            className={`font-semibold transition ${currentView === 'debates' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            🗣️ Debates
          </button>
          <button 
            onClick={() => setCurrentView('reels')}
            className={`font-semibold transition ${currentView === 'reels' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            🎬 Reels
          </button>
        </div>
        <div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        {renderCurrentView()}
      </div>
      
      {/* Footer */}
      <footer className="vibrant-card mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">🇨🇴 Nuestro Pulso</p>
          <p className="text-gray-700 text-lg mb-4">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-6 text-sm text-gray-600">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;