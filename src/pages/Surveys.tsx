import React from 'react';

const Surveys: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
            📊 Encuestas Cívicas
          </h1>
          <p className="text-xl text-indigo-700 mb-6">
            Comparte tu opinión en encuestas sobre temas de actualidad y política nacional
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-6">
            <p className="text-gray-700 text-lg">
              Tu voz importa. Participa en encuestas que ayudan a entender la opinión 
              ciudadana sobre los temas más relevantes para Colombia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Encuesta 1 - Seguridad Nacional */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                    🛡️ SEGURIDAD
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                    🔥 TRENDING
                  </span>
                </div>
                <span className="text-xs text-gray-500">Activa • 2 días restantes</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Prioridades de Seguridad Nacional 2024
              </h3>
              
              <h4 className="text-md text-gray-700 mb-4">
                ¿Cuál debe ser la principal prioridad en seguridad para Colombia en 2024?
              </h4>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Combate al narcotráfico</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Seguridad ciudadana urbana</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '32%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">32%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Protección de líderes sociales</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">15%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Ciberseguridad nacional</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '8%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">8%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>👥 48,810 votos</span>
                  <span>📍 Nacional</span>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Votar Ahora
                </button>
              </div>
            </div>

            {/* Encuesta 2 - Educación */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    📚 EDUCACIÓN
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    ✨ NUEVA
                  </span>
                </div>
                <span className="text-xs text-gray-500">Activa • 5 días restantes</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Reforma Educativa - Opinión Ciudadana
              </h3>
              
              <h4 className="text-md text-gray-700 mb-4">
                ¿Qué aspecto de la educación necesita reforma urgente?
              </h4>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Calidad de la educación pública</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '52%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">52%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Acceso a educación superior</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">28%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Infraestructura escolar</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">12%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">Tecnología en aulas</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '8%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">8%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>👥 23,145 votos</span>
                  <span>📍 Nacional</span>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Votar Ahora
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📈 Estadísticas
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">72,955</div>
                  <p className="text-sm text-gray-600">Votos esta semana</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">15</div>
                  <p className="text-sm text-gray-600">Encuestas activas</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">8,420</div>
                  <p className="text-sm text-gray-600">Participantes únicos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🔥 Trending Topics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#ReformaPensional</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                    +245%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#SeguridadCiudadana</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                    +180%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#EducaciónGratuita</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    +156%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#SaludPública</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    +123%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                💡 Propón una Encuesta
              </h4>
              <p className="text-indigo-700 text-sm mb-3">
                ¿Tienes una pregunta importante para la ciudadanía?
              </p>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                Crear Encuesta
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🎯 Próximas Funcionalidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Encuestas Avanzadas:</h4>
              <ul className="space-y-1">
                <li>• Encuestas georreferenciadas</li>
                <li>• Filtros demográficos</li>
                <li>• Encuestas con múltiples rondas</li>
                <li>• Análisis predictivo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Participación:</h4>
              <ul className="space-y-1">
                <li>• Sistema de recompensas</li>
                <li>• Rankings de participación</li>
                <li>• Notificaciones personalizadas</li>
                <li>• Exportación de resultados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;