import React from 'react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'congress',
      icon: '🏛️',
      title: 'Congreso en Vivo',
      description: 'Sigue la actividad legislativa y proyectos de ley en tiempo real',
      gradient: 'from-blue-600 to-indigo-700',
      hoverGradient: 'hover:from-blue-700 hover:to-indigo-800',
    },
    {
      id: 'elections',
      icon: '🗳️',
      title: 'Centro Electoral',
      description: 'Información actualizada sobre candidatos, encuestas y resultados',
      gradient: 'from-emerald-600 to-teal-700',
      hoverGradient: 'hover:from-emerald-700 hover:to-teal-800',
    },
    {
      id: 'feeds',
      icon: '📰',
      title: 'Noticias Equilibradas',
      description: 'Perspectivas múltiples y análisis objetivo de eventos cívicos',
      gradient: 'from-amber-600 to-orange-700',
      hoverGradient: 'hover:from-amber-700 hover:to-orange-800',
    },
  ];

  const quickActions = [
    {
      id: 'chat',
      icon: '💬',
      label: 'Chat en Vivo',
      description: 'Únete a la conversación',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      id: 'debates',
      icon: '🗣️',
      label: 'Debates',
      description: 'Participa en debates',
      bgColor: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700',
    },
    {
      id: 'surveys',
      icon: '📊',
      label: 'Encuestas',
      description: 'Tu opinión cuenta',
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-colombia">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white/15 rounded-full blur-3xl animate-float animation-delay-500"></div>
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Main Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="glass rounded-3xl p-8 md:p-12 shadow-large border border-white/30 backdrop-blur-lg">
              
              {/* Colombian Flag Colors Accent */}
              <div className="flex justify-center mb-8 animate-slide-up animation-delay-150">
                <div className="flex space-x-2">
                  <div className="w-5 h-5 bg-secondary-400 rounded-full shadow-glow-yellow animate-pulse-soft"></div>
                  <div className="w-5 h-5 bg-primary-600 rounded-full shadow-glow animate-pulse-soft animation-delay-75"></div>
                  <div className="w-5 h-5 bg-accent-500 rounded-full shadow-glow-red animate-pulse-soft animation-delay-150"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up animation-delay-300">
                <span className="inline-block mr-4 text-5xl md:text-7xl lg:text-8xl animate-float">🇨🇴</span>
                <span className="text-gradient-colombia bg-white bg-clip-text text-transparent">
                  Nuestro Pulso
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-white/95 mb-4 font-medium animate-slide-up animation-delay-500">
                Red Cívica de Colombia
              </p>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 font-medium animate-slide-up animation-delay-500">
                Tu Voz Cuenta • Tu Participación Importa
              </p>
              
              <p className="text-base md:text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-700">
                Únete a la conversación nacional más importante de Colombia. Participa en debates constructivos, 
                encuestas de opinión y chat en vivo para construir juntos el futuro de nuestro país.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-slide-up animation-delay-700">
                {quickActions.map((action, index) => (
                  <button 
                    key={action.id}
                    onClick={() => onNavigate(action.id)}
                    className={`btn-xl ${action.bgColor} ${action.hoverColor} text-white shadow-large 
                      hover:shadow-xl hover:scale-105 transform transition-all duration-300 group
                      animate-slide-up`}
                    style={{ animationDelay: `${700 + (index * 100)}ms` }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                        {action.icon}
                      </span>
                      <div className="text-left">
                        <div className="font-bold">{action.label}</div>
                        <div className="text-sm opacity-90">{action.description}</div>
                      </div>
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto animate-slide-up animation-delay-700">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">48K+</div>
                  <div className="text-sm text-white/80">Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">1.2K+</div>
                  <div className="text-sm text-white/80">Debates Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">85%</div>
                  <div className="text-sm text-white/80">Satisfacción</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in animation-delay-300">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`card-interactive glass rounded-2xl p-8 border border-white/30 cursor-pointer 
                  transform transition-all duration-500 hover:scale-105 hover:shadow-large
                  animate-slide-up group backdrop-blur-lg`}
                style={{ animationDelay: `${1000 + (index * 150)}ms` }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed group-hover:text-white/95 transition-colors">
                    {feature.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-white/80 group-hover:text-white font-medium">
                    <span>Explorar</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-slide-up animation-delay-500">
            <div className="glass rounded-2xl p-8 border border-white/30 backdrop-blur-lg max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Listo para participar?
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Únete a miles de colombianos que ya están construyendo el futuro de nuestro país
              </p>
              <button 
                onClick={() => onNavigate('surveys')}
                className="btn-xl gradient-colombia text-white font-bold shadow-large hover:shadow-xl 
                  hover:scale-105 transform transition-all duration-300 border-2 border-white/20"
              >
                <span className="flex items-center gap-3">
                  <span>🚀</span>
                  <span>Comenzar Ahora</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Desliza para explorar</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;