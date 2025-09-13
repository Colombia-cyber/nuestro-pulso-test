import React, { useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiMessageCircle, 
  FiUsers, 
  FiBarChart, 
  FiFileText,
  FiShoppingBag,
  FiHeart,
  FiEye,
  FiVolume2,
  FiCpu,
  FiAlertTriangle,
  FiSearch,
  FiActivity,
  FiUser,
  FiBell,
  FiSettings
} from 'react-icons/fi';

interface NavModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  description: string;
  category: 'participation' | 'information' | 'services' | 'tools';
}

const navigationModules: NavModule[] = [
  // Participation Modules
  { 
    id: 'chat', 
    name: 'Chat Cívico', 
    icon: FiMessageCircle, 
    href: '#chat',
    description: 'Conversaciones ciudadanas en tiempo real',
    category: 'participation'
  },
  { 
    id: 'debate', 
    name: 'Debates', 
    icon: FiUsers, 
    href: '#debate',
    description: 'Debates estructurados sobre temas nacionales',
    category: 'participation'
  },
  { 
    id: 'polls', 
    name: 'Encuestas', 
    icon: FiBarChart, 
    href: '#polls',
    description: 'Pulso ciudadano y sondeos de opinión',
    category: 'participation'
  },
  
  // Information Modules
  { 
    id: 'news', 
    name: 'Noticias', 
    icon: FiFileText, 
    href: '#news',
    description: 'Noticias verificadas con análisis de sesgo',
    category: 'information'
  },
  { 
    id: 'congress', 
    name: 'Congreso', 
    icon: FiEye, 
    href: '#congress',
    description: 'Seguimiento transparente del Congreso',
    category: 'information'
  },
  { 
    id: 'elections', 
    name: 'Elecciones', 
    icon: FiVolume2, 
    href: '#elections',
    description: 'Centro de información electoral',
    category: 'information'
  },
  
  // Services Modules
  { 
    id: 'marketplace', 
    name: 'Mercado', 
    icon: FiShoppingBag, 
    href: '#marketplace',
    description: 'Economía colaborativa con impacto social',
    category: 'services'
  },
  { 
    id: 'care', 
    name: 'Cuidado', 
    icon: FiHeart, 
    href: '#care',
    description: 'Red de apoyo comunitario y bienestar',
    category: 'services'
  },
  
  // Tools Modules
  { 
    id: 'assistant', 
    name: 'Asistente', 
    icon: FiCpu, 
    href: '#assistant',
    description: 'Asistente IA para navegación cívica',
    category: 'tools'
  },
  { 
    id: 'alerts', 
    name: 'Alertas', 
    icon: FiAlertTriangle, 
    href: '#alerts',
    description: 'Sistema de alertas ciudadanas',
    category: 'tools'
  },
  { 
    id: 'search', 
    name: 'Buscar', 
    icon: FiSearch, 
    href: '#search',
    description: 'Motor de búsqueda cívica especializado',
    category: 'tools'
  },
  { 
    id: 'feed', 
    name: 'Pulso', 
    icon: FiActivity, 
    href: '#feed',
    description: 'Feed personalizado de actividad cívica',
    category: 'tools'
  }
];

const FlagshipNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getBadgeCount = (moduleId: string): number => {
    // Mock badge counts - in real app, these would come from API/context
    const badges: Record<string, number> = {
      chat: 3,
      alerts: 7,
      news: 2,
      elections: 1
    };
    return badges[moduleId] || 0;
  };

  const categoryColors = {
    participation: 'from-blue-500 to-blue-600',
    information: 'from-green-500 to-green-600',
    services: 'from-purple-500 to-purple-600',
    tools: 'from-orange-500 to-orange-600'
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇨🇴</span>
                <div className="flex flex-col">
                  <a href="#home" className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
                    Nuestro Pulso
                  </a>
                  <span className="text-xs text-gray-600 -mt-1">Red Cívica Colombia</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationModules.slice(0, 6).map((module) => {
                const Icon = module.icon;
                const badgeCount = getBadgeCount(module.id);
                
                return (
                  <a
                    key={module.id}
                    href={module.href}
                    className={`relative px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/60 hover:scale-105 ${
                      activeModule === module.id ? 'bg-white/80 shadow-md' : ''
                    }`}
                    onMouseEnter={() => setActiveModule(module.id)}
                    onMouseLeave={() => setActiveModule('')}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">{module.name}</span>
                    </div>
                    {badgeCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {badgeCount}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-lg hover:bg-white/60 transition-colors">
                <FiBell className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-gray-700">María Citizen</span>
                  <span className="text-xs text-gray-500">🏆 Activista Nivel 3</span>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Full-Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600 bg-clip-text text-transparent">
                  Módulos
                </h2>
                <button 
                  onClick={toggleMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Module Categories */}
              {Object.entries({
                participation: 'Participación',
                information: 'Información', 
                services: 'Servicios',
                tools: 'Herramientas'
              }).map(([category, title]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
                  <div className="space-y-2">
                    {navigationModules
                      .filter(module => module.category === category)
                      .map((module) => {
                        const Icon = module.icon;
                        const badgeCount = getBadgeCount(module.id);
                        
                        return (
                          <a
                            key={module.id}
                            href={module.href}
                            onClick={toggleMenu}
                            className="flex items-center p-3 rounded-xl hover:bg-white/60 transition-all duration-200 hover:scale-105 group"
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors[module.category as keyof typeof categoryColors]} mr-3`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-800 group-hover:text-gray-900">
                                  {module.name}
                                </h4>
                                {badgeCount > 0 && (
                                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {badgeCount}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </div>
              ))}

              {/* User Profile Section */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">María Citizen</h3>
                    <p className="text-sm text-gray-600">🏆 Activista Nivel 3</p>
                    <p className="text-xs text-gray-500">1,247 puntos cívicos</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a 
                    href="/profile" 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleMenu}
                  >
                    <FiUser className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">Mi Perfil</span>
                  </a>
                  <a 
                    href="/settings" 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleMenu}
                  >
                    <FiSettings className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">Configuración</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlagshipNavigation;