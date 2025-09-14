import React, { useState } from 'react';
import { Poll, PollOption } from '../../types/polls';

interface PollDetailPageProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
  onShare?: (pollId: string) => void;
  userVote?: string;
}

const PollDetailPage: React.FC<PollDetailPageProps> = ({
  poll,
  onVote,
  onShare,
  userVote
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(userVote || '');
  const [hasVoted, setHasVoted] = useState<boolean>(!!userVote);
  const [showResults, setShowResults] = useState<boolean>(!!userVote);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted && !poll.allowMultiple) return;
    setSelectedOption(optionId);
  };

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    
    setHasVoted(true);
    setShowResults(true);
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

  const getTimeLeft = () => {
    const now = new Date();
    const timeDiff = poll.endsAt.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'Cerrada';
    
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    
    if (days > 0) return `${days} días, ${hours} horas`;
    if (hours > 0) return `${hours} horas, ${minutes} minutos`;
    return `${minutes} minutos`;
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

  const getTopOption = () => {
    return poll.options.reduce((max, option) => 
      option.votes > max.votes ? option : max
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      {/* Back Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <span>←</span>
            <span>Volver a Encuestas</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Poll Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{getCategoryIcon(poll.category)}</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(poll.category)}`}>
                    {poll.category.toUpperCase()}
                  </span>
                  {poll.isTrending && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-red-500 text-white animate-pulse">
                      🔥 TRENDING
                    </span>
                  )}
                  {poll.region && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      📍 {poll.region}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {poll.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {poll.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>Creado por</span>
                  <div className="flex items-center gap-2">
                    {poll.createdBy.avatar && (
                      <img 
                        src={poll.createdBy.avatar} 
                        alt={poll.createdBy.name}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-medium text-gray-700">{poll.createdBy.name}</span>
                  </div>
                  <span>•</span>
                  <span>{poll.createdAt.toLocaleDateString('es-CO')}</span>
                </div>
              </div>

              {/* Poll Stats */}
              <div className="bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10 rounded-xl p-6 border border-blue-200">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {poll.totalVotes.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total de votos</div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {getTimeLeft()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getDaysLeft() > 0 ? 'Tiempo restante' : 'Estado'}
                    </div>
                  </div>

                  {poll.isActive && !hasVoted && (
                    <button
                      onClick={() => setShowResults(!showResults)}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {showResults ? 'Ocultar resultados' : 'Ver resultados'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-yellow-400/5 via-blue-500/5 to-red-500/5 rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                {poll.question}
              </h2>
            </div>
          </div>

          {/* Poll Options */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <div className="space-y-4">
              {poll.options.map((option, index) => {
                const percentage = getPercentage(option);
                const isSelected = selectedOption === option.id;
                const isTopOption = showResults && option.id === getTopOption().id;
                const showPercentage = showResults || hasVoted;

                return (
                  <div
                    key={option.id}
                    className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                        : showPercentage
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                    } ${isTopOption ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {/* Progress bar background for results */}
                    {showPercentage && (
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-1000 ${
                          isTopOption 
                            ? 'bg-gradient-to-r from-yellow-400/30 via-blue-500/30 to-red-500/30'
                            : 'bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    )}
                    
                    <div className="relative p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-3 transition-colors ${
                              isSelected
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          
                          <div className="text-lg font-semibold">
                            {String.fromCharCode(65 + index)}.
                          </div>
                        </div>
                        
                        <span className="text-lg font-medium text-gray-800">
                          {option.text}
                        </span>
                        
                        {isTopOption && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                            👑 Líder
                          </span>
                        )}
                      </div>
                      
                      {showPercentage && (
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {percentage}%
                            </div>
                            <div className="text-sm text-gray-500">
                              {option.votes.toLocaleString()} votos
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-24 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-1000 ${
                                isTopOption
                                  ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500'
                                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vote Button */}
            {!hasVoted && poll.isActive && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    selectedOption
                      ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {selectedOption ? '🗳️ Confirmar Voto' : 'Selecciona una opción para votar'}
                </button>
                
                {poll.allowMultiple && (
                  <p className="text-sm text-gray-500 mt-2">
                    Esta encuesta permite seleccionar múltiples opciones
                  </p>
                )}
              </div>
            )}

            {/* Voted Confirmation */}
            {hasVoted && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 rounded-lg font-semibold">
                  <span>✅</span>
                  <span>¡Tu voto ha sido registrado exitosamente!</span>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Tags */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {poll.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-blue-500/20 text-gray-700 text-sm rounded-full border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Options */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compartir Encuesta</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => onShare?.(poll.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>📱</span>
                  <span>Compartir</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <span>📊</span>
                  <span>Estadísticas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Polls */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Encuestas Relacionadas</h3>
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">🔍</span>
              <p>Encuestas similares aparecerán aquí</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollDetailPage;