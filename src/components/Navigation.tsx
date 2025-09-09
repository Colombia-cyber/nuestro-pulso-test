import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

interface NavigationProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, setActiveModule }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const modules = [
    { id: 'home', name: 'Inicio', icon: '🏠' },
    { id: 'chat', name: 'Chat en Vivo', icon: '💬' },
    { id: 'debate', name: 'Debate', icon: '🗣️' },
    { id: 'survey', name: 'Encuestas', icon: '📊' },
    { id: 'news', name: 'Noticias', icon: '📰' },
    { id: 'comments', name: 'Comentarios', icon: '💭' },
    { id: 'care', name: 'Cuidado', icon: '🤝' },
    { id: 'congress', name: 'Congreso', icon: '🏛️' },
    { id: 'reels', name: 'Pulse Reels', icon: '🎬' },
    { id: 'marketplace', name: 'Mercado', icon: '🛒' },
    { id: 'search', name: 'Buscar', icon: '🔍' },
    { id: 'alerts', name: 'Alertas', icon: '🔔' },
    { id: 'elections', name: 'Elecciones', icon: '🗳️' },
    { id: 'copilot', name: 'Asistente', icon: '🤖' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🇨🇴</span>
            <h1 className="text-xl font-bold text-white">
              Nuestro Pulso
            </h1>
            <span className="text-sm text-white/80">Red Cívica de Colombia</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {modules.slice(0, 8).map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeModule === module.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-1">{module.icon}</span>
                {module.name}
              </button>
            ))}
            {/* More dropdown for remaining modules */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/20">
                <span className="mr-1">⋯</span>
                Más
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {modules.slice(8).map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      activeModule === module.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{module.icon}</span>
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
              className="text-white p-2"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="bg-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/30 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/30 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeModule === module.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{module.icon}</span>
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
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
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
                  className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  Iniciar Sesión / Registrarse
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </nav>
  );
};

export default Navigation;