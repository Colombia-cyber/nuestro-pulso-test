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
            <h3 className="text-xl font-semibold mb-4 text-blue-600">💬 Chat en Vivo</h3>
            <p className="text-gray-600">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-600">🗣️ Debates</h3>
            <p className="text-gray-600">
              Participa en debates estructurados sobre políticas públicas.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">🎥 Reels</h3>
            <p className="text-gray-600">
              Descubre contenido en video y historias sobre política y actualidad.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">📊 Noticias Conservadoras</h3>
            <p className="text-gray-600">
              Perspectivas conservadoras, análisis electoral y cobertura de derecha.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">📢 Feeds</h3>
            <p className="text-gray-600">
              Actualizaciones en tiempo real y noticias organizadas por categorías.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-pink-600">👥 Comunidad</h3>
            <p className="text-gray-600">
              Conecta con otros ciudadanos y forma parte de grupos de interés.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-emerald-600">🏛️ Congreso</h3>
            <p className="text-gray-600">
              Seguimiento del Congreso, votaciones y actividad legislativa.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-red-600">🚨 Alertas</h3>
            <p className="text-gray-600">
              Notificaciones importantes sobre política, elecciones y noticias.
            </p>
          </div>
        </div>

        {/* Right Wing News & Election Coverage - Enhanced */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6">🗳️ Noticias Conservadoras y Cobertura Electoral</h2>
          <p className="text-white/95 mb-8 text-lg">
            Perspectivas conservadoras, análisis electoral en profundidad, candidatos de derecha y seguimiento de tendencias políticas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/15 backdrop-blur rounded-xl p-6">
              <h4 className="text-white font-bold mb-3 text-lg">📊 Encuestas y Tendencias Electorales</h4>
              <p className="text-white/90 text-sm mb-4">
                Análisis detallado de encuestas, proyecciones electorales y tendencias de candidatos conservadores
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition font-medium">
                Ver Encuestas
              </button>
            </div>
            
            <div className="bg-white/15 backdrop-blur rounded-xl p-6">
              <h4 className="text-white font-bold mb-3 text-lg">🏛️ Políticas Conservadoras</h4>
              <p className="text-white/90 text-sm mb-4">
                Propuestas de reducción fiscal, seguridad ciudadana, libre mercado y valores tradicionales
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition font-medium">
                Leer Más
              </button>
            </div>
            
            <div className="bg-white/15 backdrop-blur rounded-xl p-6">
              <h4 className="text-white font-bold mb-3 text-lg">👔 Candidatos Conservadores</h4>
              <p className="text-white/90 text-sm mb-4">
                Perfiles completos, posiciones y trayectorias de candidatos de derecha y conservadores
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition font-medium">
                Ver Candidatos
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">
              📰 Ver Todas las Noticias Conservadoras
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition">
              🔍 Filtrar por Tema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;