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
}

// Enhanced mock search data with more comprehensive coverage
const mockSearchDatabase: SearchResult[] = [
  // Political news
  {
    id: '1',
    title: 'Gustavo Petro anuncia nueva política económica para 2024',
    summary: 'El presidente colombiano presenta un plan integral de reformas económicas que incluye medidas fiscales y sociales para impulsar el crecimiento.',
    source: 'El Tiempo',
    category: 'Política',
    timestamp: '2024-01-15T10:30:00Z',
    relevanceScore: 95,
    link: '#',
    image: '🏛️'
  },
  {
    id: '2', 
    title: 'Centro Democrático critica políticas del gobierno actual',
    summary: 'La oposición presenta observaciones detalladas sobre las políticas económicas y sociales implementadas por la administración Petro.',
    source: 'Semana',
    category: 'Política',
    timestamp: '2024-01-15T08:45:00Z',
    relevanceScore: 88,
    link: '#',
    image: '🗳️'
  },
  {
    id: '3',
    title: 'Trump propone nuevos aranceles que afectarían a Colombia',
    summary: 'El expresidente estadounidense anuncia medidas comerciales que podrían impactar las exportaciones colombianas de café y flores.',
    source: 'CNN Colombia',
    category: 'Internacional',
    timestamp: '2024-01-14T16:20:00Z',
    relevanceScore: 82,
    link: '#',
    image: '🇺🇸'
  },
  {
    id: '4',
    title: 'Congreso debate reforma pensional con participación ciudadana',
    summary: 'Las comisiones del Senado y Cámara abren espacios de diálogo para escuchar las propuestas de la sociedad civil sobre el sistema pensional.',
    source: 'El Espectador',
    category: 'Social',
    timestamp: '2024-01-14T14:15:00Z',
    relevanceScore: 75,
    link: '#',
    image: '🏛️'
  },
  // Terror/Security news - enhanced coverage
  {
    id: '5',
    title: 'Alerta de seguridad por actividad terrorista en fronteras',
    summary: 'Las fuerzas militares reportan incremento en amenazas de grupos armados ilegales en las zonas fronterizas con Venezuela.',
    source: 'Caracol Radio',
    category: 'Seguridad',
    timestamp: '2024-01-14T12:00:00Z',
    relevanceScore: 90,
    link: '#',
    image: '🚨'
  },
  {
    id: '6',
    title: 'Operativo antiterrorista en Norte de Santander',
    summary: 'Autoridades capturan a presuntos miembros de grupos terroristas que planeaban ataques en centros urbanos.',
    source: 'RCN Radio',
    category: 'Seguridad',
    timestamp: '2024-01-13T18:30:00Z',
    relevanceScore: 87,
    link: '#',
    image: '🛡️'
  },
  {
    id: '7',
    title: 'Amenazas cibernéticas: Colombia refuerza defensa digital',
    summary: 'El gobierno nacional implementa nuevas medidas de ciberseguridad para proteger infraestructura crítica de ataques terroristas digitales.',
    source: 'Ministerio de Defensa',
    category: 'Seguridad',
    timestamp: '2024-01-13T15:45:00Z',
    relevanceScore: 84,
    link: '#',
    image: '🔒'
  },
  {
    id: '8',
    title: 'Terror en comunidades rurales: Plan de protección',
    summary: 'Fuerzas armadas despliegan operativo especial para proteger comunidades rurales de amenazas terroristas.',
    source: 'Ejército Nacional',
    category: 'Seguridad',
    timestamp: '2024-01-13T11:20:00Z',
    relevanceScore: 81,
    link: '#',
    image: '🏘️'
  },
  {
    id: '9',
    title: 'Inteligencia militar identifica nuevas redes terroristas',
    summary: 'Servicios de inteligencia revelan estructura de financiación y operación de grupos terroristas emergentes.',
    source: 'Central de Inteligencia',
    category: 'Seguridad',
    timestamp: '2024-01-12T20:15:00Z',
    relevanceScore: 89,
    link: '#',
    image: '🕵️'
  },
  {
    id: '10',
    title: 'Prevención del terrorismo: Estrategia comunitaria',
    summary: 'Programa nacional involucra a comunidades locales en la identificación temprana de actividades terroristas.',
    source: 'Policía Nacional',
    category: 'Seguridad',
    timestamp: '2024-01-12T16:00:00Z',
    relevanceScore: 78,
    link: '#',
    image: '👥'
  },
  // More diverse content
  {
    id: '11',
    title: 'Colombia avanza en transformación digital para 2030',
    summary: 'El MinTIC presenta el plan nacional de digitalización que conectará el 95% del territorio con internet de alta velocidad.',
    source: 'Portafolio',
    category: 'Tecnología',
    timestamp: '2024-01-13T11:30:00Z',
    relevanceScore: 70,
    link: '#',
    image: '💻'
  },
  {
    id: '12',
    title: 'Reforma educativa: Nuevos estándares de calidad',
    summary: 'Ministerio de Educación anuncia cambios estructurales para mejorar la calidad educativa en todo el país.',
    source: 'MinEducación',
    category: 'Educación',
    timestamp: '2024-01-12T14:30:00Z',
    relevanceScore: 73,
    link: '#',
    image: '📚'
  },
  {
    id: '13',
    title: 'Cambio climático: Colombia líder en sostenibilidad',
    summary: 'El país presenta ambiciosas metas de reducción de emisiones y protección de biodiversidad ante la COP29.',
    source: 'MinAmbiente',
    category: 'Ambiente',
    timestamp: '2024-01-11T09:15:00Z',
    relevanceScore: 76,
    link: '#',
    image: '🌍'
  },
  {
    id: '14',
    title: 'Participación ciudadana en presupuestos municipales',
    summary: 'Alcaldías implementan plataformas digitales para que ciudadanos participen en decisiones sobre el presupuesto público.',
    source: 'Federación de Municipios',
    category: 'Participación',
    timestamp: '2024-01-10T17:45:00Z',
    relevanceScore: 72,
    link: '#',
    image: '💰'
  },
  {
    id: '15',
    title: 'Trump: Relaciones comerciales con América Latina',
    summary: 'Análisis del impacto de las políticas comerciales de Trump en los acuerdos económicos con Colombia y la región.',
    source: 'Bloomberg Colombia',
    category: 'Internacional',
    timestamp: '2024-01-10T13:20:00Z',
    relevanceScore: 85,
    link: '#',
    image: '📈'
  }
];

