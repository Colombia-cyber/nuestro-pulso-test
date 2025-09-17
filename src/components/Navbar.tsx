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

  const navItems = [
    { id: 'home', label: 'Inicio', icon: '🏠', color: 'hover:bg-blue-50 hover:text-blue-700' },
    { id: 'news', label: 'Noticias', icon: '📰', color: 'hover:bg-green-50 hover:text-green-700' },
    { id: 'community-hub', label: 'Community Hub', icon: '💭', color: 'hover:bg-purple-50 hover:text-purple-700' },
    { id: 'encuestas', label: 'Encuestas', icon: '📊', color: 'hover:bg-orange-50 hover:text-orange-700', isPopular: true },
    { id: 'debates', label: 'Debates', icon: '🗣️', color: 'hover:bg-red-50 hover:text-red-700' },
  ];

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-lg shadow-lg py-4 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-200/50">
        {/* Logo and Brand - Enhanced */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="relative">
            <img src="/colombia-flag.png" alt="Colombia Flag" className="w-12 h-8 rounded shadow-md" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="font-black text-xl bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
              Nuestro Pulso
            </span>
            <div className="text-xs text-gray-500 font-medium">Red Cívica de Colombia</div>
          </div>
        </div>

        {/* Desktop Search Bar - Enhanced */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="w-full relative">
            <UniversalSearchBar 
              compact={true}
              onResults={() => handleNavClick('search')}
            />
          </div>
        </div>
        
        {/* Desktop Navigation - Enhanced */}
        <div className="hidden md:flex gap-2 xl:gap-4 items-center">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-gray-700 font-semibold transition-all duration-200 flex items-center gap-2 px-4 py-2.5 rounded-xl ${item.color} relative group`}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <span className="hidden xl:inline font-medium">{item.label}</span>
              {item.isPopular && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  🔥
                </span>
              )}
            </button>
          ))}
          
          {/* Mobile/Tablet Search Button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="lg:hidden text-gray-700 font-semibold hover:text-blue-600 transition-all duration-200 flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-blue-50"
          >
            <span className="text-lg">🔍</span>
            <span className="hidden xl:inline font-medium">Buscar</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-gray-700 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          aria-label="Menú de navegación"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Enhanced Login Button */}
        <div className="hidden xl:flex items-center gap-4 ml-6">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100"
              title="Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100"
              title="YouTube"
            >
              📺
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100"
              title="Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-125 transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100"
              title="Twitter"
            >
              🐦
            </a>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-white/20">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-60 top-20">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-2xl p-6 border-l border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-200 flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 relative"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                  {item.isPopular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      🔥 POPULAR
                    </span>
                  )}
                </button>
              ))}
              
              <button 
                onClick={() => setShowSearchModal(true)}
                className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-200 flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50"
              >
                <span className="text-2xl">🔍</span>
                <span className="text-lg">Buscar</span>
              </button>
              
              <div className="border-t border-gray-200 my-6"></div>
              
              {/* Social Icons in Mobile */}
              <div className="flex items-center justify-around py-4">
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
              
              <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 mt-4">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">🔍</span>
                Búsqueda Universal
              </h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 hover:bg-gray-100 transition-all duration-200"
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