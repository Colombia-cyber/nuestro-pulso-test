import React, { useState } from 'react';
import { samplePolls, getTrendingPolls, getFeaturedPoll } from '../../data/samplePolls';
import { Poll } from '../../types/polls';
import PollCard from './PollCard';
import TrendingPolls from './TrendingPolls';
import PollsGrid from './PollsGrid';

const PollsPage: React.FC = () => {
  const [polls] = useState<Poll[]>(samplePolls);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  
  const featuredPoll = getFeaturedPoll();
  const trendingPolls = getTrendingPolls();

  const handleVote = (pollId: string, optionId: string) => {
    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionId
    }));
    
    // Here you would typically make an API call to record the vote
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
  };

  const handleViewDetails = (pollId: string) => {
    // Here you would navigate to the detailed poll view
    console.log(`View details for poll ${pollId}`);
  };

  const getPollStats = () => {
    const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0);
    const activePolls = polls.filter(poll => poll.isActive).length;
    const trendingCount = polls.filter(poll => poll.isTrending).length;
    
    return { totalVotes, activePolls, trendingCount };
  };

  const stats = getPollStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">🗳️</span>
              <h1 className="text-4xl md:text-5xl font-bold">
                Encuestas Cívicas
              </h1>
              <span className="text-4xl">📊</span>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
              Tu voz importa. Participa en encuestas que moldean el futuro de Colombia.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{stats.activePolls}</div>
                <div className="text-sm text-white/80">Encuestas Activas</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</div>
                <div className="text-sm text-white/80">Total de Votos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{stats.trendingCount}</div>
                <div className="text-sm text-white/80">Trending Ahora</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                🔥 Ver Trending
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
                ➕ Crear Encuesta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Poll */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
              <span className="text-white text-xl">⭐</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Encuesta Destacada</h2>
              <p className="text-gray-600 text-sm">
                La encuesta más importante de la semana
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <PollCard
              poll={featuredPoll}
              onVote={handleVote}
              onViewDetails={handleViewDetails}
              userVote={userVotes[featuredPoll.id]}
            />
          </div>
        </section>

        {/* Trending Polls */}
        <TrendingPolls
          polls={trendingPolls}
          onVote={handleVote}
          onViewDetails={handleViewDetails}
        />

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10 rounded-2xl p-6 border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¿Tienes una pregunta importante?
                </h3>
                <p className="text-gray-600">
                  Crea tu propia encuesta y conoce la opinión de miles de colombianos
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                  ➕ Crear Encuesta
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  📋 Ver Mis Encuestas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* All Polls Grid */}
        <PollsGrid
          polls={polls}
          onVote={handleVote}
          onViewDetails={handleViewDetails}
          title="Explorar Todas las Encuestas"
        />
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
          <span className="text-xl">➕</span>
        </button>
      </div>
    </div>
  );
};

export default PollsPage;