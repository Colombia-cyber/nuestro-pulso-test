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

  const features = [
    {
      id: 'chat',
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Únete a conversaciones en tiempo real sobre temas de interés nacional',
      bgGradient: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      id: 'debates',
      icon: '🗣️',
      title: 'Debates',
      description: 'Participa en debates estructurados sobre políticas públicas',
      bgGradient: 'from-emerald-500 to-emerald-700',
      iconBg: 'bg-emerald-100',
      textColor: 'text-emerald-700',
    },
    {
      id: 'surveys',
      icon: '📊',
      title: 'Encuestas',
      description: 'Comparte tu opinión en encuestas sobre temas de actualidad y política nacional',
      bgGradient: 'from-purple-500 to-purple-700',
      iconBg: 'bg-purple-100',
      textColor: 'text-purple-700',
      featured: true,
      stats: '+48,000 votos esta semana',
    },
    {
      id: 'news',
      icon: '📰',
      title: 'Noticias Equilibradas',
      description: 'Mantente informado sobre perspectivas balanceadas y cobertura electoral',
      bgGradient: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-100',
      textColor: 'text-amber-700',
    },
  ];

  const newsCategories = [
    {
      title: 'Encuestas Electorales',
      description: 'Tendencias y proyecciones de candidatos conservadores en próximas elecciones',
      icon: '📊',
    },
    {
      title: 'Políticas Conservadoras',
      description: 'Propuestas de reducción de impuestos, seguridad y valores tradicionales',
      icon: '🏛️',
    },
    {
      title: 'Candidatos',
      description: 'Perfiles y posiciones de candidatos conservadores destacados',
      icon: '👥',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-secondary-400/5 to-accent-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-colombia mb-6">
              Bienvenido a Nuestro Pulso
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              La plataforma líder de participación cívica en Colombia
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-neutral-500 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>48,000+ participantes activos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-75"></div>
                <span>1,200+ debates en vivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-150"></div>
                <span>95% satisfacción</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`card-hover relative overflow-hidden group cursor-pointer animate-slide-up ${
                feature.featured ? 'lg:col-span-1 ring-2 ring-secondary-200' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {feature.featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-secondary-400 to-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse z-10">
                  🔥 POPULAR
                </div>
              )}
              
              <div className="p-6 relative z-10">
                <div className={`${feature.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                
                <h3 className={`text-xl font-bold ${feature.textColor} mb-3 group-hover:text-neutral-900 transition-colors`}>
                  {feature.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed mb-4 group-hover:text-neutral-700 transition-colors">
                  {feature.description}
                </p>
                
                {feature.stats && (
                  <div className="text-sm font-semibold text-secondary-600 bg-secondary-50 px-3 py-2 rounded-lg inline-block">
                    {feature.stats}
                  </div>
                )}
              </div>
              
              {/* Subtle background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Featured Polls Section */}
        {trendingPolls.length > 0 && (
          <div className="mb-16 animate-slide-up animation-delay-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-secondary-400 via-primary-500 to-accent-500">
                  <span className="text-white text-2xl">🔥</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900">Encuestas Trending</h2>
                  <p className="text-neutral-600">
                    Las encuestas más populares del momento
                  </p>
                </div>
              </div>
              <a 
                href="/encuestas" 
                className="btn-outline hover:bg-primary-50 group"
              >
                <span>Ver todas</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {trendingPolls.map((poll, index) => (
                <div key={poll.id} className={`animate-slide-up`} style={{ animationDelay: `${400 + (index * 150)}ms` }}>
                  <PollCard
                    poll={poll}
                    onVote={handleVote}
                    onViewDetails={handleViewDetails}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Polls Fallback */}
        {trendingPolls.length === 0 && (
          <div className="text-center py-16 animate-slide-up animation-delay-300">
            <div className="card max-w-md mx-auto p-8">
              <span className="text-6xl mb-4 block animate-float">📊</span>
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">Próximamente</h3>
              <p className="text-neutral-600">Las encuestas trending aparecerán aquí en breve</p>
            </div>
          </div>
        )}

        {/* News Section */}
        <div className="animate-slide-up animation-delay-500">
          <div className="card overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 via-primary-500 to-accent-500 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🗳️</span>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Noticias Conservadoras y Elecciones
                </h2>
              </div>
              <p className="text-white/95 text-lg leading-relaxed max-w-4xl">
                Últimas noticias sobre política conservadora, candidatos, encuestas electorales y análisis de derecha
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-neutral-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsCategories.map((category, index) => (
                  <div 
                    key={category.title}
                    className={`glass rounded-xl p-6 hover:shadow-medium transition-all duration-300 cursor-pointer group animate-slide-up`}
                    style={{ animationDelay: `${600 + (index * 100)}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                        {category.icon}
                      </span>
                      <h4 className="font-bold text-neutral-800 group-hover:text-primary-700 transition-colors">
                        {category.title}
                      </h4>
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed group-hover:text-neutral-700 transition-colors">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explorar</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up animation-delay-700">
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Únete a la Conversación Nacional
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Tu voz es importante para construir el futuro de Colombia. Participa en debates, 
              encuestas y conversaciones que realmente importan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary btn-lg group">
                <span className="flex items-center gap-2">
                  <span>🚀</span>
                  <span>Comenzar Ahora</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              <button className="btn-outline btn-lg">
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  <span>Conoce Más</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;