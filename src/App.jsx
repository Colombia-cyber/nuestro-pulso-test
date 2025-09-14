import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroSection />
            
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentView('home')}
            className={`font-medium transition ${currentView === 'home' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => setCurrentView('news')}
            className={`font-medium transition ${currentView === 'news' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
          >
            📰 Noticias
          </button>
        </div>
        <div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        {renderCurrentView()}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🇨🇴 Nuestro Pulso</p>
          <p className="text-gray-400">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;