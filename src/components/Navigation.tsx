import React from "react";

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navigationItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'debates', label: 'Debates', icon: '🗣️' },
    { id: 'surveys', label: 'Encuestas', icon: '📊' },
    { id: 'news', label: 'Noticias', icon: '📰' }
  ];

  const handleNavigation = (view: string) => {
    try {
      onNavigate(view);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-8 flex flex-row items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-2 bg-yellow-400 rounded-sm"></div>
          <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
          <div className="w-3 h-2 bg-red-500 rounded-sm"></div>
        </div>
        <span className="font-bold text-lg text-yellow-700">Nuestro Pulso</span>
      </div>
      
      <div className="hidden md:flex gap-6">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentView === item.id
                ? 'bg-blue-100 text-blue-900 shadow-sm'
                : 'text-blue-900 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <select
          value={currentView}
          onChange={(e) => handleNavigation(e.target.value)}
          className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow text-sm"
        >
          {navigationItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.icon} {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Login button */}
      <div className="hidden md:block">
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition-transform duration-200">
          Ingresar
        </button>
      </div>
    </nav>
  );
};

export default Navigation;