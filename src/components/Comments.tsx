import React from 'react';

const Comments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💭 Sistema de Comentarios</h1>
          <p className="text-white/90">Discusiones estructuradas y moderadas sobre temas cívicos</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sistema de Comentarios Avanzado</h2>
          <p className="text-gray-600 mb-6">Comentarios threaded con moderación automática y votación comunitaria</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🧵</div>
              <h3 className="font-semibold">Hilos de Conversación</h3>
              <p className="text-sm text-gray-600">Respuestas organizadas en hilos</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold">Moderación Comunitaria</h3>
              <p className="text-sm text-gray-600">Votación y reporte por usuarios</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold">Sistema de Karma</h3>
              <p className="text-sm text-gray-600">Reputación basada en contribuciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;