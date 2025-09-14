import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="section-hero relative">
      {/* Background with Colombian elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-colombian-blue/90 via-colombian-yellow/80 to-colombian-red/90">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full floating-element"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white/15 rounded-full floating-element" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-white/10 rounded-full floating-element" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8 fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="w-12 h-8 bg-gradient-to-r from-colombian-yellow via-colombian-blue to-colombian-red rounded-sm shadow-lg"></div>
                <span className="text-white font-bold text-lg">COLOMBIA</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                NUESTRO
                <span className="block text-gradient text-6xl lg:text-8xl font-black">
                  PULSO
                </span>
              </h1>
              
              <div className="text-2xl lg:text-3xl font-semibold text-white/90">
                Tu Voz en la Democracia
              </div>
            </div>

            <p className="text-xl text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              La plataforma cívica más avanzada de Colombia. Participa en debates, encuestas, 
              chat en vivo y sigue la actividad del Congreso en tiempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="btn-primary text-lg px-8 py-4"
              >
                🚀 Comenzar Ahora
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                📺 Ver Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">47K+</div>
                <div className="text-white/70 text-sm">Ciudadanos Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1.2K+</div>
                <div className="text-white/70 text-sm">Debates Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">340+</div>
                <div className="text-white/70 text-sm">Propuestas Seguidas</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Elements */}
          <div className="relative slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card-strong rounded-3xl p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-colombian-blue mb-2">
                  Módulos Principales
                </h3>
                <p className="text-gray-600">
                  Acceso directo a todas las funcionalidades
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Chat Cívico', icon: '💬', color: 'bg-blue-500' },
                  { name: 'Debates', icon: '🗣️', color: 'bg-green-500' },
                  { name: 'Encuestas', icon: '📊', color: 'bg-purple-500' },
                  { name: 'Congreso', icon: '🏛️', color: 'bg-red-500' },
                  { name: 'Elecciones', icon: '🗳️', color: 'bg-orange-500' },
                  { name: 'Noticias', icon: '📰', color: 'bg-indigo-500' },
                  { name: 'Asistente', icon: '🤖', color: 'bg-pink-500' },
                  { name: 'Comunidad', icon: '👥', color: 'bg-teal-500' },
                ].map((module, index) => (
                  <div
                    key={module.name}
                    className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                      <span className="text-2xl">{module.icon}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {module.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div className="text-sm text-gray-500 mb-2">🔥 Tendencias Ahora</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['#ReformaTributaria', '#PazTotal', '#CambioClimático'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-colombian-yellow/20 to-colombian-blue/20 text-colombian-blue px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 glass-card p-4 rounded-xl animate-bounce-slow">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">
                  1,247 en línea
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;