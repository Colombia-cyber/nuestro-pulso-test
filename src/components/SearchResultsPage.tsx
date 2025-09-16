import React, { useState, useEffect } from 'react';
import { SearchResult, SearchResponse } from '../services/searchService';

interface SearchResultsPageProps {
  searchResponse: SearchResponse;
  query: string;
  onSearch: (query: string, filters?: any) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ 
  searchResponse, 
  query, 
  onSearch 
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const tabs = [
    { id: 'all', name: 'Todo', icon: '🔍' },
    { id: 'images', name: 'Imágenes', icon: '🖼️' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'news', name: 'Noticias', icon: '📰' },
    { id: 'forums', name: 'Foros', icon: '💬' },
    { id: 'more', name: 'Más', icon: '⋯' }
  ];

  const peopleAlsoAsk = [
    "¿Qué impacto tiene Trump en la política colombiana?",
    "¿Cuáles son las relaciones entre Colombia y Estados Unidos?",
    "¿Qué opinan los colombianos sobre Trump?",
    "¿Cómo afecta la política estadounidense a Colombia?"
  ];

  const knowledgePanelData = {
    title: "Donald Trump y Colombia",
    subtitle: "Relaciones Políticas",
    image: "🏛️",
    description: "Información sobre las relaciones diplomáticas y políticas entre el expresidente Donald Trump y Colombia.",
    facts: [
      { label: "Período presidencial", value: "2017-2021" },
      { label: "Relaciones con Colombia", value: "Alianza estratégica" },
      { label: "Temas principales", value: "Narcotráfico, comercio" },
      { label: "Última visita", value: "No registrada" }
    ],
    relatedTopics: ["Política exterior", "Relaciones bilaterales", "USMCA"]
  };

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const getSourceDivider = (source: string) => {
    const sourceMap: { [key: string]: { icon: string; color: string } } = {
      'Reddit': { icon: '🔴', color: 'border-orange-500' },
      'Wikipedia': { icon: '📚', color: 'border-gray-500' },
      'Facebook': { icon: '📘', color: 'border-blue-500' },
      'Twitter': { icon: '🐦', color: 'border-blue-400' },
      'YouTube': { icon: '🎥', color: 'border-red-500' },
      'Noticias': { icon: '📰', color: 'border-green-500' }
    };
    
    return sourceMap[source] || { icon: '🌐', color: 'border-gray-400' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              <span className="text-xl font-bold text-gray-800">Nuestro Pulso</span>
              <span className="text-lg">🇨🇴</span>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar..."
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  🔍
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            Aproximadamente {searchResponse.totalResults.toLocaleString()} resultados ({searchResponse.searchTime}ms)
          </div>

          {/* Search Tabs */}
          <div className="mt-4 flex items-center gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Main Results Column */}
          <div className="flex-1 max-w-3xl">
            {/* People Also Ask */}
            {peopleAlsoAsk.length > 0 && (
              <div className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">La gente también pregunta</h3>
                </div>
                {peopleAlsoAsk.map((question, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{question}</span>
                        <span className="text-gray-400 ml-2">
                          {expandedQuestions.has(index) ? '▲' : '▼'}
                        </span>
                      </div>
                    </button>
                    {expandedQuestions.has(index) && (
                      <div className="px-6 pb-4 text-sm text-gray-600">
                        <p>Esta es una respuesta simulada para la pregunta: "{question}". En una implementación real, aquí se mostraría información relevante basada en fuentes confiables.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Search Results */}
            <div className="space-y-6">
              {searchResponse.results.map((result, index) => {
                const sourceInfo = getSourceDivider(result.source);
                const isFirstOfSource = index === 0 || searchResponse.results[index - 1].source !== result.source;
                
                return (
                  <div key={result.id}>
                    {/* Source Divider */}
                    {isFirstOfSource && (
                      <div className={`flex items-center gap-3 mb-4 pb-2 border-b-2 ${sourceInfo.color}`}>
                        <span className="text-xl">{sourceInfo.icon}</span>
                        <span className="font-medium text-gray-700">{result.source}</span>
                      </div>
                    )}
                    
                    {/* Result Item */}
                    <div className="group">
                      <div className="mb-1">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <span className="inline-flex items-center">
                            🌐 {result.url || 'nuestropulso.com'}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{formatTimeAgo(result.timestamp)}</span>
                        </div>
                        <h3 className="text-xl text-blue-700 hover:underline cursor-pointer font-normal leading-7 mb-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-6 max-w-2xl">
                          {result.summary}
                        </p>
                        
                        {/* Rich Snippets / Additional Info */}
                        {result.tags && result.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Author and Relevance */}
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          {result.author && (
                            <span>Por {result.author}</span>
                          )}
                          <span className="ml-auto">
                            Relevancia: {result.relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Ver más resultados
              </button>
            </div>
          </div>

          {/* Knowledge Panel Sidebar */}
          {showKnowledgePanel && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{knowledgePanelData.image}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{knowledgePanelData.title}</h3>
                      <p className="text-sm text-gray-600">{knowledgePanelData.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowKnowledgePanel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {knowledgePanelData.description}
                </p>
                
                {/* Facts */}
                <div className="space-y-3 mb-6">
                  {knowledgePanelData.facts.map((fact, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">{fact.label}:</span>
                      <span className="text-gray-900">{fact.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Related Topics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Temas relacionados</h4>
                  <div className="space-y-2">
                    {knowledgePanelData.relatedTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => onSearch(topic)}
                        className="block w-full text-left text-sm text-blue-600 hover:underline"
                      >
                        🔗 {topic}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Colombian Flag */}
                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <span className="text-2xl">🇨🇴</span>
                  <p className="text-xs text-gray-500 mt-1">Información verificada para Colombia</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;