import React, { useState } from 'react';

const Analytics: React.FC = () => {
  const [selectedPoll, setSelectedPoll] = useState('presidential');

  const polls = [
    {
      id: 'presidential',
      title: 'Aprobación Presidencial',
      question: '¿Cómo califica la gestión del Presidente?',
      options: [
        { label: 'Excelente', votes: 23, color: 'bg-green-500' },
        { label: 'Buena', votes: 34, color: 'bg-blue-500' },
        { label: 'Regular', votes: 28, color: 'bg-yellow-500' },
        { label: 'Mala', votes: 15, color: 'bg-red-500' }
      ],
      totalVotes: 12847
    },
    {
      id: 'congress',
      title: 'Confianza en el Congreso',
      question: '¿Confía en las decisiones del Congreso?',
      options: [
        { label: 'Mucho', votes: 12, color: 'bg-green-500' },
        { label: 'Algo', votes: 28, color: 'bg-blue-500' },
        { label: 'Poco', votes: 35, color: 'bg-yellow-500' },
        { label: 'Nada', votes: 25, color: 'bg-red-500' }
      ],
      totalVotes: 9234
    },
    {
      id: 'economy',
      title: 'Percepción Económica',
      question: '¿Cómo ve la economía nacional?',
      options: [
        { label: 'Mejorando', votes: 19, color: 'bg-green-500' },
        { label: 'Estable', votes: 31, color: 'bg-blue-500' },
        { label: 'Empeorando', votes: 42, color: 'bg-yellow-500' },
        { label: 'En crisis', votes: 8, color: 'bg-red-500' }
      ],
      totalVotes: 15623
    }
  ];

  const currentPoll = polls.find(poll => poll.id === selectedPoll) || polls[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Pulso Nacional
          </h1>
          <p className="text-gray-600">
            Encuestas en tiempo real sobre temas importantes para Colombia
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>🗳️ {currentPoll.totalVotes.toLocaleString()} votos registrados</span>
            <span>📈 Actualizado hace 5 minutos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Poll Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Encuestas Activas</h2>
            {polls.map((poll) => (
              <button
                key={poll.id}
                onClick={() => setSelectedPoll(poll.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedPoll === poll.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800">{poll.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{poll.totalVotes.toLocaleString()} votos</p>
              </button>
            ))}
          </div>

          {/* Main Poll Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentPoll.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {currentPoll.question}
                </p>
              </div>

              {/* Poll Results */}
              <div className="space-y-4 mb-8">
                {currentPoll.options.map((option, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{option.label}</span>
                      <span className="text-gray-600">{option.votes}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${option.color} transition-all duration-500 ease-out`}
                        style={{ width: `${option.votes}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vote Button */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                  🗳️ Votar Ahora
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Tu voto es anónimo y seguro
                </p>
              </div>
            </div>

            {/* Historical Data */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                📈 Tendencia Histórica
              </h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Gráfico de tendencias</p>
                  <p className="text-sm">(Próximamente)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">47.2%</div>
            <div className="text-gray-600">Participación Ciudadana</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600">89.1%</div>
            <div className="text-gray-600">Verificación de Datos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">234K</div>
            <div className="text-gray-600">Votos esta Semana</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600">12</div>
            <div className="text-gray-600">Encuestas Activas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;