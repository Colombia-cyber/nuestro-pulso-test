import React, { useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart, FaShare, FaUser } from 'react-icons/fa';

interface ReelData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  author: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    verified?: boolean;
  };
  tags: string[];
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  createdAt: string;
}

const CivicReel: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Mock data for development
  const reels: ReelData[] = [
    {
      id: '1',
      title: 'Cómo Participar en Debates Cívicos',
      description: 'Aprende las mejores prácticas para participar constructivamente en debates sobre temas de interés público.',
      videoUrl: '/api/placeholder/video/1',
      thumbnailUrl: '/api/placeholder/400/600',
      duration: 45,
      author: {
        id: '1',
        username: 'civic_educator',
        displayName: 'Educador Cívico',
        avatar: '/api/placeholder/40/40',
        verified: true,
      },
      tags: ['educación', 'debate', 'participación'],
      viewsCount: 1200,
      likesCount: 89,
      sharesCount: 23,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Derechos Ciudadanos en Colombia',
      description: 'Conoce tus derechos fundamentales como ciudadano colombiano y cómo ejercerlos.',
      videoUrl: '/api/placeholder/video/2',
      thumbnailUrl: '/api/placeholder/400/600',
      duration: 60,
      author: {
        id: '2',
        username: 'derechos_col',
        displayName: 'Derechos Colombia',
        verified: true,
      },
      tags: ['derechos', 'ciudadanos', 'colombia'],
      viewsCount: 890,
      likesCount: 67,
      sharesCount: 15,
      createdAt: '2024-01-14T15:30:00Z',
    },
    {
      id: '3',
      title: 'Proceso Electoral Simplificado',
      description: 'Entiende paso a paso cómo funciona el proceso electoral en Colombia.',
      videoUrl: '/api/placeholder/video/3',
      thumbnailUrl: '/api/placeholder/400/600',
      duration: 75,
      author: {
        id: '3',
        username: 'electoral_guide',
        displayName: 'Guía Electoral',
        avatar: '/api/placeholder/40/40',
      },
      tags: ['elecciones', 'proceso', 'voto'],
      viewsCount: 654,
      likesCount: 45,
      sharesCount: 12,
      createdAt: '2024-01-13T12:15:00Z',
    },
  ];

  const currentReel = reels[currentReelIndex];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the video element here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextReel = () => {
    setCurrentReelIndex((prevIndex) => 
      prevIndex < reels.length - 1 ? prevIndex + 1 : 0
    );
    setProgress(0);
    setIsPlaying(false);
  };

  const prevReel = () => {
    setCurrentReelIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : reels.length - 1
    );
    setProgress(0);
    setIsPlaying(false);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate video progress (in real app, this would come from video events)
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextReel();
            return 0;
          }
          return prev + (100 / currentReel.duration); // Progress per second
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentReel.duration]);

  return (
    <div className="relative w-full max-w-sm mx-auto bg-black rounded-lg overflow-hidden shadow-xl">
      {/* Video Container */}
      <div className="relative aspect-[9/16] bg-gray-900">
        {/* Thumbnail/Video */}
        <img
          src={currentReel.thumbnailUrl}
          alt={currentReel.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/400/600';
          }}
        />
        
        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlayPause}
        >
          {!isPlaying && (
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              <FaPlay className="text-white w-8 h-8 ml-1" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3">
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevReel}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          ←
        </button>
        <button
          onClick={nextReel}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          →
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-3">
            {currentReel.author.avatar ? (
              <img
                src={currentReel.author.avatar}
                alt={currentReel.author.displayName || currentReel.author.username}
                className="w-10 h-10 rounded-full border-2 border-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/40/40';
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                <FaUser className="text-white w-5 h-5" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold text-sm">
                  {currentReel.author.displayName || currentReel.author.username}
                </span>
                {currentReel.author.verified && (
                  <span className="text-blue-400">✓</span>
                )}
              </div>
              <span className="text-gray-300 text-xs">@{currentReel.author.username}</span>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
            {currentReel.title}
          </h3>
          <p className="text-gray-200 text-xs mb-3 line-clamp-2">
            {currentReel.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {currentReel.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-white text-xs">
              <span>{formatViews(currentReel.viewsCount)} vistas</span>
              <span>{formatDuration(currentReel.duration)}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors">
                <FaHeart className="w-4 h-4" />
                <span className="text-xs">{currentReel.likesCount}</span>
              </button>
              <button className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors">
                <FaShare className="w-4 h-4" />
                <span className="text-xs">{currentReel.sharesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reel Indicators */}
      <div className="absolute top-4 left-4 flex space-x-1">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentReelIndex(index);
              setProgress(0);
              setIsPlaying(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentReelIndex
                ? 'bg-white'
                : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CivicReel;