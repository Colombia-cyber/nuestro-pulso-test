import React, { useState } from "react";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
  };

  const navItems = [
    { id: 'home', label: 'Inicio', icon: '🏠', fullLabel: 'Inicio' },
    { id: 'reels', label: 'Reels', icon: '🎬', fullLabel: 'Reels' },
    { id: 'feeds', label: 'Feeds', icon: '📰', fullLabel: 'Feeds' },
    { id: 'congress', label: 'Congreso', icon: '🏛️', fullLabel: 'Congreso' },
    { id: 'elections', label: 'Elecciones', icon: '🗳️', fullLabel: 'Elecciones' },
    { id: 'chat', label: 'Chat', icon: '💬', fullLabel: 'Chat en Vivo' },
    { id: 'debates', label: 'Debates', icon: '🗣️', fullLabel: 'Debates' },
    { id: 'surveys', label: 'Encuestas', icon: '📊', fullLabel: 'Encuestas' },
    { id: 'community-hub', label: 'Hub', icon: '💭', fullLabel: 'Community Hub' },
  ];

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-lg shadow-soft py-3 px-4 md:px-6 lg:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50 border-b border-neutral-200/50">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <div className="relative">
            <img 
              src="/colombia-flag.png" 
              alt="Colombia Flag" 
              className="w-10 h-7 rounded-sm shadow-sm" 
            />
            <div className="absolute -inset-0.5 rounded-sm opacity-30 bg-gradient-to-r from-secondary-400 via-primary-500 to-accent-500 blur-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-gradient-colombia leading-none">
              Nuestro Pulso
            </span>
            <span className="text-xs text-neutral-500 font-medium tracking-wide hidden sm:block">
              Red Cívica de Colombia
            </span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="w-full">
            <UniversalSearchBar 
              compact={true}
              onResults={() => handleNavClick('search')}
            />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 xl:gap-2 items-center flex-shrink-0">
          {navItems.map((item) => {
            const isActive = currentView === item.id || 
              (item.id === 'feeds' && currentView === 'news') ||
              (item.id === 'surveys' && currentView === 'encuestas');
            
            return (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`${isActive ? 'nav-link-active' : 'nav-link-inactive'} 
                  relative group min-w-0 px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-200`}
                title={item.fullLabel}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="hidden xl:inline truncate">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-primary-500 rounded-lg opacity-10 scale-105"></div>
                )}
              </button>
            );
          })}
          
          {/* Mobile/Tablet Search Button */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="lg:hidden nav-link-inactive px-2 xl:px-3 py-2"
            title="Buscar"
          >
            <span className="text-lg">🔍</span>
            <span className="hidden xl:inline">Buscar</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 group"
          aria-label="Menú de navegación"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${showMobileMenu ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Auth Button - Desktop */}
        <div className="hidden xl:flex items-center ml-4 flex-shrink-0">
          <button className="btn-lg gradient-colombia text-white font-bold shadow-medium hover:shadow-large hover:scale-105 transform transition-all duration-300">
            <span className="flex items-center gap-2">
              <span>🇨🇴</span>
              <span>Ingresar</span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-60 top-20 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm ml-auto h-full shadow-large p-6 animate-slide-down border-l border-neutral-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => {
                const isActive = currentView === item.id || 
                  (item.id === 'feeds' && currentView === 'news') ||
                  (item.id === 'surveys' && currentView === 'encuestas');
                
                return (
                  <button 
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`${isActive ? 'nav-link-active' : 'nav-link-inactive'} 
                      p-3 text-left animate-slide-up`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-xl mr-3 inline-block w-6 text-center">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.fullLabel}</span>
                  </button>
                );
              })}
              
              <button 
                onClick={() => setShowSearchModal(true)}
                className="nav-link-inactive p-3 text-left animate-slide-up"
                style={{ animationDelay: `${navItems.length * 50}ms` }}
              >
                <span className="text-xl mr-3 inline-block w-6 text-center">🔍</span>
                <span className="font-medium">Buscar</span>
              </button>
              
              <div className="border-t border-neutral-200 my-4"></div>
              
              {/* Social Icons in Mobile */}
              <div className="flex items-center justify-around py-4 animate-slide-up" 
                style={{ animationDelay: `${(navItems.length + 1) * 50}ms` }}>
                {[
                  { href: "https://www.google.com", icon: "🌐", title: "Google" },
                  { href: "https://www.youtube.com", icon: "📺", title: "YouTube" },
                  { href: "https://www.facebook.com", icon: "📘", title: "Facebook" },
                  { href: "https://www.twitter.com", icon: "🐦", title: "Twitter" },
                ].map((social) => (
                  <a 
                    key={social.title}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl hover:scale-110 transition-transform duration-200 p-2 rounded-lg hover:bg-neutral-100"
                    title={social.title}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <button className="btn-lg gradient-colombia text-white font-bold shadow-medium hover:shadow-large w-full animate-slide-up"
                style={{ animationDelay: `${(navItems.length + 2) * 50}ms` }}>
                <span className="flex items-center justify-center gap-2">
                  <span>🇨🇴</span>
                  <span>Ingresar</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal for Mobile/Tablet */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-start justify-center p-4 pt-20 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-large max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                <span className="text-3xl">🔍</span>
                <span>Búsqueda Universal</span>
              </h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-neutral-500 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Cerrar búsqueda"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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