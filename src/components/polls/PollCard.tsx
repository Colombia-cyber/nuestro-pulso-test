import React, { useState } from 'react';
import { Poll, PollOption } from '../../types/polls';

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
  onViewDetails?: (pollId: string) => void;
  showResults?: boolean;
  userVote?: string;
  compact?: boolean;
}

const PollCard: React.FC<PollCardProps> = ({
  poll,
  onVote,
  onViewDetails,
  showResults = false,
  userVote,
  compact = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(userVote || '');
  const [hasVoted, setHasVoted] = useState<boolean>(!!userVote);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted && !poll.allowMultiple) return;
    setSelectedOption(optionId);
  };

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    
    setHasVoted(true);
    onVote?.(poll.id, selectedOption);
  };

  const getPercentage = (option: PollOption) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((option.votes / poll.totalVotes) * 100);
  };

  const getDaysLeft = () => {
    const now = new Date();
    const timeDiff = poll.endsAt.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, daysLeft);
  };

  const getCategoryColor = (category: Poll['category']) => {
    const colors = {
      politica: 'from-blue-500 to-blue-600',
      social: 'from-green-500 to-green-600',
      economia: 'from-yellow-500 to-orange-500',
      seguridad: 'from-red-500 to-red-600',
      educacion: 'from-purple-500 to-purple-600',
      salud: 'from-pink-500 to-pink-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: Poll['category']) => {
    const icons = {
      politica: '🏛️',
      social: '👥',
      economia: '💰',
      seguridad: '🛡️',
      educacion: '📚',
      salud: '🏥'
    };
    return icons[category] || '📊';
  };

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 ${compact ? 'p-4' : 'p-6'} group`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getCategoryIcon(poll.category)}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(poll.category)}`}>
              {poll.category.toUpperCase()}
            </span>
            {poll.isTrending && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-red-500 text-white animate-pulse">
                🔥 TRENDING
              </span>
            )}
          </div>
          <h3 className={`font-bold text-gray-900 mb-2 ${compact ? 'text-lg' : 'text-xl'} group-hover:text-blue-600 transition-colors`}>
            {poll.title}
          </h3>
          {!compact && (
            <p className="text-gray-600 text-sm mb-3">{poll.description}</p>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <h4 className={`font-semibold text-gray-800 ${compact ? 'text-sm' : 'text-base'}`}>
          {poll.question}
        </h4>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {poll.options.map((option) => {
          const percentage = getPercentage(option);
          const isSelected = selectedOption === option.id;
          const showPercentage = showResults || hasVoted;

          return (
            <div
              key={option.id}
              className={`relative rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {/* Progress bar background for results */}
              {showPercentage && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-blue-500/20 to-red-500/20 rounded-lg"
                  style={{ width: `${percentage}%` }}
                />
              )}
              
              <div className="relative p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className={`${compact ? 'text-sm' : 'text-base'} font-medium text-gray-800`}>
                    {option.text}
                  </span>
                </div>
                
                {showPercentage && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {percentage}%
                    </span>
                    <span className="text-xs text-gray-500">
                      ({option.votes.toLocaleString()})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vote Button or Results */}
      {!hasVoted && poll.isActive ? (
        <button
          onClick={handleVote}
          disabled={!selectedOption}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            selectedOption
              ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedOption ? '🗳️ Votar Ahora' : 'Selecciona una opción'}
        </button>
      ) : (
        <div className="text-center py-2">
          {hasVoted && (
            <span className="text-green-600 font-semibold text-sm">
              ✅ Has votado en esta encuesta
            </span>
          )}
        </div>
      )}

      {/* Footer Stats */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>👥 {poll.totalVotes.toLocaleString()} votos</span>
          {poll.region && (
            <span>📍 {poll.region}</span>
          )}
          <span>⏰ {getDaysLeft()} días</span>
        </div>
        
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(poll.id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
          >
            Ver detalles →
          </button>
        )}
      </div>

      {/* Tags */}
      {!compact && poll.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {poll.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {poll.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{poll.tags.length - 3} más
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PollCard;