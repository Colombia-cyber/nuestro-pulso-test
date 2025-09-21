import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUsers, FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { MdSend, MdChat, MdVerified } from 'react-icons/md';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  verified?: boolean;
  likes?: number;
  dislikes?: number;
}

interface NewsChatProps {
  articleId: string;
  articleTitle: string;
  isVisible: boolean;
  onClose?: () => void;
}

const NewsChat: React.FC<NewsChatProps> = ({ 
  articleId, 
  articleTitle, 
  isVisible, 
  onClose 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Simulate loading existing messages
      loadMessages();
      
      // Simulate online users
      setOnlineUsers(Math.floor(Math.random() * 150) + 25);
      
      // Auto-focus input when chat opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isVisible, articleId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    // Simulate some initial messages
    const sampleMessages: ChatMessage[] = [
      {
        id: '1',
        user: 'CarlosM',
        message: '¿Qué opinan sobre estas medidas? Me parece que pueden tener impacto positivo en la economía.',
        timestamp: new Date(Date.now() - 300000),
        verified: true,
        likes: 5,
        dislikes: 1
      },
      {
        id: '2',
        user: 'LauraS',
        message: 'Estoy de acuerdo, pero habría que ver los detalles de implementación.',
        timestamp: new Date(Date.now() - 240000),
        likes: 3,
        dislikes: 0
      },
      {
        id: '3',
        user: 'AndrésR',
        message: 'Importante seguir de cerca cómo se desarrolla esta situación.',
        timestamp: new Date(Date.now() - 180000),
        verified: true,
        likes: 7,
        dislikes: 2
      },
      {
        id: '4',
        user: 'SofíaL',
        message: 'Esperemos que se mantenga la transparencia en todo el proceso.',
        timestamp: new Date(Date.now() - 120000),
        likes: 4,
        dislikes: 0
      }
    ];
    
    setMessages(sampleMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'Tú',
      message: newMessage.trim(),
      timestamp: new Date(),
      likes: 0,
      dislikes: 0
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a response
      simulateResponse();
    }, 2000);
  };

  const simulateResponse = () => {
    const responses = [
      'Interesante punto de vista, gracias por compartir.',
      'Totalmente de acuerdo contigo.',
      '¿Podrías profundizar un poco más en esa idea?',
      'Muy buen análisis de la situación.',
      'Es importante considerar todas las perspectivas.',
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const responseMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      user: 'UsuarioActivo',
      message: randomResponse,
      timestamp: new Date(),
      likes: Math.floor(Math.random() * 3),
      dislikes: 0
    };

    setMessages(prev => [...prev, responseMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleReaction = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        if (type === 'like') {
          return { ...msg, likes: (msg.likes || 0) + 1 };
        } else {
          return { ...msg, dislikes: (msg.dislikes || 0) + 1 };
        }
      }
      return msg;
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MdChat className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Chat en Vivo</h3>
                <p className="text-sm text-gray-600 line-clamp-1">{articleTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FaUsers className="w-4 h-4 text-green-500" />
                <span className="font-medium">{onlineUsers}</span>
                <span>participando</span>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.user === 'Tú' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message.user === 'Tú' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              } rounded-lg p-3`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm">
                    {message.user}
                  </span>
                  {message.verified && (
                    <MdVerified className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-xs opacity-75">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm mb-2">{message.message}</p>
                
                {message.user !== 'Tú' && (
                  <div className="flex items-center space-x-3 text-xs">
                    <button
                      onClick={() => handleReaction(message.id, 'like')}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                      <FaThumbsUp className="w-3 h-3" />
                      <span>{message.likes || 0}</span>
                    </button>
                    
                    <button
                      onClick={() => handleReaction(message.id, 'dislike')}
                      className="flex items-center space-x-1 hover:text-red-600 transition-colors"
                    >
                      <FaThumbsDown className="w-3 h-3" />
                      <span>{message.dislikes || 0}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Alguien está escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Comparte tu opinión sobre esta noticia..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={500}
            />
            
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdSend className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            Mantén un diálogo respetuoso y constructivo • {500 - newMessage.length} caracteres restantes
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsChat;