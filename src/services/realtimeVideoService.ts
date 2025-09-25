/**
 * Real-time video updates service with WebSocket simulation and optimistic UI
 */
import React from 'react';

export interface VideoMetrics {
  totalVideos: number;
  liveVideos: number;
  totalViews: number;
  platformsActive: number;
  languagesDetected: number;
  factChecksPerformed: number;
  lastUpdated: Date;
}

export interface VideoUpdate {
  id: string;
  type: 'new' | 'update' | 'metrics' | 'live_start' | 'live_end';
  data: any;
  timestamp: Date;
}

export interface RealtimeVideoServiceOptions {
  updateInterval?: number;
  enableOptimisticUI?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

type UpdateListener = (update: VideoUpdate) => void;
type MetricsListener = (metrics: VideoMetrics) => void;
type ConnectionListener = (connected: boolean) => void;

class RealtimeVideoService {
  private isConnected = false;
  private updateListeners: UpdateListener[] = [];
  private metricsListeners: MetricsListener[] = [];
  private connectionListeners: ConnectionListener[] = [];
  private options: Required<RealtimeVideoServiceOptions>;
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;
  private retryCount = 0;
  private currentMetrics: VideoMetrics;

  constructor(options: RealtimeVideoServiceOptions = {}) {
    this.options = {
      updateInterval: 3000,
      enableOptimisticUI: true,
      maxRetries: 5,
      retryDelay: 2000,
      ...options
    };

    this.currentMetrics = {
      totalVideos: 2847,
      liveVideos: 23,
      totalViews: 8934567,
      platformsActive: 6,
      languagesDetected: 4,
      factChecksPerformed: 156,
      lastUpdated: new Date()
    };
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      // Simulate connection delay
      setTimeout(() => {
        this.isConnected = true;
        this.retryCount = 0;
        this.notifyConnectionListeners(true);
        this.startUpdates();
        resolve();
      }, 1000);
    });
  }

  disconnect(): void {
    this.isConnected = false;
    this.stopUpdates();
    this.notifyConnectionListeners(false);
  }

  private startUpdates(): void {
    if (this.updateInterval) return;

    this.updateInterval = setInterval(() => {
      if (!this.isConnected) return;

      // Simulate various types of updates
      this.simulateUpdates();
      this.updateMetrics();
    }, this.options.updateInterval);
  }

  private stopUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
  }

  private simulateUpdates(): void {
    const updateTypes = ['new', 'update', 'metrics', 'live_start', 'live_end'] as const;
    const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];

    let update: VideoUpdate;

    switch (randomType) {
      case 'new':
        update = {
          id: `video_${Date.now()}`,
          type: 'new',
          data: {
            title: this.generateRandomVideoTitle(),
            platform: this.getRandomPlatform(),
            category: this.getRandomCategory(),
            isLive: Math.random() > 0.8,
            views: Math.floor(Math.random() * 100000),
            likes: Math.floor(Math.random() * 10000),
            author: this.generateRandomAuthor()
          },
          timestamp: new Date()
        };
        break;

      case 'update':
        update = {
          id: `video_${Math.floor(Math.random() * 1000)}`,
          type: 'update',
          data: {
            views: Math.floor(Math.random() * 1000) + 100,
            likes: Math.floor(Math.random() * 100) + 10,
            comments: Math.floor(Math.random() * 50) + 5
          },
          timestamp: new Date()
        };
        break;

      case 'live_start':
        update = {
          id: `live_${Date.now()}`,
          type: 'live_start',
          data: {
            title: 'URGENTE: ' + this.generateRandomVideoTitle(),
            platform: this.getRandomPlatform(),
            currentViewers: Math.floor(Math.random() * 10000) + 100
          },
          timestamp: new Date()
        };
        break;

      case 'live_end':
        update = {
          id: `live_${Math.floor(Math.random() * 100)}`,
          type: 'live_end',
          data: {
            peakViewers: Math.floor(Math.random() * 20000) + 1000,
            duration: Math.floor(Math.random() * 180) + 30 // minutes
          },
          timestamp: new Date()
        };
        break;

      default:
        return;
    }

    this.notifyUpdateListeners(update);
  }

  private updateMetrics(): void {
    // Simulate realistic metric changes
    const newMetrics: VideoMetrics = {
      totalVideos: this.currentMetrics.totalVideos + Math.floor(Math.random() * 3),
      liveVideos: Math.max(0, this.currentMetrics.liveVideos + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0)),
      totalViews: this.currentMetrics.totalViews + Math.floor(Math.random() * 500) + 100,
      platformsActive: this.currentMetrics.platformsActive,
      languagesDetected: this.currentMetrics.languagesDetected + (Math.random() > 0.95 ? 1 : 0),
      factChecksPerformed: this.currentMetrics.factChecksPerformed + (Math.random() > 0.9 ? 1 : 0),
      lastUpdated: new Date()
    };

    this.currentMetrics = newMetrics;
    this.notifyMetricsListeners(newMetrics);
  }

  private generateRandomVideoTitle(): string {
    const titles = [
      'Análisis en vivo del debate presidencial',
      'Explicación rápida de la reforma tributaria',
      'Manifestación pacífica en el centro',
      'Tutorial: Cómo ejercer tu derecho al voto',
      'Última hora: Decisión de la Corte Constitucional',
      'En vivo desde el Congreso de la República',
      'Entrevista exclusiva con candidato presidencial',
      'Breaking: Acuerdo de paz - nuevos desarrollos'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private getRandomPlatform(): string {
    const platforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'x-twitter'];
    return platforms[Math.floor(Math.random() * platforms.length)];
  }

  private getRandomCategory(): string {
    const categories = ['Política', 'Educación Cívica', 'Actualidad', 'Elecciones', 'Debates'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private generateRandomAuthor(): any {
    const authors = [
      { name: 'Canal Congreso', verified: true, followers: '245K' },
      { name: 'Periodista Ciudadano', verified: false, followers: '56K' },
      { name: 'Registraduría Nacional', verified: true, followers: '189K' },
      { name: 'Analista Político', verified: true, followers: '123K' }
    ];
    return authors[Math.floor(Math.random() * authors.length)];
  }

  private notifyUpdateListeners(update: VideoUpdate): void {
    this.updateListeners.forEach(listener => {
      try {
        listener(update);
      } catch (error) {
        console.error('Error in update listener:', error);
      }
    });
  }

  private notifyMetricsListeners(metrics: VideoMetrics): void {
    this.metricsListeners.forEach(listener => {
      try {
        listener(metrics);
      } catch (error) {
        console.error('Error in metrics listener:', error);
      }
    });
  }

  private notifyConnectionListeners(connected: boolean): void {
    this.connectionListeners.forEach(listener => {
      try {
        listener(connected);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }

  // Public API
  onUpdate(listener: UpdateListener): () => void {
    this.updateListeners.push(listener);
    return () => {
      const index = this.updateListeners.indexOf(listener);
      if (index > -1) {
        this.updateListeners.splice(index, 1);
      }
    };
  }

  onMetricsUpdate(listener: MetricsListener): () => void {
    this.metricsListeners.push(listener);
    return () => {
      const index = this.metricsListeners.indexOf(listener);
      if (index > -1) {
        this.metricsListeners.splice(index, 1);
      }
    };
  }

  onConnectionChange(listener: ConnectionListener): () => void {
    this.connectionListeners.push(listener);
    return () => {
      const index = this.connectionListeners.indexOf(listener);
      if (index > -1) {
        this.connectionListeners.splice(index, 1);
      }
    };
  }

  getCurrentMetrics(): VideoMetrics {
    return { ...this.currentMetrics };
  }

  isConnectedToRealtime(): boolean {
    return this.isConnected;
  }

  // Optimistic UI methods
  optimisticallyAddVideo(video: any): void {
    if (!this.options.enableOptimisticUI) return;

    const update: VideoUpdate = {
      id: video.id || `optimistic_${Date.now()}`,
      type: 'new',
      data: { ...video, optimistic: true },
      timestamp: new Date()
    };

    this.notifyUpdateListeners(update);
  }

  optimisticallyUpdateMetrics(changes: Partial<VideoMetrics>): void {
    if (!this.options.enableOptimisticUI) return;

    const updatedMetrics = {
      ...this.currentMetrics,
      ...changes,
      lastUpdated: new Date()
    };

    this.currentMetrics = updatedMetrics;
    this.notifyMetricsListeners(updatedMetrics);
  }

  // Retry logic for failed connections
  private attemptReconnect(): void {
    if (this.retryCount >= this.options.maxRetries) {
      console.error('Max retry attempts reached');
      return;
    }

    this.retryCount++;
    this.retryTimeout = setTimeout(() => {
      this.connect().catch(() => {
        this.attemptReconnect();
      });
    }, this.options.retryDelay * this.retryCount);
  }
}

// Global service instance
export const realtimeVideoService = new RealtimeVideoService();

// React hook for easier usage
export const useRealtimeVideoService = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [metrics, setMetrics] = React.useState<VideoMetrics | null>(null);
  const [updates, setUpdates] = React.useState<VideoUpdate[]>([]);

  React.useEffect(() => {
    const unsubscribeConnection = realtimeVideoService.onConnectionChange(setIsConnected);
    const unsubscribeMetrics = realtimeVideoService.onMetricsUpdate(setMetrics);
    const unsubscribeUpdates = realtimeVideoService.onUpdate((update) => {
      setUpdates(prev => [update, ...prev.slice(0, 49)]); // Keep last 50 updates
    });

    // Initialize connection
    realtimeVideoService.connect();

    return () => {
      unsubscribeConnection();
      unsubscribeMetrics();
      unsubscribeUpdates();
    };
  }, []);

  return {
    isConnected,
    metrics: metrics || realtimeVideoService.getCurrentMetrics(),
    updates,
    service: realtimeVideoService
  };
};

export default realtimeVideoService;