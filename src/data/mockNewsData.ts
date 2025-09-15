import { Article } from '../types/news';

export const mockNewsData: Record<string, Article[]> = {
  colombia: [
    {
      title: "Gustavo Petro anuncia nuevo plan de reforma agraria integral para beneficiar a 500,000 campesinos",
      description: "El presidente presenta una estrategia de redistribución de tierras y apoyo técnico que transformará el sector rural colombiano en los próximos cuatro años.",
      source: { name: "El Espectador" },
      publishedAt: "2024-12-15T08:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Reforma+Agraria"
    },
    {
      title: "Gobierno Petro logra reducir índices de deforestación en un 23% durante 2024",
      description: "Nuevas cifras del IDEAM confirman la efectividad de las políticas ambientales implementadas en la Amazonía y el Chocó biogeográfico.",
      source: { name: "Semana" },
      publishedAt: "2024-12-15T07:15:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Deforestacion"
    },
    {
      title: "Presidente Petro se reúne con líderes indígenas para discutir autonomía territorial",
      description: "Mesa de trabajo establecerá mecanismos de consulta previa y respeto por los derechos ancestrales de las comunidades originarias.",
      source: { name: "El Tiempo" },
      publishedAt: "2024-12-15T06:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Indigenas"
    },
    {
      title: "Ministerio de Educación bajo Petro lanza programa de universidad gratuita para estratos 1 y 2",
      description: "La iniciativa beneficiará a 200,000 jóvenes anualmente y representa una inversión de 2 billones de pesos en educación superior.",
      source: { name: "RCN Noticias" },
      publishedAt: "2024-12-15T05:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Universidad+Gratuita"
    },
    {
      title: "Petro propone nueva estrategia de paz total incluyendo diálogos con grupos disidentes",
      description: "El mandatario anuncia mesa de negociaciones con el Estado Mayor Central y otros grupos armados para consolidar la paz en Colombia.",
      source: { name: "Caracol Radio" },
      publishedAt: "2024-12-15T04:20:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Paz+Total"
    }
  ],
  trump: [
    {
      title: "Trump promete nuevos aranceles del 60% a productos colombianos si regresa al poder",
      description: "El expresidente estadounidense intensifica su retórica proteccionista apuntando específicamente al café, flores y textiles colombianos.",
      source: { name: "CNN en Español" },
      publishedAt: "2024-12-15T09:00:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Trump+Aranceles"
    },
    {
      title: "Donald Trump critica política antidrogas de Colombia durante mitin en Florida",
      description: "El candidato republicano asegura que implementará mano dura contra países que 'no cooperen efectivamente' en la lucha antinarcóticos.",
      source: { name: "Univision" },
      publishedAt: "2024-12-15T08:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Trump+Florida"
    },
    {
      title: "Trump anuncia que cortará ayuda militar a Colombia si es elegido presidente",
      description: "La propuesta incluye suspender el Plan Colombia y reducir la cooperación en seguridad bilateral entre ambos países.",
      source: { name: "Fox News Latino" },
      publishedAt: "2024-12-15T07:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Ayuda+Militar"
    },
    {
      title: "Encuestas muestran a Trump liderando en estados clave mientras endurece postura contra Latinoamérica",
      description: "Nuevos sondeos en Florida, Texas y Arizona reflejan apoyo a las políticas migratorias restrictivas del expresidente.",
      source: { name: "Telemundo" },
      publishedAt: "2024-12-15T06:15:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Encuestas+Trump"
    },
    {
      title: "Trump propone construir muro marítimo para frenar narcotráfico desde Colombia",
      description: "El plan incluye despliegue de guardacostas y tecnología naval avanzada para interceptar embarcaciones en aguas internacionales.",
      source: { name: "Associated Press" },
      publishedAt: "2024-12-15T05:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Muro+Maritimo"
    }
  ],
  congress: [
    {
      title: "Congreso colombiano aprueba en primer debate reforma tributaria con modificaciones clave",
      description: "Senado introduce cambios al proyecto gubernamental reduciendo impuestos a clase media y pequeñas empresas.",
      source: { name: "Portafolio" },
      publishedAt: "2024-12-15T09:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Reforma+Tributaria"
    },
    {
      title: "Cámara de Representantes debate proyecto de ley sobre inteligencia artificial en sector público",
      description: "Iniciativa busca regular uso de IA en entidades gubernamentales y establecer marcos éticos para la tecnología.",
      source: { name: "La República" },
      publishedAt: "2024-12-15T08:15:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=IA+Gobierno"
    },
    {
      title: "Senado colombiano aprueba nueva ley de protección a líderes sociales y defensores de derechos humanos",
      description: "La normativa establece protocolos especiales de seguridad y sanciones más severas para ataques contra activistas.",
      source: { name: "El Heraldo" },
      publishedAt: "2024-12-15T07:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Lideres+Sociales"
    },
    {
      title: "Congreso estudia proyecto para crear ministerio de ciencia, tecnología e innovación independiente",
      description: "Propuesta bipartidista busca separar Minciencias de otras dependencias para potenciar investigación científica.",
      source: { name: "El Colombiano" },
      publishedAt: "2024-12-15T06:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Ministerio+Ciencia"
    },
    {
      title: "Debate en Congreso sobre nueva ley de seguridad alimentaria y soberanía nutricional",
      description: "Parlamentarios analizan medidas para garantizar acceso a alimentos nutritivos y apoyar producción local sostenible.",
      source: { name: "Blu Radio" },
      publishedAt: "2024-12-15T05:15:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Seguridad+Alimentaria"
    }
  ],
  terror: [
    {
      title: "Alerta máxima en frontera con Venezuela por incremento de actividad de grupos armados ilegales",
      description: "Fuerzas Militares reportan movimientos inusuales del ELN y disidencias de FARC en Norte de Santander y Arauca.",
      source: { name: "El Tiempo Seguridad" },
      publishedAt: "2024-12-15T10:00:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Frontera+Venezuela"
    },
    {
      title: "Desarticulan célula terrorista que planeaba atentar contra infraestructura petrolera en Putumayo",
      description: "Operativo conjunto de Ejército y Policía captura a 12 integrantes de grupo residual con explosivos y material bélico.",
      source: { name: "Defensa Civil" },
      publishedAt: "2024-12-15T09:15:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Infraestructura+Petrolera"
    },
    {
      title: "Amenazas terroristas contra alcaldes en Cauca y Nariño obligan a reforzar esquemas de seguridad",
      description: "Ministerio del Interior implementa protocolos especiales para mandatarios locales tras intimidaciones de grupos al margen de la ley.",
      source: { name: "Reuters Colombia" },
      publishedAt: "2024-12-15T08:30:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Amenazas+Alcaldes"
    },
    {
      title: "Inteligencia militar detecta planes de sabotaje a elecciones regionales por parte de grupos extremistas",
      description: "Autoridades implementan medidas preventivas en municipios de alto riesgo para garantizar proceso electoral transparente.",
      source: { name: "Ministerio de Defensa" },
      publishedAt: "2024-12-15T07:20:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Sabotaje+Electoral"
    },
    {
      title: "Capturan a cabecilla de red terrorista internacional que operaba desde Colombia hacia Europa",
      description: "Operación internacional desmantela estructura criminal dedicada al financiamiento del terrorismo y lavado de activos.",
      source: { name: "Interpol Colombia" },
      publishedAt: "2024-12-15T06:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Red+Internacional"
    }
  ],
  politics: [
    {
      title: "Coalición de gobierno y oposición alcanzan acuerdo histórico para reforma política electoral",
      description: "Pacto bipartidista incluye nuevas reglas de financiamiento de campañas, transparencia y participación ciudadana.",
      source: { name: "El Universal" },
      publishedAt: "2024-12-15T09:45:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Reforma+Politica"
    },
    {
      title: "Centro Democrático presenta propuesta alternativa para reformar sistema de salud colombiano",
      description: "Partido de oposición propone modelo mixto que combine sector público y privado con cobertura universal.",
      source: { name: "La Patria" },
      publishedAt: "2024-12-15T08:50:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Sistema+Salud"
    },
    {
      title: "Alcaldes de capitales se reúnen para crear frente común ante crisis de seguridad urbana",
      description: "Mandatarios de Bogotá, Medellín, Cali y Barranquilla buscan estrategia conjunta contra delincuencia organizada.",
      source: { name: "Alcaldías Unidas" },
      publishedAt: "2024-12-15T07:35:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Alcaldes+Unidos"
    },
    {
      title: "Partido Liberal propone nueva ley de transparencia y acceso a información pública",
      description: "Iniciativa incluye fortalecimiento de herramientas digitales y sanciones por ocultamiento de información oficial.",
      source: { name: "Vanguardia" },
      publishedAt: "2024-12-15T06:25:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Transparencia"
    },
    {
      title: "Movimientos sociales anuncian gran movilización nacional para defender reformas estructurales",
      description: "Organizaciones civiles convocan manifestación masiva en apoyo a cambios en pensiones, salud y educación.",
      source: { name: "Contagio Radio" },
      publishedAt: "2024-12-15T05:40:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Movilizacion"
    }
  ],
  rightWing: [
    {
      title: "Centro Democrático presenta agenda conservadora 2025 con enfoque en seguridad y economía de mercado",
      description: "Partido de oposición propone reducción de impuestos, fortalecimiento de las fuerzas armadas y defensa de valores tradicionales.",
      source: { name: "Centro Democrático Oficial" },
      publishedAt: "2024-12-15T09:20:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Agenda+Conservadora"
    },
    {
      title: "Expresidente Uribe critica política de paz total y propone retorno a seguridad democrática",
      description: "Líder del Centro Democrático aboga por endurecer medidas contra grupos armados ilegales y fortalecer autoridad estatal.",
      source: { name: "W Radio" },
      publishedAt: "2024-12-15T08:25:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Uribe+Seguridad"
    },
    {
      title: "Movimiento conservador propone referendo para derogar reformas estructurales del gobierno",
      description: "Iniciativa ciudadana busca revertir cambios en sistema pensional, tributario y de salud mediante consulta popular.",
      source: { name: "Cambio" },
      publishedAt: "2024-12-15T07:50:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Referendo"
    },
    {
      title: "Candidatos conservadores lideran encuestas en varias gobernaciones para elecciones 2027",
      description: "Sondeos de opinión muestran preferencia por propuestas de derecha en Antioquia, Santander y Valle del Cauca.",
      source: { name: "Encuestas & Análisis" },
      publishedAt: "2024-12-15T06:40:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Encuestas+Conservadoras"
    },
    {
      title: "Sector empresarial respalda propuestas conservadoras de flexibilización laboral y tributaria",
      description: "ANDI y otros gremios expresan apoyo a iniciativas que promuevan competitividad y atracción de inversión extranjera.",
      source: { name: "Dinero" },
      publishedAt: "2024-12-15T05:25:00Z",
      url: "#",
      urlToImage: "https://via.placeholder.com/300x200?text=Sector+Empresarial"
    }
  ]
};

export const getNewsByCategory = (category: string): Article[] => {
  return mockNewsData[category] || [];
};

export const getAllNews = (): Article[] => {
  return Object.values(mockNewsData).flat();
};

export const getLatestNews = (limit: number = 10): Article[] => {
  return getAllNews()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};