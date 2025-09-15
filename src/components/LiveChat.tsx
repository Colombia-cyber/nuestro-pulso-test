import React, { useState } from 'react';

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana Martínez', message: '¿Qué piensan sobre la nueva reforma fiscal?', time: '10:30', avatar: '👩‍💼' },
    { id: 2, user: 'Carlos López', message: 'Creo que necesitamos más transparencia en el proceso legislativo', time: '10:32', avatar: '👨‍🏫' },
    { id: 3, user: 'María González', message: 'Estoy de acuerdo. ¿Cómo podemos participar más activamente?', time: '10:35', avatar: '👩‍💻' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: 'Tú',
          message: newMessage,
          time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          avatar: '🙋‍♂️'
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💬 Chat en Vivo</h1>
          <p className="text-white/90">Únete a la conversación cívica de Colombia en tiempo real</p>
          <div className="mt-4 flex items-center space-x-4 text-white/80">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              1,247 personas conectadas
            </span>
            <span>Moderado por voluntarios cívicos</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 border-b">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4 flex items-start space-x-3">
                <div className="text-2xl">{msg.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">{msg.user}</span>
                    <span className="text-sm text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Comparte tu opinión cívica responsablemente..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Recordatorio: Mantén un diálogo respetuoso y constructivo sobre temas cívicos
            </p>
          </div>
        </div>

        {/* Chat Rooms */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2">🏛️ Política Nacional</h3>
            <p className="text-sm text-gray-600 mb-2">Discusiones sobre gobierno y políticas públicas</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">432 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Educación</h3>
            <p className="text-sm text-gray-600 mb-2">Sistema educativo y políticas de formación</p>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">156 activos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;