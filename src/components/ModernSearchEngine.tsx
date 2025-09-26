import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  FaSearch, FaFilter, FaGlobe, FaMapMarkerAlt, FaHistory, FaBrain, 
  FaMicrophone, FaKeyboard, FaMoon, FaSun, FaHeart, FaBookmark,
  FaShare, FaDownload, FaCog, FaBell, FaQuestionCircle, FaTimes,
  FaSave, FaRss, FaChartLine, FaExpand, FaCompress
} from 'react-icons/fa';
import { 
  MdImage, MdVideoLibrary, MdWeb, MdClear, MdTrendingUp, MdPlace,
  MdPersonPin, MdBusiness, MdEvent, MdSchool, MdSentimentSatisfied,
  MdSentimentDissatisfied, MdSentimentNeutral, MdAutoAwesome
} from 'react-icons/md';
import { BiNews, BiTime, BiLike, BiDislike } from 'react-icons/bi';
import { BsArrowRight, BsLightning, BsStars, BsEye } from 'react-icons/bs';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import GoogleClassSearchBar from './GoogleClassSearchBar';
import GoogleClassSearchResults from './GoogleClassSearchResults';
import KnowledgePanel from './KnowledgePanel';
import ThankYouSection from './ThankYouSection';
import { detectTopicFromQuery, detectSearchMode, shouldShowKnowledgePanel } from '../data/knowledgeTopics';
import { generateSearchResults, getFiltersForMode, LOCAL_FILTERS, MUNDO_FILTERS } from '../data/searchSources';
import { 
  SearchFilters, 
  SearchResult, 
  SearchSuggestion, 
  EntityHighlight, 
  SentimentData, 
  SavedSearch, 
  ThankYouFeedback 
} from '../types/search';

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
  darkMode: boolean;
  badge?: string;
  isHighPriority?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  gradient, 
  onClick, 
  darkMode, 
  badge,
  isHighPriority = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } ${isHighPriority ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}
    >
      {/* Card Header with Gradient */}
      <div className={`bg-gradient-to-br ${gradient} h-32 relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
        <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
            {icon}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
            isHighPriority 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-white/20 text-white backdrop-blur-sm'
          }`}>
            {badge}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>

        {/* Action Button */}
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-300">
          <span>Explore Now</span>
          <BsArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};



const ModernSearchEngine: React.FC = () => {
  // Core search state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'world' | 'local'>('local');
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // UI state
  const [darkMode, setDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTopicExplorer, setShowTopicExplorer] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);

  // AI-powered features
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [entityHighlights, setEntityHighlights] = useState<EntityHighlight[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);

  // Personalization & saved features
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());

  // Filters
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: 'all',
    sources: [],
    location: 'colombia',
    contentType: 'all',
    sortBy: 'relevance',
    sentiment: 'all',
    language: 'all'
  });

  // Thank you feedback
  const [thankYouFeedback, setThankYouFeedback] = useState<ThankYouFeedback | null>(null);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const voiceSearchRef = useRef<any>(null);

  // Load persisted data
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('searchDarkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);

    const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(saved);

    const followed = JSON.parse(localStorage.getItem('followedTopics') || '[]');
    setFollowedTopics(followed);

    const bookmarks = JSON.parse(localStorage.getItem('searchBookmarks') || '[]');
    setBookmarkedResults(new Set(bookmarks));
  }, []);

  // Enhanced search suggestions with AI
  const generateSmartSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Simulate AI-powered suggestions
    const suggestions: SearchSuggestion[] = [];

    // Entity-based suggestions
    if (query.toLowerCase().includes('colombia')) {
      suggestions.push({
        text: `${query} gobierno`,
        type: 'entity',
        confidence: 0.9,
        icon: '🏛️',
        category: 'Government'
      });
    }

    // Topic-based suggestions
    suggestions.push({
      text: `${query} análisis`,
      type: 'topic',
      confidence: 0.8,
      icon: '📊',
      category: 'Analysis'
    });

    // Location-based suggestions  
    if (activeTab === 'local') {
      suggestions.push({
        text: `${query} Colombia`,
        type: 'location',
        confidence: 0.85,
        icon: '🇨🇴',
        category: 'Local'
      });
    }

    // History-based suggestions
    const historyMatches = searchHistory
      .filter(h => h.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(h => ({
        text: h,
        type: 'query' as const,
        confidence: 0.7,
        icon: '🕒',
        category: 'History'
      }));

    setSuggestions([...suggestions, ...historyMatches].slice(0, 8));
  }, [activeTab, searchHistory]);

  // AI entity detection and highlighting
  const detectEntities = useCallback((query: string): EntityHighlight[] => {
    const entities: EntityHighlight[] = [];
    
    // Simple entity detection (in production, this would use NLP APIs)
    const entityPatterns = {
      person: /\b(gustavo petro|iván duque|álvaro uribe|juan manuel santos)\b/gi,
      organization: /\b(congreso|senado|gobierno|ecopetrol|avianca)\b/gi,
      location: /\b(bogotá|medellín|cali|barranquilla|cartagena|colombia)\b/gi,
      event: /\b(elecciones|reforma|proceso de paz|covid)\b/gi,
      topic: /\b(economía|educación|salud|seguridad|paz)\b/gi
    };

    Object.entries(entityPatterns).forEach(([type, pattern]) => {
      let match;
      while ((match = pattern.exec(query)) !== null) {
        entities.push({
          text: match[0],
          type: type as any,
          position: [match.index, match.index + match[0].length],
          relevance: Math.random() * 0.5 + 0.5 // 0.5-1.0
        });
      }
    });

    return entities;
  }, []);

  // Sentiment analysis simulation
  const analyzeSentiment = useCallback((query: string, results: any[]): SentimentData => {
    // Simulate sentiment analysis
    const sentimentWords = {
      positive: ['good', 'great', 'excellent', 'amazing', 'wonderful', 'bueno', 'excelente', 'increíble'],
      negative: ['bad', 'terrible', 'awful', 'horrible', 'worst', 'malo', 'terrible', 'horrible'],
    };

    let score = 0;
    const words = query.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (sentimentWords.positive.includes(word)) score += 0.3;
      if (sentimentWords.negative.includes(word)) score -= 0.3;
    });

    // Clamp between -1 and 1
    score = Math.max(-1, Math.min(1, score));

    const label = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';

    return {
      score,
      label,
      confidence: Math.abs(score) + 0.5,
      aspects: [
        { topic: 'Politics', sentiment: score + (Math.random() - 0.5) * 0.4 },
        { topic: 'Economy', sentiment: score + (Math.random() - 0.5) * 0.4 },
        { topic: 'Social', sentiment: score + (Math.random() - 0.5) * 0.4 }
      ]
    };
  }, []);

  // Enhanced search function with AI features
  const performSearch = async (query: string, tab: 'world' | 'local', searchFilters: SearchFilters) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setCurrentQuery(query);
    setCurrentPage(1);

    try {
      // AI preprocessing
      const entities = detectEntities(query);
      setEntityHighlights(entities);

      // Auto-detect search mode
      const detectedMode = detectSearchMode(query);
      const actualTab = tab || detectedMode;
      setActiveTab(actualTab);

      // Update URL
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('tab', actualTab);
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value !== 'all' && value !== 'relevance' && value !== 'colombia' && 
            (!Array.isArray(value) || value.length > 0)) {
          params.set(key, Array.isArray(value) ? value.join(',') : value);
        }
      });
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);

      // Simulate search API call
      await new Promise(resolve => setTimeout(resolve, actualTab === 'world' ? 800 : 500));

      // Generate results (using existing logic from EnhancedSearchPage)
      const results = actualTab === 'world' 
        ? generateWorldSearchResults(query, searchFilters)
        : generateLocalSearchResults(query, searchFilters);

      const total = Math.floor(Math.random() * (actualTab === 'world' ? 50000000 : 500000)) + 1000;
      const searchDuration = Math.floor(Math.random() * 300) + 100;

      setSearchResults(results);
      setTotalResults(total);
      setSearchTime(searchDuration);
      setHasMore(results.length >= 10);

      // AI post-processing
      const sentiment = analyzeSentiment(query, results);
      setSentimentData(sentiment);

      // Generate related topics
      const related = generateRelatedTopics(query, entities);
      setRelatedTopics(related);

      // Update search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 20);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for search results (using separated sources)
  const generateWorldSearchResults = (query: string, filters: SearchFilters) => {
    return generateSearchResults(query, 'mundo', 10);
  };

  const generateLocalSearchResults = (query: string, filters: SearchFilters) => {
    return generateSearchResults(query, 'local', 10);
  };

  const generateRelatedTopics = (query: string, entities: EntityHighlight[]) => {
    const topics = [
      `${query} análisis`,
      `${query} Colombia`,
      `${query} gobierno`,
      `${query} opinión`,
      `${query} estadísticas`
    ];
    return topics.slice(0, 5);
  };

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('searchDarkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Save search
  const saveCurrentSearch = () => {
    if (!currentQuery) return;

    const savedSearch: SavedSearch = {
      id: Date.now().toString(),
      query: currentQuery,
      filters,
      timestamp: new Date(),
      resultCount: totalResults,
      isFollowing: false,
      notifications: false
    };

    const newSavedSearches = [savedSearch, ...savedSearches].slice(0, 50);
    setSavedSearches(newSavedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(newSavedSearches));
  };

  // Follow topic
  const followTopic = (topic: string) => {
    const newFollowed = [...followedTopics, topic];
    setFollowedTopics(newFollowed);
    localStorage.setItem('followedTopics', JSON.stringify(newFollowed));
  };

  // Voice search (simplified)
  const startVoiceSearch = () => {
    setShowVoiceSearch(true);
    // In a real implementation, this would use Web Speech API
    setTimeout(() => {
      setShowVoiceSearch(false);
      // Simulate voice input result
      const voiceQuery = "búsqueda por voz ejemplo";
      setCurrentQuery(voiceQuery);
      performSearch(voiceQuery, activeTab, filters);
    }, 3000);
  };

  // Submit thank you feedback
  const submitThankYouFeedback = (feedback: ThankYouFeedback) => {
    setThankYouFeedback(feedback);
    localStorage.setItem('lastSearchFeedback', JSON.stringify(feedback));
    setShowThankYou(false);
    
    // Show confirmation
    setTimeout(() => {
      alert('¡Gracias por tu retroalimentación! Nos ayuda a mejorar.');
    }, 500);
  };

  const knowledgeTopic = useMemo(() => detectTopicFromQuery(currentQuery), [currentQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Modern Search Header with Mode-Specific Branding */}
        <div className={`rounded-2xl shadow-xl border transition-colors duration-300 mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Top toolbar with distinct branding */}
          <div className={`flex items-center justify-between p-4 border-b transition-colors ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          } ${activeTab === 'local' ? 'bg-gradient-to-r from-yellow-50 to-blue-50' : 'bg-gradient-to-r from-gray-50 to-purple-50'}`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {activeTab === 'local' ? (
                  // Local Colombia Branding
                  <>
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">🇨🇴</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Nuestro Pulso Colombia
                      </span>
                      <span className="text-sm text-blue-600 font-medium">
                        Red Cívica de Colombia
                      </span>
                    </div>
                    <div className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                      LOCAL COLOMBIA 🇨🇴
                    </div>
                  </>
                ) : (
                  // Mundo/World Neutral Branding
                  <>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BsStars className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Copilot Search AI
                      </span>
                      <span className="text-sm text-purple-600 font-medium">
                        Global Intelligence Search
                      </span>
                    </div>
                    <div className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                      MUNDO 🌍
                    </div>
                  </>
                )}
              </div>
              
              {/* AI Features (only in Mundo mode) */}
              {activeTab === 'world' && (
                <>
                  {entityHighlights.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FaBrain className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-purple-600 font-medium">
                        {entityHighlights.length} entities detected
                      </span>
                    </div>
                  )}
                  {sentimentData && (
                    <div className="flex items-center gap-2">
                      {sentimentData.label === 'positive' && <MdSentimentSatisfied className="w-4 h-4 text-green-500" />}
                      {sentimentData.label === 'neutral' && <MdSentimentNeutral className="w-4 h-4 text-gray-500" />}
                      {sentimentData.label === 'negative' && <MdSentimentDissatisfied className="w-4 h-4 text-red-500" />}
                      <span className="text-sm text-gray-600">
                        {sentimentData.label} sentiment
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {currentQuery && (
                <button
                  onClick={saveCurrentSearch}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Save search"
                >
                  <FaSave className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={startVoiceSearch}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Voice search"
              >
                <FaMicrophone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showAdvancedFilters
                    ? 'bg-blue-50 text-blue-600'
                    : darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Advanced filters"
              >
                <FaFilter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowTopicExplorer(!showTopicExplorer)}
                className={`p-2 rounded-lg transition-colors ${
                  showTopicExplorer
                    ? 'bg-purple-50 text-purple-600'
                    : darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Topic explorer"
              >
                <FaBrain className="w-4 h-4" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Toggle dark mode"
              >
                {darkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Toggle fullscreen"
              >
                {isFullscreen ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Enhanced search bar */}
          <GoogleClassSearchBar
            onSearch={performSearch}
            autoFocus={!currentQuery}
            placeholder={activeTab === 'local' 
              ? "Buscar en Colombia: Congreso, Gustavo Petro, noticias nacionales..." 
              : "Ask Copilot AI about global topics: Donald Trump, companies, world news..."}
            className="m-4"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Advanced filters panel */}
          {showAdvancedFilters && (
            <div className={`border-t p-4 transition-colors ${
              darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Content Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Content Type
                  </label>
                  <select
                    value={filters.contentType}
                    onChange={(e) => setFilters({...filters, contentType: e.target.value as any})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Content</option>
                    <option value="news">News</option>
                    <option value="web">Web Pages</option>
                    <option value="images">Images</option>
                    <option value="videos">Videos</option>
                    <option value="articles">Articles</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value as any})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">Any time</option>
                    <option value="hour">Past hour</option>
                    <option value="day">Past day</option>
                    <option value="week">Past week</option>
                    <option value="month">Past month</option>
                    <option value="year">Past year</option>
                  </select>
                </div>

                {/* Sentiment */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sentiment
                  </label>
                  <select
                    value={filters.sentiment}
                    onChange={(e) => setFilters({...filters, sentiment: e.target.value as any})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Sentiment</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value as any})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Languages</option>
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                    <option value="pt">Portuguese</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Most Recent</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Search Results */}
          <div className="lg:col-span-3">
            {/* Knowledge Panel (ONLY in Mundo mode) */}
            {activeTab === 'world' && knowledgeTopic && currentQuery && shouldShowKnowledgePanel(currentQuery, activeTab) && (
              <div className="mb-8">
                <KnowledgePanel 
                  topic={knowledgeTopic} 
                  onSearchRelated={(query) => performSearch(query, activeTab, filters)}
                  className="shadow-xl"
                />
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 || isLoading ? (
              <GoogleClassSearchResults
                results={searchResults}
                query={currentQuery}
                totalResults={totalResults}
                searchTime={searchTime}
                activeTab={activeTab}
                onResultClick={(result) => {
                  // Track click and open result
                  if (result.url.startsWith('http')) {
                    window.open(result.url, '_blank', 'noopener,noreferrer');
                  }
                }}
                onSearchRelated={(query) => performSearch(query, activeTab, filters)}
                onLoadMore={() => {
                  // Load more results logic
                  console.log('Loading more results...');
                }}
                hasMore={hasMore}
                loading={isLoading}
              />
            ) : currentQuery ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  No results found for "{currentQuery}"
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Try different keywords or adjust your filters
                </p>
                <button
                  onClick={() => setShowThankYou(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Help us improve this search
                </button>
              </div>
            ) : (
              <div className="relative overflow-hidden">
                {/* Stunning Welcome Block */}
                <div className={`relative py-20 mb-12 rounded-3xl overflow-hidden ${
                  activeTab === 'local' 
                    ? 'bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50' 
                    : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'
                } ${darkMode ? 'from-gray-800 via-gray-700 to-gray-600' : ''}`}>
                  
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse ${
                      activeTab === 'local' ? 'bg-yellow-400' : 'bg-purple-400'
                    }`}></div>
                    <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 animate-pulse ${
                      activeTab === 'local' ? 'bg-blue-400' : 'bg-blue-400'
                    }`}></div>
                    {activeTab === 'world' && (
                      <>
                        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-10 animate-bounce"></div>
                        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 animate-bounce" style={{animationDelay: '1s'}}></div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className={`text-8xl mb-6 animate-bounce ${
                      activeTab === 'local' ? '' : 'filter drop-shadow-lg'
                    }`}>
                      {activeTab === 'local' ? '🇨🇴' : '✨'}
                    </div>
                    
                    <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${
                      darkMode ? 'text-white' : activeTab === 'local' 
                        ? 'bg-gradient-to-r from-yellow-600 via-blue-600 to-red-600 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
                    }`}>
                      {activeTab === 'local' 
                        ? 'Bienvenido a Nuestro Pulso Colombia'
                        : 'Welcome to Copilot Search AI'}
                    </h1>
                    
                    <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed font-medium ${
                      darkMode ? 'text-gray-200' : activeTab === 'local'
                        ? 'text-gray-700'
                        : 'text-gray-600'
                    }`}>
                      {activeTab === 'local' 
                        ? 'La red cívica más avanzada de Colombia para búsquedas locales inteligentes y participación ciudadana'
                        : 'The most advanced global search experience powered by AI. Discover knowledge panels, real-time content, and intelligent insights.'}
                    </p>

                    {/* Live Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                      <div className={`px-6 py-3 rounded-full backdrop-blur-sm ${
                        darkMode 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/80 text-gray-700'
                      }`}>
                        <span className="font-bold">47,583</span> <span className="text-sm">searches today</span>
                      </div>
                      <div className={`px-6 py-3 rounded-full backdrop-blur-sm ${
                        darkMode 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/80 text-gray-700'
                      }`}>
                        <span className="font-bold">12,891</span> <span className="text-sm">active users</span>
                      </div>
                      <div className={`px-6 py-3 rounded-full backdrop-blur-sm ${
                        darkMode 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/80 text-gray-700'
                      }`}>
                        <span className="font-bold">99.7%</span> <span className="text-sm">accuracy</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => searchInputRef.current?.focus()}
                      className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                        activeTab === 'local'
                          ? 'bg-gradient-to-r from-yellow-500 via-blue-500 to-red-500 text-white hover:from-yellow-600 hover:via-blue-600 hover:to-red-600'
                          : 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600'
                      }`}
                    >
                      Start Searching Now ✨
                    </button>
                  </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="mb-12">
                  <h2 className={`text-3xl font-bold text-center mb-12 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {activeTab === 'local' 
                      ? '🇨🇴 Explora Colombia'
                      : '🌟 Discover AI-Powered Features'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {activeTab === 'local' ? (
                      // Local Colombia Feature Cards
                      <>
                        <FeatureCard
                          icon="🏢"
                          title="Congreso de Colombia"
                          description="Actividad legislativa, votaciones y sesiones del Congreso Nacional en tiempo real"
                          gradient="from-blue-500 to-indigo-600"
                          onClick={() => performSearch('congreso colombia actividad legislativa', 'local', filters)}
                          darkMode={darkMode}
                          badge="EN VIVO"
                        />
                        <FeatureCard
                          icon="🚔"
                          title="Seguridad Nacional"
                          description="Noticias sobre narcotráfico, crimen y seguridad en Colombia"
                          gradient="from-red-500 to-pink-600"
                          onClick={() => performSearch('seguridad nacional colombia narcotráfico', 'local', filters)}
                          darkMode={darkMode}
                          badge="ACTUALIZADO"
                        />
                        <FeatureCard
                          icon="🇨🇴"
                          title="Gustavo Petro"
                          description="Últimas noticias y decisiones del Presidente de Colombia"
                          gradient="from-green-500 to-emerald-600"
                          onClick={() => performSearch('gustavo petro presidente colombia', 'local', filters)}
                          darkMode={darkMode}
                          badge="TRENDING"
                        />
                        <FeatureCard
                          icon="🗳️"
                          title="Perspectivas Políticas"
                          description="Análisis de izquierda y derecha desde el contexto colombiano"
                          gradient="from-purple-500 to-violet-600"
                          onClick={() => performSearch('política colombia izquierda derecha análisis', 'local', filters)}
                          darkMode={darkMode}
                        />
                        <FeatureCard
                          icon="📊"
                          title="Encuestas y Opinión"
                          description="Encuestas políticas, opinión pública y análisis de tendencias"
                          gradient="from-orange-500 to-red-600"
                          onClick={() => performSearch('encuestas políticas colombia opinión pública', 'local', filters)}
                          darkMode={darkMode}
                        />
                        <FeatureCard
                          icon="🌍"
                          title="Colombia Internacional"
                          description="Relaciones internacionales y presencia de Colombia en el mundo"
                          gradient="from-teal-500 to-cyan-600"
                          onClick={() => performSearch('colombia relaciones internacionales', 'local', filters)}
                          darkMode={darkMode}
                        />
                      </>
                    ) : (
                      // Mundo Global Feature Cards
                      <>
                        <FeatureCard
                          icon="🧠"
                          title="AI Knowledge Panels"
                          description="Interactive facts, images, timelines, and company information powered by advanced AI"
                          gradient="from-purple-500 to-indigo-600"
                          onClick={() => {
                            // Show Knowledge Panel demo
                            performSearch('artificial intelligence knowledge panel', 'world', filters);
                          }}
                          darkMode={darkMode}
                          badge="AI POWERED"
                        />
                        <FeatureCard
                          icon="🇺🇸"
                          title="Donald Trump"
                          description="Comprehensive global coverage of US politics, campaigns, and international affairs"
                          gradient="from-red-500 to-orange-600"
                          onClick={() => {
                            // Load Trump content feed
                            performSearch('donald trump politics news latest', 'world', filters);
                          }}
                          darkMode={darkMode}
                          badge="TRENDING"
                        />
                        <FeatureCard
                          icon="🌍"
                          title="Global Sources"
                          description="Access to BBC, CNN, Reuters, AP, The Guardian and premium international media"
                          gradient="from-blue-500 to-cyan-600"
                          onClick={() => {
                            // Navigate to sources page
                            window.dispatchEvent(new CustomEvent('navigate', { 
                              detail: { view: 'sources' }
                            }));
                          }}
                          darkMode={darkMode}
                          badge="VERIFIED"
                        />
                        <FeatureCard
                          icon="📊"
                          title="Sentiment Analysis"
                          description="Real-time entity detection and sentiment analysis for global topics and trends"
                          gradient="from-green-500 to-emerald-600"
                          onClick={() => {
                            // Show sentiment analysis demo
                            performSearch('sentiment analysis global trends example', 'world', filters);
                          }}
                          darkMode={darkMode}
                          badge="REAL-TIME"
                        />
                        <FeatureCard
                          icon="⚠️"
                          title="Terror News"
                          description="Critical security updates, terrorism coverage, and international threat analysis"
                          gradient="from-gray-600 to-gray-800"
                          onClick={() => {
                            // Navigate to Terror News Hub instead of search
                            window.dispatchEvent(new CustomEvent('navigate', { 
                              detail: { view: 'terror-news' }
                            }));
                          }}
                          darkMode={darkMode}
                          badge="BREAKING"
                          isHighPriority={true}
                        />
                        <FeatureCard
                          icon="🔬"
                          title="Deep Analysis"
                          description="AI-powered deep dives into complex global issues with multi-source verification"
                          gradient="from-violet-500 to-purple-600"
                          onClick={() => performSearch('deep analysis global issues AI', 'world', filters)}
                          darkMode={darkMode}
                          badge="PREMIUM"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Topic Explorer (if enabled) */}
            {showTopicExplorer && relatedTopics.length > 0 && (
              <div className={`rounded-lg shadow-sm border p-6 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <FaBrain className="w-5 h-5 text-purple-500" />
                  Topic Explorer
                </h3>
                <div className="space-y-2">
                  {relatedTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => performSearch(topic, activeTab, filters)}
                      className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <MdAutoAwesome className="inline w-4 h-4 mr-2 text-purple-500" />
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Searches */}
            {savedSearches.length > 0 && (
              <div className={`rounded-lg shadow-sm border p-6 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <FaBookmark className="w-5 h-5 text-blue-500" />
                  Saved Searches
                </h3>
                <div className="space-y-2">
                  {savedSearches.slice(0, 5).map((saved) => (
                    <button
                      key={saved.id}
                      onClick={() => performSearch(saved.query, activeTab, saved.filters)}
                      className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium truncate">{saved.query}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {saved.resultCount.toLocaleString()} results
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className={`rounded-lg shadow-sm border p-6 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <FaHistory className="w-5 h-5 text-gray-500" />
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {searchHistory.slice(0, 5).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => performSearch(query, activeTab, filters)}
                      className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <BiTime className="inline w-4 h-4 mr-2 text-gray-400" />
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            <div className={`rounded-lg shadow-sm border p-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <FaQuestionCircle className="w-5 h-5 text-green-500" />
                Search Tips
              </h3>
              <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-start gap-2">
                  <AiOutlineThunderbolt className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>Use quotes for exact phrases: "Gustavo Petro"</span>
                </div>
                <div className="flex items-start gap-2">
                  <BsLightning className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>Try voice search for natural language queries</span>
                </div>
                <div className="flex items-start gap-2">
                  <BsEye className="w-4 h-4 text-purple-500 mt-0.5" />
                  <span>Entity detection highlights important terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode-specific footer */}
        {(searchResults.length > 0 || currentQuery) && (
          <div className={`mt-12 p-6 rounded-xl text-center ${
            activeTab === 'local' 
              ? 'bg-gradient-to-r from-yellow-50 to-blue-50 border border-yellow-200' 
              : 'bg-gradient-to-r from-gray-50 to-purple-50 border border-purple-200'
          }`}>
            {activeTab === 'local' ? (
              <div>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  ¡Gracias por usar Nuestro Pulso!
                </p>
                <p className="text-sm text-gray-600">
                  La red cívica de Colombia • Fuentes 100% nacionales y locales
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
                  <BsStars className="w-5 h-5" />
                  Powered by Copilot AI
                </p>
                <p className="text-sm text-gray-600">
                  Global intelligence search • International sources and knowledge panels
                </p>
              </div>
            )}
          </div>
        )}

        {/* Thank You Feedback Section */}
        <ThankYouSection
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
          searchQuery={currentQuery}
          searchResults={totalResults}
          onSubmitFeedback={submitThankYouFeedback}
        />

        {/* Voice Search Modal */}
        {showVoiceSearch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`rounded-2xl shadow-2xl max-w-sm w-full text-center p-8 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FaMicrophone className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Listening...
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Speak your search query clearly
              </p>
              <button
                onClick={() => setShowVoiceSearch(false)}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSearchEngine;