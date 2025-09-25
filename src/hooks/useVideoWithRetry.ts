import { useState, useEffect, useCallback } from 'react';
import { 
  VideoLoadState, 
  VideoRetryOptions, 
  loadImageWithRetry, 
  getVideoThumbnail, 
  extractVideoId 
} from '../utils/videoUtils';

interface UseVideoWithRetryProps {
  videoUrl?: string;
  thumbnail?: string;
  options?: VideoRetryOptions;
}

export const useVideoWithRetry = ({ videoUrl, thumbnail, options }: UseVideoWithRetryProps) => {
  const [loadState, setLoadState] = useState<VideoLoadState>({
    isLoading: true,
    hasError: false,
    retryCount: 0,
    canRetry: true
  });
  
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');
  const [actualVideoUrl, setActualVideoUrl] = useState<string>('');

  const maxRetries = options?.maxRetries || 3;

  const loadThumbnail = useCallback(async () => {
    if (!videoUrl && !thumbnail) {
      setLoadState(prev => ({
        ...prev,
        isLoading: false,
        hasError: true,
        errorMessage: 'No video URL or thumbnail provided',
        canRetry: false
      }));
      return;
    }

    setLoadState(prev => ({ ...prev, isLoading: true, hasError: false }));

    try {
      const videoId = videoUrl ? extractVideoId(videoUrl) : undefined;
      const thumbnailUrl = getVideoThumbnail(videoUrl, thumbnail, videoId);
      
      // Try loading the primary thumbnail
      await loadImageWithRetry(thumbnailUrl, options);
      
      setThumbnailSrc(thumbnailUrl);
      setActualVideoUrl(videoUrl || '');
      setLoadState(prev => ({
        ...prev,
        isLoading: false,
        hasError: false,
        retryCount: 0
      }));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const currentRetryCount = loadState.retryCount + 1;
      
      setLoadState(prev => ({
        ...prev,
        isLoading: false,
        hasError: true,
        errorMessage,
        retryCount: currentRetryCount,
        canRetry: currentRetryCount < maxRetries
      }));

      // Try fallback thumbnails only if we haven't exceeded max retries
      if (currentRetryCount < maxRetries) {
        const videoId = videoUrl ? extractVideoId(videoUrl) : undefined;
        if (videoId) {
          // Try different YouTube thumbnail sizes
          const fallbacks = [
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/default.jpg`
          ];
          
          for (const fallback of fallbacks) {
            try {
              await loadImageWithRetry(fallback, { maxRetries: 1 });
              setThumbnailSrc(fallback);
              setActualVideoUrl(videoUrl || '');
              setLoadState(prev => ({
                ...prev,
                isLoading: false,
                hasError: false
              }));
              return;
            } catch {
              // Continue to next fallback
            }
          }
        }
      }
    }
  }, [videoUrl, thumbnail, options, maxRetries]); // Removed loadState.retryCount from dependencies

  const retry = useCallback(() => {
    if (loadState.canRetry) {
      setLoadState(prev => ({ ...prev, retryCount: 0 })); // Reset retry count
      loadThumbnail();
    }
  }, [loadState.canRetry, loadThumbnail]);

  const reset = useCallback(() => {
    setLoadState({
      isLoading: true,
      hasError: false,
      retryCount: 0,
      canRetry: true
    });
    setThumbnailSrc('');
    setActualVideoUrl('');
  }, []);

  useEffect(() => {
    loadThumbnail();
  }, [videoUrl, thumbnail, options]); // Removed loadThumbnail from dependencies

  return {
    loadState,
    thumbnailSrc,
    actualVideoUrl,
    retry,
    reset
  };
};