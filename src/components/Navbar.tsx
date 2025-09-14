import React, { useState } from "react";

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        <button 
          onClick={() => onNavigate('home')} 
          className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>🏠</span>
          <span>Inicio</span>
        </button>
        <button 
          onClick={() => onNavigate('debates')} 
          className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>🗣️</span>
          <span>Debates</span>
        </button>
        <button 
          onClick={() => onNavigate('news')} 
          className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>📰</span>
          <span>Noticias</span>
        </button>
        <button 
          onClick={() => onNavigate('community')} 
          className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>💬</span>
          <span>Comunidad</span>
        </button>
        <button 
          onClick={() => onNavigate('search')} 
          className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>🔍</span>
          <span>Buscar</span>
        </button>
      </div>
      
      {/* Search and Settings */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate('search')}
          className="hidden md:block bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-200 transition flex items-center gap-2"
        >
          <span>🔍</span>
          <span>Búsqueda Universal</span>
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <span className="text-xl">⚙️</span>
        </button>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
          Ingresar
        </button>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-blue-900"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-3">
            <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">🏠 Inicio</button>
            <button onClick={() => { onNavigate('debates'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">🗣️ Debates</button>
            <button onClick={() => { onNavigate('news'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">📰 Noticias</button>
            <button onClick={() => { onNavigate('community'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">💬 Comunidad</button>
            <button onClick={() => { onNavigate('search'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">🔍 Buscar</button>
            <button onClick={() => { onNavigate('settings'); setIsMenuOpen(false); }} className="text-left text-blue-900 font-medium hover:text-blue-600 transition">⚙️ Configuración</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;