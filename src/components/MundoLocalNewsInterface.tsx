import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FaSearch, 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaImage, 
  FaVideo, 
  FaShoppingCart,
  FaComments,
  FaEllipsisH,
  FaCog,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaClock,
  FaFire,
  FaFilter
} from 'react-icons/fa';
import { 
  MdShortText, 
  MdVideoLibrary, 
  MdWeb,
  MdImage,
  MdClear
} from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { RealNewsArticle, realNewsService } from '../services/realNewsService';
import LoadingSkeleton from './LoadingSkeleton';

interface NewsSource {
  id: string;
  name: string;
  baseUrl: string;
  category: string;
  location: 'world' | 'local';
}

interface SearchCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface PeopleAlsoAskItem {
  question: string;
  answer?: string;
  isExpanded: boolean;
  sources?: string[];
}

interface TopStory {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
  category: string;
}

interface MundoLocalNewsInterfaceProps {
  onNavigate?: (view: string) => void;
  className?: string;
}

const MundoLocalNewsInterface: React.FC<MundoLocalNewsInterfaceProps> = ({ 
  onNavigate,
  className = '' 
}) => {
  // State management
  const [activeTab, setActiveTab] = useState<'world' | 'local'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RealNewsArticle[]>([]);
  const [topStories, setTopStories] = useState<TopStory[]>([]);
  const [peopleAlsoAsk, setPeopleAlsoAsk] = useState<PeopleAlsoAskItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [resultCount, setResultCount] = useState<string>('');
  const [searchTime, setSearchTime] = useState<string>('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // News sources configuration
  const worldSources: NewsSource[] = [
    { id: 'guardian', name: 'The Guardian', baseUrl: 'theguardian.com', category: 'world', location: 'world' },
    { id: 'bbc', name: 'BBC News', baseUrl: 'bbc.com', category: 'world', location: 'world' },
    { id: 'aljazeera', name: 'Al Jazeera', baseUrl: 'aljazeera.com', category: 'world', location: 'world' },
    { id: 'reuters', name: 'Reuters', baseUrl: 'reuters.com', category: 'world', location: 'world' },
    { id: 'cnn', name: 'CNN', baseUrl: 'cnn.com', category: 'world', location: 'world' }
  ];

  const localSources: NewsSource[] = [
    { id: 'eltiempo', name: 'El Tiempo', baseUrl: 'eltiempo.com', category: 'colombia', location: 'local' },
    { id: 'semana', name: 'Semana', baseUrl: 'semana.com', category: 'colombia', location: 'local' },
    { id: 'elespectador', name: 'El Espectador', baseUrl: 'elespectador.com', category: 'colombia', location: 'local' }
  ];

  // Search categories
  const searchCategories: SearchCategory[] = [
    { id: 'all', name: 'Todo', icon: <MdWeb className="w-4 h-4" /> },
    { id: 'images', name: 'Imágenes', icon: <MdImage className="w-4 h-4" /> },
    { id: 'news', name: 'Noticias', icon: <BiNews className="w-4 h-4" /> },
    { id: 'videos', name: 'Videos', icon: <FaVideo className="w-4 h-4" /> },
    { id: 'short-videos', name: 'Videos cortos', icon: <MdShortText className="w-4 h-4" /> },
    { id: 'shopping', name: 'Shopping', icon: <FaShoppingCart className="w-4 h-4" /> },
    { id: 'forums', name: 'Foros', icon: <FaComments className="w-4 h-4" /> },
    { id: 'more', name: 'Más', icon: <FaEllipsisH className="w-4 h-4" /> },
    { id: 'tools', name: 'Herramientas', icon: <FaCog className="w-4 h-4" /> }
  ];

  // Initialize People Also Ask data
  useEffect(() => {
    const defaultQuestions = activeTab === 'world' ? [
      {
        question: "¿Cuáles son las noticias más importantes del mundo hoy?",
        answer: "Las principales noticias incluyen desarrollos en política internacional, economía global, y eventos de actualidad que afectan múltiples países.",
        isExpanded: false,
        sources: ["BBC", "Reuters", "The Guardian"]
      },
      {
        question: "¿Qué está pasando en la guerra de Ucrania?",
        answer: "",
        isExpanded: false,
        sources: ["CNN", "Al Jazeera", "Reuters"]
      },
      {
        question: "¿Cuáles son las últimas noticias sobre el cambio climático?",
        answer: "",
        isExpanded: false,
        sources: ["The Guardian", "BBC", "Reuters"]
      },
      {
        question: "¿Qué acontecimientos políticos mundiales son más relevantes?",
        answer: "",
        isExpanded: false,
        sources: ["Reuters", "CNN", "BBC"]
      }
    ] : [
      {
        question: "¿Cuáles son las noticias más importantes de Colombia hoy?",
        answer: "Las principales noticias incluyen política nacional, economía colombiana, seguridad, y eventos locales de mayor impacto.",
        isExpanded: false,
        sources: ["El Tiempo", "Semana", "El Espectador"]
      },
      {
        question: "¿Qué está pasando con el gobierno de Gustavo Petro?",
        answer: "",
        isExpanded: false,
        sources: ["El Tiempo", "Semana", "El Espectador"]
      },
      {
        question: "¿Cuál es la situación de seguridad en Colombia?",
        answer: "",
        isExpanded: false,
        sources: ["El Espectador", "El Tiempo", "Semana"]
      },
      {
        question: "¿Cómo está la economía colombiana actualmente?",
        answer: "",
        isExpanded: false,
        sources: ["La República", "Portafolio", "El Tiempo"]
      }
    ];
    
    setPeopleAlsoAsk(defaultQuestions);
  }, [activeTab]);

  // Fetch news data
  const fetchNews = useCallback(async (tab: 'world' | 'local', query?: string) => {
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      let articles: RealNewsArticle[] = [];
      
      if (tab === 'local') {
        articles = await realNewsService.getColombianNews({
          query: query || 'Colombia noticias',
          limit: 20,
          category: activeCategory === 'all' ? undefined : activeCategory
        });
      } else {
        // For world news, we'll use a broader search
        articles = await realNewsService.getWorldNews({
          query: query || 'world news',
          limit: 20,
          category: activeCategory === 'all' ? undefined : activeCategory
        });
      }
      
      setResults(articles);
      
      // Extract top stories (first 5 articles)
      const stories: TopStory[] = articles.slice(0, 5).map(article => ({
        id: article.id,
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt,
        category: article.category
      }));
      
      setTopStories(stories);
      
      // Set search metadata
      const endTime = Date.now();
      const searchDuration = ((endTime - startTime) / 1000).toFixed(2);
      setSearchTime(searchDuration + ' segundos');
      
      const count = articles.length;
      setResultCount(`Aproximadamente ${count.toLocaleString()} resultados`);
      
    } catch (error) {
      console.error('Error fetching news:', error);
      // Set fallback data
      setResults([]);
      setTopStories([]);
      setResultCount('No se pudieron cargar los resultados');
      setSearchTime('0.00 segundos');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  // Initialize with default data
  useEffect(() => {
    fetchNews(activeTab);
  }, [activeTab, fetchNews]);

  // Handle search
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(activeTab, searchQuery);
    }
  }, [searchQuery, activeTab, fetchNews]);

  // Handle tab change
  const handleTabChange = (tab: 'world' | 'local') => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    fetchNews(activeTab, searchQuery);
  };

  // Toggle People Also Ask items
  const togglePeopleAlsoAsk = (index: number) => {
    setPeopleAlsoAsk(prev => prev.map((item, i) => ({
      ...item,
      isExpanded: i === index ? !item.isExpanded : item.isExpanded
    })));
  };

  // Format time ago
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Header with tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Tabs */}
          <div className="flex items-center space-x-8 py-4">
            <div className="flex items-center space-x-2">
              <FaGlobe className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Nuestro Pulso</span>
            </div>
            
            {/* World/Local Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleTabChange('world')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'world'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FaGlobe className="w-4 h-4" />
                <span>Mundial</span>
              </button>
              <button
                onClick={() => handleTabChange('local')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'local'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Colombia</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Buscar en ${activeTab === 'world' ? 'noticias mundiales' : 'noticias de Colombia'}...`}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <MdClear className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Search Categories */}
          <div className="pb-2">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {searchCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Info */}
          {(resultCount || searchTime) && (
            <div className="pb-2 text-sm text-gray-500">
              {resultCount} {searchTime && `(${searchTime})`}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-6">
          {/* Main Results Column */}
          <div className="flex-1">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Top Stories Section */}
                {topStories.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaFire className="w-5 h-5 text-orange-500 mr-2" />
                      Historias Destacadas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topStories.map((story) => (
                        <article key={story.id} className="group cursor-pointer">
                          <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            {story.imageUrl && (
                              <div className="aspect-video rounded-t-lg overflow-hidden">
                                <img
                                  src={story.imageUrl}
                                  alt={story.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-3 group-hover:text-blue-600">
                                {story.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                {story.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="font-medium">{story.source}</span>
                                <span>{formatTimeAgo(story.publishedAt)}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* People Also Ask Section */}
                {peopleAlsoAsk.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Preguntas frecuentes
                    </h2>
                    <div className="space-y-2">
                      {peopleAlsoAsk.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => togglePeopleAlsoAsk(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                          >
                            <span className="text-sm font-medium text-gray-900 pr-4">
                              {item.question}
                            </span>
                            {item.isExpanded ? (
                              <FaChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            ) : (
                              <FaChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {item.isExpanded && (
                            <div className="px-4 pb-4 border-t border-gray-100">
                              <p className="text-sm text-gray-700 mt-3 mb-3">
                                {item.answer || "Información no disponible en este momento."}
                              </p>
                              {item.sources && item.sources.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.sources.map((source, sourceIndex) => (
                                    <span
                                      key={sourceIndex}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                    >
                                      {source}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Results */}
                <div className="space-y-6">
                  {results.map((article) => (
                    <article key={article.id} className="group">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:bg-gray-50 -mx-2 px-2 py-3 rounded-lg transition-colors"
                      >
                        <div className="flex space-x-4">
                          {article.urlToImage && (
                            <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-blue-600 group-hover:underline mb-1 line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                              {article.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="font-medium">{article.source.name}</span>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                              {article.category && (
                                <span className="px-2 py-1 bg-gray-100 rounded-full">
                                  {article.category}
                                </span>
                              )}
                              <FaExternalLinkAlt className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Current Sources */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <BiNews className="w-4 h-4 mr-2" />
                  Fuentes Principales
                </h3>
                <div className="space-y-2">
                  {(activeTab === 'world' ? worldSources : localSources).map((source) => (
                    <div key={source.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{source.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Estadísticas
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Artículos encontrados:</span>
                    <span className="font-medium">{results.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuentes activas:</span>
                    <span className="font-medium">
                      {activeTab === 'world' ? worldSources.length : localSources.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Última actualización:</span>
                    <span className="font-medium">Ahora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MundoLocalNewsInterface;