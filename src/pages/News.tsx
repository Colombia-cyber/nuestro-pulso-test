import React, { useState } from 'react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: '📰' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economy', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'environment', name: 'Ambiente', icon: '🌿' },
  ];

  const news = [
    {
      id: 1,
      title: 'Congreso aprueba primera ponencia de reforma tributaria',
      summary: 'La Comisión Tercera de la Cámara de Representantes dio luz verde al proyecto de ley que busca incrementar los ingresos fiscales del país.',
      category: 'politics',
      author: 'El Tiempo',
      time: '2 horas',
      verified: true,
      image: '🏛️',
      reactions: { likes: 234, comments: 89, shares: 45 }
    },
    {
      id: 2,
      title: 'Nueva política ambiental para la protección del Amazonas',
      summary: 'El Ministerio de Ambiente presenta un plan integral para combatir la deforestación en la región amazónica.',
      category: 'environment',
      author: 'Semana',
      time: '4 horas',
      verified: true,
      image: '🌳',
      reactions: { likes: 567, comments: 123, shares: 78 }
    },
    {
      id: 3,
      title: 'Inflación en Colombia muestra signos de estabilización',
      summary: 'Según el DANE, la inflación mensual se ubicó en 0.3%, por debajo de las expectativas del mercado.',
      category: 'economy',
      author: 'Portafolio',
      time: '6 horas',
      verified: true,
      image: '📊',
      reactions: { likes: 189, comments: 56, shares: 34 }
    },
    {
      id: 4,
      title: 'Programa de vivienda social beneficiará a 50,000 familias',
      summary: 'El gobierno nacional anuncia nueva convocatoria para acceso a vivienda de interés social en todo el territorio nacional.',
      category: 'social',
      author: 'RCN Noticias',
      time: '8 horas',
      verified: true,
      image: '🏠',
      reactions: { likes: 445, comments: 167, shares: 99 }
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📰 Noticias Verificadas
              </h1>
              <p className="text-gray-600">
                Información confiable y verificada sobre Colombia
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium">En vivo</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex items-center gap-2">
                    {article.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        ✓ Verificado
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{article.author}</span>
                    <span>•</span>
                    <span>{article.time}</span>
                  </div>
                </div>

                {/* Reactions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <span>👍</span>
                    <span>{article.reactions.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                    <span>💬</span>
                    <span>{article.reactions.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-colors">
                    <span>🔄</span>
                    <span>{article.reactions.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Cargar más noticias
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;