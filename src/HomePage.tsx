import React from 'react';
import PetroPoll from './components/PetroPoll';

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
        
        {/* Featured Poll Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            🔥 Encuesta Destacada
          </h2>
          <div className="max-w-4xl mx-auto">
            <PetroPoll />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;