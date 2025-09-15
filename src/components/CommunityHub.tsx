import React, { useState, useEffect } from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiPlus, FiTrendingUp, FiUsers, FiEdit3, FiX } from 'react-icons/fi';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    role?: string;
  };
  content: string;
  images?: string[];
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    liked: boolean;
  };
  type: 'text' | 'poll' | 'discussion' | 'announcement';
  category: string;
  hashtags: string[];
  comments?: CommunityComment[];
}

interface CommunityComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: CommunityComment[];
}

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'my-posts'>('feed');
  const [newPost, setNewPost] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  // Sample community posts
  const samplePosts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'María González',
        avatar: '👩‍💼',
        verified: true,
        role: 'Líder Comunitaria'
      },
      content: '¿Qué opinan sobre la nueva propuesta de transporte público en Bogotá? He leído que incluye 200 buses eléctricos nuevos y ciclovías conectadas. Como ciudadana que usa transporte público diariamente, creo que es un paso importante hacia la sostenibilidad. #TransportePublico #Bogotá #Sostenibilidad',
      timestamp: 'hace 2 horas',
      engagement: {
        likes: 234,
        comments: 45,
        shares: 18,
        liked: false
      },
      type: 'discussion',
      category: 'Transporte',
      hashtags: ['#TransportePublico', '#Bogotá', '#Sostenibilidad'],
      comments: [
        {
          id: '1-1',
          author: { name: 'Carlos Ruiz', avatar: '👨‍🔧', verified: false },
          content: 'Excelente iniciativa. Como mecánico que trabaja con buses, puedo decir que la tecnología eléctrica ya está madura y es más eficiente.',
          timestamp: 'hace 1 hora',
          likes: 23,
          liked: false
        },
        {
          id: '1-2',
          author: { name: 'Ana Martínez', avatar: '🚴‍♀️', verified: true },
          content: 'Las ciclovías son fundamentales. Espero que realmente conecten todos los sectores y no sean solo tramos aislados.',
          timestamp: 'hace 45 min',
          likes: 18,
          liked: false
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Fundación Transparencia',
        avatar: '🏛️',
        verified: true,
        role: 'Organización Verificada'
      },
      content: '🚨 ALERTA CIUDADANA: Detectamos irregularidades en la contratación del proyecto de infraestructura vial en Norte de Santander. Los ciudadanos pueden consultar los documentos en nuestro portal de transparencia y reportar cualquier anomalía adicional.',
      timestamp: 'hace 4 horas',
      engagement: {
        likes: 567,
        comments: 89,
        shares: 156,
        liked: true
      },
      type: 'announcement',
      category: 'Transparencia',
      hashtags: ['#Transparencia', '#Corrupcion', '#NorteDeSantander']
    },
    {
      id: '3',
      author: {
        name: 'Luis Pérez',
        avatar: '🌱',
        verified: false,
        role: 'Activista Ambiental'
      },
      content: 'Increíble noticia: La reforestación en la cuenca del río Magdalena ya alcanzó 50,000 árboles plantados este año. Como comunidad hemos logrado recuperar 200 hectáreas. Esto demuestra que cuando los ciudadanos nos organizamos, podemos generar cambios reales. 🌳💚 #MedioAmbiente #RioMagdalena #Reforestacion',
      images: ['🌳', '🌊', '🌿'],
      timestamp: 'hace 6 horas',
      engagement: {
        likes: 445,
        comments: 67,
        shares: 89,
        liked: false
      },
      type: 'text',
      category: 'Medio Ambiente',
      hashtags: ['#MedioAmbiente', '#RioMagdalena', '#Reforestacion']
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            engagement: {
              ...post.engagement,
              likes: post.engagement.liked ? post.engagement.likes - 1 : post.engagement.likes + 1,
              liked: !post.engagement.liked
            }
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post: CommunityPost = {
        id: Date.now().toString(),
        author: {
          name: 'Tú',
          avatar: '👤',
          verified: false
        },
        content: newPost,
        timestamp: 'ahora',
        engagement: {
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false
        },
        type: 'text',
        category: 'General',
        hashtags: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPostModal(false);
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'poll': return '📊';
      case 'discussion': return '💬';
      case 'announcement': return '📢';
      default: return '💭';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'poll': return 'bg-purple-100 text-purple-800';
      case 'discussion': return 'bg-blue-100 text-blue-800';
      case 'announcement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">🤝 Hub Comunitario</h1>
            <p className="text-white/90 mb-6">
              Conecta, comparte y participa en conversaciones que construyen el futuro de Colombia
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <FiUsers className="w-4 h-4" />
                15,847 ciudadanos activos
              </span>
              <span className="flex items-center gap-1">
                <FiMessageCircle className="w-4 h-4" />
                2,456 discusiones hoy
              </span>
              <span className="flex items-center gap-1">
                <FiTrendingUp className="w-4 h-4" />
                #TransparenciaGobierno trending
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { key: 'feed', label: 'Feed Comunitario', icon: '🏠' },
                { key: 'trending', label: 'Trending', icon: '🔥' },
                { key: 'my-posts', label: 'Mis Publicaciones', icon: '📝' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* New Post Button */}
            <button
              onClick={() => setShowNewPostModal(true)}
              className="w-full bg-white rounded-lg p-4 text-left text-gray-500 hover:bg-gray-50 transition border-2 border-dashed border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-center gap-3">
                <FiEdit3 className="w-5 h-5" />
                <span>¿Qué está pasando en tu comunidad? Comparte tu opinión...</span>
              </div>
            </button>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{post.author.avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        {post.author.verified && (
                          <span className="text-blue-500" title="Verificado">✓</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                          {getPostTypeIcon(post.type)} {post.type === 'discussion' ? 'Discusión' : 
                            post.type === 'announcement' ? 'Anuncio' : 
                            post.type === 'poll' ? 'Encuesta' : 'Publicación'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {post.author.role && <span>{post.author.role}</span>}
                        <span>•</span>
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <FiMoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  
                  {/* Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="mt-3 flex gap-2">
                      {post.images.map((img, index) => (
                        <div key={index} className="text-4xl bg-gray-100 p-3 rounded-lg">
                          {img}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hashtags */}
                  {post.hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Engagement Bar */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition ${
                        post.engagement.liked 
                          ? 'text-red-600' 
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <FiHeart className={`w-5 h-5 ${post.engagement.liked ? 'fill-current' : ''}`} />
                      <span>{post.engagement.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleComment(post.id)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
                    >
                      <FiMessageCircle className="w-5 h-5" />
                      <span>{post.engagement.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition">
                      <FiShare2 className="w-5 h-5" />
                      <span>{post.engagement.shares}</span>
                    </button>
                  </div>

                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Ver conversación completa
                  </button>
                </div>

                {/* Comments Section */}
                {expandedComments.has(post.id) && post.comments && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="text-xl">{comment.author.avatar}</div>
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{comment.author.name}</span>
                              {comment.author.verified && (
                                <span className="text-blue-500 text-xs">✓</span>
                              )}
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-800 text-sm">{comment.content}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600">
                                <FiHeart className="w-3 h-3" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-xs text-gray-600 hover:text-blue-600">
                                Responder
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Comment */}
                    <div className="mt-4 flex gap-3">
                      <div className="text-xl">👤</div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Escribe un comentario..."
                          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2">
                          <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700">
                            Comentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition border">
              Cargar más publicaciones
            </button>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Nueva Publicación</h3>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="¿Qué está pasando en tu comunidad? Comparte tu opinión, propuesta o pregunta..."
                  className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={6}
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      📷 Imagen
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      📊 Encuesta
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      🏷️ Categoría
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowNewPostModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleNewPost}
                      disabled={!newPost.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;