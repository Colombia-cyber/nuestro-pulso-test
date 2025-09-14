import React, { useState } from 'react';
import { Poll, PollFilter } from '../../types/polls';
import PollCard from './PollCard';

interface PollsGridProps {
  polls: Poll[];
  onVote?: (pollId: string, optionId: string) => void;
  onViewDetails?: (pollId: string) => void;
  showFilters?: boolean;
  title?: string;
  emptyStateMessage?: string;
}

const PollsGrid: React.FC<PollsGridProps> = ({
  polls,
  onVote,
  onViewDetails,
  showFilters = true,
  title = 'Todas las Encuestas',
  emptyStateMessage = 'No hay encuestas disponibles en este momento.'
}) => {
  const [filter, setFilter] = useState<PollFilter>({
    isActive: true,
    sortBy: 'newest'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort polls
  const filteredPolls = polls
    .filter(poll => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          poll.title.toLowerCase().includes(searchLower) ||
          poll.description.toLowerCase().includes(searchLower) ||
          poll.question.toLowerCase().includes(searchLower) ||
          poll.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filter.category && poll.category !== filter.category) return false;
      
      // Region filter
      if (filter.region && poll.region !== filter.region) return false;
      
      // Active status filter
      if (filter.isActive !== undefined && poll.isActive !== filter.isActive) return false;
      
      // Trending filter
      if (filter.isTrending !== undefined && poll.isTrending !== filter.isTrending) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (filter.sortBy) {
        case 'trending':
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.totalVotes - a.totalVotes;
        case 'mostVoted':
          return b.totalVotes - a.totalVotes;
        case 'endingSoon':
          return a.endsAt.getTime() - b.endsAt.getTime();
        case 'newest':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const categories: Array<{ value: Poll['category']; label: string; icon: string }> = [
    { value: 'politica', label: 'Política', icon: '🏛️' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'economia', label: 'Economía', icon: '💰' },
    { value: 'seguridad', label: 'Seguridad', icon: '🛡️' },
    { value: 'educacion', label: 'Educación', icon: '📚' },
    { value: 'salud', label: 'Salud', icon: '🏥' }
  ];

  const regions = [
    { value: 'nacional', label: 'Nacional', icon: '🇨🇴' },
    { value: 'bogota', label: 'Bogotá', icon: '🏙️' },
    { value: 'medellin', label: 'Medellín', icon: '🌄' },
    { value: 'cali', label: 'Cali', icon: '🌴' },
    { value: 'barranquilla', label: 'Barranquilla', icon: '🏖️' },
    { value: 'cartagena', label: 'Cartagena', icon: '🏰' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'trending', label: 'Trending' },
    { value: 'mostVoted', label: 'Más votadas' },
    { value: 'endingSoon', label: 'Próximas a cerrar' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {filteredPolls.length} de {polls.length} encuestas
          </p>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Buscar encuestas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter(prev => ({ ...prev, category: undefined }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !filter.category
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todas las categorías
              </button>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(prev => ({ 
                    ...prev, 
                    category: prev.category === category.value ? undefined : category.value 
                  }))}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    filter.category === category.value
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort */}
            <select
              value={filter.sortBy || 'newest'}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as PollFilter['sortBy'] }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Region filter */}
            <select
              value={filter.region || ''}
              onChange={(e) => setFilter(prev => ({ 
                ...prev, 
                region: e.target.value as Poll['region'] || undefined 
              }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las regiones</option>
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.icon} {region.label}
                </option>
              ))}
            </select>

            {/* Toggle filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter(prev => ({ 
                  ...prev, 
                  isTrending: prev.isTrending ? undefined : true 
                }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter.isTrending
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🔥 Solo trending
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polls Grid */}
      {filteredPolls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {emptyStateMessage}
          </h3>
          <p className="text-gray-500 mb-6">
            Prueba ajustando los filtros o revisa más tarde.
          </p>
          <button
            onClick={() => {
              setFilter({ isActive: true, sortBy: 'newest' });
              setSearchTerm('');
            }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onVote={onVote}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PollsGrid;