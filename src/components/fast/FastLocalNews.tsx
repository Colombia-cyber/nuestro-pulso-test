import React, { memo, useState, useEffect } from 'react';
import { FaFire, FaMapMarkerAlt, FaFilter, FaNewspaper, FaClock } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdUpdate, MdVerified } from 'react-icons/md';
import { FastLocalProps, NewsArticle } from './types';
import { FastNewsCard } from './FastNewsCard';
import { FastButton } from './FastButton';
import { useFastCallback, useFastLocalData } from './hooks/useFastCallback';

/**
 * FastLocalNews (fast-r7aqkx-225-d)
 * Ultra-fast local news component optimized for Colombian content
 * Features: instant updates, local filters, beautiful design
 */
export const FastLocalNews: React.FC<FastLocalProps & {
  onArticleClick?: (article: NewsArticle) => void;
  maxArticles?: number;
  showTrending?: boolean;
  autoRefresh?: boolean;
  compact?: boolean;
}> = memo(({
  region = 'colombia',
  city,
  country = 'colombia',
  localCategories = [],
  preferredLanguage = 'es',
  showLocalFirst = true,
  includeNational = true,
  onArticleClick,
  maxArticles = 20,
  showTrending = true,
  autoRefresh = true,
  compact = false,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'latest' | 'trending' | 'local'>('local');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const { localData, isLoading, loadLocalData } = useFastLocalData(region);

  // Load initial data
  useEffect(() => {
    loadLocalData('news', {
      city,
      category: selectedCategory,
      includeNational,
      maxItems: maxArticles
    });
  }, [loadLocalData, city, selectedCategory, includeNational, maxArticles]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setIsRefreshing(true);
      loadLocalData('news', {
        city,
        category: selectedCategory,
        includeNational,
        maxItems: maxArticles
      }).finally(() => {
        setIsRefreshing(false);
        setLastUpdate(new Date());
      });
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, loadLocalData, city, selectedCategory, includeNational, maxArticles]);

  const handleRefresh = useFastCallback(() => {
    setIsRefreshing(true);
    loadLocalData('news', {
      city,
      category: selectedCategory,
      includeNational,
      maxItems: maxArticles,
      forceRefresh: true
    }).finally(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    });
  }, [loadLocalData, city, selectedCategory, includeNational, maxArticles]);

  const handleCategoryChange = useFastCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleViewModeChange = useFastCallback((mode: 'latest' | 'trending' | 'local') => {
    setViewMode(mode);
  }, []);

  // Generate mock local news data
  const generateLocalNews = (): NewsArticle[] => {
    const baseNews: NewsArticle[] = [
      {
        id: 'local-1',
        title: 'Gobierno Nacional anuncia nueva reforma pensional para Colombia',
        summary: 'El presidente Gustavo Petro presenta los detalles de la reforma pensional que beneficiará a millones de colombianos.',
        source: 'El Tiempo',
        author: 'Redacción Política',
        publishedAt: new Date(Date.now() - 1800000), // 30 min ago
        category: 'Política',
        tags: ['reforma', 'pensiones', 'gobierno'],
        perspective: 'balanced',
        isLocal: true,
        location: 'Bogotá',
        trending: true,
        views: 15420,
        comments: 89,
        readTime: 5,
        verified: true,
        imageUrl: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=Reforma+Pensional'
      },
      {
        id: 'local-2',
        title: 'Alcaldía de Bogotá lanza programa de movilidad sostenible',
        summary: 'Nueva iniciativa busca reducir el tráfico y mejorar la calidad del aire en la capital colombiana.',
        source: 'Semana',
        author: 'Juan Carlos Méndez',
        publishedAt: new Date(Date.now() - 3600000), // 1 hour ago
        category: 'Ambiente',
        tags: ['movilidad', 'bogotá', 'sostenibilidad'],
        perspective: 'progressive',
        isLocal: true,
        location: 'Bogotá',
        trending: false,
        views: 8750,
        comments: 45,
        readTime: 3,
        verified: true,
        imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Movilidad+Sostenible'
      },
      {
        id: 'local-3',
        title: 'Economía colombiana muestra signos de recuperación',
        summary: 'Últimas cifras del DANE indican un crecimiento del PIB superior al esperado para el tercer trimestre.',
        source: 'Portafolio',
        author: 'María Elena Rodríguez',
        publishedAt: new Date(Date.now() - 7200000), // 2 hours ago
        category: 'Economía',
        tags: ['pib', 'crecimiento', 'dane'],
        perspective: 'balanced',
        isLocal: true,
        location: 'Colombia',
        trending: true,
        views: 12340,
        comments: 67,
        readTime: 4,
        verified: true,
        imageUrl: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Economia+Colombia'
      },
      {
        id: 'local-4',
        title: 'Proceso de paz total avanza en el Cauca',
        summary: 'Comunidades indígenas y campesinas participan en nuevos diálogos para la construcción de paz.',
        source: 'El Espectador',
        author: 'Ana Lucía Torres',
        publishedAt: new Date(Date.now() - 10800000), // 3 hours ago
        category: 'Seguridad',
        tags: ['paz', 'cauca', 'diálogos'],
        perspective: 'progressive',
        isLocal: true,
        location: 'Cauca',
        trending: false,
        views: 6890,
        comments: 23,
        readTime: 6,
        verified: true,
        imageUrl: 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Paz+Total'
      },
      {
        id: 'local-5',
        title: 'Universidad Nacional inaugura centro de investigación en IA',
        summary: 'Nueva instalación posicionará a Colombia como líder en inteligencia artificial en América Latina.',
        source: 'Caracol Radio',
        author: 'Carlos Andrés Vega',
        publishedAt: new Date(Date.now() - 14400000), // 4 hours ago
        category: 'Tecnología',
        tags: ['ia', 'universidad', 'investigación'],
        perspective: 'balanced',
        isLocal: true,
        location: 'Bogotá',
        trending: true,
        views: 9560,
        comments: 34,
        readTime: 4,
        verified: true,
        imageUrl: 'https://via.placeholder.com/400x250/EC4899/FFFFFF?text=IA+Colombia'
      }
    ];

    // Filter by category if selected
    if (selectedCategory) {
      return baseNews.filter(article => 
        article.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by view mode
    switch (viewMode) {
      case 'trending':
        return baseNews.filter(article => article.trending);
      case 'local':
        return baseNews.filter(article => article.isLocal);
      case 'latest':
      default:
        return baseNews.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }
  };

  const news = generateLocalNews();
  const trendingNews = news.filter(article => article.trending);
  const categories = [
    { id: 'politica', name: 'Política', icon: '🏛️', count: 12 },
    { id: 'economia', name: 'Economía', icon: '📈', count: 8 },
    { id: 'seguridad', name: 'Seguridad', icon: '🚨', count: 6 },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱', count: 4 },
    { id: 'tecnologia', name: 'Tecnología', icon: '💻', count: 5 },
  ];

  return (
    <div className={`w-full ${className}`} data-testid={testId} {...props}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Colombia">🇨🇴</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaNewspaper className="w-6 h-6 text-blue-600" />
                Noticias de Colombia
              </h2>
              <p className="text-sm text-gray-600">
                Cobertura local y nacional • Última actualización: {lastUpdate.toLocaleTimeString('es-CO')}
              </p>
            </div>
          </div>
          
          {/* Refresh Button */}
          <FastButton
            onClick={handleRefresh}
            loading={isRefreshing}
            variant="secondary"
            size="sm"
            icon={<MdUpdate className="w-4 h-4" />}
            className={isRefreshing ? 'animate-pulse' : ''}
          >
            Actualizar
          </FastButton>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['local', 'trending', 'latest'].map((mode) => (
              <button
                key={mode}
                onClick={() => handleViewModeChange(mode as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === mode
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {mode === 'local' && <FaMapMarkerAlt className="w-3 h-3" />}
                {mode === 'trending' && <FaFire className="w-3 h-3" />}
                {mode === 'latest' && <FaClock className="w-3 h-3" />}
                {mode === 'local' ? 'Local' : mode === 'trending' ? 'Trending' : 'Recientes'}
              </button>
            ))}
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">EN VIVO</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex-shrink-0 flex items-center gap-1 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
              <span className="ml-1 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {showTrending && trendingNews.length > 0 && viewMode !== 'trending' && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full">
              <FaFire className="w-4 h-4" />
              <span className="font-bold">Trending Colombia</span>
            </div>
            <span className="text-sm text-gray-600">{trendingNews.length} artículos</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trendingNews.slice(0, 4).map((article) => (
              <FastNewsCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                showPerspectiveBadge={true}
                compact={compact}
                priority="high"
              />
            ))}
          </div>
        </div>
      )}

      {/* Main News Grid */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="flex gap-4">
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <>
            {news.map((article) => (
              <FastNewsCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
                showPerspectiveBadge={true}
                compact={compact}
              />
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No hay noticias disponibles
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory 
                ? `No se encontraron noticias en la categoría "${selectedCategory}"`
                : 'No hay noticias disponibles en este momento'
              }
            </p>
            <FastButton onClick={handleRefresh} variant="primary">
              Intentar de nuevo
            </FastButton>
          </div>
        )}
      </div>

      {/* Load More */}
      {news.length >= maxArticles && (
        <div className="text-center mt-8">
          <FastButton variant="secondary" size="lg">
            Ver más noticias
          </FastButton>
        </div>
      )}
    </div>
  );
});

FastLocalNews.displayName = 'FastLocalNews';