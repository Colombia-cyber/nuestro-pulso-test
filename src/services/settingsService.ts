import { UserSettings, ApiResponse } from '../types/api';
import { apiGet, apiPut, apiPatch } from './apiClient';

/**
 * Settings API Service
 * Handles all settings-related API calls
 */
export class SettingsService {
  private static baseUrl = '/settings';

  /**
   * Get user settings by user ID
   */
  static async getUserSettings(userId: string): Promise<ApiResponse<UserSettings>> {
    return apiGet<ApiResponse<UserSettings>>(`${this.baseUrl}/${userId}`);
  }

  /**
   * Update complete user settings
   */
  static async updateUserSettings(
    userId: string,
    settings: Partial<UserSettings>
  ): Promise<ApiResponse<UserSettings>> {
    return apiPut<ApiResponse<UserSettings>>(`${this.baseUrl}/${userId}`, settings);
  }

  /**
   * Update notification settings only
   */
  static async updateNotificationSettings(
    userId: string,
    notifications: UserSettings['notifications']
  ): Promise<ApiResponse<UserSettings>> {
    return apiPatch<ApiResponse<UserSettings>>(
      `${this.baseUrl}/${userId}/notifications`,
      { notifications }
    );
  }

  /**
   * Update privacy settings only
   */
  static async updatePrivacySettings(
    userId: string,
    privacy: UserSettings['privacy']
  ): Promise<ApiResponse<UserSettings>> {
    return apiPatch<ApiResponse<UserSettings>>(
      `${this.baseUrl}/${userId}/privacy`,
      { privacy }
    );
  }

  /**
   * Update preferences only
   */
  static async updatePreferences(
    userId: string,
    preferences: UserSettings['preferences']
  ): Promise<ApiResponse<UserSettings>> {
    return apiPatch<ApiResponse<UserSettings>>(
      `${this.baseUrl}/${userId}/preferences`,
      { preferences }
    );
  }

  /**
   * Reset settings to default
   */
  static async resetToDefaults(userId: string): Promise<ApiResponse<UserSettings>> {
    return apiPatch<ApiResponse<UserSettings>>(
      `${this.baseUrl}/${userId}/reset`,
      {}
    );
  }

  /**
   * Export user settings
   */
  static async exportSettings(userId: string): Promise<ApiResponse<UserSettings>> {
    return apiGet<ApiResponse<UserSettings>>(`${this.baseUrl}/${userId}/export`);
  }
}