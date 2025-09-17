import React, { useState } from 'react';
import { NewsItem } from '../types/news';

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

  const getSourceIcon = (source: string) => {
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
    
    return sourceIcons[source] || '📰';
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
              <span className="text-xs font-medium text-gray-600">{article.source}</span>
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
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-gray-200 group"
    >
      {/* Image Header */}
      {!imageError && article.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {getSourceIcon(article.source)} {article.source}
            </span>
            
            {article.trending && (
              <span className="bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                🔥 Trending
              </span>
            )}
          </div>
          
          {/* Share button overlay */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm text-gray-700 hover:text-blue-600 p-2 rounded-full shadow-lg transition-colors"
              title="Compartir"
            >
              📤
            </button>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Header info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {imageError && (
              <>
                <span className="text-lg">{getSourceIcon(article.source)}</span>
                <span className="font-medium">{article.source}</span>
                <span>•</span>
              </>
            )}
            <span>{formatDate(article.publishedAt)}</span>
            {article.readTime && (
              <>
                <span>•</span>
                <span>{article.readTime}</span>
              </>
            )}
          </div>
          
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
            {article.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
          {article.title}
        </h3>
        
        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          {showPerspectiveBadge && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPerspectiveColor(article.perspective)}`}>
              {getPerspectiveLabel(article.perspective)}
            </span>
          )}
          
          <div className="flex items-center space-x-3">
            {article.author && (
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span>{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className={`text-gray-400 hover:text-blue-600 transition-colors text-sm ${
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