import React from 'react';

const TrendingTopics: React.FC = () => {
  const topics = [
    { id: 1, title: 'Reforma Tributaria', posts: 1247, trend: 'up' },
    { id: 2, title: 'Política Ambiental', posts: 892, trend: 'up' },
    { id: 3, title: 'Educación Pública', posts: 634, trend: 'down' },
    { id: 4, title: 'Salud Universal', posts: 456, trend: 'up' },
    { id: 5, title: 'Corrupción', posts: 378, trend: 'steady' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🔥 Tendencias
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-4">
                  {index + 1}
                </span>
                <div>
                  <div className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    {topic.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {topic.posts} publicaciones
                  </div>
                </div>
              </div>
              
              <div className="text-lg">
                {topic.trend === 'up' && '📈'}
                {topic.trend === 'down' && '📉'}
                {topic.trend === 'steady' && '➡️'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Ver todas las tendencias
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;