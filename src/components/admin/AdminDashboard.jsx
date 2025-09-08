import React, { useState, useEffect } from 'react';
import { pollService } from '../../services/pollService.js';
import PollCreator from './PollCreator.jsx';
import PollManager from './PollManager.jsx';
import PollAnalytics from './PollAnalytics.jsx';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('create');
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      setLoading(true);
      const pollsData = await pollService.getActivePolls();
      setPolls(pollsData);
    } catch (error) {
      console.error('Error loading polls:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'create', label: 'Crear Encuesta', icon: '➕' },
    { id: 'manage', label: 'Gestionar', icon: '📊' },
    { id: 'analytics', label: 'Analíticas', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gestiona encuestas y analiza resultados en tiempo real
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {polls.length} encuestas activas
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600">Cargando...</span>
            </div>
          ) : (
            <>
              {activeTab === 'create' && (
                <PollCreator onPollCreated={loadPolls} />
              )}
              {activeTab === 'manage' && (
                <PollManager polls={polls} onPollsChanged={loadPolls} />
              )}
              {activeTab === 'analytics' && (
                <PollAnalytics polls={polls} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}