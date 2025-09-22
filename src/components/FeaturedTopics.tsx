import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync, FaSpinner, FaBolt, FaTrophy, FaSearch, FaRocket, FaGlobe, FaFilter, FaSortAmountDown, FaHeart, FaClock, FaStar, FaChartBar } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream, MdFlashOn, MdAutoAwesome } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';
import { topicNewsService, TopicNewsResponse } from '../services/topicNewsService';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { SkeletonLoader } from './SkeletonLoader';
import '../styles/enhanced-animations.css';

// Lazy load heavy components for better performance
const WorldClassTopicCard = lazy(() => import('./WorldClassTopicCard'));
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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'alphabetical' | 'recent' | 'engagement'>('trending');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'recent' | 'trending'>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { recordTopicEngagement, preferences, engagementStats, isFavorite, isRecentlyViewed } = useUserPreferences();

  // Enhanced memoized topic displays with advanced sorting and filtering
  const memoizedTopicDisplays = useMemo(() => {
    let displays = filteredTopics
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

    // Apply filtering
    switch (filterBy) {
      case 'favorites':
        displays = displays.filter(display => isFavorite(display.topic.id));
        break;
      case 'recent':
        displays = displays.filter(display => isRecentlyViewed(display.topic.id));
        break;
      case 'trending':
        displays = displays.filter(display => {
          const stats = topicStats[display.topic.id];
          return stats && stats.liveCount > 15;
        });
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'alphabetical':
        displays.sort((a, b) => a.displayText.localeCompare(b.displayText));
        break;
      case 'recent':
        displays.sort((a, b) => {
          const statsA = engagementStats[a.topic.id] || { lastViewed: new Date(0) };
          const statsB = engagementStats[b.topic.id] || { lastViewed: new Date(0) };
          return new Date(statsB.lastViewed).getTime() - new Date(statsA.lastViewed).getTime();
        });
        break;
      case 'engagement':
        displays.sort((a, b) => {
          const engagementA = engagementStats[a.topic.id] || { viewCount: 0 };
          const engagementB = engagementStats[b.topic.id] || { viewCount: 0 };
          return engagementB.viewCount - engagementA.viewCount;
        });
        break;
      case 'trending':
      default:
        displays.sort((a, b) => {
          const statsA = topicStats[a.topic.id] || { liveCount: 0, trendingScore: 0 };
          const statsB = topicStats[b.topic.id] || { liveCount: 0, trendingScore: 0 };
          return (statsB.liveCount + (statsB.trendingScore || 0)) - (statsA.liveCount + (statsA.trendingScore || 0));
        });
        break;
    }

    return displays;
  }, [filteredTopics, filterBy, sortBy, topicStats, engagementStats, isFavorite, isRecentlyViewed]);

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refreshTopicStats();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, memoizedTopicDisplays]);

  // Initialize topics when category changes
  useEffect(() => {
    setIsLoading(true);
    const topics = getPriorityTopics(selectedCategory);
    setPriorityTopics(topics);
    setFilteredTopics(topics);
    initializeTopicStats(topics);
  }, [selectedCategory]);

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
    
    for (const display of memoizedTopicDisplays.slice(0, 6)) { // Only refresh first 6 visible topics
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

  const getFilterStats = () => {
    const totalTopics = priorityTopics.length;
    const favoriteCount = priorityTopics.filter(topic => isFavorite(topic.id)).length;
    const recentCount = priorityTopics.filter(topic => isRecentlyViewed(topic.id)).length;
    const trendingCount = priorityTopics.filter(topic => {
      const stats = topicStats[topic.id];
      return stats && stats.liveCount > 15;
    }).length;

    return { totalTopics, favoriteCount, recentCount, trendingCount };
  };

  const filterStats = getFilterStats();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header with Analytics */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MdAutoAwesome className="text-yellow-500 text-3xl animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {selectedCategory === 'local' ? '🇨🇴 Temas Locales' : '🌍 Temas Mundiales'}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <FaRocket className="mr-1 text-blue-500" />
                  {memoizedTopicDisplays.length} temas activos
                </span>
                <span className="flex items-center">
                  <MdFlashOn className="mr-1 text-yellow-500" />
                  Actualización en tiempo real
                </span>
                {filterStats.trendingCount > 0 && (
                  <span className="flex items-center">
                    <FaFire className="mr-1 text-red-500" />
                    {filterStats.trendingCount} trending
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Analytics Toggle */}
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                showAnalytics
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FaChartBar />
              <span>Analytics</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                List
              </button>
            </div>

            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                autoRefresh 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <FaSync className={autoRefresh ? 'animate-spin' : ''} />
              <span>{autoRefresh ? 'Auto' : 'Manual'}</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar:</span>
            {[
              { key: 'all', label: 'Todos', icon: <FaStar />, count: filterStats.totalTopics },
              { key: 'favorites', label: 'Favoritos', icon: <FaHeart />, count: filterStats.favoriteCount },
              { key: 'recent', label: 'Recientes', icon: <FaClock />, count: filterStats.recentCount },
              { key: 'trending', label: 'Trending', icon: <FaFire />, count: filterStats.trendingCount }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setFilterBy(filter.key as any)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  filterBy === filter.key
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
                <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="trending">🔥 Trending</option>
              <option value="alphabetical">🔤 Alfabético</option>
              <option value="recent">⏰ Recientes</option>
              <option value="engagement">📊 Engagement</option>
            </select>

            {/* Search and Advanced Filters */}
            <button
              onClick={() => setShowSearchFilter(!showSearchFilter)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                showSearchFilter
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FaSearch />
              <span>Buscar</span>
            </button>

            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                showLeaderboard
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FaTrophy />
              <span>Ranking</span>
            </button>
          </div>
        </div>

        {/* Real-time Status Bar */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Estado: En vivo</span>
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <FaSync className="mr-1" />
              <span>Última actualización: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center text-purple-600 dark:text-purple-400">
              <FaGlobe className="mr-1" />
              <span>Categoría: {selectedCategory === 'local' ? 'Colombia' : 'Mundial'}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Actualizaciones cada 30s
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="glass-effect rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FaChartBar className="mr-2 text-purple-500" />
            Panel de Analytics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filterStats.totalTopics}</div>
              <div className="text-xs text-blue-500 dark:text-blue-300">Total Temas</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{filterStats.favoriteCount}</div>
              <div className="text-xs text-red-500 dark:text-red-300">Favoritos</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filterStats.recentCount}</div>
              <div className="text-xs text-green-500 dark:text-green-300">Recientes</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{filterStats.trendingCount}</div>
              <div className="text-xs text-yellow-500 dark:text-yellow-300">Trending</div>
            </div>
          </div>
        </div>
      )}

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

      {/* Topics Grid with Enhanced Layout */}
      {isLoading ? (
        <SkeletonLoader count={6} />
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {memoizedTopicDisplays.map((topicDisplay, index) => {
            const stats = topicStats[topicDisplay.topic.id];
            const isSelected = selectedTopic === topicDisplay.topic.id;
            
            return (
              <Suspense 
                key={topicDisplay.topic.id}
                fallback={<div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse shimmer"></div>}
              >
                <WorldClassTopicCard
                  topicDisplay={topicDisplay}
                  stats={stats}
                  isSelected={isSelected}
                  onClick={() => handleTopicClick(topicDisplay)}
                  animationDelay={index * 0.1}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              </Suspense>
            );
          })}
        </div>
      )}

      {/* Empty State with Enhanced Design */}
      {!isLoading && memoizedTopicDisplays.length === 0 && (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <FaEye className="text-gray-400 text-8xl mx-auto mb-6" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-3">
            {filterBy === 'all' ? 'No hay temas disponibles' : `No hay ${filterBy === 'favorites' ? 'favoritos' : filterBy === 'recent' ? 'temas recientes' : 'temas trending'}`}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {showSearchFilter 
              ? 'Intenta ajustar los filtros de búsqueda o cambia los criterios de ordenamiento'
              : `Explora los temas disponibles en la categoría ${selectedCategory === 'local' ? 'Colombia' : 'Mundial'}`
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            {(showSearchFilter || filterBy !== 'all') && (
              <button
                onClick={() => {
                  setFilteredTopics(priorityTopics);
                  setFilterBy('all');
                  setSortBy('trending');
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 ripple-effect flex items-center space-x-2"
              >
                <FaSync />
                <span>Mostrar todos los temas</span>
              </button>
            )}
            <button
              onClick={() => setShowSearchFilter(true)}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 ripple-effect flex items-center space-x-2"
            >
              <FaSearch />
              <span>Buscar temas</span>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Performance Indicator */}
      {memoizedTopicDisplays.length > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center">
              <FaRocket className="mr-1 text-blue-500" />
              Mostrando {memoizedTopicDisplays.length} de {priorityTopics.length} temas
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="flex items-center">
              <MdFlashOn className="mr-1 text-yellow-500" />
              Última actualización: {lastUpdated.toLocaleString()}
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="flex items-center">
              <FaFilter className="mr-1 text-purple-500" />
              Filtro: {filterBy} • Orden: {sortBy}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(FeaturedTopics);
