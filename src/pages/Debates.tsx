import React from 'react';

const Debates: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-4 flex items-center gap-3">
            🗣️ Debates Cívicos
          </h1>
          <p className="text-xl text-orange-700 mb-6">
            Participa en debates estructurados sobre políticas públicas y temas nacionales
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-6">
            <p className="text-gray-700 text-lg">
              Espacio para el intercambio respetuoso de ideas, donde ciudadanos pueden 
              debatir sobre temas cruciales para el futuro de Colombia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🔥 Debate Activo
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                EN VIVO
              </span>
            </h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-900 mb-2">
                "¿Debe Colombia implementar la educación universitaria gratuita?"
              </h4>
              <div className="text-sm text-orange-700 mb-3">
                <span>👥 248 participantes</span> • <span>⏰ 2h 15m activo</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  A favor: 156
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                  En contra: 92
                </span>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Sistema de debates en tiempo real
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📅 Próximos Debates
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-400 pl-4 py-2">
                <h4 className="font-medium text-gray-800">Reforma Pensional 2024</h4>
                <p className="text-sm text-gray-600">Mañana, 7:00 PM</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Moderado
                </span>
              </div>
              <div className="border-l-4 border-green-400 pl-4 py-2">
                <h4 className="font-medium text-gray-800">Seguridad Ciudadana</h4>
                <p className="text-sm text-gray-600">Viernes, 6:30 PM</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Abierto
                </span>
              </div>
              <div className="border-l-4 border-purple-400 pl-4 py-2">
                <h4 className="font-medium text-gray-800">Medio Ambiente</h4>
                <p className="text-sm text-gray-600">Lunes, 8:00 PM</p>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Expertos
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              💡 Proponer Tema
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Sugiere temas para futuros debates
            </p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
              Proponer Debate
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📊 Mi Participación
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
              <p className="text-sm text-gray-600">Debates participados</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🏆 Reconocimientos
            </h3>
            <div className="space-y-2">
              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                🥇 Debatiente Activo
              </div>
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                🎯 Argumentos Sólidos
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              📜 Historial de Debates
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-medium text-gray-800 mb-1">
                  Reforma Tributaria vs. Crecimiento Económico
                </h4>
                <div className="text-sm text-gray-600 mb-2">
                  Finalizado • 15 de Enero • 185 participantes
                </div>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Conclusión: Reforma moderada
                  </span>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-medium text-gray-800 mb-1">
                  Transporte Público vs. Transporte Privado
                </h4>
                <div className="text-sm text-gray-600 mb-2">
                  Finalizado • 8 de Enero • 267 participantes
                </div>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    Conclusión: Inversión mixta
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">
              🎯 Cómo Participar en Debates
            </h3>
            <div className="space-y-3 text-orange-700 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <h4 className="font-medium">Elige un debate</h4>
                  <p className="text-xs">Selecciona un tema que te interese</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <h4 className="font-medium">Presenta tu posición</h4>
                  <p className="text-xs">Argumenta con evidencia y respeto</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <h4 className="font-medium">Interactúa constructivamente</h4>
                  <p className="text-xs">Responde y rebate con civilidad</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                <div>
                  <h4 className="font-medium">Vota por la mejor conclusión</h4>
                  <p className="text-xs">Ayuda a construir consensos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ⚖️ Normas de Debate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Argumentación:</h4>
              <ul className="space-y-1">
                <li>• Basar argumentos en evidencia</li>
                <li>• Citar fuentes confiables</li>
                <li>• Evitar falacias lógicas</li>
                <li>• Mantener relevancia al tema</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Comportamiento:</h4>
              <ul className="space-y-1">
                <li>• Respetar a todos los participantes</li>
                <li>• No usar lenguaje ofensivo</li>
                <li>• Escuchar otros puntos de vista</li>
                <li>• Buscar construcción de consenso</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debates;