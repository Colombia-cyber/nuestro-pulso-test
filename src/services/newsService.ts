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

  // Mock historical news data spanning 5 years - World-focused content
  private newsData: NewsItem[] = [
    // 2024 News - Terror & Security Focus
    {
      id: '2024-terror-01',
      title: 'Global Security Alert: Coordinated Terror Threats Detected Across Multiple Countries',
      summary: 'Intelligence agencies worldwide report increased chatter about potential coordinated attacks during major international events.',
      source: { id: 'reuters-001', name: 'Reuters International' },
      category: NewsCategory.SECURITY,
      publishedAt: '2024-01-20T14:30:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '5 min',
      author: 'International Security Desk',
      tags: ['terror', 'global security', 'threat assessment'],
      shareUrl: '#',
      relatedArticles: ['2024-terror-02', '2023-security-03']
    },
    {
      id: '2024-trump-01',
      title: 'Trump Announces Major Foreign Policy Shift: "America First 2.0" Strategy',
      summary: 'Former President Trump outlines new international approach, emphasizing trade renegotiations and NATO restructuring.',
      source: { id: 'ap-001', name: 'Associated Press' },
      category: NewsCategory.POLITICS,
      publishedAt: '2024-01-18T12:15:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'Political Correspondent',
      tags: ['trump', 'foreign policy', 'america first'],
      shareUrl: '#',
      relatedArticles: ['2024-politics-02', '2023-trump-12']
    },
    {
      id: '2024-petro-01',
      title: 'Petro Proposes Revolutionary South American Economic Alliance',
      summary: 'Colombian President Gustavo Petro calls for unified Latin American response to global economic challenges.',
      source: { id: 'et-001', name: 'El Tiempo' },
      category: NewsCategory.POLITICS,
      publishedAt: '2024-01-15T10:45:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'progressive',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'María González',
      tags: ['petro', 'latin america', 'economic alliance'],
      shareUrl: '#',
      relatedArticles: ['2024-economy-01', '2023-petro-11']
    },
    {
      id: '2024-drugs-01',
      title: 'International Drug Cartel Network Dismantled in Multi-Country Operation',
      summary: 'Coordinated effort between DEA, Europol, and Latin American agencies results in 200+ arrests worldwide.',
      source: { id: 'bbc-001', name: 'BBC World' },
      category: NewsCategory.SECURITY,
      publishedAt: '2024-01-12T16:20:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '8 min',
      author: 'Crime Correspondent',
      tags: ['drug cartels', 'international crime', 'law enforcement'],
      shareUrl: '#',
      relatedArticles: ['2023-drugs-08', '2023-crime-05']
    },
    {
      id: '2024-health-01',
      title: 'WHO Declares New Global Health Emergency: Antibiotic Resistance Crisis',
      summary: 'World Health Organization warns of increasing threat from drug-resistant bacteria affecting millions globally.',
      source: { id: 'who-001', name: 'World Health Organization' },
      category: NewsCategory.HEALTH,
      publishedAt: '2024-01-10T11:30:00Z',
      hasBalancedCoverage: true,
      trending: true,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'WHO Health Desk',
      tags: ['WHO', 'global health', 'antibiotic resistance'],
      shareUrl: '#',
      relatedArticles: ['2023-health-07', '2023-medical-04']
    },

    // 2023 News - Global Politics & Economy
    {
      id: '2023-employment-01',
      title: 'Global Employment Crisis: 200M Jobs at Risk from AI Automation',
      summary: 'International Labour Organization study reveals massive potential job displacement across multiple industries.',
      source: { id: 'ilo-001', name: 'International Labour Organization' },
      category: NewsCategory.ECONOMY,
      publishedAt: '2023-12-20T14:15:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '9 min',
      author: 'Economic Research Team',
      tags: ['employment', 'AI automation', 'global economy'],
      shareUrl: '#',
      relatedArticles: ['2023-tech-06', '2023-economy-05']
    },
    {
      id: '2023-legislation-01',
      title: 'International Criminal Court Issues Historic Climate Crime Framework',
      summary: 'ICC establishes new legal precedent for prosecuting environmental crimes affecting multiple nations.',
      source: { id: 'icc-001', name: 'International Criminal Court' },
      category: NewsCategory.POLITICS,
      publishedAt: '2023-11-18T13:20:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'Legal Affairs Correspondent',
      tags: ['international law', 'climate crime', 'ICC'],
      shareUrl: '#',
      relatedArticles: ['2023-climate-04', '2023-legal-03']
    },
    {
      id: '2023-congress-col-01',
      title: 'Colombian Congress Leads Regional Anti-Corruption Initiative',
      summary: 'Historic bipartisan effort establishes new transparency standards adopted by neighboring countries.',
      source: { id: 'congress-col', name: 'Congreso de Colombia' },
      category: NewsCategory.POLITICS,
      publishedAt: '2023-10-15T12:45:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '5 min',
      author: 'Parliamentary Reporter',
      tags: ['colombia congress', 'anti-corruption', 'transparency'],
      shareUrl: '#',
      relatedArticles: ['2023-reform-02', '2023-governance-01']
    },

    // 2022 News - International Relations
    {
      id: '2022-reels-01',
      title: 'Viral: Ukrainian President\'s Social Media Strategy Changes War Narrative',
      summary: 'Analysis of how social media content has transformed international perception of the conflict.',
      source: { id: 'digital-times', name: 'Digital Times' },
      category: NewsCategory.BREAKING,
      publishedAt: '2022-12-10T15:30:00Z',
      hasBalancedCoverage: false,
      trending: true,
      perspective: 'progressive',
      imageUrl: '/api/placeholder/400/250',
      readTime: '4 min',
      author: 'Social Media Analyst',
      tags: ['viral content', 'social media', 'international relations'],
      shareUrl: '#',
      relatedArticles: ['2022-ukraine-04', '2022-media-03']
    },
    {
      id: '2022-politics-global-01',
      title: 'Democratic Backsliding: Global Democracy Index Hits 20-Year Low',
      summary: 'Freedom House report shows concerning trends in democratic institutions worldwide.',
      source: { id: 'freedom-house', name: 'Freedom House' },
      category: NewsCategory.POLITICS,
      publishedAt: '2022-10-25T11:20:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '8 min',
      author: 'Democracy Research Team',
      tags: ['democracy', 'global politics', 'freedom'],
      shareUrl: '#',
      relatedArticles: ['2022-democracy-02', '2022-freedom-01']
    },

    // 2021 News - Health & Crime
    {
      id: '2021-terror-global-01',
      title: 'Global Counter-Terrorism Summit Establishes New Intelligence Sharing Protocols',
      summary: 'Leaders from 50 nations agree on enhanced cooperation to combat international terrorism threats.',
      source: { id: 'un-news', name: 'UN News' },
      category: NewsCategory.SECURITY,
      publishedAt: '2021-11-20T16:45:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '6 min',
      author: 'UN Security Correspondent',
      tags: ['terrorism', 'international cooperation', 'security'],
      shareUrl: '#',
      relatedArticles: ['2021-security-05', '2021-cooperation-02']
    },
    {
      id: '2021-health-pandemic-01',
      title: 'Global Vaccine Inequality: WHO Calls for Patent Waiver Extension',
      summary: 'World Health Organization pushes for broader access to COVID-19 vaccines in developing nations.',
      source: { id: 'who-002', name: 'World Health Organization' },
      category: NewsCategory.HEALTH,
      publishedAt: '2021-09-15T14:30:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'progressive',
      imageUrl: '/api/placeholder/400/250',
      readTime: '7 min',
      author: 'Global Health Reporter',
      tags: ['vaccines', 'global health', 'pandemic'],
      shareUrl: '#',
      relatedArticles: ['2021-covid-08', '2021-vaccines-04']
    },

    // 2020 News - Historic Global Events
    {
      id: '2020-pandemic-start',
      title: 'WHO Declares COVID-19 Global Pandemic: World Prepares for Unprecedented Challenge',
      summary: 'World Health Organization officially designates COVID-19 as a pandemic, triggering global response protocols.',
      source: { id: 'who-003', name: 'World Health Organization' },
      category: NewsCategory.HEALTH,
      publishedAt: '2020-03-11T18:00:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '10 min',
      author: 'WHO Emergency Committee',
      tags: ['covid pandemic', 'WHO', 'global health emergency'],
      shareUrl: '#',
      relatedArticles: ['2020-covid-timeline', '2020-global-response']
    },
    {
      id: '2020-economy-collapse',
      title: 'Global Economic Crisis: IMF Predicts Worst Recession Since Great Depression',
      summary: 'International Monetary Fund warns of severe economic contraction across all major economies.',
      source: { id: 'imf-001', name: 'International Monetary Fund' },
      category: NewsCategory.ECONOMY,
      publishedAt: '2020-04-14T13:30:00Z',
      hasBalancedCoverage: true,
      trending: false,
      perspective: 'both',
      imageUrl: '/api/placeholder/400/250',
      readTime: '12 min',
      author: 'IMF Economic Research',
      tags: ['global recession', 'economic crisis', 'IMF'],
      shareUrl: '#',
      relatedArticles: ['2020-markets-crash', '2020-unemployment-surge']
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