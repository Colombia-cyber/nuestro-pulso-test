import React, { useState, useEffect } from 'react';
import ContentService, { SocialMediaPost, NewsArticle } from '../services/contentService';

interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  platform: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  category: string;
  type: 'chat' | 'comment' | 'share' | 'original';
  relatedContent?: {
    type: 'news' | 'video' | 'debate';
    id: string;
    title: string;
  };
}

const CommunityHub: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  const contentService = ContentService.getInstance();

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🌐' },
    { id: 'política', name: 'Política', icon: '🏛️' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'social', name: 'Social', icon: '🤝' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'seguridad', name: 'Seguridad', icon: '🛡️' }
  ];

  // Mock community posts data
  const mockCommunityPosts: CommunityPost[] = [
    {
      id: 'c1',
      author: 'María González',
      content: 'Excelente análisis sobre la reforma tributaria. Como ciudadana, creo que estas medidas pueden impulsar el crecimiento económico si se implementan correctamente. ¿Qué opinan otros miembros de la comunidad?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      platform: 'Nuestro Pulso',
      engagement: { likes: 23, shares: 5, comments: 8 },
      category: 'economia',
      type: 'comment',
      relatedContent: {
        type: 'news',
        id: 'n3',
        title: 'Centro Democrático propone reducción de impuestos para empresas'
      }
    },
    {
      id: 'c2',
      author: 'Carlos Rodríguez',
      content: 'Participé en el debate sobre renta básica universal y quedé muy impresionado con la calidad de los argumentos. La plataforma realmente fomenta el diálogo constructivo. #ParticipacionCiudadana',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      platform: 'Nuestro Pulso',
      engagement: { likes: 34, shares: 12, comments: 6 },
      category: 'participacion',
      type: 'chat',
      relatedContent: {
        type: 'debate',
        id: 'renta-basica',
        title: '¿Debería Colombia implementar una renta básica universal?'
      }
    },
    {
      id: 'c3',
      author: 'Ana Martínez',
      content: 'Compartiendo desde Instagram: Los jóvenes tenemos voz y voto en el futuro del país. Me encanta ver cómo esta plataforma conecta diferentes generaciones para dialogar sobre temas importantes.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      platform: 'Instagram',
      engagement: { likes: 89, shares: 23, comments: 15 },
      category: 'social',
      type: 'share'
    },
    {
      id: 'c4',
      author: 'Luis Pérez',
      content: 'Preocupante la situación de seguridad en las ciudades. Es fundamental que los ciudadanos participemos activamente en las soluciones. Las veedurías ciudadanas son clave.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      platform: 'Facebook',
      engagement: { likes: 45, shares: 18, comments: 12 },
      category: 'seguridad',
      type: 'original'
    },
    {
      id: 'c5',
      author: 'Patricia Silva',
      content: 'El video sobre políticas conservadoras me ayudó a entender mejor las diferentes perspectivas. Es importante tener información equilibrada para tomar decisiones informadas. 🗳️',
      timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      platform: 'YouTube',
      engagement: { likes: 67, shares: 14, comments: 9 },
      category: 'política',
      type: 'comment',
      relatedContent: {
        type: 'video',
        id: 'v2',
        title: 'Candidatos conservadores: Sus propuestas principales'
      }
    }
  ];

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const socialData = await contentService.fetchSocialPosts();
        setSocialPosts(socialData);
        setPosts(mockCommunityPosts);
      } catch (error) {
        console.error('Error loading community content:', error);
        setPosts(mockCommunityPosts);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newCommunityPost: CommunityPost = {
        id: `c${Date.now()}`,
        author: 'Usuario Actual',
        content: newPost,
        timestamp: new Date().toISOString(),
        platform: 'Nuestro Pulso',
        engagement: { likes: 0, shares: 0, comments: 0 },
        category: selectedCategory === 'todos' ? 'social' : selectedCategory,
        type: 'original'
      };
      
      setPosts([newCommunityPost, ...posts]);
      setNewPost('');
    }
  };

  const filteredPosts = selectedCategory === 'todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const filteredSocialPosts = selectedCategory === 'todos'
    ? socialPosts
    : socialPosts.filter(post => post.category === selectedCategory);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return '🐦';
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'youtube': return '🎥';
      case 'nuestro pulso': return '🇨🇴';
      default: return '💬';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return '💬';
      case 'comment': return '💭';
      case 'share': return '🔄';
      case 'original': return '✍️';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando contenido de la comunidad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🏛️ Community Hub</h1>
          <p className="text-white/90">Espacio donde convergen todas las voces de la comunidad cívica</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>💬 Chats en vivo</span>
            <span>📝 Comentarios y artículos</span>
            <span>🔄 Contenido de redes sociales</span>
            <span>🤝 Interacción cross-platform</span>
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
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* New Post Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">💭 Comparte tu perspectiva</h3>
          <div className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué piensas sobre los temas de actualidad? Comparte tu opinión, haz una pregunta o inicia un debate..."
              className="w-full border rounded-lg px-4 py-3 h-24 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>💡 Puedes referenciar noticias, debates o videos</span>
                <span>🔗 Incluye enlaces a contenido relacionado</span>
              </div>
              <button
                onClick={handlePostSubmit}
                disabled={!newPost.trim()}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 font-semibold"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Community Posts */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🏛️</span>
              Conversaciones de la Comunidad
            </h3>
            
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getPlatformIcon(post.platform)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{post.author}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {post.platform}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTypeIcon(post.type)} {post.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.timestamp).toLocaleString('es-CO')}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                      
                      {post.relatedContent && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                          <p className="text-sm text-blue-800">
                            <strong>Relacionado:</strong> {post.relatedContent.type} - {post.relatedContent.title}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                            <span>👍</span>
                            <span>{post.engagement.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-600 transition">
                            <span>🔄</span>
                            <span>{post.engagement.shares}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-purple-600 transition">
                            <span>💬</span>
                            <span>{post.engagement.comments}</span>
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Responder
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            Compartir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Feed */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">📱</span>
              Feed Social
            </h3>
            
            <div className="space-y-4">
              {filteredSocialPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                    <div>
                      <p className="font-semibold text-sm">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.authorHandle}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  
                  {post.media && (
                    <div className="bg-gray-100 rounded p-2 mb-3 text-center">
                      <span className="text-2xl">{post.media.thumbnail}</span>
                      <p className="text-xs text-gray-600 mt-1">{post.media.type}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.hashtags.map((hashtag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex space-x-3">
                      <span>👍 {post.engagement.likes}</span>
                      <span>🔄 {post.engagement.shares}</span>
                      <span>💬 {post.engagement.comments}</span>
                      {post.engagement.views && <span>👁️ {post.engagement.views}</span>}
                    </div>
                    <span>{new Date(post.publishedAt).toLocaleString('es-CO')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending Topics */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-3">🔥 Trending en Comunidad</h4>
              <div className="space-y-2">
                {[
                  '#ReformaTributaria',
                  '#ParticipacionCiudadana',
                  '#SeguridadColombia',
                  '#PoliticaConservadora',
                  '#CambioClimatico'
                ].map((trend, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                      {trend}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {Math.floor(Math.random() * 500 + 100)} menciones
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;