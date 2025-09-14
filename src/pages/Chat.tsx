import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana García', message: '¿Qué opinan sobre la nueva propuesta de reforma tributaria?', time: '14:30', avatar: '👩' },
    { id: 2, user: 'Carlos López', message: 'Creo que necesitamos más transparencia en el proceso', time: '14:32', avatar: '👨' },
    { id: 3, user: 'María Rodríguez', message: 'Es importante que todos los ciudadanos participemos en este debate', time: '14:35', avatar: '👩‍💼' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const newMessage = {
        id: messages.length + 1,
        user: user.displayName || user.email || 'Usuario',
        message: message.trim(),
        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: '🙋'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💬 Chat Cívico en Vivo
          </h1>
          <p className="text-gray-600">
            Participa en conversaciones en tiempo real sobre temas importantes para Colombia
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>🟢 {messages.length + 47} usuarios activos</span>
            <span>🏛️ Tema: Reforma Tributaria 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                {user ? (
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Enviar
                    </button>
                  </form>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Inicia sesión para participar en el chat</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">📋 Reglas del Chat</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Respeta a todos los participantes</li>
                <li>• Mantén la conversación civilizada</li>
                <li>• No spam o contenido ofensivo</li>
                <li>• Enfócate en temas cívicos</li>
              </ul>
            </div>

            {/* Active Topics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">🔥 Temas Activos</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Reforma Tributaria</h4>
                  <p className="text-xs text-blue-600">89 participantes</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Educación Pública</h4>
                  <p className="text-xs text-green-600">56 participantes</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800">Medio Ambiente</h4>
                  <p className="text-xs text-purple-600">43 participantes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;