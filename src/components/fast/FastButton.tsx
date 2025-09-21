import React, { memo } from 'react';
import { FastButtonProps } from './types';
import { useFastCallback } from './hooks/useFastCallback';

/**
 * FastButton (fast-r7aqkx-224-d)
 * Ultra-fast button component with instant feedback
 * Features: zero-delay clicks, accessibility, loading states
 */
export const FastButton: React.FC<FastButtonProps & { 'data-testid'?: string }> = memo(({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  'data-testid': testId,
  type = 'button',
  ...props
}) => {
  const handleClick = useFastCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    if (onClick) {
      onClick();
    }
  }, [onClick, loading, disabled]);

  const getVariantClasses = () => {
    const base = 'font-medium transition-all duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${base} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100 disabled:bg-gray-300`;
      case 'secondary':
        return `${base} bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-100 disabled:bg-gray-50 disabled:text-gray-400`;
      case 'danger':
        return `${base} bg-red-600 text-white hover:bg-red-700 focus:ring-red-100 disabled:bg-gray-300`;
      case 'success':
        return `${base} bg-green-600 text-white hover:bg-green-700 focus:ring-green-100 disabled:bg-gray-300`;
      default:
        return `${base} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100 disabled:bg-gray-300`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm rounded-lg';
      case 'md':
        return 'px-4 py-2 text-sm rounded-xl';
      case 'lg':
        return 'px-6 py-3 text-base rounded-xl';
      case 'xl':
        return 'px-8 py-4 text-lg rounded-2xl';
      default:
        return 'px-4 py-2 text-sm rounded-xl';
    }
  };

  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full border-2 border-transparent border-t-current w-4 h-4" />
  );

  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'cursor-wait' : ''}
    ${className}
    flex items-center justify-center gap-2
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      data-testid={testId}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
});

FastButton.displayName = 'FastButton';