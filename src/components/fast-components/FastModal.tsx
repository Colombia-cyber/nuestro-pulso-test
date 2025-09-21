import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FaTimes, FaExpand, FaCompress, FaArrowLeft } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import { usePerformanceMonitor, useFastInteraction } from './FastBase';
import FastButton from './FastButton';

/**
 * Fast-r7aqkx-230-d: Ultra-Fast Modal Component
 * High-performance modal/dialog with animations, accessibility, and mobile optimization
 */

export interface FastModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'dialog' | 'drawer' | 'popup' | 'fullscreen';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  backdrop?: 'blur' | 'dark' | 'light' | 'none';
  closable?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  persistent?: boolean;
  autoFocus?: boolean;
  trapFocus?: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'flip' | 'none';
  animationDuration?: number;
  onAnimationComplete?: () => void;
  onBackdropClick?: () => void;
  enableKeyboard?: boolean;
  zIndex?: number;
  maxWidth?: string;
  maxHeight?: string;
  enableAnalytics?: boolean;
}

const FastModal = memo<FastModalProps>(({
  isOpen,
  onClose,
  title,
  size = 'md',
  variant = 'dialog',
  position = 'center',
  backdrop = 'blur',
  closable = true,
  draggable = false,
  resizable = false,
  persistent = false,
  autoFocus = true,
  trapFocus = true,
  children,
  header,
  footer,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  animation = 'fade',
  animationDuration = 300,
  onAnimationComplete,
  onBackdropClick,
  enableKeyboard = true,
  zIndex = 1000,
  maxWidth,
  maxHeight,
  enableAnalytics = true
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragState, setDragState] = useState({ isDragging: false, offset: { x: 0, y: 0 } });
  const [resizeState, setResizeState] = useState({ isResizing: false, size: { width: 0, height: 0 } });

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const { renderTime } = usePerformanceMonitor('FastModal-r7aqkx-230-d');

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Analytics
      if (enableAnalytics) {
        console.log('🪟 Modal Analytics:', {
          action: 'open',
          variant,
          size,
          position,
          timestamp: Date.now(),
          renderTime
        });
      }

      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationComplete?.();
        
        // Auto focus
        if (autoFocus && contentRef.current) {
          const focusable = contentRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          
          if (focusable) {
            focusable.focus();
            initialFocusRef.current = focusable;
          }
        }
      }, animationDuration);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      
      // Analytics
      if (enableAnalytics) {
        console.log('🪟 Modal Analytics:', {
          action: 'close',
          variant,
          size,
          position,
          timestamp: Date.now()
        });
      }

      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        onAnimationComplete?.();
        
        // Restore previous focus
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration, onAnimationComplete, autoFocus, enableAnalytics, variant, size, position, renderTime]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (closable && !persistent) {
            event.preventDefault();
            onClose();
          }
          break;
        case 'Tab':
          if (trapFocus && contentRef.current) {
            const focusableElements = contentRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstFocusable = focusableElements[0] as HTMLElement;
            const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey) {
              if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable?.focus();
              }
            } else {
              if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable?.focus();
              }
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, isOpen, closable, persistent, trapFocus, onClose]);

  // Fast close handler
  const handleClose = useCallback(() => {
    if (closable && !persistent) {
      onClose();
    }
  }, [closable, persistent, onClose]);

  // Backdrop click handler
  const handleBackdropClick = useFastInteraction(
    useCallback((event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onBackdropClick?.();
        if (!persistent) {
          handleClose();
        }
      }
    }, [onBackdropClick, persistent, handleClose]),
    0 // Instant response
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    
    if (enableAnalytics) {
      console.log('🪟 Modal Fullscreen:', {
        action: isFullscreen ? 'exit' : 'enter',
        timestamp: Date.now()
      });
    }
  }, [isFullscreen, enableAnalytics]);

  // Drag functionality
  const handleDragStart = useCallback((event: React.MouseEvent) => {
    if (!draggable) return;
    
    event.preventDefault();
    setDragState({
      isDragging: true,
      offset: {
        x: event.clientX - (contentRef.current?.offsetLeft || 0),
        y: event.clientY - (contentRef.current?.offsetTop || 0)
      }
    });
  }, [draggable]);

  const handleDragMove = useCallback((event: MouseEvent) => {
    if (!dragState.isDragging || !contentRef.current) return;
    
    const newX = event.clientX - dragState.offset.x;
    const newY = event.clientY - dragState.offset.y;
    
    contentRef.current.style.left = `${newX}px`;
    contentRef.current.style.top = `${newY}px`;
    contentRef.current.style.transform = 'none';
  }, [dragState]);

  const handleDragEnd = useCallback(() => {
    setDragState({ isDragging: false, offset: { x: 0, y: 0 } });
  }, []);

  // Drag event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [dragState.isDragging, handleDragMove, handleDragEnd]);

  // Size classes
  const sizeClasses = useMemo(() => {
    const sizes = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'w-full h-full max-w-none'
    };
    return sizes[size];
  }, [size]);

  // Position classes
  const positionClasses = useMemo(() => {
    const positions = {
      center: 'items-center justify-center',
      top: 'items-start justify-center pt-16',
      bottom: 'items-end justify-center pb-16',
      left: 'items-center justify-start pl-16',
      right: 'items-center justify-end pr-16'
    };
    return positions[position];
  }, [position]);

  // Animation classes
  const animationClasses = useMemo(() => {
    const baseClasses = `transition-all duration-${animationDuration}`;
    
    const animations = {
      fade: isOpen && !isAnimating ? 'opacity-100' : 'opacity-0',
      slide: isOpen && !isAnimating 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-4 opacity-0',
      scale: isOpen && !isAnimating 
        ? 'scale-100 opacity-100' 
        : 'scale-95 opacity-0',
      flip: isOpen && !isAnimating 
        ? 'rotateY-0 opacity-100' 
        : 'rotateY-90 opacity-0',
      none: 'opacity-100'
    };
    
    return `${baseClasses} ${animations[animation]}`;
  }, [animation, animationDuration, isOpen, isAnimating]);

  // Backdrop classes
  const backdropClasses = useMemo(() => {
    const backdrops = {
      blur: 'backdrop-blur-sm bg-black/20',
      dark: 'bg-black/50',
      light: 'bg-white/50',
      none: ''
    };
    return backdrops[backdrop];
  }, [backdrop]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div
      ref={modalRef}
      className={`
        fast-modal-r7aqkx-230-d
        fixed inset-0 flex
        ${positionClasses}
        ${backdropClasses}
        ${overlayClassName}
      `}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby="modal-content"
    >
      <div
        ref={contentRef}
        className={`
          relative bg-white rounded-lg shadow-xl
          ${sizeClasses}
          ${animationClasses}
          ${isFullscreen ? 'w-full h-full max-w-none rounded-none' : ''}
          ${variant === 'drawer' ? 'h-full' : ''}
          ${className}
        `}
        style={{
          maxWidth: maxWidth || undefined,
          maxHeight: maxHeight || undefined,
          position: draggable ? 'absolute' : 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 border-b
          ${draggable ? 'cursor-move' : ''}
        `}
        onMouseDown={handleDragStart}
        >
          <div className="flex items-center gap-2">
            {draggable && (
              <MdDragIndicator className="text-gray-400 cursor-move" />
            )}
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {resizable && (
              <FastButton
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </FastButton>
            )}
            
            {closable && (
              <FastButton
                variant="ghost"
                size="sm"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <FaTimes />
              </FastButton>
            )}
          </div>
          
          {header}
        </div>

        {/* Content */}
        <div 
          id="modal-content"
          className={`p-4 overflow-auto ${contentClassName}`}
          style={{ 
            maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '80vh'
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50">
            {footer}
          </div>
        )}

        {/* Performance indicator (development only) */}
        {import.meta.env.DEV && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {renderTime}ms
          </div>
        )}
      </div>
    </div>
  );
});

FastModal.displayName = 'FastModal';

export default FastModal;