/**
 * Bing News Provider - Integrates with Bing News Search API
 * Provides international news coverage with Colombian prioritization
 */
class BingNewsProvider {
  constructor() {
    this.name = 'bing_news';
    this.apiKey = process.env.BING_SEARCH_API_KEY;
    this.baseUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';
    this.enabled = process.env.REACT_APP_ENABLE_BING_NEWS === 'true';
  }

  /**
   * Search Bing News
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {string} options.category - Category filter
   * @param {number} options.maxResults - Maximum results to return
   * @param {string} options.language - Language preference (es/en)
   * @param {string} options.region - Region preference (colombia/latam/world)
   * @returns {Promise<Array>} Array of news results
   */
  async search(options) {
    const { query, category, maxResults = 15, language = 'es', region = 'colombia' } = options;

    if (!this.enabled || !this.apiKey) {
      console.warn('Bing News Provider: API key not configured, returning mock data');
      return this.getMockResults(query, category, maxResults);
    }

    try {
      // Enhance query based on region and category
      const enhancedQuery = this.enhanceQuery(query, region, category);
      
      const params = new URLSearchParams({
        q: enhancedQuery,
        count: Math.min(maxResults, 100),
        offset: 0,
        mkt: this.getMarketCode(language, region),
        safeSearch: 'Moderate',
        textDecorations: false,
        textFormat: 'Raw',
        freshness: 'Month', // News from last month
        sortBy: 'Relevance'
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'User-Agent': 'NuestroPulso/1.0',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Bing News API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.value || data.value.length === 0) {
        console.warn('Bing News returned no results for:', enhancedQuery);
        return this.getMockResults(query, category, maxResults);
      }

      // Transform Bing results to our format
      const results = data.value.map((item, index) => ({
        id: `bing_news_${Date.now()}_${index}`,
        title: item.name,
        summary: item.description || '',
        url: item.url,
        source: 'Bing News',
        category: this.inferCategory(item.name, item.description, item.category, category),
        timestamp: item.datePublished || new Date().toISOString(),
        relevanceScore: this.calculateRelevanceScore(item, query, region),
        image: this.getBingNewsIcon(item.category),
        author: this.extractSource(item),
        tags: this.generateTags(query, item.name, item.category),
        contentType: 'article',
        provider: 'bing_news',
        region: this.detectRegion(item.url, item.name, item.provider),
        language: language,
        // Bing-specific data
        provider_info: item.provider?.[0]?.name || 'News Source',
        clusteredArticles: item.clusteredArticles?.length || 0,
        wordCount: this.estimateWordCount(item.description)
      }));

      // Prioritize Colombian content if region is colombia
      if (region === 'colombia') {
        return this.prioritizeColombianContent(results);
      }

      return results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    } catch (error) {
      console.error('Bing News Provider error:', error);
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
      enhancedQuery += ' ("América Latina" OR Colombia OR México OR Argentina OR Brasil OR Chile)';
    }

    // Add category context
    if (category) {
      const categoryMap = {
        'politica': 'política gobierno elecciones',
        'internacional': 'internacional relaciones diplomacia',
        'economia': 'economía mercados finanzas',
        'social': 'sociedad comunidad social',
        'seguridad': 'seguridad defensa militar'
      };
      
      if (categoryMap[category]) {
        enhancedQuery += ` ${categoryMap[category]}`;
      }
    }

    return enhancedQuery;
  }

  /**
   * Get market code for Bing API
   */
  getMarketCode(language, region) {
    if (region === 'colombia') {
      return language === 'es' ? 'es-CO' : 'en-US';
    } else if (region === 'latam') {
      return language === 'es' ? 'es-MX' : 'en-US';
    }
    return language === 'es' ? 'es-ES' : 'en-US';
  }

  /**
   * Calculate relevance score with Colombian prioritization
   */
  calculateRelevanceScore(item, query, region) {
    let score = 65; // Base score

    // Boost Colombian content
    if (region === 'colombia') {
      const colombianIndicators = [
        'colombia', 'bogotá', 'medellín', 'cali', 'barranquilla',
        'petro', 'duque', 'uribe', 'congreso', 'senado', '.co'
      ];
      
      const text = (item.name + ' ' + item.description + ' ' + item.url + ' ' + (item.provider?.[0]?.name || '')).toLowerCase();
      const matches = colombianIndicators.filter(indicator => text.includes(indicator));
      score += matches.length * 12;
    }

    // Boost recent content
    if (item.datePublished) {
      const publishedDate = new Date(item.datePublished);
      const hoursAgo = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursAgo < 24) score += 20;
      else if (hoursAgo < 72) score += 15;
      else if (hoursAgo < 168) score += 10; // 1 week
    }

    // Boost articles with more clustered coverage
    if (item.clusteredArticles && item.clusteredArticles.length > 0) {
      score += Math.min(15, item.clusteredArticles.length * 2);
    }

    // Boost known Colombian news sources
    const colombianSources = [
      'el tiempo', 'el espectador', 'semana', 'caracol', 'rcn',
      'la república', 'portafolio', 'el colombiano', 'blu radio'
    ];
    
    const providerName = (item.provider?.[0]?.name || '').toLowerCase();
    if (colombianSources.some(source => providerName.includes(source))) {
      score += 25;
    }

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
   * Detect region from URL, title and provider
   */
  detectRegion(url, title, provider) {
    const urlLower = url.toLowerCase();
    const titleLower = title.toLowerCase();
    const providerName = (provider?.[0]?.name || '').toLowerCase();
    
    // Check for Colombian indicators
    const colombianIndicators = [
      '.co', 'colombia', 'bogotá', 'medellín', 'cali',
      'el tiempo', 'el espectador', 'semana', 'caracol', 'rcn'
    ];
    
    if (colombianIndicators.some(indicator => 
      urlLower.includes(indicator) || titleLower.includes(indicator) || providerName.includes(indicator)
    )) {
      return 'colombia';
    }
    
    // Check for Latin American indicators
    const latinIndicators = [
      '.mx', '.ar', '.br', '.pe', '.cl', '.ve',
      'méxico', 'argentina', 'brasil', 'chile', 'perú'
    ];
    
    if (latinIndicators.some(indicator => 
      urlLower.includes(indicator) || titleLower.includes(indicator)
    )) {
      return 'latam';
    }
    
    return 'international';
  }

  /**
   * Infer category from Bing category and content
   */
  inferCategory(title, description, bingCategory, defaultCategory) {
    if (defaultCategory) return defaultCategory;

    // Map Bing categories to our categories
    if (bingCategory) {
      const categoryMap = {
        'Politics': 'politica',
        'World': 'internacional',
        'Business': 'economia',
        'ScienceAndTechnology': 'tecnologia',
        'Health': 'social',
        'Sports': 'deportes'
      };
      
      if (categoryMap[bingCategory]) {
        return categoryMap[bingCategory];
      }
    }

    // Infer from content
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.includes('politic') || text.includes('gobierno') || text.includes('congreso') || text.includes('elecciones')) {
      return 'politica';
    }
    if (text.includes('econom') || text.includes('mercado') || text.includes('finanz') || text.includes('comercio')) {
      return 'economia';
    }
    if (text.includes('seguridad') || text.includes('militar') || text.includes('defensa') || text.includes('crimen')) {
      return 'seguridad';
    }
    if (text.includes('social') || text.includes('comunidad') || text.includes('salud') || text.includes('educación')) {
      return 'social';
    }
    if (text.includes('internacional') || text.includes('mundial') || text.includes('exterior') || text.includes('diplomacia')) {
      return 'internacional';
    }
    
    return 'general';
  }

