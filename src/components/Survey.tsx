import React, { useState } from 'react';

const Survey: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});

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
      votes: { si: 2847, no: 1203, noSeguro: 456 },
      total: 4506
    },
    {
      id: 'tax-reform',
      question: '¿La reforma tributaria beneficiará a la clase media colombiana?',
      votes: { si: 1895, no: 3452, noSeguro: 678 },
      total: 6025
    }
  ];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculatePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100);
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Encuestas Rápidas</h3>
          <div className="space-y-4">
            {quickPolls.map((poll) => (
              <div key={poll.id} className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{poll.question}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Sí
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.si.toLocaleString()} votos ({calculatePercentage(poll.votes.si, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(poll.votes.si, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        No
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.no.toLocaleString()} votos ({calculatePercentage(poll.votes.no, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(poll.votes.no, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        No estoy seguro
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.noSeguro.toLocaleString()} votos ({calculatePercentage(poll.votes.noSeguro, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(poll.votes.noSeguro, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Total: {poll.total.toLocaleString()} votos
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;