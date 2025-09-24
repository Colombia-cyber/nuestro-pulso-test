import React, { useState, useEffect, useRef } from 'react';

// Mock news data structure ready for API integration
const generateMockNews = (topic, region) => {
  const newsTemplates = {
    'drugs-crime': [
      {
        id: 1,
        title: `Operativo antidrogas en ${region} desarticula red criminal`,
        source: 'El Tiempo',
        date: '2024-01-15',
        summary: 'Autoridades capturan a 15 personas en operativo conjunto.',
        url: '#'
      },
      {
        id: 2,
        title: `Reducción del 20% en homicidios relacionados con drogas en ${region}`,
        source: 'El Espectador',
        date: '2023-11-20',
        summary: 'Estrategias de seguridad muestran resultados positivos.',
        url: '#'
      },
      {
        id: 3,
        title: `Nuevas medidas de prevención contra el narcotráfico en ${region}`,
        source: 'Semana',
        date: '2023-09-10',
        summary: 'Plan integral incluye programas educativos y laborales.',
        url: '#'
      }
    ],
    'congress': [
      {
        id: 4,
        title: `Congreso aprueba nueva ley de transparencia con apoyo de ${region}`,
        source: 'La República',
        date: '2024-01-10',
        summary: 'Representantes de la región lideran iniciativa anticorrupción.',
        url: '#'
      },
      {
        id: 5,
        title: `Debate sobre presupuesto nacional genera controversia en ${region}`,
        source: 'Portafolio',
        date: '2023-12-05',
        summary: 'Ciudadanos exigen mayor inversión en infraestructura local.',
        url: '#'
      }
    ],
    'gustavo-petro': [
      {
        id: 6,
        title: `Presidente Petro anuncia inversión en desarrollo social para ${region}`,
        source: 'El Tiempo',
        date: '2024-01-08',
        summary: 'Plan incluye mejoras en educación y salud pública.',
        url: '#'
      },
      {
        id: 7,
        title: `Políticas del gobierno generan debate ciudadano en ${region}`,
        source: 'El Espectador',
        date: '2023-10-15',
        summary: 'Encuestas reflejan opiniones divididas sobre reformas.',
        url: '#'
      }
    ]
  };

  return newsTemplates[topic] || [
    {
      id: 99,
      title: `Noticias sobre ${topic.replace('-', ' ')} en ${region}`,
      source: 'Fuente Local',
      date: '2024-01-01',
      summary: 'Información actualizada sobre este tema.',
      url: '#'
    }
  ];
};

const GlobalTendenciasRealtime = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [regionData, setRegionData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Colombian regions with realistic activity data
  const colombianRegions = [
    { 
      name: 'Bogotá', 
      population: 7181469,
      coordinates: { lat: 4.7110, lng: -74.0721 },
      gradient: 'from-blue-600 to-purple-700'
    },
    { 
      name: 'Medellín', 
      population: 2372330,
      coordinates: { lat: 6.2442, lng: -75.5812 },
      gradient: 'from-green-600 to-teal-700'
    },
    { 
      name: 'Cali', 
      population: 2172527,
      coordinates: { lat: 3.4516, lng: -76.5320 },
      gradient: 'from-orange-600 to-red-700'
    },
    { 
      name: 'Barranquilla', 
      population: 1232766,
      coordinates: { lat: 10.9639, lng: -74.7964 },
      gradient: 'from-yellow-600 to-orange-700'
    },
    { 
      name: 'Cartagena', 
      population: 876885,
      coordinates: { lat: 10.3932, lng: -75.4794 },
      gradient: 'from-pink-600 to-rose-700'
    },
    { 
      name: 'Cúcuta', 
      population: 650011,
      coordinates: { lat: 7.8939, lng: -72.5078 },
      gradient: 'from-indigo-600 to-blue-700'
    }
  ];

  // Trending topics with improved data structure
  const trendingTopics = [
    {
      id: 'drugs-crime',
      name: 'Drogas y Crimen',
      icon: '🚔',
      color: 'bg-red-500',
      description: 'Seguridad y lucha contra el narcotráfico'
    },
    {
      id: 'congress',
      name: 'Congreso',
      icon: '🏛️',
      color: 'bg-blue-500',
      description: 'Actividad legislativa y política'
    },
    {
      id: 'gustavo-petro',
      name: 'Gustavo Petro',
      icon: '👤',
      color: 'bg-green-500',
      description: 'Políticas y decisiones presidenciales'
    },
    {
      id: 'political-left',
      name: 'Izquierda Política',
      icon: '✊',
      color: 'bg-red-600',
      description: 'Movimientos y partidos de izquierda'
    },
    {
      id: 'political-right',
      name: 'Derecha Política',
      icon: '⚖️',
      color: 'bg-blue-600',
      description: 'Movimientos y partidos de derecha'
    },
    {
      id: 'social-issues',
      name: 'Temas Sociales',
      icon: '👥',
      color: 'bg-purple-600',
      description: 'Educación, salud y bienestar social'
    }
  ];

  // Generate realistic trend data with proper percentages
  const generateTrendData = () => {
    const data = colombianRegions.map(region => {
      const topics = trendingTopics.map(topic => {
        // Base activity influenced by population and regional factors
        const baseActivity = Math.log(region.population) * 10;
        const randomFactor = Math.random() * 0.5 + 0.7; // 0.7 to 1.2 multiplier
        const timeVariation = Math.sin(Date.now() / 50000 + Math.random()) * 0.2 + 0.8;
        
        // Calculate trend percentage (realistic range 5-95%)
        const trendPercentage = Math.max(5, Math.min(95, 
          Math.floor((baseActivity * randomFactor * timeVariation) / 10)
        ));
        
        // Calculate change from "previous" period
        const change = (Math.random() - 0.5) * 15; // -7.5% to +7.5%
        
        // Participants based on population and trend strength
        const participants = Math.floor(
          (region.population * trendPercentage / 100) * 0.001 * randomFactor
        );

        return {
          ...topic,
          trendPercentage,
          change,
          participants,
          activity: baseActivity * randomFactor
        };
      }).sort((a, b) => b.trendPercentage - a.trendPercentage);

      const totalActivity = topics.reduce((sum, topic) => sum + topic.participants, 0);

      return {
        ...region,
        topics,
        totalActivity
      };
    });

    setRegionData(data.sort((a, b) => b.totalActivity - a.totalActivity));
    setLastUpdate(new Date());
  };

  // Initialize and update data
  useEffect(() => {
    generateTrendData();
    const interval = setInterval(generateTrendData, 8000); // Update every 8 seconds
    return () => clearInterval(interval);
  }, []);

  // Animation loop for visual effects
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(animationInterval);
  }, []);

  const handleTopicClick = (region, topic) => {
    setSelectedRegion(region);
    setSelectedTopic(topic);
    setDetailsPanelOpen(true);
  };

  const closDetailsPanel = () => {
    setDetailsPanelOpen(false);
    setTimeout(() => {
      setSelectedRegion(null);
      setSelectedTopic(null);
    }, 300);
  };

  const getTotalActivity = () => {
    return regionData.reduce((sum, region) => sum + region.totalActivity, 0);
  };

  const getAnimatedScale = (index) => {
    const phase = (animationPhase + index * 10) % 100;
    return 1 + Math.sin(phase * 0.1) * 0.05; // Subtle breathing effect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            🌍 Global de Tendencias en Tiempo Real
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Monitoreo en vivo de la actividad cívica y tendencias políticas en Colombia
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-6 text-white text-center shadow-2xl">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {getTotalActivity().toLocaleString()}
            </div>
            <div className="text-emerald-100 font-medium">Ciudadanos Activos</div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white text-center shadow-2xl">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {regionData.length}
            </div>
            <div className="text-blue-100 font-medium">Regiones Monitoreadas</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl p-6 text-white text-center shadow-2xl">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {trendingTopics.length}
            </div>
            <div className="text-purple-100 font-medium">Temas Trending</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {regionData.map((region, regionIndex) => (
            <div
              key={region.name}
              className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              style={{
                transform: `scale(${getAnimatedScale(regionIndex)})`,
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Region Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {region.name}
                  </h3>
                  <div className="text-slate-400 text-sm">
                    {region.population.toLocaleString()} habitantes
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    {region.totalActivity.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-sm">activos</div>
                </div>
              </div>

              {/* Trending Topics Grid */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🔥</span>
                  Tendencias Principales
                </h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {region.topics.slice(0, 4).map((topic, topicIndex) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(region, topic)}
                      className="group relative overflow-hidden bg-slate-700/50 hover:bg-slate-600/70 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg border border-slate-600/30 hover:border-slate-500/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl group-hover:scale-110 transition-transform">
                            {topic.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-slate-100">
                              {topic.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {topic.participants.toLocaleString()} participantes
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            {topic.trendPercentage}%
                          </div>
                          <div className={`text-sm flex items-center ${
                            topic.change > 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {topic.change > 0 ? '↗' : '↘'}
                            {Math.abs(topic.change).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-3 bg-slate-600/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-1000`}
                          style={{ width: `${topic.trendPercentage}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel Overlay */}
      {detailsPanelOpen && selectedRegion && selectedTopic && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            detailsPanelOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            
            {/* Panel Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedTopic.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedTopic.name}
                    </h3>
                    <p className="text-slate-300">{selectedRegion.name}</p>
                  </div>
                </div>
                <button
                  onClick={closDetailsPanel}
                  className="text-slate-400 hover:text-white text-2xl font-bold hover:bg-slate-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Current Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {selectedTopic.trendPercentage}%
                  </div>
                  <div className="text-slate-300 text-sm">Tendencia Actual</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {selectedTopic.participants.toLocaleString()}
                  </div>
                  <div className="text-slate-300 text-sm">Participantes</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className={`text-2xl font-bold ${
                    selectedTopic.change > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedTopic.change > 0 ? '+' : ''}{selectedTopic.change.toFixed(1)}%
                  </div>
                  <div className="text-slate-300 text-sm">Cambio 24h</div>
                </div>
              </div>

              {/* News Section */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📰</span>
                  Noticias Relacionadas (Últimos 5 años)
                </h4>
                
                <div className="space-y-4">
                  {generateMockNews(selectedTopic.id, selectedRegion.name).map((article) => (
                    <div key={article.id} className="bg-slate-700/30 rounded-xl p-4 hover:bg-slate-700/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-white text-lg leading-tight">
                          {article.title}
                        </h5>
                      </div>
                      <p className="text-slate-300 mb-3 leading-relaxed">
                        {article.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <button className="hover:text-blue-400 transition-colors font-medium">
                            📄 {article.source}
                          </button>
                          <span>{new Date(article.date).toLocaleDateString('es-CO')}</span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Leer más →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sources Section */}
                <div className="mt-6 pt-6 border-t border-slate-600">
                  <h5 className="text-lg font-semibold text-white mb-3">
                    📚 Fuentes Disponibles
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['El Tiempo', 'El Espectador', 'Semana', 'La República', 'Portafolio'].map((source) => (
                      <button
                        key={source}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Real-time Indicator */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
          <div className="flex items-center space-x-3 mb-2 md:mb-0">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Actualización en tiempo real</span>
          </div>
          <div className="text-sm">
            Última actualización: {lastUpdate.toLocaleTimeString('es-CO')} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTendenciasRealtime;