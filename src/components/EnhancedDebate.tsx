import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface DebateArgument {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  position: 'favor' | 'contra';
  argument: string;
  timestamp: string;
  likes: number;
  userLiked: boolean;
  replies: DebateReply[];
}

interface DebateReply {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface ActiveDebate {
  id: string;
  title: string;
  description: string;
  status: 'live' | 'upcoming' | 'closed';
  participants: number;
  timeLeft: string;
  votesFor: number;
  votesAgainst: number;
  category: string;
  startTime: string;
  endTime: string;
}

interface ScheduledDebate {
  id: string;
  title: string;
  description: string;
  startTime: string;
  interested: number;
  category: string;
}

const EnhancedDebate: React.FC = () => {
  const { user } = useAuth();
  const [activeDebates, setActiveDebates] = useState<ActiveDebate[]>([]);
  const [selectedDebate, setSelectedDebate] = useState<string>('');
  const [debateArguments, setDebateArguments] = useState<DebateArgument[]>([]);
  const [scheduledDebates, setScheduledDebates] = useState<ScheduledDebate[]>([]);
  const [newArgument, setNewArgument] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<'favor' | 'contra'>('favor');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [userVote, setUserVote] = useState<'favor' | 'contra' | null>(null);

  // Simulate real-time debate data fetching
  const fetchDebateData = useCallback(async () => {
    try {
      // Mock active debates
      const mockActiveDebates: ActiveDebate[] = [
        {
          id: 'renta-basica-universal',
          title: '¿Debería Colombia implementar una renta básica universal?',
          description: 'Debate sobre la viabilidad económica y social de implementar una renta básica universal en Colombia.',
          status: 'live',
          participants: 2847,
          timeLeft: '2h 15m',
          votesFor: 1908, // 67%
          votesAgainst: 939, // 33%
          category: 'economics',
          startTime: new Date(Date.now() - 3600000).toISOString(),
          endTime: new Date(Date.now() + 7200000).toISOString()
        },
        {
          id: 'energia-renovable',
          title: 'Energías renovables vs. petróleo: El futuro energético de Colombia',
          description: 'Discusión sobre la transición energética y el papel del petróleo en la economía colombiana.',
          status: 'live',
          participants: 1523,
          timeLeft: '4h 30m',
          votesFor: 1065, // 70%
          votesAgainst: 458, // 30%
          category: 'environment',
          startTime: new Date(Date.now() - 1800000).toISOString(),
          endTime: new Date(Date.now() + 14400000).toISOString()
        }
      ];

      // Mock arguments for the selected debate
      const mockArguments: DebateArgument[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'María González',
          avatar: '👩‍💼',
          position: 'favor',
          argument: 'La renta básica reduciría significativamente la pobreza extrema y daría dignidad a millones de colombianos que viven en condiciones precarias.',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          likes: 234,
          userLiked: false,
          replies: [
            {
              id: 'r1',
              userId: 'user3',
              userName: 'Ana Rodríguez',
              avatar: '👩‍🎓',
              text: 'Excelente punto. Además, liberaría tiempo para educación y capacitación.',
              timestamp: new Date(Date.now() - 240000).toISOString(),
              likes: 45
            }
          ]
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Carlos Rodríguez',
          avatar: '👨‍🏫',
          position: 'contra',
          argument: 'Los recursos serían mejor invertidos en educación y infraestructura que genere empleos sostenibles a largo plazo.',
          timestamp: new Date(Date.now() - 480000).toISOString(),
          likes: 187,
          userLiked: false,
          replies: []
        }
      ];

      // Mock scheduled debates
      const mockScheduledDebates: ScheduledDebate[] = [
        {
          id: 'reforma-tributaria',
          title: 'Reforma tributaria: ¿Más impuestos o menos gasto público?',
          description: 'Análisis de la nueva propuesta de reforma tributaria y sus implicaciones.',
          startTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
          interested: 1200,
          category: 'economics'
        },
        {
          id: 'cannabis-legal',
          title: '¿Debería legalizarse completamente el cannabis en Colombia?',
          description: 'Debate sobre la legalización del cannabis y sus efectos sociales y económicos.',
          startTime: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
          interested: 2100,
          category: 'social'
        }
      ];

      setActiveDebates(mockActiveDebates);
      setDebateArguments(mockArguments);
      setScheduledDebates(mockScheduledDebates);
      
      if (!selectedDebate && mockActiveDebates.length > 0) {
        setSelectedDebate(mockActiveDebates[0].id);
      }
      
      setIsConnected(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching debate data:', error);
      setIsConnected(false);
      setLoading(false);
    }
  }, [selectedDebate]);

  // Simulate real-time updates
  const simulateRealtimeUpdates = useCallback(() => {
    if (!isConnected) return;

    // Randomly update participant count and votes
    setActiveDebates(prev => prev.map(debate => ({
      ...debate,
      participants: debate.participants + Math.floor(Math.random() * 10 - 5),
      votesFor: debate.votesFor + Math.floor(Math.random() * 5),
      votesAgainst: debate.votesAgainst + Math.floor(Math.random() * 3)
    })));

    // Occasionally add new arguments
    if (Math.random() > 0.8) {
      const sampleArguments = [
        'Es importante considerar los aspectos económicos de esta propuesta.',
        'Los estudios internacionales muestran resultados mixtos.',
        'Debemos pensar en las generaciones futuras.',
        'La evidencia empírica sugiere lo contrario.',
        'Es crucial evaluar el impacto en diferentes sectores sociales.'
      ];

      const sampleUsers = [
        { name: 'Diego Vargas', avatar: '👨‍🎓' },
        { name: 'Sofia Martinez', avatar: '👩‍🔬' },
        { name: 'Roberto Silva', avatar: '👨‍💼' },
        { name: 'Carmen Torres', avatar: '👩‍🏫' }
      ];

      const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
      const randomArgument = sampleArguments[Math.floor(Math.random() * sampleArguments.length)];
      const randomPosition = Math.random() > 0.5 ? 'favor' : 'contra';

      const newArg: DebateArgument = {
        id: Date.now().toString(),
        userId: `user_${Date.now()}`,
        userName: randomUser.name,
        avatar: randomUser.avatar,
        position: randomPosition,
        argument: randomArgument,
        timestamp: new Date().toISOString(),
        likes: 0,
        userLiked: false,
        replies: []
      };

      setDebateArguments(prev => [newArg, ...prev]);
    }
  }, [isConnected]);

  // Initialize data and setup real-time updates
  useEffect(() => {
    fetchDebateData();
    
    // Setup real-time updates every 15 seconds
    const interval = setInterval(simulateRealtimeUpdates, 15000);
    
    return () => clearInterval(interval);
  }, [fetchDebateData, simulateRealtimeUpdates]);

  const handleVote = (position: 'favor' | 'contra') => {
    if (!user) {
      alert('Debes iniciar sesión para votar');
      return;
    }

    setUserVote(position);
    
    // Update local vote counts immediately
    setActiveDebates(prev => prev.map(debate => {
      if (debate.id === selectedDebate) {
        return {
          ...debate,
          votesFor: position === 'favor' ? debate.votesFor + 1 : debate.votesFor,
          votesAgainst: position === 'contra' ? debate.votesAgainst + 1 : debate.votesAgainst
        };
      }
      return debate;
    }));
  };

  const handleSubmitArgument = () => {
    if (!user || !newArgument.trim()) {
      if (!user) alert('Debes iniciar sesión para participar');
      return;
    }

    const argument: DebateArgument = {
      id: Date.now().toString(),
      userId: user.uid,
      userName: user.displayName || user.email?.split('@')[0] || 'Usuario',
      avatar: '🙋‍♂️',
      position: selectedPosition,
      argument: newArgument,
      timestamp: new Date().toISOString(),
      likes: 0,
      userLiked: false,
      replies: []
    };

    setDebateArguments(prev => [argument, ...prev]);
    setNewArgument('');
  };

  const handleLikeArgument = (argumentId: string) => {
    if (!user) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    setDebateArguments(prev => prev.map(arg => {
      if (arg.id === argumentId) {
        return {
          ...arg,
          likes: arg.userLiked ? arg.likes - 1 : arg.likes + 1,
          userLiked: !arg.userLiked
        };
      }
      return arg;
    }));
  };

  const currentDebate = activeDebates.find(d => d.id === selectedDebate);
  const totalVotes = currentDebate ? currentDebate.votesFor + currentDebate.votesAgainst : 0;
  const favorPercentage = currentDebate && totalVotes > 0 ? Math.round((currentDebate.votesFor / totalVotes) * 100) : 0;
  const contraPercentage = currentDebate && totalVotes > 0 ? Math.round((currentDebate.votesAgainst / totalVotes) * 100) : 0;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'ahora';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando debates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-blue-800 rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">🗣️ Debates Cívicos</h1>
          <p className="text-white/90">Participa en debates estructurados sobre temas cruciales para Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span>{activeDebates.filter(d => d.status === 'live').length} debates en vivo</span>
            </div>
            <span>📅 {scheduledDebates.length} programados hoy</span>
            <span>👥 {activeDebates.reduce((sum, d) => sum + d.participants, 0).toLocaleString()} participantes activos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Debate Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Debates Activos</h2>
              <nav 
                className="space-y-2"
                role="tablist"
                aria-label="Debates disponibles"
              >
                {activeDebates.map((debate) => (
                  <button
                    key={debate.id}
                    onClick={() => setSelectedDebate(debate.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedDebate === debate.id
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    role="tab"
                    aria-selected={selectedDebate === debate.id}
                    aria-label={`Seleccionar debate: ${debate.title}`}
                  >
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{debate.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        debate.status === 'live' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {debate.status === 'live' ? '🔴 En vivo' : 'Programado'}
                      </span>
                      <span className="text-xs text-gray-500">
                        👥 {debate.participants}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Scheduled Debates */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Próximos Debates</h2>
              <div className="space-y-3">
                {scheduledDebates.map((debate) => (
                  <div key={debate.id} className="border rounded-lg p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {debate.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">
                        🕒 {new Date(debate.startTime).toLocaleString('es-CO')}
                      </span>
                      <span className="text-gray-500">
                        👥 {debate.interested} interesados
                      </span>
                    </div>
                    <button className="mt-2 w-full bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200">
                      Recordar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Debate Area */}
          <div className="lg:col-span-3">
            {currentDebate && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                {/* Debate Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentDebate.title}</h2>
                    <p className="text-gray-600 mb-4">{currentDebate.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        🔴 En vivo
                      </span>
                      <span className="text-gray-600">👥 {currentDebate.participants.toLocaleString()} participantes</span>
                      <span className="text-gray-600">⏰ Termina en {currentDebate.timeLeft}</span>
                    </div>
                  </div>
                  
                  {!userVote && user && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVote('favor')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
                        aria-label="Votar a favor"
                      >
                        ✅ A Favor
                      </button>
                      <button
                        onClick={() => handleVote('contra')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                        aria-label="Votar en contra"
                      >
                        ❌ En Contra
                      </button>
                    </div>
                  )}
                </div>

                {/* Voting Results */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Resultados en Tiempo Real</h3>
                  
                  <div className="space-y-3">
                    {/* A Favor */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-green-700 font-medium">✅ A Favor</span>
                        <span className="font-semibold">{favorPercentage}% ({currentDebate.votesFor.toLocaleString()})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${favorPercentage}%` }}
                          role="progressbar"
                          aria-valuenow={favorPercentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`A favor: ${favorPercentage}%`}
                        ></div>
                      </div>
                    </div>

                    {/* En Contra */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-red-700 font-medium">❌ En Contra</span>
                        <span className="font-semibold">{contraPercentage}% ({currentDebate.votesAgainst.toLocaleString()})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${contraPercentage}%` }}
                          role="progressbar"
                          aria-valuenow={contraPercentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`En contra: ${contraPercentage}%`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {userVote && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 font-medium">
                        ✅ Has votado: {userVote === 'favor' ? 'A Favor' : 'En Contra'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Arguments Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Argumentos Recientes</h3>
                  
                  <div 
                    className="space-y-4 max-h-96 overflow-y-auto"
                    role="log"
                    aria-live="polite"
                    aria-label="Argumentos del debate"
                  >
                    {debateArguments.map((argument) => (
                      <article
                        key={argument.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          argument.position === 'favor'
                            ? 'bg-green-50 border-green-500'
                            : 'bg-red-50 border-red-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg" role="img" aria-label={`Avatar de ${argument.userName}`}>
                              {argument.avatar}
                            </span>
                            <span className="font-semibold text-gray-900">{argument.userName}</span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              argument.position === 'favor'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {argument.position === 'favor' ? '✅ A favor' : '❌ En contra'}
                            </span>
                          </div>
                          <time className="text-xs text-gray-500" dateTime={argument.timestamp}>
                            hace {formatTimeAgo(argument.timestamp)}
                          </time>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{argument.argument}</p>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLikeArgument(argument.id)}
                            className={`flex items-center space-x-1 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                              argument.userLiked 
                                ? 'text-blue-600' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                            aria-label={`${argument.userLiked ? 'Quitar' : 'Dar'} like al argumento de ${argument.userName}`}
                          >
                            <span>{argument.userLiked ? '👍' : '👍'}</span>
                            <span>{argument.likes}</span>
                          </button>
                          <button className="text-sm text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                            Responder
                          </button>
                        </div>

                        {/* Replies */}
                        {argument.replies.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-gray-200">
                            {argument.replies.map((reply) => (
                              <div key={reply.id} className="py-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm" role="img" aria-label={`Avatar de ${reply.userName}`}>
                                    {reply.avatar}
                                  </span>
                                  <span className="font-medium text-sm">{reply.userName}</span>
                                  <time className="text-xs text-gray-500" dateTime={reply.timestamp}>
                                    hace {formatTimeAgo(reply.timestamp)}
                                  </time>
                                </div>
                                <p className="text-sm text-gray-700">{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>

                {/* New Argument Input */}
                {user ? (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Agregar tu argumento</h4>
                    <div className="space-y-3">
                      <fieldset>
                        <legend className="sr-only">Selecciona tu posición</legend>
                        <div className="flex space-x-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="favor"
                              checked={selectedPosition === 'favor'}
                              onChange={(e) => setSelectedPosition(e.target.value as 'favor')}
                              className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-green-700 font-medium">✅ A favor</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="contra"
                              checked={selectedPosition === 'contra'}
                              onChange={(e) => setSelectedPosition(e.target.value as 'contra')}
                              className="mr-2 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-red-700 font-medium">❌ En contra</span>
                          </label>
                        </div>
                      </fieldset>
                      
                      <div className="flex space-x-3">
                        <textarea
                          value={newArgument}
                          onChange={(e) => setNewArgument(e.target.value)}
                          placeholder="Comparte tu argumento fundamentado..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          maxLength={500}
                          aria-label="Escribir nuevo argumento"
                        />
                        <button
                          onClick={handleSubmitArgument}
                          disabled={!newArgument.trim()}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Enviar argumento"
                        >
                          Enviar
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {500 - newArgument.length} caracteres restantes. Mantén un debate respetuoso y constructivo.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-6 text-center">
                    <p className="text-gray-600 mb-3">Inicia sesión para participar en el debate</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Iniciar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
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

        {/* Live Updates Indicator */}
        {isConnected && (
          <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Debate actualizándose en vivo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDebate;