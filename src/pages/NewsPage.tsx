import React from 'react';

const NewsPage: React.FC = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Nueva Propuesta de Reforma Educativa Genera Debate Nacional",
      summary: "El Ministerio de Educación presenta un plan integral para modernizar el sistema educativo colombiano, incluyendo inversión en tecnología y mejora salarial docente.",
      category: "Educación",
      author: "María González",
      publishDate: "2024-01-15",
      readTime: "5 min",
      imageUrl: "/api/placeholder/400/250",
      tags: ["Educación", "Política", "Tecnología"],
      reactions: { likes: 234, comments: 67, shares: 89 }
    },
    {
      id: 2,
      title: "Congreso Aprueba Presupuesto Histórico para Infraestructura Rural",
      summary: "Por primera vez en la historia del país, se destina el 40% del presupuesto nacional a proyectos de infraestructura en zonas rurales, beneficiando a más de 2 millones de familias.",
      category: "Economía",
      author: "Carlos Rodríguez",
      publishDate: "2024-01-14",
      readTime: "7 min",
      imageUrl: "/api/placeholder/400/250",
      tags: ["Infraestructura", "Rural", "Presupuesto"],
      reactions: { likes: 456, comments: 123, shares: 234 }
    },
    {
      id: 3,
      title: "Colombia Lidera Iniciativa Regional de Energías Renovables",
      summary: "El país se posiciona como referente en América Latina con la inauguración del parque solar más grande de la región y nuevos proyectos eólicos en La Guajira.",
      category: "Medio Ambiente",
      author: "Ana Martínez",
      publishDate: "2024-01-13",
      readTime: "4 min",
      imageUrl: "/api/placeholder/400/250",
      tags: ["Energía", "Sostenibilidad", "Innovación"],
      reactions: { likes: 378, comments: 92, shares: 156 }
    },
    {
      id: 4,
      title: "Plataforma Digital Revoluciona Participación Ciudadana",
      summary: "Nuestro Pulso alcanza más de 50,000 usuarios activos mensuales, convirtiéndose en la principal herramienta de participación cívica digital del país.",
      category: "Tecnología",
      author: "Luis Pérez",
      publishDate: "2024-01-12",
      readTime: "3 min",
      imageUrl: "/api/placeholder/400/250",
      tags: ["Participación", "Digital", "Ciudadanía"],
      reactions: { likes: 567, comments: 234, shares: 345 }
    },
  ];

  const trendingTopics = [
    { name: "Reforma de Salud", posts: 1234, trend: "+89%" },
    { name: "Transporte Público", posts: 876, trend: "+67%" },
    { name: "Seguridad Ciudadana", posts: 654, trend: "+45%" },
    { name: "Educación Digital", posts: 543, trend: "+34%" },
    { name: "Medio Ambiente", posts: 432, trend: "+23%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📰 Noticias Cívicas</h1>
          <p className="text-xl text-gray-600">Mantente informado sobre los temas que importan a Colombia</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-2 space-y-8">
            {newsArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                {/* Article Image */}
                <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-6xl opacity-50">📰</div>
                </div>

                <div className="p-6">
                  {/* Category and Meta Info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      article.category === 'Educación' ? 'bg-blue-100 text-blue-800' :
                      article.category === 'Economía' ? 'bg-green-100 text-green-800' :
                      article.category === 'Medio Ambiente' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {article.category}
                    </span>
                    <div className="text-sm text-gray-500">
                      {article.readTime} de lectura
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                    {article.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{article.author}</div>
                        <div className="text-sm text-gray-500">{article.publishDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reactions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                        <span>❤️</span>
                        <span className="text-sm">{article.reactions.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <span>💬</span>
                        <span className="text-sm">{article.reactions.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                        <span>📤</span>
                        <span className="text-sm">{article.reactions.shares}</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Leer Más
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Load More Button */}
            <div className="text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Cargar Más Noticias
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                🔥 Temas Trending
              </h3>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div>
                      <div className="font-semibold text-gray-800">#{topic.name}</div>
                      <div className="text-sm text-gray-600">{topic.posts.toLocaleString()} publicaciones</div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      topic.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {topic.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📧 Mantente Informado</h3>
              <p className="mb-4 opacity-90">
                Recibe las noticias más importantes directamente en tu correo
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Quick Poll */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Encuesta Rápida</h3>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-3">
                  ¿Cuál es tu fuente principal de noticias?
                </h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Redes Sociales
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Televisión
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Periódicos Online
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Radio
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Categorías</h3>
              <div className="space-y-2">
                {[
                  "Política Nacional",
                  "Economía",
                  "Educación",
                  "Salud Pública",
                  "Medio Ambiente",
                  "Tecnología",
                  "Cultura",
                  "Deportes"
                ].map((category) => (
                  <button key={category} className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded transition-colors">
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;