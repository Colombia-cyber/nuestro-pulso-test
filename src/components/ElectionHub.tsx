import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ElectionHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const liveUpdates = [
    {
      id: 1,
      timestamp: '2024-03-15 14:30',
      type: 'poll',
      content: 'Nueva encuesta: María González lidera con 34% en Bogotá',
      importance: 'high'
    },
    {
      id: 2,
      timestamp: '2024-03-15 13:45',
      type: 'candidate',
      content: 'Carlos Ramírez registra oficialmente su candidatura para Antioquia',
      importance: 'medium'
    },
    {
      id: 3,
      timestamp: '2024-03-15 12:20',
      type: 'alert',
      content: 'Recordatorio: Último día para actualizar datos en el censo electoral',
      importance: 'high'
    }
  ];

  const polls = [
    {
      candidate: 'María González',
      party: 'Coalición Verde',
      percentage: 34,
      change: '+2',
      color: 'green'
    },
    {
      candidate: 'Carlos Ramírez',
      party: 'Partido Liberal',
      percentage: 29,
      change: '-1',
      color: 'blue'
    },
    {
      candidate: 'Ana López',
      party: 'Centro Democrático',
      percentage: 25,
      change: '+1',
      color: 'orange'
    },
    {
      candidate: 'Indeciso/Otros',
      party: '',
      percentage: 12,
      change: '-2',
      color: 'gray'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🗳️ Centro Electoral en Vivo</h1>
          <p className="text-white/90">Información electoral, candidatos y proceso democrático en tiempo real</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Actualizaciones en vivo
            </span>
            <span>📊 15 encuestas activas</span>
            <span>🗓️ 3 elecciones próximas</span>
            <span>👥 2.4M votantes registrados</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-lg shadow-lg">
          <div className="flex border-b">
            {[
              { id: 'overview', label: '📊 Resumen', icon: '📊' },
              { id: 'polls', label: '📈 Encuestas', icon: '📈' },
              { id: 'candidates', label: '👤 Candidatos', icon: '👤' },
              { id: 'guide', label: '📋 Guía Electoral', icon: '📋' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 font-medium ${
                  selectedTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Live Updates */}
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🔴 Actualizaciones en Vivo</h3>
                <div className="space-y-3">
                  {liveUpdates.map(update => (
                    <div key={update.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`w-2 h-2 rounded-full ${
                          update.importance === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></span>
                        <span className="text-sm text-gray-800">{update.content}</span>
                      </div>
                      <span className="text-xs text-gray-500">{update.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">27</div>
                  <div className="text-sm text-blue-800">Días hasta elecciones</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2.4M</div>
                  <div className="text-sm text-green-800">Votantes registrados</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-purple-800">Candidatos registrados</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">89%</div>
                  <div className="text-sm text-orange-800">Participación estimada</div>
                </div>
              </div>

              {/* Featured Elections */}
              <div>
                <h3 className="text-xl font-semibold mb-4">🗳️ Próximas Elecciones</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-blue-900">Elecciones Regionales 2024</h4>
                    <p className="text-sm text-blue-700">Alcaldes y Gobernadores - 27 de octubre, 2024</p>
                    <div className="mt-2 flex space-x-4">
                      <button 
                        onClick={() => setSelectedTab('candidates')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver candidatos →
                      </button>
                      <button 
                        onClick={() => setSelectedTab('guide')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Guía para votar →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'polls' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">📈 Encuestas y Tendencias</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">Intención de Voto - Alcaldía de Bogotá</h4>
                  <div className="space-y-3">
                    {polls.map((candidate, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full bg-${candidate.color}-500`}></div>
                          <div>
                            <span className="font-medium">{candidate.candidate}</span>
                            {candidate.party && (
                              <span className="text-sm text-gray-600 ml-2">({candidate.party})</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">{candidate.percentage}%</span>
                          <span className={`text-sm ${
                            candidate.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {candidate.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Última actualización: 15 de marzo, 2024 | Margen de error: ±3.2%
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'candidates' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">👤 Candidatos Registrados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      MG
                    </div>
                    <div>
                      <h4 className="font-semibold">María González</h4>
                      <p className="text-sm text-gray-600">Coalición Verde - Alcaldía de Bogotá</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Propuestas: Transporte sostenible, espacios verdes, transparencia gubernamental
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Ver propuestas</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Seguir campaña</button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      CR
                    </div>
                    <div>
                      <h4 className="font-semibold">Carlos Ramírez</h4>
                      <p className="text-sm text-gray-600">Partido Liberal - Gobernación Antioquia</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Propuestas: Desarrollo económico, seguridad ciudadana, educación de calidad
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Ver propuestas</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Seguir campaña</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'guide' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">📋 Guía Electoral Completa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">✅ Antes de votar</h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• Verificar registro electoral</li>
                      <li>• Conocer ubicación de mesa de votación</li>
                      <li>• Tener cédula al día</li>
                      <li>• Informarse sobre candidatos</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">📍 El día de la elección</h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• Horario: 8:00 AM - 4:00 PM</li>
                      <li>• Llevar solo la cédula</li>
                      <li>• Seguir protocolos de bioseguridad</li>
                      <li>• Voto secreto y libre</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">⚖️ Transparencia</h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• Monitoreo de financiación</li>
                      <li>• Reportes de irregularidades</li>
                      <li>• Veeduría ciudadana</li>
                      <li>• Resultados en tiempo real</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-800">📞 Contactos útiles</h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• CNE: 01 8000 123 456</li>
                      <li>• Registraduría: 01 8000 654 321</li>
                      <li>• Denuncias: denuncia@cne.gov.co</li>
                      <li>• App móvil: "Mi Voto Cuenta"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionHub;