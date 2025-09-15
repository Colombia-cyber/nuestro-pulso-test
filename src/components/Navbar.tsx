import React from "react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
      </div>
      <div className="flex gap-6">
        <button 
          onClick={() => onNavigate('home')}
          className={`font-medium transition ${currentView === 'home' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
        >
          Inicio
        </button>
        <button 
          onClick={() => onNavigate('polls')}
          className={`font-medium transition flex items-center gap-1 ${currentView === 'polls' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
        >
          <span>📊</span>
          <span>Encuestas</span>
        </button>
        <button 
          onClick={() => onNavigate('news')}
          className={`font-medium transition ${currentView === 'news' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
        >
          Explorar
        </button>
        <button 
          onClick={() => onNavigate('debates')}
          className={`font-medium transition ${currentView === 'debates' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
        >
          Participar
        </button>
        <button 
          onClick={() => onNavigate('home')}
          className={`font-medium transition ${currentView === 'home' ? 'text-blue-600' : 'text-blue-900 hover:text-blue-600'}`}
        >
          Acerca
        </button>
      </div>
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">Ingresar</button>
      </div>
    </nav>
  );
};

export default Navbar;