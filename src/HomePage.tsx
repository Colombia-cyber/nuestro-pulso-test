import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Nuestro Pulso
        </h1>
        <p className="text-center text-gray-600 mb-12">
          La plataforma líder de participación cívica en Colombia
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Chat en Vivo</h3>
            <p className="text-gray-600">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Debates</h3>
            <p className="text-gray-600">
              Participa en debates estructurados sobre políticas públicas.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Encuestas</h3>
            <p className="text-gray-600">
              Comparte tu opinión en encuestas sobre temas de actualidad.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Noticias Conservadoras</h3>
            <p className="text-gray-600">
              Mantente informado sobre perspectivas conservadoras y cobertura electoral.
            </p>
          </div>
        </div>

        {/* Right Wing News Preview Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">🗳️ Noticias Conservadoras y Elecciones</h2>
          <p className="text-white/90 mb-6">
            Últimas noticias sobre política conservadora, candidatos, encuestas electorales y análisis de derecha
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📊 Encuestas Electorales</h4>
              <p className="text-white/80 text-sm">
                Tendencias y proyecciones de candidatos conservadores en próximas elecciones
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🏛️ Políticas Conservadoras</h4>
              <p className="text-white/80 text-sm">
                Propuestas de reducción de impuestos, seguridad y valores tradicionales
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">👥 Candidatos</h4>
              <p className="text-white/80 text-sm">
                Perfiles y posiciones de candidatos conservadores destacados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;