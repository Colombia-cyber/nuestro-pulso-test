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
  };

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Inicio', shortLabel: 'Inicio' },
    { id: 'reels', icon: '🎬', label: 'Reels', shortLabel: 'Reels' },
    { id: 'feeds', icon: '📰', label: 'Noticias', shortLabel: 'Feeds' },
    { id: 'congress', icon: '🏛️', label: 'Congreso', shortLabel: 'Congreso' },
    { id: 'elections', icon: '🗳️', label: 'Elecciones', shortLabel: 'Votos' },
    { id: 'chat', icon: '💬', label: 'Chat en Vivo', shortLabel: 'Chat' },
    { id: 'debates', icon: '🗣️', label: 'Debates', shortLabel: 'Debates' },
    { id: 'surveys', icon: '📊', label: 'Encuestas', shortLabel: 'Encuestas' },
    { id: 'community-hub', icon: '💭', label: 'Community Hub', shortLabel: 'Hub' }
  ];

  return (
    <>
      {/* Premium Main Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          isScrolled 
            ? 'nav-premium shadow-premium-lg border-b border-white/30' 
            : 'glass-premium backdrop-blur-4xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Premium Logo Section */}
            <div 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="relative perspective-3d">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-colombia-premium rounded-2xl shadow-colombia-strong flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3d transition-all duration-500 animate-premium-glow">
                  <span className="text-white font-black text-xl lg:text-2xl">🇨🇴</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-premium"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-gradient-colombia-premium font-black text-2xl lg:text-3xl text-shadow-lg animate-gradient-aurora">
                  Nuestro Pulso
                </h1>
                <p className="text-sm lg:text-base text-colombia-blue-600 font-bold">
                  Red Cívica de Colombia
                </p>
              </div>
            </div>

            {/* Premium Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-3xl mx-8">
              <div className="relative w-full perspective-3d">
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
                  className="scale-75 origin-left transform hover:scale-80 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Premium Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navItems.map((item) => {
                const isActive = currentView === item.id || 
                  (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                  (item.id === 'surveys' && currentView === 'encuestas');
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item-premium group relative ${isActive ? 'active' : ''}`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl group-hover:animate-premium-bounce transform transition-transform duration-300">{item.icon}</span>
                      <span className="hidden xl:inline font-bold text-sm">
                        {item.shortLabel}
                      </span>
                    </div>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-colombia-premium rounded-full shadow-colombia animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Premium Social Icons & Search - Desktop */}
            <div className="hidden lg:flex items-center gap-4 ml-4">
              {/* Premium Social Media Icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://youtube.com/@nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-elegant text-red-600 hover:glass-premium hover:scale-110 transition-all duration-400 shadow-soft hover:shadow-premium"
                  title="YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-elegant text-blue-600 hover:glass-premium hover:scale-110 transition-all duration-400 shadow-soft hover:shadow-premium"
                  title="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-elegant text-sky-600 hover:glass-premium hover:scale-110 transition-all duration-400 shadow-soft hover:shadow-premium"
                  title="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-elegant text-green-600 hover:glass-premium hover:scale-110 transition-all duration-400 shadow-soft hover:shadow-premium"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>

              {/* Search Button for smaller screens */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="xl:hidden p-3 rounded-2xl glass-elegant text-colombia-blue-600 hover:glass-premium transition-all duration-400"
                title="Buscar"
              >
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Premium Login Button */}
              <button className="btn-premium btn-colombia-premium text-base px-6 py-3 lg:px-8 lg:py-4">
                <span className="flex items-center gap-3">
                  <span>🔐</span>
                  <span className="hidden xl:inline font-bold">Ingresar</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="p-2 rounded-lg bg-colombia-blue/10 text-colombia-blue hover:bg-colombia-blue/20 transition-all duration-300"
                title="Buscar"
              >
                <FaSearch className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg bg-colombia-blue/10 text-colombia-blue hover:bg-colombia-blue/20 transition-all duration-300"
                aria-label="Menú de navegación"
              >
                {showMobileMenu ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-60 transition-all duration-300 ${
        showMobileMenu ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="bg-gradient-colombia p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🇨🇴</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Nuestro Pulso</h2>
                    <p className="text-sm opacity-90">Red Cívica</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-2 px-4">
                {navItems.map((item) => {
                  const isActive = currentView === item.id || 
                    (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                    (item.id === 'surveys' && currentView === 'encuestas');
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-colombia-blue text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-colombia-yellow rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-gray-200">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <a 
                  href="https://youtube.com/@nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/nuestropulso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>
              
              {/* Login Button */}
              <button className="w-full btn-primary">
                <span className="flex items-center justify-center gap-2">
                  <span>🔐</span>
                  <span>Ingresar</span>
                </span>
              </button>
            </div>
          </div>
        </div>
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