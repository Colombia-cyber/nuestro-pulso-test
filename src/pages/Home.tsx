import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import NavigationTabs from "../components/NavigationTabs";
import { ReelsSection } from "../components/ReelsSection";
import NewsSection from "../components/NewsSection";
import CommentFeed from "../components/CommentFeed";

/**
 * Home - Main landing page
 * 
 * Composes all major UI components:
 * - SearchBar for content search
 * - NavigationTabs for Local/World toggle
 * - ReelsSection for video content
 * - NewsSection for news articles
 * - CommentFeed for community engagement
 * 
 * State management for search and tab switching is centralized here.
 */
const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'world'>('local');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
    // TODO: Implement search filtering for NewsSection and ReelsSection
    // This could filter content based on the search query
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">
            Nuestro Pulso
          </h1>
          <p className="text-xl opacity-95">
            Noticias, Reels, y Comunidad — Todo en un solo lugar
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <section className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar noticias, reels, temas..."
            autoFocus={false}
          />
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Buscando: <strong>{searchQuery}</strong>
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 text-blue-600 hover:underline"
              >
                Limpiar
              </button>
            </p>
          )}
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8 flex justify-center">
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </section>

        {/* News Section */}
        <NewsSection context={activeTab} />

        {/* Reels Section */}
        <ReelsSection context={activeTab} />

        {/* Community Hub Section */}
        <section className="my-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                🏘️ Centro Comunitario
              </h2>
              <a
                href="/community-hub"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Ver todo →
              </a>
            </div>
            <CommentFeed maxComments={5} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg opacity-90">
            &copy; {new Date().getFullYear()} Nuestro Pulso. Todos los derechos reservados.
          </p>
          <p className="mt-2 text-sm opacity-75">
            Manteniéndote informado y conectado con tu comunidad
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;