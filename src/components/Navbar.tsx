import React, { useState } from "react";
import UniversalSearchBar from "./UniversalSearchBar";

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleNavClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
          <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
        </div>
        
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>🏠</span>
            <span>Inicio</span>
          </button>
          <button 
            onClick={() => handleNavClick('news')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>📰</span>
            <span>Noticias</span>
          </button>
          <button 
            onClick={() => handleNavClick('community-hub')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>💭</span>
            <span>Community Hub</span>
          </button>
          <button 
            onClick={() => handleNavClick('encuestas')}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>📊</span>
            <span>Encuestas</span>
          </button>
          <button 
            onClick={() => setShowSearchModal(true)}
            className="text-blue-900 font-medium hover:text-blue-600 transition flex items-center gap-1"
          >
            <span>🔍</span>
            <span>Buscar</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Google"
            >
              🌐
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="YouTube"
            >
              📺
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              title="Twitter"
            >
              🐦
            </a>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">🔍 Búsqueda Google</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <UniversalSearchBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;