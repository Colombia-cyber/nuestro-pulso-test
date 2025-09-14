import React, { useState } from 'react';

const Survey: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});

  const surveys = [
    {
      id: 'conservative-priorities',
      title: 'Prioridades Conservadoras para Colombia 2024',
      description: 'Ayúdanos a identificar los valores y políticas conservadoras más importantes para Colombia',
      status: 'Activa',
      responses: 18347,
      timeLeft: '3 días',
      questions: [
        {
          id: 'priority-1',
          question: '¿Cuál considera la prioridad conservadora más urgente para Colombia?',
          type: 'single',
          options: [
            'Fortalecer la seguridad ciudadana y el orden público',
            'Proteger los valores familiares tradicionales',
            'Reducir impuestos y regulaciones a las empresas',
            'Defender la propiedad privada y la libre empresa',
            'Combatir la corrupción con mano dura',
            'Fortalecer las instituciones democráticas'
          ]
        },
        {
          id: 'family-values',
          question: '¿Qué tan importante es proteger la familia tradicional en las políticas públicas?',
          type: 'scale',
          scale: { min: 1, max: 10, labels: { 1: 'Nada importante', 10: 'Extremadamente importante' } }
        }
      ]
    }
  ];

  const quickPolls = [
    {
      id: 'tax-reduction',
      question: '¿Apoya la reducción de impuestos a las empresas para estimular el crecimiento económico?',
      votes: { si: 4237, no: 1456, noSeguro: 567 },
      total: 6260
    },
    {
      id: 'family-education',
      question: '¿Los padres deben tener el derecho a decidir la educación de sus hijos según sus valores?',
      votes: { si: 5124, no: 892, noSeguro: 234 },
      total: 6250
    },
    {
      id: 'security-measures',
      question: '¿Colombia necesita endurecer las penas contra la delincuencia?',
      votes: { si: 4876, no: 1203, noSeguro: 421 },
      total: 6500
    },
    {
      id: 'free-market',
      question: '¿El libre mercado es la mejor solución para el desarrollo económico de Colombia?',
      votes: { si: 3892, no: 1678, noSeguro: 730 },
      total: 6300
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
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📊 Encuestas Conservadoras</h1>
          <p className="text-white/90">Tu voz conservadora importa: participa en encuestas que reflejan valores tradicionales</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>📋 8 encuestas conservadoras activas</span>
            <span>👥 65,431 respuestas esta semana</span>
            <span>🏛️ Perspectiva tradicional</span>
            <span>📈 Resultados en tiempo real</span>
          </div>
        </div>

        {/* Featured Conservative Survey */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{surveys[0].title}</h2>
              <p className="text-gray-600 mt-1">{surveys[0].description}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                🏛️ Enfoque Conservador
              </span>
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
                      <label key={optionIndex} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition">
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
                          className={`w-10 h-10 rounded-full border-2 font-semibold transition ${
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
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition">
              Enviar Respuestas
            </button>
          </div>
        </div>

        {/* Conservative Quick Polls */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🏛️ Encuestas Rápidas Conservadoras
          </h3>
          <div className="space-y-4">
            {quickPolls.map((poll) => (
              <div key={poll.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-gray-900 mb-3">{poll.question}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Sí ✓
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.si.toLocaleString()} votos ({calculatePercentage(poll.votes.si, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all" 
                        style={{ width: `${calculatePercentage(poll.votes.si, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                        No ✗
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.no.toLocaleString()} votos ({calculatePercentage(poll.votes.no, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-red-500 h-3 rounded-full transition-all" 
                        style={{ width: `${calculatePercentage(poll.votes.no, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                        No estoy seguro ?
                      </button>
                      <span className="text-sm text-gray-600">
                        {poll.votes.noSeguro.toLocaleString()} votos ({calculatePercentage(poll.votes.noSeguro, poll.total)}%)
                      </span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gray-500 h-3 rounded-full transition-all" 
                        style={{ width: `${calculatePercentage(poll.votes.noSeguro, poll.total)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>Total: {poll.total.toLocaleString()} votos</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">🏛️ Conservador</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conservative Topics Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Próximas Encuestas Conservadoras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Reforma Judicial y Estado de Derecho',
                description: 'Opiniones sobre el fortalecimiento del sistema judicial',
                startDate: 'Lunes próximo',
                category: 'Justicia',
                icon: '⚖️'
              },
              {
                title: 'Política de Defensa Nacional',
                description: 'Evaluación de las políticas de seguridad y defensa',
                startDate: 'Miércoles',
                category: 'Seguridad',
                icon: '🛡️'
              },
              {
                title: 'Educación y Valores Familiares',
                description: 'El papel de la familia en la educación de los niños',
                startDate: 'Viernes',
                category: 'Familia',
                icon: '👨‍👩‍👧‍👦'
              },
              {
                title: 'Políticas de Empleo y Emprendimiento',
                description: 'Incentivos para la creación de empleos privados',
                startDate: 'Próxima semana',
                category: 'Economía',
                icon: '💼'
              }
            ].map((survey, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{survey.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{survey.title}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{survey.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                <span className="text-xs text-blue-600 font-medium">Inicia: {survey.startDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;