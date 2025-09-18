import React, { useState, useEffect } from 'react';
import { FiUsers, FiShare2, FiHeart, FiMessageCircle, FiSearch, FiPlus, FiTrendingUp, FiGlobe, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

interface ComunidadPassportProps {
  onLoginSuccess?: (user: User) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  contributions: number;
  level: 'Novato' | 'Ciudadano' | 'Activista' | 'Líder';
}

interface CommunityPost {
  id: string;
  author: User;
  content: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'marketplace';
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  isLiked: boolean;
  media?: string;
  location?: string;
  tags: string[];
}

interface FriendRequest {
  id: string;
  from: User;
  timestamp: string;
  mutual: number;
}

const ComunidadPassport: React.FC<ComunidadPassportProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        name: name || 'Usuario Demo',
        email,
        avatar: '👤',
        location: location || 'Bogotá, Colombia',
        joinDate: new Date().toISOString(),
        contributions: 15,
        level: 'Ciudadano'
      };
      onLoginSuccess?.(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🇨🇴</div>
          <h1 className="text-2xl font-bold text-gray-900">Comunidad Passport</h1>
          <p className="text-gray-600 text-sm mt-2">
            Tu pasaporte a la participación ciudadana en Colombia
          </p>
        </div>

        {/* Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Ingresar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre completo"
                  required={!isLogin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                >
                  <option value="">Selecciona tu ciudad</option>
                  <option value="Bogotá, Colombia">Bogotá</option>
                  <option value="Medellín, Colombia">Medellín</option>
                  <option value="Cali, Colombia">Cali</option>
                  <option value="Barranquilla, Colombia">Barranquilla</option>
                  <option value="Cartagena, Colombia">Cartagena</option>
                  <option value="Bucaramanga, Colombia">Bucaramanga</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Ingresando...' : 'Creando cuenta...'}
              </div>
            ) : (
              isLogin ? 'Ingresar a la Comunidad' : 'Crear Passport'
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FaFacebook className="text-blue-600 w-5 h-5 mr-2" />
              Facebook
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FaWhatsapp className="text-green-500 w-5 h-5 mr-2" />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Terms */}
        {!isLogin && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            Al crear tu Comunidad Passport, aceptas nuestros{' '}
            <a href="#" className="text-blue-600 hover:underline">Términos de Servicio</a> y{' '}
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a>
          </p>
        )}
      </div>
    </div>
  );
};

