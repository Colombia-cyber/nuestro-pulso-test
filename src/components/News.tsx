import React, { useState } from 'react';

interface NewsCategory {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  image: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  verified: boolean;
  readTime: number;
  tags: string[];
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedTrendingTopic, setSelectedTrendingTopic] = useState<string | null>(null);

  const categories: NewsCategory[] = [
    { id: 'todas', name: 'Todas', icon: '📰', count: 47 },
    { id: 'politica', name: 'Política', icon: '🏛️', count: 12 },
    { id: 'economia', name: 'Economía', icon: '💰', count: 8 },
    { id: 'social', name: 'Social', icon: '👥', count: 15 },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱', count: 6 },
    { id: 'educacion', name: 'Educación', icon: '📚', count: 4 },
    { id: 'salud', name: 'Salud', icon: '🏥', count: 2 }
  ];

  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '2 horas',
      image: '📚',
      engagement: { likes: 245, shares: 89, comments: 34 },
      verified: true,
      readTime: 3,
      tags: ['#BecasUniversitarias', '#EducacionPublica', '#Oportunidades']
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
      verified: true,
      readTime: 5,
      tags: ['#CalidadAire', '#Bogota', '#MedioAmbiente']
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
      verified: true,
      readTime: 8,
      tags: ['#ReformaSalud', '#AccesoSalud', '#AtencionPrimaria']
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
      verified: true,
      readTime: 4,
      tags: ['#Tecnologia', '#CoreaDelSur', '#Innovacion']
    },
    {
      id: 5,
      title: 'Nuevo plan de seguridad ciudadana reduce delitos en 15% en Medellín',
      summary: 'Las autoridades reportan una significativa disminución en hurtos y homicidios tras la implementación de nuevas estrategias.',
      category: 'social',
      source: 'Alcaldía de Medellín',
      time: '10 horas',
      image: '🛡️',
      engagement: { likes: 312, shares: 156, comments: 89 },
      verified: true,
      readTime: 6,
      tags: ['#SeguridadCiudadana', '#Medellin', '#ReduccionDelitos']
    },
    {
      id: 6,
      title: 'Inversión en infraestructura rural alcanza los $2 billones',
      summary: 'El gobierno destina recursos históricos para conectar vías terciarias y mejorar el acceso a servicios básicos.',
      category: 'politica',
      source: 'Ministerio de Transporte',
      time: '12 horas',
      image: '🛣️',
      engagement: { likes: 278, shares: 134, comments: 56 },
      verified: true,
      readTime: 7,
      tags: ['#InfraestructuraRural', '#ViasTecrciarias', '#DesarrolloRural']
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const trendingTopics = [
    { tag: '#ReformaTributaria', count: 1247, trend: 'up' },
    { tag: '#TransportePublico', count: 892, trend: 'up' },
    { tag: '#EducacionDigital', count: 654, trend: 'stable' },
    { tag: '#CambioClimatico', count: 543, trend: 'down' },
    { tag: '#SeguridadCiudadana', count: 987, trend: 'up' },
    { tag: '#PazTotal', count: 432, trend: 'up' },
    { tag: '#DesarrolloRural', count: 321, trend: 'stable' }
  ];

  const handleTrendingTopicClick = (topic: string) => {
    setSelectedTrendingTopic(selectedTrendingTopic === topic ? null : topic);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Verified News Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <span className="mr-3">📰</span>
                Noticias Verificadas
                <span className="ml-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  ✅ Confiables
                </span>
              </h1>
              <p className="text-white/90">Mantente informado sobre los temas que afectan a Colombia</p>
            </div>
            <div className="hidden md:block bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{filteredNews.length}</div>
                <div className="text-white/80 text-sm">Artículos</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
            <span className="flex items-center">
              <span className="mr-2">🔄</span>
              Actualizado cada hora
            </span>
            <span className="flex items-center">
              <span className="mr-2">✅</span>
              Fuentes verificadas
            </span>
            <span className="flex items-center">
              <span className="mr-2">📊</span>
              Análisis de impacto cívico
            </span>
            <span className="flex items-center">
              <span className="mr-2">🌍</span>
              Cobertura nacional
            </span>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Categorías</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías de noticias">
            {categories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-controls={`news-panel-${category.id}`}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                <span className="mr-1" aria-hidden="true">{category.icon}</span>
                {category.name}
                {category.count && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-300'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Breaking News Alert */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse flex items-center">
                <span className="mr-1">🚨</span>
                ÚLTIMO MOMENTO
              </span>
              <p className="text-red-800 font-medium flex-1">
                Presidente anuncia nueva inversión de $2 billones para infraestructura rural
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">hace 15 min</span>
              <button 
                className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Leer noticia completa sobre inversión en infraestructura rural"
              >
                Leer más →
              </button>
            </div>
          </div>
        </div>

        {/* Latest News Feed */}
        <div className="space-y-6" role="tabpanel" id={`news-panel-${selectedCategory}`}>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">📄</span>
            Últimas Noticias
            {selectedCategory !== 'todas' && (
              <span className="ml-3 text-lg font-medium text-blue-600">
                - {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </h2>
          
          {filteredNews.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Article Icon/Image */}
                  <div className="text-4xl flex-shrink-0" aria-hidden="true">{article.image}</div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Article Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                        article.category === 'salud' ? 'bg-red-100 text-red-800' :
                        article.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                        article.category === 'social' ? 'bg-purple-100 text-purple-800' :
                        article.category === 'politica' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      
                      {article.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <span className="mr-1">✅</span>
                          Verificado
                        </span>
                      )}
                      
                      <span className="text-sm text-gray-600 font-medium">{article.source}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{article.readTime} min lectura</span>
                    </div>
                    
                    {/* Article Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    {/* Article Summary */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                    
                    {/* Article Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          onClick={() => handleTrendingTopicClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Engagement Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button 
                          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors focus:outline-none focus-ring rounded px-2 py-1 btn-optimized"
                          aria-label={`Me gusta - ${article.engagement.likes} likes`}
                        >
                          <span className="text-lg">👍</span>
                          <span className="font-medium">{article.engagement.likes}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors focus:outline-none focus-ring rounded px-2 py-1 btn-optimized"
                          aria-label={`Compartir - ${article.engagement.shares} shares`}
                        >
                          <span className="text-lg">📤</span>
                          <span className="font-medium">{article.engagement.shares}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-ring rounded px-2 py-1 btn-optimized"
                          aria-label={`Comentarios - ${article.engagement.comments} comments`}
                        >
                          <span className="text-lg">💬</span>
                          <span className="font-medium">{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-all focus:outline-none focus-ring btn-optimized"
                        aria-label={`Leer artículo completo: ${article.title}`}
                      >
                        Leer artículo completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="mr-3">🔥</span>
              Temas Trending
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Actualizado en tiempo real
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTrendingTopicClick(topic.tag)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedTrendingTopic === topic.tag
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800 text-sm">{topic.tag}</span>
                  <span className="text-xs" aria-label={`Tendencia ${topic.trend}`}>
                    {getTrendIcon(topic.trend)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {topic.count.toLocaleString()} menciones
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    topic.trend === 'up' ? 'bg-green-100 text-green-700' :
                    topic.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {topic.trend === 'up' ? '+12%' : 
                     topic.trend === 'down' ? '-5%' : '0%'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          {selectedTrendingTopic && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-900">
                  Análisis de {selectedTrendingTopic}
                </h4>
                <button 
                  onClick={() => setSelectedTrendingTopic(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  aria-label="Cerrar análisis"
                >
                  ✕
                </button>
              </div>
              <p className="text-blue-800 text-sm mb-3">
                Este tema ha generado un alto nivel de engagement en las últimas 24 horas. 
                Las discusiones se centran principalmente en políticas públicas y su impacto social.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  📊 +156% interacciones
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  👥 23 fuentes verificadas
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  🏛️ Relevancia política: Alta
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">¿Quieres estar más informado?</h3>
            <p className="mb-4 text-blue-100">
              Únete a nuestra comunidad y recibe alertas personalizadas sobre los temas que más te interesan
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                📧 Suscribirse a alertas
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                💬 Únete al chat cívico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;