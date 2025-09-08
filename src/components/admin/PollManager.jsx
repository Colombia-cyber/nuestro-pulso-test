import React, { useState } from 'react';
import { pollService } from '../../services/pollService.js';

export default function PollManager({ polls, onPollsChanged }) {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeletePoll = async (pollId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
      return;
    }

    try {
      setLoading(true);
      await pollService.deletePoll(pollId);
      onPollsChanged();
    } catch (error) {
      console.error('Error deleting poll:', error);
      alert('Error al eliminar la encuesta');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (poll) => {
    try {
      setLoading(true);
      await pollService.updatePoll(poll.id, { isActive: !poll.isActive });
      onPollsChanged();
    } catch (error) {
      console.error('Error updating poll status:', error);
      alert('Error al actualizar el estado de la encuesta');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestionar Encuestas</h2>
      
      {polls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay encuestas disponibles
          </h3>
          <p className="text-gray-500">
            Crea tu primera encuesta para comenzar a recopilar datos.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {polls.map((poll) => (
            <div key={poll.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
                  {poll.description && (
                    <p className="text-gray-600 mt-1">{poll.description}</p>
                  )}
                  <p className="text-gray-800 mt-2 font-medium">{poll.question}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    poll.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {poll.isActive ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>

              {/* Poll Options with Results */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Opciones y Resultados:</h4>
                <div className="space-y-2">
                  {poll.options.map((option, index) => {
                    const percentage = poll.totalVotes > 0 
                      ? Math.round((poll.votes[index] / poll.totalVotes) * 100) 
                      : 0;
                    
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{option}</span>
                            <span className="text-gray-500">
                              {poll.votes[index]} votos ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div>
                  <span className="mr-4">
                    📊 {poll.totalVotes} votos totales
                  </span>
                  <span>
                    📅 Creada: {formatDate(poll.createdAt)}
                  </span>
                </div>
                {poll.expiresAt && (
                  <span className="text-orange-600">
                    ⏰ Expira: {formatDate(poll.expiresAt)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedPoll(poll)}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => handleToggleActive(poll)}
                  disabled={loading}
                  className={`text-sm font-medium ${
                    poll.isActive 
                      ? 'text-orange-600 hover:text-orange-800' 
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  {poll.isActive ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => handleDeletePoll(poll.id)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Poll Details Modal */}
      {selectedPoll && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalles de la Encuesta
                </h3>
                <button
                  onClick={() => setSelectedPoll(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✖️
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Título:</h4>
                  <p className="text-gray-900">{selectedPoll.title}</p>
                </div>
                
                {selectedPoll.description && (
                  <div>
                    <h4 className="font-medium text-gray-700">Descripción:</h4>
                    <p className="text-gray-900">{selectedPoll.description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-700">Pregunta:</h4>
                  <p className="text-gray-900">{selectedPoll.question}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Configuración:</h4>
                  <ul className="text-gray-900 space-y-1">
                    <li>• Estado: {selectedPoll.isActive ? 'Activa' : 'Inactiva'}</li>
                    <li>• Múltiples votos: {selectedPoll.allowMultipleVotes ? 'Sí' : 'No'}</li>
                    <li>• Total de votos: {selectedPoll.totalVotes}</li>
                    <li>• Creada: {formatDate(selectedPoll.createdAt)}</li>
                    {selectedPoll.expiresAt && (
                      <li>• Expira: {formatDate(selectedPoll.expiresAt)}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}