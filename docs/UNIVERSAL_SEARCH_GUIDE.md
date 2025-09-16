# Universal Search Provider Integration Guide

## Overview

The Universal Search system in Nuestro Pulso integrates multiple external APIs to provide comprehensive, global news coverage with Colombian prioritization. This document outlines how to add new search providers and configure content prioritization.

## Architecture

### Core Components

1. **SearchAggregator** (`server/services/SearchAggregator.js`)
   - Orchestrates multiple search providers
   - Handles deduplication and result merging
   - Implements Colombian content prioritization

2. **Search Providers** (`server/providers/`)
   - Individual API integrations
   - Standardized result format
   - Graceful fallback mechanisms

3. **Frontend Integration** (`src/components/UniversalSearchBar.tsx`, `src/NewsFeed.tsx`)
   - Region and language filtering
   - Real-time search with fallbacks
   - Mobile-first responsive design

## Available Providers

### 1. NewsProvider
- **Source**: NewsAPI.org
- **Coverage**: Colombian news, international news
- **Features**: Real-time articles, source verification
- **Fallback**: Mock data generation

### 2. GoogleSearchProvider
- **Source**: Google Custom Search API
- **Coverage**: Web search with regional targeting
- **Features**: Colombian content boosting, relevance scoring
- **Fallback**: Contextual mock results

### 3. YouTubeProvider
- **Source**: YouTube Data API v3
- **Coverage**: Video content with Colombian channel priority
- **Features**: Duration, view counts, priority channel detection
- **Fallback**: Colombian channel simulation

### 4. BingNewsProvider
- **Source**: Bing News Search API
- **Coverage**: International news with regional filtering
- **Features**: Category detection, source attribution
- **Fallback**: Multi-source mock articles

### 5. SocialMediaProvider
- **Source**: Internal/Mock
- **Coverage**: Social media trends and discussions
- **Features**: Engagement metrics, trend detection

### 6. GovernmentProvider
- **Source**: Internal/Mock
- **Coverage**: Official government announcements
- **Features**: Document classification, official verification

### 7. WikiProvider
- **Source**: Internal/Mock
- **Coverage**: Educational and reference content
- **Features**: Fact verification, contextual information

## Adding a New Provider

### Step 1: Create Provider Class

Create a new file in `server/providers/YourProvider.js`:

```javascript
class YourProvider {
  constructor() {
    this.name = 'your_provider';
    this.apiKey = process.env.YOUR_API_KEY;
    this.enabled = process.env.REACT_APP_ENABLE_YOUR_PROVIDER === 'true';
  }

  async search(options) {
    const { query, category, maxResults, language, region } = options;
    
    if (!this.enabled || !this.apiKey) {
      return this.getMockResults(query, category, maxResults);
    }

    try {
      // Your API integration here
      const response = await fetch(`your-api-endpoint?q=${query}`);
      const data = await response.json();
      
      return data.items.map((item, index) => ({
        id: `your_provider_${Date.now()}_${index}`,
        title: item.title,
        summary: item.description,
        url: item.url,
        source: 'Your Provider',
        category: this.inferCategory(item.title, category),
        timestamp: item.publishedAt || new Date().toISOString(),
        relevanceScore: this.calculateRelevanceScore(item, query, region),
        image: this.getCategoryIcon(category),
        author: item.author || 'Your Provider',
        tags: this.generateTags(query, item.title),
        contentType: 'article',
        provider: 'your_provider',
        region: this.detectRegion(item.url, item.title),
        language: language
      }));
    } catch (error) {
      console.error('Your Provider error:', error);
      return this.getMockResults(query, category, maxResults);
    }
  }

  getMockResults(query, category, maxResults) {
    // Return mock data when API is unavailable
    return [];
  }

  calculateRelevanceScore(item, query, region) {
    // Implement relevance scoring logic
    let score = 60; // Base score
    // Add Colombian content boosting if applicable
    return Math.min(100, score);
  }
}

export default YourProvider;
```

### Step 2: Register Provider

Add your provider to `SearchAggregator.js`:

```javascript
import YourProvider from '../providers/YourProvider.js';

constructor() {
  this.providers = {
    // ... existing providers
    your_provider: new YourProvider()
  };
}
```

### Step 3: Add Environment Variables

Update `.env.example`:

```bash
# Your Provider Configuration
YOUR_API_KEY=your_api_key_here
REACT_APP_ENABLE_YOUR_PROVIDER=true
```

### Step 4: Test Integration

1. Configure API credentials in `.env`
2. Test with real API calls
3. Verify fallback behavior
4. Check Colombian prioritization

## Content Prioritization Configuration

### Regional Scoring

Content is prioritized based on region detection:

```javascript
prioritizeColombianContent(results) {
  const priorityColombianResults = results.filter(r => 
    r.region === 'colombia' && (r.relevanceScore >= 85 || r.isPriorityChannel)
  );
  const colombianResults = results.filter(r => 
    r.region === 'colombia' && r.relevanceScore < 85
  );
  const latinResults = results.filter(r => r.region === 'latam');
  const internationalResults = results.filter(r => r.region === 'international');
  
  return [...priorityColombianResults, ...colombianResults, ...latinResults, ...internationalResults];
}
```

### Adjusting Priority Weights

Modify relevance scoring in individual providers:

```javascript
calculateRelevanceScore(item, query, region) {
  let score = 60; // Base score

  // Colombian indicators (adjust weights as needed)
  const colombianIndicators = ['colombia', 'bogotá', 'petro', 'congreso'];
  const matches = colombianIndicators.filter(indicator => 
    text.toLowerCase().includes(indicator)
  );
  score += matches.length * 12; // Weight: 12 points per match

  // Recency boost
  if (isRecent(item.timestamp)) score += 20;
  
  // Trusted source boost
  if (isTrustedSource(item.source)) score += 15;

  return Math.min(100, score);
}
```

## API Rate Limiting and Caching

### Rate Limiting
- Each provider respects individual API rate limits
- Implement exponential backoff for failed requests
- Use provider timeout settings (default: 5 seconds)

### Caching Strategy
- Results cached for 5 minutes to reduce API calls
- Implement Redis for production caching
- Cache keys include query, region, and language

### Error Handling
- Graceful degradation to mock data
- Provider failure doesn't affect other providers
- Detailed error logging for debugging

## Monitoring and Analytics

### Provider Performance
- Track response times per provider
- Monitor success/failure rates
- Log popular search queries

### Content Quality
- Track relevance score distributions
- Monitor Colombian content percentage
- Analyze user engagement with results

## Environment Configuration

### Development Setup
```bash
# Required for basic functionality
NEWSAPI_KEY=your_newsapi_key
REACT_APP_DEFAULT_REGION=colombia
REACT_APP_DEFAULT_LANGUAGE=es

# Optional providers (fallback to mock if not configured)
GOOGLE_SEARCH_API_KEY=optional
YOUTUBE_API_KEY=optional
BING_SEARCH_API_KEY=optional
```

### Production Deployment
- Configure all API keys for full functionality
- Set appropriate rate limiting
- Enable result caching
- Configure monitoring and alerting

## Troubleshooting

### Common Issues

1. **Provider returning empty results**
   - Check API key configuration
   - Verify network connectivity
   - Review API usage limits

2. **Low Colombian content in results**
   - Adjust regional indicators
   - Increase Colombian content scoring weights
   - Review query enhancement logic

3. **Slow search performance**
   - Reduce provider timeout values
   - Implement result caching
   - Optimize query processing

### Debug Mode
Enable detailed logging:
```bash
NODE_ENV=development
DEBUG_SEARCH_PROVIDERS=true
```

## Future Enhancements

### Planned Features
- Real-time content updates via WebSockets
- Machine learning for relevance scoring
- User preference learning
- Advanced content filtering
- Multi-language automatic translation

### Additional Provider Ideas
- Twitter/X API integration
- Facebook Graph API
- Instagram Basic Display API
- TikTok Research API
- Reddit API
- Local Colombian news sources

## Support

For questions or issues:
1. Check this documentation
2. Review provider implementation examples
3. Test with mock data first
4. Submit issues with detailed error logs

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Nuestro Pulso Development Team