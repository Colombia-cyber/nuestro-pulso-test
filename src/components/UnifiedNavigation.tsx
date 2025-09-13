import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

interface UnifiedNavigationProps {
  activeModule?: string;
  setActiveModule?: (module: string) => void;
}

const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({ 
  activeModule = 'home', 
  setActiveModule = () => {} 
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const modules = [
    { id: 'home', name: 'Inicio', icon: '🏠', ariaLabel: 'Ir a Inicio' },
    { id: 'news', name: 'Noticias', icon: '📰', ariaLabel: 'Ver Noticias en Vivo' },
    { id: 'chat', name: 'Chat en Vivo', icon: '💬', ariaLabel: 'Unirse al Chat en Vivo' },
    { id: 'debate', name: 'Debate', icon: '🗣️', ariaLabel: 'Participar en Debates' },
    { id: 'survey', name: 'Encuestas', icon: '📊', ariaLabel: 'Responder Encuestas' },
    { id: 'reels', name: 'Pulse Reels', icon: '🎬', ariaLabel: 'Ver Pulse Reels' },
    { id: 'marketplace', name: 'Mercado', icon: '🛒', ariaLabel: 'Visitar Mercado' },
    { id: 'search', name: 'Buscar', icon: '🔍', ariaLabel: 'Buscar Contenido' },
    { id: 'elections', name: 'Elecciones', icon: '🗳️', ariaLabel: 'Centro Electoral' },
    { id: 'congress', name: 'Congreso', icon: '🏛️', ariaLabel: 'Seguimiento del Congreso' },
    { id: 'comments', name: 'Comentarios', icon: '💭', ariaLabel: 'Ver Comentarios' },
    { id: 'care', name: 'Cuidado', icon: '🤝', ariaLabel: 'Centro de Cuidado' },
    { id: 'alerts', name: 'Alertas', icon: '🔔', ariaLabel: 'Ver Alertas' },
    { id: 'copilot', name: 'Asistente', icon: '🤖', ariaLabel: 'Asistente Cívico' },
  ];

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setMobileMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 shadow-lg z-50"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl" role="img" aria-label="Bandera de Colombia">🇨🇴</span>
              <h1 className="text-xl font-bold text-white">
                Nuestro Pulso
              </h1>
              <span className="text-sm text-white/80">Red Cívica de Colombia</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1" role="menubar">
              {modules.slice(0, 8).map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleModuleClick(module.id))}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    activeModule === module.id
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-white hover:bg-white/20 focus:bg-white/20'
                  }`}
                  role="menuitem"
                  aria-label={module.ariaLabel}
                  aria-current={activeModule === module.id ? 'page' : undefined}
                >
                  <span className="mr-1" role="img" aria-hidden="true">{module.icon}</span>
                  {module.name}
                </button>
              ))}
              
              {/* More dropdown for remaining modules */}
              <div className="relative group">
                <button 
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20"
                  aria-label="Más opciones"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-1" role="img" aria-hidden="true">⋯</span>
                  Más
                </button>
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all"
                  role="menu"
                  aria-label="Menú adicional"
                >
                  {modules.slice(8).map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module.id)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleModuleClick(module.id))}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                        activeModule === module.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                      role="menuitem"
                      aria-label={module.ariaLabel}
                    >
                      <span className="mr-2" role="img" aria-hidden="true">{module.icon}</span>
                      {module.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setMobileMenuOpen(!mobileMenuOpen))}
                className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md"
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">
                    Hola, {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <button 
                    onClick={logout}
                    onKeyDown={(e) => handleKeyDown(e, logout)}
                    className="bg-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                    aria-label="Cerrar sesión"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    onKeyDown={(e) => handleKeyDown(e, () => setShowLoginModal(true))}
                    className="bg-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                    aria-label="Iniciar sesión"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    onKeyDown={(e) => handleKeyDown(e, () => setShowLoginModal(true))}
                    className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-label="Registrarse"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-white shadow-lg"
            role="menu"
            aria-label="Menú de navegación móvil"
          >
            <div className="px-4 py-2 space-y-1">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleModuleClick(module.id))}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
                  }`}
                  role="menuitem"
                  aria-label={module.ariaLabel}
                >
                  <span className="mr-2" role="img" aria-hidden="true">{module.icon}</span>
                  {module.name}
                </button>
              ))}
              
              <div className="border-t pt-2">
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Hola, {user.displayName || user.email?.split('@')[0]}
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, () => {
                        logout();
                        setMobileMenuOpen(false);
                      })}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 rounded-md"
                      aria-label="Cerrar sesión"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, () => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    })}
                    className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 rounded-md"
                    aria-label="Iniciar sesión o registrarse"
                  >
                    Iniciar Sesión / Registrarse
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default UnifiedNavigation;