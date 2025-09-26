import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaClock, FaMapMarkerAlt, FaGlobe, FaExternalLinkAlt } from 'react-icons/fa';

interface LocalSearchPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

const LocalSearchPage: React.FC<LocalSearchPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('south american and colombian news');
  const [selectedTab, setSelectedTab] = useState('Todo');
  const [showDidYouMean, setShowDidYouMean] = useState(true);

  // Google-style tabs
  const searchTabs = [
    { id: 'Todo', label: 'Todo', icon: '🔍' },
    { id: 'Imágenes', label: 'Imágenes', icon: '📷' },
    { id: 'Noticias', label: 'Noticias', icon: '📰' },
    { id: 'Videos', label: 'Videos', icon: '🎥' },
    { id: 'Videos Cortos', label: 'Videos Cortos', icon: '📱' },
    { id: 'Foros', label: 'Foros', icon: '💬' },
    { id: 'Compras', label: 'Compras', icon: '🛒' },
    { id: 'Más', label: 'Más', icon: '⋯' },
    { id: 'Herramientas', label: 'Herramientas', icon: '🔧' }
  ];

  // Colombian/South American news sources
  const localSources = [
    { name: 'Semana', url: 'semana.com', logo: '📰' },
    { name: 'El Tiempo', url: 'eltiempo.com', logo: '⏰' },
    { name: 'Colombia Reports', url: 'colombiareports.com', logo: '🇨🇴' },
    { name: 'The City Paper', url: 'thecitypaperbogota.com', logo: '📄' },
    { name: 'BBC', url: 'bbc.com', logo: '🏛️' },
    { name: 'Al Jazeera', url: 'aljazeera.com', logo: '🌍' },
    { name: 'The Guardian', url: 'theguardian.com', logo: '🛡️' }
  ];

  // Sample news data
  const newsResults = [
    {
      id: 1,
      title: 'President Petro Addresses UNGA on Climate and Security',
      source: 'El Tiempo',
      date: '2 horas atrás',
      snippet: 'Colombian President Gustavo Petro delivered a speech at the UN General Assembly focusing on climate change and regional security challenges...',
      url: 'https://eltiempo.com',
      image: '/api/placeholder/100/75'
    },
    {
      id: 2,
      title: 'Humanitarian Situation Improves in Pacific Coast Regions',
      source: 'Colombia Reports',
      date: '4 horas atrás',
      snippet: 'Recent reports indicate improvements in humanitarian conditions along Colombia\'s Pacific coast, with new aid programs showing positive results...',
      url: 'https://colombiareports.com',
      image: '/api/placeholder/100/75'
    },
    {
      id: 3,
      title: 'Anti-Drug Efforts Show Progress in Southern Colombia',
      source: 'Semana',
      date: '6 horas atrás',
      snippet: 'Joint operations between Colombian and international forces have led to significant drug seizures in southern departments...',
      url: 'https://semana.com',
      image: '/api/placeholder/100/75'
    },
    {
      id: 4,
      title: 'Amazon Deforestation Rates Decline in Colombian Territory',
      source: 'BBC',
      date: '8 horas atrás',
      snippet: 'New satellite data shows a 15% reduction in Amazon deforestation rates within Colombian borders, attributed to enhanced conservation efforts...',
      url: 'https://bbc.com',
      image: '/api/placeholder/100/75'
    },
    {
      id: 5,
      title: 'Tourist Stopover Program Boosts Regional Economy',
      source: 'The City Paper',
      date: '1 día atrás',
      snippet: 'Colombia\'s innovative tourist stopover program has generated significant economic benefits for regional airports and local businesses...',
      url: 'https://thecitypaperbogota.com',
      image: '/api/placeholder/100/75'
    }
  ];

  // Related news topics
  const relatedTopics = [
    { topic: 'Illegal Mining Activities', trend: '+12%' },
    { topic: 'Political Violence Reports', trend: '-8%' },
    { topic: 'Security Operations', trend: '+24%' },
    { topic: 'Peace Process Updates', trend: '+5%' },
    { topic: 'Border Security Issues', trend: '-3%' }
  ];

  // People also ask questions
  const peopleAlsoAsk = [
    'What is the current security situation in Colombia?',
    'How is the peace process progressing in Colombia?',
    'What are the main challenges facing South America today?',
    'Which Colombian cities are safest for tourists?',
    'What is President Petro\'s foreign policy towards South America?'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowDidYouMean(query.includes('south american and colombian new'));
  };

  const handleDidYouMean = () => {
    setSearchQuery('south american and colombian news');
    setShowDidYouMean(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NP</span>
              </div>
              <span className="font-semibold text-gray-700">Local</span>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Buscar noticias locales de Colombia y Sudamérica..."
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Tabs */}
          <div className="flex items-center gap-1 mt-4 overflow-x-auto">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-blue-100 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Did You Mean */}
            {showDidYouMean && (
              <div className="mb-4 text-sm">
                <span className="text-gray-600">¿Quisiste decir: </span>
                <button
                  onClick={handleDidYouMean}
                  className="text-blue-600 hover:underline font-medium"
                >
                  south american and colombian <em>news</em>
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-600 mb-4">
              Aproximadamente 847,000 resultados (0.42 segundos)
            </div>

            {/* AI Overview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <h3 className="font-semibold text-gray-900">Resumen de IA - Noticias Locales</h3>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                <p>
                  <strong>Desarrollos Recientes:</strong> El presidente Petro ha abordado temas de seguridad y clima en la UNGA,
                  mientras que los esfuerzos antidrogas muestran progreso en el sur de Colombia.
                </p>
                <p>
                  <strong>Situación Humanitaria:</strong> Se reportan mejoras en las condiciones humanitarias en la costa del Pacífico,
                  con nuevos programas de ayuda que muestran resultados positivos.
                </p>
                <p>
                  <strong>Medio Ambiente:</strong> Las tasas de deforestación del Amazonas disminuyen en territorio colombiano,
                  con una reducción del 15% atribuida a esfuerzos de conservación mejorados.
                </p>
              </div>
            </div>

            {/* News Results */}
            <div className="space-y-6">
              {newsResults.map((news) => (
                <div key={news.id} className="border-b border-gray-100 pb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {news.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer mb-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {news.snippet}
                      </p>
                      <div className="flex items-center gap-1 text-green-700 text-sm">
                        <FaGlobe className="w-3 h-3" />
                        <span>{news.url}</span>
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="w-24 h-18 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                      {news.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Topics */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Temas Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {topic.topic}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      topic.trend.startsWith('+') 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {topic.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Local Sources */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Fuentes Locales
              </h3>
              <div className="space-y-3">
                {localSources.map((source, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="text-lg">{source.logo}</span>
                    <div>
                      <div className="font-medium text-sm">{source.name}</div>
                      <div className="text-xs text-gray-500">{source.url}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* People Also Ask */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">La gente también pregunta</h3>
              <div className="space-y-3">
                {peopleAlsoAsk.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <FaChevronDown className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{question}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Retroalimentación</h3>
              <div className="space-y-2 text-sm">
                <button className="text-blue-600 hover:underline block">
                  ¿Estos resultados son útiles?
                </button>
                <button className="text-blue-600 hover:underline block">
                  Reportar contenido inapropiado
                </button>
                <button className="text-blue-600 hover:underline block">
                  Sugerir mejoras
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Palabras clave relacionadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Colombia', 'Sudamérica', 'Petro', 'Seguridad', 'Política', 'Noticias'].map((keyword) => (
                    <span key={keyword} className="bg-white border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSearchPage;