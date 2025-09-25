/**
 * Internationalization service with support for Spanish, English, and Portuguese
 */

export type Language = 'es' | 'en' | 'pt';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
    pt: string;
  };
}

const translations: Translations = {
  // Video Hub translations
  'video.hub.title': {
    es: 'Hub de Videos de Clase Mundial',
    en: 'World-Class Video Hub',
    pt: 'Hub de Vídeos de Classe Mundial'
  },
  'video.hub.subtitle': {
    es: 'Agregación avanzada de videos con verificación IA y actualizaciones en tiempo real',
    en: 'Advanced video aggregation with AI verification and real-time updates',
    pt: 'Agregação avançada de vídeos com verificação IA e atualizações em tempo real'
  },
  'video.admin.title': {
    es: 'Panel de Administración de Videos',
    en: 'Video Admin Dashboard',
    pt: 'Painel de Administração de Vídeos'
  },
  'video.reels': {
    es: 'Reels',
    en: 'Reels',
    pt: 'Reels'
  },
  'video.live': {
    es: 'EN VIVO',
    en: 'LIVE',
    pt: 'AO VIVO'
  },
  'video.views': {
    es: 'visualizaciones',
    en: 'views',
    pt: 'visualizações'
  },
  'video.likes': {
    es: 'me gusta',
    en: 'likes',
    pt: 'curtidas'
  },
  'video.comments': {
    es: 'comentarios',
    en: 'comments',
    pt: 'comentários'
  },
  'video.shares': {
    es: 'compartidos',
    en: 'shares',
    pt: 'compartilhamentos'
  },
  'video.duration': {
    es: 'duración',
    en: 'duration',
    pt: 'duração'
  },
  'video.platform': {
    es: 'plataforma',
    en: 'platform',
    pt: 'plataforma'
  },
  'video.category': {
    es: 'categoría',
    en: 'category',
    pt: 'categoria'
  },
  'video.language': {
    es: 'idioma',
    en: 'language',
    pt: 'idioma'
  },
  'video.trending': {
    es: 'tendencia',
    en: 'trending',
    pt: 'tendência'
  },
  'video.verified': {
    es: 'verificado',
    en: 'verified',
    pt: 'verificado'
  },
  'video.fact_checked': {
    es: 'verificado por IA',
    en: 'AI fact-checked',
    pt: 'verificado por IA'
  },
  // Filter translations
  'filter.all': {
    es: 'Todos',
    en: 'All',
    pt: 'Todos'
  },
  'filter.platforms': {
    es: 'Todas las plataformas',
    en: 'All platforms',
    pt: 'Todas as plataformas'
  },
  'filter.categories': {
    es: 'Todas las categorías',
    en: 'All categories',
    pt: 'Todas as categorias'
  },
  'filter.by_platform': {
    es: 'Filtrar por plataforma',
    en: 'Filter by platform',
    pt: 'Filtrar por plataforma'
  },
  'filter.by_category': {
    es: 'Filtrar por categoría',
    en: 'Filter by category',
    pt: 'Filtrar por categoria'
  },
  'filter.by_date': {
    es: 'Filtrar por fecha',
    en: 'Filter by date',
    pt: 'Filtrar por data'
  },
  'filter.by_language': {
    es: 'Filtrar por idioma',
    en: 'Filter by language',
    pt: 'Filtrar por idioma'
  },
  'filter.only_live': {
    es: 'Solo en vivo',
    en: 'Live only',
    pt: 'Apenas ao vivo'
  },
  'filter.only_trending': {
    es: 'Solo tendencias',
    en: 'Trending only',
    pt: 'Apenas tendências'
  },
  'filter.only_verified': {
    es: 'Solo verificados',
    en: 'Verified only',
    pt: 'Apenas verificados'
  },
  // Search translations
  'search.placeholder': {
    es: 'Buscar videos, hashtags, creadores...',
    en: 'Search videos, hashtags, creators...',
    pt: 'Buscar vídeos, hashtags, criadores...'
  },
  'search.advanced': {
    es: 'Búsqueda avanzada',
    en: 'Advanced search',
    pt: 'Busca avançada'
  },
  'search.no_results': {
    es: 'No se encontraron resultados',
    en: 'No results found',
    pt: 'Nenhum resultado encontrado'
  },
  // Navigation translations
  'nav.video_hub': {
    es: 'Hub de Videos',
    en: 'Video Hub',
    pt: 'Hub de Vídeos'
  },
  'nav.admin_dashboard': {
    es: 'Panel Admin',
    en: 'Admin Dashboard',
    pt: 'Painel Admin'
  },
  // Status translations
  'status.loading': {
    es: 'Cargando...',
    en: 'Loading...',
    pt: 'Carregando...'
  },
  'status.error': {
    es: 'Error al cargar',
    en: 'Error loading',
    pt: 'Erro ao carregar'
  },
  'status.retry': {
    es: 'Reintentar',
    en: 'Retry',
    pt: 'Tentar novamente'
  },
  'status.no_videos': {
    es: 'No hay videos disponibles',
    en: 'No videos available',
    pt: 'Nenhum vídeo disponível'
  },
  // Real-time updates
  'realtime.connected': {
    es: 'Conectado - Actualizaciones en tiempo real',
    en: 'Connected - Real-time updates',
    pt: 'Conectado - Atualizações em tempo real'
  },
  'realtime.disconnected': {
    es: 'Desconectado - Reintentando conexión',
    en: 'Disconnected - Retrying connection',
    pt: 'Desconectado - Tentando reconectar'
  },
  'realtime.new_videos': {
    es: 'videos nuevos disponibles',
    en: 'new videos available',
    pt: 'novos vídeos disponíveis'
  },
  // Categories
  'category.politics': {
    es: 'Política',
    en: 'Politics',
    pt: 'Política'
  },
  'category.civic_education': {
    es: 'Educación Cívica',
    en: 'Civic Education',
    pt: 'Educação Cívica'
  },
  'category.news': {
    es: 'Actualidad',
    en: 'News',
    pt: 'Atualidades'
  },
  'category.terror_reels': {
    es: 'Terror Reels',
    en: 'Terror Reels',
    pt: 'Terror Reels'
  },
  'category.elections': {
    es: 'Elecciones',
    en: 'Elections',
    pt: 'Eleições'
  },
  'category.debates': {
    es: 'Debates',
    en: 'Debates',
    pt: 'Debates'
  }
};

