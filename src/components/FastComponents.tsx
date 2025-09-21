import React, { memo, useMemo, useCallback } from 'react';
import { useOptimizedState } from '../hooks/useOptimizedState';
import { useDebounce } from '../hooks/usePerformanceHooks';

/**
 * Ultra-fast button component with instant feedback
 * Part of fast-r7aqkx-226-d component series
 */
export interface FastButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'data-testid'?: string;
  debounceMs?: number;
  ripple?: boolean;
}

const FastButtonComponent: React.FC<FastButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  'data-testid': testId,
  debounceMs = 0,
  ripple = true
}) => {
  const { value: isPressed, setValue: setIsPressed } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  const { value: rippleEffect, setValue: setRippleEffect } = useOptimizedState({
    defaultValue: { x: 0, y: 0, show: false },
    enablePerformanceTracking: true
  });

  // Debounced click handler for performance
  const debouncedClick = useDebounce(
    useCallback(() => {
      if (onClick && !disabled && !loading) {
        onClick();
      }
    }, [onClick, disabled, loading]),
    { delay: debounceMs }
  );

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Instant visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Ripple effect
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleEffect({ x, y, show: true });
      setTimeout(() => setRippleEffect(prev => ({ ...prev, show: false })), 600);
    }

    // Execute click handler
    if (debounceMs > 0) {
      debouncedClick();
    } else if (onClick) {
      onClick();
    }
  }, [disabled, loading, ripple, onClick, debouncedClick, debounceMs, setIsPressed, setRippleEffect]);

  const buttonClasses = useMemo(() => {
    const baseClasses = 'relative overflow-hidden font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95';
    
    const variantClasses = {
      primary: 'bg-colombia-blue text-white hover:bg-colombia-blue-dark focus:ring-colombia-blue shadow-md hover:shadow-lg',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
      ghost: 'text-colombia-blue hover:bg-colombia-blue/10 focus:ring-colombia-blue'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl'
    };

    const stateClasses = [
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      loading ? 'cursor-wait' : '',
      isPressed ? 'scale-95' : 'hover:scale-102'
    ].filter(Boolean).join(' ');

    return [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      stateClasses,
      className
    ].filter(Boolean).join(' ');
  }, [variant, size, disabled, loading, isPressed, className]);

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      data-testid={testId}
      aria-busy={loading}
    >
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Ripple effect */}
      {ripple && rippleEffect.show && (
        <span
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ping"
          style={{
            left: rippleEffect.x - 10,
            top: rippleEffect.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}

      {/* Button content */}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export const FastButton = memo(FastButtonComponent);

/**
 * Ultra-fast input component with instant validation
 * Part of fast-r7aqkx-227-d component series
 */
export interface FastInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'url';
  disabled?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  'data-testid'?: string;
  debounceMs?: number;
  validateOnChange?: boolean;
  validator?: (value: string) => string | null;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const FastInputComponent: React.FC<FastInputProps> = ({
  value = '',
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  success = false,
  className = '',
  'data-testid': testId,
  debounceMs = 300,
  validateOnChange = true,
  validator,
  autoFocus = false,
  size = 'md'
}) => {
  const { value: internalValue, setValue: setInternalValue } = useOptimizedState({
    defaultValue: value,
    enablePerformanceTracking: true
  });

  const { value: validationError, setValue: setValidationError } = useOptimizedState({
    defaultValue: error || null,
    enablePerformanceTracking: true
  });

  const { value: isFocused, setValue: setIsFocused } = useOptimizedState({
    defaultValue: false,
    enablePerformanceTracking: true
  });

  // Debounced onChange handler
  const debouncedOnChange = useDebounce(
    useCallback((newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }

      // Validate if enabled
      if (validateOnChange && validator) {
        const errorMessage = validator(newValue);
        setValidationError(errorMessage);
      }
    }, [onChange, validateOnChange, validator, setValidationError]),
    { delay: debounceMs }
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    if (debounceMs > 0) {
      debouncedOnChange(newValue);
    } else {
      if (onChange) onChange(newValue);
      if (validateOnChange && validator) {
        const errorMessage = validator(newValue);
        setValidationError(errorMessage);
      }
    }
  }, [setInternalValue, debouncedOnChange, debounceMs, onChange, validateOnChange, validator, setValidationError]);

  const inputClasses = useMemo(() => {
    const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg'
    };

    const stateClasses = [
      disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'bg-white',
      validationError ? 'border-red-500 focus:ring-red-500' : 
      success ? 'border-green-500 focus:ring-green-500' :
      isFocused ? 'border-colombia-blue focus:ring-colombia-blue' : 'border-gray-300 hover:border-gray-400'
    ].filter(Boolean).join(' ');

    return [
      baseClasses,
      sizeClasses[size],
      stateClasses,
      className
    ].filter(Boolean).join(' ');
  }, [size, disabled, validationError, success, isFocused, className]);

  return (
    <div className="w-full">
      <input
        type={type}
        value={internalValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        data-testid={testId}
        autoFocus={autoFocus}
      />
      
      {/* Error message */}
      {validationError && (
        <p className="mt-1 text-sm text-red-600 animate-fadeIn">
          {validationError}
        </p>
      )}
      
      {/* Success indicator */}
      {success && !validationError && (
        <p className="mt-1 text-sm text-green-600 animate-fadeIn">
          ✓ Valid
        </p>
      )}
    </div>
  );
};

export const FastInput = memo(FastInputComponent);