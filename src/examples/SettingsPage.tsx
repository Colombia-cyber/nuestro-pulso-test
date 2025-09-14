import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../components/AuthContext';

/**
 * Example SettingsPage component demonstrating useSettings hook
 * Shows how to manage user settings with loading states, error handling,
 * and real-time updates
 */
export default function SettingsPage() {
  const { user } = useAuth();
  const {
    settings,
    loading,
    error,
    isDirty,
    updateNotifications,
    updatePrivacy,
    updatePreferences,
    resetToDefaults,
    exportSettings,
    clearError
  } = useSettings(user?.uid || '');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please log in to access your settings.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-300 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Settings</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={clearError}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No settings found. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const handleNotificationChange = async (key: keyof typeof settings.notifications, value: boolean) => {
    await updateNotifications({
      ...settings.notifications,
      [key]: value
    });
  };

  const handlePrivacyChange = async (key: keyof typeof settings.privacy, value: boolean) => {
    await updatePrivacy({
      ...settings.privacy,
      [key]: value
    });
  };

  const handlePreferenceChange = async (key: keyof typeof settings.preferences, value: string) => {
    await updatePreferences({
      ...settings.preferences,
      [key]: value
    });
  };

  const handleExportSettings = async () => {
    const exportedSettings = await exportSettings();
    if (exportedSettings) {
      const dataStr = JSON.stringify(exportedSettings, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'settings.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and privacy settings</p>
            {isDirty && (
              <div className="mt-2 text-sm text-amber-600">
                You have unsaved changes
              </div>
            )}
          </div>

          <div className="p-6 space-y-8">
            {/* Notification Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Weekly Digest</label>
                    <p className="text-sm text-gray-500">Receive a weekly summary of activity</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.digest}
                    onChange={(e) => handleNotificationChange('digest', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </section>

            {/* Privacy Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Public Profile</label>
                    <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.profileVisible}
                    onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Activity Visibility</label>
                    <p className="text-sm text-gray-500">Show your activity to other users</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.activityVisible}
                    onChange={(e) => handlePrivacyChange('activityVisible', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="America/Bogota">Bogotá (UTC-5)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Europe/Madrid">Madrid (UTC+1)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <div className="space-x-3">
                  <button
                    onClick={handleExportSettings}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  >
                    Export Settings
                  </button>
                </div>
                <button
                  onClick={resetToDefaults}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Reset to Defaults
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}