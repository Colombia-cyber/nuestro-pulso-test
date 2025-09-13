import React, { useState } from 'react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<null | any>(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' }
  ];

  const news = [
    {
      id: 1,
      title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '2 horas',
      image: '📚',
      engagement: { likes: 245, shares: 89, comments: 34 },
      fullContent: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos. Este programa histórico busca garantizar el acceso a la educación superior para 50,000 jóvenes colombianos de estratos 1, 2 y 3. La iniciativa incluye no solo el pago de matrículas sino también un subsidio de sostenimiento mensual. El programa comenzará su implementación en el segundo semestre de 2024 y priorizará a estudiantes de zonas rurales y víctimas del conflicto armado.',
      tags: ['educación', 'becas', 'juventud', 'inclusión social']
    },
    {
      id: 2,
      title: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
      summary: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025.',
      category: 'ambiente',
      source: 'Alcaldía de Bogotá',
      time: '4 horas',
      image: '🌱',
      engagement: { likes: 189, shares: 67, comments: 28 },
      fullContent: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025. Las medidas incluyen la ampliación del TransMilenio, la promoción de vehículos eléctricos, el fortalecimiento de ciclorrutas y la implementación de zonas de bajas emisiones. También se establecerán más áreas verdes urbanas y se mejorará el sistema de monitoreo de calidad del aire en tiempo real.',
      tags: ['medio ambiente', 'calidad del aire', 'Bogotá', 'transporte sostenible']
    },
    {
      id: 3,
      title: 'Congreso aprueba en primer debate reforma al sistema de salud',
      summary: 'La reforma busca fortalecer la atención primaria y reducir las barreras de acceso a servicios médicos.',
      category: 'salud',
      source: 'Congreso de la República',
      time: '6 horas',
      image: '🏥',
      engagement: { likes: 156, shares: 92, comments: 78 },
      fullContent: 'La reforma busca fortalecer la atención primaria y reducir las barreras de acceso a servicios médicos. Entre los puntos clave de la reforma se incluye la unificación del sistema de salud, la eliminación de intermediarios financieros, el fortalecimiento de la red pública hospitalaria y la implementación de un nuevo modelo de atención preventiva. La iniciativa también contempla mejoras salariales para el personal médico y la ampliación de cobertura en zonas rurales.',
      tags: ['salud', 'reforma', 'congreso', 'atención primaria']
    },
    {
      id: 4,
      title: 'Colombia firma acuerdo de cooperación tecnológica con Corea del Sur',
      summary: 'El acuerdo facilitará la transferencia de tecnología y promoverá la innovación en sectores clave.',
      category: 'economia',
      source: 'Cancillería',
      time: '8 horas',
      image: '🤝',
      engagement: { likes: 203, shares: 45, comments: 19 },
      fullContent: 'El acuerdo facilitará la transferencia de tecnología y promoverá la innovación en sectores clave. Este convenio bilateral abarca colaboración en tecnologías 5G, inteligencia artificial, biotecnología y energías renovables. Se establecerán programas de intercambio académico y empresarial, con inversión conjunta de $500 millones de dólares durante los próximos cinco años. El acuerdo también incluye la creación de un centro de innovación tecnológica en Medellín.',
      tags: ['economía', 'tecnología', 'cooperación internacional', 'innovación']
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  const handleEngagement = (articleId: number, type: 'likes' | 'shares' | 'comments') => {
    // Simulate engagement interaction
    console.log(`User ${type} article ${articleId}`);
    // In a real app, this would update the backend
  };

  const handleHashtagClick = (hashtag: string) => {
    // Simulate hashtag search/filter
    console.log(`Searching for: ${hashtag}`);
    // In a real app, this could filter articles by hashtag or perform a search
    alert(`Búsqueda iniciada para: ${hashtag}`);
  };

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
            <button 
              className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              onClick={() => handleArticleClick({
                id: 999,
                title: 'Presidente anuncia nueva inversión de $2 billones para infraestructura rural',
                summary: 'El gobierno nacional destina recursos históricos para mejorar la conectividad y servicios básicos en zonas rurales.',
                category: 'economia',
                source: 'Presidencia de la República',
                time: '30 minutos',
                image: '🚨',
                engagement: { likes: 567, shares: 234, comments: 89 },
                fullContent: 'El presidente de Colombia anunció una inversión histórica de $2 billones de pesos para el desarrollo de infraestructura rural durante los próximos cuatro años. Esta iniciativa busca reducir la brecha entre el campo y la ciudad, mejorando la conectividad vial, el acceso a internet de alta velocidad, y los servicios básicos como agua potable y energía eléctrica. El plan incluye la construcción de 500 kilómetros de carreteras terciarias, la instalación de fibra óptica en 300 municipios rurales, y la modernización de 150 centros de salud rurales. Además, se implementarán programas de capacitación digital para agricultores y emprendedores rurales.',
                tags: ['infraestructura', 'rural', 'inversión', 'desarrollo', 'conectividad']
              })}
            >
              Leer más →
            </button>
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {filteredNews.map((article) => (
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
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                    </div>
                    
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                      onClick={() => handleArticleClick(article)}
                    >
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button 
                          className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                          onClick={() => handleEngagement(article.id, 'likes')}
                        >
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 hover:text-green-600 transition-colors"
                          onClick={() => handleEngagement(article.id, 'shares')}
                        >
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                          onClick={() => handleEngagement(article.id, 'comments')}
                        >
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                        onClick={() => handleArticleClick(article)}
                      >
                        Leer artículo completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => handleHashtagClick(hashtag)}
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Detail Modal */}
        {showModal && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">{selectedArticle.image}</span>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedArticle.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        selectedArticle.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                        selectedArticle.category === 'salud' ? 'bg-red-100 text-red-800' :
                        selectedArticle.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === selectedArticle.category)?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedArticle.title}
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span>{selectedArticle.source}</span>
                  <span>•</span>
                  <span>hace {selectedArticle.time}</span>
                </div>
                
                <div className="text-lg text-gray-700 leading-relaxed mb-6">
                  {selectedArticle.fullContent}
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-3">Etiquetas relacionadas:</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArticle.tags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button 
                        className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors"
                        onClick={() => handleEngagement(selectedArticle.id, 'likes')}
                      >
                        <span>👍</span>
                        <span>{selectedArticle.engagement.likes}</span>
                      </button>
                      <button 
                        className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg transition-colors"
                        onClick={() => handleEngagement(selectedArticle.id, 'shares')}
                      >
                        <span>📤</span>
                        <span>{selectedArticle.engagement.shares}</span>
                      </button>
                      <button 
                        className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg transition-colors"
                        onClick={() => handleEngagement(selectedArticle.id, 'comments')}
                      >
                        <span>💬</span>
                        <span>{selectedArticle.engagement.comments}</span>
                      </button>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;