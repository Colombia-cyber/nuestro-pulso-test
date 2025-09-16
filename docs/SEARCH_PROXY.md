# Search Proxy Documentation

## Overview

The Search Proxy is a server-side service that handles search requests from the Universal Search Bar component in Nuestro Pulso. It provides a secure, rate-limited interface to external search services while respecting robots.txt and implementing proper fallback mechanisms.

## API Endpoint

```
GET /api/search
```

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | Yes | - | Search query string |
| `page` | number | No | 1 | Page number for pagination |
| `limit` | number | No | 12 | Number of results per page (max 100) |
| `category` | string | No | - | Filter by category (politica, educacion, etc.) |
| `sort` | string | No | relevance | Sort order: relevance, date, category |

## Response Format

### Success Response (200)

```json
{
  "query": "string",
  "results": [
    {
      "id": "string",
      "title": "string",
      "summary": "string",
      "url": "string",
      "source": "string",
      "category": "string",
      "timestamp": "ISO 8601 date string",
      "relevanceScore": "number (0-100)",
      "image": "string (emoji or URL)",
      "author": "string",
      "tags": ["string array"]
    }
  ],
  "totalResults": "number",
  "page": "number",
  "totalPages": "number",
  "hasMore": "boolean",
  "searchTime": "number (milliseconds)"
}
```

### Error Response (4xx/5xx)

```json
{
  "error": "string",
  "message": "string",
  "code": "string"
}
```

## Implementation Guidelines

### Rate Limiting

- Implement rate limiting per IP address: 100 requests per minute
- Implement rate limiting per user (if authenticated): 1000 requests per hour
- Return HTTP 429 (Too Many Requests) when limits are exceeded

### Robots.txt Compliance

- Check robots.txt of target sites before scraping
- Respect crawl delays specified in robots.txt
- Honor disallow rules for specific paths
- Cache robots.txt for up to 24 hours

### Search Sources

#### Primary Sources (in order of preference)
1. **Google Search API** (if available)
2. **Bing Search API** (fallback)
3. **DuckDuckGo API** (privacy-focused option)
4. **Custom scrapers** (last resort, must respect robots.txt)

#### Content Sources for Colombian Context
- El Tiempo
- El Espectador  
- Semana
- CNN Colombia
- Caracol Radio
- RCN Radio
- Government websites (.gov.co)
- Academic institutions (.edu.co)

### Content Filtering

#### Allowed Content Types
- News articles
- Government documents
- Academic papers
- Opinion pieces from verified sources
- Official social media posts

#### Blocked Content Types
- Adult content
- Hate speech
- Misinformation (when detected)
- Spam or low-quality content
- Illegal content

### Paging and Performance

- Maximum results per request: 100
- Maximum deep paging: 2000 results (configurable via `REACT_APP_PAGING_CAP`)
- Cache search results for 15 minutes for popular queries
- Implement search result deduplication

### Error Handling

```javascript
// Example error responses
{
  "RATE_LIMIT_EXCEEDED": {
    "error": "Rate limit exceeded",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  },
  "INVALID_QUERY": {
    "error": "Invalid query",
    "message": "Query must be at least 2 characters long"
  },
  "SERVICE_UNAVAILABLE": {
    "error": "Service unavailable",
    "message": "Search service is temporarily unavailable"
  }
}
```

## Environment Variables

```bash
# Search service configuration
SEARCH_API_KEY=your_google_search_api_key
SEARCH_ENGINE_ID=your_custom_search_engine_id
SEARCH_RATE_LIMIT_RPM=100
SEARCH_CACHE_TTL=900
SEARCH_MAX_RESULTS=2000

# External APIs
GOOGLE_API_KEY=your_google_api_key
BING_API_KEY=your_bing_api_key

# Security
ALLOWED_ORIGINS=https://nuestro-pulso.com,https://www.nuestro-pulso.com
RATE_LIMIT_REDIS_URL=redis://localhost:6379

# Content filtering
CONTENT_FILTER_ENABLED=true
CONTENT_FILTER_STRICT_MODE=false
```

## Example Implementation (Node.js/Express)

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const { searchService } = require('./services/searchService');

const app = express();

// Rate limiting
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Rate limit exceeded',
    message: 'Too many search requests. Please try again later.'
  }
});

app.get('/api/search', searchLimiter, async (req, res) => {
  try {
    const { q, page = 1, limit = 12, category, sort = 'relevance' } = req.query;
    
    // Validate query
    if (!q || q.length < 2) {
      return res.status(400).json({
        error: 'Invalid query',
        message: 'Query must be at least 2 characters long'
      });
    }
    
    // Validate pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    
    // Perform search
    const results = await searchService.search({
      query: q,
      page: pageNum,
      limit: limitNum,
      category,
      sort
    });
    
    res.json(results);
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while processing your search'
    });
  }
});
```

## Fallback Strategy

When the search proxy is unavailable, the frontend should:

1. **Check for cached results** in localStorage/sessionStorage
2. **Use fallback data** for popular queries (e.g., facebook-fallback.json)
3. **Display mock results** with a clear indicator
4. **Show error message** with retry option

## Security Considerations

### Input Validation
- Sanitize all search queries
- Validate pagination parameters
- Check for SQL injection attempts
- Rate limit per IP and user

### Output Sanitization
- Escape HTML in search results
- Validate URLs before returning
- Filter out potentially malicious content
- Remove or sanitize script tags

### API Security
- Use HTTPS only
- Implement CORS properly
- Add API key authentication
- Log all requests for monitoring

## Monitoring and Analytics

### Metrics to Track
- Search query volume
- Response times
- Error rates
- Popular search terms
- User engagement with results

### Logging
```javascript
// Example log format
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "event": "search_request",
  "data": {
    "query": "gustavo petro",
    "category": "politica",
    "results_count": 15,
    "response_time_ms": 245,
    "user_ip": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  }
}
```

## Testing

### Unit Tests
- Query validation
- Response formatting
- Error handling
- Rate limiting logic

### Integration Tests
- External API integration
- Database operations
- Cache functionality
- End-to-end search flow

### Load Testing
- Concurrent user simulation
- Rate limit validation
- Performance under stress
- Failover scenarios

## Deployment

### Requirements
- Node.js 18+ or Python 3.9+
- Redis for caching and rate limiting
- MongoDB or PostgreSQL for analytics
- SSL certificate
- CDN for static assets

### Environment Setup
```bash
# Production deployment
docker-compose up -d
npm run build
npm run start:prod

# Health check endpoint
curl https://api.nuestro-pulso.com/health
```

## Support and Troubleshooting

### Common Issues

1. **Rate limit exceeded**: Implement exponential backoff
2. **No results found**: Check query formatting and filters
3. **Slow response times**: Enable caching and optimize queries
4. **API key errors**: Verify configuration and quotas

### Contact Information
- Development Team: dev@nuestro-pulso.com
- Technical Support: support@nuestro-pulso.com
- Documentation: https://docs.nuestro-pulso.com