import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/chat", label: "Chat", icon: "💬" },
    { path: "/debate", label: "Debate", icon: "🗣️" },
    { path: "/survey", label: "Survey", icon: "📊" },
    { path: "/news", label: "News", icon: "📰" },
  ];

  return (
    <nav className="w-full bg-white shadow-lg py-4 px-4 md:px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50 border-b-4 border-gradient-to-r border-yellow-400">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {/* Colombian flag colors circle */}
          <div className="flex space-x-1 mr-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <span className="font-bold text-xl text-gray-800">🇨🇴</span>
        </div>
        <div>
          <span className="font-bold text-xl text-gray-800">Nuestro Pulso</span>
          <div className="text-xs text-gray-500 font-medium">Futuro Colombia</div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 ${
              isActive(item.path)
                ? "bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Login Button */}
      <div className="hidden md:block">
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">
          Ingresar
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2">
              <button className="w-full bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;