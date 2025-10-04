import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DashboardTopic } from '../../types/dashboard';

interface TopicChatProps {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  topic: DashboardTopic | null;
  onSendMessage: (message: string, userName: string) => void;
}

const TopicChat: React.FC<TopicChatProps> = ({ messages, loading, error, topic, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const [userName, setUserName] = useState(
    localStorage.getItem('dashboard-username') || ''
  );
  const [isEditingName, setIsEditingName] = useState(!userName);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !userName.trim()) return;

    onSendMessage(messageInput, userName);
    setMessageInput('');
  };

  const handleSetUserName = () => {
    if (userName.trim()) {
      localStorage.setItem('dashboard-username', userName.trim());
      setIsEditingName(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-[600px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">💬</span>
          Chat Comunitario
        </h2>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Conectando al chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">💬</span>
            Chat: {topic?.name}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>En vivo</span>
          </div>
        </div>
        
        {/* User Name Section */}
        {isEditingName ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSetUserName()}
              placeholder="Tu nombre"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleSetUserName}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Conectado como: <strong>{userName}</strong></span>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Cambiar
            </button>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm">
            <p className="font-semibold">⚠️ Aviso</p>
            <p>{error}</p>
            <p className="mt-1 text-xs">Mostrando mensajes de demostración.</p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">💭</p>
            <p>No hay mensajes aún</p>
            <p className="text-sm mt-1">¡Sé el primero en comentar!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm break-words">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={userName ? 'Escribe tu mensaje...' : 'Ingresa tu nombre primero'}
            disabled={!userName}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || !userName}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Mantén un diálogo respetuoso y constructivo
        </p>
      </div>
    </div>
  );
};

export default TopicChat;
