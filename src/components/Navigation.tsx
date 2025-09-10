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
    { id: 'home', name: 'Inicio', icon: '🏠', color: 'from-blue-500 to-cyan-400' },
    { id: 'chat', name: 'Chat en Vivo', icon: '💬', color: 'from-green-500 to-emerald-400' },
    { id: 'debate', name: 'Debate', icon: '🗣️', color: 'from-purple-500 to-pink-400' },
    { id: 'survey', name: 'Encuestas', icon: '📊', color: 'from-yellow-500 to-orange-400' },
    { id: 'news', name: 'Noticias', icon: '📰', color: 'from-red-500 to-pink-400' },
    { id: 'comments', name: 'Comentarios', icon: '💭', color: 'from-indigo-500 to-blue-400' },
    { id: 'care', name: 'Cuidado', icon: '🤝', color: 'from-teal-500 to-cyan-400' },
    { id: 'congress', name: 'Congreso', icon: '🏛️', color: 'from-gray-600 to-gray-400' },
    { id: 'reels', name: 'Pulse Reels', icon: '🎬', color: 'from-rose-500 to-pink-400' },
    { id: 'marketplace', name: 'Mercado', icon: '🛒', color: 'from-amber-500 to-yellow-400' },
    { id: 'search', name: 'Buscar', icon: '🔍', color: 'from-slate-500 to-gray-400' },
    { id: 'alerts', name: 'Alertas', icon: '🔔', color: 'from-orange-500 to-red-400' },
    { id: 'elections', name: 'Elecciones', icon: '🗳️', color: 'from-emerald-500 to-teal-400' },
    { id: 'copilot', name: 'Asistente', icon: '🤖', color: 'from-violet-500 to-purple-400' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-blue-500/20 to-red-500/20 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur opacity-75"></div>
              <span className="relative text-3xl drop-shadow-lg">🇨🇴</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 drop-shadow-2xl">
                Nuestro Pulso
              </h1>
              <span className="text-xs lg:text-sm text-white/80 font-medium -mt-1">
                Red Cívica de Colombia
              </span>
            </div>
          </div>

          {/* Premium Tabbed Navigation - Desktop */}
          <div className="hidden xl:flex items-center space-x-1 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-xl">
            {modules.slice(0, 6).map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`group relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeModule === module.id
                    ? 'text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {/* Active tab background with glow */}
                {activeModule === module.id && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-xl opacity-90 shadow-2xl`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-xl blur-lg opacity-40 scale-110`}></div>
                  </>
                )}
                
                <div className="relative flex items-center space-x-2">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {module.icon}
                  </span>
                  <span className="hidden xl:inline">{module.name}</span>
                </div>
                
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
            
            {/* More dropdown for remaining modules */}
            <div className="relative group">
              <button className="px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                <span className="text-lg">⋯</span>
                <span className="hidden xl:inline">Más</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                <div className="p-2">
                  {modules.slice(6).map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`group/item w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10 flex items-center space-x-3 ${
                        activeModule === module.id ? 'text-white bg-white/20' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="text-lg group-hover/item:scale-110 transition-transform duration-200">
                        {module.icon}
                      </span>
                      <span>{module.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* User Actions */}
          <div className="hidden xl:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20">
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">
                    Hola, {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 border border-red-500/30"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-white/20"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Mobile Menu Content */}
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 z-50">
            <div className="px-4 py-6 space-y-2 max-h-96 overflow-y-auto">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`group w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                    activeModule === module.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {module.icon}
                  </span>
                  <span>{module.name}</span>
                </button>
              ))}
              
              {/* Mobile User Actions */}
              <div className="border-t border-white/10 pt-4 mt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-sm text-white/80">
                      Hola, {user.displayName || user.email?.split('@')[0]}
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
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
                    className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all duration-200"
                  >
                    Iniciar Sesión / Registrarse
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </nav>
  );
};

export default Navigation;