export interface PollOption {
  id: string;
  text: string;
  votes: number;
  imageUrl?: string;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  category: 'politica' | 'social' | 'economia' | 'seguridad' | 'educacion' | 'salud';
  tags: string[];
  createdAt: Date;
  endsAt: Date;
  isActive: boolean;
  isTrending: boolean;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  allowMultiple: boolean;
  isAnonymous: boolean;
  region?: 'nacional' | 'bogota' | 'medellin' | 'cali' | 'barranquilla' | 'cartagena';
}

export interface PollVote {
  pollId: string;
  optionId: string;
  userId: string;
  timestamp: Date;
  ipAddress?: string;
}

export interface PollStats {
  totalPolls: number;
  totalVotes: number;
  activePolls: number;
  trendingPolls: number;
  categoriesCount: Record<Poll['category'], number>;
}

export interface CreatePollRequest {
  title: string;
  description: string;
  question: string;
  options: Omit<PollOption, 'id' | 'votes'>[];
  category: Poll['category'];
  tags: string[];
  endsAt: Date;
  allowMultiple: boolean;
  isAnonymous: boolean;
  region?: Poll['region'];
}

export type PollFilter = {
  category?: Poll['category'];
  region?: Poll['region'];
  isActive?: boolean;
  isTrending?: boolean;
  tags?: string[];
  sortBy?: 'newest' | 'trending' | 'mostVoted' | 'endingSoon';
};