import React from 'react';

const Congress: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            🏛️ Congreso de Colombia
          </h1>
          <p className="text-xl text-blue-700 mb-6">
            Seguimiento de la actividad legislativa en tiempo real
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-6">
            <p className="text-gray-700 text-lg">
              Mantente informado sobre las últimas actividades del Congreso de la República de Colombia, 
              incluyendo proyectos de ley, debates legislativos y decisiones que afectan al país.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📋 Proyectos de Ley
            </h3>
            <p className="text-gray-600 mb-4">
              Sigue los proyectos de ley en trámite y su estado actual
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Vista detallada de proyectos legislativos
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🗣️ Debates en Vivo
            </h3>
            <p className="text-gray-600 mb-4">
              Debates y sesiones del Congreso en tiempo real
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Transmisiones en vivo y transcripciones
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👥 Representantes
            </h3>
            <p className="text-gray-600 mb-4">
              Información sobre senadores y representantes
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Perfiles y votaciones de congresistas
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📊 Estadísticas
            </h3>
            <p className="text-gray-600 mb-4">
              Análisis y métricas de la actividad legislativa
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Dashboard con métricas del Congreso
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 ¿Qué encontrarás aquí próximamente?
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Seguimiento en tiempo real de proyectos de ley</li>
            <li>• Transcripciones y videos de debates importantes</li>
            <li>• Perfiles detallados de congresistas y su historial de votación</li>
            <li>• Análisis de tendencias legislativas</li>
            <li>• Calendarios de sesiones y comisiones</li>
            <li>• Alertas personalizadas sobre temas de tu interés</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Congress;