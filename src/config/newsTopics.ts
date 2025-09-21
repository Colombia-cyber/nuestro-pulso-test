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

// Local topics - focused on Colombian/South American news
export const localTopics: NewsTopic[] = [
  {
    id: 'drugs-crime',
    name: 'Drogas y Crimen',
    emoji: '🚔',
    description: 'Narcotráfico, crimen organizado, justicia',
    category: 'local',
    color: 'from-red-600 to-red-800',
    keywords: ['drugs', 'crime', 'narcotrafico', 'criminal', 'justicia', 'policia']
  },
  {
    id: 'terror-news',
    name: 'Terrorismo y Seguridad',
    emoji: '⚠️',
    description: 'Alertas de seguridad nacional y terrorismo',
    category: 'local',
    color: 'from-orange-600 to-red-600',
    keywords: ['terrorism', 'security', 'alerts', 'nacional', 'seguridad']
  },
  {
    id: 'gustavo-petro',
    name: 'Gustavo Petro',
    emoji: '🇨🇴',
    description: 'Presidente de Colombia y gobierno nacional',
    category: 'local',
    color: 'from-green-600 to-green-800',
    keywords: ['gustavo petro', 'presidente', 'gobierno', 'colombia', 'politica']
  },
  {
    id: 'congress',
    name: 'Congreso',
    emoji: '🏛️',
    description: 'Actividad del Congreso de la República',
    category: 'local',
    color: 'from-blue-600 to-blue-800',
    keywords: ['congreso', 'senado', 'camara', 'republica', 'legislativo']
  },
  {
    id: 'left-wing',
    name: 'Izquierda Política',
    emoji: '🌹',
    description: 'Perspectiva progresista y de izquierda',
    category: 'local',
    color: 'from-pink-600 to-red-600',
    keywords: ['left', 'izquierda', 'progressive', 'social', 'progresista']
  },
  {
    id: 'right-wing',
    name: 'Derecha Política',
    emoji: '🔵',
    description: 'Perspectiva conservadora y de derecha',
    category: 'local',
    color: 'from-blue-600 to-indigo-600',
    keywords: ['right', 'derecha', 'conservative', 'tradicional', 'conservador']
  },
  {
    id: 'donald-trump-local',
    name: 'Trump Local',
    emoji: '🇺🇸',
    description: 'Impacto de Donald Trump en Colombia',
    category: 'local',
    color: 'from-orange-600 to-red-600',
    keywords: ['donald trump', 'usa', 'america', 'colombia', 'relations']
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
