import React, { useState } from "react";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm py-4 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <UniversalSearchBar 
            compact={true}
            onResults={() => handleNavClick('search')}
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 xl:gap-6 items-center">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <span>🏠</span>
            <span className="hidden xl:inline">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('news')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <span>📰</span>
            <span className="hidden xl:inline">Noticias</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <span>💭</span>
            <span className="hidden xl:inline">Community Hub</span>
          </button>
          <button 
            onClick={() => handleNavClick('encuestas')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <span>📊</span>
            <span className="hidden xl:inline">Encuestas</span>
          </button>
          {/* Mobile/Tablet Search Button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="lg:hidden text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <span>🔍</span>
            <span className="hidden xl:inline">Buscar</span>
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

        {/* Social Icons - Desktop Only */}
        <div className="hidden xl:flex items-center gap-4 ml-4">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="YouTube"
            >
              📺
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Twitter"
            >
              🐦
            </a>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-60 top-20">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-xl p-6">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">🏠</span>
                <span>Inicio</span>
              </button>
              <button 
                onClick={() => handleNavClick('news')}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">📰</span>
                <span>Noticias</span>
              </button>
              <button 
                onClick={() => handleNavClick('community-hub')}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">💭</span>
                <span>Community Hub</span>
              </button>
              <button 
                onClick={() => handleNavClick('encuestas')}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">📊</span>
                <span>Encuestas</span>
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