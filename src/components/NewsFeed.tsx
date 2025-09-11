import React, { useState } from "react";

// Deployment screenshot reference: This component's UI and deployment status 
// can be visually confirmed by referencing the uploaded deployment screenshot (image1)
// which shows the NewsFeed component integrated within the Nuestro Pulso application

const newsData = [
  {
    headline: "Colombia Election Updates",
    category: "Politics",
    time: "1 hour ago",
    summary: "Colombia prepares for the upcoming election season with new reforms...",
  },
  {
    headline: "Economic Growth Surges",
    category: "Economy",
    time: "2 hours ago",
    summary: "Colombia reports record economic growth in the first quarter of 2025...",
  },
  {
    headline: "New Environmental Policies",
    category: "Environment",
    time: "30 minutes ago",
    summary: "Government announces new policies to protect Colombia's biodiversity...",
  },
];

const NewsFeed: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredNews = newsData.filter(news =>
    news.headline.toLowerCase().includes(query.toLowerCase()) ||
    news.category.toLowerCase().includes(query.toLowerCase()) ||
    news.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 my-8 border border-white border-opacity-30">
      {/* Colombian Flag Colors Accent */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">📰 News Feed</h2>
      <input
        type="text"
        className="w-full mb-6 p-3 bg-white bg-opacity-50 backdrop-blur-sm border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
        placeholder="Search news..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search news"
      />
      <div>
        {filteredNews.length === 0 ? (
          <div className="text-gray-600 text-center py-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">No news found.</div>
        ) : (
          filteredNews.map((news, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-lg hover:shadow-xl transition-all duration-200 border border-white border-opacity-40 hover:bg-opacity-50"
              tabIndex={0}
              aria-label={`News: ${news.headline}`}
            >
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-bold text-lg text-gray-900">
                  {news.headline}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2 flex items-center">
                <span className="bg-blue-100 bg-opacity-80 px-2 py-1 rounded-full text-blue-800 font-medium mr-2">
                  {news.category}
                </span>
                <span className="text-gray-600">🕒 {news.time}</span>
              </div>
              <div className="mt-2 text-gray-800 leading-relaxed">{news.summary}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;