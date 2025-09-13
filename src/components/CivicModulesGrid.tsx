import React from "react";
import { FiMessageCircle, FiUsers, FiBarChart, FiFileText, FiHome, FiShoppingBag, FiHeart, FiCpu, FiBell } from "react-icons/fi";

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  href: string;
  badge?: string;
  isLive?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon, title, description, color, href, badge, isLive }) => (
  <a
    href={href}
    className={`group glass-card p-6 rounded-2xl hover-lift cursor-pointer transition-all duration-300 border-l-4 ${color}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color.replace('border-l-', 'from-')} to-transparent`}>
        {icon}
      </div>
      {badge && (
        <span className="bg-colombia-red text-white text-xs px-2 py-1 rounded-full font-bold">
          {badge}
        </span>
      )}
      {isLive && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-red-500 font-bold">EN VIVO</span>
        </div>
      )}
    </div>
    
    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-colombia-blue transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
    
    <div className="mt-4 flex items-center text-colombia-blue text-sm font-medium">
      <span>Explorar</span>
      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </a>
);

const CivicModulesGrid: React.FC = () => {
  const modules = [
    {
      icon: <FiMessageCircle className="w-6 h-6 text-white" />,
      title: "Chat en Vivo",
      description: "Conversaciones en tiempo real sobre temas de interés nacional. Conecta con ciudadanos de todo Colombia.",
      color: "border-l-green-500",
      href: "/chat",
      isLive: true,
      badge: "1.2k"
    },
    {
      icon: <FiUsers className="w-6 h-6 text-white" />,
      title: "Debates",
      description: "Participa en debates estructurados sobre políticas públicas y temas sociales importantes.",
      color: "border-l-blue-500",
      href: "/debates",
      badge: "234"
    },
    {
      icon: <FiBarChart className="w-6 h-6 text-white" />,
      title: "Encuestas",
      description: "Comparte tu opinión en encuestas sobre temas de actualidad y ve resultados en tiempo real.",
      color: "border-l-purple-500",
      href: "/encuestas",
      badge: "45k"
    },
    {
      icon: <FiFileText className="w-6 h-6 text-white" />,
      title: "Noticias",
      description: "Mantente informado con las últimas noticias verificadas de Colombia y análisis en profundidad.",
      color: "border-l-orange-500",
      href: "/noticias",
      isLive: true
    },
    {
      icon: <FiHome className="w-6 h-6 text-white" />,
      title: "Congreso",
      description: "Sigue la actividad legislativa, proyectos de ley, votaciones y decisiones del Congreso.",
      color: "border-l-red-500",
      href: "/congreso"
    },
    {
      icon: <FiShoppingBag className="w-6 h-6 text-white" />,
      title: "Mercado",
      description: "Marketplace comunitario para productos locales, servicios y iniciativas ciudadanas.",
      color: "border-l-emerald-500",
      href: "/mercado",
      badge: "NUEVO"
    },
    {
      icon: <FiHeart className="w-6 h-6 text-white" />,
      title: "Cuidado",
      description: "Servicios de bienestar social, salud mental y recursos de apoyo para la comunidad.",
      color: "border-l-pink-500",
      href: "/cuidado"
    },
    {
      icon: <FiCpu className="w-6 h-6 text-white" />,
      title: "IA Asistente",
      description: "Asistente inteligente para información cívica, trámites gubernamentales y consultas.",
      color: "border-l-indigo-500",
      href: "/ia",
      badge: "BETA"
    },
    {
      icon: <FiBell className="w-6 h-6 text-white" />,
      title: "Alertas",
      description: "Notificaciones importantes sobre eventos cívicos, emergencias y actualizaciones legislativas.",
      color: "border-l-yellow-500",
      href: "/alertas",
      isLive: true
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Plataforma Cívica Completa
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Nueve módulos diseñados para fortalecer la participación ciudadana y la democracia en Colombia
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para participar?
            </h3>
            <p className="text-white/80 mb-6">
              Únete a miles de colombianos que ya están construyendo el futuro del país
            </p>
            <button className="bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white px-8 py-4 rounded-full font-bold text-lg hover-lift">
              Crear Cuenta Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CivicModulesGrid;