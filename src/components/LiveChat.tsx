import React, { useState } from 'react';

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana Martínez', message: '¿Qué piensan sobre la importancia de fortalecer la familia tradicional en Colombia?', time: '10:30', avatar: '👩‍💼', badge: '🏛️ Conservador' },
    { id: 2, user: 'Carlos López', message: 'Es fundamental proteger los valores familiares y el derecho de los padres a educar a sus hijos según sus principios', time: '10:32', avatar: '👨‍🏫', badge: '🏛️ Conservador' },
    { id: 3, user: 'María González', message: 'Estoy de acuerdo. También necesitamos más seguridad en nuestras calles para proteger a nuestras familias', time: '10:35', avatar: '👩‍💻', badge: '🏛️ Conservador' },
    { id: 4, user: 'Roberto Silva', message: 'La libre empresa es clave para generar empleos dignos. Necesitamos menos regulaciones y más oportunidades', time: '10:38', avatar: '👨‍💼', badge: '🏛️ Conservador' },
    { id: 5, user: 'Patricia Herrera', message: 'Los empresarios son los verdaderos generadores de empleo. Debemos apoyar la iniciativa privada', time: '10:40', avatar: '👩‍🏫', badge: '🏛️ Conservador' },
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
          avatar: '🙋‍♂️',
          badge: '🏛️ Conservador'
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💬 Chat Conservador en Vivo</h1>
          <p className="text-white/90">Únete a la conversación conservadora de Colombia en tiempo real</p>
          <div className="mt-4 flex items-center space-x-4 text-white/80">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              1,847 conservadores conectados
            </span>
            <span>Valores tradicionales</span>
            <span>Moderado por voluntarios</span>
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
                    {msg.badge && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {msg.badge}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                      <span>👍</span>
                      <span>{Math.floor(Math.random() * 50) + 10}</span>
                    </button>
                    <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
                  </div>
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
                placeholder="Comparte tu perspectiva conservadora responsablemente..."
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
              Recordatorio: Mantén un diálogo respetuoso basado en valores conservadores y tradicionales
            </p>
          </div>
        </div>

        {/* Conservative Chat Rooms */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2">🏛️ Política Conservadora</h3>
            <p className="text-sm text-gray-600 mb-2">Discusiones sobre valores tradicionales y políticas de derecha</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">632 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-2">💼 Libre Empresa</h3>
            <p className="text-sm text-gray-600 mb-2">Apoyo al empresariado y la iniciativa privada</p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">489 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink-500">
            <h3 className="font-semibold text-gray-900 mb-2">👨‍👩‍👧‍👦 Familia Tradicional</h3>
            <p className="text-sm text-gray-600 mb-2">Defensa de los valores familiares y la educación en casa</p>
            <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">356 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="font-semibold text-gray-900 mb-2">🛡️ Seguridad Nacional</h3>
            <p className="text-sm text-gray-600 mb-2">Discusiones sobre seguridad y defensa nacional</p>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">423 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-900 mb-2">🇨🇴 Patriotismo</h3>
            <p className="text-sm text-gray-600 mb-2">Amor por la patria y símbolos nacionales</p>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">298 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
            <h3 className="font-semibold text-gray-900 mb-2">⛪ Libertad Religiosa</h3>
            <p className="text-sm text-gray-600 mb-2">Protección de los derechos religiosos y espirituales</p>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">234 activos</span>
          </div>
        </div>

        {/* Conservative Leaders Online */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🎖️ Líderes Conservadores Conectados</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'María F. Cabal', status: 'En línea', avatar: '👩‍💼' },
              { name: 'Paloma Valencia', status: 'En línea', avatar: '👩‍⚖️' },
              { name: 'Miguel Uribe', status: 'En línea', avatar: '👨‍💼' },
              { name: 'Carlos Ramírez', status: 'En línea', avatar: '👨‍🏫' }
            ].map((leader, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <span className="text-lg">{leader.avatar}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{leader.name}</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    <span className="text-xs text-green-600">{leader.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;