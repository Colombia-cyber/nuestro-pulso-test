import React from 'react';

const ElectionHub: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🗳️ Centro Electoral</h1>
          <p className="text-white/90">Información electoral, candidatos y proceso democrático</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📅 Próximas Elecciones</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Elecciones Regionales 2024</h4>
                <p className="text-sm text-gray-600">Alcaldes y Gobernadores</p>
                <p className="text-sm text-blue-600">27 de octubre, 2024</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Consultas Populares</h4>
                <p className="text-sm text-gray-600">Decisiones locales importantes</p>
                <p className="text-sm text-green-600">Varias fechas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">🏛️ Candidatos Registrados</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <h4 className="font-semibold">María González</h4>
                  <p className="text-sm text-gray-600">Alcaldía de Bogotá</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Ver propuestas</button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <h4 className="font-semibold">Carlos Ramírez</h4>
                  <p className="text-sm text-gray-600">Gobernación Antioquia</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Ver propuestas</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📋 Guía Electoral</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ Cómo registrarse para votar</li>
              <li>📍 Ubicación de puestos de votación</li>
              <li>🆔 Documentos necesarios</li>
              <li>⏰ Horarios de votación</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📊 Transparencia Electoral</h3>
            <ul className="space-y-2 text-sm">
              <li>💰 Financiación de campañas</li>
              <li>📈 Encuestas y tendencias</li>
              <li>🔍 Monitoreo de medios</li>
              <li>⚖️ Denuncias y reclamos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionHub;