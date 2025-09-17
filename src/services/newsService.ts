import { searchService, SearchResult } from './searchService';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  source: string;
  author?: string;
  authorAvatar?: string;
  publishedAt: string;
  imageUrl?: string;
  readTime: string;
  category: string;
  tags: string[];
  perspective: 'progressive' | 'conservative' | 'neutral';
  url?: string;
  trending: boolean;
  relatedArticles?: string[];
  shareCount?: number;
  publisherIcon?: string;
}

export interface NewsTimeline {
  year: number;
  months: {
    month: number;
    monthName: string;
    articles: NewsArticle[];
    count: number;
  }[];
}

export interface LiveNewsFeed {
  articles: NewsArticle[];
  timeline: NewsTimeline[];
  lastUpdated: Date;
  totalArticles: number;
  hasMore: boolean;
}

class NewsService {
  private readonly updateInterval = 30000; // 30 seconds
  private updateTimer: number | null = null;
  private listeners: Set<(feed: LiveNewsFeed) => void> = new Set();
  private cachedFeed: LiveNewsFeed | null = null;

  // Generate historical news data for the last 5 years
  private generateHistoricalNews(topic: string = '', limit: number = 100): NewsArticle[] {
    const articles: NewsArticle[] = [];
    const now = new Date();
    const fiveYearsAgo = new Date(now.getFullYear() - 5, 0, 1);
    
    const categories = ['Política', 'Economía', 'Seguridad', 'Ambiente', 'Sociedad', 'Internacional'];
    const sources = {
      progressive: [
        { name: 'El Espectador', icon: '📰', authors: ['María González', 'Carlos Rodríguez', 'Ana López'] },
        { name: 'Colombia Informa', icon: '🗞️', authors: ['Pedro Martínez', 'Laura Sánchez'] },
        { name: 'Desde Abajo', icon: '📋', authors: ['José Castro', 'Carmen Herrera'] }
      ],
      conservative: [
        { name: 'El Colombiano', icon: '📰', authors: ['Roberto Silva', 'Patricia Vargas', 'Miguel Torres'] },
        { name: 'Portafolio', icon: '💼', authors: ['Fernando Díaz', 'Claudia Moreno'] },
        { name: 'La República', icon: '🏛️', authors: ['Andrés Ruiz', 'Sofía Ramírez'] }
      ],
      neutral: [
        { name: 'El Tiempo', icon: '⏰', authors: ['Ricardo Pérez', 'Gabriela Cruz', 'Daniel Vega'] },
        { name: 'Caracol Radio', icon: '📻', authors: ['Helena Ortiz', 'Juan Pablo Roa'] },
        { name: 'RCN Noticias', icon: '📺', authors: ['Mónica Jaramillo', 'Francisco Barbosa'] }
      ]
    };

    const topicTemplates = {
      'gustavo-petro': {
        progressive: [
          'Gobierno de Petro avanza en reformas sociales clave',
          'Presidente Petro lidera cambios hacia la justicia social',
          'Políticas progresistas del gobierno muestran resultados positivos'
        ],
        conservative: [
          'Preocupaciones sobre el impacto económico de las políticas de Petro',
          'Sector empresarial expresa inquietudes sobre dirección del gobierno',
          'Análisis crítico de las reformas propuestas por el ejecutivo'
        ]
      },
      'donald-trump': {
        progressive: [
          'Impacto de políticas de Trump en relaciones Colombia-EE.UU.',
          'Análisis crítico de la agenda internacional de Trump',
          'Colombia evalúa efectos de cambios en política exterior estadounidense'
        ],
        conservative: [
          'Oportunidades comerciales con nueva administración estadounidense',
          'Fortalecimiento de alianzas estratégicas con Estados Unidos',
          'Beneficios potenciales de políticas comerciales americanas'
        ]
      },
      'crime-drugs': {
        progressive: [
          'Enfoque integral para abordar problemática de drogas y crimen',
          'Políticas de reinserción social muestran avances significativos',
          'Comunidades rurales se benefician de programas antinarcóticos'
        ],
        conservative: [
          'Intensificación de operativos contra el narcotráfico',
          'Mano dura contra el crimen organizado muestra resultados',
          'Fuerzas armadas refuerzan seguridad en zonas críticas'
        ]
      },
      'employment': {
        progressive: [
          'Programas de empleo juvenil transforman comunidades vulnerables',
          'Iniciativas de emprendimiento social crean nuevas oportunidades',
          'Políticas laborales inclusivas benefician a trabajadores'
        ],
        conservative: [
          'Incentivos empresariales impulsan creación de empleo formal',
          'Flexibilización laboral atrae inversión extranjera',
          'Sector privado lidera generación de empleos de calidad'
        ]
      }
    };

    // Generate articles for each month of the last 5 years
    for (let year = fiveYearsAgo.getFullYear(); year <= now.getFullYear(); year++) {
      for (let month = 0; month < 12; month++) {
        const monthDate = new Date(year, month, 1);
        if (monthDate > now) break;

        // Generate 3-8 articles per month
        const articlesThisMonth = Math.floor(Math.random() * 6) + 3;
        
        for (let i = 0; i < articlesThisMonth && articles.length < limit; i++) {
          const day = Math.floor(Math.random() * 28) + 1;
          const articleDate = new Date(year, month, day, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
          
          const category = categories[Math.floor(Math.random() * categories.length)];
          const perspective = Math.random() < 0.4 ? 'progressive' : Math.random() < 0.8 ? 'conservative' : 'neutral';
          const sourceGroup = sources[perspective as keyof typeof sources];
          const source = sourceGroup[Math.floor(Math.random() * sourceGroup.length)];
          const author = source.authors[Math.floor(Math.random() * source.authors.length)];
          
          let title = '';
          let summary = '';
          
          if (topic && topicTemplates[topic as keyof typeof topicTemplates]) {
            const templates = topicTemplates[topic as keyof typeof topicTemplates];
            if (perspective === 'progressive' && templates.progressive) {
              title = templates.progressive[Math.floor(Math.random() * templates.progressive.length)];
            } else if (perspective === 'conservative' && templates.conservative) {
              title = templates.conservative[Math.floor(Math.random() * templates.conservative.length)];
            } else {
              title = `${topic}: Análisis de ${category.toLowerCase()} desde perspectiva ${perspective}`;
            }
          } else {
            title = this.generateGenericTitle(category, perspective);
          }
          
          summary = this.generateSummary(title, perspective);

          const article: NewsArticle = {
            id: `news-${year}-${month}-${day}-${i}`,
            title,
            summary,
            source: source.name,
            author,
            authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`,
            publishedAt: articleDate.toISOString(),
            readTime: `${Math.floor(Math.random() * 8) + 2} min`,
            category,
            tags: [topic, category.toLowerCase(), perspective].filter(Boolean),
            perspective: perspective as 'progressive' | 'conservative' | 'neutral',
            trending: Math.random() < 0.1, // 10% chance of being trending
            publisherIcon: source.icon,
            shareCount: Math.floor(Math.random() * 1000),
            relatedArticles: []
          };

          articles.push(article);
        }
      }
    }

    // Sort by date (most recent first)
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  private generateGenericTitle(category: string, perspective: string): string {
    const genericTitles = {
      progressive: [
        `Avances en ${category}: Políticas inclusivas muestran resultados`,
        `${category}: Gobierno prioriza justicia social y equidad`,
        `Transformaciones en ${category} benefician a comunidades vulnerables`
      ],
      conservative: [
        `${category}: Sector privado impulsa crecimiento sostenible`,
        `Análisis de ${category}: Importancia de estabilidad económica`,
        `${category}: Equilibrio entre desarrollo y responsabilidad fiscal`
      ],
      neutral: [
        `Actualización en ${category}: Balance de resultados recientes`,
        `${category}: Análisis objetivo de políticas actuales`,
        `Estado actual de ${category} en Colombia: Datos y tendencias`
      ]
    };

    const titles = genericTitles[perspective as keyof typeof genericTitles] || genericTitles.neutral;
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateSummary(title: string, perspective: string): string {
    const summaryTemplates = {
      progressive: [
        'Esta iniciativa representa un avance significativo hacia una sociedad más justa e inclusiva, priorizando el bienestar de las comunidades más vulnerables.',
        'Los resultados demuestran el compromiso del gobierno con políticas que reducen la desigualdad y promueven la justicia social.',
        'Las medidas implementadas buscan transformar estructuralmente los problemas sociales, con un enfoque en derechos humanos y equidad.'
      ],
      conservative: [
        'Los expertos señalan la importancia de mantener equilibrio fiscal y competitividad económica para asegurar crecimiento sostenible.',
        'El sector empresarial destaca la necesidad de políticas que fomenten la inversión y generen empleos de calidad.',
        'El análisis muestra la relevancia de mantener estabilidad institucional y confianza en los mercados para el desarrollo nacional.'
      ],
      neutral: [
        'Los datos oficiales muestran resultados mixtos, con avances en algunos sectores y desafíos pendientes en otros áreas.',
        'El reporte presenta un análisis objetivo de las medidas implementadas, considerando múltiples perspectivas y evidencia empírica.',
        'La evaluación técnica considera tanto los beneficios como los riesgos asociados con las políticas actuales.'
      ]
    };

    const summaries = summaryTemplates[perspective as keyof typeof summaryTemplates] || summaryTemplates.neutral;
    return summaries[Math.floor(Math.random() * summaries.length)];
  }

  // Create timeline structure from articles
  private createTimeline(articles: NewsArticle[]): NewsTimeline[] {
    const timelineMap = new Map<number, Map<number, NewsArticle[]>>();
    
    articles.forEach(article => {
      const date = new Date(article.publishedAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      if (!timelineMap.has(year)) {
        timelineMap.set(year, new Map());
      }
      
      const yearMap = timelineMap.get(year)!;
      if (!yearMap.has(month)) {
        yearMap.set(month, []);
      }
      
      yearMap.get(month)!.push(article);
    });

    const timeline: NewsTimeline[] = [];
    
    for (const [year, yearMap] of timelineMap.entries()) {
      const months = [];
      
      for (const [month, monthArticles] of yearMap.entries()) {
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        months.push({
          month,
          monthName: monthNames[month],
          articles: monthArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
          count: monthArticles.length
        });
      }
      
      // Sort months by month number (descending)
      months.sort((a, b) => b.month - a.month);
      
      timeline.push({ year, months });
    }
    
    // Sort years (descending)
    return timeline.sort((a, b) => b.year - a.year);
  }

  // Get live news feed for a specific topic
  async getLiveNewsFeed(topic: string = '', forceRefresh: boolean = false): Promise<LiveNewsFeed> {
    if (this.cachedFeed && !forceRefresh) {
      return this.cachedFeed;
    }

    try {
      // Try to get real news from search service first
      const searchResults = await searchService.search({
        query: topic || 'Colombia noticias',
        limit: 50,
        sortBy: 'date'
      });

      // Convert search results to news articles and supplement with historical data
      const realNews: NewsArticle[] = searchResults.results.map((result, index) => ({
        id: result.id,
        title: result.title,
        summary: result.summary,
        source: result.source,
        author: result.author || 'Redacción',
        authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(result.author || 'Redacción')}&background=random`,
        publishedAt: result.timestamp,
        readTime: '3 min',
        category: result.category,
        tags: result.tags || [topic],
        perspective: index % 3 === 0 ? 'progressive' : index % 3 === 1 ? 'conservative' : 'neutral',
        trending: Math.random() < 0.15,
        publisherIcon: '📰',
        shareCount: Math.floor(Math.random() * 500),
        relatedArticles: []
      }));

      // Generate historical data to fill timeline
      const historicalNews = this.generateHistoricalNews(topic, 500);
      
      // Combine real and historical news
      const allArticles = [...realNews, ...historicalNews];
      const timeline = this.createTimeline(allArticles);

      this.cachedFeed = {
        articles: allArticles.slice(0, 20), // Start with first 20 articles
        timeline,
        lastUpdated: new Date(),
        totalArticles: allArticles.length,
        hasMore: allArticles.length > 20
      };

      return this.cachedFeed;
    } catch (error) {
      console.warn('Failed to get real news, using generated data:', error);
      
      // Fallback to generated historical data
      const articles = this.generateHistoricalNews(topic, 500);
      const timeline = this.createTimeline(articles);

      this.cachedFeed = {
        articles: articles.slice(0, 20),
        timeline,
        lastUpdated: new Date(),
        totalArticles: articles.length,
        hasMore: articles.length > 20
      };

      return this.cachedFeed;
    }
  }

  // Load more articles
  async loadMoreArticles(currentCount: number): Promise<NewsArticle[]> {
    if (!this.cachedFeed) {
      await this.getLiveNewsFeed();
    }

    if (!this.cachedFeed) return [];

    // Get all articles from timeline
    const allArticles: NewsArticle[] = [];
    this.cachedFeed.timeline.forEach(year => {
      year.months.forEach(month => {
        allArticles.push(...month.articles);
      });
    });

    // Sort by date and return next batch
    const sortedArticles = allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return sortedArticles.slice(currentCount, currentCount + 20);
  }

  // Start live updates
  startLiveUpdates(topic: string = ''): void {
    this.stopLiveUpdates();
    
    this.updateTimer = window.setInterval(async () => {
      try {
        const updatedFeed = await this.getLiveNewsFeed(topic, true);
        this.notifyListeners(updatedFeed);
      } catch (error) {
        console.error('Failed to update news feed:', error);
      }
    }, this.updateInterval);
  }

  // Stop live updates
  stopLiveUpdates(): void {
    if (this.updateTimer) {
      window.clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
  }

  // Subscribe to live updates
  subscribe(callback: (feed: LiveNewsFeed) => void): () => void {
    this.listeners.add(callback);
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Notify all listeners
  private notifyListeners(feed: LiveNewsFeed): void {
    this.listeners.forEach(callback => {
      try {
        callback(feed);
      } catch (error) {
        console.error('Error notifying news feed listener:', error);
      }
    });
  }

  // Get articles for specific time period
  getArticlesByPeriod(year: number, month?: number): NewsArticle[] {
    if (!this.cachedFeed) return [];

    const yearData = this.cachedFeed.timeline.find(y => y.year === year);
    if (!yearData) return [];

    if (month !== undefined) {
      const monthData = yearData.months.find(m => m.month === month);
      return monthData ? monthData.articles : [];
    }

    // Return all articles for the year
    const allArticles: NewsArticle[] = [];
    yearData.months.forEach(monthData => {
      allArticles.push(...monthData.articles);
    });

    return allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  // Generate share URL
  generateShareUrl(article: NewsArticle): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/article/${article.id}`;
  }

  // Copy article link to clipboard
  async copyArticleLink(article: NewsArticle): Promise<boolean> {
    try {
      const url = this.generateShareUrl(article);
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy link:', error);
      return false;
    }
  }
}

// Singleton instance
export const newsService = new NewsService();

// React hook for news service
export const useNewsService = () => {
  return newsService;
};