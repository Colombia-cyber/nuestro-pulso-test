import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor?: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  textColor = 'text-white',
  onClick 
}) => {
  return (
    <div 
      className={`${bgColor} ${textColor} rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <div className="text-xs font-semibold opacity-80">
          Click to explore →
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90 leading-relaxed">{description}</p>
    </div>
  );
};

export default CategoryCard;