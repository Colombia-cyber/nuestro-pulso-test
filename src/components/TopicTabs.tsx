import React from 'react';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';

interface TopicTabsProps {
  activeCategory: 'local' | 'world';
  selectedTopic?: NewsTopic | null;
  onTopicClick: (topic: NewsTopic) => void;
  className?: string;
}

const TopicTabs: React.FC<TopicTabsProps> = ({
  activeCategory,
  selectedTopic,
  onTopicClick,
  className = ''
}) => {
  const priorityTopics = getPriorityTopics(activeCategory);

  const handleTopicClick = (topic: NewsTopic) => {
    // INSTANT NAVIGATION: 1-click topic loading
    onTopicClick(topic);
    
    // For Left Wing and Right Wing topics, navigate to dedicated pages
    if (topic.id === 'izquierda-politica' || topic.id === 'left-wing') {
      window.history.pushState(null, '', '/left-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'left-wing' }));
      return;
    }
    
    if (topic.id === 'derecha-politica' || topic.id === 'right-wing' || topic.id === 'right-wing-english') {
      window.history.pushState(null, '', '/right-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'right-wing' }));
      return;
    }
    
    // For other topics, trigger instant search
    // The parent component will handle the actual search logic
  };

  return (
    <div className={`topic-tabs-container ${className}`}>
      {/* Topic Tabs Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          TEMAS PRIORITARIOS - {activeCategory === 'local' ? 'COLOMBIA LOCAL' : 'MUNDO GLOBAL'}
        </h3>
        <p className="text-sm text-gray-600">
          Haz clic en cualquier tema para cargar contenido instantáneamente
        </p>
      </div>

      {/* Topic Tabs Grid - Bold, Text-Only, No Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {priorityTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className={`
              topic-tab-button
              relative overflow-hidden
              px-6 py-4 
              rounded-xl 
              font-extrabold 
              text-sm 
              tracking-wide 
              uppercase
              transition-all 
              duration-300 
              border-2 
              shadow-lg 
              hover:shadow-xl 
              hover:scale-105
              transform
              ${selectedTopic?.id === topic.id
                ? `bg-gradient-to-r ${topic.color} text-white border-white shadow-2xl scale-105`
                : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'
              }
            `}
            title={topic.description}
          >
            {/* Background Gradient for Active State */}
            {selectedTopic?.id === topic.id && (
              <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-100`}></div>
            )}
            
            {/* Topic Name - Bold and Prominent */}
            <span className="relative z-10 font-black text-center block leading-tight">
              {topic.name}
            </span>
            
            {/* Active Indicator */}
            {selectedTopic?.id === topic.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
            )}
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Context Switch Notice */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">
          💡 <strong>Cambio de contexto instantáneo:</strong> Al cambiar entre Local y Mundial, 
          el mismo tema se recarga automáticamente para el nuevo contexto.
        </p>
      </div>
    </div>
  );
};

export default TopicTabs;