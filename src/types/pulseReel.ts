import { VideoContent } from './videoSources';

export interface PulseReel {
  duration: string;
  topic: string;
  organization: string;
  title: string;
  summary: string;
  views: number;
  likes: number;
  videoUrl?: string;
}

// Extended interface that integrates with VideoContent for enhanced reels
export interface EnhancedPulseReel extends VideoContent {
  topic: string;
  organization: string;
  summary: string;
}