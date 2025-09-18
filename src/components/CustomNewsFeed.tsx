import React, { useState } from 'react';
import NewsDashboard from './NewsDashboard';
import { NewsItem } from '../types/news';

interface CustomNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
}

const CustomNewsFeed: React.FC<CustomNewsFeedProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
    
    // Call the onNavigate prop if provided
    if (onNavigate) {
      onNavigate('article', article.id);
    }
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen">
      {/* Main News Dashboard */}
      <NewsDashboard
        onArticleClick={handleArticleClick}
        showBreakingNews={true}
        enableLiveUpdates={true}
      />

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🇨🇴
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Artículo Completo</h2>
                  <p className="text-sm text-gray-600">
                    {typeof selectedArticle.source === 'string' ? selectedArticle.source : selectedArticle.source.name}
                  </p>
                </div>
              </div>
              <button
                onClick={closeArticleModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-gray-500 text-xl">✕</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Article Image */}
              {selectedArticle.imageUrl && (
                <div className="mb-6">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Article Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedArticle.category}
                  </span>
                  {selectedArticle.trending && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🔥 Trending
                    </span>
                  )}
                  {selectedArticle.isBreaking && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      🚨 Última Hora
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>👤 {selectedArticle.author || 'Redacción'}</span>
                    <span>📖 {selectedArticle.readTime || '5 min'}</span>
                    <span>📅 {new Date(selectedArticle.publishedAt).toLocaleDateString('es-CO')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedArticle.viewCount && (
                      <span>👁️ {selectedArticle.viewCount.toLocaleString()}</span>
                    )}
                    {selectedArticle.likeCount && (
                      <span>❤️ {selectedArticle.likeCount}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Mock Article Content */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contenido Completo</h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Este artículo proporciona un análisis completo sobre "{selectedArticle.title}". 
                    La información presentada ha sido verificada por múltiples fuentes y ofrece 
                    una perspectiva balanceada del tema.
                  </p>
                  
                  <p className="mb-4">
                    <strong>Contexto:</strong> {selectedArticle.summary}
                  </p>

                  <p className="mb-4">
                    Los expertos señalan que este desarrollo tendrá implicaciones significativas 
                    para el panorama político y social colombiano. Es importante considerar 
                    múltiples perspectivas para comprender completamente las ramificaciones 
                    de estos eventos.
                  </p>

                  <p className="mb-4">
                    <strong>Impacto Nacional:</strong> Este tema afecta directamente a la ciudadanía 
                    colombiana y requiere atención continua de los medios de comunicación y 
                    las autoridades competentes.
                  </p>

                  <p className="mb-4">
                    Para mantenerse actualizado sobre este y otros temas relevantes, 
                    continúe siguiendo Nuestro Pulso, la plataforma cívica líder de Colombia.
                  </p>
                </div>
              </div>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors">
                    <span>❤️</span>
                    <span>Me gusta</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                    <span>📤</span>
                    <span>Compartir</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <span>🔖</span>
                    <span>Guardar</span>
                  </button>
                </div>
                
                {selectedArticle.url && (
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Leer Original
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNewsFeed;