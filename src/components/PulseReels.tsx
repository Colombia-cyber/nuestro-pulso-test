import React, { useState, useEffect } from 'react';
import ContentService, { VideoReel, SocialMediaPost } from '../services/contentService';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [socialVideos, setSocialVideos] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);

  const contentService = ContentService.getInstance();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const [videoReels, socialPosts] = await Promise.all([
          contentService.fetchVideoReels(),
          contentService.fetchSocialPosts()
        ]);
        
        setReels(videoReels);
        // Filter for video posts from social media
        const videoSocialPosts = socialPosts.filter(post => 
          post.media?.type === 'video' || post.platform === 'youtube'
        );
        setSocialVideos(videoSocialPosts);
      } catch (error) {
        console.error('Error loading reels content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'política', name: 'Política', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'seguridad', name: 'Seguridad', icon: '🛡️' },
  ];

  // Enhanced reels data including right-wing and terror news content
  const enhancedReels = [
    ...reels,
    {
      id: 'enhanced1',
      title: 'Análisis: Propuestas conservadoras para la economía colombiana',
      description: 'Expertos analizan las políticas económicas propuestas por partidos de derecha',
      category: 'política',
      duration: '4:15',
      views: 45672,
      likes: 2341,
      thumbnail: '🗳️',
      author: 'Centro de Análisis Político',
      platform: 'youtube' as const,
      url: '#',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'enhanced2', 
      title: 'Terror en las ciudades: Estrategias de seguridad ciudadana',
      description: 'Análisis de las medidas implementadas para combatir la inseguridad urbana',
      category: 'seguridad',
      duration: '5:30',
      views: 23456,
      likes: 1567,
      thumbnail: '🚨',
      author: 'Seguridad Nacional TV',
      platform: 'native' as const,
      url: '#',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'enhanced3',
      title: 'Candidatos de derecha: Perfiles y propuestas 2024',
      description: 'Conoce a los principales candidatos conservadores y sus plataformas políticas',
      category: 'política',
      duration: '6:45',
      views: 67890,
      likes: 3456,
      thumbnail: '👥',
      author: 'Elecciones Colombia',
      platform: 'youtube' as const,
      url: '#',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'enhanced4',
      title: 'Headlines mundiales: Crisis de migración y políticas conservadoras',
      description: 'Análisis global de las respuestas conservadoras a la crisis migratoria',
      category: 'política',
      duration: '3:20',
      views: 34567,
      likes: 1890,
      thumbnail: '🌍',
      author: 'Mundo Político',
      platform: 'instagram' as const,
      url: '#',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString()
    }
  ];

  const filteredReels = selectedCategory === 'todos' 
    ? enhancedReels 
    : enhancedReels.filter(reel => reel.category === selectedCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando reels y contenido audiovisual...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
          <p className="text-white/90">Videos cortos sobre temas cívicos y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🎥 24 videos esta semana</span>
            <span>👁️ 150K+ visualizaciones</span>
            <span>📱 Contenido móvil</span>
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
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Reels Grid with cross-platform integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReels.map((reel) => (
            <div key={reel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              {/* Thumbnail with platform indicator */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-6xl">{reel.thumbnail}</div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {reel.platform === 'youtube' ? '🎥 YouTube' :
                   reel.platform === 'instagram' ? '📷 Instagram' :
                   reel.platform === 'tiktok' ? '🎵 TikTok' :
                   '🇨🇴 Nuestro Pulso'}
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {reel.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ▶️
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reel.category === 'política' ? 'bg-blue-100 text-blue-800' :
                    reel.category === 'participacion' ? 'bg-green-100 text-green-800' :
                    reel.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                    reel.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                    reel.category === 'economia' ? 'bg-yellow-100 text-yellow-800' :
                    reel.category === 'seguridad' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === reel.category)?.name || reel.category}
                  </span>
                  <span className="text-xs text-gray-500">{reel.author}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                  {reel.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reel.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{reel.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{reel.likes.toLocaleString()}</span>
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Ver ahora
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(reel.publishedAt).toLocaleString('es-CO')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Video Integration */}
        {socialVideos.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">🔗 Videos de Redes Sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialVideos.slice(0, 4).map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">
                      {video.platform === 'youtube' ? '🎥' :
                       video.platform === 'instagram' ? '📷' :
                       video.platform === 'facebook' ? '📘' : '💬'}
                    </span>
                    <span className="font-semibold text-sm">{video.author}</span>
                  </div>
                  
                  <div className="bg-gray-100 rounded p-3 mb-2 text-center">
                    <span className="text-2xl">{video.media?.thumbnail || '🎬'}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">{video.content}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex space-x-2">
                      <span>👍 {video.engagement.likes}</span>
                      {video.engagement.views && <span>👁️ {video.engagement.views}</span>}
                    </div>
                    <span>{video.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Live Stream */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🔴 EN VIVO
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sesión del Congreso: Debate sobre Reforma Tributaria
              </h3>
              <p className="text-gray-600 mb-3">
                Transmisión en vivo del debate en el Senado sobre las modificaciones a la reforma tributaria 2024
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>👥 5,847 espectadores</span>
                <span>⏰ Comenzó hace 1h 23m</span>
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold">
              Unirse
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Trending en Reels</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ParticipacionCiudadana',
              '#PoliticaConservadora',
              '#TerrorNews',
              '#TransparenciaGobierno',
              '#VotoJoven',
              '#CambioClimatico',
              '#EducacionDigital',
              '#ControlCorrupcion',
              '#ReformaTributaria',
              '#SeguridadColombia',
              '#EleccionesColombia',
              '#DerechaColombia'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseReels;