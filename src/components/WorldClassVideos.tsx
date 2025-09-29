import React from 'react';

interface WorldClassVideosProps {
  liveOnly?: boolean;
}

export const WorldClassVideos: React.FC<WorldClassVideosProps> = ({ liveOnly = false }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {liveOnly ? 'Live Videos' : 'World Class Videos'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">
            {liveOnly ? 'Live video content coming soon...' : 'Video content coming soon...'}
          </p>
        </div>
      </div>
    </div>
  );
};