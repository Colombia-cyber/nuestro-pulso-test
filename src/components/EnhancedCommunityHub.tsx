import React, { useState, useEffect } from 'react';
import { Activity, activityTracker } from '../services/ActivityTracker';

const EnhancedCommunityHub: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [showAdminControls, setShowAdminControls] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Load initial activities
    const loadActivities = () => {
      let filteredActivities = activityTracker.getActivities();
      
      // Apply filters
      if (filter !== 'all') {
        filteredActivities = filteredActivities.filter(activity => 
          activity.category.toLowerCase() === filter.toLowerCase() ||
          activity.type === filter
        );
      }

      if (timeFilter !== 'all') {
        const hours = timeFilter === 'today' ? 24 : timeFilter === 'week' ? 168 : 0;
        if (hours > 0) {
          filteredActivities = activityTracker.getActivitiesByTimeRange(hours);
        }
      }

      setActivities(filteredActivities);
      setStats(activityTracker.getActivityStats());
      setLoading(false);
    };

    loadActivities();

    // Subscribe to activity updates
    const unsubscribe = activityTracker.subscribe(() => {
      loadActivities();
    });

    return unsubscribe;
  }, [filter, timeFilter]);

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return '🔍';
      case 'comment': return '💬';
      case 'like': return '👍';
      case 'view': return '👁️';
      case 'share': return '📤';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'search': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'comment': return 'bg-green-50 border-green-200 text-green-800';
      case 'like': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'view': return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'share': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres limpiar todo el historial de actividades? Esta acción no se puede deshacer.'
    );
    
    if (confirmed) {
      activityTracker.clearHistory();
    }
  };

  const handleExportData = () => {
    const data = activityTracker.exportActivities();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `community_activities_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearByCategory = (category: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar todas las actividades de la categoría "${category}"?`
    );
    
    if (confirmed) {
      activityTracker.adminClearActivitiesByCategory(category);
    }
  };

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
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">💭 Community Hub</h1>
              <p className="text-white/90">Actividad en tiempo real de toda la comunidad</p>
            </div>
            <div className="text-right text-white/80">
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <div className="text-sm">Actividades totales</div>
            </div>
          </div>

          {/* Live stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Activity filter */}
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las actividades</option>
                <option value="search">Búsquedas</option>
                <option value="comment">Comentarios</option>
                <option value="like">Likes</option>
                <option value="view">Visualizaciones</option>
                <option value="share">Compartidos</option>
              </select>

              {/* Time filter */}
              <select
                value={timeFilter}
                onChange={e => setTimeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todo el tiempo</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
              </select>

              <span className="text-sm text-gray-600">
                {activities.length} actividades encontradas
              </span>
            </div>

            {/* Admin controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdminControls(!showAdminControls)}
                className="text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg px-3 py-2"
              >
                ⚙️ Admin
              </button>
              <button
                onClick={handleExportData}
                className="text-sm bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700"
              >
                📊 Exportar
              </button>
            </div>
          </div>

          {/* Admin controls panel */}
          {showAdminControls && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">🔧 Controles de Administrador</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleClearHistory}
                  className="text-sm bg-red-600 text-white rounded-lg px-3 py-2 hover:bg-red-700"
                >
                  🗑️ Limpiar Todo
                </button>
                {stats?.categories && Object.keys(stats.categories).map(category => (
                  <button
                    key={category}
                    onClick={() => handleClearByCategory(category)}
                    className="text-sm bg-orange-600 text-white rounded-lg px-3 py-2 hover:bg-orange-700"
                  >
                    🗑️ Limpiar {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay actividades aún</h3>
              <p className="text-gray-600 mb-6">
                La comunidad aún no ha comenzado a interactuar. ¡Sé el primero en explorar y participar!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.href = '#search'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  🔍 Buscar contenido
                </button>
                <button
                  onClick={() => window.location.href = '#news'}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                  📰 Ver noticias
                </button>
              </div>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${getActivityColor(activity.type)}`}>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-900">{activity.username}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                          {activity.category}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                    </div>

                    <p className="text-gray-700 mb-3">{activity.content}</p>

                    {/* Metadata */}
                    {activity.metadata && (
                      <div className="text-sm text-gray-600 space-y-1">
                        {activity.metadata.searchQuery && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Consulta:</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {activity.metadata.searchQuery}
                            </span>
                          </div>
                        )}
                        {activity.metadata.articleTitle && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Artículo:</span>
                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                              {activity.metadata.articleTitle.length > 60 
                                ? `${activity.metadata.articleTitle.substring(0, 60)}...`
                                : activity.metadata.articleTitle
                              }
                            </span>
                          </div>
                        )}
                        {activity.metadata.category && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Categoría:</span>
                            <span>{activity.metadata.category}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load more button */}
        {activities.length >= 50 && (
          <div className="mt-8 text-center">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
              Cargar más actividades
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCommunityHub;