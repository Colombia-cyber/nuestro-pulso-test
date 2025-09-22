import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeart, FaRegHeart, FaShare, FaCopy, FaFire, FaEye, FaArrowRight, 
  FaBolt, FaNewspaper, FaSync, FaSpinner, FaTrophy, FaStar, FaClock,
  FaTwitter, FaFacebook, FaWhatsapp, FaLinkedin, FaQrcode, FaChartLine,
  FaBookmark, FaRegBookmark, FaUsers, FaComments
} from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream, MdFlashOn } from 'react-icons/md';
import { NewsTopic } from '../config/newsTopics';
import { useUserPreferences } from '../hooks/useUserPreferences';
import '../styles/enhanced-animations.css';

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
  isLoading?: boolean;
  headlines?: string[];
  trendingScore?: number;
  engagement?: {
    views: number;
    shares: number;
    comments: number;
  };
}

interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

interface WorldClassTopicCardProps {
  topicDisplay: TopicDisplay;
  stats: TopicStats;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  animationDelay?: number;
}

interface ShareModalProps {
  topic: TopicDisplay;
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ topic, isOpen, onClose, onShare }) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/topic/${topic.topic.id}`;
  const shareText = `¡Explora ${topic.displayText}! ${topic.description}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
      onShare('copy');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      onShare(platform);
    }
  };

  const generateQRCode = () => {
    // Simple QR code URL generation (in production, use a proper QR library)
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 glass-effect shadow-2xl transform animate-in slide-in-from-bottom-4" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{topic.topic.emoji}</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Compartir: {topic.displayText}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {topic.description}
          </p>
        </div>
        
        {!showQR ? (
          <div className="space-y-3">
            <button
              onClick={() => handleSocialShare('twitter')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
            >
              <FaTwitter />
              <span>Twitter</span>
              <div className="ml-auto flex items-center text-xs opacity-75">
                <FaUsers className="mr-1" />
                280 chars
              </div>
            </button>
            
            <button
              onClick={() => handleSocialShare('facebook')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
            >
              <FaFacebook />
              <span>Facebook</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="w-full flex items-center space-x-3 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
              >
                <FaCopy />
                <span>{showCopySuccess ? '¡Copiado!' : 'Copiar'}</span>
              </button>
              
              <button
                onClick={() => setShowQR(true)}
                className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 hover:scale-105 ripple-effect"
                title="Mostrar código QR"
              >
                <FaQrcode />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img 
              src={generateQRCode()} 
              alt="QR Code para compartir"
              className="mx-auto mb-4 rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Escanea para abrir en móvil
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Volver
            </button>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="w-full mt-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const WorldClassTopicCard: React.FC<WorldClassTopicCardProps> = ({
  topicDisplay,
  stats,
  isSelected,
  onClick,
  className = "",
  animationDelay = 0
}) => {
  const { 
    isFavorite, 
    isRecentlyViewed, 
    toggleFavoriteTopic, 
    recordTopicEngagement,
    getTopicEngagement 
  } = useUserPreferences();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [liveCount, setLiveCount] = useState(stats.liveCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const engagement = getTopicEngagement(topicDisplay.topic.id);
  const isFav = isFavorite(topicDisplay.topic.id);
  const isRecent = isRecentlyViewed(topicDisplay.topic.id);
  
  // Animated counter effect
  useEffect(() => {
    const timer = setInterval(() => {
      const increment = Math.random() > 0.7 ? 1 : 0;
      if (increment && stats.liveCount > 10) {
        setLiveCount(prev => prev + increment);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, [stats.liveCount]);

  // Show trending animation
  useEffect(() => {
    if (stats.liveCount > 15) {
      setShowTrending(true);
      const timer = setTimeout(() => setShowTrending(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [stats.liveCount]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-animation');
            (entry.target as HTMLElement).style.animationDelay = `${animationDelay}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [animationDelay]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    recordTopicEngagement(topicDisplay.topic.id, 'view');
    onClick();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteTopic(topicDisplay.topic.id);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  const handleShare = (platform: string) => {
    recordTopicEngagement(topicDisplay.topic.id, 'share');
    setShowShareModal(false);
  };

  const getUrgencyColor = (urgency: 'high' | 'medium' | 'normal') => {
    switch (urgency) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'normal': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getCategoryIcon = (category: 'breaking' | 'politics' | 'security' | 'analysis') => {
    switch (category) {
      case 'breaking': return <FaBolt className="text-orange-500" />;
      case 'politics': return <FaNewspaper className="text-blue-500" />;
      case 'security': return <FaFire className="text-red-500" />;
      case 'analysis': return <MdViewStream className="text-purple-500" />;
      default: return <FaEye className="text-gray-500" />;
    }
  };

  const getEngagementBadge = () => {
    if (engagement.viewCount > 50) return { icon: <FaTrophy />, text: 'Top Leído', color: 'bg-yellow-500', pulse: true };
    if (engagement.viewCount > 20) return { icon: <FaStar />, text: 'Popular', color: 'bg-blue-500', pulse: false };
    if (engagement.viewCount > 5) return { icon: <FaFire />, text: 'Trending', color: 'bg-red-500', pulse: true };
    return null;
  };

  const engagementBadge = getEngagementBadge();

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
          hover-lift focus-ring cursor-pointer overflow-hidden group
          ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-75' : ''}
          ${className}
        `}
        role="button"
        tabIndex={0}
        aria-label={`Ver noticias sobre ${topicDisplay.displayText}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(e as any);
          }
        }}
      >
        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white opacity-50"
            style={{
              left: ripple.x - 2,
              top: ripple.y - 2,
              width: 4,
              height: 4,
              animation: 'ripple 0.6s ease-out',
            }}
          />
        ))}

        {/* Floating Particles for High Engagement */}
        {engagement.viewCount > 30 && (
          <>
            <div className="floating-particle absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-70" />
            <div className="floating-particle absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60" />
            <div className="floating-particle absolute top-6 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50" />
          </>
        )}

        {/* Trending Animation */}
        {(showTrending || liveCount > stats.liveCount) && (
          <div className="absolute top-2 right-2 animate-bounce">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center pulse-glow">
              <FaFire className="mr-1" />
              LIVE
            </div>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
          {isFav && (
            <div className="bg-pink-500 text-white p-1.5 rounded-full shadow-lg badge-bounce">
              <FaHeart className="text-xs" />
            </div>
          )}
          {isRecent && (
            <div className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
              <FaClock className="text-xs" />
            </div>
          )}
          {isBookmarked && (
            <div className="bg-purple-500 text-white p-1.5 rounded-full shadow-lg">
              <FaBookmark className="text-xs" />
            </div>
          )}
          {engagementBadge && (
            <div className={`${engagementBadge.color} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-lg ${engagementBadge.pulse ? 'pulse-glow' : ''}`}>
              {engagementBadge.icon}
              <span className="ml-1 hidden group-hover:inline transition-all duration-300">{engagementBadge.text}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleFavoriteClick}
            className="bg-white dark:bg-gray-700 text-pink-500 p-2 rounded-full shadow-md hover:scale-110 transition-all duration-200 ripple-effect focus-ring"
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            onClick={handleBookmarkClick}
            className="bg-white dark:bg-gray-700 text-purple-500 p-2 rounded-full shadow-md hover:scale-110 transition-all duration-200 ripple-effect focus-ring"
            aria-label={isBookmarked ? "Quitar marcador" : "Agregar marcador"}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <button
            onClick={handleShareClick}
            className="bg-white dark:bg-gray-700 text-blue-500 p-2 rounded-full shadow-md hover:scale-110 transition-all duration-200 ripple-effect focus-ring"
            aria-label="Compartir tema"
          >
            <FaShare />
          </button>
        </div>

        {/* Topic Header */}
        <div className={`bg-gradient-to-r ${topicDisplay.topic.color} p-4 rounded-t-xl relative overflow-hidden`}>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-4xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {topicDisplay.topic.emoji}
                </span>
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(topicDisplay.category)}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(topicDisplay.urgencyLevel)}`}>
                    {topicDisplay.urgencyLevel.toUpperCase()}
                  </span>
                </div>
              </div>
              {stats?.isLoading && (
                <FaSpinner className="animate-spin text-white text-sm" />
              )}
            </div>
            <h3 className="text-white font-bold text-sm mt-3 leading-tight drop-shadow-lg">
              {topicDisplay.displayText}
            </h3>
          </div>
        </div>

        {/* Topic Content */}
        <div className="p-4 space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
            {topicDisplay.description}
          </p>
          
          {/* Progress Bar for Engagement */}
          {engagement.viewCount > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Engagement</span>
                <span>{engagement.viewCount} vistas</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full progress-animated transition-all duration-1000"
                  style={{ 
                    '--progress-width': `${Math.min((engagement.viewCount / 100) * 100, 100)}%`,
                    width: `${Math.min((engagement.viewCount / 100) * 100, 100)}%`
                  } as React.CSSProperties}
                ></div>
              </div>
            </div>
          )}
          
          {/* Latest Headlines Preview */}
          {stats?.headlines && stats.headlines.length > 0 && (
            <div className="glass-effect rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                <FaNewspaper className="mr-1" />
                Últimos titulares
                <MdFlashOn className="ml-auto text-yellow-500 animate-pulse" />
              </div>
              <div className="space-y-1 max-h-16 overflow-hidden">
                {stats.headlines.slice(0, 2).map((headline, index) => (
                  <div key={index} className="text-xs text-gray-700 dark:text-gray-300 truncate">
                    • {headline}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced Stats */}
          {stats && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-red-500">
                    <FaFire className="mr-1" />
                    <span className="count-animation">{liveCount}</span>
                  </div>
                  <div className="flex items-center text-blue-500">
                    <BiTrendingUp className="mr-1" />
                    <span>{stats.totalCount}</span>
                  </div>
                  {engagement.viewCount > 0 && (
                    <div className="flex items-center text-purple-500">
                      <FaEye className="mr-1" />
                      <span>{engagement.viewCount}</span>
                    </div>
                  )}
                  {stats.engagement && (
                    <div className="flex items-center text-green-500">
                      <FaComments className="mr-1" />
                      <span>{stats.engagement.comments}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaClock className="text-xs" />
                  <span className="text-xs">
                    {stats.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              
              {/* Trending Score */}
              {stats.trendingScore && stats.trendingScore > 50 && (
                <div className="flex items-center justify-between text-xs bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-2 rounded-lg">
                  <div className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <FaChartLine className="mr-1" />
                    <span>Trending Score</span>
                  </div>
                  <span className="font-bold text-yellow-800 dark:text-yellow-200">{stats.trendingScore}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
      </div>

      {/* Share Modal */}
      <ShareModal
        topic={topicDisplay}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />
    </>
  );
};

export default WorldClassTopicCard;