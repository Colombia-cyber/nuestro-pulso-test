import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingPolls } from './data/samplePolls';
import PollCard from './components/polls/PollCard';
import NewsFeed from './NewsFeed';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [trendingPolls, setTrendingPolls] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      try {
        const polls = getTrendingPolls().slice(0, 2);
        setTrendingPolls(polls);
      } catch (error) {
        console.error('Error loading polls:', error);
        setTrendingPolls([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In a real app, this would make an API call
  };

  const handleViewDetails = (pollId: string) => {
    console.log(`View details for poll ${pollId}`);
    // In a real app, this would navigate to the poll details page
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Cargando contenido..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                🇨🇴 Nuestro Pulso
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                Red Cívica de Colombia - Tu Voz Cuenta
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
                para construir el futuro de Colombia juntos.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/chat"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                💬 Chat en Vivo
              </Link>
              <Link
                to="/debates"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                🗣️ Debates
              </Link>
              <Link
                to="/encuestas"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                📊 Encuestas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link to="/chat" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-800">Congreso</h3>
                <p className="text-gray-600">Sigue la actividad legislativa en tiempo real</p>
              </div>
            </Link>
            
            <Link to="/noticias" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2 text-green-600 group-hover:text-green-800">Elecciones</h3>
                <p className="text-gray-600">Centro de información electoral actualizada</p>
              </div>
            </Link>
            
            <Link to="/noticias" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600 group-hover:text-orange-800">Noticias</h3>
                <p className="text-gray-600">Análisis y cobertura de eventos cívicos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <main>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
                Bienvenido a Nuestro Pulso
              </h1>
              <p className="text-center text-gray-600 mb-8">
                La plataforma líder de participación cívica en Colombia
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/chat" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-colors">
                    <h3 className="text-lg font-semibold mb-2 text-blue-600 group-hover:text-blue-800">Chat en Vivo</h3>
                    <p className="text-gray-600 text-sm">
                      Únete a conversaciones en tiempo real sobre temas de interés nacional.
                    </p>
                  </div>
                </Link>
                
                <Link to="/debates" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-colors">
                    <h3 className="text-lg font-semibold mb-2 text-green-600 group-hover:text-green-800">Debates</h3>
                    <p className="text-gray-600 text-sm">
                      Participa en debates estructurados sobre políticas públicas.
                    </p>
                  </div>
                </Link>
                
                <Link to="/encuestas" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-purple-50 transition-colors ring-2 ring-yellow-400 relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      🔥 POPULAR
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-purple-600 group-hover:text-purple-800 flex items-center gap-2">
                      <span>📊</span>
                      <span>Encuestas</span>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
                    </p>
                    <div className="text-sm text-purple-600 font-semibold">
                      +48,000 votos esta semana
                    </div>
                  </div>
                </Link>

                <Link to="/noticias" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-orange-50 transition-colors">
                    <h3 className="text-lg font-semibold mb-2 text-orange-600 group-hover:text-orange-800">Noticias Conservadoras</h3>
                    <p className="text-gray-600 text-sm">
                      Mantente informado sobre perspectivas conservadoras y cobertura electoral.
                    </p>
                  </div>
                </Link>
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
                  <Link 
                    to="/encuestas" 
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                  >
                    Ver todas →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {trendingPolls.length > 0 ? (
                    trendingPolls.map((poll) => (
                      <PollCard
                        key={poll.id}
                        poll={poll}
                        onVote={handleVote}
                        onViewDetails={handleViewDetails}
                        compact={true}
                      />
                    ))
                  ) : (
                    <div className="lg:col-span-2 text-center py-8 bg-white/50 rounded-lg border border-gray-200">
                      <span className="text-4xl mb-2 block">📊</span>
                      <p className="text-gray-600">No hay encuestas trending en este momento</p>
                    </div>
                  )}
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

            {/* News Feed Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📰 Últimas Noticias</h2>
                <p className="text-gray-600">Mantente informado sobre los acontecimientos más importantes</p>
              </div>
              <div className="p-6">
                <NewsFeed />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;