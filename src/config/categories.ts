// Category configuration for the application
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  hidden?: boolean;
  advanced?: boolean;
}

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

export const categories: Category[] = [
  {
    id: 'todos',
    name: 'Todos',
    icon: '🎬',
    description: 'Todas las categorías'
  },
  {
    id: 'politica',
    name: 'Política',
    icon: '🏛️',
    description: 'Noticias y debates políticos'
  },
  {
    id: 'educacion',
    name: 'Educación',
    icon: '📚',
    description: 'Educación y formación ciudadana'
  },
  {
    id: 'ambiente',
    name: 'Ambiente',
    icon: '🌱',
    description: 'Medio ambiente y sostenibilidad'
  },
  {
    id: 'participacion',
    name: 'Participación',
    icon: '👥',
    description: 'Participación ciudadana y democracia'
  },
  {
    id: 'internacional',
    name: 'Internacional',
    icon: '🌍',
    description: 'Noticias internacionales relevantes'
  },
  {
    id: 'social',
    name: 'Social',
    icon: '🤝',
    description: 'Temas sociales y comunitarios'
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    icon: '🚨',
    description: 'Seguridad pública y nacional'
  },
  {
    id: 'economia',
    name: 'Economía',
    icon: '💰',
    description: 'Economía y finanzas públicas'
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    description: 'Tecnología y transformación digital',
    hidden: getEnvVar('REACT_APP_HIDE_TECHNOLOGY_CATEGORY', 'true') === 'true'
  },
  {
    id: 'congreso',
    name: 'Congreso',
    icon: '🏛️',
    description: 'Actividad del Congreso de la República',
    advanced: true
  },
  {
    id: 'terror',
    name: 'Seguridad Nacional',
    icon: '🚨',
    description: 'Amenazas y seguridad nacional',
    advanced: true
  }
];

// Get visible categories based on configuration
export const getVisibleCategories = (includeAdvanced = false): Category[] => {
  const showAdvanced = includeAdvanced || getEnvVar('REACT_APP_SHOW_ADVANCED_CATEGORIES') === 'true';
  
  return categories.filter(category => {
    if (category.hidden) return false;
    if (category.advanced && !showAdvanced) return false;
    return true;
  });
};

// Get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

// Get search categories (excludes 'todos')
export const getSearchCategories = (includeAdvanced = false): Category[] => {
  return getVisibleCategories(includeAdvanced).filter(category => category.id !== 'todos');
};