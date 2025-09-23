import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUsers, 
  FaComment, 
  FaPaperPlane, 
  FaVideo, 
  FaPhone,
  FaSearch,
  FaFilter,
  FaMicrophone,
  FaImage,
  FaFile,
  FaSmile,
  FaEllipsisH,
  FaCrown,
  FaBan,
  FaFlag,
  FaHeart,
  FaReply
} from 'react-icons/fa';
import { 
  MdVerified, 
  MdLiveTv, 
  MdNotifications,
  MdVolumeUp,
  MdVolumeOff,
  MdFullscreen,
  MdSettings,
  MdSecurity
} from 'react-icons/md';
import { BiWorld, BiLock, BiTrendingUp } from 'react-icons/bi';
import useAppStore from '../stores/appStore';

interface ChatMessage {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'member' | 'guest';
    verified: boolean;
    isOnline: boolean;
  };
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice' | 'system';
  replyTo?: string;
  reactions: { [emoji: string]: string[] }; // emoji -> user IDs
  edited: boolean;
  pinned: boolean;
  attachments?: {
    type: 'image' | 'file' | 'voice';
    url: string;
    name: string;
    size?: number;
  }[];
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'group';
  topic: string;
  members: number;
  activeMembers: number;
  isLive: boolean;
  moderatorOnly: boolean;
  hasUnread: boolean;
  lastActivity: Date;
  avatar: string;
  rules: string[];
}

interface CommunityHubProps {
  enableVoiceChat?: boolean;
  enableVideoChat?: boolean;
  enableFileSharing?: boolean;
  enableAIModerator?: boolean;
  multilingualSupport?: boolean;
}

const CommunityHub: React.FC<CommunityHubProps> = ({
  enableVoiceChat = true,
  enableVideoChat = true,
  enableFileSharing = true,
  enableAIModerator = true,
  multilingualSupport = true
}) => {
  const { user, addNotification } = useAppStore();
  const [activeRoom, setActiveRoom] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: 'general',
      name: 'Conversación General',
      description: 'Discusión abierta sobre temas de actualidad',
      type: 'public',
      topic: 'General',
      members: 2847,
      activeMembers: 156,
      isLive: true,
      moderatorOnly: false,
      hasUnread: true,
      lastActivity: new Date(),
      avatar: '💬',
      rules: ['Mantén el respeto', 'No spam', 'Fuentes verificables']
    },
    {
      id: 'politics',
      name: 'Debate Político',
      description: 'Análisis y debate sobre política colombiana',
      type: 'public',
      topic: 'Política',
      members: 1234,
      activeMembers: 89,
      isLive: true,
      moderatorOnly: false,
      hasUnread: false,
      lastActivity: new Date(Date.now() - 5 * 60 * 1000),
      avatar: '🏛️',
      rules: ['Debate constructivo', 'No ataques personales', 'Datos verificables']
    },
    {
      id: 'youth',
      name: 'Jóvenes Participando',
      description: 'Espacio para la participación juvenil',
      type: 'group',
      topic: 'Juventud',
      members: 567,
      activeMembers: 34,
      isLive: false,
      moderatorOnly: false,
      hasUnread: true,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      avatar: '🎓',
      rules: ['Participación activa', 'Propuestas constructivas']
    },
    {
      id: 'breaking',
      name: 'Noticias de Última Hora',
      description: 'Información verificada y en tiempo real',
      type: 'public',
      topic: 'Noticias',
      members: 3456,
      activeMembers: 234,
      isLive: true,
      moderatorOnly: true,
      hasUnread: false,
      lastActivity: new Date(Date.now() - 2 * 60 * 1000),
      avatar: '📰',
      rules: ['Solo moderadores publican', 'Fuentes oficiales únicamente']
    }
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      content: '¡Bienvenidos al chat comunitario! Aquí pueden discutir temas de actualidad de manera respetuosa.',
      author: {
        id: 'mod1',
        name: 'Moderador Cívico',
        avatar: '🛡️',
        role: 'moderator',
        verified: true,
        isOnline: true
      },
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'system',
      reactions: { '👍': ['user1', 'user2'], '❤️': ['user3'] },
      edited: false,
      pinned: true
    },
    {
      id: '2',
      content: 'Muy interesante el debate de hoy sobre la reforma tributaria. ¿Qué opinan sobre las nuevas medidas?',
      author: {
        id: 'user1',
        name: 'María González',
        avatar: '👩‍💼',
        role: 'member',
        verified: true,
        isOnline: true
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      reactions: { '🤔': ['user2', 'user4'], '👍': ['user3'] },
      edited: false,
      pinned: false
    },
    {
      id: '3',
      content: 'Creo que necesitamos más transparencia en el proceso. Los ciudadanos merecemos información clara.',
      author: {
        id: 'user2',
        name: 'Carlos Ramírez',
        avatar: '👨‍🎓',
        role: 'member',
        verified: false,
        isOnline: true
      },
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
      replyTo: '2',
      reactions: { '💯': ['user1', 'user3', 'user5'] },
      edited: false,
      pinned: false
    },
    {
      id: '4',
      content: 'Adjunto un documento con el análisis completo de las medidas propuestas.',
      author: {
        id: 'user3',
        name: 'Ana Díaz',
        avatar: '📊',
        role: 'member',
        verified: true,
        isOnline: false
      },
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'file',
      reactions: { '📚': ['user1', 'user2'], '👏': ['user4'] },
      edited: false,
      pinned: false,
      attachments: [
        {
          type: 'file',
          url: '#',
          name: 'Análisis_Reforma_Tributaria.pdf',
          size: 2048000
        }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      author: {
        id: user?.id || 'guest',
        name: user?.name || 'Usuario Anónimo',
        avatar: user?.avatar || '👤',
        role: 'member',
        verified: false,
        isOnline: true
      },
      timestamp: new Date(),
      type: 'text',
      reactions: {},
      edited: false,
      pinned: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI moderation
    if (enableAIModerator && message.toLowerCase().includes('spam')) {
      setTimeout(() => {
        addNotification({
          type: 'warning',
          title: 'Moderación IA',
          message: 'Tu mensaje ha sido revisado por nuestro sistema de moderación',
          read: false
        });
      }, 1000);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        const userId = user?.id || 'guest';
        
        if (reactions[emoji]?.includes(userId)) {
          reactions[emoji] = reactions[emoji].filter(id => id !== userId);
          if (reactions[emoji].length === 0) {
            delete reactions[emoji];
          }
        } else {
          reactions[emoji] = [...(reactions[emoji] || []), userId];
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRoleColor = (role: string): string => {
    const colors = {
      admin: 'text-red-600',
      moderator: 'text-blue-600',
      member: 'text-gray-600',
      guest: 'text-gray-400'
    };
    return colors[role as keyof typeof colors] || colors.member;
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: <FaCrown className="w-3 h-3 text-yellow-500" />,
      moderator: <MdSecurity className="w-3 h-3 text-blue-500" />,
      member: null,
      guest: null
    };
    return icons[role as keyof typeof icons];
  };

  const currentRoom = chatRooms.find(room => room.id === activeRoom);
  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen max-h-screen bg-gray-100">
      
      {/* Sidebar - Chat Rooms */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Community Hub</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar salas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-2">
            {filteredRooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`w-full text-left p-3 rounded-lg transition-all hover:bg-gray-50 ${
                  activeRoom === room.id ? 'bg-blue-50 border-2 border-blue-200' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="text-2xl">{room.avatar}</div>
                    {room.isLive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{room.name}</h3>
                      {room.hasUnread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate">{room.description}</p>
                    
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaUsers className="w-3 h-3" />
                        <span>{room.activeMembers}/{room.members}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {room.type === 'public' ? <BiWorld className="w-3 h-3" /> : <BiLock className="w-3 h-3" />}
                        <span>{room.type === 'public' ? 'Público' : 'Privado'}</span>
                      </div>
                      
                      {room.moderatorOnly && (
                        <div className="flex items-center gap-1">
                          <MdSecurity className="w-3 h-3" />
                          <span>Moderado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{currentRoom?.avatar}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{currentRoom?.name}</h2>
                  {currentRoom?.isLive && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                      🔴 EN VIVO
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{currentRoom?.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{currentRoom?.activeMembers} activos de {currentRoom?.members} miembros</span>
                  <span>•</span>
                  <span>{currentRoom?.topic}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {enableVoiceChat && (
                <button
                  onClick={() => setVoiceActive(!voiceActive)}
                  className={`p-2 rounded-lg transition-colors ${
                    voiceActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {voiceActive ? <MdVolumeUp className="w-5 h-5" /> : <FaMicrophone className="w-5 h-5" />}
                </button>
              )}
              
              {enableVideoChat && (
                <button
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-2 rounded-lg transition-colors ${
                    videoActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaVideo className="w-5 h-5" />
                </button>
              )}
              
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <MdSettings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'system' ? 'justify-center' : ''}`}>
              
              {message.type !== 'system' && (
                <div className="relative flex-shrink-0">
                  <div className="text-2xl">{message.author.avatar}</div>
                  {message.author.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
              )}

              <div className={`flex-1 ${message.type === 'system' ? 'text-center' : ''} ${message.pinned ? 'bg-yellow-50 border border-yellow-200 rounded-lg p-3' : ''}`}>
                
                {message.type !== 'system' && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{message.author.name}</span>
                    {message.author.verified && <MdVerified className="w-4 h-4 text-blue-500" />}
                    {getRoleIcon(message.author.role)}
                    <span className={`text-xs ${getRoleColor(message.author.role)}`}>
                      {message.author.role}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    {message.edited && <span className="text-xs text-gray-400">(editado)</span>}
                    {message.pinned && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                        📌 FIJADO
                      </span>
                    )}
                  </div>
                )}

                {message.replyTo && (
                  <div className="bg-gray-100 border-l-4 border-blue-400 p-2 mb-2 text-sm">
                    <div className="text-gray-600">
                      Respondiendo a: {messages.find(m => m.id === message.replyTo)?.content.substring(0, 50)}...
                    </div>
                  </div>
                )}

                <div className={`${message.type === 'system' ? 'text-gray-600 italic' : 'text-gray-800'}`}>
                  {message.content}
                </div>

                {message.attachments && message.attachments.map((attachment, index) => (
                  <div key={index} className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaFile className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{attachment.name}</div>
                        {attachment.size && (
                          <div className="text-sm text-gray-600">{formatFileSize(attachment.size)}</div>
                        )}
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Descargar
                      </button>
                    </div>
                  </div>
                ))}

                {Object.keys(message.reactions).length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {Object.entries(message.reactions).map(([emoji, userIds]) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(message.id, emoji)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors ${
                          userIds.includes(user?.id || 'guest')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span>{emoji}</span>
                        <span className="font-medium">{userIds.length}</span>
                      </button>
                    ))}
                  </div>
                )}

                {message.type !== 'system' && (
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleReaction(message.id, '👍')}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaHeart className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <FaReply className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <FaFlag className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          {isTyping && (
            <div className="text-sm text-gray-600 mb-2">
              Varios usuarios están escribiendo...
            </div>
          )}
          
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {enableFileSharing && (
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaImage className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaFile className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaSmile className="w-4 h-4" />
                </button>
              </div>
              
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={currentRoom?.moderatorOnly && user?.id !== 'mod1' ? 'Solo moderadores pueden escribir en esta sala' : 'Escribe tu mensaje...'}
                  disabled={currentRoom?.moderatorOnly && user?.id !== 'mod1'}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  rows={2}
                />
                
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="grid grid-cols-8 gap-1">
                      {['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '😮', '😢', '😡'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="p-2 hover:bg-gray-100 rounded text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || (currentRoom?.moderatorOnly && user?.id !== 'mod1')}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>

          {multilingualSupport && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>🌐</span>
              <span>Traducción automática disponible</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;