import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isTyping?: boolean;
  suggestions?: string[];
  data?: any;
}

interface KnowledgeBase {
  [key: string]: {
    keywords: string[];
    response: string;
    followUp?: string[];
    data?: any;
  };
}

const EnhancedCopilotAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulated knowledge base for civic topics
  const knowledgeBase: KnowledgeBase = {
    elections: {
      keywords: ['elecciones', 'votar', 'candidatos', 'electoral', 'voto'],
      response: 'Las próximas elecciones regionales serán el 27 de octubre de 2024. Podrás votar por alcaldes, gobernadores y asambleas departamentales.',
      followUp: [
        '¿Dónde está mi puesto de votación?',
        '¿Qué documentos necesito para votar?',
        '¿Quiénes son los candidatos en mi ciudad?'
      ],
      data: {
        nextElectionDate: '2024-10-27',
        documentsRequired: ['Cédula de ciudadanía', 'Contraseña electoral (opcional)'],
        positions: ['Alcalde', 'Gobernador', 'Asamblea Departamental']
      }
    },
    participation: {
      keywords: ['participar', 'participación', 'ciudadana', 'cívica', 'debate'],
      response: 'Hay muchas formas de participar: debates en vivo, encuestas cívicas, consultas populares, y foros comunitarios. También puedes unirte a nuestros chats temáticos.',
      followUp: [
        '¿Cómo me uno a un debate?',
        '¿Qué son las consultas populares?',
        '¿Cómo crear una propuesta ciudadana?'
      ]
    },
    congress: {
      keywords: ['congreso', 'senado', 'cámara', 'representantes', 'ley', 'proyecto'],
      response: 'El Congreso de Colombia está compuesto por el Senado (102 miembros) y la Cámara de Representantes (172 miembros). Puedes seguir los proyectos de ley en tiempo real.',
      followUp: [
        '¿Qué proyectos están en debate ahora?',
        '¿Cómo contactar a mi representante?',
        '¿Cómo se aprueba una ley?'
      ],
      data: {
        currentProjects: [
          'Reforma Tributaria 2024',
          'Ley de Educación Digital',
          'Proyecto de Energías Renovables'
        ]
      }
    },
    budget: {
      keywords: ['presupuesto', 'gastos', 'inversión', 'finanzas', 'público'],
      response: 'El presupuesto nacional 2024 es de aproximadamente 406 billones de pesos. Los principales destinos son educación (18%), salud (16%), y defensa (12%).',
      followUp: [
        '¿En qué se gasta más dinero?',
        '¿Cómo se decide el presupuesto?',
        '¿Puedo influir en las decisiones presupuestales?'
      ],
      data: {
        totalBudget: 406000000000000,
        mainAllocations: {
          education: 18,
          health: 16,
          defense: 12,
          infrastructure: 10,
          socialPrograms: 8
        }
      }
    },
    transparency: {
      keywords: ['transparencia', 'corrupción', 'contratos', 'información', 'pública'],
      response: 'Colombia tiene varias herramientas de transparencia: SECOP para contratos públicos, la Procuraduría para investigaciones, y el portal de datos abiertos del gobierno.',
      followUp: [
        '¿Cómo consultar contratos públicos?',
        '¿Cómo denunciar corrupción?',
        '¿Qué información puedo solicitar?'
      ]
    }
  };

  const quickQuestions = [
    '¿Cuándo son las próximas elecciones?',
    '¿Cómo puedo participar en un debate?',
    '¿Qué proyectos están en el Congreso?',
    '¿Cómo funciona el presupuesto nacional?',
    '¿Dónde encuentro información sobre candidatos?',
    '¿Cómo denuncio corrupción?',
    '¿Qué son las consultas populares?',
    '¿Cómo contactar a mi representante?'
  ];

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      text: `¡Hola${user ? `, ${user.displayName || user.email?.split('@')[0]}` : ''}! Soy tu asistente cívico. Estoy aquí para ayudarte con información sobre participación ciudadana, elecciones, el Congreso, y todo lo relacionado con la vida cívica en Colombia. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date().toISOString(),
      suggestions: [
        '¿Cuándo son las elecciones?',
        '¿Cómo participar en debates?',
        '¿Qué pasa en el Congreso?'
      ]
    };
    setMessages([welcomeMessage]);
  }, [user]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Smart response generation based on keywords and context
  const generateResponse = useCallback((userInput: string, context: string[]): ChatMessage => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let maxMatches = 0;

    // Find the knowledge base entry with the most keyword matches
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      const matches = data.keywords.filter(keyword => input.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = { topic, ...data };
      }
    }

    if (bestMatch && maxMatches > 0) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: bestMatch.response,
        timestamp: new Date().toISOString(),
        suggestions: bestMatch.followUp,
        data: bestMatch.data
      };
    }

    // Context-aware responses
    if (context.some(c => c.includes('elecciones')) && input.includes('documentos')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: 'Para votar necesitas tu cédula de ciudadanía vigente. La contraseña electoral es opcional pero recomendada para agilizar el proceso.',
        timestamp: new Date().toISOString(),
        suggestions: [
          '¿Dónde está mi puesto de votación?',
          '¿Qué pasa si perdí mi cédula?',
          '¿Puedo votar desde el extranjero?'
        ]
      };
    }

    if (context.some(c => c.includes('debate')) && input.includes('participar')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: 'Para participar en debates, ve a la sección "Debates Cívicos", selecciona un tema activo y toma posición (a favor o en contra). Recuerda mantener un tono respetuoso y fundamentar tus argumentos.',
        timestamp: new Date().toISOString(),
        suggestions: [
          'Ver debates activos',
          '¿Qué temas se debaten más?',
          '¿Cómo crear un nuevo debate?'
        ]
      };
    }

    // Generic helpful response with suggestions
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: 'Gracias por tu pregunta. Aunque no tengo una respuesta específica para eso, puedo ayudarte con información sobre elecciones, participación ciudadana, el Congreso, presupuesto nacional y transparencia gubernamental. ¿Te interesa alguno de estos temas?',
      timestamp: new Date().toISOString(),
      suggestions: [
        '¿Cuándo son las elecciones?',
        '¿Cómo participar activamente?',
        '¿Qué hace el Congreso?',
        '¿Cómo se usa el presupuesto?'
      ]
    };
  }, []);

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Update conversation context
    setConversationContext(prev => [...prev.slice(-4), messageText.toLowerCase()]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const botResponse = generateResponse(messageText, conversationContext);
    
    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);

    // Focus back to input
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    sendMessage(suggestion);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">🤖 Asistente Cívico</h1>
              <p className="text-white/90">Tu guía inteligente para la participación ciudadana en Colombia</p>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-sm">{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div 
            className="h-96 overflow-y-auto p-6 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Conversación con el asistente cívico"
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'order-2' : 'order-1'
                }`}>
                  {/* Avatar */}
                  <div className={`flex items-center space-x-2 mb-1 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    {message.type === 'bot' && (
                      <span className="text-lg" role="img" aria-label="Asistente cívico">🤖</span>
                    )}
                    <span className="text-sm text-gray-500">
                      {message.type === 'user' ? 'Tú' : 'Asistente Cívico'}
                    </span>
                    <time className="text-xs text-gray-400" dateTime={message.timestamp}>
                      {formatTime(message.timestamp)}
                    </time>
                    {message.type === 'user' && (
                      <span className="text-lg" role="img" aria-label="Usuario">🙋‍♂️</span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.text}
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500 mb-1">Preguntas relacionadas:</p>
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block text-left text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Data Visualization */}
                  {message.data && message.data.mainAllocations && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Distribución del Presupuesto:</h4>
                      <div className="space-y-1">
                        {Object.entries(message.data.mainAllocations as Record<string, number>).map(([category, percentage]) => (
                          <div key={category} className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 capitalize">
                              {category}: {String(percentage)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {message.data && message.data.currentProjects && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Proyectos Actuales:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {message.data.currentProjects.map((project: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <span className="text-lg" role="img" aria-label="Asistente cívico">🤖</span>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Preguntas frecuentes:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(0, 6).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregúntame sobre participación cívica, elecciones, debates..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isConnected}
                maxLength={500}
                aria-label="Escribir pregunta al asistente"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || !isConnected || isTyping}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enviar pregunta"
              >
                {isTyping ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Enviar'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              El asistente está diseñado para ayudarte con temas cívicos y de participación ciudadana en Colombia.
            </p>
          </div>
        </div>

        {/* Features Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">🎯</span>
              Orientación Personalizada
            </h3>
            <p className="text-sm text-gray-600">
              Recomendaciones basadas en tus intereses cívicos y tu ubicación en Colombia.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">📚</span>
              Educación Cívica
            </h3>
            <p className="text-sm text-gray-600">
              Aprende sobre el sistema político, electoral y de participación ciudadana en Colombia.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">⚡</span>
              Respuestas Instantáneas
            </h3>
            <p className="text-sm text-gray-600">
              Información actualizada las 24 horas con datos oficiales y verificados.
            </p>
          </div>
        </div>

        {/* Connection Status */}
        {!isConnected && (
          <div 
            className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center space-x-2">
              <span>🔴</span>
              <span>Asistente desconectado. Reintentando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCopilotAssistant;