import React, { useState } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  time: string;
  image: string;
  engagement: { likes: number; shares: number; comments: number };
  author: string;
  readTime: number;
  region?: string;
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedRegion, setSelectedRegion] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'derecha', name: 'Conservador', icon: '🟠' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' }
  ];

  const regions = [
    { id: 'todas', name: 'Todas las Regiones' },
    { id: 'bogota', name: 'Bogotá' },
    { id: 'antioquia', name: 'Antioquia' },
    { id: 'valle', name: 'Valle del Cauca' },
    { id: 'santander', name: 'Santander' },
    { id: 'nacional', name: 'Nacional' }
  ];

  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
      content: `El Ministerio de Educación Nacional anunció oficialmente el lanzamiento del "Programa Nacional de Becas Colombia Avanza", una iniciativa que beneficiará a 50,000 estudiantes de bajos recursos económicos en todo el país.

La ministra de Educación, Aurora Vergara, explicó que este programa representa una inversión de $800,000 millones de pesos y cubrirá el 100% de las matrículas universitarias para estudiantes pertenecientes a los estratos 1 y 2.

"Este es un programa histórico que permitirá que miles de jóvenes colombianos accedan a educación superior de calidad sin importar su condición socioeconómica", declaró la ministra durante el evento de lanzamiento.

El programa incluye:
- Cobertura total de matrícula universitaria
- Subsidio de sostenimiento mensual de $500,000
- Apoyo para materiales de estudio
- Mentorías académicas y profesionales

Los beneficiarios serán seleccionados a través de un proceso transparente que considerará el rendimiento académico, la situación socioeconómica y el potencial de impacto social de cada candidato.

Las inscripciones se abrirán el próximo mes y los estudiantes podrán aplicar a través de la plataforma digital del Ministerio de Educación.`,
      category: 'educacion',
      source: 'Ministerio de Educación',
      time: '2 horas',
      image: '📚',
      engagement: { likes: 245, shares: 89, comments: 34 },
      author: 'Redacción Educación',
      readTime: 4,
      region: 'nacional'
    },
    {
      id: 2,
      title: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
      summary: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025.',
      content: `La Alcaldía de Bogotá presentó el "Plan Verde 2025", una estrategia integral para combatir la contaminación del aire que incluye medidas innovadoras y tecnológicas para mejorar la calidad de vida de más de 8 millones de habitantes.

El alcalde Gustavo Bolívar anunció que la administración invertirá $2.5 billones de pesos en los próximos tres años para implementar soluciones sostenibles y efectivas.

Las medidas principales incluyen:

**Transporte Limpio:**
- Renovación del 60% de la flota de buses con vehículos eléctricos
- Ampliación del sistema de ciclorrutas en 200 kilómetros
- Restricción vehicular para automóviles con más de 20 años

**Áreas Verdes:**
- Siembra de 100,000 árboles nativos en toda la ciudad
- Creación de 50 nuevos parques urbanos
- Techos verdes obligatorios en nuevas construcciones

**Monitoreo Tecnológico:**
- Instalación de 200 sensores de calidad del aire
- Sistema de alertas tempranas para ciudadanos
- Aplicación móvil con información en tiempo real

La meta es reducir las concentraciones de PM2.5 en un 30% y posicionar a Bogotá como referente regional en sostenibilidad urbana.`,
      category: 'ambiente',
      source: 'Alcaldía de Bogotá',
      time: '4 horas',
      image: '🌱',
      engagement: { likes: 189, shares: 67, comments: 28 },
      author: 'Equipo Ambiental',
      readTime: 5,
      region: 'bogota'
    },
    {
      id: 5,
      title: 'Centro Democrático propone nueva agenda conservadora para 2025',
      summary: 'El partido de oposición presenta propuestas sobre seguridad, economía de mercado y valores tradicionales.',
      content: `El Centro Democrático presentó oficialmente su "Agenda Conservadora 2025", un documento programático que establece las prioridades del partido para los próximos años, enfocándose en seguridad ciudadana, libre mercado y fortalecimiento institucional.

La senadora María Fernanda Cabal, quien lideró la elaboración del documento, explicó que esta agenda responde a las necesidades urgentes del país y ofrece alternativas viables a las políticas actuales.

**Pilares de la Agenda:**

**1. Seguridad y Orden Público**
- Fortalecimiento de las Fuerzas Armadas con presupuesto adicional de $5 billones
- Programa de inteligencia para combatir organizaciones criminales
- Cero tolerancia al vandalismo y disturbios urbanos

**2. Economía de Libre Mercado**
- Reducción del impuesto de renta empresarial del 35% al 20%
- Eliminación de trabas burocráticas para la creación de empresas
- Atracción de inversión extranjera con incentivos fiscales

**3. Valores y Familia**
- Promoción de la familia tradicional como núcleo de la sociedad
- Educación en valores cívicos y patrióticos
- Protección de la libertad religiosa y de culto

**4. Institucionalidad**
- Reforma a la justicia para mayor celeridad en los procesos
- Lucha frontal contra la corrupción
- Fortalecimiento del Estado de Derecho

El expresidente Álvaro Uribe respalda esta iniciativa y considera que representa "el verdadero cambio que Colombia necesita".

La propuesta será socializada en las principales ciudades del país durante los próximos meses.`,
      category: 'derecha',
      source: 'Centro Democrático',
      time: '1 hora',
      image: '🗳️',
      engagement: { likes: 312, shares: 156, comments: 89 },
      author: 'Redacción Política',
      readTime: 6,
      region: 'nacional'
    },
    {
      id: 6,
      title: 'Candidatos conservadores lideran encuestas en varias regiones',
      summary: 'Nuevas mediciones muestran crecimiento de candidatos de derecha en alcaldías y gobernaciones.',
      content: `Las más recientes encuestas electorales realizadas por Invamer revelan una tendencia favorable hacia candidatos conservadores en las principales regiones del país, consolidando un panorama político que podría definir el rumbo de las próximas elecciones locales.

**Resultados por Región:**

**Antioquia:**
El candidato conservador Federico Gutiérrez mantiene el liderazgo con 42% de intención de voto para la gobernación, seguido por el candidato liberal con 28%. Su propuesta de "Antioquia Próspera" ha resonado entre empresarios y clase media.

**Valle del Cauca:**
En Cali, la candidata conservadora Alejandra Borrero lidera las encuestas con 38% para la alcaldía, con una agenda centrada en seguridad ciudadana y desarrollo empresarial.

**Santander:**
El tradicional bastión conservador confirma su preferencia con 45% para el candidato de derecha, quien propone políticas de atracción de inversión petrolera y minera.

**Factores del Crecimiento:**

1. **Propuestas Económicas Claras:** Los candidatos conservadores han presentado planes específicos de reducción tributaria y estímulo empresarial.

2. **Enfoque en Seguridad:** Las propuestas de mano firme contra la delincuencia han ganado apoyo ciudadano.

3. **Respaldo Empresarial:** Gremios económicos han expresado apoyo a candidatos conservadores.

4. **Experiencia en Gestión:** Varios candidatos cuentan con experiencia previa en administración pública o privada.

Los analistas políticos señalan que estos resultados reflejan una búsqueda de estabilidad y crecimiento económico por parte del electorado.`,
      category: 'derecha',
      source: 'Encuestas Invamer',
      time: '3 horas',
      image: '📊',
      engagement: { likes: 278, shares: 134, comments: 67 },
      author: 'Departamento de Encuestas',
      readTime: 5,
      region: 'nacional'
    }
  ];

  const filteredNews = news.filter(item => {
    const categoryMatch = selectedCategory === 'todas' || item.category === selectedCategory;
    const regionMatch = selectedRegion === 'todas' || item.region === selectedRegion;
    return categoryMatch && regionMatch;
  });

  if (selectedArticle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <span>←</span>
            <span>Volver a noticias</span>
          </button>

          {/* Article Content */}
          <article className="bg-white rounded-lg shadow-lg p-8">
            <header className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedArticle.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                  selectedArticle.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                  selectedArticle.category === 'salud' ? 'bg-red-100 text-red-800' :
                  selectedArticle.category === 'derecha' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {categories.find(c => c.id === selectedArticle.category)?.name}
                </span>
                <span className="text-sm text-gray-600">{selectedArticle.source}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">hace {selectedArticle.time}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>Por {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.readTime} min de lectura</span>
                {selectedArticle.region && (
                  <>
                    <span>•</span>
                    <span>{regions.find(r => r.id === selectedArticle.region)?.name}</span>
                  </>
                )}
              </div>
              
              <p className="text-lg text-gray-700 italic mb-6">{selectedArticle.summary}</p>
            </header>
            
            <div className="prose max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <span>👍</span>
                    <span>{selectedArticle.engagement.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                    <span>📤</span>
                    <span>{selectedArticle.engagement.shares}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <span>💬</span>
                    <span>{selectedArticle.engagement.comments}</span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Compartir
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Guardar
                  </button>
                </div>
              </div>
            </footer>
          </article>
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

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categorías:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
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
            
            {/* Regions */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Región:</h3>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
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
                      {article.region && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{regions.find(r => r.id === article.region)?.name}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => setSelectedArticle(article)}
                    >
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

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ReformaTributaria',
              '#CandidatosConservadores',
              '#NoticiasDerechaColombia',
              '#EducacionDigital',
              '#SeguridadCiudadana',
              '#EleccionesRegionales',
              '#EconomiaLibre'
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

export default News;