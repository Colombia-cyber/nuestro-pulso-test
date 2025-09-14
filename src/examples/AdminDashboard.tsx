import React, { useState } from 'react';
import { useAdminUsers, useAdminContent, useAdminStats } from '../hooks/useAdmin';
import { User, ContentItem } from '../types/api';
import { useAuth } from '../components/AuthContext';

/**
 * Example AdminDashboard component demonstrating useAdmin hooks
 * Shows user management, content moderation, and system statistics
 */
export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content'>('overview');
  
  // Admin hooks
  const {
    stats,
    userActivity,
    contentStats,
    systemHealth,
    loading: statsLoading,
    error: statsError,
    refreshStats,
    clearError: clearStatsError
  } = useAdminStats();

  const {
    users,
    loading: usersLoading,
    error: usersError,
    hasMore: hasMoreUsers,
    total: totalUsers,
    loadMore: loadMoreUsers,
    updateUserRole,
    suspendUser,
    deleteUser,
    clearError: clearUsersError
  } = useAdminUsers();

  const {
    content,
    loading: contentLoading,
    error: contentError,
    hasMore: hasMoreContent,
    total: totalContent,
    loadMore: loadMoreContent,
    updateContentStatus,
    deleteContent,
    clearError: clearContentError
  } = useAdminContent();

  // Check if user is admin
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  // For demo purposes, assuming we can check role from user object
  // In real implementation, you'd check user.customClaims or make API call
  const isAdmin = true; // Replace with actual admin check

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'published':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'rejected':
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage users, content, and system settings</p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'users', name: `Users (${formatNumber(totalUsers)})` },
                { id: 'content', name: `Content (${formatNumber(totalContent)})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            {statsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading statistics...</p>
              </div>
            ) : statsError ? (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <p className="text-red-700">{statsError}</p>
                  <button
                    onClick={clearStatsError}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(stats?.totalUsers || 0)}</p>
                  <p className="text-sm text-green-600 mt-1">↗ {userActivity?.registrations || 0} this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(stats?.activeUsers || 0)}</p>
                  <p className="text-sm text-blue-600 mt-1">{userActivity?.activeUsers || 0} this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Total Content</h3>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(stats?.totalContent || 0)}</p>
                  <p className="text-sm text-blue-600 mt-1">{contentStats?.totalPosts || 0} posts</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Pending Moderation</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats?.pendingModeration || 0}</p>
                  <p className="text-sm text-yellow-600 mt-1">Requires attention</p>
                </div>
              </div>
            )}

            {/* System Health */}
            {systemHealth && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.status)}`}>
                    {systemHealth.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {systemHealth.services?.map((service: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-700">{service.name}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={refreshStats}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <h4 className="font-medium text-gray-900">Refresh Statistics</h4>
                  <p className="text-sm text-gray-600 mt-1">Update dashboard data</p>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <h4 className="font-medium text-gray-900">Manage Users</h4>
                  <p className="text-sm text-gray-600 mt-1">View and edit user accounts</p>
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <h4 className="font-medium text-gray-900">Moderate Content</h4>
                  <p className="text-sm text-gray-600 mt-1">Review reported content</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
              </div>

              {usersError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400">
                  <div className="flex justify-between items-center">
                    <p className="text-red-700">{usersError}</p>
                    <button
                      onClick={clearUsersError}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {usersLoading && users.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user: User) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={user.role}
                              onChange={(e) => updateUserRole(user.id, e.target.value as User['role'])}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="user">User</option>
                              <option value="moderator">Moderator</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => suspendUser(user.id, 'Suspended by admin', 7)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Suspend
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {hasMoreUsers && (
                <div className="px-6 py-4 border-t border-gray-200 text-center">
                  <button
                    onClick={loadMoreUsers}
                    disabled={usersLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {usersLoading ? 'Loading...' : 'Load More Users'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Content Moderation</h3>
                <p className="text-gray-600 mt-1">Review and moderate user-generated content</p>
              </div>

              {contentError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400">
                  <div className="flex justify-between items-center">
                    <p className="text-red-700">{contentError}</p>
                    <button
                      onClick={clearContentError}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {contentLoading && content.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading content...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {content.map((item: ContentItem) => (
                    <div key={item.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{item.content.substring(0, 200)}...</p>
                          <div className="text-sm text-gray-500">
                            By {item.authorName} • {new Date(item.createdAt).toLocaleDateString()}
                            {item.reportCount && item.reportCount > 0 && (
                              <span className="text-red-600 ml-2">• {item.reportCount} reports</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col space-y-2">
                          <select
                            value={item.status}
                            onChange={(e) => updateContentStatus(item.id, e.target.value as ContentItem['status'])}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="draft">Draft</option>
                          </select>
                          <button
                            onClick={() => deleteContent(item.id, 'Deleted by admin')}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {hasMoreContent && (
                <div className="px-6 py-4 border-t border-gray-200 text-center">
                  <button
                    onClick={loadMoreContent}
                    disabled={contentLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {contentLoading ? 'Loading...' : 'Load More Content'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}