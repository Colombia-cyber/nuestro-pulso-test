export type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

// Mock news data for different categories
export const mockNewsData = {
  // Colombian Politics - Gustavo Petro
  colombian: [
    {
      title: "Gustavo Petro anuncia nueva política energética para transición a energías renovables",
      description: "El presidente colombiano presenta plan ambicioso para reducir dependencia de combustibles fósiles y promover energía solar y eólica en todo el territorio nacional.",
      source: { name: "El Espectador" },
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Gobierno Petro lanza programa de reforma agraria integral en cinco departamentos",
      description: "La iniciativa beneficiará a más de 100,000 familias campesinas con títulos de tierra, créditos blandos y asistencia técnica para mejorar la productividad.",
      source: { name: "Semana" },
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Petro convoca diálogo nacional para reforma del sistema de salud colombiano",
      description: "El mandatario busca consensos con diferentes sectores para mejorar la cobertura y calidad del sistema de salud, incluyendo a médicos, pacientes y entidades territoriales.",
      source: { name: "RCN Radio" },
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Presidente Petro fortalece relaciones diplomáticas con países de la región en cumbre CELAC",
      description: "Colombia asume liderazgo en temas de migración, narcotráfico y cambio climático durante encuentro con mandatarios latinoamericanos.",
      source: { name: "Caracol Radio" },
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Gobierno implementa nueva estrategia de seguridad en territorios antes controlados por FARC",
      description: "Plan integral incluye presencia institucional, proyectos productivos y programas sociales para consolidar la paz en estas regiones.",
      source: { name: "El Tiempo" },
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Petro propone crear fondo latinoamericano para financiar proyectos ambientales",
      description: "La propuesta busca movilizar recursos internacionales para proteger la Amazonía y otros ecosistemas estratégicos de la región.",
      source: { name: "Bloomberg en Español" },
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Colombia anuncia inversión de $5 billones en infraestructura vial para conectar regiones apartadas",
      description: "El plan quinquenal incluye construcción y mejoramiento de carreteras, puentes y aeropuertos en zonas rurales y fronterizas.",
      source: { name: "Portafolio" },
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Gobierno Petro fortalece programas de educación superior gratuita en universidades públicas",
      description: "Nuevas becas y subsidios permitirán acceso a educación universitaria a estudiantes de estratos 1, 2 y 3 en todo el país.",
      source: { name: "Universidad Nacional" },
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      url: "#"
    }
  ],

  // Donald Trump and US Politics
  trump: [
    {
      title: "Donald Trump propone nuevos aranceles a productos latinoamericanos en campaña 2024",
      description: "El expresidente estadounidense anuncia plan para incrementar tarifas comerciales a países que 'no cooperen' en temas de migración y narcotráfico.",
      source: { name: "Reuters" },
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump critica política migratoria actual y promete deportaciones masivas si regresa al poder",
      description: "En mitin en Florida, el candidato republicano detalló su plan para implementar la 'mayor operación de deportación en la historia de Estados Unidos'.",
      source: { name: "CNN" },
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump anuncia plan para renegociar tratados comerciales con países latinoamericanos",
      description: "El expresidente propone revisar acuerdos existentes para 'proteger trabajos estadounidenses' y reducir déficit comercial.",
      source: { name: "Wall Street Journal" },
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Encuestas muestran a Trump liderando primarias republicanas para elecciones 2024",
      description: "Últimos sondeos revelan ventaja significativa del expresidente sobre otros candidatos republicanos en estados clave.",
      source: { name: "Fox News" },
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump promete construir 'el muro más grande de la historia' en frontera con México",
      description: "Candidato republicano detalla nuevo plan de seguridad fronteriza que incluye tecnología avanzada y mayor presencia militar.",
      source: { name: "Associated Press" },
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump califica como 'desastre' la política energética de Biden y promete 'drill baby drill'",
      description: "El expresidente promete revertir regulaciones ambientales y maximizar producción de petróleo y gas en territorio estadounidense.",
      source: { name: "NBC News" },
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump recibe respaldo de importantes donantes republicanos para campaña 2024",
      description: "Magnates de la industria petrolera, tecnológica y financiera confirman apoyo económico millonario al expresidente.",
      source: { name: "CNBC" },
      publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Trump propone eliminar impuestos a propinas y horas extras para trabajadores",
      description: "Nueva propuesta fiscal busca atraer voto de clase trabajadora prometiendo mayor salario neto para empleados de servicios.",
      source: { name: "USA Today" },
      publishedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
      url: "#"
    }
  ],

  // Right Wing and Conservative Politics
  rightWing: [
    {
      title: "Conservadores europeos proponen nueva agenda contra inmigración ilegal en cumbre de Varsovia",
      description: "Líderes de derecha de 15 países europeos acuerdan estrategia común para fortalecer controles fronterizos y acelerar deportaciones.",
      source: { name: "BBC News" },
      publishedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Partido conservador británico elige nuevo líder con agenda de reducción de impuestos",
      description: "Kemi Badenoch promete recortes fiscales significativos y desregulación empresarial para impulsar crecimiento económico.",
      source: { name: "The Telegraph" },
      publishedAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Centro Democrático colombiano presenta propuesta de seguridad ciudadana para 2025",
      description: "El partido de oposición propone aumentar pie de fuerza policial en 40% y endurecer penas por delitos como hurto y extorsión.",
      source: { name: "La República" },
      publishedAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Conservadores argentinos ganan terreno en encuestas con agenda de libre mercado",
      description: "Propuestas de dolarización y reducción del Estado resonan entre electores argentinos afectados por inflación récord.",
      source: { name: "La Nación" },
      publishedAt: new Date(Date.now() - 8.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Movimiento conservador brasileño organiza manifestaciones por valores tradicionales",
      description: "Miles de personas marchan en São Paulo y Río de Janeiro defendiendo familia tradicional y libertad religiosa.",
      source: { name: "O Globo" },
      publishedAt: new Date(Date.now() - 10.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Think tanks conservadores proponen reformas educativas para promover patriotismo",
      description: "Organizaciones de derecha estadounidenses promueven currículos que enfaticen historia nacional y valores occidentales en escuelas.",
      source: { name: "The Heritage Foundation" },
      publishedAt: new Date(Date.now() - 12.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Líderes conservadores mundiales se reúnen para coordinar estrategia contra globalismo",
      description: "Cumbre en Budapest incluye a Viktor Orbán, Giorgia Meloni y otros mandatarios de derecha para defender soberanía nacional.",
      source: { name: "Financial Times" },
      publishedAt: new Date(Date.now() - 14.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Partidos conservadores europeos proponen reformas para proteger industria nacional",
      description: "Nueva agenda económica incluye aranceles selectivos, subsidios a empresas locales y restricciones a inversión extranjera en sectores estratégicos.",
      source: { name: "Politico Europe" },
      publishedAt: new Date(Date.now() - 16.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    }
  ],

  // Major Politics and International Events
  politics: [
    {
      title: "G20 alcanza acuerdo histórico sobre regulación de inteligencia artificial y criptomonedas",
      description: "Líderes de las principales economías mundiales establecen marco normativo común para tecnologías emergentes y monedas digitales.",
      source: { name: "Reuters International" },
      publishedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Unión Europea aprueba presupuesto récord para defensa ante tensiones geopolíticas",
      description: "Parlamento Europeo autoriza €100 mil millones adicionales para fortalecer capacidades militares y ciberseguridad continental.",
      source: { name: "Euronews" },
      publishedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "ONU advierte sobre crisis alimentaria global que podría afectar a 250 millones de personas",
      description: "Programa Mundial de Alimentos solicita $24 mil millones para prevenir hambruna en 20 países en conflicto y cambio climático extremo.",
      source: { name: "United Nations News" },
      publishedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "China y Estados Unidos reanudan diálogo comercial tras reunión de alto nivel",
      description: "Representantes de ambas potencias acuerdan hoja de ruta para resolver disputas comerciales y tecnológicas en sectores clave.",
      source: { name: "South China Morning Post" },
      publishedAt: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Parlamentos de América Latina crean alianza para combatir crimen organizado transnacional",
      description: "Legisladores de 12 países firman pacto para coordinar leyes contra narcotráfico, lavado de dinero y tráfico de personas.",
      source: { name: "Inter-American Development Bank" },
      publishedAt: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Cumbre climática COP29 establece fondo de $500 mil millones para transición energética",
      description: "Países desarrollados se comprometen a financiar proyectos de energía renovable en naciones en desarrollo durante próxima década.",
      source: { name: "Climate Action Network" },
      publishedAt: new Date(Date.now() - 11.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "OTAN anuncia expansión de operaciones de ciberseguridad ante amenazas digitales crecientes",
      description: "Alianza militar establece nuevo comando cibernético conjunto para proteger infraestructura crítica de países miembros.",
      source: { name: "NATO News" },
      publishedAt: new Date(Date.now() - 13.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    },
    {
      title: "Banco Mundial proyecta crecimiento económico global moderado para 2025",
      description: "Institución financiera internacional estima crecimiento del 2.4% mundial, con América Latina mostrando señales de recuperación.",
      source: { name: "World Bank" },
      publishedAt: new Date(Date.now() - 15.5 * 60 * 60 * 1000).toISOString(),
      url: "#"
    }
  ]
};

// Function to get mock news by category
export const getMockNews = (category: 'colombian' | 'trump' | 'rightWing' | 'politics'): Article[] => {
  return mockNewsData[category] || [];
};

// Function to get all mock news
export const getAllMockNews = (): Article[] => {
  return [
    ...mockNewsData.colombian,
    ...mockNewsData.trump,
    ...mockNewsData.rightWing,
    ...mockNewsData.politics
  ];
};