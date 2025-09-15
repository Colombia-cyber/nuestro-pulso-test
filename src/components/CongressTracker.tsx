import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CongressTracker: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bills');
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const bills = [
    {
      id: 1,
      name: 'Reforma al Sistema Pensional',
      fullName: 'Proyecto de Ley 001 de 2024 - Por medio de la cual se reforma el Sistema General de Pensiones',
      status: 'Primer Debate Senado',
      votes: { favor: 52, contra: 26, abstenciones: 4 },
      summary: 'Establece pensión básica universal de $500,000 mensuales para adultos mayores de 65 años.',
      fullText: `PROYECTO DE LEY NÚMERO 001 DE 2024 SENADO

Por medio de la cual se reforma el Sistema General de Pensiones y se dictan otras disposiciones

ARTÍCULO 1°. Objeto. La presente ley tiene por objeto reformar integralmente el Sistema General de Pensiones estableciendo una pensión básica universal, unificando el sistema bajo la administración pública y garantizando el derecho a la seguridad social en la vejez.

ARTÍCULO 2°. Pensión Básica Universal. Toda persona mayor de 65 años que haya residido en Colombia por más de 20 años tendrá derecho a una pensión básica universal equivalente a $500,000 pesos mensuales, independientemente de su historial de cotizaciones.

ARTÍCULO 3°. Traslado al Régimen Público. Los recursos administrados por los fondos privados de pensiones serán trasladados gradualmente a Colpensiones en un período de 10 años, garantizando los derechos adquiridos.

ARTÍCULO 4°. Reducción de Semanas de Cotización. El número de semanas requeridas para acceder a pensión se reduce de 1,300 a 1,000 semanas de cotización.

ARTÍCULO 5°. Régimen Especial para Mujeres. Se establecen bonificaciones por maternidad equivalentes a 50 semanas de cotización por cada hijo, con un máximo de 200 semanas.`,
      committee: 'Comisión VII Constitucional Permanente',
      rapporteur: 'Isabel Zuleta (Pacto Histórico)',
      nextSession: '15 de diciembre, 2024 - 9:00 AM',
      fiscalImpact: '$80 billones en 20 años',
      beneficiaries: '3.2 millones de adultos mayores'
    },
    {
      id: 2,
      name: 'Ley de Transparencia Electoral',
      fullName: 'Proyecto de Ley 045 de 2024 - Por la cual se establecen medidas de transparencia en procesos electorales',
      status: 'Segundo Debate Cámara',
      votes: { favor: 89, contra: 34, abstenciones: 8 },
      summary: 'Establece mecanismos de transparencia y control en campañas electorales y financiación política.',
      fullText: `PROYECTO DE LEY NÚMERO 045 DE 2024 CÁMARA

Por la cual se establecen medidas de transparencia en procesos electorales y se fortalece la democracia

ARTÍCULO 1°. Objeto. Esta ley tiene por objeto establecer medidas de transparencia en los procesos electorales, regular la financiación de campañas políticas y fortalecer los mecanismos de control democrático.

ARTÍCULO 2°. Financiación de Campañas. Toda campaña electoral debe reportar en tiempo real las donaciones recibidas superiores a $500,000 pesos a través de una plataforma digital pública.

ARTÍCULO 3°. Límites de Gastos. Se establecen límites máximos de gastos de campaña equivalentes a 200 salarios mínimos mensuales vigentes para alcaldías, 500 para gobernaciones y 1,000 para presidencia.

ARTÍCULO 4°. Prohibiciones. Se prohíbe la financiación de campañas por parte de personas jurídicas con contratos estatales vigentes o en los últimos dos años.

ARTÍCULO 5°. Observación Electoral. Se fortalece el sistema de observación electoral nacional e internacional, garantizando acceso completo a urnas, software y protocolos.`,
      committee: 'Comisión I Constitucional Permanente',
      rapporteur: 'David Racero (Pacto Histórico)',
      nextSession: '18 de diciembre, 2024 - 2:00 PM',
      fiscalImpact: '$15 mil millones anuales',
      beneficiaries: 'Sistema democrático nacional'
    },
    {
      id: 3,
      name: 'Reforma al Sistema de Salud',
      fullName: 'Proyecto de Ley 078 de 2024 - Por medio de la cual se reforma el Sistema General de Seguridad Social en Salud',
      status: 'Comisión VII Senado',
      votes: { favor: 8, contra: 3, abstenciones: 2 },
      summary: 'Elimina intermediarios en el sistema de salud y fortalece la red pública hospitalaria.',
      fullText: `PROYECTO DE LEY NÚMERO 078 DE 2024 SENADO

Por medio de la cual se reforma el Sistema General de Seguridad Social en Salud y se dictan otras disposiciones

ARTÍCULO 1°. Objeto. La presente ley reforma el Sistema General de Seguridad Social en Salud para garantizar el derecho fundamental a la salud mediante un sistema público unificado.

ARTÍCULO 2°. Eliminación de EPS. Se eliminan las Entidades Promotoras de Salud (EPS) y se establece un sistema público único de aseguramiento administrado directamente por el Estado.

ARTÍCULO 3°. Red Pública Unificada. Se crea la Red Pública Unificada de Salud que integrará todas las instituciones prestadoras de servicios de salud públicas bajo una sola administración.

ARTÍCULO 4°. Financiación. El sistema se financiará con recursos del Presupuesto General de la Nación, cotizaciones de trabajadores y empleadores, y recursos territoriales.

ARTÍCULO 5°. Prestación de Servicios. Los servicios de salud se prestarán de manera gratuita en el punto de atención para todos los colombianos.`,
      committee: 'Comisión VII Constitucional Permanente',
      rapporteur: 'Gustavo Bolívar (Pacto Histórico)',
      nextSession: '20 de diciembre, 2024 - 10:00 AM',
      fiscalImpact: '$25 billones anuales',
      beneficiaries: '50 millones de colombianos'
    },
    {
      id: 4,
      name: 'Ley de Protección Ambiental',
      fullName: 'Proyecto de Ley 092 de 2024 - Por la cual se establecen medidas de protección ambiental y lucha contra el cambio climático',
      status: 'Primer Debate Cámara',
      votes: { favor: 67, contra: 23, abstenciones: 12 },
      summary: 'Establece metas vinculantes de reducción de emisiones y protección de ecosistemas estratégicos.',
      fullText: `PROYECTO DE LEY NÚMERO 092 DE 2024 CÁMARA

Por la cual se establecen medidas de protección ambiental y lucha contra el cambio climático

ARTÍCULO 1°. Objeto. Esta ley establece el marco normativo para la protección del medio ambiente, la lucha contra el cambio climático y la transición hacia una economía sostenible.

ARTÍCULO 2°. Metas de Reducción. Colombia se compromete a reducir sus emisiones de gases de efecto invernadero en 51% para 2030 y alcanzar carbono neutralidad en 2050.

ARTÍCULO 3°. Ecosistemas Estratégicos. Se declaran como áreas protegidas adicionales 2 millones de hectáreas de ecosistemas estratégicos, priorizando la Amazonía, páramos y humedales.

ARTÍCULO 4°. Transición Energética. Se establece que el 70% de la matriz energética nacional debe provenir de fuentes renovables para 2035.

ARTÍCULO 5°. Economía Circular. Se implementa un sistema nacional de economía circular con metas de reciclaje del 50% para 2030.`,
      committee: 'Comisión V Constitucional Permanente',
      rapporteur: 'Catherine Juvinao (Alianza Verde)',
      nextSession: '22 de diciembre, 2024 - 3:00 PM',
      fiscalImpact: '$45 billones en 10 años',
      beneficiaries: 'Población nacional y global'
    }
  ];

  const congresspeople = [
    {
      id: 1,
      name: 'María Fernanda Cabal',
      party: 'Centro Democrático',
      chamber: 'Senado',
      department: 'Bogotá',
      attendance: '94%',
      billsPresented: 23,
      votes: { favor: 156, contra: 89, abstenciones: 12 },
      specialization: 'Seguridad y Defensa',
      image: '👩‍💼',
      contact: 'mfcabal@senado.gov.co'
    },
    {
      id: 2,
      name: 'Gustavo Bolívar',
      party: 'Pacto Histórico',
      chamber: 'Senado',
      department: 'Bogotá',
      attendance: '97%',
      billsPresented: 31,
      votes: { favor: 198, contra: 45, abstenciones: 14 },
      specialization: 'Salud y Trabajo',
      image: '👨‍💼',
      contact: 'gbolivar@senado.gov.co'
    },
    {
      id: 3,
      name: 'Catherine Juvinao',
      party: 'Alianza Verde',
      chamber: 'Cámara',
      department: 'Bogotá',
      attendance: '96%',
      billsPresented: 28,
      votes: { favor: 134, contra: 67, abstenciones: 21 },
      specialization: 'Medio Ambiente',
      image: '👩‍🔬',
      contact: 'cjuvinao@camara.gov.co'
    },
    {
      id: 4,
      name: 'Alirio Uribe',
      party: 'Pacto Histórico',
      chamber: 'Senado',
      department: 'Antioquia',
      attendance: '93%',
      billsPresented: 19,
      votes: { favor: 167, contra: 78, abstenciones: 18 },
      specialization: 'Derechos Humanos',
      image: '👨‍⚖️',
      contact: 'auribe@senado.gov.co'
    }
  ];

  const committees = [
    {
      id: 1,
      name: 'Comisión I Constitucional Permanente',
      focus: 'Reforma constitucional, organización territorial, reglamentos',
      members: 13,
      chair: 'David Racero',
      activeBills: 8,
      nextSession: '16 de diciembre, 2024'
    },
    {
      id: 2,
      name: 'Comisión VII Constitucional Permanente',
      focus: 'Salud, trabajo, seguridad social',
      members: 13,
      chair: 'Isabel Zuleta',
      activeBills: 12,
      nextSession: '17 de diciembre, 2024'
    },
    {
      id: 3,
      name: 'Comisión V Constitucional Permanente',
      focus: 'Régimen agropecuario, ecología, medio ambiente',
      members: 19,
      chair: 'Catherine Juvinao',
      activeBills: 15,
      nextSession: '19 de diciembre, 2024'
    }
  ];

  const stats = [
    { label: 'Proyectos Activos', value: '247', icon: '📋' },
    { label: 'Leyes Aprobadas 2024', value: '42', icon: '✅' },
    { label: 'Sesiones Plenarias', value: '89', icon: '🏛️' },
    { label: 'Asistencia Promedio', value: '87%', icon: '📊' }
  ];

  if (selectedBill) {
    return (
      <div className="min-h-screen bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
          <button 
            onClick={() => setSelectedBill(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 smooth-transition"
          >
            ← Volver al seguimiento del Congreso
          </button>
          
          <div className="glass-morphism rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bill Details */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedBill.name}</h1>
                <h2 className="text-lg text-gray-700 mb-6">{selectedBill.fullName}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Estado Actual</h3>
                    <p className="text-blue-600">{selectedBill.status}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">Ponente</h3>
                    <p className="text-green-600">{selectedBill.rapporteur}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800">Comisión</h3>
                    <p className="text-purple-600">{selectedBill.committee}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Resumen</h3>
                  <p className="text-gray-700">{selectedBill.summary}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Texto Completo del Proyecto</h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">{selectedBill.fullText}</pre>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Voting Results */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4">Resultados de Votación</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600">✅ A favor</span>
                      <span className="font-bold text-green-600">{selectedBill.votes.favor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600">❌ En contra</span>
                      <span className="font-bold text-red-600">{selectedBill.votes.contra}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">⚪ Abstenciones</span>
                      <span className="font-bold text-gray-600">{selectedBill.votes.abstenciones}</span>
                    </div>
                  </div>
                </div>

                {/* Key Information */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4">Información Clave</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Próxima Sesión:</span>
                      <p className="text-gray-600">{selectedBill.nextSession}</p>
                    </div>
                    <div>
                      <span className="font-medium">Impacto Fiscal:</span>
                      <p className="text-gray-600">{selectedBill.fiscalImpact}</p>
                    </div>
                    <div>
                      <span className="font-medium">Beneficiarios:</span>
                      <p className="text-gray-600">{selectedBill.beneficiaries}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4">Cronología</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Radicado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Primer Debate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Segundo Debate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span>Plenaria</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Back navigation */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-colombia-yellow mb-6 smooth-transition"
          >
            ← Volver al inicio
          </button>

          {/* Header */}
          <div className="glass-morphism rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">🏛️ Seguimiento Integral al Congreso</h1>
            <p className="text-white/90">Monitoreo en tiempo real de la actividad legislativa colombiana</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-morphism rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tab navigation */}
          <div className="glass-morphism rounded-lg p-4 mb-6">
            <div className="flex space-x-4">
              {[
                { id: 'bills', name: 'Proyectos de Ley', icon: '📋' },
                { id: 'congresspeople', name: 'Congresistas', icon: '👥' },
                { id: 'committees', name: 'Comisiones', icon: '🏢' },
                { id: 'statistics', name: 'Estadísticas', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'bills' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Proyectos de Ley Activos</h2>
              {bills.map((bill) => (
                <div key={bill.id} className="glass-morphism rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{bill.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bill.status.includes('Primer') ? 'bg-yellow-500 text-white' :
                      bill.status.includes('Segundo') ? 'bg-blue-500 text-white' :
                      bill.status.includes('Comisión') ? 'bg-purple-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                  <p className="text-white/90 mb-4">{bill.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/80">
                      <span className="text-green-400">✅ {bill.votes.favor}</span>
                      <span className="text-red-400">❌ {bill.votes.contra}</span>
                      <span className="text-gray-400">⚪ {bill.votes.abstenciones}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedBill(bill)}
                      className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 smooth-transition border border-white/30"
                    >
                      Ver detalles completos →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'congresspeople' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Congresistas Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {congresspeople.map((person) => (
                  <div key={person.id} className="glass-morphism rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{person.image}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                        <p className="text-white/80">{person.party} - {person.chamber}</p>
                        <p className="text-white/70 text-sm mb-3">{person.department}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/80">Asistencia:</span>
                            <span className="text-green-400 font-semibold">{person.attendance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Proyectos presentados:</span>
                            <span className="text-white font-semibold">{person.billsPresented}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Especialización:</span>
                            <span className="text-blue-300">{person.specialization}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'committees' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Comisiones Constitucionales</h2>
              {committees.map((committee) => (
                <div key={committee.id} className="glass-morphism rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{committee.name}</h3>
                  <p className="text-white/90 mb-4">{committee.focus}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/80">Miembros:</span>
                      <p className="text-white font-semibold">{committee.members}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Presidente:</span>
                      <p className="text-white font-semibold">{committee.chair}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Proyectos activos:</span>
                      <p className="text-white font-semibold">{committee.activeBills}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Próxima sesión:</span>
                      <p className="text-white font-semibold">{committee.nextSession}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Estadísticas del Congreso 2024</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-morphism rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Productividad Legislativa</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Proyectos radicados:</span>
                      <span className="text-white font-bold">389</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Leyes aprobadas:</span>
                      <span className="text-green-400 font-bold">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">En trámite:</span>
                      <span className="text-yellow-400 font-bold">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Archivados:</span>
                      <span className="text-red-400 font-bold">100</span>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Asistencia por Partido</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Pacto Histórico:</span>
                      <span className="text-green-400 font-bold">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Centro Democrático:</span>
                      <span className="text-green-400 font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Partido Liberal:</span>
                      <span className="text-yellow-400 font-bold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Alianza Verde:</span>
                      <span className="text-green-400 font-bold">92%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Temas Prioritarios</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Reformas sociales:</span>
                      <span className="text-white font-bold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Medio ambiente:</span>
                      <span className="text-white font-bold">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Economía:</span>
                      <span className="text-white font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Justicia:</span>
                      <span className="text-white font-bold">12</span>
                    </div>
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

export default CongressTracker;