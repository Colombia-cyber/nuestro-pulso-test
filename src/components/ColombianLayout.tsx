import React, { useState } from 'react';
import { FaHome, FaVideo, FaNewspaper, FaComments, FaPoll, FaFire, FaBars, FaTimes, FaFlag } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';

interface ColombianLayoutProps {
  children: React.ReactNode;
  activeSection?: 'home' | 'reels' | 'news' | 'debates' | 'surveys' | 'tendencies';
  onNavigate?: (section: string) => void;
}

export const ColombianLayout: React.FC<ColombianLayoutProps> = ({ 
  children, 
  activeSection = 'home',
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: FaHome, gradient: 'from-yellow-400 to-yellow-600' },
    { id: 'reels', label: 'Reels', icon: FaVideo, gradient: 'from-colombia-blue to-blue-600' },
    { id: 'news', label: 'Noticias', icon: FaNewspaper, gradient: 'from-colombia-red to-red-600' },
    { id: 'debates', label: 'Debates', icon: FaComments, gradient: 'from-purple-500 to-purple-700' },
    { id: 'surveys', label: 'Encuestas', icon: FaPoll, gradient: 'from-green-500 to-green-700' },
    { id: 'tendencies', label: 'Tendencias', icon: BiTrendingUp, gradient: 'from-orange-500 to-orange-700' },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Top Navigation Bar - Colombian Flag Style */}
      <nav className="sticky top-0 z-50 glass-card border-b-4 border-b-colombia-yellow shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-full p-2 shadow-colombia">
                  <FaFlag className="w-8 h-8 text-colombia-blue" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-colombia-gradient">
                  Nuestro Pulso
                </h1>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <MdVerified className="text-colombia-blue" />
                  Plataforma Cívica Colombiana
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      relative px-4 py-2 rounded-xl font-semibold text-sm
                      transition-all duration-300 transform hover:scale-105
                      ${isActive 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`${isActive ? 'animate-bounce-subtle' : ''}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-700" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in-down">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                        transition-all duration-300
                        ${isActive 
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {isActive && <FaFire className="ml-auto text-yellow-300 animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Colombian Flag Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red"></div>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-r from-gray-900 via-colombia-blue to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaFlag className="text-colombia-yellow" />
                Nuestro Pulso
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                La plataforma líder de participación cívica en Colombia. 
                Conectando ciudadanos con noticias, debates y tendencias que importan.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:text-colombia-yellow cursor-pointer transition-colors">Acerca de Nosotros</li>
                <li className="hover:text-colombia-yellow cursor-pointer transition-colors">Política de Privacidad</li>
                <li className="hover:text-colombia-yellow cursor-pointer transition-colors">Términos de Servicio</li>
                <li className="hover:text-colombia-yellow cursor-pointer transition-colors">Contacto</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <p className="text-gray-300 text-sm mb-4">
                Mantente actualizado con las últimas noticias y tendencias
              </p>
              <div className="flex gap-3">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-colombia-yellow hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nuestro Pulso. Todos los derechos reservados.</p>
            <p className="mt-2 flex items-center justify-center gap-2">
              <span>Hecho con</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>en Colombia</span>
              <FaFlag className="text-colombia-yellow" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
