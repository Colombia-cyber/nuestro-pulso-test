import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  avatar: string;
  userId?: string;
  type: 'message' | 'join' | 'leave' | 'system';
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  activeUsers: number;
  category: string;
  icon: string;
}

const EnhancedLiveChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState('general');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: 'general',
      name: 'Política Nacional',
      description: 'Discusiones sobre gobierno y políticas públicas',
      activeUsers: 432,
      category: 'politics',
      icon: '🏛️'
    },
    {
      id: 'environment',
      name: 'Medio Ambiente',
      description: 'Cambio climático y sostenibilidad en Colombia',
      activeUsers: 289,
      category: 'environment',
      icon: '🌱'
    },
    {
      id: 'education',
      name: 'Educación',
      description: 'Sistema educativo y políticas de formación',
      activeUsers: 156,
      category: 'education',
      icon: '📚'
    },
    {
      id: 'economy',
      name: 'Economía',
      description: 'Desarrollo económico y políticas fiscales',
      activeUsers: 203,
      category: 'economy',
      icon: '💰'
    }
  ];

  // Simulate WebSocket connection with fallback polling
  const connectToChat = useCallback(() => {
    setIsConnected(true);
    
    // Simulate initial messages
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        user: 'Ana Martínez',
        message: '¿Qué piensan sobre la nueva reforma fiscal?',
        time: new Date(Date.now() - 300000).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👩‍💼',
        type: 'message'
      },
      {
        id: '2',
        user: 'Carlos López',
        message: 'Creo que necesitamos más transparencia en el proceso legislativo',
        time: new Date(Date.now() - 180000).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👨‍🏫',
        type: 'message'
      },
      {
        id: '3',
        user: 'María González',
        message: 'Estoy de acuerdo. ¿Cómo podemos participar más activamente?',
        time: new Date(Date.now() - 60000).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👩‍💻',
        type: 'message'
      }
    ];
    
    setMessages(initialMessages);
  }, []);

  // Simulate receiving new messages
  const simulateIncomingMessages = useCallback(() => {
    const sampleMessages = [
      'Es importante que todos participemos en el proceso democrático.',
      'Los jóvenes necesitamos tener más voz en las decisiones políticas.',
      '¿Han visto las últimas estadísticas sobre educación pública?',
      'La transparencia gubernamental debe ser una prioridad.',
      'Necesitamos más debate sobre políticas ambientales.',
    ];
    
    const sampleUsers = [
      { name: 'Diego Ramírez', avatar: '👨‍🎓' },
      { name: 'Laura Sánchez', avatar: '👩‍🔬' },
      { name: 'Roberto García', avatar: '👨‍💼' },
      { name: 'Camila Torres', avatar: '👩‍🎨' },
      { name: 'Andrés Morales', avatar: '👨‍🏫' },
    ];

    if (Math.random() > 0.7) { // 30% chance of new message every poll
      const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: randomUser.name,
        message: randomMessage,
        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: randomUser.avatar,
        type: 'message'
      };
      
      setMessages(prev => [...prev, newMsg]);
    }
  }, []);

  // Setup connection and polling
  useEffect(() => {
    connectToChat();
    
    // Simulate live updates every 5 seconds
    const interval = setInterval(simulateIncomingMessages, 5000);
    
    // Simulate user count updates
    const userCountInterval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10 - 5));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(userCountInterval);
      setIsConnected(false);
    };
  }, [connectToChat, simulateIncomingMessages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && user) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: user.displayName || user.email?.split('@')[0] || 'Usuario',
        message: newMessage,
        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        avatar: '🙋‍♂️',
        userId: user.uid,
        type: 'message'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      messageInputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentRoom = chatRooms.find(room => room.id === activeRoom) || chatRooms[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💬 Chat en Vivo</h1>
          <p className="text-white/90">Únete a la conversación cívica de Colombia en tiempo real</p>
          <div className="mt-4 flex items-center space-x-4 text-white/80">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </div>
            <span>{onlineUsers.toLocaleString()} personas conectadas</span>
            <span>Moderado por voluntarios cívicos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Rooms Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Salas de Chat</h2>
              <nav 
                className="space-y-2"
                role="tablist"
                aria-label="Salas de chat disponibles"
              >
                {chatRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      activeRoom === room.id
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    role="tab"
                    aria-selected={activeRoom === room.id}
                    aria-label={`Cambiar a sala ${room.name}`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span role="img" aria-hidden="true">{room.icon}</span>
                      <span className="font-medium text-gray-900">{room.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{room.description}</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {room.activeUsers} activos
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span role="img" aria-hidden="true">{currentRoom.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{currentRoom.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{currentRoom.activeUsers} participantes</span>
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4"
                role="log"
                aria-live="polite"
                aria-label="Mensajes del chat"
              >
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start space-x-3 ${
                      msg.userId === user?.uid ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className="text-2xl flex-shrink-0" role="img" aria-label={`Avatar de ${msg.user}`}>
                      {msg.avatar}
                    </div>
                    <div className={`flex-1 ${msg.userId === user?.uid ? 'text-right' : ''}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{msg.user}</span>
                        <time className="text-sm text-gray-500" dateTime={new Date().toISOString()}>
                          {msg.time}
                        </time>
                      </div>
                      <div 
                        className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.userId === user?.uid
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping.length > 0 && (
                  <div className="flex items-center space-x-2 text-gray-500 italic">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>{isTyping.join(', ')} está escribiendo...</span>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                {!user ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-2">Inicia sesión para participar en el chat</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Iniciar Sesión
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex space-x-3">
                      <input
                        ref={messageInputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Comparte tu opinión cívica responsablemente..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isConnected}
                        aria-label="Escribir mensaje"
                        maxLength={500}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || !isConnected}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Enviar mensaje"
                      >
                        Enviar
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Recordatorio: Mantén un diálogo respetuoso y constructivo sobre temas cívicos
                    </p>
                  </div>
                )}
              </div>
            </div>
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
              <span>Conexión perdida. Reintentando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedLiveChat;