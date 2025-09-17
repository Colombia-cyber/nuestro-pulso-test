import React, { useState } from 'react';

interface DualSearchBarProps {
  onLocalSearch?: (query: string) => void;
  onGoogleSearch?: (query: string) => void;
}

const DualSearchBar: React.FC<DualSearchBarProps> = ({ onLocalSearch, onGoogleSearch }) => {
  const [localQuery, setLocalQuery] = useState('');
  const [googleQuery, setGoogleQuery] = useState('');

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim() && onLocalSearch) {
      onLocalSearch(localQuery.trim());
    }
  };

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (googleQuery.trim()) {
      if (onGoogleSearch) {
        onGoogleSearch(googleQuery.trim());
      } else {
        // Default to opening Google search in new tab
        window.open(`https://www.google.com/search?q=${encodeURIComponent(googleQuery.trim())}`, '_blank');
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔍 Search Options</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">LB</span>
            <span className="font-semibold text-gray-800">Local Search</span>
          </div>
          <form onSubmit={handleLocalSearch} className="flex gap-2">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search local content, news, debates..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
          <p className="text-sm text-gray-600">Search within Nuestro Pulso platform content</p>
        </div>

        {/* Google/World Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">🌐</span>
            <span className="font-semibold text-gray-800">World Search</span>
          </div>
          <form onSubmit={handleGoogleSearch} className="flex gap-2">
            <input
              type="text"
              value={googleQuery}
              onChange={(e) => setGoogleQuery(e.target.value)}
              placeholder="Search the web, news, global topics..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
          <p className="text-sm text-gray-600">Search the web via Google search</p>
        </div>
      </div>
    </div>
  );
};

export default DualSearchBar;