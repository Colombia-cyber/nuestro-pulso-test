import React, { memo, useState, useEffect, useCallback } from 'react';
import { useOptimizedState } from '../hooks/useOptimizedState';
import { FastButton } from './FastComponents';

/**
 * Ultra-fast performance dashboard component
 * Part of fast-r7aqkx-235-d component series
 */
export interface PerformanceMetrics {
  componentRenders: number;
  averageRenderTime: number;
  lastRenderTime: number;
  memoryUsage: number;
  fpsCount: number;
  networkRequests: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface FastPerformanceDashboardProps {
  showDetailed?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  className?: string;
}

const FastPerformanceDashboardComponent: React.FC<FastPerformanceDashboardProps> = ({
  showDetailed = false,
  autoRefresh = true,
  refreshInterval = 1000,
  className = ''
}) => {
  const { value: isVisible, setValue: setIsVisible } = useOptimizedState({
    defaultValue: showDetailed,
    enablePerformanceTracking: true
  });

  const { value: metrics, setValue: setMetrics } = useOptimizedState<PerformanceMetrics>({
    defaultValue: {
      componentRenders: 0,
      averageRenderTime: 0,
      lastRenderTime: 0,
      memoryUsage: 0,
      fpsCount: 60,
      networkRequests: 0,
      cacheHits: 0,
      cacheMisses: 0
    },
    enablePerformanceTracking: true
  });

  const { value: realTimeData, setValue: setRealTimeData } = useOptimizedState({
    defaultValue: {
      onlineUsers: 2847,
      activeComponents: 32,
      responseTime: 0,
      throughput: 0
    },
    enablePerformanceTracking: true
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate performance data
      const now = performance.now();
      const memory = (performance as any).memory;

      setMetrics({
        componentRenders: metrics.componentRenders + Math.floor(Math.random() * 10),
        averageRenderTime: 0.5 + Math.random() * 2, // 0.5-2.5ms
        lastRenderTime: 0.1 + Math.random() * 0.5, // 0.1-0.6ms
        memoryUsage: memory ? memory.usedJSHeapSize / 1024 / 1024 : Math.random() * 50, // MB
        fpsCount: 58 + Math.random() * 4, // 58-62 FPS
        networkRequests: metrics.networkRequests + Math.floor(Math.random() * 5),
        cacheHits: metrics.cacheHits + Math.floor(Math.random() * 15),
        cacheMisses: metrics.cacheMisses + Math.floor(Math.random() * 2)
      });

      setRealTimeData({
        onlineUsers: 2847 + Math.floor(Math.random() * 20) - 10,
        activeComponents: 32 + Math.floor(Math.random() * 8) - 4,
        responseTime: 50 + Math.random() * 100, // 50-150ms
        throughput: 150 + Math.random() * 50 // 150-200 req/s
      });
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, metrics, setMetrics, setRealTimeData]);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  const getPerformanceStatus = useCallback((value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'excellent';
    if (value <= thresholds[1]) return 'good';
    return 'needs-improvement';
  }, []);

  const formatNumber = useCallback((num: number, decimals = 0) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }, []);

  if (!isVisible) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <FastButton
          onClick={toggleVisibility}
          variant="primary"
          size="sm"
          className="shadow-fast bg-green-600 hover:bg-green-700"
          ripple={true}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse-modern"></span>
            <span>Performance</span>
          </span>
        </FastButton>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white rounded-xl shadow-fast border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto fast-scroll animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse-modern"></span>
            Performance Monitor
          </h3>
          <FastButton
            onClick={toggleVisibility}
            variant="ghost"
            size="sm"
            ripple={true}
          >
            ✕
          </FastButton>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm text-blue-600 font-medium">Usuarios Online</div>
            <div className="text-lg font-bold text-blue-800">
              {formatNumber(realTimeData.onlineUsers)}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm text-green-600 font-medium">Componentes</div>
            <div className="text-lg font-bold text-green-800">
              {realTimeData.activeComponents}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-sm text-purple-600 font-medium">Respuesta</div>
            <div className="text-lg font-bold text-purple-800">
              {formatNumber(realTimeData.responseTime, 0)}ms
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-sm text-orange-600 font-medium">Throughput</div>
            <div className="text-lg font-bold text-orange-800">
              {formatNumber(realTimeData.throughput, 0)}/s
            </div>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Renders</span>
            <span className="text-sm text-gray-600">
              {formatNumber(metrics.componentRenders)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Render Time</span>
            <span className={`text-sm px-2 py-1 rounded ${
              getPerformanceStatus(metrics.averageRenderTime, [1, 3]) === 'excellent' 
                ? 'bg-green-100 text-green-800'
                : getPerformanceStatus(metrics.averageRenderTime, [1, 3]) === 'good'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {formatNumber(metrics.averageRenderTime, 2)}ms
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Memory Usage</span>
            <span className="text-sm text-gray-600">
              {formatNumber(metrics.memoryUsage, 1)}MB
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">FPS</span>
            <span className={`text-sm px-2 py-1 rounded ${
              metrics.fpsCount >= 58 
                ? 'bg-green-100 text-green-800'
                : metrics.fpsCount >= 45
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {formatNumber(metrics.fpsCount, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Cache Hit Rate</span>
            <span className="text-sm text-gray-600">
              {formatNumber((metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses + 1)) * 100, 1)}%
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Ultra-Fast Mode</span>
            </div>
            <div className="text-gray-500">
              {formatNumber(Date.now() % 1000, 0)}ms ago
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex gap-2">
          <FastButton
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            ripple={true}
            onClick={() => {
              // Clear metrics
              setMetrics({
                componentRenders: 0,
                averageRenderTime: 0,
                lastRenderTime: 0,
                memoryUsage: 0,
                fpsCount: 60,
                networkRequests: 0,
                cacheHits: 0,
                cacheMisses: 0
              });
            }}
          >
            Reset
          </FastButton>
          <FastButton
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            ripple={true}
            onClick={() => {
              // Trigger garbage collection if available
              if ((window as any).gc) {
                (window as any).gc();
              }
            }}
          >
            GC
          </FastButton>
        </div>
      </div>
    </div>
  );
};

export const FastPerformanceDashboard = memo(FastPerformanceDashboardComponent);

/**
 * Ultra-fast notification system
 * Part of fast-r7aqkx-236-d component series
 */
export interface FastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface FastNotificationSystemProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxNotifications?: number;
  className?: string;
}

const FastNotificationSystemComponent: React.FC<FastNotificationSystemProps> = ({
  position = 'top-right',
  maxNotifications = 5,
  className = ''
}) => {
  const { value: notifications, setValue: setNotifications } = useOptimizedState<FastNotification[]>({
    defaultValue: [],
    enablePerformanceTracking: true
  });

  const removeNotification = useCallback((id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  }, [notifications, setNotifications]);

  const addNotification = useCallback((notification: Omit<FastNotification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: FastNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };

    setNotifications([...notifications.slice(-(maxNotifications - 1)), newNotification]);

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, newNotification.duration);
  }, [notifications, maxNotifications, setNotifications, removeNotification]);

  // Expose global notification function
  useEffect(() => {
    (window as any).showNotification = addNotification;
    return () => {
      delete (window as any).showNotification;
    };
  }, [addNotification]);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2 ${className}`}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            notification-fast max-w-sm p-4 rounded-lg border shadow-fast
            ${getNotificationColors(notification.type)}
            animate-slideIn transform-gpu
          `}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              {notification.message && (
                <p className="text-sm opacity-90 mt-1">{notification.message}</p>
              )}
              {notification.action && (
                <FastButton
                  onClick={notification.action.onClick}
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs"
                  ripple={true}
                >
                  {notification.action.label}
                </FastButton>
              )}
            </div>
            <FastButton
              onClick={() => removeNotification(notification.id)}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-1"
              ripple={true}
            >
              ✕
            </FastButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FastNotificationSystem = memo(FastNotificationSystemComponent);