export class SearchDataService {
  private static instance: SearchDataService;
  private mockData: SearchResult[] = mockSearchDatabase;

  private constructor() {}

  public static getInstance(): SearchDataService {
    if (!SearchDataService.instance) {
      SearchDataService.instance = new SearchDataService();
    }
    return SearchDataService.instance;
  }

  async searchWithPagination(
    query: string, 
    page: number = 1, 
    pageSize: number = 6,
    category?: string
  ): Promise<{
    results: SearchResult[];
    totalResults: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    let filteredResults = this.mockData;

    // Filter by query
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredResults = this.mockData.filter(item => 
        searchTerms.some(term =>
          item.title.toLowerCase().includes(term) ||
          item.summary.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.source.toLowerCase().includes(term)
        )
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredResults = filteredResults.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by relevance score
    filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Paginate
    const totalResults = filteredResults.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    // Add dynamic search result if query exists
    if (query.trim() && page === 1) {
      const dynamicResult: SearchResult = {
        id: `dynamic-${Date.now()}`,
        title: `Búsqueda en tiempo real: "${query}"`,
        summary: `Resultados actualizados sobre ${query} en Colombia. Cobertura integral de eventos, análisis y perspectivas de múltiples fuentes.`,
        source: 'Nuestro Pulso Agregador',
        category: 'Agregado',
        timestamp: new Date().toISOString(),
        relevanceScore: 100,
        link: '#',
        image: '🔍'
      };
      paginatedResults.unshift(dynamicResult);
    }

    return {
      results: paginatedResults,
      totalResults: totalResults + (query.trim() ? 1 : 0), // Add 1 for dynamic result
      currentPage: page,
      totalPages: Math.max(1, totalPages),
      hasMore: page < totalPages
    };
  }

  async searchByCategory(category: string): Promise<SearchResult[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.mockData.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    ).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  getPopularSearchTerms(): string[] {
    return [
      'Gustavo Petro',
      'Centro Democrático', 
      'Trump Colombia',
      'Reforma pensional',
      'Seguridad fronteras',
      'Terror news',
      'Operativo antiterrorista',
      'Amenazas cibernéticas',
      'Participación ciudadana',
      'Cambio climático'
    ];
  }

  // Method to add fallback data for sparse categories
  addFallbackData(category: string, count: number = 5): SearchResult[] {
    const fallbackTemplates = {
      'terror': [
        'Operativo de seguridad en {region}',
        'Prevención antiterrorista en {zone}', 
        'Alerta de inteligencia sobre {threat}',
        'Protección civil ante {risk}',
        'Estrategia de defensa nacional'
      ],
      'tecnologia': [
        'Innovación digital en {sector}',
        'Transformación tecnológica en {area}',
        'Desarrollo de software en {region}',
        'Conectividad rural en {zone}',
        'Ciberseguridad nacional'
      ]
    };

    const templates = fallbackTemplates[category as keyof typeof fallbackTemplates] || [
      'Información sobre {topic}',
      'Análisis de {subject}',
      'Reporte especial de {area}',
      'Cobertura de {event}',
      'Actualización sobre {matter}'
    ];

    return templates.slice(0, count).map((template, index) => ({
      id: `fallback-${category}-${Date.now()}-${index}`,
      title: template.replace('{region}', 'Colombia').replace('{zone}', 'fronteras').replace('{threat}', 'grupos armados').replace('{risk}', 'amenazas').replace('{sector}', 'gobierno').replace('{area}', 'rural').replace('{topic}', category).replace('{subject}', category).replace('{event}', category).replace('{matter}', category),
      summary: `Información relevante y actualizada sobre ${category} en el contexto colombiano. Cobertura especializada con fuentes verificadas.`,
      source: 'Sistema de Información Nacional',
      category: category.charAt(0).toUpperCase() + category.slice(1),
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Random within last week
      relevanceScore: 60 + Math.random() * 20, // 60-80 range
      link: '#',
      image: category === 'terror' ? '🚨' : '📰'
    }));
  }
}

export const searchDataService = SearchDataService.getInstance();