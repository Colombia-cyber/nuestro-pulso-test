import React, { useState } from 'react';

const CongressTracker: React.FC = () => {
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('bills');

  const bills = [
    { 
      id: 1, 
      name: 'Ley de Transparencia Electoral', 
      status: 'En Senado', 
      votes: { favor: 45, contra: 12 },
      description: 'Reforma integral al sistema electoral colombiano para garantizar mayor transparencia en campañas y financiación política.',
      committee: 'Comisión Primera Constitucional',
      author: 'Sen. María Fernanda Cabal',
      stage: 'Segundo debate',
      nextSession: '2024-09-20',
      fullText: `Proyecto de ley que busca modernizar el sistema electoral colombiano mediante la implementación de nuevas tecnologías y mecanismos de control.

La ley establece la obligatoriedad de reportar en tiempo real todos los aportes de campaña superiores a 1 millón de pesos, creando una plataforma digital pública donde los ciudadanos puedan consultar esta información.

También propone la creación de un tribunal electoral especializado y la implementación de auditorías aleatorias a procesos electorales en todos los niveles.

El proyecto incluye sanciones severas para quienes incumplan las normas de transparencia, incluyendo inhabilidades de hasta 15 años para ejercer cargos públicos.`
    },
    { 
      id: 2, 
      name: 'Reforma al Sistema de Salud', 
      status: 'Comisión VII', 
      votes: { favor: 8, contra: 3 },
      description: 'Modernización del sistema de salud con enfoque preventivo y universal.',
      committee: 'Comisión Séptima',
      author: 'Sen. Gustavo Bolívar',
      stage: 'Primer debate',
      nextSession: '2024-09-18',
      fullText: `Reforma integral al sistema de salud que busca garantizar atención universal y de calidad para todos los colombianos.

La propuesta elimina las barreras de acceso económico estableciendo un sistema único público que integre todos los niveles de atención.

Se crean 500 nuevos centros de atención primaria en zonas rurales y urbanas marginales, con inversión de 5 billones de pesos en los próximos 4 años.

La reforma incluye programas especiales de medicina preventiva, telemedicina y fortalecimiento de la red hospitalaria pública en todo el territorio nacional.`
    },
    { 
      id: 3, 
      name: 'Ley de Protección Ambiental', 
      status: 'Primer Debate', 
      votes: { favor: 67, contra: 23 },
      description: 'Marco legal para la protección de ecosistemas y biodiversidad colombiana.',
      committee: 'Comisión Quinta',
      author: 'Sen. Angélica Lozano',
      stage: 'Primer debate',
      nextSession: '2024-09-25',
      fullText: `Ley marco que establece nuevos mecanismos de protección ambiental y conservación de la biodiversidad en Colombia.

La norma crea el Sistema Nacional de Áreas Protegidas Comunitarias, reconociendo los derechos territoriales de comunidades indígenas y afrodescendientes.

Se establece un fondo de 3 billones de pesos para restauración ecológica y proyectos de conservación, financiado con impuestos a actividades extractivas.

La ley también prohíbe el fracking y establece una moratoria de 10 años para nuevos proyectos de minería a gran escala en páramos y fuentes hídricas.`
    },
    {
      id: 4,
      name: 'Ley de Educación Digital',
      status: 'Radicado',
      votes: { favor: 0, contra: 0 },
      description: 'Modernización educativa con tecnología e innovación pedagógica.',
      committee: 'Comisión Sexta',
      author: 'Sen. Catherine Juvinao',
      stage: 'Radicación',
      nextSession: '2024-10-01',
      fullText: `Proyecto que busca revolucionar la educación colombiana mediante la integración de tecnologías digitales y metodologías innovadoras.

La propuesta incluye la dotación de tablets y conectividad gratuita para 2 millones de estudiantes de colegios públicos en todo el país.

Se crean 50 centros de excelencia educativa en las principales ciudades, con laboratorios de robótica, programación y biotecnología.

La ley establece la certificación digital obligatoria para docentes y un nuevo currículo que incluye programación, inteligencia artificial y emprendimiento desde primaria.`
    }
  ];

  const congressMembers = [
    { name: 'María Fernanda Cabal', party: 'Centro Democrático', chamber: 'Senado', attendance: 98, bills: 12, votes: 234 },
    { name: 'Gustavo Bolívar', party: 'Pacto Histórico', chamber: 'Senado', attendance: 95, bills: 8, votes: 289 },
    { name: 'Catherine Juvinao', party: 'Alianza Verde', chamber: 'Senado', attendance: 97, bills: 15, votes: 267 },
    { name: 'Carlos Fernando Motoa', party: 'Partido Liberal', chamber: 'Cámara', attendance: 92, bills: 6, votes: 198 },
    { name: 'Juanita Goebertus', party: 'Alianza Verde', chamber: 'Cámara', attendance: 99, bills: 18, votes: 301 },
    { name: 'Edward Rodríguez', party: 'Cambio Radical', chamber: 'Cámara', attendance: 88, bills: 4, votes: 156 }
  ];

  const committees = [
    { name: 'Comisión Primera Constitucional', members: 19, activeBills: 8, nextSession: '2024-09-17 14:00' },
    { name: 'Comisión Segunda', members: 15, activeBills: 12, nextSession: '2024-09-18 09:00' },
    { name: 'Comisión Quinta', members: 17, activeBills: 6, nextSession: '2024-09-19 15:30' },
    { name: 'Comisión Séptima', members: 13, activeBills: 9, nextSession: '2024-09-20 10:00' }
  ];

  if (selectedBill) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <button 
            onClick={() => setSelectedBill(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          >
            ← Volver al Congreso
          </button>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedBill.name}</h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{selectedBill.status}</span>
                <span>📋 {selectedBill.committee}</span>
                <span>👤 {selectedBill.author}</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Proyecto</h2>
                  <p className="text-gray-700 mb-6 text-lg">{selectedBill.description}</p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Texto Completo</h3>
                  <div className="prose max-w-none">
                    {selectedBill.fullText.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Estado del Proyecto</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Etapa actual:</span>
                        <span className="font-medium">{selectedBill.stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Próxima sesión:</span>
                        <span className="font-medium">{selectedBill.nextSession}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comisión:</span>
                        <span className="font-medium text-sm">{selectedBill.committee}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedBill.votes.favor > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Votaciones</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-green-600">✅ A favor</span>
                          <span className="font-bold text-green-600">{selectedBill.votes.favor}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-600">❌ En contra</span>
                          <span className="font-bold text-red-600">{selectedBill.votes.contra}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{
                              width: `${(selectedBill.votes.favor / (selectedBill.votes.favor + selectedBill.votes.contra)) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🏛️ Seguimiento al Congreso</h1>
          <p className="text-white/90">Monitoreo en tiempo real de la actividad legislativa colombiana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>📊 {bills.length} proyectos activos</span>
            <span>👥 {congressMembers.length} congresistas destacados</span>
            <span>🔄 Actualizado cada hora</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'bills', name: 'Proyectos de Ley', icon: '📋' },
                { id: 'members', name: 'Congresistas', icon: '👥' },
                { id: 'committees', name: 'Comisiones', icon: '🏛️' },
                { id: 'stats', name: 'Estadísticas', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'bills' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Proyectos de Ley en Curso</h3>
            <div className="space-y-4">
              {bills.map((bill) => (
                <div key={bill.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">{bill.name}</h4>
                      <p className="text-gray-600 mb-3">{bill.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📋 {bill.committee}</span>
                        <span>👤 {bill.author}</span>
                        <span>📅 {bill.nextSession}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm whitespace-nowrap ml-4">
                      {bill.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      {bill.votes.favor > 0 && (
                        <>
                          <span className="text-green-600">✅ A favor: {bill.votes.favor}</span>
                          <span className="text-red-600">❌ En contra: {bill.votes.contra}</span>
                        </>
                      )}
                    </div>
                    <button 
                      onClick={() => setSelectedBill(bill)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver detalles →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Congresistas Destacados</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Congresista</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Partido</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Cámara</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Asistencia</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Proyectos</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Votaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {congressMembers.map((member, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{member.name}</td>
                      <td className="py-4 px-4 text-gray-600">{member.party}</td>
                      <td className="py-4 px-4 text-gray-600">{member.chamber}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                          member.attendance >= 95 ? 'bg-green-100 text-green-800' :
                          member.attendance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {member.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-medium">{member.bills}</td>
                      <td className="py-4 px-4 text-center font-medium">{member.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'committees' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{committee.name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Miembros:</span>
                    <span className="font-medium">{committee.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proyectos activos:</span>
                    <span className="font-medium">{committee.activeBills}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Próxima sesión:</span>
                    <span className="font-medium text-sm">{committee.nextSession}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Estadísticas Generales</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Proyectos activos:</span>
                  <span className="font-bold text-blue-600">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Leyes aprobadas (2024):</span>
                  <span className="font-bold text-green-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span>En debate:</span>
                  <span className="font-bold text-orange-600">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Archivados:</span>
                  <span className="font-bold text-red-600">8</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Próximas Sesiones</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="font-medium">Plenaria Senado</div>
                  <div className="text-gray-600">Sep 17, 9:00 AM</div>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="font-medium">Comisión Primera</div>
                  <div className="text-gray-600">Sep 18, 2:00 PM</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <div className="font-medium">Plenaria Cámara</div>
                  <div className="text-gray-600">Sep 19, 10:00 AM</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Top Congresistas</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Mayor participación</span>
                  <span className="font-medium text-green-600">J. Goebertus (99%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Más proyectos</span>
                  <span className="font-medium text-blue-600">J. Goebertus (18)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Más votaciones</span>
                  <span className="font-medium text-purple-600">J. Goebertus (301)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CongressTracker;