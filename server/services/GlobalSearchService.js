/**
 * Global Search Service
 * Provides search functionality using Google Custom Search API for worldwide content
 */
class GlobalSearchService {
  constructor() {
    // Configuration for Google Custom Search API
    this.googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
    this.googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    this.googleApiUrl = 'https://www.googleapis.com/customsearch/v1';
    
    // Fallback to mock data if API credentials are not available
    this.useMockData = !this.googleApiKey || !this.googleSearchEngineId;
    
    if (this.useMockData) {
      console.warn('Google Custom Search API credentials not found. Using mock data.');
      this.mockGlobalData = this.generateMockGlobalData();
    }
  }

  /**
   * Search global content using Google Custom Search API or mock data
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async search(options) {
    const { query, page = 1, limit = 10, scope = 'global' } = options;
    const startTime = Date.now();

    try {
      if (this.useMockData) {
        return await this.searchMockData(options, startTime);
      } else {
        return await this.searchGoogleAPI(options, startTime);
      }
    } catch (error) {
      console.error('Global search failed:', error);
      // Fallback to mock data on API failure
      return await this.searchMockData(options, startTime);
    }
  }

  /**
   * Search using Google Custom Search API
   */
  async searchGoogleAPI(options, startTime) {
    const { query, page = 1, limit = 10 } = options;
    
    // Google Custom Search API parameters
    const startIndex = ((page - 1) * limit) + 1; // Google uses 1-based indexing
    const params = new URLSearchParams({
      key: this.googleApiKey,
      cx: this.googleSearchEngineId,
      q: query,
      start: startIndex.toString(),
      num: Math.min(limit, 10).toString(), // Google API max is 10 per request
      safe: 'medium',
      fields: 'items(title,link,snippet,displayLink,pagemap),searchInformation(totalResults,searchTime)'
    });

    const response = await fetch(`${this.googleApiUrl}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'NuestroPulso/1.0'
      },
      // Timeout after 5 seconds
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Google results to our format
    const results = this.transformGoogleResults(data.items || [], query);
    const totalResults = parseInt(data.searchInformation?.totalResults || '0');

    return {
      query,
      results,
      totalResults: Math.min(totalResults, 1000), // Cap at 1000 for performance
      page,
      totalPages: Math.ceil(Math.min(totalResults, 1000) / limit),
      hasMore: startIndex + limit <= Math.min(totalResults, 1000),
      searchTime: Date.now() - startTime,
      source: 'google-api',
      metadata: {
        scope: 'global',
        apiSearchTime: data.searchInformation?.searchTime || 0,
        sources: this.getUniqueSources(results),
        categories: this.getUniqueCategories(results)
      }
    };
  }

  /**
   * Transform Google API results to our standard format
   */
  transformGoogleResults(googleItems, query) {
    return googleItems.map((item, index) => {
      const domain = this.extractDomain(item.link);
      const category = this.categorizeContent(item.title, item.snippet, domain);
      const country = this.extractCountry(item.displayLink, item.snippet);
      
      return {
        id: `google-${Date.now()}-${index}`,
        title: this.cleanHtmlTags(item.title),
        summary: this.cleanHtmlTags(item.snippet),
        url: item.link,
        source: this.formatSourceName(domain),
        category,
        timestamp: new Date().toISOString(), // Google doesn't provide publish date in basic API
        relevanceScore: Math.max(90 - (index * 5), 10), // Decrease score by position
        image: this.getIconForCategory(category),
        author: this.extractAuthor(item.pagemap),
        tags: this.generateTags(query, item.title, item.snippet),
        country
      };
    });
  }

  /**
   * Search using mock global data
   */
  async searchMockData(options, startTime) {
    const { query, page = 1, limit = 10 } = options;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Filter mock data based on query
    let results = this.mockGlobalData.filter(item => 
      this.matchesQuery(item, query)
    );

    // Calculate relevance scores
    results = this.calculateRelevanceScores(results, query);
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    return {
      query,
      results: paginatedResults,
      totalResults: results.length,
      page,
      totalPages: Math.ceil(results.length / limit),
      hasMore: startIndex + limit < results.length,
      searchTime: Date.now() - startTime,
      source: 'mock-global',
      metadata: {
        scope: 'global',
        sources: this.getUniqueSources(paginatedResults),
        categories: this.getUniqueCategories(paginatedResults)
      }
    };
  }

  /**
   * Helper methods
   */
  
  extractDomain(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'unknown';
    }
  }

  categorizeContent(title, snippet, domain) {
    const text = `${title} ${snippet}`.toLowerCase();
    
    if (text.match(/politics?|government|election|congress|parliament|minister/)) return 'politics';
    if (text.match(/economy|economic|finance|market|business|trade/)) return 'economics';
    if (text.match(/international|global|world|foreign|diplomatic/)) return 'international';
    if (text.match(/technology|tech|digital|ai|software|internet/)) return 'technology';
    if (text.match(/health|medical|hospital|doctor|disease/)) return 'health';
    if (text.match(/education|school|university|student|academic/)) return 'education';
    if (text.match(/environment|climate|green|sustainable/)) return 'environment';
    if (text.match(/sports?|football|soccer|olympics/)) return 'sports';
    if (text.match(/culture|art|music|film|entertainment/)) return 'culture';
    
    return 'general';
  }

  extractCountry(displayLink, snippet) {
    const text = `${displayLink} ${snippet}`.toLowerCase();
    
    // Common country indicators
    const countryPatterns = {
      'united states': ['usa', 'america', 'us ', '.gov', 'washington'],
      'united kingdom': ['uk', 'britain', 'london', '.uk'],
      'germany': ['germany', 'berlin', 'deutsche'],
      'france': ['france', 'paris', 'french'],
      'china': ['china', 'chinese', 'beijing'],
      'russia': ['russia', 'moscow', 'russian'],
      'japan': ['japan', 'tokyo', 'japanese'],
      'brazil': ['brazil', 'brazilian', 'brasilia'],
      'india': ['india', 'indian', 'delhi'],
      'global': ['international', 'worldwide', 'global']
    };

    for (const [country, patterns] of Object.entries(countryPatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        return country === 'global' ? 'Global' : country.split(' ').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
      }
    }

    return 'Global';
  }

  formatSourceName(domain) {
    const sourceMap = {
      'bbc.com': 'BBC',
      'cnn.com': 'CNN',
      'reuters.com': 'Reuters',
      'ap.org': 'Associated Press',
      'nytimes.com': 'New York Times',
      'washingtonpost.com': 'Washington Post',
      'theguardian.com': 'The Guardian',
      'ft.com': 'Financial Times',
      'wsj.com': 'Wall Street Journal',
      'bloomberg.com': 'Bloomberg'
    };

    return sourceMap[domain] || domain.split('.')[0].replace(/^\w/, c => c.toUpperCase());
  }

  getIconForCategory(category) {
    const icons = {
      'politics': '🏛️',
      'economics': '💹',
      'international': '🌍',
      'technology': '💻',
      'health': '🏥',
      'education': '🎓',
      'environment': '🌱',
      'sports': '⚽',
      'culture': '🎭',
      'general': '📰'
    };

    return icons[category] || '📰';
  }

  extractAuthor(pagemap) {
    if (pagemap?.person?.[0]?.name) return pagemap.person[0].name;
    if (pagemap?.article?.[0]?.author) return pagemap.article[0].author;
    return 'Staff Writer';
  }

  generateTags(query, title, snippet) {
    const text = `${query} ${title} ${snippet}`.toLowerCase();
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    const words = text.match(/\b\w{3,}\b/g) || [];
    const tags = [...new Set(words)]
      .filter(word => !commonWords.includes(word))
      .slice(0, 5);
    
    return tags;
  }

  cleanHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  }

  matchesQuery(item, query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    const searchableText = `${item.title} ${item.summary} ${item.tags?.join(' ') || ''}`.toLowerCase();
    
    return searchTerms.some(term => searchableText.includes(term));
  }

  calculateRelevanceScores(results, query) {
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    
    return results.map(result => {
      let score = 0;
      const title = result.title.toLowerCase();
      const summary = result.summary.toLowerCase();
      
      queryTerms.forEach(term => {
        if (title.includes(term)) score += 25;
        if (summary.includes(term)) score += 10;
        if (result.tags?.some(tag => tag.toLowerCase().includes(term))) score += 5;
      });
      
      // Bonus for authoritative international sources
      const authoritySources = ['BBC', 'Reuters', 'Associated Press', 'CNN', 'Financial Times'];
      if (authoritySources.includes(result.source)) score += 15;
      
      result.relevanceScore = Math.min(100, Math.max(1, score));
      return result;
    });
  }

  getUniqueSources(results) {
    return [...new Set(results.map(r => r.source))];
  }

  getUniqueCategories(results) {
    return [...new Set(results.map(r => r.category))];
  }

  /**
   * Generate mock global data for demonstration
   */
  generateMockGlobalData() {
    return [
      {
        id: 'global-1',
        title: 'World Leaders Gather for Climate Summit in Dubai',
        summary: 'International leaders from 195 countries convened in Dubai to discuss urgent climate action and renewable energy initiatives.',
        url: 'https://example.com/climate-summit',
        source: 'BBC World',
        category: 'international',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 95,
        image: '🌍',
        author: 'Climate Correspondent',
        tags: ['climate', 'summit', 'dubai', 'renewable'],
        country: 'Global'
      },
      {
        id: 'global-2',
        title: 'Global Markets React to Federal Reserve Interest Rate Decision',
        summary: 'Stock markets worldwide showed mixed reactions following the Federal Reserve\'s decision to maintain current interest rates.',
        url: 'https://example.com/fed-rates',
        source: 'Financial Times',
        category: 'economics',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 90,
        image: '💹',
        author: 'Economics Editor',
        tags: ['federal', 'reserve', 'markets', 'interest'],
        country: 'United States'
      },
      {
        id: 'global-3',
        title: 'Breakthrough in AI Technology Announced at Stanford University',
        summary: 'Researchers at Stanford University unveiled a new artificial intelligence system that could revolutionize healthcare diagnostics.',
        url: 'https://example.com/ai-breakthrough',
        source: 'Reuters',
        category: 'technology',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 88,
        image: '💻',
        author: 'Technology Reporter',
        tags: ['ai', 'stanford', 'healthcare', 'technology'],
        country: 'United States'
      },
      {
        id: 'global-4',
        title: 'European Union Announces New Trade Agreement with Southeast Asia',
        summary: 'The European Union signed a comprehensive trade agreement with ASEAN countries, strengthening economic ties.',
        url: 'https://example.com/eu-asean',
        source: 'Associated Press',
        category: 'international',
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 85,
        image: '🤝',
        author: 'International Trade Correspondent',
        tags: ['eu', 'asean', 'trade', 'agreement'],
        country: 'Global'
      },
      {
        id: 'global-5',
        title: 'WHO Reports Significant Progress in Global Health Initiatives',
        summary: 'The World Health Organization released its annual report showing major improvements in global health outcomes.',
        url: 'https://example.com/who-report',
        source: 'The Guardian',
        category: 'health',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 82,
        image: '🏥',
        author: 'Health Correspondent',
        tags: ['who', 'health', 'global', 'progress'],
        country: 'Global'
      }
    ];
  }

  /**
   * Get search suggestions for global content
   */
  async getSuggestions(query) {
    const globalSuggestions = [
      'world news today',
      'international politics',
      'global economy',
      'climate change',
      'world leaders',
      'international trade',
      'global health',
      'world elections',
      'international relations',
      'global technology'
    ];

    return globalSuggestions
      .filter(suggestion => 
        query.length < 2 || 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);
  }
}

export default GlobalSearchService;