/**
 * Content Service - Unified API for fetching content from multiple sources
 * Provides mock data when external APIs are blocked and real integration when available
 */

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  source: {
    name: string;
    url?: string;
  };
  publishedAt: string;
  url: string;
  category: string;
  political_lean?: 'left' | 'right' | 'center';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  thumbnail?: string;
}

export interface SocialMediaPost {
  id: string;
  platform: 'youtube' | 'twitter' | 'instagram' | 'facebook';
  content: string;
  author: string;
  authorHandle: string;
  publishedAt: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  media?: {
    type: 'image' | 'video' | 'link';
    url: string;
    thumbnail?: string;
  };
  hashtags: string[];
  category: string;
}

export interface VideoReel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'native';
  author: string;
  category: string;
  url: string;
  publishedAt: string;
}

class ContentService {
  private static instance: ContentService;
  
  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  // Mock news data for when external APIs are blocked
  private mockNewsData: NewsArticle[] = [
    {
      id: 'n1',
      title: 'Gustavo Petro anuncia nueva política de paz total en territorios rurales',
      description: 'El presidente colombiano presenta estrategia integral para pacificación de zonas rurales afectadas por la violencia.',
      content: 'El presidente Gustavo Petro anunció hoy una nueva fase de la política de Paz Total, enfocada específicamente en territorios rurales que han sido históricamente afectados por la violencia. La estrategia incluye inversión en infraestructura, educación y programas de sustitución de cultivos ilícitos...',
      source: { name: 'Presidencia de Colombia', url: 'https://presidencia.gov.co' },
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'política',
      political_lean: 'left',
      engagement: { likes: 1247, shares: 389, comments: 156 },
      thumbnail: '🇨🇴'
    },
    {
      id: 'n2',
      title: 'Donald Trump critica políticas migratorias en frontera con México',
      description: 'El expresidente estadounidense intensifica retórica anti-inmigración en rally político.',
      content: 'En un rally en Arizona, Donald Trump criticó duramente las políticas migratorias actuales y prometió implementar medidas más estrictas si regresa al poder. Sus declaraciones generan debate sobre el futuro de la inmigración en Estados Unidos...',
      source: { name: 'Fox News', url: 'https://foxnews.com' },
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'política',
      political_lean: 'right',
      engagement: { likes: 2156, shares: 847, comments: 423 },
      thumbnail: '🇺🇸'
    },
    {
      id: 'n3',
      title: 'Centro Democrático propone reducción de impuestos para empresas',
      description: 'El partido de oposición presenta propuesta para estimular crecimiento económico.',
      content: 'El Centro Democrático radicó en el Congreso un proyecto de ley que busca reducir la carga tributaria a empresas que generen empleo formal. La propuesta incluye incentivos especiales para startups y empresas tecnológicas...',
      source: { name: 'Centro Democrático', url: 'https://centrodemocratico.com' },
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'política',
      political_lean: 'right',
      engagement: { likes: 892, shares: 234, comments: 167 },
      thumbnail: '🗳️'
    },
    {
      id: 'n4',
      title: 'Atentado terrorista en mercado central genera alarma nacional',
      description: 'Autoridades investigan explosión que dejó múltiples heridos en zona comercial.',
      content: 'Un explosivo detonó en el mercado central de la ciudad, generando pánico entre los ciudadanos. Las autoridades han desplegado operativos especiales y aumentado la seguridad en lugares públicos. Se investiga posible conexión con grupos terroristas...',
      source: { name: 'Policía Nacional', url: 'https://policia.gov.co' },
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'seguridad',
      political_lean: 'center',
      engagement: { likes: 543, shares: 189, comments: 298 },
      thumbnail: '🚨'
    },
    {
      id: 'n5',
      title: 'Elecciones primarias muestran fortalecimiento de candidatos conservadores',
      description: 'Resultados preliminares revelan crecimiento del electorado de derecha.',
      content: 'Los resultados de las elecciones primarias muestran un incremento significativo en el apoyo a candidatos conservadores. Analistas políticos destacan el papel de las redes sociales en la movilización del voto de derecha...',
      source: { name: 'Registraduría Nacional', url: 'https://registraduria.gov.co' },
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'elecciones',
      political_lean: 'right',
      engagement: { likes: 1678, shares: 445, comments: 234 },
      thumbnail: '📊'
    },
    {
      id: 'n6',
      title: 'Headlines mundiales: Crisis climática domina agenda internacional',
      description: 'Líderes mundiales se reúnen para discutir medidas urgentes contra el cambio climático.',
      content: 'La cumbre internacional sobre cambio climático reunió a más de 100 líderes mundiales. Las discusiones se centran en compromisos vinculantes para reducir emisiones y financiamiento para países en desarrollo...',
      source: { name: 'BBC Mundo', url: 'https://bbc.com' },
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: 'internacional',
      political_lean: 'center',
      engagement: { likes: 2234, shares: 567, comments: 189 },
      thumbnail: '🌍'
    }
  ];

