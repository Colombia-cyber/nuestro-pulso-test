import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaEllipsisV, FaFilter, FaFire } from 'react-icons/fa';
import { BiTrendingUp, BiHash } from 'react-icons/bi';
import { MdVerified, MdLiveTv } from 'react-icons/md';
import { IoMdTime, IoMdEye } from 'react-icons/io';
import { getVisibleCategories } from '../config/categories';
import { PulseReel } from '../types/pulseReel';
import { pulseReels as samplePulseReels } from '../data/pulseReels';
import { getAllTopics, NewsTopic } from '../config/newsTopics';
import VideoThumbnail from './VideoThumbnail';

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

// Enhanced interface for vertical reels
interface VerticalReel {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  videoUrl?: string;
  hashtags: string[];
  isLive?: boolean;
  location?: string;
  timestamp: Date;
  perspective: 'progressive' | 'conservative' | 'balanced';
}

// Function to convert PulseReel to VerticalReel format
const convertToVerticalReel = (pulseReel: PulseReel, index: number): VerticalReel => {
  const topicToCategoryMap: Record<string, string> = {
    'Politics': 'política',
    'Participation': 'participación',
    'Environment': 'ambiente',
    'Education': 'educación',
    'Technology': 'tecnología',
    'Social': 'social'
  };

  const topicToEmojiMap: Record<string, string> = {
    'Politics': '🗳️',
    'Participation': '🤝',
    'Environment': '🌍',
    'Education': '💻',
    'Technology': '📱',
    'Social': '⚖️'
  };

  return {
    id: `reel-${index}`,
    title: pulseReel.title,
    description: pulseReel.summary,
    category: topicToCategoryMap[pulseReel.topic] || 'general',
    duration: pulseReel.duration,
    views: pulseReel.views,
    likes: pulseReel.likes,
    comments: Math.floor(pulseReel.likes * 0.1),
    shares: Math.floor(pulseReel.likes * 0.05),
    thumbnail: pulseReel.thumbnail || `/api/placeholder/480/360`,
    author: {
      name: pulseReel.organization,
      avatar: topicToEmojiMap[pulseReel.topic] || '📺',
      verified: Math.random() > 0.5,
      followers: Math.floor(Math.random() * 50000) + 10000
    },
    videoUrl: pulseReel.videoUrl,
    hashtags: [`#${pulseReel.topic}`, '#Colombia', '#CivicEngagement'],
    isLive: Math.random() > 0.8,
    location: 'Colombia',
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
    perspective: ['progressive', 'conservative', 'balanced'][Math.floor(Math.random() * 3)] as any
  };
};

const PulseReels: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels, setReels] = useState<VerticalReel[]>([]);
  const [filteredReels, setFilteredReels] = useState<VerticalReel[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [bookmarkedReels, setBookmarkedReels] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'recent' | 'topic'>('all');
  const [selectedTopic, setSelectedTopic] = useState<NewsTopic | null>(null);
  const [showComments, setShowComments] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Filter options
  const filterOptions = [
    { id: 'all', name: 'Todos', icon: '📺', color: 'bg-gray-500' },
    { id: 'trending', name: 'Tendencias', icon: '🔥', color: 'bg-red-500' },
    { id: 'recent', name: 'Recientes', icon: '⏰', color: 'bg-blue-500' },
    { id: 'topic', name: 'Por tema', icon: '🏷️', color: 'bg-purple-500' }
  ];

  // Mock additional reels data
  const additionalReels: Partial<VerticalReel>[] = [
    {
      title: 'Jóvenes lideran cambio climático en Bogotá',
      description: 'Estudiantes universitarios organizan marcha masiva por el medio ambiente',
      category: 'ambiente',
      author: { name: 'EcoJóvenes', avatar: '🌱', verified: true, followers: 45000 },
      hashtags: ['#CambioClimático', '#JóvenesActivistas', '#Bogotá'],
      perspective: 'progressive'
    },
    {
      title: 'Debate presidencial: Propuestas económicas',
      description: 'Análisis de las propuestas económicas de los candidatos presidenciales',
      category: 'política',
      author: { name: 'Canal Política', avatar: '🗳️', verified: true, followers: 120000 },
      hashtags: ['#Elecciones2026', '#Economía', '#Debate'],
      perspective: 'balanced'
    },
    {
      title: 'Innovación tecnológica en el agro colombiano',
      description: 'Drones y IoT revolucionan la agricultura en el Valle del Cauca',
      category: 'tecnología',
      author: { name: 'AgroTech Colombia', avatar: '💻', verified: false, followers: 28000 },
      hashtags: ['#AgTech', '#Innovación', '#Valle'],
      perspective: 'progressive'
    },
    {
      title: 'Seguridad fronteriza: Nuevas estrategias',
      description: 'Fuerzas militares implementan tecnología de vigilancia avanzada',
      category: 'seguridad',
      author: { name: 'Seguridad Nacional', avatar: '🚨', verified: true, followers: 85000 },
      hashtags: ['#Seguridad', '#Fronteras', '#Tecnología'],
      perspective: 'conservative'
    }
  ];

  // Initialize reels
  useEffect(() => {
    const loadReels = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading

      const convertedReels = samplePulseReels.map(convertToVerticalReel);
      
      // Add additional mock reels
      const enhancedReels = additionalReels.map((partial, index) => ({
        id: `enhanced-${index}`,
        title: partial.title || 'Contenido Cívico',
        description: partial.description || 'Participación ciudadana en Colombia',
        category: partial.category || 'general',
        duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
        views: Math.floor(Math.random() * 100000) + 1000,
        likes: Math.floor(Math.random() * 10000) + 100,
        comments: Math.floor(Math.random() * 1000) + 10,
        shares: Math.floor(Math.random() * 500) + 5,
        thumbnail: ['🗳️', '🌍', '💻', '🚨', '🤝'][Math.floor(Math.random() * 5)],
        author: {
          name: partial.author?.name || 'Usuario Verificado',
          avatar: ['🗳️', '🌍', '💻', '🚨', '🤝'][Math.floor(Math.random() * 5)],
          verified: partial.author?.verified || false,
          followers: partial.author?.followers || Math.floor(Math.random() * 50000) + 1000
        },
        hashtags: partial.hashtags || ['#Colombia', '#Civic'],
        isLive: Math.random() > 0.9,
        location: 'Colombia',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 3),
        perspective: partial.perspective || 'balanced'
      }));

      setReels([...convertedReels, ...enhancedReels]);
      setFilteredReels([...convertedReels, ...enhancedReels]);
      setIsLoading(false);
    };

    loadReels();
  }, []);

  // Filter reels based on active filter and selected topic
  useEffect(() => {
    let filtered = [...reels];

    switch (activeFilter) {
      case 'trending':
        // Sort by likes and views
        filtered = filtered.sort((a, b) => (b.likes + b.views * 0.1) - (a.likes + a.views * 0.1));
        break;
      case 'recent':
        // Sort by timestamp
        filtered = filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case 'topic':
        if (selectedTopic) {
          filtered = filtered.filter(reel => 
            reel.hashtags.some(tag => 
              selectedTopic.keywords.some(keyword => 
                tag.toLowerCase().includes(keyword.toLowerCase())
              )
            ) || reel.category === selectedTopic.id
          );
        }
        break;
      default:
        // Keep original order for 'all'
        break;
    }

    setFilteredReels(filtered);
    setCurrentReelIndex(0);
  }, [activeFilter, selectedTopic, reels]);

  const currentReel = filteredReels[currentReelIndex];
  // Handle vertical scroll/swipe navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentReelIndex > 0) {
        setCurrentReelIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentReelIndex < filteredReels.length - 1) {
        setCurrentReelIndex(prev => prev + 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'm') {
        setIsMuted(prev => !prev);
      }
    };

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentReelIndex < filteredReels.length - 1) {
        setCurrentReelIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentReelIndex > 0) {
        setCurrentReelIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentReelIndex, filteredReels.length]);

  // Auto-hide UI after inactivity
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowActions(true);
      timeout = setTimeout(() => setShowActions(false), 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetTimeout);
      container.addEventListener('touchstart', resetTimeout);
      resetTimeout();
    }

    return () => {
      clearTimeout(timeout);
      if (container) {
        container.removeEventListener('mousemove', resetTimeout);
        container.removeEventListener('touchstart', resetTimeout);
      }
    };
  }, []);

  const handleFilterChange = (filter: 'all' | 'trending' | 'recent' | 'topic') => {
    setActiveFilter(filter);
    if (filter !== 'topic') {
      setSelectedTopic(null);
    }
  };

  const handleTopicSelect = (topic: NewsTopic) => {
    setSelectedTopic(topic);
    setActiveFilter('topic');
  };

  const handleLike = (reelId: string) => {
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleFollow = (authorName: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(authorName)) {
        newSet.delete(authorName);
      } else {
        newSet.add(authorName);
      }
      return newSet;
    });
  };

  const handleBookmark = (reelId: string) => {
    setBookmarkedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Ahora';
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-colombia-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Cargando Reels...</h2>
          <p className="text-gray-300">Preparando contenido cívico</p>
        </div>
      </div>
    );
  }

  if (!currentReel) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sin contenido disponible</h2>
          <p className="text-gray-300">No hay reels para mostrar en este momento</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden select-none"
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* Filter Bar */}
      <div className={`absolute top-4 left-4 right-4 z-40 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? `${filter.color} text-white shadow-lg`
                    : 'bg-black/30 text-white/80 hover:bg-black/50'
                }`}
              >
                <span>{filter.icon}</span>
                <span className="hidden sm:inline">{filter.name}</span>
              </button>
            ))}
          </div>

          {/* Topic Selector */}
          {activeFilter === 'topic' && (
            <div className="flex items-center gap-2">
              <select
                value={selectedTopic?.id || ''}
                onChange={(e) => {
                  const topic = getAllTopics().find(t => t.id === e.target.value);
                  if (topic) handleTopicSelect(topic);
                }}
                className="bg-black/50 text-white border border-white/30 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Seleccionar tema...</option>
                {getAllTopics().map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.emoji} {topic.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reel Counter */}
          <div className="bg-black/50 text-white px-3 py-2 rounded-full text-sm">
            {currentReelIndex + 1} / {filteredReels.length}
          </div>
        </div>
      </div>
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
          {/* Video Thumbnail Background */}
          <div className="absolute inset-0">
            <VideoThumbnail 
              src={currentReel.thumbnail}
              alt={currentReel.title}
              videoUrl={currentReel.videoUrl}
              title={currentReel.title}
              description={currentReel.description}
            />
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-bold mb-2">{currentReel.title}</h3>
            <p className="text-gray-300 text-sm">{currentReel.description}</p>
          </div>

          {/* Play/Pause Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(prev => !prev)}
          >
            {!isPlaying && (
              <div className="bg-black/50 rounded-full p-6">
                <FaPlay className="w-12 h-12 text-white ml-2" />
              </div>
            )}
          </div>

          {/* Live Indicator */}
          {currentReel.isLive && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 z-30">
              <MdLiveTv className="w-4 h-4" />
              <span className="text-sm font-bold">EN VIVO</span>
            </div>
          )}

          {/* Perspective Badge */}
          <div className="absolute top-4 right-4 z-30">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentReel.perspective === 'progressive' ? 'bg-blue-500 text-white' :
              currentReel.perspective === 'conservative' ? 'bg-red-500 text-white' :
              'bg-green-500 text-white'
            }`}>
              {currentReel.perspective === 'progressive' ? '🔵 Progresista' :
               currentReel.perspective === 'conservative' ? '🔴 Conservador' :
               '⚖️ Balanceado'}
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        </div>
      </div>

      {/* UI Controls */}
      <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="text-sm">
              Reels Cívicos
            </div>
            <div className="text-sm">
              {currentReelIndex + 1} / {reels.length}
            </div>
          </div>
        </div>

        {/* Side Actions */}
        <div className="absolute right-4 bottom-24 space-y-6 z-30">
          {/* Author Profile */}
          <div className="text-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl mb-2">
                {currentReel.author.avatar}
              </div>
              {!followedUsers.has(currentReel.author.name) && (
                <button
                  onClick={() => handleFollow(currentReel.author.name)}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  +
                </button>
              )}
            </div>
            <div className="text-white text-xs">{currentReel.author.name}</div>
          </div>

          {/* Like */}
          <div className="text-center">
            <button
              onClick={() => handleLike(currentReel.id)}
              className="block mx-auto mb-1"
            >
              <FaHeart 
                className={`w-7 h-7 ${likedReels.has(currentReel.id) ? 'text-red-500' : 'text-white'}`} 
              />
            </button>
            <div className="text-white text-xs">{formatCount(currentReel.likes)}</div>
          </div>

          {/* Comment */}
          <div className="text-center">
            <button 
              onClick={handleComment}
              className="block mx-auto mb-1"
            >
              <FaComment className="w-7 h-7 text-white" />
            </button>
            <div className="text-white text-xs">{formatCount(currentReel.comments)}</div>
          </div>

          {/* Share */}
          <div className="text-center">
            <button className="block mx-auto mb-1">
              <FaShare className="w-7 h-7 text-white" />
            </button>
            <div className="text-white text-xs">{formatCount(currentReel.shares)}</div>
          </div>

          {/* Bookmark */}
          <div className="text-center">
            <button
              onClick={() => handleBookmark(currentReel.id)}
              className="block mx-auto"
            >
              <FaBookmark 
                className={`w-6 h-6 ${bookmarkedReels.has(currentReel.id) ? 'text-colombia-yellow' : 'text-white'}`} 
              />
            </button>
          </div>

          {/* More Options */}
          <div className="text-center">
            <button className="block mx-auto">
              <FaEllipsisV className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="max-w-md">
            {/* Author Info */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold">@{currentReel.author.name}</span>
              {currentReel.author.verified && (
                <MdVerified className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-gray-300 text-sm">• {formatTimeAgo(currentReel.timestamp)}</span>
            </div>

            {/* Description */}
            <p className="text-sm mb-3 leading-relaxed">
              {currentReel.description}
            </p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {currentReel.hashtags.map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHashtag(hashtag)}
                  className="text-colombia-yellow text-sm hover:text-colombia-yellow-light transition-colors"
                >
                  {hashtag}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <IoMdEye className="w-4 h-4" />
                {formatCount(currentReel.views)}
              </span>
              <span className="flex items-center gap-1">
                <IoMdTime className="w-4 h-4" />
                {currentReel.duration}
              </span>
              {currentReel.location && (
                <span>📍 {currentReel.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
          <button
            onClick={() => currentReelIndex > 0 && setCurrentReelIndex(prev => prev - 1)}
            className={`block p-3 rounded-full ${
              currentReelIndex === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-black/50 hover:bg-black/70'
            } text-white transition-colors`}
            disabled={currentReelIndex === 0}
          >
            ↑
          </button>
          <button
            onClick={() => currentReelIndex < filteredReels.length - 1 && setCurrentReelIndex(prev => prev + 1)}
            className={`block p-3 rounded-full ${
              currentReelIndex === filteredReels.length - 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-black/50 hover:bg-black/70'
            } text-white transition-colors`}
            disabled={currentReelIndex === filteredReels.length - 1}
          >
            ↓
          </button>
        </div>

        {/* Media Controls */}
        <div className="absolute left-4 bottom-4 space-y-4">
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="block p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMuted(prev => !prev)}
            className="block p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-30">
        <div
          className="h-full bg-colombia-yellow transition-all duration-300"
          style={{ width: `${((currentReelIndex + 1) / filteredReels.length) * 100}%` }}
        />
      </div>

      {/* Comments Overlay */}
      {showComments && (
        <div className="absolute inset-0 bg-black/80 z-40 flex items-end">
          <div className="w-full max-h-2/3 bg-white rounded-t-3xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                💬 Comentarios
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <p className="text-gray-600 text-center py-8">
                Los comentarios se integrarán con el Community Hub
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help Overlay */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xs space-y-1 opacity-50">
        <div>↑↓ Navegar</div>
        <div>Espacio: Play/Pause</div>
        <div>M: Silenciar</div>
      </div>
    </div>
  );
};

export default PulseReels;