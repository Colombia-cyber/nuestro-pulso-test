import React, { useState, useEffect, useRef } from 'react';

interface TrendPoint {
  id: string;
  lat: number;
  lng: number;
  topic: string;
  intensity: number;
  color: string;
  label: string;
  participants: number;
}

interface RegionalData {
  region: string;
  topics: { topic: string; score: number; change: number }[];
  totalActivity: number;
}

const AnimatedGlobalTrendMap: React.FC = () => {
  const [trendPoints, setTrendPoints] = useState<TrendPoint[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Colombian regions with approximate coordinates
  const colombianRegions = [
    { name: 'Bogotá', lat: 4.7110, lng: -74.0721, population: 7181469 },
    { name: 'Medellín', lat: 6.2442, lng: -75.5812, population: 2372330 },
    { name: 'Cali', lat: 3.4516, lng: -76.5320, population: 2172527 },
    { name: 'Barranquilla', lat: 10.9639, lng: -74.7964, population: 1232766 },
    { name: 'Cartagena', lat: 10.3932, lng: -75.4794, population: 876885 },
    { name: 'Cúcuta', lat: 7.8939, lng: -72.5078, population: 650011 },
    { name: 'Bucaramanga', lat: 7.1253, lng: -73.1198, population: 581130 },
    { name: 'Pereira', lat: 4.8133, lng: -75.6961, population: 488839 },
    { name: 'Santa Marta', lat: 11.2408, lng: -74.2002, population: 414387 },
    { name: 'Ibagué', lat: 4.4389, lng: -75.2322, population: 529635 }
  ];

  const topics = [
    'gustavo-petro',
    'congress',
    'drugs-crime',
    'political-left',
    'political-right',
    'trump-local'
  ];

  const topicColors = {
    'gustavo-petro': '#FF6B6B',
    'congress': '#4ECDC4',
    'drugs-crime': '#FF8E53',
    'political-left': '#E74C3C',
    'political-right': '#3498DB',
    'trump-local': '#9B59B6'
  };

  // Generate realistic trend data
  useEffect(() => {
    const generateTrendData = () => {
      const points: TrendPoint[] = [];
      const regionalStats: RegionalData[] = [];

      colombianRegions.forEach(region => {
        const topicScores: { topic: string; score: number; change: number }[] = [];
        let totalActivity = 0;

        topics.forEach(topic => {
          // Simulate realistic activity based on region size and topic relevance
          const baseActivity = Math.log(region.population) * 100;
          const topicMultiplier = getTopicRelevanceForRegion(topic, region.name);
          const timeVariation = Math.sin(Date.now() / 10000 + Math.random()) * 0.3 + 0.7;
          
          const intensity = Math.max(0.1, Math.min(1, 
            (baseActivity * topicMultiplier * timeVariation) / 1000
          ));

          const participants = Math.floor(intensity * region.population * 0.01);
          const score = Math.floor(intensity * 100);
          const change = (Math.random() - 0.5) * 20;

          totalActivity += participants;
          topicScores.push({ topic, score, change });

          // Add trend point for visualization
          points.push({
            id: `${region.name}-${topic}`,
            lat: region.lat + (Math.random() - 0.5) * 0.1,
            lng: region.lng + (Math.random() - 0.5) * 0.1,
            topic,
            intensity,
            color: topicColors[topic as keyof typeof topicColors] || '#95A5A6',
            label: `${region.name}: ${topic.replace('-', ' ')}`,
            participants
          });
        });

        regionalStats.push({
          region: region.name,
          topics: topicScores.sort((a, b) => b.score - a.score),
          totalActivity
        });
      });

      setTrendPoints(points);
      setRegionalData(regionalStats.sort((a, b) => b.totalActivity - a.totalActivity));
    };

    generateTrendData();
    const interval = setInterval(generateTrendData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Animation loop for pulsing effects
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  const getTopicRelevanceForRegion = (topic: string, region: string): number => {
    // Simulate regional topic relevance
    const relevanceMap: Record<string, Record<string, number>> = {
      'Bogotá': { 'gustavo-petro': 1.5, 'congress': 2.0, 'political-left': 1.3 },
      'Medellín': { 'drugs-crime': 1.8, 'political-right': 1.2 },
      'Cali': { 'gustavo-petro': 1.4, 'political-left': 1.6 },
      'Barranquilla': { 'trump-local': 1.3, 'political-right': 1.1 },
      'Cartagena': { 'congress': 1.2, 'drugs-crime': 1.4 }
    };

    return relevanceMap[region]?.[topic] || 1.0;
  };

  const getPointStyle = (point: TrendPoint) => {
    const pulse = Math.sin(animationPhase * 0.1 + point.lat + point.lng) * 0.3 + 0.7;
    const size = Math.max(8, point.intensity * 30 * pulse);
    
    return {
      position: 'absolute' as const,
      left: `${50 + (point.lng + 75) * 8}%`,
      top: `${50 - (point.lat - 5) * 12}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: point.color,
      borderRadius: '50%',
      opacity: point.intensity * 0.8 + 0.2,
      boxShadow: `0 0 ${size/2}px ${point.color}`,
      transform: `scale(${pulse})`,
      transition: 'all 0.5s ease',
      cursor: 'pointer',
      zIndex: Math.floor(point.intensity * 10)
    };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            🌍 Mapa Global de Tendencias en Tiempo Real
          </h2>
          <p className="text-slate-400">
            Visualización en vivo de la actividad cívica en Colombia
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-400">
            {regionalData.reduce((sum, region) => sum + region.totalActivity, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Ciudadanos activos</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div 
            ref={mapRef}
            className="relative bg-slate-800 rounded-lg overflow-hidden"
            style={{ aspectRatio: '16/10', minHeight: '400px' }}
          >
            {/* Colombia outline (simplified) */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 800 500"
              style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
            >
              <path
                d="M200 100 L600 100 L650 200 L600 400 L200 400 L150 300 L200 200 Z"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                opacity="0.6"
              />
              <text x="400" y="250" textAnchor="middle" fill="#94A3B8" fontSize="24" fontWeight="bold">
                COLOMBIA
              </text>
            </svg>

            {/* Trend Points */}
            {trendPoints.map(point => (
              <div
                key={point.id}
                style={getPointStyle(point)}
                className="hover:scale-125 transition-transform"
                title={`${point.label}: ${point.participants.toLocaleString()} participantes`}
                onClick={() => setSelectedRegion(point.label)}
              />
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur rounded-lg p-3">
              <div className="text-white text-sm font-semibold mb-2">Temas:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(topicColors).map(([topic, color]) => (
                  <div key={topic} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-slate-300 capitalize">
                      {topic.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">
            🏛️ Actividad por Región
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {regionalData.map((region, index) => (
              <div 
                key={region.region}
                className={`bg-slate-800 rounded-lg p-4 cursor-pointer transition-all hover:bg-slate-700 ${
                  selectedRegion?.includes(region.region) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedRegion(region.region)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-white">{region.region}</h4>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">
                      {region.totalActivity.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">participantes</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {region.topics.slice(0, 3).map(topicStat => (
                    <div key={topicStat.topic} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: topicColors[topicStat.topic as keyof typeof topicColors] 
                          }}
                        />
                        <span className="text-sm text-slate-300 capitalize">
                          {topicStat.topic.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">
                          {topicStat.score}%
                        </span>
                        <span className={`text-xs ${
                          topicStat.change > 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {topicStat.change > 0 ? '+' : ''}{topicStat.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Updates Indicator */}
      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>Actualización en tiempo real</span>
        </div>
        <div>
          Última actualización: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #334155;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #64748B;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </div>
  );
};

export default AnimatedGlobalTrendMap;