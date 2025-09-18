import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart, FaComment, FaShare, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

interface EnhancedReel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  author: string;
  source: 'youtube' | 'facebook' | 'twitter' | 'whatsapp' | 'local';
  category: string;
  videoUrl?: string;
  isLive?: boolean;
  timestamp: Date;
  tags: string[];
}

interface EnhancedPulseReelsProps {
  onNavigate?: (view: string, data?: any) => void;
}

const EnhancedPulseReels: React.FC<EnhancedPulseReelsProps> = ({ onNavigate }) => {
  const [reels, setReels] = useState<EnhancedReel[]>([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Categories for filtering
  const categories = [
    { id: 'todos', name: 'Todos', icon: '📺', color: 'bg-blue-500' },
    { id: 'politica', name: 'Política', icon: '🗳️', color: 'bg-red-500' },
    { id: 'seguridad', name: 'Seguridad', icon: '🚨', color: 'bg-orange-500' },
    { id: 'social', name: 'Social', icon: '👥', color: 'bg-green-500' },
    { id: 'internacional', name: 'Internacional', icon: '🌍', color: 'bg-cyan-500' },
    { id: 'economia', name: 'Economía', icon: '💰', color: 'bg-yellow-500' },
    { id: 'cultura', name: 'Cultura', icon: '🎭', color: 'bg-purple-500' },
    { id: 'deportes', name: 'Deportes', icon: '⚽', color: 'bg-emerald-500' }
  ];

  // Sample reels data with Colombian themes
  const sampleReels: EnhancedReel[] = [
    {
      id: '1',
      title: 'SESIÓN EN VIVO: Congreso debata reforma tributaria',
      description: 'Transmisión en directo desde el Congreso de la República sobre la controversial reforma tributaria 2024',
      thumbnail: '🏛️',
      duration: 'EN VIVO',
      views: 125000,
      likes: 8500,
      comments: 2300,
      shares: 450,
      author: 'Canal Congreso Oficial',
      source: 'youtube',
      category: 'politica',
      isLive: true,
      timestamp: new Date(),
      tags: ['congreso', 'reforma', 'tributaria', 'envivo', 'politica']
    },
    {
      id: '2',
      title: 'Operativo contra el narcotráfico en Antioquia',
      description: 'Fuerzas militares decomisan 2 toneladas de cocaína en operativo conjunto',
      thumbnail: '🚁',
      duration: '03:42',
      views: 89000,
      likes: 5600,
      comments: 890,
      shares: 320,
      author: 'Caracol Noticias',
      source: 'youtube',
      category: 'seguridad',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['narcotráfico', 'antioquia', 'operativo', 'militar', 'cocaína']
    },
    {
      id: '3',
      title: 'Petro responde a críticas sobre políticas económicas',
      description: 'El presidente colombiano defiende su gestión en rueda de prensa',
      thumbnail: '📢',
      duration: '02:15',
      views: 156000,
      likes: 12000,
      comments: 4500,
      shares: 890,
      author: 'Presidencia Colombia',
      source: 'twitter',
      category: 'politica',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['petro', 'economia', 'presidente', 'colombia', 'politicas']
    },
    {
      id: '4',
      title: 'Protesta masiva de estudiantes universitarios',
      description: 'Miles de estudiantes marchan por mayor presupuesto para educación superior',
      thumbnail: '📚',
      duration: '04:30',
      views: 67000,
      likes: 4200,
      comments: 1200,
      shares: 580,
      author: 'RCN Noticias',
      source: 'facebook',
      category: 'social',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tags: ['estudiantes', 'protesta', 'educacion', 'universidad', 'presupuesto']
    },
    {
      id: '5',
      title: 'Análisis: Impacto de políticas Trump en Colombia',
      description: 'Expertos analizan las consecuencias económicas y diplomáticas',
      thumbnail: '🔍',
      duration: '06:15',
      views: 45000,
      likes: 2800,
      comments: 650,
      shares: 320,
      author: 'Semana TV',
      source: 'youtube',
      category: 'internacional',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      tags: ['trump', 'colombia', 'economia', 'diplomacia', 'analisis']
    },
    {
      id: '6',
      title: 'Crisis humanitaria en La Guajira',
      description: 'Reportaje especial sobre la situación de los niños wayuu',
      thumbnail: '🌵',
      duration: '08:45',
      views: 78000,
      likes: 6500,
      comments: 1800,
      shares: 920,
      author: 'Noticias Uno',
      source: 'local',
      category: 'social',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      tags: ['guajira', 'wayuu', 'crisis', 'humanitaria', 'niños']
    }
  ];

  useEffect(() => {
    // Simulate loading and set initial data
    const timer = setTimeout(() => {
      setReels(sampleReels);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-play first video when component mounts
    if (reels.length > 0 && !isLoading) {
      setIsPlaying(true);
    }
  }, [reels, isLoading]);

  const filteredReels = reels.filter(reel => {
    const matchesCategory = selectedCategory === 'todos' || reel.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const currentReel = filteredReels[currentReelIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleLike = (reelId: string) => {
    setLikedReels(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(reelId)) {
        newLiked.delete(reelId);
      } else {
        newLiked.add(reelId);
      }
      return newLiked;
    });
  };

  const handleComment = (reelId: string) => {
    if (onNavigate) {
      onNavigate('reel-comments', { reelId });
    }
  };

  const handleShare = (reelId: string) => {
    // Simulate share functionality
    navigator.clipboard.writeText(`https://nuestropulso.co/reel/${reelId}`);
    alert('¡Enlace copiado al portapapeles!');
  };

  const nextReel = () => {
    if (currentReelIndex < filteredReels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
      setIsPlaying(true);
    }
  };

  const previousReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
      setIsPlaying(true);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getSourceIcon = (source: string) => {
    const icons = {
      youtube: '📺',
      facebook: '📘',
      twitter: '🐦',
      whatsapp: '📱',
      local: '📍'
    };
    return icons[source as keyof typeof icons] || '📺';
  };

  const getSourceColor = (source: string) => {
    const colors = {
      youtube: 'from-red-500 to-red-600',
      facebook: 'from-blue-500 to-blue-600',
      twitter: 'from-cyan-400 to-cyan-500',
      whatsapp: 'from-green-500 to-green-600',
      local: 'from-purple-500 to-purple-600'
    };
    return colors[source as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🎬</div>
          <div className="text-white text-xl mb-4">Cargando Reels...</div>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Main Reel Player */}
      <div className="relative h-full w-full flex">
        {/* Video Container */}
        <div className="flex-1 relative">
          {currentReel && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              {/* Video/Content Area */}
              <div className="relative w-full h-full max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {/* Simulated Video Content */}
                <div className="text-8xl mb-4">{currentReel.thumbnail}</div>
                
                {/* Live indicator */}
                {currentReel.isLive && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse flex items-center">
                    🔴 EN VIVO
                  </div>
                )}

                {/* Duration/Time */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {currentReel.duration}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/20 rounded-full p-6">
                    {isPlaying ? 
                      <FaPause className="text-white text-3xl" /> : 
                      <FaPlay className="text-white text-3xl ml-1" />
                    }
                  </div>
                </button>

                {/* Navigation arrows */}
                <button 
                  onClick={previousReel}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                  disabled={currentReelIndex === 0}
                >
                  <div className="text-white text-xl">←</div>
                </button>
                <button 
                  onClick={nextReel}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                  disabled={currentReelIndex === filteredReels.length - 1}
                >
                  <div className="text-white text-xl">→</div>
                </button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center mb-2">
                    <div className={`bg-gradient-to-r ${getSourceColor(currentReel.source)} text-white px-2 py-1 rounded-full text-xs flex items-center mr-2`}>
                      <span className="mr-1">{getSourceIcon(currentReel.source)}</span>
                      {currentReel.source}
                    </div>
                    <span className="text-white/70 text-sm">{currentReel.author}</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                    {currentReel.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {currentReel.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {currentReel.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-white/70 text-sm">
                    <span>👁️ {formatNumber(currentReel.views)}</span>
                    <span>❤️ {formatNumber(currentReel.likes)}</span>
                    <span>💬 {formatNumber(currentReel.comments)}</span>
                    <span>📤 {formatNumber(currentReel.shares)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel with Actions */}
        <div className="w-20 bg-black/50 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 p-4">
          {/* Like Button */}
          <button
            onClick={() => currentReel && handleLike(currentReel.id)}
            className={`flex flex-col items-center space-y-1 ${
              currentReel && likedReels.has(currentReel.id) ? 'text-red-500' : 'text-white'
            } hover:text-red-400 transition-colors`}
          >
            <FaHeart className="text-2xl" />
            <span className="text-xs">{currentReel && formatNumber(currentReel.likes)}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => currentReel && handleComment(currentReel.id)}
            className="flex flex-col items-center space-y-1 text-white hover:text-blue-400 transition-colors"
          >
            <FaComment className="text-2xl" />
            <span className="text-xs">{currentReel && formatNumber(currentReel.comments)}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => currentReel && handleShare(currentReel.id)}
            className="flex flex-col items-center space-y-1 text-white hover:text-green-400 transition-colors"
          >
            <FaShare className="text-2xl" />
            <span className="text-xs">{currentReel && formatNumber(currentReel.shares)}</span>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={handleMuteToggle}
            className="flex flex-col items-center space-y-1 text-white hover:text-yellow-400 transition-colors"
          >
            {isMuted ? <FaVolumeMute className="text-2xl" /> : <FaVolumeUp className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="absolute top-4 left-4 right-24 z-10">
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="bg-white/20 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            {isSearchExpanded ? <FaTimes /> : <FaSearch />}
          </button>

          {/* Expanded Search */}
          {isSearchExpanded && (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar reels..."
                className="flex-1 bg-white/20 backdrop-blur-lg text-white placeholder-white/70 px-4 py-2 rounded-full border border-white/30 focus:border-white/50 outline-none"
              />
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/20 backdrop-blur-lg text-white px-3 py-2 rounded-full border border-white/30 focus:border-white/50 outline-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-gray-800 text-white">
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Reel Counter */}
      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-lg text-white px-3 py-2 rounded-full text-sm">
        {currentReelIndex + 1} / {filteredReels.length}
      </div>

      {/* Back Button */}
      <button
        onClick={() => onNavigate && onNavigate('home')}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/30 transition-colors z-10"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default EnhancedPulseReels;