import React, { useState, useEffect } from 'react';
import { DashboardTopic, DashboardState } from '../types/dashboard';
import youtubeService from '../services/youtubeService';
import newsAPIService from '../services/newsAPIService';
import firebaseChatService from '../services/firebaseChatService';
import VideoResults from './dashboard/VideoResults';
import NewsResults from './dashboard/NewsResults';
import TopicChat from './dashboard/TopicChat';

// Available topics for the dashboard
const TOPICS: DashboardTopic[] = [
  {
    id: 'colombia-politica',
    name: 'Política Colombiana',
    icon: '🏛️',
    color: 'blue',
    keywords: ['política colombia', 'gobierno colombia', 'congreso colombia']
  },
  {
    id: 'economia',
    name: 'Economía',
    icon: '📊',
    color: 'green',
    keywords: ['economía colombia', 'finanzas colombia', 'negocios colombia']
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    icon: '🛡️',
    color: 'red',
    keywords: ['seguridad colombia', 'crimen colombia', 'policía colombia']
  },
  {
    id: 'medio-ambiente',
    name: 'Medio Ambiente',
    icon: '🌱',
    color: 'emerald',
    keywords: ['medio ambiente colombia', 'ecología colombia', 'cambio climático colombia']
  },
  {
    id: 'educacion',
    name: 'Educación',
    icon: '📚',
    color: 'purple',
    keywords: ['educación colombia', 'universidades colombia', 'colegios colombia']
  },
  {
    id: 'salud',
    name: 'Salud',
    icon: '🏥',
    color: 'pink',
    keywords: ['salud colombia', 'medicina colombia', 'hospitales colombia']
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    color: 'indigo',
    keywords: ['tecnología colombia', 'innovación colombia', 'startups colombia']
  },
  {
    id: 'cultura',
    name: 'Cultura',
    icon: '🎭',
    color: 'yellow',
    keywords: ['cultura colombia', 'arte colombia', 'música colombia']
  }
];

interface LiveDashboardProps {
  onNavigate?: (view: string, params?: any) => void;
}

const LiveDashboard: React.FC<LiveDashboardProps> = ({ onNavigate }) => {
  const [state, setState] = useState<DashboardState>({
    selectedTopic: TOPICS[0],
    videos: [],
    news: [],
    messages: [],
    loading: {
      videos: false,
      news: false,
      chat: false
    },
    errors: {
      videos: null,
      news: null,
      chat: null
    }
  });

  const [showApiConfig, setShowApiConfig] = useState(false);

  // Load content when topic changes
  useEffect(() => {
    if (state.selectedTopic) {
      loadTopicContent(state.selectedTopic);
    }
  }, [state.selectedTopic]);

  const loadTopicContent = async (topic: DashboardTopic) => {
    // Reset errors
    setState(prev => ({
      ...prev,
      errors: { videos: null, news: null, chat: null },
      loading: { videos: true, news: true, chat: true }
    }));

    // Load videos
    try {
      const searchQuery = topic.keywords[0];
      const videos = await youtubeService.searchVideos(searchQuery, 8);
      setState(prev => ({
        ...prev,
        videos,
        loading: { ...prev.loading, videos: false }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, videos: 'Error al cargar videos' },
        loading: { ...prev.loading, videos: false }
      }));
    }

    // Load news
    try {
      const searchQuery = topic.keywords[0];
      const news = await newsAPIService.searchNews(searchQuery, 10);
      setState(prev => ({
        ...prev,
        news,
        loading: { ...prev.loading, news: false }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, news: 'Error al cargar noticias' },
        loading: { ...prev.loading, news: false }
      }));
    }

    // Subscribe to chat
    try {
      const unsubscribe = firebaseChatService.subscribeToTopic(
        topic.id,
        (messages) => {
          setState(prev => ({
            ...prev,
            messages,
            loading: { ...prev.loading, chat: false }
          }));
        }
      );

      // Cleanup function
      return () => {
        unsubscribe();
      };
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, chat: 'Error al cargar chat' },
        loading: { ...prev.loading, chat: false }
      }));
    }
  };

  const handleTopicChange = (topic: DashboardTopic) => {
    // Unsubscribe from previous topic
    if (state.selectedTopic) {
      firebaseChatService.unsubscribeFromTopic(state.selectedTopic.id);
    }
    
    setState(prev => ({
      ...prev,
      selectedTopic: topic,
      videos: [],
      news: [],
      messages: []
    }));
  };

  const handleSendMessage = async (message: string, userName: string) => {
    if (!state.selectedTopic) return;

    try {
      await firebaseChatService.sendMessage(
        state.selectedTopic.id,
        'user-' + Date.now(), // Generate temporary user ID
        userName,
        message,
        '👤'
      );
    } catch (error) {
      console.error('Error sending message:', error);
      alert('No se pudo enviar el mensaje. Verifica la configuración de Firebase.');
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500', hover: 'hover:bg-green-100' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500', hover: 'hover:bg-red-100' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-500', hover: 'hover:bg-emerald-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-500', hover: 'hover:bg-purple-100' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-500', hover: 'hover:bg-pink-100' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-500', hover: 'hover:bg-indigo-100' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-500', hover: 'hover:bg-yellow-100' }
    };
    return colors[color] || colors.blue;
  };

  const apiConfigStatus = {
    youtube: youtubeService.isConfigured(),
    news: newsAPIService.isConfigured(),
    firebase: firebaseChatService.isConfigured()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">📊 Dashboard en Vivo</h1>
              <p className="text-white/90 text-lg">
                Videos de YouTube, Noticias en Tiempo Real y Chat Comunitario
              </p>
            </div>
            <button
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              ⚙️ API Config
            </button>
          </div>
        </div>
      </div>

      {/* API Configuration Status */}
      {showApiConfig && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-4">
            <h3 className="font-semibold text-yellow-900 mb-3">Estado de Configuración de APIs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${apiConfigStatus.youtube ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">YouTube API</span>
                  <span className="text-2xl">{apiConfigStatus.youtube ? '✅' : '❌'}</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  {apiConfigStatus.youtube ? 'Configurado' : 'Agrega VITE_YOUTUBE_API_KEY en .env'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${apiConfigStatus.news ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">News API</span>
                  <span className="text-2xl">{apiConfigStatus.news ? '✅' : '❌'}</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  {apiConfigStatus.news ? 'Configurado' : 'Agrega VITE_NEWSAPI_KEY en .env'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${apiConfigStatus.firebase ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Firebase</span>
                  <span className="text-2xl">{apiConfigStatus.firebase ? '✅' : '❌'}</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  {apiConfigStatus.firebase ? 'Configurado' : 'Configura Firebase en .env'}
                </p>
              </div>
            </div>
            <p className="text-xs text-yellow-800 mt-3">
              💡 Las APIs no configuradas mostrarán datos de demostración. Ver .env.example para instrucciones.
            </p>
          </div>
        </div>
      )}

      {/* Topic Selector */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-gray-600 font-medium whitespace-nowrap">Seleccionar tema:</span>
            {TOPICS.map((topic) => {
              const colors = getColorClasses(topic.color);
              const isSelected = state.selectedTopic?.id === topic.id;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicChange(topic)}
                  className={`
                    px-4 py-2 rounded-lg whitespace-nowrap transition-all
                    ${isSelected 
                      ? `${colors.bg} ${colors.text} border-2 ${colors.border} font-semibold` 
                      : `bg-gray-100 text-gray-700 border-2 border-transparent ${colors.hover}`
                    }
                  `}
                >
                  <span className="mr-2">{topic.icon}</span>
                  {topic.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Videos Section - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <VideoResults 
              videos={state.videos}
              loading={state.loading.videos}
              error={state.errors.videos}
              topic={state.selectedTopic}
            />
          </div>

          {/* Chat Section - 1 column on large screens */}
          <div className="lg:col-span-1">
            <TopicChat
              messages={state.messages}
              loading={state.loading.chat}
              error={state.errors.chat}
              topic={state.selectedTopic}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>

        {/* News Section - Full width */}
        <div className="mt-6">
          <NewsResults
            news={state.news}
            loading={state.loading.news}
            error={state.errors.news}
            topic={state.selectedTopic}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
