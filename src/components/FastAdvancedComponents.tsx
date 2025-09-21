import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react';
import { useOptimizedState } from '../hooks/useOptimizedState';
import { useIntersectionObserver } from '../hooks/usePerformanceHooks';

/**
 * Ultra-fast virtual list component for large datasets
 * Part of fast-r7aqkx-231-d component series
 */
export interface FastVirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string | number;
  className?: string;
  onItemClick?: (item: T, index: number) => void;
  overscan?: number;
}

function FastVirtualListComponent<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  getItemKey,
  className = '',
  onItemClick,
  overscan = 5
}: FastVirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { value: scrollTop, setValue: setScrollTop } = useOptimizedState({
    defaultValue: 0,
    enablePerformanceTracking: true
  });

  // Calculate visible range with overscan
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  // Handle scroll with optimization
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, [setScrollTop]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`overflow-auto fast-scroll ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.startIndex + index;
            return (
              <div
                key={getItemKey(item, actualIndex)}
                style={{ height: itemHeight }}
                className="flex items-center transition-ultra-fast hover:bg-gray-50"
                onClick={() => onItemClick?.(item, actualIndex)}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const FastVirtualList = memo(FastVirtualListComponent) as <T>(
  props: FastVirtualListProps<T>
) => React.ReactElement;

/**
 * Ultra-fast loading skeleton component
 * Part of fast-r7aqkx-232-d component series
 */
export interface FastSkeletonProps {
  variant?: 'text' | 'avatar' | 'rectangular' | 'button' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
  animate?: boolean;
}

const FastSkeletonComponent: React.FC<FastSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  lines = 1,
  animate = true
}) => {
  const baseClasses = useMemo(() => {
    const animationClass = animate ? 'animate-shimmer' : 'bg-gray-200';
    const variantClasses = {
      text: 'skeleton-text',
      avatar: 'skeleton-avatar',
      rectangular: 'skeleton',
      button: 'skeleton-button',
      card: 'skeleton rounded-lg'
    };
    
    return [
      'skeleton',
      animationClass,
      variantClasses[variant],
      className
    ].filter(Boolean).join(' ');
  }, [variant, animate, className]);

  const style = useMemo(() => ({
    width: width || undefined,
    height: height || undefined
  }), [width, height]);

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={baseClasses}
            style={{
              ...style,
              width: index === lines - 1 ? '60%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} style={style} />;
};

export const FastSkeleton = memo(FastSkeletonComponent);

/**
 * Ultra-fast error boundary with instant recovery
 * Part of fast-r7aqkx-233-d component series
 */
interface FastErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

export interface FastErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error | null;
    onRetry: () => void;
    retryCount: number;
  }>;
  maxRetries?: number;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}

const DefaultErrorFallback: React.FC<{
  error: Error | null;
  onRetry: () => void;
  retryCount: number;
}> = ({ error, onRetry, retryCount }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 animate-fadeIn">
      <div className="text-6xl mb-4 animate-bounce-subtle">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Error en el componente
      </h3>
      <p className="text-gray-600 mb-4">
        {error?.message || 'Ha ocurrido un error inesperado'}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Intentos de recuperación: {retryCount}
      </p>
      <button
        onClick={onRetry}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-ultra-fast btn-ultra-responsive shadow-fast hover:shadow-xl"
      >
        Reintentar automáticamente
      </button>
    </div>
  </div>
);

export class FastErrorBoundary extends React.Component<
  FastErrorBoundaryProps,
  FastErrorBoundaryState
> {
  private retryTimeoutId: number | null = null;

  constructor(props: FastErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<FastErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-retry after 3 seconds for certain errors
    if (this.state.retryCount < (this.props.maxRetries || 3)) {
      this.retryTimeoutId = window.setTimeout(() => {
        this.handleRetry();
      }, 3000);
    }
  }

  componentDidUpdate(prevProps: FastErrorBoundaryProps) {
    const { resetKeys } = this.props;
    if (
      this.state.hasError &&
      prevProps.resetKeys &&
      resetKeys &&
      prevProps.resetKeys.some((key, index) => key !== resetKeys[index])
    ) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          onRetry={this.handleRetry}
          retryCount={this.state.retryCount}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Ultra-fast lazy image component with optimization
 * Part of fast-r7aqkx-234-d component series
 */
export interface FastImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const FastImageComponent: React.FC<FastImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  fallback,
  lazy = true,
  onLoad,
  onError
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { value: isLoaded, setValue: setIsLoaded } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });
  
  const { value: hasError, setValue: setHasError } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  const isInView = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const shouldLoad = !lazy || isInView;

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [setIsLoaded, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [setHasError, onError]);

  const imageClasses = useMemo(() => {
    return [
      'transition-ultra-fast',
      isLoaded ? 'opacity-100' : 'opacity-0',
      className
    ].filter(Boolean).join(' ');
  }, [isLoaded, className]);

  return (
    <div
      ref={imgRef}
      className="relative overflow-hidden"
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-shimmer">
          {placeholder ? (
            <img src={placeholder} alt="" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="text-gray-400 text-sm">Cargando...</div>
          )}
        </div>
      )}

      {/* Main image */}
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}

      {/* Fallback */}
      {hasError && fallback && (
        <img
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onLoad={handleLoad}
        />
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Error al cargar imagen
        </div>
      )}
    </div>
  );
};

export const FastImage = memo(FastImageComponent);