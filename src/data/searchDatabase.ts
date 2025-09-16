export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  link: string;
  image?: string;
  tags: string[];
}

// Comprehensive search database with Facebook and other popular topics
export const searchDatabase: SearchResult[] = [
  // Facebook results
  {
    id: 'fb-001',
    title: 'Facebook lanza nueva política de privacidad en Colombia',
    summary: 'Meta anuncia cambios significativos en la gestión de datos personales de usuarios colombianos, siguiendo regulaciones locales de protección de datos.',
    source: 'El Tiempo',
    category: 'Tecnología',
    timestamp: '2024-01-15T09:30:00Z',
    relevanceScore: 98,
    link: '#',
    image: '📱',
    tags: ['facebook', 'meta', 'privacidad', 'colombia', 'tecnología']
  },
  {
    id: 'fb-002',
    title: 'Campaña política usa Facebook para llegar a jóvenes colombianos',
    summary: 'Partidos políticos intensifican su presencia en redes sociales para conectar con votantes de 18 a 35 años en las próximas elecciones.',
    source: 'Semana',
    category: 'Política',
    timestamp: '2024-01-14T16:45:00Z',
    relevanceScore: 94,
    link: '#',
    image: '🗳️',
    tags: ['facebook', 'política', 'jóvenes', 'elecciones', 'campaña']
  },
  {
    id: 'fb-003',
    title: 'Facebook Marketplace: Nueva plataforma de comercio en Colombia',
    summary: 'La función de mercado de Facebook se expande oficialmente en Colombia, ofreciendo alternativa local de comercio electrónico.',
    source: 'Portafolio',
    category: 'Economía',
    timestamp: '2024-01-14T11:20:00Z',
    relevanceScore: 91,
    link: '#',
    image: '🛒',
    tags: ['facebook', 'marketplace', 'comercio', 'colombia', 'economía']
  },
  {
    id: 'fb-004',
    title: 'Estudio: Facebook influye en opinión política de colombianos',
    summary: 'Investigación de la Universidad Nacional revela cómo las redes sociales moldean las percepciones políticas en Colombia.',
    source: 'El Espectador',
    category: 'Social',
    timestamp: '2024-01-13T14:15:00Z',
    relevanceScore: 89,
    link: '#',
    image: '📊',
    tags: ['facebook', 'política', 'opinión', 'estudio', 'universidad']
  },
  {
    id: 'fb-005',
    title: 'Facebook elimina cuentas falsas que atacaban políticos colombianos',
    summary: 'Meta reporta la eliminación de redes coordinadas de cuentas falsas que difundían desinformación sobre candidatos locales.',
    source: 'CNN Colombia',
    category: 'Seguridad',
    timestamp: '2024-01-12T10:30:00Z',
    relevanceScore: 96,
    link: '#',
    image: '🛡️',
    tags: ['facebook', 'seguridad', 'desinformación', 'políticos', 'meta']
  },
  {
    id: 'fb-006',
    title: 'Facebook Pay se integra con bancos colombianos',
    summary: 'La plataforma de pagos de Meta se asocia con principales entidades bancarias del país para facilitar transacciones digitales.',
    source: 'La República',
    category: 'Tecnología',
    timestamp: '2024-01-11T08:45:00Z',
    relevanceScore: 87,
    link: '#',
    image: '💳',
    tags: ['facebook', 'pagos', 'bancos', 'tecnología', 'fintech']
  },
  
  // Gustavo Petro results
  {
    id: 'petro-001',
    title: 'Gustavo Petro presenta plan de reformas estructurales 2024',
    summary: 'El presidente colombiano detalla la agenda legislativa para el segundo año de gobierno, incluyendo reformas laboral, pensional y tributaria.',
    source: 'El Tiempo',
    category: 'Política',
    timestamp: '2024-01-15T12:00:00Z',
    relevanceScore: 95,
    link: '#',
    image: '🏛️',
    tags: ['gustavo petro', 'reformas', 'gobierno', 'política', 'colombia']
  },
  {
    id: 'petro-002',
    title: 'Petro defiende política de "Paz Total" ante el Congreso',
    summary: 'En sesión extraordinaria, el mandatario expone los avances del proceso de paz con grupos armados y su impacto en la seguridad.',
    source: 'Caracol Radio',
    category: 'Seguridad',
    timestamp: '2024-01-14T15:30:00Z',
    relevanceScore: 92,
    link: '#',
    image: '🕊️',
    tags: ['gustavo petro', 'paz total', 'congreso', 'seguridad', 'grupos armados']
  },
  
  // Trump Colombia results
  {
    id: 'trump-001',
    title: 'Trump propone aranceles que afectarían exportaciones colombianas',
    summary: 'El expresidente estadounidense anuncia medidas comerciales que impactarían café, flores y otros productos colombianos.',
    source: 'Bloomberg Colombia',
    category: 'Internacional',
    timestamp: '2024-01-15T07:20:00Z',
    relevanceScore: 93,
    link: '#',
    image: '🇺🇸',
    tags: ['trump', 'aranceles', 'comercio', 'colombia', 'exportaciones']
  },
  {
    id: 'trump-002',
    title: 'Relaciones Colombia-EE.UU.: Perspectivas con posible regreso de Trump',
    summary: 'Análisis de expertos sobre el impacto en política migratoria, antinarcóticos y comercio bilateral si Trump retorna al poder.',
    source: 'El Espectador',
    category: 'Internacional',
    timestamp: '2024-01-13T16:40:00Z',
    relevanceScore: 88,
    link: '#',
    image: '🤝',
    tags: ['trump', 'colombia', 'eeuu', 'relaciones', 'diplomacia']
  },
  
  // Centro Democrático results
  {
    id: 'cd-001',
    title: 'Centro Democrático presenta propuesta alternativa de reforma pensional',
    summary: 'El partido opositor detalla su visión sobre el sistema pensional colombiano, enfocándose en la sostenibilidad fiscal.',
    source: 'Semana',
    category: 'Política',
    timestamp: '2024-01-14T13:15:00Z',
    relevanceScore: 90,
    link: '#',
    image: '💰',
    tags: ['centro democrático', 'pensiones', 'oposición', 'política', 'fiscal']
  },
  {
    id: 'cd-002',
    title: 'Álvaro Uribe lidera estrategia del Centro Democrático para 2026',
    summary: 'El expresidente coordina la estrategia electoral del partido con miras a las próximas elecciones presidenciales.',
    source: 'RCN Radio',
    category: 'Política',
    timestamp: '2024-01-12T11:30:00Z',
    relevanceScore: 86,
    link: '#',
    image: '🗳️',
    tags: ['centro democrático', 'uribe', 'elecciones', '2026', 'estrategia']
  },
  
  // Seguridad fronteras results
  {
    id: 'seg-001',
    title: 'Refuerzan seguridad en frontera con Venezuela tras alertas',
    summary: 'Fuerzas militares incrementan patrullajes en Cúcuta y Arauca ante reportes de actividad de grupos armados irregulares.',
    source: 'El Colombiano',
    category: 'Seguridad',
    timestamp: '2024-01-15T06:45:00Z',
    relevanceScore: 94,
    link: '#',
    image: '🚨',
    tags: ['seguridad', 'frontera', 'venezuela', 'militares', 'grupos armados']
  },
  {
    id: 'seg-002',
    title: 'Plan binacional Colombia-Ecuador para control fronterizo',
    summary: 'Ambos países coordinan operativos conjuntos para combatir tráfico de drogas y contrabando en la frontera sur.',
    source: 'Noticias Caracol',
    category: 'Seguridad',
    timestamp: '2024-01-13T09:20:00Z',
    relevanceScore: 91,
    link: '#',
    image: '🛡️',
    tags: ['seguridad', 'frontera', 'ecuador', 'drogas', 'contrabando']
  },
  
  // Reforma pensional results
  {
    id: 'pen-001',
    title: 'Congreso inicia debate final de reforma pensional',
    summary: 'Las comisiones económicas del Senado y Cámara programan sesiones para definir el futuro del sistema pensional colombiano.',
    source: 'Portafolio',
    category: 'Política',
    timestamp: '2024-01-14T14:00:00Z',
    relevanceScore: 97,
    link: '#',
    image: '🏛️',
    tags: ['reforma pensional', 'congreso', 'debate', 'sistema', 'económica']
  },
  {
    id: 'pen-002',
    title: 'Pensionados marchan en Bogotá contra reforma propuesta',
    summary: 'Miles de ciudadanos protestan en el centro de la capital expresando preocupaciones sobre cambios al régimen actual.',
    source: 'El Tiempo',
    category: 'Social',
    timestamp: '2024-01-13T12:30:00Z',
    relevanceScore: 93,
    link: '#',
    image: '✊',
    tags: ['pensionados', 'protesta', 'bogotá', 'reforma', 'marcha']
  },
  
  // Additional diverse content
  {
    id: 'tech-001',
    title: 'Colombia avanza en transformación digital con IA',
    summary: 'El gobierno nacional presenta estrategia de inteligencia artificial para modernizar servicios públicos y aumentar competitividad.',
    source: 'MinTIC',
    category: 'Tecnología',
    timestamp: '2024-01-12T16:00:00Z',
    relevanceScore: 85,
    link: '#',
    image: '🤖',
    tags: ['tecnología', 'inteligencia artificial', 'digital', 'servicios', 'competitividad']
  },
  {
    id: 'eco-001',
    title: 'Exportaciones colombianas crecen 8% en enero',
    summary: 'DANE reporta aumento significativo en ventas externas liderado por petróleo, café y productos manufacturados.',
    source: 'DANE',
    category: 'Economía',
    timestamp: '2024-01-11T10:15:00Z',
    relevanceScore: 82,
    link: '#',
    image: '📈',
    tags: ['exportaciones', 'economía', 'dane', 'petróleo', 'café']
  },
  {
    id: 'soc-001',
    title: 'Nueva encuesta revela preferencias políticas de colombianos',
    summary: 'Estudio nacional muestra tendencias en aprobación presidencial y preferencias electorales para próximos comicios.',
    source: 'Invamer',
    category: 'Social',
    timestamp: '2024-01-10T13:45:00Z',
    relevanceScore: 89,
    link: '#',
    image: '📊',
    tags: ['encuesta', 'política', 'aprobación', 'electoral', 'tendencias']
  }
];

