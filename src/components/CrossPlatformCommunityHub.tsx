import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaYoutube, 
  FaInstagram,
  FaTiktok,
  FaUsers,
  FaComments,
  FaShare,
  FaEye,
  FaPlay,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { BiLike, BiComment, BiShare } from 'react-icons/bi';
import { MdLiveTv, MdVerified } from 'react-icons/md';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  followers: string;
  isConnected: boolean;
  lastActivity: string;
}

interface CommunityPost {
  id: string;
  platform: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  verified?: boolean;
  avatar?: string;
  image?: string;
  videoUrl?: string;
}

const CrossPlatformCommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      followers: '45.2K',
      isConnected: true,
      lastActivity: 'Hace 5 min'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: <FaTwitter className="w-5 h-5" />,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      followers: '32.8K',
      isConnected: true,
      lastActivity: 'Hace 2 min'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      followers: '12.5K',
      isConnected: true,
      lastActivity: 'Hace 1 min'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      followers: '28.9K',
      isConnected: true,
      lastActivity: 'Hace 10 min'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      followers: '18.7K',
      isConnected: true,
      lastActivity: 'Hace 15 min'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <FaTiktok className="w-5 h-5" />,
      color: 'text-gray-800',
      bgColor: 'bg-gray-50',
      followers: '24.1K',
      isConnected: true,
      lastActivity: 'Hace 8 min'
    }
  ]);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      platform: 'twitter',
      author: 'María Fernanda González',
      content: 'Excelente análisis sobre la nueva reforma educativa. Colombia necesita más debates como estos. #EducaciónParaTodos',
      timestamp: 'Hace 5 minutos',
      likes: 127,
      comments: 23,
      shares: 15,
      verified: true,
      avatar: '👩‍🏫'
    },
    {
      id: '2',
      platform: 'facebook',
      author: 'Carlos Mendoza',
      content: 'La participación ciudadana en Nuestro Pulso es inspiradora. Por fin una plataforma que nos da voz real.',
      timestamp: 'Hace 12 minutos',
      likes: 89,
      comments: 31,
      shares: 8,
      avatar: '👨‍💼'
    },
    {
      id: '3',
      platform: 'youtube',
      author: 'Nuestro Pulso Oficial',
      content: '🔴 EN VIVO: Debate sobre el futuro energético de Colombia. ¡Únete a la conversación!',
      timestamp: 'Hace 20 minutos',
      likes: 234,
      comments: 67,
      shares: 45,
      verified: true,
      videoUrl: 'https://youtube.com/watch?v=example',
      avatar: '📺'
    },
    {
      id: '4',
      platform: 'whatsapp',
      author: 'Grupo Ciudadanos Activos',
      content: 'Compartiendo el último reporte sobre transparencia gubernamental. Muy importante para todos.',
      timestamp: 'Hace 35 minutos',
      likes: 156,
      comments: 42,
      shares: 28,
      avatar: '👥'
    }
  ]);

  const [liveStats, setLiveStats] = useState({
    totalMembers: 127543,
    onlineNow: 3847,
    postsToday: 892,
    discussionsActive: 156
  });

  const handlePlatformConnect = (platformId: string) => {
    setSocialPlatforms(platforms => 
      platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, isConnected: !platform.isConnected }
          : platform
      )
    );
  };

  const handlePostAction = (postId: string, action: 'like' | 'comment' | 'share') => {
    setCommunityPosts(posts => 
      posts.map(post => {
        if (post.id === postId) {
          switch (action) {
            case 'like':
              return { ...post, likes: post.likes + 1 };
            case 'comment':
              return { ...post, comments: post.comments + 1 };
            case 'share':
              return { ...post, shares: post.shares + 1 };
            default:
              return post;
          }
        }
        return post;
      })
    );
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform ? platform.icon : <FaUsers className="w-4 h-4" />;
  };

  const getPlatformColor = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform ? platform.color : 'text-gray-600';
  };

  const filteredPosts = activeTab === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.platform === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🌐 Community Hub
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Conecta, participa y construye el futuro de Colombia
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <FaUsers className="w-4 h-4" />
                <span className="text-sm font-medium">Miembros</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{liveStats.totalMembers.toLocaleString()}</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <MdLiveTv className="w-4 h-4" />
                <span className="text-sm font-medium">En línea</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{liveStats.onlineNow.toLocaleString()}</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <FaComments className="w-4 h-4" />
                <span className="text-sm font-medium">Posts hoy</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{liveStats.postsToday}</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <FaEye className="w-4 h-4" />
                <span className="text-sm font-medium">Debates activos</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{liveStats.discussionsActive}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Platform Connections */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaShare className="w-5 h-5 text-blue-600" />
                Plataformas Conectadas
              </h2>
              
              <div className="space-y-4">
                {socialPlatforms.map((platform) => (
                  <div key={platform.id} className="group">
                    <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      platform.isConnected ? platform.bgColor : 'bg-gray-50'
                    } hover:shadow-md cursor-pointer`}
                      onClick={() => handlePlatformConnect(platform.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${platform.isConnected ? 'bg-white' : 'bg-gray-200'}`}>
                          <div className={platform.isConnected ? platform.color : 'text-gray-400'}>
                            {platform.icon}
                          </div>
                        </div>
                        <div>
                          <p className={`font-medium ${platform.isConnected ? 'text-gray-900' : 'text-gray-500'}`}>
                            {platform.name}
                          </p>
                          {platform.isConnected && (
                            <p className="text-sm text-gray-500">{platform.followers} seguidores</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`w-3 h-3 rounded-full ${
                        platform.isConnected ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    
                    {platform.isConnected && (
                      <p className="text-xs text-gray-500 mt-2 ml-4">
                        {platform.lastActivity}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Conectar más plataformas
              </button>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 p-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todas las plataformas
                </button>
                
                {socialPlatforms.filter(p => p.isConnected).map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === platform.id
                        ? `${platform.bgColor} ${platform.color} shadow-md border-2 border-current`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {platform.icon}
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Post Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900">{post.author}</p>
                            {post.verified && (
                              <MdVerified className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className={getPlatformColor(post.platform)}>
                              {getPlatformIcon(post.platform)}
                            </div>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                      {post.content}
                    </p>
                    
                    {post.videoUrl && (
                      <div className="bg-gray-100 rounded-xl p-8 text-center mb-4">
                        <FaPlay className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">Video de YouTube</p>
                        <button className="mt-2 text-red-600 font-bold hover:underline">
                          Ver en YouTube
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handlePostAction(post.id, 'like')}
                          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
                        >
                          <BiLike className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => handlePostAction(post.id, 'comment')}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                        >
                          <BiComment className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        
                        <button
                          onClick={() => handlePostAction(post.id, 'share')}
                          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                        >
                          <BiShare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.shares}</span>
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Cargar más publicaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossPlatformCommunityHub;