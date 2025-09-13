import React, { useState, useEffect, useRef } from 'react';
import { useRealtime } from '../contexts/RealtimeContext.tsx';
import { createTypingIndicator, debounce } from '../utils/realtimeUtils';

const LiveChat: React.FC = () => {
  const { 
    chatMessages, 
    onlineUsers, 
    sendMessage, 
    user, 
    isOnline 
  } = useRealtime();
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const typingIndicator = useRef(createTypingIndicator());

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Debounced typing indicator
  const debouncedStopTyping = useRef(
    debounce(() => {
      setIsTyping(false);
      if (user) {
        typingIndicator.current.stopTyping(user.uid, setTypingUsers);
      }
    }, 1000)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!isTyping && user) {
      setIsTyping(true);
      typingIndicator.current.startTyping(user.uid, setTypingUsers);
    }
    
    debouncedStopTyping.current();
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      await sendMessage(newMessage, selectedRoom);
      setNewMessage('');
      setIsTyping(false);
      if (user) {
        typingIndicator.current.stopTyping(user.uid, setTypingUsers);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter messages by selected room
  const roomMessages = chatMessages.filter(msg => msg.room === selectedRoom);

  const rooms = [
    { id: 'general', name: '🏛️ Política Nacional', color: 'blue', activeCount: 432 },
    { id: 'environment', name: '🌱 Medio Ambiente', color: 'green', activeCount: 289 },
    { id: 'education', name: '📚 Educación', color: 'yellow', activeCount: 156 }
  ];



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💬 Chat en Vivo</h1>
          <p className="text-white/90">Únete a la conversación cívica de Colombia en tiempo real</p>
          <div className="mt-4 flex items-center space-x-4 text-white/80">
            <span className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {onlineUsers} personas conectadas
            </span>
            <span>Moderado por voluntarios cívicos</span>
            {!user && (
              <span className="text-yellow-200">📝 Inicia sesión para participar</span>
            )}
          </div>
        </div>

        {/* Room Selection */}
        <div className="mb-4 flex flex-wrap gap-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRoom === room.id
                  ? `bg-${room.color}-600 text-white`
                  : `bg-${room.color}-100 text-${room.color}-800 hover:bg-${room.color}-200`
              }`}
            >
              {room.name}
              <span className="ml-2 text-xs opacity-75">{room.activeCount}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 border-b">
            {roomMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>💬 No hay mensajes en esta sala aún</p>
                <p className="text-sm mt-2">¡Sé el primero en iniciar la conversación!</p>
              </div>
            ) : (
              roomMessages.map((msg) => (
                <div key={msg.id} className="mb-4 flex items-start space-x-3">
                  <div className="text-2xl">{msg.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{msg.user}</span>
                      <span className="text-sm text-gray-500">
                        {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString() : 'Enviando...'}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            
            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center space-x-2 text-gray-500 italic">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>{typingUsers.length} {typingUsers.length === 1 ? 'persona está' : 'personas están'} escribiendo...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4">
            {user ? (
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Comparte tu opinión cívica responsablemente..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isOnline}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isOnline}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !newMessage.trim() || !isOnline
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Enviar
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-3">Inicia sesión para participar en el chat</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Iniciar Sesión
                </button>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              {isOnline 
                ? 'Recordatorio: Mantén un diálogo respetuoso y constructivo sobre temas cívicos'
                : '⚠️ Sin conexión a internet - Los mensajes se enviarán cuando se restablezca la conexión'
              }
            </p>
          </div>
        </div>

        {/* Chat Rooms */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2">🏛️ Política Nacional</h3>
            <p className="text-sm text-gray-600 mb-2">Discusiones sobre gobierno y políticas públicas</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">432 activos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-2">🌱 Medio Ambiente</h3>
            <p className="text-sm text-gray-600 mb-2">Cambio climático y sostenibilidad en Colombia</p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">289 activos</span>
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