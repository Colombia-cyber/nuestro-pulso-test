import React from 'react';

const LiveChat: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4 flex items-center gap-3">
            💬 Chat en Vivo
          </h1>
          <p className="text-xl text-purple-700 mb-6">
            Únete a conversaciones en tiempo real sobre temas de interés nacional
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-6">
            <p className="text-gray-700 text-lg">
              Conecta con otros ciudadanos, comparte opiniones y participa en discusiones 
              constructivas sobre los temas que más importan para Colombia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 h-96">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🌊 Chat General
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    🟢 En vivo
                  </span>
                </h3>
              </div>
              <div className="p-4 h-64 bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">💭</div>
                  <p className="text-lg font-medium mb-2">Chat en Vivo</p>
                  <p className="text-sm">
                    🚧 Próximamente: Sistema de chat en tiempo real
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Escribe tu mensaje..." 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled
                  />
                  <button 
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                    disabled
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                👥 Usuarios Conectados
              </h4>
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">🔌</div>
                <p className="text-sm">Próximamente</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                🔥 Temas Trending
              </h4>
              <div className="space-y-2">
                <div className="bg-red-50 p-2 rounded text-sm">
                  <span className="text-red-600">#ReformasPensionales</span>
                </div>
                <div className="bg-blue-50 p-2 rounded text-sm">
                  <span className="text-blue-600">#SeguridadCiudadana</span>
                </div>
                <div className="bg-green-50 p-2 rounded text-sm">
                  <span className="text-green-600">#EducaciónPública</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🎯 Chats Temáticos
            </h3>
            <p className="text-gray-600 mb-4">
              Salas especializadas por tema de interés
            </p>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                <span className="font-medium text-blue-800">🏛️ Política Nacional</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition">
                <span className="font-medium text-green-800">💰 Economía</span>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg cursor-pointer hover:bg-purple-100 transition">
                <span className="font-medium text-purple-800">📚 Educación</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              ⚡ Eventos Especiales
            </h3>
            <p className="text-gray-600 mb-4">
              Chats durante eventos importantes
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                📅 Próximo evento: Debate Presidencial
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                Chat en vivo durante transmisiones oficiales
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            🛡️ Reglas de Participación
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700 text-sm">
            <div>
              <h4 className="font-medium mb-2">Respeto y Civismo:</h4>
              <ul className="space-y-1">
                <li>• Mantén un lenguaje respetuoso</li>
                <li>• No ataques personales</li>
                <li>• Respeta opiniones diferentes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contenido Apropiado:</h4>
              <ul className="space-y-1">
                <li>• No spam ni publicidad</li>
                <li>• Información verificada</li>
                <li>• Debates constructivos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;