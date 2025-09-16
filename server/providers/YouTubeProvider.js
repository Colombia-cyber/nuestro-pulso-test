/**
 * YouTube Provider - Integrates with YouTube Data API v3
 * Provides video content search with Colombian channel prioritization
 */
class YouTubeProvider {
  constructor() {
    this.name = 'youtube';
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    this.enabled = process.env.REACT_APP_ENABLE_YOUTUBE_SEARCH === 'true';
    
    // Colombian and Spanish-speaking channels to prioritize
    this.priorityChannels = [
      'UC8XYg7bgJd9vhcABSYnIAOg', // Noticias Caracol
      'UCj8yBfGff3xd0On3CPm04vA', // RCN Noticias
      'UCvKGbj86jPK0jBTrHEo-C2w', // Semana
      'UCQdqz_uLRCn2LnbfV0O_jxw', // El Tiempo
      'UC_8DjJpBF9O8SfLH_8eUJeQ', // W Radio Colombia
      'UCq8aK9NfSxO2GbmWiVl_lrA', // City TV
      'UC_O76pT6j8lUWNfnD6tUNaw', // CM& Noticias
      'UCF2-OFYp6FiX6LiJTDsxbLQ', // Canal TRO
    ];
  }

  /**
   * Search YouTube videos
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {string} options.category - Category filter
   * @param {number} options.maxResults - Maximum results to return
   * @param {string} options.language - Language preference (es/en)
   * @param {string} options.region - Region preference (colombia/latam/world)
   * @returns {Promise<Array>} Array of video results
   */
  async search(options) {
    const { query, category, maxResults = 12, language = 'es', region = 'colombia' } = options;

    if (!this.enabled || !this.apiKey) {
      console.warn('YouTube Provider: API key not configured, returning mock data');
      return this.getMockResults(query, category, maxResults);
    }

    try {
      // Build search parameters
      const params = new URLSearchParams({
        part: 'snippet',
        q: this.enhanceQuery(query, region, category),
        type: 'video',
        maxResults: Math.min(maxResults, 50),
        order: 'relevance',
        publishedAfter: this.getRecentDateFilter(),
        regionCode: region === 'colombia' ? 'CO' : region === 'latam' ? 'MX' : 'US',
        relevanceLanguage: language,
        safeSearch: 'moderate',
        videoDefinition: 'any',
        videoEmbeddable: 'true',
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'NuestroPulso/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        console.warn('YouTube search returned no results for:', query);
        return this.getMockResults(query, category, maxResults);
      }

      // Get additional video details (duration, view count, etc.)
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await this.getVideoDetails(videoIds);
      
      // Transform YouTube results to our format
      const results = data.items.map((item, index) => {
        const details = detailsResponse.items?.find(d => d.id === item.id.videoId) || {};
        const statistics = details.statistics || {};
        const contentDetails = details.contentDetails || {};
        
        return {
          id: `youtube_${item.id.videoId}`,
          title: item.snippet.title,
          summary: this.cleanDescription(item.snippet.description),
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          source: 'YouTube',
          category: this.inferCategory(item.snippet.title, item.snippet.description, category),
          timestamp: item.snippet.publishedAt,
          relevanceScore: this.calculateRelevanceScore(item, query, region),
          image: '📺',
          author: item.snippet.channelTitle,
          tags: this.generateTags(query, item.snippet.title, item.snippet.tags),
          contentType: 'video',
          provider: 'youtube',
          region: this.detectRegion(item.snippet.channelTitle, item.snippet.title),
          language: language,
          // YouTube-specific data
          videoId: item.id.videoId,
          channelId: item.snippet.channelId,
          thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
          duration: this.parseDuration(contentDetails.duration),
          viewCount: parseInt(statistics.viewCount || 0),
          likeCount: parseInt(statistics.likeCount || 0),
          isPriorityChannel: this.priorityChannels.includes(item.snippet.channelId)
        };
      });

      // Sort with Colombian priority
      return this.prioritizeColombianContent(results, region);

    } catch (error) {
      console.error('YouTube Provider error:', error);
      return this.getMockResults(query, category, maxResults);
    }
  }

  /**
   * Get detailed video information
   */
  async getVideoDetails(videoIds) {
    try {
      const params = new URLSearchParams({
        part: 'statistics,contentDetails',
        id: videoIds,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to get video details:', error);
    }
    return { items: [] };
  }

  /**
   * Enhance search query for better results
   */
  enhanceQuery(query, region, category) {
    let enhancedQuery = query;

    // Add regional context
    if (region === 'colombia') {
      enhancedQuery += ' Colombia';
    } else if (region === 'latam') {
      enhancedQuery += ' "América Latina" OR Colombia OR México OR Argentina';
    }

    // Add category-specific terms
    if (category) {
      const categoryMap = {
        'politica': 'política noticias',
        'internacional': 'internacional noticias',
        'economia': 'economía análisis',
        'social': 'sociedad',
        'seguridad': 'seguridad'
      };
      
      if (categoryMap[category]) {
        enhancedQuery += ` ${categoryMap[category]}`;
      }
    }

    return enhancedQuery;
  }

  /**
   * Calculate relevance score with Colombian prioritization
   */
  calculateRelevanceScore(item, query, region) {
    let score = 60; // Base score

    // Boost priority channels (Colombian news channels)
    if (this.priorityChannels.includes(item.snippet.channelId)) {
      score += 25;
    }

    // Boost Colombian content
    if (region === 'colombia') {
      const colombianIndicators = [
        'colombia', 'bogotá', 'medellín', 'cali', 'barranquilla',
        'petro', 'duque', 'uribe', 'caracol', 'rcn', 'semana'
      ];
      
      const text = (item.snippet.title + ' ' + item.snippet.description + ' ' + item.snippet.channelTitle).toLowerCase();
      const matches = colombianIndicators.filter(indicator => text.includes(indicator));
      score += matches.length * 8;
    }

    // Boost recent content
    const publishedDate = new Date(item.snippet.publishedAt);
    const daysSincePublished = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePublished < 7) score += 15;
    else if (daysSincePublished < 30) score += 10;
    else if (daysSincePublished < 90) score += 5;

    return Math.min(100, Math.round(score));
  }

  /**
   * Prioritize Colombian content in results
   */
  prioritizeColombianContent(results, region) {
    if (region !== 'colombia') {
      return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    const priorityChannelResults = results.filter(r => r.isPriorityChannel);
    const colombianResults = results.filter(r => r.region === 'colombia' && !r.isPriorityChannel);
    const internationalResults = results.filter(r => r.region !== 'colombia');
    
    // Sort each group by relevance
    priorityChannelResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    colombianResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    internationalResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    return [...priorityChannelResults, ...colombianResults, ...internationalResults];
  }

  /**
   * Detect region from channel and content
   */
  detectRegion(channelTitle, videoTitle) {
    const text = (channelTitle + ' ' + videoTitle).toLowerCase();
    
    if (this.priorityChannels.includes(channelTitle) ||
        ['colombia', 'bogotá', 'medellín', 'caracol', 'rcn'].some(term => text.includes(term))) {
      return 'colombia';
    }
    
    if (['méxico', 'argentina', 'chile', 'perú', 'venezuela'].some(term => text.includes(term))) {
      return 'latam';
    }
    
    return 'international';
  }

  /**
   * Clean and truncate video description
   */
  cleanDescription(description) {
    if (!description) return '';
    
    // Remove URLs and hashtags, truncate to reasonable length
    return description
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/#\w+/g, '')
      .replace(/\n+/g, ' ')
      .substring(0, 200)
      .trim() + (description.length > 200 ? '...' : '');
  }

  /**
   * Parse YouTube duration format (PT4M13S) to readable format
   */
  parseDuration(duration) {
    if (!duration) return 'N/A';
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 'N/A';
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Infer category from video content
   */
  inferCategory(title, description, defaultCategory) {
    if (defaultCategory) return defaultCategory;

    const text = (title + ' ' + description).toLowerCase();
    
    if (text.includes('politic') || text.includes('gobierno') || text.includes('congreso') || text.includes('presidente')) {
      return 'politica';
    }
    if (text.includes('econom') || text.includes('mercado') || text.includes('finanz') || text.includes('bolsa')) {
      return 'economia';
    }
    if (text.includes('seguridad') || text.includes('militar') || text.includes('crimen') || text.includes('policia')) {
      return 'seguridad';
    }
    if (text.includes('social') || text.includes('comunidad') || text.includes('protesta') || text.includes('manifestación')) {
      return 'social';
    }
    if (text.includes('internacional') || text.includes('mundial') || text.includes('global')) {
      return 'internacional';
    }
    
    return 'general';
  }

  /**
   * Generate tags from video metadata
   */
  generateTags(query, title, videoTags = []) {
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const titleTerms = title.toLowerCase().split(' ')
      .filter(term => term.length > 3)
      .slice(0, 3);
    
    const combinedTags = [...queryTerms, ...titleTerms, ...videoTags.slice(0, 2)];
    return [...new Set(combinedTags)].slice(0, 6);
  }

  /**
   * Get recent date filter (last 6 months)
   */
  getRecentDateFilter() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return sixMonthsAgo.toISOString();
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query) {
    return [
      `${query} Colombia video`,
      `${query} noticias video`,
      `${query} análisis`,
      `${query} entrevista`,
      `${query} documental`
    ].slice(0, 4);
  }

  /**
   * Get mock results when API is not available
   */
  getMockResults(query, category, maxResults) {
    const mockResults = [];
    const count = Math.min(maxResults, 6);
    
    const mockChannels = [
      'Noticias Caracol',
      'RCN Noticias',
      'Semana',
      'El Tiempo',
      'W Radio Colombia',
      'CM& Noticias'
    ];
    
    for (let i = 0; i < count; i++) {
      const channel = mockChannels[i % mockChannels.length];
      mockResults.push({
        id: `youtube_mock_${Date.now()}_${i}`,
        title: `${query} - ${channel}`,
        summary: `Video informativo sobre ${query} presentado por ${channel}. Contenido simulado ya que la API key de YouTube no está configurada.`,
        url: `https://youtube.com/watch?v=mock${i}`,
        source: 'YouTube',
        category: category || 'politica',
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        relevanceScore: 90 - (i * 5),
        image: '📺',
        author: channel,
        tags: [query.toLowerCase(), 'colombia', 'video', 'noticias'],
        contentType: 'video',
        provider: 'youtube',
        region: 'colombia',
        language: 'es',
        videoId: `mock${i}`,
        duration: '5:30',
        viewCount: Math.floor(Math.random() * 100000),
        isPriorityChannel: true
      });
    }
    
    return mockResults;
  }
}

export default YouTubeProvider;