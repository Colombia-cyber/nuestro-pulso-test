import React, { useEffect, useState } from 'react';

type Article = {
  id: number;
  title: string;
  description: string;
  fullContent?: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
  category?: string;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
};

// Mock news data to replace external API calls
const mockNewsData = {
  colombian: [
    {
      id: 1,
      title: "Gustavo Petro anuncia nuevo plan de desarrollo sostenible para las regiones",
      description: "El presidente colombiano presenta una estrategia integral para el desarrollo económico y ambiental de las zonas rurales.",
      fullContent: "El presidente Gustavo Petro anunció hoy un ambicioso plan de desarrollo sostenible que busca transformar las regiones más apartadas de Colombia. La iniciativa, valorada en 15 billones de pesos, se enfocará en tres pilares fundamentales: desarrollo agrícola sostenible, infraestructura verde y educación rural. 'Este plan representa un cambio de paradigma en cómo entendemos el desarrollo territorial', declaró el mandatario durante la presentación en el Palacio de Nariño. El programa incluye la construcción de 500 kilómetros de vías terciarias, la implementación de sistemas de energía solar en 200 comunidades rurales, y la creación de 50,000 empleos verdes. Además, se establecerán centros de formación técnica en biotecnología y agricultura de precisión en 15 departamentos. La ministra de Agricultura, Jennifer Mojica, destacó que el plan priorizará la participación de comunidades étnicas y campesinas en la toma de decisiones. Se espera que la primera fase del proyecto inicie en marzo de 2024, comenzando por los departamentos de Nariño, Cauca y Putumayo.",
      source: { name: "Presidencia de Colombia" },
      publishedAt: "2024-01-15T10:30:00Z",
      url: "#",
      urlToImage: "/api/placeholder/400/200",
      category: "politica",
      engagement: { likes: 1247, shares: 389, comments: 156 }
    },
    {
      id: 2,
      title: "Colombia lidera iniciativa regional contra el cambio climático en la COP28",
      description: "El país presenta propuestas innovadoras para la conservación de la Amazonía y la transición energética.",
      fullContent: "Colombia se posicionó como líder en la lucha contra el cambio climático durante la COP28, presentando una propuesta integral para la conservación de la cuenca amazónica que involucra a ocho países sudamericanos. La iniciativa 'Amazonía Viva 2030' busca crear un corredor biológico de 6.7 millones de hectáreas protegidas, conectando áreas de conservación desde Venezuela hasta Bolivia. El ministro de Ambiente, Susana Muhamad, explicó que el proyecto incluye el desarrollo de tecnologías satelitales para monitoreo en tiempo real de la deforestación, sistemas de alertas tempranas para incendios forestales, y la implementación de un modelo de economía circular basado en productos forestales no maderables. La propuesta ha recibido el respaldo de la Unión Europea, que comprometió 850 millones de euros en financiación climática. Además, Colombia anunció su meta de alcanzar la neutralidad de carbono para 2045, cinco años antes de lo previsto inicialmente. El plan incluye la transición del 70% de la matriz energética a fuentes renovables para 2030, con énfasis en energía solar y eólica offshore en el Caribe colombiano.",
      source: { name: "Ministerio de Ambiente" },
      publishedAt: "2024-01-14T16:45:00Z",
      url: "#",
      urlToImage: "/api/placeholder/400/200",
      category: "ambiente",
      engagement: { likes: 892, shares: 267, comments: 89 }
    },
    {
      id: 3,
      title: "Nuevo récord en inversión extranjera directa impulsa la economía colombiana",
      description: "El país recibió 12.8 mil millones de dólares en IED durante 2023, superando las expectativas del gobierno.",
      fullContent: "Colombia cerró 2023 con una cifra récord de inversión extranjera directa (IED) de 12.8 mil millones de dólares, representando un crecimiento del 23% respecto al año anterior y superando las proyecciones gubernamentales en 1.8 mil millones. El ministro de Comercio, Industria y Turismo, Germán Umaña, destacó que los sectores de mayor atracción fueron tecnología (28%), energías renovables (22%), infraestructura (19%) y turismo sostenible (15%). Las principales inversiones provinieron de Estados Unidos (32%), España (18%), Reino Unido (12%) y Singapur (11%). Entre los proyectos destacados se encuentran la construcción del parque eólico más grande de Sudamérica en La Guajira por parte de Enel Green Power, el establecimiento de tres centros de datos de Microsoft en Bogotá y Medellín, y la expansión de Amazon Web Services en el país. ProColombia reportó que se crearon 185,000 empleos directos gracias a estas inversiones, con especial impacto en regiones como Antioquia, Valle del Cauca y Atlántico. El gobierno espera mantener esta tendencia positiva durante 2024, con metas de atraer 14 mil millones de dólares en IED, enfocándose especialmente en el sector de tecnologías limpias y biotecnología.",
      source: { name: "MinComercio" },
      publishedAt: "2024-01-13T09:15:00Z",
      url: "#",
      urlToImage: "/api/placeholder/400/200",
      category: "economia",
      engagement: { likes: 645, shares: 198, comments: 67 }
    }
  ],
  international: [
    {
      id: 4,
      title: "Cumbre de líderes latinoamericanos aborda crisis migratoria y seguridad regional",
      description: "Presidentes de 12 países se reúnen en Cartagena para establecer políticas migratorias conjuntas.",
      fullContent: "La XVIII Cumbre de Líderes Latinoamericanos celebrada en Cartagena de Indias concluyó con la adopción del 'Pacto de Cartagena para la Migración Digna y Segura', un acuerdo histórico firmado por los presidentes de 12 países de la región. El documento establece un marco de cooperación para abordar los flujos migratorios de manera coordinada, priorizando el respeto a los derechos humanos y la integración socioeconómica de los migrantes. Entre las medidas acordadas se encuentra la creación de un sistema regional de información migratoria, el establecimiento de corredores humanitarios para poblaciones vulnerables, y la implementación de programas de regularización migratoria temporal. El presidente Petro, como anfitrión, enfatizó que 'la migración no es un problema sino una oportunidad de desarrollo cuando se gestiona con políticas integrales y humanitarias'. La cumbre también abordó temas de seguridad regional, acordando la creación de una fuerza conjunta contra el crimen organizado transnacional y el fortalecimiento de los mecanismos de intercambio de inteligencia. Se destinaron 2.3 mil millones de dólares para financiar estos programas durante los próximos cinco años, con aportes del Banco Interamericano de Desarrollo y organismos internacionales.",
      source: { name: "Cancillería de Colombia" },
      publishedAt: "2024-01-12T14:22:00Z",
      url: "#",
      urlToImage: "/api/placeholder/400/200",
      category: "politica",
      engagement: { likes: 1156, shares: 445, comments: 203 }
    }
  ],
  technology: [
    {
      id: 5,
      title: "Colombia lanza la primera red 5G pública en Latinoamérica para ciudades inteligentes",
      description: "Bogotá, Medellín y Cali implementan infraestructura 5G para transformar los servicios públicos digitales.",
      fullContent: "Colombia se convirtió en el primer país de Latinoamérica en implementar una red 5G completamente pública, con cobertura inicial en Bogotá, Medellín y Cali. El proyecto, denominado 'Colombia 5G', es una iniciativa conjunta entre el Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) y la Agencia Nacional del Espectro (ANE), con una inversión de 850 mil millones de pesos. La ministra TIC, Sandra Urrutia, explicó que la red permitirá la implementación de soluciones de ciudad inteligente, incluyendo semáforos inteligentes que reducen el tráfico en un 35%, sistemas de monitoreo ambiental en tiempo real, y plataformas de telesalud para atención médica remota. El primer caso de uso exitoso se implementó en el sistema de transporte público de Bogotá, donde autobuses autónomos comenzaron a operar en rutas piloto del TransMilenio. Estos vehículos, equipados con sensores LiDAR y cámaras de alta definición conectadas a la red 5G, pueden comunicarse entre sí y con la infraestructura vial para optimizar rutas y prevenir accidentes. Se espera que para diciembre de 2024, la cobertura 5G se extienda a 15 ciudades adicionales, beneficiando a más de 25 millones de colombianos con servicios digitales avanzados.",
      source: { name: "MinTIC" },
      publishedAt: "2024-01-11T11:30:00Z",
      url: "#",
      urlToImage: "/api/placeholder/400/200",
      category: "tecnologia",
      engagement: { likes: 2134, shares: 567, comments: 234 }
    }
  ]
};

const fetchMockNews = async (category: string): Promise<Article[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch (category) {
    case 'colombian':
      return mockNewsData.colombian;
    case 'international':
      return mockNewsData.international;
    case 'technology':
      return mockNewsData.technology;
    default:
      return [...mockNewsData.colombian, ...mockNewsData.international, ...mockNewsData.technology];
  }
};

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [internationalNews, setInternationalNews] = useState<Article[]>([]);
  const [technologyNews, setTechnologyNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [co, intl, tech] = await Promise.all([
          fetchMockNews('colombian'),
          fetchMockNews('international'),
          fetchMockNews('technology'),
        ]);
        setColombianNews(co);
        setInternationalNews(intl);
        setTechnologyNews(tech);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleLoadMore = async (category: string) => {
    // Simulate loading more articles - generate unique content
    const generateMoreArticles = (baseCategoryData: Article[], categoryName: string): Article[] => {
      const moreArticles: Article[] = [];
      const baseId = Math.max(...baseCategoryData.map(a => a.id), 0);
      
      for (let i = 1; i <= 3; i++) {
        moreArticles.push({
          id: baseId + i,
          title: `Nueva noticia ${categoryName} #${i} - ${new Date().toLocaleTimeString()}`,
          description: `Esta es una nueva noticia generada dinámicamente para la categoría ${categoryName}. Contenido actualizado cada vez que se carga más información.`,
          fullContent: `Contenido completo para la noticia ${i} de ${categoryName}. Esta noticia fue generada dinámicamente para mostrar la funcionalidad de "Cargar más" sin repetir el mismo contenido. El sistema puede generar contenido único cada vez que el usuario solicita más información.`,
          source: { name: `Fuente Dinámica ${categoryName}` },
          publishedAt: new Date().toISOString(),
          url: "#",
          urlToImage: "/api/placeholder/400/200",
          category: categoryName.toLowerCase(),
          engagement: { 
            likes: Math.floor(Math.random() * 500) + 50, 
            shares: Math.floor(Math.random() * 100) + 10, 
            comments: Math.floor(Math.random() * 50) + 5 
          }
        });
      }
      return moreArticles;
    };
    
    if (category === 'colombian') {
      const newColombianArticles = generateMoreArticles(colombianNews, 'Colombia');
      setColombianNews(prev => [...prev, ...newColombianArticles]);
    } else if (category === 'international') {
      const newInternationalArticles = generateMoreArticles(internationalNews, 'Internacional');
      setInternationalNews(prev => [...prev, ...newInternationalArticles]);
    } else if (category === 'technology') {
      const newTechnologyArticles = generateMoreArticles(technologyNews, 'Tecnología');
      setTechnologyNews(prev => [...prev, ...newTechnologyArticles]);
    }
  };

  const shareArticle = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href + '#article-' + article.id,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}#article-${article.id}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  const NewsSection = ({ title, articles, category, color }: { 
    title: string; 
    articles: Article[]; 
    category: string;
    color: string;
  }) => (
    <div className="md:w-1/3 w-full h-[70vh] overflow-y-auto">
      <h2 className={`text-lg font-bold mb-2 ${color}`}>{title}</h2>
      {loading && articles.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Cargando noticias...</span>
        </div>
      ) : (
        <div className="space-y-2">
          {articles.map((article, idx) => (
            <div
              key={`${article.id}-${idx}`}
              onClick={() => handleArticleClick(article)}
              className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-2 shadow transition cursor-pointer group"
            >
              <div className="font-semibold text-[#EF3340] group-hover:text-blue-600 transition-colors">
                {article.title}
              </div>
              <div className="text-gray-700 text-sm mt-1 line-clamp-2">{article.description}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString('es-CO')}</span>
              </div>
              {article.engagement && (
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{article.engagement.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📤</span>
                    <span>{article.engagement.shares}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{article.engagement.comments}</span>
                  </span>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLoadMore(category);
            }}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Cargar más noticias
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <NewsSection 
        title="Noticias de Colombia" 
        articles={colombianNews} 
        category="colombian"
        color="text-[#0033A0]"
      />
      <NewsSection 
        title="Noticias Internacionales" 
        articles={internationalNews} 
        category="international"
        color="text-[#0033A0]"
      />
      <NewsSection 
        title="Tecnología e Innovación" 
        articles={technologyNews} 
        category="technology"
        color="text-[#0033A0]"
      />

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
                <span className="font-medium">{selectedArticle.source?.name}</span>
                <span>•</span>
                <span>{new Date(selectedArticle.publishedAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
                {selectedArticle.category && (
                  <>
                    <span>•</span>
                    <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {selectedArticle.category}
                    </span>
                  </>
                )}
              </div>

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  {selectedArticle.description}
                </p>
                {selectedArticle.fullContent && (
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedArticle.fullContent}
                  </div>
                )}
              </div>

              {selectedArticle.engagement && (
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
              )}

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
  );
}