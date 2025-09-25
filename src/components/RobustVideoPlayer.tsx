import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaRedo,
  FaExclamationTriangle, FaSpinner, FaExternalLinkAlt
} from 'react-icons/fa';
import { VideoSource } from '../services/videoSourcesService';

interface RobustVideoPlayerProps {
  video: VideoSource;
  autoPlay?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: string) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  className?: string;
}

interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  currentSource: 'video' | 'embed' | 'placeholder';
  loadAttempts: number;
  volume: number;
  currentTime: number;
  duration: number;
}

const RobustVideoPlayer: React.FC<RobustVideoPlayerProps> = ({
  video,
  autoPlay = false,
  muted = true,
  onPlay,
  onPause,
  onError,
  onLoadStart,
  onLoadEnd,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: muted,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    currentSource: 'video',
    loadAttempts: 0,
    volume: muted ? 0 : 0.7,
    currentTime: 0,
    duration: 0
  });

  // Determine the best available source
  const getAvailableSources = () => {
    const sources: Array<{ type: 'video' | 'embed' | 'placeholder', url: string, label: string }> = [];
    
    if (video.videoUrl) {
      sources.push({ type: 'video', url: video.videoUrl, label: 'Video directo' });
    }
    
    if (video.embedUrl) {
      sources.push({ type: 'embed', url: video.embedUrl, label: 'Video embebido' });
    }
    
    // Always have placeholder as fallback
    sources.push({ type: 'placeholder', url: video.thumbnailUrl, label: 'Vista previa' });
    
    return sources;
  };

  const availableSources = getAvailableSources();

  // Error recovery mechanism
  const handlePlayerError = (error: string) => {
    console.error('Video player error:', error);
    
    setState(prev => ({
      ...prev,
      hasError: true,
      errorMessage: error,
      isLoading: false,
      loadAttempts: prev.loadAttempts + 1
    }));

    onError?.(error);

    // Try next source if available and haven't exceeded attempts
    if (state.loadAttempts < availableSources.length - 1) {
      setTimeout(() => {
        tryNextSource();
      }, 2000);
    }
  };

  const tryNextSource = () => {
    const currentIndex = availableSources.findIndex(s => s.type === state.currentSource);
    const nextIndex = Math.min(currentIndex + 1, availableSources.length - 1);
    const nextSource = availableSources[nextIndex];

    setState(prev => ({
      ...prev,
      currentSource: nextSource.type,
      hasError: false,
      errorMessage: '',
      isLoading: true
    }));
  };

  const handlePlayPause = () => {
    if (state.currentSource === 'placeholder') {
      // For placeholder, just toggle visual state
      setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
      return;
    }

    if (state.currentSource === 'video' && videoRef.current) {
      if (state.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          handlePlayerError(`Error al reproducir: ${error.message}`);
        });
      }
    } else if (state.currentSource === 'embed') {
      // For embedded videos, we can only toggle visual state
      setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !state.isMuted;
    setState(prev => ({ ...prev, isMuted: newMuted, volume: newMuted ? 0 : 0.7 }));
    
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
      videoRef.current.volume = newMuted ? 0 : 0.7;
    }
  };

  const handleFullscreen = () => {
    const element = state.currentSource === 'video' ? videoRef.current : iframeRef.current;
    if (element && element.requestFullscreen) {
      element.requestFullscreen().catch(error => {
        console.warn('Fullscreen not supported:', error);
      });
    }
  };

  const handleRetry = () => {
    setState(prev => ({
      ...prev,
      hasError: false,
      errorMessage: '',
      isLoading: true,
      loadAttempts: 0,
      currentSource: availableSources[0].type
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Video event handlers
  const handleVideoLoadStart = () => {
    setState(prev => ({ ...prev, isLoading: true }));
    onLoadStart?.();
  };

  const handleVideoCanPlay = () => {
    setState(prev => ({ ...prev, isLoading: false, hasError: false }));
    onLoadEnd?.();
  };

  const handleVideoPlay = () => {
    setState(prev => ({ ...prev, isPlaying: true }));
    onPlay?.();
  };

  const handleVideoPause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
    onPause?.();
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setState(prev => ({
        ...prev,
        currentTime: videoRef.current!.currentTime,
        duration: videoRef.current!.duration || 0
      }));
    }
  };

  const handleVideoErrorEvent = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = event.currentTarget;
    let errorMessage = 'Error al cargar el video';
    
    switch (video.error?.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        errorMessage = 'Carga de video cancelada';
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        errorMessage = 'Error de red al cargar video';
        break;
      case MediaError.MEDIA_ERR_DECODE:
        errorMessage = 'Error al decodificar video';
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMessage = 'Formato de video no soportado';
        break;
    }
    
    handlePlayerError(errorMessage);
  };

  // Initialize player
  useEffect(() => {
    if (state.currentSource === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.muted = state.isMuted;
      video.volume = state.volume;
      
      if (autoPlay) {
        video.play().catch(error => {
          console.warn('Auto-play blocked:', error);
        });
      }
    }
  }, [state.currentSource, autoPlay]);

  const renderVideoPlayer = () => {
    switch (state.currentSource) {
      case 'video':
        return (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={video.thumbnailUrl}
            preload="metadata"
            playsInline
            onLoadStart={handleVideoLoadStart}
            onCanPlay={handleVideoCanPlay}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onTimeUpdate={handleVideoTimeUpdate}
            onError={handleVideoErrorEvent}
          >
            <source src={video.videoUrl} type="video/mp4" />
            <source src={video.videoUrl} type="video/webm" />
            Tu navegador no soporta la reproducción de video.
          </video>
        );

      case 'embed':
        return (
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={video.embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              setState(prev => ({ ...prev, isLoading: false, hasError: false }));
              onLoadEnd?.();
            }}
            onError={() => handlePlayerError('Error al cargar video embebido')}
          />
        );

      case 'placeholder':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 flex items-center justify-center relative overflow-hidden">
            {/* Background Image */}
            {video.thumbnailUrl && (
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            
            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white p-8">
              <div className="text-8xl mb-4 animate-pulse">
                {video.platform === 'youtube' ? '📺' : 
                 video.platform === 'google-news' ? '📰' :
                 video.platform === 'mock' ? '🎬' : '📱'}
              </div>
              <h3 className="text-2xl font-bold mb-4 line-clamp-2">{video.title}</h3>
              <p className="text-lg text-gray-300 mb-6 line-clamp-3">{video.description}</p>
              
              {/* Video Info */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>👁️</span>
                  <span>{(video.views / 1000).toFixed(1)}K vistas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{video.platform}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderControls = () => (
    <div className="absolute bottom-4 left-4 right-4 z-30">
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
            title={state.isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {state.isPlaying ? (
              <FaPause className="text-white" />
            ) : (
              <FaPlay className="text-white ml-1" />
            )}
          </button>
          
          <button
            onClick={handleMuteToggle}
            className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-colors"
            title={state.isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {state.isMuted ? (
              <FaVolumeMute className="text-white" />
            ) : (
              <FaVolumeUp className="text-white" />
            )}
          </button>

          {/* Time Display */}
          {state.currentSource === 'video' && state.duration > 0 && (
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded">
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Source Indicator */}
          <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
            {availableSources.find(s => s.type === state.currentSource)?.label || 'Fuente'}
          </div>

          {/* External Link */}
          {video.embedUrl && (
            <button
              onClick={() => window.open(video.embedUrl, '_blank')}
              className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-colors"
              title="Abrir en nueva pestaña"
            >
              <FaExternalLinkAlt className="text-white text-sm" />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-colors"
            title="Pantalla completa"
          >
            <FaExpand className="text-white" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {state.currentSource === 'video' && state.duration > 0 && (
        <div className="mt-3">
          <div className="w-full bg-black/30 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-200"
              style={{ width: `${(state.currentTime / state.duration) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderErrorState = () => (
    <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="text-center text-white p-8 bg-black/60 rounded-2xl max-w-md">
        <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Error de Reproducción</h3>
        <p className="text-gray-300 mb-4 text-sm">{state.errorMessage}</p>
        
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FaRedo className="w-4 h-4" />
            Reintentar
          </button>
          
          {state.loadAttempts < availableSources.length - 1 && (
            <button
              onClick={tryNextSource}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Probar otra fuente
            </button>
          )}
          
          {video.embedUrl && (
            <button
              onClick={() => window.open(video.embedUrl, '_blank')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              Ver en fuente original
            </button>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-400">
          Intento {state.loadAttempts + 1} de {availableSources.length}
        </div>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
      <div className="text-center text-white">
        <FaSpinner className="w-12 h-12 text-red-500 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold mb-2">Cargando video...</h3>
        <p className="text-gray-300 text-sm">
          Fuente: {availableSources.find(s => s.type === state.currentSource)?.label}
        </p>
      </div>
    </div>
  );

  return (
    <div className={`relative w-full h-full bg-black overflow-hidden ${className}`}>
      {/* Video Player */}
      {renderVideoPlayer()}
      
      {/* Loading Overlay */}
      {state.isLoading && renderLoadingState()}
      
      {/* Error Overlay */}
      {state.hasError && renderErrorState()}
      
      {/* Controls Overlay */}
      {!state.hasError && renderControls()}
      
      {/* Live Indicator */}
      {video.isLive && (
        <div className="absolute top-4 left-4 z-30">
          <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            EN VIVO
          </div>
        </div>
      )}
      
      {/* Platform Badge */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
          {video.platform.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default RobustVideoPlayer;