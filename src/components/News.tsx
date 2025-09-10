import React, { useState } from 'react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰', color: 'from-slate-500 to-gray-500' },
    { id: 'politica', name: 'Política', icon: '🏛️', color: 'from-blue-500 to-indigo-500' },
    { id: 'economia', name: 'Economía', icon: '💰', color: 'from-green-500 to-emerald-500' },
    { id: 'social', name: 'Social', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱', color: 'from-emerald-500 to-teal-500' },
    { id: 'educacion', name: 'Educación', icon: '📚', color: 'from-amber-500 to-orange-500' },
    { id: 'salud', name: 'Salud', icon: '🏥', color: 'from-red-500 to-rose-500' }
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
      priority: 'alta'
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
      priority: 'media'
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
      priority: 'alta'
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
      priority: 'media'
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full border border-white/20">
          <span className="text-2xl mr-2">📰</span>
          <span className="text-white font-medium">Noticias Verificadas</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Centro de Noticias Cívicas
        </h1>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Mantente informado con noticias verificadas sobre los temas que afectan a Colombia
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Actualizado cada hora</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>Fuentes verificadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📊</span>
            <span>Análisis de impacto cívico</span>
          </div>
        </div>
      </div>

      {/* Premium Category Filters */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {selectedCategory === category.id && (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl opacity-90`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl blur-lg opacity-40 scale-110`}></div>
                </>
              )}
              
              <div className="relative flex items-center space-x-2">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Breaking News Alert */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              🚨 ÚLTIMO MOMENTO
            </span>
          </div>
          <p className="text-white font-medium flex-1">
            Presidente anuncia nueva inversión de $2 billones para infraestructura rural
          </p>
          <button className="text-red-400 hover:text-red-300 font-medium text-sm bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
            Leer más →
          </button>
        </div>
      </div>

      {/* Enhanced News Feed */}
      <div className="space-y-6">
        {filteredNews.map((article) => (
          <div key={article.id} className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl">
            {/* Priority indicator */}
            {article.priority === 'alta' && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-1"></div>
            )}
            
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Article Icon */}
                <div className="flex-shrink-0">
                  <div className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {article.image}
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="flex-1 space-y-4">
                  {/* Category and Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      article.category === 'educacion' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      article.category === 'ambiente' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      article.category === 'salud' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      article.category === 'economia' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      article.category === 'politica' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                    <span className="text-white/60">{article.source}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60">hace {article.time}</span>
                  </div>
                  
                  {/* Article Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  
                  {/* Article Summary */}
                  <p className="text-white/80 leading-relaxed">{article.summary}</p>
                  
                  {/* Engagement Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6 text-sm">
                      <button className="group/btn flex items-center space-x-2 text-white/60 hover:text-blue-400 transition-colors">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center group-hover/btn:bg-blue-500/30 transition-colors">
                          <span>👍</span>
                        </div>
                        <span>{article.engagement.likes}</span>
                      </button>
                      <button className="group/btn flex items-center space-x-2 text-white/60 hover:text-green-400 transition-colors">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center group-hover/btn:bg-green-500/30 transition-colors">
                          <span>📤</span>
                        </div>
                        <span>{article.engagement.shares}</span>
                      </button>
                      <button className="group/btn flex items-center space-x-2 text-white/60 hover:text-purple-400 transition-colors">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center group-hover/btn:bg-purple-500/30 transition-colors">
                          <span>💬</span>
                        </div>
                        <span>{article.engagement.comments}</span>
                      </button>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all transform hover:scale-105">
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
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">🔥</span>
          <h3 className="text-2xl font-bold text-white">Temas Trending</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            '#ReformaTributaria',
            '#TransportePublico',
            '#EducacionDigital',
            '#CambioClimatico',
            '#SeguridadCiudadana',
            '#PazTotal',
            '#DesarrolloRural'
          ].map((hashtag, index) => (
            <button
              key={index}
              className="group bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 backdrop-blur-lg text-blue-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 border border-blue-500/20 hover:border-blue-400/30 transform hover:scale-105"
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;