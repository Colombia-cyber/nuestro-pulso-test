import React from 'react';
import UniversalSearchBar from './UniversalSearchBar';

interface CentralSearchBarProps {
  onNavigate?: (view: string) => void;
}

const CentralSearchBar: React.FC<CentralSearchBarProps> = ({ onNavigate }) => {
  const handleSearch = (query: string, category: 'local' | 'world', topic?: any) => {
    // Navigate to search with parameters
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('category', category);
    if (topic) params.set('topic', topic.id);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    if (onNavigate) {
      onNavigate('search');
    }
  };

  const handleTopicSelect = (topic: any) => {
    console.log('Topic selected:', topic);
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Enhanced modern gradient background with dark mode support */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-purple-100/50 dark:from-blue-800/30 dark:via-transparent dark:to-purple-800/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 animate-pulse"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-colombia-yellow/20 to-colombia-blue/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Central heading with backdrop blur and dark mode */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl"></div>
            <div className="relative px-8 py-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-colombia-blue via-purple-600 to-colombia-red bg-clip-text text-transparent mb-4 leading-tight">
                Encuentra noticias, reels, debates y tendencias cívicas en tiempo real
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
                La plataforma más avanzada para la participación ciudadana en Colombia
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar Container */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-5xl">
            <UniversalSearchBar 
              onSearch={handleSearch}
              onTopicSelect={handleTopicSelect}
              placeholder="Buscar noticias, reels, debates, candidatos, propuestas..."
              className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"
            />
          </div>
        </div>

        {/* World-class Feature Cards with enhanced mobile support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mt-10">
          {/* Reels en Vivo Card */}
          <div 
            onClick={() => onNavigate?.('reels')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-red-200 dark:hover:border-red-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-red-300 group-hover:scale-110 transition-all duration-300">
                🎬
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors text-sm lg:text-base">Reels en Vivo</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Videos cortos y noticias visuales</p>
              <div className="mt-2 lg:mt-3 text-xs text-red-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                🔴 En Vivo
              </div>
            </div>
          </div>

          {/* Noticias Card */}
          <div 
            onClick={() => onNavigate?.('feeds')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-blue-300 group-hover:scale-110 transition-all duration-300">
                📰
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm lg:text-base">Noticias</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Últimas noticias nacionales e internacionales</p>
              <div className="mt-2 lg:mt-3 text-xs text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                ⚡ Tiempo Real
              </div>
            </div>
          </div>

          {/* Debates Card */}
          <div 
            onClick={() => onNavigate?.('debates')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-green-200 dark:hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-green-300 group-hover:scale-110 transition-all duration-300">
                💬
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-sm lg:text-base">Debates</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Participa en debates políticos y sociales</p>
              <div className="mt-2 lg:mt-3 text-xs text-green-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                🗳️ Participativo
              </div>
            </div>
          </div>

          {/* Encuestas Card */}
          <div 
            onClick={() => onNavigate?.('surveys')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-purple-200 dark:hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-purple-300 group-hover:scale-110 transition-all duration-300">
                📊
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm lg:text-base">Encuestas</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Vota y comparte tu opinión ciudadana</p>
              <div className="mt-2 lg:mt-3 text-xs text-purple-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                🔥 Trending
              </div>
            </div>
          </div>

          {/* Tendencias Card */}
          <div 
            onClick={() => onNavigate?.('tendencias')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-orange-200 dark:hover:border-orange-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-orange-300 group-hover:scale-110 transition-all duration-300">
                🔥
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-sm lg:text-base">Tendencias</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Temas más populares de Colombia</p>
              <div className="mt-2 lg:mt-3 text-xs text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                📈 Viral
              </div>
            </div>
          </div>

          {/* IA Activa Card */}
          <div 
            onClick={() => onNavigate?.('search')}
            className="group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 lg:p-6 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:shadow-2xl hover:border-emerald-200 dark:hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg group-hover:shadow-emerald-300 group-hover:scale-110 transition-all duration-300">
                🤖
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm lg:text-base">IA Activa</h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Asistente inteligente de búsqueda</p>
              <div className="mt-2 lg:mt-3 text-xs text-emerald-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                ⚡ Inteligente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralSearchBar;