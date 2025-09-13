import React, { useState } from 'react';
import { FiBarChart, FiTrendingUp, FiClock, FiUsers, FiCheck } from 'react-icons/fi';

const PollsPage: React.FC = () => {
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);

  const activePolls = [
    {
      id: 1,
      title: "Reforma al Sistema de Salud",
      description: "¿Estás de acuerdo con las propuestas de reforma al sistema de salud colombiano?",
      totalVotes: 2847,
      timeLeft: "2 días",
      options: [
        { id: 1, text: "Totalmente de acuerdo", votes: 1139, percentage: 40 },
        { id: 2, text: "Parcialmente de acuerdo", votes: 854, percentage: 30 },
        { id: 3, text: "En desacuerdo", votes: 569, percentage: 20 },
        { id: 4, text: "Sin opinión", votes: 285, percentage: 10 }
      ],
      category: "Salud",
      hasVoted: false
    },
    {
      id: 2,
      title: "Presupuesto para Educación 2025",
      description: "¿Consideras suficiente el presupuesto asignado a educación para el próximo año?",
      totalVotes: 3456,
      timeLeft: "5 días",
      options: [
        { id: 1, text: "Suficiente", votes: 692, percentage: 20 },
        { id: 2, text: "Insuficiente", votes: 2419, percentage: 70 },
        { id: 3, text: "Excesivo", votes: 345, percentage: 10 }
      ],
      category: "Educación",
      hasVoted: true
    },
    {
      id: 3,
      title: "Transporte Público en Ciudades",
      description: "¿Cuál debería ser la prioridad en el mejoramiento del transporte público?",
      totalVotes: 1923,
      timeLeft: "1 semana",
      options: [
        { id: 1, text: "Más rutas y frecuencia", votes: 769, percentage: 40 },
        { id: 2, text: "Modernización de flota", votes: 577, percentage: 30 },
        { id: 3, text: "Reducción de tarifas", votes: 385, percentage: 20 },
        { id: 4, text: "Integración modal", votes: 192, percentage: 10 }
      ],
      category: "Transporte",
      hasVoted: false
    }
  ];

  const completedPolls = [
    {
      id: 4,
      title: "Jornada Única Escolar",
      description: "Implementación de jornada única en colegios públicos",
      result: "68% a favor",
      totalVotes: 5432,
      category: "Educación"
    },
    {
      id: 5,
      title: "Ley de Teletrabajo",
      description: "Regulación del trabajo remoto post-pandemia",
      result: "82% a favor",
      totalVotes: 4567,
      category: "Laboral"
    }
  ];

  const handleVote = (pollId: number, optionId: number) => {
    setSelectedPoll(pollId);
    // Aquí iría la lógica para enviar el voto
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Encuestas Ciudadanas
          </h1>
          <p className="text-xl text-gray-600">
            Participa en encuestas sobre temas importantes para Colombia
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
            <div className="text-sm text-gray-600">Encuestas Activas</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">156K</div>
            <div className="text-sm text-gray-600">Votos Registrados</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Participación Promedio</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">45</div>
            <div className="text-sm text-gray-600">Encuestas Completadas</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Active Polls */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Encuestas Activas</h2>
              <div className="space-y-6">
                {activePolls.map((poll) => (
                  <div key={poll.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {poll.category}
                        </span>
                        {poll.hasVoted && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                            <FiCheck size={14} />
                            <span>Votado</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FiClock size={14} />
                        <span>{poll.timeLeft} restantes</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {poll.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {poll.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      {poll.options.map((option) => (
                        <div key={option.id} className="relative">
                          <div 
                            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                              poll.hasVoted 
                                ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                            onClick={() => !poll.hasVoted && handleVote(poll.id, option.id)}
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
                        <span>{poll.totalVotes.toLocaleString()} participantes</span>
                      </div>
                      {!poll.hasVoted ? (
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
                ))}
              </div>
            </div>

            {/* Completed Polls */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Encuestas Completadas</h2>
              <div className="space-y-4">
                {completedPolls.map((poll) => (
                  <div key={poll.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {poll.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Completada
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {poll.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {poll.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-green-600">
                        Resultado: {poll.result}
                      </div>
                      <div className="text-sm text-gray-500">
                        {poll.totalVotes.toLocaleString()} participantes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Create Poll */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">
                ➕ Crear Encuesta
              </h3>
              <p className="mb-4 text-purple-100">
                ¿Tienes una pregunta importante para la ciudadanía?
              </p>
              <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Proponer Encuesta
              </button>
            </div>

            {/* Poll Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FiBarChart />
                <span>Categorías</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Política</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Educación</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Salud</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Economía</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Medio Ambiente</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">2</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FiTrendingUp />
                <span>Temas Trending</span>
              </h3>
              <div className="space-y-2">
                <div className="text-gray-700">#ReformaEducativa</div>
                <div className="text-gray-700">#SaludPublica</div>
                <div className="text-gray-700">#TransporteUrbano</div>
                <div className="text-gray-700">#MedioAmbiente</div>
                <div className="text-gray-700">#ParticipacionCiudadana</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📈 Tu Participación
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Encuestas Respondidas</span>
                    <span className="text-sm font-semibold">12/23</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <div className="text-2xl font-bold text-blue-600">52%</div>
                  <div className="text-sm text-gray-600">Nivel de Participación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollsPage;