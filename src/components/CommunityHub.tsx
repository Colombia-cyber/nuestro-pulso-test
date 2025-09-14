import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    role: string;
  };
  content: string;
  images?: string[];
  video?: string;
  link?: string;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    reactions: {
      [key: string]: number;
    };
  };
  category: string;
  tags: string[];
  isLive?: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const CommunityHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [showPostModal, setShowPostModal] = useState(false);
  const [userReactions, setUserReactions] = useState<{ [key: string]: string }>({});

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🏠', color: 'bg-blue-500' },
    { id: 'noticias', name: 'Noticias', icon: '📰', color: 'bg-red-500' },
    { id: 'debates', name: 'Debates', icon: '🗣️', color: 'bg-purple-500' },
    { id: 'propuestas', name: 'Propuestas', icon: '💡', color: 'bg-yellow-500' },
    { id: 'preguntas', name: 'Preguntas', icon: '❓', color: 'bg-green-500' },
    { id: 'eventos', name: 'Eventos', icon: '📅', color: 'bg-orange-500' },
    { id: 'alertas', name: 'Alertas', icon: '🚨', color: 'bg-red-600' },
  ];

  const mockPosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'María González',
        avatar: '👩‍💼',
        verified: true,
        role: 'Ciudadana Activa'
      },
      content: '¿Qué opinan sobre la nueva reforma tributaria? He estado siguiendo los debates en el Congreso y me preocupa el impacto en la clase media. ¿Alguien tiene información adicional sobre los artículos específicos? #ReformaTributaria #Colombia',
      timestamp: 'hace 15 minutos',
      engagement: {
        likes: 124,
        shares: 32,
        comments: 18,
        reactions: {
          '👍': 45,
          '❤️': 32,
          '😮': 28,
          '😡': 15,
          '🤔': 4
        }
      },
      category: 'debates',
      tags: ['#ReformaTributaria', '#Colombia', '#ClaseMedia'],
      isLive: true
    },
    {
      id: '2',
      author: {
        name: 'Dr. Carlos Mendoza',
        avatar: '👨‍⚕️',
        verified: true,
        role: 'Experto en Salud Pública'
      },
      content: 'Propuesta: Crear centros de salud comunitarios en zonas rurales. Después de mi experiencia trabajando en el Chocó, creo que necesitamos un modelo descentralizado que lleve servicios básicos a las comunidades más apartadas.',
      images: ['🏥', '🌄', '📋'],
      timestamp: 'hace 1 hora',
      engagement: {
        likes: 89,
        shares: 56,
        comments: 12,
        reactions: {
          '👍': 89,
          '❤️': 45,
          '💪': 23
        }
      },
      category: 'propuestas',
      tags: ['#SaludRural', '#ChocóColombiana', '#PropuestaCiudadana']
    },
    {
      id: '3',
      author: {
        name: 'Joven Líder',
        avatar: '🧑‍🎓',
        verified: false,
        role: 'Estudiante Universitario'
      },
      content: '🚨 ALERTA: Vi irregularidades en el proceso de inscripción para becas estudiantiles en mi universidad. ¿A quién puedo reportar esto? Necesito orientación sobre los pasos a seguir para denunciar posible corrupción académica.',
      timestamp: 'hace 2 horas',
      engagement: {
        likes: 67,
        shares: 89,
        comments: 24,
        reactions: {
          '😡': 45,
          '💪': 34,
          '🤝': 28
        }
      },
      category: 'alertas',
      tags: ['#Corrupción', '#EducaciónSuperior', '#Transparencia'],
      isLive: false
    },
    {
      id: '4',
      author: {
        name: 'Observatorio Electoral',
        avatar: '🗳️',
        verified: true,
        role: 'Organización Civil'
      },
      content: 'Evento: Foro "Elecciones 2026: Preparación Ciudadana" - Diciembre 15, 7:00 PM. Aprende sobre el proceso electoral, cómo verificar candidatos y la importancia del voto informado. Registro gratuito en el link.',
      link: 'https://observatorio-electoral.org/foro-2026',
      timestamp: 'hace 3 horas',
      engagement: {
        likes: 156,
        shares: 234,
        comments: 45,
        reactions: {
          '👍': 156,
          '📚': 78,
          '🗳️': 45
        }
      },
      category: 'eventos',
      tags: ['#Elecciones2026', '#ForoCiudadano', '#VotoInformado']
    },
    {
      id: '5',
      author: {
        name: 'Ana Rodríguez',
        avatar: '👩‍🌾',
        verified: false,
        role: 'Agricultora'
      },
      content: 'Pregunta: ¿Cómo accedo a los subsidios agrícolas para pequeños productores? He intentado en varias oficinas pero me dicen cosas diferentes. ¿Alguien ha logrado acceder exitosamente? Agradezco cualquier orientación.',
      timestamp: 'hace 4 horas',
      engagement: {
        likes: 34,
        shares: 12,
        comments: 28,
        reactions: {
          '🤔': 20,
          '🤝': 14
        }
      },
      category: 'preguntas',
      tags: ['#AgriculturaColombia', '#SubsidiosAgrícolas', '#PequeñosProductores']
    }
  ];

  const filteredPosts = selectedCategory === 'todos' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  const reactionEmojis = ['👍', '❤️', '😮', '😢', '😡', '🤔', '💪', '🤝', '📚', '🗳️'];

  const handleReaction = (postId: string, emoji: string) => {
    setUserReactions(prev => ({
      ...prev,
      [postId]: prev[postId] === emoji ? '' : emoji
    }));
  };

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      // Mock adding new post
      alert('¡Post publicado exitosamente! La comunidad podrá verlo y comentar.');
      setNewPostContent('');
      setShowPostModal(false);
    }
  };

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    // Mock load comments
    setComments({
      [post.id]: [
        {
          id: '1',
          author: { name: 'Luis Pérez', avatar: '👨‍💼' },
          content: 'Excelente punto. También me preocupa el impacto en las PyMES.',
          timestamp: 'hace 10 min',
          likes: 12,
          replies: [
            {
              id: '1-1',
              author: { name: 'Sofia Martinez', avatar: '👩‍💻' },
              content: 'Exacto, las pequeñas empresas van a sufrir mucho.',
              timestamp: 'hace 5 min',
              likes: 8
            }
          ]
        },
        {
          id: '2',
          author: { name: 'Roberto Silva', avatar: '👨‍🏫' },
          content: '¿Alguien tiene el texto completo de la propuesta?',
          timestamp: 'hace 8 min',
          likes: 6
        }
      ]
    });
  };

  if (selectedPost) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* Post detail view */}
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
              >
                ← Volver al Hub
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedPost.author.avatar}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPost.author.name}</h2>
                    {selectedPost.author.verified && <span className="text-blue-500">✓</span>}
                  </div>
                  <p className="text-gray-600">{selectedPost.author.role}</p>
                  <p className="text-sm text-gray-500">{selectedPost.timestamp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Post content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="mb-6">
                    {selectedPost.isLive && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                            🔴 EN VIVO
                          </span>
                          <span className="text-red-700 text-sm font-medium">
                            Discusión activa en curso
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {selectedPost.content}
                    </p>
                    
                    {selectedPost.images && (
                      <div className="flex space-x-2 mt-4">
                        {selectedPost.images.map((img, index) => (
                          <div key={index} className="text-6xl">{img}</div>
                        ))}
                      </div>
                    )}
                    
                    {selectedPost.link && (
                      <a 
                        href={selectedPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 p-4 border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        <span className="text-blue-600 hover:text-blue-800">
                          🔗 Ver enlace completo →
                        </span>
                      </a>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedPost.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reactions */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Reacciones:</span>
                        <div className="flex space-x-1">
                          {Object.entries(selectedPost.engagement.reactions).map(([emoji, count]) => (
                            <span key={emoji} className="flex items-center space-x-1 text-sm">
                              <span>{emoji}</span>
                              <span>{count}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👍 {selectedPost.engagement.likes}</span>
                        <span>📤 {selectedPost.engagement.shares}</span>
                        <span>💬 {selectedPost.engagement.comments}</span>
                      </div>
                    </div>

                    {/* Reaction buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {reactionEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(selectedPost.id, emoji)}
                          className={`p-2 rounded-lg transition-all ${
                            userReactions[selectedPost.id] === emoji
                              ? 'bg-blue-100 scale-110'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>

                    {/* Comments */}
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-semibold mb-4">
                        💬 Comentarios ({comments[selectedPost.id]?.length || 0})
                      </h3>
                      
                      {/* Add comment */}
                      <div className="mb-6">
                        <textarea
                          placeholder="Únete a la conversación..."
                          className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-yellow-500">😊</button>
                            <button className="text-gray-400 hover:text-blue-500">📎</button>
                            <button className="text-gray-400 hover:text-purple-500">🎥</button>
                          </div>
                          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                            Comentar
                          </button>
                        </div>
                      </div>

                      {/* Comments list */}
                      <div className="space-y-6">
                        {comments[selectedPost.id]?.map((comment) => (
                          <div key={comment.id} className="border-l-2 border-blue-200 pl-4">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl">{comment.author.avatar}</div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-semibold text-gray-900">{comment.author.name}</span>
                                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-gray-700 mb-2">{comment.content}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <button className="text-gray-500 hover:text-blue-600">
                                    👍 {comment.likes}
                                  </button>
                                  <button className="text-gray-500 hover:text-blue-600">
                                    Responder
                                  </button>
                                </div>
                                
                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                  <div className="mt-4 ml-6 space-y-3">
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} className="flex items-start space-x-3">
                                        <div className="text-xl">{reply.author.avatar}</div>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium text-gray-800">{reply.author.name}</span>
                                            <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                          </div>
                                          <p className="text-gray-700 text-sm mb-1">{reply.content}</p>
                                          <button className="text-xs text-gray-500 hover:text-blue-600">
                                            👍 {reply.likes}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Share options */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">📤 Compartir</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      📘 Facebook
                    </button>
                    <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600">
                      🐦 Twitter
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                      📱 WhatsApp
                    </button>
                    <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
                      🔗 Copiar enlace
                    </button>
                  </div>
                </div>

                {/* Related posts */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">🔗 Posts Relacionados</h3>
                  <div className="space-y-3">
                    {mockPosts.filter(p => p.id !== selectedPost.id && p.category === selectedPost.category).slice(0, 3).map((post) => (
                      <div 
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-3 border border-gray-100 rounded-lg hover:shadow-md cursor-pointer"
                      >
                        <p className="text-sm text-gray-800 line-clamp-2 mb-2">{post.content.substring(0, 100)}...</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{post.author.avatar}</span>
                          <span>{post.author.name}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🏠 Community Hub</h1>
          <p className="text-white/90">Espacio de encuentro para la discusión y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>👥 2,847 miembros activos</span>
            <span>💬 156 conversaciones hoy</span>
            <span>🔴 8 discusiones en vivo</span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Create post button */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={() => setShowPostModal(true)}
            className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="text-gray-500">¿Qué quieres compartir con la comunidad?</span>
            </div>
          </button>
        </div>

        {/* Posts feed */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                {/* Post header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-3xl">{post.author.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-900">{post.author.name}</h3>
                      {post.author.verified && <span className="text-blue-500">✓</span>}
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                    {post.isLive && (
                      <div className="mt-1">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          🔴 EN VIVO
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
                    } text-white`}>
                      {categories.find(c => c.id === post.category)?.icon} {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Post content */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  
                  {post.images && (
                    <div className="flex space-x-2 mt-3">
                      {post.images.map((img, index) => (
                        <div key={index} className="text-4xl">{img}</div>
                      ))}
                    </div>
                  )}
                  
                  {post.link && (
                    <a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 p-3 border border-blue-200 rounded-lg hover:bg-blue-50"
                    >
                      <span className="text-blue-600 hover:text-blue-800 text-sm">
                        🔗 Ver enlace completo →
                      </span>
                    </a>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                      <span>👍</span>
                      <span>{post.engagement.likes}</span>
                    </button>
                    <button 
                      onClick={() => openPostDetail(post)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition"
                    >
                      <span>💬</span>
                      <span>{post.engagement.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
                      <span>📤</span>
                      <span>{post.engagement.shares}</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => openPostDetail(post)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Ver completo →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create post modal */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Crear nuevo post</h3>
                  <button 
                    onClick={() => setShowPostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      {categories.filter(c => c.id !== 'todos').map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido
                    </label>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Comparte tu opinión, pregunta, propuesta o noticia con la comunidad..."
                      className="w-full border rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-blue-500">
                      📷 Imagen
                    </button>
                    <button className="text-gray-400 hover:text-purple-500">
                      🎥 Video
                    </button>
                    <button className="text-gray-400 hover:text-green-500">
                      🔗 Enlace
                    </button>
                    <button className="text-gray-400 hover:text-yellow-500">
                      📊 Encuesta
                    </button>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      onClick={() => setShowPostModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleNewPost}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;