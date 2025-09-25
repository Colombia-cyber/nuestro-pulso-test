import React, { useState, useEffect, useCallback } from 'react';
import {
  FaPlay, FaPause, FaUsers, FaEye, FaHeart, FaComment, FaShare,
  FaServer, FaDatabase, FaClock, FaExclamationTriangle, FaCheckCircle,
  FaTimesCircle, FaChartLine, FaGlobe, FaLanguage, FaRobot, FaShieldAlt,
  FaDownload, FaFilter, FaSearch, FaRedo, FaBell, FaCog
} from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown, MdLiveTv, MdVerified } from 'react-icons/md';
import { BiServer, BiNetworkChart } from 'react-icons/bi';
import { AdminDashboardData, WorldClassVideo } from '../types/worldClassVideo';
import { worldClassVideoService } from '../services/worldClassVideoService';
import { aiVideoSearchService } from '../services/aiVideoSearch';

interface Props {
  language?: 'es' | 'en' | 'pt';
  refreshInterval?: number;
}

const AdminVideosDashboard: React.FC<Props> = ({
  language = 'es',
  refreshInterval = 30000 // 30 seconds
}) => {
  // State management
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sources' | 'analytics' | 'content' | 'users' | 'performance'>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<Array<{ id: string; type: 'success' | 'warning' | 'error'; message: string; timestamp: Date }>>([]);

  // Translations
  const t = getTranslations(language);

  // Effects
  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadDashboardData();
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // Data loading
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await worldClassVideoService.getAdminDashboard();
      setDashboardData(data);
      setLastUpdated(new Date());
      
      // Check for alerts
      checkForAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkForAlerts = useCallback((data: AdminDashboardData) => {
    const newNotifications: typeof notifications = [];

    // Check source health
    Object.entries(data.sourceHealth).forEach(([platform, health]) => {
      if (health.status === 'offline') {
        newNotifications.push({
          id: `source-${platform}-offline`,
          type: 'error',
          message: `${platform} source is offline`,
          timestamp: new Date()
        });
      } else if (health.status === 'degraded') {
        newNotifications.push({
          id: `source-${platform}-degraded`,
          type: 'warning',
          message: `${platform} source is experiencing issues`,
          timestamp: new Date()
        });
      }
    });

    // Check cache performance
    if (data.cacheStats.hitRate < 70) {
      newNotifications.push({
        id: 'cache-low-hit-rate',
        type: 'warning',
        message: `Cache hit rate is low: ${data.cacheStats.hitRate.toFixed(1)}%`,
        timestamp: new Date()
      });
    }

    // Check error rate
    if (data.performance.errorRate > 0.05) {
      newNotifications.push({
        id: 'high-error-rate',
        type: 'error',
        message: `High error rate: ${(data.performance.errorRate * 100).toFixed(1)}%`,
        timestamp: new Date()
      });
    }

    setNotifications(prev => [...prev.slice(-5), ...newNotifications].slice(-10));
  }, []);

  // Render components
  const renderHeader = () => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time range selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1h">{t.lastHour}</option>
            <option value="24h">{t.last24Hours}</option>
            <option value="7d">{t.last7Days}</option>
            <option value="30d">{t.last30Days}</option>
          </select>

          {/* Auto-refresh toggle */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{t.autoRefresh}</span>
          </label>

          {/* Manual refresh */}
          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <FaRedo className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t.refresh}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mt-4 space-y-2">
          {notifications.slice(-3).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg flex items-center ${
                notification.type === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' :
                notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
              }`}
            >
              <FaBell className="mr-2" />
              {notification.message}
              <span className="ml-auto text-xs opacity-75">
                {notification.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
      {[
        { id: 'overview', label: t.overview, icon: FaChartLine },
        { id: 'sources', label: t.sources, icon: FaServer },
        { id: 'analytics', label: t.analytics, icon: MdTrendingUp },
        { id: 'content', label: t.content, icon: FaPlay },
        { id: 'users', label: t.users, icon: FaUsers },
        { id: 'performance', label: t.performance, icon: BiNetworkChart }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setSelectedTab(id as any)}
          className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${
            selectedTab === id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Icon className="mr-2" />
          {label}
        </button>
      ))}
    </div>
  );

  const renderOverviewTab = () => {
    if (!dashboardData) return null;

    return (
      <div className="space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={t.totalUsers}
            value={dashboardData.userEngagement.totalUsers.toLocaleString()}
            change={+5.2}
            icon={FaUsers}
            color="blue"
          />
          <MetricCard
            title={t.activeUsers}
            value={dashboardData.userEngagement.activeUsers.toLocaleString()}
            change={+12.5}
            icon={FaEye}
            color="green"
          />
          <MetricCard
            title={t.cacheHitRate}
            value={`${dashboardData.cacheStats.hitRate.toFixed(1)}%`}
            change={-2.1}
            icon={FaDatabase}
            color="purple"
          />
          <MetricCard
            title={t.avgResponseTime}
            value={`${dashboardData.performance.avgLoadTime.toFixed(1)}s`}
            change={-0.3}
            icon={FaClock}
            color="orange"
          />
        </div>

        {/* Source health overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.sourceHealth}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(dashboardData.sourceHealth).map(([platform, health]) => (
              <div
                key={platform}
                className={`p-4 rounded-lg border-2 ${
                  health.status === 'online' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' :
                  health.status === 'degraded' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-red-200 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white capitalize">{platform}</h4>
                  {health.status === 'online' ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : health.status === 'degraded' ? (
                    <FaExclamationTriangle className="text-yellow-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div>{t.uptime}: {health.uptime.toFixed(1)}%</div>
                  <div>{t.responseTime}: {health.avgResponseTime}ms</div>
                  <div>{t.errors}: {health.errorCount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top trending content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.trendingContent}</h3>
          <div className="space-y-4">
            {dashboardData.trending.topics.slice(0, 5).map((topic, index) => (
              <div key={topic.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">#{index + 1}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{topic.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{topic.count} {t.interactions}</p>
                  </div>
                </div>
                <div className={`flex items-center ${topic.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {topic.growth > 0 ? <MdTrendingUp /> : <MdTrendingDown />}
                  <span className="ml-1">{Math.abs(topic.growth * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSourcesTab = () => {
    if (!dashboardData) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.sourceHealthDetails}</h3>
          
          <div className="space-y-6">
            {Object.entries(dashboardData.sourceHealth).map(([platform, health]) => (
              <div key={platform} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${
                      health.status === 'online' ? 'bg-green-500' :
                      health.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{platform}</h4>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold ${
                      health.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      health.status === 'degraded' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {health.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t.lastCheck}: {health.lastCheck.toLocaleTimeString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{health.uptime.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t.uptime}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{health.avgResponseTime}ms</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t.avgResponseTime}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{health.errorCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t.errors}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {health.status === 'online' ? '✅' : health.status === 'degraded' ? '⚠️' : '❌'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    if (!dashboardData) return null;

    const searchAnalytics = aiVideoSearchService.getSearchAnalytics();

    return (
      <div className="space-y-6">
        {/* User engagement metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title={t.engagementRate}
            value={`${(dashboardData.userEngagement.engagementRate * 100).toFixed(1)}%`}
            change={+3.2}
            icon={FaHeart}
            color="red"
          />
          <MetricCard
            title={t.avgSessionDuration}
            value={`${Math.floor(dashboardData.userEngagement.avgSessionDuration / 60)}m ${dashboardData.userEngagement.avgSessionDuration % 60}s`}
            change={+15.7}
            icon={FaClock}
            color="blue"
          />
          <MetricCard
            title={t.totalSearches}
            value={searchAnalytics.totalSearches.toLocaleString()}
            change={+8.9}
            icon={FaSearch}
            color="green"
          />
        </div>

        {/* Top search queries */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.topSearches}</h3>
          <div className="space-y-3">
            {searchAnalytics.topQueries.slice(0, 10).map((query, index) => (
              <div key={query.query} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-400 mr-3">#{index + 1}</span>
                  <span className="text-gray-900 dark:text-white">{query.query}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{query.count} {t.searches}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top interactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.topInteractions}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardData.userEngagement.topInteractions.map((interaction) => (
              <div key={interaction.type} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">
                  {interaction.type === 'view' && <FaEye />}
                  {interaction.type === 'like' && <FaHeart />}
                  {interaction.type === 'comment' && <FaComment />}
                  {interaction.type === 'share' && <FaShare />}
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{interaction.count.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{interaction.type}s</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceTab = () => {
    if (!dashboardData) return null;

    return (
      <div className="space-y-6">
        {/* Performance metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={t.avgLoadTime}
            value={`${dashboardData.performance.avgLoadTime.toFixed(2)}s`}
            change={-5.3}
            icon={FaClock}
            color="blue"
          />
          <MetricCard
            title={t.errorRate}
            value={`${(dashboardData.performance.errorRate * 100).toFixed(2)}%`}
            change={-12.7}
            icon={FaExclamationTriangle}
            color="red"
          />
          <MetricCard
            title={t.apiLatency}
            value={`${dashboardData.performance.apiLatency}ms`}
            change={-8.1}
            icon={BiServer}
            color="green"
          />
          <MetricCard
            title={t.bandwidthUsage}
            value={`${dashboardData.performance.bandwidthUsage.toFixed(1)} GB`}
            change={+22.4}
            icon={BiNetworkChart}
            color="purple"
          />
        </div>

        {/* Cache performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.cachePerformance}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {dashboardData.cacheStats.hitRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.hitRate}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {dashboardData.cacheStats.totalRequests.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.totalRequests}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {dashboardData.cacheStats.memoryUsage} MB
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.memoryUsage}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {dashboardData.cacheStats.avgResponseTime}ms
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.avgResponseTime}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentTab = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverviewTab();
      case 'sources':
        return renderSourcesTab();
      case 'analytics':
        return renderAnalyticsTab();
      case 'performance':
        return renderPerformanceTab();
      default:
        return renderOverviewTab();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.errorTitle}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderHeader()}
        {renderTabs()}
        {isLoading && !dashboardData ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t.loading}</p>
          </div>
        ) : (
          renderCurrentTab()
        )}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange';
}> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="text-xl" />
        </div>
        <div className={`flex items-center text-sm font-semibold ${
          change > 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {change > 0 ? <MdTrendingUp className="mr-1" /> : <MdTrendingDown className="mr-1" />}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
};

// Translations
const getTranslations = (language: string) => {
  const translations: { [key: string]: { [key: string]: string } } = {
    es: {
      title: '📊 Panel de Administración - Videos',
      lastUpdated: 'Última actualización',
      lastHour: 'Última hora',
      last24Hours: 'Últimas 24 horas',
      last7Days: 'Últimos 7 días',
      last30Days: 'Últimos 30 días',
      autoRefresh: 'Actualización automática',
      refresh: 'Actualizar',
      overview: 'Resumen',
      sources: 'Fuentes',
      analytics: 'Analíticas',
      content: 'Contenido',
      users: 'Usuarios',
      performance: 'Rendimiento',
      totalUsers: 'Usuarios Totales',
      activeUsers: 'Usuarios Activos',
      cacheHitRate: 'Tasa de Acierto Cache',
      avgResponseTime: 'Tiempo Respuesta Promedio',
      sourceHealth: 'Estado de Fuentes',
      uptime: 'Tiempo Activo',
      responseTime: 'Tiempo Respuesta',
      errors: 'Errores',
      status: 'Estado',
      trendingContent: 'Contenido Trending',
      interactions: 'interacciones',
      sourceHealthDetails: 'Detalles del Estado de Fuentes',
      lastCheck: 'Última verificación',
      engagementRate: 'Tasa de Interacción',
      avgSessionDuration: 'Duración Promedio Sesión',
      totalSearches: 'Búsquedas Totales',
      topSearches: 'Búsquedas Principales',
      searches: 'búsquedas',
      topInteractions: 'Principales Interacciones',
      avgLoadTime: 'Tiempo Carga Promedio',
      errorRate: 'Tasa de Error',
      apiLatency: 'Latencia API',
      bandwidthUsage: 'Uso de Ancho de Banda',
      cachePerformance: 'Rendimiento de Cache',
      hitRate: 'Tasa de Acierto',
      totalRequests: 'Solicitudes Totales',
      memoryUsage: 'Uso de Memoria',
      loading: 'Cargando panel...',
      errorTitle: 'Error al cargar panel',
      retry: 'Reintentar'
    },
    en: {
      title: '📊 Admin Dashboard - Videos',
      lastUpdated: 'Last updated',
      lastHour: 'Last hour',
      last24Hours: 'Last 24 hours',
      last7Days: 'Last 7 days',
      last30Days: 'Last 30 days',
      autoRefresh: 'Auto refresh',
      refresh: 'Refresh',
      overview: 'Overview',
      sources: 'Sources',
      analytics: 'Analytics',
      content: 'Content',
      users: 'Users',
      performance: 'Performance',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      cacheHitRate: 'Cache Hit Rate',
      avgResponseTime: 'Avg Response Time',
      sourceHealth: 'Source Health',
      uptime: 'Uptime',
      responseTime: 'Response Time',
      errors: 'Errors',
      status: 'Status',
      trendingContent: 'Trending Content',
      interactions: 'interactions',
      sourceHealthDetails: 'Source Health Details',
      lastCheck: 'Last check',
      engagementRate: 'Engagement Rate',
      avgSessionDuration: 'Avg Session Duration',
      totalSearches: 'Total Searches',
      topSearches: 'Top Searches',
      searches: 'searches',
      topInteractions: 'Top Interactions',
      avgLoadTime: 'Avg Load Time',
      errorRate: 'Error Rate',
      apiLatency: 'API Latency',
      bandwidthUsage: 'Bandwidth Usage',
      cachePerformance: 'Cache Performance',
      hitRate: 'Hit Rate',
      totalRequests: 'Total Requests',
      memoryUsage: 'Memory Usage',
      loading: 'Loading dashboard...',
      errorTitle: 'Error loading dashboard',
      retry: 'Retry'
    }
  };

  return translations[language] || translations['es'];
};

export default AdminVideosDashboard;