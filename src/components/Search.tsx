import React, { useState } from 'react';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Búsqueda Cívica</h1>
          <p className="text-white/90">Encuentra información, debates, noticias y recursos</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar debates, noticias, encuestas, congresistas..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              🔍 Buscar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">🏛️ Buscar en Congreso</h3>
            <p className="text-sm text-gray-600">Proyectos de ley, votaciones, congresistas</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">📰 Buscar Noticias</h3>
            <p className="text-sm text-gray-600">Artículos verificados por categoría</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;