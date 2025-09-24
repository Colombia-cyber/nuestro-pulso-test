import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { NewsItem } from '../types/news';

interface VideoModalProps {
  article: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ article, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && article?.videoUrl) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen, article]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;

    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSourceName = (source: string | any): string => {
    return typeof source === 'string' ? source : source.name;
  };

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="w-full max-w-6xl bg-black rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gray-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <FaPlay className="w-3 h-3 text-white ml-0.5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg line-clamp-1">{article.title}</h3>
              <p className="text-gray-400 text-sm">{getSourceName(article.source)}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          {article.videoUrl ? (
            <video
              ref={videoRef}
              src={article.videoUrl}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster={article.thumbnailUrl || article.imageUrl}
              autoPlay
            />
          ) : article.isLive ? (
            // Live stream placeholder
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Transmisión en vivo</h3>
                <p className="text-gray-400">Este contenido se está transmitiendo en vivo</p>
              </div>
            </div>
          ) : (
            // Article content or image
            <div 
              className="w-full h-full bg-gray-900 flex items-center justify-center bg-cover bg-center"
              style={{ 
                backgroundImage: article.thumbnailUrl || article.imageUrl 
                  ? `url(${article.thumbnailUrl || article.imageUrl})` 
                  : undefined 
              }}
            >
              <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center max-w-2xl">
                <h3 className="text-white text-2xl font-bold mb-4">{article.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {article.expandedSummary || article.summary}
                </p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Leer artículo completo
                </button>
              </div>
            </div>
          )}

          {/* Video Controls */}
          {article.videoUrl && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              {/* Progress bar */}
              <div 
                className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-red-600 rounded-full"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePlayPause}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
                  </button>
                  
                  <button 
                    onClick={handleMute}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    {isMuted ? <FaVolumeMute className="w-5 h-5" /> : <FaVolumeUp className="w-5 h-5" />}
                  </button>
                  
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <button 
                  onClick={handleFullscreen}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Live indicator */}
          {article.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 font-medium">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              EN VIVO
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="bg-gray-900 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">{article.title}</h3>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                <span className="font-medium text-red-400">{getSourceName(article.source)}</span>
                {article.viewCount && (
                  <>
                    <span>•</span>
                    <span>{(article.viewCount / 1000).toFixed(1)}K vistas</span>
                  </>
                )}
                <span>•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString('es-CO')}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {article.expandedSummary || article.summary}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Guardar
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Compartir
              </button>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;