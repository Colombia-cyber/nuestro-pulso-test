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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Welcome Section */}
        <div className="content-overlay rounded-2xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
            ¡Bienvenido a Nuestro Pulso! 🇨🇴
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            La plataforma líder de participación cívica en Colombia
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 bg-yellow-100 p-3 rounded-lg">
              <span className="text-2xl">👥</span>
              <span className="font-semibold text-yellow-800">+150K Ciudadanos Activos</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">🗳️</span>
              <span className="font-semibold text-blue-800">+500 Encuestas Realizadas</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-red-100 p-3 rounded-lg">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold text-red-800">+2M Votos Registrados</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="vibrant-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4 text-center">💬</div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Chat en Vivo</h3>
            <p className="text-gray-700 mb-4">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700 font-medium">🔴 En vivo ahora</span>
                <span className="text-blue-600">2,847 usuarios</span>
              </div>
            </div>
          </div>
          
          <div className="vibrant-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4 text-center">🗣️</div>
            <h3 className="text-xl font-semibold mb-4 text-green-600">Debates</h3>
            <p className="text-gray-700 mb-4">
              Participa en debates estructurados sobre políticas públicas.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700 font-medium">⏰ Próximo en 2h</span>
                <span className="text-green-600">1,234 interesados</span>
              </div>
            </div>
          </div>
          
          <div className="vibrant-card rounded-xl p-6 ring-2 ring-yellow-400 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <div className="text-4xl mb-4 text-center">📊</div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2">
              <span>Encuestas</span>
            </h3>
            <p className="text-gray-700 mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm text-purple-600 font-semibold">
                +48,000 votos esta semana
              </div>
            </div>
          </div>

          <div className="vibrant-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-4 text-center">🎬</div>
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Reels</h3>
            <p className="text-gray-700 mb-4">
              Videos cortos sobre temas cívicos y participación ciudadana.
            </p>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-700 font-medium">📹 24 nuevos</span>
                <span className="text-orange-600">150K vistas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Polls Preview Section */}
        <div className="mb-8">
          <div className="vibrant-card rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
                  <span className="text-white text-2xl">🔥</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Encuestas Trending</h2>
                  <p className="text-gray-600">
                    Las encuestas más populares del momento - Tu voz cuenta
                  </p>
                </div>
              </div>
              <a 
                href="/encuestas" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-lg"
              >
                Ver todas →
              </a>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trendingPolls.map((poll) => (
                <div key={poll.id} className="content-overlay rounded-xl p-6">
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
              <div className="text-center py-12 content-overlay rounded-xl">
                <span className="text-6xl mb-4 block">📊</span>
                <p className="text-gray-600 text-lg">No hay encuestas trending en este momento</p>
                <p className="text-gray-500 text-sm mt-2">¡Sé el primero en crear una!</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Right Wing News Preview Section */}
        <div className="vibrant-card rounded-xl p-8 bg-gradient-to-br from-orange-400 via-red-500 to-red-600">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-4xl">🗳️</span>
            <span>Noticias Conservadoras y Elecciones</span>
          </h2>
          <p className="text-white/95 mb-8 text-lg">
            Últimas noticias sobre política conservadora, candidatos, encuestas electorales y análisis de derecha
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Encuestas Electorales</span>
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Tendencias y proyecciones de candidatos conservadores en próximas elecciones
              </p>
              <div className="mt-4 text-white/80 text-xs bg-white/10 p-2 rounded">
                📈 +23% aprobación candidatos centro-derecha
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <span>Políticas Conservadoras</span>
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Propuestas de reducción de impuestos, seguridad y valores tradicionales
              </p>
              <div className="mt-4 text-white/80 text-xs bg-white/10 p-2 rounded">
                💼 5 reformas económicas propuestas
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span>Candidatos</span>
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Perfiles y posiciones de candidatos conservadores destacados
              </p>
              <div className="mt-4 text-white/80 text-xs bg-white/10 p-2 rounded">
                🎯 12 candidatos en seguimiento activo
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg">
              Ver Todas las Noticias Conservadoras
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;