import { NewsItem, NewsArticle, NewsTimelineData, NewsCategory, NewsSource } from '../types/news';

export interface NewsFilter {
  topic?: string;
  category?: string;
  perspective?: 'progressive' | 'conservative' | 'both';
  timeRange?: 'all' | '1year' | '2years' | '5years';
  source?: string;
}

class NewsService {
  private updateListeners: (() => void)[] = [];
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  // Mock historical news data spanning 5 years
  private newsData: NewsItem[] = [
    // 2024 News
    {
      id: '2024-01',
      title: 'Senado Aprueba Reforma Tributaria con Modificaciones Clave',
      summary: 'El Senado de la República aprobó en primer debate la reforma tributaria tras intensas negociaciones.',
      source: { id: 'et-001', name: 'El Tiempo' },
      category: NewsCategory.POLITICS,
      publishedAt: '2024-01-15T14:30:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '4 min',
      author: 'María González',
      tags: ['reforma', 'tributaria', 'senado'],
      shareUrl: '#',
      relatedArticles: ['2024-02', '2023-12-tax'],
      viewCount: 125000,
      contentType: 'article',
      region: 'colombia',
      expandedSummary: 'El Senado de la República aprobó en primer debate la reforma tributaria tras intensas negociaciones que se extendieron por más de 12 horas. La propuesta incluye modificaciones significativas al régimen tributario empresarial y nuevos incentivos para la inversión en tecnología verde.',
      relatedSearches: ['reforma tributaria colombia', 'senado colombia', 'impuestos empresas'],
      thumbnailUrl: '/api/placeholder/400/250'
    },
    {
      id: '2024-02',
      title: 'Colombia Anuncia Nueva Estrategia de Transición Energética',
      summary: 'El gobierno presenta un plan ambicioso para reducir la dependencia de combustibles fósiles.',
      source: { id: 'pf-001', name: 'Portafolio' },
      category: NewsCategory.ENVIRONMENT,
      publishedAt: '2024-01-15T12:15:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'Carlos Ramírez',
      tags: ['energía', 'renovable', 'ambiente'],
      shareUrl: '#',
      relatedArticles: ['2023-11-energy', '2023-09-climate'],
      viewCount: 89000,
      contentType: 'video',
      videoUrl: '/api/placeholder/video/renewable-energy.mp4',
      videoDuration: '8:45',
      channelName: 'Portafolio TV',
      region: 'colombia',
      expandedSummary: 'El gobierno colombiano presentó una estrategia integral de transición energética que incluye inversiones por $50 billones de pesos hasta 2030. El plan contempla la instalación de 15 GW de capacidad renovable y la creación de 200,000 empleos verdes.',
      relatedSearches: ['energía renovable colombia', 'transición energética', 'paneles solares'],
      relatedVideos: ['2023-wind-energy', '2023-solar-parks'],
      thumbnailUrl: '/api/placeholder/400/250'
    },
    {
      id: '2024-03',
      title: 'Aumenta Inversión Extranjera en Sector Tecnológico',
      summary: 'Empresas multinacionales tecnológicas muestran creciente interés en Colombia.',
      source: { id: 'sm-001', name: 'Semana' },
      category: NewsCategory.ECONOMY,
      publishedAt: '2024-01-10T10:45:00Z',
      hasBalancedCoverage: false,
      trending: true,
      perspective: 'progressive',
      imageUrl: '/api/placeholder/400/250',
      readTime: '5 min',
      author: 'Ana Díaz',
      tags: ['tecnología', 'inversión', 'empresas'],
      shareUrl: '#',
      relatedArticles: ['2023-08-tech', '2023-06-invest'],
      viewCount: 156000,
      contentType: 'article',
      region: 'colombia',
      expandedSummary: 'Las empresas multinacionales tecnológicas han incrementado sus inversiones en Colombia en un 45% durante el último trimestre, impulsadas por incentivos fiscales y la disponibilidad de talento especializado.',
      relatedSearches: ['inversión extranjera colombia', 'empresas tecnológicas', 'startups colombia'],
      thumbnailUrl: '/api/placeholder/400/250'
    },
    {
      id: '2024-04-live',
      title: 'EN VIVO: Debate Presidencial sobre Política Económica',
      summary: 'Transmisión en directo del debate entre candidatos sobre las propuestas económicas.',
      source: { id: 'rcn-001', name: 'RCN Televisión' },
      category: NewsCategory.POLITICS,
      publishedAt: '2024-01-20T20:00:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: 'En vivo',
      author: 'RCN Noticias',
      tags: ['debate', 'presidencial', 'economía', 'en-vivo'],
      shareUrl: '#',
      relatedArticles: ['2024-01', '2023-12-tax'],
      viewCount: 245000,
      contentType: 'live',
      isLive: true,
      channelName: 'RCN EN VIVO',
      region: 'colombia',
      expandedSummary: 'Debate presidencial en vivo donde los candidatos discuten sus propuestas económicas para el próximo período gubernamental. La transmisión incluye análisis en tiempo real y participación ciudadana.',
      relatedSearches: ['debate presidencial colombia', 'política económica', 'candidatos presidente'],
      relatedVideos: ['2023-debate-1', '2023-debate-2'],
      thumbnailUrl: '/api/placeholder/400/250'
    },
    {
      id: '2024-05-global',
      title: 'Crisis Energética Global Afecta Mercados Latinoamericanos',
      summary: 'Los precios del petróleo alcanzan máximos históricos impactando la región.',
      source: { id: 'bloomberg-001', name: 'Bloomberg Línea' },
      category: NewsCategory.ECONOMY,
      publishedAt: '2024-01-18T15:30:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'Reuters Internacional',
      tags: ['energía', 'mercados', 'petróleo', 'latinoamérica'],
      shareUrl: '#',
      relatedArticles: ['2024-02', '2023-oil-crisis'],
      viewCount: 89000,
      contentType: 'video',
      videoUrl: '/api/placeholder/video/energy-crisis.mp4',
      videoDuration: '12:30',
      channelName: 'Bloomberg Markets',
      region: 'global',
      expandedSummary: 'La crisis energética global ha elevado los precios del petróleo a niveles no vistos desde 2008, generando oportunidades y desafíos para los países productores de América Latina, incluyendo Colombia.',
      relatedSearches: ['crisis energética global', 'precios petróleo', 'mercados latinoamérica'],
      relatedVideos: ['2023-oil-markets', '2023-energy-outlook'],
      thumbnailUrl: '/api/placeholder/400/250'
    },

    // 2023 News
    {
      id: '2023-12-tax',
      title: 'Debate sobre Reforma Tributaria Divide Opiniones',
      summary: 'Expertos analizan los posibles impactos de la propuesta de reforma tributaria.',
      source: { id: 'lr-001', name: 'La República' },
      category: NewsCategory.POLITICS,
      publishedAt: '2023-12-20T16:20:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'Roberto Silva',
      tags: ['reforma', 'tributaria', 'debate'],
      shareUrl: '#',
      relatedArticles: ['2023-11-economy', '2023-10-fiscal']
    },
    {
      id: '2023-11-energy',
      title: 'Colombia Avanza en Proyectos de Energía Solar',
      summary: 'Nuevos parques solares generarán miles de empleos en regiones rurales.',
      source: 'El Espectador',
      category: 'Ambiente',
      publishedAt: '2023-11-18T11:30:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '5 min',
      author: 'Laura Méndez',
      tags: ['energía', 'solar', 'empleo'],
      shareUrl: '#',
      relatedArticles: ['2023-09-climate', '2023-07-renewable']
    },
    {
      id: '2023-10-security',
      title: 'Nuevo Plan de Seguridad para Zonas Rurales',
      summary: 'Las autoridades presentan estrategias focalizadas para mejorar la seguridad rural.',
      source: 'RCN Radio',
      category: 'Seguridad',
      publishedAt: '2023-10-15T09:20:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'Pedro Martínez',
      tags: ['seguridad', 'rural', 'plan'],
      shareUrl: '#',
      relatedArticles: ['2023-08-peace', '2023-06-rural']
    },

    // 2022 News
    {
      id: '2022-12-education',
      title: 'Reforma Educativa Busca Mejorar Calidad en Colegios Públicos',
      summary: 'El Ministerio de Educación presenta nueva estrategia para fortalecer la educación pública.',
      source: 'El Tiempo',
      category: 'Educación',
      publishedAt: '2022-12-10T14:15:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '8 min',
      author: 'Diana Torres',
      tags: ['educación', 'reforma', 'colegios'],
      shareUrl: '#',
      relatedArticles: ['2022-09-teachers', '2022-07-budget']
    },
    {
      id: '2022-10-health',
      title: 'Sistema de Salud Pública Enfrenta Nuevos Desafíos',
      summary: 'La pandemia expuso fortalezas y debilidades del sistema de salud colombiano.',
      source: 'Semana',
      category: 'Salud',
      publishedAt: '2022-10-25T16:45:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '9 min',
      author: 'Dr. Luis García',
      tags: ['salud', 'pandemia', 'sistema'],
      shareUrl: '#',
      relatedArticles: ['2022-08-covid', '2022-06-healthcare']
    },

    // 2021 News
    {
      id: '2021-11-infrastructure',
      title: 'Grandes Proyectos de Infraestructura Transforman el País',
      summary: 'Inversiones en carreteras y puentes conectan regiones aisladas con los centros urbanos.',
      source: 'Portafolio',
      category: 'Infraestructura',
      publishedAt: '2021-11-20T13:30:00Z',
      hasBalancedCoverage: false,
      trending: false,
      perspective: 'progressive',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'Ingeniero José López',
      tags: ['infraestructura', 'carreteras', 'desarrollo'],
      shareUrl: '#',
      relatedArticles: ['2021-08-roads', '2021-06-bridges']
    },
    {
      id: '2021-09-agriculture',
      title: 'Apoyo al Sector Agropecuario Impulsa la Economía Rural',
      summary: 'Nuevos programas gubernamentales fortalecen la producción agrícola nacional.',
      source: 'Contexto Ganadero',
      category: 'Agricultura',
      publishedAt: '2021-09-15T10:20:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'Agrónoma Carmen Ruiz',
      tags: ['agricultura', 'ganadería', 'rural'],
      shareUrl: '#',
      relatedArticles: ['2021-07-crops', '2021-05-farming']
    },

    // 2020 News
    {
      id: '2020-12-covid',
      title: 'Colombia Enfrenta los Desafíos de la Pandemia',
      summary: 'El país implementa medidas para controlar la propagación del COVID-19.',
      source: 'Ministerio de Salud',
      category: 'Salud',
      publishedAt: '2020-12-20T18:00:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '10 min',
      author: 'Ministerio de Salud',
      tags: ['covid', 'pandemia', 'salud'],
      shareUrl: '#',
      relatedArticles: ['2020-10-lockdown', '2020-08-vaccines']
    },
    {
      id: '2020-10-economy',
      title: 'Impacto Económico de la Pandemia en Colombia',
      summary: 'Análisis de los efectos del COVID-19 en diferentes sectores económicos del país.',
      source: 'DANE',
      category: 'Economía',
      publishedAt: '2020-10-15T14:30:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '12 min',
      author: 'DANE Estadísticas',
      tags: ['economía', 'covid', 'impacto'],
      shareUrl: '#',
      relatedArticles: ['2020-08-employment', '2020-06-gdp']
    }
  ];

  // Generate timeline data from news items
  generateTimelineData(): NewsTimelineData {
    const timeline: NewsTimelineData = {};
    
    this.newsData.forEach(item => {
      const date = new Date(item.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleDateString('es-CO', { month: 'long' });
      
      if (!timeline[year]) {
        timeline[year] = {};
      }
      
      if (!timeline[year][month]) {
        timeline[year][month] = [];
      }
      
      timeline[year][month].push(item);
    });

    // Sort articles within each month by date (most recent first)
    Object.keys(timeline).forEach(year => {
      Object.keys(timeline[parseInt(year)]).forEach(month => {
        timeline[parseInt(year)][month].sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      });
    });

    return timeline;
  }

  // Get filtered news based on criteria
  getFilteredNews(filter: NewsFilter = {}): NewsItem[] {
    let filtered = [...this.newsData];

    // Filter by time range
    if (filter.timeRange && filter.timeRange !== 'all') {
      const now = new Date();
      const yearsBack = filter.timeRange === '1year' ? 1 : 
                       filter.timeRange === '2years' ? 2 : 5;
      const cutoffDate = new Date(now.getFullYear() - yearsBack, now.getMonth(), now.getDate());
      
      filtered = filtered.filter(item => 
        new Date(item.publishedAt) >= cutoffDate
      );
    }

    // Filter by category
    if (filter.category) {
      filtered = filtered.filter(item => {
        const categoryValue = typeof item.category === 'string' ? item.category : item.category;
        return categoryValue.toLowerCase().includes(filter.category!.toLowerCase());
      });
    }

    // Filter by perspective
    if (filter.perspective && filter.perspective !== 'both') {
      filtered = filtered.filter(item => 
        item.perspective === filter.perspective || item.perspective === 'both'
      );
    }

    // Filter by source
    if (filter.source) {
      filtered = filtered.filter(item => {
        const sourceName = typeof item.source === 'string' ? item.source : item.source.name;
        return sourceName.toLowerCase().includes(filter.source!.toLowerCase());
      });
    }

    // Sort by date (most recent first)
    return filtered.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  // Get trending news
  getTrendingNews(): NewsItem[] {
    return this.newsData
      .filter(item => item.trending)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  // Get news by category with balanced perspectives
  getNewsByCategory(category: string): { progressive: NewsItem[], conservative: NewsItem[] } {
    const categoryNews = this.newsData.filter(item => {
      const categoryValue = typeof item.category === 'string' ? item.category : item.category;
      return categoryValue.toLowerCase() === category.toLowerCase();
    });

    return {
      progressive: categoryNews.filter(item => 
        item.perspective === 'progressive' || item.perspective === 'both'
      ),
      conservative: categoryNews.filter(item => 
        item.perspective === 'conservative' || item.perspective === 'both'
      )
    };
  }

  // Simulate live updates
  startLiveUpdates(): void {
    if (this.refreshInterval) {
      return; // Already started
    }

    this.refreshInterval = setInterval(() => {
      // Simulate new news updates
      this.simulateNewsUpdate();
      this.notifyListeners();
    }, 30000); // Update every 30 seconds
  }

  stopLiveUpdates(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  // Add listener for updates
  addUpdateListener(callback: () => void): void {
    this.updateListeners.push(callback);
  }

  // Remove listener
  removeUpdateListener(callback: () => void): void {
    this.updateListeners = this.updateListeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    this.updateListeners.forEach(callback => callback());
  }

  private simulateNewsUpdate(): void {
    // Simulate updating existing news or adding breaking news
    const now = new Date().toISOString();
    
    // Update last updated time for trending articles
    this.newsData.forEach(item => {
      if (item.trending && Math.random() > 0.7) {
        // 30% chance to update trending articles
        item.publishedAt = now;
      }
    });

    // Occasionally add a "breaking news" item
    if (Math.random() > 0.9) { // 10% chance
      const breakingNews: NewsItem = {
        id: `breaking-${Date.now()}`,
        title: 'ÚLTIMA HORA: Actualización en Desarrollo',
        summary: 'Información de última hora que se está desarrollando en este momento.',
        source: { id: null, name: 'Redacción' },
        category: NewsCategory.BREAKING,
        publishedAt: now,
        hasBalancedCoverage: false,
        trending: true,
        perspective: 'both',
        imageUrl: '/api/placeholder/400/250',
        readTime: '2 min',
        author: 'Redacción',
        tags: ['última hora', 'breaking'],
        shareUrl: '#',
        relatedArticles: []
      };
      
      this.newsData.unshift(breakingNews);
      
      // Keep only the last 50 articles to prevent memory issues
      if (this.newsData.length > 50) {
        this.newsData = this.newsData.slice(0, 50);
      }
    }
  }

  // Get related articles
  getRelatedArticles(articleId: string): NewsItem[] {
    const article = this.newsData.find(item => item.id === articleId);
    if (!article || !article.relatedArticles) {
      return [];
    }

    return this.newsData.filter(item => 
      article.relatedArticles!.includes(item.id)
    );
  }

  // Get article details with perspectives
  getArticleWithPerspectives(articleId: string): NewsArticle[] {
    // Mock implementation - in real app this would fetch detailed article content
    const baseArticle = this.newsData.find(item => item.id === articleId);
    if (!baseArticle) {
      return [];
    }

    const perspectives: NewsArticle[] = [];

    // Progressive perspective
    if (baseArticle.perspective === 'progressive' || baseArticle.perspective === 'both') {
      perspectives.push({
        id: `${articleId}-progressive`,
        title: `${baseArticle.title} - Perspectiva Progresista`,
        summary: baseArticle.summary,
        fullContent: this.generateMockContent(baseArticle, 'progressive'),
        source: baseArticle.source,
        publishedAt: baseArticle.publishedAt,
        imageUrl: baseArticle.imageUrl,
        readTime: baseArticle.readTime ?? '5 min',
        category: baseArticle.category,
        perspective: 'progressive',
        url: baseArticle.shareUrl
      });
    }

    // Conservative perspective
    if (baseArticle.perspective === 'conservative' || baseArticle.perspective === 'both') {
      perspectives.push({
        id: `${articleId}-conservative`,
        title: `${baseArticle.title} - Perspectiva Conservadora`,
        summary: baseArticle.summary,
        fullContent: this.generateMockContent(baseArticle, 'conservative'),
        source: baseArticle.source,
        publishedAt: baseArticle.publishedAt,
        imageUrl: baseArticle.imageUrl,
        readTime: baseArticle.readTime ?? '5 min',
        category: baseArticle.category,
        perspective: 'conservative',
        url: baseArticle.shareUrl
      });
    }

    return perspectives;
  }

  private generateMockContent(article: NewsItem, perspective: 'progressive' | 'conservative'): string {
    const baseContent = `Este es el contenido completo del artículo "${article.title}" desde una perspectiva ${perspective === 'progressive' ? 'progresista' : 'conservadora'}.

**Contexto:**

${article.summary}

**Análisis Detallado:**

Desde una perspectiva ${perspective === 'progressive' ? 'progresista' : 'conservadora'}, este tema requiere un enfoque que considere los siguientes aspectos:

- Impacto social y económico
- Consideraciones a largo plazo
- Efectos en diferentes sectores de la población
- Alternativas y propuestas de solución

**Conclusiones:**

${perspective === 'progressive' 
  ? 'Es fundamental priorizar el bienestar social y la equidad en cualquier decisión política.'
  : 'Es importante mantener la estabilidad económica y considerar el impacto en el sector productivo.'
}`;

    return baseContent;
  }
}

export const newsService = new NewsService();
export default newsService;