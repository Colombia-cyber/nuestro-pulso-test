import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  link: string;
  source: string;
  type: 'web' | 'news' | 'video';
  thumbnail?: string;
  publishedAt?: string;
}

const SearchResults: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      // Simulate loading and populate with results
      setLoading(true);
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: `Análisis completo sobre ${decodeURIComponent(query)}`,
            snippet: `Información detallada y análisis profundo sobre ${decodeURIComponent(query)} en el contexto político y social de Colombia.`,
            link: '#',
            source: 'Nuestro Pulso',
            type: 'web'
          }
        ];
        setResults(mockResults);
        setLoading(false);
      }, 1000);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Resultados para: "{decodeURIComponent(query || '')}"
      </h1>
      
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{result.title}</h3>
            <p className="text-gray-700 mb-4">{result.snippet}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>📍 {result.source}</span>
              <a href={result.link} className="text-blue-600 hover:text-blue-800">
                Ver más →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;