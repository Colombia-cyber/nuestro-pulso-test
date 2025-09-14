import React, { useState, useEffect } from 'react';

interface PollComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

interface PollCommentsProps {
  pollId: string;
}

const PollComments: React.FC<PollCommentsProps> = ({ pollId }) => {
  const [comments, setComments] = useState<PollComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`poll-comments-${pollId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Initialize with some demo comments
      const demoComments: PollComment[] = [
        {
          id: '1',
          author: 'Carlos M.',
          content: 'Es hora de un cambio real en Colombia. Las políticas actuales no están funcionando para la clase trabajadora.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 15
        },
        {
          id: '2',
          author: 'Ana R.',
          content: 'Creo que debemos darle más tiempo. Los cambios estructurales toman años en mostrar resultados.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          likes: 8
        },
        {
          id: '3',
          author: 'Miguel S.',
          content: 'La economía está muy complicada. Necesitamos políticas más pragmáticas y menos ideológicas.',
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
          likes: 22
        }
      ];
      setComments(demoComments);
      localStorage.setItem(`poll-comments-${pollId}`, JSON.stringify(demoComments));
    }
  }, [pollId]);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !userName.trim()) return;

    const comment: PollComment = {
      id: Date.now().toString(),
      author: userName.trim(),
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`poll-comments-${pollId}`, JSON.stringify(updatedComments));
    
    setNewComment('');
    setShowCommentForm(false);
    
    // Save user name for future comments
    localStorage.setItem('poll-user-name', userName);
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const userLikedKey = `comment-liked-${commentId}`;
        const hasLiked = localStorage.getItem(userLikedKey) === 'true';
        
        if (!hasLiked) {
          localStorage.setItem(userLikedKey, 'true');
          return { ...comment, likes: comment.likes + 1, userLiked: true };
        }
      }
      return comment;
    });
    
    setComments(updatedComments);
    localStorage.setItem(`poll-comments-${pollId}`, JSON.stringify(updatedComments));
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - commentTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} h`;
    return `${Math.floor(diffInMinutes / 1440)} d`;
  };

  // Load saved user name
  useEffect(() => {
    const savedUserName = localStorage.getItem('poll-user-name');
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          💬 Comentarios ({comments.length})
        </h3>
        {!showCommentForm && (
          <button
            onClick={() => setShowCommentForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            💭 Comentar
          </button>
        )}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Tu nombre (aparecerá como: Nombre P.)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={50}
            />
            <textarea
              placeholder="Comparte tu opinión sobre la gestión presidencial..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {500 - newComment.length} caracteres restantes
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || !userName.trim()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">🤔 ¡Sé el primero en comentar!</p>
            <p className="text-sm mt-2">Comparte tu opinión sobre la gestión presidencial</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  disabled={comment.userLiked || localStorage.getItem(`comment-liked-${comment.id}`) === 'true'}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                    comment.userLiked || localStorage.getItem(`comment-liked-${comment.id}`) === 'true'
                      ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 cursor-pointer'
                  }`}
                >
                  👍 {comment.likes}
                </button>
                <span className="text-xs text-gray-400">
                  💬 Opinión respetuosa
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Guidelines */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">📋 Normas de Participación</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Mantén un tono respetuoso y constructivo</li>
          <li>• No uses lenguaje ofensivo o discriminatorio</li>
          <li>• Enfócate en ideas y propuestas, no en ataques personales</li>
          <li>• Los comentarios son moderados por la comunidad</li>
        </ul>
      </div>
    </div>
  );
};

export default PollComments;