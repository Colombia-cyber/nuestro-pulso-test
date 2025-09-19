import React, { useState } from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import Comments from "../components/Comments";
import { NewsTopic } from "../config/newsTopics";

const SearchPage: React.FC = () => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || 'local';
  const initialTopic = urlParams.get('topic') || '';

  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [currentCategory, setCurrentCategory] = useState<'local' | 'world'>(initialCategory as 'local' | 'world');
  const [currentTopic, setCurrentTopic] = useState<NewsTopic | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string, category: 'local' | 'world', topic?: NewsTopic) => {
    setCurrentQuery(query);
    setCurrentCategory(category);
    setCurrentTopic(topic || null);
    
    // Mock search results - in real app this would come from API
    const mockResults = [
      {
        id: 1,
        title: `Resultados para "${query}" en ${category === 'local' ? 'Colombia' : 'el mundo'}`,
        summary: `Se encontraron múltiples artículos relevantes para tu búsqueda${topic ? ` en la categoría ${topic.name}` : ''}.`,
        category: topic?.id || category,
        timestamp: new Date().toISOString(),
        author: 'Redacción',
        source: category === 'local' ? 'Nuestro Pulso Colombia' : 'Nuestro Pulso Internacional'
      }
    ];
    
    setSearchResults(mockResults);
    
    // Update URL
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('category', category);
    if (topic) params.set('topic', topic.id);
    window.history.replaceState(null, '', `/search?${params.toString()}`);
  };

  const handleTopicSelect = (topic: NewsTopic) => {
    setCurrentTopic(topic);
  };

  const handleArticleClick = (result: any) => {
    setSelectedArticle(result);
    setShowComments(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-8 mb-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🔍</span>
              <div>
                <h1 className="text-3xl font-bold">Búsqueda Universal</h1>
                <p className="text-white/90">Explora toda la información cívica y política de Colombia y el mundo</p>
              </div>
              <span className="text-4xl ml-auto">🌍</span>
            </div>
          </div>

          <UniversalSearchBar 
            onSearch={handleSearch}
            onTopicSelect={handleTopicSelect}
            autoFocus={!!initialQuery}
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📊 Resultados de búsqueda
                </h2>
                <p className="text-gray-600 mb-4">
                  Búsqueda: "{currentQuery}" • Categoría: {currentCategory === 'local' ? 'Colombia' : 'Mundo'}
                  {currentTopic && ` • Tema: ${currentTopic.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map((result) => (
                  <div 
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleArticleClick(result)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {result.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {result.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {result.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Por {result.author} • {result.source}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        💬 Comentar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Modal */}
          {showComments && selectedArticle && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    💬 Comentarios del artículo
                  </h2>
                  <button 
                    onClick={() => setShowComments(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedArticle.title}
                    </h3>
                    <p className="text-gray-600">
                      {selectedArticle.summary}
                    </p>
                  </div>
                  <Comments 
                    articleId={selectedArticle.id}
                    articleTitle={selectedArticle.title}
                  />
                </div>
              </div>
            </div>
          )}

          {/* No Results */}
          {currentQuery && searchResults.length === 0 && (
            <div className="mt-8 text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta con otros términos de búsqueda o explora diferentes categorías
              </p>
            </div>
          )}

          {/* Welcome State */}
          {!currentQuery && (
            <div className="mt-8 text-center py-16">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Búsqueda Universal Lista
              </h3>
              <p className="text-gray-600 mb-6">
                Busca cualquier tema en Colombia y el mundo. Utiliza los filtros por tema para resultados más precisos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;