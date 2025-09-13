import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";
import NewsFeed from "./NewsFeed";
import CombinedResults from "./components/CombinedResults";

function App() {
  const [activeTab, setActiveTab] = useState<'original' | 'combined'>('original');

  return (
    <div>
      <Navbar />
      
      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab('original')}
            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'original'
                ? 'border-[#0033A0] text-[#0033A0] bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-[#0033A0] hover:bg-gray-50'
            }`}
          >
            Vista Original
          </button>
          <button
            onClick={() => setActiveTab('combined')}
            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'combined'
                ? 'border-[#0033A0] text-[#0033A0] bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-[#0033A0] hover:bg-gray-50'
            }`}
          >
            Resultados Combinados
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'original' ? (
          <div>
            <GoogleWebSearchBar />
            <div className="mt-8">
              <NewsFeed />
            </div>
          </div>
        ) : (
          <CombinedResults />
        )}
      </div>
    </div>
  );
}

export default App;