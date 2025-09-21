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

// Enhanced topic display configuration with descriptive text labels
interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

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

  // Enhanced topic display configuration - DESCRIPTIVE TEXT INSTEAD OF ICONS
  const getTopicDisplays = (category: 'local' | 'world'): TopicDisplay[] => {
    if (category === 'local') {
      return [
        {
          topic: getPriorityTopics('local')[0], // drugs-crime
          displayText: "DROGAS Y CRIMEN",
          description: "Narcotráfico, crimen organizado, justicia",
          urgencyLevel: 'high',
          category: 'security'
        },
        {
          topic: getPriorityTopics('local')[1], // terror-news
          displayText: "TERRORISMO Y SEGURIDAD",
          description: "Alertas de seguridad nacional y terrorismo",
          urgencyLevel: 'high',
          category: 'breaking'
        },
        {
          topic: getPriorityTopics('local')[2], // gustavo-petro
          displayText: "GUSTAVO PETRO NOTICIAS",
          description: "Presidente de Colombia y gobierno nacional",
          urgencyLevel: 'medium',
          category: 'politics'
        },
        {
          topic: getPriorityTopics('local')[3], // congress
          displayText: "CONGRESO DE COLOMBIA",
          description: "Actividad del Congreso de la República",
          urgencyLevel: 'medium',
          category: 'politics'
        },
        {
          topic: getPriorityTopics('local')[4], // left-wing
          displayText: "IZQUIERDA POLÍTICA",
          description: "Perspectiva progresista y de izquierda",
          urgencyLevel: 'normal',
          category: 'analysis'
        },
        {
          topic: getPriorityTopics('local')[5], // right-wing
          displayText: "DERECHA POLÍTICA",
          description: "Perspectiva conservadora y de derecha",
          urgencyLevel: 'normal',
          category: 'analysis'
        }
      ];
    } else {
      return [
        {
          topic: getPriorityTopics('world')[0], // donald-trump-world
          displayText: "DONALD TRUMP GLOBAL",
          description: "Noticias mundiales sobre Donald Trump",
          urgencyLevel: 'high',
          category: 'politics'
        },
        {
          topic: getPriorityTopics('world')[1], // world-politics
          displayText: "POLÍTICA MUNDIAL",
          description: "Política internacional y global",
          urgencyLevel: 'medium',
          category: 'politics'
        },
        {
          topic: getPriorityTopics('world')[2], // world-terror
          displayText: "TERRORISMO MUNDIAL",
          description: "Terrorismo y seguridad internacional",
          urgencyLevel: 'high',
          category: 'security'
        },
        {
          topic: getPriorityTopics('world')[3], // world-right-wing
          displayText: "DERECHA MUNDIAL",
          description: "Perspectiva conservadora global",
          urgencyLevel: 'normal',
          category: 'analysis'
        },
        {
          topic: getPriorityTopics('world')[4], // world-left-wing
          displayText: "IZQUIERDA MUNDIAL",
          description: "Perspectiva progresista global",
          urgencyLevel: 'normal',
          category: 'analysis'
        },
        {
          topic: getPriorityTopics('world')[5], // world-travel
          displayText: "MEJORES DESTINOS",
          description: "Mejores lugares para viajar",
          urgencyLevel: 'normal',
          category: 'analysis'
        }
      ];
    }
  };

  useEffect(() => {
    loadPriorityTopics();
  }, [selectedCategory]);

  useEffect(() => {
    // Generate topic displays when topics change
    setTopicDisplays(getTopicDisplays(selectedCategory));
  }, [priorityTopics, selectedCategory]);

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

  // INSTANT TOPIC LOADING - Make topics instantly responsive
  const handleTopicClick = async (topicDisplay: TopicDisplay) => {
    const topic = topicDisplay.topic;
    setSelectedTopic(topic.id);
    
    // DEDICATED PAGE NAVIGATION: Left Wing and Right Wing open in-app pages
    if (topic.id === 'left-wing' || topic.id === 'world-left-wing') {
      // Navigate to dedicated Left Wing page
      window.history.pushState(null, '', '/left-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'left-wing' }));
      return;
    }
    
    if (topic.id === 'right-wing' || topic.id === 'world-right-wing') {
      // Navigate to dedicated Right Wing page
      window.history.pushState(null, '', '/right-wing');
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'right-wing' }));
      return;
    }
    
    // Set loading state for this specific topic
    setTopicStats(prev => ({
      ...prev,
      [topic.id]: {
        ...prev[topic.id],
        isLoading: true
      }
    }));

    try {
      // INSTANT LOAD: Fetch news for this topic immediately
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

      // INSTANT CALLBACK: Immediately notify parent with news data
      if (onInstantLoad) {
        onInstantLoad(topic, selectedCategory, newsData);
      }

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

  const getUrgencyColor = (urgencyLevel: 'high' | 'medium' | 'normal') => {
    switch (urgencyLevel) {
      case 'high': return 'from-red-500 to-red-700';
      case 'medium': return 'from-orange-500 to-orange-700';
      default: return 'from-blue-500 to-blue-700';
    }
  };

  const getCategoryIcon = (category: 'breaking' | 'politics' | 'security' | 'analysis') => {
    switch (category) {
      case 'breaking': return <FaBolt className="w-4 h-4" />;
      case 'politics': return <FaFire className="w-4 h-4" />;
      case 'security': return <MdFlashOn className="w-4 h-4" />;
      default: return <FaEye className="w-4 h-4" />;
    }
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-xl">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-red-600">T</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent tracking-tight">
                TEMAS PRIORITARIOS
              </h2>
              <p className="text-gray-700 font-bold text-lg">
                {selectedCategory === 'local' ? 'COLOMBIA' : 'MUNDO'} • NOTICIAS EN VIVO
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
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 font-bold"
        >
          <FaSync className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline text-sm font-bold uppercase tracking-wide">ACTUALIZAR</span>
        </button>
      </div>

      {/* Enhanced Topics Grid with Descriptive Text Labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicDisplays.map((topicDisplay, index) => {
          const stats = topicStats[topicDisplay.topic.id];
          const isTopicLoading = stats?.isLoading || selectedTopic === topicDisplay.topic.id;
          const urgencyColor = getUrgencyColor(topicDisplay.urgencyLevel);
          
          return (
            <button
              key={topicDisplay.topic.id}
              onClick={() => handleTopicClick(topicDisplay)}
              disabled={isTopicLoading}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${urgencyColor} text-white disabled:opacity-75 disabled:cursor-not-allowed ${
                selectedTopic === topicDisplay.topic.id ? 'ring-4 ring-white/50 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Pattern for Modern Look */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              
              {/* Enhanced live indicator */}
              {stats && stats.liveCount > 0 && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full animate-pulse shadow-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <span>EN VIVO</span>
                </div>
              )}

              {/* Loading indicator */}
              {isTopicLoading && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/30 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  <FaSpinner className="w-3 h-3 animate-spin" />
                  <span>CARGANDO...</span>
                </div>
              )}

              {/* Content with DESCRIPTIVE TEXT LABELS */}
              <div className="relative z-10">
                {/* Category Badge and Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
                    {getCategoryIcon(topicDisplay.category)}
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {topicDisplay.category}
                    </span>
                  </div>
                  {topicDisplay.urgencyLevel === 'high' && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-500/30 rounded-full">
                      <FaBolt className="w-3 h-3 text-yellow-300" />
                      <span className="text-xs font-bold">URGENTE</span>
                    </div>
                  )}
                </div>

                {/* BOLD DESCRIPTIVE TEXT INSTEAD OF EMOJI */}
                <h3 className="text-xl font-black mb-2 leading-tight tracking-wide">
                  {topicDisplay.displayText}
                </h3>
                
                <p className="text-white/90 text-sm leading-tight mb-4 font-medium">
                  {topicDisplay.description}
                </p>

                {/* Enhanced Stats */}
                {stats && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaEye className="w-3 h-3" />
                        <span className="text-lg font-bold">
                          {stats.liveCount}
                        </span>
                      </div>
                      <span className="text-xs font-medium opacity-90">En vivo</span>
                    </div>
                    <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FaNewspaper className="w-3 h-3" />
                        <span className="text-lg font-bold">
                          {stats.totalCount}
                        </span>
                      </div>
                      <span className="text-xs font-medium opacity-90">Total</span>
                    </div>
                  </div>
                )}

                {/* Enhanced action area */}
                <div className="flex items-center justify-between bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <BiTrendingUp className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      {selectedCategory === 'local' ? 'COLOMBIA' : 'MUNDIAL'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-sm">VER AHORA</span>
                    <FaArrowRight className={`w-4 h-4 transform transition-transform ${
                      isTopicLoading ? 'animate-pulse' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Premium shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
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