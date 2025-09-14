import React, { useState, useEffect } from 'react';

const Survey: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [votedPolls, setVotedPolls] = useState<{[key: string]: string}>({});
  const [liveResults, setLiveResults] = useState<{[key: string]: any}>({});

  // Simulate live updates for quick polls
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveResults(prev => ({
        ...prev,
        'transport-bogota': {
          si: Math.floor(Math.random() * 100) + 2800,
          no: Math.floor(Math.random() * 50) + 1200,
          noSeguro: Math.floor(Math.random() * 30) + 450
        },
        'tax-reform': {
          si: Math.floor(Math.random() * 100) + 1900,
          no: Math.floor(Math.random() * 200) + 3400,
          noSeguro: Math.floor(Math.random() * 50) + 670
        }
      }));
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const surveys = [
    {
      id: 'national-priorities',
      title: 'Prioridades Nacionales 2024',
      description: 'Ayúdanos a identificar los temas más importantes para Colombia',
      status: 'Activa',
      responses: 15847,
      timeLeft: '5 días',
      questions: [
        {
          id: 'priority-1',
          question: '¿Cuál considera la prioridad más urgente para Colombia?',
          type: 'single',
          options: [
            'Seguridad ciudadana',
            'Reducción de la pobreza',
            'Educación de calidad',
            'Salud pública',
            'Corrupción gubernamental',
            'Cambio climático'
          ]
        },
        {
          id: 'satisfaction',
          question: '¿Qué tan satisfecho está con la gestión actual del gobierno nacional?',
          type: 'scale',
          scale: { min: 1, max: 10, labels: { 1: 'Muy insatisfecho', 10: 'Muy satisfecho' } }
        }
      ]
    }
  ];

  const quickPolls = [
    {
      id: 'transport-bogota',
      question: '¿Apoya la expansión del sistema de ciclorrutas en Bogotá?',
      votes: liveResults['transport-bogota'] || { si: 2847, no: 1203, noSeguro: 456 },
      get total() { return this.votes.si + this.votes.no + this.votes.noSeguro; }
    },
    {
      id: 'tax-reform',
      question: '¿La reforma tributaria beneficiará a la clase media colombiana?',
      votes: liveResults['tax-reform'] || { si: 1895, no: 3452, noSeguro: 678 },
      get total() { return this.votes.si + this.votes.no + this.votes.noSeguro; }
    },
    {
      id: 'education-budget',
      question: '¿Debería aumentarse el presupuesto para educación pública?',
      votes: { si: 4320, no: 890, noSeguro: 234 },
      get total() { return this.votes.si + this.votes.no + this.votes.noSeguro; }
    },
    {
      id: 'renewable-energy',
      question: '¿Colombia debería priorizar las energías renovables sobre el petróleo?',
      votes: { si: 3120, no: 2450, noSeguro: 890 },
      get total() { return this.votes.si + this.votes.no + this.votes.noSeguro; }
    }
  ];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuickVote = (pollId: string, option: string) => {
    if (!votedPolls[pollId]) {
      setVotedPolls(prev => ({
        ...prev,
        [pollId]: option
      }));
      
      // Simulate vote submission with immediate feedback
      setTimeout(() => {
        alert(`¡Voto registrado! Gracias por participar en "${quickPolls.find(p => p.id === pollId)?.question}"`);
      }, 100);
    }
  };

  const calculatePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100);
  };

  const getVoteButtonClass = (pollId: string, option: string, baseClass: string) => {
    if (votedPolls[pollId] === option) {
      return `${baseClass} ring-2 ring-offset-2 ring-white opacity-90`;
    } else if (votedPolls[pollId]) {
      return `${baseClass} opacity-50 cursor-not-allowed`;
    }
    return `${baseClass} hover:opacity-80`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📊 Encuestas Cívicas</h1>
          <p className="text-white/90">Tu opinión importa: participa en encuestas que moldean las políticas públicas</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>📋 12 encuestas activas</span>
            <span>👥 45,231 respuestas esta semana</span>
            <span>📈 Resultados en tiempo real</span>
          </div>
        </div>

        {/* Featured Survey */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{surveys[0].title}</h2>
              <p className="text-gray-600 mt-1">{surveys[0].description}</p>
            </div>
            <div className="text-right">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {surveys[0].status}
              </span>
              <div className="text-sm text-gray-500 mt-1">
                {surveys[0].responses.toLocaleString()} respuestas
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {surveys[0].questions.map((question, index) => (
              <div key={question.id} className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </h3>
                
                {question.type === 'single' && (
                  <div className="space-y-2">
                    {question.options?.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                          className="mr-3 text-blue-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'scale' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{question.scale?.labels[1]}</span>
                      <span>{question.scale?.labels[10]}</span>
                    </div>
                    <div className="flex space-x-2">
                      {[...Array(10)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handleAnswerSelect(question.id, String(i + 1))}
                          className={`w-10 h-10 rounded-full border-2 font-semibold ${
                            selectedAnswers[question.id] === String(i + 1)
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-gray-300 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-gray-500">⏰ Termina en {surveys[0].timeLeft}</span>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Enviar Respuestas
            </button>
          </div>
        </div>

        {/* Quick Polls */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Encuestas Rápidas 
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              🔴 EN VIVO
            </span>
          </h3>
          <div className="space-y-4">
            {quickPolls.map((poll) => (
              <div key={poll.id} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">{poll.question}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleQuickVote(poll.id, 'si')}
                        disabled={!!votedPolls[poll.id]}
                        className={getVoteButtonClass(poll.id, 'si', 'bg-green-500 text-white px-4 py-2 rounded font-medium transition-all')}
                      >
                        {votedPolls[poll.id] === 'si' ? '✓ ' : ''}Sí
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.si.toLocaleString()} votos ({calculatePercentage(poll.votes.si, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${calculatePercentage(poll.votes.si, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleQuickVote(poll.id, 'no')}
                        disabled={!!votedPolls[poll.id]}
                        className={getVoteButtonClass(poll.id, 'no', 'bg-red-500 text-white px-4 py-2 rounded font-medium transition-all')}
                      >
                        {votedPolls[poll.id] === 'no' ? '✓ ' : ''}No
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.no.toLocaleString()} votos ({calculatePercentage(poll.votes.no, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-red-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${calculatePercentage(poll.votes.no, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleQuickVote(poll.id, 'noSeguro')}
                        disabled={!!votedPolls[poll.id]}
                        className={getVoteButtonClass(poll.id, 'noSeguro', 'bg-gray-500 text-white px-4 py-2 rounded font-medium transition-all')}
                      >
                        {votedPolls[poll.id] === 'noSeguro' ? '✓ ' : ''}No estoy seguro
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.noSeguro.toLocaleString()} votos ({calculatePercentage(poll.votes.noSeguro, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gray-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${calculatePercentage(poll.votes.noSeguro, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>Total: {poll.total.toLocaleString()} votos</span>
                  {votedPolls[poll.id] && (
                    <span className="text-green-600 font-medium">✓ Has votado</span>
                  )}
                  {liveResults[poll.id] && (
                    <span className="animate-pulse text-blue-600">🔄 Actualizando...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Poll Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Crear Nueva Encuesta</h3>
          <p className="text-gray-600 mb-4">
            ¿Tienes una pregunta importante para la ciudadanía? Propón una nueva encuesta cívica.
          </p>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="¿Cuál es tu pregunta para Colombia?"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Opción 1"
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input 
                type="text" 
                placeholder="Opción 2"
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-300">
                + Opción
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Permitir opción "No estoy seguro"</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Encuesta anónima</span>
                </label>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                Proponer Encuesta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;