import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrendingPolls } from './data/samplePolls';
import PollCard from './components/polls/PollCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const trendingPolls = getTrendingPolls().slice(0, 2); // Get top 2 trending polls

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In a real app, this would make an API call
  };

  const handleViewDetails = (pollId: string) => {
    console.log(`View details for poll ${pollId}`);
    // In a real app, this would navigate to the poll details page
  };

  const topicCards = [
    {
      id: 'congreso',
      icon: '🏛️',
      title: 'Congreso',
      description: 'Sigue la actividad legislativa en tiempo real',
      route: '/congreso',
      bgColor: 'from-blue-400 to-blue-600'
    },
    {
      id: 'elecciones',
      icon: '📈',
      title: 'Elecciones',
      description: 'Centro de información electoral actualizada',
      route: '/elecciones',
      bgColor: 'from-green-400 to-green-600'
    },
    {
      id: 'noticias',
      icon: '📰',
      title: 'Noticias',
      description: 'Análisis y cobertura de eventos cívicos',
      route: '/noticias',
      bgColor: 'from-purple-400 to-purple-600'
    },
    {
      id: 'tecnologia',
      icon: '🔬',
      title: 'Tecnología',
      description: 'Innovación y startups colombianas',
      route: '/tecnologia',
      bgColor: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 'trump',
      icon: '🇺🇸',
      title: 'Donald Trump',
      description: 'Impacto en relaciones Colombia-EE.UU.',
      route: '/trump',
      bgColor: 'from-red-400 to-red-600'
    },
    {
      id: 'economia',
      icon: '💰',
      title: 'Economía',
      description: 'Análisis económico y mercados',
      route: '/economia',
      bgColor: 'from-yellow-400 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-24"> {/* Added pt-24 for navbar spacing */}
        {/* Hero Section */}
        <div className="glass-morphism rounded-lg p-8 mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 text-shadow">
            🇨🇴 Nuestro Pulso
          </h1>
          <p className="text-xl text-white/90 mb-2">Red Cívica de Colombia - Tu Voz Cuenta</p>
          <p className="text-lg text-white/80 mb-6">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo para construir el futuro de Colombia juntos.
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <button 
              onClick={() => navigate('/debates')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 smooth-transition border border-white/30"
            >
              💬 Chat en Vivo
            </button>
            <button 
              onClick={() => navigate('/debates')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 smooth-transition border border-white/30"
            >
              🗣️ Debates
            </button>
            <button 
              onClick={() => navigate('/encuestas')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 smooth-transition border border-white/30"
            >
              📊 Encuestas
            </button>
          </div>
        </div>

        {/* Clickable Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topicCards.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(topic.route)}
              className={`bg-gradient-to-br ${topic.bgColor} rounded-lg p-6 cursor-pointer smooth-transition hover:scale-105 hover:shadow-2xl transform-gpu shadow-lg`}
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{topic.title}</h3>
              <p className="text-white/90">{topic.description}</p>
              <div className="mt-4 flex items-center text-white/80">
                <span className="text-sm">Ver más</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => navigate('/debates')}
            className="glass-morphism rounded-lg p-6 cursor-pointer hover:scale-105 smooth-transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-colombia-blue">Chat en Vivo</h3>
            <p className="text-white/80">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
          </div>
          
          <div 
            onClick={() => navigate('/debates')}
            className="glass-morphism rounded-lg p-6 cursor-pointer hover:scale-105 smooth-transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">Debates</h3>
            <p className="text-white/80">
              Participa en debates estructurados sobre políticas públicas.
            </p>
          </div>
          
          <div 
            onClick={() => navigate('/encuestas')}
            className="glass-morphism rounded-lg p-6 ring-2 ring-yellow-400 relative overflow-hidden cursor-pointer hover:scale-105 smooth-transition"
          >
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
              <span>📊</span>
              <span>Encuestas</span>
            </h3>
            <p className="text-white/80 mb-3">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-sm text-yellow-400 font-semibold">
              +48,000 votos esta semana
            </div>
          </div>

          <div 
            onClick={() => navigate('/noticias')}
            className="glass-morphism rounded-lg p-6 cursor-pointer hover:scale-105 smooth-transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Noticias</h3>
            <p className="text-white/80">
              Mantente informado sobre perspectivas y cobertura electoral.
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
                <h2 className="text-2xl font-bold text-white">Encuestas Trending</h2>
                <p className="text-white/80 text-sm">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/encuestas')}
              className="text-white hover:text-colombia-yellow font-semibold text-sm smooth-transition"
            >
              Ver todas →
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trendingPolls.map((poll) => (
              <div key={poll.id} className="glass-morphism rounded-lg">
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
            <div className="text-center py-8 glass-morphism rounded-lg">
              <span className="text-4xl mb-2 block">📊</span>
              <p className="text-white/80">No hay encuestas trending en este momento</p>
            </div>
          )}
        </div>

        {/* Enhanced News Preview Section */}
        <div className="mt-12 glass-morphism rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">🗳️ Últimas Noticias</h2>
          <p className="text-white/90 mb-6">
            Cobertura integral de política, economía, tecnología y eventos internacionales
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => navigate('/trump')}
              className="bg-white/10 backdrop-blur rounded-lg p-4 cursor-pointer hover:bg-white/20 smooth-transition"
            >
              <h4 className="text-white font-semibold mb-2">🇺🇸 Donald Trump</h4>
              <p className="text-white/80 text-sm">
                Impacto de políticas trumpistas en relaciones Colombia-EE.UU.
              </p>
            </div>
            
            <div 
              onClick={() => navigate('/congreso')}
              className="bg-white/10 backdrop-blur rounded-lg p-4 cursor-pointer hover:bg-white/20 smooth-transition"
            >
              <h4 className="text-white font-semibold mb-2">🏛️ Congreso</h4>
              <p className="text-white/80 text-sm">
                Seguimiento a proyectos de ley y actividad legislativa
              </p>
            </div>
            
            <div 
              onClick={() => navigate('/tecnologia')}
              className="bg-white/10 backdrop-blur rounded-lg p-4 cursor-pointer hover:bg-white/20 smooth-transition"
            >
              <h4 className="text-white font-semibold mb-2">🔬 Tecnología</h4>
              <p className="text-white/80 text-sm">
                Innovación, startups y transformación digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;