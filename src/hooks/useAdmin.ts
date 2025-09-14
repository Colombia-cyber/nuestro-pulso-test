import { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  AdminStats, 
  ContentItem, 
  PaginatedResponse,
  ApiResponse 
} from '../types/api';
import { AdminService } from '../services/adminService';
import { ApiException } from '../types/api';

// User management hook
interface UseAdminUsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  total: number;
}

interface UseAdminUsersActions {
  loadUsers: (page?: number, filters?: any) => Promise<void>;
  loadMore: () => Promise<void>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  updateUserRole: (userId: string, role: User['role']) => Promise<void>;
  suspendUser: (userId: string, reason: string, duration?: number) => Promise<void>;
  unsuspendUser: (userId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

/**
 * Hook for managing users in admin dashboard
 */
export function useAdminUsers(
  initialFilters?: {
    role?: User['role'];
    search?: string;
    active?: boolean;
  }
): UseAdminUsersState & UseAdminUsersActions {
  const [state, setState] = useState<UseAdminUsersState>({
    users: [],
    loading: true,
    error: null,
    hasMore: true,
    currentPage: 1,
    total: 0,
  });

  const [filters, setFilters] = useState(initialFilters || {});

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const loadUsers = useCallback(async (page: number = 1, newFilters?: any, append = false) => {
    setLoading(true);
    setError(null);

    const currentFilters = newFilters || filters;
    if (newFilters) {
      setFilters(newFilters);
    }

    try {
      const response: PaginatedResponse<User> = await AdminService.getUsers(
        page,
        50,
        currentFilters
      );

      if (response.success) {
        setState(prev => ({
          ...prev,
          users: append ? [...prev.users, ...response.data] : response.data,
          hasMore: response.pagination.hasNext,
          currentPage: page,
          total: response.pagination.total,
          loading: false,
        }));
      } else {
        setError(response.error || 'Failed to load users');
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while loading users');
      }
      setLoading(false);
    }
  }, [filters, setLoading, setError]);

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore) return;
    await loadUsers(state.currentPage + 1, filters, true);
  }, [state.loading, state.hasMore, state.currentPage, filters, loadUsers]);

  const updateUser = useCallback(async (userId: string, updates: Partial<User>) => {
    try {
      const response: ApiResponse<User> = await AdminService.updateUser(userId, updates);
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          users: prev.users.map(user =>
            user.id === userId ? { ...user, ...response.data } : user
          ),
        }));
      } else {
        setError(response.error || 'Failed to update user');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating user');
      }
    }
  }, [setError]);

  const updateUserRole = useCallback(async (userId: string, role: User['role']) => {
    try {
      const response: ApiResponse<User> = await AdminService.updateUserRole(userId, role);
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          users: prev.users.map(user =>
            user.id === userId ? { ...user, role } : user
          ),
        }));
      } else {
        setError(response.error || 'Failed to update user role');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating user role');
      }
    }
  }, [setError]);

  const suspendUser = useCallback(async (userId: string, reason: string, duration?: number) => {
    try {
      await AdminService.suspendUser(userId, reason, duration);
      // Refresh user data
      await loadUsers(1, filters);
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while suspending user');
      }
    }
  }, [filters, loadUsers, setError]);

  const unsuspendUser = useCallback(async (userId: string) => {
    try {
      await AdminService.unsuspendUser(userId);
      // Refresh user data
      await loadUsers(1, filters);
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while unsuspending user');
      }
    }
  }, [filters, loadUsers, setError]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      await AdminService.deleteUser(userId);
      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== userId),
        total: prev.total - 1,
      }));
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while deleting user');
      }
    }
  }, [setError]);

  const refresh = useCallback(async () => {
    await loadUsers(1, filters);
  }, [loadUsers, filters]);

  useEffect(() => {
    loadUsers(1, filters);
  }, []);

  return {
    ...state,
    loadUsers,
    loadMore,
    updateUser,
    updateUserRole,
    suspendUser,
    unsuspendUser,
    deleteUser,
    refresh,
    clearError,
  };
}

// Content management hook
interface UseAdminContentState {
  content: ContentItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  total: number;
}

