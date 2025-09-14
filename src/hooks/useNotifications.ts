import { useState, useEffect, useCallback, useRef } from 'react';
import { UserNotification, PaginatedResponse } from '../types/api';
import { NotificationService } from '../services/notificationService';
import { ApiException } from '../types/api';

interface UseNotificationsState {
  notifications: UserNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
}

interface UseNotificationsActions {
  loadMore: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAsUnread: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  deleteAllRead: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

interface UseNotificationsOptions {
  limit?: number;
  unreadOnly?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

/**
 * Custom hook for managing user notifications
 * Provides CRUD operations for notifications with pagination, real-time updates, and state management
 */
export function useNotifications(
  userId: string,
  options: UseNotificationsOptions = {}
): UseNotificationsState & UseNotificationsActions {
  const {
    limit = 20,
    unreadOnly = false,
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
  } = options;

  const [state, setState] = useState<UseNotificationsState>({
    notifications: [],
    unreadCount: 0,
    loading: true,
    error: null,
    hasMore: true,
    currentPage: 1,
  });

  const refreshIntervalRef = useRef<number | null>(null);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Load notifications with pagination
  const loadNotifications = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!userId) return;

    if (page === 1) setLoading(true);
    setError(null);

    try {
      const response: PaginatedResponse<UserNotification> = await NotificationService.getUserNotifications(
        userId,
        page,
        limit,
        unreadOnly
      );

      if (response.success) {
        setState(prev => ({
          ...prev,
          notifications: append ? [...prev.notifications, ...response.data] : response.data,
          hasMore: response.pagination.hasNext,
          currentPage: page,
          loading: false,
        }));
      } else {
        setError(response.error || 'Failed to load notifications');
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while loading notifications');
      }
      setLoading(false);
    }
  }, [userId, limit, unreadOnly, setLoading, setError]);

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await NotificationService.getUnreadCount(userId);
      if (response.success && response.data) {
        setState(prev => ({ ...prev, unreadCount: response.data!.count }));
      }
    } catch (error) {
      // Silently fail for unread count to not disrupt main functionality
      console.warn('Failed to load unread count:', error);
    }
  }, [userId]);

  // Load more notifications (pagination)
  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore) return;
    await loadNotifications(state.currentPage + 1, true);
  }, [state.loading, state.hasMore, state.currentPage, loadNotifications]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!userId) return;

    try {
      const response = await NotificationService.markAsRead(userId, notificationId);
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          notifications: prev.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          ),
          unreadCount: Math.max(0, prev.unreadCount - 1),
        }));
      } else {
        setError(response.error || 'Failed to mark notification as read');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [userId, setError]);

  // Mark notification as unread
  const markAsUnread = useCallback(async (notificationId: string) => {
    if (!userId) return;

    try {
      const response = await NotificationService.markAsUnread(userId, notificationId);
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          notifications: prev.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, read: false }
              : notification
          ),
          unreadCount: prev.unreadCount + 1,
        }));
      } else {
        setError(response.error || 'Failed to mark notification as unread');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [userId, setError]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await NotificationService.markAllAsRead(userId);
      if (response.success) {
        setState(prev => ({
          ...prev,
          notifications: prev.notifications.map(notification => ({ ...notification, read: true })),
          unreadCount: 0,
        }));
      } else {
        setError(response.error || 'Failed to mark all notifications as read');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [userId, setError]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId: string) => {
    if (!userId) return;

    try {
      const response = await NotificationService.deleteNotification(userId, notificationId);
      if (response.success) {
        setState(prev => {
          const deletedNotification = prev.notifications.find(n => n.id === notificationId);
          const wasUnread = deletedNotification && !deletedNotification.read;
          
          return {
            ...prev,
            notifications: prev.notifications.filter(n => n.id !== notificationId),
            unreadCount: wasUnread ? Math.max(0, prev.unreadCount - 1) : prev.unreadCount,
          };
        });
      } else {
        setError(response.error || 'Failed to delete notification');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [userId, setError]);

  // Delete all read notifications
  const deleteAllRead = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await NotificationService.deleteAllRead(userId);
      if (response.success) {
        setState(prev => ({
          ...prev,
          notifications: prev.notifications.filter(notification => !notification.read),
        }));
      } else {
        setError(response.error || 'Failed to delete read notifications');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [userId, setError]);

  // Refresh notifications
  const refresh = useCallback(async () => {
    await Promise.all([
      loadNotifications(1, false),
      loadUnreadCount(),
    ]);
  }, [loadNotifications, loadUnreadCount]);

  // Initial load and setup
  useEffect(() => {
    if (userId) {
      refresh();
    }
  }, [userId, refresh]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && userId) {
      refreshIntervalRef.current = window.setInterval(() => {
        loadUnreadCount();
      }, refreshInterval);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [autoRefresh, userId, refreshInterval, loadUnreadCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return {
    ...state,
    loadMore,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    refresh,
    clearError,
  };
}

/**
 * Hook specifically for getting unread notification count
 * Useful for badges and indicators
 */
export function useUnreadNotificationCount(userId: string, autoRefresh = true, refreshInterval = 30000) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef<number | null>(null);

  const loadCount = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await NotificationService.getUnreadCount(userId);
      if (response.success && response.data) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.warn('Failed to load unread count:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadCount();
    }
  }, [userId, loadCount]);

  useEffect(() => {
    if (autoRefresh && userId) {
      refreshIntervalRef.current = window.setInterval(loadCount, refreshInterval);
      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [autoRefresh, userId, refreshInterval, loadCount]);

  return { unreadCount, loading, refresh: loadCount };
}