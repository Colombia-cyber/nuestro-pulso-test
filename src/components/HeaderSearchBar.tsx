import React, { useState, useRef } from 'react';
import UniversalSearchBar from './UniversalSearchBar';

interface HeaderSearchBarProps {
  onNavigateToSearch?: () => void;
}

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({ onNavigateToSearch }) => {
  const [activeSearch, setActiveSearch] = useState<'local' | 'google'>('local');
  const [localQuery, setLocalQuery] = useState('');
  const [googleQuery, setGoogleQuery] = useState('');
  const localInputRef = useRef<HTMLInputElement>(null);
  const googleInputRef = useRef<HTMLInputElement>(null);

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim() && onNavigateToSearch) {
      onNavigateToSearch();
    }
  };

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (googleQuery.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(googleQuery + ' colombia politica noticias')}`;
      window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-3 max-w-2xl mx-auto">
      {/* Search Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveSearch('local')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            activeSearch === 'local'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          🏠 Local
        </button>
        <button
          onClick={() => setActiveSearch('google')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            activeSearch === 'google'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          type="button"
        >
          🌐 Google
        </button>
      </div>

      {/* Search Input Area */}
      <div className="flex-1 relative">
        {activeSearch === 'local' ? (
          <form onSubmit={handleLocalSearch} className="flex">
            <input
              ref={localInputRef}
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Buscar en Nuestro Pulso..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              aria-label="Búsqueda local en Nuestro Pulso"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Buscar localmente"
            >
              🔍
            </button>
          </form>
        ) : (
          <form onSubmit={handleGoogleSearch} className="flex">
            <input
              ref={googleInputRef}
              value={googleQuery}
              onChange={(e) => setGoogleQuery(e.target.value)}
              placeholder="Buscar en Google sobre Colombia..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
              aria-label="Búsqueda en Google"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Buscar en Google"
            >
              🌐
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HeaderSearchBar;