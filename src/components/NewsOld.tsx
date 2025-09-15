import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const News: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    { id: 'salud', name: 'Salud', icon: '🏥' }
  ];

  const news = [
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
      political_lean: 'independiente'
    },
    {
      id: 2,
      title: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
      summary: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025.',
      fullContent: `La alcaldía de Bogotá presentó ayer el "Plan Aire Limpio 2024-2028", una estrategia integral que busca reducir significativamente los niveles de contaminación atmosférica en la capital colombiana.

El alcalde Carlos Fernando Galán anunció que la ciudad invertirá 2 billones de pesos en los próximos cuatro años para implementar medidas que incluyen la ampliación del sistema de transporte público eléctrico, la creación de nuevas zonas verdes y la implementación de tecnologías de monitoreo ambiental en tiempo real.

Entre las medidas más destacadas se encuentra la expansión del sistema TransMilenio con 200 buses eléctricos adicionales, la creación de 15 nuevos parques urbanos y la implementación de ciclovías que conectarán todos los sectores de la ciudad.

El plan también incluye restricciones más estrictas para vehículos particulares en el centro de la ciudad y incentivos fiscales para empresas que adopten tecnologías limpias.

"Nuestro objetivo es que Bogotá sea una ciudad modelo en sostenibilidad ambiental para América Latina", declaró el alcalde durante la presentación del plan.

Los primeros resultados del plan se esperan ver en los próximos seis meses, con la instalación de nuevas estaciones de monitoreo de calidad del aire en 50 puntos estratégicos de la ciudad.`,
      category: 'ambiente',
      source: 'Alcaldía de Bogotá',
      time: '4 horas',
      image: '🌱',
      engagement: { likes: 189, shares: 67, comments: 28 },
      readTime: '5 min',
      political_lean: 'izquierda'
    },
    {
      id: 3,
      title: 'Centro Democrático propone nueva agenda conservadora para 2025',
      summary: 'El partido de oposición presenta propuestas sobre seguridad, economía de mercado y valores tradicionales.',
      fullContent: `El Centro Democrático, principal partido de oposición en Colombia, presentó oficialmente su agenda política para 2025, enfocada en tres pilares fundamentales: seguridad ciudadana, crecimiento económico y fortalecimiento de los valores tradicionales.

El expresidente Álvaro Uribe, junto con el actual presidente del partido, dirigió la presentación de este plan que incluye 50 propuestas específicas para el desarrollo nacional.

En materia de seguridad, el partido propone aumentar el pie de fuerza policial en un 40%, implementar tecnología de reconocimiento facial en las principales ciudades y endurecer las penas para delitos como el hurto y la extorsión.

En el ámbito económico, la agenda incluye una reducción del 5% en el impuesto de renta para empresas que generen más de 100 empleos formales, la eliminación de tramitología innecesaria para emprendedores y la creación de zonas económicas especiales en regiones fronterizas.

"Colombia necesita un rumbo claro hacia la prosperidad y la seguridad. Nuestra agenda representa las aspiraciones de millones de colombianos que quieren progresar en libertad", declaró Uribe durante el evento.

El partido también propone fortalecer la familia como núcleo fundamental de la sociedad y garantizar la libertad de educación para que los padres puedan elegir la formación de sus hijos.

La agenda será presentada formalmente en el Congreso de la República el próximo mes, donde el Centro Democrático buscará generar alianzas con otros sectores políticos afines.`,
      category: 'derecha',
      source: 'Centro Democrático',
      time: '1 hora',
      image: '🗳️',
      engagement: { likes: 312, shares: 156, comments: 89 },
      readTime: '6 min',
      political_lean: 'derecha'
    },
    {
      id: 4,
      title: 'Pacto Histórico impulsa reforma al sistema pensional con enfoque social',
      summary: 'La coalición de gobierno presenta propuesta para garantizar pensiones dignas a trabajadores informales.',
      fullContent: `El Pacto Histórico, coalición que apoya al presidente Gustavo Petro, anunció una nueva propuesta de reforma al sistema pensional que busca garantizar una vejez digna para todos los colombianos, especialmente para quienes han trabajado en la informalidad.

La senadora Isabel Zuleta, ponente principal de la reforma, explicó que el nuevo sistema establecería una pensión básica universal de $500,000 pesos mensuales para todos los adultos mayores de 65 años que no tengan acceso a otros mecanismos pensionales.

La propuesta incluye la creación de un fondo solidario financiado con aportes del Estado, empleadores y trabajadores, que garantizaría sostenibilidad financiera a largo plazo.

"No podemos permitir que millones de colombianos que han trabajado toda su vida terminen en la indigencia por no haber podido cotizar formalmente", declaró Zuleta durante la presentación de la propuesta.

El nuevo sistema mantendría el régimen de prima media administrado por Colpensiones como pilar principal, pero eliminaría gradualmente los fondos privados de pensiones, trasladando esos recursos al sistema público.

La reforma también propone reducir de 1,300 a 1,000 las semanas de cotización requeridas para acceder a una pensión y establecer mecanismos especiales para mujeres, teniendo en cuenta su expectativa de vida y las brechas laborales por cuidado de hijos.

El gobierno espera radicar el proyecto en el Congreso antes de finalizar el año, con la meta de que entre en vigencia en 2026.`,
      category: 'izquierda',
      source: 'Pacto Histórico',
      time: '3 horas',
      image: '🌹',
      engagement: { likes: 298, shares: 134, comments: 78 },
      readTime: '5 min',
      political_lean: 'izquierda'
    },
    {
      id: 5,
      title: 'Análisis independiente: Los retos económicos de Colombia en 2024',
      summary: 'Expertos académicos evalúan objetivamente los desafíos y oportunidades económicas del país.',
      fullContent: `Un grupo de economistas independientes de las universidades Javeriana, Nacional y Andes publicó un análisis comprehensivo sobre los principales retos económicos que enfrentará Colombia en 2024.

El estudio, liderado por la economista María José Ramírez de la Universidad Nacional, identifica cinco desafíos críticos: la inflación persistente, el desempleo juvenil, la informalidad laboral, el déficit fiscal y la dependencia de commodities.

Según el análisis, aunque la inflación ha mostrado signos de desaceleración, aún se mantiene por encima de la meta del Banco de la República del 3%. Los expertos recomiendan mantener una política monetaria prudente y evitar presiones fiscales adicionales.

En cuanto al empleo, el estudio revela que el 47% de los jóvenes entre 18 y 25 años no tiene acceso a empleo formal, lo que representa un riesgo social significativo. Los académicos proponen incentivos tributarios para empresas que contraten jóvenes y programas de capacitación técnica alineados con las demandas del mercado laboral.

El informe también destaca oportunidades en sectores como la tecnología, el turismo sostenible y la agroindustria, que podrían generar empleos de calidad y reducir la dependencia del país en exportaciones tradicionales.

"Colombia tiene el potencial para diversificar su economía, pero requiere políticas de Estado coherentes y sostenidas en el tiempo, independientemente del gobierno de turno", concluye el estudio.

Los economistas recomiendan crear un consejo económico nacional permanente que trascienda los cambios políticos y mantenga la continuidad en las políticas públicas esenciales.`,
      category: 'independiente',
      source: 'Consorcio Académico',
      time: '6 horas',
      image: '⚖️',
      engagement: { likes: 167, shares: 92, comments: 45 },
      readTime: '7 min',
      political_lean: 'independiente'
    }
  ];

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory || item.political_lean === selectedCategory);

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