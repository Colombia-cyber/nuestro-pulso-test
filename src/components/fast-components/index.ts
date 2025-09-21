/**
 * Fast Components Library (fast-r7aqkx-222-d through fast-r7aqkx-253-d)
 * Ultra-fast, world-class components optimized for instant response and accessibility
 */

export { default as FastBase, type FastComponentProps, usePerformanceMonitor, useFastInteraction, withFastPerformance } from './FastBase';
export { default as FastButton, type FastButtonProps, type FastButtonRef } from './FastButton';
export { default as FastSearch, type FastSearchProps } from './FastSearch';
export { default as FastNewsCard, type FastNewsCardProps, type NewsArticle } from './FastNewsCard';

// Component registry for fast components
export const FAST_COMPONENTS = {
  'fast-r7aqkx-222-d': 'FastButton',
  'fast-r7aqkx-223-d': 'FastSearch', 
  'fast-r7aqkx-224-d': 'FastNewsCard',
  'fast-r7aqkx-225-d': 'FastNavigation',
  'fast-r7aqkx-226-d': 'FastCard',
  'fast-r7aqkx-227-d': 'FastModal',
  'fast-r7aqkx-228-d': 'FastDropdown',
  'fast-r7aqkx-229-d': 'FastTabs',
  'fast-r7aqkx-230-d': 'FastTable',
  'fast-r7aqkx-231-d': 'FastForm',
  'fast-r7aqkx-232-d': 'FastInput',
  'fast-r7aqkx-233-d': 'FastSelect',
  'fast-r7aqkx-234-d': 'FastCheckbox',
  'fast-r7aqkx-235-d': 'FastRadio',
  'fast-r7aqkx-236-d': 'FastTextarea',
  'fast-r7aqkx-237-d': 'FastDatePicker',
  'fast-r7aqkx-238-d': 'FastTimePicker',
  'fast-r7aqkx-239-d': 'FastColorPicker',
  'fast-r7aqkx-240-d': 'FastSlider',
  'fast-r7aqkx-241-d': 'FastProgressBar',
  'fast-r7aqkx-242-d': 'FastSpinner',
  'fast-r7aqkx-243-d': 'FastAlert',
  'fast-r7aqkx-244-d': 'FastToast',
  'fast-r7aqkx-245-d': 'FastTooltip',
  'fast-r7aqkx-246-d': 'FastPopover',
  'fast-r7aqkx-247-d': 'FastCarousel',
  'fast-r7aqkx-248-d': 'FastGallery',
  'fast-r7aqkx-249-d': 'FastChart',
  'fast-r7aqkx-250-d': 'FastMap',
  'fast-r7aqkx-251-d': 'FastCalendar',
  'fast-r7aqkx-252-d': 'FastTree',
  'fast-r7aqkx-253-d': 'FastVirtualList'
} as const;

// Performance metrics collector
export class FastComponentsMetrics {
  private static instance: FastComponentsMetrics;
  private metrics: Map<string, Array<{ renderTime: number; timestamp: number }>> = new Map();

  static getInstance(): FastComponentsMetrics {
    if (!FastComponentsMetrics.instance) {
      FastComponentsMetrics.instance = new FastComponentsMetrics();
    }
    return FastComponentsMetrics.instance;
  }

  recordMetric(componentName: string, renderTime: number) {
    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, []);
    }
    
    const componentMetrics = this.metrics.get(componentName)!;
    componentMetrics.push({ renderTime, timestamp: Date.now() });
    
    // Keep only last 100 measurements
    if (componentMetrics.length > 100) {
      componentMetrics.shift();
    }
  }

  getAverageRenderTime(componentName: string): number {
    const componentMetrics = this.metrics.get(componentName);
    if (!componentMetrics || componentMetrics.length === 0) return 0;
    
    const sum = componentMetrics.reduce((acc, metric) => acc + metric.renderTime, 0);
    return sum / componentMetrics.length;
  }

  getPerformanceReport(): Record<string, { averageRenderTime: number; measurementCount: number }> {
    const report: Record<string, { averageRenderTime: number; measurementCount: number }> = {};
    
    this.metrics.forEach((metrics, componentName) => {
      report[componentName] = {
        averageRenderTime: this.getAverageRenderTime(componentName),
        measurementCount: metrics.length
      };
    });
    
    return report;
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

// Global performance settings
export const FAST_COMPONENTS_CONFIG = {
  // Performance budget in milliseconds
  RENDER_BUDGET: 16, // 60fps target
  
  // Warning threshold in milliseconds  
  PERFORMANCE_WARNING_THRESHOLD: 10,
  
  // Critical threshold in milliseconds
  PERFORMANCE_CRITICAL_THRESHOLD: 20,
  
  // Enable/disable performance monitoring
  PERFORMANCE_MONITORING: import.meta.env.DEV,
  
  // Enable/disable analytics
  ANALYTICS_ENABLED: true,
  
  // Debounce delays for different interaction types
  INTERACTION_DELAYS: {
    CLICK: 0, // Instant response for clicks
    HOVER: 50, // Slight delay for hover to prevent excessive triggers  
    SCROLL: 100, // Throttle scroll events
    RESIZE: 150, // Throttle resize events
    INPUT: 200 // Debounce input for search/filtering
  },
  
  // Animation preferences
  ANIMATIONS: {
    DURATION: 200, // Default animation duration in ms
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design easing
    REDUCE_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  // Accessibility settings
  ACCESSIBILITY: {
    FOCUS_RING: true,
    HIGH_CONTRAST: window.matchMedia('(prefers-contrast: high)').matches,
    REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    SCREEN_READER: navigator.userAgent.includes('NVDA') || navigator.userAgent.includes('JAWS')
  }
};

// Utility function to check if a component is a fast component
export function isFastComponent(componentId: string): boolean {
  return Object.keys(FAST_COMPONENTS).includes(componentId);
}

// Utility function to get component name from ID
export function getFastComponentName(componentId: string): string | undefined {
  return FAST_COMPONENTS[componentId as keyof typeof FAST_COMPONENTS];
}

// Performance monitoring hook for the entire fast components system
export function useFastComponentsMonitor() {
  const metrics = FastComponentsMetrics.getInstance();
  
  return {
    getReport: () => metrics.getPerformanceReport(),
    clearMetrics: () => metrics.clearMetrics(),
    getAverageRenderTime: (componentName: string) => metrics.getAverageRenderTime(componentName),
    config: FAST_COMPONENTS_CONFIG
  };
}