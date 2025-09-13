import React from 'react';
import { FiBarChart, FiMap, FiTrendingUp, FiUsers, FiTarget, FiClock } from 'react-icons/fi';

const PollsModule: React.FC = () => {
  const currentPolls = [
    { 
      title: '¿Apoya usted la Reforma Pensional propuesta?', 
      responses: 15847, 
      timeLeft: '2 días',
      results: { si: 34, no: 45, indeciso: 21 }
    },
    { 
      title: '¿Cómo califica la gestión del gobierno local?', 
      responses: 8923, 
      timeLeft: '5 días',
      results: { excelente: 12, buena: 28, regular: 35, mala: 25 }
    },
    { 
      title: 'Prioridad en inversión pública para su municipio', 
      responses: 23156, 
      timeLeft: '1 semana',
      results: { educacion: 35, salud: 28, infraestructura: 22, seguridad: 15 }
    }
  ];

  const regionalStats = [
    { region: 'Bogotá D.C.', participation: 78, population: '8.2M' },
    { region: 'Antioquia', participation: 72, population: '6.8M' },
    { region: 'Valle del Cauca', participation: 69, population: '4.6M' },
    { region: 'Cundinamarca', participation: 65, population: '3.2M' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-green-50 px-6 py-3 rounded-full mb-4">
          <FiBarChart className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-900">Encuestas & Sondeos</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pulso ciudadano en tiempo real sobre decisiones importantes que afectan a Colombia
        </p>
      </div>

      {/* National Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Participación Nacional</p>
              <p className="text-2xl font-bold text-gray-800">67.3%</p>
            </div>
            <FiTarget className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Votos Esta Semana</p>
              <p className="text-2xl font-bold text-gray-800">247K</p>
            </div>
            <FiUsers className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Encuestas Activas</p>
              <p className="text-2xl font-bold text-gray-800">23</p>
            </div>
            <FiBarChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Precisión Predictiva</p>
              <p className="text-2xl font-bold text-gray-800">94.2%</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Polls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiBarChart className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Encuestas Activas</h2>
          </div>
          <div className="space-y-6">
            {currentPolls.map((poll, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm leading-relaxed">{poll.title}</h3>
                  <div className="flex items-center space-x-1 text-orange-600">
                    <FiClock className="w-4 h-4" />
                    <span className="text-xs font-medium">{poll.timeLeft}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Participación</span>
                    <span>{poll.responses.toLocaleString()} votos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {Object.entries(poll.results).map(([option, percentage]) => (
                    <span key={option} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {option}: {percentage}%
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Ver Todas las Encuestas
          </button>
        </div>

        {/* Regional Participation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiMap className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Participación Regional</h2>
          </div>
          <div className="space-y-4">
            {regionalStats.map((region, index) => (
              <div key={index} className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{region.region}</h3>
                  <span className="text-sm text-gray-600">{region.population}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Participación</span>
                      <span>{region.participation}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${region.participation}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Ver Mapa Interactivo
          </button>
        </div>
      </div>

      {/* Create Poll CTA */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">¿Tienes una pregunta para Colombia?</h2>
        <p className="mb-6 opacity-90">
          Crea tu propia encuesta y conoce la opinión de los ciudadanos sobre temas importantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiBarChart className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Encuesta Nacional</p>
            <p className="text-sm opacity-80">Alcance de 50M+ personas</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiMap className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Sondeo Regional</p>
            <p className="text-sm opacity-80">Enfoque local/municipal</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiUsers className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Encuesta Demográfica</p>
            <p className="text-sm opacity-80">Segmentación específica</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollsModule;