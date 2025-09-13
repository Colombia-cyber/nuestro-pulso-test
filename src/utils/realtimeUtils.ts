import { onDisconnect, ref, serverTimestamp, set, off } from 'firebase/database';

export class RealtimeConnectionManager {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private connectionListeners: Array<(isOnline: boolean) => void> = [];
  private isConnected = false;

  constructor() {
    this.setupConnectionMonitoring();
  }

  private setupConnectionMonitoring() {
    // Monitor online/offline status
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Monitor Firebase connection status
    this.setupFirebaseConnectionMonitoring();
  }

  private setupFirebaseConnectionMonitoring() {
    // This would be used with Realtime Database for presence
    // For Firestore, we use different strategies
    this.isConnected = navigator.onLine;
    this.notifyConnectionChange(this.isConnected);
  }

  private handleOnline() {
    console.log('Connection restored');
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.notifyConnectionChange(true);
  }

  private handleOffline() {
    console.log('Connection lost');
    this.isConnected = false;
    this.notifyConnectionChange(false);
    this.attemptReconnection();
  }

  private async attemptReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
    
    console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      if (navigator.onLine) {
        this.handleOnline();
      } else {
        this.attemptReconnection();
      }
    }, delay);
  }

  private notifyConnectionChange(isOnline: boolean) {
    this.connectionListeners.forEach(listener => {
      try {
        listener(isOnline);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }

  public addConnectionListener(listener: (isOnline: boolean) => void) {
    this.connectionListeners.push(listener);
    // Immediately notify with current status
    listener(this.isConnected);
  }

  public removeConnectionListener(listener: (isOnline: boolean) => void) {
    const index = this.connectionListeners.indexOf(listener);
    if (index > -1) {
      this.connectionListeners.splice(index, 1);
    }
  }

  public getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      isReconnecting: this.reconnectAttempts > 0 && !this.isConnected
    };
  }

  public forceReconnect() {
    this.reconnectAttempts = 0;
    if (!navigator.onLine) {
      console.log('Cannot force reconnect - device is offline');
      return;
    }
    this.handleOnline();
  }
}

// Utility functions for real-time features
export const createTypingIndicator = () => {
  let typingTimeout: number | null = null;
  const typingUsers = new Set<string>();

  return {
    startTyping: (userId: string, callback: (users: string[]) => void) => {
      typingUsers.add(userId);
      callback(Array.from(typingUsers));
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      typingTimeout = setTimeout(() => {
        typingUsers.delete(userId);
        callback(Array.from(typingUsers));
      }, 3000) as unknown as number; // Stop showing typing after 3 seconds
    },
    
    stopTyping: (userId: string, callback: (users: string[]) => void) => {
      typingUsers.delete(userId);
      callback(Array.from(typingUsers));
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
      }
    },
    
    getTypingUsers: () => Array.from(typingUsers)
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait) as unknown as number;
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastFunc: number | null = null;
  let lastRan: number | undefined;
  
  return (...args: Parameters<T>) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      
      lastFunc = setTimeout(() => {
        if (Date.now() - (lastRan as number) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan)) as unknown as number;
    }
  };
};

// Create a singleton instance
export const connectionManager = new RealtimeConnectionManager();