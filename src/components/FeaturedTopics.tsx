import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync, FaSpinner } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';
import { topicNewsService, TopicNewsResponse } from '../services/topicNewsService';

interface FeaturedTopicsProps {
  onTopicSelect: (topic: NewsTopic, category: 'local' | 'world') => void;
  selectedCategory: 'local' | 'world';
  className?: string;
  onNewsUpdate?: (newsData: TopicNewsResponse, topic: NewsTopic) => void;
}

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
  isLoading?: boolean;
}

const FeaturedTopics: React.FC<FeaturedTopicsProps> = ({
  onTopicSelect,
  selectedCategory,
  className = "",
  onNewsUpdate
}) => {
  const [priorityTopics, setPriorityTopics] = useState<NewsTopic[]>([]);
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
          lastUpdate: new Date(),
          isLoading: false
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
            liveCount: Math.max(1, updated[topic.id].liveCount + Math.floor(Math.random() * 5) - 2),
            totalCount: updated[topic.id].totalCount + Math.floor(Math.random() * 10),
            lastUpdate: new Date()
          };
        }
      });
      return updated;
    });
    setLastUpdated(new Date());
  };

  const handleTopicClick = async (topic: NewsTopic) => {
    setSelectedTopic(topic.id);
    
    // Set loading state for this specific topic
    setTopicStats(prev => ({
      ...prev,
      [topic.id]: {
        ...prev[topic.id],
        isLoading: true
      }
    }));

    try {
      // Fetch news for this topic
      const newsData = await topicNewsService.fetchTopicNews({
        topic,
        mode: selectedCategory,
        limit: 20
      });

      // Update stats with real data
      setTopicStats(prev => ({
        ...prev,
        [topic.id]: {
          liveCount: Math.floor(newsData.articles.filter(a => a.trending).length),
          totalCount: newsData.totalCount,
          lastUpdate: newsData.lastUpdated,
          isLoading: false
        }
      }));

      // Call the parent callback to update news feed
      if (onNewsUpdate) {
        onNewsUpdate(newsData, topic);
      }

      // Also call the original topic select callback
      onTopicSelect(topic, selectedCategory);

    } catch (error) {
      console.error('Error fetching topic news:', error);
      
      // Reset loading state
      setTopicStats(prev => ({
        ...prev,
        [topic.id]: {
          ...prev[topic.id],
          isLoading: false
        }
      }));
    } finally {
      setSelectedTopic(null);
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {priorityTopics.map((topic, index) => {
          const stats = topicStats[topic.id];
          const isTopicLoading = stats?.isLoading || selectedTopic === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              disabled={isTopicLoading}
              className={`group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white border-2 hover:border-gray-300 disabled:opacity-75 disabled:cursor-not-allowed ${
                selectedTopic === topic.id ? 'ring-4 ring-blue-500 border-blue-400' : 'border-gray-200'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Premium background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-8 transition-opacity duration-300`}></div>
              
              {/* Enhanced live indicator */}
              {stats && stats.liveCount > 0 && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <span>EN VIVO</span>
                </div>
              )}

              {/* Loading indicator */}
              {isTopicLoading && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                  <FaSpinner className="w-3 h-3 animate-spin" />
                  <span>Cargando...</span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl p-4 rounded-2xl bg-gradient-to-br ${topic.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {topic.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-1">
                      {topic.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-tight">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Stats */}
                {stats && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaEye className="w-3 h-3 text-red-500" />
                        <span className="text-lg font-bold text-gray-900">
                          {stats.liveCount}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">En vivo</span>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
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

                {/* Premium action area */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-2">
                    <BiTrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {selectedCategory === 'local' ? 'Colombia' : 'Mundial'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <span className="text-sm">Ver noticias</span>
                    <FaArrowRight className={`w-4 h-4 transform transition-transform ${
                      isTopicLoading ? 'animate-pulse' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Premium shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
              
              {/* Premium border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
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