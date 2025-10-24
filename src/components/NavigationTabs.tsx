import React from 'react';

interface NavigationTabsProps {
  activeTab: 'local' | 'world';
  onTabChange: (tab: 'local' | 'world') => void;
  className?: string;
}

/**
 * NavigationTabs - Local/World tab navigation component
 * 
 * Centralizes tab switching logic with accessible buttons.
 * Used to toggle between Local (Colombia) and World content views.
 */
const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div
      role="tablist"
      aria-label="Seleccionar vista de contenido"
      className={`flex gap-2 ${className}`}
    >
      <button
        role="tab"
        aria-selected={activeTab === 'local'}
        aria-controls="content-panel"
        onClick={() => onTabChange('local')}
        className={`
          px-6 py-3 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
          ${activeTab === 'local'
            ? 'bg-blue-600 text-white shadow-md focus:ring-blue-500'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 focus:ring-blue-500'
          }
        `}
      >
        🇨🇴 Local
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'world'}
        aria-controls="content-panel"
        onClick={() => onTabChange('world')}
        className={`
          px-6 py-3 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
          ${activeTab === 'world'
            ? 'bg-purple-600 text-white shadow-md focus:ring-purple-500'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 focus:ring-purple-500'
          }
        `}
      >
        🌍 Mundo
      </button>
    </div>
  );
};

export default NavigationTabs;
