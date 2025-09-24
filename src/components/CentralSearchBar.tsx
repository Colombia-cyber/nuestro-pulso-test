import React from 'react';
import UniversalSearchBar from './UniversalSearchBar';

interface CentralSearchBarProps {
  onNavigate?: (view: string) => void;
}

const CentralSearchBar: React.FC<CentralSearchBarProps> = ({ onNavigate }) => {
  const handleSearch = (query: string, category: 'local' | 'world', topic?: any) => {
    // Navigate to search with parameters
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('category', category);
    if (topic) params.set('topic', topic.id);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    if (onNavigate) {
      onNavigate('search');
    }
  };

  const handleTopicSelect = (topic: any) => {
    console.log('Topic selected:', topic);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Central heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Busca en el Pulso de Colombia
          </h2>
          <p className="text-gray-600 text-lg">
            Encuentra noticias, reels, debates y tendencias cívicas en tiempo real
          </p>
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <UniversalSearchBar 
              onSearch={handleSearch}
              onTopicSelect={handleTopicSelect}
              placeholder="Buscar noticias, reels, debates, candidatos, propuestas..."
              className="shadow-xl"
            />
          </div>
        </div>

        {/* Quick access buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button 
            onClick={() => onNavigate?.('reels')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🎬 Reels en Vivo
          </button>
          <button 
            onClick={() => onNavigate?.('feeds')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            📰 Noticias
          </button>
          <button 
            onClick={() => onNavigate?.('debates')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            💬 Debates
          </button>
          <button 
            onClick={() => onNavigate?.('surveys')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            📊 Encuestas
          </button>
          <button 
            onClick={() => onNavigate?.('tendencias')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🔥 Tendencias
          </button>
        </div>
      </div>
    </div>
  );
};

export default CentralSearchBar;