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
      {/* Hero Section with Colombian overlay */}
      <div className="hero-overlay py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              🇨🇴 Bienvenido a Nuestro Pulso
            </h1>
            <p className="text-xl mb-6 drop-shadow-md">
              La plataforma líder de participación cívica en Colombia
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto drop-shadow-md">
              Únete a la conversación nacional y construye el futuro de Colombia con nosotros
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Main Features Grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="gradient-card rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="text-xl font-bold text-blue-600">Chat en Vivo</h3>
            </div>
            <p className="text-gray-700 text-center">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                🟢 2,847 activos
              </span>
            </div>
          </div>
          
          <div className="gradient-card rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🗣️</div>
              <h3 className="text-xl font-bold text-green-600">Debates</h3>
            </div>
            <p className="text-gray-700 text-center">
              Participa en debates estructurados sobre políticas públicas.
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                📊 156 debates activos
              </span>
            </div>
          </div>
          
          <div className="gradient-card rounded-xl shadow-xl p-6 ring-3 ring-yellow-400 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-xl font-bold text-purple-600">Encuestas</h3>
            </div>
            <p className="text-gray-700 text-center mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-center">
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                🗳️ +48,000 votos esta semana
              </span>
            </div>
          </div>

          <div className="gradient-card rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📰</div>
              <h3 className="text-xl font-bold text-orange-600">Noticias</h3>
            </div>
            <p className="text-gray-700 text-center">
              Mantente informado sobre perspectivas políticas y cobertura electoral.
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                📈 Actualizado cada hora
              </span>
            </div>
          </div>
        </div>

        {/* Featured Polls Preview Section */}
        <div className="bg-overlay rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl colombian-gradient">
                <span className="text-white text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Encuestas Trending</h2>
                <p className="text-gray-600">
                  Las encuestas más populares del momento - Actualizado en tiempo real
                </p>
              </div>
            </div>
            <a 
              href="/encuestas" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              Ver todas →
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trendingPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={handleVote}
                onViewDetails={handleViewDetails}
                compact={true}
              />
            ))}
          </div>

          {trendingPolls.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-gray-300">
              <span className="text-6xl mb-4 block">📊</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">¡Próximamente nuevas encuestas!</h3>
              <p className="text-gray-600">Estamos preparando encuestas emocionantes para ti</p>
            </div>
          )}
        </div>

        {/* Live Statistics Section */}
        <div className="bg-overlay rounded-2xl p-8 mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">📊 Estadísticas en Vivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-gray-700 font-medium">Usuarios Activos</div>
              <div className="text-sm text-green-600 mt-1">🟢 En línea ahora</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">156</div>
              <div className="text-gray-700 font-medium">Debates Activos</div>
              <div className="text-sm text-blue-600 mt-1">📈 +12 hoy</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">48,203</div>
              <div className="text-gray-700 font-medium">Votos Esta Semana</div>
              <div className="text-sm text-purple-600 mt-1">🔥 Récord histórico</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,284</div>
              <div className="text-gray-700 font-medium">Noticias Publicadas</div>
              <div className="text-sm text-orange-600 mt-1">📰 Última hace 5 min</div>
            </div>
          </div>
        </div>

        {/* Enhanced News Section */}
        <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">🗳️ Centro de Noticias Políticas</h2>
            <p className="text-white/90 text-lg">
              Mantente informado con las últimas noticias, análisis políticos y cobertura electoral
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📊</span>
                <h4 className="text-white font-bold text-lg">Encuestas Electorales</h4>
              </div>
              <p className="text-white/90 mb-4">
                Tendencias y proyecciones actualizadas de candidatos en próximas elecciones
              </p>
              <div className="text-sm text-white/80">
                <div className="flex justify-between items-center">
                  <span>Última actualización:</span>
                  <span className="font-semibold">Hace 2 horas</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🏛️</span>
                <h4 className="text-white font-bold text-lg">Actividad Legislativa</h4>
              </div>
              <p className="text-white/90 mb-4">
                Seguimiento en tiempo real de propuestas, votaciones y actividad del Congreso
              </p>
              <div className="text-sm text-white/80">
                <div className="flex justify-between items-center">
                  <span>Sesiones activas:</span>
                  <span className="font-semibold text-green-300">🟢 3 comisiones</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📰</span>
                <h4 className="text-white font-bold text-lg">Análisis y Reportes</h4>
              </div>
              <p className="text-white/90 mb-4">
                Análisis profundo de políticas públicas y eventos políticos relevantes
              </p>
              <div className="text-sm text-white/80">
                <div className="flex justify-between items-center">
                  <span>Reportes nuevos:</span>
                  <span className="font-semibold text-yellow-300">⭐ 7 esta semana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick News Updates */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="text-white font-bold text-xl mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Actualizaciones Rápidas
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm">Nueva propuesta de reforma tributaria en comisión</span>
                <span className="ml-auto text-xs text-white/70">Hace 15 min</span>
              </div>
              <div className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm">Encuesta presidencial: cambios en preferencias electorales</span>
                <span className="ml-auto text-xs text-white/70">Hace 1 hora</span>
              </div>
              <div className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm">Debate parlamentario sobre políticas de seguridad</span>
                <span className="ml-auto text-xs text-white/70">Hace 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;