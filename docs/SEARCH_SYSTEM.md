# Search System Documentation

## Overview

Nuestro Pulso implements a dual search system designed to meet different user needs and search contexts. This document explains the architecture, components, and usage patterns for future maintainers.

## Architecture

### Dual Search Pattern

The application implements two distinct search experiences:

1. **Global Search** (Homepage) - Comprehensive international search
2. **Local Search** (Navbar) - Colombian-focused quick search

This separation addresses user confusion and provides appropriate search functionality for different entry points.

## Components

### 1. GlobalSearchBar (`/src/components/GlobalSearchBar.tsx`)

**Purpose**: Comprehensive global search for international and broad content discovery.

**Location**: Homepage (HeroSection)

**Features**:
- Google/Bing API integration
- NewsAPI for international news
- Regional filtering (World, Latin America, Colombia)
- Rich result presentation (Google-style layout)
- Advanced search options
- Global-first approach with regional refinement

**Visual Identity**:
- 🌍 World icon
- Blue color scheme
- "Búsqueda Global" heading
- Placeholder: "Buscar noticias mundiales, políticas globales..."

**Search Mode**: `searchMode: 'global'`

### 2. LocalSearchBar (`/src/components/LocalSearchBar.tsx`)

**Purpose**: Fast, focused search for Colombian civic content and local information.

**Location**: Navbar (for quick access)

**Features**:
- Colombian-only content sources
- Local database search
- Internal articles and discussions
- Congressional debates and polls
- No external API calls (for speed)
- Colombian civic data focus

**Visual Identity**:
- 🇨🇴 Colombian flag icon
- Yellow color scheme (Colombian flag colors)
- "Buscar en Colombia" placeholder
- Colombian-themed suggestions

**Search Mode**: `searchMode: 'local'`

## SearchService Architecture

### File: `/src/services/searchService.ts`

The SearchService implements a unified interface that routes search requests based on the `searchMode` parameter:

```typescript
interface SearchOptions {
  query: string;
  searchMode?: 'global' | 'local';
  // ... other options
}
```

### Search Flow

1. **Global Search Flow**:
   ```
   GlobalSearchBar → searchService.search({searchMode: 'global'}) 
   → performGlobalSearch() → API calls → External sources → Rich results
   ```

2. **Local Search Flow**:
   ```
   LocalSearchBar → searchService.search({searchMode: 'local'}) 
   → performLocalSearch() → Local database → Colombian content
   ```

### Implementation Details

#### Global Search (`performGlobalSearch`)
- Attempts external API calls (Google, Bing, NewsAPI)
- Falls back to proxy server if direct APIs fail
- Final fallback to local mock data
- Supports regional filtering
- Enhanced query processing for international context

#### Local Search (`performLocalSearch`)
- Direct local database queries only
- Colombian-specific content generation
- No external API dependencies
- Fast response times
- Content types: debates, polls, articles, news, discussions

## Content Strategy

### Global Search Content
- International news and politics
- Global economic analysis
- World events and developments
- Regional analysis (Latin America focus available)
- Cross-border Colombian relations

### Local Search Content
- Colombian Congressional debates
- National polls and surveys
- Local civic discussions
- Colombian government announcements
- Regional Colombian news
- Internal platform content

## User Experience Guidelines

### When to Use Global Search
- Researching international topics
- Comparing global perspectives
- Finding comprehensive analysis
- Exploring world events affecting Colombia
- Academic or professional research

### When to Use Local Search
- Quick Colombian content lookup
- Finding local discussions
- Accessing civic data
- Searching platform-specific content
- Fast navigation to Colombian topics

## Visual Distinction

The two search interfaces are intentionally distinct to prevent user confusion:

| Aspect | Global Search | Local Search |
|--------|---------------|--------------|
| Icon | 🌍 World globe | 🇨🇴 Colombian flag |
| Color | Blue theme | Yellow theme |
| Location | Homepage center | Navbar |
| Label | "Búsqueda Global" | "Buscar en Colombia" |
| Scope | International | Colombian-only |

## Technical Implementation Notes

### SearchService Routing
The service uses the `searchMode` parameter to determine which search implementation to use:

```typescript
if (searchMode === 'local') {
  return this.performLocalSearch(options);
} else {
  return this.performGlobalSearch(options);
}
```

### Error Handling
- Global search has multiple fallback layers (API → Proxy → Local)
- Local search fails gracefully to empty results
- Network timeouts are handled appropriately
- User feedback provided for all error states

### Performance Considerations
- Local search is optimized for speed (no external calls)
- Global search uses timeout controls and fallbacks
- Results are cached appropriately
- Debouncing prevents excessive API calls

## Future Enhancements

### Planned Improvements
1. Enhanced local database integration
2. More sophisticated regional filtering
3. Machine learning for result relevance
4. Real-time Colombian news integration
5. Advanced search operators

### Maintenance Guidelines
1. Monitor API usage and costs for global search
2. Keep local content database updated
3. Review and update regional filtering logic
4. Maintain clear separation between search modes
5. Regular testing of fallback mechanisms

## Configuration

### Environment Variables
- `REACT_APP_SEARCH_PROXY_URL`: Global search proxy endpoint
- `REACT_APP_PAGING_CAP`: Maximum results per search
- `REACT_APP_SEARCH_RESULTS_PER_PAGE`: Results per page
- `REACT_APP_SEARCH_DEBOUNCE_MS`: Search debounce timing

### Search Categories
Defined in `/src/config/categories.ts`:
- Política, Educación, Ambiente, Participación
- Internacional, Social, Seguridad, Economía, Tecnología

## Testing

### Manual Testing Checklist
- [ ] Global search returns international results
- [ ] Local search returns Colombian content only
- [ ] Visual distinction is clear to users
- [ ] Regional filtering works correctly
- [ ] Fallback mechanisms function properly
- [ ] Error states display appropriate messages
- [ ] Performance is acceptable for both modes

### Automated Testing
- Unit tests for search service routing
- Integration tests for component behavior
- E2E tests for complete user workflows
- Performance tests for response times

## Support and Troubleshooting

### Common Issues
1. **No global search results**: Check API endpoints and keys
2. **Slow global search**: Verify proxy server status
3. **Missing local content**: Update local database
4. **Visual confusion**: Ensure proper component styling

### Debug Mode
Enable debug logging by setting `DEBUG=true` in the console to see search routing and API call details.

---

**Last Updated**: December 2024  
**Maintainer**: Development Team  
**Contact**: For questions about this search system, consult the development team or check the GitHub repository issues.