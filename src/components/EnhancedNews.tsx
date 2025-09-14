import React, { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  source: string;
  time: string;
  image: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  readTime: string;
  political_lean: string;
  videoUrl?: string;
  youtubeId?: string;
  isBreaking?: boolean;
}

interface Reel {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  youtubeId: string;
}

const EnhancedNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'reels' | 'feeds'>('news');

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
    { id: 'sport', name: 'Deportes', icon: '⚽' },
    { id: 'crime', name: 'Crime', icon: '🚔' },
    { id: 'corruption', name: 'Corruption', icon: '⚖️' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    { id: 'terrorism', name: 'Terrorism', icon: '🛡️' },
  ];

  const newsReels: Reel[] = [
    {
      id: '1',
      title: 'Reforma Tributaria: Análisis en 60 segundos',
      thumbnail: '💰',
      duration: '1:02',
      views: 45600,
      category: 'economia',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Debate Congreso: Momentos clave',
      thumbnail: '🏛️',
      duration: '2:15',
      views: 32100,
      category: 'politica',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Protestas estudiantiles: Lo que debes saber',
      thumbnail: '🎓',
      duration: '1:45',
      views: 28900,
      category: 'educacion',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Corrupción en contratos: Investigación',
      thumbnail: '⚖️',
      duration: '3:20',
      views: 67800,
      category: 'corruption',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Crisis de empleo: Cifras oficiales',
      thumbnail: '💼',
      duration: '2:05',
      views: 41200,
      category: 'employment',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: '6',
      title: 'Seguridad Nacional: Últimas medidas',
      thumbnail: '🛡️',
      duration: '1:50',
      views: 23400,
      category: 'terrorism',
      youtubeId: 'dQw4w9WgXcQ'
    }
  ];

  const news: NewsItem[] = [
    {
      id: 1,
      title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
      fullContent: `El Ministerio de Educación Nacional anunció oficialmente el lanzamiento del programa "Becas Colombia 2024", una iniciativa ambiciosa que beneficiará a 50,000 estudiantes de bajos recursos económicos en todo el territorio nacional.

La ministra de Educación, María Fernanda Campo, explicó durante la rueda de prensa que este programa representa una inversión de 500 mil millones de pesos que se ejecutará durante los próximos cuatro años. "Este es un paso histórico hacia la democratización de la educación superior en Colombia", afirmó la funcionaria.

El programa cubrirá el 100% de la matrícula universitaria para estudiantes cuyos hogares se encuentren en los estratos 1, 2 y 3, y que demuestren excelencia académica mediante un promedio mínimo de 4.0 en bachillerato.

Además de la cobertura de matrícula, las becas incluyen un auxilio alimentario mensual de $400,000 pesos y apoyo para transporte universitario. Los estudiantes beneficiarios también tendrán acceso a programas de mentoría y desarrollo profesional.

Las inscripciones para el programa comenzarán el próximo mes a través de la plataforma digital del Icetex, y los primeros beneficiarios podrán comenzar sus estudios en el semestre académico de 2025.`,
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '2 horas',
      image: '📚',
      engagement: { likes: 245, shares: 89, comments: 34 },
      readTime: '4 min',
      political_lean: 'independiente',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Escándalo de corrupción en contratos de infraestructura',
      summary: 'Fiscalía investiga irregularidades en licitaciones por valor de $800 mil millones.',
      fullContent: `La Fiscalía General de la Nación abrió una investigación formal por presuntos actos de corrupción en contratos de infraestructura vial por valor de $800 mil millones de pesos, que involucra a funcionarios públicos y empresas privadas.

Según el ente investigador, las irregularidades se presentaron en al menos 15 proyectos de construcción y mantenimiento de carreteras en diferentes regiones del país, donde se habrían inflado los costos y utilizado materiales de menor calidad a los especificados en los contratos.

El fiscal Francisco Barbosa confirmó que ya se han practicado allanamientos en 12 sedes de empresas constructoras y en oficinas gubernamentales, donde se incautaron documentos y equipos informáticos que podrían contener evidencia del esquema de corrupción.

"Estamos ante uno de los casos de corrupción más grandes en el sector de infraestructura en los últimos años. No permitiremos que se siga robando el dinero del pueblo colombiano", declaró Barbosa en rueda de prensa.

Hasta el momento, han sido capturadas 8 personas, entre ellas dos funcionarios del Ministerio de Transporte, tres directivos de empresas constructoras y un intermediario que habría facilitado los sobornos.

La investigación también reveló que el esquema operaba mediante la creación de empresas fachada que presentaban ofertas artificialmente bajas para ganar las licitaciones, para luego solicitar adiciones presupuestales una vez iniciadas las obras.

El caso ha generado llamados desde diferentes sectores políticos para fortalecer los controles en la contratación pública y implementar mayor transparencia en los procesos de licitación.`,
      category: 'corruption',
      source: 'Fiscalía General',
      time: '30 minutos',
      image: '⚖️',
      engagement: { likes: 567, shares: 234, comments: 123 },
      readTime: '7 min',
      political_lean: 'independiente',
      isBreaking: true,
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Desempleo juvenil alcanza cifras récord en el último trimestre',
      summary: 'DANE reporta que 23.4% de jóvenes entre 18 y 28 años están sin empleo formal.',
      fullContent: `El Departamento Administrativo Nacional de Estadística (DANE) publicó las cifras de empleo del último trimestre, revelando que el desempleo juvenil en Colombia alcanzó el 23.4%, la cifra más alta registrada en los últimos cinco años.

El informe indica que de los 4.2 millones de jóvenes entre 18 y 28 años que buscan activamente empleo, aproximadamente 980,000 no han logrado conseguir trabajo formal, lo que representa un aumento del 3.1% comparado con el mismo período del año anterior.

La directora del DANE, Piedad Urdinola, explicó que este incremento se debe principalmente a la falta de experiencia laboral exigida por las empresas, la desconexión entre la formación académica y las necesidades del mercado laboral, y la lenta recuperación económica post-pandemia.

"Los jóvenes enfrentan barreras estructurales para acceder al mercado laboral. Muchas ofertas requieren experiencia previa, pero ¿cómo van a tener experiencia si nadie les da la primera oportunidad?", cuestionó Urdinola.

El sector más afectado es el de servicios, seguido por el comercio y la industria manufacturera. Paradójicamente, áreas como tecnología y salud muestran déficit de profesionales jóvenes, evidenciando un desajuste en la formación educativa.

El gobierno nacional anunció que presentará en las próximas semanas un plan de choque para el empleo juvenil, que incluirá incentivos tributarios para empresas que contraten jóvenes sin experiencia y programas de capacitación técnica gratuita.

Organizaciones empresariales han manifestado su disposición a colaborar con iniciativas que promuevan la empleabilidad juvenil, pero solicitan flexibilización en las cargas laborales para hacer más atractiva la contratación de personal sin experiencia.`,
      category: 'employment',
      source: 'DANE',
      time: '6 horas',
      image: '💼',
      engagement: { likes: 423, shares: 198, comments: 87 },
      readTime: '6 min',
      political_lean: 'independiente',
      youtubeId: 'dQw4w9WgXcQ'
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory || item.political_lean === selectedCategory);

  const filteredReels = selectedCategory === 'todas'
    ? newsReels
    : newsReels.filter(reel => reel.category === selectedCategory);

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
              {selectedArticle.isBreaking && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🚨 ÚLTIMO MOMENTO
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main article */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  
                  {/* Video section */}
                  {selectedArticle.youtubeId && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">📺 Video relacionado</h3>
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-center h-64 bg-gradient-to-r from-red-500 to-pink-500">
                          <div className="text-center text-white">
                            <div className="text-6xl mb-4">📺</div>
                            <p className="text-lg font-semibold">Video disponible en YouTube</p>
                            <button className="mt-4 bg-white text-red-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                              ▶️ Ver en YouTube
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related videos */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">🎬 Videos Relacionados</h3>
                <div className="space-y-4">
                  {newsReels.filter(reel => reel.category === selectedArticle.category).slice(0, 3).map((reel) => (
                    <div key={reel.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="w-16 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white text-xl">{reel.thumbnail}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">{reel.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{reel.duration}</span>
                          <span>•</span>
                          <span>{reel.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">📰 Artículos Relacionados</h3>
                <div className="space-y-4">
                  {news
                    .filter(article => article.id !== selectedArticle.id && article.category === selectedArticle.category)
                    .slice(0, 3)
                    .map((article) => (
                    <div 
                      key={article.id} 
                      onClick={() => setSelectedArticle(article)}
                      className="p-3 border border-gray-100 rounded-lg cursor-pointer hover:shadow-md transition"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{article.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{article.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-1">{article.summary}</p>
                          <div className="mt-1 text-xs text-gray-500">
                            {article.source} • hace {article.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social sharing */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">📤 Compartir</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    📘 Facebook
                  </button>
                  <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600">
                    🐦 Twitter
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    📱 WhatsApp
                  </button>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    📧 Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias Cívicas</h1>
          <p className="text-white/90">Mantente informado sobre los temas que afectan a Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔄 Actualizado cada hora</span>
            <span>✅ Fuentes verificadas</span>
            <span>📊 Análisis de impacto cívico</span>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex space-x-1 mb-4">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📰 Noticias
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'reels'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎬 Reels
            </button>
            <button
              onClick={() => setActiveTab('feeds')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'feeds'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📺 Feeds
            </button>
          </div>

          {/* Categories - FULLY SCROLLABLE */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
        </div>

        {/* Breaking News */}
        {news.filter(item => item.isBreaking).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3 animate-pulse">
                🚨 ÚLTIMO MOMENTO
              </span>
              <div className="flex-1">
                {news.filter(item => item.isBreaking).map((item, index) => (
                  <p key={index} className="text-red-800 font-medium">
                    {item.title}
                  </p>
                ))}
              </div>
              <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
                Ver todas →
              </button>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'news' && (
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
                          article.category === 'derecha' ? 'bg-orange-100 text-orange-800' :
                          article.category === 'corruption' ? 'bg-red-100 text-red-800' :
                          article.category === 'employment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                        <span className="text-sm text-gray-500">{article.source}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">hace {article.time}</span>
                        {article.isBreaking && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            🚨 BREAKING
                          </span>
                        )}
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
                          {article.youtubeId && (
                            <button className="flex items-center space-x-1 hover:text-red-600">
                              <span>📺</span>
                              <span>Video</span>
                            </button>
                          )}
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
        )}

        {activeTab === 'reels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReels.map((reel) => (
              <div key={reel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                {/* Video thumbnail */}
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-red-500 to-pink-500 h-48 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="text-6xl">{reel.thumbnail}</div>
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {reel.duration}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                        ▶️
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                      reel.category === 'economia' ? 'bg-green-100 text-green-800' :
                      reel.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                      reel.category === 'corruption' ? 'bg-red-100 text-red-800' :
                      reel.category === 'employment' ? 'bg-yellow-100 text-yellow-800' :
                      reel.category === 'terrorism' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {categories.find(c => c.id === reel.category)?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                    {reel.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <span>👁️</span>
                        <span>{reel.views.toLocaleString()}</span>
                      </span>
                    </div>
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      ▶️ Ver ahora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'feeds' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live feeds */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  🔴 EN VIVO
                </span>
                <h3 className="text-xl font-semibold">Feeds en Tiempo Real</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Debate en el Senado</h4>
                  <p className="text-sm text-gray-600">Discusión sobre la reforma tributaria en curso</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>👥 1,247 espectadores</span>
                    <span>•</span>
                    <span>Comenzó hace 45 min</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Rueda de Prensa Presidencial</h4>
                  <p className="text-sm text-gray-600">Anuncios sobre políticas de empleo juvenil</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>👥 892 espectadores</span>
                    <span>•</span>
                    <span>Comenzó hace 20 min</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Foro Ciudadano Virtual</h4>
                  <p className="text-sm text-gray-600">Conversatorio sobre educación pública</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>👥 634 espectadores</span>
                    <span>•</span>
                    <span>Comenzó hace 1 hora</span>
                  </div>
                </div>
              </div>
            </div>

            {/* News feed */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">📊 Feed de Actividad</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Nueva encuesta: "¿Aprueba la gestión del gobierno en educación?"</p>
                    <span className="text-xs text-gray-500">hace 5 min</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Debate trending: "Reforma al sistema de salud" - 234 participantes</p>
                    <span className="text-xs text-gray-500">hace 12 min</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Alerta de corrupción reportada en contratos públicos</p>
                    <span className="text-xs text-gray-500">hace 18 min</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Nuevo video: "Análisis del presupuesto nacional 2025"</p>
                    <span className="text-xs text-gray-500">hace 25 min</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Propuesta ciudadana: "Ciclovías en zonas rurales" - 89 apoyos</p>
                    <span className="text-xs text-gray-500">hace 32 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ReformaTributaria',
              '#CorrupciónContratos',
              '#DesempleoJuvenil',
              '#TransportePublico',
              '#EducacionDigital',
              '#CambioClimatico',
              '#SeguridadCiudadana',
              '#PazTotal',
              '#DesarrolloRural',
              '#SaludPública',
              '#DerechosHumanos',
              '#TransparenciaGobierno'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
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

export default EnhancedNews;