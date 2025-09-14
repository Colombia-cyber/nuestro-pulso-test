import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const EnhancedNavBar = ({ currentView, onViewChange, onCategoryClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', name: 'Inicio', icon: '🏠' },
    { id: 'news', name: 'Noticias', icon: '📰' },
    { id: 'debate', name: 'Debate', icon: '🗣️' },
    { id: 'chat', name: 'Chat', icon: '💬' },
    { id: 'marketplace', name: 'Marketplace', icon: '🛒' },
    { id: 'legislation', name: 'Sala Legislativa', icon: '📜' },
    { id: 'congress', name: 'Congreso Colombiano', icon: '🏛️' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement universal search functionality
      console.log('Searching for:', searchQuery);
      // This would integrate with Google API and News API
    }
  };

  const handleItemClick = (item) => {
    if (['debate', 'chat', 'marketplace', 'legislation', 'congress'].includes(item.id)) {
      onCategoryClick({
        id: item.id,
        name: item.name,
        icon: item.icon,
        color: 'from-blue-500 to-indigo-600'
      });
    } else {
      onViewChange(item.id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/colombia-flag.png" alt="Colombia Flag" className="w-10 h-7" />
            <span className="font-bold text-xl bg-gradient-to-r from-yellow-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
              Nuestro Pulso
            </span>
          </div>

          {/* Universal Search Bar */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isSearchExpanded ? 'w-96' : 'w-64'
          }`}>
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
                placeholder="Buscar contenido, usuarios, debates..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <FaSearch size={12} />
                </button>
              )}
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:scale-105 transform transition-all duration-200">
              Ingresar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar contenido, usuarios, debates..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
              <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-3 rounded-lg font-bold shadow-md mt-4">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavBar;