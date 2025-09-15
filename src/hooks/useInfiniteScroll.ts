/**
 * Custom hook for infinite scroll functionality with comprehensive state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { dataService, PaginationOptions, ApiResponse } from '../services/dataService';

export interface UseInfiniteScrollOptions extends Omit<PaginationOptions, 'page'> {
  initialPage?: number;
  threshold?: number; // Distance from bottom to trigger load
  enabled?: boolean;
}

export interface InfiniteScrollState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  totalItems: number;
  metadata: {
    source: 'api' | 'fallback' | 'cache';
    lastUpdated: Date;
    loadTime: number;
  } | null;
}

export function useInfiniteScroll<T>(
  fetchFunction: (options: PaginationOptions) => Promise<ApiResponse<T>>,
  options: UseInfiniteScrollOptions
) {
  const [state, setState] = useState<InfiniteScrollState<T>>({
    data: [],
    loading: false,
    error: null,
    hasMore: true,
    page: options.initialPage || 1,
    totalItems: 0,
    metadata: null
  });

  const isMountedRef = useRef(true);
  const loadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset state when category or other dependencies change
  const resetData = useCallback(() => {
    setState({
      data: [],
      loading: false,
      error: null,
      hasMore: true,
      page: options.initialPage || 1,
      totalItems: 0,
      metadata: null
    });
  }, [options.category, options.sortBy, options.sortOrder, options.initialPage]);

  // Load more data
  const loadMore = useCallback(async (resetFirst: boolean = false) => {
    if (loadingRef.current || (!state.hasMore && !resetFirst)) return;

    loadingRef.current = true;
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const currentPage = resetFirst ? 1 : state.page;
      const response = await fetchFunction({
        page: currentPage,
        limit: options.limit,
        category: options.category,
        sortBy: options.sortBy,
        sortOrder: options.sortOrder
      });

      if (!isMountedRef.current) return;

      setState(prev => ({
        ...prev,
        data: resetFirst ? response.data : [...prev.data, ...response.data],
        loading: false,
        hasMore: response.pagination.hasMore,
        page: currentPage + 1,
        totalItems: response.pagination.total,
        metadata: response.metadata
      }));

    } catch (error) {
      if (!isMountedRef.current) return;

      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error al cargar datos'
      }));
    } finally {
      loadingRef.current = false;
    }
  }, [state.page, state.hasMore, options, fetchFunction]);

  // Initial load
  useEffect(() => {
    if (options.enabled !== false) {
      loadMore(true);
    }
  }, [options.category, options.sortBy, options.sortOrder, options.enabled]);

  // Intersection observer for infinite scroll
  const observeElement = useCallback((element: HTMLElement | null) => {
    if (!element || !options.enabled) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && state.hasMore && !state.loading) {
          loadMore();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: '100px'
      }
    );

    observerRef.current.observe(element);
  }, [state.hasMore, state.loading, loadMore, options.enabled, options.threshold]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Manual refresh
  const refresh = useCallback(() => {
    resetData();
    setTimeout(() => loadMore(true), 100);
  }, [resetData, loadMore]);

  // Retry after error
  const retry = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
    loadMore();
  }, [loadMore]);

  return {
    ...state,
    loadMore: () => loadMore(),
    refresh,
    retry,
    observeElement,
    resetData
  };
}

/**
 * Specialized hook for Pulse Reels infinite scroll
 */
export function useInfiniteReels(options: Omit<UseInfiniteScrollOptions, 'limit'>) {
  return useInfiniteScroll(
    dataService.fetchReels.bind(dataService),
    { ...options, limit: 12 } // Load 12 reels at a time for good UX
  );
}

/**
 * Specialized hook for News infinite scroll
 */
export function useInfiniteNews(options: Omit<UseInfiniteScrollOptions, 'limit'>) {
  return useInfiniteScroll(
    dataService.fetchNews.bind(dataService),
    { ...options, limit: 6 } // Load 6 news articles at a time
  );
}

/**
 * Hook for managing search with pagination
 */
export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const search = useCallback(async (newQuery: string, resetResults: boolean = true) => {
    if (!newQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    if (resetResults) {
      setResults([]);
      setPage(1);
    }

    try {
      const response = await dataService.searchGlobal({
        query: newQuery,
        page: resetResults ? 1 : page,
        limit: 10,
        filters
      });

      setResults(prev => resetResults ? response.data : [...prev, ...response.data]);
      setHasMore(response.pagination.hasMore);
      setTotalResults(response.pagination.total);
      setPage(prev => resetResults ? 2 : prev + 1);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const loadMore = useCallback(() => {
    if (query && hasMore && !loading) {
      search(query, false);
    }
  }, [query, hasMore, loading, search]);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setPage(1);
    setHasMore(true);
    setTotalResults(0);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    error,
    hasMore,
    totalResults,
    search,
    loadMore,
    clearResults
  };
}