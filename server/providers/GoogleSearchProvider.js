/**
 * Google Search Provider - Integrates with Google Custom Search API
 * Provides secure server-side access to Google search results
 */

class GoogleSearchProvider {
  constructor() {
    this.name = 'google';
    this.apiKey = process.env.GOOGLE_API_KEY;
    this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
    
    // Check if API credentials are configured
    if (!this.apiKey || !this.searchEngineId) {
      console.warn('Google Search Provider: API credentials not configured. Using fallback mode.');
      console.warn('Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID environment variables for full functionality.');
      this.fallbackMode = true;
    } else {
      this.fallbackMode = false;
      console.log('Google Search Provider: Initialized with API credentials');
    }
  }

  /**
   * Search using Google Custom Search API
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {string} options.category - Category filter
   * @param {number} options.maxResults - Maximum results to return
   * @returns {Promise<Array>} Array of search results
   */
  async search(options) {
    const { query, category, maxResults = 10 } = options;

    try {
      // If no API credentials, return fallback results
      if (this.fallbackMode) {
        return this.getFallbackResults(query, category, maxResults);
      }

      // Simulate API delay for consistency with other providers
      await this.delay(200 + Math.random() * 300);

      const searchResults = await this.performGoogleSearch(query, maxResults);
      
      // Transform Google API results to our standard format
      const transformedResults = searchResults.map((item, index) => ({
        id: `google_${Date.now()}_${index}`,
        title: item.title || `Resultado sobre "${query}"`,
        summary: item.snippet || `Información relevante sobre ${query} encontrada en búsqueda web.`,
        url: item.link || '#',
        source: item.displayLink ? `Google - ${item.displayLink}` : 'Google Search',
        category: this.categorizeResult(item, category),
        timestamp: new Date().toISOString(),
        relevanceScore: Math.max(70, 95 - (index * 2)), // Higher relevance for Google results
        image: item.pagemap?.cse_thumbnail?.[0]?.src || '🌐',
        author: this.extractAuthor(item),
        tags: this.generateTags(query, item),
        provider: 'google',
        contentType: this.getContentType(item),
        googleMetrics: {
          cacheId: item.cacheId,
          formattedUrl: item.formattedUrl,
          htmlFormattedUrl: item.htmlFormattedUrl
        }
      }));

      // Apply category filter if specified
      if (category && category !== 'todos') {
        return transformedResults.filter(result => 
          result.category.toLowerCase() === category.toLowerCase()
        );
      }

      return transformedResults;

    } catch (error) {
      console.error('Google Search Provider error:', error);
      // Return fallback results on error
      return this.getFallbackResults(query, category, maxResults);
    }
  }

  /**
   * Perform actual Google Custom Search API call
   */
  async performGoogleSearch(query, maxResults) {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        cx: this.searchEngineId,
        q: query,
        num: Math.min(maxResults, 10), // Google API limit is 10 per request
        safe: 'medium', // Safe search
        lr: 'lang_es', // Spanish language preference
        gl: 'co', // Colombia geo-location
        c2coff: '1', // Simplified Chinese search off
        hq: 'colombia OR político OR política OR gobierno', // Bias towards Colombian political content
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'NuestroPulso/1.0 (+https://nuestropulso.co)',
          'Accept': 'application/json',
        },
        // 8 second timeout for Google API
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Google API quota exceeded or invalid API key');
        } else if (response.status === 400) {
          throw new Error('Invalid search parameters for Google API');
        } else {
          throw new Error(`Google API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (!data.items || !Array.isArray(data.items)) {
        console.warn('Google API returned no search results');
        return [];
      }

      return data.items;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Google API request timeout');
      }
      throw error;
    }
  }

  /**
   * Get fallback results when Google API is not available
   */
  getFallbackResults(query, category, maxResults) {
    console.log('Google Search Provider: Using fallback results');
    
    const fallbackResults = [];
    const resultCount = Math.min(maxResults, 8);
    
    for (let i = 0; i < resultCount; i++) {
      const googleCategory = category || this.getRandomCategory();
      const relevanceScore = Math.max(60, 85 - (i * 3) + Math.random() * 10);
      
      const result = {
        id: `google_fallback_${Date.now()}_${i}`,
        title: this.generateFallbackTitle(query, googleCategory, i),
        summary: this.generateFallbackSummary(query, googleCategory),
        url: '#',
        source: 'Google Search (Simulado)',
        category: googleCategory,
        timestamp: this.generateRecentTimestamp(),
        relevanceScore: Math.round(relevanceScore),
        image: '🌐',
        author: this.generateFallbackAuthor(),
        tags: this.generateTags(query, { title: query }),
        provider: 'google',
        contentType: 'webpage',
        fallback: true
      };

      fallbackResults.push(result);
    }

    return fallbackResults;
  }

  /**
   * Get search suggestions based on query
   */
  async getSuggestions(query) {
    // This could integrate with Google Suggest API in the future
    const suggestions = [
      `${query} Colombia`,
      `${query} noticias`,
      `${query} gobierno`,
      `${query} política`,
      `${query} análisis`
    ];

    return suggestions.filter(s => s.toLowerCase() !== query.toLowerCase()).slice(0, 3);
  }

  // Helper methods
  categorizeResult(item, preferredCategory) {
    if (preferredCategory && preferredCategory !== 'todos') {
      return preferredCategory;
    }

    const title = (item.title || '').toLowerCase();
    const snippet = (item.snippet || '').toLowerCase();
    const url = (item.link || '').toLowerCase();
    
    const text = `${title} ${snippet} ${url}`;

    if (text.includes('gobierno') || text.includes('congreso') || text.includes('presidente') || 
        text.includes('ministerio') || text.includes('ley') || text.includes('decreto')) {
      return 'politica';
    }
    
    if (text.includes('internacional') || text.includes('eeuu') || text.includes('mundial') ||
        text.includes('trump') || text.includes('biden')) {
      return 'internacional';
    }
    
    if (text.includes('participacion') || text.includes('ciudadan') || text.includes('voto') ||
        text.includes('democracia')) {
      return 'participacion';
    }
    
    if (text.includes('social') || text.includes('sociedad') || text.includes('comunidad')) {
      return 'social';
    }
    
    return 'politica'; // Default category
  }

  extractAuthor(item) {
    // Try to extract author from metadata or use domain
    if (item.pagemap?.metatags?.[0]?.author) {
      return item.pagemap.metatags[0].author;
    }
    
    if (item.displayLink) {
      return item.displayLink;
    }
    
    return 'Fuente Web';
  }

  generateTags(query, item) {
    const tags = [query.toLowerCase()];
    
    if (item.title) {
      const titleWords = item.title.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3 && !tags.includes(word))
        .slice(0, 2);
      tags.push(...titleWords);
    }
    
    tags.push('google', 'web');
    return tags.slice(0, 5);
  }

  getContentType(item) {
    const url = item.link || '';
    const fileType = item.fileFormat || '';
    
    if (fileType.includes('PDF')) return 'pdf';
    if (url.includes('youtube.com')) return 'video';
    if (url.includes('.gov.co')) return 'official';
    if (item.pagemap?.cse_image) return 'article-with-image';
    
    return 'webpage';
  }

  generateFallbackTitle(query, category, index) {
    const templates = [
      `Resultados sobre "${query}" - Información actualizada`,
      `${query}: Análisis y cobertura completa`,
      `Todo sobre ${query} - Fuentes confiables`,
      `${query} en el contexto colombiano`,
      `Últimas noticias: ${query}`,
      `Análisis profundo sobre ${query}`,
      `${query}: Datos y estadísticas recientes`,
      `Información oficial sobre ${query}`
    ];
    
    return templates[index % templates.length];
  }

  generateFallbackSummary(query, category) {
    const summaries = {
      politica: `Información política actualizada sobre ${query}. Análisis de políticas públicas, decisiones gubernamentales y impacto en la sociedad colombiana.`,
      social: `Análisis social sobre ${query}. Impacto en las comunidades, iniciativas ciudadanas y transformaciones sociales relacionadas.`,
      internacional: `Perspectiva internacional sobre ${query}. Relaciones diplomáticas, comercio exterior y posición de Colombia en el contexto global.`,
      participacion: `Información sobre participación ciudadana relacionada con ${query}. Mecanismos de participación, consultas y espacios de debate público.`,
      tecnologia: `Avances tecnológicos relacionados con ${query}. Innovación, transformación digital y impacto en la sociedad colombiana.`
    };
    
    return summaries[category] || summaries.politica;
  }

  generateFallbackAuthor() {
    const authors = [
      'Fuente Gubernamental',
      'Medio de Comunicación',
      'Análisis Académico',
      'Investigación Periodística',
      'Documento Oficial',
      'Portal Informativo'
    ];
    
    return authors[Math.floor(Math.random() * authors.length)];
  }

  generateRecentTimestamp() {
    const now = Date.now();
    const daysAgo = Math.random() * 7; // Up to 1 week ago
    return new Date(now - (daysAgo * 24 * 60 * 60 * 1000)).toISOString();
  }

  getRandomCategory() {
    const categories = ['politica', 'social', 'internacional', 'participacion', 'tecnologia'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default GoogleSearchProvider;