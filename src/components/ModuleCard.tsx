import React from 'react';

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  isLarge?: boolean;
  gradient?: string;
  textColor?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  icon,
  title,
  description,
  onClick,
  isLarge = false,
  gradient = "from-blue-500 to-purple-600",
  textColor = "text-white"
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br ${gradient}
        rounded-xl shadow-lg cursor-pointer
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25
        active:scale-95
        ${isLarge ? 'p-8' : 'p-6'}
        ${textColor}
        group
      `}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${isLarge ? 'text-6xl mb-4' : 'text-4xl mb-3'} group-hover:animate-bounce`}>
          {icon}
        </div>
        <h3 className={`font-bold mb-2 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          {title}
        </h3>
        <p className={`opacity-90 ${isLarge ? 'text-base' : 'text-sm'} leading-relaxed`}>
          {description}
        </p>
        <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;