import React, { useCallback, useRef, useEffect } from 'react';
import { useOptimizedState } from './useOptimizedState';

/**
 * Ultra-fast debounce hook for instant UI feedback
 * Part of fast-r7aqkx-223-d component series
 */
export interface DebounceOptions {
  delay: number;
  immediate?: boolean;
  maxWait?: number;
}

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  options: DebounceOptions
): T {
  const { delay, immediate = false, maxWait } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T>>();

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    lastArgsRef.current = args;
    lastCallTimeRef.current = now;

    const execute = () => {
      callback(...args);
    };

    const shouldCallImmediately = immediate && !timeoutRef.current;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Handle immediate execution
    if (shouldCallImmediately) {
      execute();
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (!immediate || !shouldCallImmediately) {
        execute();
      }
      timeoutRef.current = null;
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
        maxTimeoutRef.current = null;
      }
    }, delay);

    // Handle maxWait
    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        execute();
        maxTimeoutRef.current = null;
      }, maxWait);
    }
  }, [callback, delay, immediate, maxWait]) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Ultra-fast throttle hook for high-frequency events
 * Part of fast-r7aqkx-224-d component series
 */
export interface ThrottleOptions {
  delay: number;
  leading?: boolean;
  trailing?: boolean;
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  options: ThrottleOptions
): T {
  const { delay, leading = true, trailing = true } = options;
  const lastCallTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T>>();

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTimeRef.current;
    
    lastArgsRef.current = args;

    const execute = () => {
      lastCallTimeRef.current = Date.now();
      callback(...args);
    };

    // Leading edge
    if (leading && timeSinceLastCall >= delay) {
      execute();
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Trailing edge
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        execute();
        timeoutRef.current = null;
      }, delay - timeSinceLastCall);
    }
  }, [callback, delay, leading, trailing]) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Ultra-fast intersection observer hook for performance
 * Part of fast-r7aqkx-225-d component series
 */
export interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionOptions = {}
) {
  const { threshold = 0, rootMargin = '0px', root = null, triggerOnce = false } = options;
  const isIntersectingState = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        isIntersectingState.setValue(isVisible);
        
        if (triggerOnce && isVisible) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin, root, triggerOnce, isIntersectingState]);

  return isIntersectingState.value;
}