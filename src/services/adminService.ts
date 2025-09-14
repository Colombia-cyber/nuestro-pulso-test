import { 
  User, 
  AdminStats, 
  ContentItem, 
  ApiResponse, 
  PaginatedResponse 
} from '../types/api';
import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from './apiClient';

/**
 * Admin API Service
 * Handles all admin-related API calls
 */
export class AdminService {
  private static baseUrl = '/admin';

  // User Management
  /**
   * Get all users with pagination and filtering
   */
  static async getUsers(
    page = 1,
    limit = 50,
    filters?: {
      role?: User['role'];
      search?: string;
      active?: boolean;
    }
  ): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.role && { role: filters.role }),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.active !== undefined && { active: filters.active.toString() })
    });
    
    return apiGet<PaginatedResponse<User>>(
      `${this.baseUrl}/users?${params.toString()}`
    );
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<ApiResponse<User>> {
    return apiGet<ApiResponse<User>>(`${this.baseUrl}/users/${userId}`);
  }

  /**
   * Update user information
   */
  static async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<ApiResponse<User>> {
    return apiPut<ApiResponse<User>>(`${this.baseUrl}/users/${userId}`, updates);
  }

  /**
   * Update user role
   */
  static async updateUserRole(
    userId: string,
    role: User['role']
  ): Promise<ApiResponse<User>> {
    return apiPatch<ApiResponse<User>>(
      `${this.baseUrl}/users/${userId}/role`,
      { role }
    );
  }

  /**
   * Suspend user account
   */
  static async suspendUser(
    userId: string,
    reason: string,
    duration?: number
  ): Promise<ApiResponse<void>> {
    return apiPost<ApiResponse<void>>(
      `${this.baseUrl}/users/${userId}/suspend`,
      { reason, duration }
    );
  }

  /**
   * Unsuspend user account
   */
  static async unsuspendUser(userId: string): Promise<ApiResponse<void>> {
    return apiPost<ApiResponse<void>>(
      `${this.baseUrl}/users/${userId}/unsuspend`,
      {}
    );
  }

  /**
   * Delete user account
   */
  static async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return apiDelete<ApiResponse<void>>(`${this.baseUrl}/users/${userId}`);
  }

  // Content Management
  /**
   * Get all content with pagination and filtering
   */
  static async getContent(
    page = 1,
    limit = 50,
    filters?: {
      type?: ContentItem['type'];
      status?: ContentItem['status'];
      authorId?: string;
      reported?: boolean;
    }
  ): Promise<PaginatedResponse<ContentItem>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.authorId && { authorId: filters.authorId }),
      ...(filters?.reported !== undefined && { reported: filters.reported.toString() })
    });
    
    return apiGet<PaginatedResponse<ContentItem>>(
      `${this.baseUrl}/content?${params.toString()}`
    );
  }

  /**
   * Get content by ID
   */
  static async getContentById(contentId: string): Promise<ApiResponse<ContentItem>> {
    return apiGet<ApiResponse<ContentItem>>(`${this.baseUrl}/content/${contentId}`);
  }

  /**
   * Update content status
   */
  static async updateContentStatus(
    contentId: string,
    status: ContentItem['status'],
    reason?: string
  ): Promise<ApiResponse<ContentItem>> {
    return apiPatch<ApiResponse<ContentItem>>(
      `${this.baseUrl}/content/${contentId}/status`,
      { status, reason }
    );
  }

  /**
   * Delete content
   */
  static async deleteContent(
    contentId: string,
    reason?: string
  ): Promise<ApiResponse<void>> {
    return apiDelete<ApiResponse<void>>(
      `${this.baseUrl}/content/${contentId}?${reason ? `reason=${encodeURIComponent(reason)}` : ''}`
    );
  }

  /**
   * Get reported content
   */
  static async getReportedContent(
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<ContentItem>> {
    return apiGet<PaginatedResponse<ContentItem>>(
      `${this.baseUrl}/content/reported?page=${page}&limit=${limit}`
    );
  }

  // Statistics and Analytics
  /**
   * Get admin dashboard statistics
   */
  static async getStats(): Promise<ApiResponse<AdminStats>> {
    return apiGet<ApiResponse<AdminStats>>(`${this.baseUrl}/stats`);
  }

  /**
   * Get user activity statistics
   */
  static async getUserActivityStats(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<ApiResponse<{
    registrations: number;
    activeUsers: number;
    totalSessions: number;
  }>> {
    return apiGet<ApiResponse<{
      registrations: number;
      activeUsers: number;
      totalSessions: number;
    }>>(`${this.baseUrl}/stats/user-activity?timeframe=${timeframe}`);
  }

  /**
   * Get content statistics
   */
  static async getContentStats(
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<ApiResponse<{
    totalPosts: number;
    totalPolls: number;
    totalComments: number;
    moderationQueue: number;
  }>> {
    return apiGet<ApiResponse<{
      totalPosts: number;
      totalPolls: number;
      totalComments: number;
      moderationQueue: number;
    }>>(`${this.baseUrl}/stats/content?timeframe=${timeframe}`);
  }

  // System Management
  /**
   * Get system health status
   */
  static async getSystemHealth(): Promise<ApiResponse<{
    status: 'healthy' | 'warning' | 'critical';
    services: Array<{
      name: string;
      status: 'up' | 'down' | 'degraded';
      responseTime?: number;
    }>;
    lastCheck: string;
  }>> {
    return apiGet<ApiResponse<{
      status: 'healthy' | 'warning' | 'critical';
      services: Array<{
        name: string;
        status: 'up' | 'down' | 'degraded';
        responseTime?: number;
      }>;
      lastCheck: string;
    }>>(`${this.baseUrl}/system/health`);
  }

  /**
   * Send system-wide notification
   */
  static async sendSystemNotification(
    title: string,
    message: string,
    type: 'info' | 'warning' | 'alert' = 'info',
    targetUsers?: string[]
  ): Promise<ApiResponse<void>> {
    return apiPost<ApiResponse<void>>(
      `${this.baseUrl}/notifications/system`,
      { title, message, type, targetUsers }
    );
  }

  /**
   * Export data for compliance/backup
   */
  static async exportData(
    type: 'users' | 'content' | 'all',
    format: 'json' | 'csv' = 'json'
  ): Promise<ApiResponse<{ downloadUrl: string; expiresAt: string }>> {
    return apiPost<ApiResponse<{ downloadUrl: string; expiresAt: string }>>(
      `${this.baseUrl}/export`,
      { type, format }
    );
  }
}