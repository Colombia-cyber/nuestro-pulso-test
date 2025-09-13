import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: "Chat", href: "/chat", icon: "💬" },
  { name: "Debate", href: "/debate", icon: "🗣️" },
  { name: "Encuestas", href: "/polls", icon: "📊" },
  { name: "Noticias", href: "/news", icon: "📰" },
  { name: "Marketplace", href: "/marketplace", icon: "🛒" },
  { name: "Cuidado", href: "/care", icon: "🏥" },
  { name: "Congreso", href: "/congress", icon: "🏛️" },
  { name: "Elecciones", href: "/elections", icon: "📈" },
  { name: "Asistente", href: "/civic-assistant", icon: "🤖" },
  { name: "Alertas", href: "/alerts", icon: "🚨" },
  { name: "Búsqueda", href: "/search", icon: "🔍" },
  { name: "Pulse Feed", href: "/pulse-feed", icon: "🎬" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`w-full ${isHomePage ? 'fixed' : 'sticky'} top-0 left-0 z-50 ${
        isHomePage 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm' 
          : 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 shadow-lg'
      } py-4 px-8 flex flex-row items-center justify-between transition-all duration-300`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className={`font-bold text-lg ${
            isHomePage ? 'text-yellow-700' : 'text-white'
          }`}>
            Nuestro Pulso
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 overflow-x-auto">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-1 font-medium transition-all duration-200 whitespace-nowrap ${
                isHomePage 
                  ? 'text-blue-900 hover:text-blue-600' 
                  : 'text-white hover:text-yellow-200'
              } ${
                location.pathname === link.href 
                  ? (isHomePage ? 'text-blue-600 font-semibold' : 'text-yellow-200 font-semibold') 
                  : ''
              }`}
            >
              <span className="text-sm">{link.icon}</span>
              <span className="text-sm">{link.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden ${isHomePage ? 'text-blue-900' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
        
        {/* Login Button */}
        <div className="hidden lg:block">
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 z-40 pt-20">
          <div className="flex flex-col items-center py-8 space-y-6">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-3 text-white font-semibold text-lg py-3 px-6 rounded-lg transition-all duration-200 ${
                  location.pathname === link.href 
                    ? 'bg-white/20 text-yellow-200' 
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow hover:bg-gray-100 transition mt-8">
              Ingresar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;