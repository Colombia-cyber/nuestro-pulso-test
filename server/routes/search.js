import express from 'express';
import SearchAggregator from '../services/SearchAggregator.js';
import ColombiaSearchService from '../services/ColombiaSearchService.js';
import GlobalSearchService from '../services/GlobalSearchService.js';

const router = express.Router();
const searchAggregator = new SearchAggregator();
const colombiaSearch = new ColombiaSearchService();
const globalSearch = new GlobalSearchService();

// Colombia search endpoint: GET /api/search/colombia?q=query&page=1&limit=12
router.get('/colombia', async (req, res) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 12,
      location = 'colombia'
    } = req.query;

    // Validate query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query parameter "q" is required',
        example: '/api/search/colombia?q=alcalde%20bogota'
      });
    }

    // Validate and sanitize parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 12));

    // Log search request
    console.log(`🇨🇴 Colombia search request: "${query}" (page: ${pageNum}, limit: ${limitNum})`);

    // Perform Colombia search
    const startTime = Date.now();
    const results = await colombiaSearch.search({
      query: query.trim(),
      page: pageNum,
      limit: limitNum,
      location
    });

    const searchTime = Date.now() - startTime;

    // Add request metadata
    const response = {
      ...results,
      searchTime,
      requestId: `colombia_req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Colombia search API error:', error);
    res.status(500).json({
      error: 'Colombia search failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Global search endpoint: GET /api/search/global?q=query&page=1&limit=12
router.get('/global', async (req, res) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 10,
      scope = 'global'
    } = req.query;

    // Validate query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query parameter "q" is required',
        example: '/api/search/global?q=world%20politics'
      });
    }

    // Validate and sanitize parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(30, Math.max(1, parseInt(limit) || 10));

    // Log search request
    console.log(`🌍 Global search request: "${query}" (page: ${pageNum}, limit: ${limitNum})`);

    // Perform global search
    const startTime = Date.now();
    const results = await globalSearch.search({
      query: query.trim(),
      page: pageNum,
      limit: limitNum,
      scope
    });

    const searchTime = Date.now() - startTime;

    // Add request metadata
    const response = {
      ...results,
      searchTime,
      requestId: `global_req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Global search API error:', error);
    res.status(500).json({
      error: 'Global search failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Main search endpoint: GET /api/search?q=query&page=1&limit=12&category=&sort=relevance
router.get('/', async (req, res) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 12,
      category,
      sort = 'relevance'
    } = req.query;

    // Validate query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query parameter "q" is required',
        example: '/api/search?q=colombia%20politica'
      });
    }

    // Validate and sanitize parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 12)); // Cap at 50 results per page
    const sortBy = ['relevance', 'date', 'category'].includes(sort) ? sort : 'relevance';

    // Log search request
    console.log(`🔍 Search request: "${query}" (page: ${pageNum}, limit: ${limitNum}, category: ${category || 'all'}, sort: ${sortBy})`);

    // Perform search
    const startTime = Date.now();
    const results = await searchAggregator.search({
      query: query.trim(),
      page: pageNum,
      limit: limitNum,
      category: category && category !== 'todos' ? category : undefined,
      sortBy
    });

    const searchTime = Date.now() - startTime;

    // Add request metadata
    const response = {
      ...results,
      searchTime,
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Search suggestions endpoint
router.get('/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.json([]);
    }

    const suggestions = await searchAggregator.getSuggestions(query.trim());
    res.json(suggestions);
  } catch (error) {
    console.error('Suggestions API error:', error);
    res.status(500).json({
      error: 'Failed to get suggestions',
      message: error.message
    });
  }
});

// Colombia search suggestions endpoint
router.get('/colombia/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.json([]);
    }

    const suggestions = await colombiaSearch.getSuggestions(query.trim());
    res.json(suggestions);
  } catch (error) {
    console.error('Colombia suggestions API error:', error);
    res.status(500).json({
      error: 'Failed to get Colombia suggestions',
      message: error.message
    });
  }
});

// Global search suggestions endpoint
router.get('/global/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.json([]);
    }

    const suggestions = await globalSearch.getSuggestions(query.trim());
    res.json(suggestions);
  } catch (error) {
    console.error('Global suggestions API error:', error);
    res.status(500).json({
      error: 'Failed to get global suggestions',
      message: error.message
    });
  }
});

// Popular queries endpoint
router.get('/popular', async (req, res) => {
  try {
    const popularQueries = await searchAggregator.getPopularQueries();
    res.json(popularQueries);
  } catch (error) {
    console.error('Popular queries API error:', error);
    res.status(500).json({
      error: 'Failed to get popular queries',
      message: error.message
    });
  }
});

export default router;