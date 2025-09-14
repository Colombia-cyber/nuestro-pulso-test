import React, { useState } from "react";

type ModuleType = 'home' | 'chat' | 'news' | 'debate' | 'polls' | 'congress' | 'elections' | 'assistant' | 'reels' | 'alerts' | 'marketplace' | 'care';

interface NavbarProps {
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentModule, onModuleChange, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainModules = [
    { id: 'home' as ModuleType, name: 'Inicio', icon: '🏠' },
    { id: 'chat' as ModuleType, name: 'Chat', icon: '💬' },
    { id: 'news' as ModuleType, name: 'Noticias', icon: '📰' },
    { id: 'debate' as ModuleType, name: 'Debates', icon: '🗣️' },
    { id: 'polls' as ModuleType, name: 'Encuestas', icon: '📊' },
    { id: 'congress' as ModuleType, name: 'Congreso', icon: '🏛️' },
  ];

  const secondaryModules = [
    { id: 'elections' as ModuleType, name: 'Elecciones', icon: '🗳️' },
    { id: 'reels' as ModuleType, name: 'Pulse Feed', icon: '📱' },
    { id: 'marketplace' as ModuleType, name: 'Marketplace', icon: '🛒' },
    { id: 'care' as ModuleType, name: 'Red de Cuidado', icon: '🤝' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onModuleChange('home')}
          >
            <div className="w-10 h-7 bg-gradient-to-r from-colombian-yellow via-colombian-blue to-colombian-red rounded-sm shadow-lg group-hover:scale-105 transition-transform"></div>
            <span className="font-bold text-xl text-colombian-blue group-hover:text-colombian-red transition-colors">
              Nuestro Pulso
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainModules.map((module) => (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentModule === module.id
                    ? 'bg-colombian-blue text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/50 hover:text-colombian-blue'
                }`}
              >
                <span>{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/50 hover:text-colombian-blue transition-all duration-300 flex items-center gap-2">
                <span>⋮</span>
                <span>Más</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-56 glass-card-strong rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                <div className="p-2">
                  {secondaryModules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => onModuleChange(module.id)}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                        currentModule === module.id
                          ? 'bg-colombian-blue text-white'
                          : 'text-gray-700 hover:bg-white/50 hover:text-colombian-blue'
                      }`}
                    >
                      <span className="text-lg">{module.icon}</span>
                      <span>{module.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button 
              onClick={() => onModuleChange('alerts')}
              className="relative p-2 rounded-xl text-gray-600 hover:bg-white/50 hover:text-colombian-blue transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V7a5 5 0 00-10 0v5l-5 5h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-colombian-red rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">5</span>
              </div>
            </button>

            {/* Login Button */}
            <button
              onClick={onLoginClick}
              className="btn-primary px-6 py-2 text-sm"
            >
              Ingresar
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-white/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20 animate-slide-up">
            <div className="space-y-2">
              {[...mainModules, ...secondaryModules].map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    onModuleChange(module.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 flex items-center gap-3 ${
                    currentModule === module.id
                      ? 'bg-colombian-blue text-white'
                      : 'text-gray-700 hover:bg-white/50 hover:text-colombian-blue'
                  }`}
                >
                  <span className="text-lg">{module.icon}</span>
                  <span>{module.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;