  /**
   * Extract source name from Bing result
   */
  extractSource(item) {
    if (item.provider && item.provider[0] && item.provider[0].name) {
      return item.provider[0].name;
    }
    
    // Extract from URL as fallback
    try {
      const url = new URL(item.url);
      return url.hostname.replace('www.', '');
    } catch {
      return 'Bing News';
    }
  }

  /**
   * Generate relevant tags
   */
  generateTags(query, title, bingCategory) {
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const titleTerms = title.toLowerCase().split(' ')
      .filter(term => term.length > 3 && !['the', 'and', 'for', 'are', 'but'].includes(term))
      .slice(0, 3);
    
    const tags = [...new Set([...queryTerms, ...titleTerms])];
    
    if (bingCategory) {
      tags.push(bingCategory.toLowerCase());
    }
    
    return tags.slice(0, 6);
  }

  /**
   * Estimate word count from description
   */
  estimateWordCount(description) {
    if (!description) return 0;
    return description.split(' ').length;
  }

  /**
   * Get icon based on category
   */
  getBingNewsIcon(category) {
    const icons = {
      'Politics': '🏛️',
      'World': '🌍',
      'Business': '💼',
      'ScienceAndTechnology': '🔬',
      'Health': '🏥',
      'Sports': '⚽'
    };
    return icons[category] || '📰';
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query) {
    return [
      `${query} Colombia noticias`,
      `${query} internacional`,
      `${query} último momento`,
      `${query} análisis`,
      `${query} breaking news`
    ].slice(0, 4);
  }

  /**
   * Get mock results when API is not available
   */
  getMockResults(query, category, maxResults) {
    const mockResults = [];
    const count = Math.min(maxResults, 8);
    
    const mockSources = [
      'El Tiempo',
      'BBC News',
      'CNN Español',
      'Reuters',
      'El Espectador',
      'Associated Press',
      'Semana',
      'La República'
    ];
    
    for (let i = 0; i < count; i++) {
      const source = mockSources[i % mockSources.length];
      const isColombianSource = ['El Tiempo', 'El Espectador', 'Semana', 'La República'].includes(source);
      
      mockResults.push({
        id: `bing_news_mock_${Date.now()}_${i}`,
        title: `${query}: ${isColombianSource ? 'Perspectiva Colombia' : 'Cobertura Internacional'} - ${source}`,
        summary: `Artículo informativo sobre ${query} desde la perspectiva ${isColombianSource ? 'colombiana' : 'internacional'}. Contenido simulado ya que la API key de Bing News no está configurada.`,
        url: `https://news.example.com/article-${i}`,
        source: 'Bing News',
        category: category || 'politica',
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        relevanceScore: isColombianSource ? 95 - (i * 2) : 75 - (i * 3),
        image: '📰',
        author: source,
        tags: [query.toLowerCase(), 'noticias', isColombianSource ? 'colombia' : 'internacional'],
        contentType: 'article',
        provider: 'bing_news',
        region: isColombianSource ? 'colombia' : 'international',
        language: 'es',
        provider_info: source,
        wordCount: 250 + Math.floor(Math.random() * 500)
      });
    }
    
    return mockResults;
  }
}

export default BingNewsProvider;