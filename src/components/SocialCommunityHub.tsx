import React, { useState, useEffect } from 'react';
import { Activity, activityTracker } from '../services/ActivityTracker';

// Social media platforms integration
interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  baseUrl: string;
}

const socialPlatforms: SocialPlatform[] = [
  { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400', baseUrl: 'https://twitter.com/' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600', baseUrl: 'https://facebook.com/' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'bg-green-500', baseUrl: 'https://wa.me/' },
  { id: 'youtube', name: 'YouTube', icon: '🎥', color: 'bg-red-500', baseUrl: 'https://youtube.com/' },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-500', baseUrl: 'https://instagram.com/' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black', baseUrl: 'https://tiktok.com/' }
];

// Political bias options
type PoliticalBias = 'left' | 'center-left' | 'center' | 'center-right' | 'right' | 'unknown';

interface BiasIndicator {
  bias: PoliticalBias;
  label: string;
  color: string;
  icon: string;
}

const biasIndicators: Record<PoliticalBias, BiasIndicator> = {
  'left': { bias: 'left', label: 'Izquierda', color: 'bg-red-100 text-red-800', icon: '⬅️' },
  'center-left': { bias: 'center-left', label: 'Centro-Izquierda', color: 'bg-orange-100 text-orange-800', icon: '↙️' },
  'center': { bias: 'center', label: 'Centro', color: 'bg-gray-100 text-gray-800', icon: '⚖️' },
  'center-right': { bias: 'center-right', label: 'Centro-Derecha', color: 'bg-blue-100 text-blue-800', icon: '↗️' },
  'right': { bias: 'right', label: 'Derecha', color: 'bg-indigo-100 text-indigo-800', icon: '➡️' },
  'unknown': { bias: 'unknown', label: 'Sin clasificar', color: 'bg-gray-100 text-gray-600', icon: '❓' }
};

// Enhanced activity interface
interface EnhancedActivity extends Activity {
  socialPlatform?: string;
  politicalBias?: PoliticalBias;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
  location?: string;
  verified?: boolean;
}

const SocialCommunityHub: React.FC = () => {
  const [activities, setActivities] = useState<EnhancedActivity[]>([]);
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState<PoliticalBias | 'all'>('all');
  const [socialFilter, setSocialFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const [socialIntegration, setSocialIntegration] = useState(true);

  // Real-time social media trends
  const [socialTrends] = useState([
    { platform: 'twitter', hashtag: '#ReformaTributaria', mentions: 12500, sentiment: 'mixed' },
    { platform: 'facebook', hashtag: '#GobiernoPetro', mentions: 8900, sentiment: 'negative' },
    { platform: 'youtube', hashtag: '#CongresoVivo', mentions: 5600, sentiment: 'positive' },
    { platform: 'whatsapp', hashtag: '#VotoJoven', mentions: 15200, sentiment: 'positive' },
  ]);

  // Helper functions
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const getSocialPlatform = (platformId: string | undefined) => {
    if (!platformId) return null;
    return socialPlatforms.find(p => p.id === platformId);
  };

  const getBiasIndicator = (bias: PoliticalBias | undefined) => {
    return biasIndicators[bias || 'unknown'];
  };

  // Mock function to enhance activities with social data
  const enhanceActivitiesWithSocialData = (baseActivities: Activity[]): EnhancedActivity[] => {
    return baseActivities.map(activity => ({
      ...activity,
      socialPlatform: Math.random() > 0.5 ? socialPlatforms[Math.floor(Math.random() * socialPlatforms.length)].id : undefined,
      politicalBias: Object.keys(biasIndicators)[Math.floor(Math.random() * Object.keys(biasIndicators).length)] as PoliticalBias,
      engagement: {
        likes: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 200)
      },
      location: Math.random() > 0.5 ? ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][Math.floor(Math.random() * 5)] : undefined,
      verified: Math.random() > 0.7
    }));
  };

  useEffect(() => {
    setLoading(true);
    
    // Load initial activities
    const loadActivities = () => {
      let baseActivities = activityTracker.getActivities();
      
      // Apply filters
      if (filter !== 'all') {
        baseActivities = baseActivities.filter(activity => 
          activity.category.toLowerCase() === filter.toLowerCase() ||
          activity.type === filter
        );
      }

      if (timeFilter !== 'all') {
        const hours = timeFilter === 'today' ? 24 : timeFilter === 'week' ? 168 : 0;
        if (hours > 0) {
          baseActivities = activityTracker.getActivitiesByTimeRange(hours);
        }
      }

      // Enhance with social data
      let enhancedActivities = enhanceActivitiesWithSocialData(baseActivities);

      // Apply social and bias filters
      if (biasFilter !== 'all') {
        enhancedActivities = enhancedActivities.filter(activity => activity.politicalBias === biasFilter);
      }

      if (socialFilter !== 'all') {
        enhancedActivities = enhancedActivities.filter(activity => activity.socialPlatform === socialFilter);
      }

      setActivities(enhancedActivities);
      setStats(activityTracker.getActivityStats());
      setLoading(false);
    };

    loadActivities();

    // Subscribe to activity updates
    const unsubscribe = activityTracker.subscribe(() => {
      loadActivities();
    });

    // Auto-refresh in live mode
    let interval: ReturnType<typeof setInterval> | null = null;
    if (liveMode) {
      interval = setInterval(() => {
        loadActivities();
      }, 30000); // Refresh every 30 seconds
    }

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  }, [filter, timeFilter, biasFilter, socialFilter, liveMode]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8 rounded-lg mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">💭 Community Hub</h1>
            <p className="text-white/90">Cargando actividades de la comunidad...</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header with Social Integration */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">💭 Community Hub</h1>
              <p className="text-white/90">Actividad en tiempo real con integración social y análisis político</p>
            </div>
            <div className="text-right text-white/80">
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <div className="text-sm">Actividades totales</div>
              {liveMode && (
                <div className="text-xs mt-1 animate-pulse">🔴 EN VIVO</div>
              )}
            </div>
          </div>

          {/* Enhanced live stats with social indicators */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{stats?.today || 0}</div>
              <div className="text-sm text-white/80">Hoy</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{stats?.thisWeek || 0}</div>
              <div className="text-sm text-white/80">Esta semana</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{stats?.types?.search || 0}</div>
              <div className="text-sm text-white/80">Búsquedas</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{stats?.types?.comment || 0}</div>
              <div className="text-sm text-white/80">Comentarios</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{activities.filter(a => a.socialPlatform).length}</div>
              <div className="text-sm text-white/80">Redes Sociales</div>
            </div>
          </div>
        </div>

        {/* Social Media Trends */}
        {socialIntegration && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📱</span>
              Tendencias en Redes Sociales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialTrends.map((trend, index) => {
                const platform = getSocialPlatform(trend.platform);
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{platform?.icon}</span>
                      <span className="font-medium text-gray-900">{platform?.name}</span>
                    </div>
                    <div className="text-sm text-blue-600 font-medium mb-1">{trend.hashtag}</div>
                    <div className="text-xs text-gray-500">{trend.mentions.toLocaleString()} menciones</div>
                    <div className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                      trend.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                      trend.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {trend.sentiment === 'positive' ? '😊 Positivo' :
                       trend.sentiment === 'negative' ? '😞 Negativo' : '😐 Mixto'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtros y Controles</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={liveMode}
                  onChange={e => setLiveMode(e.target.checked)}
                  className="rounded"
                />
                <span>🔴 Modo en vivo</span>
              </label>
              
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={socialIntegration}
                  onChange={e => setSocialIntegration(e.target.checked)}
                  className="rounded"
                />
                <span>📱 Integración social</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Actividad</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Todas las actividades</option>
                <option value="search">Búsquedas</option>
                <option value="comment">Comentarios</option>
                <option value="like">Likes</option>
                <option value="view">Visualizaciones</option>
                <option value="share">Compartidos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Orientación Política</label>
              <select
                value={biasFilter}
                onChange={(e) => setBiasFilter(e.target.value as PoliticalBias | 'all')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Todas las orientaciones</option>
                <option value="left">⬅️ Izquierda</option>
                <option value="center-left">↙️ Centro-Izquierda</option>
                <option value="center">⚖️ Centro</option>
                <option value="center-right">↗️ Centro-Derecha</option>
                <option value="right">➡️ Derecha</option>
                <option value="unknown">❓ Sin clasificar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Red Social</label>
              <select
                value={socialFilter}
                onChange={(e) => setSocialFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Todas las redes</option>
                <option value="twitter">🐦 Twitter</option>
                <option value="facebook">📘 Facebook</option>
                <option value="whatsapp">💬 WhatsApp</option>
                <option value="youtube">🎥 YouTube</option>
                <option value="instagram">📷 Instagram</option>
                <option value="tiktok">🎵 TikTok</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                {activities.length} actividades encontradas
              </div>
            </div>
          </div>
        </div>

        {/* Activities Display */}
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay actividades para mostrar</h3>
              <p className="text-gray-600 mb-6">
                Ajusta los filtros o espera a que aparezcan nuevas actividades de la comunidad.
              </p>
            </div>
          ) : (
            activities.map((activity, index) => {
              const socialPlatform = getSocialPlatform(activity.socialPlatform);
              const biasInfo = getBiasIndicator(activity.politicalBias);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Activity Icon */}
                      <div className="text-2xl">
                        {activity.type === 'search' ? '🔍' :
                         activity.type === 'comment' ? '💬' :
                         activity.type === 'like' ? '👍' :
                         activity.type === 'view' ? '👁️' :
                         activity.type === 'share' ? '📤' : '📝'}
                      </div>
                      
                      <div className="flex-1">
                        {/* Header with user info and social platform */}
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="font-medium text-gray-900">
                            {activity.username || 'Usuario Actual'}
                            {activity.verified && (
                              <span className="ml-1 text-blue-500">✓</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">•</div>
                          <div className="text-sm text-gray-500 capitalize">{activity.type}</div>
                          {activity.location && (
                            <>
                              <div className="text-sm text-gray-500">•</div>
                              <div className="text-sm text-gray-500">📍 {activity.location}</div>
                            </>
                          )}
                          <div className="text-sm text-gray-500">•</div>
                          <div className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</div>
                        </div>

                        {/* Political Bias and Social Platform Indicators */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${biasInfo.color}`}>
                            {biasInfo.icon} {biasInfo.label}
                          </span>
                          
                          {socialPlatform && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${socialPlatform.color}`}>
                              {socialPlatform.icon} {socialPlatform.name}
                            </span>
                          )}
                        </div>

                        {/* Activity Description */}
                        <p className="text-gray-800 mb-3">{activity.content}</p>

                        {/* Activity Details */}
                        {activity.metadata && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2 text-sm">
                                <span className="font-medium text-gray-700 capitalize">
                                  {key === 'searchQuery' ? 'Consulta:' :
                                   key === 'category' ? 'Categoría:' :
                                   key === 'articleTitle' ? 'Artículo:' : `${key}:`}
                                </span>
                                <span className="text-gray-600">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Engagement Metrics */}
                        {activity.engagement && (
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <span>👍</span>
                              <span>{activity.engagement.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>📤</span>
                              <span>{activity.engagement.shares}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>💬</span>
                              <span>{activity.engagement.comments}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialCommunityHub;