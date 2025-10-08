# API Integration Guide - Google-Style Homepage

This guide explains how to integrate real APIs with the Google-Style Homepage component.

## Overview

The homepage is designed with a modular architecture that makes API integration straightforward. All API calls are centralized in the `src/services/homepageApiService.ts` file.

## Quick Start

1. **Configure API Keys**: Add your API keys to the `.env` file
2. **Enable APIs**: Uncomment the real API code in `homepageApiService.ts`
3. **Test**: The homepage will automatically use real data instead of mocks

## API Endpoints

### 1. Colombia News API

**Purpose**: Fetch local Colombian news for the homepage

**Current Implementation**: Mock data
**Ready for Integration**: Yes

#### Recommended APIs:
- **NewsAPI.org** - `https://newsapi.org/v2/top-headlines?country=co`
- **El Tiempo API** - Custom integration with Colombian sources
- **Semana API** - Direct feed integration
- **RCN/Caracol** - RSS feed parsing

#### Environment Variables:
```bash
VITE_NEWSAPI_KEY=your_newsapi_key
VITE_ELTIEMPO_API_KEY=your_eltiempo_key
VITE_SEMANA_API_KEY=your_semana_key
```

#### Code Location:
`src/services/homepageApiService.ts` → `fetchColombiaNews()`

#### Integration Example:
```typescript
export async function fetchColombiaNews(): Promise<NewsItem[]> {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`
  );
  
  const data = await response.json();
  
  return data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    source: article.source.name,
    time: formatTime(article.publishedAt),
    url: article.url,
    image: article.urlToImage,
    category: article.category || 'General',
    description: article.description
  }));
}
```

### 2. World News API

**Purpose**: Fetch international news for the World mode

**Current Implementation**: Mock data
**Ready for Integration**: Yes

#### Recommended APIs:
- **NewsAPI.org** - Global headlines
- **Google News API** - Comprehensive world coverage
- **BBC News API** - International news
- **Reuters API** - Breaking news worldwide

#### Environment Variables:
```bash
VITE_NEWSAPI_KEY=your_newsapi_key
VITE_GOOGLE_NEWS_API=your_google_news_key
VITE_BBC_API_KEY=your_bbc_key
VITE_REUTERS_API_KEY=your_reuters_key
```

#### Code Location:
`src/services/homepageApiService.ts` → `fetchWorldNews()`

#### Integration Example:
```typescript
export async function fetchWorldNews(): Promise<NewsItem[]> {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${apiKey}`
  );
  
  const data = await response.json();
  
  return data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    source: article.source.name,
    time: formatTime(article.publishedAt),
    url: article.url,
    image: article.urlToImage,
    category: article.category || 'General',
    description: article.description
  }));
}
```

### 3. Universal Search API

**Purpose**: Search across all content with Colombia/World filtering

**Current Implementation**: Mock data
**Ready for Integration**: Yes

#### Recommended APIs:
- **Google Custom Search API** - Comprehensive search
- **Bing Search API** - Alternative search provider
- **Internal Search** - Custom database queries

#### Environment Variables:
```bash
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CX=your_custom_search_engine_id
VITE_BING_SEARCH_KEY=your_bing_key
```

#### Code Location:
`src/services/homepageApiService.ts` → `universalSearch()`

#### Integration Example:
```typescript
export async function universalSearch(
  query: string,
  scope: 'colombia' | 'world' = 'colombia'
): Promise<SearchResult[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_GOOGLE_CX;
  
  const searchQuery = scope === 'colombia' 
    ? `${query} site:colombia OR site:.co` 
    : query;
  
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(searchQuery)}`
  );
  
  const data = await response.json();
  
  return data.items?.map((item: any) => ({
    id: item.link,
    title: item.title,
    snippet: item.snippet,
    url: item.link,
    source: new URL(item.link).hostname,
    type: 'article' as const
  })) || [];
}
```

### 4. Trending Topics API

**Purpose**: Show trending topics for Colombia or World

**Current Implementation**: Mock data
**Ready for Integration**: Yes

#### Recommended APIs:
- **Google Trends API** - Popular search trends
- **Twitter Trends API** - Social media trends
- **Custom Analytics** - Internal trending calculation

#### Environment Variables:
```bash
VITE_GOOGLE_TRENDS_API_KEY=your_trends_key
VITE_TWITTER_BEARER_TOKEN=your_twitter_token
```

#### Code Location:
`src/services/homepageApiService.ts` → `fetchTrendingTopics()`

## Component Integration

### GoogleStyleHomepage Component

Location: `src/components/GoogleStyleHomepage.tsx`

The component uses the API service automatically:

```typescript
// Example of how to use real APIs in the component
import { fetchColombiaNews, fetchWorldNews } from '../services/homepageApiService';

