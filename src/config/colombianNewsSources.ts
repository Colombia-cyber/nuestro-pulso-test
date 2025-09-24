import React from 'react';
import { FaFlag, FaGlobeAmericas, FaNewspaper } from 'react-icons/fa';
import { MdSecurity, MdTrendingUp } from 'react-icons/md';
import { FaClock } from 'react-icons/fa';

// Colombian News Source Configuration
export interface ColombianNewsSource {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  color: string;
  isLive: boolean;
  articleCount: number;
  category: 'colombia' | 'security' | 'world' | 'trending' | 'breaking';
  sources: string[]; // Actual news sources to filter by
}

// Pre-configured Colombian news sources
export const COLOMBIAN_NEWS_SOURCES: ColombianNewsSource[] = [
  {
    id: 'colombia-nacional',
    name: 'Colombia Nacional',
    shortName: 'Colombia',
    description: 'Noticias nacionales y política colombiana',
    icon: React.createElement(FaFlag, { className: 'w-5 h-5' }),
    gradient: 'from-yellow-400 via-blue-500 to-red-500',
    color: 'colombia',
    isLive: true,
    articleCount: 24,
    category: 'colombia',
    sources: ['El Tiempo', 'Semana', 'El Espectador', 'Portafolio', 'La República']
  },
  {
    id: 'seguridad-colombia',
    name: 'Seguridad Colombia',
    shortName: 'Seguridad',
    description: 'Seguridad nacional y orden público',
    icon: React.createElement(MdSecurity, { className: 'w-5 h-5' }),
    gradient: 'from-red-600 to-red-800',
    color: 'red',
    isLive: true,
    articleCount: 12,
    category: 'security',
    sources: ['RCN Radio', 'El Tiempo', 'El Espectador']
  },
  {
    id: 'mundo-internacional',
    name: 'Internacional',
    shortName: 'Mundial',
    description: 'Noticias internacionales relevantes para Colombia',
    icon: React.createElement(FaGlobeAmericas, { className: 'w-5 h-5' }),
    gradient: 'from-blue-500 to-indigo-600',
    color: 'blue',
    isLive: false,
    articleCount: 18,
    category: 'world',
    sources: ['BBC', 'Reuters', 'Google News Global']
  },
  {
    id: 'tendencias-sociales',
    name: 'Tendencias',
    shortName: 'Trending',
    description: 'Lo más comentado y viral en Colombia',
    icon: React.createElement(MdTrendingUp, { className: 'w-5 h-5' }),
    gradient: 'from-purple-500 to-pink-600',
    color: 'purple',
    isLive: false,
    articleCount: 15,
    category: 'trending',
    sources: ['Semana', 'El Tiempo', 'El Espectador']
  },
  {
    id: 'ultima-hora',
    name: 'Última Hora',
    shortName: 'Breaking',
    description: 'Noticias de última hora y desarrollos en vivo',
    icon: React.createElement(FaClock, { className: 'w-5 h-5' }),
    gradient: 'from-orange-500 to-red-600',
    color: 'orange',
    isLive: true,
    articleCount: 8,
    category: 'breaking',
    sources: ['Redacción', 'El Tiempo', 'RCN Radio', 'Semana']
  },
  {
    id: 'economia-colombia',
    name: 'Economía',
    shortName: 'Economía',
    description: 'Economía nacional, mercados y finanzas',
    icon: React.createElement(FaNewspaper, { className: 'w-5 h-5' }),
    gradient: 'from-green-500 to-teal-600',
    color: 'green',
    isLive: false,
    articleCount: 21,
    category: 'colombia',
    sources: ['Portafolio', 'La República', 'DANE']
  }
];