import React from 'react';

const Debate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="container mx-auto py-8 px-4">
        {/* Hero section */}
        <div className="bg-blue-800 rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">🗣️ Debates Conservadores</h1>
          <p className="text-white/90">Participa en debates desde una perspectiva conservadora sobre temas cruciales para Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔴 2 debates en vivo</span>
            <span>📅 4 programados hoy</span>
            <span>👥 3,247 participantes conservadores</span>
          </div>
        </div>

        {/* Active Conservative Debate */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">¿Debería Colombia reducir drásticamente los impuestos a las empresas para impulsar el crecimiento?</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  🔴 En vivo
                </span>
                <span className="text-gray-600">👥 3,247 participantes</span>
                <span className="text-gray-600">⏰ Termina en 1h 45m</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  🏛️ Tema Conservador
                </span>
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
                <span className="text-green-700 font-medium">✅ Sí, reducir impuestos</span>
                <span>74%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: '74%' }}
                ></div>
              </div>
            </div>

            {/* En Contra */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-700 font-medium">❌ No, mantener impuestos</span>
                <span>26%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: '26%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Conservative Arguments */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Argumentos conservadores recientes</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Carlos Mendoza</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      ✅ A favor
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      🏛️ Conservador
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">hace 3 min</span>
                </div>
                <p className="text-gray-700 mb-2">La reducción de impuestos empresariales es fundamental para crear empleos y atraer inversión extranjera. Las empresas necesitan incentivos para expandirse y generar riqueza que beneficie a todos los colombianos.</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                    <span>👍</span>
                    <span>287</span>
                  </button>
                  <button className="text-sm text-gray-600 hover:text-blue-600">Responder</button>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Ana Patricia Herrera</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      ✅ A favor
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      🏛️ Conservador
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">hace 7 min</span>
                </div>
                <p className="text-gray-700 mb-2">La libre empresa es el motor del progreso. Cuando las empresas prosperan, se crean más oportunidades de trabajo digno para las familias colombianas. El Estado debe facilitar, no obstaculizar, el crecimiento económico.</p>
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
                    <span className="font-semibold text-gray-900">Miguel Torres</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      ❌ En contra
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">hace 12 min</span>
                </div>
                <p className="text-gray-700 mb-2">Los servicios públicos necesitan financiación. Es importante mantener un equilibrio entre el apoyo empresarial y el cumplimiento de las responsabilidades sociales del Estado.</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                    <span>👍</span>
                    <span>98</span>
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
                placeholder="Comparte tu perspectiva conservadora..."
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Scheduled Conservative Debates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Próximos Debates Conservadores</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">¿Debería Colombia fortalecer la seguridad con mayor presencia militar?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Hoy 4:00 PM</span>
                  <span>👥 1,876 interesados</span>
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">🛡️ Seguridad</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Valores familiares tradicionales: ¿Cómo protegerlos en la educación?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Mañana 11:00 AM</span>
                  <span>👥 2,145 interesados</span>
                  <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-800 text-xs">👨‍👩‍👧‍👦 Familia</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Propiedad privada y libre mercado: Pilares del desarrollo económico</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Viernes 3:00 PM</span>
                  <span>👥 1,654 interesados</span>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">💰 Economía</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">¿Es necesario fortalecer los símbolos patrios y el orgullo nacional?</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>🕒 Sábado 2:00 PM</span>
                  <span>👥 1,923 interesados</span>
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">🇨🇴 Patriotismo</span>
                </div>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Recordar
              </button>
            </div>
          </div>
        </div>

        {/* Conservative Debate Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🏛️ Temas de Debate Conservadores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { topic: 'Libre Empresa', icon: '💼', color: 'bg-green-100 text-green-800' },
              { topic: 'Familia Tradicional', icon: '👨‍👩‍👧‍👦', color: 'bg-pink-100 text-pink-800' },
              { topic: 'Seguridad Nacional', icon: '🛡️', color: 'bg-red-100 text-red-800' },
              { topic: 'Valores Patrios', icon: '🇨🇴', color: 'bg-blue-100 text-blue-800' },
              { topic: 'Propiedad Privada', icon: '🏡', color: 'bg-yellow-100 text-yellow-800' },
              { topic: 'Orden Público', icon: '⚖️', color: 'bg-purple-100 text-purple-800' },
              { topic: 'Libertad Religiosa', icon: '⛪', color: 'bg-indigo-100 text-indigo-800' },
              { topic: 'Trabajo Digno', icon: '👔', color: 'bg-gray-100 text-gray-800' }
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition`}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold text-sm">{item.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debate;