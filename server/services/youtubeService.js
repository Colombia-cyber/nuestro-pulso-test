import axios from 'axios';

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    this.cache = new Map();
    this.cacheTimeout = 300000; // 5 minutes cache
    this.demoMode = !this.apiKey || this.apiKey === 'demo_youtube_key_replace_with_real_key';
  }

  /**
   * Search for Colombian news videos
   * @param {string} query - Search query
   * @param {number} maxResults - Maximum number of results (default 12)
   * @returns {Promise<Object>} Search results
   */
  async searchColombianNews(query = '', maxResults = 12) {
    if (this.demoMode) {
      return this.getDemoSearchResults(query, maxResults);
    }

    if (!this.apiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Build cache key
    const cacheKey = `news_${query}_${maxResults}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log(`📺 Serving cached YouTube results for: ${query || 'general Colombian news'}`);
      return cached.data;
    }

    try {
      // Colombian news channels and keywords
      const colombianNewsKeywords = [
        'colombia noticias',
        'noticias colombia',
        'colombia news',
        'caracol noticias',
        'rcn noticias',
        'semana noticias',
        'el tiempo noticias',
        'noticias caracol',
        'noticias rcn',
        'colombia hoy'
      ];

      // Build search query
      const searchQuery = query 
        ? `${query} colombia noticias`
        : colombianNewsKeywords[Math.floor(Math.random() * colombianNewsKeywords.length)];

      const params = {
        key: this.apiKey,
        part: 'snippet,statistics',
        type: 'video',
        q: searchQuery,
        maxResults: maxResults,
        order: 'relevance',
        publishedAfter: this.getRecentDate(),
        videoDuration: 'medium', // 4-20 minutes
        videoDefinition: 'high',
        regionCode: 'CO', // Colombia region
        relevanceLanguage: 'es', // Spanish language
        safeSearch: 'moderate'
      };

      console.log(`🔍 Searching YouTube for: "${searchQuery}"`);
      
      const response = await axios.get(`${this.baseUrl}/search`, {
        params,
        timeout: 8000
      });

      // Get additional video details
      const videoIds = response.data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          key: this.apiKey,
          part: 'snippet,statistics,contentDetails',
          id: videoIds
        },
        timeout: 8000
      });

      // Process and enrich the data
      const processedVideos = this.processVideoData(detailsResponse.data.items);

      const result = {
        videos: processedVideos,
        totalResults: response.data.pageInfo.totalResults,
        query: searchQuery,
        timestamp: new Date().toISOString(),
        cached: false
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: { ...result, cached: true },
        timestamp: Date.now()
      });

      console.log(`✅ Found ${processedVideos.length} Colombian news videos`);
      return result;

    } catch (error) {
      console.error('❌ YouTube API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        throw new Error('YouTube API quota exceeded or invalid API key');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid YouTube API request parameters');
      } else {
        throw new Error(`YouTube API error: ${error.message}`);
      }
    }
  }

  /**
   * Get trending Colombian news videos
   * @param {number} maxResults - Maximum number of results
   * @returns {Promise<Object>} Trending videos
   */
  async getTrendingColombianNews(maxResults = 12) {
    if (this.demoMode) {
      return this.getDemoTrendingResults(maxResults);
    }

    const cacheKey = `trending_${maxResults}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📺 Serving cached trending videos');
      return cached.data;
    }

    try {
      // Get trending videos from Colombia in News category
      const response = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          key: this.apiKey,
          part: 'snippet,statistics,contentDetails',
          chart: 'mostPopular',
          regionCode: 'CO',
          videoCategoryId: '25', // News & Politics category
          maxResults: maxResults,
          relevanceLanguage: 'es'
        },
        timeout: 8000
      });

      // Filter for Colombian news content
      const colombianVideos = response.data.items.filter(video => 
        this.isColombianNewsContent(video.snippet)
      );

      const processedVideos = this.processVideoData(colombianVideos);

      const result = {
        videos: processedVideos,
        totalResults: colombianVideos.length,
        query: 'trending_colombia_news',
        timestamp: new Date().toISOString(),
        cached: false
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: { ...result, cached: true },
        timestamp: Date.now()
      });

      console.log(`✅ Found ${processedVideos.length} trending Colombian news videos`);
      return result;

    } catch (error) {
      console.error('❌ YouTube Trending API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch trending videos: ${error.message}`);
    }
  }

  /**
   * Process raw YouTube video data
   * @param {Array} videos - Raw video data from YouTube API
   * @returns {Array} Processed video data
   */
  processVideoData(videos) {
    return videos.map(video => ({
      id: video.id,
      title: this.cleanTitle(video.snippet.title),
      description: this.truncateDescription(video.snippet.description),
      thumbnail: this.getBestThumbnail(video.snippet.thumbnails),
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      duration: this.parseDuration(video.contentDetails?.duration),
      viewCount: parseInt(video.statistics?.viewCount || 0),
      likeCount: parseInt(video.statistics?.likeCount || 0),
      playUrl: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      isLive: video.snippet.liveBroadcastContent === 'live',
      language: 'es',
      relevanceScore: this.calculateRelevanceScore(video)
    }));
  }

  /**
   * Check if content is Colombian news
   * @param {Object} snippet - Video snippet
   * @returns {boolean} Is Colombian news content
   */
  isColombianNewsContent(snippet) {
    const colombianIndicators = [
      'colombia', 'bogotá', 'medellín', 'cali', 'barranquilla',
      'caracol', 'rcn', 'semana', 'el tiempo', 'duque', 'petro',
      'congreso colombia', 'senado colombia', 'gobierno colombia'
    ];

    const title = snippet.title.toLowerCase();
    const description = snippet.description.toLowerCase();
    const channel = snippet.channelTitle.toLowerCase();

    return colombianIndicators.some(indicator => 
      title.includes(indicator) || 
      description.includes(indicator) || 
      channel.includes(indicator)
    );
  }

  /**
   * Get recent date for filtering videos (last 7 days)
   * @returns {string} ISO date string
   */
  getRecentDate() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString();
  }

  /**
   * Clean video title
   * @param {string} title - Raw title
   * @returns {string} Cleaned title
   */
  cleanTitle(title) {
    return title
      .replace(/[📺🔴⚡🚨]/g, '') // Remove common emoji
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Truncate description
   * @param {string} description - Raw description
   * @returns {string} Truncated description
   */
  truncateDescription(description) {
    if (!description) return '';
    return description.length > 150 
      ? description.substring(0, 150) + '...'
      : description;
  }

  /**
   * Get best quality thumbnail
   * @param {Object} thumbnails - Thumbnail object
   * @returns {Object} Best thumbnail
   */
  getBestThumbnail(thumbnails) {
    // Prefer high quality thumbnails
    return thumbnails.maxres || 
           thumbnails.high || 
           thumbnails.medium || 
           thumbnails.default;
  }

  /**
   * Parse YouTube duration format
   * @param {string} duration - ISO 8601 duration (PT1H30M)
   * @returns {string} Human readable duration
   */
  parseDuration(duration) {
    if (!duration) return '0:00';
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Calculate relevance score for sorting
   * @param {Object} video - Video data
   * @returns {number} Relevance score
   */
  calculateRelevanceScore(video) {
    const viewCount = parseInt(video.statistics?.viewCount || 0);
    const likeCount = parseInt(video.statistics?.likeCount || 0);
    const ageHours = (Date.now() - new Date(video.snippet.publishedAt).getTime()) / (1000 * 60 * 60);
    
    // Favor recent videos with high engagement
    const recencyScore = Math.max(0, 168 - ageHours) / 168; // 168 hours = 1 week
    const engagementScore = (viewCount + likeCount * 10) / 1000;
    
    return recencyScore * 0.3 + engagementScore * 0.7;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 YouTube service cache cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      timeout: this.cacheTimeout
    };
  }

  /**
   * Demo mode: Get sample search results
   * @param {string} query - Search query
   * @param {number} maxResults - Maximum results
   * @returns {Promise<Object>} Demo search results
   */
  async getDemoSearchResults(query = '', maxResults = 12) {
    console.log(`🎬 DEMO MODE: Generating search results for "${query || 'general news'}"`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const demoVideos = this.generateDemoVideos(maxResults, query);

    return {
      videos: demoVideos,
      totalResults: demoVideos.length,
      query: query || 'noticias colombia',
      timestamp: new Date().toISOString(),
      cached: false,
      demoMode: true
    };
  }

  /**
   * Demo mode: Get sample trending results
   * @param {number} maxResults - Maximum results
   * @returns {Promise<Object>} Demo trending results
   */
  async getDemoTrendingResults(maxResults = 12) {
    console.log(`🎬 DEMO MODE: Generating ${maxResults} trending Colombian news videos`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const demoVideos = this.generateDemoVideos(maxResults, 'trending');

    return {
      videos: demoVideos,
      totalResults: demoVideos.length,
      query: 'trending_colombia_news',
      timestamp: new Date().toISOString(),
      cached: false,
      demoMode: true
    };
  }

  /**
   * Generate demo video data
   * @param {number} count - Number of videos
   * @param {string} type - Type of videos
   * @returns {Array} Demo videos
   */
  generateDemoVideos(count, type = '') {
    const demoTitles = [
      'Presidente Gustavo Petro anuncia nuevas reformas económicas',
      'Congreso de Colombia debate la reforma tributaria 2024',
      'Situación de seguridad en Bogotá: informe especial',
      'Elecciones regionales: resultados y análisis',
      'Crisis migratoria en la frontera con Venezuela',
      'Impacto del cambio climático en Colombia',
      'Nuevo acuerdo de paz con grupos armados',
      'Economía colombiana: crecimiento y desafíos',
      'Protestas estudiantiles en universidades públicas',
      'Inversión extranjera en Colombia aumenta',
      'Medellín lidera innovación tecnológica',
      'Caracol Noticias: resumen del día',
      'RCN reporta sobre narcotráfico en el Pacífico',
      'Semana: análisis político de la semana',
      'El Tiempo: noticias de última hora',
      'Noticias Caracol: en vivo desde Cali'
    ];

    const demoChannels = [
      'Caracol Noticias',
      'Noticias RCN',
      'Semana',
      'El Tiempo',
      'Noticias Uno',
      'Canal Capital',
      'City TV',
      'CNC Medellín'
    ];

    const demoDescriptions = [
      'Análisis completo de las últimas decisiones políticas y su impacto en la sociedad colombiana.',
      'Reportaje especial sobre los acontecimientos más relevantes en Colombia.',
      'Cobertura en vivo de los eventos más importantes del día.',
      'Entrevista exclusiva con expertos en política y economía.',
      'Investigación periodística sobre temas de interés nacional.',
      'Últimas noticias y actualizaciones sobre la situación política.',
      'Debate y análisis con especialistas en temas colombianos.',
      'Reportaje desde el lugar de los hechos con testimonios exclusivos.'
    ];

    const videos = [];
    
    for (let i = 0; i < count; i++) {
      const title = demoTitles[i % demoTitles.length];
      const channel = demoChannels[i % demoChannels.length];
      const description = demoDescriptions[i % demoDescriptions.length];
      
      // Generate realistic video data
      const publishedMinutesAgo = Math.floor(Math.random() * 1440); // Last 24 hours
      const publishedAt = new Date(Date.now() - publishedMinutesAgo * 60000).toISOString();
      
      const viewCount = Math.floor(Math.random() * 100000) + 1000;
      const likeCount = Math.floor(viewCount * 0.03); // ~3% like rate
      
      const durationMinutes = Math.floor(Math.random() * 25) + 5; // 5-30 minutes
      const durationSeconds = Math.floor(Math.random() * 60);
      const duration = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
      
      const videoId = `demo_${Date.now()}_${i}`;
      
      videos.push({
        id: videoId,
        title: title,
        description: description,
        thumbnail: {
          url: `https://via.placeholder.com/320x180/0066cc/ffffff?text=${encodeURIComponent(channel)}`,
          width: 320,
          height: 180
        },
        channelTitle: channel,
        publishedAt: publishedAt,
        duration: duration,
        viewCount: viewCount,
        likeCount: likeCount,
        playUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        isLive: Math.random() < 0.1, // 10% chance of being live
        language: 'es',
        relevanceScore: Math.random() * 100
      });
    }

    // Sort by relevance score (highest first)
    videos.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return videos;
  }
}

export default new YouTubeService();