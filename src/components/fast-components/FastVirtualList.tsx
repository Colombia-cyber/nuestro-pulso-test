import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { usePerformanceMonitor } from './FastBase';

/**
 * Fast-r7aqkx-253-d: Ultra-Fast Virtual List Component
 * High-performance virtualization for large datasets with smooth scrolling
 */

export interface VirtualListItem {
  id: string | number;
  data: any;
  height?: number;
  key?: string | number;
}

export interface FastVirtualListProps<T = any> {
  items: VirtualListItem[];
  itemHeight?: number | ((item: VirtualListItem, index: number) => number);
  containerHeight: number;
  renderItem: (item: VirtualListItem, index: number, style: React.CSSProperties) => React.ReactNode;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  onItemsRendered?: (startIndex: number, endIndex: number, visibleItems: VirtualListItem[]) => void;
  overscan?: number;
  scrollToIndex?: number;
  scrollToAlignment?: 'start' | 'center' | 'end' | 'auto';
  direction?: 'vertical' | 'horizontal';
  className?: string;
  itemClassName?: string;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  isLoading?: boolean;
  enableSmoothScrolling?: boolean;
  enableKeyboardNavigation?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  cacheSize?: number;
  debug?: boolean;
}

interface VisibleRange {
  startIndex: number;
  endIndex: number;
}

interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
  isScrolling: boolean;
}

const FastVirtualList = memo<FastVirtualListProps>(({
  items,
  itemHeight = 50,
  containerHeight,
  renderItem,
  onScroll,
  onItemsRendered,
  overscan = 5,
  scrollToIndex,
  scrollToAlignment = 'auto',
  direction = 'vertical',
  className = '',
  itemClassName = '',
  loadingComponent,
  emptyComponent,
  isLoading = false,
  enableSmoothScrolling = true,
  enableKeyboardNavigation = true,
  onEndReached,
  onEndReachedThreshold = 0.8,
  cacheSize = 100,
  debug = false
}) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollTop: 0,
    scrollLeft: 0,
    isScrolling: false
  });
  const [visibleRange, setVisibleRange] = useState<VisibleRange>({ startIndex: 0, endIndex: 0 });
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const isScrollingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const itemHeightCache = useRef<Map<number, number>>(new Map());
  const itemPositionCache = useRef<Map<number, number>>(new Map());

  const { renderTime } = usePerformanceMonitor('FastVirtualList-r7aqkx-253-d');

  // Calculate item height
  const getItemHeight = useCallback((index: number): number => {
    if (typeof itemHeight === 'function') {
      const cached = itemHeightCache.current.get(index);
      if (cached !== undefined) return cached;
      
      const height = itemHeight(items[index], index);
      itemHeightCache.current.set(index, height);
      return height;
    }
    return itemHeight;
  }, [itemHeight, items]);

  // Calculate item position
  const getItemPosition = useCallback((index: number): number => {
    const cached = itemPositionCache.current.get(index);
    if (cached !== undefined) return cached;

    let position = 0;
    for (let i = 0; i < index; i++) {
      position += getItemHeight(i);
    }

    itemPositionCache.current.set(index, position);
    return position;
  }, [getItemHeight]);

  // Calculate total size
  const totalSize = useMemo(() => {
    if (items.length === 0) return 0;
    
    if (typeof itemHeight === 'number') {
      return items.length * itemHeight;
    }

    // For dynamic heights, calculate total
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += getItemHeight(i);
    }
    return total;
  }, [items.length, itemHeight, getItemHeight]);

  // Calculate visible range
  const calculateVisibleRange = useCallback((scrollOffset: number): VisibleRange => {
    if (items.length === 0) {
      return { startIndex: 0, endIndex: 0 };
    }

    const containerSize = direction === 'vertical' ? containerHeight : containerRef.current?.clientWidth || 0;

    let startIndex = 0;
    let endIndex = 0;

    if (typeof itemHeight === 'number') {
      // Fixed height optimization
      startIndex = Math.floor(scrollOffset / itemHeight);
      endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollOffset + containerSize) / itemHeight)
      );
    } else {
      // Dynamic height calculation
      let currentPosition = 0;
      
      // Find start index
      for (let i = 0; i < items.length; i++) {
        const height = getItemHeight(i);
        if (currentPosition + height > scrollOffset) {
          startIndex = i;
          break;
        }
        currentPosition += height;
      }

      // Find end index
      currentPosition = getItemPosition(startIndex);
      for (let i = startIndex; i < items.length; i++) {
        if (currentPosition > scrollOffset + containerSize) {
          endIndex = i - 1;
          break;
        }
        currentPosition += getItemHeight(i);
        endIndex = i;
      }
    }

    // Apply overscan
    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(items.length - 1, endIndex + overscan);

    return { startIndex, endIndex };
  }, [items.length, itemHeight, containerHeight, direction, overscan, getItemHeight, getItemPosition]);

  // Handle scroll
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollLeft } = event.currentTarget;
    const scrollOffset = direction === 'vertical' ? scrollTop : scrollLeft;

    // Update scroll state
    setScrollState({
      scrollTop,
      scrollLeft,
      isScrolling: true
    });

    // Calculate new visible range
    const newRange = calculateVisibleRange(scrollOffset);
    setVisibleRange(newRange);

    // Clear scrolling timeout
    if (isScrollingTimeoutRef.current) {
      clearTimeout(isScrollingTimeoutRef.current);
    }

    // Set scrolling to false after scroll ends
    isScrollingTimeoutRef.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }));
    }, 150);

    // Callbacks
    onScroll?.(scrollTop, scrollLeft);
    
    const visibleItems = items.slice(newRange.startIndex, newRange.endIndex + 1);
    onItemsRendered?.(newRange.startIndex, newRange.endIndex, visibleItems);

    // Check if end reached
    if (onEndReached && onEndReachedThreshold) {
      const totalScrollableDistance = totalSize - containerHeight;
      const scrollPercentage = scrollOffset / totalScrollableDistance;
      
      if (scrollPercentage >= onEndReachedThreshold) {
        onEndReached();
      }
    }
  }, [
    direction, calculateVisibleRange, onScroll, onItemsRendered, onEndReached, 
    onEndReachedThreshold, items, totalSize, containerHeight
  ]);

  // Scroll to specific index
  const scrollToItem = useCallback((index: number, alignment: 'start' | 'center' | 'end' | 'auto' = 'auto') => {
    if (!scrollElementRef.current || index < 0 || index >= items.length) return;

    const itemPosition = getItemPosition(index);
    const itemSize = getItemHeight(index);
    const containerSize = direction === 'vertical' ? containerHeight : containerRef.current?.clientWidth || 0;

    let scrollOffset = itemPosition;

    switch (alignment) {
      case 'start':
        scrollOffset = itemPosition;
        break;
      case 'center':
        scrollOffset = itemPosition - (containerSize - itemSize) / 2;
        break;
      case 'end':
        scrollOffset = itemPosition - containerSize + itemSize;
        break;
      case 'auto': {
        const currentScrollOffset = direction === 'vertical' ? scrollState.scrollTop : scrollState.scrollLeft;
        const itemEnd = itemPosition + itemSize;
        
        if (itemPosition < currentScrollOffset) {
          scrollOffset = itemPosition;
        } else if (itemEnd > currentScrollOffset + containerSize) {
          scrollOffset = itemEnd - containerSize;
        } else {
          return; // Item is already visible
        }
        break;
      }
    }

    // Apply scroll
    if (direction === 'vertical') {
      scrollElementRef.current.scrollTop = Math.max(0, scrollOffset);
    } else {
      scrollElementRef.current.scrollLeft = Math.max(0, scrollOffset);
    }
  }, [items.length, getItemPosition, getItemHeight, direction, containerHeight, scrollState]);

  // Handle scroll to index prop
  useEffect(() => {
    if (scrollToIndex !== undefined && scrollToIndex >= 0) {
      scrollToItem(scrollToIndex, scrollToAlignment);
    }
  }, [scrollToIndex, scrollToAlignment, scrollToItem]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      let newFocusedIndex = focusedIndex;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          newFocusedIndex = Math.min(items.length - 1, focusedIndex + 1);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          newFocusedIndex = Math.max(0, focusedIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          newFocusedIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newFocusedIndex = items.length - 1;
          break;
        case 'PageDown':
          event.preventDefault();
          {
            const pageSize = Math.floor(containerHeight / (typeof itemHeight === 'number' ? itemHeight : 50));
            newFocusedIndex = Math.min(items.length - 1, focusedIndex + pageSize);
          }
          break;
        case 'PageUp':
          event.preventDefault();
          {
            const pageSizeUp = Math.floor(containerHeight / (typeof itemHeight === 'number' ? itemHeight : 50));
            newFocusedIndex = Math.max(0, focusedIndex - pageSizeUp);
          }
          break;
      }

      if (newFocusedIndex !== focusedIndex) {
        setFocusedIndex(newFocusedIndex);
        scrollToItem(newFocusedIndex, 'auto');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardNavigation, focusedIndex, items.length, containerHeight, itemHeight, scrollToItem]);

  // Clear caches when items change
  useEffect(() => {
    itemHeightCache.current.clear();
    itemPositionCache.current.clear();
  }, [items]);

  // Calculate initial visible range
  useEffect(() => {
    const initialRange = calculateVisibleRange(direction === 'vertical' ? scrollState.scrollTop : scrollState.scrollLeft);
    setVisibleRange(initialRange);
  }, [calculateVisibleRange, direction, scrollState]);

  // Render visible items
  const visibleItems = useMemo(() => {
    const items_to_render = [];
    
    for (let index = visibleRange.startIndex; index <= visibleRange.endIndex; index++) {
      if (index >= items.length) break;
      
      const item = items[index];
      const itemTop = getItemPosition(index);
      const itemHeight = getItemHeight(index);
      
      const style: React.CSSProperties = direction === 'vertical' 
        ? {
            position: 'absolute',
            top: itemTop,
            left: 0,
            right: 0,
            height: itemHeight,
          }
        : {
            position: 'absolute',
            left: itemTop,
            top: 0,
            bottom: 0,
            width: itemHeight,
          };

      items_to_render.push(
        <div
          key={item.key || item.id || index}
          className={`virtual-list-item ${itemClassName}`}
          style={style}
          data-index={index}
          tabIndex={enableKeyboardNavigation ? (focusedIndex === index ? 0 : -1) : undefined}
          role="listitem"
          aria-posinset={index + 1}
          aria-setsize={items.length}
        >
          {renderItem(item, index, style)}
        </div>
      );
    }
    
    return items_to_render;
  }, [
    visibleRange, items, getItemPosition, getItemHeight, direction, 
    itemClassName, enableKeyboardNavigation, focusedIndex, renderItem
  ]);

  // Loading state
  if (isLoading && loadingComponent) {
    return (
      <div className={`fast-virtual-list-loading ${className}`} style={{ height: containerHeight }}>
        {loadingComponent}
      </div>
    );
  }

  // Empty state
  if (items.length === 0 && emptyComponent) {
    return (
      <div className={`fast-virtual-list-empty ${className}`} style={{ height: containerHeight }}>
        {emptyComponent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fast-virtual-list-r7aqkx-253-d relative overflow-hidden ${className}`}
      style={{ height: containerHeight }}
      role="list"
      aria-label="Virtual list"
      tabIndex={enableKeyboardNavigation ? 0 : undefined}
    >
      <div
        ref={scrollElementRef}
        className={`overflow-auto ${enableSmoothScrolling ? 'scroll-smooth' : ''}`}
        style={{ 
          height: '100%', 
          width: '100%',
          ...(direction === 'vertical' 
            ? { overflowX: 'hidden' }
            : { overflowY: 'hidden' }
          )
        }}
        onScroll={handleScroll}
      >
        {/* Total size container */}
        <div
          className="relative"
          style={
            direction === 'vertical'
              ? { height: totalSize, width: '100%' }
              : { width: totalSize, height: '100%' }
          }
        >
          {visibleItems}
        </div>
      </div>

      {/* Debug information */}
      {debug && import.meta.env.DEV && (
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs p-2 rounded font-mono">
          <div>Items: {items.length}</div>
          <div>Visible: {visibleRange.startIndex}-{visibleRange.endIndex}</div>
          <div>Render: {renderTime}ms</div>
          <div>Scroll: {direction === 'vertical' ? scrollState.scrollTop : scrollState.scrollLeft}</div>
          <div>Focused: {focusedIndex}</div>
        </div>
      )}

      {/* Scrolling indicator */}
      {scrollState.isScrolling && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Scrolling...
        </div>
      )}
    </div>
  );
});

FastVirtualList.displayName = 'FastVirtualList';

export default FastVirtualList;