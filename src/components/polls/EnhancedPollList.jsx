import React, { useState, useEffect } from 'react';
import { pollService } from '../../services/pollService.js';
import { pollWebSocketService } from '../../services/pollWebSocket.js';
import { LivePollChart, PollDoughnutChart } from '../charts/PollCharts.jsx';

export default function EnhancedPollList({ user = null }) {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState({});
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'charts'
  const [selectedPoll, setSelectedPoll] = useState(null);

  useEffect(() => {
    loadPolls();
    setupRealTimeUpdates();
    
    return () => {
      pollWebSocketService.unsubscribeFromPollUpdates();
    };
  }, []);

  const loadPolls = async () => {
    try {
      setLoading(true);
      const pollsData = await pollService.getActivePolls();
      setPolls(pollsData);
    } catch (error) {
      console.error('Error loading polls:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeUpdates = () => {
    const socket = pollWebSocketService.connect();
    
    socket.on('pollUpdate', (update) => {
      setRealTimeUpdates(prev => [...prev, update]);
      
      // Update local poll data
      setPolls(prevPolls => 
        prevPolls.map(poll => 
          poll.id === update.pollId 
            ? { 
                ...poll, 
                votes: update.votes,
                totalVotes: update.votes.reduce((sum, count) => sum + count, 0)
              }
            : poll
        )
      );
    });
  };

  const handleVote = async (pollId, optionIndex) => {
    if (!user) {
      alert('Por favor, inicia sesión para votar');
      return;
    }

    try {
      setVoting(prev => ({ ...prev, [pollId]: true }));
      
      await pollService.submitVote(pollId, optionIndex, user.id || 'guest-user');
      
      // Send real-time update
      pollWebSocketService.sendVote(pollId, optionIndex, user.id);
      
      // Refresh polls to get updated counts
      await loadPolls();
      
      // Show success message
      setTimeout(() => {
        setVoting(prev => ({ ...prev, [pollId]: false }));
      }, 2000);
      
    } catch (error) {
      console.error('Error voting:', error);
      alert(error.message || 'Error al votar');
      setVoting(prev => ({ ...prev, [pollId]: false }));
    }
  };

  const getPollProgress = (poll, optionIndex) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((poll.votes[optionIndex] / poll.totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-3 text-gray-600">Cargando encuestas...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Encuestas en Vivo</h1>
          <p className="text-gray-600 mt-1">
            Participa y ve los resultados actualizándose en tiempo real
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 Lista
          </button>
          <button
            onClick={() => setViewMode('charts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'charts'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Gráficos
          </button>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
        <span className="text-green-800 text-sm font-medium">
          Actualizaciones en tiempo real activas
        </span>
        <span className="ml-auto text-green-600 text-sm">
          {realTimeUpdates.length} actualizaciones recibidas
        </span>
      </div>

      {polls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">🗳️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay encuestas disponibles
          </h3>
          <p className="text-gray-500">
            Las encuestas aparecerán aquí cuando estén disponibles.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {viewMode === 'list' ? (
            // List View
            polls.map((poll) => (
              <div key={poll.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{poll.title}</h2>
                  {poll.description && (
                    <p className="text-gray-600 mb-3">{poll.description}</p>
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">{poll.question}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {poll.options.map((option, optionIndex) => {
                    const progress = getPollProgress(poll, optionIndex);
                    const isVoting = voting[poll.id];
                    
                    return (
                      <div key={optionIndex} className="relative">
                        <button
                          onClick={() => handleVote(poll.id, optionIndex)}
                          disabled={isVoting}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                            isVoting
                              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                              : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          <div className="flex justify-between items-center relative z-10">
                            <span className="font-medium text-gray-900">{option}</span>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-700">
                                {poll.votes[optionIndex]} votos
                              </div>
                              <div className="text-xs text-gray-500">
                                {progress}%
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress bar background */}
                          <div 
                            className="absolute inset-0 bg-primary-100 rounded-lg transition-all duration-500"
                            style={{ 
                              width: `${progress}%`,
                              opacity: 0.3
                            }}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>📊 {poll.totalVotes} votos totales</span>
                  <button
                    onClick={() => setSelectedPoll(poll)}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Ver gráfico detallado →
                  </button>
                </div>

                {voting[poll.id] && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mr-2"></div>
                      <span className="text-green-800 font-medium">¡Gracias por votar!</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Charts View
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {polls.map((poll) => (
                <LivePollChart 
                  key={poll.id} 
                  poll={poll} 
                  updates={realTimeUpdates}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detailed Chart Modal */}
      {selectedPoll && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedPoll.title}</h3>
                  <p className="text-gray-600">{selectedPoll.question}</p>
                </div>
                <button
                  onClick={() => setSelectedPoll(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✖️
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <LivePollChart poll={selectedPoll} updates={realTimeUpdates} />
                </div>
                <div className="h-64">
                  <PollDoughnutChart poll={selectedPoll} />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Estadísticas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total de votos:</span>
                    <div className="font-semibold">{selectedPoll.totalVotes}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Opciones:</span>
                    <div className="font-semibold">{selectedPoll.options.length}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Líder actual:</span>
                    <div className="font-semibold text-primary-600">
                      {selectedPoll.votes.length > 0 
                        ? selectedPoll.options[selectedPoll.votes.indexOf(Math.max(...selectedPoll.votes))]
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Margen:</span>
                    <div className="font-semibold">
                      {selectedPoll.votes.length > 0 
                        ? Math.max(...selectedPoll.votes) - (selectedPoll.votes.sort((a, b) => b - a)[1] || 0)
                        : 0
                      } votos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}