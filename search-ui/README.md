# Search UI - Nuestro Pulso

A mobile-first, Google-like search interface for the Nuestro Pulso platform with support for structured data (JSON-LD), accessible design, and multiple search backend integrations.

## Features

- 🔍 **Google-like search interface** with top stories and paginated results
- 📱 **Mobile-first responsive design** with accessibility features
- 🏷️ **JSON-LD structured data** support for SEO optimization
- 🔗 **Multiple search backend support** (Algolia, Typesense, Elasticsearch)
- ⚡ **Fast loading** with optimized CSS and JavaScript
- ♿ **Accessible** with ARIA labels, keyboard navigation, and screen reader support
- 🌐 **Internationalization** ready (Spanish by default)

## Quick Start

1. Open `search.html` in a web browser to see the interface
2. The demo includes mock data and simulated API responses
3. Follow the integration guide below to connect to a real search backend

## File Structure

```
search-ui/
├── search.html     # Main search page with semantic HTML
├── styles.css      # Mobile-first responsive CSS
├── script.js       # JavaScript with API integration points
└── README.md       # This documentation
```

## Search Backend Integration

### Prerequisites

Choose one of the following search backends:

1. **Algolia** - Hosted search service (recommended for ease of use)
2. **Typesense** - Open-source search engine
3. **Elasticsearch** - Full-featured search and analytics engine

### Required Server Endpoints

Implement these endpoints in your backend:

- `GET /search` - Main search endpoint
- `GET /top-stories` - Featured content endpoint  
- `GET /suggest` - Search suggestions/autocomplete

### Integration Steps

#### 1. Algolia Setup

```bash
# Install Algolia client
npm install algoliasearch

# Environment variables
ALGOLIA_APP_ID=your_app_id
ALGOLIA_SEARCH_API_KEY=your_search_key
ALGOLIA_ADMIN_API_KEY=your_admin_key
```

**Index Schema:**
```json
{
  "objectID": "unique_article_id",
  "title": "Article title",
  "content": "Full article content",
  "excerpt": "Article summary/snippet",
  "url": "https://example.com/article",
  "domain": "example.com",
  "favicon": "https://example.com/favicon.ico",
  "publishedDate": "2024-01-15T10:30:00Z",
  "author": "Author Name",
  "tags": ["politics", "news"],
  "type": "news|articles|videos",
  "category": "politics",
  "language": "es",
  "readingTime": 5,
  "priority": 1
}
```

**Indexing Command:**
```bash
# Index content using Algolia CLI
algolia import -s content.json -a YOUR_APP_ID -k YOUR_ADMIN_KEY -n nuestro_pulso_content

# Or using curl
curl -X POST \
  "https://YOUR_APP_ID-dsn.algolia.net/1/indexes/nuestro_pulso_content/batch" \
  -H "X-Algolia-API-Key: YOUR_ADMIN_KEY" \
  -H "X-Algolia-Application-Id: YOUR_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {
        "action": "addObject",
        "body": {
          "title": "Sample Article",
          "content": "Article content...",
          "url": "https://example.com/article"
        }
      }
    ]
  }'
```

#### 2. Typesense Setup

```bash
# Install Typesense client
npm install typesense

# Environment variables
TYPESENSE_HOST=localhost
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=http
TYPESENSE_API_KEY=your_api_key
```

**Collection Schema:**
```json
{
  "name": "content",
  "fields": [
    {"name": "title", "type": "string"},
    {"name": "content", "type": "string"},
    {"name": "excerpt", "type": "string"},
    {"name": "url", "type": "string"},
    {"name": "domain", "type": "string"},
    {"name": "publishedDate", "type": "int64"},
    {"name": "author", "type": "string"},
    {"name": "tags", "type": "string[]"},
    {"name": "type", "type": "string", "facet": true},
    {"name": "category", "type": "string", "facet": true},
    {"name": "priority", "type": "int32"}
  ],
  "default_sorting_field": "publishedDate"
}
```

**Setup Commands:**
```bash
# Create collection
curl -X POST \
  "http://localhost:8108/collections" \
  -H "X-TYPESENSE-API-KEY: your_api_key" \
  -H "Content-Type: application/json" \
  -d @collection-schema.json

# Index documents
curl -X POST \
  "http://localhost:8108/collections/content/documents" \
  -H "X-TYPESENSE-API-KEY: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Article",
    "content": "Article content...",
    "url": "https://example.com/article",
    "publishedDate": 1705320600
  }'

# Bulk import
curl -X POST \
  "http://localhost:8108/collections/content/documents/import" \
  -H "X-TYPESENSE-API-KEY: your_api_key" \
  -H "Content-Type: text/plain" \
  --data-binary @content.jsonl
```

#### 3. Elasticsearch Setup

```bash
# Install Elasticsearch client
npm install @elastic/elasticsearch

# Environment variables
ELASTICSEARCH_HOST=localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_password
```

**Index Mapping:**
```json
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "spanish"
      },
      "content": {
        "type": "text",
        "analyzer": "spanish"
      },
      "excerpt": {
        "type": "text"
      },
      "url": {
        "type": "keyword"
      },
      "domain": {
        "type": "keyword"
      },
      "publishedDate": {
        "type": "date"
      },
      "author": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      },
      "type": {
        "type": "keyword"
      },
      "category": {
        "type": "keyword"
      },
      "priority": {
        "type": "integer"
      }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "spanish": {
          "tokenizer": "standard",
          "filter": ["lowercase", "spanish_stop", "spanish_stemmer"]
        }
      }
    }
  }
}
```

**Setup Commands:**
```bash
# Create index
curl -X PUT \
  "localhost:9200/nuestro_pulso_content" \
  -H "Content-Type: application/json" \
  -d @index-mapping.json

# Index document
curl -X POST \
  "localhost:9200/nuestro_pulso_content/_doc" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Article",
    "content": "Article content...",
    "url": "https://example.com/article",
    "publishedDate": "2024-01-15T10:30:00Z"
  }'

# Bulk index
curl -X POST \
  "localhost:9200/nuestro_pulso_content/_bulk" \
  -H "Content-Type: application/x-ndjson" \
  --data-binary @content.ndjson
```

## Server Implementation Examples

### Express.js Backend

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Search endpoint
app.get('/search', async (req, res) => {
  const { q, page = 1, filter = 'all', limit = 10 } = req.query;
  
  try {
    // TODO: Replace with actual search implementation
    const results = await searchContent(q, {
      page: parseInt(page),
      limit: parseInt(limit),
      filter
    });
    
    res.json({
      items: results.hits,
      total: results.total,
      page: parseInt(page),
      hasMore: results.total > page * limit
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Top stories endpoint
app.get('/top-stories', async (req, res) => {
  try {
    const stories = await getTopStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top stories' });
  }
});

// Search suggestions endpoint
app.get('/suggest', async (req, res) => {
  const { q } = req.query;
  
  try {
    const suggestions = await getSuggestions(q);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.listen(3000, () => {
  console.log('Search API running on port 3000');
});
```

### Sample cURL Requests

```bash
# Search request
curl "http://localhost:3000/search?q=politica&page=1&filter=news&limit=10"

# Top stories request
curl "http://localhost:3000/top-stories"

# Suggestions request
curl "http://localhost:3000/suggest?q=pol"
```

## Content Indexing Strategy

### Recommended Index Fields

1. **Content Fields:**
   - `title` - Article headline (searchable, high boost)
   - `content` - Full article text (searchable)
   - `excerpt` - Summary/snippet (displayed in results)
   - `tags` - Content categories/topics (facetable)

2. **Metadata Fields:**
   - `url` - Canonical URL
   - `domain` - Source domain
   - `favicon` - Site favicon URL
   - `publishedDate` - Publication date (sortable)
   - `author` - Content author
   - `type` - Content type (news, articles, videos)

3. **SEO/Ranking Fields:**
   - `priority` - Editorial priority (1-10)
   - `viewCount` - Page views
   - `shareCount` - Social shares
   - `engagementScore` - Combined engagement metric

### Ranking Signals

Configure search ranking based on:

1. **Relevance:** Text matching score
2. **Freshness:** Recent content boost
3. **Authority:** Source credibility score
4. **Engagement:** User interaction metrics
5. **Editorial Priority:** Manual content curation

### Indexing Workflow

1. **Content Extraction:**
   ```bash
   # Extract content from CMS/database
   node scripts/extract-content.js
   ```

2. **Data Transformation:**
   ```bash
   # Clean and format for search index
   node scripts/transform-data.js
   ```

3. **Index Upload:**
   ```bash
   # Upload to search backend
   node scripts/upload-index.js
   ```

4. **Verification:**
   ```bash
   # Test search functionality
   npm run test:search
   ```

## SEO and Performance Optimization

### JSON-LD Structured Data

The search interface automatically generates structured data for each result:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "url": "https://example.com/article",
  "datePublished": "2024-01-15T10:30:00Z",
  "description": "Article excerpt",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Publisher Name"
  }
}
```

### Server-Side Rendering (SSR)

For optimal SEO, implement SSR for the initial page load:

```javascript
// Next.js example
export async function getServerSideProps({ query }) {
  const { q } = query;
  
  if (q) {
    const results = await searchContent(q);
    return {
      props: {
        initialResults: results,
        query: q
      }
    };
  }
  
  return { props: {} };
}
```

### Performance Best Practices

1. **Lazy Loading:** Images and non-critical content
2. **Caching:** API responses and search results
3. **Compression:** Enable gzip/brotli compression
4. **CDN:** Serve static assets from CDN
5. **Debouncing:** Search input to reduce API calls

## Accessibility Features

### Keyboard Navigation

- `Tab` - Navigate through interface elements
- `Enter` - Submit search or activate buttons
- `Escape` - Clear search input
- `Arrow Keys` - Navigate carousel items

### Screen Reader Support

- Semantic HTML structure
- ARIA labels and roles
- Live regions for dynamic content
- Descriptive alt text for images

### Visual Accessibility

- High contrast color scheme
- Responsive font sizes
- Focus indicators
- Reduced motion support

## Testing Locally

1. **Basic Testing:**
   ```bash
   # Serve files with a local server
   npx http-server search-ui/ -p 8080
   
   # Open in browser
   open http://localhost:8080/search.html
   ```

2. **With Live Reload:**
   ```bash
   # Install live-server
   npm install -g live-server
   
   # Start with live reload
   live-server search-ui/
   ```

3. **Integration Testing:**
   ```bash
   # Test with your backend API
   SEARCH_API_URL=http://localhost:3000 live-server search-ui/
   ```

## Deployment Options

### Static Hosting

Deploy to any static hosting service:

```bash
# Netlify
npm install -g netlify-cli
netlify deploy --dir=search-ui

# Vercel
npm install -g vercel
vercel search-ui/

# GitHub Pages
# Push to gh-pages branch
git subtree push --prefix search-ui origin gh-pages
```

### CDN Integration

For production, serve assets from a CDN:

```html
<!-- Update asset URLs in search.html -->
<link rel="stylesheet" href="https://cdn.example.com/search-ui/styles.css">
<script src="https://cdn.example.com/search-ui/script.js"></script>
```

### Environment Configuration

Configure for different environments:

```javascript
// Add to script.js
const SEARCH_CONFIG = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.nuestro-pulso.com'
    : 'http://localhost:3000',
  // ... other config
};
```

## Contributing

When modifying the search UI:

1. **Maintain mobile-first design**
2. **Follow accessibility guidelines**
3. **Update structured data when changing result format**
4. **Test with actual search backends**
5. **Validate HTML and CSS**

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This search UI is part of the Nuestro Pulso project and follows the same licensing terms.

## Next Steps

After implementing the search UI:

1. **Connect to chosen search backend** (Algolia/Typesense/Elasticsearch)
2. **Implement server-side rendering** for better SEO
3. **Add search analytics** to track user behavior
4. **Set up monitoring** for search performance
5. **Implement A/B testing** for UI optimizations
6. **Add search filters** for advanced functionality
7. **Create admin interface** for content management

## Support

For questions or issues with the search UI implementation:

1. Check the browser console for JavaScript errors
2. Verify API endpoints are accessible
3. Test with mock data first
4. Review network requests in browser dev tools
5. Validate HTML structure and CSS selectors

---

**Note:** This search UI provides the foundation for a modern, accessible search experience. Customize the styling, add features, and integrate with your preferred search backend to create the perfect search solution for Nuestro Pulso.