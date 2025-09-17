import React, { useState } from "react";
import HeaderSearchBar from "./HeaderSearchBar";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
    setShowMoreMenu(false);
  };

  // Primary navigation items (always visible)
  const primaryNavItems = [
    { key: 'home', label: 'Inicio', icon: '🏠' },
    { key: 'feeds', label: 'Noticias', icon: '📰' },
    { key: 'congress', label: 'Congreso', icon: '🏛️' },
    { key: 'elections', label: 'Elecciones', icon: '🗳️' },
  ];

  // Secondary navigation items (in "More" dropdown)
  const secondaryNavItems = [
    { key: 'reels', label: 'Reels', icon: '🎬' },
    { key: 'chat', label: 'Chat', icon: '💬' },
    { key: 'debates', label: 'Debates', icon: '🗣️' },
    { key: 'surveys', label: 'Encuestas', icon: '📊' },
    { key: 'community-hub', label: 'Hub', icon: '💭' },
  ];

  return (
    <>
      {/* Modern streamlined navbar - v2 */}
      <nav className="w-full bg-red-500 shadow-sm py-3 px-4 md:px-6 fixed top-0 left-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Brand - More compact */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src="/colombia-flag.png" alt="Colombia" className="w-8 h-6" />
            <span className="font-bold text-lg text-red-700">MODIFIED Nuestro Pulso</span>
          </div>

          {/* Persistent Search Bar - Always visible on desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <HeaderSearchBar onNavigateToSearch={() => handleNavClick('search')} />
          </div>
          
          {/* Primary Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === item.key || (item.key === 'feeds' && currentView === 'news')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                <span className="text-base">⋯</span>
                <span>Más</span>
              </button>
              
              {showMoreMenu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-60 min-w-48">
                  <div className="py-2">
                    {secondaryNavItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleNavClick(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          currentView === item.key || (item.key === 'surveys' && currentView === 'encuestas')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compact Login Button */}
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-shadow">
              Ingresar
            </button>
          </div>

          {/* Mobile search and menu buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowSearchModal(true)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-50"
              aria-label="Buscar"
            >
              🔍
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-50"
              aria-label="Menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Streamlined */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-60 top-16">
          <div className="bg-white w-full max-w-sm ml-auto h-full shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Navegación</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  aria-label="Cerrar menú"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Primary items */}
                {primaryNavItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      currentView === item.key || (item.key === 'feeds' && currentView === 'news')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                <div className="border-t border-gray-100 my-3"></div>
                
                {/* Secondary items */}
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      currentView === item.key || (item.key === 'surveys' && currentView === 'encuestas')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="border-t border-gray-100 my-4"></div>
              
              <button className="w-full bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-3 rounded-lg font-medium shadow hover:shadow-md transition-shadow">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal for Mobile - Enhanced */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">🔍 Búsqueda</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded p-1"
                aria-label="Cerrar búsqueda"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <HeaderSearchBar onNavigateToSearch={() => {
                setShowSearchModal(false);
                handleNavClick('search');
              }} />
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Búsqueda completa del sitio:</h3>
                <UniversalSearchBar 
                  autoFocus={false}
                  onResults={() => {
                    setShowSearchModal(false);
                    handleNavClick('search');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;