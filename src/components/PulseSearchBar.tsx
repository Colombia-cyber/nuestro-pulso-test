import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaFilter } from 'react-icons/fa';

interface PulseSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const PulseSearchBar: React.FC<PulseSearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar noticias, debates, usuarios, contenido..." 
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-CO';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Lo siento, tu navegador no soporta reconocimiento de voz.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 z-10">
            <FaSearch className="text-gray-400 w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-3 border-2 border-gray-200 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
          
          <div className="absolute right-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Búsqueda por voz"
            >
              <FaMicrophone className="w-4 h-4" />
            </button>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
              title="Filtros de búsqueda"
            >
              <FaFilter className="w-4 h-4" />
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Buscar
            </button>
          </div>
        </div>
        
        {/* Quick Search Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Últimas noticias',
            'Debates actuales',
            'Elecciones 2024',
            'Congreso Colombia',
            'Encuestas',
            'Alertas ciudadanas'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
      
      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border">
          <h4 className="font-semibold text-gray-800 mb-3">Filtros de Búsqueda</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Contenido
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Todos</option>
                <option value="news">Noticias</option>
                <option value="posts">Publicaciones</option>
                <option value="reels">Reels</option>
                <option value="users">Usuarios</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Cualquier fecha</option>
                <option value="24h">Últimas 24 horas</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="year">Este año</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Todas</option>
                <option value="politica">Política</option>
                <option value="economia">Economía</option>
                <option value="social">Social</option>
                <option value="educacion">Educación</option>
                <option value="salud">Salud</option>
                <option value="medio-ambiente">Medio Ambiente</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                // Apply filters logic here
                setShowFilters(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PulseSearchBar;