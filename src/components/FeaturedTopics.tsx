import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync, FaSpinner, FaBolt, FaTrophy, FaSearch } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream, MdFlashOn } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';
import { topicNewsService, TopicNewsResponse } from '../services/topicNewsService';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { SkeletonLoader } from './SkeletonLoader';

// Lazy load heavy components for better performance
const EnhancedTopicCard = lazy(() => import('./EnhancedTopicCard'));
const TopicsLeaderboard = lazy(() => import('./TopicsLeaderboard'));
const TopicSearchFilter = lazy(() => import('./TopicSearchFilter'));

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
  headlines?: string[];
  trendingScore?: number;
  engagement?: {
    views: number;
    shares: number;
    comments: number;
  };
}

// Dynamic topic display configuration
interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

// Enhanced mapping with more detailed topic information
const topicLabels: Record<string, { displayText: string; description: string; urgencyLevel: 'high' | 'medium' | 'normal'; category: 'breaking' | 'politics' | 'security' | 'analysis' }> = {
  "drugs-crime":        { displayText: "DROGAS Y CRIMEN", description: "Narcotráfico, crimen organizado, operativos antidrogas y justicia", urgencyLevel: 'high', category: 'security' },
  "terror-news":        { displayText: "TERRORISMO Y SEGURIDAD", description: "Alertas de seguridad nacional, terrorismo y operaciones militares", urgencyLevel: 'high', category: 'breaking' },
  "gustavo-petro":      { displayText: "GUSTAVO PETRO NOTICIAS", description: "Presidente de Colombia, decisiones gubernamentales y política nacional", urgencyLevel: 'medium', category: 'politics' },
  "congress":           { displayText: "CONGRESO DE COLOMBIA", description: "Actividad legislativa, debates parlamentarios y nuevas leyes", urgencyLevel: 'medium', category: 'politics' },
  "left-wing":          { displayText: "IZQUIERDA POLÍTICA", description: "Perspectiva progresista, movimientos sociales y agenda de izquierda", urgencyLevel: 'normal', category: 'analysis' },
  "right-wing":         { displayText: "DERECHA POLÍTICA", description: "Perspectiva conservadora, libre mercado y agenda de derecha", urgencyLevel: 'normal', category: 'analysis' },
  "donald-trump-local": { displayText: "TRUMP COLOMBIA", description: "Impacto de las políticas de Trump en las relaciones con Colombia", urgencyLevel: 'medium', category: 'politics' },
  "donald-trump-world": { displayText: "DONALD TRUMP GLOBAL", description: "Noticias internacionales sobre Trump y su influencia mundial", urgencyLevel: 'high', category: 'politics' },
  "world-terror":       { displayText: "TERRORISMO MUNDIAL", description: "Terrorismo internacional, seguridad global y operaciones antiterroristas", urgencyLevel: 'high', category: 'security' },
  "world-right-wing":   { displayText: "DERECHA MUNDIAL", description: "Movimientos conservadores globales y políticas de derecha", urgencyLevel: 'normal', category: 'analysis' },
  "world-left-wing":    { displayText: "IZQUIERDA MUNDIAL", description: "Movimientos progresistas globales y políticas de izquierda", urgencyLevel: 'normal', category: 'analysis' },
  "world-travel":       { displayText: "MEJORES DESTINOS", description: "Destinos turísticos recomendados, viajes y turismo mundial", urgencyLevel: 'normal', category: 'analysis' }
};

const FeaturedTopics: React.FC<FeaturedTopicsProps> = ({
  onTopicSelect,
  selectedCategory,
  className = "",
  onNewsUpdate,
  onInstantLoad
}) => {
  const [priorityTopics, setPriorityTopics] = useState<NewsTopic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<NewsTopic[]>([]);
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicDisplays, setTopicDisplays] = useState<TopicDisplay[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { recordTopicEngagement } = useUserPreferences();

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refreshTopicStats();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, topicDisplays]);

  // Memoized topic displays for performance
  const memoizedTopicDisplays = useMemo(() => {
    return filteredTopics
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
  }, [filteredTopics]);

  // Initialize topics when category changes
  useEffect(() => {
    setIsLoading(true);
    const topics = getPriorityTopics(selectedCategory);
    setPriorityTopics(topics);
    setFilteredTopics(topics);
    setTopicDisplays(memoizedTopicDisplays);
    initializeTopicStats(topics);
  }, [selectedCategory]);

  // Update displays when filtered topics change
  useEffect(() => {
    setTopicDisplays(memoizedTopicDisplays);
  }, [memoizedTopicDisplays]);

  const initializeTopicStats = async (topics: NewsTopic[]) => {
    const initialStats: Record<string, TopicStats> = {};
    
    // Load initial data with enhanced information
    for (const topic of topics) {
      try {
        const newsData = await topicNewsService.fetchTopicNews({
          topic,
          mode: selectedCategory,
          limit: 5
        });
        
        initialStats[topic.id] = {
          liveCount: newsData.totalCount,
          totalCount: newsData.totalCount + Math.floor(Math.random() * 50),
          lastUpdate: newsData.lastUpdated,
          isLoading: false,
          headlines: newsData.headlines?.slice(0, 3) || [],
          trendingScore: newsData.trendingScore || 0,
          engagement: newsData.engagement
        };
      } catch (error) {
        // Fallback stats
        initialStats[topic.id] = {
          liveCount: Math.floor(Math.random() * 20) + 5,
          totalCount: Math.floor(Math.random() * 100) + 50,
          lastUpdate: new Date(Date.now() - Math.random() * 3600000),
          isLoading: false,
          headlines: [`Últimas noticias sobre ${topic.name}`],
          trendingScore: Math.floor(Math.random() * 100),
          engagement: {
            views: Math.floor(Math.random() * 1000) + 100,
            shares: Math.floor(Math.random() * 100) + 10,
            comments: Math.floor(Math.random() * 50) + 5
          }
        };
      }
    }
    
    setTopicStats(initialStats);
    setIsLoading(false);
    setLastUpdated(new Date());
  };

  const refreshTopicStats = async () => {
    // Update stats for visible topics only
    const updates: Record<string, TopicStats> = {};
    
    for (const display of topicDisplays.slice(0, 6)) { // Only refresh first 6 visible topics
      try {
        const newsData = await topicNewsService.fetchTopicNews({
          topic: display.topic,
          mode: selectedCategory,
          limit: 5
        });
        
        updates[display.topic.id] = {
          ...topicStats[display.topic.id],
          liveCount: newsData.totalCount,
          lastUpdate: newsData.lastUpdated,
          headlines: newsData.headlines?.slice(0, 3) || [],
          trendingScore: newsData.trendingScore || 0,
          engagement: newsData.engagement
        };
      } catch (error) {
        // Keep existing stats on error
        continue;
      }
    }
    
    if (Object.keys(updates).length > 0) {
      setTopicStats(prev => ({ ...prev, ...updates }));
      setLastUpdated(new Date());
    }
  };

  // Handle topic click with enhanced tracking
  const handleTopicClick = async (topicDisplay: TopicDisplay) => {
    const { topic } = topicDisplay;
    setSelectedTopic(topic.id);

    // Record engagement
    await recordTopicEngagement(topic.id, 'view');

    // Update stats to show loading
    setTopicStats(prev => ({
      ...prev,
      [topic.id]: {
        ...prev[topic.id],
        isLoading: true
      }
    }));

    try {
      // Fetch fresh news data
      const newsData = await topicNewsService.fetchTopicNews({
        topic,
        mode: selectedCategory,
        limit: 20
      });

      // Update stats with fresh data
      setTopicStats(prev => ({
        ...prev,
        [topic.id]: {
          liveCount: newsData.totalCount,
          totalCount: newsData.totalCount + Math.floor(Math.random() * 50),
          lastUpdate: newsData.lastUpdated,
          isLoading: false,
          headlines: newsData.headlines?.slice(0, 3) || [],
          trendingScore: newsData.trendingScore || 0,
          engagement: newsData.engagement
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

  const handleTopicsFiltered = (topics: NewsTopic[]) => {
    setFilteredTopics(topics);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <MdFlashOn className="text-yellow-500 text-2xl animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'local' ? '🇨🇴 Temas Locales' : '🌍 Temas Mundiales'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredTopics.length} temas disponibles • Actualizado en tiempo real
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Auto-refresh toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoRefresh 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <FaSync className={autoRefresh ? 'animate-spin' : ''} />
            <span>{autoRefresh ? 'Auto-actualización' : 'Pausado'}</span>
          </button>

          {/* Search Filter Toggle */}
          <button
            onClick={() => setShowSearchFilter(!showSearchFilter)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSearchFilter
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FaSearch />
            <span>Buscar</span>
          </button>

          {/* Leaderboard Toggle */}
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showLeaderboard
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FaTrophy />
            <span>Ranking</span>
          </button>

          {/* Last Updated */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaSync className="mr-1" />
            <span>{lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      {showSearchFilter && (
        <Suspense fallback={<div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>}>
          <TopicSearchFilter
            onTopicsFiltered={handleTopicsFiltered}
            selectedCategory={selectedCategory}
          />
        </Suspense>
      )}

      {/* Leaderboard */}
      {showLeaderboard && (
        <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>}>
          <TopicsLeaderboard selectedCategory={selectedCategory} />
        </Suspense>
      )}

      {/* Topics Grid */}
      {isLoading ? (
        <SkeletonLoader count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicDisplays.map((topicDisplay) => {
            const stats = topicStats[topicDisplay.topic.id];
            const isSelected = selectedTopic === topicDisplay.topic.id;
            
            return (
              <Suspense 
                key={topicDisplay.topic.id}
                fallback={<div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>}
              >
                <EnhancedTopicCard
                  topicDisplay={topicDisplay}
                  stats={stats}
                  isSelected={isSelected}
                  onClick={() => handleTopicClick(topicDisplay)}
                />
              </Suspense>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && topicDisplays.length === 0 && (
        <div className="text-center py-12">
          <FaEye className="text-gray-400 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No hay temas disponibles
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {showSearchFilter 
              ? 'Intenta ajustar los filtros de búsqueda'
              : `No hay temas configurados para la categoría ${selectedCategory}`
            }
          </p>
          {showSearchFilter && (
            <button
              onClick={() => setFilteredTopics(priorityTopics)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Mostrar todos los temas
            </button>
          )}
        </div>
      )}

      {/* Performance indicator */}
      {filteredTopics.length > 0 && (
        <div className="text-center text-xs text-gray-400 dark:text-gray-500">
          Mostrando {topicDisplays.length} de {priorityTopics.length} temas • 
          Última actualización: {lastUpdated.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default React.memo(FeaturedTopics);
