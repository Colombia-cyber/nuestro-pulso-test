import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  platform?: 'native' | 'youtube' | 'twitter' | 'instagram' | 'facebook';
  emoji_reactions?: {
    [emoji: string]: number;
  };
  replies?: ChatMessage[];
  links?: {
    type: 'news' | 'video' | 'poll' | 'debate';
    title: string;
    url: string;
  }[];
  mentions?: string[];
}

interface LiveChatProps {
  topic?: string;
  allowSharing?: boolean;
  className?: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ 
  topic = 'General', 
  allowSharing = true,
  className = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [participantCount, setParticipantCount] = useState(2847);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🔥', '🎉', '👏', '🤔'];

  // Mock initial messages
  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      author: 'María González',
      content: 'Excelente análisis sobre la reforma tributaria. Es importante que los ciudadanos estemos informados sobre estos temas. ¿Qué opinan sobre el impacto en las pequeñas empresas?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      platform: 'native',
      emoji_reactions: { '👍': 12, '🤔': 3, '❤️': 8 },
      links: [{
        type: 'news',
        title: 'Centro Democrático propone reducción de impuestos para empresas',
        url: '#'
      }]
    },
    {
      id: '2',
      author: 'Carlos Rodríguez',
      content: 'Comparto desde Twitter: Las políticas conservadoras pueden ser beneficiosas si se implementan con transparencia y control ciudadano. #PoliticaConservadora #Transparencia',
      timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
      platform: 'twitter',
      emoji_reactions: { '👍': 23, '🔥': 5, '👏': 7 },
      mentions: ['@TransparenciaCO']
    },
    {
      id: '3',
      author: 'Ana Martínez',
      content: 'Desde Instagram: Los jóvenes tenemos que participar más en estos debates. Nuestra voz es importante para el futuro del país. 📱✊',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      platform: 'instagram',
      emoji_reactions: { '❤️': 34, '🔥': 12, '👏': 18 }
    },
    {
      id: '4',
      author: 'Luis Pérez',
      content: 'Veo en YouTube que hay buenos análisis sobre seguridad ciudadana. Es preocupante la situación actual, pero hay propuestas interesantes de diferentes sectores políticos.',
      timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      platform: 'youtube',
      emoji_reactions: { '🤔': 8, '👍': 15 },
      links: [{
        type: 'video',
        title: 'Terror en las calles: Medidas de seguridad ciudadana',
        url: '#'
      }]
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
    
    // Simulate participant count changes
    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 5 - 2));
    }, 10000);

    // Simulate new messages
    const messageInterval = setInterval(() => {
      const randomUsers = [
        'Patricia Silva', 'José García', 'Carolina López', 'Miguel Torres',
        'Isabella Ruiz', 'Daniel Castro', 'Valentina Morales', 'Andrés Jiménez'
      ];
      
      const randomContents = [
        'Interesante perspectiva. Me gustaría conocer más datos al respecto.',
        'Completamente de acuerdo con los puntos planteados aquí.',
        'Creo que deberíamos considerar todas las opciones disponibles.',
        'Excelente debate. Es importante mantener el diálogo constructivo.',
        '¿Alguien tiene más información sobre este tema específico?',
        'Compartiendo desde Facebook: Este tipo de discusiones son necesarias.',
        'Me parece muy relevante para la situación actual del país.'
      ];

      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        author: randomUsers[Math.floor(Math.random() * randomUsers.length)],
        content: randomContents[Math.floor(Math.random() * randomContents.length)],
        timestamp: new Date().toISOString(),
        platform: ['native', 'twitter', 'facebook', 'instagram'][Math.floor(Math.random() * 4)] as any,
        emoji_reactions: {}
      };

      setMessages(prev => [...prev, newMsg].slice(-50)); // Keep last 50 messages
    }, 20000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        author: 'Usuario Actual',
        content: newMessage,
        timestamp: new Date().toISOString(),
        platform: 'native',
        emoji_reactions: {}
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleEmojiReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.emoji_reactions };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        return { ...msg, emoji_reactions: reactions };
      }
      return msg;
    }));
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'twitter': return '🐦';
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'youtube': return '🎥';
      default: return '🇨🇴';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes < 1 ? 'ahora' : `${minutes}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💬 Chat en Vivo Cross-Platform</h1>
          <p className="text-white/90">Conversación cívica integrada con YouTube, Twitter/X, Instagram y Facebook</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span className={`flex items-center space-x-2 ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-300' : 'bg-red-300'} animate-pulse`}></div>
              <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </span>
            <span>👥 {participantCount.toLocaleString()} participantes activos</span>
            <span>🔗 Multi-plataforma</span>
            <span>💬 Reacciones con emojis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">{getPlatformIcon(message.platform)}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">{message.author}</span>
                          {message.platform && message.platform !== 'native' && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {message.platform}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                        </div>
                        
                        <p className="text-gray-700 text-sm leading-relaxed">{message.content}</p>
                        
                        {/* Links */}
                        {message.links && message.links.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.links.map((link, idx) => (
                              <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-2 rounded-r">
                                <a href={link.url} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                  🔗 {link.type}: {link.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Mentions */}
                        {message.mentions && message.mentions.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {message.mentions.map((mention, idx) => (
                              <span key={idx} className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                                {mention}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Emoji Reactions */}
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex space-x-1">
                            {emojis.slice(0, 5).map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleEmojiReaction(message.id, emoji)}
                                className="hover:bg-gray-100 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                                title={`Reaccionar con ${emoji}`}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                          
                          {message.emoji_reactions && Object.keys(message.emoji_reactions).length > 0 && (
                            <div className="flex space-x-1">
                              {Object.entries(message.emoji_reactions).map(([emoji, count]) => (
                                <span key={emoji} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                  {emoji} {count}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje... Puedes incluir enlaces y menciones"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm font-medium"
                  >
                    Enviar
                  </button>
                </div>

                {/* Cross-platform sharing */}
                {allowSharing && (
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Compartir a Twitter">
                        🐦 Twitter
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Compartir a Facebook">
                        📘 Facebook
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Compartir a Instagram">
                        📷 Instagram
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Compartir a YouTube">
                        🎥 YouTube
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Mantén el diálogo respetuoso y constructivo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Chat Rooms */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">🏛️ Salas de Chat</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-medium text-sm">Política Nacional</h4>
                  <p className="text-xs text-gray-600">432 activos</p>
                </div>
                <div className="p-2 bg-orange-50 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-sm">Right Wing Discussion</h4>
                  <p className="text-xs text-gray-600">287 activos</p>
                </div>
                <div className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                  <h4 className="font-medium text-sm">Terror News & Security</h4>
                  <p className="text-xs text-gray-600">156 activos</p>
                </div>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <h4 className="font-medium text-sm">Medio Ambiente</h4>
                  <p className="text-xs text-gray-600">234 activos</p>
                </div>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">📊 Actividad por Plataforma</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">🇨🇴 Nuestro Pulso</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{Math.floor(participantCount * 0.4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🐦 Twitter/X</span>
                  <span className="text-xs bg-sky-100 text-sky-600 px-2 py-1 rounded">{Math.floor(participantCount * 0.25)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">📘 Facebook</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{Math.floor(participantCount * 0.2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">📷 Instagram</span>
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">{Math.floor(participantCount * 0.15)}</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">🔥 Trending</h3>
              <div className="space-y-1">
                {[
                  '#PoliticaConservadora',
                  '#TerrorNews',
                  '#ReformaTributaria',
                  '#SeguridadColombia',
                  '#ParticipacionCiudadana'
                ].map((tag, idx) => (
                  <div key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;