import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const News: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'congreso', name: 'Congreso', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' },
    { id: 'internacional', name: 'Internacional', icon: '🌍' },
    { id: 'deportes', name: 'Deportes', icon: '⚽' },
    { id: 'cultura', name: 'Cultura', icon: '🎭' }
  ];

  const news = [
    // Donald Trump Articles (3 articles)
    {
      id: 1,
      title: 'Trump propone nuevos aranceles que afectarían café colombiano',
      summary: 'El expresidente estadounidense anuncia política comercial restrictiva para productos agrícolas latinoamericanos.',
      fullContent: `Donald Trump anunció durante un evento en Mar-a-Lago una nueva política comercial que incluiría aranceles del 25% a productos agrícolas de América Latina, incluyendo el café colombiano, en caso de ganar la presidencia en 2024.

La propuesta forma parte de su estrategia "America First 2.0" y busca proteger a los agricultores estadounidenses mediante la reducción de importaciones agrícolas. "Es hora de que Estados Unidos produzca lo que consume", declaró Trump ante empresarios republicanos.

Según análisis de Reuters, esta medida podría afectar el 40% de las exportaciones agrícolas colombianas a Estados Unidos, valoradas en $2.8 mil millones anuales. El café, que representa el 60% de estas exportaciones, sería el más impactado.

La Federación Nacional de Cafeteros expresó "profunda preocupación" por la propuesta, señalando que afectaría directamente a 540,000 familias cafeteras colombianas. "Esta medida haría inviable la exportación de café colombiano a Estados Unidos", declaró Roberto Vélez, gerente general de la FNC.

Expertos económicos predicen que los aranceles podrían incrementar el precio del café colombiano en Estados Unidos entre 30% y 40%, lo que beneficiaría a competidores como Brasil y Vietnam que tienen acuerdos comerciales diferentes.

El embajador de Colombia en Washington activó el protocolo de emergencia comercial y solicitó reuniones urgentes con el Congreso estadounidense para evaluar el impacto de esta propuesta en las relaciones bilaterales.`,
      category: 'trump',
      source: 'Reuters',
      time: '15 minutos',
      image: '☕',
      engagement: { likes: 2341, shares: 876, comments: 423 },
      readTime: '4 min',
      hashtags: ['#DonaldTrump', '#CafeColombiano', '#Aranceles', '#ComercioInternacional']
    },
    {
      id: 2,
      title: 'Colombia lidera inversión en startups de América Latina con $650 millones en 2024',
      summary: 'El ecosistema emprendedor nacional supera récords históricos con 127 rondas de financiación.',
      fullContent: `Colombia estableció un nuevo récord en inversión de startups al captar $650 millones de dólares en 2024, posicionándose como el tercer ecosistema más atractivo de América Latina, según el reporte de Lavca (Latin American Venture Capital Association).

El crecimiento del 280% respecto a 2023 consolida a Colombia como hub regional de innovación, superando a Chile y Uruguay en volumen de inversión per cápita.

**Sectores líderes en inversión:**
- Fintech: $285 millones (44% del total)
- E-commerce: $156 millones (24%)
- Agtech: $98 millones (15%)
- Healthtech: $67 millones (10%)
- Edtech: $44 millones (7%)

Las rondas más destacadas del año incluyen:
- Addi (fintech): Serie C de $85 millones liderada por Union Square Ventures
- Frubana (agtech): Serie B de $65 millones con participación de GGV Capital
- 1DOC3 (healthtech): Serie A de $30 millones liderada por Kaszek Ventures

María Alejandra Copete, directora de Ruta N, atribuyó el crecimiento a la "madurez del ecosistema y políticas públicas favorables". El programa Ley de Startups, vigente desde 2022, ha beneficiado a 847 empresas con incentivos tributarios.

Para 2025, la proyección es superar los $1,000 millones en inversión, con especial énfasis en tecnologías sostenibles y soluciones para el agro.`,
      category: 'tecnologia',
      source: 'LAVCA',
      time: '1 hora',
      image: '🚀',
      engagement: { likes: 2234, shares: 789, comments: 345 },
      readTime: '5 min',
      hashtags: ['#StartupsColombiana', '#Fintech', '#InversionTech', '#Emprendimiento']
    },
    {
      id: 3,
      title: 'Senado aprueba en primer debate reforma al sistema pensional',
      summary: 'La reforma establece pensión básica universal y traslado gradual de fondos privados al sistema público.',
      fullContent: `El Senado de la República aprobó en primer debate, con 52 votos a favor y 26 en contra, el proyecto de ley que reforma integralmente el sistema pensional colombiano, estableciendo una pensión básica universal de $500,000 mensuales.

La senadora ponente, Isabel Zuleta del Pacto Histórico, destacó que la reforma beneficiará a 3.2 millones de adultos mayores que actualmente no tienen acceso a pensión. "Es un paso histórico hacia la dignidad de nuestros mayores", declaró tras la votación.

Los puntos centrales de la reforma incluyen:
- Pensión básica universal de $500,000 para mayores de 65 años
- Traslado gradual de fondos privados a Colpensiones en 10 años
- Reducción de semanas de cotización de 1,300 a 1,000
- Régimen especial para mujeres con bonificaciones por maternidad

La oposición, liderada por el Centro Democrático, argumentó que la reforma es "insostenible fiscalmente" y "viola derechos adquiridos". El senador Paloma Valencia advirtió sobre un costo fiscal de $80 billones en 20 años.

La reforma pasará ahora a segundo debate en Senado, donde se espera que se mantenga la mayoría oficialista para su aprobación.`,
      category: 'congreso',
      source: 'Congreso de la República',
      time: '2 horas',
      image: '🏛️',
      engagement: { likes: 2854, shares: 1123, comments: 678 },
      readTime: '5 min',
      hashtags: ['#CongresoDecolombia', '#ReformaPensional', '#ColPensiones', '#PensionBasica']
    }
  ];

  const trendingHashtags = [
    '#DonaldTrump', '#CongresoDecolombia', '#ReformaPensional', '#StartupsColombiana',
    '#CafeColombiano', '#Fintech', '#InversionTech', '#Aranceles'
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const searchFilteredNews = searchQuery 
    ? filteredNews.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredNews;

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 smooth-transition"
          >
            ← Volver a noticias
          </button>
          
          <article className="glass-morphism rounded-lg p-8">
            <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{selectedArticle.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-8">
              <span className={`px-3 py-1 rounded-full text-white ${
                selectedArticle.category === 'trump' ? 'bg-red-500' :
                selectedArticle.category === 'congreso' ? 'bg-blue-500' :
                selectedArticle.category === 'tecnologia' ? 'bg-cyan-500' :
                'bg-gray-500'
              }`}>
                {categories.find(c => c.id === selectedArticle.category)?.name}
              </span>
              <span>{selectedArticle.source}</span>
              <span>•</span>
              <span>hace {selectedArticle.time}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} de lectura</span>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {selectedArticle.fullContent.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Hashtags */}
            <div className="mt-6 mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.hashtags.map((hashtag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 smooth-transition"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 smooth-transition">
                    <span>👍</span>
                    <span>{selectedArticle.engagement.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 smooth-transition">
                    <span>📤</span>
                    <span>{selectedArticle.engagement.shares}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 smooth-transition">
                    <span>💬</span>
                    <span>{selectedArticle.engagement.comments}</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 smooth-transition">
                    Compartir
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 smooth-transition">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Back navigation */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-colombia-yellow mb-6 smooth-transition"
          >
            ← Volver al inicio
          </button>

          {/* Header */}
          <div className="glass-morphism rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias Comprensivas</h1>
            <p className="text-white/90">Mantente informado sobre los temas que afectan a Colombia y el mundo</p>
            <div className="mt-4 flex items-center space-x-6 text-white/80">
              <span>🔄 Actualizado cada hora</span>
              <span>✅ Fuentes verificadas</span>
              <span>📊 Análisis de impacto cívico</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="glass-morphism rounded-lg p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar noticias, hashtags o temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-white/70">🔍</span>
            </div>
          </div>

          {/* Categories */}
          <div className="glass-morphism rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium smooth-transition ${
                    selectedCategory === category.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                  {category.id === 'trump' && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-full">1</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* News Feed */}
          <div className="space-y-6">
            {searchFilteredNews.map((article) => (
              <div key={article.id} className="glass-morphism rounded-lg p-6 hover:scale-[1.02] smooth-transition">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'trump' ? 'bg-red-100 text-red-800' :
                        article.category === 'congreso' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'tecnologia' ? 'bg-cyan-100 text-cyan-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-white/80">{article.source}</span>
                      <span className="text-sm text-white/60">•</span>
                      <span className="text-sm text-white/80">hace {article.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-colombia-yellow cursor-pointer smooth-transition"
                        onClick={() => setSelectedArticle(article)}>
                      {article.title}
                    </h3>
                    
                    <p className="text-white/90 mb-4">{article.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/80">
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 smooth-transition border border-white/30">
                        Leer completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search results message */}
          {searchQuery && searchFilteredNews.length === 0 && (
            <div className="text-center py-8 glass-morphism rounded-lg">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-white/80">No se encontraron noticias para "{searchQuery}"</p>
            </div>
          )}

          {/* Trending Topics */}
          <div className="mt-8 glass-morphism rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🔥 Hashtags Trending</h3>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags.map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(hashtag.replace('#', ''))}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-white/30 smooth-transition border border-white/30"
                >
                  {hashtag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;