// Popular search terms with guaranteed results
export const popularSearchTerms = [
  'facebook',
  'gustavo petro',
  'centro democrático', 
  'trump colombia',
  'reforma pensional',
  'seguridad fronteras',
  'colombia',
  'política',
  'economía',
  'tecnología',
  'elecciones',
  'congreso',
  'venezuela',
  'eeuu',
  'paz total'
];

// Fallback results for when no specific matches are found
export const generateFallbackResults = (query: string): SearchResult[] => {
  const timestamp = new Date().toISOString();
  
  return [
    {
      id: `fallback-1-${Date.now()}`,
      title: `Últimas noticias sobre "${query}" en Colombia`,
      summary: `Cobertura actualizada de los eventos más relevantes relacionados con ${query} en el contexto colombiano. Análisis, reportes y seguimiento de expertos.`,
      source: 'Nuestro Pulso Agregador',
      category: 'Agregado',
      timestamp,
      relevanceScore: 100,
      link: '#',
      image: '📰',
      tags: [query.toLowerCase(), 'colombia', 'noticias', 'actualidad']
    },
    {
      id: `fallback-2-${Date.now()}`,
      title: `"${query}" - Análisis político y social`,
      summary: `Perspectiva integral sobre ${query} y su impacto en la sociedad colombiana. Incluye opiniones de expertos y análisis de tendencias.`,
      source: 'Centro de Análisis Político',
      category: 'Análisis',
      timestamp,
      relevanceScore: 85,
      link: '#',
      image: '🔍',
      tags: [query.toLowerCase(), 'análisis', 'político', 'social']
    },
    {
      id: `fallback-3-${Date.now()}`,
      title: `Contexto histórico: ${query} en Colombia`,
      summary: `Revisión histórica y contextual de ${query} en el marco de la política y sociedad colombiana. Datos y antecedentes relevantes.`,
      source: 'Archivo Histórico Nacional',
      category: 'Historia',
      timestamp,
      relevanceScore: 78,
      link: '#',
      image: '📚',
      tags: [query.toLowerCase(), 'historia', 'contexto', 'colombia']
    }
  ];
};

