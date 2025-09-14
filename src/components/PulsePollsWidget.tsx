import React from 'react';

const PulsePollsWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📊 Pulso Presidencial
        </h3>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-blue-600">52.3%</div>
          <div className="text-sm text-gray-600">Aprobación actual</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Excelente</span>
            <span className="text-sm font-medium">15%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Buena</span>
            <span className="text-sm font-medium">37%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '37%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Regular</span>
            <span className="text-sm font-medium">28%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Mala</span>
            <span className="text-sm font-medium">20%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
            Participar en encuesta
          </button>
        </div>
      </div>
    </div>
  );
};

export default PulsePollsWidget;