import React, { useState } from 'react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'seguridad', name: 'Seguridad', icon: '🛡️' },
    { id: 'familia', name: 'Familia', icon: '👨‍👩‍👧‍👦' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'libertad', name: 'Libertades', icon: '🗽' }
  ];

  const news = [
    {
      id: 1,
      title: 'Uribe propone reforma para fortalecer las libertades económicas',
      summary: 'El expresidente Álvaro Uribe presenta una propuesta para reducir la burocracia y facilitar la creación de empresas en Colombia.',
      category: 'economia',
      source: 'Centro Democrático',
      time: '1 hora',
      image: '💼',
      engagement: { likes: 456, shares: 123, comments: 78 },
      perspective: 'conservative'
    },
    {
      id: 2,
      title: 'Familias colombianas defienden valores tradicionales en el Congreso',
      summary: 'Organizaciones familiares presentan propuestas para proteger la familia tradicional y los valores conservadores en la legislación.',
      category: 'familia',
      source: 'Colombia con Valores',
      time: '2 horas',
      image: '👨‍👩‍👧‍👦',
      engagement: { likes: 789, shares: 234, comments: 156 },
      perspective: 'conservative'
    },
    {
      id: 3,
      title: 'Propuesta conservadora para mejorar la seguridad ciudadana',
      summary: 'Senadores de derecha presentan plan integral de seguridad basado en mano dura contra el crimen y apoyo a las fuerzas militares.',
      category: 'seguridad',
      source: 'Bancada Conservadora',
      time: '3 horas',
      image: '🛡️',
      engagement: { likes: 634, shares: 187, comments: 92 },
      perspective: 'conservative'
    },
    {
      id: 4,
      title: 'Empresarios solicitan reducción de impuestos para reactivar economía',
      summary: 'Gremios empresariales proponen un plan de reducción tributaria para estimular la inversión privada y crear más empleos.',
      category: 'economia',
      source: 'ANDI',
      time: '4 horas',
      image: '📈',
      engagement: { likes: 523, shares: 145, comments: 67 },
      perspective: 'conservative'
    },
    {
      id: 5,
      title: 'Iniciativa para fortalecer la educación en valores patrióticos',
      summary: 'Congresistas conservadores impulsan proyecto para incluir formación cívica y amor por la patria en el currículo escolar.',
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '5 horas',
      image: '🇨🇴',
      engagement: { likes: 412, shares: 98, comments: 45 },
      perspective: 'conservative'
    },
    {
      id: 6,
      title: 'Defensa de la libertad de expresión y empresa en universidades',
      summary: 'Movimiento estudiantil conservador defiende el pluralismo ideológico y la libertad académica en centros educativos.',
      category: 'libertad',
      source: 'Estudiantes por la Libertad',
      time: '6 horas',
      image: '🗽',
      engagement: { likes: 345, shares: 76, comments: 34 },
      perspective: 'conservative'
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias Conservadoras</h1>
          <p className="text-white/90">Mantente informado con perspectiva conservadora sobre los temas que afectan a Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔄 Actualizado cada hora</span>
            <span>✅ Fuentes confiables</span>
            <span>🇨🇴 Valores tradicionales</span>
            <span>📊 Análisis conservador</span>
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
              Centro Democrático presenta propuesta para defender la propiedad privada y la libre empresa
            </p>
            <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
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
                        article.category === 'economia' ? 'bg-green-100 text-green-800' :
                        article.category === 'familia' ? 'bg-pink-100 text-pink-800' :
                        article.category === 'seguridad' ? 'bg-red-100 text-red-800' :
                        article.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'libertad' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🏛️ Conservador
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
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
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Leer artículo completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conservative Leaders */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🎖️ Líderes Conservadores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Álvaro Uribe', role: 'Expresidente', party: 'Centro Democrático' },
              { name: 'Iván Duque', role: 'Expresidente', party: 'Centro Democrático' },
              { name: 'María Fernanda Cabal', role: 'Senadora', party: 'Centro Democrático' },
              { name: 'Paloma Valencia', role: 'Senadora', party: 'Centro Democrático' }
            ].map((leader, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100 transition"
              >
                <div className="text-2xl mb-2">👤</div>
                <h4 className="font-semibold text-gray-900">{leader.name}</h4>
                <p className="text-sm text-gray-600">{leader.role}</p>
                <p className="text-xs text-blue-600">{leader.party}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Conservadores Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#LibertadEconomica',
              '#ValoresFamiliares',
              '#SeguridadCiudadana',
              '#PatriaYLibertad',
              '#EmpresaPrivada',
              '#TraballoDigno',
              '#FamiliaTradicional',
              '#LibertadReligiosa',
              '#PropiendadPrivada',
              '#OrdenPublico'
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