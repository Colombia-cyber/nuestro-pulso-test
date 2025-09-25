import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaEye, FaThumbsUp, FaComment, FaShare, FaPlay,
  FaUsers, FaGlobe, FaClock, FaFire, FaDownload, FaPrint,
  FaFilter, FaSort, FaSyncAlt, FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';
import { MdVerified, MdTrendingUp, MdAnalytics, MdDashboard } from 'react-icons/md';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { i18nService, Language } from '../services/i18nService';
import { useRealtimeVideoService } from '../services/realtimeVideoService';
import { useAccessibility, screenReader } from '../utils/accessibility';

interface VideoAnalytics {
  id: string;
  title: string;
  platform: string;
  category: string;
  publishedAt: Date;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    retention: number;
    engagement: number;
  };
  growth: {
    viewsGrowth: number;
    likesGrowth: number;
    commentsGrowth: number;
    sharesGrowth: number;
  };
  demographics: {
    ageGroups: { [key: string]: number };
    genders: { [key: string]: number };
    locations: { [key: string]: number };
  };
  performance: 'excellent' | 'good' | 'average' | 'poor';
  isLive: boolean;
  factChecked: boolean;
  verified: boolean;
}

interface DashboardMetrics {
  totalVideos: number;
  totalViews: number;
  totalEngagement: number;
  averageRetention: number;
  topPerformers: VideoAnalytics[];
  platformBreakdown: { [key: string]: number };
  categoryBreakdown: { [key: string]: number };
  hourlyStats: { hour: number; views: number; engagement: number }[];
  alerts: {
    type: 'warning' | 'error' | 'success';
    message: string;
    timestamp: Date;
  }[];
}

const WorldClassVideoAdminDashboard: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'views' | 'engagement' | 'growth'>('views');
  const [showRealTimeOnly, setShowRealTimeOnly] = useState(false);

  // Real-time service
  const { isConnected, metrics, updates } = useRealtimeVideoService();

  // Mock analytics data
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>({
    totalVideos: 2847,
    totalViews: 8934567,
    totalEngagement: 12.4,
    averageRetention: 68.2,
    topPerformers: [
      {
        id: '1',
        title: '🔴 LIVE: Debate Presidencial en Tiempo Real',
        platform: 'youtube',
        category: 'Política',
        publishedAt: new Date('2024-01-15T14:30:00'),
        metrics: {
          views: 125600,
          likes: 3400,
          comments: 892,
          shares: 567,
          retention: 74.5,
          engagement: 18.2
        },
        growth: {
          viewsGrowth: 23.5,
          likesGrowth: 15.2,
          commentsGrowth: 28.1,
          sharesGrowth: 12.8
        },
        demographics: {
          ageGroups: { '18-24': 15, '25-34': 35, '35-44': 28, '45-54': 15, '55+': 7 },
          genders: { 'male': 52, 'female': 46, 'other': 2 },
          locations: { 'Bogotá': 35, 'Medellín': 18, 'Cali': 12, 'Barranquilla': 8, 'Other': 27 }
        },
        performance: 'excellent',
        isLive: true,
        factChecked: true,
        verified: true
      },
      {
        id: '2',
        title: 'Tutorial: Cómo Votar en 2024 📊',
        platform: 'tiktok',
        category: 'Educación Cívica',
        publishedAt: new Date('2024-01-14T10:15:00'),
        metrics: {
          views: 156700,
          likes: 8900,
          comments: 567,
          shares: 2300,
          retention: 89.1,
          engagement: 24.7
        },
        growth: {
          viewsGrowth: 45.2,
          likesGrowth: 38.7,
          commentsGrowth: 52.3,
          sharesGrowth: 41.1
        },
        demographics: {
          ageGroups: { '18-24': 42, '25-34': 31, '35-44': 18, '45-54': 7, '55+': 2 },
          genders: { 'male': 48, 'female': 50, 'other': 2 },
          locations: { 'Bogotá': 28, 'Medellín': 22, 'Cali': 15, 'Barranquilla': 10, 'Other': 25 }
        },
        performance: 'excellent',
        isLive: false,
        factChecked: true,
        verified: true
      }
    ],
    platformBreakdown: {
      youtube: 35,
      tiktok: 28,
      instagram: 18,
      facebook: 12,
      'x-twitter': 7
    },
    categoryBreakdown: {
      'Política': 32,
      'Educación Cívica': 24,
      'Actualidad': 20,
      'Elecciones': 15,
      'Debates': 9
    },
    hourlyStats: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      views: Math.floor(Math.random() * 10000) + 5000,
      engagement: Math.random() * 20 + 5
    })),
    alerts: [
      {
        type: 'success',
        message: 'Video "Tutorial: Cómo Votar" alcanzó 150K visualizaciones',
        timestamp: new Date()
      },
      {
        type: 'warning',
        message: 'Detectada posible desinformación en video ID: 3847',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        type: 'error',
        message: 'Error de conexión con API de TikTok',
        timestamp: new Date(Date.now() - 7200000)
      }
    ]
  });

  // Initialize language
  useEffect(() => {
    setCurrentLanguage(i18nService.getCurrentLanguage());
    const unsubscribe = i18nService.onLanguageChange(setCurrentLanguage);
    return unsubscribe;
  }, []);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setDashboardMetrics(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 1000) + 100,
        totalEngagement: prev.totalEngagement + (Math.random() - 0.5) * 0.5,
        averageRetention: Math.max(0, Math.min(100, prev.averageRetention + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return i18nService.formatNumber(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(1)}%`;
  };

  const getPerformanceColor = (performance: string): string => {
    switch (performance) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'average': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? 
      <BiTrendingUp className="text-green-500" /> : 
      <BiTrendingDown className="text-red-500" />;
  };

  const exportData = () => {
    screenReader.announce('Exportando datos del dashboard', 'polite');
    // Mock export functionality
    console.log('Exporting dashboard data...');
  };

  const refreshData = () => {
    screenReader.announce('Actualizando datos del dashboard', 'polite');
    // Mock refresh functionality
    console.log('Refreshing dashboard data...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg flex items-center gap-3">
                <MdDashboard />
                {i18nService.t('video.admin.title', 'Video Admin Dashboard')}
              </h1>
              <p className="text-xl text-white/90">
                {i18nService.t('Análisis avanzado y métricas en tiempo real', 'Advanced analytics and real-time metrics')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isConnected 
                  ? 'bg-green-600/20 text-green-300 border border-green-500/30 animate-pulse' 
                  : 'bg-red-600/20 text-red-300 border border-red-500/30'
              }`}>
                {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
              </div>
              
              <button
                onClick={refreshData}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                aria-label={i18nService.t('Refresh data', 'Refresh data')}
              >
                <FaSyncAlt />
                {i18nService.t('Actualizar', 'Refresh')}
              </button>
              
              <button
                onClick={exportData}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                aria-label={i18nService.t('Export data', 'Export data')}
              >
                <FaDownload />
                {i18nService.t('Exportar', 'Export')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-400" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
              >
                <option value="24h">{i18nService.t('Last 24 hours', 'Last 24 hours')}</option>
                <option value="7d">{i18nService.t('Last 7 days', 'Last 7 days')}</option>
                <option value="30d">{i18nService.t('Last 30 days', 'Last 30 days')}</option>
                <option value="90d">{i18nService.t('Last 90 days', 'Last 90 days')}</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <FaGlobe className="text-green-400" />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
              >
                <option value="all">{i18nService.t('All platforms', 'All platforms')}</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="x-twitter">X (Twitter)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <FaSort className="text-purple-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
              >
                <option value="views">{i18nService.t('Sort by views', 'Sort by views')}</option>
                <option value="engagement">{i18nService.t('Sort by engagement', 'Sort by engagement')}</option>
                <option value="growth">{i18nService.t('Sort by growth', 'Sort by growth')}</option>
              </select>
            </div>
            
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={showRealTimeOnly}
                onChange={(e) => setShowRealTimeOnly(e.target.checked)}
                className="rounded"
              />
              {i18nService.t('Live only', 'Live only')}
            </label>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📹</div>
              <MdAnalytics className="text-blue-400 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatNumber(dashboardMetrics.totalVideos)}
            </div>
            <div className="text-slate-400">{i18nService.t('Total Videos', 'Total Videos')}</div>
            <div className="flex items-center gap-1 mt-2 text-green-400">
              <BiTrendingUp />
              <span className="text-sm">+12% vs {i18nService.t('yesterday', 'yesterday')}</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">👁️</div>
              <FaEye className="text-red-400 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatNumber(dashboardMetrics.totalViews)}
            </div>
            <div className="text-slate-400">{i18nService.t('Total Views', 'Total Views')}</div>
            <div className="flex items-center gap-1 mt-2 text-green-400">
              <BiTrendingUp />
              <span className="text-sm">+8.3% vs {i18nService.t('yesterday', 'yesterday')}</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">💫</div>
              <FaChartLine className="text-yellow-400 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatPercentage(dashboardMetrics.totalEngagement)}
            </div>
            <div className="text-slate-400">{i18nService.t('Avg Engagement', 'Avg Engagement')}</div>
            <div className="flex items-center gap-1 mt-2 text-green-400">
              <BiTrendingUp />
              <span className="text-sm">+2.1% vs {i18nService.t('yesterday', 'yesterday')}</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">⏱️</div>
              <FaClock className="text-green-400 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatPercentage(dashboardMetrics.averageRetention)}
            </div>
            <div className="text-slate-400">{i18nService.t('Avg Retention', 'Avg Retention')}</div>
            <div className="flex items-center gap-1 mt-2 text-red-400">
              <BiTrendingDown />
              <span className="text-sm">-0.8% vs {i18nService.t('yesterday', 'yesterday')}</span>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaFire className="text-orange-400" />
              {i18nService.t('Top Performers', 'Top Performers')}
            </h3>
            
            <div className="space-y-4">
              {dashboardMetrics.topPerformers.map((video, index) => (
                <div key={video.id} className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="capitalize">{video.platform}</span>
                        <span>•</span>
                        <span>{video.category}</span>
                        {video.isLive && <span className="text-red-400">• 🔴 LIVE</span>}
                        {video.verified && <MdVerified className="text-blue-400" />}
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${getPerformanceColor(video.performance)}`}>
                      #{index + 1}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatNumber(video.metrics.views)}</div>
                      <div className="text-slate-400 text-xs">{i18nService.t('Views', 'Views')}</div>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        {getGrowthIcon(video.growth.viewsGrowth)}
                        <span className={video.growth.viewsGrowth > 0 ? 'text-green-400' : 'text-red-400'}>
                          {formatPercentage(Math.abs(video.growth.viewsGrowth))}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatPercentage(video.metrics.engagement)}</div>
                      <div className="text-slate-400 text-xs">{i18nService.t('Engagement', 'Engagement')}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatPercentage(video.metrics.retention)}</div>
                      <div className="text-slate-400 text-xs">{i18nService.t('Retention', 'Retention')}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`font-semibold ${getPerformanceColor(video.performance)}`}>
                        {i18nService.t(video.performance, video.performance)}
                      </div>
                      <div className="text-slate-400 text-xs">{i18nService.t('Performance', 'Performance')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaGlobe className="text-blue-400" />
              {i18nService.t('Platform Breakdown', 'Platform Breakdown')}
            </h3>
            
            <div className="space-y-4">
              {Object.entries(dashboardMetrics.platformBreakdown).map(([platform, percentage]) => (
                <div key={platform} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <span className="text-white capitalize">{platform}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-slate-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold w-12 text-right">
                      {formatPercentage(percentage)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                {i18nService.t('Category Distribution', 'Category Distribution')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(dashboardMetrics.categoryBreakdown).map(([category, percentage]) => (
                  <div key={category} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{formatPercentage(percentage)}</div>
                    <div className="text-xs text-slate-400">{category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        {dashboardMetrics.alerts.length > 0 && (
          <div className="mt-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400" />
              {i18nService.t('Alerts & Notifications', 'Alerts & Notifications')}
            </h3>
            
            <div className="space-y-3">
              {dashboardMetrics.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    alert.type === 'error' ? 'bg-red-600/20 border border-red-500/30' :
                    alert.type === 'warning' ? 'bg-yellow-600/20 border border-yellow-500/30' :
                    'bg-green-600/20 border border-green-500/30'
                  }`}
                >
                  <div className="text-2xl">
                    {alert.type === 'error' ? '🚨' :
                     alert.type === 'warning' ? '⚠️' : '✅'}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{alert.message}</div>
                    <div className="text-slate-400 text-sm mt-1">
                      {i18nService.formatDate(alert.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldClassVideoAdminDashboard;