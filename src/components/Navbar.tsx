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
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm py-4 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between fixed top-0 left-0 z-50">
        {/* Top Row - Logo and Mobile Menu Toggle */}
        <div className="w-full lg:w-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/colombia-flag.png" alt="Colombia Flag" className="w-8 h-5 lg:w-10 lg:h-7" />
            <span className="font-bold text-lg lg:text-xl text-yellow-700">Nuestro Pulso</span>
          </div>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-2xl text-blue-900 hover:text-blue-600"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>

        {/* Navigation Links - Hidden on mobile unless menu is open */}
        <div className={`${showMobileMenu ? 'flex' : 'hidden'} lg:flex w-full lg:w-auto flex-col lg:flex-row gap-4 lg:gap-6 items-center mt-4 lg:mt-0`}>
          <button 
            onClick={() => {handleNavClick('home'); setShowMobileMenu(false);}}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm lg:text-base"
          >
            <span>🏠</span>
            <span>Inicio</span>
          </button>
          <button 
            onClick={() => {handleNavClick('news'); setShowMobileMenu(false);}}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm lg:text-base"
          >
            <span>📰</span>
            <span>Noticias</span>
          </button>
          <button 
            onClick={() => {handleNavClick('reels'); setShowMobileMenu(false);}}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm lg:text-base"
          >
            <span>🎬</span>
            <span>Reels</span>
          </button>
          <button 
            onClick={() => {handleNavClick('community-hub'); setShowMobileMenu(false);}}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm lg:text-base"
          >
            <span>💭</span>
            <span>Community Hub</span>
          </button>
          <button 
            onClick={() => {handleNavClick('encuestas'); setShowMobileMenu(false);}}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm lg:text-base"
          >
            <span>📊</span>
            <span>Encuestas</span>
          </button>
          
          {/* Inline Search Bar for Desktop */}
          <div className="hidden lg:block lg:flex-1 lg:max-w-md mx-4">
            <UniversalSearchBar compact={true} onNavigate={onNavigate} />
          </div>
          
          {/* Mobile Search Button */}
          <button 
            onClick={() => {setShowSearchModal(true); setShowMobileMenu(false);}}
            className="lg:hidden text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 text-sm"
          >
            <span>🔍</span>
            <span>Buscar</span>
          </button>
        </div>

        {/* Right Side - Social Icons and Login */}
        <div className={`${showMobileMenu ? 'flex' : 'hidden'} lg:flex items-center gap-2 lg:gap-4 mt-4 lg:mt-0`}>
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Google"
              aria-label="Visit Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="YouTube"
              aria-label="Visit YouTube"
            >
              📺
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Facebook"
              aria-label="Visit Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Twitter"
              aria-label="Visit Twitter"
            >
              🐦
            </a>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-bold shadow hover:scale-105 transition text-sm lg:text-base">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Search Modal for Mobile */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">🔍 Búsqueda Universal</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close search modal"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <UniversalSearchBar onNavigate={onNavigate} onClose={() => setShowSearchModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;