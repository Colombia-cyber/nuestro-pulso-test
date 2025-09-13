import React from 'react';
import { FiClock, FiEye } from 'react-icons/fi';

interface NewsCardProps {
  title: string;
  summary: string;
  category: string;
  time: string;
  views: string;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  summary,
  category,
  time,
  views,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-3">
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <FiClock size={14} />
          <span>{time}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <FiEye size={14} />
          <span>{views}</span>
        </div>
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600 mb-4">
        {summary}
      </p>
      <button className="text-blue-600 hover:text-blue-700 font-medium">
        Leer más →
      </button>
    </div>
  );
};

export default NewsCard;