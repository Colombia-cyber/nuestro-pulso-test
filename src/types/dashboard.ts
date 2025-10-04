// Dashboard types for integrated YouTube, News, and Firebase chat

export interface DashboardTopic {
  id: string;
  name: string;
  icon: string;
  color: string;
  keywords: string[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
  channelId: string;
  videoUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  imageUrl?: string;
  publishedAt: string;
  author?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  avatar?: string;
  topicId: string;
}

export interface DashboardState {
  selectedTopic: DashboardTopic | null;
  videos: YouTubeVideo[];
  news: NewsArticle[];
  messages: ChatMessage[];
  loading: {
    videos: boolean;
    news: boolean;
    chat: boolean;
  };
  errors: {
    videos: string | null;
    news: string | null;
    chat: string | null;
  };
}
