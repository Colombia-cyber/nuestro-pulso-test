// Category configuration for Colombian News Platform
import { CategoryConfig, NewsCategory } from '../types/news';

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

export const NEWS_CATEGORIES: CategoryConfig[] = [
  {
    id: 'congress_legislation',
    name: 'Congreso & Legislación',
    icon: '🏛️',
    color: 'bg-blue-600',
    description: 'Actividad legislativa, proyectos de ley y decisiones del Congreso colombiano'
  },
  {
    id: 'terror_crime_drugs',
    name: 'Terror, Crimen & Drogas',
    icon: '⚠️',
    color: 'bg-red-600',
    description: 'Seguridad nacional, narcotráfico y actividad criminal'
  },
  {
    id: 'employment_health',
    name: 'Empleo & Salud',
    icon: '💼',
    color: 'bg-green-600',
    description: 'Mercado laboral, salud pública y políticas sociales'
  },
  {
    id: 'gustavo_petro',
    name: 'Gustavo Petro',
    icon: '🎯',
    color: 'bg-yellow-600',
    description: 'Noticias y declaraciones del presidente Gustavo Petro'
  },
  {
    id: 'donald_trump',
    name: 'Donald Trump',
    icon: '🇺🇸',
    color: 'bg-orange-600',
    description: 'Impacto de políticas estadounidenses en Colombia'
  },
  {
    id: 'right_wing',
    name: 'Derecha',
    icon: '➡️',
    color: 'bg-blue-800',
    description: 'Perspectiva y análisis desde la derecha política'
  },
  {
    id: 'left_wing',
    name: 'Izquierda',
    icon: '⬅️',
    color: 'bg-red-800',
    description: 'Perspectiva y análisis desde la izquierda política'
  },
  {
    id: 'world_news',
    name: 'Noticias Mundiales',
    icon: '🌍',
    color: 'bg-purple-600',
    description: 'Noticias internacionales relevantes para Colombia'
  },
  {
    id: 'local_news',
    name: 'Noticias Locales',
    icon: '🏠',
    color: 'bg-emerald-600',
    description: 'Noticias locales de ciudades y regiones de Colombia'
  }
];

export const getCategoryConfig = (categoryId: NewsCategory): CategoryConfig => {
  return NEWS_CATEGORIES.find(cat => cat.id === categoryId) || NEWS_CATEGORIES[0];
};

export const SOCIAL_PLATFORMS = {
  youtube: {
    name: 'YouTube',
    icon: '📺',
    color: 'bg-red-600',
    baseUrl: 'https://www.youtube.com'
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-600',
    baseUrl: 'https://www.facebook.com'
  },
  twitter: {
    name: 'Twitter',
    icon: '🐦',
    color: 'bg-sky-500',
    baseUrl: 'https://twitter.com'
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    color: 'bg-green-500',
    baseUrl: 'https://wa.me'
  },
  local: {
    name: 'Local',
    icon: '📱',
    color: 'bg-gray-600',
    baseUrl: ''
  }
};

// Colombian flag colors for theming
export const COLOMBIA_COLORS = {
  yellow: '#FDE047', // Colombia flag yellow
  blue: '#1D4ED8',   // Colombia flag blue  
  red: '#DC2626',    // Colombia flag red
  white: '#FFFFFF'
};

export const COLOMBIA_GRADIENT = 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500';
export const COLOMBIA_GRADIENT_LIGHT = 'bg-gradient-to-r from-yellow-200 via-blue-300 to-red-300';

// Legacy categories for backward compatibility
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
    hidden: getEnvVar('REACT_APP_HIDE_TECHNOLOGY_CATEGORY') === 'true'
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