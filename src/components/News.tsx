import React, { useState } from 'react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'australia', name: 'Australia', icon: '🇦🇺' },
    { id: 'petro', name: 'Gustavo Petro', icon: '🇨🇴' },
    { id: 'terror', name: 'Terror News', icon: '⚠️' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'derecha', name: 'Right Wing', icon: '🗳️' },
    { id: 'izquierda', name: 'Left Wing', icon: '🌹' },
    { id: 'independiente', name: 'Independiente', icon: '⚖️' },
    { id: 'mundial', name: 'Worldwide News', icon: '🌍' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' }
  ];

  const news = [
    // Donald Trump News
    {
      id: 1,
      title: 'Trump anuncia nueva campaña presidencial con enfoque en economía',
      summary: 'El expresidente Donald Trump presenta su agenda económica para 2024 con promesas de reducción de impuestos y creación de empleos.',
      fullContent: `Donald Trump anunció oficialmente su campaña para las elecciones presidenciales de 2024, con un enfoque renovado en la recuperación económica y las políticas conservadoras.

Durante un evento en Mar-a-Lago, Trump delineó su plan económico que incluye la reducción de impuestos corporativos del 21% al 15%, la eliminación de regulaciones empresariales y la renegociación de acuerdos comerciales internacionales.

"América necesita un líder fuerte que entienda los negocios y pueda restaurar nuestra grandeza económica", declaró Trump ante una audiencia de más de 1,000 partidarios.

El plan también incluye la construcción de infraestructura energética, incluyendo el desarrollo de recursos de petróleo y gas domésticos, así como la implementación de políticas migratorias más estrictas.

Los analistas políticos señalan que Trump mantiene un fuerte apoyo entre la base republicana, con encuestas que muestran un 67% de aprobación entre votantes conservadores.

La campaña espera recaudar $100 millones en los primeros tres meses, superando las expectativas iniciales y demostrando el poder de movilización del expresidente.`,
      category: 'trump',
      source: 'Associated Press',
      time: '1 hora',
      image: '🇺🇸',
      engagement: { likes: 1245, shares: 389, comments: 156 },
      readTime: '5 min',
      political_lean: 'derecha'
    },
    
    // Australia News
    {
      id: 2,
      title: 'Australia refuerza alianzas en el Pacífico ante tensiones regionales',
      summary: 'El primer ministro Anthony Albanese anuncia nuevas inversiones en defensa y diplomacia para fortalecer la posición estratégica de Australia.',
      fullContent: `El primer ministro australiano Anthony Albanese anunció un paquete de inversión de $4.8 mil millones de dólares australianos para fortalecer las capacidades defensivas y diplomáticas del país en la región del Indo-Pacífico.

La iniciativa, conocida como "Pacífico Seguro 2024", incluye la modernización de bases navales, la expansión de programas de ayuda al desarrollo y el establecimiento de nuevas misiones diplomáticas en naciones insulares del Pacífico.

"Australia está comprometida con mantener un Indo-Pacífico libre, abierto y próspero", declaró Albanese durante una conferencia de prensa en Canberra.

El plan también contempla la compra de nuevos sistemas de defensa, incluyendo submarinos nucleares bajo el acuerdo AUKUS con Estados Unidos y Reino Unido, así como sistemas de misiles de largo alcance.

En el frente diplomático, Australia expandirá sus programas de becas educativas para estudiantes del Pacífico y aumentará la ayuda humanitaria para países afectados por el cambio climático.

Los analistas describen la estrategia como una respuesta directa al creciente poder de China en la región y su influencia en las naciones insulares del Pacífico.`,
      category: 'australia',
      source: 'ABC News Australia',
      time: '2 horas',
      image: '🇦🇺',
      engagement: { likes: 892, shares: 234, comments: 89 },
      readTime: '4 min',
      political_lean: 'independiente'
    },

    // Gustavo Petro News
    {
      id: 3,
      title: 'Petro presenta plan de paz total con nuevos diálogos regionales',
      summary: 'El presidente colombiano anuncia la expansión de la política de paz total con mesas de diálogo en cinco regiones del país.',
      fullContent: `El presidente Gustavo Petro anunció la creación de cinco nuevas mesas de diálogo regional como parte de su política de "Paz Total", buscando abordar las problemáticas de violencia en territorios específicos del país.

Las nuevas mesas se establecerán en Arauca, Norte de Santander, Cauca, Nariño y Chocó, regiones que han sido históricamente afectadas por la presencia de grupos armados ilegales.

"La paz no se construye desde Bogotá, se construye desde los territorios", afirmó Petro durante el anuncio realizado en el Palacio de Nariño.

La estrategia incluye la participación de líderes comunitarios, organizaciones sociales, autoridades locales y representantes del gobierno nacional para desarrollar acuerdos específicos que atiendan las necesidades de cada región.

El gobierno destinará $2 billones de pesos para programas de desarrollo alternativo, sustitución de cultivos ilícitos y fortalecimiento institucional en estos territorios.

El Alto Comisionado para la Paz coordinará las mesas de diálogo junto con representantes de las Naciones Unidas y países garantes del proceso de paz.`,
      category: 'petro',
      source: 'Presidencia de Colombia',
      time: '30 minutos',
      image: '🇨🇴',
      engagement: { likes: 567, shares: 123, comments: 78 },
      readTime: '4 min',
      political_lean: 'izquierda'
    },

    // Terror News
    {
      id: 4,
      title: 'Alerta internacional por nuevas amenazas terroristas en Europa',
      summary: 'Agencias de inteligencia europeas reportan incremento en la actividad de células terroristas y elevan el nivel de alerta.',
      fullContent: `Las agencias de seguridad europeas han elevado el nivel de alerta terrorista a "alto" tras detectar un incremento significativo en las comunicaciones entre células extremistas en varios países del continente.

Según informes de inteligencia compartidos entre los países miembros de la OTAN, se ha identificado un aumento del 40% en la actividad de redes terroristas durante los últimos tres meses.

Los servicios de inteligencia franceses, alemanes y británicos han coordinado operaciones conjuntas que resultaron en la detención de 23 individuos sospechosos de planificar ataques en infraestructura crítica.

"Enfrentamos una amenaza real y presente que requiere la máxima vigilancia y cooperación internacional", declaró el director de Europol durante una conferencia de seguridad en Bruselas.

Las autoridades han intensificado los controles en aeropuertos, estaciones de tren y eventos públicos masivos, implementando nuevas tecnologías de detección y aumentando la presencia policial.

Se ha establecido un centro de coordinación de crisis en Bruselas que opera las 24 horas para facilitar el intercambio de información entre países miembros.`,
      category: 'terror',
      source: 'Reuters Security',
      time: '3 horas',
      image: '⚠️',
      engagement: { likes: 423, shares: 178, comments: 67 },
      readTime: '3 min',
      political_lean: 'independiente'
    },

    // Worldwide News
    {
      id: 5,
      title: 'Cumbre climática global alcanza acuerdos históricos sobre energías renovables',
      summary: 'Líderes mundiales firman pacto para acelerar la transición energética y reducir emisiones de carbono en 50% para 2030.',
      fullContent: `La Cumbre Climática Global 2024 concluyó con la firma del "Pacto de Transición Verde", un acuerdo histórico que compromete a 195 países a acelerar dramáticamente la adopción de energías renovables.

El acuerdo establece metas ambiciosas: reducir las emisiones globales de carbono en 50% para 2030 y alcanzar la neutralidad de carbono para 2050.

La secretaria general de la ONU, quien presidió las negociaciones, describió el acuerdo como "el momento definitorio de nuestra generación en la lucha contra el cambio climático".

Los países desarrollados se comprometieron a invertir $500 mil millones anuales en tecnologías verdes y a transferir conocimiento tecnológico a naciones en desarrollo.

China anunció que acelerará su plan de neutralidad de carbono de 2060 a 2055, mientras que India se comprometió a generar 70% de su electricidad a partir de fuentes renovables para 2030.

Estados Unidos y la Unión Europea liderarán un fondo de $100 mil millones para ayudar a países vulnerables a adaptarse a los efectos del cambio climático.`,
      category: 'mundial',
      source: 'UN Climate News',
      time: '1 hora',
      image: '🌍',
      engagement: { likes: 2156, shares: 892, comments: 234 },
      readTime: '6 min',
      political_lean: 'independiente'
    },

    // Existing content from the original...
    {
      id: 6,
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
      political_lean: 'independiente'
    },

    {
      id: 7,
      title: 'Centro Democrático propone nueva agenda conservadora para 2025',
      summary: 'El partido de oposición presenta propuestas sobre seguridad, economía de mercado y valores tradicionales.',
      fullContent: `El Centro Democrático, principal partido de oposición en Colombia, presentó oficialmente su agenda política para 2025, enfocada en tres pilares fundamentales: seguridad ciudadana, crecimiento económico y fortalecimiento de los valores tradicionales.

El expresidente Álvaro Uribe, junto con el actual presidente del partido, dirigió la presentación de este plan que incluye 50 propuestas específicas para el desarrollo nacional.

En materia de seguridad, el partido propone aumentar el pie de fuerza policial en un 40%, implementar tecnología de reconocimiento facial en las principales ciudades y endurecer las penas para delitos como el hurto y la extorsión.

En el ámbito económico, la agenda incluye una reducción del 5% en el impuesto de renta para empresas que generen más de 100 empleos formales, la eliminación de tramitología innecesaria para emprendedores y la creación de zonas económicas especiales en regiones fronterizas.

"Colombia necesita un rumbo claro hacia la prosperidad y la seguridad. Nuestra agenda representa las aspiraciones de millones de colombianos que quieren progresar en libertad", declaró Uribe durante el evento.

El partido también propone fortalecer la familia como núcleo fundamental de la sociedad y garantizar la libertad de educación para que los padres puedan elegir la formación de sus hijos.`,
      category: 'derecha',
      source: 'Centro Democrático',
      time: '1 hora',
      image: '🗳️',
      engagement: { likes: 312, shares: 156, comments: 89 },
      readTime: '6 min',
      political_lean: 'derecha'
    },

    {
      id: 8,
      title: 'Pacto Histórico impulsa reforma al sistema pensional con enfoque social',
      summary: 'La coalición de gobierno presenta propuesta para garantizar pensiones dignas a trabajadores informales.',
      fullContent: `El Pacto Histórico, coalición que apoya al presidente Gustavo Petro, anunció una nueva propuesta de reforma al sistema pensional que busca garantizar una vejez digna para todos los colombianos, especialmente para quienes han trabajado en la informalidad.

La senadora Isabel Zuleta, ponente principal de la reforma, explicó que el nuevo sistema establecería una pensión básica universal de $500,000 pesos mensuales para todos los adultos mayores de 65 años que no tengan acceso a otros mecanismos pensionales.

La propuesta incluye la creación de un fondo solidario financiado con aportes del Estado, empleadores y trabajadores, que garantizaría sostenibilidad financiera a largo plazo.

"No podemos permitir que millones de colombianos que han trabajado toda su vida terminen en la indigencia por no haber podido cotizar formalmente", declaró Zuleta durante la presentación de la propuesta.

El nuevo sistema mantendría el régimen de prima media administrado por Colpensiones como pilar principal, pero eliminaría gradualmente los fondos privados de pensiones, trasladando esos recursos al sistema público.

La reforma también propone reducir de 1,300 a 1,000 las semanas de cotización requeridas para acceder a una pensión y establecer mecanismos especiales para mujeres.`,
      category: 'izquierda',
      source: 'Pacto Histórico',
      time: '3 horas',
      image: '🌹',
      engagement: { likes: 298, shares: 134, comments: 78 },
      readTime: '5 min',
      political_lean: 'izquierda'
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => 
        item.category === selectedCategory || 
        item.political_lean === selectedCategory ||
        (selectedCategory === 'trump' && (item.category === 'trump' || item.title.toLowerCase().includes('trump'))) ||
        (selectedCategory === 'australia' && (item.category === 'australia' || item.title.toLowerCase().includes('australia'))) ||
        (selectedCategory === 'petro' && (item.category === 'petro' || item.title.toLowerCase().includes('petro'))) ||
        (selectedCategory === 'terror' && (item.category === 'terror' || item.title.toLowerCase().includes('terror'))) ||
        (selectedCategory === 'mundial' && (item.category === 'mundial' || item.title.toLowerCase().includes('mundial')))
      );

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
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              
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

          {/* Related articles */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news
                .filter(article => article.id !== selectedArticle.id && article.category === selectedArticle.category)
                .slice(0, 3)
                .map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-2xl mb-2">{article.image}</div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {article.source} • hace {article.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                        article.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                        article.category === 'salud' ? 'bg-red-100 text-red-800' :
                        article.category === 'derecha' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
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