import React from 'react';

const Debate: React.FC = () => {
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

        {/* Sample Active Debate */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">¿Debería Colombia implementar una renta básica universal?</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  🔴 En vivo
                </span>
                <span className="text-gray-600">👥 2,847 participantes</span>
                <span className="text-gray-600">⏰ Termina en 2h 15m</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Participar
            </button>
          </div>

          {/* Voting Results */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Resultados actuales</h3>
            
            {/* A Favor */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-green-700 font-medium">✅ A Favor</span>
                <span>67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: '67%' }}
                ></div>
              </div>
            </div>

            {/* En Contra */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-700 font-medium">❌ En Contra</span>
                <span>33%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: '33%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sample Arguments */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Argumentos recientes</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">María González</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      ✅ A favor
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">hace 5 min</span>
                </div>
                <p className="text-gray-700 mb-2">La renta básica reduciría significativamente la pobreza extrema y daría dignidad a millones de colombianos.</p>
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
                  <span className="text-xs text-gray-500">hace 8 min</span>
                </div>
                <p className="text-gray-700 mb-2">Los recursos serían mejor invertidos en educación y infraestructura que genere empleos sostenibles.</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                    <span>👍</span>
                    <span>187</span>
                  </button>
                  <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
                </div>
              </div>
            </div>
          </div>

          {/* Input for new argument */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex space-x-3">
              <select className="border rounded-lg px-3 py-2">
                <option value="favor">✅ A favor</option>
                <option value="contra">❌ En contra</option>
              </select>
              <input 
                type="text" 
                placeholder="Comparte tu argumento..."
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Scheduled Debates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Próximos Debates</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Reforma tributaria: ¿Más impuestos o menos gasto público?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Hoy 3:00 PM</span>
                  <span>👥 1,200 interesados</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Energías renovables vs. petróleo: El futuro energético de Colombia</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Mañana 10:00 AM</span>
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
      </div>
    </div>
  );
};

export default Debate;