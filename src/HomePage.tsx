import React from 'react';
import { getTrendingPolls } from './data/samplePolls';
import PollCard from './components/polls/PollCard';

const HomePage: React.FC = () => {
  const trendingPolls = getTrendingPolls().slice(0, 2); // Get top 2 trending polls

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In a real app, this would make an API call
  };

  const handleViewDetails = (pollId: string) => {
    console.log(`View details for poll ${pollId}`);
    // In a real app, this would navigate to the poll details page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* "Futuro" Inspirational Section */}
      <div 
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('/futuro-background.svg')`
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            🇨🇴 Construyendo Nuestro Futuro
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Unidos construimos el futuro de Colombia. Tu participación cívica es el motor del cambio que necesitamos.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
            ⭐ Únete al Movimiento Cívico
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Nuestro Pulso
        </h1>
        <p className="text-center text-gray-600 mb-12">
          La plataforma líder de participación cívica en Colombia
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Chat en Vivo</h3>
            <p className="text-gray-700">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">🗣️</div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Debates</h3>
            <p className="text-gray-700">
              Participa en debates estructurados sobre políticas públicas.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-purple-100 rounded-lg shadow-lg p-6 ring-2 ring-yellow-400 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
              <span>Encuestas</span>
            </h3>
            <p className="text-gray-700 mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-sm text-purple-600 font-semibold">
              +48,000 votos esta semana
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-lg shadow-lg p-6 border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">📰</div>
            <h3 className="text-xl font-semibold mb-4 text-orange-700">Noticias Conservadoras</h3>
            <p className="text-gray-700">
              Mantente informado sobre perspectivas conservadoras y cobertura electoral.
            </p>
          </div>
        </div>

        {/* Featured Polls Preview Section */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 shadow-lg">
                <span className="text-white text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Encuestas Trending
                </h2>
                <p className="text-gray-600 text-sm">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <a 
              href="/encuestas" 
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100"
            >
              Ver todas →
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trendingPolls.map((poll) => (
              <div key={poll.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <PollCard
                  poll={poll}
                  onVote={handleVote}
                  onViewDetails={handleViewDetails}
                  compact={true}
                />
              </div>
            ))}
          </div>

          {trendingPolls.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-inner">
              <span className="text-6xl mb-4 block">📊</span>
              <p className="text-gray-600 text-lg">No hay encuestas trending en este momento</p>
            </div>
          )}
        </div>

        {/* Right Wing News Preview Section */}
        <div className="mt-12 bg-gradient-to-br from-orange-400 via-red-500 to-red-600 rounded-xl p-8 shadow-xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">🗳️</div>
            <div className="absolute bottom-4 left-4 text-4xl">🏛️</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5">⭐</div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🗳️</span>
              Noticias Conservadoras y Elecciones
            </h2>
            <p className="text-white/95 mb-8 text-lg leading-relaxed">
              Últimas noticias sobre política conservadora, candidatos, encuestas electorales y análisis de derecha
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="text-white font-bold mb-3 text-xl flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Encuestas Electorales
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Tendencias y proyecciones de candidatos conservadores en próximas elecciones
                </p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="text-white font-bold mb-3 text-xl flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  Políticas Conservadoras
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Propuestas de reducción de impuestos, seguridad y valores tradicionales
                </p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="text-white font-bold mb-3 text-xl flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Candidatos
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Perfiles y posiciones de candidatos conservadores destacados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Closing Section */}
        <div className="mt-16 text-center py-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl shadow-inner">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              🇨🇴 ¡Tu Voz Construye el Futuro de Colombia!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cada opinión cuenta, cada voto importa, cada participación nos acerca más al país que queremos.
            </p>
            <div className="flex justify-center space-x-1 mb-4">
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full shadow-lg"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
            </div>
            <p className="text-sm text-gray-600 italic">
              "El futuro pertenece a quienes participan activamente en su construcción"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;