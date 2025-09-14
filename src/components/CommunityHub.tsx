import React, { useState } from 'react';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  topic: string;
  type: 'discussion' | 'news_share' | 'poll' | 'video';
  reactions: { [emoji: string]: number };
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'discussions' | 'create'>('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('general');

  const topics = [
    { id: 'general', name: 'General', icon: '💬' },
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economics', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'environment', name: 'Ambiente', icon: '🌱' },
    { id: 'education', name: 'Educación', icon: '📚' },
    { id: 'health', name: 'Salud', icon: '🏥' }
  ];

  const mockPosts: Post[] = [
    {
      id: '1',
      author: 'María González',
      content: '¿Qué opinan sobre la nueva reforma educativa? Me parece que tiene puntos buenos pero también algunas preocupaciones...',
      timestamp: 'hace 2 horas',
      likes: 45,
      topic: 'Educación',
      type: 'discussion',
      reactions: { '👍': 23, '❤️': 12, '🤔': 8, '😢': 2 },
      comments: [
        {
          id: '1-1',
          author: 'Carlos Rodríguez',
          content: 'Estoy de acuerdo, especialmente en el tema de la financiación',
          timestamp: 'hace 1 hora',
          likes: 12
        }
      ]
    },
    {
      id: '2',
      author: 'Ana Martínez',
      content: 'Acabo de encontrar este artículo muy interesante sobre energías renovables en Colombia. ¿Qué piensan?',
      timestamp: 'hace 4 horas',
      likes: 78,
      topic: 'Ambiente',
      type: 'news_share',
      reactions: { '👍': 45, '❤️': 20, '💚': 13 },
      comments: []
    }
  ];

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'Tú',
        content: newPost,
        timestamp: 'ahora',
        likes: 0,
        topic: topics.find(t => t.id === selectedTopic)?.name || 'General',
        type: 'discussion',
        reactions: {},
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setActiveTab('feed');
    }
  };

  const addReaction = (postId: string, emoji: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        return { ...post, reactions: newReactions };
      }
      return post;
    }));
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">💬 Hub Comunitario</h1>
          <p className="text-purple-100">
            Comparte, discute y conecta con otros colombianos sobre los temas que más te importan
          </p>
          <div className="mt-4 flex items-center space-x-6 text-purple-100">
            <span>👥 2,847 miembros activos</span>
            <span>💬 156 discusiones activas</span>
            <span>🔥 23 temas trending</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          {[
            { key: 'feed', label: '🏠 Feed', description: 'Publicaciones recientes' },
            { key: 'trending', label: '🔥 Trending', description: 'Temas populares' },
            { key: 'discussions', label: '💭 Discusiones', description: 'Debates activos' },
            { key: 'create', label: '✏️ Crear', description: 'Nueva publicación' }
          ].map(({ key, label, description }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div>{label}</div>
              <div className="text-xs opacity-80">{description}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">📋 Temas</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedTopic === topic.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">👥 Usuarios Activos</h3>
              <div className="space-y-3">
                {['María González', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Pérez'].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700">{user}</span>
                    <span className="text-xs text-green-500">●</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post Tab */}
            {activeTab === 'create' && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">✏️ Crear Nueva Publicación</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tema:
                    </label>
                    <select 
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.icon} {topic.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="¿Qué quieres discutir con la comunidad?"
                    className="w-full border rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                        📎 Adjuntar
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                        📊 Encuesta
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                        📷 Imagen
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                              {post.topic}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        ⋯
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {/* Reactions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {Object.entries(post.reactions).map(([emoji, count]) => (
                            <span key={emoji} className="text-sm">
                              {emoji} {count}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{post.likes} me gusta</span>
                        <span className="text-sm text-gray-500">{post.comments.length} comentarios</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-4">
                        <button 
                          onClick={() => likePost(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <span>👍</span>
                          <span>Me gusta</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <span>💬</span>
                          <span>Comentar</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <span>📤</span>
                          <span>Compartir</span>
                        </button>
                      </div>
                      <div className="flex space-x-1">
                        {['❤️', '😂', '😢', '😡', '👏'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => addReaction(post.id, emoji)}
                            className="hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comments */}
                    {post.comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Trending Tab */}
            {activeTab === 'trending' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">🔥 Temas Trending</h3>
                <div className="space-y-4">
                  {[
                    { topic: 'Reforma tributaria 2024', posts: 45, trend: '+15%' },
                    { topic: 'Elecciones regionales', posts: 32, trend: '+8%' },
                    { topic: 'Política ambiental', posts: 28, trend: '+12%' },
                    { topic: 'Educación pública', posts: 23, trend: '+5%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.topic}</h4>
                        <p className="text-sm text-gray-600">{item.posts} publicaciones</p>
                      </div>
                      <span className="text-green-600 font-medium text-sm">{item.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">💭 Discusiones Activas</h3>
                <div className="space-y-4">
                  {posts.filter(p => p.type === 'discussion').map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900 mb-2">{post.content.substring(0, 100)}...</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Por {post.author}</span>
                        <div className="flex items-center space-x-4">
                          <span>{post.comments.length} respuestas</span>
                          <span>{post.likes} votos</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;