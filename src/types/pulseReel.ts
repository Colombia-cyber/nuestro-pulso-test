export interface PulseReel {
  duration: string;
  topic: string;
  organization: string;
  title: string;
  summary: string;
  views: number;
  likes: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  embedId?: string;
  isLive?: boolean;
  tags?: string[];
}