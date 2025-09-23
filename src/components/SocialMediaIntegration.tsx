import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaYoutube, 
  FaInstagram, 
  FaTiktok,
  FaShare,
  FaUsers,
  FaPlay,
  FaLink,
  FaHeart,
  FaComment,
  FaEye
} from 'react-icons/fa';
import { MdVerified, MdLiveTv, MdGroup } from 'react-icons/md';
import { BiTrendingUp, BiVideo } from 'react-icons/bi';
import useAppStore from '../stores/appStore';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
  followers: number;
  engagement: number;
  features: string[];
}

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  type: 'text' | 'image' | 'video' | 'link';
  media?: {
    url: string;
    thumbnail?: string;
    duration?: string;
  };
  hashtags: string[];
  isLive?: boolean;
  trending?: boolean;
}

interface SocialMediaIntegrationProps {
  articleId?: string;
  enableSharing?: boolean;
  enableEmbedding?: boolean;
  showLiveFeed?: boolean;
  enableGroupIntegration?: boolean;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  articleId,
  enableSharing = true,
  enableEmbedding = true,
  showLiveFeed = true,
  enableGroupIntegration = true
}) => {
  const { addNotification } = useAppStore();
  const [activeTab, setActiveTab] = useState<'share' | 'embed' | 'feed' | 'groups'>('share');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook', 'twitter']);
  const [shareContent, setShareContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const platforms: SocialPlatform[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      color: 'bg-blue-600',
      connected: true,
      followers: 25600,
      engagement: 8.4,
      features: ['posts', 'groups', 'pages', 'events', 'live']
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: <FaTwitter className="w-5 h-5" />,
      color: 'bg-black',
      connected: true,
      followers: 18900,
      engagement: 12.3,
      features: ['tweets', 'spaces', 'communities', 'live_tweets']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: 'bg-green-600',
      connected: true,
      followers: 5600,
      engagement: 45.6,
      features: ['messages', 'groups', 'channels', 'business']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5" />,
      color: 'bg-red-600',
      connected: true,
      followers: 12400,
      engagement: 15.7,
      features: ['videos', 'shorts', 'live', 'community']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      color: 'bg-pink-600',
      connected: false,
      followers: 8900,
      engagement: 22.1,
      features: ['posts', 'stories', 'reels', 'live']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <FaTiktok className="w-5 h-5" />,
      color: 'bg-black',
      connected: false,
      followers: 45200,
      engagement: 35.8,
      features: ['videos', 'live', 'effects', 'sounds']
    }
  ];

  const socialFeed: SocialPost[] = [
    {
      id: '1',
      platform: 'facebook',
      content: '🇨🇴 Nueva reforma tributaria genera debate ciudadano. ¿Qué opinas? Únete a la conversación en Nuestro Pulso.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      engagement: { likes: 245, comments: 67, shares: 34, views: 1200 },
      author: { name: 'Nuestro Pulso', avatar: '🇨🇴', verified: true },
      type: 'link',
      hashtags: ['#ReformaTributaria', '#Colombia', '#Política'],
      trending: true
    },
    {
      id: '2',
      platform: 'twitter',
      content: 'HILO 🧵 Análisis detallado de la propuesta energética del gobierno. Los ciudadanos merecen información clara y accesible. #EnergíaLimpia #Colombia',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      engagement: { likes: 567, comments: 123, shares: 89, views: 3400 },
      author: { name: '@NuestroPulso', avatar: '📊', verified: true },
      type: 'text',
      hashtags: ['#EnergíaLimpia', '#Colombia', '#Sostenibilidad']
    },
    {
      id: '3',
      platform: 'youtube',
      content: 'Debate Presidencial 2024: Momentos Clave y Análisis Ciudadano',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      engagement: { likes: 1200, comments: 234, shares: 156, views: 45600 },
      author: { name: 'Nuestro Pulso TV', avatar: '📺', verified: true },
      type: 'video',
      media: { url: '#', thumbnail: 'debate-thumbnail.jpg', duration: '15:30' },
      hashtags: ['#DebatePresidencial', '#Colombia2024'],
      isLive: false,
      trending: true
    },
    {
      id: '4',
      platform: 'whatsapp',
      content: '📢 GRUPO ACTUALIZADO: Ciudadanos por la Transparencia - 2,847 miembros activos discutiendo temas cívicos.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      engagement: { likes: 0, comments: 456, shares: 78, views: 2847 },
      author: { name: 'Grupo Cívico', avatar: '👥', verified: false },
      type: 'text',
      hashtags: ['#Transparencia', '#Participación']
    }
  ];

  const facebookGroups = [
    { id: '1', name: 'Ciudadanos por la Transparencia', members: 15600, active: true },
    { id: '2', name: 'Debate Político Colombiano', members: 8900, active: true },
    { id: '3', name: 'Jóvenes Participando', members: 12400, active: false }
  ];

  const whatsappGroups = [
    { id: '1', name: 'Noticias Colombia 🇨🇴', members: 256, active: true },
    { id: '2', name: 'Debate Constructivo', members: 189, active: true },
    { id: '3', name: 'Análisis Político', members: 345, active: false }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleShare = async () => {
    if (!shareContent.trim() || selectedPlatforms.length === 0) return;

    setIsPosting(true);

    // Simulate posting to multiple platforms
    setTimeout(() => {
      setIsPosting(false);
      setShareContent('');
      
      addNotification({
        type: 'success',
        title: 'Contenido compartido',
        message: `Publicado exitosamente en ${selectedPlatforms.length} plataforma(s)`,
        read: false
      });
    }, 2000);
  };

  const handleQuickShare = (platform: string, content: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(content + ' ' + window.location.href)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(content)}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
      
      addNotification({
        type: 'info',
        title: 'Compartir contenido',
        message: `Abriendo ${platform} para compartir`,
        read: false
      });
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaShare className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Integración Social
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { id: 'share', label: 'Compartir', icon: <FaShare className="w-4 h-4" /> },
            { id: 'embed', label: 'Embebido', icon: <FaLink className="w-4 h-4" /> },
            { id: 'feed', label: 'Feed Social', icon: <BiTrendingUp className="w-4 h-4" /> },
            { id: 'groups', label: 'Grupos', icon: <FaUsers className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Status */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {platforms.map(platform => (
          <div 
            key={platform.id}
            className={`p-4 rounded-xl border-2 text-center transition-all hover:scale-105 ${
              platform.connected
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 ${platform.color} rounded-full flex items-center justify-center text-white mx-auto mb-2`}>
              {platform.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{platform.name}</h3>
            <div className="text-xs text-gray-600">
              <div>{formatNumber(platform.followers)} seguidores</div>
              <div>{platform.engagement}% engagement</div>
              <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                platform.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {platform.connected ? '✅ Conectado' : '🔗 Conectar'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'share' && (
        <div className="space-y-6">
          
          {/* Platform Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Seleccionar Plataformas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.filter(p => p.connected).map(platform => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center text-white`}>
                    {platform.icon}
                  </div>
                  <span className="font-medium">{platform.name}</span>
                  {selectedPlatforms.includes(platform.id) && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white ml-auto">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contenido a Compartir</h3>
            <textarea
              value={shareContent}
              onChange={(e) => setShareContent(e.target.value)}
              placeholder="Escribe el contenido que quieres compartir en las redes sociales..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                {shareContent.length}/280 caracteres
              </span>
              <button
                onClick={handleShare}
                disabled={!shareContent.trim() || selectedPlatforms.length === 0 || isPosting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPosting ? 'Publicando...' : `Compartir en ${selectedPlatforms.length} plataforma(s)`}
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Compartir Rápido</h3>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleQuickShare('facebook', 'Interesante artículo sobre política colombiana')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
                Facebook
              </button>
              <button
                onClick={() => handleQuickShare('twitter', 'Artículo imperdible sobre #Colombia')}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
                Twitter/X
              </button>
              <button
                onClick={() => handleQuickShare('whatsapp', 'Te comparto este artículo interesante:')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feed' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Feed Social en Tiempo Real</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              En vivo
            </div>
          </div>

          {socialFeed.map(post => (
            <div key={post.id} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                
                {/* Platform Icon */}
                <div className={`w-10 h-10 ${platforms.find(p => p.id === post.platform)?.color} rounded-full flex items-center justify-center text-white`}>
                  {platforms.find(p => p.id === post.platform)?.icon}
                </div>

                <div className="flex-1">
                  
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author.name}</span>
                      {post.author.verified && <MdVerified className="w-4 h-4 text-blue-500" />}
                      <span className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                      {post.trending && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                          🔥 TRENDING
                        </span>
                      )}
                      {post.isLive && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                          🔴 EN VIVO
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 mb-3 leading-relaxed">{post.content}</p>

                  {/* Media */}
                  {post.media && post.type === 'video' && (
                    <div className="relative mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="aspect-video flex items-center justify-center">
                        <FaPlay className="w-12 h-12 text-white bg-black/50 rounded-full p-3" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {post.media.duration}
                      </div>
                    </div>
                  )}

                  {/* Hashtags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {post.hashtags.map((tag, index) => (
                      <span key={index} className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaHeart className="w-4 h-4" />
                        <span>{formatNumber(post.engagement.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaComment className="w-4 h-4" />
                        <span>{formatNumber(post.engagement.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaShare className="w-4 h-4" />
                        <span>{formatNumber(post.engagement.shares)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="w-4 h-4" />
                        <span>{formatNumber(post.engagement.views)}</span>
                      </div>
                    </div>
                    
                    <span className="font-medium capitalize">{post.platform}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'groups' && enableGroupIntegration && (
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Facebook Groups */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Grupos de Facebook</h3>
            </div>
            <div className="space-y-3">
              {facebookGroups.map(group => (
                <div key={group.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{group.name}</h4>
                      <p className="text-sm text-gray-600">{formatNumber(group.members)} miembros</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      group.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {group.active ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Ver Grupo
                    </button>
                    <button className="px-3 py-1 bg-white text-blue-600 border border-blue-600 text-sm rounded hover:bg-blue-50">
                      Compartir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Groups */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaWhatsapp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Grupos de WhatsApp</h3>
            </div>
            <div className="space-y-3">
              {whatsappGroups.map(group => (
                <div key={group.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{group.name}</h4>
                      <p className="text-sm text-gray-600">{group.members} miembros</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      group.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {group.active ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                      Abrir WhatsApp
                    </button>
                    <button className="px-3 py-1 bg-white text-green-600 border border-green-600 text-sm rounded hover:bg-green-50">
                      Invitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'embed' && enableEmbedding && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Código de Embebido</h3>
            <p className="text-gray-600 mb-4">
              Copia este código para embeber el contenido en tu sitio web o blog.
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
{`<iframe 
  src="https://nuestropulso.com/embed/${articleId}" 
  width="100%" 
  height="400"
  frameborder="0"
  allowfullscreen>
</iframe>`}
              </code>
            </div>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(`<iframe src="https://nuestropulso.com/embed/${articleId}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`);
                addNotification({
                  type: 'success',
                  title: 'Código copiado',
                  message: 'El código de embebido ha sido copiado al portapapeles',
                  read: false
                });
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copiar Código
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Enlaces Directos</h3>
            <div className="space-y-3">
              {platforms.map(platform => (
                <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center text-white`}>
                      {platform.icon}
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <button
                    onClick={() => handleQuickShare(platform.id, 'Artículo interesante de Nuestro Pulso')}
                    className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Compartir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaIntegration;