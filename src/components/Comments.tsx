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
      
      // Load comments from localStorage for persistence
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const allComments = [...mockComments, ...savedComments];
      
      if (articleId && !isHub) {
        filteredComments = allComments.filter(comment => comment.articleId === articleId);
      } else if (isHub) {
        filteredComments = allComments;
      }
      
      setComments(filteredComments);
      setIsLoading(false);
    }, 500);

    // Set up real-time updates listener
    const handleCommentUpdate = (event: any) => {
      const newComment = event.detail;
      setComments(prevComments => {
        const updatedComments = [newComment, ...prevComments];
        return updatedComments.filter((comment, index, self) => 
          index === self.findIndex(c => c.id === comment.id)
        );
      });
    };

    window.addEventListener('commentAdded', handleCommentUpdate);
    
    return () => {
      window.removeEventListener('commentAdded', handleCommentUpdate);
    };
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

    // Immediately sync with Community Hub
    const hubComments = JSON.parse(localStorage.getItem('hub-comments') || '[]');
    hubComments.push(comment);
    localStorage.setItem('hub-comments', JSON.stringify(hubComments));

    // Trigger custom event for real-time updates
    window.dispatchEvent(new CustomEvent('commentAdded', { detail: comment }));
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
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-16 h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isHub ? '💭 Community Hub' : '💬 Comentarios'}
            </h1>
            <p className="text-white/90">
              {isHub ? 'Todas las conversaciones de la comunidad' : 'Únete a la conversación'}
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isHub ? '💭 Community Hub' : '💬 Comentarios'}
          </h1>
          <p className="text-white/90">
            {isHub 
              ? 'Todas las conversaciones de la comunidad en un solo lugar' 
              : 'Comparte tu opinión y únete al debate cívico'
            }
          </p>
          {isHub && (
            <div className="mt-4 flex items-center space-x-6 text-white/80">
              <span>💬 {comments.length} comentarios totales</span>
              <span>👥 Comunidad activa</span>
              <span>🔄 Actualizado en tiempo real</span>
            </div>
          )}
        </div>

        {/* Comment Form */}
        {!isHub && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar comentario</h3>
            <form onSubmit={handleSubmitComment}>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">👤</div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Comparte tu opinión sobre este artículo..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Mantén un tono respetuoso y constructivo
                    </span>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isHub ? 'No hay comentarios aún' : 'Sé el primero en comentar'}
              </h3>
              <p className="text-gray-600">
                {isHub 
                  ? 'La comunidad aún no ha iniciado conversaciones.' 
                  : 'Comparte tu perspectiva sobre este artículo.'
                }
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg shadow-lg p-6">
                {/* Main Comment */}
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{comment.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                      {isHub && comment.articleTitle && (
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          📰 {comment.articleTitle.substring(0, 50)}...
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <span>👍</span>
                        <span>{comment.likes}</span>
                      </button>
                      {!isHub && (
                        <button
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          💬 Responder
                        </button>
                      )}
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                          <div className="flex items-start space-x-3">
                            <div className="text-lg">👤</div>
                            <div className="flex-1">
                              <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Escribe tu respuesta..."
                                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={2}
                              />
                              <div className="mt-2 flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setReplyTo(null)}
                                  className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="submit"
                                  disabled={!newReply.trim()}
                                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                      <div className="mt-4 space-y-3 pl-6 border-l-2 border-gray-200">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <div className="text-lg">{reply.avatar}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                                <span className="text-xs text-gray-500">{reply.timestamp}</span>
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                              <button
                                onClick={() => handleLike(reply.id, true, comment.id)}
                                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors text-sm"
                              >
                                <span>👍</span>
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
            ))
          )}
        </div>

        {/* Community Stats (only for hub) */}
        {isHub && comments.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Estadísticas de la Comunidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{comments.length}</div>
                <div className="text-sm text-gray-600">Comentarios Totales</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {comments.reduce((acc, comment) => acc + comment.replies.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Respuestas</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {comments.reduce((acc, comment) => acc + comment.likes + comment.replies.reduce((acc2, reply) => acc2 + reply.likes, 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Likes Totales</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;