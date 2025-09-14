import React, { useState, useEffect } from 'react';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: CommentType[];
  reactions: { [emoji: string]: number };
  category: string;
  isNewsShare?: boolean;
  sharedContent?: {
    title: string;
    source: string;
    url: string;
  };
}

interface CommentType {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommunityHubProps {
  className?: string;
}

const CommunityHub: React.FC<CommunityHubProps> = ({ className = '' }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Todo', icon: '🌍' },
    { id: 'news', name: 'Noticias', icon: '📰' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'debate', name: 'Debate', icon: '💬' },
    { id: 'question', name: 'Preguntas', icon: '❓' },
    { id: 'opinion', name: 'Opinión', icon: '💭' }
  ];

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡', '🤔', '🔥'];

  // Mock data
  const generateMockPosts = (): CommunityPost[] => [
    {
      id: '1',
      author: 'María González',
      avatar: '👩‍💼',
      content: '¿Qué opinan sobre las nuevas medidas económicas del gobierno? Me parece que pueden tener un impacto positivo en el empleo, pero me preocupa la inflación.',
      timestamp: '2 horas',
      likes: 24,
      comments: [
        {
          id: 'c1',
          author: 'Carlos Ruiz',
          content: 'Estoy de acuerdo, hay que evaluar el impacto a mediano plazo.',
          timestamp: '1 hora',
          likes: 5
        }
      ],
      reactions: { '👍': 15, '🤔': 8, '❤️': 3 },
      category: 'politics'
    },
    {
      id: '2',
      author: 'Andrés Pérez',
      avatar: '👨‍🎓',
      content: 'Compartiendo esta excelente investigación sobre corrupción en Colombia. Es importante que todos estemos informados.',
      timestamp: '4 horas',
      likes: 67,
      comments: [],
      reactions: { '👍': 45, '❤️': 12, '😮': 10 },
      category: 'news',
      isNewsShare: true,
      sharedContent: {
        title: 'Investigación revela nuevos casos de corrupción en entidades públicas',
        source: 'Transparencia Colombia',
        url: '#'
      }
    },
    {
      id: '3',
      author: 'Laura Jiménez',
      avatar: '👩‍🔬',
      content: '¿Alguien más cree que deberíamos invertir más en educación digital? Con la tecnología avanzando tan rápido, nuestros estudiantes necesitan estar preparados.',
      timestamp: '6 horas',
      likes: 89,
      comments: [
        {
          id: 'c2',
          author: 'Roberto Silva',
          content: 'Totalmente de acuerdo. La brecha digital es real.',
          timestamp: '5 horas',
          likes: 12
        },
        {
          id: 'c3',
          author: 'Ana Vargas',
          content: 'Mi hijo está aprendiendo programación y es increíble cómo se adapta.',
          timestamp: '3 horas',
          likes: 8
        }
      ],
      reactions: { '👍': 56, '❤️': 23, '💭': 10 },
      category: 'question'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts(generateMockPosts());
      setLoading(false);
    }, 1000);
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: 'Tú',
      avatar: '👤',
      content: newPost,
      timestamp: 'ahora',
      likes: 0,
      comments: [],
      reactions: {},
      category: 'opinion'
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    setPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleReaction = (postId: string, emoji: string) => {
    setPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              reactions: {
                ...post.reactions,
                [emoji]: (post.reactions[emoji] || 0) + 1
              }
            }
          : post
      )
    );
    setShowEmojiPicker(null);
  };

  const handleDeleteHistory = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todo tu historial de la Community Hub?')) {
      setPosts(posts => posts.filter(post => post.author !== 'Tú'));
      alert('Historial eliminado exitosamente');
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">💬 Community Hub</h1>
        <p className="text-white/90">Comparte, discute y conecta con la comunidad colombiana</p>
        <div className="mt-4 flex items-center space-x-6 text-white/80">
          <span>👥 15,420 miembros activos</span>
          <span>💬 2,847 discusiones hoy</span>
          <span>🔥 589 trending topics</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          <button 
            onClick={handleDeleteHistory}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors"
          >
            🗑️ Eliminar historial
          </button>
        </div>
      </div>

      {/* New post form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">👤</div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué estás pensando? Comparte tu opinión sobre cualquier tema..."
                className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>💡 Tip: Menciona fuentes confiables</span>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              {/* Post header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{post.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{post.author}</div>
                    <div className="text-sm text-gray-500">hace {post.timestamp}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.category === 'politics' ? 'bg-blue-100 text-blue-800' :
                    post.category === 'news' ? 'bg-green-100 text-green-800' :
                    post.category === 'debate' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="text-xl">⋯</span>
                </button>
              </div>

              {/* Post content */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
                
                {/* Shared content */}
                {post.isNewsShare && post.sharedContent && (
                  <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">📰</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{post.sharedContent.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Fuente: {post.sharedContent.source}</p>
                        <a href={post.sharedContent.url} 
                           className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Leer artículo completo →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reactions */}
              {Object.keys(post.reactions).length > 0 && (
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
                  {Object.entries(post.reactions).map(([emoji, count]) => (
                    <div key={emoji} className="flex items-center space-x-1 text-sm">
                      <span>{emoji}</span>
                      <span className="text-gray-600">{count}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
                  >
                    <span>👍</span>
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowEmojiPicker(showEmojiPicker === post.id ? null : post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition"
                    >
                      <span>😊</span>
                      <span className="text-sm font-medium">Reaccionar</span>
                    </button>
                    
                    {showEmojiPicker === post.id && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                        <div className="flex space-x-2">
                          {reactions.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(post.id, emoji)}
                              className="text-2xl hover:scale-125 transition-transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition">
                    <span>💬</span>
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
                    <span>📤</span>
                    <span className="text-sm font-medium">Compartir</span>
                  </button>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600 transition">
                  <span>🔖</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="text-2xl">👤</div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">hace {comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600">
                            <span>👍</span>
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-xs text-gray-500 hover:text-purple-600">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors">
          Cargar más publicaciones
        </button>
      </div>
    </div>
  );
};

export default CommunityHub;