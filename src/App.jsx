import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import PulseReels from './components/PulseReels.tsx';
import Feeds from './components/Feeds.tsx';
import RightWingNews from './components/RightWingNews.tsx';
import Community from './components/Community.tsx';
import Debate from './components/Debate.tsx';
import LiveChat from './components/LiveChat.tsx';
import CongressTracker from './components/CongressTracker.tsx';
import ElectionHub from './components/ElectionHub.tsx';
import CopilotAssistant from './components/CopilotAssistant.tsx';
import Marketplace from './components/Marketplace.tsx';
import Search from './components/Search.tsx';
import Alerts from './components/Alerts.tsx';
import Care from './components/Care.tsx';
import Comments from './components/Comments.tsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <News />;
      case 'reels':
        return <PulseReels />;
      case 'feeds':
        return <Feeds />;
      case 'rightwing':
        return <RightWingNews />;
      case 'community':
        return <Community />;
      case 'debate':
        return <Debate />;
      case 'chat':
        return <LiveChat />;
      case 'congress':
        return <CongressTracker />;
      case 'elections':
        return <ElectionHub />;
      case 'copilot':
        return <CopilotAssistant />;
      case 'marketplace':
        return <Marketplace />;
      case 'search':
        return <Search />;
      case 'alerts':
        return <Alerts />;
      case 'care':
        return <Care />;
      case 'comments':
        return <Comments />;
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
              
              {/* News Feed Preview */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📢 Feeds en Tiempo Real</h2>
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-lg py-4 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-xl text-yellow-700">Nuestro Pulso</span>
          <span className="text-sm text-gray-600 hidden md:block">Red Cívica de Colombia</span>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <button 
            onClick={() => setCurrentView('home')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-blue-900 hover:text-blue-600'}`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={() => setCurrentView('feeds')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'feeds' ? 'text-blue-600 bg-blue-50' : 'text-blue-900 hover:text-blue-600'}`}
          >
            📢 Feeds
          </button>
          <button 
            onClick={() => setCurrentView('reels')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'reels' ? 'text-blue-600 bg-blue-50' : 'text-blue-900 hover:text-blue-600'}`}
          >
            🎥 Reels
          </button>
          <button 
            onClick={() => setCurrentView('rightwing')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'rightwing' ? 'text-orange-600 bg-orange-50' : 'text-orange-700 hover:text-orange-600'}`}
          >
            🟠 Conservador
          </button>
          <button 
            onClick={() => setCurrentView('news')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'news' ? 'text-blue-600 bg-blue-50' : 'text-blue-900 hover:text-blue-600'}`}
          >
            📰 Noticias
          </button>
          <button 
            onClick={() => setCurrentView('community')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'community' ? 'text-green-600 bg-green-50' : 'text-green-700 hover:text-green-600'}`}
          >
            👥 Comunidad
          </button>
          <button 
            onClick={() => setCurrentView('elections')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'elections' ? 'text-purple-600 bg-purple-50' : 'text-purple-700 hover:text-purple-600'}`}
          >
            🗳️ Elecciones
          </button>
          <button 
            onClick={() => setCurrentView('congress')}
            className={`font-medium px-3 py-2 rounded transition ${currentView === 'congress' ? 'text-indigo-600 bg-indigo-50' : 'text-indigo-700 hover:text-indigo-600'}`}
          >
            🏛️ Congreso
          </button>
        </div>

        {/* Secondary Navigation */}
        <div className="hidden lg:flex gap-2">
          <button 
            onClick={() => setCurrentView('chat')}
            className={`font-medium px-2 py-1 rounded text-sm transition ${currentView === 'chat' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}
          >
            💬 Chat
          </button>
          <button 
            onClick={() => setCurrentView('debate')}
            className={`font-medium px-2 py-1 rounded text-sm transition ${currentView === 'debate' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}
          >
            🗣️ Debates
          </button>
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`font-medium px-2 py-1 rounded text-sm transition ${currentView === 'alerts' ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600'}`}
          >
            🚨 Alertas
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className={`font-medium px-2 py-1 rounded text-sm transition ${currentView === 'search' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}
          >
            🔍 Buscar
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
      
      {/* Enhanced Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇨🇴</span>
                <p className="text-xl font-bold">Nuestro Pulso</p>
              </div>
              <p className="text-gray-400">
                Red Cívica de Colombia - Construyendo el futuro juntos a través de la participación ciudadana.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Módulos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">📢 Feeds</a></li>
                <li><a href="#" className="hover:text-white transition">🎥 Reels</a></li>
                <li><a href="#" className="hover:text-white transition">🟠 Noticias Conservadoras</a></li>
                <li><a href="#" className="hover:text-white transition">👥 Comunidad</a></li>
                <li><a href="#" className="hover:text-white transition">🗳️ Elecciones</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Participación</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">💬 Chat en Vivo</a></li>
                <li><a href="#" className="hover:text-white transition">🗣️ Debates</a></li>
                <li><a href="#" className="hover:text-white transition">🏛️ Congreso</a></li>
                <li><a href="#" className="hover:text-white transition">🚨 Alertas</a></li>
                <li><a href="#" className="hover:text-white transition">🤖 Asistente Cívico</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Conecta</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">📧 Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition">🔍 Búsqueda</a></li>
                <li><a href="#" className="hover:text-white transition">🛒 Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition">🤝 Red de Cuidado</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Nuestro Pulso. Todos los derechos reservados. | 
              <span className="ml-2">Plataforma de participación cívica para Colombia</span>
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-gray-500">🟠 Sin módulos de encuestas</span>
              <span className="text-gray-500">✅ Noticias conservadoras destacadas</span>
              <span className="text-gray-500">🎥 Contenido en video</span>
              <span className="text-gray-500">👥 Comunidad activa</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;