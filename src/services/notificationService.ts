import { UserNotification, ApiResponse, PaginatedResponse } from '../types/api';
import { apiGet, apiPatch, apiPost, apiDelete, apiGetPaginated } from './apiClient';

/**
 * Notifications API Service
 * Handles all notification-related API calls
 */
export class NotificationService {
  private static baseUrl = '/notifications';

  /**
   * Get user notifications with pagination
   */
  static async getUserNotifications(
    userId: string,
    page = 1,
    limit = 20,
    unreadOnly = false
  ): Promise<PaginatedResponse<UserNotification>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(unreadOnly && { unread: 'true' })
    });
    
    return apiGet<PaginatedResponse<UserNotification>>(
      `${this.baseUrl}/${userId}?${params.toString()}`
    );
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(userId: string): Promise<ApiResponse<{ count: number }>> {
    return apiGet<ApiResponse<{ count: number }>>(`${this.baseUrl}/${userId}/unread-count`);
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(
    userId: string,
    notificationId: string
  ): Promise<ApiResponse<UserNotification>> {
    return apiPatch<ApiResponse<UserNotification>>(
      `${this.baseUrl}/${userId}/${notificationId}/read`,
      { read: true }
    );
  }

  /**
   * Mark notification as unread
   */
  static async markAsUnread(
    userId: string,
    notificationId: string
  ): Promise<ApiResponse<UserNotification>> {
    return apiPatch<ApiResponse<UserNotification>>(
      `${this.baseUrl}/${userId}/${notificationId}/read`,
      { read: false }
    );
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(userId: string): Promise<ApiResponse<{ updated: number }>> {
    return apiPatch<ApiResponse<{ updated: number }>>(
      `${this.baseUrl}/${userId}/mark-all-read`,
      {}
    );
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(
    userId: string,
    notificationId: string
  ): Promise<ApiResponse<void>> {
    return apiDelete<ApiResponse<void>>(
      `${this.baseUrl}/${userId}/${notificationId}`
    );
  }

  /**
   * Delete all read notifications
   */
  static async deleteAllRead(userId: string): Promise<ApiResponse<{ deleted: number }>> {
    return apiDelete<ApiResponse<{ deleted: number }>>(
      `${this.baseUrl}/${userId}/read`
    );
  }

  /**
   * Create a new notification (typically for admin use)
   */
  static async createNotification(
    notification: Omit<UserNotification, 'id' | 'createdAt'>
  ): Promise<ApiResponse<UserNotification>> {
    return apiPost<ApiResponse<UserNotification>>(this.baseUrl, notification);
  }

  /**
   * Get notification by ID
   */
  static async getNotificationById(
    userId: string,
    notificationId: string
  ): Promise<ApiResponse<UserNotification>> {
    return apiGet<ApiResponse<UserNotification>>(
      `${this.baseUrl}/${userId}/${notificationId}`
    );
  }

  /**
   * Subscribe to push notifications
   */
  static async subscribeToPush(
    userId: string,
    subscription: PushSubscription
  ): Promise<ApiResponse<void>> {
    return apiPost<ApiResponse<void>>(
      `${this.baseUrl}/${userId}/push-subscription`,
      { subscription }
    );
  }

  /**
   * Unsubscribe from push notifications
   */
  static async unsubscribeFromPush(userId: string): Promise<ApiResponse<void>> {
    return apiDelete<ApiResponse<void>>(
      `${this.baseUrl}/${userId}/push-subscription`
    );
  }

  /**
   * Get notifications by type
   */
  static async getNotificationsByType(
    userId: string,
    type: UserNotification['type'],
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<UserNotification>> {
    const params = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString()
    });
    
    return apiGet<PaginatedResponse<UserNotification>>(
      `${this.baseUrl}/${userId}/by-type?${params.toString()}`
    );
  }
}