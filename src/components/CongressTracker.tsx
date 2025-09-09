import React from 'react';

const CongressTracker: React.FC = () => {
  const bills = [
    { id: 1, name: 'Ley de Transparencia Electoral', status: 'En Senado', votes: { favor: 45, contra: 12 } },
    { id: 2, name: 'Reforma al Sistema de Salud', status: 'Comisión VII', votes: { favor: 8, contra: 3 } },
    { id: 3, name: 'Ley de Protección Ambiental', status: 'Primer Debate', votes: { favor: 67, contra: 23 } }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🏛️ Seguimiento al Congreso</h1>
          <p className="text-white/90">Monitoreo en tiempo real de la actividad legislativa colombiana</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Estadísticas</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Proyectos activos:</span>
                <span className="font-bold">127</span>
              </div>
              <div className="flex justify-between">
                <span>Leyes aprobadas:</span>
                <span className="font-bold text-green-600">23</span>
              </div>
              <div className="flex justify-between">
                <span>En debate:</span>
                <span className="font-bold text-blue-600">45</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📅 Próximas Sesiones</h3>
            <div className="space-y-2 text-sm">
              <div>Plenaria Senado - Mar 15, 9:00 AM</div>
              <div>Comisión I - Mar 16, 2:00 PM</div>
              <div>Plenaria Cámara - Mar 17, 10:00 AM</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">👥 Congresistas Activos</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>María Rodríguez</span>
                <span className="text-green-600">98% asistencia</span>
              </div>
              <div className="flex justify-between">
                <span>Carlos Mendez</span>
                <span className="text-green-600">95% asistencia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Proyectos de Ley en Curso</h3>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{bill.name}</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {bill.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600">✅ A favor: {bill.votes.favor}</span>
                  <span className="text-red-600">❌ En contra: {bill.votes.contra}</span>
                  <button className="text-blue-600 hover:text-blue-800">Ver detalles →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongressTracker;