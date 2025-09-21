import React, { memo, useCallback, useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import { FastBase, FastComponentProps, usePerformanceMonitor, useFastInteraction } from './FastBase';

/**
 * Fast-r7aqkx-222-d: Ultra-Fast Button Component
 * Optimized for instant response and world-class accessibility
 */
export interface FastButtonProps extends Omit<FastComponentProps, 'children'> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  download?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  shape?: 'square' | 'rounded' | 'pill' | 'circle';
  gradient?: boolean;
  pulse?: boolean;
  ripple?: boolean;
  focusRing?: boolean;
  tooltip?: string;
  badge?: {
    content: string | number;
    variant: 'dot' | 'number' | 'icon';
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  };
  loading?: boolean;
  loadingText?: string;
  preventDoubleClick?: boolean;
  analytics?: {
    trackClick?: boolean;
    eventName?: string;
    category?: string;
  };
}

export interface FastButtonRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
  getPerformanceMetrics: () => { renderTime: number; renderCount: number };
}

/**
 * Ultra-fast button with instant response time and advanced features
 */
const FastButton = memo(forwardRef<FastButtonRef, FastButtonProps>(({
  children,
  type = 'button',
  href,
  target,
  rel,
  download,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  shape = 'rounded',
  gradient = false,
  pulse = false,
  ripple = true,
  focusRing = true,
  tooltip,
  badge,
  loading = false,
  loadingText = 'Cargando...',
  preventDoubleClick = true,
  analytics = {},
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  animation = 'smooth',
  accessibility = {},
  ...props
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef<number>(0);
  const { renderTime, renderCount } = usePerformanceMonitor('FastButton-r7aqkx-222-d');

  // Imperative handle for ref
  useImperativeHandle(ref, () => ({
    focus: () => buttonRef.current?.focus(),
    blur: () => buttonRef.current?.blur(),
    click: () => (buttonRef.current as any)?.click(),
    getPerformanceMetrics: () => ({ renderTime, renderCount })
  }));

  // Ultra-fast click handler with performance optimizations
  const handleClick = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      const now = Date.now();
      
      // Prevent double-click if enabled
      if (preventDoubleClick && now - lastClickTime.current < 300) {
        event.preventDefault();
        return;
      }
      lastClickTime.current = now;

      // Ripple effect
      if (ripple && rippleRef.current) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        rippleRef.current.style.width = rippleRef.current.style.height = `${size}px`;
        rippleRef.current.style.left = `${x}px`;
        rippleRef.current.style.top = `${y}px`;
        rippleRef.current.classList.add('animate-ping');
        
        setTimeout(() => {
          rippleRef.current?.classList.remove('animate-ping');
        }, 300);
      }

      // Analytics tracking
      if (analytics.trackClick) {
        // Simulate analytics event (replace with actual analytics service)
        console.log('📊 Button Click Analytics:', {
          eventName: analytics.eventName || 'button_click',
          category: analytics.category || 'interaction',
          timestamp: now,
          componentId: 'fast-r7aqkx-222-d'
        });
      }

      // Execute callback
      if (!disabled && !loading) {
        onClick?.(event);
      }
    }, [onClick, disabled, loading, preventDoubleClick, ripple, analytics]),
    0 // Instant response
  );

  // Memoized class computation for optimal performance
  const computedClassName = useMemo(() => {
    const baseClasses = [
      'fast-button-r7aqkx-222-d',
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'border',
      'transition-all',
      'duration-200',
      'ease-out',
      'transform-gpu',
      'select-none',
      'outline-none'
    ];

    // Shape classes
    const shapeClasses = {
      square: '',
      rounded: 'rounded-lg',
      pill: 'rounded-full',
      circle: 'rounded-full aspect-square'
    };

    // Enhanced variant classes with gradients
    const variantClasses = {
      primary: gradient 
        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white border-transparent hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
        : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 shadow-md hover:shadow-lg',
      secondary: 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md',
      accent: gradient
        ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white border-transparent hover:from-yellow-500 hover:via-blue-600 hover:to-red-600 shadow-lg hover:shadow-xl'
        : 'bg-colombia-yellow text-colombia-blue border-colombia-yellow hover:bg-colombia-yellow-light shadow-md hover:shadow-lg',
      ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 hover:text-gray-900'
    };

    // Size classes with proper spacing
    const sizeClasses = {
      xs: 'px-2 py-1 text-xs gap-1 min-h-[24px]',
      sm: 'px-3 py-2 text-sm gap-2 min-h-[32px]',
      md: 'px-4 py-3 text-base gap-2 min-h-[40px]',
      lg: 'px-6 py-4 text-lg gap-3 min-h-[48px]',
      xl: 'px-8 py-5 text-xl gap-3 min-h-[56px]'
    };

    // Animation and interaction classes
    const interactionClasses = [];
    if (animation !== 'none') {
      interactionClasses.push('hover:scale-105', 'active:scale-95');
    }
    if (pulse) {
      interactionClasses.push('animate-pulse');
    }
    if (focusRing) {
      interactionClasses.push('focus-visible:ring-2', 'focus-visible:ring-offset-2', 'focus-visible:ring-blue-500');
    }

    // State classes
    const stateClasses = [];
    if (disabled || loading) {
      stateClasses.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    } else {
      stateClasses.push('cursor-pointer');
    }
    if (fullWidth) {
      stateClasses.push('w-full');
    }

    return [
      ...baseClasses,
      shapeClasses[shape],
      variantClasses[variant],
      sizeClasses[size],
      ...interactionClasses,
      ...stateClasses,
      className
    ].filter(Boolean).join(' ');
  }, [variant, size, shape, animation, gradient, pulse, focusRing, disabled, loading, fullWidth, className]);

  // Enhanced accessibility props
  const accessibilityProps = useMemo(() => ({
    'aria-label': accessibility.ariaLabel || (typeof children === 'string' ? children : undefined),
    'aria-describedby': accessibility.ariaDescribedBy || (tooltip ? `${props.id}-tooltip` : undefined),
    'role': accessibility.role || 'button',
    'tabIndex': accessibility.tabIndex ?? (disabled ? -1 : 0),
    'aria-disabled': disabled,
    'aria-busy': loading,
    'aria-pressed': variant === 'primary' ? true : undefined,
    'title': tooltip
  }), [accessibility, children, tooltip, props.id, disabled, loading, variant]);

  // Content with icon and loading state
  const content = useMemo(() => {
    if (loading) {
      return (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      );
    }

    const iconElement = icon && (
      <span className="flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
    );

    return (
      <>
        {icon && iconPosition === 'left' && iconElement}
        <span className="truncate">{children}</span>
        {icon && iconPosition === 'right' && iconElement}
      </>
    );
  }, [loading, loadingText, icon, iconPosition, children]);

  // Common props for both button and anchor
  const commonProps = {
    ref: buttonRef as any,
    className: computedClassName,
    onClick: handleClick,
    ...accessibilityProps,
    ...props
  };

  // Render as anchor if href is provided
  if (href) {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
      >
        {ripple && (
          <div
            ref={rippleRef}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{ transform: 'scale(0)' }}
          />
        )}
        {content}
        {badge && (
          <span className={`absolute ${getBadgePositionClasses(badge.position)} ${getBadgeVariantClasses(badge.variant)}`}>
            {badge.content}
          </span>
        )}
      </a>
    );
  }

  // Render as button
  return (
    <button
      {...commonProps}
      type={type}
      disabled={disabled || loading}
    >
      {ripple && (
        <div
          ref={rippleRef}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{ transform: 'scale(0)' }}
        />
      )}
      {content}
      {badge && (
        <span className={`absolute ${getBadgePositionClasses(badge.position)} ${getBadgeVariantClasses(badge.variant)}`}>
          {badge.content}
        </span>
      )}
    </button>
  );
}));

// Helper functions for badge styling
const getBadgePositionClasses = (position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right') => {
  const positions = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1'
  };
  return positions[position];
};

const getBadgeVariantClasses = (variant: 'dot' | 'number' | 'icon') => {
  const variants = {
    dot: 'w-2 h-2 bg-red-500 rounded-full',
    number: 'min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center',
    icon: 'w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'
  };
  return variants[variant];
};

FastButton.displayName = 'FastButton';

export default FastButton;