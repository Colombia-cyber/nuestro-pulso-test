// API Hooks Export
export { useSettings } from './hooks/useSettings';
export { useNotifications, useUnreadNotificationCount } from './hooks/useNotifications';
export { useAdminUsers, useAdminContent, useAdminStats } from './hooks/useAdmin';

// API Services Export
export { SettingsService } from './services/settingsService';
export { NotificationService } from './services/notificationService';
export { AdminService } from './services/adminService';
export { 
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  apiGetPaginated,
  apiRetry
} from './services/apiClient';

// Types Export
export type {
  User,
  UserSettings,
  UserNotification,
  AdminStats,
  ContentItem,
  ApiResponse,
  PaginatedResponse,
  ApiError
} from './types/api';
export { ApiException } from './types/api';

// Example Components Export
export { default as SettingsPage } from './examples/SettingsPage';
export { default as NotificationCenter, NotificationBadge } from './examples/NotificationCenter';
export { default as AdminDashboard } from './examples/AdminDashboard';