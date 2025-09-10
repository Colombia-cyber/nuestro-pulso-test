import React, { useState } from 'react';

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana Martínez', message: '¿Qué piensan sobre la nueva reforma fiscal?', time: '10:30', avatar: '👩‍💼', online: true },
    { id: 2, user: 'Carlos López', message: 'Creo que necesitamos más transparencia en el proceso legislativo', time: '10:32', avatar: '👨‍🏫', online: true },
    { id: 3, user: 'María González', message: 'Estoy de acuerdo. ¿Cómo podemos participar más activamente?', time: '10:35', avatar: '👩‍💻', online: false },
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
          online: true
        }
      ]);
      setNewMessage('');
    }
  };

  const chatRooms = [
    { name: 'Política Nacional', topic: 'Discusiones sobre gobierno y políticas públicas', active: 432, color: 'from-blue-500 to-indigo-500', icon: '🏛️' },
    { name: 'Medio Ambiente', topic: 'Cambio climático y sostenibilidad en Colombia', active: 289, color: 'from-green-500 to-emerald-500', icon: '🌱' },
    { name: 'Educación', topic: 'Sistema educativo y políticas de formación', active: 156, color: 'from-amber-500 to-orange-500', icon: '📚' },
    { name: 'Salud', topic: 'Sistema de salud y bienestar ciudadano', active: 203, color: 'from-red-500 to-pink-500', icon: '🏥' },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-full border border-white/20">
          <span className="text-2xl mr-2">💬</span>
          <span className="text-white font-medium">Chat en Tiempo Real</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          Chat Cívico en Vivo
        </h1>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Únete a la conversación cívica de Colombia en tiempo real con ciudadanos comprometidos
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>1,247 personas conectadas</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>👥</span>
            <span>Moderado por voluntarios cívicos</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🛡️</span>
            <span>Ambiente respetuoso</span>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sala Principal</h3>
                <p className="text-white/70">Debate general sobre temas cívicos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-400 text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>En vivo</span>
              </div>
              <p className="text-white/60 text-sm mt-1">1,247 participantes</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-white/5">
          {messages.map((msg) => (
            <div key={msg.id} className="group flex items-start space-x-3 hover:bg-white/5 -mx-6 px-6 py-2 rounded-lg transition-all">
              <div className="relative">
                <div className="text-2xl">{msg.avatar}</div>
                {msg.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {msg.user}
                  </span>
                  <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full">
                    {msg.time}
                  </span>
                </div>
                <p className="text-white/90 leading-relaxed">{msg.message}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white/50 hover:text-white/80 p-1 rounded">
                  <span className="text-sm">👍</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Comparte tu opinión cívica responsablemente..."
              className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Enviar
            </button>
          </div>
          <p className="text-xs text-white/60 mt-3 text-center">
            💡 Recordatorio: Mantén un diálogo respetuoso y constructivo sobre temas cívicos
          </p>
        </div>
      </div>

      {/* Chat Rooms Grid */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">🏠</span>
          <h3 className="text-2xl font-bold text-white">Salas de Chat Especializadas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chatRooms.map((room, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${room.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {room.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                      {room.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">{room.active} activos</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    {room.topic}
                  </p>
                  <button className="text-sm text-blue-400 hover:text-blue-300 font-medium group-hover:underline transition-all">
                    Unirse a la conversación →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;