import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Ultra-fast optimized state hook with built-in performance monitoring
 * Part of fast-r7aqkx-222-d component series
 */
export interface OptimizedStateOptions<T> {
  defaultValue: T;
  throttleMs?: number;
  enablePerformanceTracking?: boolean;
  validator?: (value: T) => boolean;
}

export interface PerformanceMetrics {
  updateCount: number;
  averageUpdateTime: number;
  lastUpdateTime: number;
}

export function useOptimizedState<T>(options: OptimizedStateOptions<T>) {
  const { defaultValue, throttleMs = 0, enablePerformanceTracking = false, validator } = options;
  
  const [state, setState] = useState<T>(defaultValue);
  const performanceRef = useRef<PerformanceMetrics>({
    updateCount: 0,
    averageUpdateTime: 0,
    lastUpdateTime: 0
  });
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingUpdateRef = useRef<T | null>(null);

  const optimizedSetState = useCallback((newValue: T | ((prev: T) => T)) => {
    const startTime = enablePerformanceTracking ? performance.now() : 0;
    
    const resolvedValue = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(state)
      : newValue;

    // Validate if validator is provided
    if (validator && !validator(resolvedValue)) {
      console.warn('useOptimizedState: Invalid value rejected by validator');
      return;
    }

    const updateState = () => {
      setState(resolvedValue);
      
      if (enablePerformanceTracking) {
        const endTime = performance.now();
        const updateTime = endTime - startTime;
        const metrics = performanceRef.current;
        
        metrics.updateCount++;
        metrics.lastUpdateTime = updateTime;
        metrics.averageUpdateTime = (
          (metrics.averageUpdateTime * (metrics.updateCount - 1) + updateTime) / 
          metrics.updateCount
        );
      }
    };

    if (throttleMs > 0) {
      pendingUpdateRef.current = resolvedValue;
      
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
      
      throttleRef.current = setTimeout(() => {
        updateState();
        throttleRef.current = null;
        pendingUpdateRef.current = null;
      }, throttleMs);
    } else {
      updateState();
    }
  }, [state, throttleMs, enablePerformanceTracking, validator]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);

  const getPerformanceMetrics = useCallback(() => {
    return enablePerformanceTracking ? { ...performanceRef.current } : null;
  }, [enablePerformanceTracking]);

  const resetPerformanceMetrics = useCallback(() => {
    if (enablePerformanceTracking) {
      performanceRef.current = {
        updateCount: 0,
        averageUpdateTime: 0,
        lastUpdateTime: 0
      };
    }
  }, [enablePerformanceTracking]);

  return {
    value: state,
    setValue: optimizedSetState,
    getPerformanceMetrics,
    resetPerformanceMetrics,
    isPending: pendingUpdateRef.current !== null
  };
}