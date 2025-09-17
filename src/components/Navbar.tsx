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
      <nav className="w-full bg-white shadow-sm py-3 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-8 h-6" />
          <span className="font-bold text-lg text-blue-900">Nuestro Pulso</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 xl:gap-4 items-center">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>🏠</span>
            <span className="hidden lg:inline text-sm">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('news')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>📰</span>
            <span className="hidden lg:inline text-sm">Noticias</span>
          </button>
          <button 
            onClick={() => setShowSearchModal(true)}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>🔍</span>
            <span className="hidden lg:inline text-sm">Buscar</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>💭</span>
            <span className="hidden lg:inline text-sm">Community Hub</span>
          </button>
          <button 
            onClick={() => handleNavClick('encuestas')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>📊</span>
            <span className="hidden lg:inline text-sm">Encuestas</span>
          </button>
          <button 
            onClick={() => handleNavClick('debates')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>🗣️</span>
            <span className="hidden lg:inline text-sm">Debates</span>
          </button>
        </div>

        {/* Login Button */}
        <div className="flex items-center">
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition text-sm">
            Ingresar
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-blue-900 p-2 rounded-lg hover:bg-blue-50 ml-2"
          aria-label="Menú de navegación"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-60 top-14">
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
                onClick={() => handleNavClick('debates')}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">🗣️</span>
                <span>Debates</span>
              </button>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
              >
                <span className="text-xl">🔍</span>
                <span>Buscar</span>
              </button>
              
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