import React from 'react';

const Elections: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-4 flex items-center gap-3">
            📈 Centro Electoral
          </h1>
          <p className="text-xl text-green-700 mb-6">
            Información electoral actualizada y análisis de candidatos
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-6">
            <p className="text-gray-700 text-lg">
              Tu fuente confiable para información electoral en Colombia. Conoce a los candidatos, 
              sus propuestas y mantente informado sobre el proceso democrático.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🗳️ Próximas Elecciones
            </h3>
            <p className="text-gray-600 mb-4">
              Calendario electoral y fechas importantes
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Calendario electoral interactivo
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👥 Candidatos
            </h3>
            <p className="text-gray-600 mb-4">
              Perfiles y propuestas de candidatos
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Base de datos de candidatos
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📊 Encuestas
            </h3>
            <p className="text-gray-600 mb-4">
              Últimas encuestas y tendencias electorales
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Agregador de encuestas electorales
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📍 Información Local
            </h3>
            <p className="text-gray-600 mb-4">
              Elecciones regionales y locales
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                🚧 Próximamente: Información electoral por región
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              ⚖️ Proceso Electoral
            </h3>
            <ul className="text-blue-700 space-y-2 text-sm">
              <li>• Registro electoral y requisitos para votar</li>
              <li>• Ubicación de puestos de votación</li>
              <li>• Procedimientos y documentos necesarios</li>
              <li>• Derechos y deberes ciudadanos</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
              📈 Análisis Electoral
            </h3>
            <ul className="text-purple-700 space-y-2 text-sm">
              <li>• Tendencias históricas de votación</li>
              <li>• Análisis demográfico del electorado</li>
              <li>• Proyecciones y modelos predictivos</li>
              <li>• Comparación entre elecciones</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            🎯 Funcionalidades en Desarrollo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
            <div>
              <h4 className="font-medium mb-2">Información de Candidatos:</h4>
              <ul className="text-sm space-y-1">
                <li>• Biografías detalladas</li>
                <li>• Propuestas de gobierno</li>
                <li>• Historial político</li>
                <li>• Financiación de campañas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Herramientas Interactivas:</h4>
              <ul className="text-sm space-y-1">
                <li>• Comparador de propuestas</li>
                <li>• Test de afinidad política</li>
                <li>• Simulador electoral</li>
                <li>• Alertas personalizadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elections;