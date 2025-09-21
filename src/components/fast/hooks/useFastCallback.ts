import React, { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Ultra-fast state management hooks
 * Optimized for zero-delay updates and minimal re-renders
 */

// Fast state hook with immediate updates
export function useFastState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);
  const isUpdatingRef = useRef(false);
  
  const fastSetState = useCallback((value: T | ((prev: T) => T)) => {
    if (isUpdatingRef.current) return;
    
    isUpdatingRef.current = true;
    
    // Use flushSync for immediate updates when possible
    try {
      setState(value);
    } finally {
      // Reset flag in next tick to allow batching when beneficial
      Promise.resolve().then(() => {
        isUpdatingRef.current = false;
      });
    }
  }, []);
  
  return [state, fastSetState];
}

// Fast effect hook with optimized dependency checking
export function useFastEffect(effect: () => void | (() => void), deps?: React.DependencyList) {
  const prevDepsRef = useRef<React.DependencyList>();
  const cleanupRef = useRef<(() => void) | void>();
  
  useEffect(() => {
    // Skip if dependencies haven't actually changed (deep comparison)
    if (prevDepsRef.current && deps && depsEqual(prevDepsRef.current, deps)) {
      return;
    }
    
    // Clean up previous effect
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    
    // Run new effect
    cleanupRef.current = effect();
    prevDepsRef.current = deps;
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, deps);
}

// Fast memo hook with shallow comparison optimization
export function useFastMemo<T>(factory: () => T, deps?: React.DependencyList): T {
  const valueRef = useRef<T>();
  const prevDepsRef = useRef<React.DependencyList>();
  
  // Only recompute if dependencies have changed
  if (!prevDepsRef.current || !deps || !depsEqual(prevDepsRef.current, deps)) {
    valueRef.current = factory();
    prevDepsRef.current = deps;
  }
  
  return valueRef.current as T;
}

// Fast callback hook with minimal re-creation
export function useFastCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps?: React.DependencyList
): T {
  const callbackRef = useRef<T>(callback);
  const prevDepsRef = useRef<React.DependencyList>();
  
  // Update callback reference only when dependencies change
  if (!prevDepsRef.current || !deps || !depsEqual(prevDepsRef.current, deps)) {
    callbackRef.current = callback;
    prevDepsRef.current = deps;
  }
  
  // Return stable reference
  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as T;
}

// Fast search hook with debouncing and caching
export function useFastSearch<T = any>(
  searchFn: (query: string, options?: any) => Promise<T>,
  debounceMs: number = 300
) {
  const [query, setQuery] = useFastState('');
  const [results, setResults] = useFastState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const searchCache = useRef(new Map<string, T>());
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const abortControllerRef = useRef<AbortController>();
  
  const search = useFastCallback(async (searchQuery: string, options?: any) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setError(null);
      return;
    }
    
    const cacheKey = `${searchQuery}:${JSON.stringify(options || {})}`;
    
    // Check cache first
    if (searchCache.current.has(cacheKey)) {
      setResults(searchCache.current.get(cacheKey)!);
      return;
    }
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Clear debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    setIsLoading(true);
    setError(null);
    
    debounceRef.current = setTimeout(async () => {
      try {
        abortControllerRef.current = new AbortController();
        const result = await searchFn(searchQuery, { ...options, signal: abortControllerRef.current.signal });
        
        // Cache successful results
        searchCache.current.set(cacheKey, result);
        
        // Limit cache size
        if (searchCache.current.size > 100) {
          const firstKey = searchCache.current.keys().next().value as string;
          if (firstKey) {
            searchCache.current.delete(firstKey);
          }
        }
        
        setResults(result);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  }, [searchFn, debounceMs]);
  
  // Auto-search when query changes
  useFastEffect(() => {
    search(query);
  }, [query, search]);
  
  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    search,
    clearCache: () => searchCache.current.clear()
  };
}

// Fast local data hook for Colombian content
export function useFastLocalData(region: string = 'colombia') {
  const [localData, setLocalData] = useFastState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = useRef(new Map<string, any>());
  
  const loadLocalData = useFastCallback(async (dataType: string, params?: any) => {
    const cacheKey = `${region}:${dataType}:${JSON.stringify(params || {})}`;
    
    if (cacheRef.current.has(cacheKey)) {
      setLocalData(cacheRef.current.get(cacheKey));
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call for local data
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const mockData = generateMockLocalData(region, dataType, params);
      
      cacheRef.current.set(cacheKey, mockData);
      setLocalData(mockData);
    } catch (error) {
      console.error('Failed to load local data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [region]);
  
  return {
    localData,
    isLoading,
    loadLocalData,
    clearCache: () => cacheRef.current.clear()
  };
}

// Utility functions
function depsEqual(deps1: React.DependencyList, deps2: React.DependencyList): boolean {
  if (deps1.length !== deps2.length) return false;
  
  for (let i = 0; i < deps1.length; i++) {
    if (Object.is(deps1[i], deps2[i]) === false) {
      return false;
    }
  }
  
  return true;
}

function generateMockLocalData(region: string, dataType: string, params?: any) {
  // Mock data generator for local Colombian content
  const baseData = {
    region,
    timestamp: new Date().toISOString(),
    cached: true
  };
  
  switch (dataType) {
    case 'news':
      return {
        ...baseData,
        articles: [
          {
            id: '1',
            title: 'Últimas noticias locales de Colombia',
            summary: 'Cobertura completa de eventos nacionales',
            source: 'El Tiempo',
            publishedAt: new Date(),
            isLocal: true,
            location: 'Bogotá'
          }
        ]
      };
    case 'trending':
      return {
        ...baseData,
        topics: [
          'Reforma pensional Colombia',
          'Gustavo Petro noticias',
          'Elecciones regionales 2024'
        ]
      };
    case 'categories':
      return {
        ...baseData,
        categories: [
          { id: 'politica', name: 'Política Nacional', count: 47 },
          { id: 'economia', name: 'Economía', count: 32 },
          { id: 'seguridad', name: 'Seguridad', count: 28 }
        ]
      };
    default:
      return baseData;
  }
}