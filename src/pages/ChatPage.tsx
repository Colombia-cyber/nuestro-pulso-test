import React from 'react';
import { FiMessageCircle, FiUsers, FiSend } from 'react-icons/fi';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💬 Chat en Vivo
          </h1>
          <p className="text-xl text-gray-600">
            Únete a la conversación nacional en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Rooms List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <FiUsers />
                <span>Salas de Chat</span>
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg cursor-pointer border-l-4 border-blue-500">
                  <div className="font-medium text-blue-900">🏛️ Política Nacional</div>
                  <div className="text-sm text-blue-600">124 participantes</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-gray-900">🌱 Medio Ambiente</div>
                  <div className="text-sm text-gray-600">89 participantes</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-gray-900">📚 Educación</div>
                  <div className="text-sm text-gray-600">156 participantes</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-gray-900">💼 Economía</div>
                  <div className="text-sm text-gray-600">203 participantes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg h-96 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">🏛️ Política Nacional</h3>
                <p className="text-sm text-gray-600">124 participantes activos</p>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    M
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">María González</div>
                    <div className="bg-gray-100 rounded-lg p-3 mt-1">
                      ¿Qué opinan sobre la propuesta de reforma tributaria?
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    C
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Carlos Ruiz</div>
                    <div className="bg-gray-100 rounded-lg p-3 mt-1">
                      Creo que es necesaria para aumentar la inversión social, pero debe ser progresiva.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ana Martínez</div>
                    <div className="bg-gray-100 rounded-lg p-3 mt-1">
                      Es importante que sea transparente y que los recursos lleguen efectivamente a quien los necesita.
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FiSend size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Guidelines */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Normas de Participación</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Mantén un tono respetuoso en todas las conversaciones</li>
                <li>• Evita el spam y mensajes repetitivos</li>
                <li>• Respeta las diferentes opiniones políticas</li>
                <li>• No compartas información personal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;