import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UniversalSearchService, createDebouncedSearch } from '../services/UniversalSearchService';

// Mock the fallback data import
vi.mock('../data/searchFallbackData', () => ({
  getSearchResults: vi.fn(() => [
    {
      id: 'test-1',
      title: 'Test Result 1',
      summary: 'Test summary 1',
      source: 'Test Source',
      category: 'Test',
      timestamp: '2024-01-01T00:00:00Z',
      relevanceScore: 95,
      link: '#test-1',
      image: '🧪'
    },
    {
      id: 'test-2',
      title: 'Test Result 2',
      summary: 'Test summary 2',
      source: 'Test Source',
      category: 'Test',
      timestamp: '2024-01-01T01:00:00Z',
      relevanceScore: 90,
      link: '#test-2',
      image: '🔬'
    }
  ])
}));

describe('UniversalSearchService', () => {
  let searchService: UniversalSearchService;

  beforeEach(() => {
    searchService = new UniversalSearchService();
    vi.clearAllMocks();
  });

  describe('search method', () => {
    it('should return empty results for empty query', async () => {
      const result = await searchService.search('');
      
      expect(result.results).toHaveLength(0);
      expect(result.totalResults).toBe(0);
      expect(result.hasMorePages).toBe(false);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(0);
    });

    it('should return paginated results for valid query', async () => {
      const result = await searchService.search('test', 1, 1);
      
      expect(result.results).toHaveLength(1);
      expect(result.totalResults).toBe(2);
      expect(result.hasMorePages).toBe(true);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(2);
    });

    it('should return second page results', async () => {
      const result = await searchService.search('test', 2, 1);
      
      expect(result.results).toHaveLength(1);
      expect(result.results[0].id).toBe('test-2');
      expect(result.currentPage).toBe(2);
      expect(result.hasMorePages).toBe(false);
    });

    it('should handle pagination correctly with different page sizes', async () => {
      const result = await searchService.search('test', 1, 10);
      
      expect(result.results).toHaveLength(2);
      expect(result.totalResults).toBe(2);
      expect(result.hasMorePages).toBe(false);
      expect(result.totalPages).toBe(1);
    });

    it('should cache search results', async () => {
      const { getSearchResults } = await import('../data/searchFallbackData');
      
      // First call
      await searchService.search('test');
      expect(getSearchResults).toHaveBeenCalledTimes(1);
      
      // Second call with same parameters should use cache
      await searchService.search('test');
      expect(getSearchResults).toHaveBeenCalledTimes(1);
    });

    it('should handle search errors gracefully', async () => {
      const { getSearchResults } = await import('../data/searchFallbackData');
      getSearchResults.mockImplementationOnce(() => {
        throw new Error('Search failed');
      });

      const searchServiceWithFallback = new UniversalSearchService({ enableFallback: true });
      
      // Should not throw, should fallback
      await expect(searchServiceWithFallback.search('test')).resolves.toBeDefined();
    });
  });

  describe('configuration', () => {
    it('should use provided configuration', () => {
      const customService = new UniversalSearchService({
        maxResults: 100,
        enableFallback: false,
        debounceMs: 500
      });
      
      expect(customService).toBeDefined();
    });

    it('should update configuration', () => {
      searchService.updateConfig({ maxResults: 25 });
      expect(searchService).toBeDefined();
    });

    it('should clear cache', () => {
      searchService.clearCache();
      expect(searchService).toBeDefined();
    });
  });
});

describe('createDebouncedSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce search calls', () => {
    const mockSearchFn = vi.fn();
    const debouncedSearch = createDebouncedSearch(mockSearchFn, 300);
    
    debouncedSearch('test1');
    debouncedSearch('test2');
    debouncedSearch('test3');
    
    expect(mockSearchFn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(300);
    
    expect(mockSearchFn).toHaveBeenCalledTimes(1);
    expect(mockSearchFn).toHaveBeenCalledWith('test3');
  });

  it('should not call search for empty queries', () => {
    const mockSearchFn = vi.fn();
    const debouncedSearch = createDebouncedSearch(mockSearchFn, 300);
    
    debouncedSearch('');
    debouncedSearch('   ');
    
    vi.advanceTimersByTime(300);
    
    expect(mockSearchFn).not.toHaveBeenCalled();
  });

  it('should use custom delay', () => {
    const mockSearchFn = vi.fn();
    const debouncedSearch = createDebouncedSearch(mockSearchFn, 500);
    
    debouncedSearch('test');
    
    vi.advanceTimersByTime(300);
    expect(mockSearchFn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(200);
    expect(mockSearchFn).toHaveBeenCalledWith('test');
  });

  it('should cancel previous calls when new ones are made', () => {
    const mockSearchFn = vi.fn();
    const debouncedSearch = createDebouncedSearch(mockSearchFn, 300);
    
    debouncedSearch('test1');
    vi.advanceTimersByTime(200);
    
    debouncedSearch('test2');
    vi.advanceTimersByTime(200);
    
    debouncedSearch('test3');
    vi.advanceTimersByTime(300);
    
    expect(mockSearchFn).toHaveBeenCalledTimes(1);
    expect(mockSearchFn).toHaveBeenCalledWith('test3');
  });
});