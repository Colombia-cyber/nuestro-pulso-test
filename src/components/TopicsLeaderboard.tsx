import React, { useState, useEffect } from 'react';
import { 
  FaTrophy, FaMedal, FaFire, FaEye, FaStar, FaCrown, 
  FaChevronDown, FaChevronUp, FaUsers, FaCalendarAlt
} from 'react-icons/fa';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { getPriorityTopics } from '../config/newsTopics';

interface TopicLeaderboardEntry {
  topicId: string;
  topicName: string;
  emoji: string;
  totalViews: number;
  totalShares: number;
  engagementScore: number;
  trendingRank: number;
  isRising: boolean;
}

interface TopicsLeaderboardProps {
  selectedCategory: 'local' | 'world';
  className?: string;
}

const TopicsLeaderboard: React.FC<TopicsLeaderboardProps> = ({ 
  selectedCategory,
  className = "" 
}) => {
  const { engagementStats, getMostEngagedTopics } = useUserPreferences();
  const [leaderboardData, setLeaderboardData] = useState<TopicLeaderboardEntry[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    updateLeaderboard();
  }, [selectedCategory, engagementStats, selectedPeriod]);

  const updateLeaderboard = () => {
    const topics = getPriorityTopics(selectedCategory);
    const entries: TopicLeaderboardEntry[] = topics.map((topic, index) => {
      const stats = engagementStats[topic.id] || {
        viewCount: 0,
        shareCount: 0,
        lastViewed: new Date(),
        readingTime: 0
      };

      // Calculate engagement score
      const engagementScore = (stats.viewCount * 1) + (stats.shareCount * 3) + (stats.readingTime / 60);
      
      // Mock trending data (in real app this would come from analytics)
      const mockTotalViews = Math.floor(Math.random() * 10000) + stats.viewCount;
      const mockTotalShares = Math.floor(Math.random() * 1000) + stats.shareCount;
      
      return {
        topicId: topic.id,
        topicName: topic.name,
        emoji: topic.emoji,
        totalViews: mockTotalViews,
        totalShares: mockTotalShares,
        engagementScore,
        trendingRank: index + 1,
        isRising: Math.random() > 0.5
      };
    });

    // Sort by engagement score
    entries.sort((a, b) => b.engagementScore - a.engagementScore);
    
    setLeaderboardData(entries);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <FaTrophy className="text-yellow-500" />;
      case 2: return <FaMedal className="text-gray-400" />;
      case 3: return <FaMedal className="text-amber-600" />;
      default: return <FaStar className="text-gray-300" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default: return 'bg-gradient-to-r from-gray-200 to-gray-300';
    }
  };

  const displayedEntries = showAll ? leaderboardData : leaderboardData.slice(0, 5);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FaTrophy className="text-yellow-500 text-xl" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Temas Más Populares
          </h3>
        </div>
        
        {/* Period Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {(['day', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {period === 'day' ? 'Hoy' : period === 'week' ? 'Semana' : 'Mes'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          {selectedCategory === 'local' ? '📍 Temas Locales' : '🌍 Temas Mundiales'}
        </span>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {displayedEntries.map((entry, index) => (
          <div
            key={entry.topicId}
            className={`relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                       hover:shadow-md transition-all duration-200 group`}
          >
            {/* Rank Background for Top 3 */}
            {index < 3 && (
              <div className={`absolute inset-0 ${getRankColor(index + 1)} opacity-10 rounded-lg`}></div>
            )}
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8">
                  {index < 3 ? (
                    getRankIcon(index + 1)
                  ) : (
                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                  )}
                </div>

                {/* Topic Info */}
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {entry.topicName}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FaEye className="mr-1" />
                        <span>{entry.totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaFire className="mr-1" />
                        <span>{entry.totalShares.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Trend */}
              <div className="flex items-center space-x-2">
                {/* Engagement Score */}
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {Math.round(entry.engagementScore)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">puntos</div>
                </div>

                {/* Trending Indicator */}
                {entry.isRising ? (
                  <div className="flex items-center text-green-500">
                    <FaChevronUp className="text-xs" />
                    <span className="text-xs font-medium">Subiendo</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <FaChevronDown className="text-xs" />
                    <span className="text-xs font-medium">Bajando</span>
                  </div>
                )}
              </div>
            </div>

            {/* Crown for #1 */}
            {index === 0 && (
              <div className="absolute -top-2 -right-2">
                <FaCrown className="text-yellow-500 text-lg drop-shadow-lg" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {leaderboardData.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 p-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          {showAll ? 'Ver menos' : `Ver todos (${leaderboardData.length})`}
        </button>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {leaderboardData.reduce((sum, entry) => sum + entry.totalViews, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total vistas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {leaderboardData.reduce((sum, entry) => sum + entry.totalShares, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total shares</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {leaderboardData.filter(entry => entry.isRising).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">En ascenso</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsLeaderboard;