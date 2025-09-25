import { WorldClassVideo, VideoSearchQuery, VideoSearchResult } from '../types/worldClassVideo';
import { worldClassVideoService } from './worldClassVideoService';

interface SearchSuggestion {
  text: string;
  type: 'query' | 'filter' | 'topic';
  category?: string;
  count?: number;
}

interface AISearchInsights {
  intent: 'search' | 'discover' | 'trending' | 'specific';
  confidence: number;
  suggestedFilters: { [key: string]: string[] };
  relatedTopics: string[];
  searchTips: string[];
}

class AIVideoSearchService {
  private searchHistory: Map<string, string[]> = new Map();
  private popularQueries: Map<string, number> = new Map();
  private realTimeIndex: Map<string, WorldClassVideo[]> = new Map();
  private searchCache = new Map<string, { result: VideoSearchResult; timestamp: number }>();
  private cacheTimeout = 2 * 60 * 1000; // 2 minutes cache for real-time search

  // Instant search with auto-complete
  async instantSearch(query: string, limit = 8): Promise<{
    videos: WorldClassVideo[];
    suggestions: SearchSuggestion[];
    insights: AISearchInsights;
  }> {
    const startTime = Date.now();
    
    if (!query || query.trim().length < 2) {
      return {
        videos: await this.getTrendingVideos(limit),
        suggestions: await this.getPopularSuggestions(),
        insights: this.getDefaultInsights()
      };
    }

    // Get instant results from cache/index
    const videos = await this.getInstantResults(query, limit);
    const suggestions = await this.generateSuggestions(query);
    const insights = await this.analyzeSearchIntent(query);

    // Track search for analytics
    this.trackSearch(query);

    console.log(`Instant search completed in ${Date.now() - startTime}ms`);
    
    return { videos, suggestions, insights };
  }

  // Advanced search with comprehensive filtering
  async advancedSearch(searchQuery: VideoSearchQuery): Promise<VideoSearchResult> {
    const cacheKey = this.getCacheKey(searchQuery);
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Pre-process query with AI enhancement
    const enhancedQuery = await this.enhanceSearchQuery(searchQuery);
    
    // Execute search with multiple strategies
    const searchResult = await worldClassVideoService.searchVideos(enhancedQuery);
    
    // Post-process results with AI ranking
    const enhancedResult = await this.enhanceSearchResults(searchResult, searchQuery);
    
    // Cache the result
    this.setCache(cacheKey, enhancedResult);
    
    return enhancedResult;
  }

  // Auto-complete suggestions
  async getAutoCompleteSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (!query || query.length < 2) return [];

    const suggestions: SearchSuggestion[] = [];
    const queryLower = query.toLowerCase();

    // Query completions
    const queryCompletions = this.getQueryCompletions(queryLower);
    suggestions.push(...queryCompletions);

    // Topic suggestions
    const topicSuggestions = this.getTopicSuggestions(queryLower);
    suggestions.push(...topicSuggestions);

    // Filter suggestions
    const filterSuggestions = this.getFilterSuggestions(queryLower);
    suggestions.push(...filterSuggestions);

    // Trending completions
    const trendingSuggestions = this.getTrendingCompletions(queryLower);
    suggestions.push(...trendingSuggestions);

