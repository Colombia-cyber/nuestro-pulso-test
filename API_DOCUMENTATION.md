# API Hooks Documentation

This documentation covers the implementation of TypeScript React hooks for connecting to real APIs for settings, notifications, and admin tools in the Nuestro Pulso application.

## Overview

The API integration includes:

- **TypeScript React Hooks** for data fetching and state management
- **REST API Services** using fetch for backend communication
- **Professional Error Handling** with retry mechanisms
- **Real-time Updates** with auto-refresh capabilities
- **Example Components** showing practical usage

## Architecture

```
src/
├── types/
│   └── api.ts              # TypeScript interfaces and types
├── services/
│   ├── apiClient.ts        # Base API client with fetch wrapper
│   ├── settingsService.ts  # Settings API endpoints
│   ├── notificationService.ts # Notifications API endpoints
│   └── adminService.ts     # Admin API endpoints
├── hooks/
│   ├── useSettings.ts      # Settings management hook
│   ├── useNotifications.ts # Notifications management hook
│   └── useAdmin.ts         # Admin operations hooks
├── examples/
│   ├── SettingsPage.tsx    # Example settings page
│   ├── NotificationCenter.tsx # Example notification center
│   └── AdminDashboard.tsx  # Example admin dashboard
└── api.ts                  # Main export file
```

## API Configuration

### Environment Variables

Set your API base URL in `.env`:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Expected API Endpoints

The implementation expects these REST endpoints:

#### Settings API
- `GET /api/settings/:userId` - Get user settings
- `PUT /api/settings/:userId` - Update complete settings
- `PATCH /api/settings/:userId/notifications` - Update notification settings
- `PATCH /api/settings/:userId/privacy` - Update privacy settings
- `PATCH /api/settings/:userId/preferences` - Update preferences
- `PATCH /api/settings/:userId/reset` - Reset to defaults

#### Notifications API
- `GET /api/notifications/:userId?page=1&limit=20&unread=true` - Get notifications
- `GET /api/notifications/:userId/unread-count` - Get unread count
- `PATCH /api/notifications/:userId/:notificationId/read` - Mark as read/unread
- `PATCH /api/notifications/:userId/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:userId/:notificationId` - Delete notification
- `DELETE /api/notifications/:userId/read` - Delete all read

#### Admin API
- `GET /api/admin/users?page=1&limit=50` - Get users list
- `PUT /api/admin/users/:userId` - Update user
- `PATCH /api/admin/users/:userId/role` - Update user role
- `POST /api/admin/users/:userId/suspend` - Suspend user
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/content?page=1&limit=50` - Get content list
- `PATCH /api/admin/content/:contentId/status` - Update content status
- `DELETE /api/admin/content/:contentId` - Delete content
- `GET /api/admin/stats` - Get dashboard statistics

## Usage Examples

### 1. Settings Management

```typescript
import React from 'react';
import { useSettings } from './hooks/useSettings';
import { useAuth } from './components/AuthContext';

function SettingsPage() {
  const { user } = useAuth();
  const {
    settings,
    loading,
    error,
    updateNotifications,
    updatePrivacy,
    updatePreferences,
    resetToDefaults
  } = useSettings(user?.uid || '');

  if (loading) return <div>Loading settings...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!settings) return <div>No settings found</div>;

  const handleNotificationToggle = async (key: string, value: boolean) => {
    await updateNotifications({
      ...settings.notifications,
      [key]: value
    });
  };

  return (
    <div>
      <h1>Settings</h1>
      
      {/* Email Notifications */}
      <label>
        <input
          type="checkbox"
          checked={settings.notifications.email}
          onChange={(e) => handleNotificationToggle('email', e.target.checked)}
        />
        Email Notifications
      </label>
      
      {/* Theme Selection */}
      <select
        value={settings.preferences.theme}
        onChange={(e) => updatePreferences({
          ...settings.preferences,
          theme: e.target.value as 'light' | 'dark' | 'auto'
        })}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
      
      <button onClick={resetToDefaults}>
        Reset to Defaults
      </button>
    </div>
  );
}
```

### 2. Notifications Management

```typescript
import React from 'react';
import { useNotifications, useUnreadNotificationCount } from './hooks/useNotifications';
import { useAuth } from './components/AuthContext';

function NotificationCenter() {
  const { user } = useAuth();
  const {
    notifications,
    unreadCount,
    loading,
    hasMore,
    loadMore,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications(user?.uid || '', {
    limit: 10,
    autoRefresh: true,
    refreshInterval: 30000
  });

  if (loading && notifications.length === 0) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div>
      <h1>Notifications ({unreadCount} unread)</h1>
      
      <button onClick={markAllAsRead}>
        Mark All Read
      </button>

      {notifications.map(notification => (
        <div key={notification.id} className={!notification.read ? 'unread' : ''}>
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
          <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
          
          <button onClick={() => markAsRead(notification.id)}>
            Mark Read
          </button>
          <button onClick={() => deleteNotification(notification.id)}>
            Delete
          </button>
        </div>
      ))}

      {hasMore && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}

// Notification badge for navigation
function NotificationBadge() {
  const { user } = useAuth();
  const { unreadCount } = useUnreadNotificationCount(user?.uid || '');

  if (unreadCount === 0) return null;

  return (
    <span className="badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
  );
}
```

### 3. Admin Dashboard

```typescript
import React, { useState } from 'react';
import { useAdminUsers, useAdminStats } from './hooks/useAdmin';

function AdminDashboard() {
  const [userFilters, setUserFilters] = useState({ role: undefined, search: '' });
  
  const {
    stats,
    loading: statsLoading,
    refreshStats
  } = useAdminStats();

  const {
    users,
    loading: usersLoading,
    hasMore,
    loadMore,
    updateUserRole,
    suspendUser,
    deleteUser
  } = useAdminUsers(userFilters);

  if (statsLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Statistics */}
      <div className="stats">
        <div>Total Users: {stats?.totalUsers}</div>
        <div>Active Users: {stats?.activeUsers}</div>
        <div>Total Content: {stats?.totalContent}</div>
        <div>Pending Moderation: {stats?.pendingModeration}</div>
      </div>

      <button onClick={refreshStats}>Refresh Stats</button>

      {/* User Management */}
      <h2>Users</h2>
      <input
        placeholder="Search users..."
        value={userFilters.search}
        onChange={(e) => setUserFilters({ ...userFilters, search: e.target.value })}
      />

      {usersLoading && users.length === 0 ? (
        <div>Loading users...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as any)}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => suspendUser(user.id, 'Policy violation')}>
                    Suspend
                  </button>
                  <button onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {hasMore && (
        <button onClick={loadMore}>Load More Users</button>
      )}
    </div>
  );
}
```

## Hook Features

### Error Handling
All hooks include comprehensive error handling:

```typescript
const { data, loading, error, clearError } = useHook();

if (error) {
  return (
    <div>
      Error: {error}
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
}
```

### Loading States
Built-in loading management:

```typescript
const { loading } = useHook();

if (loading) {
  return <div>Loading...</div>;
}
```

### Real-time Updates
Auto-refresh capabilities:

```typescript
const { refresh } = useNotifications(userId, {
  autoRefresh: true,
  refreshInterval: 30000 // 30 seconds
});

// Manual refresh
<button onClick={refresh}>Refresh</button>
```

### Pagination
Built-in pagination support:

```typescript
const { hasMore, loadMore } = useAdminUsers();

{hasMore && (
  <button onClick={loadMore}>Load More</button>
)}
```

## Authentication Integration

The hooks integrate with the existing Firebase Auth context:

```typescript
import { useAuth } from './components/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  const { settings } = useSettings(user?.uid || '');
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  // Component content
}
```

## Backend Integration Examples

### Node.js/Express Example

```javascript
// Settings endpoint
app.get('/api/settings/:userId', async (req, res) => {
  try {
    const settings = await getUserSettings(req.params.userId);
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Notifications endpoint with pagination
app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 20, unread } = req.query;
    const result = await getNotifications(req.params.userId, {
      page: parseInt(page),
      limit: parseInt(limit),
      unreadOnly: unread === 'true'
    });
    
    res.json({
      success: true,
      data: result.notifications,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        hasNext: result.hasNext,
        hasPrev: result.hasPrev
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

### Firebase Functions Example

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getUserSettings = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.params.userId;
    const doc = await admin.firestore()
      .collection('userSettings')
      .doc(userId)
      .get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Settings not found'
      });
    }
    
    res.json({
      success: true,
      data: doc.data()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### Supabase Example

```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Settings endpoint
app.get('/api/settings/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', req.params.userId)
      .single();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Notifications with pagination
app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', req.params.userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    res.json({
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        hasNext: offset + limit < count,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

## Best Practices

### 1. Error Handling
- Always handle loading and error states in components
- Provide user-friendly error messages
- Implement retry mechanisms for transient failures

### 2. Performance
- Use pagination for large datasets
- Implement proper caching strategies
- Debounce API calls for search/filter functionality

### 3. Security
- Validate user permissions on the backend
- Sanitize all inputs
- Use proper authentication tokens

### 4. Testing
- Mock API calls in tests
- Test error scenarios
- Verify loading states

## Customization

The hooks and services are designed to be easily customizable:

### Custom API Base URL
```typescript
// In apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
```

### Custom Authentication
```typescript
// In apiClient.ts
function getAuthToken(): string | null {
  // Customize based on your auth system
  return localStorage.getItem('authToken');
}
```

### Custom Error Handling
```typescript
// Extend ApiException for custom error types
export class ValidationError extends ApiException {
  constructor(message: string, field: string) {
    super('VALIDATION_ERROR', message, { field });
  }
}
```

This implementation provides a solid foundation for connecting your React frontend with any REST API backend, whether it's Node.js, Firebase, Supabase, or any other platform.