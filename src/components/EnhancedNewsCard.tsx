import React, { useState, useEffect } from 'react';
import { NewsItem, NewsSource } from '../types/news';
import { FaClock, FaEye, FaShare, FaBookmark, FaComment, FaFire, FaBolt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdNewReleases } from 'react-icons/md';
import { realTimeNewsService } from '../services/realTimeNewsService';

interface EnhancedNewsCardProps {
  article: NewsItem;
  onArticleClick?: (article: NewsItem) => void;
  showPerspectiveBadge?: boolean;
  compact?: boolean;
  showFreshnessIndicator?: boolean;
  priority?: 'breaking' | 'trending' | 'normal';
}

const EnhancedNewsCard: React.FC<EnhancedNewsCardProps> = ({ 
  article, 
  onArticleClick,
  showPerspectiveBadge = true,
  compact = false,
  showFreshnessIndicator = true,
  priority = 'normal'
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 5000) + 100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate view count updates for active articles
    if (article.trending) {
      const interval = setInterval(() => {
        setViewCount(prev => prev + Math.floor(Math.random() * 3));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [article.trending]);

  const freshnessInfo = realTimeNewsService.getFreshnessIndicator(article.publishedAt);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Ahora mismo';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getSourceIcon = (source: string | NewsSource) => {
    const sourceName = typeof source === 'string' ? source : source.name;
    const sourceIcons: Record<string, string> = {
      'El Tiempo': '📰',
      'El Espectador': '📊',
      'Portafolio': '💼',
      'Semana': '📌',
      'La República': '🏛️',
      'RCN Radio': '📻',
      'Contexto Ganadero': '🐄',
      'DANE': '📈',
      'Ministerio de Salud': '🏥',
      'Fuerzas Militares': '🛡️',
      'Congreso República': '🏛️',
      'TransMilenio': '🚌',
      'Cancillería': '🌍',
      'Nuestro Pulso': '💫'
    };
    return sourceIcons[sourceName] || '📄';
  };

  const getPerspectiveBadge = () => {
    if (!showPerspectiveBadge) return null;
    
    switch (article.perspective) {
      case 'progressive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Progresista
          </span>
        );
      case 'conservative':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Conservador
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            <MdVerified className="w-3 h-3" />
            Balanceado
          </span>
        );
    }
  };

  const getPriorityIndicator = () => {
    switch (priority) {
      case 'breaking':
        return (
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-600 text-white text-xs font-bold animate-pulse">
              <FaBolt className="w-3 h-3" />
              ÚLTIMA HORA
            </div>
          </div>
        );
      case 'trending':
        return (
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
              <FaFire className="w-3 h-3" />
              TRENDING
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: article.shareUrl || window.location.href
        });
      } else {
        await navigator.clipboard.writeText(article.shareUrl || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getCategoryColor = (category: string | any) => {
    const categoryStr = typeof category === 'string' ? category : category;
    const colors: Record<string, string> = {
      'Política': 'bg-blue-500',
      'Economía': 'bg-green-500',
      'Seguridad': 'bg-red-500',
      'Ambiente': 'bg-emerald-500',
      'Educación': 'bg-purple-500',
      'Salud': 'bg-pink-500',
      'Congreso': 'bg-indigo-500',
      'Legislación': 'bg-violet-500',
      'Terror/Crimen/Drogas': 'bg-red-600',
      'El Pulso': 'bg-yellow-500',
      'Local': 'bg-green-400',
      'Mundial': 'bg-blue-400',
      'Última Hora': 'bg-red-600'
    };
    return colors[categoryStr] || 'bg-gray-500';
  };

  if (compact) {
    return (
      <div 
        className={`group cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
          isHovered ? 'shadow-xl shadow-black/10' : 'shadow-md'
        }`}
        onClick={() => onArticleClick?.(article)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden relative">
          {getPriorityIndicator()}
          
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-colombia-blue transition-colors">
                  {article.title}
                </h3>
              </div>
              
              {!imageError && article.imageUrl && (
                <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-gray-600">
                  {getSourceIcon(article.source)}
                  {typeof article.source === 'string' ? article.source : article.source.name}
                </span>
                
                {showFreshnessIndicator && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${freshnessInfo.color}`}>
                    <span>{freshnessInfo.icon}</span>
                    {formatDate(article.publishedAt)}
                  </span>
                )}
              </div>
              
              {article.readTime && (
                <span className="text-gray-500 flex items-center gap-1">
                  <FaClock className="w-3 h-3" />
                  {article.readTime}
                </span>
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              {getPerspectiveBadge()}
              
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(article.category)}`}>
                {typeof article.category === 'string' ? article.category : article.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Full card layout
  return (
    <div 
      className={`group cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
        isHovered ? 'shadow-2xl shadow-black/20' : 'shadow-lg'
      } bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden relative`}
      onClick={() => onArticleClick?.(article)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority indicator */}
      {getPriorityIndicator()}
      
      {/* Image header with gradient overlay */}
      {!imageError && article.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="glass-morphism px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md border border-white/20">
              {getSourceIcon(article.source)} {typeof article.source === 'string' ? article.source : article.source.name}
            </span>
            
            {article.trending && (
              <span className="glass-morphism bg-orange-500/80 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md border border-orange-300/20 animate-pulse">
                <FaFire className="inline w-3 h-3 mr-1" />
                TRENDING
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleBookmark}
              className={`glass-morphism p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                isBookmarked 
                  ? 'bg-yellow-500/80 text-white' 
                  : 'text-white hover:bg-white/20'
              }`}
              title="Guardar"
            >
              <FaBookmark className="w-3 h-3" />
            </button>
            
            <button
              onClick={handleShare}
              className="glass-morphism p-2 rounded-full text-white hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
              title="Compartir"
            >
              <FaShare className="w-3 h-3" />
            </button>
          </div>

          {/* Bottom info on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                {showFreshnessIndicator && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/20 ${freshnessInfo.color} bg-white/90`}>
                    <span>{freshnessInfo.icon}</span>
                    {formatDate(article.publishedAt)}
                  </div>
                )}
              </div>
              
              {article.readTime && (
                <div className="glass-morphism px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md border border-white/20">
                  <FaClock className="inline w-3 h-3 mr-1" />
                  {article.readTime}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* No image fallback header */}
        {(imageError || !article.imageUrl) && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getSourceIcon(article.source)}</span>
              <div>
                <div className="font-medium text-gray-900">
                  {typeof article.source === 'string' ? article.source : article.source.name}
                </div>
                {showFreshnessIndicator && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${freshnessInfo.color} mt-1`}>
                    <span>{freshnessInfo.icon}</span>
                    {formatDate(article.publishedAt)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-all ${
                  isBookmarked 
                    ? 'bg-yellow-500 text-white' 
                    : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
              >
                <FaBookmark className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
              >
                <FaShare className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-colombia-blue transition-colors duration-300">
          {article.title}
        </h3>
        
        {/* Summary */}
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 4).map((tag, index) => (
              <span 
                key={index}
                className="glass-morphism px-3 py-1 rounded-full text-xs font-medium bg-gray-50/80 text-gray-700 border border-gray-200/50 hover:bg-gray-100/80 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Badges and meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {getPerspectiveBadge()}
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(article.category)}`}>
              {typeof article.category === 'string' ? article.category : article.category}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaEye className="w-3 h-3" />
              {viewCount.toLocaleString()}
            </div>
            
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-colombia-blue to-colombia-yellow rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{article.author}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Related articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1">
            <FaComment className="w-3 h-3" />
            {article.relatedArticles.length} artículo{article.relatedArticles.length > 1 ? 's' : ''} relacionado{article.relatedArticles.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {/* Hover effects overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-colombia-blue/5 via-transparent to-colombia-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Copy feedback */}
      {copied && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          ✅ Enlace copiado
        </div>
      )}
    </div>
  );
};

export default EnhancedNewsCard;