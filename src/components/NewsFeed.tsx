import React, { useState } from "react";

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
    <div className="bg-white bg-opacity-80 rounded-xl shadow p-6 my-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">📰 News Feed</h2>
      <input
        type="text"
        className="w-full mb-6 p-2 border border-blue-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Search news..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search news"
      />
      <div>
        {filteredNews.length === 0 ? (
          <div className="text-gray-500">No news found.</div>
        ) : (
          filteredNews.map((news, idx) => (
            <div
              key={idx}
              className="bg-blue-50 rounded-lg p-4 mb-4 shadow hover:shadow-md transition-shadow"
              tabIndex={0}
              aria-label={`News: ${news.headline}`}
            >
              <span className="font-bold text-lg text-blue-700">
                Headline: {news.headline}
              </span>
              <div className="text-sm text-gray-500">
                Category: {news.category} | 🕒 {news.time}
              </div>
              <div className="mt-2 text-gray-700">{news.summary}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;