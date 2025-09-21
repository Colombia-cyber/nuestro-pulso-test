export interface NewsTopic {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'local' | 'world';
  perspective?: 'left' | 'right' | 'balanced';
  color: string;
  keywords: string[];
}

export const localTopics: NewsTopic[] = [
  {
    id: 'terror-news',
    name: 'Terror News',
    emoji: '🚨',
    description: 'Breaking alerts and global security threats',
    category: 'local',
    color: 'from-red-700 to-red-900',
    keywords: ['terror', 'security', 'threat', 'attack', 'violence', 'terrorism', 'security alerts']
  },
  {
    id: 'gustavo-petro',
    name: 'Gustavo Petro News',
    emoji: '🇨🇴',
    description: 'Latest from Colombia\'s President and administration',
    category: 'local',
    color: 'from-blue-600 to-blue-800',
    keywords: ['petro', 'president', 'colombia', 'government', 'administration', 'casa nariño']
  },
  {
    id: 'donald-trump',
    name: 'Donald Trump News',
    emoji: '🇺🇸',
    description: 'Latest updates on Donald Trump and US politics',
    category: 'world',
    color: 'from-red-600 to-blue-600',
    keywords: ['trump', 'donald trump', 'usa', 'america', 'republican', 'election', 'politics']
  },
  {
    id: 'drugs-crime',
    name: 'Drugs & Crime',
    emoji: '🚔',
    description: 'Global drug trafficking, organized crime, and justice',
    category: 'local',
    color: 'from-red-500 to-orange-600',
    keywords: ['drugs', 'crime', 'trafficking', 'cartel', 'justice', 'law enforcement', 'organized crime']
  },
  {
    id: 'politics',
    name: 'Politics',
    emoji: '🏛️',
    description: 'Global politics, elections, and democratic processes',
    category: 'world',
    color: 'from-indigo-600 to-purple-600',
    keywords: ['politics', 'elections', 'democracy', 'government', 'campaign', 'voting', 'political']
  },
  {
    id: 'legislation',
    name: 'Legislation',
    emoji: '⚖️',
    description: 'Laws, bills, and legal developments worldwide',
    category: 'world',
    color: 'from-purple-600 to-purple-800',
    keywords: ['law', 'legislation', 'bill', 'legal', 'court', 'judicial', 'supreme court']
  },
  {
    id: 'health',
    name: 'Health',
    emoji: '🏥',
    description: 'Global health news, medical breakthroughs, and public health',
    category: 'world',
    color: 'from-green-600 to-teal-600',
    keywords: ['health', 'medical', 'healthcare', 'medicine', 'disease', 'pandemic', 'vaccine']
  },
  {
    id: 'employment',
    name: 'Employment',
    emoji: '💼',
    description: 'Global job markets, employment trends, and economic opportunities',
    category: 'world',
    color: 'from-teal-600 to-cyan-600',
    keywords: ['employment', 'jobs', 'work', 'unemployment', 'economy', 'labor', 'career']
  },
  {
    id: 'congress-colombia',
    name: 'Congress of Colombia',
    emoji: '🏢',
    description: 'Colombian Congress activities, legislation, and parliamentary news',
    category: 'local',
    color: 'from-amber-600 to-orange-600',
    keywords: ['congress', 'senate', 'chamber', 'representatives', 'legislative', 'parliament', 'colombia']
  },
  {
    id: 'reels-feeds',
    name: 'Reels/Feeds',
    emoji: '📱',
    description: 'Essential world content, viral news, and trending global stories',
    category: 'world',
    color: 'from-pink-600 to-rose-600',
    keywords: ['viral', 'trending', 'social media', 'reels', 'feeds', 'breaking', 'worldwide']
  }
];

export const worldTopics: NewsTopic[] = [
  {
    id: 'world-terror',
    name: 'Global Terror Alerts',
    emoji: '🌍',
    description: 'International terrorism threats and security updates',
    category: 'world',
    color: 'from-red-600 to-red-800',
    keywords: ['terrorism', 'international security', 'global threats', 'ISIS', 'extremism']
  },
  {
    id: 'world-trump',
    name: 'Trump International',
    emoji: '🌐',
    description: 'Donald Trump\'s global impact and international relations',
    category: 'world',
    color: 'from-red-500 to-blue-500',
    keywords: ['trump international', 'US foreign policy', 'trade wars', 'nato', 'diplomacy']
  },
  {
    id: 'world-drugs-crime',
    name: 'International Crime',
    emoji: '🌐',
    description: 'Global drug cartels, organized crime, and law enforcement',
    category: 'world',
    color: 'from-red-500 to-orange-600',
    keywords: ['international crime', 'drug cartels', 'money laundering', 'interpol']
  },
  {
    id: 'world-politics',
    name: 'Global Politics',
    emoji: '🌎',
    description: 'International politics, elections, and democratic movements',
    category: 'world',
    color: 'from-blue-600 to-purple-600',
    keywords: ['international politics', 'world elections', 'democracy', 'authoritarianism']
  },
  {
    id: 'world-legislation',
    name: 'International Law',
    emoji: '📜',
    description: 'International courts, treaties, and global legal developments',
    category: 'world',
    color: 'from-purple-600 to-purple-800',
    keywords: ['international law', 'UN', 'treaties', 'human rights', 'ICC']
  },
  {
    id: 'world-health',
    name: 'Global Health',
    emoji: '🏥',
    description: 'Pandemic updates, WHO news, and global health initiatives',
    category: 'world',
    color: 'from-green-600 to-teal-600',
    keywords: ['WHO', 'pandemic', 'global health', 'vaccines', 'disease outbreaks']
  },
  {
    id: 'world-economy',
    name: 'Global Economy',
    emoji: '💎',
    description: 'World markets, international trade, and economic indicators',
    category: 'world',
    color: 'from-yellow-600 to-orange-600',
    keywords: ['global economy', 'stock markets', 'trade', 'recession', 'inflation']
  },
  {
    id: 'world-feeds',
    name: 'Viral World Content',
    emoji: '🔥',
    description: 'Trending global stories, viral content, and breaking world news',
    category: 'world',
    color: 'from-pink-600 to-red-600',
    keywords: ['viral news', 'trending', 'breaking news', 'social media', 'worldwide']
  }
];

export const perspectiveTopics: NewsTopic[] = [
  {
    id: 'left-wing',
    name: 'Left Wing',
    emoji: '🔵',
    description: 'Perspectiva progresista y de izquierda',
    category: 'local',
    perspective: 'left',
    color: 'from-blue-500 to-blue-700',
    keywords: ['progresista', 'izquierda', 'social', 'igualdad']
  },
  {
    id: 'right-wing',
    name: 'Right Wing',
    emoji: '🔴',
    description: 'Perspectiva conservadora y de derecha',
    category: 'local',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservador', 'derecha', 'tradicional', 'libertad']
  },
  {
    id: 'world-left-wing',
    name: 'Left Wing',
    emoji: '🌍',
    description: 'Perspectiva progresista mundial',
    category: 'world',
    perspective: 'left',
    color: 'from-blue-500 to-blue-700',
    keywords: ['progressive', 'left', 'social', 'equality']
  },
  {
    id: 'world-right-wing',
    name: 'Right Wing',
    emoji: '🌎',
    description: 'Perspectiva conservadora mundial',
    category: 'world',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservative', 'right', 'traditional', 'liberty']
  }
];

export const getAllTopics = (): NewsTopic[] => {
  return [...localTopics, ...worldTopics, ...perspectiveTopics];
};

export const getTopicsByCategory = (category: 'local' | 'world'): NewsTopic[] => {
  return getAllTopics().filter(topic => topic.category === category);
};

export const getTopicById = (id: string): NewsTopic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

export const searchTopicsByKeyword = (keyword: string): NewsTopic[] => {
  const searchTerm = keyword.toLowerCase();
  return getAllTopics().filter(topic => 
    topic.keywords.some(k => k.toLowerCase().includes(searchTerm)) ||
    topic.name.toLowerCase().includes(searchTerm) ||
    topic.description.toLowerCase().includes(searchTerm)
  );
};