// Search function that returns multiple relevant results
export const searchContent = (query: string): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Find exact and partial matches
  const matches = searchDatabase.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const summaryMatch = item.summary.toLowerCase().includes(searchTerm);
    const tagMatch = item.tags.some(tag => tag.includes(searchTerm));
    const categoryMatch = item.category.toLowerCase().includes(searchTerm);
    
    return titleMatch || summaryMatch || tagMatch || categoryMatch;
  });

  // If we have matches, return them sorted by relevance
  if (matches.length > 0) {
    // Add keyword relevance boost
    matches.forEach(match => {
      const titleBoost = match.title.toLowerCase().includes(searchTerm) ? 10 : 0;
      const exactTagMatch = match.tags.includes(searchTerm) ? 15 : 0;
      match.relevanceScore += titleBoost + exactTagMatch;
    });
    
    return matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  // If no matches found, return fallback results
  return generateFallbackResults(query);
};

// Get trending/popular search suggestions
export const getSearchSuggestions = (): string[] => {
  return [
    'Gustavo Petro',
    'Centro Democrático', 
    'Facebook Colombia',
    'Trump aranceles',
    'Reforma pensional',
    'Seguridad fronteras',
    'Paz total',
    'Elecciones 2026',
    'Congreso Colombia',
    'Venezuela frontera'
  ];
};