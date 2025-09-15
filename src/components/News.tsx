import React, { useState } from 'react';
import { newsArticles, getNewsByCategory, getNewsByTopic, getTrendingNews, searchNews, type NewsArticle } from '../data/newsData';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'donald-trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'economics', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'environment', name: 'Ambiente', icon: '🌱' },
    { id: 'technology', name: 'Tecnología', icon: '💻' },
    { id: 'health', name: 'Salud', icon: '🏥' },
    { id: 'international', name: 'Internacional', icon: '🌍' },
    { id: 'sports', name: 'Deportes', icon: '⚽' }
  ];

  const getFilteredNews = (): NewsArticle[] => {
    if (searchQuery.trim()) {
      return searchNews(searchQuery);
    }
    if (selectedCategory === 'todas') {
      return newsArticles;
    }
    if (selectedCategory === 'donald-trump') {
      return getNewsByTopic('Donald Trump');
    }
    return getNewsByCategory(selectedCategory);
  };

  const filteredNews = getFilteredNews();
  const trending = getTrendingNews(3);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Volver a noticias
            </button>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className={`px-3 py-1 rounded-full text-white ${
                selectedArticle.category === 'politics' ? 'bg-blue-500' :
                selectedArticle.category === 'economics' ? 'bg-green-500' :
                selectedArticle.category === 'social' ? 'bg-purple-500' :
                'bg-gray-500'
              }`}>
                {selectedArticle.category}
              </span>
              <span>{selectedArticle.source?.name}</span>
              <span>•</span>
              <span>{new Date(selectedArticle.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>5 min de lectura</span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-6xl text-center mb-6">📰</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Engagement */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                      <span>👍</span>
                      <span>{selectedArticle.engagement.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
                      <span>📤</span>
                      <span>{selectedArticle.engagement.shares}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition">
                      <span>💬</span>
                      <span>{selectedArticle.engagement.comments}</span>
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Compartir
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related articles */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsArticles
                .filter(article => article.id !== selectedArticle.id && article.category === selectedArticle.category)
                .slice(0, 3)
                .map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-2xl mb-2">📰</div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias Cívicas</h1>
          <p className="text-white/90">Mantente informado sobre los temas que afectan a Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔄 Actualizado cada hora</span>
            <span>✅ Fuentes verificadas</span>
            <span>📊 Análisis de impacto cívico</span>
            <span>🌟 {filteredNews.length} artículos</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar noticias por tema, palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trending News */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">🔥 Trending</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white/10 backdrop-blur rounded-lg p-4 cursor-pointer hover:bg-white/20 transition"
              >
                <h4 className="text-white font-semibold mb-2 line-clamp-2">{article.title}</h4>
                <p className="text-white/80 text-sm line-clamp-2">{article.description}</p>
                <div className="mt-2 flex items-center space-x-2 text-white/70 text-xs">
                  <span>👍 {article.engagement.likes}</span>
                  <span>📤 {article.engagement.shares}</span>
                  <span>💬 {article.engagement.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {filteredNews.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">📰</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'politics' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'economics' ? 'bg-green-100 text-green-800' :
                        article.category === 'health' ? 'bg-red-100 text-red-800' :
                        article.category === 'technology' ? 'bg-purple-100 text-purple-800' :
                        article.category === 'environment' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name || article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.source.name}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedArticle(article)}>
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600">
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-purple-600">
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Leer artículo completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron noticias</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No hay resultados para "${searchQuery}". Intenta con otros términos.`
                : `No hay noticias disponibles para la categoría seleccionada.`
              }
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todas las noticias
            </button>
          </div>
        )}

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#DonaldTrump',
              '#CongresoDecolombia',
              '#ReformaTributaria',
              '#TransportePublico',
              '#EducacionDigital',
              '#CambioClimatico',
              '#SeguridadCiudadana',
              '#PazTotal',
              '#DesarrolloRural',
              '#InnovacionTecnologica'
            ].map((hashtag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(hashtag.slice(1))}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {hashtag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;