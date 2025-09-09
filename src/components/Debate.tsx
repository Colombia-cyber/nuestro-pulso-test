import React from 'react';

const Debate = ({ debates = [] }) => {
  // Ensure debates array exists and has at least one item
  const hasActiveDebate = debates && debates.length > 0;
  
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
            <span>👥 2,847 participantes activos</span>
          </div>
        </div>

        {/* Active Debate */}
        {hasActiveDebate && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{debates[0]?.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔴 {debates[0]?.status}
                  </span>
                  <span className="text-gray-600">👥 {debates[0]?.participants} participantes</span>
                  <span className="text-gray-600">⏰ Termina en {debates[0]?.timeLeft}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Unirse al Debate
              </button>
            </div>

            {/* Voting Results */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Posición de los participantes:</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-700 font-medium">✅ A favor de la reforma</span>
                    <span>{debates?.[0]?.sides?.favor?.percentage ?? "N/A"}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${debates?.[0]?.sides?.favor?.percentage ?? 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-700 font-medium">❌ En contra de la reforma</span>
                    <span>{debates?.[0]?.sides?.contra?.percentage ?? "N/A"}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${debates?.[0]?.sides?.contra?.percentage ?? 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arguments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Argumentos Principales</h3>
              {debates[0]?.arguments?.map((argument, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  argument.side === 'favor' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">{argument.author}</span>
                      <span className="text-sm text-gray-600 ml-2">({argument.credential})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{argument.time}</span>
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <span>👍</span>
                        <span>{argument.votes}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{argument.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Debates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Próximos Debates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Transporte Público en Bogotá</h4>
              <p className="text-sm text-gray-600 mb-3">Soluciones innovadoras para mejorar la movilidad urbana</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">🕒 Hoy 19:00</span>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600">
                  Recordarme
                </button>
              </div>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Educación Digital Rural</h4>
              <p className="text-sm text-gray-600 mb-3">Conectividad e inclusión digital en zonas rurales</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">🕒 Mañana 15:00</span>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600">
                  Recordarme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debate;
 
                