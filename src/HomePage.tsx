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
    <div className="min-h-screen colombia-pattern-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Colombian Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-colombia-gradient bg-clip-text text-transparent">
            🇨🇴 Bienvenido a Nuestro Pulso
          </h1>
          <p className="text-xl text-colombia-blue font-medium mb-2">
            La plataforma líder de participación cívica en Colombia
          </p>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-8 h-2 bg-colombia-yellow rounded-full"></div>
            <div className="w-8 h-2 bg-colombia-blue rounded-full"></div>
            <div className="w-8 h-2 bg-colombia-red rounded-full"></div>
          </div>
        </div>
        
        {/* Enhanced Feature Cards with Colombian styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card-colombia p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4 text-center">💬</div>
            <h3 className="text-xl font-semibold mb-4 text-colombia-blue">Chat en Vivo</h3>
            <p className="text-gray-700">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
            <div className="mt-4 w-full h-1 bg-colombia-gradient rounded-full"></div>
          </div>
          
          <div className="card-colombia p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4 text-center">🗣️</div>
            <h3 className="text-xl font-semibold mb-4 text-colombia-blue">Debates</h3>
            <p className="text-gray-700">
              Participa en debates estructurados sobre políticas públicas.
            </p>
            <div className="mt-4 w-full h-1 bg-colombia-gradient rounded-full"></div>
          </div>
          
          <div className="card-colombia p-6 ring-2 ring-colombia-yellow relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute top-2 right-2 bg-colombia-gradient text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <div className="text-3xl mb-4 text-center">📊</div>
            <h3 className="text-xl font-semibold mb-4 text-colombia-red flex items-center gap-2">
              <span>Encuestas</span>
            </h3>
            <p className="text-gray-700 mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-sm text-colombia-red font-semibold">
              +48,000 votos esta semana
            </div>
            <div className="mt-4 w-full h-1 bg-colombia-gradient rounded-full"></div>
          </div>

          <div className="card-colombia p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4 text-center">📰</div>
            <h3 className="text-xl font-semibold mb-4 text-colombia-blue">Noticias Nacionales</h3>
            <p className="text-gray-700">
              Mantente informado sobre todas las perspectivas y cobertura electoral colombiana.
            </p>
            <div className="mt-4 w-full h-1 bg-colombia-gradient rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Polls Preview Section with Colombian styling */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-colombia-gradient colombia-glow">
                <span className="text-white text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-colombia-gradient bg-clip-text text-transparent">
                  Encuestas Trending
                </h2>
                <p className="text-colombia-blue font-medium">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <a 
              href="/encuestas" 
              className="bg-colombia-gradient text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300 colombia-glow"
            >
              Ver todas →
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trendingPolls.map((poll) => (
              <div key={poll.id} className="card-colombia overflow-hidden">
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
            <div className="text-center py-12 card-colombia">
              <span className="text-6xl mb-4 block">📊</span>
              <p className="text-colombia-blue text-lg">No hay encuestas trending en este momento</p>
            </div>
          )}
        </div>

        {/* Enhanced News Preview Section with Colombian styling */}
        <div className="mt-12 bg-colombia-gradient rounded-xl p-8 colombia-glow">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🗳️</span>
            <span>Noticias Colombianas</span>
            <span>🇨🇴</span>
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Últimas noticias sobre política, candidatos, reformas y análisis desde todas las perspectivas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/30 transition-colors duration-300">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>📊</span>
                <span>Encuestas Electorales</span>
              </h4>
              <p className="text-white/80">
                Tendencias y proyecciones de todos los candidatos en próximas elecciones
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/30 transition-colors duration-300">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>🏛️</span>
                <span>Políticas Públicas</span>
              </h4>
              <p className="text-white/80">
                Propuestas de reformas, proyectos de ley y iniciativas gubernamentales
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 hover:bg-white/30 transition-colors duration-300">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>👥</span>
                <span>Candidatos</span>
              </h4>
              <p className="text-white/80">
                Perfiles y posiciones de candidatos de todas las corrientes políticas
              </p>
            </div>
          </div>

          {/* Colombian identity footer */}
          <div className="mt-8 pt-6 border-t border-white/30 text-center">
            <p className="text-white/90 font-medium">
              🇨🇴 Construyendo la democracia colombiana juntos 🇨🇴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;