class I18nService {
  private currentLanguage: Language = 'es';
  private listeners: ((language: Language) => void)[] = [];

  constructor() {
    // Try to get language from localStorage or browser
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else if (['es', 'en', 'pt'].includes(browserLanguage)) {
      this.currentLanguage = browserLanguage;
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem('preferred-language', language);
    this.listeners.forEach(listener => listener(language));
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  translate(key: string, fallback?: string): string {
    const translation = translations[key];
    if (translation && translation[this.currentLanguage]) {
      return translation[this.currentLanguage];
    }
    
    // Fallback to English if current language not available
    if (translation && translation.en) {
      return translation.en;
    }
    
    // Return fallback or key if no translation found
    return fallback || key;
  }

  t = this.translate.bind(this);

  onLanguageChange(listener: (language: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat(this.currentLanguage === 'en' ? 'en-US' : 
                                this.currentLanguage === 'pt' ? 'pt-BR' : 'es-ES')
      .format(num);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.currentLanguage === 'en' ? 'en-US' : 
                                  this.currentLanguage === 'pt' ? 'pt-BR' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getLanguageOptions(): { value: Language; label: string }[] {
    return [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'English' },
      { value: 'pt', label: 'Português' }
    ];
  }
}

export const i18nService = new I18nService();
export default i18nService;