import React, { useState } from 'react';
import { WorldClassFeed } from './WorldClassFeed';
import { WorldClassVideos } from './WorldClassVideos';
import { WorldClassImages } from './WorldClassImages';

const TABS = [
  { id: 'all', label: 'All', icon: '🌎' },
  { id: 'feeds', label: 'Feeds', icon: '📰' },
  { id: 'videos', label: 'Videos', icon: '🎥' },
  { id: 'images', label: 'Images', icon: '🖼️' },
  { id: 'forYou', label: 'For You', icon: '✨' },
  { id: 'live', label: 'Live', icon: '🔴' },
  { id: 'trending', label: 'Trending', icon: '🔥' },
];

export function WorldClassTabs() {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = (tab) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(tab.label)}`, '_blank');
    setActiveTab(tab.id);
  };

  return (
    <div>
      <div className="tabs-row sticky top-0 bg-white z-10 shadow-sm flex gap-2 px-2 py-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
            aria-label={tab.label}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleTabClick(tab)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'all'      && <WorldClassFeed />}
        {activeTab === 'feeds'    && <WorldClassFeed onlyFeeds />}
        {activeTab === 'videos'   && <WorldClassVideos />}
        {activeTab === 'images'   && <WorldClassImages />}
        {activeTab === 'forYou'   && <WorldClassFeed personalized />}
        {activeTab === 'live'     && <WorldClassVideos liveOnly />}
        {activeTab === 'trending' && <WorldClassFeed trending />}
      </div>
    </div>
  );
}