// API Data Models and Types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
  lastLogin?: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    digest: boolean;
  };
  privacy: {
    profileVisible: boolean;
    activityVisible: boolean;
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
  };
  updatedAt: string;
}

export interface UserNotification {
  id: string;
  userId: string;
  type: 'system' | 'message' | 'alert' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  pendingModeration: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface ContentItem {
  id: string;
  type: 'post' | 'poll' | 'news' | 'comment';
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  status: 'published' | 'draft' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
  reportCount?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export class ApiException extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiException';
  }
}