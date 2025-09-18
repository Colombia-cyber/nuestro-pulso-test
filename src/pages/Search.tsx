import React, { useState } from "react";
import DualSearchBar from "../components/DualSearchBar";
import Comments from "../components/Comments";
import { SearchResponse } from "../services/searchService";

const SearchPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);

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
        {/* Enhanced Dual Search */}
        <DualSearchBar 
          onResults={handleSearchResults}
          onArticleClick={handleArticleClick}
        />

        {/* Instant Comment Modal */}
        {showComments && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="mr-2">💬</span>
                    Comentarios Instantáneos
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Los comentarios se envían automáticamente al Community Hub
                  </p>
                </div>
                <button 
                  onClick={() => setShowComments(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar comentarios"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                {/* Article summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{selectedArticle.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{selectedArticle.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{selectedArticle.summary}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <span>📰</span>
                          <span>{selectedArticle.source}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>📂</span>
                          <span>{selectedArticle.category}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>⭐</span>
                          <span>{selectedArticle.relevanceScore}% relevancia</span>
                        </span>
                        {selectedArticle.engagement && (
                          <>
                            <span className="flex items-center space-x-1">
                              <span>👁️</span>
                              <span>{selectedArticle.engagement.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>💬</span>
                              <span>{selectedArticle.engagement.comments.toLocaleString()}</span>
                            </span>
                          </>
                        )}
                      </div>
                      
                      {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {selectedArticle.tags.map((tag: string, index: number) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Comments component */}
                <Comments 
                  articleId={parseInt(selectedArticle.id.replace(/\D/g, '') || '1')} 
                  articleTitle={selectedArticle.title}
                />
              </div>
            </div>
          </div>
        )}

        {/* Search Statistics */}
        {searchResults && searchResults.results.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Estadísticas de Búsqueda
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{searchResults.totalResults}</div>
                <div className="text-sm text-blue-800">Resultados totales</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {searchResults.results.filter(r => (r as any).source_type === 'global').length}
                </div>
                <div className="text-sm text-green-800">Resultados globales</div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {searchResults.results.filter(r => (r as any).source_type === 'local').length}
                </div>
                <div className="text-sm text-yellow-800">Resultados Colombia</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{searchResults.searchTime}ms</div>
                <div className="text-sm text-purple-800">Tiempo de búsqueda</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;