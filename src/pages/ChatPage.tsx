import React from 'react';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💬 Chat en Vivo</h1>
          <p className="text-xl text-gray-600">Conecta con ciudadanos de toda Colombia en tiempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Sala Principal</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">234 usuarios conectados</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">María_Bogotá</span>
                      <span className="text-xs text-gray-500">hace 2 min</span>
                    </div>
                    <p className="text-gray-700">¿Qué opinan sobre la nueva propuesta de reforma educativa?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">Carlos_Medellín</span>
                      <span className="text-xs text-gray-500">hace 1 min</span>
                    </div>
                    <p className="text-gray-700">Creo que es un paso positivo, pero necesitamos más inversión en infraestructura.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">Ana_Cali</span>
                      <span className="text-xs text-gray-500">hace 30 seg</span>
                    </div>
                    <p className="text-gray-700">¡Totalmente de acuerdo! También es importante incluir a los maestros en el proceso.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Enviar
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Rooms */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Salas Activas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-blue-800">Política Nacional</span>
                    <span className="text-sm text-blue-600">89 usuarios</span>
                  </div>
                  <p className="text-sm text-blue-700">Discusión sobre reformas actuales</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-green-800">Medio Ambiente</span>
                    <span className="text-sm text-green-600">45 usuarios</span>
                  </div>
                  <p className="text-sm text-green-700">Cambio climático y sostenibilidad</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-purple-800">Economía Local</span>
                    <span className="text-sm text-purple-600">67 usuarios</span>
                  </div>
                  <p className="text-sm text-purple-700">Desarrollo económico regional</p>
                </div>
              </div>
            </div>

            {/* Quick Poll */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Encuesta Rápida</h3>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-3">
                  ¿Cómo calificarías la gestión actual del gobierno?
                </h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Excelente
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Buena
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Regular
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors">
                    Mala
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;