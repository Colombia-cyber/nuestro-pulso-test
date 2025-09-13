import React from 'react';
import { FiUsers, FiClock } from 'react-icons/fi';

interface PollCardProps {
  title: string;
  description: string;
  totalVotes: number;
  timeLeft: string;
  category: string;
  options: Array<{
    id: number;
    text: string;
    votes: number;
    percentage: number;
  }>;
  hasVoted: boolean;
  onVote?: (optionId: number) => void;
}

const PollCard: React.FC<PollCardProps> = ({
  title,
  description,
  totalVotes,
  timeLeft,
  category,
  options,
  hasVoted,
  onVote
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiClock size={14} />
          <span>{timeLeft} restantes</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>

      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <div key={option.id} className="relative">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                hasVoted 
                  ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
              }`}
              onClick={() => !hasVoted && onVote?.(option.id)}
            >
              <span className="text-gray-700">{option.text}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{option.votes.toLocaleString()} votos</span>
                <span className="text-sm font-semibold text-gray-700">{option.percentage}%</span>
              </div>
            </div>
            <div 
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-b-lg transition-all"
              style={{ width: `${option.percentage}%` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <FiUsers size={14} />
          <span>{totalVotes.toLocaleString()} participantes</span>
        </div>
        {!hasVoted ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Participar
          </button>
        ) : (
          <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
            Ya Participaste
          </button>
        )}
      </div>
    </div>
  );
};

export default PollCard;