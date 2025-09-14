import React from 'react';

type ModuleType = 'home' | 'chat' | 'news' | 'debate' | 'polls' | 'congress' | 'elections' | 'assistant' | 'reels' | 'alerts' | 'marketplace' | 'care';

interface ModuleGridProps {
  onModuleSelect: (module: ModuleType) => void;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ onModuleSelect }) => {
  const modules = [
    {
      id: 'chat' as ModuleType,
      name: 'Chat Cívico',
      description: 'Conversaciones en tiempo real sobre temas de interés nacional',
      icon: '💬',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      participants: '1,247 activos'
    },
    {
      id: 'news' as ModuleType,
      name: 'Noticias',
      description: 'Últimas noticias y análisis de la política colombiana',
      icon: '📰',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      participants: '85 artículos nuevos'
    },
    {
      id: 'debate' as ModuleType,
      name: 'Debates',
      description: 'Debates estructurados sobre políticas públicas',
      icon: '🗣️',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      participants: '23 debates activos'
    },
    {
      id: 'polls' as ModuleType,
      name: 'Encuestas',
      description: 'Participa en encuestas y consultas ciudadanas',
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      participants: '12 encuestas abiertas'
    },
    {
      id: 'congress' as ModuleType,
      name: 'Congreso',
      description: 'Seguimiento de la actividad legislativa en tiempo real',
      icon: '🏛️',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      participants: '45 proyectos activos'
    },
    {
      id: 'elections' as ModuleType,
      name: 'Elecciones',
      description: 'Centro de información electoral y candidatos',
      icon: '🗳️',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      participants: 'Próximas elecciones'
    },
    {
      id: 'assistant' as ModuleType,
      name: 'Asistente Cívico',
      description: 'Tu guía inteligente para la participación ciudadana',
      icon: '🤖',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      participants: 'IA disponible 24/7'
    },
    {
      id: 'reels' as ModuleType,
      name: 'Pulse Feed',
      description: 'Contenido cívico en formato corto y dinámico',
      icon: '📱',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      participants: '156 videos nuevos'
    },
    {
      id: 'alerts' as ModuleType,
      name: 'Alertas',
      description: 'Notificaciones personalizadas de eventos importantes',
      icon: '🔔',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      participants: '5 alertas activas'
    },
    {
      id: 'marketplace' as ModuleType,
      name: 'Marketplace',
      description: 'Plataforma para iniciativas y proyectos cívicos',
      icon: '🛒',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      participants: '34 proyectos'
    },
    {
      id: 'care' as ModuleType,
      name: 'Red de Cuidado',
      description: 'Network de apoyo y recursos comunitarios',
      icon: '🤝',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      participants: '2,891 miembros'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explora Todos los Módulos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accede a herramientas completas para la participación cívica. 
            Cada módulo está diseñado para empoderarte como ciudadano activo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`glass-card hover:glass-card-strong ${module.bgColor} group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              onClick={() => onModuleSelect(module.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{module.icon}</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-600">
                  Nuevo
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  {module.participants}
                </span>
                <div className="flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card-strong rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para participar?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a miles de colombianos que ya están construyendo el futuro del país
            </p>
            <button className="btn-primary">
              Crear Cuenta Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleGrid;