import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "🏠 Inicio", icon: "🏠" },
    { path: "/noticias", label: "📰 Noticias", icon: "📰" },
    { path: "/encuestas", label: "📊 Encuestas", icon: "📊" },
    { path: "/debates", label: "🗣️ Debates", icon: "🗣️" },
    { path: "/reels", label: "🎬 Reels", icon: "🎬" }
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50 border-b border-white/20">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-colombia-blue">Nuestro Pulso</span>
      </div>
      
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
              isActive(link.path)
                ? "text-white bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red shadow-lg scale-105"
                : "text-blue-900 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
          Ingresar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;