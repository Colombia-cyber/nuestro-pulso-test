import React from 'react';
import { I18nContent } from '../types/worldClassVideo';

type SupportedLanguage = 'es' | 'en' | 'pt';

interface TranslationKey {
  [key: string]: string | TranslationKey;
}

interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  fallbackLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
}

class I18nService {
  private currentLanguage: SupportedLanguage = 'es';
  private translations: Map<SupportedLanguage, TranslationKey> = new Map();
  private config: I18nConfig = {
    defaultLanguage: 'es',
    fallbackLanguage: 'en',
    supportedLanguages: ['es', 'en', 'pt']
  };

  constructor() {
    this.loadTranslations();
    this.initializeLanguage();
  }

  // Initialize language from browser/localStorage
  private initializeLanguage(): void {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage;
    if (savedLanguage && this.config.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
      return;
    }

    // Fallback to browser language
    const browserLanguage = navigator.language.split('-')[0] as SupportedLanguage;
    if (this.config.supportedLanguages.includes(browserLanguage)) {
      this.currentLanguage = browserLanguage;
    } else {
      this.currentLanguage = this.config.defaultLanguage;
    }

    // Save to localStorage
    localStorage.setItem('preferred-language', this.currentLanguage);
  }

  // Load all translations
  private loadTranslations(): void {
    // Spanish translations
    this.translations.set('es', {
      // General
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      back: 'Volver',
      next: 'Siguiente',
      previous: 'Anterior',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      settings: 'Configuración',

      // Video Hub
      videoHub: {
        title: '🎬 Hub de Videos Inteligente',
        subtitle: 'Descubre contenido personalizado con IA de múltiples plataformas',
        searchPlaceholder: 'Buscar videos, canales, temas...',
        noResults: 'No se encontraron videos',
        noResultsDescription: 'Intenta con otros términos de búsqueda o ajusta los filtros',
        loadMore: 'Cargar más videos',
        
        tabs: {
          forYou: 'Para Ti',
          trending: 'Tendencias',
          live: 'En Vivo',
          search: 'Búsqueda'
        },

        filters: {
          title: 'Filtros',
          platform: 'Plataforma',
          duration: 'Duración',
          sortBy: 'Ordenar por',
          allPlatforms: 'Todas las plataformas',
          anyDuration: 'Cualquier duración',
          short: 'Corto',
          medium: 'Medio',
          long: 'Largo',
          veryLong: 'Muy largo',
          relevance: 'Relevancia',
          newest: 'Más reciente',
          mostViewed: 'Más visto',
          mostEngaging: 'Más interesante',
          hasSubtitles: 'Con subtítulos',
          liveOnly: 'Solo en vivo',
          clearFilters: 'Limpiar filtros',
          applyFilters: 'Aplicar filtros'
        },

        video: {
          views: 'visualizaciones',
          likes: 'me gusta',
          comments: 'comentarios',
          shares: 'compartidos',
          aiSummary: 'Resumen IA',
          subtitles: 'Subtítulos',
          verified: 'Verificado',
          aiVerified: 'IA Verificado',
          addComment: 'Añadir comentario...',
          post: 'Publicar',
          fullscreen: 'Pantalla completa',
          live: 'EN VIVO',
          duration: 'Duración'
        },

        errors: {
          searchError: 'Error al buscar videos',
          personalizedError: 'Error al cargar feed personalizado',
          loadError: 'Error al cargar videos',
          connectionError: 'Error de conexión'
        }
      },

      // Admin Dashboard
      admin: {
        title: '📊 Panel de Administración - Videos',
        lastUpdated: 'Última actualización',
        autoRefresh: 'Actualización automática',
        refresh: 'Actualizar',

        timeRanges: {
          lastHour: 'Última hora',
          last24Hours: 'Últimas 24 horas',
          last7Days: 'Últimos 7 días',
          last30Days: 'Últimos 30 días'
        },

        tabs: {
          overview: 'Resumen',
          sources: 'Fuentes',
          analytics: 'Analíticas',
          content: 'Contenido',
          users: 'Usuarios',
          performance: 'Rendimiento'
        },

        metrics: {
          totalUsers: 'Usuarios Totales',
          activeUsers: 'Usuarios Activos',
          cacheHitRate: 'Tasa de Acierto Cache',
          avgResponseTime: 'Tiempo Respuesta Promedio',
          engagementRate: 'Tasa de Interacción',
          avgSessionDuration: 'Duración Promedio Sesión',
          totalSearches: 'Búsquedas Totales',
          avgLoadTime: 'Tiempo Carga Promedio',
          errorRate: 'Tasa de Error',
          apiLatency: 'Latencia API',
          bandwidthUsage: 'Uso de Ancho de Banda'
        },

        sourceHealth: {
          title: 'Estado de Fuentes',
          uptime: 'Tiempo Activo',
          responseTime: 'Tiempo Respuesta',
          errors: 'Errores',
          status: 'Estado',
          lastCheck: 'Última verificación',
          online: 'En línea',
          degraded: 'Degradado',
          offline: 'Fuera de línea'
        },

        content: {
          trendingContent: 'Contenido Trending',
          topSearches: 'Búsquedas Principales',
          topInteractions: 'Principales Interacciones',
          interactions: 'interacciones',
          searches: 'búsquedas'
        },

        performance: {
          cachePerformance: 'Rendimiento de Cache',
          hitRate: 'Tasa de Acierto',
          totalRequests: 'Solicitudes Totales',
          memoryUsage: 'Uso de Memoria'
        }
      },

      // AI Features
      ai: {
        summary: 'Resumen IA',
        personalized: 'Personalizado',
        recommended: 'Recomendado para ti',
        aiPowered: 'Potenciado por IA',
        smartRanking: 'Clasificación Inteligente',
        factChecked: 'Verificado por IA',
        transcription: 'Transcripción',
        autoGenerated: 'Generado automáticamente'
      },

      // Accessibility
      accessibility: {
        screenReader: 'Lector de pantalla',
        keyboardNavigation: 'Navegación por teclado',
        highContrast: 'Alto contraste',
        subtitles: 'Subtítulos',
        closedCaptions: 'Subtítulos cerrados',
        audioDescription: 'Descripción de audio',
        skipToContent: 'Saltar al contenido',
        skipToNavigation: 'Saltar a navegación'
      },

      // Live Streaming
      live: {
        live: 'EN VIVO',
        viewers: 'espectadores',
        chatMessages: 'mensajes de chat',
        streamHealth: 'Calidad de transmisión',
        bitrate: 'Tasa de bits',
        resolution: 'Resolución',
        fps: 'FPS',
        duration: 'Duración de transmisión'
      },

      // Reactions & Comments
      social: {
        reactions: 'Reacciones',
        like: 'Me gusta',
        love: 'Amor',
        laugh: 'Risa',
        cry: 'Llorar',
        angry: 'Enojado',
        surprised: 'Sorprendido',
        comment: 'Comentario',
        reply: 'Responder',
        share: 'Compartir',
        bookmark: 'Guardar',
        report: 'Reportar'
      }
    });

    // English translations
    this.translations.set('en', {
      // General
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      settings: 'Settings',

      // Video Hub
      videoHub: {
        title: '🎬 Intelligent Video Hub',
        subtitle: 'Discover AI-powered personalized content from multiple platforms',
        searchPlaceholder: 'Search videos, channels, topics...',
        noResults: 'No videos found',
        noResultsDescription: 'Try different search terms or adjust filters',
        loadMore: 'Load more videos',
        
        tabs: {
          forYou: 'For You',
          trending: 'Trending',
          live: 'Live',
          search: 'Search'
        },

        filters: {
          title: 'Filters',
          platform: 'Platform',
          duration: 'Duration',
          sortBy: 'Sort by',
          allPlatforms: 'All platforms',
          anyDuration: 'Any duration',
          short: 'Short',
          medium: 'Medium',
          long: 'Long',
          veryLong: 'Very long',
          relevance: 'Relevance',
          newest: 'Newest',
          mostViewed: 'Most viewed',
          mostEngaging: 'Most engaging',
          hasSubtitles: 'Has subtitles',
          liveOnly: 'Live only',
          clearFilters: 'Clear filters',
          applyFilters: 'Apply filters'
        },

        video: {
          views: 'views',
          likes: 'likes',
          comments: 'comments',
          shares: 'shares',
          aiSummary: 'AI Summary',
          subtitles: 'Subtitles',
          verified: 'Verified',
          aiVerified: 'AI Verified',
          addComment: 'Add comment...',
          post: 'Post',
          fullscreen: 'Fullscreen',
          live: 'LIVE',
          duration: 'Duration'
        },

        errors: {
          searchError: 'Error searching videos',
          personalizedError: 'Error loading personalized feed',
          loadError: 'Error loading videos',
          connectionError: 'Connection error'
        }
      },

      // Admin Dashboard
      admin: {
        title: '📊 Admin Dashboard - Videos',
        lastUpdated: 'Last updated',
        autoRefresh: 'Auto refresh',
        refresh: 'Refresh',

        timeRanges: {
          lastHour: 'Last hour',
          last24Hours: 'Last 24 hours',
          last7Days: 'Last 7 days',
          last30Days: 'Last 30 days'
        },

        tabs: {
          overview: 'Overview',
          sources: 'Sources',
          analytics: 'Analytics',
          content: 'Content',
          users: 'Users',
          performance: 'Performance'
        },

        metrics: {
          totalUsers: 'Total Users',
          activeUsers: 'Active Users',
          cacheHitRate: 'Cache Hit Rate',
          avgResponseTime: 'Avg Response Time',
          engagementRate: 'Engagement Rate',
          avgSessionDuration: 'Avg Session Duration',
          totalSearches: 'Total Searches',
          avgLoadTime: 'Avg Load Time',
          errorRate: 'Error Rate',
          apiLatency: 'API Latency',
          bandwidthUsage: 'Bandwidth Usage'
        },

        sourceHealth: {
          title: 'Source Health',
          uptime: 'Uptime',
          responseTime: 'Response Time',
          errors: 'Errors',
          status: 'Status',
          lastCheck: 'Last check',
          online: 'Online',
          degraded: 'Degraded',
          offline: 'Offline'
        },

        content: {
          trendingContent: 'Trending Content',
          topSearches: 'Top Searches',
          topInteractions: 'Top Interactions',
          interactions: 'interactions',
          searches: 'searches'
        },

        performance: {
          cachePerformance: 'Cache Performance',
          hitRate: 'Hit Rate',
          totalRequests: 'Total Requests',
          memoryUsage: 'Memory Usage'
        }
      },

      // AI Features
      ai: {
        summary: 'AI Summary',
        personalized: 'Personalized',
        recommended: 'Recommended for you',
        aiPowered: 'AI Powered',
        smartRanking: 'Smart Ranking',
        factChecked: 'AI Fact Checked',
        transcription: 'Transcription',
        autoGenerated: 'Auto-generated'
      },

      // Accessibility
      accessibility: {
        screenReader: 'Screen reader',
        keyboardNavigation: 'Keyboard navigation',
        highContrast: 'High contrast',
        subtitles: 'Subtitles',
        closedCaptions: 'Closed captions',
        audioDescription: 'Audio description',
        skipToContent: 'Skip to content',
        skipToNavigation: 'Skip to navigation'
      },

      // Live Streaming
      live: {
        live: 'LIVE',
        viewers: 'viewers',
        chatMessages: 'chat messages',
        streamHealth: 'Stream health',
        bitrate: 'Bitrate',
        resolution: 'Resolution',
        fps: 'FPS',
        duration: 'Stream duration'
      },

      // Reactions & Comments
      social: {
        reactions: 'Reactions',
        like: 'Like',
        love: 'Love',
        laugh: 'Laugh',
        cry: 'Cry',
        angry: 'Angry',
        surprised: 'Surprised',
        comment: 'Comment',
        reply: 'Reply',
        share: 'Share',
        bookmark: 'Bookmark',
        report: 'Report'
      }
    });

    // Portuguese translations
    this.translations.set('pt', {
      // General
      loading: 'Carregando...',
      error: 'Erro',
      retry: 'Tentar novamente',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      close: 'Fechar',
      back: 'Voltar',
      next: 'Próximo',
      previous: 'Anterior',
      search: 'Pesquisar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      settings: 'Configurações',

      // Video Hub
      videoHub: {
        title: '🎬 Hub de Vídeos Inteligente',
        subtitle: 'Descubra conteúdo personalizado com IA de múltiplas plataformas',
        searchPlaceholder: 'Pesquisar vídeos, canais, tópicos...',
        noResults: 'Nenhum vídeo encontrado',
        noResultsDescription: 'Tente termos de pesquisa diferentes ou ajuste os filtros',
        loadMore: 'Carregar mais vídeos',
        
        tabs: {
          forYou: 'Para Você',
          trending: 'Em Alta',
          live: 'Ao Vivo',
          search: 'Pesquisa'
        },

        filters: {
          title: 'Filtros',
          platform: 'Plataforma',
          duration: 'Duração',
          sortBy: 'Ordenar por',
          allPlatforms: 'Todas as plataformas',
          anyDuration: 'Qualquer duração',
          short: 'Curto',
          medium: 'Médio',
          long: 'Longo',
          veryLong: 'Muito longo',
          relevance: 'Relevância',
          newest: 'Mais recente',
          mostViewed: 'Mais visualizado',
          mostEngaging: 'Mais envolvente',
          hasSubtitles: 'Com legendas',
          liveOnly: 'Apenas ao vivo',
          clearFilters: 'Limpar filtros',
          applyFilters: 'Aplicar filtros'
        },

        video: {
          views: 'visualizações',
          likes: 'curtidas',
          comments: 'comentários',
          shares: 'compartilhamentos',
          aiSummary: 'Resumo IA',
          subtitles: 'Legendas',
          verified: 'Verificado',
          aiVerified: 'IA Verificado',
          addComment: 'Adicionar comentário...',
          post: 'Publicar',
          fullscreen: 'Tela cheia',
          live: 'AO VIVO',
          duration: 'Duração'
        },

        errors: {
          searchError: 'Erro ao pesquisar vídeos',
          personalizedError: 'Erro ao carregar feed personalizado',
          loadError: 'Erro ao carregar vídeos',
          connectionError: 'Erro de conexão'
        }
      },

      // Admin Dashboard  
      admin: {
        title: '📊 Painel Admin - Vídeos',
        lastUpdated: 'Última atualização',
        autoRefresh: 'Atualização automática',
        refresh: 'Atualizar',

        timeRanges: {
          lastHour: 'Última hora',
          last24Hours: 'Últimas 24 horas',
          last7Days: 'Últimos 7 dias',
          last30Days: 'Últimos 30 dias'
        },

        tabs: {
          overview: 'Visão Geral',
          sources: 'Fontes',
          analytics: 'Análises',
          content: 'Conteúdo',
          users: 'Usuários',
          performance: 'Desempenho'
        },

        metrics: {
          totalUsers: 'Total de Usuários',
          activeUsers: 'Usuários Ativos',
          cacheHitRate: 'Taxa de Acerto Cache',
          avgResponseTime: 'Tempo Resposta Médio',
          engagementRate: 'Taxa de Engajamento',
          avgSessionDuration: 'Duração Média Sessão',
          totalSearches: 'Total de Pesquisas',
          avgLoadTime: 'Tempo Carregamento Médio',
          errorRate: 'Taxa de Erro',
          apiLatency: 'Latência API',
          bandwidthUsage: 'Uso de Largura de Banda'
        },

        sourceHealth: {
          title: 'Saúde das Fontes',
          uptime: 'Tempo Ativo',
          responseTime: 'Tempo Resposta',
          errors: 'Erros',
          status: 'Status',
          lastCheck: 'Última verificação',
          online: 'Online',
          degraded: 'Degradado',
          offline: 'Offline'
        },

        content: {
          trendingContent: 'Conteúdo em Alta',
          topSearches: 'Principais Pesquisas',
          topInteractions: 'Principais Interações',
          interactions: 'interações',
          searches: 'pesquisas'
        },

        performance: {
          cachePerformance: 'Desempenho do Cache',
          hitRate: 'Taxa de Acerto',
          totalRequests: 'Total de Solicitações',
          memoryUsage: 'Uso de Memória'
        }
      },

      // AI Features
      ai: {
        summary: 'Resumo IA',
        personalized: 'Personalizado',
        recommended: 'Recomendado para você',
        aiPowered: 'Alimentado por IA',
        smartRanking: 'Classificação Inteligente',
        factChecked: 'Verificado por IA',
        transcription: 'Transcrição',
        autoGenerated: 'Gerado automaticamente'
      },

      // Accessibility
      accessibility: {
        screenReader: 'Leitor de tela',
        keyboardNavigation: 'Navegação por teclado',
        highContrast: 'Alto contraste',
        subtitles: 'Legendas',
        closedCaptions: 'Legendas fechadas',
        audioDescription: 'Descrição de áudio',
        skipToContent: 'Pular para conteúdo',
        skipToNavigation: 'Pular para navegação'
      },

      // Live Streaming
      live: {
        live: 'AO VIVO',
        viewers: 'espectadores',
        chatMessages: 'mensagens do chat',
        streamHealth: 'Qualidade da transmissão',
        bitrate: 'Taxa de bits',
        resolution: 'Resolução',
        fps: 'FPS',
        duration: 'Duração da transmissão'
      },

      // Reactions & Comments
      social: {
        reactions: 'Reações',
        like: 'Curtir',
        love: 'Amor',
        laugh: 'Rir',
        cry: 'Chorar',
        angry: 'Raiva',
        surprised: 'Surpreso',
        comment: 'Comentário',
        reply: 'Responder',
        share: 'Compartilhar',
        bookmark: 'Favoritar',
        report: 'Reportar'
      }
    });
  }

