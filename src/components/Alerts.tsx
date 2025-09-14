import React from 'react';

const Alerts: React.FC = () => {
  const alerts = [
    { id: 1, type: 'urgent', title: 'Votación importante mañana', message: 'Reforma tributaria en plenaria del Senado', time: '2 min' },
    { id: 2, type: 'news', title: 'Nuevas noticias conservadoras', message: 'Análisis electoral: candidatos de derecha ganan terreno', time: '1 hora' },
    { id: 3, type: 'debate', title: 'Debate en vivo ahora', message: 'Educación digital: ¿prioridad nacional?', time: '30 min' },
    { id: 4, type: 'community', title: 'Nueva comunidad creada', message: 'Únete al grupo "Ciudadanos por el Cambio"', time: '2 horas' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🔔 Alertas Cívicas</h1>
          <p className="text-white/90">Mantente al día con notificaciones personalizadas</p>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`bg-white rounded-lg shadow-lg p-4 border-l-4 ${
              alert.type === 'urgent' ? 'border-red-500' :
              alert.type === 'news' ? 'border-blue-500' : 
              alert.type === 'community' ? 'border-green-500' : 'border-yellow-500'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">hace {alert.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Configurar Alertas</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Debates en vivo</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Votaciones importantes</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Noticias conservadoras</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Actualizaciones de comunidad</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;