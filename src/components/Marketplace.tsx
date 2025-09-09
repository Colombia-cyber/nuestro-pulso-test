import React from 'react';

const Marketplace: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🛒 Mercado Cívico</h1>
          <p className="text-white/90">Intercambio de servicios y recursos para la comunidad</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketplace Comunitario</h2>
          <p className="text-gray-600">Plataforma para intercambio de servicios cívicos y recursos comunitarios</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;