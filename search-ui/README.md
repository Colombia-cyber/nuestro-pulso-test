# Search UI Example

This directory contains a mobile-first search UI example that reproduces and improves on Google's mobile search results design. The implementation provides a self-contained demo with clear integration points for real search backends.

## 🚀 Quick Start

### Local Usage

1. **Open directly in browser** (no build step required):
   ```bash
   # Option 1: Open the file directly
   open search-ui/search.html
   
   # Option 2: Serve with a simple HTTP server
   cd search-ui
   python -m http.server 8080
   # Then visit http://localhost:8080/search.html
   
   # Option 3: Use Node.js serve
   npx serve .
   ```

2. **Test with query parameters**:
   ```
   search.html?q=participación
   search.html?q=debate
   search.html?q=encuesta
   ```

### Features Included

- ✅ Mobile-first responsive design
- ✅ Top stories horizontal carousel
- ✅ Standard search results with favicon, title, domain, date, snippet
- ✅ Pagination controls and infinite scroll
- ✅ Accessible markup with ARIA roles
- ✅ JSON-LD structured data generation
- ✅ Loading states and error handling
- ✅ URL query parameter support (`?q=search-term`)
- ✅ Mock data for demonstration

## 🔧 Backend Integration

### Replace Mock with Real Search

The current implementation uses mock data in `script.js`. To integrate with a real search backend, replace the `mockSearch()` method with one of the following integrations:

#### Option 1: Algolia Integration

```javascript
async searchWithAlgolia(query, page) {
    const searchClient = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_API_KEY');
    const index = searchClient.initIndex('your_index_name');
    
    const { hits, nbHits, processingTimeMS } = await index.search(query, {
        page: page - 1,
        hitsPerPage: this.resultsPerPage,
        attributesToRetrieve: ['title', 'content', 'url', 'published_date', 'author', 'image', 'tags'],
        attributesToHighlight: ['title', 'content'],
        ranking: ['desc(popularity)', 'desc(published_date)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom']
    });
    
    return {
        query: query,
        totalResults: nbHits,
        page: page,
        resultsPerPage: this.resultsPerPage,
        results: hits.map(hit => this.transformAlgoliaResult(hit)),
        topStories: [], // Implement top stories logic
        searchTime: processingTimeMS / 1000
    };
}
```

#### Option 2: Typesense Integration

```javascript
async searchWithTypesense(query, page) {
    const typesense = new Typesense.Client({
        'nodes': [{
            'host': 'your-typesense-host',
            'port': '443',
            'protocol': 'https'
        }],
        'apiKey': 'your-search-api-key',
        'connectionTimeoutSeconds': 2
    });
    
    const searchParameters = {
        'q': query,
        'query_by': 'title,content,tags',
        'page': page,
        'per_page': this.resultsPerPage,
        'sort_by': 'popularity:desc,published_date:desc',
        'highlight_full_fields': 'title,content'
    };
    
    const searchResults = await typesense.collections('your_collection').documents().search(searchParameters);
    
    return {
        query: query,
        totalResults: searchResults.found,
        page: page,
        resultsPerPage: this.resultsPerPage,
        results: searchResults.hits.map(hit => this.transformTypesenseResult(hit)),
        topStories: [], // Implement top stories logic
        searchTime: searchResults.search_time_ms / 1000
    };
}
```

#### Option 3: Custom API Integration

```javascript
async searchWithCustomAPI(query, page) {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${this.resultsPerPage}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer your-api-token'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
        query: query,
        totalResults: data.total,
        page: page,
        resultsPerPage: this.resultsPerPage,
        results: data.results,
        topStories: data.top_stories || [],
        searchTime: data.search_time
    };
}
```

### Integration Steps

1. **Replace the mock method**: In `script.js`, find the `performSearch()` method and replace the mock call:
   ```javascript
   // Replace this line:
   const results = await this.mockSearch(this.currentQuery, this.currentPage);
   
   // With your chosen integration:
   const results = await this.searchWithAlgolia(this.currentQuery, this.currentPage);
   // OR
   const results = await this.searchWithTypesense(this.currentQuery, this.currentPage);
   // OR  
   const results = await this.searchWithCustomAPI(this.currentQuery, this.currentPage);
   ```

2. **Install required dependencies**:
   ```bash
   # For Algolia
   npm install algoliasearch
   
   # For Typesense
   npm install typesense
   
   # For custom API - no additional dependencies needed
   ```

3. **Configure your search index** (see Index Schema section below)

## 📊 Recommended Index Schema

For optimal search performance and ranking, structure your search index with these fields:

### Core Fields
```json
{
  "title": "string",           // Article/content title
  "content": "text",           // Full text content
  "excerpt": "string",         // Short summary/snippet  
  "url": "string",             // Canonical URL
  "published_date": "datetime", // ISO 8601 format
  "author": "string",          // Author name or organization
  "source": "string",          // Source organization/website
  "image": "string",           // Featured image URL
  "tags": ["string"],          // Array of tags/categories
  "type": "string"             // Content type (article, debate, poll, etc.)
}
```

### Ranking Fields
```json
{
  "popularity_score": "number",    // Engagement metrics (views, likes, shares)
  "authority_score": "number",     // Source credibility score
  "freshness_score": "number",     // Recency boost (auto-calculated)
  "engagement_count": "number",    // Comments, reactions, participation
  "view_count": "number",          // Page views
  "social_shares": "number"        // Social media shares
}
```

### Suggested Ranking Signals

1. **Freshness** (40%): Boost recent content, decay older content
2. **Authority** (25%): Source credibility and trustworthiness  
3. **Popularity** (20%): User engagement and view metrics
4. **Relevance** (15%): Text matching and semantic similarity

### Example Index Configuration

#### Algolia Settings
```json
{
  "searchableAttributes": [
    "title,content,tags",
    "author,source"
  ],
  "attributesForFaceting": [
    "tags",
    "type", 
    "source",
    "published_date"
  ],
  "ranking": [
    "desc(popularity_score)",
    "desc(published_date)", 
    "typo",
    "geo",
    "words", 
    "filters",
    "proximity",
    "attribute",
    "exact",
    "custom"
  ]
}
```

#### Typesense Schema
```json
{
  "name": "nuestro_pulso_content",
  "fields": [
    {"name": "title", "type": "string"},
    {"name": "content", "type": "string"},
    {"name": "tags", "type": "string[]", "facet": true},
    {"name": "published_date", "type": "int64", "sort": true},
    {"name": "popularity_score", "type": "float", "sort": true},
    {"name": "authority_score", "type": "float", "sort": true}
  ],
  "default_sorting_field": "popularity_score"
}
```

## 🔍 JSON-LD Structured Data

### Client-Side Generation

The UI automatically generates JSON-LD structured data for each search results page:

```javascript
{
  "@context": "https://schema.org",
  "@type": "SearchResultsPage", 
  "url": "current-page-url",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "NewsArticle",
          "headline": "Article Title",
          "url": "article-url",
          "datePublished": "2024-09-15T10:30:00Z",
          "description": "Article snippet..."
        }
      }
    ]
  }
}
```

### Server-Side Generation (Recommended)

For better SEO, generate JSON-LD server-side:

#### Express.js Example
```javascript
app.get('/search', async (req, res) => {
    const { q, page = 1 } = req.query;
    const searchResults = await searchEngine.search(q, page);
    
    const jsonLD = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "url": `${req.protocol}://${req.get('host')}/search?q=${q}&page=${page}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": searchResults.map((result, index) => ({
                "@type": "ListItem", 
                "position": index + 1,
                "item": {
                    "@type": "NewsArticle",
                    "headline": result.title,
                    "url": result.url,
                    "datePublished": result.published_date,
                    "description": result.snippet,
                    "author": {
                        "@type": "Organization",
                        "name": result.author
                    }
                }
            }))
        }
    };
    
    res.render('search', { 
        results: searchResults, 
        jsonLD: JSON.stringify(jsonLD),
        query: q 
    });
});
```

#### Next.js Example
```javascript
export async function getServerSideProps({ query }) {
    const { q, page = 1 } = query;
    const searchResults = await searchAPI(q, page);
    
    const jsonLD = generateSearchResultsLD(searchResults, q, page);
    
    return {
        props: {
            results: searchResults,
            jsonLD,
            query: q
        }
    };
}
```

## 🎨 Customization

### Styling
- Modify `styles.css` to match your brand colors and typography
- The CSS uses CSS custom properties for easy theming
- Mobile-first responsive design with breakpoints at 768px and 1024px

### Layout Changes
- Add/remove sections in `search.html`
- Customize the top stories carousel layout
- Modify result card templates in `script.js`

### Search Behavior
- Adjust debounce timing for search-as-you-type
- Customize pagination vs infinite scroll preference
- Modify ranking and filtering logic

## 🧪 Testing

### Manual Testing Checklist

- [ ] Search works with query parameter `?q=test`
- [ ] Results render properly on mobile devices
- [ ] Top stories carousel scrolls horizontally
- [ ] Pagination controls work correctly
- [ ] Infinite scroll loads more results
- [ ] Loading states display appropriately
- [ ] Error handling works for failed searches
- [ ] JSON-LD is generated in browser console
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader announcements

### Browser Testing
- Chrome (Android/iOS)
- Safari (iOS)
- Firefox (Android)
- Samsung Internet
- Edge (mobile)

## 🚀 Production Deployment

### Performance Optimizations

1. **Image optimization**:
   ```javascript
   // Use responsive images with lazy loading
   <img src="image.jpg" 
        srcset="image-320w.jpg 320w, image-640w.jpg 640w"
        sizes="(max-width: 320px) 280px, 640px"
        loading="lazy">
   ```

2. **CDN integration**:
   ```html
   <!-- Use CDN for static assets -->
   <link rel="preconnect" href="https://cdn.example.com">
   <link rel="dns-prefetch" href="https://www.google.com">
   ```

3. **Service worker** (optional):
   ```javascript
   // Cache search results and static assets
   if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('/sw.js');
   }
   ```

### SEO Best Practices

1. **Server-side rendering**: Render initial results server-side
2. **Meta tags**: Include relevant meta descriptions and keywords  
3. **Structured data**: Use server-side JSON-LD generation
4. **URL structure**: Clean, descriptive URLs with search terms
5. **Sitemap**: Include search result pages in XML sitemap

## 📱 Mobile-First Design

The UI is built mobile-first with:
- Touch-friendly tap targets (44px minimum)
- Optimized font sizes for readability
- Smooth scrolling and transitions
- Efficient layout for small screens
- Progressive enhancement for larger screens

## 🔧 Files Overview

- **`search.html`**: Main search results page with semantic HTML and ARIA roles
- **`styles.css`**: Mobile-first responsive CSS matching Google's design
- **`script.js`**: JavaScript demo with mock data and integration examples
- **`README.md`**: This documentation file

## 🤝 Next Steps

1. **Choose your search backend** (Algolia, Typesense, Elasticsearch, or custom API)
2. **Set up your search index** using the recommended schema
3. **Replace mock implementation** with real search API calls
4. **Customize styling** to match your brand
5. **Test thoroughly** on mobile devices
6. **Deploy** with server-side rendering for optimal SEO
7. **Monitor performance** and user engagement metrics

For questions or improvements, refer to the main project documentation or create an issue in the repository.