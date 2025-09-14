import { useState, useEffect, useCallback } from 'react';
import { UserSettings, ApiResponse } from '../types/api';
import { SettingsService } from '../services/settingsService';
import { ApiException } from '../types/api';

interface UseSettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  isDirty: boolean;
}

interface UseSettingsActions {
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  updateNotifications: (notifications: UserSettings['notifications']) => Promise<void>;
  updatePrivacy: (privacy: UserSettings['privacy']) => Promise<void>;
  updatePreferences: (preferences: UserSettings['preferences']) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportSettings: () => Promise<UserSettings | null>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing user settings
 * Provides CRUD operations for user settings with loading states and error handling
 */
export function useSettings(userId: string): UseSettingsState & UseSettingsActions {
  const [state, setState] = useState<UseSettingsState>({
    settings: null,
    loading: true,
    error: null,
    isDirty: false,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setSettings = useCallback((settings: UserSettings | null, isDirty = false) => {
    setState(prev => ({ ...prev, settings, isDirty }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Load user settings
  const loadSettings = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.getUserSettings(userId);
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to load settings');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while loading settings');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, setSettings]);

  // Update complete settings
  const updateSettings = useCallback(async (updates: Partial<UserSettings>) => {
    if (!userId || !state.settings) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.updateUserSettings(
        userId,
        updates
      );
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to update settings');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating settings');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, state.settings, setLoading, setError, setSettings]);

  // Update notification settings only
  const updateNotifications = useCallback(async (notifications: UserSettings['notifications']) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.updateNotificationSettings(
        userId,
        notifications
      );
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to update notification settings');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, setSettings]);

  // Update privacy settings only
  const updatePrivacy = useCallback(async (privacy: UserSettings['privacy']) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.updatePrivacySettings(
        userId,
        privacy
      );
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to update privacy settings');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating privacy settings');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, setSettings]);

  // Update preferences only
  const updatePreferences = useCallback(async (preferences: UserSettings['preferences']) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.updatePreferences(
        userId,
        preferences
      );
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to update preferences');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while updating preferences');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, setSettings]);

  // Reset to default settings
  const resetToDefaults = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.resetToDefaults(userId);
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to reset settings');
      }
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while resetting settings');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, setLoading, setError, setSettings]);

  // Export settings
  const exportSettings = useCallback(async (): Promise<UserSettings | null> => {
    if (!userId) return null;

    try {
      const response: ApiResponse<UserSettings> = await SettingsService.exportSettings(userId);
      return response.success && response.data ? response.data : null;
    } catch (error) {
      if (error instanceof ApiException) {
        setError(error.message);
      } else {
        setError('Failed to export settings');
      }
      return null;
    }
  }, [userId, setError]);

  // Refresh settings
  const refresh = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  // Load settings on mount or userId change
  useEffect(() => {
    if (userId) {
      loadSettings();
    }
  }, [userId, loadSettings]);

  return {
    ...state,
    updateSettings,
    updateNotifications,
    updatePrivacy,
    updatePreferences,
    resetToDefaults,
    exportSettings,
    refresh,
    clearError,
  };
}