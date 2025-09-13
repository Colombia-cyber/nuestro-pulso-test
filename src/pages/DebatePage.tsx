import React from 'react';

const DebatePage: React.FC = () => {
  const debates = [
    {
      id: 1,
      title: "Reforma de Salud: ¿Beneficio o Retroceso?",
      description: "Análisis de las implicaciones de la nueva propuesta de reforma al sistema de salud colombiano.",
      participants: 127,
      status: "Activo",
      category: "Política",
      timeLeft: "2h 30m",
      moderator: "Dr. Andrea López",
    },
    {
      id: 2,
      title: "Educación Pública: Inversión vs. Privatización",
      description: "Debate sobre el futuro de la educación pública en Colombia y las alternativas de financiación.",
      participants: 89,
      status: "Próximo",
      category: "Educación",
      timeLeft: "4h 15m",
      moderator: "Prof. Miguel Rodríguez",
    },
    {
      id: 3,
      title: "Transición Energética: Retos y Oportunidades",
      description: "Discusión sobre la transición hacia energías renovables y su impacto en la economía nacional.",
      participants: 156,
      status: "Activo",
      category: "Medio Ambiente",
      timeLeft: "1h 45m",
      moderator: "Ing. Carolina Vásquez",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🗣️ Debates Cívicos</h1>
          <p className="text-xl text-gray-600">Participa en discusiones estructuradas sobre el futuro de Colombia</p>
        </div>

        {/* Active Debates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {debates.map((debate) => (
            <div key={debate.id} className="bg-white rounded-2xl shadow-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  debate.status === 'Activo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {debate.status}
                </span>
                <span className="text-sm text-gray-500">{debate.timeLeft} restantes</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {debate.title}
              </h3>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {debate.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Moderador:</span>
                  <span className="font-semibold text-gray-800">{debate.moderator}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Participantes:</span>
                  <span className="font-semibold text-gray-800">{debate.participants}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Categoría:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-gray-800 font-medium">
                    {debate.category}
                  </span>
                </div>
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                debate.status === 'Activo'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                {debate.status === 'Activo' ? 'Unirse al Debate' : 'Programar Recordatorio'}
              </button>
            </div>
          ))}
        </div>

        {/* Debate Rules & Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📋 Reglas del Debate
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <p className="text-gray-700">Mantén el respeto y la cortesía en todo momento</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <p className="text-gray-700">Fundamenta tus argumentos con datos y fuentes confiables</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <p className="text-gray-700">Escucha las opiniones contrarias con mente abierta</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <p className="text-gray-700">Evita ataques personales o descalificaciones</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <p className="text-gray-700">Contribuye de manera constructiva al diálogo</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🎯 Próximos Debates
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-gray-800 mb-1">Seguridad Ciudadana</h4>
                <p className="text-sm text-gray-600 mb-2">Estrategias para reducir la criminalidad urbana</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-700">Mañana 7:00 PM</span>
                  <span className="text-yellow-700">85 interesados</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-gray-800 mb-1">Corrupción y Transparencia</h4>
                <p className="text-sm text-gray-600 mb-2">Mecanismos para fortalecer la transparencia pública</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-700">Viernes 8:00 PM</span>
                  <span className="text-purple-700">142 interesados</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-gray-800 mb-1">Desarrollo Rural</h4>
                <p className="text-sm text-gray-600 mb-2">Oportunidades para el campo colombiano</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700">Sábado 6:00 PM</span>
                  <span className="text-green-700">98 interesados</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Proponer Nuevo Debate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebatePage;