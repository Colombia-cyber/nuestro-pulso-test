import React, { useState } from 'react';

interface InstantUniversalSearchBarProps {
  onSearch?: (query: string) => void;
}

const InstantUniversalSearchBar: React.FC<InstantUniversalSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      // Generate instant suggestions based on Colombian civic topics
      setResults([
        `Resultado instantáneo para: ${value}`,
        `${value} - Noticias de Colombia`,
        `${value} - Debates políticos`,
        `${value} - Encuestas ciudadanas`,
        `${value} - Congreso de Colombia`,
        `${value} - Elecciones Colombia`,
      ]);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const searchTerm = suggestion.split(' ').slice(-1)[0]; // Get the last word which should be the search term
    setQuery(searchTerm);
    setResults([]);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Buscar cualquier tema al instante..."
          value={query}
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-white border-opacity-30 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-200 pr-20 placeholder-gray-600"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg"
        >
          🔍 Buscar
        </button>
      </form>
      
      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white bg-opacity-95 backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-30 overflow-hidden z-50">
          <ul className="max-h-80 overflow-y-auto">
            {results.map((result, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(result)}
                className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 text-gray-800"
              >
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">🔍</span>
                  {result}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstantUniversalSearchBar;