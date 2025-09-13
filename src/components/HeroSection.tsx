import React, { useState, useEffect } from "react";
import { FiPlay, FiUsers, FiTrendingUp, FiActivity } from "react-icons/fi";

const HeroSection: React.FC = () => {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    totalVotes: 45823,
    debates: 234,
    news: 1567
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 10),
        debates: prev.debates + Math.floor(Math.random() * 2),
        news: prev.news + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-colombia-gradient"></div>
      
      {/* Animated Colombian flag overlay */}
      <div className="absolute top-20 right-10 w-32 h-24 bg-colombia-flag flag-wave opacity-20 rounded-lg"></div>
      <div className="absolute bottom-20 left-10 w-24 h-18 bg-colombia-flag flag-wave opacity-15 rounded-lg"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            🇨🇴 <span className="gradient-text bg-gradient-to-r from-white to-colombia-yellow bg-clip-text text-transparent">Nuestro Pulso</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-2">
            Red Cívica de Colombia - Tu Voz Cuenta
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo para construir el futuro de Colombia juntos.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="glass-card px-8 py-4 rounded-full font-bold text-colombia-blue hover-lift flex items-center justify-center space-x-2">
            <FiPlay className="w-5 h-5" />
            <span>Comenzar Tour</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover-lift flex items-center justify-center space-x-2">
            <FiUsers className="w-5 h-5" />
            <span>Unirse a la Comunidad</span>
          </button>
        </div>

        {/* Real-time metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass text-center p-4 rounded-2xl">
            <div className="flex items-center justify-center mb-2">
              <FiActivity className="w-6 h-6 text-colombia-yellow mr-2" />
              <span className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</span>
            </div>
            <p className="text-white/80 text-sm">Usuarios Activos</p>
          </div>
          
          <div className="glass text-center p-4 rounded-2xl">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">📊</span>
              <span className="text-2xl font-bold text-white">{stats.totalVotes.toLocaleString()}</span>
            </div>
            <p className="text-white/80 text-sm">Votos Totales</p>
          </div>
          
          <div className="glass text-center p-4 rounded-2xl">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">🗣️</span>
              <span className="text-2xl font-bold text-white">{stats.debates}</span>
            </div>
            <p className="text-white/80 text-sm">Debates Activos</p>
          </div>
          
          <div className="glass text-center p-4 rounded-2xl">
            <div className="flex items-center justify-center mb-2">
              <FiTrendingUp className="w-6 h-6 text-colombia-yellow mr-2" />
              <span className="text-2xl font-bold text-white">{stats.news}</span>
            </div>
            <p className="text-white/80 text-sm">Noticias Hoy</p>
          </div>
        </div>

        {/* Quick access buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover-lift flex items-center space-x-2">
            <span>💬</span>
            <span>Chat en Vivo</span>
          </button>
          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover-lift flex items-center space-x-2">
            <span>🗣️</span>
            <span>Debates</span>
          </button>
          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover-lift flex items-center space-x-2">
            <span>📊</span>
            <span>Encuestas</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;