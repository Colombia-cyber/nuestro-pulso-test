import React, { useState, useEffect } from 'react';

interface NewsArticle {
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
  relatedLinks?: string[];
  tags?: string[];
}

const EnhancedNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReels, setShowReels] = useState(false);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰', count: 156, color: 'bg-gray-500' },
    { id: 'politica', name: 'Política', icon: '🏛️', count: 45, color: 'bg-blue-500' },
    { id: 'derecha', name: 'Right Wing', icon: '🗳️', count: 23, color: 'bg-red-500' },
    { id: 'izquierda', name: 'Left Wing', icon: '🌹', count: 18, color: 'bg-green-500' },
    { id: 'independiente', name: 'Independiente', icon: '⚖️', count: 12, color: 'bg-purple-500' },
    { id: 'economia', name: 'Economía', icon: '💰', count: 34, color: 'bg-yellow-500' },
    { id: 'social', name: 'Social', icon: '👥', count: 28, color: 'bg-pink-500' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱', count: 19, color: 'bg-green-600' },
    { id: 'educacion', name: 'Educación', icon: '📚', count: 16, color: 'bg-indigo-500' },
    { id: 'salud', name: 'Salud', icon: '🏥', count: 21, color: 'bg-red-400' },
    { id: 'tecnologia', name: 'Tecnología', icon: '💻', count: 14, color: 'bg-blue-600' },
    { id: 'deportes', name: 'Deportes', icon: '⚽', count: 31, color: 'bg-orange-500' },
    { id: 'cultura', name: 'Cultura', icon: '🎭', count: 9, color: 'bg-purple-600' },
    { id: 'internacional', name: 'Internacional', icon: '🌍', count: 26, color: 'bg-teal-500' }
  ];

  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Colombia avanza hacia la transición energética con inversión histórica',
      summary: 'El gobierno nacional anuncia inversión de $15 billones en energías renovables para los próximos 5 años.',
      fullContent: `Colombia da un paso decisivo hacia la transición energética con el anuncio de una inversión histórica de 15 billones de pesos en proyectos de energías renovables durante los próximos cinco años.

El ministro de Minas y Energía, Andrés Camacho, presentó el "Plan Nacional de Transición Energética 2024-2029", que posicionará a Colombia como líder regional en energías limpias y reducirá la dependencia de combustibles fósiles.

La iniciativa incluye la construcción de 20 nuevos parques solares y 15 parques eólicos en diferentes regiones del país, con capacidad para generar 3,000 megavatios de energía limpia, suficiente para abastecer a 2.5 millones de hogares colombianos.

"Este es el proyecto de infraestructura energética más ambicioso en la historia de Colombia", declaró el ministro durante la presentación del plan en Casa de Nariño.

Los proyectos se desarrollarán principalmente en La Guajira, Cesar, Santander, Tolima y Huila, regiones que cuentan con las mejores condiciones climáticas para la generación de energía solar y eólica.

El plan también contempla la creación de 150,000 empleos directos e indirectos, programas de capacitación técnica para comunidades locales y el fortalecimiento de la industria nacional de componentes para energías renovables.

Además, se establecerán incentivos tributarios para empresas que adopten energías limpias y se implementará un programa de sustitución gradual de vehículos de combustión por vehículos eléctricos en el transporte público.

La meta es que para 2029, el 70% de la matriz energética colombiana provenga de fuentes renovables, comparado con el 30% actual.

Los primeros proyectos comenzarán construcción en el segundo semestre de 2024, con financiamiento del Banco Mundial, el BID y fondos de inversión internacional especializados en energías limpias.`,
      category: 'ambiente',
      source: 'Ministerio de Minas y Energía',
      time: '1 hora',
      image: '🌱',
      engagement: { likes: 456, shares: 234, comments: 89 },
      readTime: '6 min',
      political_lean: 'independiente',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['energía', 'sostenibilidad', 'inversión', 'empleo'],
      relatedLinks: [
        'Plan Nacional de Transición Energética - Documento completo',
        'Mapa interactivo de proyectos renovables',
        'Calculadora de impacto ambiental'
      ]
    },
    {
      id: 2,
      title: 'Propuesta conservadora busca fortalecer la seguridad ciudadana',
      summary: 'Coalición de partidos de derecha presenta plan integral contra la criminalidad urbana.',
      fullContent: `Una coalición de partidos conservadores, liderada por el Centro Democrático y el Partido Conservador, presentó un plan integral de seguridad ciudadana que propone medidas contundentes para combatir la criminalidad urbana en las principales ciudades del país.

El plan "Colombia Segura", presentado por el senador Álvaro Uribe y el expresidente Iván Duque, incluye 15 propuestas específicas para reducir los índices de inseguridad en un 40% durante los próximos cuatro años.

Entre las medidas más destacadas se encuentra el aumento del pie de fuerza policial en 25,000 nuevos agentes, la implementación de tecnología de reconocimiento facial en espacios públicos y el fortalecimiento de las penas para delitos como hurto, extorsión y microtráfico.

"Los colombianos de bien merecen vivir en paz y tranquilidad. Nuestra propuesta devuelve la autoridad legítima del Estado y protege a las familias trabajadoras", declaró Uribe durante la presentación.

El plan también incluye la creación de 500 nuevos CAI (Comandos de Atención Inmediata) en barrios vulnerables, la ampliación del programa de cámaras de seguridad y la implementación de sistemas de geolocalización para el seguimiento de reincidentes.

En materia judicial, proponen la creación de jueces especializados en criminalidad urbana, la eliminación de beneficios penitenciarios para delincuentes reincidentes y la implementación de pulseras electrónicas para el control de medidas cautelares.

El plan contempla una inversión de 8 billones de pesos en cuatro años, financiada mediante la reasignación del presupuesto de defensa y nuevos gravámenes a actividades como apuestas online y cigarrillos electrónicos.

Los partidos promotores anunciaron que buscarán apoyo en el Congreso para convertir estas propuestas en ley de la República antes de finalizar 2024.

"La seguridad no es de izquierda ni de derecha, es una necesidad de todos los colombianos", concluyó el expresidente Duque.`,
      category: 'derecha',
      source: 'Centro Democrático',
      time: '2 horas',
      image: '🗳️',
      engagement: { likes: 678, shares: 423, comments: 156 },
      readTime: '5 min',
      political_lean: 'derecha',
      tags: ['seguridad', 'policía', 'tecnología', 'justicia'],
      relatedLinks: [
        'Plan Colombia Segura - Documento completo',
        'Estadísticas de criminalidad por ciudad',
        'Comparativo internacional de políticas de seguridad'
      ]
    },
    {
      id: 3,
      title: 'Gobierno impulsa reforma social integral para reducir desigualdad',
      summary: 'Pacto Histórico presenta propuesta transformadora en educación, salud y vivienda social.',
      fullContent: `El gobierno del presidente Gustavo Petro presentó una reforma social integral que busca transformar las estructuras de desigualdad en Colombia mediante intervenciones profundas en educación, salud, vivienda y trabajo digno.

La ministra de Educación, Aurora Vergara, lideró la presentación del componente educativo que incluye la gratuidad total de la educación superior pública, la creación de 200,000 nuevos cupos universitarios y un programa nacional de alfabetización digital.

"La educación es el derecho fundamental que permite romper los ciclos de pobreza y construir una sociedad más justa", declaró la ministra durante el evento en la Universidad Nacional.

En salud, la reforma propone la creación de un sistema único público que garantice atención integral gratuita para todos los colombianos, eliminando gradualmente las EPS privadas y fortaleciendo la red pública hospitalaria.

El plan incluye la construcción de 150 nuevos hospitales en regiones apartadas, la contratación de 50,000 profesionales de la salud y la implementación de un programa nacional de medicina preventiva comunitaria.

En materia de vivienda, el gobierno propone la construcción de 500,000 viviendas sociales en cinco años, con prioridad para familias víctimas del conflicto armado, madres cabeza de familia y jóvenes rurales.

El componente laboral incluye la formalización de 2 millones de empleos, la reducción de la jornada laboral a 40 horas semanales y el aumento progresivo del salario mínimo hasta alcanzar $1.5 millones en 2027.

"Esta reforma representa el cambio real que prometimos. Es el camino hacia la Colombia humana que queremos construir", afirmó el presidente Petro en su intervención.

La financiación se realizará mediante una reforma tributaria que aumentará los impuestos a las grandes fortunas, la implementación de un impuesto al patrimonio y la reasignación del gasto militar hacia inversión social.

El gobierno espera radicar el proyecto en el Congreso en marzo de 2024 y lograr su aprobación antes de finalizar el período de sesiones.`,
      category: 'izquierda',
      source: 'Presidencia de la República',
      time: '3 horas',
      image: '🌹',
      engagement: { likes: 892, shares: 567, comments: 234 },
      readTime: '7 min',
      political_lean: 'izquierda',
      tags: ['reforma social', 'educación', 'salud', 'igualdad'],
      relatedLinks: [
        'Reforma Social Integral - Documento oficial',
        'Cronograma de implementación',
        'Calculadora de beneficios por región'
      ]
    },
    {
      id: 4,
      title: 'Análisis técnico: Colombia en el escenario económico global 2024',
      summary: 'Estudio independiente evalúa oportunidades y riesgos económicos para Colombia.',
      fullContent: `Un consorcio de instituciones académicas independientes publicó un análisis comprehensivo sobre el posicionamiento de Colombia en el escenario económico global para 2024, identificando tanto oportunidades como riesgos significativos.

El estudio, coordinado por la Universidad de los Andes en alianza con universidades internacionales, presenta una evaluación objetiva basada en 50 indicadores económicos y proyecciones de organismos multilaterales.

Según el informe, Colombia muestra signos positivos en la diversificación de sus exportaciones, el crecimiento del sector servicios y la estabilidad macroeconómica, pero enfrenta desafíos en competitividad, infraestructura y capital humano.

"Colombia tiene fundamentos sólidos para crecer, pero requiere reformas estructurales que mejoren la productividad y la competitividad", señala la economista María Alejandra Vélez, directora del estudio.

El análisis destaca cinco sectores con mayor potencial de crecimiento: tecnología e innovación, turismo sostenible, agroindustria, economía naranja y energías renovables.

En tecnología, Colombia ha mostrado avances significativos con el crecimiento del ecosistema de startups, que atrajo inversiones por $800 millones de dólares en 2023, posicionando al país como hub tecnológico regional.

El turismo sostenible presenta oportunidades importantes, especialmente en ecoturismo y turismo cultural, sectores que podrían generar 300,000 empleos adicionales si se desarrollan adecuadamente.

Sin embargo, el estudio también identifica riesgos que requieren atención inmediata: la alta informalidad laboral (47%), el déficit en infraestructura de transporte y la brecha digital que afecta especialmente a las regiones rurales.

Los académicos recomiendan una agenda de reformas que incluya la modernización del sistema educativo, la inversión en infraestructura 4G y 5G, y el fortalecimiento de las instituciones regulatorias.

"El éxito económico de Colombia dependerá de su capacidad para generar consensos políticos en torno a reformas de largo plazo", concluye el documento.

El estudio será presentado oficialmente ante el Congreso de la República, gremios económicos y organizaciones internacionales durante febrero de 2024.`,
      category: 'independiente',
      source: 'Consorcio Académico Independiente',
      time: '4 horas',
      image: '⚖️',
      engagement: { likes: 234, shares: 123, comments: 67 },
      readTime: '8 min',
      political_lean: 'independiente',
      tags: ['economía', 'análisis', 'competitividad', 'desarrollo'],
      relatedLinks: [
        'Estudio completo - 250 páginas',
        'Datos y estadísticas interactivas',
        'Comparativo regional América Latina'
      ]
    },
    {
      id: 5,
      title: 'Innovación educativa: Colombia lidera programa de IA en universidades',
      summary: 'Ministerio de Educación lanza iniciativa para integrar inteligencia artificial en la educación superior.',
      fullContent: `Colombia se posiciona como pionero en América Latina con el lanzamiento del programa "IA-Educación 2024", una iniciativa que integrará la inteligencia artificial en los procesos de enseñanza-aprendizaje de todas las universidades públicas del país.

La ministra de Educación, Aurora Vergara, anunció que el programa beneficiará directamente a 500,000 estudiantes universitarios y 25,000 docentes en 67 instituciones de educación superior públicas.

"Estamos preparando a las nuevas generaciones para los empleos del futuro. La inteligencia artificial no es una amenaza, sino una herramienta transformadora para democratizar el conocimiento", declaró la ministra.

El programa incluye la creación de 15 centros especializados en IA distribuidos estratégicamente en diferentes regiones, laboratorios de realidad virtual para carreras técnicas y plataformas de aprendizaje adaptativo que personalizan la educación según las necesidades de cada estudiante.

La Universidad Nacional liderará el componente de investigación con la creación del Instituto Colombiano de Inteligencia Artificial, que desarrollará soluciones tecnológicas específicas para los retos del país en agricultura, salud y educación.

En alianza con empresas tecnológicas como Microsoft, Google y IBM, se implementarán programas de certificación internacional que permitirán a los estudiantes acceder a empleos globales desde Colombia.

El plan también contempla la capacitación de docentes en metodologías pedagógicas digitales, con 40 horas de formación obligatoria en herramientas de IA educativa para todos los profesores universitarios.

Una de las innovaciones más destacadas es la creación de "tutores virtuales" basados en IA que estarán disponibles 24/7 para resolver dudas académicas en tiempo real, especialmente beneficiando a estudiantes de regiones remotas.

El programa tendrá una inversión de 2 billones de pesos en cuatro años, financiado con recursos del presupuesto nacional, créditos del Banco Mundial y aportes de la cooperación internacional.

"Queremos que un estudiante de la Amazonia tenga las mismas oportunidades educativas que uno de Bogotá. La tecnología es el gran igualador social", concluyó la ministra.

Los primeros pilotos comenzarán en marzo de 2024 en las universidades Nacional, Antioquia, Valle y Atlántico, para posteriormente expandirse a todo el sistema.`,
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '5 horas',
      image: '📚',
      engagement: { likes: 567, shares: 345, comments: 123 },
      readTime: '6 min',
      political_lean: 'independiente',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: ['educación', 'inteligencia artificial', 'innovación', 'tecnología'],
      relatedLinks: [
        'Programa IA-Educación - Detalles completos',
        'Mapa de centros especializados',
        'Cronograma de implementación'
      ]
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory || item.political_lean === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading
  };

  // Article Detail View
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-6">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              ← Volver a noticias
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedArticle.title}</h1>
                <p className="text-xl text-blue-100 mb-4">{selectedArticle.summary}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-white ${
                    categories.find(c => c.id === selectedArticle.category)?.color || 'bg-gray-500'
                  }`}>
                    {categories.find(c => c.id === selectedArticle.category)?.icon} {categories.find(c => c.id === selectedArticle.category)?.name}
                  </span>
                  <span>📍 {selectedArticle.source}</span>
                  <span>⏰ hace {selectedArticle.time}</span>
                  <span>📖 {selectedArticle.readTime}</span>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <h3 className="font-semibold mb-3">📊 Engagement</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>👍 Me gusta:</span>
                      <span className="font-bold">{selectedArticle.engagement.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📤 Compartidas:</span>
                      <span className="font-bold">{selectedArticle.engagement.shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💬 Comentarios:</span>
                      <span className="font-bold">{selectedArticle.engagement.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Article Body */}
                <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                  {selectedArticle.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6">{paragraph}</p>
                  ))}
                </div>

                {/* Video Embed if available */}
                {selectedArticle.videoUrl && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">📺 Video relacionado</h3>
                    <div className="aspect-video bg-gray-100 rounded-lg p-4 text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-gray-600">Video: Análisis completo del tema</p>
                      <button className="mt-3 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        ▶️ Reproducir Video
                      </button>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedArticle.tags && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">🏷️ Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      👍 Me gusta ({selectedArticle.engagement.likes})
                    </button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      📤 Compartir
                    </button>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                      💬 Discutir en Comunidad
                    </button>
                    <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold">
                      💾 Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Related Links */}
              {selectedArticle.relatedLinks && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">🔗 Enlaces relacionados</h3>
                  <div className="space-y-3">
                    {selectedArticle.relatedLinks.map((link, index) => (
                      <a key={index} href="#" className="block text-blue-600 hover:text-blue-800 text-sm transition-colors">
                        → {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Options */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">📤 Compartir</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    📘 Facebook
                  </button>
                  <button className="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-600 transition-colors text-sm">
                    🐦 Twitter
                  </button>
                  <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    📱 WhatsApp
                  </button>
                  <button className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors text-sm">
                    💼 LinkedIn
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">📰 Artículos relacionados</h3>
                <div className="space-y-4">
                  {news.filter(n => n.id !== selectedArticle.id && n.category === selectedArticle.category).slice(0, 3).map((article) => (
                    <div key={article.id} className="border-b pb-3 last:border-b-0">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <h4 className="font-medium text-sm mb-1">{article.title}</h4>
                        <p className="text-xs text-gray-600">{article.time} • {article.source}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main News Feed View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">📰 Noticias Colombia</h1>
              <p className="text-blue-100">Cobertura completa, análisis profundo, múltiples perspectivas</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowReels(!showReels)}
                className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/30 transition-colors font-medium"
              >
                {showReels ? '📰 Noticias' : '🎬 Reels'}
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                {viewMode === 'grid' ? '📋 Lista' : '⊞ Grid'}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar noticias por título, autor, tema..."
                className="w-full px-4 py-3 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar - Fully Scrollable */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 overflow-x-auto">
              <div className="flex space-x-3 pb-2" style={{ width: 'max-content' }}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.id
                        ? `${category.color} text-white shadow-lg transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-600 text-lg">Cargando noticias...</p>
            <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  📊 {filteredNews.length} artículos en "{categories.find(c => c.id === selectedCategory)?.name}"
                </span>
                <div className="flex items-center space-x-4">
                  <span>🔄 Actualizado hace 5 min</span>
                  <span>👀 2,847 lectores activos</span>
                </div>
              </div>
            </div>

            {/* News Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredNews.map((article) => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Article Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        categories.find(c => c.id === article.category)?.color || 'bg-gray-500'
                      }`}>
                        {categories.find(c => c.id === article.category)?.icon} {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-gray-500 text-sm">hace {article.time}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📍 {article.source}</span>
                      <span>📖 {article.readTime}</span>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>👍 {article.engagement.likes}</span>
                        <span>📤 {article.engagement.shares}</span>
                        <span>💬 {article.engagement.comments}</span>
                      </div>
                      <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                        Leer más →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg">
                📰 Cargar más noticias
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedNews;