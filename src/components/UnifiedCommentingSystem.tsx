import React, { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaReply,
  FaFlag,
  FaEdit,
  FaTrash,
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaTiktok
} from 'react-icons/fa';
import { MdVerified, MdMoreVert } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import useAppStore from '../stores/appStore';

interface SocialComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    platform?: 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'tiktok' | 'local';
    followers?: number;
  };
  timestamp: Date;
  likes: number;
  dislikes: number;
  replies: SocialComment[];
  platform: 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'tiktok' | 'local';
  isLiked: boolean;
  isDisliked: boolean;
  parentId?: string;
  attachments?: {
    type: 'image' | 'video' | 'link';
    url: string;
    thumbnail?: string;
  }[];
  reactions: {
    [key: string]: number;
  };
  isEdited: boolean;
  isPinned: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface UnifiedCommentingSystemProps {
  articleId?: string;
  contentType: 'article' | 'reel' | 'debate' | 'poll';
  enableRealTimeSync?: boolean;
  showPlatformIntegration?: boolean;
  moderationEnabled?: boolean;
}

const UnifiedCommentingSystem: React.FC<UnifiedCommentingSystemProps> = ({
  articleId,
  contentType,
  enableRealTimeSync = true,
  showPlatformIntegration = true,
  moderationEnabled = true
}) => {
  const { user, addNotification } = useAppStore();
  const [comments, setComments] = useState<SocialComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'local' | 'facebook' | 'twitter'>('local');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'controversial'>('popular');
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'platform'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock comments data with cross-platform integration
  const mockComments: SocialComment[] = [
    {
      id: '1',
      content: 'Excelente análisis sobre la reforma tributaria. Es importante que los ciudadanos entendamos las implicaciones de estos cambios.',
      author: {
        id: 'user1',
        name: 'María González',
        avatar: '👩‍💼',
        verified: true,
        platform: 'facebook',
        followers: 15600
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 24,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          content: 'Totalmente de acuerdo. Necesitamos más transparencia en estos procesos.',
          author: {
            id: 'user2',
            name: 'Carlos Ramírez',
            avatar: '👨‍🎓',
            verified: false,
            platform: 'local'
          },
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 8,
          dislikes: 0,
          replies: [],
          platform: 'local',
          isLiked: false,
          isDisliked: false,
          reactions: { '👍': 5, '❤️': 3 },
          isEdited: false,
          isPinned: false,
          sentiment: 'positive'
        }
      ],
      platform: 'facebook',
      isLiked: true,
      isDisliked: false,
      reactions: { '👍': 15, '❤️': 8, '🔥': 1 },
      isEdited: false,
      isPinned: true,
      sentiment: 'positive'
    },
    {
      id: '2',
      content: 'Compartido desde Twitter: El gobierno debe explicar mejor estas medidas a la ciudadanía. #TransparenciaYa',
      author: {
        id: 'user3',
        name: '@periodista_independiente',
        avatar: '📰',
        verified: true,
        platform: 'twitter',
        followers: 45200
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 67,
      dislikes: 12,
      replies: [],
      platform: 'twitter',
      isLiked: false,
      isDisliked: false,
      reactions: { '👍': 42, '🔥': 15, '😮': 5, '😡': 5 },
      isEdited: false,
      isPinned: false,
      sentiment: 'neutral'
    },
    {
      id: '3',
      content: '¡Gran debate! Es fundamental que los jóvenes participemos en estas discusiones. Nuestro futuro está en juego.',
      author: {
        id: 'user4',
        name: 'Estudiante Activo',
        avatar: '🎓',
        verified: false,
        platform: 'local',
        followers: 350
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likes: 31,
      dislikes: 1,
      replies: [],
      platform: 'local',
      isLiked: false,
      isDisliked: false,
      reactions: { '👍': 20, '❤️': 8, '🔥': 3 },
      isEdited: true,
      isPinned: false,
      sentiment: 'positive'
    }
  ];

  useEffect(() => {
    setComments(mockComments);
  }, []);

  const getPlatformIcon = (platform: string) => {
    const icons = {
      facebook: <FaFacebook className="w-4 h-4 text-blue-600" />,
      twitter: <FaTwitter className="w-4 h-4 text-blue-400" />,
      youtube: <FaYoutube className="w-4 h-4 text-red-600" />,
      instagram: <FaInstagram className="w-4 h-4 text-pink-600" />,
      tiktok: <FaTiktok className="w-4 h-4 text-black" />,
      local: <span className="w-4 h-4 text-blue-600 font-bold">NP</span>
    };
    return icons[platform as keyof typeof icons] || icons.local;
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      facebook: 'bg-blue-50 border-blue-200',
      twitter: 'bg-blue-50 border-blue-300',
      youtube: 'bg-red-50 border-red-200',
      instagram: 'bg-pink-50 border-pink-200',
      tiktok: 'bg-gray-50 border-gray-300',
      local: 'bg-blue-50 border-blue-200'
    };
    return colors[platform as keyof typeof colors] || colors.local;
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isDisliked: false,
          dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes
        };
      }
      return comment;
    }));

    addNotification({
      type: 'success',
      title: 'Interacción registrada',
      message: 'Tu reacción ha sido sincronizada en todas las plataformas',
      read: false
    });
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const submitReply = () => {
    if (!replyContent.trim() || !replyTo) return;

    const newReply: SocialComment = {
      id: `${replyTo}-${Date.now()}`,
      content: replyContent,
      author: {
        id: user?.id || 'guest',
        name: user?.name || 'Usuario Anónimo',
        avatar: user?.avatar || '👤',
        verified: false,
        platform: selectedPlatform
      },
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      replies: [],
      platform: selectedPlatform,
      isLiked: false,
      isDisliked: false,
      reactions: {},
      isEdited: false,
      isPinned: false,
      parentId: replyTo,
      sentiment: 'neutral'
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === replyTo) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyTo(null);

    addNotification({
      type: 'success',
      title: 'Respuesta publicada',
      message: `Tu respuesta ha sido publicada en ${selectedPlatform}`,
      read: false
    });
  };

  const submitComment = () => {
    if (!newComment.trim()) return;

    setIsLoading(true);

    const comment: SocialComment = {
      id: `comment-${Date.now()}`,
      content: newComment,
      author: {
        id: user?.id || 'guest',
        name: user?.name || 'Usuario Anónimo',
        avatar: user?.avatar || '👤',
        verified: false,
        platform: selectedPlatform
      },
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      replies: [],
      platform: selectedPlatform,
      isLiked: false,
      isDisliked: false,
      reactions: {},
      isEdited: false,
      isPinned: false,
      sentiment: 'neutral'
    };

    setTimeout(() => {
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setIsLoading(false);

      addNotification({
        type: 'success',
        title: 'Comentario publicado',
        message: `Tu comentario ha sido publicado en ${selectedPlatform}`,
        read: false
      });
    }, 1000);
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'popular':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      case 'controversial':
        return (b.dislikes + b.likes) - (a.dislikes + a.likes);
      default:
        return 0;
    }
  });

  const filteredComments = sortedComments.filter(comment => {
    if (filterBy === 'verified') return comment.author.verified;
    if (filterBy === 'platform') return comment.platform !== 'local';
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaComment className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Comentarios ({filteredComments.length})
          </h2>
          {enableRealTimeSync && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Sincronización en vivo
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="popular">🔥 Populares</option>
            <option value="newest">⏰ Recientes</option>
            <option value="oldest">📅 Antiguos</option>
            <option value="controversial">💬 Polémicos</option>
          </select>

          {/* Filter Options */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos</option>
            <option value="verified">✅ Verificados</option>
            <option value="platform">🌐 Redes Sociales</option>
          </select>
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{user?.avatar || '👤'}</div>
          
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comparte tu opinión de manera respetuosa..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            
            {showPlatformIntegration && (
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Publicar en:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPlatform('local')}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedPlatform === 'local'
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="font-bold">NP</span>
                      Nuestro Pulso
                    </button>
                    <button
                      onClick={() => setSelectedPlatform('facebook')}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedPlatform === 'facebook'
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaFacebook className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => setSelectedPlatform('twitter')}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedPlatform === 'twitter'
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaTwitter className="w-4 h-4" />
                      Twitter
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim() || isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Publicando...' : 'Comentar'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div key={comment.id} className={`p-4 rounded-xl border-2 ${getPlatformColor(comment.platform)}`}>
            
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{comment.author.avatar}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{comment.author.name}</span>
                    {comment.author.verified && (
                      <MdVerified className="w-4 h-4 text-blue-500" />
                    )}
                    {getPlatformIcon(comment.platform)}
                    {comment.isPinned && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                        📌 FIJADO
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BiTime className="w-4 h-4" />
                    <span>{formatTimeAgo(comment.timestamp)}</span>
                    {comment.author.followers && (
                      <span>• {comment.author.followers.toLocaleString()} seguidores</span>
                    )}
                    {comment.isEdited && <span>• editado</span>}
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <MdMoreVert className="w-5 h-5" />
              </button>
            </div>

            {/* Comment Content */}
            <div className="mb-3">
              <p className="text-gray-800 leading-relaxed">{comment.content}</p>
            </div>

            {/* Reactions */}
            <div className="flex items-center gap-2 mb-3">
              {Object.entries(comment.reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  className="flex items-center gap-1 px-2 py-1 bg-white/50 rounded-full text-sm hover:bg-white/80 transition-colors"
                >
                  <span>{emoji}</span>
                  <span className="font-medium">{count}</span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    comment.isLiked
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FaHeart className={`w-4 h-4 ${comment.isLiked ? 'text-red-500' : ''}`} />
                  {comment.likes}
                </button>
                
                <button
                  onClick={() => handleReply(comment.id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FaReply className="w-4 h-4" />
                  Responder
                </button>
                
                <button className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  <FaShare className="w-4 h-4" />
                  Compartir
                </button>
              </div>

              <div className="flex items-center gap-2">
                {comment.sentiment && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    comment.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    comment.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {comment.sentiment === 'positive' ? '😊 Positivo' :
                     comment.sentiment === 'negative' ? '😞 Negativo' : '😐 Neutral'}
                  </span>
                )}
              </div>
            </div>

            {/* Reply Input */}
            {replyTo === comment.id && (
              <div className="mt-4 p-3 bg-white/70 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{user?.avatar || '👤'}</div>
                  <div className="flex-1">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Respondiendo a ${comment.author.name}...`}
                      className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={submitReply}
                        disabled={!replyContent.trim()}
                        className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Responder
                      </button>
                      <button
                        onClick={() => setReplyTo(null)}
                        className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-4 pl-8 space-y-3 border-l-2 border-gray-200">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-white/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{reply.author.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{reply.author.name}</span>
                          {reply.author.verified && (
                            <MdVerified className="w-3 h-3 text-blue-500" />
                          )}
                          {getPlatformIcon(reply.platform)}
                          <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">{reply.content}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleLike(reply.id)}
                            className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600"
                          >
                            <FaHeart className="w-3 h-3" />
                            {reply.likes}
                          </button>
                          <button className="text-xs text-gray-600 hover:text-blue-600">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Cargar más comentarios
        </button>
      </div>
    </div>
  );
};

export default UnifiedCommentingSystem;