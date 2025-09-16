import React from 'react';
import { getTrendingPolls } from './data/samplePolls';
import PollCard from './components/polls/PollCard';
import HomepageSearchBar from './components/HomepageSearchBar';

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Nuestro Pulso
        </h1>
        <p className="text-center text-gray-600 mb-12">
          La plataforma líder de participación cívica en Colombia
        </p>
        
        {/* Global Search Section */}
        <div className="mb-16">
          <HomepageSearchBar 
            onSearch={(query, results) => {
              console.log('Global search:', query, results);
            }}
            onNavigateToResults={() => {
              console.log('Navigate to full search results');
            }}
          />
        </div>
        
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
          
          <div className="bg-white rounded-lg shadow-md p-6 ring-2 ring-yellow-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 flex items-center gap-2">
              <span>📊</span>
              <span>Encuestas</span>
            </h3>
            <p className="text-gray-600 mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-sm text-purple-600 font-semibold">
              +48,000 votos esta semana
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Noticias Conservadoras</h3>
            <p className="text-gray-600">
              Mantente informado sobre perspectivas conservadoras y cobertura electoral.
            </p>
          </div>
        </div>

        {/* Featured Polls Preview Section */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
                <span className="text-white text-xl">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Encuestas Trending</h2>
                <p className="text-gray-600 text-sm">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <a 
              href="/encuestas" 
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
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
            <div className="text-center py-8 bg-white/50 rounded-lg border border-gray-200">
              <span className="text-4xl mb-2 block">📊</span>
              <p className="text-gray-600">No hay encuestas trending en este momento</p>
            </div>
          )}
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