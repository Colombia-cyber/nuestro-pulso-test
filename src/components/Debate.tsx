import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  author: string;
  position: 'favor' | 'contra';
  content: string;
  timestamp: string;
  upvotes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

interface VoteResults {
  favor: number;
  contra: number;
}

interface DebateData {
  id: string;
  title: string;
  description: string;
  status: 'live' | 'scheduled';
  participants: number;
  timeLeft?: string;
  scheduledTime?: string;
  category: string;
  voteResults?: VoteResults;
  totalVotes?: number;
  comments?: Comment[];
  interested?: number;
}

const Debate: React.FC = () => {
  const [selectedDebate, setSelectedDebate] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentPosition, setCommentPosition] = useState<'favor' | 'contra'>('favor');
  const [upvotedComments, setUpvotedComments] = useState<Set<string>>(new Set());

  // Simulate live updates for participant count
  const [liveParticipants, setLiveParticipants] = useState(2847);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveParticipants(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const debates = [
    {
      id: 'renta-basica',
      title: '¿Debería Colombia implementar una renta básica universal?',
      description: 'Debate sobre la viabilidad económica y social de implementar una renta básica universal en Colombia',
      status: 'live',
      participants: liveParticipants,
      timeLeft: '2h 15m',
      category: 'Política Social',
      voteResults: { favor: 67, contra: 33 },
      totalVotes: 8945,
      comments: [
        {
          id: '1',
          author: 'María González',
          position: 'favor',
          content: 'La renta básica reduciría significativamente la pobreza extrema y daría dignidad a millones de colombianos que hoy no tienen acceso a oportunidades básicas.',
          timestamp: 'hace 5 min',
          upvotes: 234,
          replies: [
            {
              id: '1-1',
              author: 'Luis Pérez',
              content: 'Estoy de acuerdo, pero ¿cómo se financiaría sin aumentar impuestos?',
              timestamp: 'hace 3 min',
              upvotes: 45
            }
          ]
        },
        {
          id: '2',
          author: 'Carlos Rodríguez',
          position: 'contra',
          content: 'Los recursos serían mejor invertidos en educación y infraestructura que genere empleos sostenibles. La renta básica puede crear dependencia del Estado.',
          timestamp: 'hace 8 min',
          upvotes: 187,
          replies: []
        },
        {
          id: '3',
          author: 'Ana Martínez',
          position: 'favor',
          content: 'Los estudios en otros países muestran que la renta básica impulsa el emprendimiento y la educación, no la dependencia.',
          timestamp: 'hace 12 min',
          upvotes: 156,
          replies: []
        }
      ]
    },
    {
      id: 'reforma-tributaria',
      title: 'Reforma tributaria: ¿Más impuestos o menos gasto público?',
      description: 'Análisis de las opciones para equilibrar las finanzas públicas colombianas',
      status: 'scheduled',
      scheduledTime: 'Hoy 3:00 PM',
      participants: 1200,
      category: 'Economía',
      interested: 1200
    },
    {
      id: 'energias-renovables',
      title: 'Energías renovables vs. petróleo: El futuro energético de Colombia',
      description: 'Debate sobre la transición energética y el papel del petróleo en la economía colombiana',
      status: 'scheduled',
      scheduledTime: 'Mañana 10:00 AM',
      participants: 890,
      category: 'Ambiente',
      interested: 890
    }
  ];

  const handleUpvote = (commentId: string) => {
    setUpvotedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Simulate adding comment
      alert(`Comentario enviado: "${newComment}"\nPosición: ${commentPosition === 'favor' ? 'A favor' : 'En contra'}`);
      setNewComment('');
    }
  };

  if (selectedDebate) {
    const debate = debates.find(d => d.id === selectedDebate);
    if (!debate || debate.status !== 'live') return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Full-page header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-6">
            <button 
              onClick={() => setSelectedDebate(null)}
              className="mb-4 flex items-center text-white/80 hover:text-white transition"
            >
              ← Volver a debates
            </button>
            <h1 className="text-3xl font-bold mb-2">{debate.title}</h1>
            <div className="flex items-center space-x-6 text-white/90">
              <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                🔴 EN VIVO
              </span>
              <span>👥 {debate.participants.toLocaleString()} participantes</span>
              <span>⏰ Termina en {debate.timeLeft}</span>
              <span>📂 {debate.category}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main debate content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Voting Results */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Resultados en tiempo real</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-700 font-medium text-lg">✅ A Favor</span>
                      <span className="text-2xl font-bold text-green-700">{debate.voteResults?.favor ?? 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${debate.voteResults?.favor ?? 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-700 font-medium text-lg">❌ En Contra</span>
                      <span className="text-2xl font-bold text-red-700">{debate.voteResults?.contra ?? 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-red-500 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${debate.voteResults?.contra ?? 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-600">Total de votos: {debate.totalVotes?.toLocaleString() ?? '0'}</p>
                </div>
              </div>

              {/* Comments section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Argumentos y Comentarios</h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {debate.comments?.map((comment) => (
                    <div key={comment.id} className={`p-4 rounded-lg border-l-4 ${
                      comment.position === 'favor' 
                        ? 'bg-green-50 border-green-500' 
                        : 'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{comment.author}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            comment.position === 'favor' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {comment.position === 'favor' ? '✅ A favor' : '❌ En contra'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleUpvote(comment.id)}
                          className={`flex items-center space-x-1 text-sm transition ${
                            upvotedComments.has(comment.id) 
                              ? 'text-blue-600' 
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <span>{upvotedComments.has(comment.id) ? '👍' : '👍'}</span>
                          <span>{comment.upvotes + (upvotedComments.has(comment.id) ? 1 : 0)}</span>
                        </button>
                        <button className="text-sm text-gray-600 hover:text-blue-600">
                          Responder
                        </button>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 ml-4 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="bg-white p-3 rounded border-l-2 border-gray-300">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{reply.author}</span>
                                <span className="text-xs text-gray-500">{reply.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                              <button 
                                onClick={() => handleUpvote(reply.id)}
                                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600"
                              >
                                <span>👍</span>
                                <span>{reply.upvotes + (upvotedComments.has(reply.id) ? 1 : 0)}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participate card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Participa en el debate</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu posición:
                    </label>
                    <select 
                      value={commentPosition}
                      onChange={(e) => setCommentPosition(e.target.value as 'favor' | 'contra')}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="favor">✅ A favor</option>
                      <option value="contra">❌ En contra</option>
                    </select>
                  </div>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Comparte tu argumento..."
                    className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleSubmitComment}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Enviar Argumento
                  </button>
                </div>
              </div>

              {/* Quick vote */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Voto rápido</h4>
                <div className="space-y-3">
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold">
                    ✅ Votar A Favor
                  </button>
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-semibold">
                    ❌ Votar En Contra
                  </button>
                </div>
              </div>

              {/* Debate stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Estadísticas</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total participantes:</span>
                    <span className="font-semibold">{debate.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comentarios:</span>
                    <span className="font-semibold">{debate.comments?.length ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Votos totales:</span>
                    <span className="font-semibold">{debate.totalVotes?.toLocaleString() ?? '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo restante:</span>
                    <span className="font-semibold text-red-600">{debate.timeLeft}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Main debates list view
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Hero section */}
        <div className="bg-blue-800 rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">🗣️ Debates Cívicos</h1>
          <p className="text-white/90">Participa en debates estructurados sobre temas cruciales para Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔴 3 debates en vivo</span>
            <span>📅 5 programados hoy</span>
            <span>👥 {liveParticipants.toLocaleString()} participantes activos</span>
          </div>
        </div>

        {/* Active Debates */}
        <div className="space-y-6">
          {debates.map((debate) => (
            <div key={debate.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{debate.title}</h2>
                  <p className="text-gray-600 mb-3">{debate.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      debate.status === 'live' 
                        ? 'bg-red-100 text-red-800 animate-pulse' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {debate.status === 'live' ? '🔴 En vivo' : '📅 Programado'}
                    </span>
                    <span className="text-gray-600">
                      👥 {debate.status === 'live' ? debate.participants.toLocaleString() : debate.interested} 
                      {debate.status === 'live' ? ' participantes' : ' interesados'}
                    </span>
                    {debate.status === 'live' && (
                      <span className="text-gray-600">⏰ Termina en {debate.timeLeft}</span>
                    )}
                    {debate.status === 'scheduled' && (
                      <span className="text-gray-600">🕒 {debate.scheduledTime}</span>
                    )}
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {debate.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {debate.status === 'live' ? (
                    <>
                      <button 
                        onClick={() => setSelectedDebate(debate.id)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                      >
                        Ver Debate Completo
                      </button>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-sm">
                        Participar Rápido
                      </button>
                    </>
                  ) : (
                    <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold">
                      Recordar
                    </button>
                  )}
                </div>
              </div>

              {/* Live debate preview */}
              {debate.status === 'live' && debate.voteResults && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Vista rápida de resultados:</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-green-700 font-medium">✅ A Favor</span>
                        <span className="font-bold">{debate.voteResults.favor}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${debate.voteResults.favor}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-red-700 font-medium">❌ En Contra</span>
                        <span className="font-bold">{debate.voteResults.contra}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${debate.voteResults.contra}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent comments preview */}
                  {debate.comments && debate.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className={`p-3 rounded border-l-3 mb-2 ${
                      comment.position === 'favor' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          comment.position === 'favor' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {comment.position === 'favor' ? '✅' : '❌'}
                        </span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create debate section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Proponer Nuevo Debate</h3>
          <p className="text-gray-600 mb-4">
            ¿Hay un tema importante que merece un debate nacional? Propón un nuevo debate cívico.
          </p>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Título del debate (ej: ¿Debería Colombia...?)"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea 
              placeholder="Descripción del tema y contexto del debate"
              className="w-full border rounded-lg px-4 py-3 h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex gap-4">
              <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option>Política Social</option>
                <option>Economía</option>
                <option>Ambiente</option>
                <option>Educación</option>
                <option>Salud</option>
                <option>Seguridad</option>
              </select>
              <input 
                type="datetime-local" 
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                Proponer Debate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debate;