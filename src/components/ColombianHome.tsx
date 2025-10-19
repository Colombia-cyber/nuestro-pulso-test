import React from 'react';
import { FaVideo, FaNewspaper, FaComments, FaPoll, FaFire, FaArrowRight, FaFlag, FaUsers } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdWhatshot, MdVerified } from 'react-icons/md';

interface ColombianHomeProps {
  onNavigate: (section: string) => void;
}

export const ColombianHome: React.FC<ColombianHomeProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'reels',
      title: 'Reels',
      subtitle: 'Videos Virales',
      description: 'Los videos más populares de Colombia y el mundo',
      icon: FaVideo,
      gradient: 'from-colombia-blue to-blue-700',
      stats: '10K+ videos',
    },
    {
      id: 'news',
      title: 'Noticias',
      subtitle: 'Información Verificada',
      description: 'Últimas noticias de fuentes confiables colombianas',
      icon: FaNewspaper,
      gradient: 'from-colombia-red to-red-700',
      stats: '500+ diarias',
    },
    {
      id: 'debates',
      title: 'Debates',
      subtitle: 'Discusiones Constructivas',
      description: 'Participa en debates sobre temas importantes',
      icon: FaComments,
      gradient: 'from-purple-500 to-purple-700',
      stats: '200+ activos',
    },
    {
      id: 'surveys',
      title: 'Encuestas',
      subtitle: 'Tu Voz Cuenta',
      description: 'Vota en encuestas y comparte tu opinión',
      icon: FaPoll,
      gradient: 'from-green-500 to-green-700',
      stats: '50K+ votos',
    },
    {
      id: 'tendencies',
      title: 'Tendencias',
      subtitle: 'Lo Más Hablado',
      description: 'Descubre qué está trending en Colombia',
      icon: BiTrendingUp,
      gradient: 'from-orange-500 to-red-600',
      stats: '100+ temas',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Colombian Flag Inspired */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-colombia-animated opacity-10"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center animate-fade-in-down">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white rounded-full p-8 shadow-colombia">
                  <FaFlag className="w-20 h-20 text-colombia-blue" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-colombia-gradient">Nuestro Pulso</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-4 flex items-center justify-center gap-2">
              <MdVerified className="text-colombia-blue text-3xl" />
              Plataforma Cívica de Colombia
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Conectando a los colombianos con noticias verificadas, debates constructivos, 
              y tendencias que importan. Tu voz, tu participación, tu país.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="glass-card px-6 py-4 rounded-2xl">
                <div className="text-3xl font-bold text-colombia-blue">500K+</div>
                <div className="text-sm text-gray-600">Usuarios Activos</div>
              </div>
              <div className="glass-card px-6 py-4 rounded-2xl">
                <div className="text-3xl font-bold text-colombia-red">1M+</div>
                <div className="text-sm text-gray-600">Votos Registrados</div>
              </div>
              <div className="glass-card px-6 py-4 rounded-2xl">
                <div className="text-3xl font-bold text-colombia-yellow">10K+</div>
                <div className="text-sm text-gray-600">Debates Activos</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('news')}
                className="px-8 py-4 bg-gradient-to-r from-colombia-blue to-blue-700 text-white rounded-2xl font-bold text-lg hover:shadow-floating transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <FaNewspaper />
                Ver Noticias
                <FaArrowRight />
              </button>
              <button
                onClick={() => onNavigate('reels')}
                className="px-8 py-4 glass-card hover:shadow-floating transform hover:scale-105 transition-all duration-300 flex items-center gap-3 font-bold text-lg"
              >
                <FaVideo />
                Explorar Reels
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-colombia-gradient mb-4">
              Explora Nuestras Secciones
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo que necesitas para estar informado y participar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className="glass-card p-8 hover:shadow-floating transition-all duration-300 cursor-pointer group card-3d"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-colombia-yellow group-hover:via-colombia-blue group-hover:to-colombia-red transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-500">
                      {feature.stats}
                    </span>
                    <FaArrowRight className={`text-gray-400 group-hover:text-colombia-blue group-hover:translate-x-2 transition-all duration-300`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 rounded-3xl bg-gradient-to-r from-colombia-yellow/10 via-colombia-blue/10 to-colombia-red/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-colombia-gradient mb-4">
                ¿Por Qué Nuestro Pulso?
              </h2>
              <p className="text-lg text-gray-600">
                La plataforma de participación cívica más completa de Colombia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white mb-4">
                  <MdVerified className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Información Verificada</h3>
                <p className="text-gray-600">
                  Solo fuentes confiables y verificadas para mantenerte informado correctamente
                </p>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-4">
                  <FaUsers className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidad Activa</h3>
                <p className="text-gray-600">
                  Más de 500,000 colombianos participando activamente cada día
                </p>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white mb-4">
                  <MdWhatshot className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Siempre Actualizado</h3>
                <p className="text-gray-600">
                  Contenido actualizado en tiempo real para no perderte nada importante
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
