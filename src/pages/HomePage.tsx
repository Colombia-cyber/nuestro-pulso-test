import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      {/* Hero Section with Colombian Theme */}
      <section className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 min-h-[80vh] flex items-center justify-center">
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white border-opacity-30">
            {/* Colombian Flag Colors Accent */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>
                <div className="w-6 h-6 bg-blue-600 rounded-full shadow-lg"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6">
              🇨🇴 Nuestro Pulso
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-800 mb-8 font-bold">
              Futuro Colombia - Tu Voz Cuenta
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
              para construir el futuro de Colombia juntos. Una plataforma donde cada voz importa.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-bold text-lg">
                💬 Chat en Vivo
              </button>
              <button className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-bold text-lg">
                🗣️ Debates
              </button>
              <button className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-bold text-lg">
                📊 Encuestas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Layout */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Congreso</h3>
              <p className="text-gray-600">Sigue la actividad legislativa en tiempo real</p>
              <div className="mt-4 text-sm text-blue-600 font-semibold">25 proyectos activos</div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Elecciones</h3>
              <p className="text-gray-600">Centro de información electoral actualizada</p>
              <div className="mt-4 text-sm text-green-600 font-semibold">Próximas: 2026</div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Noticias</h3>
              <p className="text-gray-600">Análisis y cobertura de eventos cívicos</p>
              <div className="mt-4 text-sm text-purple-600 font-semibold">12 artículos hoy</div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-500 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Comunidad</h3>
              <p className="text-gray-600">Conecta con ciudadanos activos</p>
              <div className="mt-4 text-sm text-red-600 font-semibold">2,847 miembros</div>
            </div>
          </div>

          {/* Trending Topics & Active Survey */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                🔥 Temas Trending
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-400">
                  <span className="font-semibold text-gray-800">Reforma de Salud</span>
                  <span className="text-sm text-yellow-600 bg-yellow-200 px-3 py-1 rounded-full">+89% actividad</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-400">
                  <span className="font-semibold text-gray-800">Educación Pública</span>
                  <span className="text-sm text-blue-600 bg-blue-200 px-3 py-1 rounded-full">+67% actividad</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-400">
                  <span className="font-semibold text-gray-800">Medio Ambiente</span>
                  <span className="text-sm text-green-600 bg-green-200 px-3 py-1 rounded-full">+45% actividad</span>
                </div>
              </div>
            </div>

            {/* Active Survey */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                📊 Encuesta Activa
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  ¿Qué prioridad debería tener el gobierno en 2024?
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Economía</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Seguridad</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Educación</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-sm font-semibold">25%</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                  Participar
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              📈 Impacto de la Comunidad
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                <div className="text-gray-600">Miembros Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                <div className="text-gray-600">Debates Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
                <div className="text-gray-600">Encuestas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">1,234</div>
                <div className="text-gray-600">Votos Emitidos</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;