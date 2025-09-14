import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Debate: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVote, setSelectedVote] = useState<string>('');
  const [newArgument, setNewArgument] = useState('');
  const [argumentPosition, setArgumentPosition] = useState('favor');

  const weeklyDebate = {
    id: 'weekly-1',
    title: '🔥 DEBATE SEMANAL: ¿Debería Colombia implementar una renta básica universal?',
    description: 'El debate más importante de la semana con participación ciudadana masiva',
    status: 'EN VIVO',
    participants: 2847,
    timeLeft: '2h 15m',
    moderator: 'Equipo Nuestro Pulso',
    startTime: 'Martes 2:00 PM',
    votes: {
      favor: 1956,
      contra: 891,
      total: 2847
    },
    liveStats: {
      watching: 1247,
      participated: 2847,
      arguments: 156
    }
  };

  const handleVote = (position: string) => {
    setSelectedVote(position);
    // In a real app, this would submit the vote to the backend
  };

  const submitArgument = () => {
    if (newArgument.trim()) {
      // In a real app, this would submit the argument to the backend
      console.log('Submitting argument:', { position: argumentPosition, text: newArgument });
      setNewArgument('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Weekly Featured Debate Hero */}
        <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-lg p-8 mb-8 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                🔴 DEBATE SEMANAL EN VIVO
              </span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{weeklyDebate.liveStats.watching.toLocaleString()}</div>
              <div className="text-sm opacity-90">espectadores ahora</div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{weeklyDebate.title}</h1>
          <p className="text-xl mb-6 opacity-90">{weeklyDebate.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{weeklyDebate.liveStats.participated.toLocaleString()}</div>
              <div className="text-sm opacity-90">participantes totales</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{weeklyDebate.liveStats.arguments}</div>
              <div className="text-sm opacity-90">argumentos presentados</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{weeklyDebate.timeLeft}</div>
              <div className="text-sm opacity-90">tiempo restante</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              🔴 Ver en Vivo
            </button>
            <button 
              onClick={() => navigate('/reels')}
              className="flex-1 bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-30 transition-colors"
            >
              📹 Ver Reels del Debate
            </button>
          </div>
        </div>

        {/* Live Voting Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗳️ Vota en Tiempo Real</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleVote('favor')}
              className={`p-6 rounded-lg border-2 text-left transition-all ${
                selectedVote === 'favor'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-green-700">✅ A Favor</h3>
                <span className="text-2xl font-bold text-green-600">
                  {Math.round((weeklyDebate.votes.favor / weeklyDebate.votes.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(weeklyDebate.votes.favor / weeklyDebate.votes.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {weeklyDebate.votes.favor.toLocaleString()} votos
              </p>
            </button>

            <button
              onClick={() => handleVote('contra')}
              className={`p-6 rounded-lg border-2 text-left transition-all ${
                selectedVote === 'contra'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-red-700">❌ En Contra</h3>
                <span className="text-2xl font-bold text-red-600">
                  {Math.round((weeklyDebate.votes.contra / weeklyDebate.votes.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(weeklyDebate.votes.contra / weeklyDebate.votes.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {weeklyDebate.votes.contra.toLocaleString()} votos
              </p>
            </button>
          </div>

          {selectedVote && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-800">
                <span>✅</span>
                <span className="font-medium">
                  Tu voto ha sido registrado: {selectedVote === 'favor' ? 'A Favor' : 'En Contra'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Arguments Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 Argumentos en Vivo</h3>
          
          {/* Add Argument */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Comparte tu argumento</h4>
            <div className="flex space-x-3 mb-3">
              <select 
                value={argumentPosition}
                onChange={(e) => setArgumentPosition(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="favor">✅ A favor</option>
                <option value="contra">❌ En contra</option>
              </select>
              <input 
                type="text" 
                value={newArgument}
                onChange={(e) => setNewArgument(e.target.value)}
                placeholder="Escribe tu argumento..."
                className="flex-1 border rounded-lg px-3 py-2"
                maxLength={280}
              />
              <button 
                onClick={submitArgument}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
            <div className="text-xs text-gray-500">
              {newArgument.length}/280 caracteres
            </div>
          </div>

          {/* Live Arguments Stream */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">María González</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    ✅ A favor
                  </span>
                  <span className="text-xs text-blue-600">🔴 EN VIVO</span>
                </div>
                <span className="text-xs text-gray-500">hace 2 min</span>
              </div>
              <p className="text-gray-700 mb-2">La renta básica reduciría significativamente la pobreza extrema y daría dignidad a millones de colombianos que luchan día a día.</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                  <span>👍</span>
                  <span>234</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border-l-4 bg-red-50 border-red-500">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">Carlos Rodríguez</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                    ❌ En contra
                  </span>
                </div>
                <span className="text-xs text-gray-500">hace 3 min</span>
              </div>
              <p className="text-gray-700 mb-2">Los recursos serían mejor invertidos en educación y infraestructura que genere empleos sostenibles a largo plazo.</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                  <span>👍</span>
                  <span>187</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
              </div>
            </div>

            <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">Ana Martínez</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    ✅ A favor
                  </span>
                </div>
                <span className="text-xs text-gray-500">hace 5 min</span>
              </div>
              <p className="text-gray-700 mb-2">En otros países como Finlandia y Canadá ha mostrado resultados positivos. Colombia podría aprender de estas experiencias.</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                  <span>👍</span>
                  <span>156</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Debates */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Próximos Debates Destacados</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Reforma tributaria: ¿Más impuestos o menos gasto público?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Próximo martes 3:00 PM</span>
                  <span>👥 1,200 interesados</span>
                  <span className="text-orange-600 font-medium">⭐ Debate Semanal</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Recordar
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Energías renovables vs. petróleo: El futuro energético de Colombia</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Jueves 10:00 AM</span>
                  <span>👥 890 interesados</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">¿Debería legalizarse completamente el cannabis en Colombia?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Viernes 2:00 PM</span>
                  <span>👥 2,100 interesados</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Explorar Más Contenido</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/reels')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm font-medium">Ver Reels</div>
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium">Chat en Vivo</div>
            </button>
            <button 
              onClick={() => navigate('/encuestas')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Encuestas</div>
            </button>
            <button 
              onClick={() => navigate('/noticias')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">📰</div>
              <div className="text-sm font-medium">Noticias</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debate;