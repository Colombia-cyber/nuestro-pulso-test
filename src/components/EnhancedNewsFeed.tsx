/**
 * Enhanced NewsFeed/Live News Component
 * 
 * This component implements a vibrant, glassmorphic card layout for the Colombian civic engagement platform
 * with maximum clarity, interactivity, and responsiveness as referenced in the deployment screenshot.
 * 
 * Reference design: ![image2](image2) - glassmorphic cards with Colombian flag gradients and clear category badges
 */

import React, { useState, useEffect } from 'react';
import { FiShare2, FiBookmark, FiExternalLink, FiClock, FiEye, FiPlay, FiFilter } from 'react-icons/fi';
import { BiShield, BiTrendingUp } from 'react-icons/bi';

// Types for news articles
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  source: string;
  publishedAt: string;
  url: string;
  readingTime: number;
  thumbnail?: string;
  isVideo?: boolean;
}

type NewsCategory = 'crime' | 'drugs' | 'corruption' | 'police' | 'terror' | 'right-wing-politics' | 'policy' | 'economy' | 'social' | 'security' | 'atmosphere';

// Category configurations
const categoryConfig: Record<NewsCategory, { label: string; color: string; bgColor: string; icon: string }> = {
  'crime': { label: 'Crimen', color: 'text-red-700', bgColor: 'bg-red-100', icon: '🚨' },
  'drugs': { label: 'Drogas', color: 'text-orange-700', bgColor: 'bg-orange-100', icon: '💊' },
  'corruption': { label: 'Corrupción', color: 'text-purple-700', bgColor: 'bg-purple-100', icon: '⚖️' },
  'police': { label: 'Policía', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: '👮' },
  'terror': { label: 'Terrorismo', color: 'text-red-800', bgColor: 'bg-red-200', icon: '💥' },
  'right-wing-politics': { label: 'Política Derecha', color: 'text-indigo-700', bgColor: 'bg-indigo-100', icon: '🗳️' },
  'policy': { label: 'Política', color: 'text-colombia-blue', bgColor: 'bg-blue-50', icon: '📋' },
  'economy': { label: 'Economía', color: 'text-green-700', bgColor: 'bg-green-100', icon: '💰' },
  'social': { label: 'Social', color: 'text-pink-700', bgColor: 'bg-pink-100', icon: '👥' },
  'security': { label: 'Seguridad', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: '🛡️' },
  'atmosphere': { label: 'Ambiente', color: 'text-emerald-700', bgColor: 'bg-emerald-100', icon: '🌿' },
};

// Mock news data - TODO: Replace with actual API integration
const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Nuevo plan de seguridad ciudadana presenta avances significativos en Bogotá',
    summary: 'Las autoridades implementan nuevas estrategias tecnológicas para mejorar la seguridad en la capital colombiana...',
    category: 'security',
    verificationStatus: 'verified',
    source: 'El Tiempo',
    publishedAt: '2024-01-15T10:30:00Z',
    url: '#',
    readingTime: 3,
  },
  {
    id: '2',
    title: 'Corrupción en contratos públicos: Fiscalía abre investigación',
    summary: 'Se investigan irregularidades en la adjudicación de contratos por valor de 50 mil millones de pesos...',
    category: 'corruption',
    verificationStatus: 'verified',
    source: 'Semana',
    publishedAt: '2024-01-15T08:15:00Z',
    url: '#',
    readingTime: 5,
  },
  {
    id: '3',
    title: 'Operativo antidrogas incauta 2 toneladas de cocaína en el puerto de Cartagena',
    summary: 'La Policía Nacional realizó una de las incautaciones más grandes del año en coordinación con autoridades internacionales...',
    category: 'drugs',
    verificationStatus: 'verified',
    source: 'RCN Noticias',
    publishedAt: '2024-01-15T07:45:00Z',
    url: '#',
    readingTime: 4,
    isVideo: true,
  },
  {
    id: '4',
    title: 'Reforma tributaria: Nuevas medidas para fortalecer la economía nacional',
    summary: 'El gobierno presenta propuestas para modernizar el sistema tributario y promover la inversión...',
    category: 'economy',
    verificationStatus: 'pending',
    source: 'Portafolio',
    publishedAt: '2024-01-15T06:00:00Z',
    url: '#',
    readingTime: 6,
  },
  {
    id: '5',
    title: 'Protestas estudiantiles exigen mayor inversión en educación pública',
    summary: 'Miles de estudiantes se movilizan pacíficamente en las principales ciudades del país...',
    category: 'social',
    verificationStatus: 'verified',
    source: 'Caracol Noticias',
    publishedAt: '2024-01-14T20:30:00Z',
    url: '#',
    readingTime: 4,
  },
  {
    id: '6',
    title: 'Política ambiental: Colombia lidera iniciativas de reforestación en América Latina',
    summary: 'El país implementa programas innovadores para la conservación de bosques y biodiversidad...',
    category: 'atmosphere',
    verificationStatus: 'verified',
    source: 'El Espectador',
    publishedAt: '2024-01-14T18:15:00Z',
    url: '#',
    readingTime: 7,
  },
];

const EnhancedNewsFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsData);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [loading, setLoading] = useState(false);

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const displayedArticles = filteredArticles.slice(0, visibleArticles);

  // Format relative time
  const formatRelativeTime = (publishedAt: string): string => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  // Load more articles
  const loadMoreArticles = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVisibleArticles(prev => prev + 6);
      setLoading(false);
    }, 1000);
  };

  // Get verification status display
  const getVerificationBadge = (status: NewsArticle['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return (
          <div className="flex items-center gap-1 text-green-600 text-xs">
            <BiShield className="w-3 h-3" />
            <span>Verificado</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 text-yellow-600 text-xs">
            <FiClock className="w-3 h-3" />
            <span>Pendiente</span>
          </div>
        );
      case 'unverified':
        return (
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <FiEye className="w-3 h-3" />
            <span>Sin verificar</span>
          </div>
        );
    }
  };

  // TODO: Replace with actual API integration
  useEffect(() => {
    // This would be replaced with actual API calls
    // fetchNewsFromAPI(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-colombia-gradient bg-clip-text text-transparent mb-4">
            📰 Noticias en Vivo
          </h1>
          <p className="text-gray-600 text-lg">
            Mantente informado con las últimas noticias de Colombia
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-colombia-gradient text-white shadow-lg scale-105'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:scale-105'
              }`}
            >
              <FiFilter className="inline w-4 h-4 mr-2" />
              Todas
            </button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as NewsCategory)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-colombia-gradient text-white shadow-lg scale-105'
                    : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:scale-105'
                }`}
              >
                <span className="mr-2">{config.icon}</span>
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedArticles.map((article, index) => (
            <article
              key={article.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-glassmorphic opacity-80"></div>
              
              {/* Content */}
              <div className="relative p-6">
                {/* Category Badge and Verification */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryConfig[article.category].bgColor} ${categoryConfig[article.category].color}`}>
                    <span className="mr-1">{categoryConfig[article.category].icon}</span>
                    {categoryConfig[article.category].label}
                  </span>
                  {getVerificationBadge(article.verificationStatus)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-colombia-blue transition-colors">
                  {article.isVideo && <FiPlay className="inline w-4 h-4 mr-2 text-red-500" />}
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{article.source}</span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {article.readingTime} min
                    </span>
                  </div>
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors group/btn">
                      <FiShare2 className="w-4 h-4 text-gray-700 group-hover/btn:text-colombia-blue" />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors group/btn">
                      <FiBookmark className="w-4 h-4 text-gray-700 group-hover/btn:text-colombia-blue" />
                    </button>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-colombia-gradient text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Leer más
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Trending indicator for popular articles */}
              {index < 3 && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                    <BiTrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredArticles.length > displayedArticles.length && (
          <div className="text-center">
            <button
              onClick={loadMoreArticles}
              disabled={loading}
              className="px-8 py-4 bg-colombia-gradient text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Cargando...
                </div>
              ) : (
                'Cargar más noticias'
              )}
            </button>
          </div>
        )}

        {/* Video/Reels Section Placeholder */}
        <div className="mt-16 p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎬 Pulso Reels
            </h2>
            <p className="text-gray-600 mb-6">
              Próximamente: Videos y contenido multimedia en vivo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center"
                >
                  <FiPlay className="w-12 h-12 text-gray-500" />
                </div>
              ))}
            </div>
            {/* TODO: Integrate actual video content when available */}
            <p className="text-sm text-gray-500 mt-4">
              TODO: Integrar con API de videos y contenido multimedia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNewsFeed;