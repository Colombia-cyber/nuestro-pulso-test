import React, { useState, useEffect } from 'react';

interface UserComment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  articleId?: number;
  articleTitle?: string;
  likes: number;
  replies: UserComment[];
}

interface CommentsProps {
  articleId?: number;
  articleTitle?: string;
  isHub?: boolean;
}

const Comments: React.FC<CommentsProps> = ({ articleId, articleTitle, isHub = false }) => {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock comment data - in real app this would come from backend
  const mockComments: UserComment[] = [
    {
      id: 1,
      author: 'María González',
      avatar: '👩‍💼',
      content: 'Excelente artículo. Es importante que todos los colombianos tengamos acceso a educación de calidad.',
      timestamp: '2 horas atrás',
      articleId: 1,
      articleTitle: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
      likes: 15,
      replies: [
        {
          id: 101,
          author: 'Carlos Ruiz',
          avatar: '👨‍🎓',
          content: 'Totalmente de acuerdo. Mi hermana se benefició de un programa similar el año pasado.',
          timestamp: '1 hora atrás',
          likes: 8,
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: 'Jorge Ramírez',
      avatar: '👨‍🔧',
      content: 'Las medidas ambientales son urgentes. Bogotá necesita aire más limpio para nuestros hijos.',
      timestamp: '3 horas atrás',
      articleId: 2,
      articleTitle: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
      likes: 23,
      replies: []
    },
    {
      id: 3,
      author: 'Ana Sánchez',
      avatar: '👩‍⚕️',
      content: 'La situación de seguridad en las fronteras es preocupante. Esperemos que las medidas sean efectivas.',
      timestamp: '1 hora atrás',
      articleId: 6,
      articleTitle: 'Alerta de seguridad: Incrementan amenazas terroristas en zonas fronterizas',
      likes: 12,
      replies: []
    },
    {
      id: 4,
      author: 'Pedro López',
      avatar: '👨‍💻',
      content: 'El plan de transformación digital es prometedor. Colombia necesita modernizar su infraestructura.',
      timestamp: '45 minutos atrás',
      articleId: 9,
      articleTitle: 'Colombia lanza plan nacional de transformación digital para 2030',
      likes: 18,
      replies: []
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredComments = mockComments;
      if (articleId && !isHub) {
        filteredComments = mockComments.filter(comment => comment.articleId === articleId);
      }
      setComments(filteredComments);
      setIsLoading(false);
    }, 500);
  }, [articleId, isHub]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: UserComment = {
      id: Date.now(),
      author: 'Usuario Actual',
      avatar: '👤',
      content: newComment,
      timestamp: 'ahora',
      articleId: articleId,
      articleTitle: articleTitle,
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    // Save to localStorage for persistence across components
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    allComments.push(comment);
    localStorage.setItem('comments', JSON.stringify(allComments));
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const reply: UserComment = {
      id: Date.now(),
      author: 'Usuario Actual',
      avatar: '👤',
      content: newReply,
      timestamp: 'ahora',
      likes: 0,
      replies: []
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    }));

    setNewReply('');
    setReplyTo(null);
  };

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
            )
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-neutral-300 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-32 h-4 bg-neutral-300 rounded"></div>
                  <div className="w-20 h-3 bg-neutral-300 rounded"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-neutral-300 rounded"></div>
                  <div className="w-4/5 h-4 bg-neutral-300 rounded"></div>
                  <div className="w-3/5 h-4 bg-neutral-300 rounded"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-16 h-8 bg-neutral-300 rounded-lg"></div>
                  <div className="w-20 h-8 bg-neutral-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card overflow-hidden mb-8 animate-slide-up">
            <div className="gradient-colombia p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">
                  {isHub ? '💭' : '💬'}
                </span>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {isHub ? 'Community Hub' : 'Comentarios'}
                  </h1>
                  <p className="text-white/90 text-lg">
                    {isHub ? 'Todas las conversaciones de la comunidad' : 'Únete a la conversación'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="card overflow-hidden mb-8 animate-fade-in">
          <div className="gradient-colombia p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl animate-float">
                {isHub ? '💭' : '💬'}
              </span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {isHub ? 'Community Hub' : 'Comentarios'}
                </h1>
                <p className="text-white/90 text-lg">
                  {isHub 
                    ? 'Todas las conversaciones de la comunidad en un solo lugar' 
                    : 'Comparte tu opinión y únete al debate cívico'
                  }
                </p>
              </div>
            </div>
            {isHub && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">{comments.length}</div>
                  <div className="text-sm text-white/80">Comentarios totales</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">👥</div>
                  <div className="text-sm text-white/80">Comunidad activa</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">🔄</div>
                  <div className="text-sm text-white/80">Tiempo real</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comment Form */}
        {!isHub && (
          <div className="card mb-8 animate-slide-up animation-delay-150">
            <div className="p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span>✍️</span>
                <span>Agregar comentario</span>
              </h3>
              <form onSubmit={handleSubmitComment}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Comparte tu opinión sobre este artículo..."
                      className="form-input min-h-[100px] resize-none"
                      rows={4}
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-neutral-500 flex items-center gap-2">
                        <span>💡</span>
                        <span>Mantén un tono respetuoso y constructivo</span>
                      </span>
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          <span>💬</span>
                          <span>Comentar</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="card p-12 text-center animate-scale-in">
              <div className="text-6xl mb-6 animate-float">💬</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {isHub ? 'No hay comentarios aún' : 'Sé el primero en comentar'}
              </h3>
              <p className="text-neutral-600 text-lg leading-relaxed max-w-md mx-auto">
                {isHub 
                  ? 'La comunidad aún no ha iniciado conversaciones. ¡Sé parte del cambio!' 
                  : 'Comparte tu perspectiva sobre este artículo y enriquece el debate.'
                }
              </p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div 
                key={comment.id} 
                className="card-hover animate-slide-up" 
                style={{ animationDelay: `${200 + (index * 100)}ms` }}
              >
                <div className="p-6">
                  {/* Main Comment */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3 flex-wrap">
                        <span className="font-bold text-neutral-900">{comment.author}</span>
                        <span className="text-sm text-neutral-500">{comment.timestamp}</span>
                        {isHub && comment.articleTitle && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-1">
                            <span>📰</span>
                            <span className="truncate max-w-xs">{comment.articleTitle}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-700 mb-4 leading-relaxed">{comment.content}</p>
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center space-x-2 text-neutral-500 hover:text-primary-600 transition-colors group"
                        >
                          <span className="group-hover:scale-110 transition-transform">👍</span>
                          <span className="text-sm font-medium">{comment.likes}</span>
                        </button>
                        {!isHub && (
                          <button
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                            className="flex items-center space-x-2 text-neutral-500 hover:text-primary-600 transition-colors group"
                          >
                            <span className="group-hover:scale-110 transition-transform">💬</span>
                            <span className="text-sm font-medium">Responder</span>
                          </button>
                        )}
                      </div>

                      {/* Reply Form */}
                      {replyTo === comment.id && (
                        <div className="mt-6 p-4 glass rounded-xl animate-slide-down">
                          <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-lg">
                                👤
                              </div>
                              <div className="flex-1">
                                <textarea
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  placeholder="Escribe tu respuesta..."
                                  className="form-input resize-none"
                                  rows={3}
                                />
                                <div className="mt-3 flex justify-end space-x-3">
                                  <button
                                    type="button"
                                    onClick={() => setReplyTo(null)}
                                    className="btn-ghost text-sm"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={!newReply.trim()}
                                    className="btn-primary text-sm disabled:opacity-50"
                                  >
                                    Responder
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-6 space-y-4 pl-6 border-l-2 border-primary-200">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-3 animate-slide-up">
                              <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                                {reply.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-semibold text-neutral-900 text-sm">{reply.author}</span>
                                  <span className="text-xs text-neutral-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-neutral-700 text-sm mb-3 leading-relaxed">{reply.content}</p>
                                <button
                                  onClick={() => handleLike(reply.id, true, comment.id)}
                                  className="flex items-center space-x-1 text-neutral-500 hover:text-primary-600 transition-colors text-sm group"
                                >
                                  <span className="group-hover:scale-110 transition-transform">👍</span>
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Community Stats (only for hub) */}
        {isHub && comments.length > 0 && (
          <div className="card mt-8 animate-slide-up animation-delay-500">
            <div className="p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <span>📊</span>
                <span>Estadísticas de la Comunidad</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary-50 rounded-xl">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{comments.length}</div>
                  <div className="text-sm text-neutral-600 font-medium">Comentarios Totales</div>
                </div>
                <div className="text-center p-6 bg-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {comments.reduce((acc, comment) => acc + comment.replies.length, 0)}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">Respuestas</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {comments.reduce((acc, comment) => acc + comment.likes + comment.replies.reduce((acc2, reply) => acc2 + reply.likes, 0), 0)}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">Likes Totales</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;