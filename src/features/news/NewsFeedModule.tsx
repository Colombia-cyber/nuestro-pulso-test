import React from "react";

const NewsFeed: React.FC = () => (
  <div className="bg-white bg-opacity-80 rounded-xl shadow p-6 my-8">
    <h2 className="text-2xl font-bold text-blue-800 mb-2">📰 News Feed</h2>
    {/* Example news card */}
    <div className="mt-4">
      <div className="bg-blue-50 rounded-lg p-4 mb-2 shadow">
        <span className="font-bold text-lg text-blue-700">Headline: Colombia Election Updates</span>
        <div className="text-sm text-gray-500">Category: Politics | 🕒 1 hour ago</div>
        <div className="mt-2 text-gray-700">Colombia prepares for the upcoming election season with new reforms...</div>
      </div>
      {/* Add more news cards here */}
    </div>
  </div>
);

export default NewsFeed;