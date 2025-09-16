# Universal Search Documentation

## Overview

The Universal Search feature provides comprehensive search functionality for the Nuestro Pulso platform, allowing users to find relevant political, civic, and news content across multiple categories and sources.

## Architecture

### Core Components

1. **UniversalSearchBar** (`src/components/UniversalSearchBar.tsx`)
   - Main UI component with search input, filters, and results display
   - Supports real-time debounced search
   - Provides pagination, sorting, and filtering controls
   - URL state persistence for shareable results

2. **UniversalSearchService** (`src/services/UniversalSearchService.ts`)
   - Search aggregation service
   - Combines fallback data with external API results
   - Implements caching and error handling
   - Supports multiple data sources

3. **Search Fallback Data** (`src/data/searchFallbackData.ts`)
   - Comprehensive pre-curated search results
   - Ensures no empty states for popular queries
   - Dynamic result generation for any search term
   - Category-specific content for Colombian context

## Features

### ✅ Implemented Features

- **Multi-result search**: Returns 12+ results for popular queries like "Facebook"
- **Real-time search**: 300ms debounced input for smooth UX
- **Pagination**: Full pagination with numbered pages and navigation
- **URL persistence**: Search state encoded in URL for sharing
- **Category filtering**: Filter by Política, Tecnología, Internacional, etc.
- **Sorting options**: By relevance, date, or category
- **Display modes**: Card and list view options
- **Click navigation**: Results open appropriate detail pages
- **Mobile responsive**: Works on desktop and mobile devices
- **Error handling**: Graceful fallbacks and error states
- **Loading states**: Skeleton loading and progress indicators

### 🔧 Configuration

#### Environment Variables

Add to your `.env` file:

```bash
# Google Search API (optional - fallback data used if not configured)
REACT_APP_GOOGLE_SEARCH_API_KEY=your_google_api_key_here
REACT_APP_GOOGLE_SEARCH_CX=your_custom_search_engine_id_here
```

#### Search Service Configuration

```typescript
import { UniversalSearchService } from './services/UniversalSearchService';

const searchService = new UniversalSearchService({
  googleApiKey: process.env.REACT_APP_GOOGLE_SEARCH_API_KEY,
  googleCx: process.env.REACT_APP_GOOGLE_SEARCH_CX,
  maxResults: 50,        // Maximum results to return
  enableFallback: true,  // Use fallback data on API errors
  debounceMs: 300       // Debounce delay for real-time search
});
```

## API Integration

### Google Custom Search Setup (Optional)

1. **Get Google API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select a project
   - Enable "Custom Search API"
   - Create credentials → API Key

