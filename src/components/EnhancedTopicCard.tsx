import React, { useState, useEffect } from 'react';
import { 
  FaHeart, FaRegHeart, FaShare, FaCopy, FaFire, FaEye, FaArrowRight, 
  FaBolt, FaNewspaper, FaSync, FaSpinner, FaTrophy, FaStar, FaClock,
  FaTwitter, FaFacebook, FaWhatsapp, FaLinkedin
} from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream } from 'react-icons/md';
import { NewsTopic } from '../config/newsTopics';
import { useUserPreferences } from '../hooks/useUserPreferences';

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
  isLoading?: boolean;
  headlines?: string[];
}

interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

interface EnhancedTopicCardProps {
  topicDisplay: TopicDisplay;
  stats: TopicStats;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

interface ShareModalProps {
  topic: TopicDisplay;
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ topic, isOpen, onClose, onShare }) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Compartir: {topic.displayText}
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={() => handleSocialShare('twitter')}
            className="w-full flex items-center space-x-3 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <FaTwitter />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => handleSocialShare('facebook')}
            className="w-full flex items-center space-x-3 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>
          
          <button
            onClick={() => handleSocialShare('whatsapp')}
            className="w-full flex items-center space-x-3 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
          
          <button
            onClick={() => handleSocialShare('linkedin')}
            className="w-full flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-3 p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <FaCopy />
            <span>{showCopySuccess ? '¡Copiado!' : 'Copiar enlace'}</span>
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const EnhancedTopicCard: React.FC<EnhancedTopicCardProps> = ({
  topicDisplay,
  stats,
  isSelected,
  onClick,
  className = ""
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
  
  const engagement = getTopicEngagement(topicDisplay.topic.id);
  const isFav = isFavorite(topicDisplay.topic.id);
  const isRecent = isRecentlyViewed(topicDisplay.topic.id);
  
  // Show trending animation
  useEffect(() => {
    if (stats.liveCount > 15) {
      setShowTrending(true);
      const timer = setTimeout(() => setShowTrending(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [stats.liveCount]);

  const handleCardClick = () => {
    recordTopicEngagement(topicDisplay.topic.id, 'view');
    onClick();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteTopic(topicDisplay.topic.id);
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
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-500';
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
    if (engagement.viewCount > 50) return { icon: <FaTrophy />, text: 'Top Leído', color: 'bg-yellow-500' };
    if (engagement.viewCount > 20) return { icon: <FaStar />, text: 'Popular', color: 'bg-blue-500' };
    if (engagement.viewCount > 5) return { icon: <FaFire />, text: 'Trending', color: 'bg-red-500' };
    return null;
  };

  const engagementBadge = getEngagementBadge();

  return (
    <>
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
          hover:shadow-xl transition-all duration-300 cursor-pointer transform 
          ${isHovered ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'}
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
          ${className}
          group overflow-hidden
        `}
      >
        {/* Trending Animation */}
        {showTrending && (
          <div className="absolute top-2 right-2 animate-pulse">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <FaFire className="mr-1" />
              HOT
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isFav && (
            <div className="bg-pink-500 text-white p-1 rounded-full">
              <FaHeart className="text-xs" />
            </div>
          )}
          {isRecent && (
            <div className="bg-blue-500 text-white p-1 rounded-full">
              <FaClock className="text-xs" />
            </div>
          )}
          {engagementBadge && (
            <div className={`${engagementBadge.color} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center`}>
              {engagementBadge.icon}
              <span className="ml-1 hidden group-hover:inline">{engagementBadge.text}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleFavoriteClick}
            className="bg-white dark:bg-gray-700 text-pink-500 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            onClick={handleShareClick}
            className="bg-white dark:bg-gray-700 text-blue-500 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label="Compartir tema"
          >
            <FaShare />
          </button>
        </div>

        {/* Topic Header */}
        <div className={`bg-gradient-to-r ${topicDisplay.topic.color} p-4 rounded-t-lg relative overflow-hidden`}>
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-3xl drop-shadow-lg">{topicDisplay.topic.emoji}</span>
                <div className="flex items-center space-x-1">
                  {getCategoryIcon(topicDisplay.category)}
                  <span className={`text-xs font-medium ${getUrgencyColor(topicDisplay.urgencyLevel)} bg-white bg-opacity-80 px-2 py-1 rounded-full`}>
                    {topicDisplay.urgencyLevel.toUpperCase()}
                  </span>
                </div>
              </div>
              {stats?.isLoading && (
                <FaSpinner className="animate-spin text-white text-sm" />
              )}
            </div>
            <h3 className="text-white font-bold text-sm mt-2 leading-tight drop-shadow-lg">
              {topicDisplay.displayText}
            </h3>
          </div>
        </div>

        {/* Topic Content */}
        <div className="p-4 space-y-3">
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
            {topicDisplay.description}
          </p>
          
          {/* Latest Headlines Preview */}
          {stats?.headlines && stats.headlines.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                <FaNewspaper className="mr-1" />
                Últimos titulares
              </div>
              <div className="space-y-1">
                {stats.headlines.slice(0, 2).map((headline, index) => (
                  <div key={index} className="text-xs text-gray-700 dark:text-gray-300 truncate">
                    • {headline}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Stats */}
          {stats && (
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-red-500">
                  <FaFire className="mr-1" />
                  <span>{stats.liveCount}</span>
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
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs">
                  {stats.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <FaArrowRight className="text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-lg`}></div>
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

export default EnhancedTopicCard;