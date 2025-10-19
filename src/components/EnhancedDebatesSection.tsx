import React, { useState } from 'react';
import { FaComments, FaThumbsUp, FaThumbsDown, FaReply, FaFire, FaUsers } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { ColombianLoader, SectionLoader } from './ColombianLoader';

interface Debate {
  id: string;
  title: string;
  description: string;
  topic: string;
  author: string;
  createdAt: string;
  participants: number;
  comments: number;
  upvotes: number;
  downvotes: number;
  trending?: boolean;
  imageUrl?: string;
}

const debateTopics = [
  { id: 'all', label: 'Todos', icon: '💬' },
  { id: 'politics', label: 'Política', icon: '🗳️' },
  { id: 'economy', label: 'Economía', icon: '💰' },
  { id: 'education', label: 'Educación', icon: '📚' },
  { id: 'health', label: 'Salud', icon: '🏥' },
  { id: 'environment', label: 'Ambiente', icon: '🌍' },
];

const generateDebates = (topic: string): Debate[] => {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `debate-${topic}-${i}`,
    title: `¿${topic === 'all' ? 'Qué opinas sobre' : 'Debatamos'} el futuro de ${topic} en Colombia? #${i + 1}`,
    description: `Debate abierto sobre ${topic} y su impacto en la sociedad colombiana. Comparte tu perspectiva y participa en la discusión constructiva.`,
    topic: topic,
    author: `Usuario Verificado ${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    participants: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 200) + 10,
    upvotes: Math.floor(Math.random() * 300) + 20,
    downvotes: Math.floor(Math.random() * 50) + 5,
    trending: Math.random() > 0.7,
    imageUrl: `https://picsum.photos/seed/debate${topic}${i}/400/250`,
  }));
};

export const EnhancedDebatesSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [debates, setDebates] = useState<Debate[]>(generateDebates('all'));
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (topicId: string) => {
    setLoading(true);
    setSelectedTopic(topicId);
    
    setTimeout(() => {
      setDebates(generateDebates(topicId));
      setLoading(false);
    }, 300);
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 shadow-colombia">
              <FaComments className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-colombia-gradient">
                Debates Cívicos
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <FaUsers className="text-purple-600" />
                Discusiones constructivas sobre Colombia
              </p>
            </div>
          </div>
        </div>

        {/* Topic Filters */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {debateTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic.id)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${selectedTopic === topic.id
                    ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg'
                    : 'glass-card hover:shadow-md'
                  }
                `}
              >
                <span className="mr-2">{topic.icon}</span>
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Debates Grid */}
        {loading ? (
          <SectionLoader title="Cargando Debates..." count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {debates.map((debate, index) => (
              <div
                key={debate.id}
                className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300 card-3d"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                {debate.imageUrl && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={debate.imageUrl}
                      alt={debate.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {debate.trending && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                        <FaFire />
                        Trending
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <MdVerified className="text-purple-600" />
                    <span className="font-semibold">{debate.author}</span>
                    <span className="text-gray-400">•</span>
                    <span>{getTimeAgo(debate.createdAt)}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {debate.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {debate.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-purple-600" />
                      <span className="font-semibold">{debate.participants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaComments className="text-blue-600" />
                      <span className="font-semibold">{debate.comments}</span>
                    </div>
                  </div>

                  {/* Voting */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <FaThumbsUp />
                      {debate.upvotes}
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <FaThumbsDown />
                      {debate.downvotes}
                    </button>
                    <button className="p-2 glass-card hover:bg-gray-100 rounded-lg transition-colors">
                      <FaReply className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
