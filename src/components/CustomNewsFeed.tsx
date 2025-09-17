import React from 'react';

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const CustomNewsFeed: React.FC = () => {
  const categories: CategoryCard[] = [
    {
      id: 'gustavo-petro',
      title: 'Gustavo Petro',
      description: 'Últimas noticias y declaraciones del Presidente de Colombia',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      icon: '👤'
    },
    {
      id: 'donald-trump',
      title: 'Donald Trump',
      description: 'Noticias internacionales y política estadounidense',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
      icon: '🇺🇸'
    },
    {
      id: 'crime-drugs',
      title: 'Crime and Drugs',
      description: 'Seguridad ciudadana y lucha contra el narcotráfico',
      color: 'bg-gradient-to-br from-gray-600 to-gray-800',
      icon: '🚨'
    },
    {
      id: 'employment',
      title: 'Employment',
      description: 'Mercado laboral y oportunidades de empleo en Colombia',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      icon: '💼'
    },
    {
      id: 'terror',
      title: 'Terror',
      description: 'Noticias sobre terrorismo y seguridad nacional',
      color: 'bg-gradient-to-br from-orange-600 to-red-600',
      icon: '⚠️'
    },
    {
      id: 'rightwing',
      title: 'Right-wing',
      description: 'Perspectivas y noticias del sector político conservador',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      icon: '🗳️'
    },
    {
      id: 'leftwing',
      title: 'Left-wing',
      description: 'Perspectivas y noticias del sector político progresista',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      icon: '🌹'
    },
    {
      id: 'legislation',
      title: 'Legislation',
      description: 'Nuevas leyes y proyectos legislativos en trámite',
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      icon: '📜'
    },
    {
      id: 'congress-colombia',
      title: 'Congress of Colombia',
      description: 'Actividades y decisiones del Congreso de la República',
      color: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      icon: '🏛️'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    // This could be extended to navigate to a specific news feed for this category
    console.log(`Category clicked: ${categoryId}`);
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 my-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📰 News Categories</h2>
        <p className="text-gray-600">
          Explore different news categories to stay informed about what matters to you
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`${category.color} rounded-lg p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{category.icon}</span>
              <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            
            <p className="text-white/90 text-sm leading-relaxed">
              {category.description}
            </p>
            
            <div className="mt-4 flex items-center text-sm opacity-80">
              <span>Click to explore</span>
              <span className="ml-2">→</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-800">
          <span className="text-lg">ℹ️</span>
          <span className="font-medium">Coming Soon</span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Click on any category to access real-time news feeds and analysis. 
          Features include personalized recommendations and community discussions.
        </p>
      </div>
    </div>
  );
};

export default CustomNewsFeed;