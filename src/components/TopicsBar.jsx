import React from 'react';

const topics = [
  { id: 'drums', name: 'Drums', icon: '🥁', color: 'from-purple-500 to-pink-500' },
  { id: 'crime', name: 'Crime', icon: '🚨', color: 'from-red-500 to-orange-500' },
  { id: 'corruption', name: 'Corruption', icon: '⚖️', color: 'from-gray-600 to-gray-800' },
  { id: 'employment', name: 'Employment', icon: '💼', color: 'from-blue-500 to-indigo-500' },
  { id: 'political-issues', name: 'Political Issues', icon: '🏛️', color: 'from-indigo-500 to-purple-500' },
  { id: 'sport', name: 'Sport', icon: '⚽', color: 'from-green-500 to-emerald-500' },
  { id: 'terrorism', name: 'Terrorism', icon: '🛡️', color: 'from-red-600 to-red-800' },
  { id: 'right-wing', name: 'Right Wing', icon: '🇨🇴', color: 'from-yellow-400 via-blue-500 to-red-500' }
];

const TopicsBar = ({ onTopicClick }) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-gray-600">ACTUALIZACIONES:</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicClick(topic)}
              className={`flex-shrink-0 group relative bg-gradient-to-r ${topic.color} rounded-lg px-4 py-2 hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              <div className="flex items-center gap-2 text-white">
                <span className="text-lg">{topic.icon}</span>
                <span className="font-medium text-sm whitespace-nowrap">{topic.name}</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsBar;