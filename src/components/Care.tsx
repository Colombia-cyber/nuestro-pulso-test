import React from 'react';

const Care: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🤝 Cuidado Comunitario</h1>
          <p className="text-white/90">Red de apoyo y cuidado para la comunidad colombiana</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🤝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cuidado y Apoyo Comunitario</h2>
          <p className="text-gray-600 mb-6">Conectando necesidades con recursos comunitarios para el bienestar social</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🏥</div>
              <h3 className="font-semibold">Apoyo en Salud</h3>
              <p className="text-sm text-gray-600">Recursos de salud mental y física</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-semibold">Educación Comunitaria</h3>
              <p className="text-sm text-gray-600">Programas educativos y de formación</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🆘</div>
              <h3 className="font-semibold">Ayuda de Emergencia</h3>
              <p className="text-sm text-gray-600">Red de respuesta rápida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Care;