  // Get current language
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  // Set language
  setLanguage(language: SupportedLanguage): void {
    if (this.config.supportedLanguages.includes(language)) {
      this.currentLanguage = language;
      localStorage.setItem('preferred-language', language);
      
      // Trigger language change event
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
    }
  }

  // Get supported languages
  getSupportedLanguages(): SupportedLanguage[] {
    return this.config.supportedLanguages;
  }

  // Get translation
  t(key: string, params?: { [key: string]: string | number }): string {
    const translation = this.getTranslation(key, this.currentLanguage);
    
    if (!params) return translation;
    
    // Replace parameters in translation
    return Object.entries(params).reduce((text, [param, value]) => {
      return text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
    }, translation);
  }

  // Get translation with fallback
  private getTranslation(key: string, language: SupportedLanguage): string {
    const translations = this.translations.get(language);
    if (!translations) {
      return this.getTranslation(key, this.config.fallbackLanguage);
    }

    const keys = key.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to default language if key not found
        if (language !== this.config.fallbackLanguage) {
          return this.getTranslation(key, this.config.fallbackLanguage);
        }
        return key; // Return key if translation not found
      }
    }
    
    return typeof current === 'string' ? current : key;
  }

  // Get all translations for a section
  getSection(section: string): TranslationKey | null {
    const translations = this.translations.get(this.currentLanguage);
    if (!translations) return null;

    const keys = section.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return null;
      }
    }
    
    return current;
  }

  // Format date according to current language
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formatOptions = { ...defaultOptions, ...options };
    const locale = this.getLocale();
    
    return date.toLocaleDateString(locale, formatOptions);
  }

  // Format number according to current language
  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    const locale = this.getLocale();
    return number.toLocaleString(locale, options);
  }

  // Format currency
  formatCurrency(amount: number, currency = 'COP'): string {
    const locale = this.getLocale();
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Get locale string for current language
  private getLocale(): string {
    const localeMap: { [key in SupportedLanguage]: string } = {
      'es': 'es-CO',
      'en': 'en-US',
      'pt': 'pt-BR'
    };
    
    return localeMap[this.currentLanguage] || localeMap['es'];
  }

  // Format relative time (e.g., "2 hours ago")
  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
    
    const rtf = new Intl.RelativeTimeFormat(this.getLocale(), { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-Math.floor(diffInSeconds), 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  }

  // Get language name in native language
  getLanguageName(language: SupportedLanguage): string {
    const languageNames: { [key in SupportedLanguage]: string } = {
      'es': 'Español',
      'en': 'English',
      'pt': 'Português'
    };
    
    return languageNames[language] || language;
  }

  // Check if language is RTL
  isRTL(): boolean {
    // None of our supported languages are RTL, but this is here for future expansion
    return false;
  }

  // Get text direction
  getTextDirection(): 'ltr' | 'rtl' {
    return this.isRTL() ? 'rtl' : 'ltr';
  }

  // Add missing translation (for development)
  addMissingTranslation(key: string, language: SupportedLanguage, value: string): void {
    if (typeof window !== 'undefined' && import.meta.env?.DEV) {
      console.warn(`Missing translation: ${key} for language: ${language}`);
      // In production, you might want to send this to a logging service
    }
  }
}

// Create singleton instance
export const i18nService = new I18nService();

// React hook for using i18n in components
export const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState(i18nService.getCurrentLanguage());

  React.useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as any);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as any);
    };
  }, []);

  return {
    t: i18nService.t.bind(i18nService),
    language: currentLanguage,
    setLanguage: i18nService.setLanguage.bind(i18nService),
    supportedLanguages: i18nService.getSupportedLanguages(),
    formatDate: i18nService.formatDate.bind(i18nService),
    formatNumber: i18nService.formatNumber.bind(i18nService),
    formatCurrency: i18nService.formatCurrency.bind(i18nService),
    formatRelativeTime: i18nService.formatRelativeTime.bind(i18nService),
    getLanguageName: i18nService.getLanguageName.bind(i18nService),
    getTextDirection: i18nService.getTextDirection.bind(i18nService),
    getSection: i18nService.getSection.bind(i18nService)
  };
};

// Helper component for text with parameters
export const T: React.FC<{ 
  k: string; 
  params?: { [key: string]: string | number };
  component?: keyof React.JSX.IntrinsicElements;
  className?: string;
}> = ({ k, params, component: Component = 'span', className }) => {
  return React.createElement(Component, { className }, i18nService.t(k, params));
};

export default i18nService;