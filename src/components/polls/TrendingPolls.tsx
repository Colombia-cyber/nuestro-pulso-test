import React from 'react';
import { Poll } from '../../types/polls';
import PollCard from './PollCard';

interface TrendingPollsProps {
  polls: Poll[];
  onVote?: (pollId: string, optionId: string) => void;
  onViewDetails?: (pollId: string) => void;
  maxDisplay?: number;
}

const TrendingPolls: React.FC<TrendingPollsProps> = ({
  polls,
  onVote,
  onViewDetails,
  maxDisplay = 3
}) => {
  const trendingPolls = polls
    .filter(poll => poll.isTrending && poll.isActive)
    .slice(0, maxDisplay);

  if (trendingPolls.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            <span className="text-white text-xl">🔥</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Encuestas Trending</h2>
            <p className="text-gray-600 text-sm">
              Las encuestas más populares y participativas del momento
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 rounded-full border border-orange-200">
          <span className="text-orange-600 text-sm font-semibold">
            {trendingPolls.length} encuestas activas
          </span>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Mobile: Horizontal scroll, Desktop: Grid */}
      <div className="md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {trendingPolls.map((poll) => (
            <div key={poll.id} className="flex-shrink-0 w-80">
              <PollCard
                poll={poll}
                onVote={onVote}
                onViewDetails={onViewDetails}
                compact={true}
              />
            </div>
          ))}
        </div>
        
        {/* Desktop grid */}
        <div className="hidden md:contents">
          {trendingPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onVote={onVote}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10 rounded-full border border-blue-200">
          <span className="text-gray-700 text-sm">
            ¿Quieres crear tu propia encuesta?
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors">
            Crear Encuesta →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingPolls;