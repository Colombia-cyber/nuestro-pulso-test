import React, { useState } from "react";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Set URL with search query
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      window.history.pushState(null, '', searchUrl);
      handleNavClick('search');
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-lg py-3 px-4 md:px-6 fixed top-0 left-0 z-50 border-b border-gray-200">
        {/* Top row with logo, search, and login */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <img src="/colombia-flag.png" alt="Colombia Flag" className="w-8 h-6" />
            <span className="font-bold text-base text-yellow-700">Nuestro Pulso</span>
          </div>

          {/* Desktop Search Bar - Always visible and prominent */}
          <div className="flex flex-1 max-w-xl mx-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="flex gap-2 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Buscar noticias, políticas, candidatos..."
                className="flex-1 px-4 py-2 border-2 border-blue-500 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none bg-white shadow-sm"
                aria-label="Campo de búsqueda"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                aria-label="Buscar"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Login button */}
          <div className="hidden md:flex shrink-0">
            <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
              Ingresar
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-blue-900 p-2 rounded-lg hover:bg-blue-50"
            aria-label="Menú de navegación"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation row */}
        <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 mt-3 pt-3 border-t border-gray-100">
          {/* Desktop Navigation */}
          <button 
            onClick={() => handleNavClick('home')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'home' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🏠</span>
            <span className="hidden lg:inline text-sm">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('reels')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'reels' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🎬</span>
            <span className="hidden lg:inline text-sm">Reels</span>
          </button>
          <button 
            onClick={() => handleNavClick('feeds')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'feeds' || currentView === 'news' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>📰</span>
            <span className="hidden lg:inline text-sm">Feeds</span>
          </button>
          <button 
            onClick={() => handleNavClick('congress')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'congress' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🏛️</span>
            <span className="hidden lg:inline text-sm">Congreso</span>
          </button>
          <button 
            onClick={() => handleNavClick('elections')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'elections' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🗳️</span>
            <span className="hidden lg:inline text-sm">Elecciones</span>
          </button>
          <button 
            onClick={() => handleNavClick('chat')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'chat' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>💬</span>
            <span className="hidden lg:inline text-sm">Chat</span>
          </button>
          <button 
            onClick={() => handleNavClick('debates')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'debates' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>🗣️</span>
            <span className="hidden lg:inline text-sm">Debates</span>
          </button>
          <button 
            onClick={() => handleNavClick('surveys')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'surveys' || currentView === 'encuestas' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>📊</span>
            <span className="hidden lg:inline text-sm">Encuestas</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-50 ${
              currentView === 'community-hub' ? 'bg-blue-100 text-blue-700' : ''
            }`}
          >
            <span>💭</span>
            <span className="hidden lg:inline text-sm">Hub</span>
          </button>
        </div>

        {/* Mobile Search Bar - Always visible on mobile */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Buscar noticias, políticas..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white"
              aria-label="Campo de búsqueda móvil"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              aria-label="Buscar"
            >
              🔍
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-60 top-20">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-xl p-6">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('home')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'home' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">🏠</span>
                <span>Inicio</span>
              </button>
              <button 
                onClick={() => handleNavClick('reels')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'reels' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">🎬</span>
                <span>Reels</span>
              </button>
              <button 
                onClick={() => handleNavClick('feeds')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'feeds' || currentView === 'news' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">📰</span>
                <span>Feeds</span>
              </button>
              <button 
                onClick={() => handleNavClick('congress')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'congress' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">🏛️</span>
                <span>Congreso</span>
              </button>
              <button 
                onClick={() => handleNavClick('elections')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'elections' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">🗳️</span>
                <span>Elecciones</span>
              </button>
              <button 
                onClick={() => handleNavClick('chat')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'chat' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">💬</span>
                <span>Chat en Vivo</span>
              </button>
              <button 
                onClick={() => handleNavClick('debates')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'debates' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">🗣️</span>
                <span>Debates</span>
              </button>
              <button 
                onClick={() => handleNavClick('surveys')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'surveys' || currentView === 'encuestas' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">📊</span>
                <span>Encuestas</span>
              </button>
              <button 
                onClick={() => handleNavClick('community-hub')}
                className={`text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 ${
                  currentView === 'community-hub' ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                <span className="text-xl">💭</span>
                <span>Community Hub</span>
              </button>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">🔍</span>
                <span>Buscar</span>
              </button>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* Social Icons in Mobile */}
              <div className="flex items-center justify-around">
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                  title="Google"
                >
                  🌐
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                  title="YouTube"
                >
                  📺
                </a>
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                  title="Facebook"
                >
                  📘
                </a>
                <a 
                  href="https://www.twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                  title="Twitter"
                >
                  🐦
                </a>
              </div>
              
              <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:scale-105 transition mt-4">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal for Mobile/Tablet */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">🔍 Búsqueda Universal</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                aria-label="Cerrar búsqueda"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <UniversalSearchBar 
                autoFocus={true}
                onResults={() => {
                  setShowSearchModal(false);
                  handleNavClick('search');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;