interface UseAdminContentActions {
  loadContent: (page?: number, filters?: any) => Promise<void>;
  loadMore: () => Promise<void>;
  updateContentStatus: (contentId: string, status: ContentItem['status'], reason?: string) => Promise<void>;
  deleteContent: (contentId: string, reason?: string) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

/**
 * Hook for managing content in admin dashboard
 */
export function useAdminContent(
  initialFilters?: {
    type?: ContentItem['type'];
    status?: ContentItem['status'];
    authorId?: string;
    reported?: boolean;
  }
): UseAdminContentState & UseAdminContentActions {
  const [state, setState] = useState<UseAdminContentState>({
    content: [],
    loading: true,
    error: null,
    hasMore: true,
    currentPage: 1,
    total: 0,
  });

  const [filters, setFilters] = useState(initialFilters || {});

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const loadContent = useCallback(async (page: number = 1, newFilters?: any, append = false) => {
    setLoading(true);
    setError(null);

    const currentFilters = newFilters || filters;
    if (newFilters) {
      setFilters(newFilters);
    }

    try {
      const response: PaginatedResponse<ContentItem> = await AdminService.getContent(
        page,
        50,
        currentFilters
      );

      if (response.success) {
        setState(prev => ({
          ...prev,
          content: append ? [...prev.content, ...response.data] : response.data,
          hasMore: response.pagination.hasNext,
          currentPage: page,
          total: response.pagination.total,
          loading: false,
        }));
      } else {
        setError(response.error || 'Failed to load content');
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while loading content');
      }
      setLoading(false);
    }
  }, [filters, setLoading, setError]);

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore) return;
    await loadContent(state.currentPage + 1, filters, true);
  }, [state.loading, state.hasMore, state.currentPage, filters, loadContent]);

  const updateContentStatus = useCallback(async (
    contentId: string,
    status: ContentItem['status'],
    reason?: string
  ) => {
    try {
      const response: ApiResponse<ContentItem> = await AdminService.updateContentStatus(
        contentId,
        status,
        reason
      );
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          content: prev.content.map(item =>
            item.id === contentId ? { ...item, status } : item
          ),
        }));
      } else {
        setError(response.error || 'Failed to update content status');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating content');
      }
    }
  }, [setError]);

  const deleteContent = useCallback(async (contentId: string, reason?: string) => {
    try {
      await AdminService.deleteContent(contentId, reason);
      setState(prev => ({
        ...prev,
        content: prev.content.filter(item => item.id !== contentId),
        total: prev.total - 1,
      }));
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while deleting content');
      }
    }
  }, [setError]);

  const refresh = useCallback(async () => {
    await loadContent(1, filters);
  }, [loadContent, filters]);

  useEffect(() => {
    loadContent(1, filters);
  }, []);

  return {
    ...state,
    loadContent,
    loadMore,
    updateContentStatus,
    deleteContent,
    refresh,
    clearError,
  };
}

// Statistics hook
interface UseAdminStatsState {
  stats: AdminStats | null;
  userActivity: any;
  contentStats: any;
  systemHealth: any;
  loading: boolean;
  error: string | null;
}

interface UseAdminStatsActions {
  refreshStats: () => Promise<void>;
  refreshUserActivity: (timeframe?: string) => Promise<void>;
  refreshContentStats: (timeframe?: string) => Promise<void>;
  refreshSystemHealth: () => Promise<void>;
  clearError: () => void;
}

/**
 * Hook for admin dashboard statistics
 */
export function useAdminStats(): UseAdminStatsState & UseAdminStatsActions {
  const [state, setState] = useState<UseAdminStatsState>({
    stats: null,
    userActivity: null,
    contentStats: null,
    systemHealth: null,
    loading: true,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const refreshStats = useCallback(async () => {
    try {
      const response: ApiResponse<AdminStats> = await AdminService.getStats();
      if (response.success && response.data) {
        setState(prev => ({ ...prev, stats: response.data! }));
      } else {
        setError(response.error || 'Failed to load stats');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('Failed to load admin statistics');
      }
    }
  }, [setError]);

  const refreshUserActivity = useCallback(async (timeframe: string = 'month') => {
    try {
      const response = await AdminService.getUserActivityStats(timeframe as any);
      if (response.success && response.data) {
        setState(prev => ({ ...prev, userActivity: response.data }));
      }
    } catch (error) {
      console.warn('Failed to load user activity stats:', error);
    }
  }, []);

  const refreshContentStats = useCallback(async (timeframe: string = 'month') => {
    try {
      const response = await AdminService.getContentStats(timeframe as any);
      if (response.success && response.data) {
        setState(prev => ({ ...prev, contentStats: response.data }));
      }
    } catch (error) {
      console.warn('Failed to load content stats:', error);
    }
  }, []);

  const refreshSystemHealth = useCallback(async () => {
    try {
      const response = await AdminService.getSystemHealth();
      if (response.success && response.data) {
        setState(prev => ({ ...prev, systemHealth: response.data }));
      }
    } catch (error) {
      console.warn('Failed to load system health:', error);
    }
  }, []);

  const loadAllStats = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      refreshStats(),
      refreshUserActivity(),
      refreshContentStats(),
      refreshSystemHealth(),
    ]);
    setLoading(false);
  }, [refreshStats, refreshUserActivity, refreshContentStats, refreshSystemHealth, setLoading]);

  useEffect(() => {
    loadAllStats();
  }, []);

  return {
    ...state,
    refreshStats,
    refreshUserActivity,
    refreshContentStats,
    refreshSystemHealth,
    clearError,
  };
}