import React, { useState, useEffect } from 'react';
import { pollService } from '../../services/pollService.js';
import { PollBarChart, PollDoughnutChart } from '../charts/PollCharts.jsx';

export default function PollAnalytics({ polls }) {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (polls.length > 0 && !selectedPoll) {
      setSelectedPoll(polls[0]);
    }
  }, [polls]);

  useEffect(() => {
    if (selectedPoll) {
      loadAnalytics(selectedPoll.id);
    }
  }, [selectedPoll]);

  const loadAnalytics = async (pollId) => {
    try {
      setLoading(true);
      const analyticsData = await pollService.getPollAnalytics(pollId);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalVotesAcrossPolls = () => {
    return polls.reduce((total, poll) => total + (poll.totalVotes || 0), 0);
  };

  const getMostPopularPoll = () => {
    if (polls.length === 0) return null;
    return polls.reduce((prev, current) => 
      (current.totalVotes || 0) > (prev.totalVotes || 0) ? current : prev
    );
  };

  const getAverageResponsesPerPoll = () => {
    if (polls.length === 0) return 0;
    const totalVotes = getTotalVotesAcrossPolls();
    return Math.round(totalVotes / polls.length);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analíticas de Encuestas</h2>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-blue-100 text-sm">Total de Encuestas</p>
              <p className="text-2xl font-bold">{polls.length}</p>
            </div>
            <div className="text-3xl opacity-80">📊</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-green-100 text-sm">Total de Votos</p>
              <p className="text-2xl font-bold">{getTotalVotesAcrossPolls()}</p>
            </div>
            <div className="text-3xl opacity-80">🗳️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-purple-100 text-sm">Promedio por Encuesta</p>
              <p className="text-2xl font-bold">{getAverageResponsesPerPoll()}</p>
            </div>
            <div className="text-3xl opacity-80">📈</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-orange-100 text-sm">Encuestas Activas</p>
              <p className="text-2xl font-bold">
                {polls.filter(poll => poll.isActive).length}
              </p>
            </div>
            <div className="text-3xl opacity-80">⚡</div>
          </div>
        </div>
      </div>

      {/* Poll Selection */}
      {polls.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Encuesta para Análisis Detallado:
          </label>
          <select
            value={selectedPoll?.id || ''}
            onChange={(e) => {
              const poll = polls.find(p => p.id === parseInt(e.target.value));
              setSelectedPoll(poll);
            }}
            className="block w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {polls.map((poll) => (
              <option key={poll.id} value={poll.id}>
                {poll.title} ({poll.totalVotes} votos)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Detailed Analytics */}
      {selectedPoll && analytics && !loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resultados por Opción
            </h3>
            <PollBarChart poll={analytics} />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distribución Porcentual
            </h3>
            <PollDoughnutChart poll={analytics} />
          </div>

          {/* Detailed Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estadísticas Detalladas
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Opciones y Resultados:</h4>
                <div className="mt-2 space-y-2">
                  {analytics.options.map((option, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{option}</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {analytics.votes[index]} votos
                        </div>
                        <div className="text-sm text-gray-500">
                          {analytics.percentages[index]}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Métricas:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total de votos:</span>
                    <div className="font-semibold">{analytics.totalVotes}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Opción ganadora:</span>
                    <div className="font-semibold">
                      {analytics.votes.length > 0 
                        ? analytics.options[analytics.votes.indexOf(Math.max(...analytics.votes))]
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Participación:</span>
                    <div className="font-semibold text-green-600">
                      {analytics.totalVotes > 0 ? 'Activa' : 'Sin votos'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Estado:</span>
                    <div className={`font-semibold ${
                      analytics.poll.isActive ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {analytics.poll.isActive ? 'Activa' : 'Inactiva'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Most Popular Polls */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ranking de Popularidad
            </h3>
            <div className="space-y-3">
              {polls
                .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
                .slice(0, 5)
                .map((poll, index) => (
                  <div key={poll.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900 truncate max-w-48">
                          {poll.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {poll.totalVotes} votos
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      poll.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {poll.isActive ? 'Activa' : 'Inactiva'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Cargando analíticas...</span>
        </div>
      ) : polls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📈</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay datos para analizar
          </h3>
          <p className="text-gray-500">
            Crea algunas encuestas para ver analíticas detalladas.
          </p>
        </div>
      ) : null}
    </div>
  );
}