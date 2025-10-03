import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaSearch, FaGlobe, FaImage, FaVideo, FaShoppingCart, 
  FaCog, FaChevronDown, FaChevronUp, FaQuestionCircle,
  FaExternalLinkAlt, FaClock, FaShare, FaBookmark
} from 'react-icons/fa';
import { 
  MdWeb, MdMoreHoriz, MdShoppingCart, MdForum, 
  MdPlayCircleOutline, MdImage, MdArticle, MdTrendingUp
} from 'react-icons/md';
import { BiNews, BiTime } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { getLabels, Language } from '../utils/i18n';

interface GoogleStyleMundoSearchProps {
  initialQuery?: string;
  onNavigateBack?: () => void;
  darkMode?: boolean;
  language?: Language;
}

interface SearchTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface NewsCard {
  id: string;
  title: string;
  source: string;
  time: string;
  snippet: string;
  imageUrl?: string;
  url: string;
}

interface WebResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  source: string;
  timestamp?: string;
}

interface PeopleAlsoAsk {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

const GoogleStyleMundoSearch: React.FC<GoogleStyleMundoSearchProps> = ({
  initialQuery = '',
  onNavigateBack,
  darkMode = false,
  language = 'es'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0.42);
  const [resultCount, setResultCount] = useState('Cerca de 847,000 resultados');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Get internationalized labels
  const labels = getLabels(language);

  // Search tabs - Google style
  const searchTabs: SearchTab[] = [
    { id: 'all', name: labels.searchTabs.all, icon: <MdWeb className="w-4 h-4" /> },
    { id: 'images', name: labels.searchTabs.images, icon: <FaImage className="w-4 h-4" /> },
    { id: 'news', name: labels.searchTabs.news, icon: <BiNews className="w-4 h-4" /> },
    { id: 'videos', name: labels.searchTabs.videos, icon: <FaVideo className="w-4 h-4" /> },
    { id: 'short-videos', name: labels.searchTabs.shortVideos, icon: <MdPlayCircleOutline className="w-4 h-4" /> },
    { id: 'shopping', name: labels.searchTabs.shopping, icon: <FaShoppingCart className="w-4 h-4" /> },
    { id: 'forums', name: labels.searchTabs.forums, icon: <MdForum className="w-4 h-4" /> },
    { id: 'more', name: labels.searchTabs.more, icon: <MdMoreHoriz className="w-4 h-4" /> },
    { id: 'tools', name: labels.searchTabs.tools, icon: <FaCog className="w-4 h-4" /> }
  ];

  // Mock data - In real implementation, this would come from APIs
  const topStories: NewsCard[] = [
    {
      id: '1',
      title: 'Nuevos desarrollos en la política mundial afectan mercados globales',
      source: 'BBC News',
      time: 'hace 2 horas',
      snippet: 'Los últimos acontecimientos en el ámbito político internacional han generado volatilidad en los mercados financieros mundiales...',
      imageUrl: 'https://via.placeholder.com/120x80',
      url: '#'
    },
    {
      id: '2',
      title: 'Avances tecnológicos revolucionan la comunicación global',
      source: 'Reuters',
      time: 'hace 4 horas',
      snippet: 'La implementación de nuevas tecnologías está transformando la manera en que las personas se comunican a nivel mundial...',
      imageUrl: 'https://via.placeholder.com/120x80',
      url: '#'
    },
    {
      id: '3',
      title: 'Cambio climático: nuevas medidas internacionales en debate',
      source: 'The Guardian',
      time: 'hace 6 horas',
      snippet: 'Líderes mundiales discuten nuevas estrategias para combatir el cambio climático en cumbre internacional...',
      imageUrl: 'https://via.placeholder.com/120x80',
      url: '#'
    }
  ];

  const webResults: WebResult[] = [
    {
      id: '1',
      title: `${query} - Wikipedia`,
      url: `https://es.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      displayUrl: 'es.wikipedia.org › wiki › ' + query.replace(/\s+/g, '_'),
      snippet: `${query} se refiere a un tema de importancia global que abarca múltiples aspectos sociales, políticos y económicos. La enciclopedia libre ofrece información detallada y verificada sobre este tema...`,
      source: 'Wikipedia',
      timestamp: '2024-01-15'
    },
    {
      id: '2',
      title: `Información sobre ${query} | Britannica`,
      url: `https://www.britannica.com/search?query=${encodeURIComponent(query)}`,
      displayUrl: 'www.britannica.com › search',
      snippet: `Enciclopedia Britannica ofrece artículos académicos y contenido educativo sobre ${query}. Explora definiciones, historia, contexto y análisis profundo del tema...`,
      source: 'Britannica',
      timestamp: '2024-01-10'
    },
    {
      id: '3',
      title: `${query}: Últimas noticias y análisis | CNN`,
      url: `https://cnn.com/search?q=${encodeURIComponent(query)}`,
      displayUrl: 'cnn.com › search',
      snippet: `Cobertura completa de ${query} con las últimas noticias, análisis de expertos y reportajes especiales. Mantente informado sobre los desarrollos más recientes...`,
      source: 'CNN',
      timestamp: '2024-01-20'
    },
    {
      id: '4',
      title: `${query} - Contexto y análisis | BBC News`,
      url: `https://bbc.com/news/topics/${encodeURIComponent(query)}`,
      displayUrl: 'bbc.com › news › topics',
      snippet: `BBC News proporciona cobertura integral de ${query} con reportajes en profundidad, análisis de contexto y perspectivas de corresponsales internacionales...`,
      source: 'BBC News',
      timestamp: '2024-01-18'
    }
  ];

  const peopleAlsoAsk: PeopleAlsoAsk[] = [
    {
      id: '1',
      question: `¿Qué es ${query}?`,
      answer: `${query} es un concepto que abarca múltiples dimensiones y se refiere a aspectos importantes de la realidad global actual. Su definición varía según el contexto específico.`,
      expanded: false
    },
    {
      id: '2',
      question: `¿Por qué es importante ${query}?`,
      answer: `La importancia de ${query} radica en su impacto directo en diversos aspectos sociales, económicos y políticos que afectan a comunidades a nivel mundial.`,
      expanded: false
    },
    {
      id: '3',
      question: `¿Cuál es la historia de ${query}?`,
      answer: `La historia de ${query} se remonta a décadas atrás y ha evolucionado significativamente, influenciada por cambios sociales, tecnológicos y políticos.`,
      expanded: false
    },
    {
      id: '4',
      question: `¿Cómo afecta ${query} a la sociedad actual?`,
      answer: `${query} tiene múltiples efectos en la sociedad contemporánea, influyendo en políticas públicas, decisiones económicas y comportamientos sociales.`,
      expanded: false
    }
  ];

  const relatedKeywords = [
    `${query} definición`,
    `${query} historia`,
    `${query} importancia`,
    `${query} análisis`,
    `${query} contexto`,
    `${query} impacto social`
  ];

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate search API call
    setTimeout(() => {
      setSearchTime(Math.random() * 0.5 + 0.2);
      setResultCount(`Cerca de ${Math.floor(Math.random() * 900 + 100)},000 resultados`);
      setIsLoading(false);
    }, 300);
  }, [query]);

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  const cardClasses = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Header with Search Bar */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <FaGlobe className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="text-xl font-bold">Mundo</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className={`flex items-center border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'} rounded-full px-4 py-2 hover:shadow-md transition-shadow`}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={`flex-1 bg-transparent border-none outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  placeholder="Buscar en el mundo..."
                />
                <button 
                  onClick={handleSearch}
                  className={`ml-3 p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Back Button */}
            {onNavigateBack && (
              <button 
                onClick={onNavigateBack}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} transition-colors`}
              >
                Volver
              </button>
            )}
          </div>

          {/* Search Tabs */}
          <div className="flex items-center gap-1 mt-4 overflow-x-auto">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Info */}
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          {resultCount} ({searchTime.toFixed(2)} segundos)
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Stories */}
            <section>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <BiNews className="w-5 h-5" />
                Principales noticias
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {topStories.map((story) => (
                  <div
                    key={story.id}
                    className={`${cardClasses} border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <div className="flex gap-4">
                      {story.imageUrl && (
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-20 h-14 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm mb-1 line-clamp-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                          {story.title}
                        </h3>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                          {story.source} • {story.time}
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                          {story.snippet}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Web Results */}
            <section>
              <div className="space-y-6">
                {webResults.map((result) => (
                  <div key={result.id} className="group">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      {result.displayUrl}
                    </div>
                    <h3 className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline mb-1 cursor-pointer group-hover:underline`}>
                      {result.title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      {result.snippet}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:underline`}>
                        <FaShare className="w-3 h-3 mr-1 inline" />
                        Compartir
                      </button>
                      <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:underline`}>
                        <FaBookmark className="w-3 h-3 mr-1 inline" />
                        Guardar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Also in the News */}
            <section className={`${cardClasses} border rounded-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                También en las noticias
              </h2>
              <div className="space-y-4">
                {topStories.slice(0, 2).map((story) => (
                  <div key={story.id} className="group cursor-pointer">
                    <h3 className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline mb-1 line-clamp-2`}>
                      {story.title}
                    </h3>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {story.source} • {story.time}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* People Also Ask */}
            <section className={`${cardClasses} border rounded-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FaQuestionCircle className="w-5 h-5" />
                La gente también pregunta
              </h2>
              <div className="space-y-3">
                {peopleAlsoAsk.map((item) => (
                  <div key={item.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-3 last:border-b-0`}>
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className={`w-full text-left flex items-center justify-between gap-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium text-sm`}
                    >
                      {item.question}
                      {expandedQuestions.has(item.id) ? (
                        <FaChevronUp className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="w-4 h-4 flex-shrink-0" />
                      )}
                    </button>
                    {expandedQuestions.has(item.id) && (
                      <div className={`mt-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Related Keywords */}
            <section className={`${cardClasses} border rounded-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Búsquedas relacionadas
              </h2>
              <div className="space-y-2">
                {relatedKeywords.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(keyword)}
                    className={`block w-full text-left text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} hover:underline py-1`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </section>

            {/* Feedback */}
            <section className={`${cardClasses} border rounded-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Feedback
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                ¿Estos resultados te fueron útiles?
              </p>
              <div className="flex gap-3">
                <button className={`px-4 py-2 text-sm border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}>
                  Sí
                </button>
                <button className={`px-4 py-2 text-sm border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}>
                  No
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleStyleMundoSearch;