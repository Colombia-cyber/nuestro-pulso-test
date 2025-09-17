import React, { useState, useEffect, useCallback } from 'react';
import { FiShare2, FiCopy, FiClock, FiTrendingUp, FiRefreshCw, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  authorAvatar?: string;
  authorName?: string;
  readTime: string;
  category: string;
  perspective: 'progressive' | 'conservative' | 'neutral';
  trending: boolean;
  url: string;
  relatedArticles?: string[];
  locality?: string;
  tags: string[];
}

interface TimelineGroup {
  year: number;
  month: number;
  monthName: string;
  articles: NewsArticle[];
}

interface EnhancedNewsTimelineProps {
  topic?: string;
  locality?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const EnhancedNewsTimeline: React.FC<EnhancedNewsTimelineProps> = ({
  topic = '',
  locality = '',
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [visibleArticles, setVisibleArticles] = useState(10);

  // Mock data generator for realistic news articles
  const generateMockArticles = useCallback((): NewsArticle[] => {
    const sources = [
      { name: 'El Tiempo', icon: '📰' },
      { name: 'Semana', icon: '📊' },
      { name: 'Portafolio', icon: '💼' },
      { name: 'El Espectador', icon: '🔍' },
      { name: 'RCN Radio', icon: '📻' },
      { name: 'Caracol Radio', icon: '🎙️' },
      { name: 'La República', icon: '🏛️' },
      { name: 'Dinero', icon: '💰' }
    ];

    const categories = ['Política', 'Economía', 'Seguridad', 'Ambiente', 'Educación', 'Salud', 'Tecnología'];
    const localities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Nacional'];
    
    const articleTemplates = [
      {
        titleTemplate: "Gobierno Anuncia Nueva Estrategia para {topic} en {locality}",
        summaryTemplate: "El gobierno nacional presenta un plan integral para abordar los desafíos de {topic} con enfoque en {locality}."
      },
      {
        titleTemplate: "Congreso Debate Proyecto de Ley sobre {topic}",
        summaryTemplate: "Los legisladores analizan propuestas para mejorar la regulación en el sector de {topic}."
      },
      {
        titleTemplate: "Inversión Privada Impulsa Desarrollo de {topic} en {locality}",
        summaryTemplate: "Empresas nacionales e internacionales aumentan su inversión en proyectos de {topic}."
      },
      {
        titleTemplate: "Autoridades Locales Implementan Medidas para {topic}",
        summaryTemplate: "Las administraciones municipales toman acciones concretas para abordar temas relacionados con {topic}."
      }
    ];

    const articles: NewsArticle[] = [];
    const now = new Date();

    // Generate articles for the last 5 years
    for (let yearOffset = 0; yearOffset < 5; yearOffset++) {
      for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
        const articleDate = new Date(now.getFullYear() - yearOffset, now.getMonth() - monthOffset, 
          Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

        const articlesInMonth = Math.floor(Math.random() * 8) + 2; // 2-10 articles per month

        for (let i = 0; i < articlesInMonth; i++) {
          const source = sources[Math.floor(Math.random() * sources.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const selectedLocality = localities[Math.floor(Math.random() * localities.length)];
          const template = articleTemplates[Math.floor(Math.random() * articleTemplates.length)];
          const perspective: 'progressive' | 'conservative' | 'neutral' = 
            ['progressive', 'conservative', 'neutral'][Math.floor(Math.random() * 3)] as any;

          const article: NewsArticle = {
            id: `article-${yearOffset}-${monthOffset}-${i}`,
            title: template.titleTemplate
              .replace('{topic}', topic || category.toLowerCase())
              .replace('{locality}', selectedLocality),
            summary: template.summaryTemplate
              .replace('{topic}', topic || category.toLowerCase())
              .replace('{locality}', selectedLocality),
            source: source.name,
            publishedAt: articleDate.toISOString(),
            authorName: `Redacción ${source.name}`,
            authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(source.name)}&background=random`,
            readTime: `${Math.floor(Math.random() * 8) + 2} min`,
            category,
            perspective,
            trending: Math.random() > 0.7,
            url: `#article-${articleDate.getTime()}`,
            locality: selectedLocality,
            tags: [category.toLowerCase(), selectedLocality.toLowerCase()],
            imageUrl: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`
          };

          articles.push(article);
        }
      }
    }

    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [topic]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newArticles = generateMockArticles();
      setArticles(newArticles);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [generateMockArticles]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchArticles, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchArticles]);

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Group articles by year and month
  const groupedArticles: TimelineGroup[] = React.useMemo(() => {
    const groups: { [key: string]: NewsArticle[] } = {};
    
    articles.slice(0, visibleArticles).forEach(article => {
      const date = new Date(article.publishedAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(article);
    });

    return Object.entries(groups)
      .map(([key, articles]) => {
        const [year, month] = key.split('-').map(Number);
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        return {
          year,
          month,
          monthName: monthNames[month],
          articles: articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
  }, [articles, visibleArticles]);

  const handleCopyLink = async (article: NewsArticle) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + article.url);
      setCopiedLink(article.id);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.origin + article.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink(article);
    }
  };

  const toggleGroupExpansion = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case 'progressive': return 'bg-blue-100 text-blue-800';
      case 'conservative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerspectiveLabel = (perspective: string) => {
    switch (perspective) {
      case 'progressive': return '🔵 Progresista';
      case 'conservative': return '🔴 Conservadora';
      default: return '⚪ Neutral';
    }
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 10);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              📰 Timeline de Noticias {topic && `- ${topic}`}
            </h1>
            <p className="text-white/90">
              Últimas actualizaciones de los últimos 5 años • {locality && `${locality} • `}
              Actualización automática cada {refreshInterval / 1000}s
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={fetchArticles}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
            <p className="text-white/70 text-sm mt-1">
              Última actualización: {lastUpdated.toLocaleTimeString('es-CO')}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {groupedArticles.map((group) => {
          const groupKey = `${group.year}-${group.month}`;
          const isExpanded = expandedGroups.has(groupKey) || expandedGroups.size === 0;

          return (
            <div key={groupKey} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Month Header */}
              <div 
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleGroupExpansion(groupKey)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiClock className="text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {group.monthName} {group.year}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {group.articles.length} artículos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {group.articles.some(a => a.trending) && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <FiTrendingUp size={12} />
                        Trending
                      </span>
                    )}
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
              </div>

              {/* Articles */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {group.articles.map((article) => (
                    <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        {/* Author Avatar */}
                        <div className="flex-shrink-0">
                          <img 
                            src={article.authorAvatar} 
                            alt={article.authorName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Tags and metadata */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerspectiveColor(article.perspective)}`}>
                              {getPerspectiveLabel(article.perspective)}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {article.category}
                            </span>
                            {article.trending && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <FiTrendingUp size={10} />
                                Trending
                              </span>
                            )}
                            {article.locality && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                📍 {article.locality}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            {article.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.summary}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="font-medium">{article.source}</span>
                              <span>•</span>
                              <span>{article.authorName}</span>
                              <span>•</span>
                              <span>{formatDate(article.publishedAt)}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleShare(article)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Compartir"
                              >
                                <FiShare2 size={16} />
                              </button>
                              <button
                                onClick={() => handleCopyLink(article)}
                                className={`p-2 rounded-full transition-colors ${
                                  copiedLink === article.id
                                    ? 'text-green-600 bg-green-50'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                                title="Copiar enlace"
                              >
                                <FiCopy size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Article Image */}
                        {article.imageUrl && (
                          <div className="flex-shrink-0">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Load More Button */}
        {visibleArticles < articles.length && (
          <div className="text-center py-6">
            <button
              onClick={loadMoreArticles}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Cargar más artículos ({articles.length - visibleArticles} restantes)
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-gray-600">
              <FiRefreshCw className="animate-spin" />
              <span>Actualizando noticias...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNewsTimeline;