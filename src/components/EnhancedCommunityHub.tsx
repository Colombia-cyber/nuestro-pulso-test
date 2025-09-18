import React, { useState, useEffect } from 'react';
import { Activity, activityTracker } from '../services/ActivityTracker';
import Comments from './Comments';

interface SocialComment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'youtube' | 'app';
  articleId?: string;
  articleTitle?: string;
  politicalWing?: 'left' | 'right' | 'center';
  likes: number;
  replies: SocialComment[];
  tags: string[];
}

const EnhancedCommunityHub: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [showAdminControls, setShowAdminControls] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [communityComments, setCommunityComments] = useState<SocialComment[]>([]);
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialComment['platform']>('app');
  const [politicalFilter, setPoliticalFilter] = useState<'all' | 'left' | 'right' | 'center'>('all');

  // Mock social media comment generation
  const generateMockSocialComment = (): SocialComment => {
    const platforms: SocialComment['platform'][] = ['facebook', 'twitter', 'whatsapp', 'youtube', 'app'];
    const wings: SocialComment['politicalWing'][] = ['left', 'right', 'center'];
    const authors = [
      'María González', 'Carlos Rodríguez', 'Ana Martínez', 'Pedro López', 'Laura Díaz',
      'Jorge Silva', 'Isabel Torres', 'Miguel Hernández', 'Sofía Castro', 'Daniel Moreno'
    ];
    const sampleTexts = [
      'Este tema es muy importante para el futuro de Colombia.',
      'Necesitamos más transparencia en estos procesos.',
      'Excelente análisis, muy informativo.',
      'No estoy de acuerdo con esta perspectiva.',
      'Gracias por compartir esta información.',
      'Esto afecta directamente a nuestras comunidades.',
      'Esperemos que se tomen las medidas correctas.',
      'Es hora de actuar con responsabilidad.',
      'La participación ciudadana es clave.',
      'Necesitamos más debates como este.'
    ];

    return {
      id: `social-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
      author: authors[Math.floor(Math.random() * authors.length)],
      timestamp: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString(), // Last 2 hours
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      politicalWing: wings[Math.floor(Math.random() * wings.length)],
      likes: Math.floor(Math.random() * 50),
      replies: [],
      tags: ['política', 'colombia', 'participación'].slice(0, Math.floor(Math.random() * 3) + 1)
    };
  };

  useEffect(() => {
    setLoading(true);
    
    // Load community comments from localStorage
    const loadCommunityComments = () => {
      const storedComments = JSON.parse(localStorage.getItem('communityComments') || '[]');
      const regularComments = JSON.parse(localStorage.getItem('comments') || '[]');
      
      // Convert regular comments to social comments format
      const convertedComments: SocialComment[] = regularComments.map((comment: any) => ({
        id: comment.id || `comment-${Date.now()}-${Math.random()}`,
        text: comment.content || comment.text || '',
        author: comment.author || 'Usuario Anónimo',
        timestamp: comment.timestamp || new Date().toISOString(),
        platform: 'app' as const,
        politicalWing: Math.random() > 0.5 ? 'left' : 'right' as const,
        likes: Math.floor(Math.random() * 20),
        replies: [],
        tags: comment.tags || []
      }));

      // Combine with stored social comments
      const allComments = [...storedComments, ...convertedComments];
      
      // Add some mock social media comments for demo
      const mockComments = Array.from({ length: 8 }, generateMockSocialComment);
      
      setCommunityComments([...allComments, ...mockComments].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    };
    
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

    loadCommunityComments();
    loadActivities();

    // Set up live updates
    if (liveUpdatesEnabled) {
      const interval = setInterval(() => {
        loadCommunityComments();
        loadActivities();
        
        // Occasionally add new mock social media comments
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
          const newMockComment = generateMockSocialComment();
          setCommunityComments(prev => [newMockComment, ...prev].slice(0, 50)); // Keep latest 50
        }
      }, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [filter, timeFilter, liveUpdatesEnabled]);

  // Handle new comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: SocialComment = {
      id: `user-${Date.now()}`,
      text: newComment,
      author: 'Usuario Actual',
      timestamp: new Date().toISOString(),
      platform: selectedPlatform,
      politicalWing: 'center',
      likes: 0,
      replies: [],
      tags: []
    };

    // Add to community comments
    setCommunityComments(prev => [comment, ...prev]);
    
    // Save to localStorage
    const storedComments = JSON.parse(localStorage.getItem('communityComments') || '[]');
    storedComments.unshift(comment);
    localStorage.setItem('communityComments', JSON.stringify(storedComments));

    setNewComment('');
  };

  // Get platform icon
  const getPlatformIcon = (platform: SocialComment['platform']) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'twitter': return '🐦';
      case 'whatsapp': return '💚';
      case 'youtube': return '📺';
      default: return '💬';
    }
  };

  // Get political wing indicator
  const getPoliticalWingColor = (wing?: SocialComment['politicalWing']) => {
    switch (wing) {
      case 'left': return 'bg-blue-100 text-blue-800';
      case 'right': return 'bg-red-100 text-red-800';
      case 'center': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter comments by political wing
  const filteredComments = communityComments.filter(comment => 
    politicalFilter === 'all' || comment.politicalWing === politicalFilter
  );

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

        {/* Enhanced View Mode Toggle with Live Updates */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Vista del Community Hub</h3>
              <div className="flex items-center space-x-4">
                {/* Live updates toggle */}
                <button
                  onClick={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    liveUpdatesEnabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {liveUpdatesEnabled ? '🔴 EN VIVO' : '⏸️ PAUSADO'}
                </button>
                
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setShowComments(false)}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      !showComments
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📊 Actividades
                  </button>
                  <button
                    onClick={() => setShowComments(true)}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      showComments
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    💬 Feed Social ({filteredComments.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Social Platform Stats */}
            {showComments && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(['facebook', 'twitter', 'whatsapp', 'youtube', 'app'] as const).map(platform => {
                  const count = communityComments.filter(c => c.platform === platform).length;
                  return (
                    <div key={platform} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg">{getPlatformIcon(platform)}</div>
                      <div className="text-sm font-medium text-gray-900">{count}</div>
                      <div className="text-xs text-gray-600 capitalize">{platform}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showComments ? (
          /* Enhanced Social Community Comments View */
          <div className="space-y-6">
            {/* Comment Submission Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                💬 Comenta Instantáneamente
              </h3>
              <p className="text-gray-600 mb-4">
                Tus comentarios se envían automáticamente al Community Hub y se categorizan políticamente
              </p>
              
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="flex items-center space-x-4 mb-3">
                  <label className="text-sm font-medium text-gray-700">Plataforma:</label>
                  <div className="flex space-x-2">
                    {(['facebook', 'twitter', 'whatsapp', 'youtube', 'app'] as const).map(platform => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setSelectedPlatform(platform)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          selectedPlatform === platform 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getPlatformIcon(platform)} {platform}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Comparte tu opinión sobre cualquier tema político o social..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>

            {/* Political Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">🏛️ Filtro Político</h4>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(['all', 'left', 'center', 'right'] as const).map(wing => (
                    <button
                      key={wing}
                      onClick={() => setPoliticalFilter(wing)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        politicalFilter === wing
                          ? 'bg-white shadow'
                          : 'text-gray-600 hover:text-gray-800'
                      } ${wing === 'left' ? 'text-blue-600' : wing === 'right' ? 'text-red-600' : wing === 'center' ? 'text-purple-600' : ''}`}
                    >
                      {wing === 'all' ? '🌐 Todos' : 
                       wing === 'left' ? '🔵 Izquierda' : 
                       wing === 'right' ? '🔴 Derecha' : 
                       '🟣 Centro'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Social Feed */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  🌐 Feed Social en Tiempo Real
                </h3>
                {liveUpdatesEnabled && (
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Actualizaciones automáticas
                  </div>
                )}
              </div>
              
              {filteredComments.length > 0 ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredComments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getPlatformIcon(comment.platform)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformIcon(comment.platform) === '💬' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                              {comment.platform}
                            </span>
                            {comment.politicalWing && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPoliticalWingColor(comment.politicalWing)}`}>
                                {comment.politicalWing === 'left' ? '🔵 Izquierda' : 
                                 comment.politicalWing === 'right' ? '🔴 Derecha' : 
                                 '🟣 Centro'}
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(comment.timestamp)}
                            </span>
                          </div>
                          
                          {comment.articleTitle && (
                            <div className="mb-2">
                              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                📰 {comment.articleTitle.length > 60 ? 
                                  `${comment.articleTitle.substring(0, 60)}...` : 
                                  comment.articleTitle
                                }
                              </span>
                            </div>
                          )}
                          
                          <p className="text-gray-700 mb-3">{comment.text}</p>
                          
                          {comment.tags && comment.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {comment.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <span>👍</span>
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                              <span>💬</span>
                              <span>{comment.replies.length}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-yellow-600 transition-colors">
                              <span>📤</span>
                              <span>Compartir</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💭</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No hay comentarios disponibles</h4>
                  <p className="text-gray-600 mb-4">
                    {politicalFilter !== 'all' 
                      ? `No hay comentarios de perspectiva ${politicalFilter} en este momento.`
                      : 'Sé el primero en comentar y comienza la conversación.'
                    }
                  </p>
                  <button
                    onClick={() => setPoliticalFilter('all')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver todos los comentarios
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Activities View */
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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
        )}
      </div>
    </div>
  );
};

export default EnhancedCommunityHub;