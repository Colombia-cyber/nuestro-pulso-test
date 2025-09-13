import React from 'react';
import { FiClock, FiTrendingUp, FiEye, FiExternalLink } from 'react-icons/fi';

const NewsPage: React.FC = () => {
  const featuredNews = {
    title: "Congreso aprueba nueva ley de participación ciudadana digital",
    summary: "La iniciativa busca fortalecer los mecanismos de democracia digital en Colombia",
    image: "https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Congreso+Colombia",
    time: "Hace 2 horas",
    views: "2.4K",
    category: "Política"
  };

  const trendingTopics = [
    "Reforma Tributaria",
    "Educación Digital", 
    "Salud Pública",
    "Infraestructura",
    "Medio Ambiente"
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Nuevo sistema de votación electrónica en municipios piloto",
      summary: "Cinco municipios colombianos implementarán tecnología blockchain para elecciones locales",
      category: "Tecnología",
      time: "Hace 3 horas",
      views: "1.8K"
    },
    {
      id: 2,
      title: "Presupuesto 2024: Aumenta inversión en educación y salud",
      summary: "El gobierno nacional presenta incremento del 15% en sectores sociales prioritarios",
      category: "Economía",
      time: "Hace 5 horas", 
      views: "3.2K"
    },
    {
      id: 3,
      title: "Resultados de encuesta nacional sobre paz y reconciliación",
      summary: "El 78% de los colombianos apoya los programas de construcción de paz territorial",
      category: "Sociedad",
      time: "Hace 1 día",
      views: "4.1K"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📰 Noticias Verificadas
          </h1>
          <p className="text-xl text-gray-600">
            Información confiable sobre democracia y participación ciudadana
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img 
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredNews.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <FiClock size={14} />
                    <span>{featuredNews.time}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <FiEye size={14} />
                    <span>{featuredNews.views}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {featuredNews.summary}
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <span>Leer Completo</span>
                  <FiExternalLink size={16} />
                </button>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Últimas Noticias</h3>
              {newsArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <FiClock size={14} />
                      <span>{article.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <FiEye size={14} />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {article.summary}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                    <span>Leer más</span>
                    <FiExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FiTrendingUp />
                <span>Temas Tendencia</span>
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{topic}</span>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                📧 Boletín Informativo
              </h3>
              <p className="mb-4 text-blue-100">
                Recibe las noticias más importantes directo en tu correo
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📊 Estadísticas Rápidas
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Participación Ciudadana</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Confianza Institucional</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Transparencia Gubernamental</span>
                    <span className="text-sm font-semibold">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;