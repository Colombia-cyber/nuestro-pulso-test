# Nuestro Pulso API Documentation

## Google-Style Search API Integration

### Overview
The enhanced search system integrates with Google Search API and News API to provide world-class search capabilities with Colombian context.

### Search API Service (`googleAPIService.ts`)

#### Core Methods

##### `universalSearch(options: GoogleSearchOptions): Promise<SearchResponse>`
Performs universal search across different content types.

```typescript
interface GoogleSearchOptions {
  query: string;
  type: 'web' | 'news' | 'images' | 'videos' | 'local';
  region?: 'colombia' | 'global';
  language?: 'es' | 'en';
  timeRange?: 'any' | 'day' | 'week' | 'month' | 'year';
  safeSearch?: 'strict' | 'moderate' | 'off';
  page?: number;
  limit?: number;
}
```

**Example Usage:**
```typescript
import { googleAPIService } from '../services/googleAPIService';

const results = await googleAPIService.universalSearch({
  query: 'reforma pensional colombia',
  type: 'news',
  region: 'colombia',
  language: 'es',
  timeRange: 'week',
  limit: 20
});
```

##### `getTrendingTopics(): Promise<string[]>`
Gets real-time trending topics in Colombia.

```typescript
const trending = await googleAPIService.getTrendingTopics();
// Returns: ['Reforma pensional Colombia', 'Elecciones regionales 2023', ...]
```

##### `getLocalNews(limit: number): Promise<SearchResult[]>`
Fetches latest Colombian news from verified sources.

```typescript
const localNews = await googleAPIService.getLocalNews(10);
```

### Search Result Interface

```typescript
interface SearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  tags?: string[];
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  searchTime: number;
  source: 'proxy' | 'fallback' | 'mock';
}
```

## Community Hub API

### SuperchargedCommunityHub Component

#### Authentication System

The "Comunidad Passport" provides secure authentication with social integration.

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  contributions: number;
  level: 'Novato' | 'Ciudadano' | 'Activista' | 'Líder';
}
```

#### Community Post Interface

```typescript
interface CommunityPost {
  id: string;
  author: User;
  content: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'marketplace';
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  isLiked: boolean;
  media?: string;
  location?: string;
  tags: string[];
}
```

#### Cross-Platform Sharing

```typescript
const handleShare = (post: CommunityPost, platform: string) => {
  const shareText = `${post.content} - Vía Nuestro Pulso`;
  const shareUrl = `https://nuestropulso.co/post/${post.id}`;
  
  switch (platform) {
    case 'whatsapp':
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`);
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
      break;
    // ... other platforms
  }
};
```

## Configuration

### Environment Variables

```env
# Google APIs
REACT_APP_GOOGLE_API_KEY=your_google_api_key
REACT_APP_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# News API
REACT_APP_NEWS_API_KEY=your_news_api_key

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Search Configuration
REACT_APP_SEARCH_PROXY_URL=/api/search
REACT_APP_PAGING_CAP=2000
REACT_APP_SEARCH_RESULTS_PER_PAGE=12
REACT_APP_SEARCH_DEBOUNCE_MS=300
```

### API Rate Limits

- **Google Search API**: 100 queries per day (free tier)
- **News API**: 1000 requests per day (developer tier)
- **Firebase**: Based on your plan configuration

### Error Handling

The system includes comprehensive fallback mechanisms:

1. **Primary**: Google APIs with live data
2. **Secondary**: Enhanced mock data with Colombian context
3. **Fallback**: Basic local search functionality

```typescript
try {
  const results = await googleAPIService.universalSearch(options);
  return results;
} catch (error) {
  console.warn('API search failed, using fallback data');
  return await getFallbackResults(options);
}
```

## Colombian Context Features

### News Sources Priority
- **Primary Sources**: El Tiempo, Semana, El Espectador
- **Secondary Sources**: Caracol Noticias, RCN Radio
- **Regional Sources**: Local news outlets by department

### Content Categorization
```typescript
const categories = {
  'politica': ['político', 'gobierno', 'congreso', 'presidente'],
  'economia': ['económico', 'economía', 'pesos', 'inflación'],
  'seguridad': ['seguridad', 'policía', 'militar', 'crimen'],
  'educacion': ['educación', 'universidad', 'colegio'],
  'salud': ['salud', 'médico', 'hospital'],
  'tecnologia': ['tecnología', 'digital', 'internet']
};
```

### Regional Search Enhancement
```typescript
const buildQuery = (options: GoogleSearchOptions): string => {
  let query = options.query;
  
  if (options.region === 'colombia') {
    query += ' Colombia OR colombiano OR Bogotá OR Medellín OR Cali';
  }
  
  return query;
};
```

## Performance Optimizations

### Search Debouncing
- **Default Delay**: 300ms
- **Configurable**: Via environment variable
- **Smart Caching**: Prevents duplicate queries

### Component Loading
- **Lazy Loading**: Components load on demand
- **Suspense Boundaries**: Graceful loading states
- **Error Boundaries**: Fallback UI for errors

### Image Optimization
- **Progressive Loading**: Images load progressively
- **Placeholder System**: Emoji placeholders for fast rendering
- **Responsive Images**: Optimized for different screen sizes

## Testing & Validation

### Component Testing
```bash
npm run lint     # ESLint validation
npm run build    # TypeScript compilation
npm run preview  # Production preview
```

### API Testing
```typescript
// Example test for search functionality
describe('Google API Service', () => {
  it('should return Colombian-focused results', async () => {
    const results = await googleAPIService.universalSearch({
      query: 'politica',
      region: 'colombia',
      type: 'news'
    });
    
    expect(results.results).toBeDefined();
    expect(results.results.length).toBeGreaterThan(0);
  });
});
```

## Security Considerations

### API Key Protection
- **Environment Variables**: Never commit API keys
- **Server-Side Proxy**: API calls through backend proxy
- **Rate Limiting**: Prevent API abuse

### Content Filtering
- **Safe Search**: Configurable content filtering
- **Colombian Context**: Culturally appropriate content
- **User Reporting**: Community-based content moderation

## Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Configure production API keys
2. Set up CDN for static assets
3. Configure Firebase hosting rules
4. Enable HTTPS and security headers

### Monitoring
- **Error Tracking**: Real-time error monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **API Usage**: Monitor API quota and performance

## Contributing

### Code Style
- **TypeScript**: Strict type checking
- **ESLint**: Consistent code style
- **Prettier**: Automated formatting

### Component Guidelines
- **React Functional Components**: Use hooks
- **TypeScript Interfaces**: Define clear contracts
- **Accessibility**: WCAG 2.1 compliance
- **Mobile-First**: Responsive design patterns

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Write/update tests
4. Update documentation
5. Submit PR with detailed description

## Support

### Community
- **GitHub Issues**: Bug reports and feature requests
- **Community Hub**: User support and discussions
- **Documentation**: Comprehensive guides and examples

### API Support
- **Google APIs**: [Google Developers Console](https://console.developers.google.com/)
- **News API**: [NewsAPI.org Documentation](https://newsapi.org/docs)
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)