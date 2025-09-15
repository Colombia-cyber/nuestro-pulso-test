import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonaldTrumpPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const trumpArticles = [
    {
      id: 1,
      title: 'Trump anuncia nueva política comercial que afectaría a exportaciones colombianas',
      summary: 'El expresidente estadounidense propone aranceles del 15% a productos agrícolas de América Latina.',
      fullContent: `Donald Trump anunció durante un mitin en Florida una nueva propuesta de política comercial que incluye aranceles del 15% a productos agrícolas de América Latina, lo que tendría un impacto significativo en las exportaciones colombianas.

La propuesta, que forma parte de su campaña presidencial para 2024, busca "proteger a los agricultores estadounidenses y reducir la dependencia de importaciones", según declaró el expresidente.

Colombia, que exporta anualmente $2.3 mil millones en productos agrícolas a Estados Unidos, principalmente café, flores y frutas tropicales, sería uno de los países más afectados por esta medida.

El embajador de Colombia en Washington, Luis Gilberto Murillo, expresó su preocupación por la propuesta: "Esta medida afectaría directamente a 500,000 familias colombianas que dependen del sector agrícola exportador".

Analistas económicos señalan que los aranceles podrían incrementar los precios del café colombiano en Estados Unidos hasta en un 20%, lo que beneficiaría a competidores como Brasil y Vietnam.

La Federación Nacional de Cafeteros ya anunció que activará el protocolo de emergencia comercial y buscará diversificar mercados hacia Europa y Asia en caso de que la propuesta se materialice.

Trump también mencionó posibles excepciones para países que colaboren activamente en la lucha contra el narcotráfico, lo que podría abrir una ventana de negociación para Colombia.`,
      category: 'trump',
      source: 'Reuters',
      time: '30 minutos',
      image: '🇺🇸',
      engagement: { likes: 1234, shares: 567, comments: 289 },
      readTime: '4 min'
    },
    {
      id: 2,
      title: 'Respuesta del gobierno colombiano a declaraciones de Trump sobre inmigración',
      summary: 'Cancillería colombiana rechaza propuestas migratorias que afectarían a connacionales en Estados Unidos.',
      fullContent: `El Ministerio de Relaciones Exteriores de Colombia emitió un comunicado oficial rechazando las recientes declaraciones de Donald Trump sobre políticas migratorias que afectarían a más de 800,000 colombianos residentes en Estados Unidos.

La canciller Álvaro Leyva calificó como "inaceptables e inhumanas" las propuestas del expresidente de realizar deportaciones masivas y eliminar el programa de Estatus de Protección Temporal (TPS) para ciudadanos colombianos.

"Colombia no aceptará violaciones a los derechos humanos de nuestros connacionales, quienes han contribuido significativamente al desarrollo económico y cultural de Estados Unidos", declaró Leyva durante una rueda de prensa.

El gobierno colombiano activó un plan de contingencia que incluye:
- Fortalecimiento de consulados en ciudades con mayor población colombiana
- Programa de apoyo legal gratuito para migrantes
- Coordinación con organizaciones de derechos humanos
- Preparación de centros de reintegración en caso de deportaciones masivas

Según datos del Departamento de Seguridad Nacional de Estados Unidos, los colombianos aportan $12 mil millones anuales a la economía estadounidense a través de impuestos y consumo.

Organizaciones como la Coalición Colombo-Americana manifestaron su respaldo al gobierno colombiano y anunciaron una campaña de concientización sobre la contribución de los migrantes colombianos en Estados Unidos.

El presidente Gustavo Petro programó una reunión con embajadores latinoamericanos para coordinar una respuesta regional conjunta ante las propuestas migratorias de Trump.`,
      category: 'trump',
      source: 'Cancillería Colombia',
      time: '1 hora',
      image: '🛂',
      engagement: { likes: 2156, shares: 934, comments: 445 },
      readTime: '5 min'
    },
    {
      id: 3,
      title: 'Análisis: Impacto de una eventual presidencia de Trump en relaciones Colombia-EE.UU.',
      summary: 'Expertos evalúan posibles cambios en cooperación antidrogas, comercio y política exterior.',
      fullContent: `Un panel de expertos en relaciones internacionales analizó el potencial impacto de una eventual segunda presidencia de Donald Trump en las relaciones bilaterales entre Colombia y Estados Unidos.

Según el análisis liderado por la Universidad Javeriana y el Centro de Estudios Internacionales, los principales áreas de impacto serían:

**Cooperación Antidrogas:**
Trump podría intensificar la presión para erradicar cultivos de coca mediante fumigaciones, una práctica suspendida en Colombia desde 2015 por sus efectos ambientales y de salud. Esto generaría tensiones con el enfoque de "paz total" del gobierno Petro.

**Comercio Bilateral:**
El expresidente podría revisar el TLC Colombia-Estados Unidos, especialmente las preferencias arancelarias para productos agrícolas colombianos. El 40% del comercio bilateral ($15 mil millones anuales) estaría en riesgo.

**Migración:**
Una política migratoria más restrictiva afectaría a los 800,000 colombianos en Estados Unidos, muchos de los cuales envían $7 mil millones anuales en remesas a Colombia.

**Cooperación Regional:**
Trump podría reducir el apoyo financiero a programas de desarrollo en zonas de posconflicto, que actualmente reciben $400 millones anuales de la Agencia de Estados Unidos para el Desarrollo Internacional (USAID).

Sandra Borda, experta en relaciones internacionales, señaló: "Colombia debe prepararse para un escenario más transaccional en la relación bilateral, donde cada acuerdo requerirá concesiones específicas".

El estudio recomienda al gobierno colombiano diversificar sus alianzas estratégicas con Europa, Asia y otros países latinoamericanos para reducir la dependencia de Estados Unidos en áreas críticas.`,
      category: 'trump',
      source: 'Universidad Javeriana',
      time: '2 horas',
      image: '🤝',
      engagement: { likes: 987, shares: 456, comments: 234 },
      readTime: '6 min'
    }
  ];

  const trumpStats = [
    { label: 'Colombianos en EE.UU.', value: '800K', icon: '🇨🇴' },
    { label: 'Remesas Anuales', value: '$7B USD', icon: '💰' },
    { label: 'Comercio Bilateral', value: '$15B USD', icon: '📊' },
    { label: 'Años de TLC', value: '12', icon: '📋' }
  ];

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-red-50/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-red-600 hover:text-red-800 mb-6 smooth-transition"
          >
            ← Volver a Donald Trump
          </button>
          
          <article className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{selectedArticle.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-8">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">Donald Trump</span>
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
            
            <div className="mt-8 pt-6 border-t border-gray-200">
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
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-colombia-vibrant">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with back navigation */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/30">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-white hover:text-colombia-yellow mb-4 smooth-transition"
            >
              ← Volver al inicio
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">🇺🇸 Donald Trump & Colombia</h1>
            <p className="text-white/90 text-lg">Análisis de impacto en relaciones bilaterales</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {trumpStats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/30">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Alert banner */}
          <div className="bg-red-600/90 backdrop-blur-sm border-l-4 border-red-800 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                🚨 ÚLTIMA HORA
              </span>
              <p className="text-white font-medium">
                Trump propone nuevos aranceles que afectarían exportaciones colombianas
              </p>
            </div>
          </div>

          {/* Featured articles */}
          <div className="space-y-6">
            {trumpArticles.map((article) => (
              <div key={article.id} className="bg-white/20 backdrop-blur-md rounded-lg p-6 smooth-transition hover:scale-[1.02] border border-white/30">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Donald Trump
                      </span>
                      <span className="text-white/80 text-sm">{article.source}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80 text-sm">hace {article.time}</span>
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold text-white mb-3 cursor-pointer hover:text-colombia-yellow smooth-transition"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {article.title}
                    </h3>
                    
                    <p className="text-white/90 mb-4 text-lg">{article.summary}</p>
                    
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
                        className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 smooth-transition border border-white/30"
                      >
                        Leer más →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trending hashtags */}
          <div className="mt-8 bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-4">🔥 Trending</h3>
            <div className="flex flex-wrap gap-3">
              {['#DonaldTrump', '#ColombiaUSA', '#TLC', '#Aranceles', '#Migracion', '#Elecciones2024', '#MAGA', '#Deportaciones'].map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-white/30 smooth-transition border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonaldTrumpPage;