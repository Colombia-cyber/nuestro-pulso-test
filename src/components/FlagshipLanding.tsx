import React, { useState, useEffect } from 'react';
import { 
  FiMessageCircle, 
  FiUsers, 
  FiBarChart, 
  FiFileText,
  FiShoppingBag,
  FiHeart,
  FiEye,
  FiVolume2,
  FiCpu,
  FiAlertTriangle,
  FiSearch,
  FiActivity,
  FiArrowRight,
  FiPlay,
  FiStar,
  FiTrendingUp,
  FiMapPin
} from 'react-icons/fi';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  stats: string;
  trending?: boolean;
  comingSoon?: boolean;
}

const featuredModules: ModuleCard[] = [
  {
    id: 'chat',
    title: 'Chat Cívico',
    description: 'Conversaciones ciudadanas en tiempo real sobre temas que importan a Colombia',
    icon: FiMessageCircle,
    color: 'from-blue-500 to-blue-600',
    stats: '12.3K conversaciones activas',
    trending: true
  },
  {
    id: 'debate',
    title: 'Debates',
    description: 'Debates estructurados con moderación IA sobre políticas públicas',
    icon: FiUsers,
    color: 'from-purple-500 to-purple-600',
    stats: '847 debates esta semana'
  },
  {
    id: 'polls',
    title: 'Encuestas',
    description: 'Pulso ciudadano en tiempo real sobre decisiones importantes',
    icon: FiBarChart,
    color: 'from-green-500 to-green-600',
    stats: '67% participación nacional',
    trending: true
  },
  {
    id: 'news',
    title: 'Noticias Verificadas',
    description: 'Información confiable con análisis de sesgo y fact-checking automático',
    icon: FiFileText,
    color: 'from-red-500 to-red-600',
    stats: '2.1K noticias verificadas hoy'
  },
  {
    id: 'congress',
    title: 'Congreso en Vivo',
    description: 'Seguimiento transparente de proyectos de ley y votaciones',
    icon: FiEye,
    color: 'from-indigo-500 to-indigo-600',
    stats: '43 proyectos en trámite'
  },
  {
    id: 'elections',
    title: 'Hub Electoral',
    description: 'Centro completo de información electoral y candidatos',
    icon: FiVolume2,
    color: 'from-yellow-500 to-orange-500',
    stats: 'Próximas: Oct 2025',
    comingSoon: true
  }
];

const secondaryModules: ModuleCard[] = [
  {
    id: 'marketplace',
    title: 'Mercado Cívico',
    description: 'Economía colaborativa con impacto social',
    icon: FiShoppingBag,
    color: 'from-pink-500 to-pink-600',
    stats: '1.2K emprendedores'
  },
  {
    id: 'care',
    title: 'Red de Cuidado',
    description: 'Apoyo comunitario y servicios de bienestar',
    icon: FiHeart,
    color: 'from-rose-500 to-rose-600',
    stats: '567 voluntarios activos'
  },
  {
    id: 'assistant',
    title: 'Asistente IA',
    description: 'Tu guía personal para navegación cívica',
    icon: FiCpu,
    color: 'from-cyan-500 to-cyan-600',
    stats: '24/7 disponible'
  },
  {
    id: 'alerts',
    title: 'Alertas',
    description: 'Notificaciones importantes para tu región',
    icon: FiAlertTriangle,
    color: 'from-amber-500 to-amber-600',
    stats: '15 alertas hoy'
  }
];

const FlagshipLanding: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const platformStats = [
    { label: 'Ciudadanos Activos', value: '1.2M+', icon: FiUsers },
    { label: 'Conversaciones Diarias', value: '45K+', icon: FiMessageCircle },
    { label: 'Decisiones Influenciadas', value: '234', icon: FiTrendingUp },
    { label: 'Municipios Conectados', value: '1,102', icon: FiMapPin }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % platformStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [platformStats.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-red-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Headline */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇨🇴</span>
                <div className="text-left">
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600 bg-clip-text text-transparent">
                    Nuestro Pulso
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mt-2">
                    La Red Cívica de Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                La plataforma que conecta ciudadanos, instituciones y líderes para 
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> fortalecer la democracia </span>
                participativa en Colombia través de tecnología innovadora.
              </p>
            </div>

            {/* Platform Stats */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 max-w-md mx-auto mb-10">
                <div className="flex items-center justify-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                    {React.createElement(platformStats[currentStat].icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-800">{platformStats[currentStat].value}</p>
                    <p className="text-sm text-gray-600">{platformStats[currentStat].label}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <span>Unirse Ahora</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <FiPlay className="w-5 h-5" />
                  <span>Ver Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Modules Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Módulos Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas poderosas para fortalecer la participación ciudadana y la transparencia democrática
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div 
                  key={module.id}
                  className={`group bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${module.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      {module.trending && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FiTrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </span>
                      )}
                      {module.comingSoon && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Próximamente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Module Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {module.description}
                  </p>
                  
                  {/* Module Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {module.stats}
                    </span>
                    <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary Modules Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-gray-600">
              Herramientas complementarias para una experiencia cívica completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div 
                  key={module.id}
                  className="group bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-white/20 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`p-2 bg-gradient-to-r ${module.color} rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                    {module.description}
                  </p>
                  <span className="text-xs font-medium text-gray-500">
                    {module.stats}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🇨🇴 Únete a la Revolución Cívica
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Sé parte del cambio que Colombia necesita. Tu voz importa, tu participación cuenta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Crear Cuenta Gratis
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Explorar Plataforma
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlagshipLanding;