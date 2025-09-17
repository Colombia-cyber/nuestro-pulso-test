import React, { useState, useEffect, useCallback } from 'react';
import { newsService, NewsArticle, LiveNewsFeed, NewsTimeline } from '../services/newsService';

interface EnhancedNewsFeedProps {
  topic?: string;
  onNavigate?: (view: string, articleId?: string) => void;
}

const EnhancedNewsFeed: React.FC<EnhancedNewsFeedProps> = ({ topic = '', onNavigate }) => {
  const [feed, setFeed] = useState<LiveNewsFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'feed' | 'categories'>('feed');
  const [visibleArticles, setVisibleArticles] = useState<NewsArticle[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showShareModal, setShowShareModal] = useState<NewsArticle | null>(null);
  const [copiedArticle, setCopiedArticle] = useState<string | null>(null);

  // Initialize feed and start live updates
  useEffect(() => {
    const initializeFeed = async () => {
      setLoading(true);
      try {
        const newsFeed = await newsService.getLiveNewsFeed(topic);
        setFeed(newsFeed);
        setVisibleArticles(newsFeed.articles);
        
        // Auto-select current year
        if (newsFeed.timeline.length > 0) {
          setSelectedYear(newsFeed.timeline[0].year);
        }
      } catch (error) {
        console.error('Failed to load news feed:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeFeed();

    // Subscribe to live updates
    const unsubscribe = newsService.subscribe((updatedFeed) => {
      setFeed(updatedFeed);
      // Only update visible articles if we're in feed mode
      if (viewMode === 'feed') {
        setVisibleArticles(updatedFeed.articles);
      }
    });

    // Start live updates
    newsService.startLiveUpdates(topic);

    return () => {
      unsubscribe();
      newsService.stopLiveUpdates();
    };
  }, [topic]);

  // Handle view mode changes
  useEffect(() => {
    if (!feed) return;

    switch (viewMode) {
      case 'feed':
        setVisibleArticles(feed.articles);
        break;
      case 'timeline':
        if (selectedYear && selectedMonth !== null) {
          const articles = newsService.getArticlesByPeriod(selectedYear, selectedMonth);
          setVisibleArticles(articles);
        } else if (selectedYear) {
          const articles = newsService.getArticlesByPeriod(selectedYear);
          setVisibleArticles(articles);
        }
        break;
    }
  }, [feed, viewMode, selectedYear, selectedMonth]);

  const loadMoreArticles = useCallback(async () => {
    if (!feed || loadingMore) return;

    setLoadingMore(true);
    try {
      const moreArticles = await newsService.loadMoreArticles(visibleArticles.length);
      setVisibleArticles(prev => [...prev, ...moreArticles]);
    } catch (error) {
      console.error('Failed to load more articles:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [feed, visibleArticles.length, loadingMore]);

  const handleArticleClick = useCallback((article: NewsArticle) => {
    if (onNavigate) {
      onNavigate('article', article.id);
    }
  }, [onNavigate]);

  const handleTimelineNavigation = useCallback((year: number, month?: number) => {
    setSelectedYear(year);
    setSelectedMonth(month !== undefined ? month : null);
    setViewMode('timeline');
  }, []);

  const handleShareArticle = useCallback((article: NewsArticle) => {
    setShowShareModal(article);
  }, []);

  const handleCopyLink = useCallback(async (article: NewsArticle) => {
    const success = await newsService.copyArticleLink(article);
    if (success) {
      setCopiedArticle(article.id);
      setTimeout(() => setCopiedArticle(null), 2000);
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatTimeAgo = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)} h`;
    if (diffInMinutes < 10080) return `hace ${Math.floor(diffInMinutes / 1440)} días`;
    
    return formatDate(dateString);
  }, [formatDate]);

  const PerspectiveBadge: React.FC<{ perspective: string }> = ({ perspective }) => {
    const colors = {
      progressive: 'bg-blue-100 text-blue-800',
      conservative: 'bg-red-100 text-red-800',
      neutral: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      progressive: 'Progresista',
      conservative: 'Conservadora',
      neutral: 'Neutral'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[perspective as keyof typeof colors] || colors.neutral}`}>
        {labels[perspective as keyof typeof labels] || 'Neutral'}
      </span>
    );
  };

  const ArticleCard: React.FC<{ article: NewsArticle; showTimestamp?: boolean }> = ({ 
    article, 
    showTimestamp = true 
  }) => (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => handleArticleClick(article)}
    >
      <div className="p-6">
        {/* Header with badges and metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{article.publisherIcon}</span>
            <span className="text-sm font-medium text-gray-600">{article.source}</span>
            {article.trending && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                🔥 Trending
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <PerspectiveBadge perspective={article.perspective} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShareArticle(article);
              }}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              title="Compartir"
            >
              📤
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink(article);
              }}
              className={`transition-colors ${
                copiedArticle === article.id 
                  ? 'text-green-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={copiedArticle === article.id ? 'Copiado!' : 'Copiar enlace'}
            >
              {copiedArticle === article.id ? '✅' : '🔗'}
            </button>
          </div>
        </div>

        {/* Article content */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.summary}
        </p>

        {/* Footer with author and metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            {article.authorAvatar && (
              <img 
                src={article.authorAvatar} 
                alt={article.author}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            {article.shareCount !== undefined && (
              <>
                <span>•</span>
                <span>📤 {article.shareCount}</span>
              </>
            )}
          </div>
          {showTimestamp && (
            <span>{formatTimeAgo(article.publishedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );

  const TimelineNavigation: React.FC<{ timeline: NewsTimeline[] }> = ({ timeline }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Navegación Temporal</h3>
      
      <div className="space-y-4">
        {timeline.map((year) => (
          <div key={year.year}>
            <button
              onClick={() => handleTimelineNavigation(year.year)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedYear === year.year && selectedMonth === null
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{year.year}</span>
                <span className="text-sm text-gray-500">
                  {year.months.reduce((total, month) => total + month.count, 0)} artículos
                </span>
              </div>
            </button>

            {selectedYear === year.year && (
              <div className="mt-2 ml-4 space-y-1">
                {year.months.map((month) => (
                  <button
                    key={month.month}
                    onClick={() => handleTimelineNavigation(year.year, month.month)}
                    className={`block w-full text-left p-2 rounded transition-colors text-sm ${
                      selectedMonth === month.month
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{month.monthName}</span>
                      <span className="text-xs text-gray-500">{month.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ShareModal: React.FC<{ article: NewsArticle; onClose: () => void }> = ({ 
    article, 
    onClose 
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Compartir Artículo</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
          <p className="text-sm text-gray-600">{article.source} • {formatDate(article.publishedAt)}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              const url = newsService.generateShareUrl(article);
              const text = `${article.title} - ${article.source}`;
              if (navigator.share) {
                navigator.share({ title: text, url });
              } else {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
              }
            }}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>🐦</span>
            <span>Compartir en Twitter</span>
          </button>

          <button
            onClick={() => {
              const url = newsService.generateShareUrl(article);
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            }}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>📘</span>
            <span>Compartir en Facebook</span>
          </button>

          <button
            onClick={() => handleCopyLink(article)}
            className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <span>🔗</span>
            <span>Copiar enlace</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando noticias en vivo...</h3>
          <p className="text-gray-500">Obteniendo las últimas actualizaciones</p>
        </div>
      </div>
    );
  }

  if (!feed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No se pudieron cargar las noticias</h3>
          <p className="text-gray-600">Intenta recargar la página</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              📰 Noticias en Vivo{topic && ` - ${topic}`}
            </h1>
            <p className="text-white/90 mb-4">
              Cobertura completa con perspectivas balanceadas y actualizaciones cada 30 segundos
            </p>
            <div className="flex items-center space-x-6 text-white/80 text-sm">
              <span>🔄 Actualizado: {feed.lastUpdated.toLocaleTimeString('es-CO')}</span>
              <span>📊 {feed.totalArticles} artículos</span>
              <span>⚖️ Múltiples perspectivas</span>
              <span>🕐 Últimos 5 años</span>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Vista</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('feed')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'feed'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🔥 Feed en Vivo
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'timeline'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📅 Línea Temporal
                  </button>
                  <button
                    onClick={() => setViewMode('categories')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'categories'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📂 Categorías
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Timeline Navigation */}
            {viewMode === 'timeline' && feed.timeline && (
              <div className="lg:col-span-1">
                <TimelineNavigation timeline={feed.timeline} />
              </div>
            )}

            {/* Main Content */}
            <div className={viewMode === 'timeline' ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {/* Period Header for Timeline View */}
              {viewMode === 'timeline' && selectedYear && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedMonth !== null 
                      ? `${feed.timeline.find(y => y.year === selectedYear)?.months.find(m => m.month === selectedMonth)?.monthName} ${selectedYear}`
                      : `Año ${selectedYear}`
                    }
                  </h2>
                  <p className="text-gray-600">
                    {visibleArticles.length} artículos encontrados
                  </p>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleArticles.map((article) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article}
                    showTimestamp={viewMode !== 'timeline'}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {feed.hasMore && viewMode === 'feed' && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreArticles}
                    disabled={loadingMore}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loadingMore ? 'Cargando...' : 'Cargar más artículos'}
                  </button>
                </div>
              )}

              {/* Empty State */}
              {visibleArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No hay artículos para este período
                  </h3>
                  <p className="text-gray-600">
                    Intenta seleccionar otro año o mes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          article={showShareModal} 
          onClose={() => setShowShareModal(null)} 
        />
      )}
    </div>
  );
};

export default EnhancedNewsFeed;