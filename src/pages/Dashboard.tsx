import React from 'react';
import LiveFeed from '../components/LiveFeed';
import PulsePollsWidget from '../components/PulsePollsWidget';
import TrendingTopics from '../components/TrendingTopics';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bienvenido a Nuestro Pulso 🇨🇴
          </h1>
          <p className="text-gray-600">
            Tu centro de participación cívica digital para Colombia
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            to="/chat"
            className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold mb-1">Chat en Vivo</h3>
            <p className="text-sm opacity-90">Debate en tiempo real</p>
          </Link>

          <Link
            to="/news"
            className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition-colors transform hover:scale-105"
          >
            <div className="text-3xl mb-2">📰</div>
            <h3 className="font-semibold mb-1">Noticias</h3>
            <p className="text-sm opacity-90">Información verificada</p>
          </Link>

          <Link
            to="/analytics"
            className="bg-purple-500 text-white p-6 rounded-lg hover:bg-purple-600 transition-colors transform hover:scale-105"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">Pulso Electoral</h3>
            <p className="text-sm opacity-90">Encuestas y análisis</p>
          </Link>

          <Link
            to="/congress"
            className="bg-red-500 text-white p-6 rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🏛️</div>
            <h3 className="font-semibold mb-1">Congreso</h3>
            <p className="text-sm opacity-90">Actividad legislativa</p>
          </Link>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Live Feed */}
          <div className="lg:col-span-2">
            <LiveFeed />
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            <PulsePollsWidget />
            <TrendingTopics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;