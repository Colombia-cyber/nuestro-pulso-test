import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300';
  const hoverClasses = hoverable ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;