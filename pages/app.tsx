import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestro Pulso App
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Plataforma integral para participar en la vida cívica de Colombia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-3">💬 Chat en Vivo</h3>
            <p className="text-gray-600 mb-4">Participa en discusiones en tiempo real sobre temas cívicos</p>
            <a href="/chat" className="text-blue-600 hover:text-blue-800 font-semibold">
              Ir al Chat →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-600 mb-3">🗣️ Debates</h3>
            <p className="text-gray-600 mb-4">Únete a debates estructurados sobre políticas públicas</p>
            <a href="/debate" className="text-green-600 hover:text-green-800 font-semibold">
              Ver Debates →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-yellow-600 mb-3">📊 Encuestas</h3>
            <p className="text-gray-600 mb-4">Comparte tu opinión en encuestas sobre temas importantes</p>
            <a href="/survey" className="text-yellow-600 hover:text-yellow-800 font-semibold">
              Tomar Encuestas →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-purple-600 mb-3">📰 Noticias</h3>
            <p className="text-gray-600 mb-4">Mantente informado con las últimas noticias relevantes</p>
            <a href="/news" className="text-purple-600 hover:text-purple-800 font-semibold">
              Leer Noticias →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-red-600 mb-3">💭 Comentarios</h3>
            <p className="text-gray-600 mb-4">Comenta y opina sobre propuestas ciudadanas</p>
            <a href="/comments" className="text-red-600 hover:text-red-800 font-semibold">
              Ver Comentarios →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-3">💙 Cuidado</h3>
            <p className="text-gray-600 mb-4">Recursos de bienestar y salud mental comunitaria</p>
            <a href="/care" className="text-pink-600 hover:text-pink-800 font-semibold">
              Acceder a Cuidado →
            </a>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="/" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;