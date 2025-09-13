import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface SurveyQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  scale?: { min: number; max: number; labels: { [key: number]: string } };
  required: boolean;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'upcoming';
  responses: number;
  timeLeft: string;
  questions: SurveyQuestion[];
  category: string;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface QuickPoll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVoted: boolean;
  category: string;
  timeLeft?: string;
}

interface VoteResults {
  [questionId: string]: {
    [optionId: string]: number;
  };
}

const EnhancedSurvey: React.FC = () => {
  const { user } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string | string[]}>({});
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [quickPolls, setQuickPolls] = useState<QuickPoll[]>([]);
  const [liveResults, setLiveResults] = useState<VoteResults>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(0);

  // Simulate real-time results fetching
  const fetchLiveResults = useCallback(async () => {
    try {
      // Simulate API call for live results
      const mockResults: VoteResults = {
        'priority-1': {
          'security': Math.floor(Math.random() * 1000) + 500,
          'poverty': Math.floor(Math.random() * 800) + 400,
          'education': Math.floor(Math.random() * 600) + 300,
          'health': Math.floor(Math.random() * 700) + 350,
          'corruption': Math.floor(Math.random() * 900) + 450,
          'climate': Math.floor(Math.random() * 400) + 200,
        }
      };
      
      setLiveResults(mockResults);
    } catch (error) {
      console.error('Error fetching live results:', error);
    }
  }, []);

  // Initialize data and setup real-time updates
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      
      // Mock survey data
      const mockSurveys: Survey[] = [
        {
          id: 'national-priorities-2024',
          title: 'Prioridades Nacionales 2024',
          description: 'Ayúdanos a identificar los temas más importantes para Colombia',
          status: 'active',
          responses: 15847,
          timeLeft: '5 días',
          category: 'politics',
          questions: [
            {
              id: 'priority-1',
              question: '¿Cuál considera la prioridad más urgente para Colombia?',
              type: 'single',
              required: true,
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
              required: true,
              scale: { min: 1, max: 10, labels: { 1: 'Muy insatisfecho', 10: 'Muy satisfecho' } }
            },
            {
              id: 'suggestions',
              question: '¿Qué sugerencias tiene para mejorar la participación ciudadana?',
              type: 'text',
              required: false
            }
          ]
        },
        {
          id: 'education-reform',
          title: 'Reforma Educativa 2024',
          description: 'Tu opinión sobre los cambios propuestos al sistema educativo',
          status: 'active',
          responses: 8234,
          timeLeft: '12 días',
          category: 'education',
          questions: [
            {
              id: 'education-priority',
              question: '¿Cuál debería ser la prioridad en educación?',
              type: 'single',
              required: true,
              options: [
                'Infraestructura escolar',
                'Formación docente',
                'Tecnología educativa',
                'Alimentación escolar',
                'Educación rural'
              ]
            }
          ]
        }
      ];

      // Mock quick polls
      const mockQuickPolls: QuickPoll[] = [
        {
          id: 'transport-bogota',
          question: '¿Apoya la expansión del sistema de ciclorrutas en Bogotá?',
          category: 'urban',
          totalVotes: 4506,
          userVoted: false,
          options: [
            { id: 'yes', text: 'Sí', votes: 2847, percentage: 63 },
            { id: 'no', text: 'No', votes: 1203, percentage: 27 },
            { id: 'unsure', text: 'No estoy seguro', votes: 456, percentage: 10 }
          ]
        },
        {
          id: 'tax-reform',
          question: '¿La reforma tributaria beneficiará a la clase media colombiana?',
          category: 'economics',
          totalVotes: 6025,
          userVoted: false,
          timeLeft: '2 días',
          options: [
            { id: 'yes', text: 'Sí', votes: 1895, percentage: 31 },
            { id: 'no', text: 'No', votes: 3452, percentage: 57 },
            { id: 'unsure', text: 'No estoy seguro', votes: 678, percentage: 12 }
          ]
        }
      ];

      setSurveys(mockSurveys);
      setQuickPolls(mockQuickPolls);
      await fetchLiveResults();
      setLoading(false);
    };

    initializeData();

    // Setup real-time updates every 10 seconds
    const interval = setInterval(fetchLiveResults, 10000);
    
    return () => clearInterval(interval);
  }, [fetchLiveResults]);

  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuickPollVote = async (pollId: string, optionId: string) => {
    if (!user) {
      alert('Debes iniciar sesión para votar');
      return;
    }

    // Update local state immediately for better UX
    setQuickPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        
        const newTotal = poll.totalVotes + 1;
        const updatedOptionsWithPercentage = updatedOptions.map(option => ({
          ...option,
          percentage: Math.round((option.votes / newTotal) * 100)
        }));

        return {
          ...poll,
          options: updatedOptionsWithPercentage,
          totalVotes: newTotal,
          userVoted: true
        };
      }
      return poll;
    }));

    // Here you would make the API call to save the vote
    try {
      // await submitVote(pollId, optionId);
      console.log(`Voted ${optionId} on poll ${pollId}`);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const submitSurvey = async () => {
    if (!user) {
      alert('Debes iniciar sesión para enviar respuestas');
      return;
    }

    setSubmitting(true);
    
    try {
      // Validate required questions
      const currentSurvey = surveys[selectedSurvey];
      const requiredQuestions = currentSurvey.questions.filter(q => q.required);
      const missingAnswers = requiredQuestions.filter(q => !selectedAnswers[q.id]);
      
      if (missingAnswers.length > 0) {
        alert('Por favor responde todas las preguntas obligatorias');
        setSubmitting(false);
        return;
      }

      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Respuestas enviadas exitosamente! Gracias por tu participación.');
      setSelectedAnswers({});
      
    } catch (error) {
      alert('Error al enviar respuestas. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando encuestas...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentSurvey = surveys[selectedSurvey];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📊 Encuestas Cívicas</h1>
          <p className="text-white/90">Tu opinión importa: participa en encuestas que moldean las políticas públicas</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>📋 {surveys.length} encuestas activas</span>
            <span>👥 {surveys.reduce((sum, s) => sum + s.responses, 0).toLocaleString()} respuestas esta semana</span>
            <span>📈 Resultados en tiempo real</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Survey Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Encuestas Disponibles</h2>
              <nav 
                className="space-y-2"
                role="tablist"
                aria-label="Encuestas disponibles"
              >
                {surveys.map((survey, index) => (
                  <button
                    key={survey.id}
                    onClick={() => setSelectedSurvey(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedSurvey === index
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    role="tab"
                    aria-selected={selectedSurvey === index}
                    aria-label={`Seleccionar encuesta: ${survey.title}`}
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{survey.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        survey.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {survey.status === 'active' ? 'Activa' : 'Completada'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {survey.responses.toLocaleString()} respuestas
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Polls */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Encuestas Rápidas</h2>
              <div className="space-y-4">
                {quickPolls.map((poll) => (
                  <div key={poll.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{poll.question}</h3>
                    
                    {poll.userVoted ? (
                      <div className="space-y-2">
                        {poll.options.map((option) => (
                          <div key={option.id} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{option.text}</span>
                              <span className="text-sm text-gray-600">
                                {option.percentage}% ({option.votes.toLocaleString()})
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${option.percentage}%` }}
                                role="progressbar"
                                aria-valuenow={option.percentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label={`${option.text}: ${option.percentage}%`}
                              ></div>
                            </div>
                          </div>
                        ))}
                        <p className="text-xs text-green-600 mt-2">✅ Ya votaste en esta encuesta</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {poll.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleQuickPollVote(poll.id, option.id)}
                            className="w-full p-2 text-left border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!user}
                          >
                            {option.text}
                          </button>
                        ))}
                        {!user && (
                          <p className="text-xs text-gray-500">Inicia sesión para votar</p>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                      <span>Total: {poll.totalVotes.toLocaleString()} votos</span>
                      {poll.timeLeft && <span>⏰ {poll.timeLeft}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Survey */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentSurvey.title}</h2>
                  <p className="text-gray-600 mt-1">{currentSurvey.description}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentSurvey.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentSurvey.status === 'active' ? 'Activa' : 'Completada'}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    {currentSurvey.responses.toLocaleString()} respuestas
                  </div>
                </div>
              </div>

              <form 
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSurvey();
                }}
              >
                {currentSurvey.questions.map((question, index) => (
                  <fieldset key={question.id} className="border-b pb-6">
                    <legend className="text-lg font-semibold text-gray-900 mb-4">
                      {index + 1}. {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </legend>
                    
                    {question.type === 'single' && (
                      <div className="space-y-2" role="radiogroup">
                        {question.options?.map((option, optionIndex) => (
                          <label 
                            key={optionIndex} 
                            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                              className="mr-3 text-blue-600 focus:ring-blue-500"
                              required={question.required}
                            />
                            <span>{option}</span>
                            
                            {/* Show live results if available */}
                            {liveResults[question.id] && (
                              <div className="ml-auto flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ 
                                      width: `${(liveResults[question.id][option.toLowerCase().replace(' ', '')] || 0) / Math.max(...Object.values(liveResults[question.id] || {})) * 100}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {liveResults[question.id][option.toLowerCase().replace(' ', '')] || 0}
                                </span>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'scale' && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{question.scale?.labels[question.scale.min]}</span>
                          <span>{question.scale?.labels[question.scale.max]}</span>
                        </div>
                        <div 
                          className="flex space-x-2"
                          role="radiogroup"
                          aria-label={`Escala de ${question.scale?.min} a ${question.scale?.max}`}
                        >
                          {Array.from({ length: (question.scale?.max || 10) - (question.scale?.min || 1) + 1 }, (_, i) => {
                            const value = (question.scale?.min || 1) + i;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => handleAnswerSelect(question.id, String(value))}
                                className={`w-10 h-10 rounded-full border-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  selectedAnswers[question.id] === String(value)
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : 'border-gray-300 text-gray-600 hover:border-blue-300'
                                }`}
                                role="radio"
                                aria-checked={selectedAnswers[question.id] === String(value)}
                                aria-label={`Calificación ${value}`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {question.type === 'text' && (
                      <textarea
                        value={selectedAnswers[question.id] as string || ''}
                        onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required={question.required}
                        aria-label={question.question}
                        maxLength={1000}
                      />
                    )}
                  </fieldset>
                ))}

                <div className="flex justify-between items-center pt-6">
                  <span className="text-sm text-gray-500">
                    ⏰ Termina en {currentSurvey.timeLeft}
                  </span>
                  
                  {user ? (
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {submitting ? 'Enviando...' : 'Enviar Respuestas'}
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Inicia sesión para enviar tus respuestas</p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Iniciar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm">Resultados actualizándose en vivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSurvey;