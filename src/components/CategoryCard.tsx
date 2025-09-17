import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
  isPopular?: boolean;
  stats?: string;
  comingSoon?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  textColor,
  onClick,
  isPopular = false,
  stats,
  comingSoon = false
}) => {
  return (
    <div 
      className={`${bgColor} rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${title} - ${description}`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
          🔥 POPULAR
        </div>
      )}

      {/* Coming Soon badge */}
      {comingSoon && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          🚧 PRÓXIMAMENTE
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-4 text-center">
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-3 text-center ${textColor}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`text-sm mb-4 text-center ${textColor} opacity-90`}>
        {description}
      </p>

      {/* Stats */}
      {stats && (
        <div className={`text-sm font-semibold text-center ${textColor} bg-white/20 rounded-lg py-2 px-3 backdrop-blur-sm`}>
          {stats}
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </div>
  );
};

export default CategoryCard;