import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteNews } from '../hooks/useInfiniteScroll';
import { dataService } from '../services/dataService';
import { NewsData } from '../data/mockDataGenerator';
import Comments from './Comments';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsData | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsData[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

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
    { id: 'terror', name: 'Terror', icon: '🚨' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'tecnologia', name: 'Technology', icon: '💻' }
  ];

  // Use infinite scroll hook for news
  const {
    data: news,
    loading,
    error,
    hasMore,
    totalItems,
    metadata,
    refresh,
    retry,
    observeElement
  } = useInfiniteNews({
    category: selectedCategory,
    enabled: true
  });

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (sentinelRef.current) {
      observeElement(sentinelRef.current);
    }
  }, [observeElement]);

  // Load trending topics and breaking news
  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const [trending, live] = await Promise.all([
          dataService.getTrendingTopics(selectedCategory),
          dataService.getLiveContent()
        ]);
        setTrendingTopics(trending);
        setBreakingNews(live.news);
      } catch (err) {
        console.warn('Failed to load additional data:', err);
      }
    };

    loadAdditionalData();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedArticle(null); // Reset selected article when changing category
  };

  const handleArticleClick = (article: NewsData) => {
    setSelectedArticle(article);
  };

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
    },
    {
      id: 6,
      title: 'Alerta de seguridad: Incrementan amenazas terroristas en zonas fronterizas',
      summary: 'Fuerzas militares colombianas reportan aumento en actividad de grupos armados ilegales en la frontera con Venezuela.',
      fullContent: `El Alto Mando Militar de Colombia emitió una alerta de seguridad tras detectar un incremento significativo en la actividad de grupos armados ilegales en las zonas fronterizas con Venezuela, particularmente en los departamentos de Norte de Santander y Arauca.

Según el informe del general Carlos Alberto Patiño, comandante de las Fuerzas Militares, se han identificado nuevas rutas de tráfico de armas y drogas utilizadas por grupos residuales de las FARC y bandas criminales que operan desde territorio venezolano.

"Hemos detectado un patrón preocupante en el incremento de amenazas contra la población civil y nuestras unidades militares", declaró Patiño durante una rueda de prensa en el Ministerio de Defensa.

El informe indica que estos grupos han intensificado sus actividades de extorsión, secuestro y atentados contra la infraestructura petrolera de la región. En los últimos tres meses se han registrado 15 atentados contra oleoductos y torres de energía eléctrica.

La respuesta del gobierno ha incluido el refuerzo de 2,000 soldados adicionales en la zona y la implementación de nuevas tecnologías de vigilancia satelital proporcionadas por Estados Unidos y la Unión Europea.

Las autoridades venezolanas han sido notificadas oficialmente sobre estas actividades, aunque hasta el momento no han respondido a las solicitudes de cooperación binacional para combatir estos grupos.

La población civil ha sido evacuada preventivamente de tres municipios considerados de alto riesgo, mientras se mantiene un cordón de seguridad en un radio de 50 kilómetros de la frontera.`,
      category: 'terror',
      source: 'Reuters Colombia',
      time: '30 minutos',
      image: '🚨',
      engagement: { likes: 89, shares: 234, comments: 156 },
      readTime: '6 min',
      political_lean: 'independiente'
    },
    {
      id: 7,
      title: 'Congreso aprueba proyecto de ley sobre inteligencia artificial en el sector público',
      summary: 'El Senado colombiano aprobó en primer debate una normativa para regular el uso de IA en entidades gubernamentales.',
      fullContent: `El Senado de la República aprobó en primer debate el proyecto de ley que busca regular el uso de inteligencia artificial en el sector público colombiano, convirtiéndose en uno de los primeros países de América Latina en abordar esta temática legislativa.

La iniciativa, presentada por la senadora María José Pizarro del Pacto Histórico y respaldada por parlamentarios de diferentes bancadas, establece un marco normativo para garantizar el uso ético y transparente de la IA en entidades estatales.

El proyecto define principios fundamentales como la transparencia algorítmica, la no discriminación, la protección de datos personales y la rendición de cuentas en los sistemas de IA utilizados por el gobierno.

"Esta ley posiciona a Colombia como líder regional en la regulación de tecnologías emergentes", declaró Pizarro durante el debate en el pleno del Senado.

La normativa establece que todas las entidades públicas deberán registrar sus sistemas de IA ante una nueva autoridad regulatoria, además de someterse a auditorías periódicas para verificar el cumplimiento de los estándares éticos.

El ministro de Tecnologías de la Información y las Comunicaciones, Mauricio Lizcano, respaldó la iniciativa y anunció que el gobierno destinará $50 mil millones de pesos para implementar los nuevos estándares.

La oposición, liderada por el Centro Democrático, expresó preocupaciones sobre los costos de implementación y solicitó un estudio de impacto fiscal antes de la votación en segundo debate.

El proyecto ahora pasa a la Cámara de Representantes, donde se espera que sea debatido durante las próximas semanas.`,
      category: 'congreso',
      source: 'AP News Colombia',
      time: '1 hora',
      image: '🏛️',
      engagement: { likes: 342, shares: 127, comments: 98 },
      readTime: '5 min',
      political_lean: 'independiente'
    },
    {
      id: 8,
      title: 'Trump anuncia nueva política comercial que afectaría exportaciones colombianas',
      summary: 'El expresidente estadounidense propone aranceles adicionales a productos agrícolas latinoamericanos en caso de volver al poder.',
      fullContent: `Durante un mitin en Florida, el expresidente Donald Trump anunció su intención de implementar nuevos aranceles comerciales que afectarían significativamente las exportaciones colombianas, particularmente en los sectores de café, flores y productos agrícolas.

La propuesta, que formaría parte de su plataforma electoral para 2024, incluye un arancel del 25% a productos agrícolas de países que "no cooperen adecuadamente" en la lucha contra el narcotráfico, una categoría en la que incluye a Colombia.

"Vamos a proteger a los agricultores estadounidenses de la competencia desleal y vamos a asegurar que los países que permiten el flujo de drogas hacia Estados Unidos paguen el precio", declaró Trump ante una multitud de seguidores.

La medida tendría un impacto devastador en la economía colombiana, considerando que Estados Unidos es el principal destino de las exportaciones del país, representando el 31% del total.

El embajador de Colombia en Washington, Francisco Santos, emitió un comunicado expresando "profunda preocupación" por estas declaraciones y recordando que Colombia es uno de los principales aliados de Estados Unidos en la lucha contra el narcotráfico.

Analistas económicos estiman que los aranceles propuestos por Trump podrían reducir las exportaciones colombianas en $3.2 mil millones anuales y afectar a más de 500,000 empleos directos e indirectos.

El presidente Gustavo Petro convocó a una reunión de emergencia del Consejo de Ministros para evaluar posibles respuestas diplomáticas y estrategias de diversificación comercial.

La Asociación Nacional de Exportadores (ANALDEX) solicitó al gobierno colombiano intensificar las gestiones diplomáticas para evitar que estas propuestas se materialicen.`,
      category: 'trump',
      source: 'BBC Mundo',
      time: '2 horas',
      image: '🇺🇸',
      engagement: { likes: 567, shares: 389, comments: 234 },
      readTime: '7 min',
      political_lean: 'independiente'
    },
    {
      id: 9,
      title: 'Colombia lanza plan nacional de transformación digital para 2030',
      summary: 'El gobierno presenta una estrategia integral para digitalizar el 80% de los trámites públicos y conectar todas las zonas rurales.',
      fullContent: `El Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) lanzó oficialmente el "Plan Nacional de Transformación Digital 2024-2030", una ambiciosa estrategia que busca posicionar a Colombia como líder tecnológico en América Latina.

El plan, que requiere una inversión de $8 billones de pesos durante seis años, tiene cuatro objetivos principales: digitalizar el 80% de los trámites gubernamentales, conectar el 95% del territorio nacional con internet de alta velocidad, formar un millón de ciudadanos en competencias digitales y crear 300,000 empleos en el sector tecnológico.

La ministra Carmen Ligia Valderrama explicó durante la presentación que el plan incluye la construcción de 5,000 kilómetros de fibra óptica, la instalación de 10,000 puntos de acceso Wi-Fi gratuito en zonas rurales y la creación de 50 centros de innovación tecnológica en todo el país.

"Esta es la transformación más ambiciosa que ha emprendido Colombia en materia tecnológica", declaró Valderrama en el evento realizado en el Centro de Innovación de Bogotá.

El sector privado también participará activamente en la iniciativa. Empresas como Claro, Movistar, Tigo y ETB han comprometido inversiones por $2 billones adicionales para acelerar el despliegue de redes 5G y mejorar la cobertura en zonas apartadas.

El plan incluye programas especiales para comunidades indígenas y afrodescendientes, garantizando que la transformación digital sea inclusiva y respete la diversidad cultural del país.

Los primeros resultados se esperan ver en 2025, con el lanzamiento de la plataforma "Colombia Digital", que centralizará todos los servicios gubernamentales en línea y permitirá a los ciudadanos realizar la mayoría de trámites desde sus dispositivos móviles.

La iniciativa cuenta con el respaldo del Banco Interamericano de Desarrollo (BID), que otorgó un crédito de $500 millones para financiar la primera fase del proyecto.`,
      category: 'tecnologia',
      source: 'El Tiempo Tecnología',
      time: '3 horas',
      image: '💻',
      engagement: { likes: 423, shares: 198, comments: 87 },
      readTime: '6 min',
      political_lean: 'independiente'
    }
  ];

  // Simulate loading news articles
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Error al cargar las noticias. Por favor, intenta nuevamente.');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory || item.political_lean === selectedCategory);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar noticias</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );

  // No content state component
  const NoContent = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📰</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No hay noticias disponibles</h3>
      <p className="text-gray-600 mb-6">
        No se encontraron artículos para la categoría seleccionada. 
        Intenta con otra categoría o busca temas específicos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setSelectedCategory('todas')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todas las noticias
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Buscar temas relacionados
        </button>
      </div>
    </div>
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

          {/* Comments Section */}
          <div className="mt-8">
            <Comments articleId={selectedArticle.id} articleTitle={selectedArticle.title} />
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
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : filteredNews.length === 0 ? (
            <NoContent />
          ) : (
            filteredNews.map((article) => (
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
          )))}
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