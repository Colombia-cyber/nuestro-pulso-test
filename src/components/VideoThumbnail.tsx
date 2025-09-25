import React, { useState } from 'react';
import { FaPlay, FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import { useVideoWithRetry } from '../hooks/useVideoWithRetry';

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
  const [clicked, setClicked] = useState(false);
  
  const { loadState, thumbnailSrc, actualVideoUrl, retry } = useVideoWithRetry({
    videoUrl,
    thumbnail: src,
    options: { maxRetries: 3 }
  });

  const handleClick = () => {
    if (loadState.hasError && loadState.canRetry) {
      retry();
      return;
    }
    
    if (onVideoPlay && actualVideoUrl) {
      setClicked(true);
      onVideoPlay();
    } else if (actualVideoUrl) {
      // Open video in new tab if no custom handler
      window.open(actualVideoUrl, '_blank');
    }
  };

  const handleImageError = () => {
    // Let the hook handle retries
  };

  if (loadState.isLoading) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm opacity-80">Cargando video...</p>
        </div>
      </div>
    );
  }

  if (loadState.hasError) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center ${className}`}>
        <div className="text-center text-white p-6">
          <FaExclamationTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-lg font-bold mb-2">Error al cargar el video</h3>
          <p className="text-sm opacity-80 mb-4">
            {loadState.errorMessage || 'No se pudo cargar el contenido del video'}
          </p>
          {title && (
            <h4 className="text-md font-semibold mb-2">{title}</h4>
          )}
          {description && (
            <p className="text-xs opacity-70 mb-4">{description}</p>
          )}
          {loadState.canRetry && (
            <button
              onClick={retry}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <FaRedo className="w-4 h-4" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full cursor-pointer group ${className}`}>
      <img
        src={thumbnailSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleImageError}
        onClick={handleClick}
      />
      
      {/* Play button overlay */}
      {showPlayButton && actualVideoUrl && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleClick}
        >
          <div className={`bg-white/90 rounded-full p-4 transform hover:scale-110 transition-transform duration-200 ${clicked ? 'animate-pulse' : ''}`}>
            <FaPlay className="w-6 h-6 text-gray-800 ml-1" />
          </div>
        </div>
      )}
      
      {/* Video indicator */}
      {actualVideoUrl && (
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          VIDEO
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;