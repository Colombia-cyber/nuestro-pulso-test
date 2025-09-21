import React, { useState } from 'react';
import { NewsItem, NewsSource } from '../types/news';

interface EnhancedNewsCardProps {
  article: NewsItem;
  onArticleClick?: (article: NewsItem) => void;
  showPerspectiveBadge?: boolean;
  compact?: boolean;
}

const EnhancedNewsCard: React.FC<EnhancedNewsCardProps> = ({ 
  article, 
  onArticleClick,
  showPerspectiveBadge = true,
  compact = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
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
      'Redacción': '⚡'
    };
    
    return sourceIcons[sourceName] || '📰';
  };

  const getSourceName = (source: string | NewsSource): string => {
    return typeof source === 'string' ? source : source.name;
  };

  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'conservative':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'both':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPerspectiveLabel = (perspective: string) => {
    switch (perspective) {
      case 'progressive':
        return '🔵 Progresista';
      case 'conservative':
        return '🔴 Conservadora';
      case 'both':
        return '⚖️ Perspectivas Balanceadas';
      default:
        return '📰 Neutral';
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: article.shareUrl || window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink(e);
    }
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(article.shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  };

  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  if (compact) {
    return (
      <div 
        onClick={handleCardClick}
        className="news-card-premium rounded-2xl p-6 cursor-pointer border border-white/30 hover:shadow-premium transform hover:scale-102 transition-all duration-400 animate-premium-scale-in"
      >
        <div className="flex items-start space-x-4">
          {!imageError && article.imageUrl && (
            <div className="flex-shrink-0">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-20 h-20 rounded-2xl object-cover shadow-soft"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{getSourceIcon(article.source)}</span>
              <span className="text-sm font-bold text-gray-600">{getSourceName(article.source)}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
              {article.trending && (
                <>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-premium">
                    🔥 Trending
                  </span>
                </>
              )}
            </div>
            
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-3 leading-tight">
              {article.title}
            </h3>
            
            <div className="flex items-center justify-between">
              {showPerspectiveBadge && (
                <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getPerspectiveColor(article.perspective)} shadow-soft`}>
                  {getPerspectiveLabel(article.perspective)}
                </span>
              )}
              
              <div className="flex items-center space-x-3">
                {article.readTime && (
                  <span className="text-sm text-gray-500 font-medium">{article.readTime}</span>
                )}
                
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                  title="Compartir"
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="news-card-premium rounded-3xl shadow-premium hover:shadow-premium-lg transition-all duration-600 overflow-hidden cursor-pointer border border-white/30 hover:border-white/50 group perspective-3d animate-premium-scale-in"
    >
      {/* Premium Image Header */}
      {!imageError && article.imageUrl && (
        <div className="relative h-56 overflow-hidden">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-800"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          
          {/* Premium Overlay badges */}
          <div className="absolute top-4 left-4 flex space-x-3">
            <span className="glass-premium text-gray-800 px-4 py-2 rounded-full text-sm font-bold border border-white/30 backdrop-blur-lg">
              {getSourceIcon(article.source)} {getSourceName(article.source)}
            </span>
            
            {article.trending && (
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-premium animate-pulse">
                🔥 Trending
              </span>
            )}
          </div>
          
          {/* Premium Share button overlay */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <button
              onClick={handleShare}
              className="glass-premium text-gray-700 hover:text-blue-600 p-3 rounded-full shadow-premium transition-all duration-300 transform hover:scale-110 border border-white/30"
              title="Compartir"
            >
              📤
            </button>
          </div>
        </div>
      )}
      
      {/* Premium Content */}
      <div className="p-8">
        {/* Premium Header info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-base text-gray-600">
            {imageError && (
              <>
                <span className="text-2xl">{getSourceIcon(article.source)}</span>
                <span className="font-bold">{getSourceName(article.source)}</span>
                <span>•</span>
              </>
            )}
            <span className="font-medium">{formatDate(article.publishedAt)}</span>
            {article.readTime && (
              <>
                <span>•</span>
                <span className="font-medium">{article.readTime}</span>
              </>
            )}
          </div>
          
          <span className="glass-subtle text-gray-700 px-4 py-2 rounded-full text-sm font-bold border border-gray-200">
            {article.category}
          </span>
        </div>
        
        {/* Premium Title */}
        <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-colombia-blue-600 transition-colors duration-300 leading-tight">
          {article.title}
        </h3>
        
        {/* Premium Summary */}
        <p className="text-lg text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
        
        {/* Premium Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="glass-subtle text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200 hover:glass-elegant transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Premium Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          {showPerspectiveBadge && (
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 shadow-soft ${getPerspectiveColor(article.perspective)}`}>
              {getPerspectiveLabel(article.perspective)}
            </span>
          )}
          
          <div className="flex items-center space-x-4">
            {article.author && (
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-colombia-premium rounded-full flex items-center justify-center text-white font-bold shadow-soft">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold">{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                className={`p-3 rounded-xl glass-subtle hover:glass-elegant transition-all duration-300 transform hover:scale-110 text-base ${
                  copied ? 'text-green-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                title="Copiar enlace"
              >
                {copied ? '✅' : '🔗'}
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 rounded-xl glass-subtle hover:glass-elegant text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 text-base"
                title="Compartir"
              >
                📤
              </button>
            </div>
          </div>
        </div>
        
        {/* Premium Related articles indicator */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <span className="glass-subtle px-4 py-2 rounded-full text-sm font-bold text-colombia-blue-600 border border-colombia-blue-200">
              📝 {article.relatedArticles.length} artículo{article.relatedArticles.length > 1 ? 's' : ''} relacionado{article.relatedArticles.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNewsCard;