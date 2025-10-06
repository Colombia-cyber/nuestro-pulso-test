import React, { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown, FaSearch, FaCalendarAlt, FaGlobe, FaTags, FaEye } from 'react-icons/fa';
import { MdViewModule, MdViewList, MdTimeline, MdCategory } from 'react-icons/md';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface ModernFilterSystemProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'moderno' | 'feed' | 'timeline' | 'categorias';
  onViewModeChange: (mode: 'moderno' | 'feed' | 'timeline' | 'categorias') => void;
  showFilters: boolean;
  onShowFiltersChange: (show: boolean) => void;
  filters: {
    timeRange: string;
    perspective: string;
    category?: string;
    source?: string;
    platform?: string;
    language?: string;
    isLive?: boolean;
    isTrending?: boolean;
    isVerified?: boolean;
  };
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilters: () => void;
  availableFilters?: {
    timeRanges?: FilterOption[];
    perspectives?: FilterOption[];
    categories?: FilterOption[];
    sources?: FilterOption[];
    platforms?: FilterOption[];
    languages?: FilterOption[];
  };
  type?: 'news' | 'video' | 'reel';
}

const ModernFilterSystem: React.FC<ModernFilterSystemProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onShowFiltersChange,
  filters,
  onFilterChange,
  onClearFilters,
  availableFilters = {},
  type = 'news'
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<string>('general');

  const defaultTimeRanges = [
    { id: 'all', label: 'Todos los períodos' },
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Esta semana' },
    { id: 'month', label: 'Este mes' },
    { id: 'year', label: 'Este año' }
  ];

  const defaultPerspectives = [
    { id: 'both', label: 'Todas las perspectivas' },
    { id: 'progressive', label: 'Progresistas', color: 'blue' },
    { id: 'conservative', label: 'Conservadoras', color: 'red' },
    { id: 'balanced', label: 'Balanceadas', color: 'green' }
  ];

  const defaultCategories = [
    { id: 'all', label: '🌟 Todas las categorías' },
    { id: 'politica', label: '🏛️ Política', count: 47 },
    { id: 'economia', label: '📈 Economía', count: 32 },
    { id: 'seguridad', label: '🚨 Seguridad', count: 28 },
    { id: 'ambiente', label: '🌱 Ambiente', count: 19 },
    { id: 'educacion', label: '📚 Educación', count: 24 },
    { id: 'salud', label: '🏥 Salud', count: 16 },
    { id: 'tecnologia', label: '💻 Tecnología', count: 21 },
    { id: 'internacional', label: '🌍 Internacional', count: 15 }
  ];

  const defaultPlatforms = [
    { id: 'all', label: '🌐 Todas las plataformas' },
    { id: 'youtube', label: '📺 YouTube', color: 'red' },
    { id: 'tiktok', label: '🎵 TikTok', color: 'black' },
    { id: 'instagram', label: '📷 Instagram', color: 'pink' },
    { id: 'facebook', label: '👥 Facebook', color: 'blue' },
    { id: 'x-twitter', label: '🐦 X (Twitter)', color: 'slate' }
  ];

  const defaultSources = [
    { id: '', label: 'Todas las fuentes' },
    { id: 'el-tiempo', label: '📰 El Tiempo' },
    { id: 'semana', label: '📌 Semana' },
    { id: 'el-espectador', label: '📊 El Espectador' },
    { id: 'portafolio', label: '💼 Portafolio' },
    { id: 'la-republica', label: '🏛️ La República' },
    { id: 'rcn-radio', label: '📻 RCN Radio' }
  ];

  const defaultLanguages = [
    { id: '', label: 'Todos los idiomas' },
    { id: 'es', label: '🇪🇸 Español' },
    { id: 'en', label: '🇺🇸 Inglés' },
    { id: 'pt', label: '🇧🇷 Portugués' }
  ];

  const getViewModeIcon = (mode: string) => {
    switch (mode) {
      case 'moderno': return <MdViewModule className="w-4 h-4" />;
      case 'feed': return <FaEye className="w-4 h-4" />;
      case 'timeline': return <MdTimeline className="w-4 h-4" />;
      case 'categorias': return <MdCategory className="w-4 h-4" />;
      default: return <MdViewList className="w-4 h-4" />;
    }
  };

  const getActiveFilterCount = (): number => {
    let count = 0;
    if (filters.timeRange && filters.timeRange !== 'all') count++;
    if (filters.perspective && filters.perspective !== 'both') count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.source) count++;
    if (filters.platform && filters.platform !== 'all') count++;
    if (filters.language && filters.language !== '') count++;
    if (filters.isLive) count++;
    if (filters.isTrending) count++;
    if (filters.isVerified) count++;
    return count;
  };

  const FilterChip: React.FC<{ label: string; isActive: boolean; onRemove?: () => void; color?: string }> = ({ 
    label, 
    isActive, 
    onRemove,
    color = 'blue'
  }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
      isActive 
        ? `bg-${color}-600 text-white shadow-md` 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}>
      <span>{label}</span>
      {isActive && onRemove && (
        <button onClick={onRemove} className="ml-1 hover:bg-white/20 rounded-full p-0.5">
          <FaTimes className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-colombia flex items-center gap-3">
                {type === 'video' && '🎬 Videos'}
                {type === 'reel' && '📱 Reels'}
                {type === 'news' && '📰 Noticias'}
                {!['video', 'reel', 'news'].includes(type) && '📰 Contenido'}
              </h1>
              <p className="text-gray-600 mt-1">
                {type === 'video' && 'Hub de videos verificados con IA'}
                {type === 'reel' && 'Contenido audiovisual en tiempo real'}
                {type === 'news' && 'Información actualizada con perspectivas balanceadas'}
                {!['video', 'reel', 'news'].includes(type) && 'Contenido actualizado'}
              </p>
            </div>

            {/* Live Stats */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="glass rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-red-600">EN VIVO</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaEye className="w-3 h-3" />
                  <span>1,247 usuarios activos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={`Buscar ${type === 'video' ? 'videos' : type === 'reel' ? 'reels' : 'noticias'}, temas, fuentes...`}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-colombia-blue focus:border-transparent placeholder-gray-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-1">
              {[
                { id: 'moderno', label: 'Moderno' },
                { id: 'feed', label: 'Feed' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'categorias', label: 'Categorías' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onViewModeChange(mode.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === mode.id
                      ? 'bg-colombia-blue text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  {getViewModeIcon(mode.id)}
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Filters Button */}
            <button
              onClick={() => onShowFiltersChange(!showFilters)}
              className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 relative ${
                showFilters
                  ? 'bg-colombia-blue text-white border-colombia-blue'
                  : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              <FaFilter className="w-3 h-3" />
              Filtros
              <FaChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {filters.timeRange && filters.timeRange !== 'all' && (
                <FilterChip 
                  label={defaultTimeRanges.find(t => t.id === filters.timeRange)?.label || filters.timeRange}
                  isActive={true}
                  onRemove={() => onFilterChange('timeRange', 'all')}
                  color="purple"
                />
              )}
              {filters.perspective && filters.perspective !== 'both' && (
                <FilterChip 
                  label={defaultPerspectives.find(p => p.id === filters.perspective)?.label || filters.perspective}
                  isActive={true}
                  onRemove={() => onFilterChange('perspective', 'both')}
                  color={defaultPerspectives.find(p => p.id === filters.perspective)?.color || 'blue'}
                />
              )}
              {filters.category && filters.category !== 'all' && (
                <FilterChip 
                  label={defaultCategories.find(c => c.id === filters.category)?.label || filters.category}
                  isActive={true}
                  onRemove={() => onFilterChange('category', 'all')}
                  color="indigo"
                />
              )}
              {filters.isLive && (
                <FilterChip 
                  label="🔴 En Vivo"
                  isActive={true}
                  onRemove={() => onFilterChange('isLive', false)}
                  color="red"
                />
              )}
              {filters.isTrending && (
                <FilterChip 
                  label="🔥 Trending"
                  isActive={true}
                  onRemove={() => onFilterChange('isTrending', false)}
                  color="orange"
                />
              )}
              {filters.isVerified && (
                <FilterChip 
                  label="✅ Verificado"
                  isActive={true}
                  onRemove={() => onFilterChange('isVerified', false)}
                  color="green"
                />
              )}
              <button
                onClick={onClearFilters}
                className="text-sm text-red-600 hover:text-red-800 transition-colors ml-2"
              >
                Limpiar todos
              </button>
            </div>
          )}

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200">
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {[
                  { id: 'general', label: 'General', icon: FaCalendarAlt },
                  { id: 'content', label: 'Contenido', icon: FaTags },
                  { id: 'source', label: 'Fuente', icon: FaGlobe },
                  ...(type !== 'news' ? [{ id: 'platform', label: 'Plataforma', icon: MdViewModule }] : [])
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilterTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeFilterTab === tab.id
                        ? 'bg-colombia-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filter Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeFilterTab === 'general' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="inline w-4 h-4 mr-2" />
                        Período de tiempo
                      </label>
                      <select
                        value={filters.timeRange}
                        onChange={(e) => onFilterChange('timeRange', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                      >
                        {(availableFilters.timeRanges || defaultTimeRanges).map(option => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaGlobe className="inline w-4 h-4 mr-2" />
                        Perspectiva política
                      </label>
                      <select
                        value={filters.perspective}
                        onChange={(e) => onFilterChange('perspective', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                      >
                        {(availableFilters.perspectives || defaultPerspectives).map(option => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtros especiales
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isLive || false}
                            onChange={(e) => onFilterChange('isLive', e.target.checked)}
                            className="mr-2 w-4 h-4 text-colombia-blue focus:ring-colombia-blue border-gray-300 rounded"
                          />
                          <span className="text-sm">🔴 Solo contenido en vivo</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isTrending || false}
                            onChange={(e) => onFilterChange('isTrending', e.target.checked)}
                            className="mr-2 w-4 h-4 text-colombia-blue focus:ring-colombia-blue border-gray-300 rounded"
                          />
                          <span className="text-sm">🔥 Solo contenido trending</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isVerified || false}
                            onChange={(e) => onFilterChange('isVerified', e.target.checked)}
                            className="mr-2 w-4 h-4 text-colombia-blue focus:ring-colombia-blue border-gray-300 rounded"
                          />
                          <span className="text-sm">✅ Solo contenido verificado</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {activeFilterTab === 'content' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaTags className="inline w-4 h-4 mr-2" />
                        Categoría
                      </label>
                      <select
                        value={filters.category || 'all'}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                      >
                        {(availableFilters.categories || defaultCategories).map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label} {option.count ? `(${option.count})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {type !== 'news' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Idioma
                        </label>
                        <select
                          value={filters.language || ''}
                          onChange={(e) => onFilterChange('language', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                        >
                          {(availableFilters.languages || defaultLanguages).map(option => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {activeFilterTab === 'source' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaGlobe className="inline w-4 h-4 mr-2" />
                      Fuente de noticias
                    </label>
                    <select
                      value={filters.source || ''}
                      onChange={(e) => onFilterChange('source', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      {(availableFilters.sources || defaultSources).map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {activeFilterTab === 'platform' && type !== 'news' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MdViewModule className="inline w-4 h-4 mr-2" />
                      Plataforma
                    </label>
                    <select
                      value={filters.platform || 'all'}
                      onChange={(e) => onFilterChange('platform', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue focus:border-transparent"
                    >
                      {(availableFilters.platforms || defaultPlatforms).map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  {getActiveFilterCount()} filtro{getActiveFilterCount() !== 1 ? 's' : ''} activo{getActiveFilterCount() !== 1 ? 's' : ''}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={onClearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                  <button
                    onClick={() => onShowFiltersChange(false)}
                    className="px-4 py-2 bg-colombia-blue text-white text-sm rounded-lg hover:bg-colombia-blue-dark transition-colors"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernFilterSystem;