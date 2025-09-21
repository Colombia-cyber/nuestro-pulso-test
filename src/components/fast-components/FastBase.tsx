import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Ultra-fast component base interface
 * Performance-optimized foundation for all fast components (fast-r7aqkx-222-d through fast-r7aqkx-253-d)
 */
export interface FastComponentProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  onHover?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'none' | 'subtle' | 'smooth' | 'spring';
  accessibility?: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    role?: string;
    tabIndex?: number;
  };
  performance?: {
    lazy?: boolean;
    priority?: 'high' | 'normal' | 'low';
    preload?: boolean;
  };
}

/**
 * Performance monitoring hook for fast components
 */
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(Date.now());
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
    const renderTime = Date.now() - renderStartTime.current;
    
    // Log performance metrics in development
    if (import.meta.env.DEV) {
      console.log(`🚀 Fast Component ${componentName}:`, {
        renderTime: `${renderTime}ms`,
        renderCount: renderCount.current,
        timestamp: new Date().toISOString()
      });
    }

    // Performance budget: warn if render takes > 16ms (60fps)
    if (renderTime > 16) {
      console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime}ms`);
    }
  });

  return { renderTime: Date.now() - renderStartTime.current, renderCount: renderCount.current };
};

/**
 * Ultra-fast interaction hook with debouncing and optimization
 */
export const useFastInteraction = (
  callback: (event: React.MouseEvent) => void,
  delay: number = 0
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const lastCallRef = useRef<number>(0);

  return useCallback((event: React.MouseEvent) => {
    const now = Date.now();
    
    // Immediate response for high-priority interactions
    if (delay === 0) {
      callback(event);
      lastCallRef.current = now;
      return;
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounced execution
    timeoutRef.current = setTimeout(() => {
      callback(event);
      lastCallRef.current = now;
    }, delay);
  }, [callback, delay]);
};

/**
 * Base fast component with optimized rendering
 */
export const FastBase = memo<FastComponentProps>(({
  id,
  className = '',
  children,
  onClick,
  onHover,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  animation = 'smooth',
  accessibility = {},
  performance = {},
  ...props
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { renderTime } = usePerformanceMonitor('FastBase');

  // Optimized click handler
  const handleClick = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      if (disabled || loading) return;
      onClick?.(event);
    }, [onClick, disabled, loading]),
    0 // Immediate response for clicks
  );

  // Optimized hover handler
  const handleHover = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      if (disabled) return;
      onHover?.(event);
    }, [onHover, disabled]),
    50 // Slight delay for hover to prevent excessive triggers
  );

  // Memoized class names for performance
  const computedClassName = useMemo(() => {
    const baseClasses = [
      'fast-component',
      'transition-modern',
      'focus-visible:ring-modern',
    ];

    // Variant classes
    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
      accent: 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white hover:shadow-lg',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
    };

    // Size classes
    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
      xl: 'px-8 py-5 text-xl'
    };

    // Animation classes
    const animationClasses = {
      none: '',
      subtle: 'hover:scale-102',
      smooth: 'hover:scale-105 hover:shadow-lg',
      spring: 'hover:scale-105 hover:shadow-xl transform-gpu'
    };

    const stateClasses = [];
    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    }
    if (loading) {
      stateClasses.push('relative', 'overflow-hidden');
    }

    return [
      ...baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      animationClasses[animation],
      ...stateClasses,
      className
    ].filter(Boolean).join(' ');
  }, [variant, size, animation, disabled, loading, className]);

  // Accessibility props
  const accessibilityProps = useMemo(() => ({
    'aria-label': accessibility.ariaLabel,
    'aria-describedby': accessibility.ariaDescribedBy,
    'role': accessibility.role || 'button',
    'tabIndex': accessibility.tabIndex ?? (disabled ? -1 : 0),
    'aria-disabled': disabled,
    'aria-busy': loading
  }), [accessibility, disabled, loading]);

  return (
    <div
      ref={componentRef}
      id={id}
      className={computedClassName}
      onClick={handleClick}
      onMouseEnter={handleHover}
      {...accessibilityProps}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {children}
    </div>
  );
});

FastBase.displayName = 'FastBase';

/**
 * HOC for converting regular components to fast components
 */
export function withFastPerformance<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
) {
  const FastComponent = memo((props: P) => {
    const { renderTime } = usePerformanceMonitor(displayName || Component.displayName || 'FastComponent');
    return <Component {...props} />;
  });

  FastComponent.displayName = displayName || `Fast(${Component.displayName || 'Component'})`;
  return FastComponent;
}

export default FastBase;