import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaPlay, 
  FaPause, 
  FaYoutube, 
  FaTiktok,
  FaInstagram,
  FaExternalLinkAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';
import { MdVerified, MdLiveTv } from 'react-icons/md';
import { BiTrendingUp } from 'react-icons/bi';

interface VideoReel {
  id: string;
  title: string;
  description: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'google-reels' | 'local';
  platformName: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: string;
  videoUrl?: string;
  embedUrl?: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
  };
  hashtags: string[];
  isLive?: boolean;
  timestamp: string;
  trending?: boolean;
}

const EnhancedPulseReels: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const reels: VideoReel[] = [
    {
      id: '1',
      title: 'Debate Presidencial: Momentos Clave',
      description: 'Los mejores momentos del último debate presidencial que están marcando tendencia en Colombia. Análisis de propuestas y reacciones ciudadanas.',
      platform: 'youtube',
      platformName: 'YouTube',
      category: 'Política',
      duration: '2:45',
      views: 45600,
      likes: 1200,
      comments: 89,
      shares: 156,
      thumbnail: 'https://via.placeholder.com/400x600/0066CC/FFFFFF?text=Debate+2024',
      embedUrl: 'https://www.youtube.com/embed/example1',
      author: {
        name: 'Noticias Colombia',
        avatar: '📺',
        verified: true,
        followers: '125K'
      },
      hashtags: ['#DebatePresidencial', '#Colombia2024', '#Política'],
      timestamp: 'Hace 2 horas',
      trending: true
    },
    {
      id: '2',
      title: 'Reforma Educativa Explicada',
      description: 'Todo lo que necesitas saber sobre la nueva reforma educativa en menos de 3 minutos. Análisis balanceado.',
      platform: 'tiktok',
      platformName: 'TikTok',
      category: 'Educación',
      duration: '2:58',
      views: 23400,
      likes: 890,
      comments: 45,
      shares: 67,
      thumbnail: 'https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Educación',
      author: {
        name: 'EduCívica',
        avatar: '👩‍🏫',
        verified: true,
        followers: '78K'
      },
      hashtags: ['#Educación', '#ReformaEducativa', '#Colombia'],
      timestamp: 'Hace 4 horas'
    },
    {
      id: '3',
      title: 'Crisis Energética en Tiempo Real',
      description: '🔴 EN VIVO: Seguimiento de la crisis energética colombiana y sus soluciones. Conectamos con expertos.',
      platform: 'instagram',
      platformName: 'Instagram',
      category: 'Energía',
      duration: 'LIVE',
      views: 12800,
      likes: 567,
      comments: 234,
      shares: 89,
      thumbnail: 'https://via.placeholder.com/400x600/E74C3C/FFFFFF?text=EN+VIVO',
      author: {
        name: 'Energía Sostenible CO',
        avatar: '⚡',
        verified: false,
        followers: '45K'
      },
      hashtags: ['#EnVivo', '#CrisisEnergética', '#Sostenibilidad'],
      isLive: true,
      timestamp: 'EN VIVO'
    },
    {
      id: '4',
      title: 'Transparencia Gubernamental',
      description: 'Nuevas medidas de transparencia del gobierno colombiano. ¿Qué cambia para los ciudadanos?',
      platform: 'google-reels',
      platformName: 'Google Reels',
      category: 'Transparencia',
      duration: '3:12',
      views: 34500,
      likes: 1100,
      comments: 67,
      shares: 145,
      thumbnail: 'https://via.placeholder.com/400x600/4285F4/FFFFFF?text=Google+Reels',
      author: {
        name: 'Transparencia Ya',
        avatar: '🔍',
        verified: true,
        followers: '98K'
      },
      hashtags: ['#Transparencia', '#Gobierno', '#RendiciónDeCuentas'],
      timestamp: 'Hace 6 horas'
    },
    {
      id: '5',
      title: 'Participación Ciudadana Digital',
      description: 'Cómo las nuevas tecnologías están revolucionando la participación ciudadana en Colombia.',
      platform: 'local',
      platformName: 'Nuestro Pulso',
      category: 'Participación',
      duration: '4:20',
      views: 18900,
      likes: 756,
      comments: 123,
      shares: 89,
      thumbnail: 'https://via.placeholder.com/400x600/9B59B6/FFFFFF?text=Participación',
      author: {
        name: 'Nuestro Pulso',
        avatar: '🇨🇴',
        verified: true,
        followers: '156K'
      },
      hashtags: ['#ParticipaCiónCiudadana', '#TecnologíaCívica', '#Colombia'],
      timestamp: 'Hace 1 día'
    }
  ];

  const platforms = [
    { id: 'all', name: 'Todas', icon: '🎬', color: 'bg-gray-500' },
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube />, color: 'bg-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: <FaTiktok />, color: 'bg-black' },
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, color: 'bg-pink-600' },
    { id: 'google-reels', name: 'Google Reels', icon: '🔍', color: 'bg-blue-600' },
    { id: 'local', name: 'Nuestro Pulso', icon: '🇨🇴', color: 'bg-yellow-500' }
  ];

  const filteredReels = selectedPlatform === 'all' 
    ? reels 
    : reels.filter(reel => reel.platform === selectedPlatform);

  const currentReel = filteredReels[currentReelIndex] || reels[0];

  const nextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % filteredReels.length);
  };

  const prevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleInteraction = (action: 'like' | 'comment' | 'share') => {
    console.log(`${action} on reel ${currentReel.id}`);
    // Here you would typically make an API call
  };

  const getPlatformIcon = (platform: string) => {
    const platformObj = platforms.find(p => p.id === platform);
    return platformObj ? platformObj.icon : '🎬';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        prevReel();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        nextReel();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentReelIndex, filteredReels.length]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Platform Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                setSelectedPlatform(platform.id);
                setCurrentReelIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedPlatform === platform.id
                  ? `${platform.color} text-white shadow-lg transform scale-105`
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <span className="text-lg">{platform.icon}</span>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Reel Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md h-full bg-gradient-to-br from-gray-900 to-black rounded-none md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Thumbnail/Placeholder */}
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${currentReel.thumbnail})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              
              {/* Platform Badge */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  platforms.find(p => p.id === currentReel.platform)?.color || 'bg-gray-600'
                } text-white`}>
                  <span className="text-base">{getPlatformIcon(currentReel.platform)}</span>
                  <span>{currentReel.platformName}</span>
                </div>
              </div>

              {/* Live Badge */}
              {currentReel.isLive && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <MdLiveTv className="w-4 h-4" />
                    <span>EN VIVO</span>
                  </div>
                </div>
              )}

              {/* Trending Badge */}
              {currentReel.trending && !currentReel.isLive && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <BiTrendingUp className="w-4 h-4" />
                    <span>TRENDING</span>
                  </div>
                </div>
              )}

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-white/30 backdrop-blur-sm rounded-full p-6 hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  {isPlaying ? (
                    <FaPause className="w-8 h-8 text-white" />
                  ) : (
                    <FaPlay className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{currentReel.author.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{currentReel.author.name}</span>
                      {currentReel.author.verified && (
                        <MdVerified className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{currentReel.author.followers} seguidores</p>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 leading-tight">{currentReel.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                    {currentReel.description}
                  </p>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentReel.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-blue-400 text-sm font-medium">
                      {hashtag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <span>{formatNumber(currentReel.views)} views</span>
                  <span>{currentReel.duration}</span>
                  <span>{currentReel.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6">
          {/* Like */}
          <button 
            onClick={() => handleInteraction('like')}
            className="flex flex-col items-center gap-2 text-white hover:text-red-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-red-500/30 transition-all duration-300">
              <FaHeart className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel.likes)}</span>
          </button>

          {/* Comment */}
          <button 
            onClick={() => handleInteraction('comment')}
            className="flex flex-col items-center gap-2 text-white hover:text-blue-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-blue-500/30 transition-all duration-300">
              <FaComment className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel.comments)}</span>
          </button>

          {/* Share */}
          <button 
            onClick={() => handleInteraction('share')}
            className="flex flex-col items-center gap-2 text-white hover:text-green-500 transition-colors group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-green-500/30 transition-all duration-300">
              <FaShare className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{formatNumber(currentReel.shares)}</span>
          </button>

          {/* External Link */}
          {currentReel.embedUrl && (
            <button 
              onClick={() => window.open(currentReel.embedUrl, '_blank')}
              className="flex flex-col items-center gap-2 text-white hover:text-purple-500 transition-colors group"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-purple-500/30 transition-all duration-300">
                <FaExternalLinkAlt className="w-6 h-6" />
              </div>
              <span className="text-xs">Ver original</span>
            </button>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={prevReel}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronUp className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextReel}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 flex gap-4">
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? (
              <FaVolumeMute className="w-5 h-5 text-white" />
            ) : (
              <FaVolumeUp className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <FaExpand className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 right-4">
          <div className="text-white text-sm bg-black/50 rounded-full px-3 py-1">
            {currentReelIndex + 1} / {filteredReels.length}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-sm">
        <div className="space-y-2">
          <p>↑↓ Navegar</p>
          <p>Espacio: Play/Pause</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPulseReels;