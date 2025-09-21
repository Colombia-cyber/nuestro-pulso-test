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
  // Priority topics as requested
  {
    id: 'drugs-crime',
    name: 'Drugs & Crime',
    emoji: '🚔',
    description: 'Narcotráfico, crimen organizado y justicia',
    category: 'local',
    color: 'from-red-500 to-orange-600',
    keywords: ['drogas', 'narcotráfico', 'crimen', 'delincuencia', 'justicia', 'carteles', 'colombia', 'sudamerica']
  },
  {
    id: 'terror-news',
    name: 'Terror News',
    emoji: '🚨',
    description: 'Alertas y noticias de seguridad nacional',
    category: 'local',
    color: 'from-red-600 to-red-800',
    keywords: ['terror', 'seguridad', 'amenaza', 'atentado', 'violencia', 'terrorismo', 'colombia']
  },
  {
    id: 'gustavo-petro',
    name: 'Gustavo Petro News',
    emoji: '🇨🇴',
    description: 'Noticias sobre el presidente y gobierno nacional',
    category: 'local',
    color: 'from-blue-600 to-blue-800',
    keywords: ['petro', 'presidente', 'gobierno', 'casa de nariño', 'mandatario', 'colombia']
  },
  {
    id: 'congress',
    name: 'Congress of Colombia',
    emoji: '🏢',
    description: 'Actividad del Congreso de la República',
    category: 'local',
    color: 'from-indigo-600 to-indigo-800',
    keywords: ['congreso', 'senado', 'cámara', 'representantes', 'legislativo', 'debates', 'colombia']
  },
  {
    id: 'left-wing',
    name: 'Left Wing',
    emoji: '🔵',
    description: 'Perspectiva progresista y de izquierda',
    category: 'local',
    perspective: 'left',
    color: 'from-blue-500 to-blue-700',
    keywords: ['progresista', 'izquierda', 'social', 'igualdad', 'reforma', 'colombia']
  },
  {
    id: 'right-wing',
    name: 'Right Wing',
    emoji: '🔴',
    description: 'Perspectiva conservadora y de derecha',
    category: 'local',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservador', 'derecha', 'tradicional', 'libertad', 'empresa', 'colombia']
  },
  {
    id: 'donald-trump-local',
    name: 'Donald Trump',
    emoji: '🇺🇸',
    description: 'Noticias sobre Trump con enfoque en Sudamérica/Colombia',
    category: 'local',
    color: 'from-orange-500 to-red-600',
    keywords: ['trump', 'donald trump', 'colombia', 'sudamerica', 'politica exterior', 'comercio', 'migracion']
  },
  // Additional existing topics
  {
    id: 'legislation',
    name: 'Legislation',
    emoji: '⚖️',
    description: 'Leyes, decretos y normativas',
    category: 'local',
    color: 'from-purple-600 to-purple-800',
    keywords: ['ley', 'decreto', 'legislación', 'normativa', 'jurídico']
  },
  {
    id: 'politics',
    name: 'Politics',
    emoji: '🗳️',
    description: 'Política nacional y partidos',
    category: 'local',
    color: 'from-green-600 to-green-800',
    keywords: ['política', 'partido', 'elecciones', 'campaña', 'democracia']
  },
  {
    id: 'wealth',
    name: 'Wealth',
    emoji: '💰',
    description: 'Economía, finanzas y desarrollo',
    category: 'local',
    color: 'from-yellow-600 to-yellow-800',
    keywords: ['economía', 'finanzas', 'riqueza', 'desarrollo', 'inversión']
  },
  {
    id: 'employment',
    name: 'Employment',
    emoji: '💼',
    description: 'Trabajo, empleo y oportunidades laborales',
    category: 'local',
    color: 'from-teal-600 to-teal-800',
    keywords: ['empleo', 'trabajo', 'laboral', 'desempleo', 'oportunidades']
  },
  {
    id: 'issues',
    name: 'Issues',
    emoji: '⚡',
    description: 'Problemas sociales y desafíos nacionales',
    category: 'local',
    color: 'from-orange-600 to-red-600',
    keywords: ['problemas', 'crisis', 'desafíos', 'social', 'conflicto']
  }
];

// --- World topics, with 'Legislation', 'Politics', 'Wealth' REMOVED ---
export const worldTopics: NewsTopic[] = [
  {
    id: 'donald-trump-world',
    name: 'Donald Trump',
    emoji: '🇺🇸',
    description: 'Noticias globales sobre Donald Trump',
    category: 'world',
    color: 'from-orange-500 to-red-600',
    keywords: ['trump', 'donald trump', 'usa', 'politics', 'global', 'international', 'america']
  },
  {
    id: 'world-terror',
    name: 'Terror News',
    emoji: '🚨',
    description: 'Terrorismo y seguridad mundial',
    category: 'world',
    color: 'from-red-600 to-red-800',
    keywords: ['terror', 'terrorism', 'security', 'international', 'threats', 'global']
  },
  {
    id: 'world-right-wing',
    name: 'Right Wing',
    emoji: '🔴',
    description: 'Perspectiva conservadora mundial',
    category: 'world',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservative', 'right', 'traditional', 'liberty', 'business', 'global']
  },
  {
    id: 'world-left-wing',
    name: 'Left Wing',
    emoji: '🔵',
    description: 'Perspectiva progresista mundial',
    category: 'world',
    perspective: 'left',
    color: 'from-blue-500 to-blue-700',
    keywords: ['progressive', 'left', 'social', 'equality', 'reform', 'global']
  },
  {
    id: 'world-travel',
    name: 'Best Places to Travel',
    emoji: '✈️',
    description: 'Mejores destinos y noticias de viajes',
    category: 'world',
    color: 'from-purple-600 to-purple-800',
    keywords: ['travel', 'tourism', 'destinations', 'vacation', 'best places', 'global']
  },
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