import React, { useState, useEffect } from 'react';
import { FaVideo, FaPlay, FaEye, FaHeart, FaShare, FaYoutube, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { ColombianLoader, SectionLoader } from './ColombianLoader';

interface Reel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook';
  source: string;
  views: number;
  likes: number;
  url: string;
  category: string;
}

const platformIcons = {
  youtube: { icon: FaYoutube, color: 'text-red-600', bg: 'bg-red-100' },
  tiktok: { icon: FaTiktok, color: 'text-black', bg: 'bg-gray-100' },
  instagram: { icon: FaInstagram, color: 'text-pink-600', bg: 'bg-pink-100' },
  facebook: { icon: FaFacebook, color: 'text-blue-600', bg: 'bg-blue-100' },
};

const categories = [
  { id: 'all', label: 'Todos', icon: '🇨🇴' },
  { id: 'politics', label: 'Política', icon: '🗳️' },
  { id: 'news', label: 'Noticias', icon: '📰' },
  { id: 'culture', label: 'Cultura', icon: '🎭' },
  { id: 'sports', label: 'Deportes', icon: '⚽' },
  { id: 'civic', label: 'Cívico', icon: '🤝' },
];

// Sample data generator
const generateSampleReels = (category: string): Reel[] => {
  const platforms: Array<'youtube' | 'tiktok' | 'instagram' | 'facebook'> = ['youtube', 'tiktok', 'instagram', 'facebook'];
  const sources = ['El Tiempo', 'Caracol TV', 'RCN', 'Semana', 'W Radio', 'Blu Radio'];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `reel-${category}-${i}`,
    title: `Reel ${category === 'all' ? 'Colombia' : category} #${i + 1}`,
    description: `Contenido importante sobre ${category} en Colombia. Mantente informado con las últimas tendencias.`,
    thumbnail: `https://picsum.photos/seed/${category}${i}/400/300`,
    platform: platforms[i % platforms.length],
    source: sources[i % sources.length],
    views: Math.floor(Math.random() * 100000) + 1000,
    likes: Math.floor(Math.random() * 10000) + 100,
    url: '#',
    category: category,
  }));
};

export const EnhancedReelsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReels(selectedCategory);
  }, [selectedCategory]);

  const loadReels = async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load reels data
      const data = generateSampleReels(category);
      setReels(data);
    } catch (err) {
      setError('No se pudieron cargar los reels. Por favor intenta de nuevo.');
      // Set fallback content
      setReels(generateSampleReels(category).slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-colombia-yellow to-colombia-blue shadow-colombia">
              <FaVideo className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-colombia-gradient">
                Reels Colombia
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <BiTrendingUp className="text-colombia-red animate-bounce-subtle" />
                Los videos más populares de Colombia
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red text-white shadow-lg'
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

        {/* Error Message */}
        {error && (
          <div className="mb-8 glass-card p-4 border-l-4 border-colombia-red animate-fade-in">
            <p className="text-colombia-red font-semibold">⚠️ {error}</p>
            <p className="text-sm text-gray-600 mt-1">Mostrando contenido alternativo...</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <SectionLoader title="Cargando Reels..." count={6} />
        ) : (
          /* Reels Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {reels.map((reel, index) => {
              const platformInfo = platformIcons[reel.platform];
              const PlatformIcon = platformInfo.icon;

              return (
                <div
                  key={reel.id}
                  className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300 card-3d"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="w-6 h-6 text-colombia-blue ml-1" />
                      </div>
                    </div>

                    {/* Platform Badge */}
                    <div className={`absolute top-3 right-3 ${platformInfo.bg} rounded-full p-2 shadow-lg`}>
                      <PlatformIcon className={`w-5 h-5 ${platformInfo.color}`} />
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <FaEye />
                          <span>{formatNumber(reel.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaHeart />
                          <span>{formatNumber(reel.likes)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-semibold">{reel.source}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs">{reel.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-colombia-blue transition-colors">
                      {reel.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {reel.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-colombia-blue to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Ver Ahora
                      </button>
                      <button className="p-2 glass-card hover:bg-gray-100 rounded-lg transition-colors">
                        <FaShare className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && reels.length === 0 && (
          <div className="text-center py-16 glass-card">
            <FaVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay reels disponibles
            </h3>
            <p className="text-gray-600">
              No se encontraron reels para esta categoría. Intenta con otra categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
