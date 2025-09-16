/**
 * Google Search Provider - Integrates with Google Custom Search API
 * Provides web search results with Colombian content prioritization
 */
class GoogleSearchProvider {
  constructor() {
    this.name = 'google_search';
    this.apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
    this.enabled = process.env.REACT_APP_ENABLE_GOOGLE_SEARCH === 'true';
  }

  /**
   * Search Google Custom Search API
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {string} options.category - Category filter
   * @param {number} options.maxResults - Maximum results to return
   * @param {string} options.language - Language preference (es/en)
   * @param {string} options.region - Region preference (colombia/latam/world)
   * @returns {Promise<Array>} Array of search results
   */
  async search(options) {
    const { query, category, maxResults = 10, language = 'es', region = 'colombia' } = options;

    if (!this.enabled || !this.apiKey || !this.searchEngineId) {
      console.warn('Google Search Provider: API credentials not configured, returning mock data');
      return this.getMockResults(query, category, maxResults);
    }

    try {
      // Enhance query based on region and category
      const enhancedQuery = this.enhanceQuery(query, region, category);
      
      const params = new URLSearchParams({
        key: this.apiKey,
        cx: this.searchEngineId,
        q: enhancedQuery,
        num: Math.min(maxResults, 10), // Google API max is 10 per request
        lr: language === 'es' ? 'lang_es' : 'lang_en',
        gl: region === 'colombia' ? 'co' : 'us', // Geographic location
        safe: 'active',
        dateRestrict: 'm6' // Last 6 months for relevancy
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: {
          'User-Agent': 'NuestroPulso/1.0 (+https://nuestropulso.com)'
        }
      });

      if (!response.ok) {
        throw new Error(`Google Search API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        console.warn('Google Search returned no results for:', enhancedQuery);
        return this.getMockResults(query, category, maxResults);
      }

      // Transform Google results to our format
      const results = data.items.map((item, index) => ({
        id: `google_${Date.now()}_${index}`,
        title: item.title,
        summary: item.snippet || '',
        url: item.link,
        source: 'Google Search',
        category: this.inferCategory(item.title, item.snippet, category),
        timestamp: new Date().toISOString(),
        relevanceScore: this.calculateRelevanceScore(item, query, region),
        image: this.getGoogleSearchIcon(),
        author: this.extractDomain(item.link),
        tags: this.generateTags(query, item.title),
        contentType: 'web',
        provider: 'google_search',
        region: this.detectRegion(item.link, item.title),
        language: language
      }));

      // Prioritize Colombian content if region is colombia
      if (region === 'colombia') {
        return this.prioritizeColombianContent(results);
      }

      return results;

    } catch (error) {
      console.error('Google Search Provider error:', error);
      return this.getMockResults(query, category, maxResults);
    }
  }

  /**
   * Enhance search query based on region and category
   */
  enhanceQuery(query, region, category) {
    let enhancedQuery = query;

    // Add regional context
    if (region === 'colombia') {
      enhancedQuery += ' Colombia';
    } else if (region === 'latam') {
      enhancedQuery += ' "América Latina" OR Colombia OR México OR Argentina OR Brasil';
    }

    // Add category context
    if (category) {
      const categoryMap = {
        'politica': 'política gobierno',
        'internacional': 'internacional relaciones exteriores',
        'economia': 'economía mercados',
        'social': 'sociedad comunidad',
        'seguridad': 'seguridad defensa'
      };
      
      if (categoryMap[category]) {
        enhancedQuery += ` ${categoryMap[category]}`;
      }
    }

    return enhancedQuery;
  }

  /**
   * Calculate relevance score based on region preference and content
   */
  calculateRelevanceScore(item, query, region) {
    let score = 70; // Base score

    // Boost Colombian content if region is colombia
    if (region === 'colombia') {
      const colombianIndicators = [
        '.co', 'colombia', 'bogotá', 'medellín', 'cali', 'barranquilla',
        'petro', 'uribe', 'santos', 'duque', 'congreso', 'senado'
      ];
      
      const text = (item.title + ' ' + item.snippet + ' ' + item.link).toLowerCase();
      const colombianMatches = colombianIndicators.filter(indicator => text.includes(indicator));
      score += colombianMatches.length * 10;
    }

    // Boost recent content (if we had date info)
    score += Math.random() * 20; // Simulate recency scoring

    return Math.min(100, Math.round(score));
  }

  /**
   * Prioritize Colombian content in results
   */
  prioritizeColombianContent(results) {
    const colombian = results.filter(r => r.region === 'colombia');
    const international = results.filter(r => r.region !== 'colombia');
    
    // Sort each group by relevance score
    colombian.sort((a, b) => b.relevanceScore - a.relevanceScore);
    international.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Return Colombian results first, then international
    return [...colombian, ...international];
  }

  /**
   * Detect region from URL and content
   */
  detectRegion(url, title) {
    const colombianDomains = ['.co', 'colombia'];
    const latinDomains = ['.mx', '.ar', '.br', '.pe', '.cl', '.ve'];
    
    const urlLower = url.toLowerCase();
    const titleLower = title.toLowerCase();
    
    if (colombianDomains.some(domain => urlLower.includes(domain)) ||
        ['colombia', 'bogotá', 'medellín'].some(term => titleLower.includes(term))) {
      return 'colombia';
    }
    
    if (latinDomains.some(domain => urlLower.includes(domain))) {
      return 'latam';
    }
    
    return 'international';
  }

  /**
   * Infer category from title and snippet
   */
  inferCategory(title, snippet, defaultCategory) {
    if (defaultCategory) return defaultCategory;

    const text = (title + ' ' + snippet).toLowerCase();
    
    if (text.includes('politic') || text.includes('gobierno') || text.includes('congreso')) {
      return 'politica';
    }
    if (text.includes('econom') || text.includes('mercado') || text.includes('finanz')) {
      return 'economia';
    }
    if (text.includes('seguridad') || text.includes('militar') || text.includes('defensa')) {
      return 'seguridad';
    }
    if (text.includes('social') || text.includes('comunidad') || text.includes('ciudadan')) {
      return 'social';
    }
    if (text.includes('internacional') || text.includes('extern') || text.includes('mundial')) {
      return 'internacional';
    }
    
    return 'general';
  }

  /**
   * Extract domain from URL
   */
  extractDomain(url) {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Google Search';
    }
  }

  /**
   * Generate relevant tags
   */
  generateTags(query, title) {
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const titleTerms = title.toLowerCase().split(' ')
      .filter(term => term.length > 3 && !['the', 'and', 'for', 'are', 'but', 'not'].includes(term))
      .slice(0, 3);
    
    return [...new Set([...queryTerms, ...titleTerms])].slice(0, 5);
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query) {
    if (!this.enabled || !this.apiKey) {
      return this.getMockSuggestions(query);
    }

    try {
      // Google doesn't have a direct suggestion API in Custom Search
      // Return contextual suggestions
      return [
        `${query} Colombia noticias`,
        `${query} política Colombia`,
        `${query} análisis`,
        `${query} actualidad`,
        `${query} último momento`
      ].slice(0, 5);
    } catch (error) {
      console.error('Google suggestions error:', error);
      return this.getMockSuggestions(query);
    }
  }

  /**
   * Get mock results when API is not available
   */
  getMockResults(query, category, maxResults) {
    const mockResults = [];
    const count = Math.min(maxResults, 5);
    
    for (let i = 0; i < count; i++) {
      mockResults.push({
        id: `google_mock_${Date.now()}_${i}`,
        title: `${query} - Resultados de búsqueda web Colombia`,
        summary: `Información relevante sobre ${query} en el contexto colombiano. Esta es una búsqueda simulada ya que las credenciales de Google Search API no están configuradas.`,
        url: `https://example.com/search-${i}`,
        source: 'Google Search (Simulado)',
        category: category || 'general',
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        relevanceScore: 85 - (i * 5),
        image: '🔍',
        author: 'google.com',
        tags: [query.toLowerCase(), 'colombia', 'web'],
        contentType: 'web',
        provider: 'google_search',
        region: 'colombia',
        language: 'es'
      });
    }
    
    return mockResults;
  }

  /**
   * Get mock suggestions
   */
  getMockSuggestions(query) {
    return [
      `${query} Colombia`,
      `${query} noticias`,
      `${query} política`,
      `${query} actualidad`
    ];
  }

  /**
   * Get provider icon
   */
  getGoogleSearchIcon() {
    return '🔍';
  }
}

export default GoogleSearchProvider;