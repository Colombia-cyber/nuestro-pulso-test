import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { comprehensiveNewsData, getNewsByCategory } from '../data/comprehensiveNewsData';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'derecha', name: 'Right Wing', icon: '🗳️' },
    { id: 'izquierda', name: 'Left Wing', icon: '🌹' },
    { id: 'independiente', name: 'Independiente', icon: '⚖️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' },
    { id: 'terror', name: 'Terror', icon: '🚨' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'tecnologia', name: 'Technology', icon: '💻' }
  ];

  // Simulate loading news articles
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (1% chance)
        if (Math.random() < 0.01) {
          throw new Error('Error al cargar las noticias. Por favor, intenta nuevamente.');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 300 + Math.random() * 700);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Get news based on selected category
  const getFilteredNews = () => {
    return getNewsByCategory(selectedCategory);
  };

  const filteredNews = getFilteredNews();

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar noticias</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );

  // No content state component
  const NoContent = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📰</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No hay noticias disponibles</h3>
      <p className="text-gray-600 mb-6">
        No se encontraron artículos para la categoría seleccionada. 
        Intenta con otra categoría o busca temas específicos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setSelectedCategory('todas')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todas las noticias
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Buscar temas relacionados
        </button>
      </div>
    </div>
  );

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
                selectedArticle.political_lean === 'derecha' ? 'bg-red-500' :
                selectedArticle.political_lean === 'izquierda' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {selectedArticle.political_lean === 'derecha' ? 'Right Wing' :
                 selectedArticle.political_lean === 'izquierda' ? 'Left Wing' : 'Independiente'}
              </span>
              <span>{selectedArticle.source}</span>
              <span>•</span>
              <span>hace {selectedArticle.time}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} de lectura</span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                {selectedArticle.fullContent.split('\n\n').map((paragraph: string, index: number) => (
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
              {filteredNews
                .filter(article => article.id !== selectedArticle.id && article.category === selectedArticle.category)
                .slice(0, 3)
                .map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-2xl mb-2">{article.image}</div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {article.source} • hace {article.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <Comments articleId={selectedArticle.id} articleTitle={selectedArticle.title} />
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
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

        {/* Breaking News */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
              🚨 ÚLTIMO MOMENTO
            </span>
            <p className="text-red-800 font-medium">
              Presidente anuncia nueva inversión de $2 billones para infraestructura rural
            </p>
            <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
              Leer más →
            </button>
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : filteredNews.length === 0 ? (
            <NoContent />
          ) : (
            filteredNews.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                        article.category === 'salud' ? 'bg-red-100 text-red-800' :
                        article.category === 'derecha' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedArticle(article)}>
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
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
          )))}
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ReformaTributaria',
              '#TransportePublico',
              '#EducacionDigital',
              '#CambioClimatico',
              '#SeguridadCiudadana',
              '#PazTotal',
              '#DesarrolloRural'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;