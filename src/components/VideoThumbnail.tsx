import React, { useState } from 'react';
import { FaPlay, FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  videoUrl?: string;
  title?: string;
  description?: string;
  className?: string;
  onVideoPlay?: () => void;
  showPlayButton?: boolean;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  src,
  alt,
  videoUrl,
  title,
  description,
  className = '',
  onVideoPlay,
  showPlayButton = true
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    if (retryCount < maxRetries) {
      // Try fallback URLs for YouTube
      const img = document.createElement('img');
      const videoId = videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
      
      if (videoId) {
        const fallbacks = [
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/default.jpg`
        ];
        
        const currentFallback = fallbacks[retryCount];
        if (currentFallback) {
          img.onload = () => {
            const mainImg = document.querySelector(`img[alt="${alt}"]`) as HTMLImageElement;
            if (mainImg) {
              mainImg.src = currentFallback;
              setHasError(false);
            }
          };
          img.onerror = () => {
            setRetryCount(prev => prev + 1);
            if (retryCount >= maxRetries - 1) {
              setHasError(true);
            }
          };
          img.src = currentFallback;
          return;
        }
      }
    }
    setHasError(true);
  };

  const handleClick = () => {
    if (hasError && retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setIsLoading(true);
      return;
    }
    
    if (onVideoPlay && videoUrl) {
      onVideoPlay();
    } else if (videoUrl) {
      // Open video in new tab if no custom handler
      window.open(videoUrl, '_blank');
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
    // Force reload the image
    const img = document.querySelector(`img[alt="${alt}"]`) as HTMLImageElement;
    if (img) {
      img.src = src;
    }
  };

  if (isLoading && !hasError) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg overflow-hidden ${className}`}>
        <div className="animate-pulse w-full h-full">
          {/* Video skeleton */}
          <div className="relative w-full h-full bg-slate-700">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-slate-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-600/50 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-slate-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center ${className}`}>
        <div className="text-center text-white p-6">
          <FaExclamationTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-lg font-bold mb-2">Error al cargar el video</h3>
          <p className="text-sm opacity-80 mb-4">
            No se pudo cargar el contenido del video
          </p>
          {title && (
            <h4 className="text-md font-semibold mb-2">{title}</h4>
          )}
          {description && (
            <p className="text-xs opacity-70 mb-4">{description}</p>
          )}
          <button
            onClick={handleRetry}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <FaRedo className="w-4 h-4" />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full cursor-pointer group ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={handleClick}
      />
      
      {/* Play button overlay */}
      {showPlayButton && videoUrl && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleClick}
        >
          <div className="bg-white/90 rounded-full p-4 transform hover:scale-110 transition-transform duration-200">
            <FaPlay className="w-6 h-6 text-gray-800 ml-1" />
          </div>
        </div>
      )}
      
      {/* Video indicator */}
      {videoUrl && (
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          VIDEO
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;