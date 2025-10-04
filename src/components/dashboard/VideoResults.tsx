import React from 'react';
import { YouTubeVideo, DashboardTopic } from '../../types/dashboard';

interface VideoResultsProps {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  topic: DashboardTopic | null;
}

const VideoResults: React.FC<VideoResultsProps> = ({ videos, loading, error, topic }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎥</span>
          Videos en Vivo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 rounded-lg h-48 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎥</span>
          Videos en Vivo
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">⚠️ Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎥</span>
          Videos sobre {topic?.name}
        </h2>
        <span className="text-sm text-gray-500">
          {videos.length} resultados
        </span>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No se encontraron videos</p>
          <p className="text-sm mt-2">Intenta seleccionar otro tema</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/320x180/1a73e8/ffffff?text=Video';
                  }}
                />
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                  {video.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  {video.channelTitle}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(video.publishedAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  {video.viewCount && (
                    <span>👁️ {video.viewCount} vistas</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoResults;
