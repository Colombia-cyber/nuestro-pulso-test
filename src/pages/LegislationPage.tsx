import React from 'react';
import { FiFileText, FiCalendar, FiUsers, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const LegislationPage: React.FC = () => {
  const activeBills = [
    {
      id: 1,
      title: "Proyecto de Ley de Participación Ciudadana Digital",
      number: "PL 245/2024",
      stage: "Segundo Debate",
      status: "en_debate",
      author: "Senador Carlos López",
      date: "2024-01-15",
      summary: "Establece mecanismos digitales para la participación ciudadana en decisiones de gobierno"
    },
    {
      id: 2,
      title: "Reforma a la Ley de Transparencia y Acceso a la Información",
      number: "PL 189/2024",
      stage: "Primer Debate",
      status: "en_debate",
      author: "Representante María González",
      date: "2024-02-10",
      summary: "Moderniza los procesos de acceso a información pública y rendición de cuentas"
    },
    {
      id: 3,
      title: "Ley de Educación Cívica Obligatoria",
      number: "PL 167/2024",
      stage: "Comisión Primera",
      status: "en_comision",
      author: "Senadora Ana Martínez",
      date: "2024-03-05",
      summary: "Implementa educación cívica como materia obligatoria en todos los niveles educativos"
    }
  ];

  const recentlyPassed = [
    {
      id: 4,
      title: "Ley de Modernización del Sistema Electoral",
      number: "Ley 2189/2024",
      status: "aprobada",
      date: "2024-11-20",
      summary: "Introduce mejoras tecnológicas y de transparencia en procesos electorales"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_debate': return 'text-yellow-600 bg-yellow-100';
      case 'en_comision': return 'text-blue-600 bg-blue-100';
      case 'aprobada': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_debate': return <FiClock size={16} />;
      case 'en_comision': return <FiAlertCircle size={16} />;
      case 'aprobada': return <FiCheckCircle size={16} />;
      default: return <FiFileText size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📜 Seguimiento Legislativo
          </h1>
          <p className="text-xl text-gray-600">
            Monitorea el progreso de proyectos de ley y participa en el proceso legislativo
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="text-sm text-gray-600">Proyectos Activos</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">8</div>
            <div className="text-sm text-gray-600">En Debate</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Aprobados 2024</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Ciudadanos Participando</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Active Bills */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Proyectos de Ley Activos</h2>
              <div className="space-y-6">
                {activeBills.map((bill) => (
                  <div key={bill.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-gray-500">{bill.number}</span>
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
                            {getStatusIcon(bill.status)}
                            <span>{bill.stage}</span>
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {bill.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {bill.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FiUsers size={14} />
                            <span>{bill.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiCalendar size={14} />
                            <span>{new Date(bill.date).toLocaleDateString('es-CO')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Ver Detalles Completos
                      </button>
                      <div className="flex space-x-2">
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200">
                          👍 A Favor
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200">
                          👎 En Contra
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Passed */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recientemente Aprobados</h2>
              <div className="space-y-6">
                {recentlyPassed.map((bill) => (
                  <div key={bill.id} className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">{bill.number}</span>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
                        {getStatusIcon(bill.status)}
                        <span>Aprobada</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {bill.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {bill.summary}
                    </p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <FiCalendar size={14} />
                      <span>Aprobada el {new Date(bill.date).toLocaleDateString('es-CO')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Legislative Process */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📋 Proceso Legislativo
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Radicación</div>
                    <div className="text-gray-600">Presentación del proyecto</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Comisión</div>
                    <div className="text-gray-600">Estudio en comisión</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Primer Debate</div>
                    <div className="text-gray-600">Discusión en plenaria</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Segundo Debate</div>
                    <div className="text-gray-600">Votación final</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Sanción</div>
                    <div className="text-gray-600">Firma presidencial</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participation Tools */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                🗳️ Participa
              </h3>
              <p className="mb-4 text-purple-100">
                Tu opinión cuenta en el proceso legislativo
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Enviar Comentarios
                </button>
                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition-colors">
                  Ver Calendario Legislativo
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🏷️ Categorías
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Participación Ciudadana</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Transparencia</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Educación</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Salud</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Economía</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegislationPage;