import express from 'express';
import axios from 'axios';

const router = express.Router();

// Helper function to format Google Custom Search results
const formatGoogleResults = (items) => {
  return items.map(item => ({
    title: item.title,
    description: item.snippet,
    source: item.displayLink,
    url: item.link,
    image: item.pagemap?.cse_image?.[0]?.src || item.pagemap?.cse_thumbnail?.[0]?.src || null,
    publishedDate: null, // Google Custom Search doesn't provide publication date
    provider: 'Google Search'
  }));
};

// Helper function to format NewsAPI results
const formatNewsApiResults = (articles) => {
  return articles.map(article => ({
    title: article.title,
    description: article.description,
    source: article.source.name,
    url: article.url,
    image: article.urlToImage,
    publishedDate: article.publishedAt,
    provider: 'NewsAPI'
  }));
};

// Main news feed endpoint: GET /api/news-feed?q=query
router.get('/', async (req, res) => {
  try {
    const { q: query = 'Colombia news' } = req.query;
    
    console.log(`📰 News feed request for: "${query}"`);
    
    // Check for required environment variables
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleCseId = process.env.GOOGLE_CSE_ID;
    const newsApiKey = process.env.NEWSAPI_KEY;
    
    if (!googleApiKey || !googleCseId || !newsApiKey) {
      return res.status(500).json({
        error: 'API configuration missing',
        message: 'Required API keys (GOOGLE_API_KEY, GOOGLE_CSE_ID, NEWSAPI_KEY) are not configured in environment variables.',
        missingKeys: {
          googleApiKey: !googleApiKey,
          googleCseId: !googleCseId,
          newsApiKey: !newsApiKey
        }
      });
    }

    const promises = [];
    const results = {
      google: [],
      newsapi: [],
      errors: []
    };

    // Google Custom Search API request
    promises.push(
      axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: googleApiKey,
          cx: googleCseId,
          q: query,
          num: 10
        },
        timeout: 5000
      }).then(response => {
        if (response.data.items) {
          results.google = formatGoogleResults(response.data.items);
        }
      }).catch(error => {
        console.error('Google Custom Search error:', error.response?.data || error.message);
        results.errors.push({
          provider: 'Google Search',
          error: error.response?.data?.error?.message || error.message
        });
      })
    );

    // NewsAPI request
    promises.push(
      axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query,
          pageSize: 10,
          sortBy: 'publishedAt',
          language: 'en'
        },
        headers: {
          'X-API-Key': newsApiKey
        },
        timeout: 5000
      }).then(response => {
        if (response.data.articles) {
          results.newsapi = formatNewsApiResults(response.data.articles);
        }
      }).catch(error => {
        console.error('NewsAPI error:', error.response?.data || error.message);
        results.errors.push({
          provider: 'NewsAPI',
          error: error.response?.data?.message || error.message
        });
      })
    );

    // Wait for all requests to complete
    await Promise.all(promises);

    // Merge and shuffle results
    const mergedResults = [...results.google, ...results.newsapi];
    
    // Simple shuffle algorithm
    for (let i = mergedResults.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mergedResults[i], mergedResults[j]] = [mergedResults[j], mergedResults[i]];
    }

    const response = {
      articles: mergedResults,
      totalResults: mergedResults.length,
      query,
      sources: {
        google: results.google.length,
        newsapi: results.newsapi.length
      },
      errors: results.errors,
      timestamp: new Date().toISOString()
    };

    console.log(`📰 News feed response: ${mergedResults.length} articles (Google: ${results.google.length}, NewsAPI: ${results.newsapi.length})`);
    
    res.json(response);
  } catch (error) {
    console.error('News feed API error:', error);
    res.status(500).json({
      error: 'News feed failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;