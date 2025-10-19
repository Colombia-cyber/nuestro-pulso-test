import React, { useState, useEffect } from 'react';
import { FaFire, FaArrowUp, FaHashtag, FaEye, FaShare } from 'react-icons/fa';
import { BiTrendingUp, BiHash } from 'react-icons/bi';
import { MdWhatshot } from 'react-icons/md';
import { ColombianLoader, SectionLoader } from './ColombianLoader';

interface Tendency {
  id: string;
  hashtag: string;
  title: string;
  description: string;
  mentions: number;
  growth: number;
  category: string;
  imageUrl?: string;
  topPost?: string;
}

const tendencyCategories = [
  { id: 'all', label: 'Todo', icon: '🔥' },
  { id: 'politics', label: 'Política', icon: '🗳️' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'sports', label: 'Deportes', icon: '⚽' },
  { id: 'entertainment', label: 'Entretenimiento', icon: '🎬' },
  { id: 'technology', label: 'Tecnología', icon: '💻' },
];

const generateTendencies = (category: string): Tendency[] => {
  const hashtags = [
    'ColombiaUnida', 'PaísDelFuturo', 'VocesColombianas', 
    'CambioPositivo', 'InnovaciónCO', 'JusticiaYa',
    'EducaciónPública', 'SaludParaTodos', 'PazDuradera',
    'TecnologíaCO', 'CulturaViva', 'DeporteColombia'
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: `tendency-${category}-${i}`,
    hashtag: `#${hashtags[i % hashtags.length]}${i > 0 ? i : ''}`,
    title: `Tendencia ${category} ${i + 1}: Tema importante en Colombia`,
    description: `Miles de colombianos están hablando sobre este tema crucial para el futuro del país.`,
    mentions: Math.floor(Math.random() * 100000) + 5000,
    growth: Math.floor(Math.random() * 200) + 10,
    category: category,
    imageUrl: `https://picsum.photos/seed/tendency${category}${i}/300/200`,
    topPost: `Este es el post más compartido sobre ${hashtags[i % hashtags.length]}...`,
  }));
};

export const EnhancedTendenciesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tendencies, setTendencies] = useState<Tendency[]>(generateTendencies('all'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sort by mentions
    const sorted = [...tendencies].sort((a, b) => b.mentions - a.mentions);
    setTendencies(sorted);
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    
    setTimeout(() => {
      const newTendencies = generateTendencies(categoryId);
      setTendencies(newTendencies.sort((a, b) => b.mentions - a.mentions));
      setLoading(false);
    }, 300);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRankColor = (index: number): string => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 shadow-colombia">
              <MdWhatshot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-colombia-gradient">
                Tendencias Colombia
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <BiTrendingUp className="text-orange-600 animate-bounce-subtle" />
                Lo más hablado en este momento
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {tendencyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'glass-card hover:shadow-md'
                  }
                `}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Tendencies - Featured */}
        {!loading && tendencies.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaFire className="text-orange-500 animate-pulse" />
              Top 3 Tendencias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tendencies.slice(0, 3).map((tendency, index) => (
                <div
                  key={tendency.id}
                  className="glass-card p-6 hover:shadow-floating transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getRankColor(index)} text-white font-bold text-lg shadow-lg`}>
                      #{index + 1}
                    </div>
                    <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                      <FaArrowUp />
                      +{tendency.growth}%
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-colombia-blue mb-2">
                      {tendency.hashtag}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {tendency.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <BiHash className="text-orange-600" />
                      <span className="font-semibold">{formatNumber(tendency.mentions)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye />
                      <span>{formatNumber(tendency.mentions * 3)}</span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Explorar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Tendencies Grid */}
        {loading ? (
          <SectionLoader title="Cargando Tendencias..." count={6} />
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BiTrendingUp className="text-colombia-blue" />
              Todas las Tendencias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {tendencies.slice(3).map((tendency, index) => (
                <div
                  key={tendency.id}
                  className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  {tendency.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={tendency.imageUrl}
                        alt={tendency.hashtag}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                        #{index + 4}
                      </div>
                      <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FaArrowUp />
                        +{tendency.growth}%
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="text-xl font-bold text-colombia-blue mb-2 group-hover:text-orange-600 transition-colors">
                      {tendency.hashtag}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {tendency.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        <BiHash className="text-orange-600" />
                        <span className="font-semibold">{formatNumber(tendency.mentions)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye />
                        <span>{formatNumber(tendency.mentions * 3)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Ver Más
                      </button>
                      <button className="p-2 glass-card hover:bg-gray-100 rounded-lg transition-colors">
                        <FaShare className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
