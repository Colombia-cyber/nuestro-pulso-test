export interface Article {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ReelItem {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  author: string;
  url?: string;
}