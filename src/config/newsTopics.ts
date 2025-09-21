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
  // Priority topics as requested - EXACT WORDING AS SPECIFIED
  {
    id: 'drogas-crimen',
    name: 'DROGAS Y CRIMEN',
    emoji: '',
    description: 'Narcotráfico, crimen organizado y justicia en Colombia',
    category: 'local',
    color: 'from-red-500 to-orange-600',
    keywords: ['drogas', 'narcotráfico', 'crimen', 'delincuencia', 'justicia', 'carteles', 'colombia', 'sudamerica']
  },
  {
    id: 'terrorismo-seguridad',
    name: 'TERRORISMO Y SEGURIDAD',
    emoji: '',
    description: 'Alertas y noticias de seguridad nacional',
    category: 'local',
    color: 'from-red-600 to-red-800',
    keywords: ['terror', 'seguridad', 'amenaza', 'atentado', 'violencia', 'terrorismo', 'colombia']
  },
  {
    id: 'gustavo-petro-noticias',
    name: 'GUSTAVO PETRO NOTICIAS',
    emoji: '',
    description: 'Noticias sobre el presidente y gobierno nacional',
    category: 'local',
    color: 'from-blue-600 to-blue-800',
    keywords: ['petro', 'presidente', 'gobierno', 'casa de nariño', 'mandatario', 'colombia']
  },
  {
    id: 'congreso-colombia',
    name: 'CONGRESO DE COLOMBIA',
    emoji: '',
    description: 'Actividad del Congreso de la República',
    category: 'local',
    color: 'from-indigo-600 to-indigo-800',
    keywords: ['congreso', 'senado', 'cámara', 'representantes', 'legislativo', 'debates', 'colombia']
  },
  {
    id: 'izquierda-politica',
    name: 'IZQUIERDA POLÍTICA',
    emoji: '',
    description: 'Perspectiva progresista y de izquierda',
    category: 'local',
    perspective: 'left',
    color: 'from-blue-500 to-blue-700',
    keywords: ['progresista', 'izquierda', 'social', 'igualdad', 'reforma', 'colombia']
  },
  {
    id: 'derecha-politica',
    name: 'DERECHA POLÍTICA',
    emoji: '',
    description: 'Perspectiva conservadora y de derecha',
    category: 'local',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservador', 'derecha', 'tradicional', 'libertad', 'empresa', 'colombia']
  },
  {
    id: 'donald-trump-local',
    name: 'DONALD TRUMP',
    emoji: '',
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

export const worldTopics: NewsTopic[] = [
  // Priority topics for world news - EXACT WORDING AS SPECIFIED
  {
    id: 'donald-trump-world',
    name: 'DONALD TRUMP',
    emoji: '',
    description: 'Noticias globales sobre Donald Trump',
    category: 'world',
    color: 'from-orange-500 to-red-600',
    keywords: ['trump', 'donald trump', 'usa', 'politics', 'global', 'international', 'america']
  },
  {
    id: 'right-wing-english',
    name: 'RIGHT WING (ENGLISH)',
    emoji: '',
    description: 'Conservative perspective worldwide in English',
    category: 'world',
    perspective: 'right',
    color: 'from-red-500 to-red-700',
    keywords: ['conservative', 'right', 'traditional', 'liberty', 'business', 'global', 'english']
  },
  {
    id: 'world-politics',
    name: 'Politics',
    emoji: '🗳️',
    description: 'Política internacional',
    category: 'world',
    color: 'from-green-600 to-green-800',
    keywords: ['politics', 'international', 'election', 'democracy', 'government']
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
    id: 'world-wealth',
    name: 'Wealth News',
    emoji: '💎',
    description: 'Economía global y mercados financieros',
    category: 'world',
    color: 'from-yellow-600 to-yellow-800',
    keywords: ['economy', 'global', 'markets', 'finance', 'wealth', 'business', 'investment']
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
  // Additional existing topics
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
    id: 'world-legislation',
    name: 'Legislation',
    emoji: '📜',
    description: 'Leyes y tratados internacionales',
    category: 'world',
    color: 'from-purple-600 to-purple-800',
    keywords: ['law', 'treaty', 'international', 'legislation']
  },
  {
    id: 'world-politics',
    name: 'Politics',
    emoji: '🌎',
    description: 'Política internacional',
    category: 'world',
    color: 'from-green-600 to-green-800',
    keywords: ['politics', 'international', 'election', 'democracy']
  },
  {
    id: 'world-wealth',
    name: 'Wealth',
    emoji: '💎',
    description: 'Economía global y mercados',
    category: 'world',
    color: 'from-yellow-600 to-yellow-800',
    keywords: ['economy', 'global', 'markets', 'finance']
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
  }
];

export const getAllTopics = (): NewsTopic[] => {
  return [...localTopics, ...worldTopics];
};

export const getPriorityTopics = (category: 'local' | 'world'): NewsTopic[] => {
  // Return the priority topics in the specified order - EXACTLY AS REQUESTED
  const priorityIds = category === 'local' 
    ? ['drogas-crimen', 'terrorismo-seguridad', 'gustavo-petro-noticias', 'congreso-colombia', 'izquierda-politica', 'derecha-politica', 'donald-trump-local']
    : ['donald-trump-world', 'right-wing-english'];
  
  const allTopics = getTopicsByCategory(category);
  return priorityIds.map(id => allTopics.find(topic => topic.id === id)).filter(Boolean) as NewsTopic[];
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