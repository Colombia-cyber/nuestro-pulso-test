import express from 'express';
import youtubeService from '../services/youtubeService.js';

const router = express.Router();

/**
 * @route GET /api/news-videos
 * @desc Get Colombian news videos from YouTube
 * @query {string} q - Search query (optional)
 * @query {number} limit - Maximum results (default 12, max 24)
 * @query {string} type - Type: 'search' or 'trending' (default 'search')
 */
router.get('/', async (req, res) => {
  try {
    const { q: query = '', limit = 12, type = 'search' } = req.query;
    
    // Validate parameters
    const maxResults = Math.min(parseInt(limit) || 12, 24);
    
    console.log(`🎥 News videos request: type=${type}, query="${query}", limit=${maxResults}`);

    let result;
    
    if (type === 'trending') {
      result = await youtubeService.getTrendingColombianNews(maxResults);
    } else {
      result = await youtubeService.searchColombianNews(query, maxResults);
    }

    // Add request metadata
    const response = {
      ...result,
      requestTime: new Date().toISOString(),
      requestType: type,
      limit: maxResults
    };

    res.json(response);

  } catch (error) {
    console.error('❌ News videos API error:', error.message);
    
    // Handle specific YouTube API errors
    if (error.message.includes('quota exceeded')) {
      return res.status(429).json({
        error: 'API quota exceeded',
        message: 'YouTube API quota has been exceeded. Please try again later.',
        retryAfter: 3600 // 1 hour
      });
    }
    
    if (error.message.includes('invalid API key')) {
      return res.status(401).json({
        error: 'Invalid API configuration',
        message: 'YouTube API key is invalid or not configured properly.'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch news videos',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route GET /api/news-videos/trending
 * @desc Get trending Colombian news videos
 * @query {number} limit - Maximum results (default 12, max 24)
 */
router.get('/trending', async (req, res) => {
  try {
    const { limit = 12 } = req.query;
    const maxResults = Math.min(parseInt(limit) || 12, 24);
    
    console.log(`📈 Trending news videos request: limit=${maxResults}`);

    const result = await youtubeService.getTrendingColombianNews(maxResults);
    
    const response = {
      ...result,
      requestTime: new Date().toISOString(),
      requestType: 'trending',
      limit: maxResults
    };

    res.json(response);

  } catch (error) {
    console.error('❌ Trending videos API error:', error.message);
    
    res.status(500).json({
      error: 'Failed to fetch trending videos',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route POST /api/news-videos/cache/clear
 * @desc Clear YouTube service cache (admin endpoint)
 */
router.post('/cache/clear', (req, res) => {
  try {
    youtubeService.clearCache();
    res.json({
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message
    });
  }
});

/**
 * @route GET /api/news-videos/cache/stats
 * @desc Get cache statistics
 */
router.get('/cache/stats', (req, res) => {
  try {
    const stats = youtubeService.getCacheStats();
    res.json({
      ...stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get cache stats',
      message: error.message
    });
  }
});

/**
 * @route GET /api/news-videos/health
 * @desc Health check for YouTube service
 */
router.get('/health', (req, res) => {
  const hasApiKey = !!process.env.YOUTUBE_API_KEY;
  const cacheStats = youtubeService.getCacheStats();
  
  res.json({
    status: hasApiKey ? 'ready' : 'configuration_required',
    apiKeyConfigured: hasApiKey,
    cache: cacheStats,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;