    return suggestions.slice(0, 8);
  }

  // Real-time search results update
  subscribeToRealTimeUpdates(query: string, callback: (videos: WorldClassVideo[]) => void): () => void {
    const interval = setInterval(async () => {
      const results = await this.getInstantResults(query, 10);
      callback(results);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }

  // Search analytics and insights
  getSearchAnalytics() {
    const totalSearches = Array.from(this.popularQueries.values()).reduce((sum, count) => sum + count, 0);
    const topQueries = Array.from(this.popularQueries.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    return {
      totalSearches,
      topQueries: topQueries.map(([query, count]) => ({ query, count })),
      uniqueQueries: this.popularQueries.size,
      avgQueryLength: this.calculateAverageQueryLength(),
      searchTrends: this.getSearchTrends()
    };
  }

  // Private methods

  private async getInstantResults(query: string, limit: number): Promise<WorldClassVideo[]> {
    const queryLower = query.toLowerCase();
    
    // Check real-time index first
    const indexedResults = this.searchInRealTimeIndex(queryLower);
    if (indexedResults.length >= limit) {
      return indexedResults.slice(0, limit);
    }

    // Fallback to quick search
    const searchQuery: VideoSearchQuery = {
      query,
      filters: { sortBy: 'relevance' },
      limit,
      offset: 0
    };

    try {
      const result = await worldClassVideoService.searchVideos(searchQuery);
      return result.videos;
    } catch (error) {
      console.error('Instant search error:', error);
      return [];
    }
  }

  private searchInRealTimeIndex(query: string): WorldClassVideo[] {
    const results: WorldClassVideo[] = [];
    
    this.realTimeIndex.forEach((videos, key) => {
      if (key.includes(query)) {
        results.push(...videos);
      }
    });

    return results
      .sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
      .slice(0, 20);
  }

  private async generateSuggestions(query: string): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];
    const queryLower = query.toLowerCase();

    // Query expansions
    const expansions = this.getQueryExpansions(queryLower);
    suggestions.push(...expansions);

    // Related searches
    const related = this.getRelatedSearches(queryLower);
    suggestions.push(...related);

    // Category suggestions
    const categories = this.getCategorySuggestions(queryLower);
    suggestions.push(...categories);

    return suggestions.slice(0, 6);
  }

  private async analyzeSearchIntent(query: string): Promise<AISearchInsights> {
    const queryLower = query.toLowerCase();
    
    // Determine search intent
    let intent: AISearchInsights['intent'] = 'search';
    let confidence = 0.7;
    
    if (queryLower.includes('trending') || queryLower.includes('viral')) {
      intent = 'trending';
      confidence = 0.9;
    } else if (queryLower.includes('latest') || queryLower.includes('recent')) {
      intent = 'discover';
      confidence = 0.8;
    } else if (queryLower.length > 20) {
      intent = 'specific';
      confidence = 0.85;
    }

    // Generate suggested filters
    const suggestedFilters: { [key: string]: string[] } = {};
    
    if (queryLower.includes('política') || queryLower.includes('government')) {
      suggestedFilters.categories = ['Política', 'Gobierno'];
    }
    
    if (queryLower.includes('live') || queryLower.includes('vivo')) {
      suggestedFilters.isLive = ['true'];
    }

    // Related topics
    const relatedTopics = this.extractRelatedTopics(queryLower);

    // Search tips
    const searchTips = this.generateSearchTips(queryLower, intent);

    return {
      intent,
      confidence,
      suggestedFilters,
      relatedTopics,
      searchTips
    };
  }

  private async enhanceSearchQuery(query: VideoSearchQuery): Promise<VideoSearchQuery> {
    // AI query expansion and optimization
    const enhancedQuery = { ...query };
    
    // Expand query with synonyms
    enhancedQuery.query = this.expandQueryWithSynonyms(query.query);
    
    // Auto-apply intelligent filters
    const intelligentFilters = this.getIntelligentFilters(query.query);
    enhancedQuery.filters = { ...enhancedQuery.filters, ...intelligentFilters };
    
    return enhancedQuery;
  }

  private async enhanceSearchResults(result: VideoSearchResult, originalQuery: VideoSearchQuery): Promise<VideoSearchResult> {
    // Add AI summaries to videos
    const enhancedVideos = await Promise.all(
      result.videos.map(async (video) => {
        if (!video.aiSummary) {
          video.aiSummary = await worldClassVideoService.generateAISummary(video);
        }
        return video;
      })
    );

    // Generate search suggestions if not present
    if (!result.suggestions) {
      result.suggestions = await this.generateQuerySuggestions(originalQuery.query);
    }

    // Add faceted search data if not present
    if (!result.facets) {
      result.facets = this.generateSearchFacets(enhancedVideos);
    }

    return {
      ...result,
      videos: enhancedVideos
    };
  }

  private getQueryCompletions(query: string): SearchSuggestion[] {
    const completions = [
      'política colombia',
      'noticias colombia',
      'congreso colombia',
      'presidente colombia',
      'elecciones colombia',
      'petro colombia',
      'uribe colombia',
      'farc colombia',
      'paz colombia',
      'economía colombia'
    ];

    return completions
      .filter(completion => completion.startsWith(query))
      .map(text => ({ text, type: 'query' as const }));
  }

  private getTopicSuggestions(query: string): SearchSuggestion[] {
    const topics = [
      { text: 'Política', category: 'topics' },
      { text: 'Económía', category: 'topics' },
      { text: 'Sociedad', category: 'topics' },
      { text: 'Internacional', category: 'topics' },
      { text: 'Cultura', category: 'topics' },
      { text: 'Deportes', category: 'topics' }
    ];

    return topics
      .filter(topic => topic.text.toLowerCase().includes(query))
      .map(topic => ({ 
        text: topic.text, 
        type: 'topic' as const, 
        category: topic.category 
      }));
  }

  private getFilterSuggestions(query: string): SearchSuggestion[] {
    const filters = [
      { text: 'Videos recientes', type: 'filter', category: 'date' },
      { text: 'Videos en vivo', type: 'filter', category: 'live' },
      { text: 'Videos con subtítulos', type: 'filter', category: 'accessibility' },
      { text: 'Videos verificados', type: 'filter', category: 'quality' }
    ];

    return filters.filter(filter => 
      filter.text.toLowerCase().includes(query)
    ) as SearchSuggestion[];
  }

  private getTrendingCompletions(query: string): SearchSuggestion[] {
    // Mock trending completions
    const trending = [
      'debate presidencial',
      'reforma tributaria',
      'proceso de paz',
      'crisis económica',
      'protestas sociales'
    ];

    return trending
      .filter(term => term.includes(query))
      .map(text => ({ text, type: 'query' as const, count: Math.floor(Math.random() * 1000) }));
  }

  private getQueryExpansions(query: string): SearchSuggestion[] {
    const expansions: { [key: string]: string[] } = {
      'petro': ['gustavo petro', 'presidente petro', 'gobierno petro'],
      'colombia': ['colombia noticias', 'colombia política', 'colombia economía'],
      'congreso': ['congreso colombia', 'senado colombia', 'cámara representantes']
    };

    const results: SearchSuggestion[] = [];
    Object.entries(expansions).forEach(([key, values]) => {
      if (query.includes(key)) {
        values.forEach(value => {
          results.push({ text: value, type: 'query' });
        });
      }
    });

    return results;
  }

  private getRelatedSearches(query: string): SearchSuggestion[] {
    // Mock related searches based on query
    if (query.includes('política')) {
      return [
        { text: 'elecciones colombia', type: 'query' },
        { text: 'partidos políticos', type: 'query' },
        { text: 'democracia colombia', type: 'query' }
      ];
    }
    
    return [];
  }

  private getCategorySuggestions(query: string): SearchSuggestion[] {
    const categories = [
      'Política',
      'Economía', 
      'Sociedad',
      'Internacional',
      'Cultura',
      'Deportes',
      'Tecnología',
      'Medio Ambiente'
    ];

    return categories
      .filter(category => category.toLowerCase().includes(query))
      .map(text => ({ text, type: 'filter' as const, category: 'categories' }));
  }

  private extractRelatedTopics(query: string): string[] {
    const topicMap: { [key: string]: string[] } = {
      'política': ['gobierno', 'elecciones', 'democracia', 'partidos'],
      'economía': ['pib', 'inflación', 'empleo', 'comercio'],
      'colombia': ['bogotá', 'medellín', 'cali', 'barranquilla'],
      'presidente': ['gobierno', 'política', 'estado', 'nación']
    };

    const topics: string[] = [];
    Object.entries(topicMap).forEach(([key, related]) => {
      if (query.includes(key)) {
        topics.push(...related);
      }
    });

    return [...new Set(topics)].slice(0, 5);
  }

  private generateSearchTips(query: string, intent: AISearchInsights['intent']): string[] {
    const tips: string[] = [];

    if (intent === 'trending') {
      tips.push('Usa "trending" o "viral" para encontrar contenido popular');
    }

    if (query.length < 3) {
      tips.push('Intenta con términos más específicos para mejores resultados');
    }

    if (!query.includes('"')) {
      tips.push('Usa comillas para buscar frases exactas');
    }

    tips.push('Usa filtros para refinar tu búsqueda');
    tips.push('Explora contenido en vivo con el filtro "En vivo"');

    return tips.slice(0, 3);
  }

  private expandQueryWithSynonyms(query: string): string {
    const synonyms: { [key: string]: string[] } = {
      'colombia': ['colombiano', 'bogotá', 'medellín'],
      'presidente': ['mandatario', 'jefe de estado'],
      'gobierno': ['estado', 'administración', 'ejecutivo'],
      'noticias': ['news', 'información', 'actualidad']
    };

    let expandedQuery = query;
    Object.entries(synonyms).forEach(([word, syns]) => {
      if (query.toLowerCase().includes(word)) {
        expandedQuery += ' ' + syns.join(' ');
      }
    });

    return expandedQuery;
  }

  private getIntelligentFilters(query: string): Partial<import('../types/worldClassVideo').VideoFilter> {
    const filters: Partial<import('../types/worldClassVideo').VideoFilter> = {};

    if (query.toLowerCase().includes('live') || query.toLowerCase().includes('vivo')) {
      filters.isLive = true;
    }

    if (query.toLowerCase().includes('recent') || query.toLowerCase().includes('nuevo')) {
      filters.sortBy = 'date';
    }

    if (query.toLowerCase().includes('popular') || query.toLowerCase().includes('trending')) {
      filters.sortBy = 'views';
    }

    return filters;
  }

  private generateQuerySuggestions(query: string): string[] {
    // Generate related query suggestions
    return [
      `${query} en vivo`,
      `${query} reciente`,
      `${query} análisis`,
      `${query} debate`
    ].slice(0, 4);
  }

  private generateSearchFacets(videos: WorldClassVideo[]) {
    const platforms: { [key: string]: number } = {};
    const categories: { [key: string]: number } = {};
    const languages: { [key: string]: number } = {};

    videos.forEach(video => {
      platforms[video.platform] = (platforms[video.platform] || 0) + 1;
      categories[video.category] = (categories[video.category] || 0) + 1;
      languages[video.language] = (languages[video.language] || 0) + 1;
    });

    return { platforms, categories, languages };
  }

  private trackSearch(query: string): void {
    const count = this.popularQueries.get(query) || 0;
    this.popularQueries.set(query, count + 1);
  }

  private async getTrendingVideos(limit: number): Promise<WorldClassVideo[]> {
    try {
      const result = await worldClassVideoService.searchVideos({
        query: '',
        filters: { sortBy: 'trending' },
        limit,
        offset: 0
      });
      return result.videos;
    } catch (error) {
      console.error('Trending videos error:', error);
      return [];
    }
  }

  private async getPopularSuggestions(): Promise<SearchSuggestion[]> {
    const popular = [
      { text: 'política colombia', type: 'query' as const, count: 1250 },
      { text: 'noticias hoy', type: 'query' as const, count: 980 },
      { text: 'congreso en vivo', type: 'query' as const, count: 756 },
      { text: 'debate presidencial', type: 'query' as const, count: 645 }
    ];
    return popular;
  }

  private getDefaultInsights(): AISearchInsights {
    return {
      intent: 'discover',
      confidence: 0.5,
      suggestedFilters: {},
      relatedTopics: ['política', 'noticias', 'colombia'],
      searchTips: ['Explora contenido trending', 'Usa filtros para personalizar']
    };
  }

  private getCacheKey(query: VideoSearchQuery): string {
    return JSON.stringify({
      query: query.query,
      filters: query.filters,
      limit: query.limit,
      offset: query.offset
    });
  }

  private getFromCache(key: string): VideoSearchResult | null {
    const cached = this.searchCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.result;
    }
    return null;
  }

  private setCache(key: string, result: VideoSearchResult): void {
    this.searchCache.set(key, { result, timestamp: Date.now() });
  }

  private calculateAverageQueryLength(): number {
    const queries = Array.from(this.popularQueries.keys());
    const totalLength = queries.reduce((sum, query) => sum + query.length, 0);
    return queries.length > 0 ? totalLength / queries.length : 0;
  }

  private getSearchTrends(): { [hour: string]: number } {
    // Mock search trends by hour
    const trends: { [hour: string]: number } = {};
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      trends[`${hour}:00`] = Math.floor(Math.random() * 100) + 50;
    }
    return trends;
  }

  // Update real-time index
  updateRealTimeIndex(key: string, videos: WorldClassVideo[]): void {
    this.realTimeIndex.set(key, videos);
  }

  // Clear old cache entries
  clearExpiredCache(): void {
    const now = Date.now();
    this.searchCache.forEach((value, key) => {
      if (now - value.timestamp > this.cacheTimeout) {
        this.searchCache.delete(key);
      }
    });
  }
}

export const aiVideoSearchService = new AIVideoSearchService();

// Auto-clear expired cache every 5 minutes
setInterval(() => {
  aiVideoSearchService.clearExpiredCache();
}, 5 * 60 * 1000);