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
        className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 p-4 cursor-pointer border border-gray-100 hover:border-gray-200"
      >
        <div className="flex items-start space-x-3">
          {!imageError && article.imageUrl && (
            <div className="flex-shrink-0">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-16 h-16 rounded-lg object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{getSourceIcon(article.source)}</span>
              <span className="text-xs font-medium text-gray-600">{getSourceName(article.source)}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
              {article.trending && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    🔥 Trending
                  </span>
                </>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
              {article.title}
            </h3>
            
            <div className="flex items-center justify-between">
              {showPerspectiveBadge && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPerspectiveColor(article.perspective)}`}>
                  {getPerspectiveLabel(article.perspective)}
                </span>
              )}
              
              <div className="flex items-center space-x-2">
                {article.readTime && (
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                )}
                
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
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
      className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-2 border-gray-100/50 hover:border-gray-200/50 hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Enhanced Image Header */}
      {!imageError && article.imageUrl && (
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Enhanced overlay badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <span className="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-2 rounded-2xl text-sm font-semibold shadow-lg border border-white/50">
              {getSourceIcon(article.source)} {getSourceName(article.source)}
            </span>
            
            {article.trending && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                🔥 Trending
              </span>
            )}
          </div>
          
          {/* Enhanced share button overlay */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <button
              onClick={handleShare}
              className="bg-white/95 backdrop-blur-md text-gray-700 hover:text-blue-600 p-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-white/50"
              title="Compartir"
            >
              📤
            </button>
          </div>

          {/* Reading time badge */}
          {article.readTime && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-sm font-medium">
                ⏱️ {article.readTime}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Content */}
      <div className="p-8">
        {/* Enhanced header info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            {imageError && (
              <>
                <span className="text-2xl">{getSourceIcon(article.source)}</span>
                <span className="font-semibold">{getSourceName(article.source)}</span>
                <span className="text-gray-400">•</span>
              </>
            )}
            <span className="font-medium">{formatDate(article.publishedAt)}</span>
          </div>
          
          <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
            {article.category}
          </span>
        </div>
        
        {/* Enhanced Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-900 transition-colors leading-tight">
          {article.title}
        </h3>
        
        {/* Enhanced Summary */}
        <p className="text-gray-700 text-base mb-6 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
        
        {/* Enhanced Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-2 rounded-2xl text-sm font-medium border border-blue-100 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Enhanced Footer */}
        <div className="flex items-center justify-between">
          {showPerspectiveBadge && (
            <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border-2 shadow-sm ${getPerspectiveColor(article.perspective)}`}>
              {getPerspectiveLabel(article.perspective)}
            </span>
          )}
          
          <div className="flex items-center space-x-4">
            {article.author && (
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                className={`text-gray-500 hover:text-blue-600 transition-all duration-300 text-lg hover:scale-110 ${
                  copied ? 'text-green-600' : ''
                }`}
                title="Copiar enlace"
              >
                {copied ? '✅' : '🔗'}
              </button>
              
              <button
                onClick={handleShare}
                className="text-gray-400 hover:text-blue-600 transition-colors text-sm"
                title="Compartir"
              >
                📤
              </button>
            </div>
          </div>
        </div>
        
        {/* Related articles indicator */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              📝 {article.relatedArticles.length} artículo{article.relatedArticles.length > 1 ? 's' : ''} relacionado{article.relatedArticles.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNewsCard;