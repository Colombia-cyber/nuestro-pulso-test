import React, { useState } from 'react';
import { FaSearch, FaFire, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdAutoAwesome } from 'react-icons/md';

interface LookForSectionProps {
  onItemClick: (item: LookForItem, searchQuery: string) => void;
  className?: string;
}

interface LookForItem {
  id: string;
  title: string;
  description: string;
  searchQuery: string;
  icon: string;
  color: string;
  category: 'politics' | 'security' | 'travel' | 'global';
  trending?: boolean;
  urgency?: 'high' | 'medium' | 'normal';
}

const lookForItems: LookForItem[] = [
  {
    id: 'donald-trump-global',
    title: 'Donald Trump Global',
    description: 'Latest international news about Trump and his global influence',
    searchQuery: 'Donald Trump international news global politics',
    icon: '🌍',
    color: 'from-orange-500 to-red-600',
    category: 'politics',
    trending: true,
    urgency: 'high'
  },
  {
    id: 'global-terrorism',
    title: 'Global Terrorism',
    description: 'International terrorism news, security threats and anti-terror operations',
    searchQuery: 'global terrorism international security threats',
    icon: '🛡️',
    color: 'from-red-600 to-red-800',
    category: 'security',
    trending: true,
    urgency: 'high'
  },
  {
    id: 'world-right',
    title: 'World Right',
    description: 'Global conservative movements and right-wing political perspectives',
    searchQuery: 'world right wing conservative politics global',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-700',
    category: 'politics',
    urgency: 'medium'
  },
  {
    id: 'world-left',
    title: 'World Left',
    description: 'Global progressive movements and left-wing political perspectives',
    searchQuery: 'world left wing progressive politics global',
    icon: '🌹',
    color: 'from-pink-600 to-red-600',
    category: 'politics',
    urgency: 'medium'
  },
  {
    id: 'best-destinations',
    title: 'Best Destinations',
    description: 'Top travel destinations, tourism recommendations and travel guides',
    searchQuery: 'best travel destinations tourism recommendations',
    icon: '✈️',
    color: 'from-teal-500 to-blue-600',
    category: 'travel',
    urgency: 'normal'
  }
];

const LookForSection: React.FC<LookForSectionProps> = ({
  onItemClick,
  className = ""
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (item: LookForItem) => {
    setSelectedItem(item.id);
    onItemClick(item, item.searchQuery);

    // Reset selection after animation
    setTimeout(() => {
      setSelectedItem(null);
    }, 500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'politics': return '🏛️';
      case 'security': return '⚠️';
      case 'travel': return '🌎';
      case 'global': return '🌐';
      default: return '📰';
    }
  };

  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'high': return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>;
      case 'medium': return <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>;
      default: return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <FaSearch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Look for
            </h2>
            <p className="text-gray-600 text-lg">Quick access to trending global topics</p>
          </div>
        </div>
      </div>

      {/* Look For Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lookForItems.map((item, index) => {
          const isSelected = selectedItem === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-500 transform hover:scale-105 bg-gradient-to-br ${item.color} text-white shadow-xl hover:shadow-2xl ${
                isSelected ? 'scale-110 shadow-2xl' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {getUrgencyIndicator(item.urgency)}
                      {item.trending && (
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                          <BiTrendingUp className="w-3 h-3" />
                          <span>TRENDING</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm font-bold px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>
                
                {/* Title and Description */}
                <h3 className="text-xl font-black mb-3 tracking-tight">{item.title}</h3>
                <p className="text-white/90 mb-4 text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
                
                {/* Action Row */}
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm">
                    Click to search
                  </div>
                  
                  <div className={`transition-all duration-300 ${
                    isHovered || isSelected ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                  }`}>
                    <FaArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-white/10 transition-opacity duration-300 ${
                isHovered || isSelected ? 'opacity-100' : 'opacity-0'
              }`}></div>

              {/* Selection Animation */}
              {isSelected && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-2xl">
          <MdAutoAwesome className="text-purple-500 text-xl" />
          <span className="text-gray-700 font-semibold">
            Click any topic above to search for the latest news
          </span>
          <FaExternalLinkAlt className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default LookForSection;