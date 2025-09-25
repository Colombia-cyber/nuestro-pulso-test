import React, { useState, useEffect, useCallback, useRef } from 'react';

// WCAG 2.1 AA Accessibility Utilities and Hooks

interface AccessibilitySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
  autoplay: boolean;
  subtitles: boolean;
  audioDescription: boolean;
}

interface KeyboardNavigationOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
  skipLinks?: boolean;
}

interface FocusableElement extends HTMLElement {
  tabIndex: number;
}

// Main accessibility hook
export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : {
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      largeText: false,
      keyboardNavigation: true,
      screenReader: false,
      autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      subtitles: true,
      audioDescription: false
    };
  });

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    updateDocumentClasses(settings);
  }, [settings]);

  // Listen for media query changes
  useEffect(() => {
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleReduceMotionChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reduceMotion: e.matches, autoplay: !e.matches }));
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, highContrast: e.matches }));
    };

    reduceMotionQuery.addListener(handleReduceMotionChange);
    highContrastQuery.addListener(handleHighContrastChange);

    return () => {
      reduceMotionQuery.removeListener(handleReduceMotionChange);
      highContrastQuery.removeListener(handleHighContrastChange);
    };
  }, []);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    settings,
    updateSetting,
    isReducedMotion: settings.reduceMotion,
    isHighContrast: settings.highContrast,
    isLargeText: settings.largeText,
    isKeyboardNavigation: settings.keyboardNavigation,
    isScreenReader: settings.screenReader
  };
};

// Update document classes based on accessibility settings
const updateDocumentClasses = (settings: AccessibilitySettings) => {
  const { documentElement } = document;
  
  documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
  documentElement.classList.toggle('high-contrast', settings.highContrast);
  documentElement.classList.toggle('large-text', settings.largeText);
  documentElement.classList.toggle('keyboard-navigation', settings.keyboardNavigation);
  documentElement.classList.toggle('screen-reader', settings.screenReader);
};

// Keyboard navigation hook
export const useKeyboardNavigation = (options: KeyboardNavigationOptions = {}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const getFocusableElements = useCallback((): FocusableElement[] => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ];

    const elements = containerRef.current.querySelectorAll(
      focusableSelectors.join(', ')
    );

    return Array.from(elements).filter(el => {
      const element = el as FocusableElement;
      return element.offsetParent !== null && // Element is visible
             getComputedStyle(element).visibility !== 'hidden' &&
             !element.hasAttribute('aria-hidden');
    }) as FocusableElement[];
  }, []);

  const focusElement = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements[index]) {
      elements[index].focus();
      setFocusedIndex(index);
    }
  }, [getFocusableElements]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    const currentIndex = elements.findIndex(el => el === document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        const nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        focusElement(nextIndex);
        break;
      }
        
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        focusElement(prevIndex);
        break;
      }
        
      case 'Home':
        event.preventDefault();
        focusElement(0);
        break;
        
      case 'End':
        event.preventDefault();
        focusElement(elements.length - 1);
        break;
        
      case 'Tab':
        if (options.trapFocus) {
          event.preventDefault();
          const nextTabIndex = event.shiftKey ? 
            (currentIndex > 0 ? currentIndex - 1 : elements.length - 1) :
            (currentIndex < elements.length - 1 ? currentIndex + 1 : 0);
          focusElement(nextTabIndex);
        }
        break;
        
      case 'Escape':
        if (options.restoreFocus) {
          event.preventDefault();
          containerRef.current?.blur();
        }
        break;
    }
  }, [getFocusableElements, focusElement, options.trapFocus, options.restoreFocus]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (options.autoFocus) {
      const elements = getFocusableElements();
      if (elements.length > 0) {
        elements[0].focus();
        setFocusedIndex(0);
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, options.autoFocus, getFocusableElements]);

  return {
    containerRef,
    focusedIndex,
    focusElement,
    getFocusableElements
  };
};

// Screen reader announcements hook
export const useScreenReader = () => {
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announcementRef.current) {
      // Create announcement element if it doesn't exist
      const element = document.createElement('div');
      element.setAttribute('aria-live', priority);
      element.setAttribute('aria-atomic', 'true');
      element.className = 'sr-only';
      element.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `;
      document.body.appendChild(element);
      announcementRef.current = element;
    }

    announcementRef.current.setAttribute('aria-live', priority);
    announcementRef.current.textContent = message;
    
    // Clear the message after announcement
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);
  }, []);

  const announceError = useCallback((message: string) => {
    announce(`Error: ${message}`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((message: string) => {
    announce(`Success: ${message}`, 'polite');
  }, [announce]);

  const announceLoading = useCallback((message: string = 'Loading...') => {
    announce(message, 'polite');
  }, [announce]);

  return {
    announce,
    announceError,
    announceSuccess,
    announceLoading
  };
};

// Focus trap hook for modals and dialogs
export const useFocusTrap = (isActive: boolean = false) => {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        previousFocusRef.current?.focus();
      }
    };

    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
      
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
};

// High contrast detection and utilities
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(() => 
    window.matchMedia('(prefers-contrast: high)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addListener(handleChange);
    
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const getHighContrastStyles = useCallback((normalStyles: React.CSSProperties) => {
    if (!isHighContrast) return normalStyles;

    return {
      ...normalStyles,
      border: '2px solid',
      backgroundColor: 'Window',
      color: 'WindowText',
      borderColor: 'WindowText'
    };
  }, [isHighContrast]);

  return { isHighContrast, getHighContrastStyles };
};

// Reduced motion utilities
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addListener(handleChange);
    
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const getSafeAnimation = useCallback((animation: string) => {
    return prefersReducedMotion ? 'none' : animation;
  }, [prefersReducedMotion]);

  const getSafeTransition = useCallback((transition: string) => {
    return prefersReducedMotion ? 'none' : transition;
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    getSafeAnimation,
    getSafeTransition
  };
};

// Color contrast utilities
export const useColorContrast = () => {
  const calculateLuminance = useCallback((r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }, []);

  const calculateContrastRatio = useCallback((color1: string, color2: string): number => {
    const parseColor = (color: string): [number, number, number] => {
      const hex = color.replace('#', '');
      return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
      ];
    };

    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);

    const l1 = calculateLuminance(r1, g1, b1);
    const l2 = calculateLuminance(r2, g2, b2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }, [calculateLuminance]);

  const isAccessibleContrast = useCallback((foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const ratio = calculateContrastRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }, [calculateContrastRatio]);

  const suggestAccessibleColor = useCallback((originalColor: string, backgroundColor: string): string => {
    if (isAccessibleContrast(originalColor, backgroundColor)) {
      return originalColor;
    }

    // Simple algorithm to darken or lighten the color
    const hex = originalColor.replace('#', '');
    const [r, g, b] = [
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16)
    ];

    // Try darkening first
    let adjustedColor = originalColor;
    for (let factor = 0.8; factor > 0.1; factor -= 0.1) {
      const newR = Math.round(r * factor);
      const newG = Math.round(g * factor);
      const newB = Math.round(b * factor);
      
      adjustedColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      
      if (isAccessibleContrast(adjustedColor, backgroundColor)) {
        return adjustedColor;
      }
    }

    // If darkening doesn't work, try lightening
    for (let factor = 1.2; factor < 3; factor += 0.2) {
      const newR = Math.min(255, Math.round(r * factor));
      const newG = Math.min(255, Math.round(g * factor));
      const newB = Math.min(255, Math.round(b * factor));
      
      adjustedColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      
      if (isAccessibleContrast(adjustedColor, backgroundColor)) {
        return adjustedColor;
      }
    }

    // Fallback to high contrast colors
    return backgroundColor === '#ffffff' || backgroundColor === 'white' ? '#000000' : '#ffffff';
  }, [isAccessibleContrast]);

  return {
    calculateContrastRatio,
    isAccessibleContrast,
    suggestAccessibleColor
  };
};

// Accessible form utilities
export const useAccessibleForm = () => {
  const validateField = useCallback((
    field: HTMLInputElement, 
    rules: { required?: boolean; minLength?: number; pattern?: RegExp; custom?: (value: string) => string | null }
  ): string | null => {
    const value = field.value.trim();
    
    if (rules.required && !value) {
      return 'This field is required';
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }
    
    if (rules.custom) {
      return rules.custom(value);
    }
    
    return null;
  }, []);

  const setFieldError = useCallback((field: HTMLInputElement, error: string | null) => {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (error) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorId);
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        field.parentNode?.insertBefore(errorElement, field.nextSibling);
      }
      
      errorElement.textContent = error;
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      errorElement?.remove();
    }
  }, []);

  return {
    validateField,
    setFieldError
  };
};

// Skip links utility
export const useSkipLinks = () => {
  useEffect(() => {
    const skipLinks = document.querySelectorAll('[data-skip-link]');
    
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href') || '');
        if (target) {
          (target as HTMLElement).focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);
};

// ARIA live region utilities
export const useAriaLiveRegion = () => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!liveRegionRef.current) {
      const region = document.createElement('div');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      region.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `;
      document.body.appendChild(region);
      liveRegionRef.current = region;
    }
  }, []);

  const updateLiveRegion = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority);
      liveRegionRef.current.textContent = message;
    }
  }, []);

  return { updateLiveRegion };
};