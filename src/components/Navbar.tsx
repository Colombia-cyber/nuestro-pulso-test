import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "Inicio", icon: "🏠" },
    { href: "/chat", label: "Chat", icon: "💬" },
    { href: "/debates", label: "Debates", icon: "🗣️" },
    { href: "/encuestas", label: "Encuestas", icon: "📊" },
    { href: "/noticias", label: "Noticias", icon: "📰" },
    { href: "/congreso", label: "Congreso", icon: "🏛️" },
    { href: "/mercado", label: "Mercado", icon: "🛒" },
    { href: "/cuidado", label: "Cuidado", icon: "❤️" },
    { href: "/ia", label: "IA", icon: "🤖" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl py-2' : 'bg-white/95 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-8 bg-colombia-flag flag-wave rounded shadow-md"></div>
            <span className="font-black text-xl gradient-text">Nuestro Pulso</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-colombia-blue font-medium transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Search & Auth */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiSearch className="w-5 h-5 text-gray-600" />
            </button>

            {/* Login Button */}
            <button className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              <FiUser className="w-4 h-4" />
              <span>Ingresar</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-4 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar noticias, debates, encuestas..."
                className="w-full px-4 py-2 pl-10 pr-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-colombia-blue"
                autoFocus
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 glass rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 p-3 rounded-xl hover:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white font-medium">{item.label}</span>
                </a>
              ))}
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white py-3 rounded-xl font-bold">
              Ingresar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;