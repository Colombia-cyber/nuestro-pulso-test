import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
    views: number;
    likes: number;
    thumbnail: string;
    author: string;
    youtubeId?: string;
    embedUrl?: string;
  } | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
  if (!isOpen || !video) return null;

  // Generate a mock YouTube ID for demonstration
  const getYouTubeEmbedUrl = (videoId: number) => {
    // Mock YouTube IDs for demo purposes
    const mockYouTubeIds = [
      'dQw4w9WgXcQ', // Rick Roll as fallback
      'M7lc1UVf-VE', // Educational content
      'fJ9rUzIMcZQ', // Political content
      'LXb3EKWsInQ', // Environmental
      'QH2-TGUlwu4', // Tech content
    ];
    const youtubeId = mockYouTubeIds[videoId % mockYouTubeIds.length];
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const embedUrl = video.youtubeId 
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : getYouTubeEmbedUrl(video.id);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `¡Mira este video en Nuestro Pulso! ${video.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900 truncate">{video.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                video.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                video.category === 'participacion' ? 'bg-green-100 text-green-800' :
                video.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                video.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                video.category === 'tecnologia' ? 'bg-indigo-100 text-indigo-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {video.category}
              </span>
              <span className="text-sm text-gray-600">{video.author}</span>
              <span className="text-sm text-gray-500">{video.duration}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{video.description}</p>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-4">
            <span className="flex items-center space-x-1 text-gray-600">
              <span>👁️</span>
              <span>{video.views.toLocaleString()} visualizaciones</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-600">
              <span>❤️</span>
              <span>{video.likes.toLocaleString()} me gusta</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2">
                <span>❤️</span>
                <span>Me gusta</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <span>💬</span>
                <span>Comentar</span>
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Compartir:</span>
              <button
                onClick={() => handleShare('twitter')}
                className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
                title="Compartir en Twitter"
              >
                🐦
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                title="Compartir en Facebook"
              >
                📘
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                title="Compartir en WhatsApp"
              >
                📱
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                title="Copiar enlace"
              >
                🔗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;