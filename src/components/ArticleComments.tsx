import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaShare,
  FaHeart,
  FaReply,
  FaFlag,
  FaExternalLinkAlt,
  FaUsers,
  FaComments
} from 'react-icons/fa';
import { MdVerified, MdTrendingUp } from 'react-icons/md';
import { BiLike, BiDislike } from 'react-icons/bi';

interface ArticleComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    platform?: string;
    platformHandle?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: ArticleComment[];
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'local' | 'youtube';
  platformUrl?: string;
  isHighlighted?: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface Article {
  id: string;
  title: string;
  topic: string;
  summary: string;
  url?: string;
  commentCount: number;
}

interface ArticleCommentsProps {
  article?: Article;
  onNavigate?: (view: string) => void;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ 
  article = {
    id: 'sample-article',
    title: 'Nueva Reforma Educativa: Análisis Completo',
    topic: 'Educación',
    summary: 'Análisis detallado de la propuesta de reforma educativa que busca modernizar el sistema educativo colombiano.',
    commentCount: 127
  },
  onNavigate 
}) => {
  const [comments, setComments] = useState<ArticleComment[]>([
    {
      id: '1',
      author: {
        name: 'María González',
        avatar: '👩‍🏫',
        verified: true,
        platform: 'Twitter',
        platformHandle: '@mariag_educacion'
      },
      content: 'Excelente análisis. La reforma educativa es fundamental para el futuro de Colombia. Especialmente importante el enfoque en tecnología y pensamiento crítico.',
      timestamp: 'Hace 15 minutos',
      likes: 24,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Carlos Mendoza',
            avatar: '👨‍💼',
            verified: false
          },
          content: 'Totalmente de acuerdo. ¿Qué opinas sobre el presupuesto asignado?',
          timestamp: 'Hace 10 minutos',
          likes: 8,
          dislikes: 0,
          replies: [],
          platform: 'local'
        }
      ],
      platform: 'twitter',
      platformUrl: 'https://twitter.com/mariag_educacion/status/123',
      sentiment: 'positive',
      isHighlighted: true
    },
    {
      id: '2',
      author: {
        name: 'Ana Rodríguez',
        avatar: '👩‍💻',
        verified: false,
        platform: 'Facebook',
        platformHandle: 'Ana Rodríguez'
      },
      content: 'Me preocupa la implementación. ¿Cómo van a capacitar a todos los docentes? Necesitamos un plan detallado.',
      timestamp: 'Hace 32 minutos',
      likes: 15,
      dislikes: 3,
      replies: [],
      platform: 'facebook',
      sentiment: 'neutral'
    },
    {
      id: '3',
      author: {
        name: 'Grupo Padres de Familia',
        avatar: '👥',
        verified: false,
        platform: 'WhatsApp',
        platformHandle: 'Grupo Educación Bogotá'
      },
      content: 'Compartiendo desde nuestro grupo de WhatsApp: Los padres estamos preocupados por los costos adicionales. ¿Habrá subsidios?',
      timestamp: 'Hace 1 hora',
      likes: 31,
      dislikes: 7,
      replies: [
        {
          id: '3-1',
          author: {
            name: 'Ministerio de Educación',
            avatar: '🏛️',
            verified: true
          },
          content: 'Hola, gracias por su preocupación. Estamos preparando un documento con todos los detalles financieros que se publicará próximamente.',
          timestamp: 'Hace 45 minutos',
          likes: 89,
          dislikes: 12,
          replies: [],
          platform: 'local'
        }
      ],
      platform: 'whatsapp',
      sentiment: 'negative'
    },
    {
      id: '4',
      author: {
        name: 'Estudiantes Unidos Colombia',
        avatar: '🎓',
        verified: true,
        platform: 'YouTube',
        platformHandle: 'EstudiantesUnidosCO'
      },
      content: '🔴 Hicimos un video completo analizando esta reforma. ¡Los estudiantes también tenemos voz! Link en nuestro canal.',
      timestamp: 'Hace 2 horas',
      likes: 67,
      dislikes: 8,
      replies: [],
      platform: 'youtube',
      platformUrl: 'https://youtube.com/watch?v=example',
      sentiment: 'positive'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('local');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'platform'>('recent');
  const [filterBy, setFilterBy] = useState<string>('all');

  const platforms = [
    { id: 'local', name: 'Nuestro Pulso', icon: '🇨🇴', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook />, color: 'bg-blue-700' },
    { id: 'twitter', name: 'Twitter/X', icon: <FaTwitter />, color: 'bg-sky-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: <FaWhatsapp />, color: 'bg-green-600' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-600' }
  ];

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: ArticleComment = {
      id: `new-${Date.now()}`,
      author: {
        name: 'Usuario Actual',
        avatar: '🙋‍♂️',
        verified: false
      },
      content: newComment,
      timestamp: 'Ahora',
      likes: 0,
      dislikes: 0,
      replies: [],
      platform: selectedPlatform as any,
      sentiment: 'neutral'
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.id === parentId && isReply) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          };
        }
        return comment;
      })
    );
  };

  const handleShare = (commentId: string, platform: string) => {
    console.log(`Sharing comment ${commentId} to ${platform}`);
    // Here you would implement actual sharing logic
  };

  const getPlatformIcon = (platform: string) => {
    const platformObj = platforms.find(p => p.id === platform);
    return platformObj ? platformObj.icon : '💬';
  };

  const getPlatformColor = (platform: string) => {
    const platformObj = platforms.find(p => p.id === platform);
    return platformObj ? platformObj.color : 'bg-gray-600';
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'border-l-green-500';
      case 'negative': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  const filteredComments = comments.filter(comment => {
    if (filterBy === 'all') return true;
    return comment.platform === filterBy;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      case 'platform':
        return a.platform.localeCompare(b.platform);
      default:
        return 0; // Keep original order for 'recent'
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {article.topic}
                </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">{article.commentCount} comentarios</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {article.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {article.summary}
              </p>
            </div>
          </div>

          {/* Cross-platform Sharing */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaComments className="w-4 h-4" />
              <span>Comentarios desde todas las plataformas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Compartir en:</span>
              <button 
                onClick={() => handleShare(article.id, 'facebook')}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare(article.id, 'twitter')}
                className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare(article.id, 'whatsapp')}
                className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Comment Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Platform Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterBy('all')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filterBy === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todas las plataformas
              </button>
              
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setFilterBy(platform.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filterBy === platform.id
                      ? `${platform.color} text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm border-none outline-none"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="platform">Por plataforma</option>
              </select>
            </div>
          </div>
        </div>

        {/* New Comment Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💬 Agregar Comentario</h3>
          
          {/* Platform Selection */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Comentar como:</p>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedPlatform === platform.id
                      ? `${platform.color} text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comparte tu opinión sobre este artículo..."
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {newComment.length} / 500 caracteres
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Publicar Comentario
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <div key={comment.id} className={`bg-white rounded-2xl shadow-lg border-l-4 ${getSentimentColor(comment.sentiment)} overflow-hidden`}>
              {/* Comment Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{comment.author.avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{comment.author.name}</span>
                        {comment.author.verified && (
                          <MdVerified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPlatformColor(comment.platform)} text-white`}>
                          <span>{getPlatformIcon(comment.platform)}</span>
                          <span>{comment.author.platform || comment.platform}</span>
                        </div>
                        <span>•</span>
                        <span>{comment.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  {comment.platformUrl && (
                    <button 
                      onClick={() => window.open(comment.platformUrl, '_blank')}
                      className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Highlighted Badge */}
                {comment.isHighlighted && (
                  <div className="flex items-center gap-2 mb-3">
                    <MdTrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                      Comentario destacado
                    </span>
                  </div>
                )}

                {/* Comment Content */}
                <p className="text-gray-800 leading-relaxed mb-4">
                  {comment.content}
                </p>

                {/* Comment Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
                    >
                      <BiLike className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{comment.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                      <FaReply className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Responder</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group">
                      <FaShare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Compartir</span>
                    </button>
                  </div>
                  
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaFlag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="text-lg">{reply.author.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{reply.author.name}</span>
                            {reply.author.verified && (
                              <MdVerified className="w-3 h-3 text-blue-500" />
                            )}
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{reply.content}</p>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <BiLike className="w-4 h-4" />
                              <span>{reply.likes}</span>
                            </button>
                            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Cargar más comentarios
          </button>
        </div>

        {/* Community Hub Link */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">¿Quieres ver todas las conversaciones?</h3>
            <p className="text-blue-100 mb-4">
              Únete al Community Hub para ver discusiones de todas las plataformas en un solo lugar
            </p>
            <button 
              onClick={() => onNavigate?.('community-hub')}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Ir al Community Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComments;