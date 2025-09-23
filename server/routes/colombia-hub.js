import express from 'express';
import ColombiaNewsAggregator from '../services/ColombiaNewsAggregator.js';
import YouTubeIntegrationService from '../services/YouTubeIntegrationService.js';

const router = express.Router();
const newsAggregator = new ColombiaNewsAggregator();
const youtubeService = new YouTubeIntegrationService();

/**
 * GET /api/colombia-hub/news
 * Get latest Colombia news from all sources
 */
router.get('/news', async (req, res) => {
  try {
    const {
      limit = 50,
      category,
      sources,
      search,
      trending = false
    } = req.query;

    let sourcesArray = null;
    if (sources) {
      sourcesArray = Array.isArray(sources) ? sources : sources.split(',');
    }

    const result = await newsAggregator.getLatestNews({
      limit: parseInt(limit),
      category,
      sources: sourcesArray
    });

    // If search query provided, filter results
    if (search) {
      result.articles = newsAggregator.searchArticles(result.articles, search);
    }

    // If trending requested, get trending articles
    if (trending === 'true') {
      result.articles = newsAggregator.getTrendingArticles(result.articles, parseInt(limit));
    }

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: error.message
    });
  }
});

/**
 * GET /api/colombia-hub/videos
 * Get Colombia-focused YouTube videos
 */
router.get('/videos', async (req, res) => {
  try {
    const {
      categories,
      search,
      trending = false,
      limit = 20
    } = req.query;

    let categoriesArray = ['news', 'culture', 'travel', 'food'];
    if (categories) {
      categoriesArray = Array.isArray(categories) ? categories : categories.split(',');
    }

    let result;

    if (search) {
      // Search for specific videos
      result = await youtubeService.searchVideos(search, {
        maxResults: parseInt(limit)
      });
    } else if (trending === 'true') {
      // Get trending videos
      const trendingVideos = await youtubeService.getTrendingVideos(parseInt(limit));
      result = {
        videos: trendingVideos,
        totalCount: trendingVideos.length,
        cached: false
      };
    } else {
      // Get videos by categories
      result = await youtubeService.getColombiaVideos({
        categories: categoriesArray
      });
      
      // Limit results if specified
      if (limit && result.videos) {
        result.videos = result.videos.slice(0, parseInt(limit));
      }
    }

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Videos API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch videos',
      message: error.message
    });
  }
});

/**
 * GET /api/colombia-hub/combined
 * Get combined news and videos for the main hub
 */
router.get('/combined', async (req, res) => {
  try {
    const {
      newsLimit = 20,
      videoLimit = 12,
      category,
      search
    } = req.query;

    // Fetch news and videos in parallel
    const [newsResult, videosResult] = await Promise.allSettled([
      newsAggregator.getLatestNews({
        limit: parseInt(newsLimit),
        category
      }),
      youtubeService.getColombiaVideos({
        categories: ['news', 'culture', 'travel', 'food']
      })
    ]);

    const response = {
      news: {
        articles: [],
        totalCount: 0,
        error: null
      },
      videos: {
        videos: [],
        totalCount: 0,
        error: null
      }
    };

    // Process news results
    if (newsResult.status === 'fulfilled') {
      response.news = newsResult.value;
      
      // Apply search filter if provided
      if (search) {
        response.news.articles = newsAggregator.searchArticles(
          response.news.articles, 
          search
        );
      }
    } else {
      response.news.error = newsResult.reason?.message || 'Failed to fetch news';
    }

    // Process videos results
    if (videosResult.status === 'fulfilled') {
      response.videos = videosResult.value;
      response.videos.videos = response.videos.videos.slice(0, parseInt(videoLimit));
      
      // Apply search filter if provided
      if (search) {
        const searchLower = search.toLowerCase();
        response.videos.videos = response.videos.videos.filter(video =>
          video.title.toLowerCase().includes(searchLower) ||
          video.description.toLowerCase().includes(searchLower)
        );
      }
    } else {
      response.videos.error = videosResult.reason?.message || 'Failed to fetch videos';
    }

    // Get trending content
    if (response.news.articles.length > 0) {
      response.trending = {
        news: newsAggregator.getTrendingArticles(response.news.articles, 5),
        videos: response.videos.videos.slice(0, 5)
      };
    }

    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Combined API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content',
      message: error.message
    });
  }
});

/**
 * GET /api/colombia-hub/sources
 * Get available news sources
 */
router.get('/sources', async (req, res) => {
  try {
    const sources = Object.entries(newsAggregator.sources).map(([key, config]) => ({
      id: key,
      name: config.name,
      icon: config.icon,
      category: config.category,
      rss: config.rss,
      active: true
    }));

    res.json({
      success: true,
      data: {
        sources,
        totalCount: sources.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Sources API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sources',
      message: error.message
    });
  }
});

/**
 * GET /api/colombia-hub/categories
 * Get available content categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      {
        id: 'all',
        name: 'Todas las categorías',
        icon: '📰',
        count: 0
      },
      {
        id: 'news',
        name: 'Noticias',
        icon: '📺',
        count: 0
      },
      {
        id: 'politics',
        name: 'Política',
        icon: '🏛️',
        count: 0
      },
      {
        id: 'economy',
        name: 'Economía',
        icon: '💰',
        count: 0
      },
      {
        id: 'culture',
        name: 'Cultura',
        icon: '🎭',
        count: 0
      },
      {
        id: 'travel',
        name: 'Viajes',
        icon: '✈️',
        count: 0
      },
      {
        id: 'food',
        name: 'Gastronomía',
        icon: '🍽️',
        count: 0
      },
      {
        id: 'sports',
        name: 'Deportes',
        icon: '⚽',
        count: 0
      },
      {
        id: 'international',
        name: 'Internacional',
        icon: '🌍',
        count: 0
      },
      {
        id: 'local',
        name: 'Nacional',
        icon: '🇨🇴',
        count: 0
      }
    ];

    res.json({
      success: true,
      data: {
        categories,
        totalCount: categories.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Categories API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

/**
 * POST /api/colombia-hub/refresh
 * Force refresh cache for all content
 */
router.post('/refresh', async (req, res) => {
  try {
    // Clear caches
    newsAggregator.clearCache();
    youtubeService.clearCache();

    // Force refresh news and videos
    const [newsResult, videosResult] = await Promise.allSettled([
      newsAggregator.getLatestNews({ limit: 50 }),
      youtubeService.getColombiaVideos({ forceRefresh: true })
    ]);

    const response = {
      news: newsResult.status === 'fulfilled' ? 'refreshed' : 'failed',
      videos: videosResult.status === 'fulfilled' ? 'refreshed' : 'failed',
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: response,
      message: 'Content refresh initiated'
    });

  } catch (error) {
    console.error('Refresh API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh content',
      message: error.message
    });
  }
});

/**
 * GET /api/colombia-hub/stats
 * Get hub statistics and cache information
 */
router.get('/stats', async (req, res) => {
  try {
    const newsStats = newsAggregator.getCacheStats();
    const videoStats = youtubeService.getCacheStats();

    const stats = {
      news: {
        cache: newsStats,
        sources: Object.keys(newsAggregator.sources).length
      },
      videos: {
        cache: videoStats,
        apiKey: videoStats.hasApiKey ? 'configured' : 'missing'
      },
      lastUpdate: new Date().toISOString()
    };

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats',
      message: error.message
    });
  }
});

export default router;