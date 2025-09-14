import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import LoginModal from "./LoginModal";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Inicio", icon: "🏠" },
    { path: "/news", label: "Noticias", icon: "📰" },
    { path: "/congress", label: "Congreso", icon: "🏛️" },
    { path: "/analytics", label: "Pulso", icon: "📊" },
    { path: "/chat", label: "Chat", icon: "💬" },
    { path: "/debate", label: "Debates", icon: "🗣️" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-lg py-4 px-6 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-6 bg-yellow-400 rounded-sm"></div>
            <div className="w-2 h-6 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
          </div>
          <span className="font-bold text-xl text-gray-800">🇨🇴 Nuestro Pulso</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                isActive(link.path)
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Hola, {user.displayName || user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
            >
              Ingresar
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white shadow-lg z-40 border-t">
          <div className="p-4">
            <div className="md:hidden mb-4">
              <SearchBar />
            </div>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Navbar;