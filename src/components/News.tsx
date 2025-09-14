import React, { useState } from 'react';

type NewsArticle = {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  source: string;
  time: string;
  image: string;
  urlToImage?: string;
  engagement: { likes: number; shares: number; comments: number };
  tags?: string[];
  readTime?: number;
};

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' },
    { id: 'tecnologia', name: 'Tecnología', icon: '💻' }
  ];

  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
      fullContent: 'El Ministerio de Educación Nacional anunció oficialmente el lanzamiento del programa "Generación E - Futuro Colombia", una iniciativa histórica que beneficiará a 50,000 estudiantes colombianos de bajos recursos con becas completas para educación superior. Este programa representa una inversión de 2.3 billones de pesos distribuidos a lo largo de cinco años.\n\nEl programa está dirigido a estudiantes de estratos 1, 2 y 3 que demuestren excelencia académica y que hayan sido admitidos en programas de pregrado en universidades públicas y privadas acreditadas. Las becas cubrirán el 100% de la matrícula, además de proporcionar un auxilio mensual de sostenimiento de 500,000 pesos para gastos de alimentación, transporte y materiales académicos.\n\nLa ministra de Educación, Aurora Vergara, destacó que "este programa es un paso fundamental hacia la democratización de la educación superior en Colombia. Estamos rompiendo las barreras económicas que han impedido que miles de jóvenes talentosos accedan a una formación universitaria de calidad".\n\nEl proceso de selección priorizará a estudiantes de zonas rurales, víctimas del conflicto armado, comunidades étnicas y personas con discapacidad. Además, se dará preferencia a carreras STEM (ciencia, tecnología, ingeniería y matemáticas) y programas relacionados con el desarrollo sostenible y la innovación.\n\nLas convocatorias iniciarán en febrero de 2024, y se espera que los primeros beneficiarios comiencen sus estudios en el segundo semestre del año. El programa incluye también componentes de mentoría, desarrollo de habilidades blandas y oportunidades de prácticas profesionales en empresas aliadas.',
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '2 horas',
      image: '📚',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 245, shares: 89, comments: 34 },
      tags: ['educación', 'becas', 'estudiantes', 'gobierno'],
      readTime: 4
    },
    {
      id: 2,
      title: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
      summary: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025.',
      fullContent: 'La Alcaldía de Bogotá presentó el "Plan Verde Metropolitano", una estrategia integral para combatir la contaminación del aire que incluye medidas tecnológicas, regulatorias y de movilidad sostenible. El plan tiene como meta reducir la contaminación atmosférica en un 30% para 2025 y posicionar a Bogotá como una de las capitales más limpias de América Latina.\n\nEntre las medidas más innovadoras se encuentra la instalación de 500 torres de purificación de aire en puntos estratégicos de la ciudad, tecnología desarrollada en colaboración con universidades locales y empresas holandesas especializadas. Estas torres utilizan fotocatálisis y filtros de carbón activado para neutralizar partículas PM2.5 y gases contaminantes.\n\nEl alcalde Carlos Fernando Galán explicó que "hemos identificado que el 40% de la contaminación proviene del transporte, por lo que implementaremos la zona de bajas emisiones más ambiciosa de Colombia". Esta zona cubrirá inicialmente el centro histórico y se expandirá gradualmente a toda la ciudad.\n\nAdemás, se plantarán 100,000 árboles nativos seleccionados específicamente por su capacidad de absorción de CO2 y material particulado. Los ciudadanos podrán monitorear la calidad del aire en tiempo real a través de una aplicación móvil conectada a 200 estaciones de medición distribuidas por toda la ciudad.\n\nEl plan también incluye incentivos económicos para ciudadanos que adopten vehículos eléctricos, instalen paneles solares en sus hogares o participen en programas de reciclaje comunitario. Se espera que estas medidas generen 15,000 empleos verdes en los próximos tres años.',
      category: 'ambiente',
      source: 'Alcaldía de Bogotá',
      time: '4 horas',
      image: '🌱',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 189, shares: 67, comments: 28 },
      tags: ['medio ambiente', 'bogotá', 'aire', 'sostenibilidad'],
      readTime: 5
    },
    {
      id: 3,
      title: 'Congreso aprueba en primer debate reforma al sistema de salud',
      summary: 'La reforma busca fortalecer la atención primaria y reducir las barreras de acceso a servicios médicos.',
      fullContent: 'La Comisión Séptima del Senado aprobó en primer debate el proyecto de ley que reforma integralmente el sistema de salud colombiano, con 11 votos a favor y 4 en contra. Esta histórica votación marca el inicio de un proceso legislativo que podría transformar la atención médica para 52 millones de colombianos.\n\nLa reforma, presentada por el gobierno del presidente Gustavo Petro, propone la creación del Sistema Nacional de Salud Público, que funcionaría bajo el modelo de redes integradas de servicios. El ministro de Salud, Guillermo Alfonso Jaramillo, explicó que "pasaremos de un sistema fragmentado a uno coordinado que pone al paciente en el centro de la atención".\n\nEntre los cambios más significativos se encuentra la eliminación del sistema de intermediación de las EPS privadas, reemplazándolo por una red de prestadores públicos y privados bajo gestión directa del Estado. Esto significa que los recursos del sistema fluirán directamente desde el Fondo Nacional de Salud hacia hospitales y clínicas, eliminando las utilidades privadas sobre la salud.\n\nLa reforma también establece la gratuidad total para servicios de promoción y prevención, incluyendo exámenes médicos anuales, vacunación completa, salud mental y programas de rehabilitación. Se crearán 500 Centros de Atención Primaria en municipios que actualmente carecen de infraestructura médica adecuada.\n\nPara los trabajadores del sector, la reforma garantiza estabilidad laboral y mejores condiciones salariales. Se proyecta la contratación de 50,000 nuevos profesionales de la salud en los próximos cinco años, con énfasis en médicos generales, enfermeros y especialistas en medicina familiar.\n\nLa oposición política ha expresado preocupaciones sobre la sostenibilidad financiera del nuevo sistema, estimando que requerirá recursos adicionales por 15 billones de pesos anuales. Sin embargo, el gobierno asegura que la eliminación de intermediarios reducirá costos administrativos en un 12%, liberando recursos para atención directa.',
      category: 'salud',
      source: 'Congreso de la República',
      time: '6 horas',
      image: '🏥',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 156, shares: 92, comments: 78 },
      tags: ['salud', 'reforma', 'congreso', 'eps'],
      readTime: 6
    },
    {
      id: 4,
      title: 'Colombia firma acuerdo de cooperación tecnológica con Corea del Sur',
      summary: 'El acuerdo facilitará la transferencia de tecnología y promoverá la innovación en sectores clave.',
      fullContent: 'En una ceremonia realizada en la Casa de Nariño, Colombia y Corea del Sur firmaron un acuerdo marco de cooperación tecnológica que facilitará la transferencia de conocimiento y promoverá la innovación en sectores estratégicos como telecomunicaciones, energías renovables, biotecnología y agricultura de precisión.\n\nEl acuerdo, firmado por el presidente Gustavo Petro y el primer ministro surcoreano Han Duck-soo, establece un fondo conjunto de 500 millones de dólares para financiar proyectos de investigación y desarrollo durante los próximos siete años. Este representa el acuerdo de cooperación tecnológica más ambicioso firmado por Colombia en la última década.\n\nLa ministra de Ciencia, Tecnología e Innovación, Yesenia Olaya, destacó que "Corea del Sur es un modelo mundial en transformación digital y desarrollo tecnológico. Este acuerdo nos permitirá acelerar nuestra transición hacia una economía del conocimiento".\n\nEntre los proyectos prioritarios se encuentra el desarrollo de semiconductores para dispositivos IoT, la implementación de ciudades inteligentes en Medellín y Barranquilla, y la creación de un centro de excelencia en inteligencia artificial en Bogotá. También se establecerán programas de intercambio académico que permitirán a 1,000 estudiantes colombianos realizar estudios de posgrado en universidades surcoreanas especializadas en tecnología.\n\nEl sector agrícola será otro gran beneficiario del acuerdo, con la implementación de sistemas de agricultura 4.0 que utilizan sensores, drones y análisis de big data para optimizar cultivos. Se espera que estas tecnologías incrementen la productividad agrícola en un 25% y reduzcan el uso de pesticidas en un 40%.\n\nCorea del Sur también apoyará el desarrollo de la industria de videojuegos colombiana, sector que ha mostrado un crecimiento del 35% anual en los últimos tres años. Se crearán incubadoras especializadas en gaming y realidad virtual en Bogotá, Medellín y Cali.',
      category: 'economia',
      source: 'Cancillería',
      time: '8 horas',
      image: '🤝',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 203, shares: 45, comments: 19 },
      tags: ['tecnología', 'corea del sur', 'innovación', 'cooperación'],
      readTime: 5
    },
    {
      id: 5,
      title: 'Implementación de tecnología blockchain en el sistema electoral colombiano',
      summary: 'La Registraduría Nacional anuncia pruebas piloto para garantizar transparencia en futuras elecciones.',
      fullContent: 'La Registraduría Nacional del Estado Civil anunció el inicio de pruebas piloto para implementar tecnología blockchain en el sistema electoral colombiano, con el objetivo de garantizar mayor transparencia, seguridad y confianza ciudadana en los procesos democráticos.\n\nEl proyecto, desarrollado en colaboración con el Instituto Nacional de Metrología (INM) y universidades como la Nacional y la Javeriana, utilizará una blockchain híbrida que combinará la transparencia de las redes públicas con la seguridad de las privadas. Esta tecnología permitirá crear un registro inmutable de cada voto emitido, garantizando que no pueda ser alterado o eliminado.\n\nLa registradora nacional, Claudia Luz Vásquez, explicó que "blockchain nos permite crear un sistema electoral a prueba de manipulaciones, donde cada ciudadano puede verificar que su voto fue contado correctamente sin comprometer el secreto del sufragio".\n\nLas pruebas piloto se realizarán inicialmente en elecciones estudiantiles de cinco universidades públicas durante el primer semestre de 2024. Si los resultados son exitosos, la tecnología se implementará gradualmente en elecciones locales y posteriormente en comicios nacionales.\n\nCada voto será registrado como una transacción blockchain con un código único que el votante podrá verificar a través de una aplicación móvil. El sistema también incluirá smart contracts que automatizarán el conteo de votos y la publicación de resultados en tiempo real, reduciendo el tiempo de escrutinio de días a horas.\n\nPara garantizar la inclusión digital, se instalarán puntos de votación con tabletas especializadas en zonas rurales y se implementarán programas de capacitación para adultos mayores. La Registraduría invertirá 85 mil millones de pesos en la primera fase del proyecto, que beneficiará inicialmente a 15 millones de votantes en centros urbanos.\n\nExpertos internacionales de Estonia, país pionero en voto electrónico, asesorarán la implementación. El sistema cumplirá con estándares internacionales de ciberseguridad y será auditado por organizaciones independientes como la OEA y la Unión Europea.',
      category: 'tecnologia',
      source: 'Registraduría Nacional',
      time: '1 día',
      image: '💻',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 389, shares: 156, comments: 87 },
      tags: ['blockchain', 'elecciones', 'tecnología', 'democracia'],
      readTime: 4
    },
    {
      id: 6,
      title: 'Nueva política de vivienda social incluye construcción sostenible y energías limpias',
      summary: 'El Ministerio de Vivienda presenta un plan para construir 100,000 viviendas ecológicas en tres años.',
      fullContent: 'El Ministerio de Vivienda, Ciudad y Territorio presentó la "Política Nacional de Vivienda Verde", un ambicioso programa que construirá 100,000 viviendas sostenibles para familias de bajos ingresos en los próximos tres años, con una inversión total de 8.5 billones de pesos.\n\nLa ministra Catalina Velasco explicó que las nuevas viviendas incorporarán tecnologías de construcción sostenible, sistemas de energía solar, recolección de agua lluvia y diseños bioclimáticos que reducen el consumo energético en un 40% comparado con viviendas tradicionales.\n\nCada unidad habitacional contará con paneles solares capaces de generar hasta 3 kWh diarios, suficientes para cubrir las necesidades básicas de una familia promedio. Los excedentes de energía podrán ser vendidos a la red eléctrica nacional, generando ingresos adicionales de hasta 100,000 pesos mensuales para las familias beneficiarias.\n\nLos proyectos priorizarán municipios afectados por el cambio climático y comunidades víctimas del conflicto armado. Se construirán eco-barrios integrales que incluirán zonas verdes, centros comunitarios, colegios y centros de salud, todos diseñados bajo criterios de sostenibilidad ambiental.\n\nLa política incluye la creación de una cadena productiva nacional de materiales de construcción sostenible, utilizando bambú guadua, ladrillos de tierra comprimida y concretos ecológicos. Esto generará 25,000 empleos directos en zonas rurales y fortalecerá la economía circular en el sector construcción.\n\nPara acceder a los beneficios, las familias deben tener ingresos menores a 4 SMMLV, estar registradas en el Sistema de Identificación de Potenciales Beneficiarios (Sisben) y completar programas de educación ambiental que incluyen manejo de residuos, ahorro energético y agricultura urbana.\n\nEl programa también contempla la renovación urbana de barrios existentes, implementando techos verdes, sistemas de drenaje sostenible y corredores ecológicos que conecten las viviendas con áreas naturales protegidas.',
      category: 'social',
      source: 'Ministerio de Vivienda',
      time: '1 día',
      image: '🏠',
      urlToImage: '/api/placeholder/600/300',
      engagement: { likes: 267, shares: 98, comments: 45 },
      tags: ['vivienda', 'sostenibilidad', 'energía solar', 'social'],
      readTime: 5
    }
  ];

  // Filter news based on category and search query
  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'todas' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + articlesPerPage);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const shareArticle = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href + '#article-' + article.id,
      });
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}#article-${article.id}`);
      alert('Enlace copiado al portapapeles');
    }
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

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar noticias por título, contenido o etiquetas..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-600 self-center">
              {filteredNews.length} artículo{filteredNews.length !== 1 ? 's' : ''} encontrado{filteredNews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
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
          {paginatedNews.map((article) => (
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
                        article.category === 'tecnologia' ? 'bg-purple-100 text-purple-800' :
                        article.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                        article.category === 'social' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                      {article.readTime && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{article.readTime} min lectura</span>
                        </>
                      )}
                    </div>
                    
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => handleArticleClick(article)}
                    >
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
                    {article.tags && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                            onClick={() => handleSearch(tag)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 hover:text-green-600"
                          onClick={() => shareArticle(article)}
                        >
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-purple-600">
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleArticleClick(article)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border text-sm font-medium rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        )}

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
              '#DesarrolloRural',
              '#TecnologiaBlockchain',
              '#EnergiaLimpia'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => handleSearch(hashtag.replace('#', ''))}
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Detail Modal */}
        {showModal && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 flex-1 pr-4">
                  {selectedArticle.title}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                {selectedArticle.urlToImage && (
                  <img 
                    src={selectedArticle.urlToImage} 
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="font-medium">{selectedArticle.source}</span>
                  <span>•</span>
                  <span>hace {selectedArticle.time}</span>
                  {selectedArticle.readTime && (
                    <>
                      <span>•</span>
                      <span>{selectedArticle.readTime} min lectura</span>
                    </>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedArticle.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                    selectedArticle.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                    selectedArticle.category === 'salud' ? 'bg-red-100 text-red-800' :
                    selectedArticle.category === 'tecnologia' ? 'bg-purple-100 text-purple-800' :
                    selectedArticle.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                    selectedArticle.category === 'social' ? 'bg-pink-100 text-pink-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === selectedArticle.category)?.name}
                  </span>
                </div>

                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-lg text-gray-700 font-medium mb-4">
                    {selectedArticle.summary}
                  </p>
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedArticle.fullContent}
                  </div>
                </div>

                {selectedArticle.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                        onClick={() => {
                          setShowModal(false);
                          handleSearch(tag);
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-6 py-4 border-t border-b mb-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="text-xl">👍</span>
                    <span className="font-medium">{selectedArticle.engagement.likes.toLocaleString()}</span>
                    <span>Me gusta</span>
                  </button>
                  <button 
                    onClick={() => shareArticle(selectedArticle)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <span className="text-xl">📤</span>
                    <span className="font-medium">{selectedArticle.engagement.shares.toLocaleString()}</span>
                    <span>Compartir</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <span className="text-xl">💬</span>
                    <span className="font-medium">{selectedArticle.engagement.comments.toLocaleString()}</span>
                    <span>Comentarios</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Comparte tu opinión</h3>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      placeholder="Escribe un comentario sobre esta noticia..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Comentar
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