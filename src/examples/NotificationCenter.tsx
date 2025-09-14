import React, { useState } from 'react';
import { useNotifications, useUnreadNotificationCount } from '../hooks/useNotifications';
import { useAuth } from '../components/AuthContext';

/**
 * Example NotificationCenter component demonstrating useNotifications hook
 * Shows how to display notifications, manage read states, and handle actions
 */
export default function NotificationCenter() {
  const { user } = useAuth();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const {
    notifications,
    unreadCount,
    loading,
    error,
    hasMore,
    loadMore,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    refresh,
    clearError
  } = useNotifications(user?.uid || '', {
    limit: 10,
    unreadOnly: showUnreadOnly,
    autoRefresh: true,
    refreshInterval: 30000
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return '⚙️';
      case 'message':
        return '💬';
      case 'alert':
        return '⚠️';
      case 'reminder':
        return '🔔';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100 text-blue-800';
      case 'message':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition disabled:opacity-50"
                >
                  Refresh
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                  >
                    Mark All Read
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="mt-4 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Show unread only</span>
              </label>
              
              <button
                onClick={deleteAllRead}
                className="text-sm text-red-600 hover:text-red-800 transition"
              >
                Delete all read
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
                <button
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && notifications.length === 0 && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && notifications.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {showUnreadOnly 
                  ? "You don't have any unread notifications."
                  : "You're all caught up! No notifications to show."
                }
              </p>
            </div>
          )}

          {/* Notifications List */}
          {notifications.length > 0 && (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-400' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {!notification.read && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(notification.createdAt)}
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {notification.read ? 'Mark unread' : 'Mark read'}
                            </button>
                            <span className="text-gray-300">•</span>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${
                        !notification.read ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      {notification.actionUrl && (
                        <div className="mt-3">
                          <a
                            href={notification.actionUrl}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View details →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && notifications.length > 0 && (
            <div className="p-6 border-t border-gray-200 text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple notification badge component for use in navigation
 */
export function NotificationBadge() {
  const { user } = useAuth();
  const { unreadCount, loading } = useUnreadNotificationCount(user?.uid || '');

  if (!user || loading || unreadCount === 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}