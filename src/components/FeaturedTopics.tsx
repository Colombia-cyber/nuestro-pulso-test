import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync, FaSpinner, FaBolt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream, MdFlashOn } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';
import { topicNewsService, TopicNewsResponse } from '../services/topicNewsService';

interface FeaturedTopicsProps {
  onTopicSelect: (topic: NewsTopic, category: 'local' | 'world') => void;
  selectedCategory: 'local' | 'world';
  className?: string;
  onNewsUpdate?: (newsData: TopicNewsResponse, topic: NewsTopic) => void;
  onInstantLoad?: (topic: NewsTopic, category: 'local' | 'world', newsData: TopicNewsResponse) => void;
}

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
  isLoading?: boolean;
}

// Dynamic topic display configuration
interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

// Mapping to provide display labels, descriptions, urgency, and category for each topic
const topicLabels: Record<string, { displayText: string; description: string; urgencyLevel: 'high' | 'medium' | 'normal'; category: 'breaking' | 'politics' | 'security' | 'analysis' }> = {
  "drugs-crime":        { displayText: "DROGAS Y CRIMEN", description: "Narcotráfico, crimen organizado, justicia", urgencyLevel: 'high', category: 'security' },
  "terror-news":        { displayText: "TERRORISMO Y SEGURIDAD", description: "Alertas de seguridad nacional y terrorismo", urgencyLevel: 'high', category: 'breaking' },
  "gustavo-petro":      { displayText: "GUSTAVO PETRO NOTICIAS", description: "Presidente de Colombia y gobierno nacional", urgencyLevel: 'medium', category: 'politics' },
  "congress":           { displayText: "CONGRESO DE COLOMBIA", description: "Actividad del Congreso de la República", urgencyLevel: 'medium', category: 'politics' },
  "left-wing":          { displayText: "IZQUIERDA POLÍTICA", description: "Perspectiva progresista y de izquierda", urgencyLevel: 'normal', category: 'analysis' },
  "right-wing":         { displayText: "DERECHA POLÍTICA", description: "Perspectiva conservadora y de derecha", urgencyLevel: 'normal', category: 'analysis' },
  "donald-trump-local": { displayText: "TRUMP COLOMBIA", description: "Impacto de Donald Trump en Colombia", urgencyLevel: 'medium', category: 'politics' },
  "donald-trump-world": { displayText: "DONALD TRUMP GLOBAL", description: "Noticias mundiales sobre Donald Trump", urgencyLevel: 'high', category: 'politics' },
  "world-terror":       { displayText: "TERRORISMO MUNDIAL", description: "Terrorismo y seguridad internacional", urgencyLevel: 'high', category: 'security' },
  "world-right-wing":   { displayText: "DERECHA MUNDIAL", description: "Perspectiva conservadora global", urgencyLevel: 'normal', category: 'analysis' },
  "world-left-wing":    { displayText: "IZQUIERDA MUNDIAL", description: "Perspectiva progresista global", urgencyLevel: 'normal', category: 'analysis' },
  "world-travel":       { displayText: "MEJORES DESTINOS", description: "Mejores lugares para viajar", urgencyLevel: 'normal', category: 'analysis' }
};

const FeaturedTopics: React.FC<FeaturedTopicsProps> = ({
  onTopicSelect,
  selectedCategory,
  className = "",
  onNewsUpdate,
  onInstantLoad
}) => {
  const [priorityTopics, setPriorityTopics] = useState<NewsTopic[]>([]);
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicDisplays, setTopicDisplays] = useState<TopicDisplay[]>([]);

  // Dynamically build topicDisplays from priorityTopics and the label map
  useEffect(() => {
    setIsLoading(true);
    const topics = getPriorityTopics(selectedCategory);
    setPriorityTopics(topics);

    // Build display configuration for only present topics
    const displays: TopicDisplay[] = topics
      .map(topic => {
        const label = topicLabels[topic.id];
        if (!label) return null;
        return {
          topic,
          displayText: label.displayText,
          description: label.description,
          urgencyLevel: label.urgencyLevel,
          category: label.category
        };
      })
      .filter(Boolean) as TopicDisplay[];
    setTopicDisplays(displays);

    // Initialize stats for each topic
    const initialStats: Record<string, TopicStats> = {};
    topics.forEach(topic => {
      initialStats[topic.id] = {
        liveCount: Math.floor(Math.random() * 20) + 5,
        totalCount: Math.floor(Math.random() * 100) + 50,
        lastUpdate: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
        isLoading: false
      };
    });
    setTopicStats(initialStats);
    setIsLoading(false);
    setLastUpdated(new Date());
  }, [selectedCategory]);

  // Handle topic click
  const handleTopicClick = async (topicDisplay: TopicDisplay) => {
    const { topic } = topicDisplay;
    setSelectedTopic(topic.id);

    // Update stats to show loading
    setTopicStats(prev => ({
      ...prev,
      [topic.id]: {
        ...prev[topic.id],
        isLoading: true
      }
    }));

    try {
      // Fetch news data using the service
      const newsData = await topicNewsService.fetchTopicNews({
        topic,
        mode: selectedCategory,
        limit: 20
      });

      // Update stats
      setTopicStats(prev => ({
        ...prev,
        [topic.id]: {
          liveCount: newsData.totalCount,
          totalCount: newsData.totalCount + Math.floor(Math.random() * 50),
          lastUpdate: newsData.lastUpdated,
          isLoading: false
        }
      }));

      // Call callbacks
      if (onNewsUpdate) {
        onNewsUpdate(newsData, topic);
      }

      if (onInstantLoad) {
        onInstantLoad(topic, selectedCategory, newsData);
      }

      // Call main topic select handler
      onTopicSelect(topic, selectedCategory);

    } catch (error) {
      console.error('Error loading topic news:', error);
      // Reset loading state on error
      setTopicStats(prev => ({
        ...prev,
        [topic.id]: {
          ...prev[topic.id],
          isLoading: false
        }
      }));
    }

    setSelectedTopic(null);
  };

  // Get urgency color
  const getUrgencyColor = (urgency: 'high' | 'medium' | 'normal') => {
    switch (urgency) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: 'breaking' | 'politics' | 'security' | 'analysis') => {
    switch (category) {
      case 'breaking': return <FaBolt className="text-orange-500" />;
      case 'politics': return <FaNewspaper className="text-blue-500" />;
      case 'security': return <FaFire className="text-red-500" />;
      case 'analysis': return <MdViewStream className="text-purple-500" />;
      default: return <FaEye className="text-gray-500" />;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MdFlashOn className="text-yellow-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === 'local' ? 'Temas Locales' : 'Temas Mundiales'}
          </h2>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaSync className="mr-1" />
          <span>Actualizado: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Topics Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <FaSpinner className="animate-spin text-blue-500 text-2xl mr-2" />
          <span className="text-gray-600 dark:text-gray-300">Cargando temas...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicDisplays.map((topicDisplay) => {
            const stats = topicStats[topicDisplay.topic.id];
            const isSelected = selectedTopic === topicDisplay.topic.id;
            
            return (
              <div
                key={topicDisplay.topic.id}
                onClick={() => handleTopicClick(topicDisplay)}
                className={`
                  relative bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                  hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105
                  ${isSelected ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {/* Topic Header */}
                <div className={`bg-gradient-to-r ${topicDisplay.topic.color} p-4 rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{topicDisplay.topic.emoji}</span>
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(topicDisplay.category)}
                        <span className={`text-xs font-medium ${getUrgencyColor(topicDisplay.urgencyLevel)}`}>
                          {topicDisplay.urgencyLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {stats?.isLoading && (
                      <FaSpinner className="animate-spin text-white text-sm" />
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm mt-2 leading-tight">
                    {topicDisplay.displayText}
                  </h3>
                </div>

                {/* Topic Content */}
                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                    {topicDisplay.description}
                  </p>
                  
                  {/* Stats */}
                  {stats && (
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-red-500">
                          <FaFire className="mr-1" />
                          <span>{stats.liveCount}</span>
                        </div>
                        <div className="flex items-center text-blue-500">
                          <BiTrendingUp className="mr-1" />
                          <span>{stats.totalCount}</span>
                        </div>
                      </div>
                      <FaArrowRight className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && topicDisplays.length === 0 && (
        <div className="text-center py-8">
          <FaEye className="text-gray-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            No hay temas disponibles para la categoría {selectedCategory}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedTopics;
