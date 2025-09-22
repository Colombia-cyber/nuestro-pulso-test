// NewsTopic interface definition
export interface NewsTopic {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'local' | 'world';
  color: string;
  keywords: string[];
}

// Local topics - Colombia-focused versions of global topics
export const localTopics: NewsTopic[] = [
  {
    id: 'donald-trump-colombia',
    name: 'Donald Trump Global',
    emoji: '🇺🇸',
    description: 'Impacto de Trump en Colombia y la región',
    category: 'local',
    color: 'from-orange-600 to-red-600',
    keywords: ['donald trump', 'colombia', 'relaciones', 'internacional', 'política']
  },
  {
    id: 'global-terrorism-colombia',
    name: 'Global Terrorism',
    emoji: '🛡️',
    description: 'Terrorismo global y seguridad en Colombia',
    category: 'local',
    color: 'from-red-600 to-red-800',
    keywords: ['terrorismo', 'seguridad', 'colombia', 'global', 'paz']
  },
  {
    id: 'world-right-colombia',
    name: 'World Right',
    emoji: '🔵',
    description: 'Perspectiva conservadora mundial y Colombia',
    category: 'local',
    color: 'from-blue-600 to-indigo-600',
    keywords: ['derecha', 'conservador', 'colombia', 'mundial', 'política']
  },
  {
    id: 'world-left-colombia',
    name: 'World Left',
    emoji: '🌹',
    description: 'Perspectiva progresista mundial y Colombia',
    category: 'local',
    color: 'from-pink-600 to-red-600',
    keywords: ['izquierda', 'progresista', 'colombia', 'mundial', 'política']
  },
  {
    id: 'best-destinations-colombia',
    name: 'Best Destinations',
    emoji: '🏝️',
    description: 'Mejores destinos turísticos en Colombia y el mundo',
    category: 'local',
    color: 'from-teal-600 to-blue-600',
    keywords: ['turismo', 'destinos', 'colombia', 'viajes', 'lugares']
  }
];

// World topics - focused on international/global news (NO Legislation, Politics, Wealth)
export const worldTopics: NewsTopic[] = [
  {
    id: 'donald-trump-world',
    name: 'Donald Trump Global',
    emoji: '🌍',
    description: 'Noticias mundiales sobre Donald Trump',
    category: 'world',
    color: 'from-orange-600 to-red-600',
    keywords: ['donald trump', 'global', 'international', 'world', 'politics']
  },
  {
    id: 'world-terror',
    name: 'Terrorismo Mundial',
    emoji: '🌐',
    description: 'Terrorismo y seguridad internacional',
    category: 'world',
    color: 'from-red-600 to-red-800',
    keywords: ['terrorism', 'global', 'international', 'security', 'mundial']
  },
  {
    id: 'world-right-wing',
    name: 'Derecha Mundial',
    emoji: '🔷',
    description: 'Perspectiva conservadora global',
    category: 'world',
    color: 'from-blue-600 to-indigo-600',
    keywords: ['right wing', 'conservative', 'global', 'international', 'derecha']
  },
  {
    id: 'world-left-wing',
    name: 'Izquierda Mundial',
    emoji: '🌹',
    description: 'Perspectiva progresista global',
    category: 'world',
    color: 'from-pink-600 to-red-600',
    keywords: ['left wing', 'progressive', 'global', 'international', 'izquierda']
  },
  {
    id: 'world-travel',
    name: 'Mejores Destinos',
    emoji: '✈️',
    description: 'Mejores lugares para viajar',
    category: 'world',
    color: 'from-teal-600 to-blue-600',
    keywords: ['travel', 'destinations', 'tourism', 'places', 'viajes']
  }
];

// Helper: return all topics
export const getAllTopics = (): NewsTopic[] => {
  return [...localTopics, ...worldTopics];
};

// Helper: get only topics for a category
export const getTopicsByCategory = (category: 'local' | 'world'): NewsTopic[] => {
  return getAllTopics().filter(topic => topic.category === category);
};

// Helper: get priority topics for local or world
export const getPriorityTopics = (category: 'local' | 'world'): NewsTopic[] => {
  const priorityIds = category === 'local'
    ? ['donald-trump-colombia', 'global-terrorism-colombia', 'world-right-colombia', 'world-left-colombia', 'best-destinations-colombia']
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
