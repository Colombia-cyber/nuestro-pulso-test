import React, { useState } from 'react';
import { 
  FaHome, FaComments, FaGavel, FaChartBar, FaNewspaper, 
  FaHeart, FaBuilding, FaVideo, FaStore, FaSearch, 
  FaBell, FaVoteYea, FaRobot, FaUser, FaBars, FaTimes 
} from 'react-icons/fa';

interface NavBarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  user?: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    verified?: boolean;
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

interface NavModule {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const NavBar: React.FC<NavBarProps> = ({ 
  activeModule, 
  setActiveModule, 
  user, 
  onLogin, 
  onLogout 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const modules: NavModule[] = [
    { 
      id: 'home', 
      name: 'Inicio', 
      icon: <FaHome />, 
      color: 'text-yellow-600', 
      description: 'Página principal' 
    },
    { 
      id: 'chat', 
      name: 'Chat Cívico', 
      icon: <FaComments />, 
      color: 'text-blue-600', 
      description: 'Conversaciones en tiempo real' 
    },
    { 
      id: 'debate', 
      name: 'Debates', 
      icon: <FaGavel />, 
      color: 'text-red-600', 
      description: 'Debates y discusiones' 
    },
    { 
      id: 'polls', 
      name: 'Encuestas', 
      icon: <FaChartBar />, 
      color: 'text-green-600', 
      description: 'Participa en encuestas' 
    },
    { 
      id: 'news', 
      name: 'Noticias', 
      icon: <FaNewspaper />, 
      color: 'text-indigo-600', 
      description: 'Últimas noticias' 
    },
    { 
      id: 'care', 
      name: 'Cuidado', 
      icon: <FaHeart />, 
      color: 'text-pink-600', 
      description: 'Salud y bienestar' 
    },
    { 
      id: 'congress', 
      name: 'Congreso', 
      icon: <FaBuilding />, 
      color: 'text-purple-600', 
      description: 'Seguimiento del Congreso' 
    },
    { 
      id: 'reels', 
      name: 'Pulse Reels', 
      icon: <FaVideo />, 
      color: 'text-cyan-600', 
      description: 'Videos cortos cívicos' 
    },
    { 
      id: 'marketplace', 
      name: 'Mercado', 
      icon: <FaStore />, 
      color: 'text-orange-600', 
      description: 'Marketplace comunitario' 
    },
    { 
      id: 'search', 
      name: 'Buscar', 
      icon: <FaSearch />, 
      color: 'text-gray-600', 
      description: 'Búsqueda universal' 
    },
    { 
      id: 'alerts', 
      name: 'Alertas', 
      icon: <FaBell />, 
      color: 'text-red-500', 
      description: 'Alertas y notificaciones' 
    },
    { 
      id: 'elections', 
      name: 'Elecciones', 
      icon: <FaVoteYea />, 
      color: 'text-blue-500', 
      description: 'Información electoral' 
    },
    { 
      id: 'assistant', 
      name: 'Asistente IA', 
      icon: <FaRobot />, 
      color: 'text-emerald-600', 
      description: 'Asistente cívico inteligente' 
    },
  ];

  const primaryModules = modules.slice(0, 8);
  const secondaryModules = modules.slice(8);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇨🇴</span>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-white leading-tight">
                    Nuestro Pulso
                  </h1>
                  <span className="text-xs text-white/80 leading-tight hidden sm:block">
                    Plataforma Cívica de Colombia
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {primaryModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1 ${
                    activeModule === module.id
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  title={module.description}
                >
                  <span className={module.color}>{module.icon}</span>
                  <span className="hidden xl:block">{module.name}</span>
                </button>
              ))}
              
              {/* More Menu */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <span className="mr-1">⋯</span>
                  <span className="hidden xl:block">Más</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    {secondaryModules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleClick(module.id)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                          activeModule === module.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500' : 'text-gray-700'
                        }`}
                      >
                        <span className={module.color}>{module.icon}</span>
                        <span>{module.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white hover:bg-white/30 transition-all duration-200"
                  >
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.displayName || user.username}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <FaUser className="w-4 h-4" />
                    )}
                    <span className="hidden sm:block text-sm font-medium">
                      {user.displayName || user.username}
                    </span>
                    {user.verified && (
                      <span className="text-yellow-300">✓</span>
                    )}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium text-gray-900">
                            {user.displayName || user.username}
                          </p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                        <button
                          onClick={() => handleModuleClick('profile')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mi Perfil
                        </button>
                        <button
                          onClick={() => handleModuleClick('settings')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Configuración
                        </button>
                        <button
                          onClick={onLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Ingresar
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white p-2 rounded-md hover:bg-white/20 transition-colors"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-white shadow-xl max-h-screen overflow-y-auto">
            <div className="py-4">
              <div className="px-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulos Principales
                </h3>
              </div>
              
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors flex items-center space-x-3 ${
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={module.color}>{module.icon}</span>
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-xs text-gray-500">{module.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default NavBar;