const SuperchargedCommunityHub: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [activeTab, setActiveTab] = useState<'feed' | 'reels' | 'marketplace' | 'friends'>('feed');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockUser: User = {
      id: '1',
      name: 'Ana García',
      email: 'ana@email.com',
      avatar: '👩‍💼',
      location: 'Bogotá, Colombia',
      joinDate: '2023-01-15',
      contributions: 127,
      level: 'Activista'
    };

    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        author: {
          id: '2',
          name: 'Carlos Mendoza',
          email: 'carlos@email.com',
          avatar: '👨‍🎓',
          location: 'Medellín, Colombia',
          joinDate: '2023-03-20',
          contributions: 89,
          level: 'Ciudadano'
        },
        content: '¿Qué opinan sobre la nueva propuesta de reforma educativa? Me parece que necesitamos más inversión en infraestructura digital para las escuelas rurales. #EducaciónColombia',
        type: 'text',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 24,
        comments: 8,
        shares: 3,
        category: 'educacion',
        isLiked: false,
        location: 'Medellín, Colombia',
        tags: ['educacion', 'reforma', 'escuelas']
      },
      {
        id: '2',
        author: {
          id: '3',
          name: 'María José Rodríguez',
          email: 'majo@email.com',
          avatar: '👩‍⚕️',
          location: 'Cali, Colombia',
          joinDate: '2023-02-10',
          contributions: 156,
          level: 'Líder'
        },
        content: 'Organizando una jornada de limpieza en el río Cali este sábado. ¡Únete y ayudemos a cuidar nuestro medio ambiente! 🌱',
        type: 'image',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 67,
        comments: 15,
        shares: 12,
        category: 'medio-ambiente',
        isLiked: true,
        media: '🌊',
        location: 'Cali, Colombia',
        tags: ['medio-ambiente', 'voluntariado', 'cali']
      }
    ];

    const mockRequests: FriendRequest[] = [
      {
        id: '1',
        from: {
          id: '4',
          name: 'Andrés López',
          email: 'andres@email.com',
          avatar: '👨‍💻',
          location: 'Barranquilla, Colombia',
          joinDate: '2023-04-05',
          contributions: 45,
          level: 'Ciudadano'
        },
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        mutual: 3
      }
    ];

    setCurrentUser(mockUser);
    setPosts(mockPosts);
    setFriendRequests(mockRequests);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleShare = (post: CommunityPost, platform: string) => {
    const shareText = `${post.content} - Vía Nuestro Pulso`;
    const shareUrl = `https://nuestropulso.co/post/${post.id}`;
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'youtube':
        // For demonstration - in real app this would integrate with YouTube API
        console.log('Sharing to YouTube Community tab:', post);
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const createNewPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: currentUser!,
      content: newPostContent,
      type: 'text',
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      category: 'general',
      isLiked: false,
      tags: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPost(false);
  };

  if (!currentUser) {
    return <ComunidadPassport onLoginSuccess={setCurrentUser} />;
  }

  const renderPost = (post: CommunityPost) => (
    <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{post.author.avatar}</div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {post.author.level}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{post.location && `📍 ${post.location}`}</span>
              <span>•</span>
              <span>{new Date(post.timestamp).toLocaleDateString('es-CO')}</span>
            </div>
          </div>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          #{post.category}
        </span>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
        {post.media && (
          <div className="bg-gray-100 rounded-lg p-8 text-center text-4xl">
            {post.media}
          </div>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs text-blue-600 hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600 transition-colors`}
          >
            <FiHeart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <FiMessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <FiShare2 className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
            {/* Share Menu */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] z-10">
              <button
                onClick={() => handleShare(post, 'whatsapp')}
                className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                <FaWhatsapp className="text-green-500 w-4 h-4" />
                <span>Compartir en WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare(post, 'facebook')}
                className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                <FaFacebook className="text-blue-600 w-4 h-4" />
                <span>Compartir en Facebook</span>
              </button>
              <button
                onClick={() => handleShare(post, 'twitter')}
                className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                <FaTwitter className="text-blue-400 w-4 h-4" />
                <span>Compartir en Twitter</span>
              </button>
              <button
                onClick={() => handleShare(post, 'youtube')}
                className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                <FaYoutube className="text-red-600 w-4 h-4" />
                <span>Compartir en YouTube</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en la comunidad..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-medium text-gray-900">{currentUser.name}</div>
                <div className="text-sm text-gray-500">{currentUser.level} • {currentUser.contributions} contribuciones</div>
              </div>
              <div className="text-3xl">{currentUser.avatar}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mt-4">
            {[
              { id: 'feed', label: 'Feed', icon: FiUsers },
              { id: 'reels', label: 'Reels', icon: FiTrendingUp },
              { id: 'marketplace', label: 'Marketplace', icon: FiGlobe },
              { id: 'friends', label: 'Amigos', icon: FiUsers }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'feed' && (
          <>
            {/* New Post */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{currentUser.avatar}</div>
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  ¿Qué estás pensando, {currentUser.name.split(' ')[0]}?
                </button>
              </div>

              {showNewPost && (
                <div className="space-y-4">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Comparte tu opinión, una propuesta o inicia un debate..."
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>📍 {currentUser.location}</span>
                      <span>👥 Público</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowNewPost(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={createNewPost}
                        disabled={!newPostContent.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        Publicar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Posts Feed */}
            <div>
              {posts.map(renderPost)}
            </div>
          </>
        )}

        {activeTab === 'friends' && (
          <div className="space-y-6">
            {/* Friend Requests */}
            {friendRequests.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Solicitudes de amistad</h2>
                {friendRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{request.from.avatar}</div>
                      <div>
                        <div className="font-medium text-gray-900">{request.from.name}</div>
                        <div className="text-sm text-gray-500">
                          {request.from.location} • {request.mutual} amigos en común
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Aceptar
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Friend Finder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Encuentra amigos</h2>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaWhatsapp className="text-green-500 w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">Importar de WhatsApp</div>
                    <div className="text-sm text-gray-500">Encuentra amigos de tus contactos</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaFacebook className="text-blue-600 w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">Conectar con Facebook</div>
                    <div className="text-sm text-gray-500">Encuentra amigos de Facebook</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiMapPin className="text-red-500 w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">Ciudadanos cercanos</div>
                    <div className="text-sm text-gray-500">Conecta con gente de tu zona</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'reels' || activeTab === 'marketplace') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === 'reels' ? 'Reels Mejorados' : 'Marketplace Comunitario'}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'reels' 
                ? 'Videos cortos con engagement social y métricas de tendencias'
                : 'Comparte y descubre oportunidades en tu comunidad'
              }
            </p>
            <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                Esta funcionalidad estará disponible en la próxima actualización con integración completa de APIs
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperchargedCommunityHub;