import React, { useState, useEffect } from 'react';
import { FaTimes, FaVideo, FaNewspaper, FaComments, FaShare } from 'react-icons/fa';

const CategoryCard = ({ topic, onClose }) => {
  const [activeTab, setActiveTab] = useState('feeds');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content for the topic
    setLoading(true);
    setTimeout(() => {
      setContent([
        {
          id: 1,
          type: 'article',
          title: `Últimas noticias sobre ${topic.name}`,
          description: `Contenido actualizado sobre ${topic.name} en Colombia`,
          timestamp: new Date().toISOString(),
          engagement: Math.floor(Math.random() * 1000) + 100
        },
        {
          id: 2,
          type: 'reel',
          title: `Video: ${topic.name} en Colombia`,
          description: `Video viral sobre ${topic.name}`,
          timestamp: new Date().toISOString(),
          engagement: Math.floor(Math.random() * 2000) + 500
        },
        {
          id: 3,
          type: 'discussion',
          title: `Debate: ${topic.name} y su impacto`,
          description: `Discusión comunitaria sobre ${topic.name}`,
          timestamp: new Date().toISOString(),
          engagement: Math.floor(Math.random() * 800) + 200
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [topic]);

  const renderContentItem = (item) => {
    const iconMap = {
      article: <FaNewspaper className="text-blue-500" />,
      reel: <FaVideo className="text-red-500" />,
      discussion: <FaComments className="text-green-500" />
    };

    return (
      <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{iconMap[item.type]}</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-3">{item.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(item.timestamp).toLocaleDateString('es-CO')}</span>
              <div className="flex items-center gap-4">
                <span>❤️ {item.engagement}</span>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <FaShare />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${topic.color} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{topic.icon}</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">{topic.name}</h1>
              <p className="text-xl opacity-90">Contenido actualizado en tiempo real</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('feeds')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'feeds'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaNewspaper className="inline mr-2" />
              Feeds
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reels'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaVideo className="inline mr-2" />
              Reels
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content
                .filter(item => activeTab === 'feeds' ? item.type !== 'reel' : item.type === 'reel')
                .map(renderContentItem)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;