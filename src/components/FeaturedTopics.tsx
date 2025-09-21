import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';

interface FeaturedTopicsProps {
  onTopicSelect: (topic: NewsTopic, category: 'local' | 'world') => void;
  selectedCategory: 'local' | 'world';
  className?: string;
}

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
}

const FeaturedTopics: React.FC<FeaturedTopicsProps> = ({
  onTopicSelect,
  selectedCategory,
  className = ""
}) => {
  const [priorityTopics, setPriorityTopics] = useState<NewsTopic[]>([]);
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadPriorityTopics();
  }, [selectedCategory]);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      updateTopicStats();
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [priorityTopics]);

  const loadPriorityTopics = () => {
    setIsLoading(true);
    setTimeout(() => {
      const topics = getPriorityTopics(selectedCategory);
      setPriorityTopics(topics);
      
      // Initialize stats for each topic
      const initialStats: Record<string, TopicStats> = {};
      topics.forEach(topic => {
        initialStats[topic.id] = {
          liveCount: Math.floor(Math.random() * 50) + 10,
          totalCount: Math.floor(Math.random() * 1000) + 100,
          lastUpdate: new Date()
        };
      });
      setTopicStats(initialStats);
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 300);
  };

  const updateTopicStats = () => {
    setTopicStats(prev => {
      const updated = { ...prev };
      priorityTopics.forEach(topic => {
        if (updated[topic.id]) {
          updated[topic.id] = {
            ...updated[topic.id],
            liveCount: updated[topic.id].liveCount + Math.floor(Math.random() * 5) - 2,
            totalCount: updated[topic.id].totalCount + Math.floor(Math.random() * 10),
            lastUpdate: new Date()
          };
        }
      });
      return updated;
    });
    setLastUpdated(new Date());
  };

  const handleTopicClick = (topic: NewsTopic) => {
    onTopicSelect(topic, selectedCategory);
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `Hace ${diffHours}h`;
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-lg">
              <FaFire className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Temas Prioritarios
              </h2>
              <p className="text-gray-600 font-medium">
                {selectedCategory === 'local' ? 'Colombia' : 'Mundo'} • Noticias en vivo
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <MdViewStream className="w-4 h-4 text-green-600 animate-pulse" />
            <span className="text-sm font-semibold text-green-700">
              {formatLastUpdate(lastUpdated)}
            </span>
          </div>
        </div>
        
        <button
          onClick={loadPriorityTopics}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
        >
          <FaSync className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline text-sm font-medium">Actualizar</span>
        </button>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priorityTopics.map((topic, index) => {
          const stats = topicStats[topic.id];
          return (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white border border-gray-200 hover:border-gray-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Live Indicator */}
              {stats && stats.liveCount > 0 && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>EN VIVO</span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${topic.color} text-white shadow-lg`}>
                    {topic.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                {stats && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaEye className="w-3 h-3 text-red-500" />
                        <span className="text-lg font-bold text-gray-900">
                          {stats.liveCount}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">En vivo</span>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaNewspaper className="w-3 h-3 text-blue-500" />
                        <span className="text-lg font-bold text-gray-900">
                          {stats.totalCount}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Total</span>
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BiTrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Trending
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <span className="text-sm">Ver noticias</span>
                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 font-medium">Cargando temas prioritarios...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedTopics;