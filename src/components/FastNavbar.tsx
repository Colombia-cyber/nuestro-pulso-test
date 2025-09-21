import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { FaSearch, FaBars, FaTimes, FaYoutube, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { useOptimizedState } from '../hooks/useOptimizedState';
import { useThrottle } from '../hooks/usePerformanceHooks';
import { FastButton } from './FastComponents';
import { FastSearch } from './FastSearch';

/**
 * Ultra-fast optimized navigation component
 * Part of fast-r7aqkx-230-d component series
 */
export interface FastNavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
  className?: string;
}

interface NavItem {
  id: string;
  icon: string;
  label: string;
  shortLabel: string;
  badge?: number;
  isActive?: boolean;
}

const FastNavbarComponent: React.FC<FastNavbarProps> = ({
  onNavigate,
  currentView = 'home',
  className = ''
}) => {
  const { value: showMobileMenu, setValue: setShowMobileMenu } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  const { value: showSearchModal, setValue: setShowSearchModal } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  const { value: isScrolled, setValue: setIsScrolled } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  // Throttled scroll handler for performance
  const throttledScrollHandler = useThrottle(
    useCallback(() => {
      setIsScrolled(window.scrollY > 10);
    }, [setIsScrolled]),
    { delay: 16 } // ~60fps
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Optimized navigation handler
  const handleNavClick = useCallback((view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setShowMobileMenu(false);
  }, [onNavigate, setShowMobileMenu]);

  // Memoized navigation items with live stats
  const navItems = useMemo((): NavItem[] => [
    { id: 'home', icon: '🏠', label: 'Inicio', shortLabel: 'Inicio' },
    { id: 'reels', icon: '🎬', label: 'Reels', shortLabel: 'Reels', badge: 156 },
    { id: 'feeds', icon: '📰', label: 'Noticias', shortLabel: 'Feeds', badge: 47 },
    { id: 'congress', icon: '🏛️', label: 'Congreso', shortLabel: 'Congreso' },
    { id: 'elections', icon: '🗳️', label: 'Elecciones', shortLabel: 'Votos' },
    { id: 'chat', icon: '💬', label: 'Chat en Vivo', shortLabel: 'Chat', badge: 2847 },
    { id: 'debates', icon: '🗣️', label: 'Debates', shortLabel: 'Debates', badge: 156 },
    { id: 'surveys', icon: '📊', label: 'Encuestas', shortLabel: 'Encuestas', badge: 12 },
    { id: 'community-hub', icon: '💭', label: 'Community Hub', shortLabel: 'Hub' }
  ], []);

  // Optimized search handler
  const handleSearch = useCallback((query: string) => {
    const params = new URLSearchParams();
    params.set('q', query);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    handleNavClick('search');
    setShowSearchModal(false);
  }, [handleNavClick, setShowSearchModal]);

  // Memoized social links for performance
  const socialLinks = useMemo(() => [
    {
      href: 'https://youtube.com/@nuestropulso',
      icon: FaYoutube,
      title: 'YouTube',
      className: 'bg-red-50 text-red-600 hover:bg-red-100'
    },
    {
      href: 'https://facebook.com/nuestropulso',
      icon: FaFacebook,
      title: 'Facebook',
      className: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      href: 'https://twitter.com/nuestropulso',
      icon: FaTwitter,
      title: 'Twitter',
      className: 'bg-sky-50 text-sky-600 hover:bg-sky-100'
    },
    {
      href: 'https://wa.me/573001234567',
      icon: FaWhatsapp,
      title: 'WhatsApp',
      className: 'bg-green-50 text-green-600 hover:bg-green-100'
    }
  ], []);

  // Memoized navbar classes for performance
  const navbarClasses = useMemo(() => {
    const baseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
    const scrollClasses = isScrolled 
      ? 'bg-white/95 backdrop-ultra-fast shadow-fast border-b border-colombia-yellow/20'
      : 'bg-gradient-colombia-soft backdrop-blur-sm';
    
    return [baseClasses, scrollClasses, className].filter(Boolean).join(' ');
  }, [isScrolled, className]);

  return (
    <>
      {/* Main Navigation */}
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section - Optimized with transform-gpu */}
            <div 
              className="flex items-center gap-3 cursor-pointer group transform-gpu"
              onClick={() => handleNavClick('home')}
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-colombia rounded-xl shadow-colombia flex items-center justify-center hover-lift micro-bounce">
                  <span className="text-white font-bold text-lg lg:text-xl">🇨🇴</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-modern"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-gradient-colombia font-bold text-xl lg:text-2xl text-shadow">
                  Nuestro Pulso
                </h1>
                <p className="text-xs lg:text-sm text-colombia-blue/80 font-medium">
                  Red Cívica de Colombia
                </p>
              </div>
            </div>

            {/* Desktop Search Bar - Ultra-fast */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <FastSearch
                onSearch={handleSearch}
                placeholder="Buscar noticias en Colombia y el mundo..."
                debounceMs={100}
                maxSuggestions={6}
              />
            </div>
            
            {/* Desktop Navigation - Optimized rendering */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id || 
                  (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                  (item.id === 'surveys' && currentView === 'encuestas');
                
                return (
                  <FastButton
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    variant={isActive ? 'primary' : 'ghost'}
                    size="md"
                    className={`relative group ${isActive ? 'scale-105' : ''} transition-ultra-fast`}
                    ripple={true}
                    debounceMs={50}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg group-hover:animate-bounce-subtle">{item.icon}</span>
                      <span className="hidden xl:inline font-medium text-sm">
                        {item.shortLabel}
                      </span>
                      {/* Live badge indicator */}
                      {item.badge && (
                        <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center animate-pulse-modern">
                          {item.badge > 999 ? '999+' : item.badge}
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-colombia-yellow rounded-full animate-scaleIn"></div>
                    )}
                  </FastButton>
                );
              })}
            </div>

            {/* Social Icons & Auth - Desktop */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              {/* Social Media Icons - Optimized rendering */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, title, className: linkClassName }) => (
                  <a 
                    key={href}
                    href={href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg hover:scale-110 transition-ultra-fast transform-gpu ${linkClassName}`}
                    title={title}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Search Button for smaller screens */}
              <FastButton 
                onClick={() => setShowSearchModal(true)}
                variant="ghost"
                size="md"
                className="xl:hidden"
                ripple={true}
              >
                <FaSearch className="w-4 h-4" />
              </FastButton>

              {/* Login Button */}
              <FastButton 
                variant="primary" 
                size="md"
                className="px-4 py-2 lg:px-6 lg:py-3"
                ripple={true}
              >
                <span className="flex items-center gap-2">
                  <span>🔐</span>
                  <span className="hidden xl:inline">Ingresar</span>
                </span>
              </FastButton>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Search Button */}
              <FastButton 
                onClick={() => setShowSearchModal(true)}
                variant="ghost"
                size="md"
                ripple={true}
              >
                <FaSearch className="w-5 h-5" />
              </FastButton>
              
              {/* Mobile Menu Toggle */}
              <FastButton
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                variant="ghost"
                size="md"
                ripple={true}
              >
                {showMobileMenu ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </FastButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Optimized animations */}
      <div className={`lg:hidden fixed inset-0 z-60 transition-all duration-300 ${
        showMobileMenu ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-ultra-fast" 
          onClick={() => setShowMobileMenu(false)} 
        />
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-fast transform transition-transform duration-300 ${
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
                <FastButton
                  onClick={() => setShowMobileMenu(false)}
                  variant="ghost"
                  size="md"
                  className="text-white hover:bg-white/20"
                  ripple={true}
                >
                  <FaTimes className="w-5 h-5" />
                </FastButton>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 fast-scroll">
              <div className="space-y-2 px-4">
                {navItems.map((item) => {
                  const isActive = currentView === item.id || 
                    (item.id === 'feeds' && (currentView === 'news' || currentView === 'feeds')) ||
                    (item.id === 'surveys' && currentView === 'encuestas');
                  
                  return (
                    <FastButton
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      variant={isActive ? 'primary' : 'ghost'}
                      className="w-full justify-start p-4 rounded-xl"
                      ripple={true}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge > 999 ? '999+' : item.badge}
                          </span>
                        )}
                        {isActive && (
                          <div className="w-2 h-2 bg-colombia-yellow rounded-full animate-pulse-modern"></div>
                        )}
                      </div>
                    </FastButton>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-gray-200">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {socialLinks.map(({ href, icon: Icon, title, className: linkClassName }) => (
                  <a 
                    key={href}
                    href={href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-ultra-fast transform-gpu hover:scale-110 ${linkClassName}`}
                    title={title}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Login Button */}
              <FastButton 
                variant="primary" 
                size="lg"
                className="w-full"
                ripple={true}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🔐</span>
                  <span>Ingresar</span>
                </span>
              </FastButton>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal - Ultra-fast with animations */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-ultra-fast z-70 flex items-center justify-center p-4 modal-ultra-fast">
          <div className="bg-white rounded-2xl shadow-fast max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gradient-colombia">
                🔍 Búsqueda Universal
              </h2>
              <FastButton 
                onClick={() => setShowSearchModal(false)}
                variant="ghost"
                size="md"
                ripple={true}
              >
                <FaTimes className="w-5 h-5" />
              </FastButton>
            </div>
            <div className="p-6">
              <FastSearch 
                autoFocus={true}
                onSearch={handleSearch}
                debounceMs={100}
                maxSuggestions={8}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const FastNavbar = memo(FastNavbarComponent);