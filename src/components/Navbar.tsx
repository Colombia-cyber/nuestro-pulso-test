import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full content-overlay py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">Nuestro Pulso</span>
      </div>
      <div className="flex gap-8">
        <a href="/" className="text-blue-900 font-semibold hover:text-blue-600 transition flex items-center gap-2">
          <span>🏠</span>
          <span>Inicio</span>
        </a>
        <a href="/noticias" className="text-blue-900 font-semibold hover:text-blue-600 transition flex items-center gap-2">
          <span>📰</span>
          <span>Noticias</span>
        </a>
        <a href="/encuestas" className="text-blue-900 font-semibold hover:text-blue-600 transition flex items-center gap-2">
          <span>📊</span>
          <span>Encuestas</span>
        </a>
        <a href="/debates" className="text-blue-900 font-semibold hover:text-blue-600 transition flex items-center gap-2">
          <span>🗣️</span>
          <span>Debates</span>
        </a>
        <a href="/reels" className="text-blue-900 font-semibold hover:text-blue-600 transition flex items-center gap-2">
          <span>🎬</span>
          <span>Reels</span>
        </a>
      </div>
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          Ingresar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;