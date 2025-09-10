import React from 'react';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg p-8 text-center max-w-md mx-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Página No Encontrada</h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default Custom404;