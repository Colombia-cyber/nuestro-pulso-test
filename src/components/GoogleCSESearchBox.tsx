import React, { useState } from 'react';

const GoogleCSESearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Open Google search in a new tab/window
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white border-opacity-30">
        <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
          🌐 Buscar en la Web
        </h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Buscar en Google..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            🔍 Buscar
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Busca información en toda la web usando Google
        </p>
      </div>
    </div>
  );
};

export default GoogleCSESearchBox;