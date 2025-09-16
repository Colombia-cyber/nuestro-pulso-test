import NewsProvider from '../providers/NewsProvider.js';
import SocialMediaProvider from '../providers/SocialMediaProvider.js';
import GovernmentProvider from '../providers/GovernmentProvider.js';
import WikiProvider from '../providers/WikiProvider.js';
import GoogleSearchProvider from '../providers/GoogleSearchProvider.js';
import YouTubeProvider from '../providers/YouTubeProvider.js';
import BingNewsProvider from '../providers/BingNewsProvider.js';

class SearchAggregator {
  constructor() {
    this.providers = {
      news: new NewsProvider(),
      social: new SocialMediaProvider(),
      government: new GovernmentProvider(),
      wiki: new WikiProvider(),
      google_search: new GoogleSearchProvider(),
      youtube: new YouTubeProvider(),
      bing_news: new BingNewsProvider()
    };

    // Configuration
    this.maxResultsPerProvider = 50;
    this.defaultTimeout = 5000; // 5 seconds
    this.maxTotalResults = 2000; // Respect the paging cap from frontend
    this.prioritizeColombianContent = process.env.REACT_APP_PRIORITIZE_COLOMBIAN_NEWS !== 'false';
  }

  /**
   * Main search method that aggregates results from multiple providers
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {number} options.page - Page number (1-based)
   * @param {number} options.limit - Results per page
   * @param {string} options.category - Category filter
   * @param {string} options.sortBy - Sort method (relevance, date, category)
   * @param {string} options.language - Language preference (es/en)
   * @param {string} options.region - Region preference (colombia/latam/world)
   * @returns {Promise<Object>} Search response
   */
  async search(options) {
    const { 
      query, 
      page = 1, 
      limit = 12, 
      category, 
      sortBy = 'relevance',
      language = 'es',
      region = 'colombia'
    } = options;

    try {
      // Enhanced provider options with region and language
      const providerOptions = {
        query,
        category,
        maxResults: this.maxResultsPerProvider,
        language,
        region
      };

      // Get all provider results in parallel
      const providerPromises = Object.entries(this.providers).map(([name, provider]) => 
        this.searchProvider(provider, name, providerOptions)
      );

      // Wait for all providers with timeout
      const providerResults = await Promise.allSettled(providerPromises);

      // Combine and process results
      let allResults = [];
      let providerStats = {};

      providerResults.forEach((result, index) => {
        const providerName = Object.keys(this.providers)[index];
        
        if (result.status === 'fulfilled' && result.value.results) {
          allResults = allResults.concat(result.value.results);
          providerStats[providerName] = {
            count: result.value.results.length,
            status: 'success',
            responseTime: result.value.responseTime || 0
          };
        } else {
          console.warn(`Provider ${providerName} failed:`, result.reason?.message || 'Unknown error');
          providerStats[providerName] = {
            count: 0,
            status: 'error',
            error: result.reason?.message || 'Unknown error'
          };
        }
      });

      // Apply category filter
      if (category && category !== 'todos') {
        allResults = allResults.filter(result => 
          result.category && result.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Remove duplicates based on URL or title similarity
      allResults = this.deduplicateResults(allResults);

      // Apply Colombian prioritization if enabled
      if (this.prioritizeColombianContent && region === 'colombia') {
        allResults = this.prioritizeColombianResults(allResults);
      } else {
        // Sort results normally
        allResults = this.sortResults(allResults, sortBy);
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = allResults.slice(startIndex, endIndex);

      // Calculate pagination info
      const totalResults = Math.min(allResults.length, this.maxTotalResults);
      const totalPages = Math.ceil(totalResults / limit);
      const hasMore = page < totalPages;

      return {
        query,
        results: paginatedResults,
        totalResults,
        page,
        totalPages,
        hasMore,
        source: 'aggregator',
        providerStats,
        metadata: {
          deduplicatedFrom: allResults.length,
          categories: this.extractCategories(allResults),
          queryTerms: this.extractQueryTerms(query),
          language,
          region,
          prioritizedColombian: this.prioritizeColombianContent && region === 'colombia'
        }
      };

    } catch (error) {
      console.error('Search aggregation failed:', error);
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  /**
   * Search a single provider with timeout and error handling
   */
  async searchProvider(provider, name, options) {
    const startTime = Date.now();
    
    try {
      const results = await Promise.race([
        provider.search(options),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Provider timeout')), this.defaultTimeout)
        )
      ]);

      const responseTime = Date.now() - startTime;
      
      return {
        results: results || [],
        responseTime,
        provider: name
      };
    } catch (error) {
      console.warn(`Provider ${name} failed:`, error.message);
      return {
        results: [],
        responseTime: Date.now() - startTime,
        provider: name,
        error: error.message
      };
    }
  }

  /**
   * Remove duplicate results based on URL and title similarity
   */
  deduplicateResults(results) {
    const seen = new Set();
    const deduplicated = [];

    for (const result of results) {
      // Create a unique key based on URL or title
      const key = result.url || this.normalizeTitle(result.title);
      
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(result);
      }
    }

    return deduplicated;
  }

  /**
   * Normalize title for deduplication
   */
  normalizeTitle(title) {
    return title.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Prioritize Colombian content in search results
   */
  prioritizeColombianResults(results) {
    // Separate results by region and priority
    const priorityColombianResults = results.filter(r => 
      r.region === 'colombia' && (r.relevanceScore >= 85 || r.isPriorityChannel)
    );
    const colombianResults = results.filter(r => 
      r.region === 'colombia' && r.relevanceScore < 85 && !r.isPriorityChannel
    );
    const latinResults = results.filter(r => r.region === 'latam');
    const internationalResults = results.filter(r => 
      r.region === 'international' || (!r.region && r.provider !== 'youtube')
    );
    
    // Sort each group by relevance score
    priorityColombianResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    colombianResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    latinResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    internationalResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Return in priority order: Colombian priority, Colombian regular, Latin American, International
    return [
      ...priorityColombianResults, 
      ...colombianResults, 
      ...latinResults, 
      ...internationalResults
    ];
  }

  /**
   * Sort results by different criteria
   */
  sortResults(results, sortBy) {
    const sortedResults = [...results];
    
    switch (sortBy) {
      case 'date':
        return sortedResults.sort((a, b) => 
          new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
        );
      
      case 'category':
        return sortedResults.sort((a, b) => {
          const categoryA = a.category || 'zzz';
          const categoryB = b.category || 'zzz';
          return categoryA.localeCompare(categoryB);
        });
      
      case 'relevance':
      default:
        return sortedResults.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }
  }

  /**
   * Extract unique categories from results
   */
  extractCategories(results) {
    const categories = new Set();
    results.forEach(result => {
      if (result.category) {
        categories.add(result.category);
      }
    });
    return Array.from(categories);
  }

  /**
   * Extract query terms for analysis
   */
  extractQueryTerms(query) {
    return query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 2)
      .slice(0, 10); // Limit to 10 terms
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query) {
    try {
      // Get suggestions from all providers
      const suggestionPromises = Object.values(this.providers).map(provider => 
        provider.getSuggestions ? provider.getSuggestions(query) : Promise.resolve([])
      );

      const allSuggestions = await Promise.allSettled(suggestionPromises);
      
      // Flatten and deduplicate suggestions
      let suggestions = [];
      allSuggestions.forEach(result => {
        if (result.status === 'fulfilled' && Array.isArray(result.value)) {
          suggestions = suggestions.concat(result.value);
        }
      });

      // Remove duplicates and limit results
      const uniqueSuggestions = [...new Set(suggestions)]
        .filter(suggestion => suggestion && suggestion.length > 0)
        .slice(0, 8);

      return uniqueSuggestions;
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      return []; // Return empty array on error
    }
  }

  /**
   * Get popular queries
   */
  async getPopularQueries() {
    try {
      // This could be enhanced to track actual popular searches
      return [
        'Gustavo Petro',
        'Centro Democrático',
        'Reforma pensional',
        'Elecciones regionales',
        'Congreso Colombia',
        'Participación ciudadana',
        'Seguridad fronteras',
        'Reforma tributaria'
      ];
    } catch (error) {
      console.error('Failed to get popular queries:', error);
      return [];
    }
  }
}

export default SearchAggregator;