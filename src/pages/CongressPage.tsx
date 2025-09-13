import React from 'react';
import { FiUsers, FiMapPin, FiCalendar, FiClock, FiTrendingUp, FiFileText } from 'react-icons/fi';

const CongressPage: React.FC = () => {
  const congressMembers = [
    {
      id: 1,
      name: "Senador Carlos López",
      party: "Partido Liberal",
      region: "Bogotá D.C.",
      activity: 95,
      bills: 12,
      attendance: 98,
      image: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=CL"
    },
    {
      id: 2,
      name: "Representante María González",
      party: "Partido Conservador",
      region: "Antioquia",
      activity: 87,
      bills: 8,
      attendance: 94,
      image: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=MG"
    },
    {
      id: 3,
      name: "Senadora Ana Martínez",
      party: "Centro Democrático",
      region: "Valle del Cauca",
      activity: 92,
      bills: 15,
      attendance: 96,
      image: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=AM"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "bill",
      title: "Proyecto de Ley de Participación Digital",
      member: "Sen. Carlos López",
      time: "Hace 2 horas",
      status: "Presentado"
    },
    {
      id: 2,
      type: "vote",
      title: "Votación - Reforma Tributaria",
      member: "Rep. María González",
      time: "Hace 4 horas",
      status: "A favor"
    },
    {
      id: 3,
      type: "debate",
      title: "Debate sobre Educación Nacional",
      member: "Sen. Ana Martínez",
      time: "Hace 1 día",
      status: "Participó"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Sesión Plenaria - Senado",
      date: "2024-12-15",
      time: "10:00 AM",
      topics: ["Reforma Pensional", "Ley de Participación Ciudadana"],
      type: "Senado"
    },
    {
      id: 2,
      title: "Comisión Primera - Cámara",
      date: "2024-12-16",
      time: "2:00 PM",
      topics: ["Presupuesto Nacional 2025"],
      type: "Cámara"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏛️ Monitor del Congreso
          </h1>
          <p className="text-xl text-gray-600">
            Sigue la actividad de tus representantes en el Congreso de la República
          </p>
        </div>

        {/* Congress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">278</div>
            <div className="text-sm text-gray-600">Total Congresistas</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">45</div>
            <div className="text-sm text-gray-600">Proyectos Activos</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Asistencia Promedio</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Sesiones Este Año</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Congress Members */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Congresistas Destacados</h2>
              <div className="space-y-6">
                {congressMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{member.party}</span>
                          <div className="flex items-center space-x-1">
                            <FiMapPin size={14} />
                            <span>{member.region}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Índice de Actividad</div>
                        <div className="text-2xl font-bold text-blue-600">{member.activity}%</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.bills}</div>
                        <div className="text-sm text-gray-600">Proyectos de Ley</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.attendance}%</div>
                        <div className="text-sm text-gray-600">Asistencia</div>
                      </div>
                      <div className="text-center">
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          Ver Perfil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {activity.type === 'bill' && <FiFileText className="text-blue-600" />}
                        {activity.type === 'vote' && <FiTrendingUp className="text-green-600" />}
                        {activity.type === 'debate' && <FiUsers className="text-purple-600" />}
                        <span className="font-medium text-gray-900">{activity.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{activity.member}</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FiCalendar />
                <span>Próximas Sesiones</span>
              </h3>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">{session.title}</div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <FiCalendar size={14} />
                      <span>{new Date(session.date).toLocaleDateString('es-CO')}</span>
                      <FiClock size={14} className="ml-2" />
                      <span>{session.time}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Temas:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {session.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                      Ver Agenda Completa
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">
                📞 Contacta a tu Congresista
              </h3>
              <p className="mb-4 text-green-100">
                Haz escuchar tu voz directamente a tus representantes
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Enviar Mensaje
                </button>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors">
                  Buscar por Región
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📊 Métricas de Rendimiento
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Asistencia General</span>
                    <span className="text-sm font-semibold">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Proyectos Aprobados</span>
                    <span className="text-sm font-semibold">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Participación en Debates</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongressPage;