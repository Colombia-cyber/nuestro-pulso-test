import React from 'react';

const HomePage: React.FC = () => {
  const modules = [
    {
      id: 'chat',
      title: 'Chat en Vivo',
      description: 'Únete a conversaciones en tiempo real sobre temas de interés nacional.',
      color: 'blue',
      icon: '💬'
    },
    {
      id: 'debate',
      title: 'Debates',
      description: 'Participa en debates estructurados sobre políticas públicas.',
      color: 'green',
      icon: '🗣️'
    },
    {
      id: 'survey',
      title: 'Encuestas',
      description: 'Comparte tu opinión en encuestas sobre temas de actualidad.',
      color: 'purple',
      icon: '📊'
    },
    {
      id: 'news',
      title: 'Noticias Verificadas',
      description: 'Accede a noticias verificadas y análisis independiente.',
      color: 'red',
      icon: '📰'
    },
    {
      id: 'congress',
      title: 'Tracker del Congreso',
      description: 'Sigue la actividad legislativa y decisiones del Congreso.',
      color: 'yellow',
      icon: '🏛️'
    },
    {
      id: 'elections',
      title: 'Hub Electoral',
      description: 'Centro de información sobre procesos electorales.',
      color: 'indigo',
      icon: '🗳️'
    },
    {
      id: 'marketplace',
      title: 'Marketplace Cívico',
      description: 'Conecta con servicios y iniciativas ciudadanas.',
      color: 'pink',
      icon: '🛒'
    },
    {
      id: 'care',
      title: 'Red de Cuidado',
      description: 'Encuentra y ofrece apoyo comunitario.',
      color: 'teal',
      icon: '🤝'
    },
    {
      id: 'copilot',
      title: 'Asistente Cívico',
      description: 'Tu guía inteligente para participación ciudadana.',
      color: 'orange',
      icon: '🤖'
    },
    {
      id: 'search',
      title: 'Motor de Búsqueda',
      description: 'Busca información cívica y gubernamental.',
      color: 'gray',
      icon: '🔍'
    },
    {
      id: 'alerts',
      title: 'Alertas Cívicas',
      description: 'Mantente informado sobre eventos importantes.',
      color: 'rose',
      icon: '🔔'
    },
    {
      id: 'reels',
      title: 'Pulse Reels',
      description: 'Contenido audiovisual sobre participación cívica.',
      color: 'cyan',
      icon: '🎬'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: {[key: string]: string} = {
      blue: 'text-blue-600 hover:bg-blue-50 border-blue-200',
      green: 'text-green-600 hover:bg-green-50 border-green-200',
      purple: 'text-purple-600 hover:bg-purple-50 border-purple-200',
      red: 'text-red-600 hover:bg-red-50 border-red-200',
      yellow: 'text-yellow-600 hover:bg-yellow-50 border-yellow-200',
      indigo: 'text-indigo-600 hover:bg-indigo-50 border-indigo-200',
      pink: 'text-pink-600 hover:bg-pink-50 border-pink-200',
      teal: 'text-teal-600 hover:bg-teal-50 border-teal-200',
      orange: 'text-orange-600 hover:bg-orange-50 border-orange-200',
      gray: 'text-gray-600 hover:bg-gray-50 border-gray-200',
      rose: 'text-rose-600 hover:bg-rose-50 border-rose-200',
      cyan: 'text-cyan-600 hover:bg-cyan-50 border-cyan-200'
    };
    return colorMap[color] || 'text-gray-600 hover:bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Nuestro Pulso
        </h1>
        <p className="text-center text-gray-600 mb-12">
          La plataforma líder de participación cívica en Colombia
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => window.location.hash = module.id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg ${getColorClasses(module.color)} text-left w-full`}
            >
              <div className="text-3xl mb-4">{module.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
              <p className="text-gray-600">
                {module.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;