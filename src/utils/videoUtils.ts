/**
 * Video loading utilities with error handling and retry logic
 */
import React from 'react';

export interface VideoLoadState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  retryCount: number;
  canRetry: boolean;
}

export interface VideoRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  fallbackThumbnail?: string;
}

const DEFAULT_OPTIONS: Required<VideoRetryOptions> = {
  maxRetries: 3,
  retryDelay: 1000,
  fallbackThumbnail: '/default-video-thumbnail.jpg'
};

/**
 * Load an image with retry logic
 */
export const loadImageWithRetry = (
  src: string, 
  options: VideoRetryOptions = {}
): Promise<HTMLImageElement> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    let retryCount = 0;
    
    const attemptLoad = () => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      
      img.onerror = () => {
        retryCount++;
        
        if (retryCount <= opts.maxRetries) {
          setTimeout(attemptLoad, opts.retryDelay);
        } else {
          reject(new Error(`Failed to load image after ${opts.maxRetries} retries: ${src}`));
        }
      };
      
      img.src = src;
    };
    
    attemptLoad();
  });
};

/**
 * Get fallback thumbnail for failed video loads
 */
export const getFallbackThumbnail = (videoId?: string, platform?: string): string => {
  // Try different thumbnail sizes for YouTube
  if (platform === 'youtube' && videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  
  // Generic fallback
  return '/default-video-thumbnail.jpg';
};

/**
 * Validate YouTube video URL and extract video ID
 */
export const validateYouTubeUrl = (url: string): { isValid: boolean; videoId?: string } => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { isValid: true, videoId: match[1] };
    }
  }
  
  return { isValid: false };
};

/**
 * Create video error state handler
 */
export const createVideoErrorHandler = (
  onError: (error: string) => void,
  onRetry?: () => void
) => ({
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const errorMsg = `Failed to load thumbnail: ${target.src}`;
    onError(errorMsg);
  },
  
  handleVideoError: (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    const errorMsg = `Failed to load video: ${target.src}`;
    onError(errorMsg);
  },
  
  retry: onRetry
});

/**
 * Get video thumbnail with fallbacks
 */
export const getVideoThumbnail = (
  videoUrl?: string, 
  thumbnail?: string,
  videoId?: string
): string => {
  if (thumbnail) return thumbnail;
  
  if (videoUrl) {
    const { isValid, videoId: extractedId } = validateYouTubeUrl(videoUrl);
    if (isValid && extractedId) {
      return `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;
    }
  }
  
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  
  return '/default-video-thumbnail.jpg';
};

/**
 * Extract video ID from various URL formats
 */
export const extractVideoId = (url: string): string | null => {
  const { videoId } = validateYouTubeUrl(url);
  return videoId || null;
};

/**
 * Check if video/image is accessible
 */
export const checkMediaAccessibility = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};