useEffect(() => {
  const loadNews = async () => {
    setIsLoading(true);
    try {
      const [colombia, world] = await Promise.all([
        fetchColombiaNews(),
        fetchWorldNews()
      ]);
      setColombiaNews(colombia);
      setWorldNews(world);
    } catch (error) {
      console.error('Failed to load news:', error);
      // Fallback to mock data or show error
    } finally {
      setIsLoading(false);
    }
  };
  
  loadNews();
}, []);
```

## Error Handling

All API functions should include proper error handling:

```typescript
export async function fetchColombiaNews(): Promise<NewsItem[]> {
  try {
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
    
    if (!apiKey) {
      console.warn('NewsAPI key not configured, using mock data');
      return getMockColombiaNews();
    }
    
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return transformNewsData(data);
    
  } catch (error) {
    console.error('Error fetching Colombia news:', error);
    // Return mock data as fallback
    return getMockColombiaNews();
  }
}
```

## Caching Strategy

To improve performance, implement caching:

```typescript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

export async function fetchColombiaNews(): Promise<NewsItem[]> {
  const cacheKey = 'colombia-news';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetchFromAPI();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}
```

## Rate Limiting

Implement rate limiting to avoid API quota issues:

```typescript
const requestQueue = [];
const MAX_REQUESTS_PER_MINUTE = 60;

async function rateLimitedFetch(url: string) {
  // Implement rate limiting logic
  await waitForRateLimit();
  return fetch(url);
}
```

## Testing

Test API integration with different scenarios:

1. **Successful Response**: Verify data transformation
2. **API Error**: Test fallback to mock data
3. **Network Error**: Test error handling
4. **Empty Results**: Test UI with no data
5. **Rate Limiting**: Test quota management

## Getting API Keys

### NewsAPI
1. Visit https://newsapi.org/register
2. Create account
3. Copy API key
4. Add to `.env`: `VITE_NEWSAPI_KEY=your_key`

### Google Custom Search
1. Visit https://console.cloud.google.com/
2. Create project
3. Enable Custom Search API
4. Create credentials
5. Create search engine at https://programmablesearchengine.google.com/
6. Add to `.env`:
   ```bash
   VITE_GOOGLE_API_KEY=your_key
   VITE_GOOGLE_CX=your_search_engine_id
   ```

### Twitter API
1. Visit https://developer.twitter.com/
2. Create app
3. Generate bearer token
4. Add to `.env`: `VITE_TWITTER_BEARER_TOKEN=your_token`

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Server-side proxy** for sensitive API calls
4. **Validate and sanitize** all user inputs
5. **Implement CORS** properly on server
6. **Monitor API usage** to detect abuse

## Migration from Mock to Real Data

Step-by-step process:

1. **Add API keys** to `.env` file
2. **Uncomment real API code** in `homepageApiService.ts`
3. **Test locally** with `npm run dev`
4. **Verify data quality** and formatting
5. **Add error handling** for edge cases
6. **Deploy to staging** environment
7. **Monitor API usage** and performance
8. **Deploy to production** when ready

## Support

For questions or issues:
- Check existing documentation in `/docs`
- Review API service code in `src/services/homepageApiService.ts`
- Create issue on GitHub repository
- Contact development team

## Changelog

- **v1.0** - Initial Google-Style Homepage with mock data
- **Future** - Real API integration planned

---

**Last Updated**: January 2025
**Maintainer**: Nuestro Pulso Development Team
