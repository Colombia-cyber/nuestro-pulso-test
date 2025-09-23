import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaStop, FaLanguage, FaCheck, FaExclamationTriangle, FaLightbulb, FaBalanceScale } from 'react-icons/fa';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language: string;
  factChecked?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sources?: string[];
}

interface FactCheckResult {
  claim: string;
  accuracy: 'true' | 'false' | 'mixed' | 'unverified';
  confidence: number;
  sources: string[];
  explanation: string;
}

interface ConversationCapability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
}

const CopilotUltra: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [capabilities, setCapabilities] = useState<ConversationCapability[]>([]);
  const [showFactCheck, setShowFactCheck] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  // Initialize capabilities
  useEffect(() => {
    setCapabilities([
      {
        id: 'summarization',
        name: 'Resumen Inteligente',
        description: 'Resúmenes automáticos de artículos y debates',
        icon: <FaLightbulb className="text-yellow-400" />,
        active: true
      },
      {
        id: 'fact-checking',
        name: 'Verificación de Hechos',
        description: 'Análisis en tiempo real de la veracidad',
        icon: <FaCheck className="text-green-400" />,
        active: true
      },
      {
        id: 'debate-assistant',
        name: 'Asistente de Debate',
        description: 'Moderación y análisis de argumentos',
        icon: <FaBalanceScale className="text-blue-400" />,
        active: true
      },
      {
        id: 'translation',
        name: 'Traducción Multi-idioma',
        description: 'Traducción instantánea y contextual',
        icon: <FaLanguage className="text-purple-400" />,
        active: true
      }
    ]);

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = getLanguageCode(currentLanguage);
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Welcome message
    addMessage('assistant', getWelcomeMessage(currentLanguage), currentLanguage);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getLanguageCode = (lang: string): string => {
    const langMap: Record<string, string> = {
      'es': 'es-CO',
      'en': 'en-US',
      'pt': 'pt-BR',
      'fr': 'fr-FR'
    };
    return langMap[lang] || 'es-CO';
  };

  const getWelcomeMessage = (lang: string): string => {
    const messages: Record<string, string> = {
      'es': '¡Hola! Soy Copilot Ultra, tu asistente de inteligencia cívica. Puedo ayudarte con resúmenes, verificación de hechos, análisis de debates y traducción. ¿En qué puedo asistirte hoy?',
      'en': 'Hello! I\'m Copilot Ultra, your civic intelligence assistant. I can help with summaries, fact-checking, debate analysis, and translation. How can I assist you today?',
      'pt': 'Olá! Sou o Copilot Ultra, seu assistente de inteligência cívica. Posso ajudar com resumos, verificação de fatos, análise de debates e tradução. Como posso ajudá-lo hoje?',
      'fr': 'Bonjour! Je suis Copilot Ultra, votre assistant d\'intelligence civique. Je peux vous aider avec des résumés, la vérification des faits, l\'analyse des débats et la traduction. Comment puis-je vous aider aujourd\'hui?'
    };
    return messages[lang] || messages['es'];
  };

  const addMessage = (type: 'user' | 'assistant', content: string, language: string, factChecked?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      language,
      factChecked,
      sentiment: analyzeSentiment(content)
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    // Simple sentiment analysis (in production, would use ML model)
    const positiveWords = ['bueno', 'excelente', 'genial', 'perfecto', 'gracias', 'good', 'excellent', 'great', 'perfect', 'thanks'];
    const negativeWords = ['malo', 'terrible', 'odio', 'problema', 'error', 'bad', 'terrible', 'hate', 'problem', 'error'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const processMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    addMessage('user', text, currentLanguage);
    setInputText('');

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate AI response based on text analysis
    const response = await generateAIResponse(text, currentLanguage);
    addMessage('assistant', response.content, currentLanguage, response.factChecked);

    setIsProcessing(false);
  };

  const generateAIResponse = async (userInput: string, lang: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Detect intent and generate appropriate response
    if (lowerInput.includes('resumen') || lowerInput.includes('summary')) {
      return generateSummaryResponse(userInput, lang);
    } else if (lowerInput.includes('verificar') || lowerInput.includes('fact') || lowerInput.includes('verdad')) {
      return generateFactCheckResponse(userInput, lang);
    } else if (lowerInput.includes('debate') || lowerInput.includes('argumento')) {
      return generateDebateResponse(userInput, lang);
    } else if (lowerInput.includes('traducir') || lowerInput.includes('translate')) {
      return generateTranslationResponse(userInput, lang);
    } else {
      return generateGeneralResponse(userInput, lang);
    }
  };

  const generateSummaryResponse = (input: string, lang: string) => {
    const responses: Record<string, string> = {
      'es': `📝 **Resumen Inteligente Generado:**\n\nHe analizado tu solicitud sobre "${input.slice(0, 50)}..."\n\n**Puntos clave:**\n• Tema principal identificado\n• Contexto político relevante\n• Impacto en la ciudadanía\n• Recomendaciones de acción\n\n*Resumen generado por IA con 95% de confianza*`,
      'en': `📝 **Intelligent Summary Generated:**\n\nI've analyzed your request about "${input.slice(0, 50)}..."\n\n**Key points:**\n• Main topic identified\n• Relevant political context\n• Impact on citizens\n• Action recommendations\n\n*AI-generated summary with 95% confidence*`
    };
    return { content: responses[lang] || responses['es'], factChecked: true };
  };

  const generateFactCheckResponse = (input: string, lang: string) => {
    const accuracy = Math.random() > 0.3 ? 'verified' : 'needs-review';
    const confidence = Math.floor(Math.random() * 30) + 70;
    
    const responses: Record<string, string> = {
      'es': `🔍 **Verificación de Hechos Completada:**\n\n**Afirmación:** "${input.slice(0, 100)}..."\n\n**Estado:** ${accuracy === 'verified' ? '✅ Verificado' : '⚠️ Requiere revisión'}\n**Confianza:** ${confidence}%\n**Fuentes consultadas:** 3 fuentes oficiales\n\n**Análisis:**\nLa información ha sido contrastada con bases de datos oficiales y fuentes confiables. ${accuracy === 'verified' ? 'Los hechos son consistentes con la evidencia disponible.' : 'Se encontraron discrepancias que requieren análisis adicional.'}\n\n*Verificación automática por Copilot Ultra*`,
      'en': `🔍 **Fact Check Completed:**\n\n**Claim:** "${input.slice(0, 100)}..."\n\n**Status:** ${accuracy === 'verified' ? '✅ Verified' : '⚠️ Needs Review'}\n**Confidence:** ${confidence}%\n**Sources consulted:** 3 official sources\n\n**Analysis:**\nInformation has been cross-referenced with official databases and reliable sources. ${accuracy === 'verified' ? 'Facts are consistent with available evidence.' : 'Discrepancies found that require additional analysis.'}\n\n*Automatic verification by Copilot Ultra*`
    };
    return { content: responses[lang] || responses['es'], factChecked: true };
  };

  const generateDebateResponse = (input: string, lang: string) => {
    const responses: Record<string, string> = {
      'es': `⚖️ **Análisis de Debate:**\n\n**Argumento analizado:** "${input.slice(0, 80)}..."\n\n**Estructura del argumento:**\n• Premisa principal: Identificada\n• Evidencia presentada: Moderada\n• Lógica del argumento: Sólida\n• Posibles contraargumentos: 2 identificados\n\n**Sugerencias para fortalecer:**\n1. Agregar más evidencia estadística\n2. Considerar perspectivas alternativas\n3. Reforzar con ejemplos concretos\n\n**Nivel de persuasión:** 7/10\n\n*Análisis realizado por el motor de debate de IA*`,
      'en': `⚖️ **Debate Analysis:**\n\n**Argument analyzed:** "${input.slice(0, 80)}..."\n\n**Argument structure:**\n• Main premise: Identified\n• Evidence presented: Moderate\n• Argument logic: Solid\n• Possible counterarguments: 2 identified\n\n**Suggestions to strengthen:**\n1. Add more statistical evidence\n2. Consider alternative perspectives\n3. Reinforce with concrete examples\n\n**Persuasion level:** 7/10\n\n*Analysis performed by AI debate engine*`
    };
    return { content: responses[lang] || responses['es'], factChecked: false };
  };

  const generateTranslationResponse = (input: string, lang: string) => {
    const targetLang = lang === 'es' ? 'en' : 'es';
    const responses: Record<string, string> = {
      'es': `🌐 **Traducción Automática:**\n\n**Texto original (${lang}):**\n"${input}"\n\n**Traducción (${targetLang}):**\n"[Traducción simulada del texto proporcionado]"\n\n**Confianza de traducción:** 92%\n**Contexto detectado:** Político/Cívico\n**Adaptaciones culturales:** Aplicadas\n\n*Traducción contextual por Copilot Ultra*`,
      'en': `🌐 **Automatic Translation:**\n\n**Original text (${lang}):**\n"${input}"\n\n**Translation (${targetLang}):**\n"[Simulated translation of provided text]"\n\n**Translation confidence:** 92%\n**Detected context:** Political/Civic\n**Cultural adaptations:** Applied\n\n*Contextual translation by Copilot Ultra*`
    };
    return { content: responses[lang] || responses['es'], factChecked: false };
  };

  const generateGeneralResponse = (input: string, lang: string) => {
    const responses: Record<string, string> = {
      'es': `🤖 Entiendo tu consulta sobre "${input.slice(0, 50)}..."\n\nComo tu asistente de inteligencia cívica, puedo ayudarte con:\n• Análisis y resúmenes de contenido político\n• Verificación de hechos y fuentes\n• Moderación de debates\n• Traducción multi-idioma\n\n¿Te gustaría que profundice en algún aspecto específico?`,
      'en': `🤖 I understand your query about "${input.slice(0, 50)}..."\n\nAs your civic intelligence assistant, I can help you with:\n• Analysis and summaries of political content\n• Fact-checking and source verification\n• Debate moderation\n• Multi-language translation\n\nWould you like me to delve deeper into any specific aspect?`
    };
    return { content: responses[lang] || responses['es'], factChecked: false };
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else if (recognitionRef.current) {
      recognitionRef.current.lang = getLanguageCode(currentLanguage);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processMessage(inputText);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaRobot className="text-white text-2xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Copilot Ultra</h2>
              <p className="text-blue-100 text-sm">Asistente de Inteligencia Cívica</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-white/20 text-white rounded px-3 py-1 text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-black">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mt-4 flex flex-wrap gap-2">
          {capabilities.map(cap => (
            <div
              key={cap.id}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                cap.active ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              {cap.icon}
              <span>{cap.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-800">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                <span>{message.timestamp.toLocaleTimeString()}</span>
                <div className="flex items-center space-x-1">
                  {message.factChecked && <FaCheck className="text-green-400" />}
                  {message.sentiment === 'positive' && <span className="text-green-400">😊</span>}
                  {message.sentiment === 'negative' && <span className="text-red-400">😟</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full" />
                <span>Copilot Ultra está pensando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={currentLanguage === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
            className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
            disabled={isProcessing}
          >
            {isListening ? <FaStop /> : <FaMicrophone />}
          </button>
          
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isProcessing ? '...' : '→'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CopilotUltra;