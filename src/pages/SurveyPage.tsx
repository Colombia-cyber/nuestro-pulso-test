import React from 'react';

const SurveyPage: React.FC = () => {
  const surveys = [
    {
      id: 1,
      title: "Prioridades del Gobierno Nacional 2024",
      description: "¿Cuál debería ser la principal prioridad del gobierno este año?",
      participants: 2847,
      timeLeft: "5 días",
      category: "Política Nacional",
      options: [
        { text: "Economía y Empleo", votes: 1283, percentage: 45 },
        { text: "Seguridad Ciudadana", votes: 854, percentage: 30 },
        { text: "Educación", votes: 568, percentage: 20 },
        { text: "Salud Pública", votes: 142, percentage: 5 },
      ],
      status: "Activa"
    },
    {
      id: 2,
      title: "Transporte Público en Bogotá",
      description: "¿Cómo calificarías el sistema de transporte público actual?",
      participants: 1569,
      timeLeft: "3 días",
      category: "Transporte",
      options: [
        { text: "Excelente", votes: 78, percentage: 5 },
        { text: "Bueno", votes: 471, percentage: 30 },
        { text: "Regular", votes: 628, percentage: 40 },
        { text: "Malo", votes: 392, percentage: 25 },
      ],
      status: "Activa"
    },
    {
      id: 3,
      title: "Energías Renovables en Colombia",
      description: "¿Apoyarías una transición más rápida hacia energías renovables?",
      participants: 3241,
      timeLeft: "Finalizada",
      category: "Medio Ambiente",
      options: [
        { text: "Sí, completamente", votes: 2268, percentage: 70 },
        { text: "Sí, pero gradualmente", votes: 649, percentage: 20 },
        { text: "No estoy seguro", votes: 194, percentage: 6 },
        { text: "No, prefiero mantener actual", votes: 130, percentage: 4 },
      ],
      status: "Finalizada"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 Encuestas Cívicas</h1>
          <p className="text-xl text-gray-600">Tu opinión construye el futuro de Colombia</p>
        </div>

        {/* Survey Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
            <div className="text-gray-600">Encuestas Activas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15.2K</div>
            <div className="text-gray-600">Participaciones</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">234</div>
            <div className="text-gray-600">Completadas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">92%</div>
            <div className="text-gray-600">Tasa Participación</div>
          </div>
        </div>

        {/* Active Surveys */}
        <div className="space-y-8">
          {surveys.map((survey) => (
            <div key={survey.id} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      survey.status === 'Activa' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {survey.status}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {survey.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{survey.title}</h2>
                  <p className="text-gray-600 mb-4">{survey.description}</p>
                </div>
                <div className="lg:ml-8 lg:text-right">
                  <div className="text-lg font-semibold text-gray-800">{survey.participants.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">participantes</div>
                  <div className="text-sm text-purple-600 font-medium mt-1">{survey.timeLeft}</div>
                </div>
              </div>

              {/* Survey Results */}
              <div className="space-y-4 mb-6">
                {survey.options.map((option, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{option.votes.toLocaleString()} votos</span>
                        <span className="text-sm font-semibold text-gray-800">{option.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-purple-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {survey.status === 'Activa' ? (
                <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Participar en Encuesta
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                    Ver Resultados Completos
                  </button>
                  <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium">
                    Compartir Resultados
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create Survey Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Tienes una pregunta para Colombia?</h2>
            <p className="text-xl text-white mb-8 opacity-90">
              Crea tu propia encuesta y conoce la opinión de miles de ciudadanos
            </p>
            <button className="px-8 py-4 bg-white text-gray-800 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Crear Nueva Encuesta
            </button>
          </div>
        </div>

        {/* Survey Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Explora por Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Política", icon: "🏛️", count: 23, color: "purple" },
              { name: "Economía", icon: "💰", count: 18, color: "green" },
              { name: "Educación", icon: "📚", count: 15, color: "blue" },
              { name: "Salud", icon: "🏥", count: 12, color: "red" },
              { name: "Transporte", icon: "🚌", count: 9, color: "yellow" },
              { name: "Medio Ambiente", icon: "🌱", count: 14, color: "green" },
            ].map((category) => (
              <div key={category.name} className="bg-white rounded-xl shadow-lg p-4 text-center hover:transform hover:scale-105 transition-all cursor-pointer">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} encuestas</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;