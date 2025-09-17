import React from 'react';
import DualSearchBar from './DualSearchBar';

interface EnhancedHomepageProps {
  onNavigate: (view: string) => void;
}

const EnhancedHomepage: React.FC<EnhancedHomepageProps> = ({ onNavigate }) => {
  const handleLocalSearch = (query: string) => {
    // Navigate to search page with local query
    onNavigate('search');
    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', query);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handleGoogleSearch = (query: string) => {
    // Open Google search in new tab
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const categoryCards = [
    {
      id: 'petro',
      title: 'Petro',
      icon: '🇨🇴',
      description: 'Latest news and updates about President Gustavo Petro',
      color: 'from-blue-500 to-blue-700',
      clickable: true,
      route: 'news'
    },
    {
      id: 'trump',
      title: 'Trump',
      icon: '🇺🇸',
      description: 'International news and Trump administration updates',
      color: 'from-red-500 to-red-700',
      clickable: true,
      route: 'news'
    },
    {
      id: 'crime-drugs',
      title: 'Crime & Drugs',
      icon: '🚨',
      description: 'Security, crime prevention, and drug policy news',
      color: 'from-orange-500 to-orange-700',
      clickable: true,
      route: 'news'
    },
    {
      id: 'employment',
      title: 'Employment',
      icon: '💼',
      description: 'Job market, labor policies, and employment news',
      color: 'from-green-500 to-green-700',
      clickable: true,
      route: 'news'
    },
    {
      id: 'congress',
      title: 'Congress',
      icon: '🏛️',
      description: 'Congressional activities and legislative updates',
      color: 'from-purple-500 to-purple-700',
      clickable: true,
      route: 'congress'
    },
    {
      id: 'live-chat',
      title: 'Live Chat',
      icon: '💬',
      description: 'Join real-time discussions with the community',
      color: 'from-teal-500 to-teal-700',
      clickable: true,
      route: 'live-chat'
    },
    {
      id: 'education',
      title: 'Education',
      icon: '📚',
      description: 'Educational policies and academic news',
      color: 'from-indigo-500 to-indigo-700',
      clickable: true,
      route: 'news'
    },
    {
      id: 'economy',
      title: 'Economy',
      icon: '💰',
      description: 'Economic policies and financial news',
      color: 'from-yellow-500 to-yellow-700',
      clickable: true,
      route: 'news'
    }
  ];

  const handleCardClick = (card: typeof categoryCards[0]) => {
    if (card.clickable) {
      if (card.route === 'congress') {
        // Navigate to Congress placeholder
        onNavigate('congress');
      } else if (card.route === 'live-chat') {
        // Navigate to Live Chat placeholder
        onNavigate('live-chat');
      } else {
        // Navigate to news with category filter
        onNavigate(card.route);
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 min-h-screen">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30">
            {/* Colombian Flag Colors Accent */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🇨🇴 Nuestro Pulso
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              Red Cívica de Colombia - Tu Voz Cuenta
            </p>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
              para construir el futuro de Colombia juntos.
            </p>
          </div>
        </div>

        {/* Dual Search Bars */}
        <DualSearchBar 
          onLocalSearch={handleLocalSearch}
          onGoogleSearch={handleGoogleSearch}
        />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categoryCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                bg-gradient-to-br ${card.color} 
                rounded-2xl p-6 text-white shadow-xl border border-white/20
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                ${card.clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}
                backdrop-blur-lg
              `}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{card.description}</p>
                
                {card.clickable && (
                  <div className="mt-4 inline-flex items-center text-sm font-semibold">
                    <span>Explore →</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Info Box */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 mb-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-700 mb-6">
              Exciting new features are under development to enhance your civic participation experience
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-blue-900 mb-1">Advanced Polls</h3>
                <p className="text-sm text-blue-700">Real-time polling with demographic analysis</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-3xl mb-2">🎥</div>
                <h3 className="font-semibold text-green-900 mb-1">Video Debates</h3>
                <p className="text-sm text-green-700">Live video discussions on key issues</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-semibold text-purple-900 mb-1">Civic Badges</h3>
                <p className="text-sm text-purple-700">Earn recognition for participation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate('live-chat')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                💬 Join Live Chat
              </button>
              <button 
                onClick={() => onNavigate('debates')}
                className="px-8 py-4 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                🗣️ Start Debate
              </button>
              <button 
                onClick={() => onNavigate('surveys')}
                className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                📊 Take Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHomepage;