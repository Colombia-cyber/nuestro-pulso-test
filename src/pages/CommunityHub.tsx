import React, { useState } from "react";
import CommentFeed from "../components/CommentFeed";

/**
 * CommunityHub - Central community engagement page
 * 
 * Features:
 * - Real-time comment feed
 * - Placeholder hooks for additional community features:
 *   - Polls
 *   - Trending topics
 *   - User profiles
 *   - Leaderboards
 * 
 * This component mounts CommentFeed and can be extended with
 * additional community features as needed.
 */
const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comments' | 'polls' | 'trending'>('comments');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏘️ Centro Comunitario
          </h1>
          <p className="text-lg text-gray-600">
            Conecta con otros ciudadanos, comparte opiniones y participa en la conversación.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-6" role="tablist" aria-label="Community sections">
            <button
              role="tab"
              aria-selected={activeTab === 'comments'}
              onClick={() => setActiveTab('comments')}
              className={`pb-3 px-1 font-semibold transition-colors ${
                activeTab === 'comments'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              💬 Comentarios
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'polls'}
              onClick={() => setActiveTab('polls')}
              className={`pb-3 px-1 font-semibold transition-colors ${
                activeTab === 'polls'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled
            >
              📊 Encuestas <span className="text-xs">(Próximamente)</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'trending'}
              onClick={() => setActiveTab('trending')}
              className={`pb-3 px-1 font-semibold transition-colors ${
                activeTab === 'trending'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled
            >
              🔥 Tendencias <span className="text-xs">(Próximamente)</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div role="tabpanel" aria-labelledby="community-content">
          {activeTab === 'comments' && (
            <CommentFeed />
          )}
          
          {activeTab === 'polls' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📊 Encuestas Comunitarias
              </h2>
              <p className="text-gray-600">
                Esta funcionalidad estará disponible próximamente.
                Podrás participar en encuestas y ver resultados en tiempo real.
              </p>
            </div>
          )}
          
          {activeTab === 'trending' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🔥 Temas Tendencia
              </h2>
              <p className="text-gray-600">
                Esta funcionalidad estará disponible próximamente.
                Descubre los temas más discutidos en la comunidad.
              </p>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <aside className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">
            📋 Normas de la Comunidad
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>✓ Sé respetuoso con todos los miembros</li>
            <li>✓ No compartas información personal</li>
            <li>✓ Evita el lenguaje ofensivo o discriminatorio</li>
            <li>✓ Reporta contenido inapropiado</li>
            <li>✓ Mantén las conversaciones relevantes y constructivas</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CommunityHub;