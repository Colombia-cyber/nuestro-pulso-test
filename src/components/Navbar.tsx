import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiBarChart, FiMessageCircle, FiPlay, FiSearch, FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === "/" && location.pathname === "/inicio");
  };

  const navItems = [
    { path: "/", icon: FiHome, label: "Inicio", emoji: "🏠" },
    { path: "/noticias", icon: FiFileText, label: "Noticias", emoji: "📰" },
    { path: "/encuestas", icon: FiBarChart, label: "Encuestas", emoji: "📊" },
    { path: "/debates", icon: FiMessageCircle, label: "Debates", emoji: "🗣️" },
    { path: "/reels", icon: FiPlay, label: "Reels", emoji: "🎬" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img 
          src="/colombia-flag.png" 
          alt="Colombia Flag" 
          className="w-10 h-7 rounded shadow-sm" 
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='28' viewBox='0 0 40 28'%3E%3Crect width='40' height='14' fill='%23FCDD09'/%3E%3Crect y='14' width='40' height='7' fill='%230033A0'/%3E%3Crect y='21' width='40' height='7' fill='%23EF3340'/%3E%3C/svg%3E";
          }}
        />
        <span className="font-bold text-lg text-yellow-700 hover:text-yellow-600 transition-colors">
          Nuestro Pulso
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-blue-900 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Right side - Search and Login */}
      <div className="flex items-center gap-3">
        {/* Search button */}
        <Link
          to="/buscar"
          className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          title="Buscar"
        >
          <FiSearch className="w-5 h-5" />
        </Link>

        {/* Login button */}
        <button className="hidden md:block bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition-transform duration-200">
          Ingresar
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-40">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 w-full ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-blue-900 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/buscar"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-blue-900 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full"
              >
                <FiSearch className="w-5 h-5" />
                <span>Buscar</span>
              </Link>
              <button className="w-full mt-2 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-3 rounded-lg font-bold">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;