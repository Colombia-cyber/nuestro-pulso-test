import React, { useState, useEffect } from 'react';
import { getTrendingPolls } from '../data/samplePolls';
import PollCard from './polls/PollCard';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [trendingPolls, setTrendingPolls] = useState(getTrendingPolls().slice(0, 3));

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In a real app, this would make an API call
  };

  const handleViewDetails = (pollId: string) => {
    console.log(`View details for poll ${pollId}`);
    onNavigate('surveys');
  };

  const majorTopics = [
    { id: 'petro', name: 'Petro', icon: '👨‍💼', color: 'from-green-500 to-blue-600', category: 'politica' },
    { id: 'trump', name: 'Trump', icon: '🇺🇸', color: 'from-red-500 to-orange-600', category: 'internacional' },
    { id: 'crime', name: 'Crimen', icon: '⚖️', color: 'from-red-500 to-pink-600', category: 'seguridad' },
    { id: 'employment', name: 'Empleo', icon: '💼', color: 'from-purple-500 to-indigo-600', category: 'economia' },
    { id: 'terror', name: 'Terror', icon: '🚨', color: 'from-red-600 to-red-800', category: 'seguridad' },
    { id: 'right-wing', name: 'Derecha', icon: '🔴', color: 'from-red-400 to-orange-500', category: 'politica' },
    { id: 'left-wing', name: 'Izquierda', icon: '🔵', color: 'from-blue-400 to-indigo-500', category: 'politica' },
    { id: 'legislation', name: 'Legislación', icon: '📜', color: 'from-gray-500 to-gray-700', category: 'politica' },
    { id: 'congress', name: 'Congreso', icon: '🏛️', color: 'from-yellow-500 to-amber-600', category: 'politica' },
    { id: 'healthcare', name: 'Salud', icon: '🏥', color: 'from-teal-500 to-cyan-600', category: 'salud' },
    { id: 'education', name: 'Educación', icon: '📚', color: 'from-indigo-500 to-purple-600', category: 'educacion' },
    { id: 'environment', name: 'Ambiente', icon: '🌱', color: 'from-green-400 to-emerald-600', category: 'ambiente' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            {/* Colombian Flag Colors Accent */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🇨🇴 Nuestro Pulso
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
              Red Cívica de Colombia - Tu Voz Cuenta
            </p>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
              para construir el futuro de Colombia juntos.
            </p>
            
            {/* Real-time Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span>15.2K usuarios activos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>89 encuestas activas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗣️</span>
                <span>24 debates en curso</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={() => onNavigate('reels')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              🎬 Pulse Reels
            </button>
            <button 
              onClick={() => onNavigate('chat')}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              💬 Chat en Vivo
            </button>
            <button 
              onClick={() => onNavigate('debates')}
              className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              🗣️ Debates
            </button>
            <button 
              onClick={() => onNavigate('surveys')}
              className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              📊 Encuestas
            </button>
          </div>
        </div>

        {/* Major Topics Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🔥 Temas Principales</h2>
            <p className="text-gray-600">Explora los temas más relevantes de la actualidad colombiana</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {majorTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => onNavigate(topic.id)}
                  className={`bg-gradient-to-br ${topic.color} rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 group`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm">{topic.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trending Polls Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
                <span className="text-white text-xl">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Encuestas Trending</h2>
                <p className="text-gray-600 text-sm">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('surveys')}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
            >
              Ver todas →
            </button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trendingPolls.map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onVote={handleVote}
                  onViewDetails={handleViewDetails}
                  compact={true}
                />
              ))}
            </div>
          )}
          
          {!isLoading && trendingPolls.length === 0 && (
            <div className="text-center py-8 bg-white/50 rounded-lg border border-gray-200">
              <span className="text-4xl mb-2 block">📊</span>
              <p className="text-gray-600">No hay encuestas trending en este momento</p>
            </div>
          )}
        </div>

        {/* Balanced News Preview */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">📰 Perspectivas Balanceadas</h2>
            <p className="text-gray-600">Obtén una visión completa con múltiples perspectivas</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              onClick={() => onNavigate('feeds')}
              className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-4">🔵</div>
                <h3 className="text-xl font-bold mb-2">Perspectiva Progresista</h3>
                <p className="text-blue-100">Noticias y análisis desde una visión progresista</p>
              </div>
            </div>
            
            <div 
              onClick={() => onNavigate('feeds')}
              className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg p-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-4">🔴</div>
                <h3 className="text-xl font-bold mb-2">Perspectiva Conservadora</h3>
                <p className="text-red-100">Noticias y análisis desde una visión conservadora</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            onClick={() => onNavigate('congress')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Congreso</h3>
            <p className="text-gray-600">Actividad legislativa en tiempo real</p>
          </div>
          
          <div 
            onClick={() => onNavigate('elections')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📈</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Elecciones</h3>
            <p className="text-gray-600">Centro de información electoral</p>
          </div>
          
          <div 
            onClick={() => onNavigate('community-hub')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">💭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
            <p className="text-gray-600">Conecta con otros ciudadanos</p>
          </div>
          
          <div 
            onClick={() => onNavigate('search')}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Buscar</h3>
            <p className="text-gray-600">Explora todo el contenido</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;