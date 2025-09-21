// ... existing imports and local topics

// --- World topics, with 'Legislation', 'Politics', 'Wealth' REMOVED ---
export const worldTopics: NewsTopic[] = [
  {
    id: 'world-leaders',
    name: 'World Leaders',
    emoji: '👥',
    description: 'Líderes mundiales y diplomacia',
    category: 'world',
    color: 'from-blue-600 to-blue-800',
    keywords: ['leaders', 'diplomacy', 'summit', 'international']
  },
  {
    id: 'world-employment',
    name: 'Employment',
    emoji: '🌐',
    description: 'Mercado laboral mundial',
    category: 'world',
    color: 'from-teal-600 to-teal-800',
    keywords: ['employment', 'jobs', 'global', 'labor']
  },
  {
    id: 'world-issues',
    name: 'Issues',
    emoji: '🔥',
    description: 'Crisis y problemas globales',
    category: 'world',
    color: 'from-orange-600 to-red-600',
    keywords: ['crisis', 'global', 'issues', 'problems']
  },
  // ...other world topics as needed, EXCLUDING Legislation, Politics, Wealth
];

// Helper: return all topics
export const getAllTopics = (): NewsTopic[] => {
  return [...localTopics, ...worldTopics];
};

// Helper: get only topics for a category
export const getTopicsByCategory = (category: 'local' | 'world'): NewsTopic[] => {
  return getAllTopics().filter(topic => topic.category === category);
};

// Helper: get priority topics for local or world (REMOVE unwanted IDs)
export const getPriorityTopics = (category: 'local' | 'world'): NewsTopic[] => {
  // Only include desired topics in order!
  const priorityIds = category === 'local'
    ? ['drugs-crime', 'terror-news', 'gustavo-petro', 'congress', 'left-wing', 'right-wing', 'donald-trump-local']
    : ['donald-trump-world', 'world-terror', 'world-right-wing', 'world-left-wing', 'world-travel'];

  const allTopics = getTopicsByCategory(category);
  return priorityIds.map(id => allTopics.find(topic => topic.id === id)).filter(Boolean) as NewsTopic[];
};

export const getTopicById = (id: string): NewsTopic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

export const searchTopicsByKeyword = (keyword: string): NewsTopic[] => {
  const searchTerm = keyword.toLowerCase();
  return getAllTopics().filter(topic =>
    topic.keywords.some(k => k.toLowerCase().includes(searchTerm)) ||
    topic.name.toLowerCase().includes(searchTerm) ||
    (topic.description && topic.description.toLowerCase().includes(searchTerm))
  );
};
