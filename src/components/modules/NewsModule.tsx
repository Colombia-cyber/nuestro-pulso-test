import React from 'react';
import { FiFileText, FiShield, FiTrendingUp, FiClock, FiEye, FiAlertTriangle } from 'react-icons/fi';

const NewsModule: React.FC = () => {
  const verifiedNews = [
    {
      title: 'Congreso aprueba en primer debate reforma al sistema de salud',
      source: 'El Tiempo',
      verificationStatus: 'verified',
      biasScore: 'neutral',
      timestamp: '2 horas',
      category: 'Política',
      factCheck: { score: 95, claims: 3 }
    },
    {
      title: 'Incremento del 15% en inversión extranjera durante 2024',
      source: 'Portafolio',
      verificationStatus: 'verified',
      biasScore: 'slight-positive',
      timestamp: '4 horas',
      category: 'Economía',
      factCheck: { score: 92, claims: 5 }
    },
    {
      title: 'Alerta por incremento en casos de dengue en costa atlántica',
      source: 'RCN Noticias',
      verificationStatus: 'pending',
      biasScore: 'neutral',
      timestamp: '6 horas',
      category: 'Salud',
      factCheck: { score: 88, claims: 2 }
    }
  ];

  const trendingTopics = [
    { topic: 'Reforma Pensional', mentions: 1847, sentiment: 'mixed' },
    { topic: 'Metro de Bogotá', mentions: 923, sentiment: 'positive' },
    { topic: 'Diálogos de Paz', mentions: 1456, sentiment: 'neutral' },
    { topic: 'Copa América 2024', mentions: 2103, sentiment: 'positive' }
  ];

  const sourcesReliability = [
    { source: 'El Tiempo', reliability: 92, articles: 45 },
    { source: 'El Espectador', reliability: 89, articles: 32 },
    { source: 'Semana', reliability: 85, articles: 28 },
    { source: 'RCN Noticias', reliability: 87, articles: 51 }
  ];

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <FiShield className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <FiClock className="w-4 h-4 text-yellow-500" />;
      case 'disputed':
        return <FiAlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <FiEye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'left':
        return 'bg-blue-100 text-blue-800';
      case 'slight-left':
        return 'bg-blue-50 text-blue-700';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      case 'slight-positive':
        return 'bg-green-50 text-green-700';
      case 'right':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-red-50 px-6 py-3 rounded-full mb-4">
          <FiFileText className="w-8 h-8 text-red-600" />
          <h1 className="text-2xl font-bold text-red-900">Noticias Verificadas</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Información confiable con análisis de sesgo político y verificación automática de hechos
        </p>
      </div>

      {/* News Intelligence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Noticias Verificadas</p>
              <p className="text-2xl font-bold text-gray-800">2,847</p>
            </div>
            <FiShield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fact-Checks Hoy</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
            <FiEye className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Noticias Falsas Detectadas</p>
              <p className="text-2xl font-bold text-gray-800">23</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Precisión IA</p>
              <p className="text-2xl font-bold text-gray-800">94.7%</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verified News Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiFileText className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">Feed Verificado</h2>
          </div>
          <div className="space-y-6">
            {verifiedNews.map((news, index) => (
              <article key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-base leading-relaxed mb-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{news.source}</span>
                      <span>•</span>
                      <span>{news.timestamp}</span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{news.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {getVerificationIcon(news.verificationStatus)}
                      <span className="text-sm font-medium text-gray-700">
                        {news.verificationStatus === 'verified' ? 'Verificado' : 
                         news.verificationStatus === 'pending' ? 'Pendiente' : 'Disputado'}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getBiasColor(news.biasScore)}`}>
                      {news.biasScore === 'neutral' ? 'Neutral' : 
                       news.biasScore === 'slight-positive' ? 'Ligeramente Positivo' : news.biasScore}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      {news.factCheck.score}% verificado
                    </p>
                    <p className="text-xs text-gray-500">
                      {news.factCheck.claims} afirmaciones
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Cargar Más Noticias
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FiTrendingUp className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-gray-800">Trending</h3>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800 text-sm">{topic.topic}</h4>
                    <span className={`w-2 h-2 rounded-full ${
                      topic.sentiment === 'positive' ? 'bg-green-500' : 
                      topic.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {topic.mentions.toLocaleString()} menciones
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Source Reliability */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FiShield className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-bold text-gray-800">Confiabilidad</h3>
            </div>
            <div className="space-y-3">
              {sourcesReliability.map((source, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800 text-sm">{source.source}</h4>
                    <span className="text-sm font-bold text-green-600">{source.reliability}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${source.reliability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{source.articles} arts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Fact-Checking Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">🤖 IA de Verificación</h2>
        <p className="mb-4 opacity-90">
          Nuestra inteligencia artificial analiza cada noticia en tiempo real, verificando hechos y detectando sesgos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <FiShield className="w-8 h-8 mb-2 mx-auto" />
            <p className="font-semibold">Verificación Automática</p>
            <p className="text-sm opacity-80">Fact-checking en segundos</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <FiEye className="w-8 h-8 mb-2 mx-auto" />
            <p className="font-semibold">Análisis de Sesgo</p>
            <p className="text-sm opacity-80">Detecta orientación política</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <FiTrendingUp className="w-8 h-8 mb-2 mx-auto" />
            <p className="font-semibold">Scoring de Confianza</p>
            <p className="text-sm opacity-80">Calificación de credibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModule;