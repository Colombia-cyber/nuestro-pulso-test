export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  category: string;
  topic: string;
  image?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// Comprehensive news data covering key topics including Donald Trump
export const newsArticles: NewsArticle[] = [
  // Donald Trump News
  {
    id: "trump-1",
    title: "Donald Trump anuncia nueva agenda de política exterior para 2025",
    description: "El expresidente estadounidense presenta sus propuestas para las relaciones internacionales y el comercio global en una nueva administración.",
    content: `Donald Trump ha presentado oficialmente su agenda de política exterior para una potencial administración en 2025, enfocándose en el "America First" renovado y nuevas alianzas estratégicas.

La propuesta incluye una reestructuración de las relaciones comerciales con América Latina, incluyendo Colombia, con énfasis en acuerdos bilaterales que favorezcan el comercio justo y la seguridad fronteriza.

Trump anunció planes para fortalecer la cooperación en la lucha contra el narcotráfico con países latinoamericanos, proponiendo un nuevo marco de trabajo que incluye tecnología avanzada y apoyo logístico.

En cuanto a las relaciones con China, el plan propone aranceles selectivos y la repatriación de industrias clave a territorio estadounidense, lo que podría impactar significativamente los mercados globales.

La agenda también incluye una renovación de los acuerdos de defensa con aliados tradicionales y una nueva aproximación a los conflictos en Ucrania y Medio Oriente, priorizando la diplomacia directa por encima de las intervenciones multilaterales.`,
    source: { name: "Reuters" },
    publishedAt: "2024-09-15T10:00:00Z",
    url: "#",
    category: "politics",
    topic: "Donald Trump",
    engagement: { likes: 1247, shares: 456, comments: 234 }
  },
  {
    id: "trump-2", 
    title: "Análisis: El impacto de las propuestas económicas de Trump en América Latina",
    description: "Expertos internacionales evalúan cómo las políticas comerciales propuestas por Trump afectarían a las economías latinoamericanas.",
    content: `Un grupo de economistas de Harvard, Georgetown y la Universidad Nacional de Colombia han publicado un análisis comprehensivo sobre el potencial impacto de las propuestas económicas de Donald Trump en las economías latinoamericanas.

El estudio, liderado por la economista María Rodríguez de Harvard, identifica tanto oportunidades como riesgos para países como Colombia, México, Brasil y Argentina en un escenario de implementación de las políticas propuestas por Trump.

Entre las oportunidades identificadas está la posible reubicación de industrias manufactureras desde Asia hacia América Latina, lo que podría generar empleos y transferencia tecnológica en la región.

Sin embargo, los aranceles propuestos podrían afectar significativamente las exportaciones agrícolas y de materias primas latinoamericanas hacia Estados Unidos, particularmente café, flores y productos petroleros.

El análisis sugiere que Colombia podría beneficiarse de una mayor cooperación en seguridad, pero enfrentaría desafíos en el sector agrícola. Los economistas recomiendan diversificar los mercados de exportación y fortalecer los bloques comerciales regionales como estrategia de mitigación.`,
    source: { name: "Financial Times" },
    publishedAt: "2024-09-15T08:30:00Z", 
    url: "#",
    category: "economics",
    topic: "Donald Trump",
    engagement: { likes: 892, shares: 267, comments: 145 }
  },
  {
    id: "trump-3",
    title: "Trump se reúne con líderes conservadores latinoamericanos en Miami",
    description: "El expresidente estadounidense sostiene encuentros con representantes de movimientos conservadores de Colombia, Brasil y Argentina.",
    content: `Donald Trump se reunió ayer en Miami con una delegación de líderes conservadores latinoamericanos, incluyendo representantes del Centro Democrático de Colombia, Vox de España, y movimientos conservadores de Brasil y Argentina.

La reunión, que se extendió por más de tres horas, se centró en estrategias para fortalecer los movimientos conservadores en América Latina y establecer redes de cooperación internacional.

Según fuentes cercanas al encuentro, Trump expresó su apoyo a las políticas de seguridad ciudadana y libre mercado promovidas por estos movimientos, y discutió la posibilidad de crear una alianza conservadora transatlántica.

El expresidente Álvaro Uribe participó virtualmente en la reunión, presentando la experiencia colombiana en temas de seguridad democrática y lucha contra el terrorismo.

Los participantes acordaron establecer un consejo consultivo permanente que se reunirá trimestralmente para coordinar estrategias políticas y compartir mejores prácticas en campaña y gobierno.

La reunión ha generado reacciones mixtas en Colombia, con el Centro Democrático defendiendo el encuentro como parte de la diplomacia internacional, mientras que sectores de la oposición cuestionan la pertinencia de estos vínculos.`,
    source: { name: "Associated Press" },
    publishedAt: "2024-09-14T18:45:00Z",
    url: "#", 
    category: "politics",
    topic: "Donald Trump",
    engagement: { likes: 2156, shares: 789, comments: 456 }
  },

  // Congress News
  {
    id: "congress-1",
    title: "Congreso aprueba reforma al sistema de salud mental con apoyo bipartidista",
    description: "La reforma incluye nuevas inversiones en atención psicológica y prevención del suicidio en todas las regiones del país.",
    content: `El Congreso de la República aprobó por amplia mayoría la reforma al sistema de salud mental, con 89 votos a favor y 12 en contra en la Cámara, y 78 a favor y 8 en contra en el Senado.

La reforma establece la creación de 200 nuevos centros de atención psicológica en municipios que actualmente no cuentan con este servicio, con una inversión inicial de 800 mil millones de pesos.

La senadora María José Pizarro, ponente de la ley, destacó que la reforma incluye un enfoque territorial que priorizará las regiones más afectadas por el conflicto armado y donde se registran mayores índices de violencia intrafamiliar.

La nueva legislación también establece la obligatoriedad de incluir atención psicológica en todos los planes de salud, eliminando las barreras económicas que actualmente limitan el acceso a estos servicios.

El programa incluye capacitación especializada para 5,000 profesionales en salud mental, con énfasis en terapias adaptadas culturalmente para comunidades indígenas y afrodescendientes.

La implementación comenzará en enero de 2025, con la meta de que el 80% de los municipios colombianos cuenten con servicios especializados en salud mental para el año 2027.`,
    source: { name: "Congreso de la República" },
    publishedAt: "2024-09-15T14:20:00Z",
    url: "#",
    category: "health",
    topic: "Congress",
    engagement: { likes: 1567, shares: 423, comments: 189 }
  },
  {
    id: "congress-2",
    title: "Debate en el Senado sobre la nueva ley de energías renovables genera controversia",
    description: "Senadores discuten los incentivos fiscales para empresas de energía solar y eólica, con posiciones divididas sobre el impacto económico.",
    content: `El Senado de la República vivió ayer una intensa jornada de debate sobre el proyecto de ley que establece nuevos incentivos para el desarrollo de energías renovables en Colombia.

El proyecto, presentado por el gobierno nacional, propone beneficios tributarios por 10 años para empresas que inviertan en proyectos de energía solar, eólica e hidroeléctrica de pequeña escala.

La senadora del Centro Democrático, Paloma Valencia, expresó sus reservas sobre el proyecto, argumentando que los incentivos fiscales podrían afectar los ingresos del Estado y que se requiere mayor claridad sobre el retorno de la inversión.

Por su parte, el senador del Pacto Histórico, Gustavo Bolívar, defendió la iniciativa señalando que Colombia debe acelerar su transición energética para cumplir con los compromisos climáticos internacionales y generar empleo rural.

El ministro de Minas y Energía presentó estudios que proyectan la creación de 150,000 empleos directos e indirectos durante los primeros cinco años de implementación de la ley.

La discusión se extenderá por tres sesiones adicionales antes de la votación final, con audiencias públicas programadas para escuchar a representantes de empresas del sector energético y organizaciones ambientales.`,
    source: { name: "Senado de la República" },
    publishedAt: "2024-09-15T11:45:00Z",
    url: "#",
    category: "environment",
    topic: "Congress", 
    engagement: { likes: 934, shares: 298, comments: 167 }
  },

  // International Politics
  {
    id: "international-1",
    title: "Cumbre de las Américas aborda migración y comercio regional",
    description: "Líderes de 20 países americanos se reúnen en Panamá para discutir soluciones coordinadas a los desafíos migratorios y comerciales.",
    content: `La Cumbre de las Américas 2024, celebrada en Ciudad de Panamá, reunió a líderes de 20 países del hemisferio para abordar los crecientes desafíos migratorios y las oportunidades de integración comercial regional.

El presidente Gustavo Petro presentó la iniciativa colombiana "Fronteras de Oportunidad", que propone crear corredores humanitarios y zonas económicas especiales en las fronteras para facilitar la migración ordenada y el comercio bilateral.

La propuesta colombiana incluye la creación de centros de procesamiento migratorio conjunto con Venezuela, Ecuador y Panamá, con financiamiento del Banco Interamericano de Desarrollo y apoyo técnico de la OIM.

El presidente de Estados Unidos, Joe Biden, anunció un nuevo paquete de ayuda de 2 mil millones de dólares para programas de desarrollo en Centroamérica y el Caribe, enfocado en la creación de empleos y el fortalecimiento institucional.

Los líderes acordaron crear un fondo regional para la respuesta a emergencias climáticas, con contribuciones proporcionales al PIB de cada país y administración rotatoria entre Brasil, México y Colombia.

La cumbre concluirá hoy con la firma de la "Declaración de Panamá para la Prosperidad Compartida", que establece metas específicas para la reducción de la migración irregular en un 40% para 2026.`,
    source: { name: "EFE" },
    publishedAt: "2024-09-15T09:15:00Z",
    url: "#",
    category: "international",
    topic: "International Politics",
    engagement: { likes: 1245, shares: 378, comments: 203 }
  },

  // Economy News
  {
    id: "economy-1",
    title: "Banco de la República mantiene tasa de interés en 10.75% por tercer mes consecutivo",
    description: "La junta directiva del banco central evalúa la evolución de la inflación y el crecimiento económico antes de futuros ajustes.",
    content: `La Junta Directiva del Banco de la República decidió mantener la tasa de política monetaria en 10.75% por tercer mes consecutivo, en una decisión que fue respaldada por cuatro de los cinco miembros de la junta.

El gerente del Banco, Leonardo Villar, explicó que la decisión se basó en la necesidad de consolidar la desaceleración de la inflación, que en agosto se ubicó en 5.8%, aún por encima de la meta del 3%.

Los datos económicos más recientes muestran signos mixtos: mientras la inflación de alimentos se ha moderado, los servicios mantienen presiones alcistas que preocupan a las autoridades monetarias.

El PIB del segundo trimestre creció 2.3% anual, por debajo de las expectativas del 2.8%, lo que refleja una economía que aún enfrenta desafíos estructurales en sectores como la construcción y la industria manufacturera.

El banco central proyecta que la inflación convergerá gradualmente hacia la meta del 3% durante el segundo semestre de 2025, siempre que se mantengan las condiciones monetarias restrictivas actuales.

Los analistas del sector financiero anticipan que la próxima reducción de tasas podría ocurrir en diciembre, dependiendo de la evolución de los indicadores de actividad económica y empleo.`,
    source: { name: "Banco de la República" },
    publishedAt: "2024-09-15T15:30:00Z",
    url: "#",
    category: "economics",
    topic: "Economy",
    engagement: { likes: 756, shares: 234, comments: 123 }
  },

  // Technology News
  {
    id: "tech-1",
    title: "Colombia lanza programa nacional de inteligencia artificial para el sector público",
    description: "El MinTIC presenta una iniciativa de 200 mil millones de pesos para modernizar los servicios gubernamentales mediante IA.",
    content: `El Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) lanzó oficialmente el programa "IA Colombia 2030", una iniciativa de modernización tecnológica del Estado con una inversión de 200 mil millones de pesos.

La ministra Sandra Urrutia explicó que el programa implementará soluciones de inteligencia artificial en 15 entidades del gobierno nacional durante los próximos 18 meses, comenzando con el ICBF, la DIAN y la Procuraduría.

Las primeras aplicaciones incluyen chatbots inteligentes para atención ciudadana, sistemas de detección de fraude en contratación pública y análisis predictivo para la asignación de recursos en programas sociales.

El programa también contempla la capacitación de 2,000 funcionarios públicos en herramientas de IA, en alianza con universidades como los Andes, Nacional y Javeriana, además de partners internacionales como Microsoft y Google.

Colombia se convierte así en el tercer país latinoamericano, después de Brasil y México, en implementar un programa nacional de IA para el sector público, con la meta de reducir los tiempos de trámites en un 60%.

El MinTIC estima que la iniciativa generará ahorros de 50 mil millones de pesos anuales en costos operativos y mejorará significativamente la satisfacción ciudadana con los servicios públicos digitales.`,
    source: { name: "MinTIC" },
    publishedAt: "2024-09-15T12:00:00Z",
    url: "#",
    category: "technology",
    topic: "Technology",
    engagement: { likes: 1334, shares: 445, comments: 267 }
  },

  // Social Issues
  {
    id: "social-1",
    title: "Nueva política de vivienda social promete 100,000 hogares para familias vulnerables",
    description: "El gobierno nacional presenta un plan integral de vivienda que incluye subsidios, microcréditos y construcción sostenible.",
    content: `El gobierno nacional presentó la "Política Nacional de Vivienda Digna 2024-2028", un programa ambicioso que tiene como meta entregar 100,000 viviendas sociales a familias en situación de vulnerabilidad.

El ministro de Vivienda, Malambo Daza, explicó que el programa combinará subsidios directos, microcréditos y construcción sostenible, con una inversión total de 8 billones de pesos durante cuatro años.

La iniciativa priorizará a familias víctimas del conflicto armado, madres cabeza de familia, comunidades étnicas y hogares afectados por desastres naturales, estableciendo un sistema de puntaje que garantice la focalización adecuada.

Cada vivienda tendrá un área mínima de 60 metros cuadrados, tres habitaciones, cocina integral y sistemas de captación de agua lluvia, cumpliendo con estándares internacionales de construcción sostenible.

El programa incluye la creación de "Ciudades Sostenibles" en 50 municipios, con viviendas conectadas a centros de salud, educación y emprendimiento, promoviendo el desarrollo integral de las comunidades beneficiarias.

La primera fase comenzará en diciembre de 2024 en La Guajira, Chocó y Putumayo, con la meta de entregar las primeras 5,000 viviendas antes de finalizar 2025.`,
    source: { name: "Ministerio de Vivienda" },
    publishedAt: "2024-09-15T13:45:00Z",
    url: "#",
    category: "social",
    topic: "Social Issues",
    engagement: { likes: 2245, shares: 567, comments: 334 }
  },

  // Environment News
  {
    id: "environment-1",
    title: "Colombia firma acuerdo para proteger el 40% de su territorio marino para 2030",
    description: "El país se suma a la iniciativa global 30x30 y establecerá nuevas áreas marinas protegidas en el Pacífico y el Caribe.",
    content: `Colombia se unió oficialmente a la iniciativa global "30x30" mediante la firma de un acuerdo internacional que compromete al país a proteger el 40% de su territorio marino para el año 2030.

La ministra de Ambiente, Susana Muhamad, firmó el compromiso durante la Conferencia de los Océanos en Vancouver, estableciendo a Colombia como líder regional en conservación marina.

El plan incluye la creación de cinco nuevas áreas marinas protegidas: dos en el Pacífico (costa chocoana y nariñense) y tres en el Caribe (Archipelago de San Andrés, La Guajira y Magdalena).

La estrategia de conservación se implementará mediante alianzas con comunidades locales, especialmente raizales, afrodescendientes e indígenas, reconociendo sus derechos ancestrales sobre los territorios marinos.

Colombia también anunció la inversión de 300 mil millones de pesos en investigación marina, equipamiento científico y programas de educación ambiental en comunidades costeras.

El acuerdo establece metas específicas: reducción del 70% en la pesca ilegal, restauración de 50,000 hectáreas de manglares y creación de 10,000 empleos verdes en comunidades costeras para 2028.`,
    source: { name: "Ministerio de Ambiente" },
    publishedAt: "2024-09-15T07:20:00Z",
    url: "#",
    category: "environment",
    topic: "Environment",
    engagement: { likes: 1876, shares: 432, comments: 298 }
  },

  // Sports News  
  {
    id: "sports-1",
    title: "Colombia se prepara para ser sede del Mundial Femenino de Fútbol 2031",
    description: "La FCF presenta oficialmente la candidatura junto con Ecuador y Perú para albergar el torneo más importante del fútbol femenino.",
    content: `La Federación Colombiana de Fútbol (FCF) presentó oficialmente la candidatura tripartita con Ecuador y Perú para ser sede del Mundial Femenino de Fútbol 2031, en un evento realizado en el Estadio El Campín.

El presidente de la FCF, Ramón Jesurun, destacó que Colombia aportaría 8 ciudades sede: Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira y Manizales, con estadios que cumplen los estándares FIFA.

La candidatura "Corazón de América" promete un Mundial innovador con enfoque en sostenibilidad, inclusión y desarrollo del fútbol femenino en toda la región, con una inversión estimada de 2.5 billones de pesos.

El proyecto incluye la renovación de 12 estadios, mejoras en infraestructura de transporte y hotelera, y programas de desarrollo del fútbol femenino en escuelas rurales de los tres países.

La ministra del Deporte, Astrid Rodríguez, anunció que el gobierno nacional garantizará los recursos necesarios y destacó que el evento podría generar más de 50,000 empleos temporales y un impacto económico de 8 billones de pesos.

FIFA anunciará la sede elegida en mayo de 2025, compitiendo con candidaturas de Estados Unidos-México, Brasil-Argentina y una propuesta europea liderada por Inglaterra.`,
    source: { name: "FCF" },
    publishedAt: "2024-09-15T16:10:00Z",
    url: "#",
    category: "sports",
    topic: "Sports",
    engagement: { likes: 3456, shares: 1234, comments: 567 }
  }
];

// News by topic for easy filtering
export const getNewsByTopic = (topic: string): NewsArticle[] => {
  return newsArticles.filter(article => 
    article.topic.toLowerCase().includes(topic.toLowerCase())
  );
};

// News by category for easy filtering  
export const getNewsByCategory = (category: string): NewsArticle[] => {
  return newsArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};

// Get trending news (most engagement)
export const getTrendingNews = (limit: number = 5): NewsArticle[] => {
  return newsArticles
    .sort((a, b) => 
      (b.engagement.likes + b.engagement.shares + b.engagement.comments) - 
      (a.engagement.likes + a.engagement.shares + a.engagement.comments)
    )
    .slice(0, limit);
};

// Get recent news
export const getRecentNews = (limit: number = 10): NewsArticle[] => {
  return newsArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

// Search news
export const searchNews = (query: string): NewsArticle[] => {
  const searchTerm = query.toLowerCase();
  return newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm) ||
    article.topic.toLowerCase().includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm)
  );
};