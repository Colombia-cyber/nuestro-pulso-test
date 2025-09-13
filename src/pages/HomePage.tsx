import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiMessageCircle, 
  FiBarChart, 
  FiFile,
  FiFileText,
  FiArrowRight,
  FiPlay
} from 'react-icons/fi';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Colombian Background */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, #FFD700 0%, #0033CC 50%, #CC0000 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Colombian Flag Colors Accent */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6">
              🇨🇴 Nuestro Pulso
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-800 mb-8 font-medium">
              Red Cívica de Colombia - Tu Voz Cuenta
            </p>
            
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
              para construir el futuro de Colombia juntos. Tu participación es clave para la democracia.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <Link 
                to="/chat"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
              >
                <FiMessageCircle />
                <span>💬 Chat en Vivo</span>
              </Link>
              <Link 
                to="/polls"
                className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
              >
                <FiTrendingUp />
                <span>📊 Encuestas</span>
              </Link>
              <Link 
                to="/congress"
                className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
              >
                <FiUsers />
                <span>🏛️ Congreso</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Participación Cívica en Números
            </h2>
            <p className="text-xl text-gray-600">
              Unidos construimos una Colombia más participativa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                50K+
              </div>
              <div className="text-lg text-gray-600">Ciudadanos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">
                120+
              </div>
              <div className="text-lg text-gray-600">Debates Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-purple-600 mb-2">
                300+
              </div>
              <div className="text-lg text-gray-600">Encuestas Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-red-600 mb-2">
                85%
              </div>
              <div className="text-lg text-gray-600">Satisfacción Ciudadana</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Herramientas de Participación Cívica
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para participar en la democracia digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chat Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chat en Tiempo Real</h3>
              <p className="text-gray-600 mb-6">
                Conversa con otros ciudadanos sobre temas de interés nacional en tiempo real.
              </p>
              <Link 
                to="/chat"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Unirse al Chat</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            {/* News Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-green-600 text-4xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Noticias Verificadas</h3>
              <p className="text-gray-600 mb-6">
                Mantente informado con noticias verificadas y análisis de calidad.
              </p>
              <Link 
                to="/news"
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <span>Ver Noticias</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Legislation Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seguimiento Legislativo</h3>
              <p className="text-gray-600 mb-6">
                Monitorea proyectos de ley y participa en el proceso legislativo.
              </p>
              <Link 
                to="/legislation"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <span>Ver Legislación</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Congress Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-red-600 text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monitor del Congreso</h3>
              <p className="text-gray-600 mb-6">
                Sigue la actividad de tus representantes en el Congreso de la República.
              </p>
              <Link 
                to="/congress"
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
              >
                <span>Ver Congreso</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Polls Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-yellow-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Encuestas Ciudadanas</h3>
              <p className="text-gray-600 mb-6">
                Participa en encuestas sobre temas importantes para el país.
              </p>
              <Link 
                to="/polls"
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium"
              >
                <span>Ver Encuestas</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Analytics Feature */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analíticas Públicas</h3>
              <p className="text-gray-600 mb-6">
                Explora datos y tendencias sobre la participación ciudadana.
              </p>
              <Link 
                to="/analytics"
                className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <span>Ver Analíticas</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Active Survey Widget */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encuesta Activa: Reforma Educativa
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tu opinión es importante para el futuro de la educación en Colombia
            </p>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8">
              <div className="text-left mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  ¿Estás de acuerdo con la propuesta de aumentar el presupuesto educativo?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Totalmente de acuerdo</span>
                    <div className="w-40 bg-white bg-opacity-30 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-sm">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Parcialmente de acuerdo</span>
                    <div className="w-40 bg-white bg-opacity-30 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="text-sm">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>En desacuerdo</span>
                    <div className="w-40 bg-white bg-opacity-30 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-sm">15%</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/polls"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Participar en la Encuesta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para Participar?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de colombianos que ya están construyendo el futuro del país. 
            Tu voz cuenta y tu participación hace la diferencia.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              to="/chat"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Comenzar Ahora
            </Link>
            <a 
              href="#"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Conocer Más
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;