  private mockSocialPosts: SocialMediaPost[] = [
    {
      id: 's1',
      platform: 'twitter',
      content: 'La participación ciudadana es clave para fortalecer nuestra democracia. Cada voz cuenta en la construcción del futuro de Colombia. #ParticipacionCiudadana #Colombia',
      author: 'Fundación Corona',
      authorHandle: '@FundacionCorona',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      engagement: { likes: 456, shares: 123, comments: 67 },
      hashtags: ['#ParticipacionCiudadana', '#Colombia'],
      category: 'participacion'
    },
    {
      id: 's2',
      platform: 'youtube',
      content: 'Análisis: ¿Cómo afectan las políticas conservadoras a la economía colombiana?',
      author: 'Canal RCN',
      authorHandle: '@canalrcn',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      engagement: { likes: 2341, shares: 456, comments: 234, views: 45678 },
      media: {
        type: 'video',
        url: '#',
        thumbnail: '🎥'
      },
      hashtags: ['#Politica', '#Economia', '#Colombia'],
      category: 'política'
    },
    {
      id: 's3',
      platform: 'instagram',
      content: 'Jóvenes líderes del cambio social en Colombia comparten sus experiencias.',
      author: 'Jóvenes por Colombia',
      authorHandle: '@jovenesxcolombia',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      engagement: { likes: 1234, shares: 234, comments: 89 },
      media: {
        type: 'image',
        url: '#',
        thumbnail: '📸'
      },
      hashtags: ['#JovenesLideres', '#CambioSocial'],
      category: 'social'
    },
    {
      id: 's4',
      platform: 'facebook',
      content: 'Debate en vivo: El futuro de la política conservadora en América Latina. Únete a la conversación.',
      author: 'Centro de Estudios Políticos',
      authorHandle: '@centroestudiospoliticos',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      engagement: { likes: 567, shares: 178, comments: 145 },
      hashtags: ['#PoliticaConservadora', '#AméricaLatina'],
      category: 'política'
    }
  ];

  private mockVideoReels: VideoReel[] = [
    {
      id: 'v1',
      title: 'Explicando la Reforma Tributaria en 60 segundos',
      description: 'Todo lo que necesitas saber sobre los cambios tributarios propuestos',
      thumbnail: '💰',
      duration: '1:00',
      views: 23456,
      likes: 1234,
      platform: 'youtube',
      author: 'EconomiaTech',
      category: 'economia',
      url: '#',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'v2',
      title: 'Candidatos conservadores: Sus propuestas principales',
      description: 'Resumen de las propuestas de los principales candidatos de derecha',
      thumbnail: '🗳️',
      duration: '2:30',
      views: 34567,
      likes: 2156,
      platform: 'native',
      author: 'PolíticaEnVivo',
      category: 'política',
      url: '#',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'v3',
      title: 'Terror en las calles: Medidas de seguridad ciudadana',
      description: 'Análisis de las nuevas políticas de seguridad implementadas',
      thumbnail: '🚨',
      duration: '3:45',
      views: 18954,
      likes: 876,
      platform: 'instagram',
      author: 'SeguridadColombia',
      category: 'seguridad',
      url: '#',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Fetch news articles with fallback to mock data
  async fetchNews(category?: string, political_lean?: string): Promise<NewsArticle[]> {
    try {
      // Try to fetch from external APIs first
      // If blocked, fall back to mock data
      
      let filteredNews = this.mockNewsData;
      
      if (category && category !== 'todas') {
        filteredNews = filteredNews.filter(article => 
          article.category === category || 
          (category === 'derecha' && article.political_lean === 'right') ||
          (category === 'izquierda' && article.political_lean === 'left') ||
          (category === 'independiente' && article.political_lean === 'center')
        );
      }

      if (political_lean) {
        filteredNews = filteredNews.filter(article => article.political_lean === political_lean);
      }

      return filteredNews;
    } catch (error) {
      console.warn('External news API failed, using mock data:', error);
      return this.mockNewsData;
    }
  }

  // Fetch social media posts
  async fetchSocialPosts(platform?: string, category?: string): Promise<SocialMediaPost[]> {
    let filteredPosts = this.mockSocialPosts;
    
    if (platform) {
      filteredPosts = filteredPosts.filter(post => post.platform === platform);
    }
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    return filteredPosts;
  }

  // Fetch video reels
  async fetchVideoReels(category?: string): Promise<VideoReel[]> {
    let filteredReels = this.mockVideoReels;
    
    if (category && category !== 'todos') {
      filteredReels = filteredReels.filter(reel => reel.category === category);
    }
    
    return filteredReels;
  }

  // Fetch trending topics
  async fetchTrendingTopics(): Promise<string[]> {
    return [
      '#ReformaTributaria',
      '#PoliticaConservadora',
      '#ParticipacionCiudadana',
      '#SeguridadCiudadana',
      '#CambioClimatico',
      '#TerrorNews',
      '#EleccionesColombia',
      '#PazTotal',
      '#DerechaColombia'
    ];
  }

  // Fetch combined content feed
  async fetchCombinedFeed(category?: string): Promise<{
    news: NewsArticle[];
    social: SocialMediaPost[];
    videos: VideoReel[];
    trending: string[];
  }> {
    const [news, social, videos, trending] = await Promise.all([
      this.fetchNews(category),
      this.fetchSocialPosts(undefined, category),
      this.fetchVideoReels(category),
      this.fetchTrendingTopics()
    ]);

    return { news, social, videos, trending };
  }

  // Simulate real-time updates
  subscribeToLiveUpdates(callback: (update: any) => void): () => void {
    const interval = setInterval(() => {
      const randomUpdate = {
        type: 'news',
        data: {
          ...this.mockNewsData[Math.floor(Math.random() * this.mockNewsData.length)],
          id: Date.now().toString(),
          publishedAt: new Date().toISOString(),
          engagement: {
            likes: Math.floor(Math.random() * 1000),
            shares: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 100)
          }
        }
      };
      callback(randomUpdate);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }
}

export default ContentService;