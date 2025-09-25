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
      <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm opacity-80">Cargando video...</p>
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