import React from 'react';

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-6xl mb-8">🇨🇴</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Nuestro Pulso App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Red Cívica de Colombia - Conectando ciudadanos con la democracia
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">💬 Chat en Vivo</h3>
            <p className="text-gray-600">
              Participa en conversaciones en tiempo real con otros ciudadanos
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">🗣️ Debates</h3>
            <p className="text-gray-600">
              Únete a debates estructurados sobre temas importantes del país
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">📊 Encuestas</h3>
            <p className="text-gray-600">
              Comparte tu opinión en encuestas sobre políticas públicas
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">📰 Noticias</h3>
            <p className="text-gray-600">
              Mantente informado con noticias verificadas y actualizadas
            </p>
          </div>
        </div>
        
        <a
          href="/"
          className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Ir a la plataforma
        </a>
      </div>
    </div>
  );
}