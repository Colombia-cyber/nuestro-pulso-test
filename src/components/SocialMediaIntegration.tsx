import React, { useState } from 'react';

interface SocialMediaIntegrationProps {
  onPostToCommunityHub?: (content: string) => void;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({ onPostToCommunityHub }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500',
      action: () => {
        const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(postContent || 'Participa en Nuestro Pulso - Red Cívica de Colombia 🇨🇴');
        window.open(url, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      action: () => {
        const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
        window.open(url, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: () => {
        const text = postContent || 'Participa en Nuestro Pulso - Red Cívica de Colombia 🇨🇴';
        const url = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + window.location.href);
        window.open(url, '_blank');
      }
    },
    {
      name: 'YouTube',
      icon: '📺',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      action: () => {
        window.open('https://youtube.com', '_blank');
      }
    }
  ];

  const handlePostToCommunityHub = () => {
    if (postContent.trim() && onPostToCommunityHub) {
      onPostToCommunityHub(postContent);
      setPostContent('');
      setIsPostModalOpen(false);
      alert('¡Tu post ha sido enviado al Community Hub para mayor visibilidad!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          🌐 Integración Social
        </h3>
        <button
          onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
          className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Compartir
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Conecta con nuestras redes sociales y comparte tu participación cívica
      </p>

      {/* Social Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={platform.action}
            className={`${platform.color} ${platform.hoverColor} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center`}
          >
            <span className="text-2xl mb-1">{platform.icon}</span>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Share Menu */}
      {isShareMenuOpen && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Compartir contenido:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              ✍️ Crear Post
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado al portapapeles!');
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              📋 Copiar Enlace
            </button>
          </div>
        </div>
      )}

      {/* Post Creation Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Crear Post</h4>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Comparte tu opinión sobre temas cívicos..."
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={280}
            />
            
            <div className="text-sm text-gray-500 mb-4">
              {postContent.length}/280 caracteres
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handlePostToCommunityHub}
                disabled={!postContent.trim()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                📤 Enviar a Community Hub
              </button>
              <div className="flex gap-2">
                {socialPlatforms.slice(0, 3).map((platform) => (
                  <button
                    key={platform.name}
                    onClick={platform.action}
                    className={`${platform.color} ${platform.hoverColor} text-white px-3 py-2 rounded-lg transition text-sm`}
                  >
                    {platform.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Hub Integration */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🏛️</span>
          <h4 className="font-semibold text-purple-900">Community Hub</h4>
        </div>
        <p className="text-purple-800 text-sm mb-3">
          Comparte tus posts directamente en nuestro Community Hub para mayor visibilidad y engagement con otros ciudadanos.
        </p>
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
        >
          Crear Post para Community Hub
        </button>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;