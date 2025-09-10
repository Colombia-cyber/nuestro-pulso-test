import React from 'react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🇨🇴</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl text-gray-600 mb-8">Página no encontrada</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}