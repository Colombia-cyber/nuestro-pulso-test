/**
 * Utility functions for handling touch and gesture events with improved sensitivity
 * to prevent accidental navigation from minor movements
 */

export interface DebouncedEventOptions {
  delay?: number;
  immediate?: boolean;
}

export interface GestureThresholds {
  minSwipeDistance: number;
  minSwipeVelocity: number;
  maxSwipeTime: number;
  longPressTime: number;
  tapMaxMovement: number;
}

// Conservative thresholds to prevent accidental gestures
export const DEFAULT_GESTURE_THRESHOLDS: GestureThresholds = {
  minSwipeDistance: 120, // Increased from 50px to 120px
  minSwipeVelocity: 0.3, // Minimum velocity to register as intentional swipe
  maxSwipeTime: 800, // Decreased from 1000ms to 800ms for more deliberate gestures
  longPressTime: 800, // Increased from 500ms to 800ms
  tapMaxMovement: 15, // Increased from 10px to 15px
};

/**
 * Creates a debounced version of a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime = 0;

  return function debouncedFunction(...args: Parameters<T>) {
    const now = Date.now();
    const shouldCallImmediately = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (shouldCallImmediately) {
      func.apply(this, args);
      lastCallTime = now;
    }

    timeoutId = setTimeout(() => {
      if (!immediate || now - lastCallTime >= delay) {
        func.apply(this, args);
      }
      timeoutId = null;
    }, delay);
  };
}

/**
 * Creates a throttled version of a function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function throttledFunction(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= delay) {
      func.apply(this, args);
      lastCallTime = now;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastCallTime = Date.now();
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Enhanced gesture detection with improved thresholds
 */
export class ImprovedGestureDetector {
  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private touchCount = 0;
  private isGestureActive = false;
  private thresholds: GestureThresholds;

  constructor(thresholds: Partial<GestureThresholds> = {}) {
    this.thresholds = { ...DEFAULT_GESTURE_THRESHOLDS, ...thresholds };
  }

  handleTouchStart = (e: TouchEvent) => {
    this.touchCount = e.touches.length;
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    this.startTime = Date.now();
    this.isGestureActive = true;
  };

  handleTouchEnd = (e: TouchEvent, onGesture: (gesture: GestureResult) => void) => {
    if (!this.isGestureActive) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const endTime = Date.now();

    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / deltaTime;

    this.isGestureActive = false;

    const gesture = this.processGesture(deltaX, deltaY, deltaTime, distance, velocity);
    if (gesture) {
      onGesture(gesture);
    }
  };

  private processGesture(
    deltaX: number,
    deltaY: number,
    deltaTime: number,
    distance: number,
    velocity: number
  ): GestureResult | null {
    // Long press detection (no movement allowed)
    if (
      deltaTime >= this.thresholds.longPressTime &&
      distance <= this.thresholds.tapMaxMovement
    ) {
      return {
        type: 'long-press',
        fingers: this.touchCount,
        confidence: 0.9,
      };
    }

    // Swipe detection with stricter requirements
    if (
      deltaTime <= this.thresholds.maxSwipeTime &&
      distance >= this.thresholds.minSwipeDistance &&
      velocity >= this.thresholds.minSwipeVelocity
    ) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up');

      // Additional check for intentional swipes
      const primaryAxisDistance = Math.abs(deltaX) > Math.abs(deltaY) ? Math.abs(deltaX) : Math.abs(deltaY);
      const secondaryAxisDistance = Math.abs(deltaX) > Math.abs(deltaY) ? Math.abs(deltaY) : Math.abs(deltaX);
      const directionalConfidence = primaryAxisDistance / (primaryAxisDistance + secondaryAxisDistance);

      // Only register swipes with clear directional intent
      if (directionalConfidence >= 0.7) {
        return {
          type: 'swipe',
          direction,
          fingers: this.touchCount,
          velocity,
          distance,
          confidence: Math.min(directionalConfidence * velocity, 1.0),
        };
      }
    }

    // Tap detection
    if (
      deltaTime < this.thresholds.longPressTime &&
      distance <= this.thresholds.tapMaxMovement
    ) {
      return {
        type: 'tap',
        fingers: this.touchCount,
        confidence: 0.8,
      };
    }

    return null; // No recognizable gesture
  }
}

export interface GestureResult {
  type: 'swipe' | 'tap' | 'long-press';
  direction?: 'left' | 'right' | 'up' | 'down';
  fingers: number;
  velocity?: number;
  distance?: number;
  confidence: number;
}

/**
 * Create a debounced navigation handler
 */
export function createDebouncedNavigationHandler(
  onNavigate: (view: string) => void,
  delay: number = 500
) {
  return debounce(onNavigate, delay, false);
}

/**
 * Create a debounced click handler to prevent rapid clicking
 */
export function createDebouncedClickHandler<T extends (...args: any[]) => any>(
  handler: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  return debounce(handler, delay, true);
}