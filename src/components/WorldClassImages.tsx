import React from 'react';

export const WorldClassImages: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">World Class Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Image content coming soon...</p>
        </div>
      </div>
    </div>
  );
};