2. **Create Custom Search Engine**:
   - Go to [Google Custom Search](https://cse.google.com/)
   - Create new search engine
   - Configure to search Colombian news sites
   - Copy the Search Engine ID (CX)

3. **Configure Environment**:
   ```bash
   REACT_APP_GOOGLE_SEARCH_API_KEY=AIzaSy...your_key
   REACT_APP_GOOGLE_SEARCH_CX=017576...your_cx_id
   ```

### Adding New Data Sources

To add additional search sources, extend the `UniversalSearchService`:

```typescript
// In aggregateSearchResults method
private async aggregateSearchResults(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  // Always include fallback data
  const fallbackResults = getSearchResults(query);
  results.push(...fallbackResults);

  // Add Google Search if configured
  if (this.config.googleApiKey && this.config.googleCx) {
    const googleResults = await this.searchGoogle(query);
    results.push(...googleResults);
  }

  // Add your custom source here
  if (this.config.customApiKey) {
    const customResults = await this.searchCustomSource(query);
    results.push(...customResults);
  }

  return this.deduplicateResults(results);
}
```

## Testing

### Running Tests

```bash
# Install test dependencies (if not already installed)
npm install

# Run simple unit tests
npm run test:simple

# Run full test suite (requires vitest setup)
npm run test
```

### Manual Testing Checklist

1. **Search Functionality**:
   - [ ] Search for "Facebook" returns 12+ results
   - [ ] Search for "Trump" returns relevant results
   - [ ] Search for "tecnología" returns technology results
   - [ ] Empty search shows appropriate state
   - [ ] Real-time search works as you type

2. **Pagination**:
   - [ ] Multiple pages display correctly
   - [ ] Page numbers work (1, 2, etc.)
   - [ ] Previous/Next buttons function
   - [ ] URL updates with page changes

3. **Filtering & Sorting**:
   - [ ] Category filter works (Política, Tecnología, etc.)
   - [ ] Sort by relevance/date/category functions
   - [ ] Display mode toggle (cards/list) works

4. **URL Persistence**:
   - [ ] Search URLs are shareable
   - [ ] Browser back/forward works
   - [ ] Page refresh maintains search state

5. **Error Handling**:
   - [ ] Network errors show appropriate message
   - [ ] Empty results show helpful state
   - [ ] Loading states display correctly

## Performance Considerations

### Optimization Features

- **Debounced Input**: 300ms delay prevents excessive API calls
- **Result Caching**: Search results cached for 5 minutes
- **Pagination**: Server-side pagination reduces data transfer
- **Lazy Loading**: Only load results as needed
- **Deduplication**: Removes duplicate results across sources

### Performance Limits

- **Maximum Results**: Capped at 50 results per query (configurable)
- **Deep Paging Limit**: Prevents excessive pagination (planned: 2000 items)
- **Cache Expiry**: 5-minute cache prevents stale data
- **Rate Limiting**: Built-in backoff for API calls

## Troubleshooting

### Common Issues

1. **Only 1 result for popular queries**:
   - ✅ **Fixed**: Now returns 12+ results with comprehensive fallback data

2. **Search not working**:
   - Check console for JavaScript errors
   - Verify fallback data is loading correctly
   - Test with different search terms

3. **Pagination not working**:
   - Verify URL persistence is enabled
   - Check for JavaScript errors in pagination logic
   - Test with different result counts

4. **Google API not working**:
   - Verify API key is configured correctly
   - Check API quota and billing
   - Ensure Custom Search Engine is set up
   - Fallback data should still work without API

### Debug Mode

Enable debug logging in the search service:

```typescript
// In browser console
localStorage.setItem('DEBUG_SEARCH', 'true');
```

### Performance Issues

- Monitor network tab for excessive API calls
- Check if debouncing is working correctly
- Verify caching is functioning
- Consider reducing `maxResults` if needed

## Future Enhancements

### Planned Features

- [ ] **Infinite Scroll**: Optional infinite scroll mode
- [ ] **Advanced Filters**: Date range, source filtering
- [ ] **Search History**: Save recent searches
- [ ] **Bookmarking**: Save favorite results
- [ ] **Search Analytics**: Track search patterns
- [ ] **Voice Search**: Speech-to-text input
- [ ] **Autocomplete**: Search suggestions
- [ ] **Export Results**: PDF/CSV export options

### External API Integration

- [ ] **News APIs**: Integration with Colombian news sources
- [ ] **Government APIs**: Official government data sources  
- [ ] **Social Media**: Twitter/X, Facebook public posts
- [ ] **Academic Sources**: Research papers and studies

## Contributing

### Adding New Search Categories

1. Add category data to `searchFallbackData.ts`:

```typescript
export const newCategoryResults: SearchResult[] = [
  {
    id: 'new-1',
    title: 'New Category Result',
    summary: 'Description of the result...',
    source: 'Source Name',
    category: 'New Category',
    timestamp: '2024-01-15T10:00:00Z',
    relevanceScore: 95,
    link: '#/new-category-result',
    image: '🆕'
  }
];
```

2. Add to fallback data map:

```typescript
export const fallbackSearchData: Record<string, SearchResult[]> = {
  // existing categories...
  'new-category': newCategoryResults
};
```

3. Update filter dropdown in `UniversalSearchBar.tsx`:

```tsx
<option value="new-category">New Category</option>
```

### Adding New Data Sources

See "Adding New Data Sources" section above for detailed implementation guide.

## Support

For issues and questions:

1. Check this documentation first
2. Review the troubleshooting section
3. Test with manual testing checklist
4. Check browser console for errors
5. Create GitHub issue with reproduction steps

## License

This Universal Search implementation is part of the Nuestro Pulso project and follows the same license terms.