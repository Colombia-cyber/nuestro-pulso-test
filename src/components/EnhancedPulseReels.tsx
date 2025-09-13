import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

interface VideoReel {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  userLiked: boolean;
  comments: number;
  category: 'politics' | 'education' | 'environment' | 'social' | 'economics';
  tags: string[];
  uploadDate: string;
  featured: boolean;
}

interface ReelComment {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  userLiked: boolean;
}

const EnhancedPulseReels: React.FC = () => {
  const { user } = useAuth();
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReel, setSelectedReel] = useState<VideoReel | null>(null);
  const [comments, setComments] = useState<ReelComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = [
    { id: 'all', name: 'Todos', icon: '🎬' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'education', name: 'Educación', icon: '📚' },
    { id: 'environment', name: 'Medio Ambiente', icon: '🌱' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'economics', name: 'Economía', icon: '💰' },
  ];

  // Initialize with mock data
  useEffect(() => {
    const mockReels: VideoReel[] = [
      {
        id: '1',
        title: 'Cómo Participar en Consultas Populares',
        description: 'Aprende paso a paso cómo ejercer tu derecho al voto en consultas populares locales.',
        creator: {
          name: 'Centro Democrático Digital',
          avatar: '🏛️',
          verified: true
        },
        thumbnail: '/api/placeholder/400/600',
        duration: 90,
        views: 15420,
        likes: 1205,
        userLiked: false,
        comments: 89,
        category: 'politics',
        tags: ['democracia', 'participación', 'voto'],
        uploadDate: new Date(Date.now() - 86400000).toISOString(),
        featured: true
      },
      {
        id: '2',
        title: 'Impacto del Cambio Climático en Colombia',
        description: 'Datos visuales sobre cómo el cambio climático está afectando nuestro país.',
        creator: {
          name: 'EcoData Colombia',
          avatar: '🌱',
          verified: true
        },
        thumbnail: '/api/placeholder/400/600',
        duration: 120,
        views: 22350,
        likes: 1876,
        userLiked: true,
        comments: 156,
        category: 'environment',
        tags: ['clima', 'sostenibilidad', 'datos'],
        uploadDate: new Date(Date.now() - 172800000).toISOString(),
        featured: false
      },
      {
        id: '3',
        title: 'Presupuesto Nacional Explicado',
        description: 'Desglose simple del presupuesto nacional 2024 y en qué se invierte tu dinero.',
        creator: {
          name: 'Finanzas Públicas',
          avatar: '💰',
          verified: true
        },
        thumbnail: '/api/placeholder/400/600',
        duration: 150,
        views: 8920,
        likes: 654,
        userLiked: false,
        comments: 43,
        category: 'economics',
        tags: ['presupuesto', 'finanzas', 'transparencia'],
        uploadDate: new Date(Date.now() - 259200000).toISOString(),
        featured: false
      },
      {
        id: '4',
        title: 'Educación Pública: Retos y Oportunidades',
        description: 'Análisis sobre el estado actual de la educación pública en Colombia.',
        creator: {
          name: 'Educación Para Todos',
          avatar: '📚',
          verified: false
        },
        thumbnail: '/api/placeholder/400/600',
        duration: 180,
        views: 12840,
        likes: 923,
        userLiked: false,
        comments: 78,
        category: 'education',
        tags: ['educación', 'política pública', 'análisis'],
        uploadDate: new Date(Date.now() - 345600000).toISOString(),
        featured: true
      }
    ];

    setReels(mockReels);
    setLoading(false);
  }, []);

  // Load comments when a reel is selected
  useEffect(() => {
    if (selectedReel) {
      const mockComments: ReelComment[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'María González',
          avatar: '👩‍💼',
          text: 'Excelente explicación, muy clara y útil para entender el proceso.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: 12,
          userLiked: false
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Carlos Rodríguez',
          avatar: '👨‍🎓',
          text: 'Necesitamos más contenido educativo como este. ¡Gracias!',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          likes: 8,
          userLiked: true
        }
      ];
      setComments(mockComments);
    }
  }, [selectedReel]);

  const filteredReels = selectedCategory === 'all' 
    ? reels 
    : reels.filter(reel => reel.category === selectedCategory);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const handleLikeReel = (reelId: string) => {
    if (!user) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    setReels(prev => prev.map(reel => {
      if (reel.id === reelId) {
        return {
          ...reel,
          likes: reel.userLiked ? reel.likes - 1 : reel.likes + 1,
          userLiked: !reel.userLiked
        };
      }
      return reel;
    }));

    if (selectedReel && selectedReel.id === reelId) {
      setSelectedReel(prev => prev ? {
        ...prev,
        likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
        userLiked: !prev.userLiked
      } : null);
    }
  };

  const handleAddComment = () => {
    if (!user || !newComment.trim() || !selectedReel) {
      if (!user) alert('Debes iniciar sesión para comentar');
      return;
    }

    const comment: ReelComment = {
      id: Date.now().toString(),
      userId: user.uid,
      userName: user.displayName || user.email?.split('@')[0] || 'Usuario',
      avatar: '🙋‍♂️',
      text: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      userLiked: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');

    // Update comment count
    setReels(prev => prev.map(reel => {
      if (reel.id === selectedReel.id) {
        return { ...reel, comments: reel.comments + 1 };
      }
      return reel;
    }));

    setSelectedReel(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
  };

  const handleLikeComment = (commentId: string) => {
    if (!user) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked
        };
      }
      return comment;
    }));
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando Pulse Reels...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
          <p className="text-white/90">Videos cortos educativos sobre participación ciudadana y temas cívicos</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>📹 {reels.length} videos disponibles</span>
            <span>👁️ {reels.reduce((sum, r) => sum + r.views, 0).toLocaleString()} visualizaciones</span>
            <span>⭐ {reels.filter(r => r.featured).length} destacados</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Filter & Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h2>
              <nav 
                className="space-y-2"
                role="tablist"
                aria-label="Categorías de videos"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    role="tab"
                    aria-selected={selectedCategory === category.id}
                    aria-label={`Ver videos de ${category.name}`}
                  >
                    <span role="img" aria-hidden="true">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Featured Content */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">⭐ Destacados</h2>
              <div className="space-y-3">
                {reels.filter(reel => reel.featured).slice(0, 3).map((reel) => (
                  <button
                    key={reel.id}
                    onClick={() => setSelectedReel(reel)}
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {reel.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{reel.creator.name}</span>
                      <span>{formatViews(reel.views)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedReel ? (
              /* Video Grid */
              <div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                role="region"
                aria-label="Lista de videos"
              >
                {filteredReels.map((reel) => (
                  <article
                    key={reel.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedReel(reel)}
                  >
                    {/* Thumbnail */}
                    <div className="relative">
                      <img
                        src={reel.thumbnail}
                        alt={`Vista previa de ${reel.title}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
                          aria-label={`Reproducir ${reel.title}`}
                        >
                          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l8-5z"/>
                          </svg>
                        </button>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(reel.duration)}
                      </div>

                      {/* Featured Badge */}
                      {reel.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          ⭐ Destacado
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {reel.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {reel.description}
                      </p>

                      {/* Creator */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg" role="img" aria-label={`Avatar de ${reel.creator.name}`}>
                          {reel.creator.avatar}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-gray-900">{reel.creator.name}</span>
                            {reel.creator.verified && (
                              <span className="text-blue-600" title="Cuenta verificada">✓</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>👁️ {formatViews(reel.views)}</span>
                          <span>❤️ {formatViews(reel.likes)}</span>
                          <span>💬 {reel.comments}</span>
                        </div>
                        <time dateTime={reel.uploadDate}>
                          {formatTimeAgo(reel.uploadDate)}
                        </time>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {reel.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Video Player */
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Video Player */}
                <div className="relative bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-64 md:h-96"
                    poster={selectedReel.thumbnail}
                    controls
                    aria-label={`Video: ${selectedReel.title}`}
                  >
                    <source src="/api/placeholder/video.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedReel.title}
                      </h1>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>👁️ {formatViews(selectedReel.views)} visualizaciones</span>
                        <span>📅 {new Date(selectedReel.uploadDate).toLocaleDateString('es-CO')}</span>
                      </div>

                      <p className="text-gray-700 mb-4">{selectedReel.description}</p>

                      {/* Creator Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl" role="img" aria-label={`Avatar de ${selectedReel.creator.name}`}>
                          {selectedReel.creator.avatar}
                        </span>
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold text-gray-900">{selectedReel.creator.name}</span>
                            {selectedReel.creator.verified && (
                              <span className="text-blue-600" title="Cuenta verificada">✓</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Creador de contenido cívico</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedReel.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleLikeReel(selectedReel.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          selectedReel.userLiked
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        aria-label={`${selectedReel.userLiked ? 'Quitar' : 'Dar'} like al video`}
                      >
                        <span>❤️</span>
                        <span>{formatViews(selectedReel.likes)}</span>
                      </button>

                      <button
                        onClick={() => setSelectedReel(null)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Volver a la lista de videos"
                      >
                        ← Volver
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      💬 Comentarios ({selectedReel.comments})
                    </h2>

                    {/* Add Comment */}
                    {user ? (
                      <div className="mb-6">
                        <div className="flex space-x-3">
                          <span className="text-2xl flex-shrink-0" role="img" aria-label="Tu avatar">
                            🙋‍♂️
                          </span>
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Comparte tu opinión sobre este video..."
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              maxLength={500}
                              aria-label="Escribir comentario"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">
                                {500 - newComment.length} caracteres restantes
                              </span>
                              <button
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Enviar comentario"
                              >
                                Comentar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 mb-2">Inicia sesión para comentar</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Iniciar Sesión
                        </button>
                      </div>
                    )}

                    {/* Comments List */}
                    <div 
                      className="space-y-4"
                      role="region"
                      aria-label="Lista de comentarios"
                    >
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <span className="text-lg flex-shrink-0" role="img" aria-label={`Avatar de ${comment.userName}`}>
                            {comment.avatar}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-900">{comment.userName}</span>
                              <time className="text-xs text-gray-500" dateTime={comment.timestamp}>
                                hace {formatTimeAgo(comment.timestamp)}
                              </time>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.text}</p>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleLikeComment(comment.id)}
                                className={`flex items-center space-x-1 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                                  comment.userLiked 
                                    ? 'text-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                                aria-label={`${comment.userLiked ? 'Quitar' : 'Dar'} like al comentario de ${comment.userName}`}
                              >
                                <span>👍</span>
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-sm text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                                Responder
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPulseReels;