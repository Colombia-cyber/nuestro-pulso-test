import React from "react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'news', label: 'Noticias', icon: '📰' },
    { id: 'debates', label: 'Debates', icon: '🗣️' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'surveys', label: 'Encuestas', icon: '📊' }
  ];

  return (
    <nav className="w-full bg-white shadow-lg py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
      </div>
      
      <div className="flex gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-900 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      
      <div>
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
          Ingresar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;