import React, { useState } from "react";

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      onNavigate && onNavigate(`search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between fixed top-0 left-0 z-50 gap-3 lg:gap-0">
      {/* Top row on mobile, left side on desktop */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-8 h-6 lg:w-10 lg:h-7" />
          <span className="font-bold text-lg lg:text-xl text-yellow-700">Nuestro Pulso</span>
        </div>
        
        {/* Mobile menu toggle could go here if needed */}
      </div>
      
      {/* Search bar - always visible, responsive */}
      <div className="w-full lg:flex-1 lg:max-w-md lg:mx-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar noticias, debates, políticos..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm lg:text-base"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>
      </div>

      {/* Navigation and right side */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-4">
        {/* Navigation links */}
        <div className="flex gap-2 lg:gap-4 items-center overflow-x-auto">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm"
          >
            <span>🏠</span>
            <span className="hidden sm:inline">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('news')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm"
          >
            <span>📰</span>
            <span className="hidden sm:inline">Noticias</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm"
          >
            <span>💭</span>
            <span className="hidden sm:inline">Hub</span>
          </button>
          <button 
            onClick={() => handleNavClick('encuestas')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm"
          >
            <span>📊</span>
            <span className="hidden sm:inline">Encuestas</span>
          </button>
          <button 
            onClick={() => handleNavClick('pulse-reels')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1 whitespace-nowrap text-xs lg:text-sm"
          >
            <span>🎬</span>
            <span className="hidden sm:inline">Reels</span>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Social Icons - hidden on small screens */}
          <div className="hidden md:flex items-center gap-2">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl lg:text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="YouTube"
            >
              📺
            </a>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-bold shadow hover:scale-105 transition text-xs lg:text-sm">
            Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;