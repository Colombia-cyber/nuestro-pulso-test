import React, { useState } from 'react';

const CopilotAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '¡Hola! Soy tu asistente cívico. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    '¿Cómo puedo participar en el próximo debate?',
    '¿Cuándo son las próximas elecciones?',
    '¿Cómo funciona el proceso legislativo?',
    '¿Dónde encuentro información sobre candidatos?'
  ];

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, 
        { id: messages.length + 1, type: 'user', text: input },
        { id: messages.length + 2, type: 'bot', text: 'Gracias por tu pregunta. Estoy procesando la información más actualizada para darte la mejor respuesta sobre temas cívicos colombianos.' }
      ]);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🤖 Asistente Cívico</h1>
          <p className="text-white/90">Tu guía inteligente para la participación ciudadana en Colombia</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 border-b">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Preguntas frecuentes:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Pregúntame sobre participación cívica, elecciones, debates..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Orientación Personalizada</h3>
            <p className="text-sm text-gray-600">Recomendaciones basadas en tus intereses cívicos</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Educación Cívica</h3>
            <p className="text-sm text-gray-600">Aprende sobre el sistema político colombiano</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Respuestas Instantáneas</h3>
            <p className="text-sm text-gray-600">Información actualizada las 24 horas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotAssistant;