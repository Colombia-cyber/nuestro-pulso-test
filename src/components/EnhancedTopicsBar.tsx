import React, { useState } from 'react';

interface Topic {
  id: string;
  name: string;
  icon: string;
  color: string;
  trend?: boolean;
}

interface EnhancedTopicsBarProps {
  onTopicSelect: (topicId: string) => void;
  selectedTopic?: string;
}

const EnhancedTopicsBar: React.FC<EnhancedTopicsBarProps> = ({ onTopicSelect, selectedTopic }) => {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  const topics: Topic[] = [
    { id: 'crime', name: 'Crime', icon: '🚔', color: 'from-red-500 to-orange-500', trend: true },
    { id: 'corruption', name: 'Corruption', icon: '⚖️', color: 'from-gray-600 to-gray-800', trend: true },
    { id: 'employment', name: 'Employment', icon: '💼', color: 'from-blue-500 to-indigo-600' },
    { id: 'political-issues', name: 'Political Issues', icon: '🏛️', color: 'from-purple-500 to-pink-600', trend: true },
    { id: 'sport', name: 'Sport', icon: '⚽', color: 'from-green-500 to-emerald-600' },
    { id: 'terrorism', name: 'Terrorism', icon: '🛡️', color: 'from-red-600 to-red-800' },
    { id: 'right-wing', name: 'Right Wing', icon: '🗳️', color: 'from-orange-500 to-red-600', trend: true },
    { id: 'economy', name: 'Economy', icon: '💰', color: 'from-yellow-500 to-orange-500' },
    { id: 'environment', name: 'Environment', icon: '🌱', color: 'from-green-400 to-green-600' },
    { id: 'education', name: 'Education', icon: '📚', color: 'from-blue-400 to-blue-600' },
    { id: 'health', name: 'Health', icon: '🏥', color: 'from-pink-400 to-pink-600' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'from-indigo-400 to-purple-600' }
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
            <span className="text-white text-lg">🔥</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Topics Trending</h2>
            <p className="text-sm text-gray-600">Explora los temas más relevantes</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span className="animate-pulse">🔴</span>
          <span>En vivo</span>
        </div>
      </div>

      {/* Scrollable Topics */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
              className={`
                flex-shrink-0 relative group transition-all duration-300 transform
                ${selectedTopic === topic.id ? 'scale-105' : 'hover:scale-105'}
                ${hoveredTopic === topic.id ? 'z-10' : ''}
              `}
            >
              <div className={`
                px-4 py-3 rounded-xl text-white font-semibold text-sm
                bg-gradient-to-r ${topic.color}
                shadow-lg hover:shadow-xl transition-all duration-300
                ${selectedTopic === topic.id ? 'ring-2 ring-white ring-offset-2' : ''}
                relative overflow-hidden
              `}>
                {/* Pulse animation for trending topics */}
                {topic.trend && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 
                                animate-pulse opacity-50" />
                )}
                
                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-lg">{topic.icon}</span>
                  <span className="whitespace-nowrap">{topic.name}</span>
                  {topic.trend && (
                    <span className="text-xs bg-white/20 px-1 py-0.5 rounded-full animate-bounce">
                      🔥
                    </span>
                  )}
                </div>

                {/* Hover effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                  transition-all duration-300 transform translate-x-[-100%]
                  ${hoveredTopic === topic.id ? 'translate-x-[100%]' : ''}
                `} />
              </div>

              {/* Tooltip */}
              {hoveredTopic === topic.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20">
                  <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap
                                 shadow-lg opacity-90">
                    <div className="font-semibold">{topic.name}</div>
                    <div className="text-gray-300">Click to explore</div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                                   border-l-4 border-r-4 border-b-4 border-transparent border-b-black" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent 
                       pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent 
                       pointer-events-none" />
      </div>

      {/* Quick stats */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span>👥</span>
            <span>250K+ usuarios activos</span>
          </span>
          <span className="flex items-center gap-1">
            <span>💬</span>
            <span>15K+ discusiones hoy</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>Actualizado hace 2 min</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        `
      }} />
    </div>
  );
};

export default EnhancedTopicsBar;