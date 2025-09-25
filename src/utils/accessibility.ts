/**
 * Accessibility utilities for focus management, keyboard navigation, and ARIA support
 */

export interface FocusableElement extends HTMLElement {
  focus(): void;
}

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): FocusableElement[] => {
  const selectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll(selectors)) as FocusableElement[];
};

/**
 * Focus management for modal dialogs and overlays
 */
export class FocusManager {
  private previousFocus: HTMLElement | null = null;
  private container: HTMLElement | null = null;
  private focusableElements: FocusableElement[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.previousFocus = document.activeElement as HTMLElement;
    this.focusableElements = getFocusableElements(container);
  }

  trapFocus(): () => void {
    if (!this.container) return () => {};

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (this.focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    this.container.addEventListener('keydown', handleKeyDown);
    
    // Focus first element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }

    return () => {
      this.container?.removeEventListener('keydown', handleKeyDown);
    };
  }

  restoreFocus(): void {
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
}

/**
 * Keyboard navigation handler for lists and grids
 */
export class KeyboardNavigator {
  private elements: HTMLElement[] = [];
  private currentIndex = 0;
  private orientation: 'horizontal' | 'vertical' | 'grid' = 'vertical';
  private gridColumns = 1;

  constructor(
    elements: HTMLElement[],
    orientation: 'horizontal' | 'vertical' | 'grid' = 'vertical',
    gridColumns = 1
  ) {
    this.elements = elements;
    this.orientation = orientation;
    this.gridColumns = gridColumns;
  }

  handleKeyDown = (e: KeyboardEvent): boolean => {
    const { key } = e;
    let handled = false;

    switch (this.orientation) {
      case 'horizontal':
        if (key === 'ArrowLeft') {
          this.moveToPrevious();
          handled = true;
        } else if (key === 'ArrowRight') {
          this.moveToNext();
          handled = true;
        }
        break;

      case 'vertical':
        if (key === 'ArrowUp') {
          this.moveToPrevious();
          handled = true;
        } else if (key === 'ArrowDown') {
          this.moveToNext();
          handled = true;
        }
        break;

      case 'grid':
        if (key === 'ArrowLeft') {
          this.moveToPrevious();
          handled = true;
        } else if (key === 'ArrowRight') {
          this.moveToNext();
          handled = true;
        } else if (key === 'ArrowUp') {
          this.moveUp();
          handled = true;
        } else if (key === 'ArrowDown') {
          this.moveDown();
          handled = true;
        }
        break;
    }

    if (key === 'Home') {
      this.moveToFirst();
      handled = true;
    } else if (key === 'End') {
      this.moveToLast();
      handled = true;
    }

    if (handled) {
      e.preventDefault();
      this.focusCurrent();
    }

    return handled;
  };

  private moveToNext(): void {
    this.currentIndex = Math.min(this.currentIndex + 1, this.elements.length - 1);
  }

  private moveToPrevious(): void {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  private moveUp(): void {
    const newIndex = this.currentIndex - this.gridColumns;
    if (newIndex >= 0) {
      this.currentIndex = newIndex;
    }
  }

  private moveDown(): void {
    const newIndex = this.currentIndex + this.gridColumns;
    if (newIndex < this.elements.length) {
      this.currentIndex = newIndex;
    }
  }

  private moveToFirst(): void {
    this.currentIndex = 0;
  }

  private moveToLast(): void {
    this.currentIndex = this.elements.length - 1;
  }

  private focusCurrent(): void {
    const element = this.elements[this.currentIndex];
    if (element) {
      element.focus();
    }
  }

  setCurrentIndex(index: number): void {
    if (index >= 0 && index < this.elements.length) {
      this.currentIndex = index;
    }
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
}

/**
 * Screen reader announcements
 */
export class ScreenReaderAnnouncer {
  private liveRegion: HTMLElement;

  constructor() {
    this.liveRegion = this.createLiveRegion();
  }

  private createLiveRegion(): HTMLElement {
    const existing = document.getElementById('sr-live-region');
    if (existing) return existing;

    const region = document.createElement('div');
    region.id = 'sr-live-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(region);
    return region;
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }

  announceVideoStarted(title: string): void {
    this.announce(`Video started: ${title}`, 'polite');
  }

  announceVideoEnded(title: string): void {
    this.announce(`Video ended: ${title}`, 'polite');
  }

  announceNewVideos(count: number): void {
    this.announce(`${count} new videos available`, 'polite');
  }

  announceFilterChanged(filterType: string, value: string): void {
    this.announce(`Filter changed: ${filterType} set to ${value}`, 'polite');
  }

  announceSearchResults(count: number): void {
    this.announce(`${count} search results found`, 'polite');
  }
}

/**
 * ARIA utilities
 */
export const aria = {
  setExpanded: (element: HTMLElement, expanded: boolean): void => {
    element.setAttribute('aria-expanded', expanded.toString());
  },

  setSelected: (element: HTMLElement, selected: boolean): void => {
    element.setAttribute('aria-selected', selected.toString());
  },

  setPressed: (element: HTMLElement, pressed: boolean): void => {
    element.setAttribute('aria-pressed', pressed.toString());
  },

  setHidden: (element: HTMLElement, hidden: boolean): void => {
    if (hidden) {
      element.setAttribute('aria-hidden', 'true');
    } else {
      element.removeAttribute('aria-hidden');
    }
  },

  setLabel: (element: HTMLElement, label: string): void => {
    element.setAttribute('aria-label', label);
  },

  setDescribedBy: (element: HTMLElement, describedById: string): void => {
    element.setAttribute('aria-describedby', describedById);
  },

  setLabelledBy: (element: HTMLElement, labelledById: string): void => {
    element.setAttribute('aria-labelledby', labelledById);
  },

  setRole: (element: HTMLElement, role: string): void => {
    element.setAttribute('role', role);
  },

  setLive: (element: HTMLElement, live: 'off' | 'polite' | 'assertive'): void => {
    element.setAttribute('aria-live', live);
  }
};

/**
 * Skip link utility
 */
export const createSkipLink = (targetId: string, text: string): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
};

/**
 * Color contrast utilities
 */
export const colorContrast = {
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = colorContrast.getLuminance(...color1);
    const lum2 = colorContrast.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  meetsWCAG: (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};

// Global instances
export const screenReader = new ScreenReaderAnnouncer();

// Hook for React components
export const useAccessibility = () => {
  return {
    screenReader,
    aria,
    FocusManager,
    KeyboardNavigator,
    createSkipLink,
    getFocusableElements
  };
};