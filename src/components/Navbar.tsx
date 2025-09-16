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
      <nav className="w-full navbar-colombia py-4 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
        {/* Enhanced Logo and Brand with Colombian elements */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-8 bg-colombia-yellow rounded-sm"></div>
            <div className="w-3 h-8 bg-colombia-blue rounded-sm"></div>
            <div className="w-3 h-8 bg-colombia-red rounded-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-colombia-gradient bg-clip-text text-transparent">
              🇨🇴 Nuestro Pulso
            </span>
            <span className="text-xs text-colombia-blue font-medium -mt-1">
              Red Cívica de Colombia
            </span>
          </div>
        </div>

        {/* Desktop Search Bar with Colombian styling */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <UniversalSearchBar 
            compact={true}
            onResults={() => handleNavClick('search')}
          />
        </div>
        
        {/* Enhanced Desktop Navigation with Colombian colors */}
        <div className="hidden md:flex gap-4 xl:gap-6 items-center">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">🏠</span>
            <span className="hidden xl:inline">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('news')}
            className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">📰</span>
            <span className="hidden xl:inline">Noticias</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">💭</span>
            <span className="hidden xl:inline">Comunidad</span>
          </button>
          <button 
            onClick={() => handleNavClick('encuestas')}
            className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">📊</span>
            <span className="hidden xl:inline">Encuestas</span>
          </button>
          {/* Mobile/Tablet Search Button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="lg:hidden text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">🔍</span>
            <span className="hidden xl:inline">Buscar</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-colombia-blue p-2 rounded-lg hover:bg-white/50"
          aria-label="Menú de navegación"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Enhanced Social Icons with Colombian styling */}
        <div className="hidden xl:flex items-center gap-4 ml-4">
          <div className="flex items-center gap-3">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer colombia-glow"
              title="Búsqueda Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer colombia-glow"
              title="YouTube Colombia"
            >
              📺
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer colombia-glow"
              title="Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer colombia-glow"
              title="Twitter"
            >
              🐦
            </a>
          </div>
          <button className="btn-colombia">
            🔑 Ingresar
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu with Colombian styling */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-60 top-20">
          <div className="bg-white/95 backdrop-blur-lg w-full max-w-sm ml-auto h-full shadow-xl p-6 colombia-pattern-bg">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-3 p-4 rounded-lg hover:bg-white/70 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🏠</span>
                <span>Inicio</span>
              </button>
              <button 
                onClick={() => handleNavClick('news')}
                className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-3 p-4 rounded-lg hover:bg-white/70 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">📰</span>
                <span>Noticias</span>
              </button>
              <button 
                onClick={() => handleNavClick('community-hub')}
                className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-3 p-4 rounded-lg hover:bg-white/70 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">💭</span>
                <span>Comunidad</span>
              </button>
              <button 
                onClick={() => handleNavClick('encuestas')}
                className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-3 p-4 rounded-lg hover:bg-white/70 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">📊</span>
                <span>Encuestas</span>
              </button>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="text-colombia-blue font-semibold hover:text-colombia-red transition-colors duration-300 flex items-center gap-3 p-4 rounded-lg hover:bg-white/70 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🔍</span>
                <span>Buscar</span>
              </button>
              
              <div className="border-t border-colombia-blue/20 my-4"></div>
              
              {/* Social Icons in Mobile */}
              <div className="flex items-center justify-around py-4">
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-125 transition-transform duration-300 cursor-pointer"
                  title="Google"
                >
                  🌐
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-125 transition-transform duration-300 cursor-pointer"
                  title="YouTube"
                >
                  📺
                </a>
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-125 transition-transform duration-300 cursor-pointer"
                  title="Facebook"
                >
                  📘
                </a>
                <a 
                  href="https://www.twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-125 transition-transform duration-300 cursor-pointer"
                  title="Twitter"
                >
                  🐦
                </a>
              </div>
              
              <button className="btn-colombia w-full">
                🔑 Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Search Modal with Colombian styling */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="card-colombia max-w-4xl w-full max-h-[90vh] overflow-y-auto colombia-pattern-bg">
            <div className="flex items-center justify-between p-6 border-b border-colombia-blue/20">
              <h2 className="text-2xl font-bold bg-colombia-gradient bg-clip-text text-transparent">
                🔍 Búsqueda Universal de Colombia
              </h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-colombia-red hover:text-colombia-blue text-2xl focus:outline-none focus:ring-2 focus:ring-colombia-blue rounded transition-colors duration-300"
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