import React, { useState } from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import Comments from "../components/Comments";
import { SearchResponse } from "../services/searchService";

const SearchPage: React.FC = () => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || 'todos';

  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);

  const handleSearchResults = (response: SearchResponse) => {
    setSearchResults(response);
  };

  const handleArticleClick = (result: any) => {
    setSelectedArticle(result);
    setShowComments(true);
  };

  const handleCommentSubmit = (comment: any) => {
    // Auto-send to Community Hub categorized by topic
    console.log('Sending comment to Community Hub:', {
      comment,
      articleId: selectedArticle?.id,
      articleTitle: selectedArticle?.title,
      category: selectedArticle?.category
    });
    
    // Save to localStorage for Community Hub integration
    const communityComments = JSON.parse(localStorage.getItem('communityComments') || '[]');
    const newComment = {
      ...comment,
      articleId: selectedArticle?.id,
      articleTitle: selectedArticle?.title,
      category: selectedArticle?.category,
      timestamp: new Date().toISOString()
    };
    communityComments.push(newComment);
    localStorage.setItem('communityComments', JSON.stringify(communityComments));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Búsqueda Universal</h1>
          <p className="text-white/90">
            Encuentra información, comenta instantáneamente y participa en la conversación
          </p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>⚡ Búsqueda en tiempo real</span>
            <span>💬 Comentarios instantáneos</span>
            <span>🌐 Fuentes verificadas</span>
          </div>
        </div>

        <UniversalSearchBar 
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          onResults={handleSearchResults}
        />

        {/* Enhanced Search Results with Comment Integration */}
        {searchResults && searchResults.results.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💬 Resultados con Comentarios Instantáneos
              </h3>
              <p className="text-gray-600 text-sm">
                Haz clic en cualquier resultado para comentar instantáneamente. 
                Los comentarios se envían automáticamente al Community Hub.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.results.map((result) => (
                <div 
                  key={result.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500"
                  onClick={() => handleArticleClick(result)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {result.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        💬 Comentar
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
                      {result.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {result.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{result.source}</span>
                        <span>•</span>
                        <span>{new Date(result.timestamp).toLocaleDateString('es-CO')}</span>
                      </div>
                      <span className="text-blue-600 font-medium">
                        Relevancia: {result.relevanceScore}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instant Comment Modal */}
        {showComments && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">💬 Comentarios Instantáneos</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Los comentarios se envían automáticamente al Community Hub
                  </p>
                </div>
                <button 
                  onClick={() => setShowComments(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                  aria-label="Cerrar comentarios"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedArticle.title}</h3>
                  <p className="text-gray-600 text-sm">{selectedArticle.summary}</p>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>📰 {selectedArticle.source}</span>
                    <span>📂 {selectedArticle.category}</span>
                    <span>⭐ {selectedArticle.relevanceScore}% relevancia</span>
                  </div>
                </div>
                
                <Comments 
                  articleId={parseInt(selectedArticle.id)} 
                  articleTitle={selectedArticle.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;