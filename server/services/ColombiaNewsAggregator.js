import RSSParser from 'rss-parser';
import axios from 'axios';

class ColombiaNewsAggregator {
  constructor() {
    this.parser = new RSSParser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NuestroPulsoBot/1.0)',
      },
      timeout: 10000,
    });

    // News sources configuration
    this.sources = {
      'latin-times': {
        name: 'Latin Times',
        url: 'https://www.latintimes.com/feeds/colombia',
        icon: '🌎',
        rss: true,
        category: 'international'
      },
      'city-paper-bogota': {
        name: 'The City Paper Bogotá',
        url: 'https://thecitypaperbogota.com/feed/',
        icon: '📰',
        rss: true,
        category: 'local'
      },
      'ap-news': {
        name: 'AP News',
        url: 'https://feeds.apnews.com/rss/topics/colombia',
        icon: '🔴',
        rss: true,
        category: 'international'
      },
      'al-jazeera': {
        name: 'Al Jazeera',
        url: 'https://www.aljazeera.com/xml/rss/all.xml',
        icon: '📺',
        rss: true,
        category: 'international',
        filter: 'colombia'
      },
      'bbc': {
        name: 'BBC',
        url: 'https://feeds.bbci.co.uk/mundo/rss.xml',
        icon: '🇬🇧',
        rss: true,
        category: 'international',
        filter: 'colombia'
      },
      'google-news': {
        name: 'Google News',
        url: 'https://news.google.com/rss/search?q=Colombia&hl=es&gl=CO&ceid=CO:es-419',
        icon: '🔍',
        rss: true,
        category: 'aggregated'
      },
      'colombia-one': {
        name: 'ColombiaOne',
        url: 'https://www.colombia-one.com/feed/',
        icon: '🇨🇴',
        rss: true,
        category: 'local'
      },
      'colombia-reports': {
        name: 'Colombia Reports',
        url: 'https://colombiareports.com/feed/',
        icon: '📊',
        rss: true,
        category: 'local'
      }
    };

    this.cache = new Map();
    this.cacheTimeout = 15 * 60 * 1000; // 15 minutes
    this.lastUpdate = null;
  }

  /**
   * Get all latest Colombia news from configured sources
   */
  async getLatestNews(options = {}) {
    const { limit = 50, category, sources, maxAge = this.cacheTimeout } = options;
    
    try {
      // Check cache first
      const cacheKey = `news_${category || 'all'}_${sources ? sources.join(',') : 'all'}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp) < maxAge) {
        return {
          ...cached.data,
          cached: true,
          cacheAge: Date.now() - cached.timestamp
        };
      }

      // Determine which sources to fetch
      const sourcesToFetch = sources ? 
        Object.entries(this.sources).filter(([key]) => sources.includes(key)) :
        Object.entries(this.sources);

      // Fetch from all sources in parallel
      const sourcePromises = sourcesToFetch.map(([key, config]) => 
        this.fetchFromSource(key, config)
      );

      const results = await Promise.allSettled(sourcePromises);
      
      // Combine and process results
      let allArticles = [];
      let sourceStats = {};

      results.forEach((result, index) => {
        const [sourceKey] = sourcesToFetch[index];
        
        if (result.status === 'fulfilled' && result.value.articles) {
          allArticles = allArticles.concat(result.value.articles);
          sourceStats[sourceKey] = {
            count: result.value.articles.length,
            status: 'success',
            lastFetch: new Date().toISOString()
          };
        } else {
          console.warn(`Source ${sourceKey} failed:`, result.reason?.message);
          sourceStats[sourceKey] = {
            count: 0,
            status: 'error',
            error: result.reason?.message || 'Unknown error',
            lastFetch: new Date().toISOString()
          };
        }
      });

      // Filter by category if specified
      if (category && category !== 'all') {
        allArticles = allArticles.filter(article => 
          article.category === category || 
          article.tags?.includes(category)
        );
      }

      // Sort by date (newest first)
      allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      // Remove duplicates and limit results
      const uniqueArticles = this.deduplicateArticles(allArticles);
      const limitedArticles = uniqueArticles.slice(0, limit);

      const response = {
        articles: limitedArticles,
        totalCount: uniqueArticles.length,
        sourceStats,
        lastUpdate: new Date().toISOString(),
        categories: this.extractCategories(uniqueArticles),
        cached: false
      };

      // Cache the results
      this.cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });

      return response;

    } catch (error) {
      console.error('Failed to aggregate news:', error);
      throw new Error(`News aggregation failed: ${error.message}`);
    }
  }

  /**
   * Fetch news from a single source
   */
  async fetchFromSource(sourceKey, config) {
    try {
      if (config.rss) {
        return await this.fetchRSS(sourceKey, config);
      } else {
        return await this.fetchAPI(sourceKey, config);
      }
    } catch (error) {
      console.error(`Error fetching from ${sourceKey}:`, error.message);
      return { articles: [], error: error.message };
    }
  }

  /**
   * Fetch from RSS feed
   */
  async fetchRSS(sourceKey, config) {
    try {
      const feed = await this.parser.parseURL(config.url);
      
      let articles = feed.items.map(item => ({
        id: this.generateId(sourceKey, item.link || item.guid),
        title: this.cleanTitle(item.title),
        summary: this.cleanSummary(item.contentSnippet || item.summary || ''),
        content: item.content || item.description || '',
        url: item.link,
        publishedAt: item.pubDate || item.isoDate,
        source: {
          id: sourceKey,
          name: config.name,
          icon: config.icon,
          category: config.category
        },
        author: item.author || item.creator,
        category: config.category,
        tags: this.extractTags(item),
        imageUrl: this.extractImage(item),
        language: 'es'
      }));

      // Apply source-specific filtering
      if (config.filter) {
        articles = articles.filter(article => 
          this.matchesFilter(article, config.filter)
        );
      }

      return { articles };

    } catch (error) {
      console.error(`RSS fetch failed for ${sourceKey}:`, error.message);
      return { articles: [], error: error.message };
    }
  }

  /**
   * Fetch from API endpoint (for sources that have APIs)
   */
  async fetchAPI(sourceKey, config) {
    try {
      const response = await axios.get(config.url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NuestroPulsoBot/1.0)',
          ...config.headers
        }
      });

      // Process API response based on source format
      const articles = this.processAPIResponse(sourceKey, config, response.data);
      
      return { articles };

    } catch (error) {
      console.error(`API fetch failed for ${sourceKey}:`, error.message);
      return { articles: [], error: error.message };
    }
  }

  /**
   * Process API response based on source
   */
  processAPIResponse(sourceKey, config, data) {
    // This would be customized for each API source
    // For now, return empty array as most sources use RSS
    return [];
  }

  /**
   * Check if article matches filter criteria
   */
  matchesFilter(article, filter) {
    const searchText = `${article.title} ${article.summary} ${article.content}`.toLowerCase();
    const filterTerms = filter.toLowerCase().split(' ');
    
    return filterTerms.some(term => searchText.includes(term));
  }

  /**
   * Remove duplicate articles based on title similarity and URL
   */
  deduplicateArticles(articles) {
    const seen = new Set();
    const deduplicated = [];

    for (const article of articles) {
      const normalizedTitle = this.normalizeTitle(article.title);
      const key = article.url || normalizedTitle;
      
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(article);
      }
    }

    return deduplicated;
  }

  /**
   * Normalize title for deduplication
   */
  normalizeTitle(title) {
    return title.toLowerCase()
      .replace(/[^\w\sñáéíóúü]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 100);
  }

  /**
   * Generate unique ID for article
   */
  generateId(sourceKey, url) {
    const base = url || `${sourceKey}_${Date.now()}_${Math.random()}`;
    return Buffer.from(base).toString('base64').substring(0, 16);
  }

  /**
   * Clean article title
   */
  cleanTitle(title) {
    return title
      .replace(/\s+/g, ' ')
      .replace(/\n/g, ' ')
      .trim()
      .substring(0, 200);
  }

  /**
   * Clean article summary
   */
  cleanSummary(summary) {
    return summary
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')
      .replace(/\n/g, ' ')
      .trim()
      .substring(0, 300);
  }

  /**
   * Extract tags from RSS item
   */
  extractTags(item) {
    const tags = [];
    
    if (item.categories) {
      tags.push(...item.categories);
    }
    
    // Add Colombia-related tags
    const text = `${item.title} ${item.contentSnippet || ''}`.toLowerCase();
    if (text.includes('colombia')) tags.push('colombia');
    if (text.includes('bogotá') || text.includes('bogota')) tags.push('bogotá');
    if (text.includes('medellín') || text.includes('medellin')) tags.push('medellín');
    if (text.includes('política')) tags.push('política');
    if (text.includes('economía')) tags.push('economía');
    
    return [...new Set(tags)];
  }

  /**
   * Extract image from RSS item
   */
  extractImage(item) {
    // Try multiple possible image sources
    if (item.enclosure && item.enclosure.type?.startsWith('image/')) {
      return item.enclosure.url;
    }
    
    if (item['media:content']) {
      return item['media:content'].$.url;
    }
    
    if (item['media:thumbnail']) {
      return item['media:thumbnail'].$.url;
    }
    
    // Try to extract from content
    const content = item.content || item.description || '';
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }
    
    return null;
  }

  /**
   * Extract unique categories from articles
   */
  extractCategories(articles) {
    const categories = new Set();
    
    articles.forEach(article => {
      if (article.category) {
        categories.add(article.category);
      }
      if (article.tags) {
        article.tags.forEach(tag => categories.add(tag));
      }
    });
    
    return Array.from(categories);
  }

  /**
   * Get trending articles based on recency and source diversity
   */
  getTrendingArticles(articles, limit = 10) {
    // Score articles based on recency and source diversity
    const now = Date.now();
    const scoredArticles = articles.map(article => {
      const ageHours = (now - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
      const recencyScore = Math.max(0, 24 - ageHours) / 24; // Higher score for newer articles
      const sourceScore = article.source.category === 'local' ? 1.2 : 1.0; // Boost local sources
      
      return {
        ...article,
        trendingScore: recencyScore * sourceScore
      };
    });

    return scoredArticles
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit);
  }

  /**
   * Search articles by query
   */
  searchArticles(articles, query) {
    const normalizedQuery = query.toLowerCase();
    const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 2);
    
    return articles.filter(article => {
      const searchText = `${article.title} ${article.summary} ${article.tags?.join(' ') || ''}`.toLowerCase();
      
      return queryTerms.some(term => searchText.includes(term));
    }).sort((a, b) => {
      // Score by relevance (number of matching terms)
      const scoreA = queryTerms.filter(term => 
        `${a.title} ${a.summary}`.toLowerCase().includes(term)
      ).length;
      const scoreB = queryTerms.filter(term => 
        `${b.title} ${b.summary}`.toLowerCase().includes(term)
      ).length;
      
      return scoreB - scoreA;
    });
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      totalMemory: JSON.stringify(Array.from(this.cache.values())).length
    };
  }
}

export default ColombiaNewsAggregator;