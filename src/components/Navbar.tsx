import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes, FaYoutube, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
    // Announce navigation change to screen readers
    const announcement = `Navegando a ${navItems.find(item => item.id === view)?.label || view}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const navItems = [
    { id: 'home', icon: 'HOME', label: 'Inicio', shortLabel: 'INICIO' },
    { id: 'colombia-hub', icon: '🌎🇨🇴', label: 'Colombia Hub', shortLabel: 'COLOMBIA' },
    { id: 'reels', icon: 'REELS', label: 'Reels', shortLabel: 'REELS' },
    { id: 'feeds', icon: 'NEWS', label: 'Noticias', shortLabel: 'NOTICIAS' },
    { id: 'congress', icon: 'CONGRESS', label: 'Congreso', shortLabel: 'CONGRESO' },
    { id: 'elections', icon: 'VOTE', label: 'Elecciones', shortLabel: 'VOTOS' },
    { id: 'chat', icon: 'CHAT', label: 'Chat en Vivo', shortLabel: 'CHAT' },
    { id: 'debates', icon: 'DEBATE', label: 'Debates', shortLabel: 'DEBATES' },
    { id: 'surveys', icon: 'POLL', label: 'Encuestas', shortLabel: 'ENCUESTAS' },
    { id: 'community-hub', icon: 'HUB', label: 'Community Hub', shortLabel: 'HUB' }
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-colombia-yellow/20' 
            : 'bg-gradient-colombia-soft backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section - PROFESSIONAL */}
            <button
              className="flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-colombia-yellow focus:ring-offset-2 rounded-lg p-2 -m-2"
              onClick={() => handleNavClick('home')}
              onKeyDown={(e) => handleKeyDown(e, () => handleNavClick('home'))}
              aria-label="Ir al inicio - Nuestro Pulso"
              type="button"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-colombia rounded-xl shadow-colombia flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 floating">
                  <span className="text-white font-black text-lg lg:text-xl">NP</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-gradient-colombia font-black text-xl lg:text-2xl text-shadow tracking-tight">
                  NUESTRO PULSO
                </h1>
                <p className="text-xs lg:text-sm text-colombia-blue/80 font-bold uppercase tracking-wide">
                  RED CÍVICA COLOMBIA
                </p>
              </div>
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <UniversalSearchBar 
                  onSearch={(query, category, topic) => {
                    // Navigate to search with parameters
                    const params = new URLSearchParams();
                    params.set('q', query);
                    params.set('category', category);
                    if (topic) params.set('topic', topic.id);
                    window.history.pushState(null, '', `/search?${params.toString()}`);
                    handleNavClick('search');
                  }}
                  onTopicSelect={(topic) => console.log('Topic selected:', topic)}
                  className="scale-75 origin-left"
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2" role="menubar" aria-label="Navegación principal">
              {navItems.map((item) => {
                const isActive = currentView === item.id || 
                  (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                  (item.id === 'surveys' && currentView === 'encuestas');
                
                return (
                  <li key={item.id} role="none">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleNavClick(item.id))}
                      className={`nav-item group relative focus:outline-none focus:ring-2 focus:ring-colombia-yellow focus:ring-offset-2 rounded-lg ${isActive ? 'active' : ''}`}
                      title={item.label}
                      aria-label={item.label}
                      aria-current={isActive ? 'page' : undefined}
                      role="menuitem"
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold tracking-wider text-gray-600 group-hover:text-blue-600 transition-colors" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="hidden xl:inline font-bold text-sm">
                          {item.shortLabel}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-colombia-yellow rounded-full" aria-hidden="true"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Social Icons & Search - Desktop */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              {/* Social Media Icons */}
              <nav className="flex items-center gap-2" aria-label="Redes sociales">
                <a 
                  href="https://youtube.com/@nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-300 interactive-glow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Síguenos en YouTube"
                >
                  <FaYoutube className="w-4 h-4" aria-hidden="true" />
                </a>
                <a 
                  href="https://facebook.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-300 interactive-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Síguenos en Facebook"
                >
                  <FaFacebook className="w-4 h-4" aria-hidden="true" />
                </a>
                <a 
                  href="https://twitter.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 hover:scale-110 transition-all duration-300 interactive-glow focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  aria-label="Síguenos en Twitter"
                >
                  <FaTwitter className="w-4 h-4" aria-hidden="true" />
                </a>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-300 interactive-glow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Contáctanos por WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
                </a>
              </nav>

              {/* Search Button for smaller screens */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="xl:hidden p-2 rounded-lg bg-colombia-blue/10 text-colombia-blue hover:bg-colombia-blue/20 transition-all duration-300"
                title="Buscar"
              >
                <FaSearch className="w-4 h-4" />
              </button>

              {/* Login Button */}
              <button className="btn-primary text-sm px-4 py-2 lg:px-6 lg:py-3 font-bold">
                <span className="flex items-center gap-2">
                  <span className="font-bold">LOGIN</span>
                  <span className="hidden xl:inline font-extrabold">INGRESAR</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setShowSearchModal(true)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowSearchModal(true))}
                className="p-2 rounded-lg bg-colombia-blue/10 text-colombia-blue hover:bg-colombia-blue/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:ring-offset-2"
                aria-label="Abrir búsqueda"
                type="button"
              >
                <FaSearch className="w-5 h-5" aria-hidden="true" />
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowMobileMenu(!showMobileMenu))}
                className="p-2 rounded-lg bg-colombia-blue/10 text-colombia-blue hover:bg-colombia-blue/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:ring-offset-2"
                aria-label={showMobileMenu ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={showMobileMenu}
                aria-controls="mobile-menu"
                type="button"
              >
                {showMobileMenu ? (
                  <FaTimes className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <FaBars className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-60 transition-all duration-300 ${
          showMobileMenu ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!showMobileMenu}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setShowMobileMenu(false)}
          aria-label="Cerrar menú"
        />
        <nav
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            showMobileMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Menú de navegación móvil"
          role="navigation"
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="bg-gradient-colombia p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-black">NP</span>
                  </div>
                  <div>
                    <h2 className="font-black text-lg tracking-tight">NUESTRO PULSO</h2>
                    <p className="text-sm opacity-90 font-bold uppercase tracking-wide">RED CÍVICA</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  onKeyDown={(e) => handleKeyDown(e, () => setShowMobileMenu(false))}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Cerrar menú"
                  type="button"
                >
                  <FaTimes className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-4" role="menu" aria-label="Navegación principal">
                {navItems.map((item) => {
                  const isActive = currentView === item.id || 
                    (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                    (item.id === 'surveys' && currentView === 'encuestas');
                  
                  return (
                    <li key={item.id} role="none">
                      <button
                        onClick={() => handleNavClick(item.id)}
                        onKeyDown={(e) => handleKeyDown(e, () => handleNavClick(item.id))}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-colombia-yellow focus:ring-offset-2 ${
                          isActive 
                            ? 'bg-colombia-blue text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                        type="button"
                      >
                        <span className="text-sm font-extrabold tracking-wider" aria-hidden="true">{item.icon}</span>
                        <span className="font-bold">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-colombia-yellow rounded-full" aria-hidden="true"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Menu Footer */}
            <footer className="p-4 border-t border-gray-200">
              {/* Social Icons */}
              <nav className="flex items-center justify-center gap-4 mb-4" aria-label="Redes sociales">
                <a 
                  href="https://youtube.com/@nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Síguenos en YouTube"
                >
                  <FaYoutube className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://facebook.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Síguenos en Facebook"
                >
                  <FaFacebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://twitter.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  aria-label="Síguenos en Twitter"
                >
                  <FaTwitter className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Contáctanos por WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                </a>
              </nav>
              
              {/* Login Button */}
              <button 
                className="w-full btn-primary font-bold focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:ring-offset-2"
                type="button"
                aria-label="Iniciar sesión"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="font-bold">LOGIN</span>
                  <span className="font-extrabold">INGRESAR</span>
                </span>
              </button>
            </footer>
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gradient-colombia">
                🔍 Búsqueda Universal
              </h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Cerrar búsqueda"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <UniversalSearchBar 
                autoFocus={true}
                onSearch={(query, category, topic) => {
                  // Navigate to search with parameters
                  const params = new URLSearchParams();
                  params.set('q', query);
                  params.set('category', category);
                  if (topic) params.set('topic', topic.id);
                  window.history.pushState(null, '', `/search?${params.toString()}`);
                  setShowSearchModal(false);
                  handleNavClick('search');
                }}
                onTopicSelect={(topic) => console.log('Topic selected:', topic)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;